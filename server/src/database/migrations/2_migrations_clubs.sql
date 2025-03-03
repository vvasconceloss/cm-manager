CREATE TABLE IF NOT EXISTS "club" (
	"idClub"	INTEGER NOT NULL,
	"name"	TEXT NOT NULL,
	"founded"	INTEGER NOT NULL,
	"nickname"	TEXT,
	"reputation"	INTEGER,
	"logo"	TEXT NOT NULL,
	"formation" TEXT DEFAULT "4-3-3",
	"idStadium"	INTEGER NOT NULL,
	"idCountry"	INTEGER,
	PRIMARY KEY("idClub"),
	FOREIGN KEY("idCountry") REFERENCES "country"("idCountry"),
	FOREIGN KEY("idStadium") REFERENCES "stadium"("idStadium")
);

CREATE TABLE IF NOT EXISTS "club_performance" (
  "idPerformance" INTEGER NOT NULL,
  "idCompetition" INTEGER NOT NULL, 
  "idClub" INTEGER NOT NULL,
  "played" INTEGER DEFAULT 0, 
  "won" INTEGER DEFAULT 0,
  "drawn" INTEGER DEFAULT 0,
  "lost" INTEGER DEFAULT 0,
  "points" INTEGER DEFAULT 0,
	"goalsFor" INTEGER DEFAULT 0,
	"goalsAgainst" INTEGER DEFAULT 0,
	"goalsDifference" INTEGER DEFAULT 0,
  PRIMARY KEY("idPerformance"),
  FOREIGN KEY("idClub") REFERENCES "club"("idClub"),
  FOREIGN KEY("idCompetition") REFERENCES "competition"("idCompetition")
);

CREATE TABLE IF NOT EXISTS "stadium" (
	"idStadium"	INTEGER NOT NULL,
	"name"	TEXT NOT NULL,
	"capacity"	INTEGER NOT NULL,
	"location"	TEXT NOT NULL,
	"yearBuilt"	INTEGER NOT NULL,
	PRIMARY KEY("idStadium")
)