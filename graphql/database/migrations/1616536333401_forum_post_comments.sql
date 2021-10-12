CREATE TABLE IF NOT EXISTS forum_post_comments (
    id INT(12) NOT NULL auto_increment PRIMARY KEY,
    post_id INT(12) NOT NULL,
    author_id INT(12) NOT NULL,
    comment VARCHAR(250),
	INDEX fpcauthor_ind (author_id),
    INDEX fpcpost_ind (post_id),
	CONSTRAINT fk_fpcauthor FOREIGN KEY (author_id)
	REFERENCES users(id)
	ON DELETE CASCADE
	ON UPDATE CASCADE,
    CONSTRAINT fk_fpcpost FOREIGN KEY (post_id)
    REFERENCES forum_posts(id)
    ON DELETE CASCADE
    ON UPDATE CASCADE
)