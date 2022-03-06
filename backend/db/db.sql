CREATE TABLE account (
	user_id serial PRIMARY KEY,
	username VARCHAR ( 50 ) UNIQUE NOT NULL,
	password VARCHAR ( 50 ) NOT NULL,
	email VARCHAR ( 255 ) UNIQUE NOT NULL,
	created_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        last_login TIMESTAMP 
);
INSERT INTO account (username, password, email) VALUES ('HarisAli', '123456', 'h@gmail.com');
INSERT INTO account (username, password, email) VALUES ('Max', '123456', 'max@gmail.com');

CREATE TABLE label (
    label_id serial PRIMARY KEY,
    title VARCHAR (100) UNIQUE NOT NULL
);

CREATE TABLE todo (
	todo_id serial PRIMARY KEY,
	title VARCHAR ( 500 ) NOT NULL,
	priority varchar (6) NOT NULL,
    user_id int REFERENCES account(user_id) ON DELETE CASCADE,
	CONSTRAINT check_priority CHECK (priority IN ('HIGH', 'MEDIUM', 'LOW'))
);

CREATE TABLE todoslabel (
    todoslabel serial PRIMARY KEY,
	todo_id int REFERENCES todo(todo_id) ON DELETE SET NULL,
	label_id int REFERENCES label(label_id) ON DELETE SET NULL
);

INSERT INTO todo (title, priority, user_id) VALUES ('Clean House', 'HIGH', 1);
INSERT INTO todo (title, priority, user_id) VALUES ('Do the Laundry', 'MEDIUM', 2);
INSERT INTO todo (title, priority, user_id) VALUES ('Do Homework', 'LOW', 1);

INSERT INTO label (title) VALUES ('Cleaning');
INSERT INTO label (title) VALUES ('Working');

INSERT INTO todoslabel (todo_id, label_id) VALUES (1, 1);
INSERT INTO todoslabel (todo_id, label_id) VALUES (1, 2);
INSERT INTO todoslabel (todo_id, label_id) VALUES (2, 1);
INSERT INTO todoslabel (todo_id, label_id) VALUES (3, 2);

SELECT EMP_ID, NAME, DEPT FROM COMPANY FULL OUTER JOIN DEPARTMENT
   ON COMPANY.ID = DEPARTMENT.EMP_ID;

select tdl.todo_id, tdl.title, tdl.priority, l.title from (select t.todo_id, t.user_id, t.title, t.priority, tl.label_id from todo t join todoslabel tl on t.todo_id = tl.todo_id) tdl join label l on tdl.label_id = l.label_id where tdl.user_id = 1 ORDER BY tdl.todo_id ASC;