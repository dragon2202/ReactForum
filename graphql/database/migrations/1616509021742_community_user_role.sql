CREATE TABLE IF NOT EXISTS community_user_role (
    community_id INT(12) NOT NULL,
    user_id INT(12) NOT NULL,
    role_id INT(12) NOT NULL,
    UNIQUE KEY(community_id, user_id),
    CONSTRAINT fk_curcommunity FOREIGN KEY (community_id)
    REFERENCES community(id)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
    CONSTRAINT fk_curuser FOREIGN KEY (user_id)
    REFERENCES users(id)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
    CONSTRAINT fk_currole FOREIGN KEY (role_id)
    REFERENCES roles(id)
    ON DELETE CASCADE
    ON UPDATE CASCADE
)