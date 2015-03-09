CREATE TABLE pictures (
  id int(11) NOT NULL AUTO_INCREMENT,
  fileName varchar(255) CHARACTER SET latin1 DEFAULT NULL,
  caption varchar(255) DEFAULT NULL,
  created timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  deleted tinyint(1) DEFAULT NULL,
  abuse int(11) DEFAULT '0',
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
