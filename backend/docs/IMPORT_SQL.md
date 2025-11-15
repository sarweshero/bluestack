# Import SQL Database

Import the provided `company_db.sql` into Postgres:

```bash
psql -U postgres -d company_db -f company_db.sql
```

Ensure tables `users` and `company_profile` exist as per the assignment PDF.
