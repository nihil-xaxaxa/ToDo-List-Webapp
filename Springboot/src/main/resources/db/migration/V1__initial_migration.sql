CREATE TABLE users (
    id SERIAL PRIMARY KEY ,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL);

CREATE TABLE tasks (
    id SERIAL PRIMARY KEY ,
    task VARCHAR(255) NOT NULL,
    description TEXT,
    due_date VARCHAR(20),
    creation_date VARCHAR(20) NOT NULL,
    completion_date VARCHAR(20),
    importance VARCHAR(20),
    mode VARCHAR(10) NOT NULL,
    is_finished BOOLEAN DEFAULT FALSE,
    user_id INT NOT NULL,
    CONSTRAINT fk_tasks_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    );

CREATE TABLE notes (
    id SERIAL PRIMARY KEY ,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    creation_date VARCHAR(20) NOT NULL,
    color VARCHAR(20) NOT NULL,
    user_id INT NOT NULL,
    CONSTRAINT fk_notes_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);


