CREATE TABLE IF NOT EXISTS users_security_questions (
    user_id INT(12) NOT NULL,
    question VARCHAR(250) NOT NULL,
    answer VARCHAR(250) NOT NULL,
    UNIQUE KEY(user_id, question),
    CONSTRAINT fk_usquser FOREIGN KEY (user_id)
    REFERENCES users(id)
    ON DELETE CASCADE
    ON UPDATE CASCADE
)