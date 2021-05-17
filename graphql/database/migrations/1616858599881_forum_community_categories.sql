CREATE TABLE IF NOT EXISTS forum_community_categories (
    community_id INT(12) NOT NULL,
    category_id INT(12) NOT NULL,
    UNIQUE KEY(community_id, category_id),
    CONSTRAINT fk_fpcatcommunity FOREIGN KEY (community_id)
    REFERENCES community(id)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
    CONSTRAINT fk_fpcatcategory FOREIGN KEY (category_id)
    REFERENCES forum_categories(id)
    ON DELETE CASCADE
    ON UPDATE CASCADE
)