CREATE TABLE IF NOT EXISTS "player" (
	"idPlayer"	INTEGER NOT NULL,
	"first_name"	TEXT,
	"surname"	TEXT,
	"full_name"	TEXT,
	"birthDate"	TEXT,
	"nationality"	TEXT,
	"transferValue"	REAL,
	"currentClub"	INTEGER,
	"position" TEXT,
	"age" INTEGER,
	PRIMARY KEY("idPlayer" AUTOINCREMENT),
	FOREIGN KEY("currentClub") REFERENCES "club"("idClub")
);

CREATE TABLE IF NOT EXISTS "player_attributes" (
  "idPlayer" INTEGER NOT NULL,

  -- TECHNICAL
  "finishing" INTEGER,
  "crossing" INTEGER,
  "dribbling" INTEGER,
  "heading" INTEGER,
  "tackling" INTEGER,
  "marking" INTEGER,
  "passing" INTEGER,
  "free_kick" INTEGER,

  --PHYSICAL 
  "acceleration" INTEGER,
  "agility" INTEGER,
  "strength" INTEGER,
  "jumping" INTEGER,

  --MENTAL
  "vision" INTEGER,
  "decision" INTEGER,
  "positioning" INTEGER, 
  "antecipation" INTEGER,
  "aggression" INTEGER,

  --GOALKEEPER 
  "reflexes" INTEGER,
  "handling" INTEGER,
  "diving" INTEGER,

  --EXTRA

  "fatigue" INTEGER DEFAULT 0,
  PRIMARY KEY("idPlayer"),
  FOREIGN KEY("idPlayer") REFERENCES "player"("idPlayer") ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS "player_injury" (
  "idInjury" INTEGER,
  "idPlayer" INTEGER NOT NULL,
  "injuryType" TEXT,
  "recoveryTime" INTEGER,
  "injuryDate" TEXT,
  PRIMARY KEY ("idInjury" AUTOINCREMENT),
  FOREIGN KEY("idPlayer") REFERENCES "player"("idPlayer")
);

CREATE TABLE IF NOT EXISTS "player_suspension" (
  "idSuspension" INTEGER PRIMARY KEY AUTOINCREMENT,
  "idPlayer" INTEGER NOT NULL,
  "suspensionType" TEXT,
  "matchesRemaining" INTEGER,
  FOREIGN KEY("idPlayer") REFERENCES "player"("idPlayer")
);

CREATE TABLE IF NOT EXISTS "player_match_stats" (
  "idMatch" INTEGER,
  "IdPlayer" INTEGER,
  "goals" INTEGER DEFAULT 0,
  "assists" INTEGER DEFAULT 0,
  "passCompleted" INTEGER DEFAULT 0,
  "passFailed" INTEGER DEFAULT 0,
  "shotsOnTarget" INTEGER DEFAULT 0,
  "shotsOffTarget" INTEGER DEFAULT 0,
  "interceptions" INTEGER DEFAULT 0,
  "tackles" INTEGER DEFAULT 0,
  "dribbles" INTEGER DEFAULT 0,
  "foulsCommitted" INTEGER DEFAULT 0,
  "foulsSuffered" INTEGER DEFAULT 0,
  "saves" INTEGER DEFAULT 0,
  "yellowCards" INTEGER DEFAULT 0,
  "redCards" INTEGER DEFAULT 0,
  PRIMARY KEY ("idMatch", "idPlayer")
);

CREATE TABLE IF NOT EXISTS "player_statistics" (
	"idPlayerStat" INTEGER NOT NULL,
  "idPlayer" INTEGER NOT NULL,
  "matchesPlayed" INTEGER DEFAULT 0,
  "goals" INTEGER DEFAULT 0,
  "assists" INTEGER DEFAULT 0,
  "passCompleted" INTEGER DEFAULT 0,
  "passFailed" INTEGER DEFAULT 0,
  "shotsOnTarget" INTEGER DEFAULT 0,
  "shotsOffTarget" INTEGER DEFAULT 0,
  "interceptions" INTEGER DEFAULT 0,
  "tackles" INTEGER DEFAULT 0,
  "dribbles" INTEGER DEFAULT 0,
  "foulsCommitted" INTEGER DEFAULT 0,
  "foulsSuffered" INTEGER DEFAULT 0,
  "saves" INTEGER DEFAULT 0,
  "yellowCards" INTEGER DEFAULT 0,
  "redCards" INTEGER DEFAULT 0,
  PRIMARY KEY("idPlayerStat" AUTOINCREMENT),
  FOREIGN KEY("idPlayer") REFERENCES "player"("idPlayer")
);