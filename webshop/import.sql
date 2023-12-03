DROP DATABASE IF EXISTS `webshop`;

CREATE DATABASE `webshop`;

USE `webshop`;

CREATE TABLE
    `admin` (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(20) NOT NULL,
        wachtwoord VARCHAR(20) NOT NULL
    );

INSERT INTO
    admin (username, wachtwoord)
VALUES
    ('bit_academy', 'bit_academy');

CREATE TABLE
    products (
        id INT AUTO_INCREMENT PRIMARY KEY,
        productnaam VARCHAR(100) NOT NULL,
        prijs DECIMAL(10, 2) NOT NULL,
        afbeelding_url VARCHAR(255) NOT NULL,
        afzet INT NOT NULL
    );

INSERT INTO
    products (productnaam, prijs, afbeelding_url, afzet)
VALUES
    (
        'high on life',
        50.00,
        'https://th.bing.com/th/id/OIP.CqDpAbDgV7mwSuf2kbp0LgHaEK?w=319&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7',
        0
    ),
    (
        'Amumu Picture',
        40.00,
        'https://th.bing.com/th/id/R.859f7848348b7366c642b07c488102c8?rik=BLCaLpwKaaz78g&pid=ImgRaw&r=0',
        0
    ),
    (
        'miku',
        20.00,
        'https://th.bing.com/th/id/OIP.FO4nFf-COp1fqodFlRlfTAHaFg?w=274&h=204&c=7&r=0&o=5&dpr=1.3&pid=1.7',
        0
    );

CREATE TABLE
    orders (
        id INT AUTO_INCREMENT PRIMARY KEY,
        total VARCHAR(100) NOT NULL,
        datum TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

INSERT INTO
    orders (total)
VALUES
    (50.00),
    (40.00),
    (20.00);

CREATE TABLE
    backup LIKE products;

INSERT INTO
    backup
SELECT
    *
FROM
    products;

CREATE TABLE
    winkelwagen (
        id INT AUTO_INCREMENT PRIMARY KEY,
        productnaam VARCHAR(20) NOT NULL,
        prijs DECIMAL(10, 2) NOT NULL,
        afbeelding TEXT,
        afzet INT
    );

INSERT INTO
    winkelwagen (productnaam, prijs, afbeelding, afzet)
VALUES
    (
        'high on life',
        50.00,
        'https://th.bing.com/th/id/OIP.CqDpAbDgV7mwSuf2kbp0LgHaEK?w=319&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7',
        0
    ),
    (
        'Amumu Picture',
        40.00,
        'https://th.bing.com/th/id/R.859f7848348b7366c642b07c488102c8?rik=BLCaLpwKaaz78g&pid=ImgRaw&r=0',
        0
    ),
    (
        'miku',
        20.00,
        'https://th.bing.com/th/id/OIP.FO4nFf-COp1fqodFlRlfTAHaFg?w=274&h=204&c=7&r=0&o=5&dpr=1.3&pid=1.7',
        0
    );