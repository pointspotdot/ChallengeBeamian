# ChallengeBeamian

There are some errors, namely:
- Files are not being saved (I tried using several libraries (file-express upload and multer), but to no avail). File information is saved, but file didn't reach the designated folder.
- Once the date (from date of birth) is saved on the database, the date is changed to the previous day (I assume it has to do with timezone, but I wasn't able to solve it yet).
- Once the information is submitted, the modal being loaded is always the error one, and it has to do with the fact that the system is no asynchronous. I tries to solve it but I wasn't able to just yet.

To run the project:
1. Download (or clone) the repo
2. open the terminal, and go to the directory where the repo or the unzipped folder is
3. If you have node installed, just type "npm install" to install the dependencies
4. If you don't have mysql installed, type the following in the terminal
sudo apt-get install mysql-server
sudo mysql_secure_installation 
5. Create the databade with the following command: (in the function getMySQLConnection you may need to update the username and password as well)
mysql -u username -p password database_name < db.sql
6. Start the server with the command "node server.js" (There should be a message in the terminal saying that the server is running on port 3005
7. On the browser type localhost:3005 and it will load the page.
