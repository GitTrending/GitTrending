# GitTrending
An app that helps us organize GitHub repos.

# To start the database, run below steps in the root of this repo 
1. `mysql -u <user_name_usualy_root> -p < ./db/schema.sql`
2. `sequelize db:migrate` this will migrate(generate) ALL the new tables or seed data in the migration directory
3. `sequelize db:migrate:undo` this will revert ONE most recent migration. To remove all the migrations, you can keep running this command to eventually drop all the seed data and table
