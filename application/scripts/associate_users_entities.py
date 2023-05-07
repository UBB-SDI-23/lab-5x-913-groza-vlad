import random

from django.contrib.auth.models import User
from players.models import FootballPlayer, FootballClub, Competition, Record

def run():
    users = User.objects.all()

    for fc in FootballClub.objects.all():
        fc.user_id = random.choice(users).id
        fc.save()

    for fp in FootballPlayer.objects.all():
        fp.user_id = random.choice(users).id
        fp.save()

    for comp in Competition.objects.all():
        comp.user_id = random.choice(users).id
        comp.save()

    for record in Record.objects.all():
        record.user_id = random.choice(users).id
        record.save()
