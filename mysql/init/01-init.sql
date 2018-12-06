CREATE DATABASE IF NOT EXISTS `test`;

CREATE USER 'dev'@'%' IDENTIFIED BY 'password';
CREATE USER 'test'@'%' IDENTIFIED BY 'password';

GRANT ALL PRIVILEGES ON dev.* TO 'dev'@'%';
GRANT ALL PRIVILEGES ON test.* TO 'test'@'%';