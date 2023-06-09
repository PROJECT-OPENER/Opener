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
-- Table structure for table `ratings`
--

DROP TABLE IF EXISTS `ratings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ratings` (
  `member_id` bigint DEFAULT NULL,
  `video_id` bigint DEFAULT NULL,
  `view_count` bigint DEFAULT NULL,
  `normalized_views` double DEFAULT NULL,
  `ratings` double DEFAULT NULL,
  `rating_id` bigint NOT NULL,
  `create_date` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ratings`
--

LOCK TABLES `ratings` WRITE;
/*!40000 ALTER TABLE `ratings` DISABLE KEYS */;
INSERT INTO `ratings` VALUES (11,1,2,0.6666666666666666,3.333333333333333,0,NULL),(11,3,2,0.6666666666666666,3.333333333333333,0,NULL),(11,4,2,0.6666666666666666,3.333333333333333,0,NULL),(11,5,3,1,5,0,NULL),(11,6,2,0.6666666666666666,3.333333333333333,0,NULL),(1,7,2,0.2857142857142857,1.4285714285714284,0,NULL),(1,8,2,0.2857142857142857,1.4285714285714284,0,NULL),(1,9,1,0.14285714285714285,0.7142857142857142,0,NULL),(1,10,1,0.14285714285714285,0.7142857142857142,0,NULL),(2,7,1,1,5,0,NULL),(2,8,1,1,5,0,NULL),(2,9,1,1,5,0,NULL),(2,10,1,1,5,0,NULL),(2,11,1,1,5,0,NULL),(2,12,1,1,5,0,NULL),(2,13,1,1,5,0,NULL),(3,7,1,1,5,0,NULL),(3,8,1,1,5,0,NULL),(3,9,1,1,5,0,NULL),(3,10,1,1,5,0,NULL),(3,11,1,1,5,0,NULL),(3,12,1,1,5,0,NULL),(3,13,1,1,5,0,NULL),(3,14,1,1,5,0,NULL),(3,15,1,1,5,0,NULL),(3,16,1,1,5,0,NULL),(3,17,1,1,5,0,NULL),(6,3,9,0.09183673469387756,0.45918367346938777,0,NULL),(13,5,1,1,5,0,NULL),(8,1,1,1,5,0,NULL),(10,1,1,0.5,2.5,0,NULL),(10,3,2,1,5,0,NULL),(6,1,98,1,5,0,NULL),(6,4,2,0.02040816326530612,0.1020408163265306,0,NULL),(4,30,2,1,5,0,NULL),(14,1,4,1,5,0,NULL),(1,1,7,1,5,0,NULL),(1,6,1,0.14285714285714285,0.7142857142857142,0,NULL),(2,3,1,1,5,0,NULL),(1,4,1,0.14285714285714285,0.7142857142857142,0,NULL),(6,49,12,0.12244897959183673,0.6122448979591837,0,NULL),(12,1,1,1,5,0,NULL);
/*!40000 ALTER TABLE `ratings` ENABLE KEYS */;
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
