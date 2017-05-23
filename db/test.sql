DROP DATABASE gittrendingtest_db;

CREATE DATABASE gittrendingtest_db;

USE gittrendingtest_db;

--
-- Table structure for table `users`
--
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `github_id` varchar(255) NOT NULL,
  `displayName` varchar(255) DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL,
  `profileUrl` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `users`
--
INSERT INTO `users` VALUES (1,'John.Doe',NULL,NULL,NULL,NULL),(2,'Jane.Doe',NULL,NULL,NULL,NULL),(3,'1561825','Meggin Kearney','Meggin','https://github.com/Meggin','meggin.kearney@gmail.com');

--
-- Table structure for table `topics`
--
CREATE TABLE `topics` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `topic_name` varchar(255) NOT NULL,
  `userId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  CONSTRAINT `topics_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `topics`
--
INSERT INTO `topics` VALUES (1,'React',1),(2,'JavaScript',1),(3,'progressive web apps',1),(4,'progressive web apps',1),(5,'progressive web apps',1),(6,'progressive web apps',1),(7,'progressive web apps',1),(8,'progressive web apps',1),(9,'progressive web apps',1),(10,'progressive web apps',1),(11,'progressive web apps',1),(12,'progressive web apps',1);

CREATE TABLE `repos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `repo_name` varchar(255) NOT NULL,
  `repo_description` varchar(255) DEFAULT NULL,
  `repo_link` varchar(255) NOT NULL,
  `userId` int(11) DEFAULT NULL,
  `repo_score` int(11) DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  CONSTRAINT `repos_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `repos`
--
INSERT INTO `repos` VALUES (1,'React','A declarative, efficient, and flexible JavaScript library for building user interfaces','https://github.com/facebook/react',1,1),(2,'Another React','Another React','https://github.com/facebook/react',1,0),(3,'progressive web apps','A selection of Progressive Web Apps','https://github.com/pwarocks/pwa.rocks',1,0),(4,'progressive web apps','A selection of Progressive Web Apps','https://github.com/pwarocks/pwa.rocks',1,0),(5,'progressive web apps','A selection of Progressive Web Apps','https://github.com/pwarocks/pwa.rocks',1,0),(6,'progressive web apps','A selection of Progressive Web Apps','https://github.com/pwarocks/pwa.rocks',1,0),(7,'progressive web apps','A selection of Progressive Web Apps','https://github.com/pwarocks/pwa.rocks',1,0),(8,'progressive web apps','A selection of Progressive Web Apps','https://github.com/pwarocks/pwa.rocks',1,0),(9,'progressive web apps','A selection of Progressive Web Apps','https://github.com/pwarocks/pwa.rocks',1,0),(10,'progressive web apps','A selection of Progressive Web Apps','https://github.com/pwarocks/pwa.rocks',1,0),(11,'progressive web apps','A selection of Progressive Web Apps','https://github.com/pwarocks/pwa.rocks',1,0),(12,'progressive web apps','A selection of Progressive Web Apps','https://github.com/pwarocks/pwa.rocks',1,0);

--
-- Table structure for table `repos_topics`
--
CREATE TABLE `repos_topics` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `repoId` int(11) DEFAULT NULL,
  `topicId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `repoId` (`repoId`),
  KEY `topicId` (`topicId`),
  CONSTRAINT `repos_topics_ibfk_1` FOREIGN KEY (`repoId`) REFERENCES `repos` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `repos_topics_ibfk_2` FOREIGN KEY (`topicId`) REFERENCES `topics` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `repos_topics`
--
INSERT INTO `repos_topics` VALUES (1,1,1);

--
-- Table structure for table `users_repos_favorite`
--
CREATE TABLE `users_repos_favorite` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) DEFAULT NULL,
  `repoId` int(11) DEFAULT NULL,
  `repo_upvoted` tinyint(1) NOT NULL DEFAULT '0',
  `repo_downvoted` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  KEY `repoId` (`repoId`),
  CONSTRAINT `users_repos_favorite_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `users_repos_favorite_ibfk_2` FOREIGN KEY (`repoId`) REFERENCES `repos` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `users_repos_favorite`
--
INSERT INTO `users_repos_favorite` VALUES (1,1,1,1,0),(2,1,2,0,1);
