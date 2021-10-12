CREATE TABLE IF NOT EXISTS {}.community (
    id INT(12) NOT NULL auto_increment PRIMARY KEY,
    title VARCHAR(50) NOT NULL UNIQUE,
    public TINYINT NOT NULL,
    summary TEXT NOT NULL,
    unique(title)
)