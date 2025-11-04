-- Active: 1762240285975@@localhost@5432@postgres
CREATE DATABASE universe;

CREATE TABLE galaxy (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    type VARCHAR(50),
    description TEXT,
    distance_from_earth INT,
    population INT,
    number_of_stars NUMERIC NOT NULL,
    is_active BOOLEAN DEFAULT TRUE
);

ALTER TABLE galaxy RENAME COLUMN id TO galaxy_id;
ALTER TABLE galaxy ADD CONSTRAINT unique_galaxy_name UNIQUE (name);

ALTER TABLE galaxy ALTER COLUMN distance_from_earth TYPE VARCHAR(50);

ALTER TABLE galaxy ALTER COLUMN population TYPE BIGINT;

ALTER TABLE galaxy ALTER COLUMN number_of_stars TYPE VARCHAR(50);

ALTER TABLE galaxy ADD COLUMN age INT;

DELETE FROM galaxy;
INSERT INTO galaxy (name, type, description, distance_from_earth, population, number_of_stars, is_active, age) VALUES
('Milky Way', 'Spiral', 'Our home galaxy', '100 billion', 8000000000, '250 billion', TRUE, 13600),
('Andromeda', 'Spiral', 'Nearest major galaxy', '2.537 million', 0, '1 trillion', TRUE, 10000),
('Triangulum', 'Spiral', 'Third largest in Local Group', '3 million', 0, '40 billion', TRUE, 12000),
('Sombrero Galaxy', 'Unbarred spiral', 'Notable for its bright nucleus', '29 million', 0, '800 billion', TRUE, 9000),
('Whirlpool Galaxy', 'Spiral', 'Famous for its well-defined spiral arms', '23 million', 0, '100 billion', TRUE, 8000),
('Messier 87', 'Elliptical', 'Known for its supermassive black hole', '53 million', 0, '1 trillion', TRUE, 13000),
('Large Magellanic Cloud', 'Irregular', 'Satellite galaxy of the Milky Way', '163000', 0, '30 billion', TRUE, 13000);

SELECT * FROM galaxy;

CREATE TABLE star (
    star_id SERIAL PRIMARY KEY,
    galaxy_id INT REFERENCES galaxy(galaxy_id),
    name VARCHAR(255) NOT NULL,
    type VARCHAR(50),
    number_of_planets INT,
    age_years NUMERIC NOT NULL,
    has_life BOOLEAN DEFAULT FALSE
);

INSERT INTO star (galaxy_id, name, type, number_of_planets, age_years, has_life) VALUES
(1, 'Sun', 'G-type main-sequence', 8, 4600000000, TRUE),
(2, 'Proxima Centauri', 'Red dwarf', 1, 4500000000, FALSE),
(1, 'Sirius', 'A-type main-sequence', 0, 242000000, FALSE),
(1, 'Betelgeuse', 'Red supergiant', 0, 8000000, FALSE),
(3, 'Alpha Centauri A', 'G-type main-sequence', 0, 5000000000, FALSE),
(3, 'Alpha Centauri B', 'K-type main-sequence', 0, 6000000000, FALSE);

ALTER TABLE star ADD CONSTRAINT unique_star_name UNIQUE (name);

ALTER TABLE star RENAME COLUMN id TO star_id;

CREATE TABLE planet (
    planet_id SERIAL PRIMARY KEY,
    star_id INT REFERENCES star(star_id),
    name VARCHAR(255) NOT NULL,
    type VARCHAR(50),
    description TEXT,
    diameter_km NUMERIC,
    distance_from_star_km INT NOT NULL,
    has_life BOOLEAN DEFAULT FALSE
);

INSERT INTO planet (star_id, name, type, description, diameter_km, distance_from_star_km, has_life) VALUES
(1, 'Earth', 'Terrestrial', 'Our home planet', 12742, 149600000, TRUE),
(1, 'Mars', 'Terrestrial', 'The Red Planet', 6779, 227900000, FALSE),
(2, 'Proxima b', 'Exoplanet', 'Closest exoplanet to Earth', 11400, 7000000, FALSE),
(1, 'Jupiter', 'Gas giant', 'Largest planet in the Solar System', 139820, 778500, FALSE),
(1, 'Saturn', 'Gas giant', 'Known for its prominent ring system', 116460, 1433000, FALSE),
(1, 'Venus', 'Terrestrial', 'Second planet from the Sun', 12104, 108200000, FALSE),
(1, 'Mercury', 'Terrestrial', 'Closest planet to the Sun', 4879, 57900000, FALSE),
(1, 'Neptune', 'Ice giant', 'Farthest known planet in the Solar System', 49244, 4495000, FALSE),
(1, 'Uranus', 'Ice giant', 'Known for its unique tilt', 50724, 2871000, FALSE),
(1, 'Titan', 'Moon of Saturn', 'Second largest moon in the Solar System', 5150, 1222000, FALSE),
(1, 'Europa', 'Moon of Jupiter', 'Icy moon with a subsurface ocean', 3122, 670900, FALSE),
(1, 'Ganymede', 'Moon of Jupiter', 'Largest moon in the Solar System', 5268, 1070400, FALSE);

ALTER TABLE planet ADD CONSTRAINT unique_planet_name UNIQUE (name);

CREATE TABLE moon (
    moon_id SERIAL PRIMARY KEY,
    planet_id INT REFERENCES planet(planet_id),
    name VARCHAR(255) NOT NULL,
    diameter_km NUMERIC,
    description TEXT,
    distance_from_planet_km NUMERIC NOT NULL,
    has_life BOOLEAN DEFAULT FALSE
);

ALTER TABLE moon ADD CONSTRAINT unique_moon_name UNIQUE (name);

INSERT INTO moon (planet_id, name, diameter_km, description, distance_from_planet_km, has_life) VALUES
(1, 'Moon', 3474.8, 'Earth''s only natural satellite', 384400, FALSE),
(2, 'Phobos', 22.2, 'Larger and closer of Mars'' two moons', 9376, FALSE),
(2, 'Deimos', 12.4, 'Smaller and farther of Mars'' two moons', 23463, FALSE),
(4, 'Io', 3643.2, 'Most volcanically active body in the Solar System', 421700, FALSE),
(5, 'Rhea', 1527.6, 'Second largest moon of Saturn', 527040, FALSE),
(5, 'Iapetus', 1469.6, 'Known for its two-tone coloration', 3561000, FALSE),
(6, 'Aphrodite', 12104, 'Venus has no moons', 0, FALSE),
(7, 'Mercury has no moons', 0, 'Mercury has no moons', 0, FALSE),
(8, 'Triton', 2706.8, 'Largest moon of Neptune', 354800, FALSE),
(9, 'Miranda', 471.6, 'One of Uranus''s moons with extreme geological features', 129900, FALSE),
(10, 'Enceladus', 504.2, 'Icy moon of Saturn with geysers', 237000, FALSE),
(11, 'Titania', 1577.8, 'Largest moon of Uranus', 436300, FALSE),
(12, 'Oberon', 1522.8, 'Second largest moon of Uranus', 583500, FALSE),
(4, 'Europa', 3122.6, 'Icy moon of Jupiter with a subsurface ocean', 670900, FALSE),
(4, 'Ganymede', 5268.2, 'Largest moon in the Solar System', 1070400, FALSE),
(4, 'Callisto', 4820.6, 'Heavily cratered moon of Jupiter', 1882700, FALSE),
(5, 'Dione', 1122.8, 'Moon of Saturn with a mix of ice and rock', 377400, FALSE),
(5, 'Tethys', 1060.8, 'Icy moon of Saturn', 294600, FALSE),
(8, 'Nereid', 340, 'Third largest moon of Neptune', 5517000, FALSE),
(9, 'Ariel', 1157.8, 'Fourth largest moon of Uranus', 191020, FALSE),
(9, 'Umbriel', 1169.4, 'Third largest moon of Uranus', 266000, FALSE),
(10, 'Mimas', 396.4, 'Small moon of Saturn known for its large crater', 185520, FALSE),
(10, 'Hyperion', 270, 'Irregularly shaped moon of Saturn', 1481000, FALSE);

CREATE TABLE asteroid_belt (
    belt_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    distance_from_sun_km NUMERIC NOT NULL,
    number_of_asteroids INT,
    is_active BOOLEAN DEFAULT TRUE
);

ALTER TABLE asteroid_belt RENAME COLUMN belt_id TO asteroid_belt_id;

ALTER TABLE asteroid_belt ADD CONSTRAINT unique_belt_name UNIQUE (name);

INSERT INTO asteroid_belt (name, description, distance_from_sun_km, number_of_asteroids, is_active) VALUES
('Main Asteroid Belt', 'Located between Mars and Jupiter', 329000000, 1000000, TRUE),
('Kuiper Belt', 'Beyond Neptune''s orbit', 4500000000, 1000000000, TRUE),
('Oort Cloud', 'Spherical shell surrounding the solar system', 50000000000, NULL, FALSE),
('Hungaria Family', 'Inner asteroid belt group', 180000000, 8000, TRUE),
('Hilda Group', 'Asteroids in 3:2 resonance with Jupiter', 400000000, 4000, TRUE),
('Trojans', 'Asteroids sharing Jupiter''s orbit', 778500000, 6000, TRUE),
('Centaurs', 'Objects between Jupiter and Neptune', 1500000000, 500, TRUE),
('Scattered Disc', 'Distant region of the solar system', 6000000000, 2000, TRUE),
('Neptune Trojans', 'Asteroids sharing Neptune''s orbit', 4500000000, 100, TRUE),
('Mars Trojans', 'Asteroids sharing Mars''s orbit', 227900000, 10, TRUE),
('Jupiter Family Comets', 'Short-period comets influenced by Jupiter', 778500000, 3000, TRUE),
('Damocloids', 'Unusual asteroids with comet-like orbits', 1000000000, 50, TRUE),
('Main Belt Comets', 'Comets located in the main asteroid belt', 329000000, 20, TRUE),
('Trans-Neptunian Objects', 'Objects beyond Neptune', 4500000000, 10000, TRUE),
('Inner Oort Cloud', 'Region between Kuiper Belt and Oort Cloud', 2000000000, 5000, FALSE),
('Outer Oort Cloud', 'Distant part of the Oort Cloud', 100000000000, 10000, FALSE),
('Vulcanoids', 'Hypothetical asteroids inside Mercury''s orbit', 57900000, 0, FALSE),
('Phocaeans', 'Asteroids with high inclination orbits', 300000000, 1500, TRUE),
('Alinda Group', 'Asteroids in 3:1 resonance with Jupiter', 400000000, 2000, TRUE),
('Griqua Group', 'Asteroids in 2:1 resonance with Jupiter', 450000000, 1000, TRUE),
('Cybele Group', 'Asteroids in outer main belt', 450000000, 3000, TRUE),
('Hecuba Gap', 'Kirkwood gap in the asteroid belt', 400000000, 0, TRUE),
('Eunomia Family', 'Asteroid family in the main belt', 300000000, 5000, TRUE),
('Koronis Family', 'Asteroid family in the main belt', 400000000, 4000, TRUE),
('Themis Family', 'Asteroid family in the outer main belt', 450000000, 6000, TRUE),
('Flora Family', 'Asteroid family in the inner main belt', 250000000, 7000, TRUE),
('Vesta Family', 'Asteroid family associated with Vesta', 350000000, 3000, TRUE);


# Dump in terminal, run:
pg_dump -cC --inserts -U admin universe > universe.sql

# To restore the database, run:
psql --username=admin --dbname=postgres
psql -U postgres < universe.sql