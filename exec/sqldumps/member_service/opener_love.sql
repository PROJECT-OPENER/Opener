-- MySQL dump 10.13  Distrib 8.0.31, for Win64 (x86_64)
--
-- Host: k8c1041.p.ssafy.io    Database: opener
-- ------------------------------------------------------
-- Server version	8.0.32

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `love`
--

DROP TABLE IF EXISTS `love`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `love` (
  `love_id` bigint NOT NULL AUTO_INCREMENT,
  `create_date` datetime DEFAULT NULL,
  `last_modified_date` datetime NOT NULL,
  `is_love` bit(1) DEFAULT NULL,
  `member_id` bigint DEFAULT NULL,
  `member_challenge_id` bigint DEFAULT NULL,
  PRIMARY KEY (`love_id`),
  KEY `FK3h2wtnhksh9lrfmpyew0ms3nk` (`member_id`),
  KEY `FKcqa1jxxb74fykfnmgxubpch1o` (`member_challenge_id`),
  CONSTRAINT `FK3h2wtnhksh9lrfmpyew0ms3nk` FOREIGN KEY (`member_id`) REFERENCES `member` (`member_id`),
  CONSTRAINT `FKcqa1jxxb74fykfnmgxubpch1o` FOREIGN KEY (`member_challenge_id`) REFERENCES `member_challenge` (`member_challenge_id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `love`
--

LOCK TABLES `love` WRITE;
/*!40000 ALTER TABLE `love` DISABLE KEYS */;
INSERT INTO `love` VALUES (1,'2023-05-16 05:33:47','2023-05-17 03:04:27',_binary '\0',2,1),(2,'2023-05-16 06:15:27','2023-05-18 11:44:56',_binary '\0',3,1),(3,'2023-05-16 11:32:42','2023-05-18 11:44:56',_binary '\0',1,1),(4,'2023-05-17 00:42:31','2023-05-18 11:45:04',_binary '\0',1,2),(5,'2023-05-17 02:10:50','2023-05-17 02:42:43',_binary '\0',9,9),(6,'2023-05-17 02:14:28','2023-05-17 02:14:46',_binary '\0',3,7),(7,'2023-05-17 06:07:30','2023-05-18 11:45:57',_binary '\0',2,10),(8,'2023-05-17 06:52:24','2023-05-18 11:45:04',_binary '\0',2,2),(9,'2023-05-17 08:10:28','2023-05-18 11:44:02',_binary '\0',1,4),(10,'2023-05-18 05:47:44','2023-05-18 05:47:44',_binary '',14,16),(11,'2023-05-18 11:48:47','2023-05-18 11:48:47',_binary '',12,16),(12,'2023-05-18 15:32:31','2023-05-18 15:32:31',_binary '',14,26),(13,'2023-05-18 15:32:44','2023-05-18 15:32:44',_binary '',12,26),(14,'2023-05-18 15:32:46','2023-05-18 15:32:46',_binary '',12,21),(15,'2023-05-18 16:05:35','2023-05-18 16:05:35',_binary '',12,28),(16,'2023-05-18 18:20:00','2023-05-18 18:20:01',_binary '',2,26),(17,'2023-05-18 18:36:12','2023-05-18 18:36:12',_binary '',1,26);
/*!40000 ALTER TABLE `love` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-05-19  7:38:46
