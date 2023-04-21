from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from .views import player_detail, player_list, club_detail, club_list, PlayersWithAge, \
    competition_list, competition_detail, record_list, record_detail, ClubsTrophiesSummary, FootballClubView, \
    FootballClubDetail, FootballClubCompetitionsView, FootballClubCompetitionsDetail, ClubsByAveragePlayersAge, \
    CompetitionsFootballClubDetail, PlayerClubDetail

urlpatterns = [
    path('players/', player_list),
    path('players/<int:pk>/', player_detail),
    path('clubs/', club_list),
    path('clubs/<int:pk>/', club_detail),
    path('players/filter-age/', PlayersWithAge.as_view()),
    path('competitions/', competition_list),
    path('competitions/<int:pk>/', competition_detail),
    path('records/', record_list),
    path('records/<int:pk>/', record_detail),
    path('clubs/most-trophies/', ClubsTrophiesSummary.as_view()),
    path('clubs/avg_age/', ClubsByAveragePlayersAge.as_view()),
    path('clubs/players/', FootballClubView.as_view()),
    path('clubs/<int:pk>/players/', FootballClubDetail.as_view()),
    path('clubs/competitions/', FootballClubCompetitionsView.as_view()),
    path('clubs/<int:pk>/competitions/', FootballClubCompetitionsDetail.as_view()),
    path('competitions/<int:pk>/clubs/', CompetitionsFootballClubDetail.as_view()),
    path('players/<int:pk>/club/', PlayerClubDetail.as_view()),
]

urlpatterns = format_suffix_patterns(urlpatterns)
