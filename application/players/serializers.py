from datetime import datetime, timedelta

from django.contrib.auth import get_user_model
from django.contrib.auth.models import User
from django.contrib.auth.password_validation import validate_password
from django.core.validators import MinValueValidator, MaxValueValidator
from django.db.models import Q
from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from rest_framework_simplejwt.exceptions import AuthenticationFailed

from .models import FootballPlayer, FootballClub, Competition, Record, UserProfile
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.tokens import AccessToken


class FootballPlayerSerializer(serializers.ModelSerializer):
    class Meta:
        model = FootballPlayer
        fields = "__all__"

    def validate(self, data):
        if data.get('position') not in ['Goalkeeper', 'Defender', 'Midfielder', 'Forward']:
            raise serializers.ValidationError("The player position is invalid! It must be one of: Goalkeeper, "
                                              "Defender, Midfielder, Forward")
        return data


class PlayerClubSerializer(serializers.ModelSerializer):
    class Meta:
        model = FootballPlayer
        fields = "__all__"
        depth = 1

    def validate(self, data):
        if data.get('position') not in ['Goalkeeper', 'Defender', 'Midfielder', 'Forward']:
            raise serializers.ValidationError("The player position is invalid! It must be one of: Goalkeeper, "
                                              "Defender, Midfielder, Forward")
        return data


class FootballClubSerializer(serializers.ModelSerializer):
    class Meta:
        model = FootballClub
        fields = ['id', 'name', 'establishment_year', 'country', 'city', 'budget', 'home_kit']


class ClubPlayersSerializer(serializers.ModelSerializer):
    players = PlayerClubSerializer(many=True)

    class Meta:
        model = FootballClub
        fields = ('id', 'name', 'establishment_year', 'country', 'city', 'budget', 'home_kit', 'players')

    def create(self, validated_data):
        players_data = validated_data.pop('players')
        club = FootballClub.objects.create(**validated_data)
        for player in players_data:
            player.pop('club', None)
            FootballPlayer.objects.create(club=club, **player)
        return club

    def update(self, instance, validated_data):
        '''
        players_data = validated_data.pop('players')
        instance.name = validated_data.get("name", instance.name)
        instance.save()
        keep_players = []
        existing_ids = [p.id for p in instance.players]
        for player in players_data:
            player.pop('club', None)
            if "id" in player.keys():
                if FootballPlayer.objects.filter(id=player["id"]).exists():
                    p = FootballPlayer.objects.get(id=player["id"])
                    p.first_name = player.get('first_name', p.first_name)
                    p.last_name = player.get('last_name', p.last_name)
                    p.save()
                    keep_players.append(p.id)
            else:
                p = FootballPlayer.objects.create(**player, club=instance)
                keep_players.append(p.id)

        return instance
        '''
        players_data = validated_data.pop('players')
        players = instance.players.all()
        players = list(players)
        instance.name = validated_data.get("name", instance.name)
        instance.establishment_year = validated_data.get("establishment_year", instance.establishment_year)
        instance.country = validated_data.get("country", instance.country)
        instance.city = validated_data.get("city", instance.city)
        instance.budget = validated_data.get("budget", instance.budget)
        instance.home_kit = validated_data.get("home_kit", instance.home_kit)
        instance.save()

        for player in players_data:
            football_player = players.pop(0)
            football_player.first_name = player.get('first_name', football_player.first_name)
            football_player.last_name = player.get('last_name', football_player.last_name)
            football_player.nationality = player.get('nationality', football_player.nationality)
            football_player.age = player.get('age', football_player.age)
            football_player.position = player.get('position', football_player.position)
            football_player.save()

        return instance


class ClubCompetitionsSerializer(serializers.ModelSerializer):
    class Meta:
        model = FootballClub
        fields = '__all__'
        depth = 1


class CompetitionClubsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Competition
        fields = '__all__'
        depth = 1


class CompetitionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Competition
        fields = "__all__"

    def validate(self, data):
        if len(data.get('name')) < 5:
            raise serializers.ValidationError("The competition name must be at least 5 characters long!")
        return data


class RecordPostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Record
        fields = "__all__"

    def validate(self, data):
        if data.get('trophies_won') > data.get('no_of_participations'):
            raise serializers.ValidationError("Number of trophies won can't be greater than the number of "
                                              "participations of a team in a competition")
        return data


class RecordSerializer(serializers.ModelSerializer):
    class Meta:
        model = Record
        fields = "__all__"
        depth = 1

    def validate(self, data):
        if data.get('trophies_won') > data.get('no_of_participations'):
            raise serializers.ValidationError("Number of trophies won can't be greater than the number of "
                                              "participations of a team in a competition")
        return data


class ClubRecordSerializer(serializers.ModelSerializer):
    name = serializers.CharField(max_length=100)
    total_trophies = serializers.IntegerField(read_only=True)

    class Meta:
        model = FootballClub
        fields = ('id', 'name', 'total_trophies')


class ClubPlayersAgeSerializer(serializers.ModelSerializer):
    name = serializers.CharField(max_length=100)
    establishment_year = serializers.IntegerField(validators=[MinValueValidator(1850), MaxValueValidator(2023)])
    country = serializers.CharField(max_length=30)
    average_age = serializers.FloatField(read_only=True)

    class Meta:
        model = FootballClub
        fields = ('id', 'name', 'establishment_year', 'country', 'average_age')


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'is_active']


class UserProfilesSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)

    class Meta:
        model = UserProfile
        fields = ['id', 'first_name', 'last_name', 'bio', 'location', 'gender', 'user', 'entities_added']

    def validate(self, data):
        if len(data.get('first_name')) < 2:
            raise serializers.ValidationError("The first name must be at least 2 characters long!")
        if len(data.get('last_name')) < 2:
            raise serializers.ValidationError("The last name must be at least 2 characters long!")
        if data.get('gender') not in ['Male', 'Female']:
            raise serializers.ValidationError('Gender must be either Male or Female!')
        return data


class ConfirmUserRegisterSerializer(serializers.ModelSerializer):
    message = serializers.CharField(read_only=True)

    class Meta:
        model = User
        fields = ['message']


class RegisterMessageSerializer(serializers.ModelSerializer):
    activation_token = serializers.CharField(read_only=True)

    class Meta:
        model = User
        fields = ['activation_token']


class LoginSerializer(TokenObtainPairSerializer):

    def update(self, instance, validated_data):
        super().update(instance, validated_data)

    def validate(self, attrs):
        authenticate_kwargs = {
            "username": attrs[self.username_field],
            "password": attrs["password"]
        }
        try:
            authenticate_kwargs["request"] = self.context["request"]
        except KeyError:
            pass
        self.user = self.auth(authenticate_kwargs)
        if self.user is None:
            self.error_messages['no_active_account'] = 'There is no active account with the given credentials'
            raise AuthenticationFailed(self.error_messages['no_active_account'], 'no_active_account')
        if not self.user.is_active:
            access_token = AccessToken.for_user(self.user)
            exp_time = datetime.now() + timedelta(minutes=10)
            access_token['exp'] = int(exp_time.timestamp())
            self.error_messages['no_active_account'] = 'The user account is not active'
            raise AuthenticationFailed(self.error_messages['no_active_account'], 'no_active_account')
        return super().validate(attrs)

    def create(self, validated_data):
        return super().create(validated_data)

    def auth(self, attrs):
        UserModel = get_user_model()
        try:
            user = UserModel.objects.get(Q(username__iexact=attrs['username']))
        except UserModel.DoesNotExist:
            return None
        else:
            if user.check_password(attrs['password']):
                return user
        return None


class RegisterSerializer(serializers.ModelSerializer):
    username = serializers.CharField(required=True, validators=[UniqueValidator(queryset=User.objects.all())])
    email = serializers.EmailField(required=True, validators=[UniqueValidator(queryset=User.objects.all())])
    password = serializers.CharField(required=True, write_only=True, validators=[validate_password])
    password2 = serializers.CharField(required=True, write_only=True)

    class Meta:
        model = User
        fields = ['username', 'email', 'password', 'password2']

    def validate(self, data):
        if data['password'] != data['password2']:
            raise serializers.ValidationError("The two passwords must match!")
        return data

    def create(self, validated_data):
        user = User.objects.create(username=validated_data['username'],
                                   email=validated_data['email'])
        user.set_password(validated_data['password'])
        user.is_active = False
        user.save()

        user_profile = UserProfile.objects.create(user=user)
        user_profile.save()

        return user
