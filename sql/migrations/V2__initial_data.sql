-- Seed data for Aircraft Maintenance & Flight Operations (Austrian Context)

-- 1. Airports
INSERT INTO airports (icao, iata, name, city) VALUES 
('LOWW', 'VIE', 'Wien-Schwechat', 'Vienna'),
('LOWI', 'INN', 'Innsbruck', 'Innsbruck'),
('LOWL', 'LNZ', 'Linz', 'Linz'),
('LOWG', 'GRZ', 'Graz', 'Graz');

-- 2. Runways
INSERT INTO runways (airport_id, designator, length_meters, surface) VALUES 
(1, '26', 3600, 'Asphalt'),
(1, '08', 3600, 'Asphalt'),
(2, '26', 2500, 'Asphalt'),
(3, '08', 2100, 'Asphalt');

-- 3. Hangars
INSERT INTO hangars (airport_id, name, capacity) VALUES 
(1, 'Hangar Alpha', 5),
(1, 'Hangar Beta', 10),
(2, 'Innsbruck Main Hangar', 3);

-- 4. ATC Authorities
INSERT INTO atc_authorities (name, description) VALUES 
('Austro Control', 'Austrian Civil Aviation Authority');

-- 5. Roles (Added Instructor and Student)
INSERT INTO roles (role_name) VALUES 
('Pilot'),
('Mechanic'),
('Flight Instructor'),
('Student'),
('Betriebsleiter');

-- 6. People
INSERT INTO people (first_name, last_name, email, license_number) VALUES 
('Hans', 'Maier', 'hans.maier@example.at', 'AT-PILOT-123'),
('Eva', 'Schmidt', 'eva.schmidt@example.at', 'AT-MECH-456'),
('Karl', 'Weber', 'karl.weber@example.at', 'AT-PILOT-789'),
('Maria', 'Hofer', 'maria.hofer@example.at', 'AT-OPS-001'),
('Lukas', 'Wagner', 'lukas.wagner@example.at', NULL); -- Student

-- 7. Person Roles
INSERT INTO person_roles (person_id, role_id) VALUES 
(1, 1), -- Hans: Pilot
(2, 2), -- Eva: Mechanic
(3, 1), -- Karl: Pilot
(3, 2), -- Karl: Mechanic
(4, 5), -- Maria: Betriebsleiter
(5, 4); -- Lukas: Student

-- 8. Licenses
INSERT INTO licenses (license_type, description) VALUES 
('PPL', 'Private Pilot License'),
('CPL', 'Commercial Pilot License'),
('LAPL', 'Light Aircraft Pilot License');

-- 9. Person Licenses
INSERT INTO person_licenses (person_id, license_id, issue_date, expiry_date, rating) VALUES 
(1, 1, '2015-01-01', '2025-01-01', 'Single Engine Land'),
(3, 1, '2010-05-01', '2025-05-01', 'Single Engine Land'),
(3, 2, '2018-10-10', '2028-10-10', 'Multi Engine');

-- 10. Aircraft Types
INSERT INTO aircraft_types (manufacturer, model) VALUES 
('Diamond', 'DA40 NG'),
('Diamond', 'DA42 VI'),
('Cessna', '172 Skyhawk'),
('Piper', 'PA-28 Archer');

-- 11. Aircraft
INSERT INTO aircraft (registration, type_id, home_airport_id, current_hangar_id, total_flight_hours, manufacture_date, airworthiness_expiry) VALUES 
('OE-DABC', 1, 1, 1, 450.2, '2020-06-15', '2027-06-15'),
('OE-DAEF', 2, 2, 3, 1120.8, '2018-03-10', '2026-12-31'),
('OE-SXYZ', 3, 3, NULL, 2500.5, '2010-11-20', '2027-01-10'),
('OE-R123', 4, 4, NULL, 840.0, '2015-08-05', '2026-09-20');

-- 12. Maintenance Intervals
INSERT INTO maintenance_intervals (type_id, name, interval_hours, interval_days, description) VALUES 
(1, '50h Check', 50, NULL, 'Minor periodic inspection'),
(1, 'Annual Inspection', NULL, 365, 'Mandatory yearly inspection'),
(3, '50h Check', 50, NULL, 'Minor periodic inspection');

-- 13. Maintenance Tasks
INSERT INTO maintenance_tasks (interval_id, description) VALUES 
(1, 'Engine oil and filter change'),
(1, 'Tire pressure check'),
(2, 'Full airframe inspection'),
(3, 'Oil change');

-- 14. Maintenance Events
INSERT INTO maintenance_events (aircraft_id, airport_id, technician_id, date, hours_at_maintenance, notes) VALUES 
(1, 1, 2, '2026-06-01', 450.2, 'Routine maintenance at LOWW');

-- 15. Maintenance Activities
INSERT INTO maintenance_activities (event_id, task_id, notes, status) VALUES 
(1, 1, 'Used synthetic oil', 'completed'),
(1, 2, 'Pressure OK', 'completed');

-- 16. Bookings
INSERT INTO bookings (aircraft_id, person_id, start_time, end_time, status, remarks) VALUES 
(1, 5, '2026-07-01 09:00:00', '2026-07-01 11:00:00', 'confirmed', 'Training flight for Lukas'),
(2, 3, '2026-07-05 14:00:00', '2026-07-05 16:00:00', 'confirmed', 'Leisure flight');

-- 17. Flights (linked to bookings)
INSERT INTO flights (booking_id, aircraft_id, pilot_id, runway_id, flight_number, departure_time, arrival_time, flight_type) VALUES 
(1, 1, 3, 1, 'TRAIN-001', '2026-07-01 09:00:00', '2026-07-01 09:45:00', 'training'),
(2, 2, 3, 2, 'LEISURE-01', '2026-07-05 14:00:00', '2026-07-05 15:30:00', 'circuit');
