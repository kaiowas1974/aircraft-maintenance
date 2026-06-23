-- Seed data for Aircraft Maintenance (Austrian Context)

-- 1. Aircraft Types (Including Diamond, the Austrian manufacturer)
INSERT INTO aircraft_types (manufacturer, model) VALUES 
('Diamond', 'DA40 NG'),
('Diamond', 'DA42 VI'),
('Cessna', '172 Skyhawk'),
('Piper', 'PA-28 Archer');

-- 2. Aircraft (Austrian Registrations: OE-xxx)
INSERT INTO aircraft (registration, type_id, total_flight_hours, manufacture_date, airworthiness_expiry) VALUES 
('OE-DABC', 1, 450.2, '2020-06-15', '2027-06-15'),
('OE-DAEF', 2, 1120.8, '2018-03-10', '2026-12-31'),
('OE-SXYZ', 3, 2500.5, '2010-11-20', '2027-01-10'),
('OE-R123', 4, 840.0, '2015-08-05', '2026-09-20');

-- 3. Maintenance Intervals
-- Linked to Diamond DA40 (id 1)
INSERT INTO maintenance_intervals (type_id, name, interval_hours, interval_days, description) VALUES 
(1, '50h Check', 50, NULL, 'Minor periodic inspection'),
(1, 'Annual Inspection', NULL, 365, 'Mandatory yearly inspection (Austro Control/EASA)'),
(1, '100h Inspection', 100, NULL, 'Major periodic inspection');

-- Linked to Cessna 172 (id 3)
INSERT INTO maintenance_intervals (type_id, name, interval_hours, interval_days, description) VALUES 
(3, '50h Check', 50, NULL, 'Minor periodic inspection'),
(3, 'Annual Inspection', NULL, 365, 'Mandatory yearly inspection');

-- 4. Maintenance Tasks
INSERT INTO maintenance_tasks (interval_id, description) VALUES 
(1, 'Engine oil and filter change'),
(1, 'Inspection of tires and brakes'),
(2, 'Detailed structural airframe check'),
(2, 'Flight control cable tension check'),
(3, 'Engine compression test'),
(3, 'Detailed spark plug inspection');

-- 5. Maintenance Event (at a typical Austrian airport like LOWW or LOWI)
INSERT INTO maintenance_events (aircraft_id, date, hours_at_maintenance, technician, location) VALUES 
(1, '2026-06-01', 450.2, 'Karl Maier', 'LOWW Wien-Schwechat, Hangar 2');

-- 6. Maintenance Activities
INSERT INTO maintenance_activities (event_id, task_id, notes, status) VALUES 
(1, 1, 'Oil changed to AeroShell', 'completed'),
(1, 2, 'Tires checked, no wear', 'completed'),
(1, 5, 'Compression values optimal', 'completed');
