# Aircraft Maintenance System - Data Model Documentation

This document provides a detailed overview of the database schema and the functional requirements for the aircraft maintenance and flight operations management system.

## 1. Data Model (Entity-Relationship Overview)

### 1.1 Core Entities

#### **Airports & Infrastructure**
- `airports`: Central locations (ICAO, IATA, City).
- `hangars`: Storage facilities at airports.
- `hangar_type_limits`: Controls which aircraft types can be stored in which hangar and in what quantity.
- `runways`: Landing/takeoff surfaces associated with an airport.

#### **Personnel & Roles**
- `licenses`: Master list of license types.
- `people`: Basic personal information.
- `person_licenses`: Specific licenses held by people (includes validity and ratings).
- `person_roles`: Links people to one or more roles.
- `roles`: Defined roles (e.g., Pilot, Mechanic).

#### **Aircraft & Maintenance**
- `aircraft`: The physical aircraft (Registration, Hours, Status, Home Airport, Hangar).
- `aircraft_types`: Manufacturer and model definitions.
- `company_airports`: Defines where a company is allowed to perform maintenance.
- `maintenance_activities`: Individual tasks performed during an event.
- `maintenance_companies`: External service providers.
- `maintenance_events`: A single maintenance session.
- `maintenance_intervals`: Rules for when maintenance is due.
- `maintenance_tasks`: Specific steps required by an interval.

#### **Flights & Bookings**
- `aircraft_logbook`: Historical record for aircraft.
- `bookings`: Planned aircraft usage (Time, Person, Aircraft, Status).
- `flights`: The actual execution of a booking (Times, Pilot, Aircraft, Runway, Type).
- `flight_complaints`: Issues reported during a flight.
- `pilot_logbook`: Historical record for pilots.

### 1.2 Entity Details (Attributes)

| Entity | Key Attributes |
| :--- | :--- |
| **Airport** | `icao`, `iata`, `name`, `city` |
| **Aircraft** | `registration`, `type_id`, `home_airport_id`, `current_hangar_id`, `total_flight_hours`, `airworthiness_expiry`, `status` |
| **Aircraft Type** | `manufacturer`, `model` |
| **ATC Authority** | `name`, `description` |
| **Booking** | `aircraft_id`, `person_id`, `maintenance_event_id`, `start_time`, `end_time`, `status` |
| **Flight** | `booking_id`, `aircraft_id`, `pilot_id`, `runway_id`, `departure_time`, `arrival_time`, `flight_type` |
| **Flight Complaint** | `flight_id`, `aircraft_id`, `reporter_id`, `description`, `severity` |
| **Flight Logbook (Pilot)** | `pilot_id`, `flight_id`, `flight_date`, `duration_minutes`, `cumulative_hours` |
| **Flight Logbook (Aircraft)** | `aircraft_id`, `flight_id`, `flight_date`, `duration_minutes`, `cumulative_hours` |
| **Hangar** | `name`, `capacity` |
| **Hangar Type Limit** | `max_quantity` |
| **License** | `license_type`, `description` |
| **Maintenance Activity**| `event_id`, `task_id`, `notes`, `status` |
| **Maintenance Company**| `name`, `description` |
| **Maintenance Event**| `aircraft_id`, `airport_id`, `company_id`, `technician_id`, `date`, `hours_at_maintenance` |
| **Maintenance Interval**| `name`, `interval_hours`, `interval_days`, `description` |
| **Maintenance Task** | `description`, `is_mandatory` |
| **Person** | `first_name`, `last_name`, `email`, `license_number` |
| **Person License** | `issue_date`, `expiry_date`, `rating` |
| **Pilot Logbook** | `pilot_id`, `flight_id`, `flight_date`, `duration_minutes`, `cumulative_hours` |
| **Role** | `role_name` |
| **Runway** | `designator`, `length_meters`, `surface` |
