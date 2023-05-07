from django.contrib.auth.models import User
from django.core.validators import MaxValueValidator, MinValueValidator
from django.db import models

'''
from pygments.lexers import get_all_lexers
from pygments.styles import get_all_styles

LEXERS = [item for item in get_all_lexers() if item[1]]
LANGUAGE_CHOICES = sorted([(item[1][0], item[0]) for item in LEXERS])
STYLE_CHOICES = sorted([(item, item) for item in get_all_styles()])
'''


# Create your models here.
class FootballClub(models.Model):
    name = models.CharField(max_length=100)
    establishment_year = models.PositiveIntegerField(validators=[MinValueValidator(1850), MaxValueValidator(2023)])
    country = models.CharField(max_length=100)
    city = models.CharField(max_length=150, default='')
    budget = models.PositiveIntegerField()
    home_kit = models.CharField(max_length=30)
    competitions = models.ManyToManyField('Competition', through='Record')
    user = models.ForeignKey(User, on_delete=models.CASCADE, default=1)

    def __str__(self):
        return self.name

    @property
    def players(self):
        return self.footballplayer_set.all()


class FootballPlayer(models.Model):
    # id = models.PositiveIntegerField(primary_key=True, editable=False)
    first_name = models.CharField(max_length=50, default='')
    last_name = models.CharField(max_length=50, default='', blank=True, null=True)
    nationality = models.CharField(max_length=100)
    age = models.PositiveIntegerField(validators=[MinValueValidator(16), MaxValueValidator(40)])
    position = models.CharField(max_length=20, default='')
    club = models.ForeignKey(FootballClub, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE, default=1)

    def __str__(self):
        return self.first_name + " " + self.last_name

    class Meta:
        ordering = ['last_name', 'first_name']


class Competition(models.Model):
    name = models.CharField(max_length=100)
    number_of_participants = models.PositiveIntegerField()
    total_prizes = models.PositiveIntegerField()
    ko_stages = models.BooleanField(default=False)
    edition = models.PositiveIntegerField(default=1)
    description = models.CharField(max_length=3000, default='', blank=True, null=True)
    clubs = models.ManyToManyField('FootballClub', through='Record')
    user = models.ForeignKey(User, on_delete=models.CASCADE, default=1)

    def __str__(self):
        return self.name


class Record(models.Model):
    club = models.ForeignKey(FootballClub, on_delete=models.CASCADE)
    competition = models.ForeignKey(Competition, on_delete=models.CASCADE)
    trophies_won = models.PositiveIntegerField(default=0)
    no_of_participations = models.PositiveIntegerField(default=1)
    user = models.ForeignKey(User, on_delete=models.CASCADE, default=1)


class UserProfile(models.Model):
    first_name = models.CharField(max_length=100, default='')
    last_name = models.CharField(max_length=100, default='')
    bio = models.CharField(max_length=1000, default='', blank=True, null=True)
    location = models.CharField(max_length=100, default='', blank=True, null=True)
    gender = models.CharField(max_length=10, default='', blank=True, null=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, default=1)

    @property
    def entities_added(self):
        clubs = FootballClub.objects.filter(user=self.user).count()
        players = FootballPlayer.objects.filter(user=self.user).count()
        competitions = Competition.objects.filter(user=self.user).count()
        records = Record.objects.filter(user=self.user).count()
        return clubs + players + competitions + records
