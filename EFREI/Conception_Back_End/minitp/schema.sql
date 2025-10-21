CREATE TABLE trainer (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  level INT NOT NULL DEFAULT 1,
  experience INT NOT NULL DEFAULT 0
);

CREATE TABLE pokemon (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  life_point INT NOT NULL,
  max_life_point INT NOT NULL,
  trainer_id INT REFERENCES trainer(id) ON DELETE SET NULL
);

CREATE TABLE attack (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  damage INT NOT NULL,
  usage_limit INT NOT NULL
);

CREATE TABLE pokemon_attack (
  pokemon_id INT REFERENCES pokemon(id) ON DELETE CASCADE,
  attack_id INT REFERENCES attack(id) ON DELETE CASCADE,
  current_usage INT NOT NULL DEFAULT 0,
  PRIMARY KEY (pokemon_id, attack_id)
);