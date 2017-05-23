CREATE DATABASE gittrendingtest_db;

USE gittrendingtest_db;

--
-- Table structure for table `users`
--
DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `github_id` varchar(255) NOT NULL,
  `displayName` varchar(255) DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL,
  `profileUrl` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'John.Doe',NULL,NULL,NULL,NULL),(2,'Jane.Doe',NULL,NULL,NULL,NULL),(3,'1561825','Meggin Kearney','Meggin','https://github.com/Meggin','meggin.kearney@gmail.com');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;

--
-- Table structure for table `topics`
--
DROP TABLE IF EXISTS `topics`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `topics` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `topic_name` varchar(255) NOT NULL,
  `userId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  CONSTRAINT `topics_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `topics`
--
/*!40000 ALTER TABLE `topics` DISABLE KEYS */;
INSERT INTO `topics` VALUES (1,'React',1),(2,'JavaScript',1);
/*!40000 ALTER TABLE `topics` ENABLE KEYS */;

--
-- Table structure for table `repos`
--
DROP TABLE IF EXISTS `repos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
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
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `repos`
--
/*!40000 ALTER TABLE `repos` DISABLE KEYS */;
INSERT INTO `repos` VALUES (1,'React','A declarative, efficient, and flexible JavaScript library for building user interfaces','https://github.com/facebook/react',1,1),(2,'Another React','Another React','https://github.com/facebook/react',1,0);
/*!40000 ALTER TABLE `repos` ENABLE KEYS */;

--
-- Table structure for table `repos_topics`
--
DROP TABLE IF EXISTS `repos_topics`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
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
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `repos_topics`
--
/*!40000 ALTER TABLE `repos_topics` DISABLE KEYS */;
INSERT INTO `repos_topics` VALUES (1,1,1);
/*!40000 ALTER TABLE `repos_topics` ENABLE KEYS */;

--
-- Table structure for table `users_repos_favorite`
--
DROP TABLE IF EXISTS `users_repos_favorite`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
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
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users_repos_favorite`
--
/*!40000 ALTER TABLE `users_repos_favorite` DISABLE KEYS */;
INSERT INTO `users_repos_favorite` VALUES (1,1,1,1,0),(2,1,2,0,1);
/*!40000 ALTER TABLE `users_repos_favorite` ENABLE KEYS */;

--
-- Table structure for table `keywords`
--
DROP TABLE IF EXISTS `keywords`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `keywords` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `keyword_name` varchar(255) NOT NULL,
  `userId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  CONSTRAINT `keywords_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `keywords`
--
/*!40000 ALTER TABLE `keywords` DISABLE KEYS */;
INSERT INTO `keywords` VALUES (1,'JavaScript',1);
/*!40000 ALTER TABLE `keywords` ENABLE KEYS */;

--
-- Table structure for table `keywords_repos`
--
DROP TABLE IF EXISTS `keywords_repos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `keywords_repos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `repoId` int(11) DEFAULT NULL,
  `keywordId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `repoId` (`repoId`),
  KEY `keywordId` (`keywordId`),
  CONSTRAINT `keywords_repos_ibfk_1` FOREIGN KEY (`repoId`) REFERENCES `repos` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `keywords_repos_ibfk_2` FOREIGN KEY (`keywordId`) REFERENCES `keywords` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `keywords_repos`
--
/*!40000 ALTER TABLE `keywords_repos` DISABLE KEYS */;
INSERT INTO `keywords_repos` VALUES (1,1,1);
/*!40000 ALTER TABLE `keywords_repos` ENABLE KEYS */;

--
-- Table structure for table `keywords_topics`
--
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `keywords_topics` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `keywordId` int(11) DEFAULT NULL,
  `topicId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `keywordId` (`keywordId`),
  KEY `topicId` (`topicId`),
  CONSTRAINT `keywords_topics_ibfk_1` FOREIGN KEY (`keywordId`) REFERENCES `keywords` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `keywords_topics_ibfk_2` FOREIGN KEY (`topicId`) REFERENCES `topics` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `keywords_topics`
--
/*!40000 ALTER TABLE `keywords_topics` DISABLE KEYS */;
INSERT INTO `keywords_topics` VALUES (1,1,1);
/*!40000 ALTER TABLE `keywords_topics` ENABLE KEYS */;
