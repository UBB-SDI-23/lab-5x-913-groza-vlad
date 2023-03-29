from django import test
from rest_framework.test import APITestCase
from rest_framework import status
from players.models import FootballClub, FootballPlayer


class FootballClubPlayersTest(APITestCase):

    @classmethod
    def setUpTestData(cls):
        FootballClub.objects.create(name="Barcelona", establishment_year=1899, country="Spain", city="Barcelona", budget=100000000, home_kit="Blue/Red")
        FootballClub.objects.create(name="Chelsea FC", establishment_year=1905, country="England", city="London", budget=625000000, home_kit="Blue")

        FootballPlayer.objects.create(first_name="Pedri", last_name="Gonzalez", nationality="Spain", age=20, position="Midfielder", club=FootballClub.objects.get(name="Barcelona"))
        FootballPlayer.objects.create(first_name="Joao", last_name="Felix", nationality="Portugal", age=23, position="Forward", club=FootballClub.objects.get(name="Chelsea FC"))
        FootballPlayer.objects.create(first_name="Ousmane", last_name="Dembele", nationality="France", age=25, position="Forward", club=FootballClub.objects.get(name="Barcelona"))

    def test_club(self):
        response = self.client.get("/clubs/")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 2)

        data = {
            "name": "Manchester City",
            "establishment_year": 1880,
            "country": "England",
            "city": "Manchester",
            "budget": 400000000,
            "home_kit": "Light-Blue/White"
        }
        response_post = self.client.post("/clubs/", data, format='json')
        self.assertEqual(response_post.status_code, status.HTTP_201_CREATED)
        response = self.client.get("/clubs/")
        self.assertEqual(len(response.data), 3)

        response_delete = self.client.delete("/clubs/3/")
        self.assertEqual(response_delete.status_code, status.HTTP_204_NO_CONTENT)
        response = self.client.get("/clubs/")
        self.assertEqual(len(response.data), 2)

        club = FootballClub.objects.get(name="Chelsea FC")
        self.assertEqual(str(club), "Chelsea FC")

    def test_player(self):
        response = self.client.get("/players/")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 3)

        response_delete = self.client.delete("/players/2/")
        self.assertEqual(response_delete.status_code, status.HTTP_204_NO_CONTENT)
        response = self.client.get("/players/")
        self.assertEqual(len(response.data), 2)

        player1 = FootballPlayer.objects.get(first_name="Pedri")
        self.assertEqual(str(player1), "Pedri Gonzalez")

        player2 = FootballPlayer.objects.get(first_name="Ousmane")
        self.assertEqual(str(player2), "Ousmane Dembele")

        response_delete_club = self.client.delete("/clubs/1/")
        self.assertEqual(response_delete_club.status_code, status.HTTP_204_NO_CONTENT)
        response = self.client.get("/players/")
        self.assertEqual(len(response.data), 0)

