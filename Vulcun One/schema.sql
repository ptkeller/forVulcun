CREATE DATABASE users;

USE users;

CREATE TABLE Users (
  /* Describe your table here.*/
  id int NOT NULL,
  full_name varchar(255) NOT NULL,
  email varchar(200)  NOT NULL,
  city varchar(200),
  PRIMARY KEY (ID)
);