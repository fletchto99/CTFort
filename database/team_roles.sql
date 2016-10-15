CREATE TABLE team_roles(
    Team_Role_ID SERIAL NOT NULL PRIMARY KEY,
    Role_Name varchar(30) NOT NULL
);

INSERT INTO team_roles(Role_Name) VALUES ('Administrator');
INSERT INTO team_roles(Role_Name) VALUES ('Member');