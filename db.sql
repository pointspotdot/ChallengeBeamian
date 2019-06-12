CREATE challenge;

CREATE DATABASE challenge

CREATE TABLE candidates ( 
    name varchar(255) NOT NULL, 
    filename varchar(255) DEFAULT NULL, 
    birthdate date NOT NULL, 
    PRIMARY KEY (birthdate,name) 
)