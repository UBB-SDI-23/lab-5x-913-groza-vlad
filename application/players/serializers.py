from django.core.validators import MinValueValidator, MaxValueValidator
from rest_framework import serializers
from .models import FootballPlayer, FootballClub, Competition, Record


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