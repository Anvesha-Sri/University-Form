-- Table: public.student

-- DROP TABLE IF EXISTS public.student;

CREATE TABLE IF NOT EXISTS public.student
(
    id integer NOT NULL DEFAULT nextval('student_id_seq'::regclass),
    first_name character varying(50) COLLATE pg_catalog."default",
    last_name character varying(50) COLLATE pg_catalog."default",
    dob date,
    course character varying(100) COLLATE pg_catalog."default",
    personal_email character varying(150) COLLATE pg_catalog."default",
    university_email character varying(150) COLLATE pg_catalog."default",
    current_year integer,
    graduation_year integer,
    residence_type character varying(20) COLLATE pg_catalog."default",
    hostel_block character varying(20) COLLATE pg_catalog."default",
    subjects text[] COLLATE pg_catalog."default",
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT student_pkey PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.student
    OWNER to postgres;