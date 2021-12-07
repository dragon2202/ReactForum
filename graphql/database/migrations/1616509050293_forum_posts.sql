CREATE TABLE IF NOT EXISTS forum_posts (
    id INT(12) NOT NULL auto_increment PRIMARY KEY,
    author_id INT(12) NOT NULL,
    community_id INT(12) NOT NULL,
    title VARCHAR(50) NOT NULL,
    type VARCHAR(10) NOT NULL,
    image MEDIUMTEXT,
    text VARCHAR(200),
    active TINYINT(1) NOT NULL DEFAULT 0,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    INDEX fpauthor_ind (author_id),
    CONSTRAINT fk_fpauthor FOREIGN KEY (author_id)
    REFERENCES users(id)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
    CONSTRAINT fk_fpcommunity FOREIGN KEY (community_id)
    REFERENCES community(id)
    ON DELETE CASCADE
    ON UPDATE CASCADE
)