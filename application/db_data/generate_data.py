import random
import csv
from multiprocessing import Process

from faker import Faker

fake = Faker()

FOOTBALL_CLUBS = 1000000
PLAYERS = 1000000
COMPETITIONS = 1000000
RECORDS = 10000000

clubs = [
    ('FC Barcelona', 'Spain', 'Barcelona'),
    ('Real Madrid', 'Spain', 'Madrid'),
    ('Manchester United', 'England', 'Manchester'),
    ('Chelsea', 'England', 'London'),
    ('Juventus', 'Italy', 'Turin'),
    ('AC Milan', 'Italy', 'Milano'),
    ('Bayern Munich', 'Germany', 'Munich'),
    ('Paris Saint-Germain', 'France', 'Paris'),
    ('SL Benfica', 'Portugal', 'Lisbon'),
    ('Ajax', 'Netherlands', 'Amsterdam'),
    ('Borussia Dortmund', 'Germany', 'Dortmund'),
    ('Liverpool', 'England', 'Liverpool'),
    ('Arsenal', 'England', 'London'),
    ('Inter Milano', 'Italy', 'Milano'),
    ('FC Porto', 'Portugal', 'Porto'),
    ('Atletico Madrid', 'Spain', 'Madrid'),
    ('AS Roma', 'Italy', 'Rome'),
    ('Tottenham Hotspur', 'England', 'London'),
    ('Manchester City', 'England', 'Manchester'),
    ('FC Shakhtar Donetsk', 'Ukraine', 'Donetsk'),
    ('FC Zenit', 'Russia', 'Saint Petersburg'),
    ('Olympique Lyonnais', 'France', 'Lyon'),
    ('FC Schalke 04', 'Germany', 'Gelsenkirchen'),
    ('FC Basel', 'Switzerland', 'Basel'),
    ('FC Bayern', 'Germany', 'Munich'),
    ('CFR 1907 Cluj', 'Romania', 'Cluj-Napoca'),
    ('FC Dynamo Kyiv', 'Ukraine', 'Kyiv'),
    ('FC Salzburg', 'Austria', 'Salzburg'),
    ('FC Red Bull Salzburg', 'Austria', 'Salzburg'),
    ('FC Lokomotiv Moscow', 'Russia', 'Moscow'),
    ('FC Krasnodar', 'Russia', 'Krasnodar'),
    ('FC Sevilla', 'Spain', 'Sevilla'),
    ('SSC Napoli', 'Italy', 'Napoli'),
]

competitions = [
    ('UEFA Champions League', 32),
    ('UEFA Europa League', 32),
    ('UEFA Super Cup', 2),
    ('UEFA Youth League', 32),
    ('Premier League', 20),
    ('FA Cup', 128),
    ('EFL Cup', 32),
    ('Serie A', 20),
    ('Coppa Italia', 128),
    ('Supercoppa Italiana', 2),
    ('Bundesliga', 18),
    ('DFB-Pokal', 128),
    ('DFL-Supercup', 2),
    ('La Liga', 20),
    ('Copa del Rey', 128),
    ('Supercopa de España', 4),
    ('Ligue 1', 20),
    ('Coupe de France', 128),
    ('Superliga', 16),
    ('Copa do Brasil', 128),
    ('Copa Libertadores', 32),
    ('Copa Sudamericana', 32),
    ('Copa America', 16),
    ('Eredivisie', 18),
    ('Jupiler Pro League', 16),
    ('Scottish Premiership', 12),
]


def create_football_clubs():
    print('Creating football clubs...')
    with open('football_clubs.csv', 'w', newline='') as f:
        fieldnames = ['id', 'name', 'establishment_year', 'country', 'city', 'budget', 'home_kit']
        writer = csv.writer(f, fieldnames=fieldnames)
        # writer.writeheader()
        for i in range(len(clubs)):
            est_year = random.randint(1850, 2023)
            budget = random.randint(10000000, 1000000000)
            home_kit = fake.color_name()
            writer.writerow([i + 1, clubs[i][0], est_year, clubs[i][1],
                             clubs[i][2], budget, home_kit])

        for i in range(len(clubs) + 1, FOOTBALL_CLUBS + 1):
            est_year = random.randint(1850, 2023)
            budget = random.randint(10000000, 1000000000)
            home_kit = fake.color_name()
            rand_club = random.choice(clubs)
            name = rand_club[0] + '_' + str(random.randint(1, 1000))
            country = rand_club[1]
            city = rand_club[2]
            writer.writerow([i, name, est_year, country, city,
                             budget, home_kit])

    print('Football clubs created\n')


def create_competitions():
    print('Creating competitions...')
    with open('competitions.csv', 'w', newline='') as f:
        fieldnames = ['id', 'name', 'number_of_participants', 'total_prizes', 'ko_stages', 'edition', 'description']
        writer = csv.writer(f, fieldnames=fieldnames)
        # writer.writeheader()
        for i in range(len(competitions)):
            total_prizes = random.randint(2000000, 500000000)
            ko_stages = random.choice([True, False])
            edition = random.randint(1, 130)
            competition_description = "\n".join(fake.paragraphs(nb=3))
            writer.writerow([i + 1, competitions[i][0], competitions[i][1],
                             total_prizes, ko_stages, edition,
                             competition_description])

        for i in range(len(competitions) + 1, COMPETITIONS + 1):
            name = random.choice(competitions)[0] + '_' + str(random.randint(1, 1000))
            no_of_teams = random.choice([2, 4, 8, 16, 32, 64, 128])
            total_prizes = random.randint(2000000, 500000000)
            ko_stages = random.choice([True, False])
            edition = random.randint(1, 130)
            competition_description = "\n".join(fake.paragraphs(nb=2))
            writer.writerow([i, name, no_of_teams, total_prizes,
                             ko_stages, edition, competition_description])

    print('Competitions created\n')


def create_players():
    print('Creating players...')
    with open('players.csv', 'w', newline='') as f:
        fieldnames = ['id', 'first_name', 'last_name', 'nationality', 'age', 'position', 'club']
        writer = csv.writer(f, fieldnames=fieldnames)
        # writer.writeheader()
        for i in range(1, PLAYERS + 1):
            first_name = fake.first_name()
            last_name = fake.last_name()
            nationality = fake.country()
            age = random.randint(16, 40)
            position = random.choice(['Goalkeeper', 'Defender', 'Midfielder', 'Forward'])
            club_id = random.randint(1, FOOTBALL_CLUBS)
            writer.writerow(
                [i, first_name, last_name, nationality, age,
                 position, club_id])

    print('Players created\n')


def create_records():
    print('Creating records...')

    unique_records = set()
    for r in range(RECORDS):
        while True:
            club_id = random.randint(1, FOOTBALL_CLUBS)
            competition_id = random.randint(1, COMPETITIONS)
            if (club_id, competition_id) not in unique_records:
                unique_records.add((club_id, competition_id))
                break

    with open('records.csv', 'w', newline='') as f:
        fieldnames = ['id', 'club', 'competition', 'trophies_won', 'participations']
        writer = csv.writer(f, fieldnames=fieldnames)
        # writer.writeheader()

        index = 0
        for club_id, competition_id in unique_records:
            trophies_won = random.randint(0, 40)
            no_of_participations = random.randint(1, 100)
            index += 1
            writer.writerow([index, club_id, competition_id, trophies_won,
                             no_of_participations])

    print('Records created\n')


if __name__ == '__main__':
    processes = []
    for create_data in [create_football_clubs(),
                        create_competitions(),
                        create_players(),
                        create_records()]:
        proc = Process(target=create_data)
        processes.append(proc)
        proc.start()

    for proc in processes:
        proc.join()

    print("Done generating data!")
