CREATE TABLE IF NOT EXISTS forum_comments_upvote (
    comment_id INT(12) NOT NULL,
    author_id INT(12) NOT NULL,
    UNIQUE KEY(comment_id, author_id),
    CONSTRAINT fk_fcucomment FOREIGN KEY(comment_id)
    REFERENCES forum_posts(id)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
    CONSTRAINT fk_fcuauthor FOREIGN KEY(author_id)
    REFERENCES users(id)
    ON DELETE CASCADE
    ON UPDATE CASCADE
)
