CREATE TABLE IF NOT EXISTS "competition" (
	"idCompetition"	INTEGER NOT NULL,
	"idCountry" INTEGER,
	"name"	TEXT,
	"type"	TEXT,
	"season"	TEXT,
	"logo" TEXT,
	PRIMARY KEY("idCompetition"),
	FOREIGN KEY("idCountry") REFERENCES "country"("idCountry")
);

CREATE TABLE IF NOT EXISTS "competition_results" (
  "idResult" INTEGER NOT NULL,
  "idCompetition" INTEGER NOT NULL,
  "idClub" INTEGER NOT NULL,
  "position" INTEGER,
  "points" INTEGER,
  PRIMARY KEY("idResult"),
  FOREIGN KEY("idClub") REFERENCES "club"("idClub"),
  FOREIGN KEY("idCompetition") REFERENCES "competition"("idCompetition")
);

CREATE TABLE IF NOT EXISTS "season" (
  "idSeason" INTEGER NOT NULL,
  "year" TEXT NOT NULL,
  PRIMARY KEY("idSeason")
);

CREATE TABLE IF NOT EXISTS "match" (
	"idMatch" INTEGER NOT NULL,
  "idCompetition" INTEGER NOT NULL,
  "idHomeClub" INTEGER NOT NULL,
  "idAwayClub" INTEGER NOT NULL,
  "homeScore" INTEGER,
  "awayScore" INTEGER,
  "matchDate" NUMERIC,
  "round" INTEGER DEFAULT 1,
  "status" TEXT DEFAULT 'scheduled',
  "idSeason" INTEGER,
  PRIMARY KEY("idMatch" AUTOINCREMENT),
  FOREIGN KEY("idHomeClub") REFERENCES "club"("idClub"),
  FOREIGN KEY("idAwayClub") REFERENCES "club"("idClub"),
  FOREIGN KEY("idSeason") REFERENCES "season"("idSeason"),
  FOREIGN KEY("idCompetition") REFERENCES "competition"("idCompetition")
);

CREATE TABLE IF NOT EXISTS "match_event" (
  "idMatchEvent" INTEGER NOT NULL,
  "idMatch" INTEGER,
  "minute" INTEGER,
  "seconds" INTEGER,
  "type" TEXT,
  "team" TEXT,
  "idPlayer" INTEGER,
  PRIMARY KEY ("idMatchEvent" AUTOINCREMENT),
  FOREIGN KEY("idMatch") REFERENCES "match"("idMatch"),
  FOREIGN KEY("idPlayer") REFERENCES "player"("idPlayer")
);