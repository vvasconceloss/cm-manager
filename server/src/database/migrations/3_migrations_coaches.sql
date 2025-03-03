CREATE TABLE IF NOT EXISTS "coach" (
	"idCoach"	INTEGER NOT NULL,
	"name"	TEXT,
	"nationality"	TEXT,
	"currentClub"	INTEGER,
	"isUser"	INTEGER,
	PRIMARY KEY("idCoach"),
	FOREIGN KEY("currentClub") REFERENCES "club"("idClub")
);