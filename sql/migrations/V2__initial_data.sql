-- Seed data for Aircraft Maintenance

INSERT INTO aircraft_types (manufacturer, model) VALUES 
('Cessna', '172 Skyhawk'),
('Piper', 'PA-28 Archer'),
('Diamond', 'DA40');

INSERT INTO aircraft (registration, type_id, total_flight_hours, manufacture_date) VALUES 
('D-EABC', 1, 1250.5, '2015-05-20'),
('D-EFGH', 2, 840.2, '2018-11-10'),
('D-IJKL', 3, 310.0, '2021-03-15');

INSERT INTO maintenance_intervals (type_id, name, interval_hours, interval_days, description) VALUES 
(1, '50h Check', 50, NULL, 'Minor periodic inspection every 50 flight hours'),
(1, 'Annual Inspection', NULL, 365, 'Mandatory yearly inspection'),
(1, '100h Inspection', 100, NULL, 'Major periodic inspection every 100 flight hours');

INSERT INTO maintenance_tasks (interval_id, description) VALUES 
(1, 'Oil change and filter replacement'),
(1, 'Check tire pressure and wear'),
(2, 'Full airframe structural inspection'),
(2, 'Engine compression test'),
(3, 'Detailed engine inspection'),
(3, 'Control cable tension check');

INSERT INTO maintenance_events (aircraft_id, date, hours_at_maintenance, technician, location) VALUES 
(1, '2026-06-01', 1250.5, 'Hans Müller', 'Hangar 4, Flugplatz X');

INSERT INTO maintenance_activities (event_id, task_id, notes, status) VALUES 
(1, 1, 'Oil replaced with Shell Aero', 'completed'),
(1, 2, 'Tires in good condition', 'completed'),
(1, 6, 'Tension within limits', 'completed');
