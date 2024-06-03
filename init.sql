CREATE TABLE persons (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    age INT NOT NULL
);

INSERT INTO persons (name, age) VALUES ('John Doe', 30);
INSERT INTO persons (name, age) VALUES ('Jane Smith', 25);
INSERT INTO persons (name, age) VALUES ('Emily Johnson', 35);
INSERT INTO persons (name, age) VALUES ('Michael Brown', 40);
