CREATE TABLE IF NOT EXISTS community_ban.sql (
    community_id INT(12) NOT NULL,
    user_id INT(12) NOT NULL,
    UNIQUE KEY(community_id, user_id),
    CONSTRAINT fk_cbcommunity FOREIGN KEY (community_id)
    REFERENCES community(id)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
    CONSTRAINT fk_cbuser FOREIGN KEY (user_id)
    REFERENCES users(id)
    ON DELETE CASCADE
    ON UPDATE CASCADE
)