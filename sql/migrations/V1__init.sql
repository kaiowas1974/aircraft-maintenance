-- Initial Schema for Aircraft Maintenance
-- Database: PostgreSQL

CREATE TABLE airports (
    id SERIAL PRIMARY KEY,
    icao VARCHAR(4) UNIQUE NOT NULL,
    iata VARCHAR(3) UNIQUE,
    name VARCHAR(100) NOT NULL,
    city VARCHAR(100)
);

CREATE TABLE atc_authorities (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT
);

CREATE TABLE people (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE,
    license_number VARCHAR(50)
);

CREATE TABLE roles (
    id SERIAL PRIMARY KEY,
    role_name VARCHAR(50) UNIQUE NOT NULL
);

CREATE TABLE person_roles (
    person_id INTEGER REFERENCES people(id) ON DELETE CASCADE,
    role_id INTEGER REFERENCES roles(id) ON DELETE CASCADE,
    PRIMARY KEY (person_id, role_id)
);

CREATE TABLE aircraft_types (
    id SERIAL PRIMARY KEY,
    manufacturer VARCHAR(100) NOT NULL,
    model VARCHAR(100) NOT NULL
);

CREATE TABLE aircraft (
    id SERIAL PRIMARY KEY,
    registration VARCHAR(20) UNIQUE NOT NULL,
    type_id INTEGER REFERENCES aircraft_types(id) ON DELETE CASCADE,
    home_airport_id INTEGER REFERENCES airports(id) ON DELETE SET NULL,
    total_flight_hours NUMERIC(10, 2) DEFAULT 0,
    manufacture_date DATE,
    airworthiness_expiry DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE maintenance_intervals (
    id SERIAL PRIMARY KEY,
    type_id INTEGER REFERENCES aircraft_types(id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL,
    interval_hours INTEGER,
    interval_days INTEGER,
    description TEXT
);

CREATE TABLE maintenance_tasks (
    id SERIAL PRIMARY KEY,
    interval_id INTEGER REFERENCES maintenance_intervals(id) ON DELETE CASCADE,
    description TEXT NOT NULL,
    is_mandatory BOOLEAN DEFAULT TRUE
);

CREATE TABLE maintenance_events (
    id SERIAL PRIMARY KEY,
    aircraft_id INTEGER REFERENCES aircraft(id) ON DELETE CASCADE,
    airport_id INTEGER REFERENCES airports(id) ON DELETE SET NULL,
    technician_id INTEGER REFERENCES people(id) ON DELETE SET NULL,
    date DATE NOT NULL,
    hours_at_maintenance NUMERIC(10, 2) NOT NULL,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE maintenance_activities (
    id SERIAL PRIMARY KEY,
    event_id INTEGER REFERENCES maintenance_events(id) ON DELETE CASCADE,
    task_id INTEGER REFERENCES maintenance_tasks(id) ON DELETE SET NULL,
    notes TEXT,
    status VARCHAR(50) CHECK (status IN ('completed', 'pending', 'observation')),
    completed_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for performance
CREATE INDEX idx_aircraft_registration ON aircraft(registration);
CREATE INDEX idx_maintenance_events_aircraft ON maintenance_events(aircraft_id);
CREATE INDEX idx_maintenance_activities_event ON maintenance_activities(event_id);
CREATE INDEX idx_airports_icao ON airports(icao);
