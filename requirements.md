# Functional Requirements

The system is designed to manage the following core business processes:

### 1.1 Aircraft & Type Management
- Association of aircraft with a home airport and a specific hangar.
- Management of aircraft status (e.g., `active`, `unclear`, `grounded`).
- Recording of aircraft details (Registration, Manufacturer, Model).
- Tracking of total flight hours and airworthiness expiry.

### 1.2 Maintenance Management
- **Activity Tracking**: Detailed recording of completed tasks within a maintenance event.
- **Maintenance Events**: Recording of actual maintenance sessions, including the date, location, performing technician, and aircraft flight hours.
- **Maintenance Management**: Definition of legal/periodic maintenance intervals based on flight hours or calendar days.
- **Task Management**: Specification of individual tasks within a maintenance interval.
- **Service Providers**: Management of external maintenance companies and their authorized operating airports.

### 1.3 Hangar & Capacity Management
- Management of airport hangars and their total capacity.
- **Type-specific Limits**: Ability to restrict hangar occupancy by aircraft type and set a maximum quantity per type.

### 1.4 Flight Operations & Booking
- **Booking Status**: Management of booking states, including a special `maintenance_hold` status to block aircraft during maintenance.
- **Booking System**: Reservation of aircraft for specific time slots.
- **Flight Execution**: Recording of actual flight movements (departure/arrival times, pilot, aircraft, runway, type).

### 1.5 Logbooks (Pilot & Aircraft)
- **Aircraft Logbook**: Independent tracking of aircraft flight hours, duration per flight, and technical remarks.
- **Pilot Logbook**: Independent tracking of pilot flight hours, duration per flight, and personal remarks.

### 1.6 Flight Complaints
- Ability for pilots/crew to report issues (complaints) encountered during a flight, including severity and description.

### 1.7 Personnel & Licensing
- Management of people (Pilots, Mechanics, Instructors, Students, Managers).
- Multi-role support (one person can hold multiple roles).
- **Licensing System**: Tracking of license types (PPL, CPL, etc.), validity periods (issue/expiry), and specific ratings.
