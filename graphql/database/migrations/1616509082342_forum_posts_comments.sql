CREATE TABLE IF NOT EXISTS forum_posts_comments (
    id INT(12) NOT NULL auto_increment PRIMARY KEY,
    post_id INT(12) NOT NULL,
    author_id INT(12) NOT NULL,
    parent_comment_id INT(12),
    comment TEXT,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    INDEX fpcauthor_ind (author_id),
    CONSTRAINT fk_fpcpost FOREIGN KEY (post_id)
    REFERENCES forum_posts(id)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
    CONSTRAINT fk_fpcauthor FOREIGN KEY (author_id)
    REFERENCES users(id)
    ON DELETE CASCADE
    ON UPDATE CASCADE
)