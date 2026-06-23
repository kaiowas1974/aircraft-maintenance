-- Initial Schema for Aircraft Maintenance
-- Database: PostgreSQL

CREATE TABLE aircraft_types (
    id SERIAL PRIMARY KEY,
    manufacturer VARCHAR(100) NOT NULL,
    model VARCHAR(100) NOT NULL
);

CREATE TABLE aircraft (
    id SERIAL PRIMARY KEY,
    registration VARCHAR(20) UNIQUE NOT NULL,
    type_id INTEGER REFERENCES aircraft_types(id) ON DELETE CASCADE,
    total_flight_hours NUMERIC(10, 2) DEFAULT 0,
    manufacture_date DATE,
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
    date DATE NOT NULL,
    hours_at_maintenance NUMERIC(10, 2) NOT NULL,
    technician VARCHAR(255),
    location VARCHAR(255),
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

CREATE INDEX idx_aircraft_registration ON aircraft(registration);
CREATE INDEX idx_maintenance_events_aircraft ON maintenance_events(aircraft_id);
CREATE INDEX idx_maintenance_activities_event ON maintenance_activities(event_id);
