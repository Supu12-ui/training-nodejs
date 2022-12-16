CREATE DATABASE my-node;
 
 
CREATE TABLE `countries` (
 `id` int(11) NOT NULL AUTO_INCREMENT,
 `name` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
 `status` tinyint(1) NOT NULL DEFAULT '1' COMMENT '1=Active | 0=Inactive',
 PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
 
CREATE TABLE `states` (
 `id` int(11) NOT NULL AUTO_INCREMENT,
 `country_id` int(11) NOT NULL,
 `name` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
 `status` tinyint(1) NOT NULL DEFAULT '1' COMMENT '1=Active | 0=Inactive',
 PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
 
CREATE TABLE `cities` (
 `id` int(11) NOT NULL AUTO_INCREMENT,
 `state_id` int(11) NOT NULL,
 `name` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
 `status` tinyint(1) NOT NULL DEFAULT '1' COMMENT '1=Active | 0=Inactive',
 PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
 
INSERT INTO `countries` VALUES (1, 'USA', 1);
INSERT INTO `countries` VALUES (2, 'Canada', 1);
 
 
INSERT INTO `states` VALUES (1, 1, 'New York', 1);
INSERT INTO `states` VALUES (2, 1, 'Los Angeles', 1);
INSERT INTO `states` VALUES (3, 2, 'British Columbia', 1);
INSERT INTO `states` VALUES (4, 2, 'Torentu', 1);
 
 
INSERT INTO `cities` VALUES (1, 2, 'Los Angales', 1);
INSERT INTO `cities` VALUES (2, 1, 'New York', 1);
INSERT INTO `cities` VALUES (3, 4, 'Toranto', 1);
INSERT INTO `cities` VALUES (4, 3, 'Vancovour', 1);