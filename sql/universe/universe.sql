--
-- PostgreSQL database dump
--

-- Dumped from database version 12.22 (Ubuntu 12.22-0ubuntu0.20.04.4)
-- Dumped by pg_dump version 12.22 (Ubuntu 12.22-0ubuntu0.20.04.4)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

DROP DATABASE universe;
--
-- Name: universe; Type: DATABASE; Schema: -; Owner: freecodecamp
--

CREATE DATABASE universe WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'C.UTF-8' LC_CTYPE = 'C.UTF-8';


ALTER DATABASE universe OWNER TO freecodecamp;

\connect universe

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: asteroid_belt; Type: TABLE; Schema: public; Owner: freecodecamp
--

CREATE TABLE public.asteroid_belt (
    asteroid_belt_id integer NOT NULL,
    name character varying(255) NOT NULL,
    description text,
    distance_from_sun_km numeric NOT NULL,
    number_of_asteroids integer,
    is_active boolean DEFAULT true
);


ALTER TABLE public.asteroid_belt OWNER TO freecodecamp;

--
-- Name: asteroid_belt_belt_id_seq; Type: SEQUENCE; Schema: public; Owner: freecodecamp
--

CREATE SEQUENCE public.asteroid_belt_belt_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.asteroid_belt_belt_id_seq OWNER TO freecodecamp;

--
-- Name: asteroid_belt_belt_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: freecodecamp
--

ALTER SEQUENCE public.asteroid_belt_belt_id_seq OWNED BY public.asteroid_belt.asteroid_belt_id;


--
-- Name: galaxy; Type: TABLE; Schema: public; Owner: freecodecamp
--

CREATE TABLE public.galaxy (
    galaxy_id integer NOT NULL,
    name character varying(255) NOT NULL,
    type character varying(50),
    description text,
    distance_from_earth character varying(50),
    population bigint,
    number_of_stars character varying(50) NOT NULL,
    is_active boolean DEFAULT true,
    age integer
);


ALTER TABLE public.galaxy OWNER TO freecodecamp;

--
-- Name: galaxy_id_seq; Type: SEQUENCE; Schema: public; Owner: freecodecamp
--

CREATE SEQUENCE public.galaxy_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.galaxy_id_seq OWNER TO freecodecamp;

--
-- Name: galaxy_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: freecodecamp
--

ALTER SEQUENCE public.galaxy_id_seq OWNED BY public.galaxy.galaxy_id;


--
-- Name: moon; Type: TABLE; Schema: public; Owner: freecodecamp
--

CREATE TABLE public.moon (
    moon_id integer NOT NULL,
    planet_id integer,
    name character varying(255) NOT NULL,
    diameter_km numeric,
    description text,
    distance_from_planet_km numeric NOT NULL,
    has_life boolean DEFAULT false
);


ALTER TABLE public.moon OWNER TO freecodecamp;

--
-- Name: moon_moon_id_seq; Type: SEQUENCE; Schema: public; Owner: freecodecamp
--

CREATE SEQUENCE public.moon_moon_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.moon_moon_id_seq OWNER TO freecodecamp;

--
-- Name: moon_moon_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: freecodecamp
--

ALTER SEQUENCE public.moon_moon_id_seq OWNED BY public.moon.moon_id;


--
-- Name: planet; Type: TABLE; Schema: public; Owner: freecodecamp
--

CREATE TABLE public.planet (
    planet_id integer NOT NULL,
    star_id integer,
    name character varying(255) NOT NULL,
    type character varying(50),
    description text,
    diameter_km numeric,
    distance_from_star_km integer NOT NULL,
    has_life boolean DEFAULT false
);


ALTER TABLE public.planet OWNER TO freecodecamp;

--
-- Name: planet_planet_id_seq; Type: SEQUENCE; Schema: public; Owner: freecodecamp
--

CREATE SEQUENCE public.planet_planet_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.planet_planet_id_seq OWNER TO freecodecamp;

--
-- Name: planet_planet_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: freecodecamp
--

ALTER SEQUENCE public.planet_planet_id_seq OWNED BY public.planet.planet_id;


--
-- Name: star; Type: TABLE; Schema: public; Owner: freecodecamp
--

CREATE TABLE public.star (
    star_id integer NOT NULL,
    galaxy_id integer,
    name character varying(255) NOT NULL,
    type character varying(50),
    number_of_planets integer,
    age_years numeric NOT NULL,
    has_life boolean DEFAULT false
);


ALTER TABLE public.star OWNER TO freecodecamp;

--
-- Name: star_star_id_seq; Type: SEQUENCE; Schema: public; Owner: freecodecamp
--

CREATE SEQUENCE public.star_star_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.star_star_id_seq OWNER TO freecodecamp;

--
-- Name: star_star_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: freecodecamp
--

ALTER SEQUENCE public.star_star_id_seq OWNED BY public.star.star_id;


--
-- Name: asteroid_belt asteroid_belt_id; Type: DEFAULT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.asteroid_belt ALTER COLUMN asteroid_belt_id SET DEFAULT nextval('public.asteroid_belt_belt_id_seq'::regclass);


--
-- Name: galaxy galaxy_id; Type: DEFAULT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.galaxy ALTER COLUMN galaxy_id SET DEFAULT nextval('public.galaxy_id_seq'::regclass);


--
-- Name: moon moon_id; Type: DEFAULT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.moon ALTER COLUMN moon_id SET DEFAULT nextval('public.moon_moon_id_seq'::regclass);


--
-- Name: planet planet_id; Type: DEFAULT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.planet ALTER COLUMN planet_id SET DEFAULT nextval('public.planet_planet_id_seq'::regclass);


--
-- Name: star star_id; Type: DEFAULT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.star ALTER COLUMN star_id SET DEFAULT nextval('public.star_star_id_seq'::regclass);


--
-- Data for Name: asteroid_belt; Type: TABLE DATA; Schema: public; Owner: freecodecamp
--

INSERT INTO public.asteroid_belt VALUES (1, 'Main Asteroid Belt', 'Located between Mars and Jupiter', 329000000, 1000000, true);
INSERT INTO public.asteroid_belt VALUES (2, 'Kuiper Belt', 'Beyond Neptune''s orbit', 4500000000, 1000000000, true);
INSERT INTO public.asteroid_belt VALUES (3, 'Oort Cloud', 'Spherical shell surrounding the solar system', 50000000000, NULL, false);
INSERT INTO public.asteroid_belt VALUES (4, 'Hungaria Family', 'Inner asteroid belt group', 180000000, 8000, true);
INSERT INTO public.asteroid_belt VALUES (5, 'Hilda Group', 'Asteroids in 3:2 resonance with Jupiter', 400000000, 4000, true);
INSERT INTO public.asteroid_belt VALUES (6, 'Trojans', 'Asteroids sharing Jupiter''s orbit', 778500000, 6000, true);
INSERT INTO public.asteroid_belt VALUES (7, 'Centaurs', 'Objects between Jupiter and Neptune', 1500000000, 500, true);
INSERT INTO public.asteroid_belt VALUES (8, 'Scattered Disc', 'Distant region of the solar system', 6000000000, 2000, true);
INSERT INTO public.asteroid_belt VALUES (9, 'Neptune Trojans', 'Asteroids sharing Neptune''s orbit', 4500000000, 100, true);
INSERT INTO public.asteroid_belt VALUES (10, 'Mars Trojans', 'Asteroids sharing Mars''s orbit', 227900000, 10, true);
INSERT INTO public.asteroid_belt VALUES (11, 'Jupiter Family Comets', 'Short-period comets influenced by Jupiter', 778500000, 3000, true);
INSERT INTO public.asteroid_belt VALUES (12, 'Damocloids', 'Unusual asteroids with comet-like orbits', 1000000000, 50, true);
INSERT INTO public.asteroid_belt VALUES (13, 'Main Belt Comets', 'Comets located in the main asteroid belt', 329000000, 20, true);
INSERT INTO public.asteroid_belt VALUES (14, 'Trans-Neptunian Objects', 'Objects beyond Neptune', 4500000000, 10000, true);
INSERT INTO public.asteroid_belt VALUES (15, 'Inner Oort Cloud', 'Region between Kuiper Belt and Oort Cloud', 2000000000, 5000, false);
INSERT INTO public.asteroid_belt VALUES (16, 'Outer Oort Cloud', 'Distant part of the Oort Cloud', 100000000000, 10000, false);
INSERT INTO public.asteroid_belt VALUES (17, 'Vulcanoids', 'Hypothetical asteroids inside Mercury''s orbit', 57900000, 0, false);
INSERT INTO public.asteroid_belt VALUES (18, 'Phocaeans', 'Asteroids with high inclination orbits', 300000000, 1500, true);
INSERT INTO public.asteroid_belt VALUES (19, 'Alinda Group', 'Asteroids in 3:1 resonance with Jupiter', 400000000, 2000, true);
INSERT INTO public.asteroid_belt VALUES (20, 'Griqua Group', 'Asteroids in 2:1 resonance with Jupiter', 450000000, 1000, true);
INSERT INTO public.asteroid_belt VALUES (21, 'Cybele Group', 'Asteroids in outer main belt', 450000000, 3000, true);
INSERT INTO public.asteroid_belt VALUES (22, 'Hecuba Gap', 'Kirkwood gap in the asteroid belt', 400000000, 0, true);
INSERT INTO public.asteroid_belt VALUES (23, 'Eunomia Family', 'Asteroid family in the main belt', 300000000, 5000, true);
INSERT INTO public.asteroid_belt VALUES (24, 'Koronis Family', 'Asteroid family in the main belt', 400000000, 4000, true);
INSERT INTO public.asteroid_belt VALUES (25, 'Themis Family', 'Asteroid family in the outer main belt', 450000000, 6000, true);
INSERT INTO public.asteroid_belt VALUES (26, 'Flora Family', 'Asteroid family in the inner main belt', 250000000, 7000, true);
INSERT INTO public.asteroid_belt VALUES (27, 'Vesta Family', 'Asteroid family associated with Vesta', 350000000, 3000, true);


--
-- Data for Name: galaxy; Type: TABLE DATA; Schema: public; Owner: freecodecamp
--

INSERT INTO public.galaxy VALUES (1, 'Milky Way', 'Spiral', 'Our home galaxy', '100 billion', 8000000000, '250 billion', true, 13600);
INSERT INTO public.galaxy VALUES (2, 'Andromeda', 'Spiral', 'Nearest major galaxy', '2.537 million', 0, '1 trillion', true, 10000);
INSERT INTO public.galaxy VALUES (3, 'Triangulum', 'Spiral', 'Third largest in Local Group', '3 million', 0, '40 billion', true, 12000);
INSERT INTO public.galaxy VALUES (4, 'Sombrero Galaxy', 'Unbarred spiral', 'Notable for its bright nucleus', '29 million', 0, '800 billion', true, 9000);
INSERT INTO public.galaxy VALUES (5, 'Whirlpool Galaxy', 'Spiral', 'Famous for its well-defined spiral arms', '23 million', 0, '100 billion', true, 8000);
INSERT INTO public.galaxy VALUES (6, 'Messier 87', 'Elliptical', 'Known for its supermassive black hole', '53 million', 0, '1 trillion', true, 13000);
INSERT INTO public.galaxy VALUES (7, 'Large Magellanic Cloud', 'Irregular', 'Satellite galaxy of the Milky Way', '163000', 0, '30 billion', true, 13000);


--
-- Data for Name: moon; Type: TABLE DATA; Schema: public; Owner: freecodecamp
--

INSERT INTO public.moon VALUES (1, 1, 'Moon', 3474.8, 'Earth''s only natural satellite', 384400, false);
INSERT INTO public.moon VALUES (2, 2, 'Phobos', 22.2, 'Larger and closer of Mars'' two moons', 9376, false);
INSERT INTO public.moon VALUES (3, 2, 'Deimos', 12.4, 'Smaller and farther of Mars'' two moons', 23463, false);
INSERT INTO public.moon VALUES (4, 4, 'Io', 3643.2, 'Most volcanically active body in the Solar System', 421700, false);
INSERT INTO public.moon VALUES (5, 5, 'Rhea', 1527.6, 'Second largest moon of Saturn', 527040, false);
INSERT INTO public.moon VALUES (6, 5, 'Iapetus', 1469.6, 'Known for its two-tone coloration', 3561000, false);
INSERT INTO public.moon VALUES (7, 6, 'Aphrodite', 12104, 'Venus has no moons', 0, false);
INSERT INTO public.moon VALUES (8, 7, 'Mercury has no moons', 0, 'Mercury has no moons', 0, false);
INSERT INTO public.moon VALUES (9, 8, 'Triton', 2706.8, 'Largest moon of Neptune', 354800, false);
INSERT INTO public.moon VALUES (10, 9, 'Miranda', 471.6, 'One of Uranus''s moons with extreme geological features', 129900, false);
INSERT INTO public.moon VALUES (11, 10, 'Enceladus', 504.2, 'Icy moon of Saturn with geysers', 237000, false);
INSERT INTO public.moon VALUES (12, 11, 'Titania', 1577.8, 'Largest moon of Uranus', 436300, false);
INSERT INTO public.moon VALUES (13, 12, 'Oberon', 1522.8, 'Second largest moon of Uranus', 583500, false);
INSERT INTO public.moon VALUES (14, 4, 'Europa', 3122.6, 'Icy moon of Jupiter with a subsurface ocean', 670900, false);
INSERT INTO public.moon VALUES (15, 4, 'Ganymede', 5268.2, 'Largest moon in the Solar System', 1070400, false);
INSERT INTO public.moon VALUES (16, 4, 'Callisto', 4820.6, 'Heavily cratered moon of Jupiter', 1882700, false);
INSERT INTO public.moon VALUES (17, 5, 'Dione', 1122.8, 'Moon of Saturn with a mix of ice and rock', 377400, false);
INSERT INTO public.moon VALUES (18, 5, 'Tethys', 1060.8, 'Icy moon of Saturn', 294600, false);
INSERT INTO public.moon VALUES (19, 8, 'Nereid', 340, 'Third largest moon of Neptune', 5517000, false);
INSERT INTO public.moon VALUES (20, 9, 'Ariel', 1157.8, 'Fourth largest moon of Uranus', 191020, false);
INSERT INTO public.moon VALUES (21, 9, 'Umbriel', 1169.4, 'Third largest moon of Uranus', 266000, false);
INSERT INTO public.moon VALUES (22, 10, 'Mimas', 396.4, 'Small moon of Saturn known for its large crater', 185520, false);
INSERT INTO public.moon VALUES (23, 10, 'Hyperion', 270, 'Irregularly shaped moon of Saturn', 1481000, false);


--
-- Data for Name: planet; Type: TABLE DATA; Schema: public; Owner: freecodecamp
--

INSERT INTO public.planet VALUES (1, 1, 'Earth', 'Terrestrial', 'Our home planet', 12742, 149600000, true);
INSERT INTO public.planet VALUES (2, 1, 'Mars', 'Terrestrial', 'The Red Planet', 6779, 227900000, false);
INSERT INTO public.planet VALUES (3, 2, 'Proxima b', 'Exoplanet', 'Closest exoplanet to Earth', 11400, 7000000, false);
INSERT INTO public.planet VALUES (4, 1, 'Jupiter', 'Gas giant', 'Largest planet in the Solar System', 139820, 778500, false);
INSERT INTO public.planet VALUES (5, 1, 'Saturn', 'Gas giant', 'Known for its prominent ring system', 116460, 1433000, false);
INSERT INTO public.planet VALUES (6, 1, 'Venus', 'Terrestrial', 'Second planet from the Sun', 12104, 108200000, false);
INSERT INTO public.planet VALUES (7, 1, 'Mercury', 'Terrestrial', 'Closest planet to the Sun', 4879, 57900000, false);
INSERT INTO public.planet VALUES (8, 1, 'Neptune', 'Ice giant', 'Farthest known planet in the Solar System', 49244, 4495000, false);
INSERT INTO public.planet VALUES (9, 1, 'Uranus', 'Ice giant', 'Known for its unique tilt', 50724, 2871000, false);
INSERT INTO public.planet VALUES (10, 1, 'Titan', 'Moon of Saturn', 'Second largest moon in the Solar System', 5150, 1222000, false);
INSERT INTO public.planet VALUES (11, 1, 'Europa', 'Moon of Jupiter', 'Icy moon with a subsurface ocean', 3122, 670900, false);
INSERT INTO public.planet VALUES (12, 1, 'Ganymede', 'Moon of Jupiter', 'Largest moon in the Solar System', 5268, 1070400, false);


--
-- Data for Name: star; Type: TABLE DATA; Schema: public; Owner: freecodecamp
--

INSERT INTO public.star VALUES (1, 1, 'Sun', 'G-type main-sequence', 8, 4600000000, true);
INSERT INTO public.star VALUES (2, 2, 'Proxima Centauri', 'Red dwarf', 1, 4500000000, false);
INSERT INTO public.star VALUES (3, 1, 'Sirius', 'A-type main-sequence', 0, 242000000, false);
INSERT INTO public.star VALUES (4, 1, 'Betelgeuse', 'Red supergiant', 0, 8000000, false);
INSERT INTO public.star VALUES (5, 3, 'Alpha Centauri A', 'G-type main-sequence', 0, 5000000000, false);
INSERT INTO public.star VALUES (6, 3, 'Alpha Centauri B', 'K-type main-sequence', 0, 6000000000, false);


--
-- Name: asteroid_belt_belt_id_seq; Type: SEQUENCE SET; Schema: public; Owner: freecodecamp
--

SELECT pg_catalog.setval('public.asteroid_belt_belt_id_seq', 27, true);


--
-- Name: galaxy_id_seq; Type: SEQUENCE SET; Schema: public; Owner: freecodecamp
--

SELECT pg_catalog.setval('public.galaxy_id_seq', 7, true);


--
-- Name: moon_moon_id_seq; Type: SEQUENCE SET; Schema: public; Owner: freecodecamp
--

SELECT pg_catalog.setval('public.moon_moon_id_seq', 23, true);


--
-- Name: planet_planet_id_seq; Type: SEQUENCE SET; Schema: public; Owner: freecodecamp
--

SELECT pg_catalog.setval('public.planet_planet_id_seq', 12, true);


--
-- Name: star_star_id_seq; Type: SEQUENCE SET; Schema: public; Owner: freecodecamp
--

SELECT pg_catalog.setval('public.star_star_id_seq', 6, true);


--
-- Name: asteroid_belt asteroid_belt_pkey; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.asteroid_belt
    ADD CONSTRAINT asteroid_belt_pkey PRIMARY KEY (asteroid_belt_id);


--
-- Name: galaxy galaxy_pkey; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.galaxy
    ADD CONSTRAINT galaxy_pkey PRIMARY KEY (galaxy_id);


--
-- Name: moon moon_pkey; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.moon
    ADD CONSTRAINT moon_pkey PRIMARY KEY (moon_id);


--
-- Name: planet planet_pkey; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.planet
    ADD CONSTRAINT planet_pkey PRIMARY KEY (planet_id);


--
-- Name: star star_pkey; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.star
    ADD CONSTRAINT star_pkey PRIMARY KEY (star_id);


--
-- Name: asteroid_belt unique_belt_name; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.asteroid_belt
    ADD CONSTRAINT unique_belt_name UNIQUE (name);


--
-- Name: galaxy unique_galaxy_name; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.galaxy
    ADD CONSTRAINT unique_galaxy_name UNIQUE (name);


--
-- Name: moon unique_moon_name; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.moon
    ADD CONSTRAINT unique_moon_name UNIQUE (name);


--
-- Name: planet unique_planet_name; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.planet
    ADD CONSTRAINT unique_planet_name UNIQUE (name);


--
-- Name: star unique_star_name; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.star
    ADD CONSTRAINT unique_star_name UNIQUE (name);


--
-- Name: moon moon_planet_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.moon
    ADD CONSTRAINT moon_planet_id_fkey FOREIGN KEY (planet_id) REFERENCES public.planet(planet_id);


--
-- Name: planet planet_star_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.planet
    ADD CONSTRAINT planet_star_id_fkey FOREIGN KEY (star_id) REFERENCES public.star(star_id);


--
-- Name: star star_galaxy_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.star
    ADD CONSTRAINT star_galaxy_id_fkey FOREIGN KEY (galaxy_id) REFERENCES public.galaxy(galaxy_id);


--
-- PostgreSQL database dump complete
--

