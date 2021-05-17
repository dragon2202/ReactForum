CREATE TABLE IF NOT EXISTS {}.forum_categories (
    id INT(12) NOT NULL auto_increment PRIMARY KEY,
    label VARCHAR(200) NOT NULL,
    description TEXT NOT NULL
)