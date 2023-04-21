

-- delete data from tables
TRUNCATE TABLE players_footballclub;
TRUNCATE TABLE players_footballplayer;
TRUNCATE TABLE players_competition;
TRUNCATE TABLE players_record;

GO

-- insert data from the CSV files into tables
COPY players_footballclub FROM 'football_clubs.csv' CSV HEADER;
COPY players_footballplayer FROM 'players.csv' CSV HEADER;
COPY players_competition FROM 'competitions.csv' CSV HEADER;
COPY players_record FROM 'records.csv' CSV HEADER;

GO

