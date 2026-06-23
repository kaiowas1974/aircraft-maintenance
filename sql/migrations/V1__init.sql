-- Initial Schema for Aircraft Maintenance & Flight Operations
-- Database: PostgreSQL

CREATE TABLE airports (
    id SERIAL PRIMARY KEY,
    icao VARCHAR(4) UNIQUE NOT NULL,
    iata VARCHAR(3) UNIQUE,
    name VARCHAR(100) NOT NULL,
    city VARCHAR(100)
);

CREATE TABLE runways (
    id SERIAL PRIMARY KEY,
    airport_id INTEGER REFERENCES airports(id) ON DELETE CASCADE,
    designator VARCHAR(10) NOT NULL, -- e.g., '26R'
    length_meters INTEGER,
    surface VARCHAR(50),
    UNIQUE(airport_id, designator)
);

CREATE TABLE hangars (
    id SERIAL PRIMARY KEY,
    airport_id INTEGER REFERENCES airports(id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL,
    capacity INTEGER
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

-- LICENSING SYSTEM
CREATE TABLE licenses (
    id SERIAL PRIMARY KEY,
    license_type VARCHAR(50) UNIQUE NOT NULL, -- e.g., 'PPL', 'CPL', 'LAPL'
    description TEXT
);

CREATE TABLE person_licenses (
    id SERIAL PRIMARY KEY,
    person_id INTEGER REFERENCES people(id) ON DELETE CASCADE,
    license_id INTEGER REFERENCES licenses(id) ON DELETE CASCADE,
    issue_date DATE NOT NULL,
    expiry_date DATE NOT NULL,
    rating VARCHAR(100), -- e.g., 'Single Engine Land'
    issuing_authority_id INTEGER REFERENCES atc_authorities(id)
);

CREATE TABLE aircraft_types (
    id SERIAL PRIMARY KEY,
    manufacturer VARCHAR(100) NOT NULL,
    model VARCHAR(100) NOT NULL
);

CREATE TABLE hangar_type_limits (
    hangar_id INTEGER REFERENCES hangars(id) ON DELETE CASCADE,
    type_id INTEGER REFERENCES aircraft_types(id) ON DELETE CASCADE,
    max_quantity INTEGER NOT NULL,
    PRIMARY KEY (hangar_id, type_id)
);

CREATE TABLE aircraft (
    id SERIAL PRIMARY KEY,
    registration VARCHAR(20) UNIQUE NOT NULL,
    type_id INTEGER REFERENCES aircraft_types(id) ON DELETE CASCADE,
    home_airport_id INTEGER REFERENCES airports(id) ON DELETE SET NULL,
    current_hangar_id INTEGER REFERENCES hangars(id) ON DELETE SET NULL,
    total_flight_hours NUMERIC(10, 2) DEFAULT 0,
    manufacture_date DATE,
    airworthiness_expiry DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- BOOKING SYSTEM
CREATE TABLE bookings (
    id SERIAL PRIMARY KEY,
    aircraft_id INTEGER REFERENCES aircraft(id) ON DELETE CASCADE,
    person_id INTEGER REFERENCES people(id) ON DELETE CASCADE,
    maintenance_event_id INTEGER REFERENCES maintenance_events(id) ON DELETE SET NULL,
    start_time TIMESTAMP WITH TIME ZONE NOT NULL,
    end_time TIMESTAMP WITH TIME ZONE NOT NULL,
    status VARCHAR(50) CHECK (status IN ('confirmed', 'pending', 'cancelled', 'completed', 'maintenance_hold')),
    remarks TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT valid_times CHECK (end_time > start_time)
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

-- NEW: Maintenance Companies
CREATE TABLE maintenance_companies (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT
);

-- NEW: Junction Table for Companies and Airports
CREATE TABLE company_airports (
    company_id INTEGER REFERENCES maintenance_companies(id) ON DELETE CASCADE,
    airport_id INTEGER REFERENCES airports(id) ON DELETE CASCADE,
    PRIMARY KEY (company_id, airport_id)
);

CREATE TABLE maintenance_events (
    id SERIAL PRIMARY KEY,
    aircraft_id INTEGER REFERENCES aircraft(id) ON DELETE CASCADE,
    airport_id INTEGER REFERENCES airports(id) ON DELETE SET NULL,
    company_id INTEGER REFERENCES maintenance_companies(id) ON DELETE SET NULL,
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

CREATE TABLE flights (
    id SERIAL PRIMARY KEY,
    booking_id INTEGER REFERENCES bookings(id) ON DELETE SET NULL,
    aircraft_id INTEGER REFERENCES aircraft(id) ON DELETE CASCADE,
    pilot_id INTEGER REFERENCES people(id) ON DELETE SET NULL,
    runway_id INTEGER REFERENCES runways(id) ON DELETE SET NULL,
    flight_number VARCHAR(20),
    departure_time TIMESTAMP WITH TIME ZONE,
    arrival_time TIMESTAMP WITH TIME ZONE,
    flight_type VARCHAR(50) -- e.g., 'takeoff', 'landing', 'circuit', 'training'
);

-- NEW: Pilot Logbook
CREATE TABLE pilot_logbook (
    id SERIAL PRIMARY KEY,
    pilot_id INTEGER REFERENCES people(id) ON DELETE CASCADE,
    flight_id INTEGER REFERENCES flights(id) ON DELETE CASCADE,
    flight_date DATE NOT NULL,
    duration_minutes INTEGER NOT NULL,
    cumulative_hours NUMERIC(10, 2) NOT NULL,
    remarks TEXT
);

-- NEW: Aircraft Logbook
CREATE TABLE aircraft_logbook (
    id SERIAL PRIMARY KEY,
    aircraft_id INTEGER REFERENCES aircraft(id) ON DELETE CASCADE,
    flight_id INTEGER REFERENCES flights(id) ON DELETE CASCADE,
    flight_date DATE NOT NULL,
    duration_minutes INTEGER NOT NULL,
    cumulative_hours NUMERIC(10, 2) NOT NULL,
    remarks TEXT
);

-- Indexes for performance
CREATE INDEX idx_aircraft_registration ON aircraft(registration);
CREATE INDEX idx_maintenance_events_aircraft ON maintenance_events(aircraft_id);
CREATE INDEX idx_maintenance_activities_event ON maintenance_activities(event_id);
CREATE INDEX idx_airports_icao ON airports(icao);
CREATE INDEX idx_flights_aircraft ON flights(aircraft_id);
CREATE INDEX idx_flights_pilot ON flights(pilot_id);
CREATE INDEX idx_bookings_aircraft ON bookings(aircraft_id);
CREATE INDEX idx_bookings_person ON bookings(person_id);
CREATE INDEX idx_bookings_maintenance_event ON bookings(maintenance_event_id);
CREATE INDEX idx_company_airports_company ON company_airports(company_id);
CREATE INDEX idx_company_airports_airport ON company_airports(airport_id);
CREATE INDEX idx_pilot_logbook_pilot ON pilot_logbook(pilot_id);
CREATE INDEX idx_aircraft_logbook_aircraft ON aircraft_logbook(aircraft_id);
