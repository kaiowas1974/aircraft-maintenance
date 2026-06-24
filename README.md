# Aircraft Maintenance Database

This repository contains the database schema and initial seed data for managing the maintenance of light aircraft.

## Documentation
For a detailed overview of the functional requirements and the technical database model, please refer to the [Data Model Documentation](data_model.md).

## Setup Instructions

### Using Docker (Recommended)
The easiest way to start the database and apply migrations is using the provided batch script.

1. **Run the stack**:
   ```bash
   ./build.bat
   ```
   This will automatically create the required Docker network, start the PostgreSQL database, and run the Flyway migrations.

2. **Check logs**:
   ```bash
   docker compose logs -f flyway
   ```

3. **Tear down the stack**:
   ```bash
   ./destroy.bat
   ```
   This will stop all containers and remove all volumes.

### Manual Installation
If you prefer to run it manually:

1. **Initialize Schema**:
   ```bash
   psql -U username -d dbname -f sql/migrations/V1__init.sql
   ```

2. **Load Seed Data**:
   ```bash
   psql -U username -d dbname -f sql/migrations/V2__initial_data.sql
   ```
