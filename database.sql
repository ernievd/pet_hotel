-- Copy and paste all and run command enter

BEGIN;
CREATE TABLE owner(
id SERIAL PRIMARY KEY,
first_name VARCHAR(150) NOT NULL,
last_name VARCHAR(150) NOT NULL
);

CREATE TABLE visit(
id SERIAL PRIMARY KEY,
check_in_date DATE NOT NULL,
check_out_date DATE NOT NULL);

CREATE TABLE pet(
id SERIAL PRIMARY KEY,
name VARCHAR(150) NOT NULL,
breed VARCHAR(150) NOT NULL,
color VARCHAR(100) NOT NULL,
is_checked_in BOOLEAN DEFAULT 'FALSE',
visit_id INT REFERENCES visit);

CREATE TABLE owner_pet(
id SERIAL PRIMARY KEY,
owner_id INT REFERENCES owner,
pet_id INT REFERENCES pet); 


INSERT INTO owner(first_name, last_name)
VALUES('Ross','Doss'),
('Ernie','Bernie'),
('Amy','Jamie'),
('Patrick','Batlick'),
('Kris','Bliss'),
('Dane','Lane'),
('Ally','Pally'),
('Mary','Dairy');

INSERT INTO pet(name, breed, color, is_checked_in)
VAlUES('Woofer', 'Black Lab', 'Blackish', 'F'),
('Soundz', 'Chinchilla', 'Gray', 'F'),
('Lare', 'Egyptian Mole Cat', 'Pink', 'F'),
('Bagger', 'Ring Tail Lemur', 'Striped', 'F'),
('Sog', 'Gray Duck', 'Grey', 'F'),
('Watcher-in-the-rye', 'Meadow Mouse', 'Tan', 'F'),
('Shirt', 'Diamondback Rattlesnake', 'Brown and Green', 'F'),
('Socks', 'Red Squirrel', 'Red', 'F');

INSERT INTO owner_pet(owner_id, pet_id)
VALUES(1,1),
(2,2),
(3,3),
(4,4),
(5,5),
(6,6),
(7,7),
(8,8);
COMMIT;
