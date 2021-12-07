CREATE TABLE IF NOT EXISTS forum_messages (
    id INT(12) NOT NULL auto_increment PRIMARY KEY,
    sender_id INT(12) NOT NULL,
    recipient_id INT(12) NOT NULL,
    subject_line VARCHAR(100),
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    sender_delete TINYINT(1) NOT NULL DEFAULT 0,
    recipient_delete TINYINT(1) NOT NULL DEFAULT 0,
    message TINYTEXT,
    CONSTRAINT fk_sender FOREIGN KEY (sender_id)
    REFERENCES users(id)
    ON DELETE CASCADE,
    CONSTRAINT fk_recipient FOREIGN KEY (recipient_id)
    REFERENCES users(id)
    ON DELETE CASCADE
)