from django.http import Http404
from django.shortcuts import render
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.decorators import api_view
from rest_framework import status
from rest_framework.response import Response
from rest_framework import generics
from .models import FootballPlayer, FootballClub, Competition, Record
from .serializers import FootballPlayerSerializer, FootballClubSerializer, CompetitionSerializer, RecordSerializer, \
    ClubRecordSerializer, ClubPlayersSerializer, ClubCompetitionsSerializer, ClubPlayersAgeSerializer, \
    CompetitionClubsSerializer, PlayerClubSerializer
from django_filters import rest_framework as filters
from django.db.models import Sum, Avg


@api_view(['GET', 'POST'])
def player_list(request, format=None):
    '''
    List all the players / create a new player
    '''
    if request.method == 'GET':
        players = FootballPlayer.objects.all()
        serializer = FootballPlayerSerializer(players, many=True)
        return Response(serializer.data)
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
        serializer = PlayerClubSerializer(player, data=request.data)
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
        serializer = FootballClubSerializer(clubs, many=True)
        return Response(serializer.data)
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

    def get_queryset(self):
        return self.queryset


@api_view(['GET', 'POST'])
def competition_list(request, format=None):
    '''
    List all the competitions / add a new competition
    '''
    if request.method == 'GET':
        competitions = Competition.objects.all()
        serializer = CompetitionSerializer(competitions, many=True)
        return Response(serializer.data)
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
        serializer = RecordSerializer(records, many=True)
        return Response(serializer.data)
    elif request.method == 'POST':
        serializer = RecordSerializer(data=request.data)
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

    def get_queryset(self):
        query = FootballClub.objects.\
            annotate(total_trophies=Sum('record__trophies_won')).\
            values('id', 'name', 'total_trophies').\
            order_by('-total_trophies')
        print(query.query)

        return query


class ClubsByAveragePlayersAge(generics.ListAPIView):
    serializer_class = ClubPlayersAgeSerializer

    def get_queryset(self):
        query = FootballClub.objects.\
            annotate(average_age=Avg('footballplayer__age')).\
            order_by('average_age')
        print(query.query)

        return query


class FootballClubView(generics.ListCreateAPIView):
    serializer_class = ClubPlayersSerializer
    queryset = FootballClub.objects.all()


class FootballClubDetail(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = ClubPlayersSerializer
    queryset = FootballClub.objects.all()


class FootballClubCompetitionsView(generics.ListCreateAPIView):
    serializer_class = ClubCompetitionsSerializer
    queryset = FootballClub.objects.all()


class FootballClubCompetitionsDetail(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = ClubCompetitionsSerializer
    queryset = FootballClub.objects.all()


class CompetitionsFootballClubDetail(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = CompetitionClubsSerializer
    queryset = Competition.objects.all()
