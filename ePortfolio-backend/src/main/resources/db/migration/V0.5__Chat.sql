CREATE TABLE IF NOT EXISTS chats (
    ID UUID PRIMARY KEY NOT NULL,
    chat_name VARCHAR(90) NOT NULL
);
CREATE TABLE IF NOT EXISTS chat_members (
    ID SERIAL PRIMARY KEY NOT NULL,
    chat_id UUID NOT NULL,
    member_id UUID NOT NULL,
    FOREIGN KEY (member_id) REFERENCES users (ID),
    FOREIGN KEY (chat_id) REFERENCES chats (ID)
);
CREATE TABLE IF NOT EXISTS messages (
    ID SERIAL PRIMARY KEY NOT NULL,
    chat_id UUID NOT NULL,
    sender_id UUID NOT NULL,
    send_date timestamp NOT NULL DEFAULT now(),
    message VARCHAR(10000) NOT NULL,
    FOREIGN KEY (sender_id) REFERENCES users (ID),
    FOREIGN KEY (chat_id) REFERENCES chats (ID)
);