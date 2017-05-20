-- MySQL dump 10.13  Distrib 5.7.17, for osx10.12 (x86_64)
--
-- Host: localhost    Database: gittrendingtest_db
-- ------------------------------------------------------
-- Server version	5.7.17

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `SequelizeMeta`
--

DROP TABLE IF EXISTS `SequelizeMeta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `SequelizeMeta` (
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`name`),
  UNIQUE KEY `name` (`name`),
  UNIQUE KEY `SequelizeMeta_name_unique` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `SequelizeMeta`
--

LOCK TABLES `SequelizeMeta` WRITE;
/*!40000 ALTER TABLE `SequelizeMeta` DISABLE KEYS */;
INSERT INTO `SequelizeMeta` VALUES ('20170513002850-user_table.js'),('20170513003231-repo_table.js'),('20170513003710-topic_table.js'),('20170513003855-keywords-table.js'),('20170513004855-seed_data.js'),('20170513040530-many-to-many.js'),('20170513041211-many-to-many-seeds.js'),('20170513205436-repo_table_two.js'),('20170515233228-repo-table-three.js'),('20170516032857-users_repos_favorite_table.js'),('20170516033142-repos_table_repo_score_column.js'),('20170517010156-users_repos_favorite_addColumn.js'),('20170518023558-add_column_users_table.js');
/*!40000 ALTER TABLE `SequelizeMeta` ENABLE KEYS */;
UNLOCK TABLES;

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

LOCK TABLES `keywords` WRITE;
/*!40000 ALTER TABLE `keywords` DISABLE KEYS */;
INSERT INTO `keywords` VALUES (1,'JavaScript',1);
/*!40000 ALTER TABLE `keywords` ENABLE KEYS */;
UNLOCK TABLES;

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

LOCK TABLES `keywords_repos` WRITE;
/*!40000 ALTER TABLE `keywords_repos` DISABLE KEYS */;
INSERT INTO `keywords_repos` VALUES (1,1,1);
/*!40000 ALTER TABLE `keywords_repos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `keywords_topics`
--

DROP TABLE IF EXISTS `keywords_topics`;
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

LOCK TABLES `keywords_topics` WRITE;
/*!40000 ALTER TABLE `keywords_topics` DISABLE KEYS */;
INSERT INTO `keywords_topics` VALUES (1,1,1);
/*!40000 ALTER TABLE `keywords_topics` ENABLE KEYS */;
UNLOCK TABLES;

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
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `repos`
--

LOCK TABLES `repos` WRITE;
/*!40000 ALTER TABLE `repos` DISABLE KEYS */;
INSERT INTO `repos` VALUES (1,'React','A declarative, efficient, and flexible JavaScript library for building user interfaces','https://github.com/facebook/react',1,1),(2,'Another React','Another React','https://github.com/facebook/react',1,0),(3,'progressive web apps','A selection of Progressive Web Apps','https://github.com/pwarocks/pwa.rocks',1,0),(4,'progressive web apps','A selection of Progressive Web Apps','https://github.com/pwarocks/pwa.rocks',1,0),(5,'progressive web apps','A selection of Progressive Web Apps','https://github.com/pwarocks/pwa.rocks',1,0),(6,'progressive web apps','A selection of Progressive Web Apps','https://github.com/pwarocks/pwa.rocks',1,0),(7,'progressive web apps','A selection of Progressive Web Apps','https://github.com/pwarocks/pwa.rocks',1,0),(8,'progressive web apps','A selection of Progressive Web Apps','https://github.com/pwarocks/pwa.rocks',1,0),(9,'progressive web apps','A selection of Progressive Web Apps','https://github.com/pwarocks/pwa.rocks',1,0),(10,'progressive web apps','A selection of Progressive Web Apps','https://github.com/pwarocks/pwa.rocks',1,0),(11,'progressive web apps','A selection of Progressive Web Apps','https://github.com/pwarocks/pwa.rocks',1,0),(12,'progressive web apps','A selection of Progressive Web Apps','https://github.com/pwarocks/pwa.rocks',1,0);
/*!40000 ALTER TABLE `repos` ENABLE KEYS */;
UNLOCK TABLES;

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

LOCK TABLES `repos_topics` WRITE;
/*!40000 ALTER TABLE `repos_topics` DISABLE KEYS */;
INSERT INTO `repos_topics` VALUES (1,1,1);
/*!40000 ALTER TABLE `repos_topics` ENABLE KEYS */;
UNLOCK TABLES;

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
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `topics`
--

LOCK TABLES `topics` WRITE;
/*!40000 ALTER TABLE `topics` DISABLE KEYS */;
INSERT INTO `topics` VALUES (1,'React',1),(2,'JavaScript',1),(3,'progressive web apps',1),(4,'progressive web apps',1),(5,'progressive web apps',1),(6,'progressive web apps',1),(7,'progressive web apps',1),(8,'progressive web apps',1),(9,'progressive web apps',1),(10,'progressive web apps',1),(11,'progressive web apps',1),(12,'progressive web apps',1);
/*!40000 ALTER TABLE `topics` ENABLE KEYS */;
UNLOCK TABLES;

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

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'John.Doe',NULL,NULL,NULL,NULL),(2,'Jane.Doe',NULL,NULL,NULL,NULL),(3,'1561825','Meggin Kearney','Meggin','https://github.com/Meggin','meggin.kearney@gmail.com');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

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

LOCK TABLES `users_repos_favorite` WRITE;
/*!40000 ALTER TABLE `users_repos_favorite` DISABLE KEYS */;
INSERT INTO `users_repos_favorite` VALUES (1,1,1,1,0),(2,1,2,0,1);
/*!40000 ALTER TABLE `users_repos_favorite` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2017-05-20 11:39:58
