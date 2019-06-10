# ChallengeBeamian

First, there needs to be a database created with mySQL:

CREATE DATABASE `challenge`

CREATE TABLE `candidates` (
  `name` varchar(255) NOT NULL,
  `filename` varchar(255) DEFAULT NULL,
  `birthdate` date NOT NULL,
  PRIMARY KEY (`birthdate`,`name`)
  )

Then the dependencies should be installed, so that the server can be run using nodemon.

By entering the birthdate, a modal is shown in the case the candidate is under age.
By entering the rest of the data (name and a file) the information is submitted to the server and then the information is added to the database. A new modal is shown with the new information.
User then as the option to reload.
