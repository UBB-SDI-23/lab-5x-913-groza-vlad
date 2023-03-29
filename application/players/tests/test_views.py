from rest_framework import status
from rest_framework.test import APITestCase

from players.models import FootballClub, FootballPlayer, Competition, Record


class NonCRUDFunctionalitiesTest(APITestCase):
    @classmethod
    def setUpTestData(cls):
        FootballClub.objects.create(name="FC Bayern Munchen", establishment_year=1900, country="Germany", city="Munchen", budget=170000000, home_kit="Red")
        FootballClub.objects.create(name="Barcelona", establishment_year=1899, country="Spain", city="Barcelona", budget=100000000, home_kit="Blue/Red")
        FootballClub.objects.create(name="Chelsea FC", establishment_year=1905, country="England", city="London", budget=625000000, home_kit="Blue")

        FootballPlayer.objects.create(first_name="Pedri", last_name="Gonzalez", nationality="Spain", age=20, position="Midfielder", club=FootballClub.objects.get(name="Barcelona"))
        FootballPlayer.objects.create(first_name="Joao", last_name="Felix", nationality="Portugal", age=23, position="Forward", club=FootballClub.objects.get(name="Chelsea FC"))
        FootballPlayer.objects.create(first_name="Dayot", last_name="Upamecano", nationality="France", age=24, position="Defender", club=FootballClub.objects.get(name="FC Bayern Munchen"))
        FootballPlayer.objects.create(first_name="Ousmane", last_name="Dembele", nationality="France", age=25, position="Forward", club=FootballClub.objects.get(name="Barcelona"))

        Competition.objects.create(name="UEFA Champions League", number_of_participants=32, total_prizes=500000000, ko_stages=True, edition=68)
        Competition.objects.create(name="Primera Division", number_of_participants=20, total_prizes=1150000000, ko_stages=False, edition=94)
        Competition.objects.create(name="Bundesliga", number_of_participants=18, total_prizes=1032000000, ko_stages=False, edition=59)
        Competition.objects.create(name="Premier League", number_of_participants=20, total_prizes=2500000000, ko_stages=False, edition=31)

        Record.objects.create(trophies_won=5, no_of_participations=34, club=FootballClub.objects.get(name="Barcelona"), competition=Competition.objects.get(name="UEFA Champions League"))
        Record.objects.create(trophies_won=26, no_of_participations=94, club=FootballClub.objects.get(name="Barcelona"), competition=Competition.objects.get(name="Primera Division"))
        Record.objects.create(trophies_won=2, no_of_participations=18, club=FootballClub.objects.get(name="Chelsea FC"), competition=Competition.objects.get(name="UEFA Champions League"))
        Record.objects.create(trophies_won=5, no_of_participations=31, club=FootballClub.objects.get(name="Chelsea FC"), competition=Competition.objects.get(name="Premier League"))
        Record.objects.create(trophies_won=6, no_of_participations=39, club=FootballClub.objects.get(name="FC Bayern Munchen"), competition=Competition.objects.get(name="UEFA Champions League"))
        Record.objects.create(trophies_won=31, no_of_participations=54, club=FootballClub.objects.get(name="FC Bayern Munchen"), competition=Competition.objects.get(name="Bundesliga"))

    def test_filter(self):
        response_age_22 = self.client.get("/players/filter-age/?age=22")
        self.assertEqual(response_age_22.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response_age_22.data), 3)

        response_age_24 = self.client.get("/players/filter-age/?age=24")
        self.assertEqual(response_age_24.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response_age_24.data), 1)

        delete_player = self.client.delete("/players/2/")
        self.assertEqual(delete_player.status_code, status.HTTP_204_NO_CONTENT)
        response_age_22 = self.client.get("/players/filter-age/?age=22")
        self.assertEqual(response_age_22.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response_age_22.data), 2)

        response_age_30 = self.client.get("/players/filter-age/?age=30")
        self.assertEqual(response_age_30.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response_age_30.data), 0)

    def test_clubs_trophies_report(self):
        response_clubs = self.client.get("/clubs/")
        self.assertEqual(len(response_clubs.data), 3)

        response_competitions = self.client.get("/competitions/")
        self.assertEqual(len(response_competitions.data), 4)

        response_records = self.client.get("/records/")
        self.assertEqual(len(response_records.data), 6)

        response_total_trophies = self.client.get("/clubs/most-trophies/")
        self.assertEqual(response_total_trophies.status_code, status.HTTP_200_OK)

        club1 = response_total_trophies.data[0]
        self.assertEqual(club1['name'], "FC Bayern Munchen")
        self.assertEqual(club1['total_trophies'], 37)
        club2 = response_total_trophies.data[1]
        self.assertEqual(club2['name'], "Barcelona")
        self.assertEqual(club2['total_trophies'], 31)
        club3 = response_total_trophies.data[2]
        self.assertEqual(club3['name'], "Chelsea FC")
        self.assertEqual(club3['total_trophies'], 7)

    def test_clubs_avg_age_report(self):
        response_total_trophies = self.client.get("/clubs/avg_age/")
        self.assertEqual(response_total_trophies.status_code, status.HTTP_200_OK)

        club1 = response_total_trophies.data[0]
        self.assertEqual(club1['name'], "Barcelona")
        self.assertEqual(club1['average_age'], 22.5)
        club2 = response_total_trophies.data[1]
        self.assertEqual(club2['name'], "Chelsea FC")
        self.assertEqual(club2['average_age'], 23)
        club3 = response_total_trophies.data[2]
        self.assertEqual(club3['name'], "FC Bayern Munchen")
        self.assertEqual(club3['average_age'], 24)
