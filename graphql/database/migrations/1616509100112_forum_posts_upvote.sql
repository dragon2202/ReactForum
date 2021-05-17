CREATE TABLE IF NOT EXISTS forum_posts_upvote (
    post_id INT(12) NOT NULL,
    author_id INT(12) NOT NULL,
    UNIQUE KEY(post_id, author_id),
    CONSTRAINT fk_fpupost FOREIGN KEY(post_id)
    REFERENCES forum_posts(id)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
    CONSTRAINT fk_fpuauthor FOREIGN KEY(author_id)
    REFERENCES users(id)
    ON DELETE CASCADE
    ON UPDATE CASCADE
)
