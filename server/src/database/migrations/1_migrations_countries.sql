CREATE TABLE IF NOT EXISTS "country" (
	"idCountry"	INTEGER NOT NULL,
	"name"	TEXT,
	"code"	TEXT,
	"continent"	TEXT,
	"ranking"	INTEGER,
	"nationalTeam"	INTEGER,
	PRIMARY KEY("idCountry")
);