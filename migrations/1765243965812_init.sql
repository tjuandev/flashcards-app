--
-- PostgreSQL database dump
--

-- Dumped from database version 17.7 (Postgres.app)
-- Dumped by pg_dump version 17.6 (Homebrew)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
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
-- Name: cards; Type: TABLE; Schema: public; Owner: thiago
--

DROP TABLE public.cards;

CREATE TABLE public.cards (
    deck_id uuid,
    front character varying(32768),
    back character varying(32768),
    id uuid DEFAULT gen_random_uuid() NOT NULL
);


ALTER TABLE public.cards OWNER TO thiago;

--
-- Name: decks; Type: TABLE; Schema: public; Owner: thiago
--

DROP TABLE public.decks;

CREATE TABLE public.decks (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    name character varying(30),
    user_id uuid
);


ALTER TABLE public.decks OWNER TO thiago;

--
-- Name: pgmigrations; Type: TABLE; Schema: public; Owner: me
--

DROP TABLE public.pgmigrations;

CREATE TABLE public.pgmigrations (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    run_on timestamp without time zone NOT NULL
);


ALTER TABLE public.pgmigrations OWNER TO me;

--
-- Name: pgmigrations_id_seq; Type: SEQUENCE; Schema: public; Owner: me
--

CREATE SEQUENCE public.pgmigrations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.pgmigrations_id_seq OWNER TO me;

--
-- Name: pgmigrations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: me
--

ALTER SEQUENCE public.pgmigrations_id_seq OWNED BY public.pgmigrations.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: thiago
--

DROP TABLE public.users;

CREATE TABLE public.users (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    name character varying(20) NOT NULL,
    email character varying(255)
);


ALTER TABLE public.users OWNER TO thiago;

--
-- Name: pgmigrations id; Type: DEFAULT; Schema: public; Owner: me
--

ALTER TABLE ONLY public.pgmigrations ALTER COLUMN id SET DEFAULT nextval('public.pgmigrations_id_seq'::regclass);


--
-- Name: cards cards_pkey; Type: CONSTRAINT; Schema: public; Owner: thiago
--

ALTER TABLE ONLY public.cards
    ADD CONSTRAINT cards_pkey PRIMARY KEY (id);


--
-- Name: decks decks_pkey; Type: CONSTRAINT; Schema: public; Owner: thiago
--

ALTER TABLE ONLY public.decks
    ADD CONSTRAINT decks_pkey PRIMARY KEY (id);


--
-- Name: pgmigrations pgmigrations_pkey; Type: CONSTRAINT; Schema: public; Owner: me
--

ALTER TABLE ONLY public.pgmigrations
    ADD CONSTRAINT pgmigrations_pkey PRIMARY KEY (id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: thiago
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: cards cards_deck_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: thiago
--

ALTER TABLE ONLY public.cards
    ADD CONSTRAINT cards_deck_id_fkey FOREIGN KEY (deck_id) REFERENCES public.decks(id);


--
-- Name: decks decks_userid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: thiago
--

ALTER TABLE ONLY public.decks
    ADD CONSTRAINT decks_userid_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- PostgreSQL database dump complete
--
