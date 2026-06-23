-- Seed data for Aircraft Maintenance (Austrian Context)

-- 1. Airports
INSERT INTO airports (icao, iata, name, city) VALUES 
('LOWW', 'VIE', 'Wien-Schwechat', 'Vienna'),
('LOWI', 'INN', 'Innsbruck', 'Innsbruck'),
('LOWL', 'LNZ', 'Linz', 'Linz'),
('LOWG', 'GRZ', 'Graz', 'Graz');

-- 2. ATC Authorities
INSERT INTO atc_authorities (name, description) VALUES 
('Austro Control', 'Austrian Civil Aviation Authority');

-- 3. Roles
INSERT INTO roles (role_name) VALUES 
('Pilot'),
('Mechanic'),
('ATC Controller');

-- 4. People
INSERT INTO people (first_name, last_name, email, license_number) VALUES 
('Hans', 'Maier', 'hans.maier@example.at', 'AT-PILOT-123'),
('Eva', 'Schmidt', 'eva.schmidt@example.at', 'AT-MECH-456'),
('Karl', 'Weber', 'karl.weber@example.at', 'AT-PILOT-789');

-- 5. Person Roles (Hans is Pilot, Eva is Mechanic, Karl is Pilot & Mechanic)
INSERT INTO person_roles (person_id, role_id) VALUES 
(1, 1), -- Hans: Pilot
(2, 2), -- Eva: Mechanic
(3, 1), -- Karl: Pilot
(3, 2); -- Karl: Mechanic

-- 6. Aircraft Types
INSERT INTO aircraft_types (manufacturer, model) VALUES 
('Diamond', 'DA40 NG'),
('Diamond', 'DA42 VI'),
('Cessna', '172 Skyhawk'),
('Piper', 'PA-28 Archer');

-- 7. Aircraft
INSERT INTO aircraft (registration, type_id, home_airport_id, total_flight_hours, manufacture_date, airworthiness_expiry) VALUES 
('OE-DABC', 1, 1, 450.2, '2020-06-15', '2027-06-15'),
('OE-DAEF', 2, 2, 1120.8, '2018-03-10', '2026-12-31'),
('OE-SXYZ', 3, 3, 2500.5, '2010-11-20', '2027-01-10'),
('OE-R123', 4, 4, 840.0, '2015-08-05', '2026-09-20');

-- 8. Maintenance Intervals
INSERT INTO maintenance_intervals (type_id, name, interval_hours, interval_days, description) VALUES 
(1, '50h Check', 50, NULL, 'Minor periodic inspection'),
(1, 'Annual Inspection', NULL, 365, 'Mandatory yearly inspection'),
(3, '50h Check', 50, NULL, 'Minor periodic inspection');

-- 9. Maintenance Tasks
INSERT INTO maintenance_tasks (interval_id, description) VALUES 
(1, 'Engine oil and filter change'),
(1, 'Tire pressure check'),
(2, 'Full airframe inspection'),
(3, 'Oil change');

-- 10. Maintenance Event
INSERT INTO maintenance_events (aircraft_id, airport_id, technician_id, date, hours_at_maintenance, notes) VALUES 
(1, 1, 2, '2026-06-01', 450.2, 'Routine maintenance at LOWW');

-- 11. Maintenance Activities
INSERT INTO maintenance_activities (event_id, task_id, notes, status) VALUES 
(1, 1, 'Used synthetic oil', 'completed'),
(1, 2, 'Pressure OK', 'completed');
