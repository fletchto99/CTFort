CREATE TABLE teams_users(
    Teams_Users_ID SERIAL NOT NULL PRIMARY KEY,
    Team_ID INT NOT NULL REFERENCES teams(Team_ID),
    User_ID INT NOT NULL REFERENCES users(User_ID),
    Role_ID INT NOT NULL REFERENCES team_roles(Team_Role_ID),
    Status BIT DEFAULT NULL -- 0 for declined, 1 for accepted
);