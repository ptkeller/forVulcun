CREATE DATABASE users;

USE users;

CREATE TABLE Users (
  id int NOT NULL,
  full_name varchar(255) NOT NULL,
  email varchar(200)  NOT NULL,
  city varchar(200),
  PRIMARY KEY (ID)
);