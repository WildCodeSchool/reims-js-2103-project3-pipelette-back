DROP DATABASE IF EXISTS pipelette;
CREATE DATABASE pipelette;
USE pipelette;

CREATE TABLE `user` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `email` VARCHAR(100) NOT NULL,
    `password` VARCHAR(256) NOT NULL,
    PRIMARY KEY (`id`)
);

CREATE TABLE `playlist` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(255) NOT NULL,
    PRIMARY KEY (`id`)
);

CREATE TABLE `capsule` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `audio_path` VARCHAR(255) NOT NULL,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `audio_title` VARCHAR(100) NOT NULL,
    PRIMARY KEY (`id`)
);