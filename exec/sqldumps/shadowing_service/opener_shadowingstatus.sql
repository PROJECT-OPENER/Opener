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
-- Table structure for table `shadowingstatus`
--

DROP TABLE IF EXISTS `shadowingstatus`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `shadowingstatus` (
  `status_id` bigint NOT NULL AUTO_INCREMENT,
  `create_date` datetime DEFAULT NULL,
  `last_modified_date` datetime NOT NULL,
  `repeat_count` int NOT NULL,
  `status_date` date DEFAULT NULL,
  `view_count` int NOT NULL,
  `member_id` bigint NOT NULL,
  `video_id` bigint NOT NULL,
  PRIMARY KEY (`status_id`),
  KEY `FK7y5rwb59q1dvvv5w9yd5hmq7h` (`member_id`),
  KEY `FKmaedx1m61xyu6qynq870fis3u` (`video_id`),
  CONSTRAINT `FK7y5rwb59q1dvvv5w9yd5hmq7h` FOREIGN KEY (`member_id`) REFERENCES `member` (`member_id`),
  CONSTRAINT `FKmaedx1m61xyu6qynq870fis3u` FOREIGN KEY (`video_id`) REFERENCES `shadowingvideo` (`video_id`)
) ENGINE=InnoDB AUTO_INCREMENT=74 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `shadowingstatus`
--

LOCK TABLES `shadowingstatus` WRITE;
/*!40000 ALTER TABLE `shadowingstatus` DISABLE KEYS */;
INSERT INTO `shadowingstatus` VALUES (63,'2023-05-18 18:24:15','2023-05-18 18:24:40',1,NULL,1,11,49),(64,'2023-05-18 18:31:24','2023-05-18 18:31:24',1,NULL,1,1,49),(65,'2023-05-18 18:46:07','2023-05-18 18:53:33',1,NULL,2,1,1),(66,'2023-05-18 18:50:58','2023-05-18 18:50:58',1,NULL,1,1,19),(67,'2023-05-18 18:53:42','2023-05-18 18:55:38',1,NULL,3,1,6),(68,'2023-05-18 19:10:04','2023-05-18 19:18:24',1,NULL,4,12,1),(69,'2023-05-18 19:36:32','2023-05-18 19:53:14',1,NULL,5,10,1),(70,'2023-05-18 19:38:15','2023-05-18 19:38:15',1,NULL,1,10,51),(71,'2023-05-18 19:51:40','2023-05-18 19:51:40',1,NULL,1,10,3),(72,'2023-05-18 21:16:48','2023-05-18 22:05:17',1,NULL,4,6,1),(73,'2023-05-18 21:26:38','2023-05-18 21:26:38',1,NULL,1,6,5);
/*!40000 ALTER TABLE `shadowingstatus` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-05-19  7:39:43
