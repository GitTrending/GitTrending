# GitTrending
An app that helps us organize GitHub repos.

# To populate tables and seed data, run below steps in the root of this repo 
1. `mysql -u <user_name_usualy_root> -p < ./db/schema.sql`
2. `sequelize db:migrate` this will migrate(generate) ALL the new tables or seed data in the migration directory
3. `sequelize db:migrate:undo` this will revert ONE most recent migration. To remove all the migrations, you can keep running this command to eventually drop all the seed data and table
4. At early stage, it's possible to always `sequelize db:migrate:undo` to rollback to ground 0 with a clean table and/or db
