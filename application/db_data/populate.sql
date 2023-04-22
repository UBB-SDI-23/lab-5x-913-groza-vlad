

-- drop constraints
ALTER TABLE players_record DROP CONSTRAINT players_record_club_id_34ed57d6_fk_players_footballclub_id;
ALTER TABLE players_record DROP CONSTRAINT players_record_competition_id_f0e666e7_fk_players_c;
ALTER TABLE players_footballplayer DROP CONSTRAINT players_footballplay_club_id_c0f157b9_fk_players_f;

GO

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
-- COPY players_record FROM 'records.csv' CSV HEADER;

GO

-- add constraints
ALTER TABLE players_footballplayer ADD CONSTRAINT players_footballplay_club_id_c0f157b9_fk_players_f FOREIGN KEY (club_id) REFERENCES players_footballclub(id);
ALTER TABLE players_record ADD CONSTRAINT players_record_club_id_34ed57d6_fk_players_footballclub_id FOREIGN KEY (club_id) REFERENCES players_footballclub(id),
ALTER TABLE players_record ADD CONSTRAINT players_record_competition_id_f0e666e7_fk_players_c FOREIGN KEY (competition_id) REFERENCES players_competition(id);

GO