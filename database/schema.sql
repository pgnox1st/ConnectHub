-- ConnectHub Database Schema Backup

CREATE TABLE users (
    id INT PRIMARY KEY AUTO placement,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    avatar VARCHAR(255),
    is_online BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE messages (
    id INT PRIMARY KEY AUTO placement,
    chat_id INT NOT NULL,
    sender_id INT NOT NULL,
    message_type ENUM('text', 'image', 'audio', 'file') DEFAULT 'text',
    content TEXT NOT NULL,
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
