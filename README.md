# Aircraft Maintenance Database

This repository contains the database schema and initial seed data for managing the maintenance of light aircraft.

## Database Model
The model tracks aircraft, their types, defined maintenance intervals, and the actual maintenance events and activities performed.

## Setup Instructions

### Using Docker (Recommended)
The easiest way to start the database and apply migrations is using Docker Compose.

1. **Run the stack**:
   `ash
   docker-compose up -d
   `
   This will start the PostgreSQL database and automatically run the Flyway migrations.

2. **Check logs**:
   `ash
   docker-compose logs -f flyway
   `

### Manual Installation
If you prefer to run it manually:

1. **Initialize Schema**:
   `ash
   psql -U username -d dbname -f sql/migrations/V1__init.sql
   `

2. **Load Seed Data**:
   `ash
   psql -U username -d dbname -f sql/migrations/V2__initial_data.sql
   `

## Entity Relationship Overview
- ircraft_types -> ircraft (1:N)
- ircraft_types -> maintenance_intervals (1:N)
- maintenance_intervals -> maintenance_tasks (1:N)
- ircraft -> maintenance_events (1:N)
- maintenance_events -> maintenance_activities (1:N)
- maintenance_tasks -> maintenance_activities (1:N, optional)
