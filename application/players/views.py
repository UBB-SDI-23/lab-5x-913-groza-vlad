from datetime import datetime, timedelta

from django.contrib.auth.models import User
from django.http import Http404
from django.shortcuts import render
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.decorators import api_view
from rest_framework import status, permissions
from rest_framework.generics import CreateAPIView, RetrieveAPIView
from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response
from rest_framework import generics
from rest_framework.views import APIView
from rest_framework_simplejwt.exceptions import TokenError
from rest_framework_simplejwt.tokens import AccessToken
from rest_framework_simplejwt.views import TokenObtainPairView

from .models import FootballPlayer, FootballClub, Competition, Record, UserProfile
from .serializers import FootballPlayerSerializer, FootballClubSerializer, CompetitionSerializer, RecordSerializer, \
    ClubRecordSerializer, ClubPlayersSerializer, ClubCompetitionsSerializer, ClubPlayersAgeSerializer, \
    CompetitionClubsSerializer, PlayerClubSerializer, RecordPostSerializer, RegisterSerializer, UserSerializer, \
    UserProfilesSerializer, ConfirmUserRegisterSerializer, LoginSerializer
from django_filters import rest_framework as filters
from django.db.models import Sum, Avg


class StandardResultsSetPagination(PageNumberPagination):
    page_size = 100
    page_query_param = 'page'
    page_size_query_param = 'page_size'
    max_page_size = 1000


@api_view(['GET', 'POST'])
def player_list(request, format=None):
    '''
    List all the players / create a new player
    '''
    if request.method == 'GET':
        players = FootballPlayer.objects.all()
        paginator = StandardResultsSetPagination()
        result_page = paginator.paginate_queryset(players, request)
        serializer = PlayerClubSerializer(result_page, many=True)
        return paginator.get_paginated_response(serializer.data)
    elif request.method == 'POST':
        serializer = FootballPlayerSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'PUT', 'DELETE'])
def player_detail(request, pk, format=None):
    '''
    Get/Update/Delete a football player
    '''
    try:
        player = FootballPlayer.objects.get(pk=pk)
    except FootballPlayer.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = PlayerClubSerializer(player)
        return Response(serializer.data)
    elif request.method == 'PUT':
        serializer = FootballPlayerSerializer(player, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'DELETE':
        player.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(['GET', 'POST'])
def club_list(request, format=None):
    '''
    List all the football clubs / add a new club
    '''
    if request.method == 'GET':
        clubs = FootballClub.objects.all()
        paginator = StandardResultsSetPagination()
        result_page = paginator.paginate_queryset(clubs, request)
        serializer = FootballClubSerializer(result_page, many=True)
        return paginator.get_paginated_response(serializer.data)
    elif request.method == 'POST':
        serializer = FootballClubSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'PUT', 'DELETE'])
def club_detail(request, pk, format=None):
    '''
    Get/Update/Delete a football club
    '''
    try:
        club = FootballClub.objects.get(pk=pk)
    except FootballClub.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = FootballClubSerializer(club)
        return Response(serializer.data)
    elif request.method == 'PUT':
        serializer = FootballClubSerializer(club, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'DELETE':
        club.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class FootballPlayerFilter(filters.FilterSet):
    age = filters.NumberFilter(field_name='age', lookup_expr='gt')

    class Meta:
        model = FootballPlayer
        fields = ['age']


class PlayersWithAge(generics.ListAPIView):
    serializer_class = FootballPlayerSerializer
    filter_backends = [DjangoFilterBackend]
    queryset = FootballPlayer.objects.all()
    filterset_class = FootballPlayerFilter
    pagination_class = StandardResultsSetPagination

    def get_queryset(self):
        return self.queryset


@api_view(['GET', 'POST'])
def competition_list(request, format=None):
    '''
    List all the competitions / add a new competition
    '''
    if request.method == 'GET':
        competitions = Competition.objects.all()
        paginator = StandardResultsSetPagination()
        result_page = paginator.paginate_queryset(competitions, request)
        serializer = CompetitionSerializer(result_page, many=True)
        return paginator.get_paginated_response(serializer.data)
    elif request.method == 'POST':
        serializer = CompetitionSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'PUT', 'DELETE'])
def competition_detail(request, pk, format=None):
    '''
    Get/Update/Delete a competition
    '''
    try:
        competition = Competition.objects.get(pk=pk)
    except Competition.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = CompetitionSerializer(competition)
        return Response(serializer.data)
    elif request.method == 'PUT':
        serializer = CompetitionSerializer(competition, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'DELETE':
        competition.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(['GET', 'POST'])
def record_list(request, format=None):
    '''
    List all the records / add a new record
    '''
    if request.method == 'GET':
        records = Record.objects.all()
        paginator = StandardResultsSetPagination()
        result_page = paginator.paginate_queryset(records, request)
        serializer = RecordSerializer(result_page, many=True)
        return paginator.get_paginated_response(serializer.data)
    elif request.method == 'POST':
        serializer = RecordPostSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'PUT', 'DELETE'])
def record_detail(request, pk, format=None):
    '''
    Get/Update/Delete a record
    '''
    try:
        record = Record.objects.get(pk=pk)
    except Record.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = RecordSerializer(record)
        return Response(serializer.data)
    elif request.method == 'PUT':
        serializer = RecordSerializer(record, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'DELETE':
        record.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class ClubsTrophiesSummary(generics.ListAPIView):
    serializer_class = ClubRecordSerializer
    pagination_class = StandardResultsSetPagination

    def get_queryset(self):
        # change the query so that the football clubs that doesn't have any record are not included
        query = FootballClub.objects.\
            annotate(total_trophies=Sum('record__trophies_won')). \
            exclude(total_trophies=None). \
            values('id', 'name', 'total_trophies').\
            order_by('-total_trophies')
        print(query.query)

        return query


class ClubsByAveragePlayersAge(generics.ListAPIView):
    serializer_class = ClubPlayersAgeSerializer
    pagination_class = StandardResultsSetPagination

    def get_queryset(self):
        query = FootballClub.objects.\
            annotate(average_age=Avg('footballplayer__age')).\
            exclude(average_age=None).\
            order_by('average_age')
        print(query.query)

        return query


class FootballClubView(generics.ListCreateAPIView):
    serializer_class = ClubPlayersSerializer
    pagination_class = StandardResultsSetPagination
    queryset = FootballClub.objects.all()


class FootballClubDetail(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = ClubPlayersSerializer
    queryset = FootballClub.objects.all()


class FootballClubCompetitionsView(generics.ListCreateAPIView):
    serializer_class = ClubCompetitionsSerializer
    pagination_class = StandardResultsSetPagination
    queryset = FootballClub.objects.all()


class FootballClubCompetitionsDetail(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = ClubCompetitionsSerializer
    queryset = FootballClub.objects.all()


class CompetitionsFootballClubDetail(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = CompetitionClubsSerializer
    queryset = Competition.objects.all()


class FootballClubAutocompleteView(APIView):
    serializer_class = FootballClubSerializer

    def get(self, request, *args, **kwargs):
        query = request.GET.get('query')
        clubs = FootballClub.objects.filter(name__icontains=query)[:100]
        serializer = FootballClubSerializer(clubs, many=True)
        return Response(serializer.data)


class CompetitionAutocompleteView(APIView):
    serializer_class = CompetitionSerializer

    def get(self, request, *args, **kwargs):
        query = request.GET.get('query')
        competitions = Competition.objects.filter(name__icontains=query)[:100]
        serializer = CompetitionSerializer(competitions, many=True)
        return Response(serializer.data)


class RegisterView(CreateAPIView):
    serializer_class = RegisterSerializer
    queryset = User.objects.all()

    def post(self, request, *args, **kwargs):
        user = RegisterSerializer(data=request.data)
        if user.is_valid():
            user.save()
        user = list(User.objects.filter(email=user.data['email']))[0]
        access_token = AccessToken.for_user(user)
        exp_time = datetime.now() + timedelta(minutes=10)
        access_token['exp'] = int(exp_time.timestamp())
        return Response({"activation_token": str(access_token)}, status=200)


class UserDetailView(RetrieveAPIView):
    serializer_class = UserProfilesSerializer

    def get_queryset(self):
        return UserProfile.objects.all()

    def get_object(self):
        try:
            return self.get_queryset().get(id=self.kwargs["pk"])
        except UserProfile.DoesNotExist:
            return {"ERROR": "User profile not found!"}


class UserProfileView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = UserProfilesSerializer
    queryset = UserProfile.objects.all()
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        try:
            return self.get_queryset().get(user__id=self.request.user.id)
        except UserProfile.DoesNotExist:
            return {"ERROR": "User profile not found!"}

    def put(self, request, *args, **kwargs):
        user = list(UserProfile.objects.all().filter(user__id=self.request.user.id))[0]
        user.first_name = request.data['first_name']
        user.last_name = request.data['last_name']
        user.bio = request.data['bio']
        user.location = request.data['location']
        user.gender = request.data['gender']
        user.save()
        print(request.data)
        print(user)
        return Response({"message": "User profile updated successfully!"}, status=200)

    def delete(self, request, *args, **kwargs):
        user = UserProfile.objects.get(user__id=self.request.user.id)
        user.first_name = ''
        user.last_name = ''
        user.bio = ''
        user.location = ''
        user.gender = ''
        user.save()
        return Response({"message": "Profile updated successfully"}, status=200)


class ConfirmRegisterView(generics.CreateAPIView):
    serializer_class = ConfirmUserRegisterSerializer
    # queryset = User.objects.all()

    def post(self, request, *args, **kwargs):
        # serializer = ConfirmUserRegisterSerializer(data=request.data)
        try:
            token = kwargs['token']
            access_token = AccessToken(token)
            user_id = access_token.get('user_id')
            user = list(User.objects.filter(id=user_id))[0]
            user.is_active = True
            user.save()
        except TokenError:
            return Response({"error": "Invalid token"}, status=400)
        return Response({"message": "User activated successfully"}, status=200)


class LoginView(TokenObtainPairView):
    queryset = User.objects.all()
    serializer_class = LoginSerializer
