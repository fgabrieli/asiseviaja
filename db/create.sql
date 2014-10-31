CREATE DATABASE asiseviaja;
USE asiseviaja;
CREATE TABLE `pictures` (
 `id` int(11) NOT NULL DEFAULT '0',
 `fileName` varchar(255) CHARACTER SET latin1 DEFAULT NULL,
 PRIMARY KEY (`id`)
 ENGINE=InnoDB DEFAULT CHARSET=utf8;