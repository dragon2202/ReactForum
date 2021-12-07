CREATE TABLE IF NOT EXISTS forum_comments_downvote (
    comment_id INT(12) NOT NULL,
    author_id INT(12) NOT NULL,
    UNIQUE KEY(comment_id, author_id),
    CONSTRAINT fk_fcdcomment FOREIGN KEY(comment_id)
    REFERENCES forum_posts(id)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
    CONSTRAINT fk_fcdauthor FOREIGN KEY(author_id)
    REFERENCES users(id)
    ON DELETE CASCADE
    ON UPDATE CASCADE
)
