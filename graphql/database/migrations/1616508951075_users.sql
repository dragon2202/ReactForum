CREATE TABLE IF NOT EXISTS {}.users (
    id INT(12) NOT NULL auto_increment PRIMARY KEY,
    email VARCHAR(30) NOT NULL,
    password TINYTEXT NOT NULL,
    username VARCHAR(45) NOT NULL,
    INDEX uemail (email),
    UNIQUE (email)
    /*,
    CONSTRAINT fk_urole FOREIGN KEY(role_id)
    REFERENCES roles(id)
    ON DELETE CASCADE
    ON UPDATE CASCADE
    */
)