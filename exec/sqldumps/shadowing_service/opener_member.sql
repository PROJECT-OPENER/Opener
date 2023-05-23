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
-- Table structure for table `member`
--

DROP TABLE IF EXISTS `member`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `member` (
  `member_id` bigint NOT NULL AUTO_INCREMENT,
  `create_date` datetime DEFAULT NULL,
  `last_modified_date` datetime NOT NULL,
  `birth` date NOT NULL,
  `email` varchar(255) NOT NULL,
  `gender` varchar(255) NOT NULL,
  `login_date` date DEFAULT NULL,
  `nickname` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `profile` varchar(255) DEFAULT NULL,
  `score` int DEFAULT NULL,
  PRIMARY KEY (`member_id`),
  UNIQUE KEY `UK_mbmcqelty0fbrvxp1q58dn57t` (`email`),
  UNIQUE KEY `UK_hh9kg6jti4n1eoiertn2k6qsc` (`nickname`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `member`
--

LOCK TABLES `member` WRITE;
/*!40000 ALTER TABLE `member` DISABLE KEYS */;
INSERT INTO `member` VALUES (1,'2023-05-02 04:44:28','2023-05-18 18:49:02','1999-11-16','opener1@naver.com','FEMALE','2023-05-18','쿵푸팬다','$2a$10$bUvuLVJdBWQJoX0Nuat.ReIRDOpKd4zwcgc5ENqDQKnOjR9dNzKIq','https://opener-bucket.s3.ap-northeast-2.amazonaws.com/static/d5241520-ea7a-417b-a485-97d6118d1f56.%EB%8B%A4%EC%9A%B4%EB%A1%9C%EB%93%9C%20%281%29.jpg',1420),(2,'2023-05-02 04:44:28','2023-05-18 18:18:30','1999-11-16','opener2@naver.com','FEMALE','2023-05-18','델몬트','$2a$10$bUvuLVJdBWQJoX0Nuat.ReIRDOpKd4zwcgc5ENqDQKnOjR9dNzKIq','https://opener-bucket.s3.ap-northeast-2.amazonaws.com/static/8a8f438d-e682-4e09-9f28-0550457123e6.3636_10174_4958.jpg',1676),(3,'2023-05-02 04:44:28','2023-05-18 15:19:51','1999-11-16','opener3@naver.com','FEMALE','2023-05-18','우승이','$2a$10$bUvuLVJdBWQJoX0Nuat.ReIRDOpKd4zwcgc5ENqDQKnOjR9dNzKIq','https://opener-bucket.s3.ap-northeast-2.amazonaws.com/static/c08e9be0-89d3-41e8-a4bc-04133d12f756.%EB%8B%A4%EC%9A%B4%EB%A1%9C%EB%93%9C%20%282%29.jpg',1680),(4,'2023-05-02 04:44:28','2023-05-18 18:49:02','1999-11-16','opener4@naver.com','FEMALE','2023-05-18','버터휘낭시에','$2a$10$bUvuLVJdBWQJoX0Nuat.ReIRDOpKd4zwcgc5ENqDQKnOjR9dNzKIq','https://opener-bucket.s3.ap-northeast-2.amazonaws.com/static/1920ffd4-7572-4f37-9c89-793156c46ed5.307267611fceba.jpg',1208),(5,'2023-05-15 06:45:24','2023-05-15 06:53:17','2023-05-22','tbja@naver.com','MALE','2023-05-15','ssafy.kim','$2a$10$ajBy2Whsb/jfdn.ScOogEOg2hz6sMxXAr94.M8LymtkOfoCSiL3JG',NULL,1500),(6,'2023-05-15 08:47:35','2023-05-18 00:22:43','2023-05-11','dmsgur7112@naver.com','MALE','2023-05-18','sddddf','$2a$10$aBja4gIAQFM8ynJtqUJIxOv5g57Tsjv/0p4Mjx6xB3HUJ3F2gsM46','https://opener-bucket.s3.ap-northeast-2.amazonaws.com/static/57d9ffed-3be9-4b72-9927-4d4270d6ec65.IMG_1925.JPG',1532),(7,'2023-05-16 06:22:56','2023-05-18 00:21:04','1999-11-16','opener5@naver.com','FEMALE','2023-05-18','초코비','$2a$10$Jvqyvb2FtCs3ZUlK1eB9/.Vw/APDmh8ANwvKD2N37rMupCTkx/hta','https://opener-bucket.s3.ap-northeast-2.amazonaws.com/static/415f3a09-9ed2-4e44-9750-7eaac98a5573.cookie.png',1500),(8,'2023-05-16 06:33:47','2023-05-18 01:47:09','1993-05-16','whdgur1068@naver.com','MALE','2023-05-18','유애나','$2a$10$Ow/wL28M9BMdIYKnuAH/uutRinvRe6b7wrrjBno8j1DYDkx/pDRDy','https://opener-bucket.s3.ap-northeast-2.amazonaws.com/static/c40c4b38-1ab3-481c-98d2-51a1765f3bea.blob',1516),(9,'2023-05-17 01:49:43','2023-05-18 00:10:41','1979-04-10','celpegor216@gmail.com','MALE','2023-05-18','실코','$2a$10$8A6wJaEPliiEpl6WhSC/k.K4XMYGXn3R.jzkbDiK7ksn4wWM5g2sG',NULL,1484),(10,'2023-05-17 09:46:08','2023-05-18 18:18:30','2023-05-04','fpdhslr7@naver.com','MALE','2023-05-18','moonthree','$2a$10$FopbuR6L5oPvgHeOkSHEq.pFJQfiPHu2IE6WzuDqEdPPNVo6j4A9S','https://opener-bucket.s3.ap-northeast-2.amazonaws.com/static/4292449a-5c8c-43f4-aef4-28d3bbaa55b6.blob',1564),(11,'2023-05-17 09:46:59','2023-05-18 00:25:27','1995-01-30','ss6116@daum.net','MALE','2023-05-18','ss6116','$2a$10$nW3oM027M66SsNG0DloPTODUXKcFfMxTw0Yf/wARCqIK98/6oIoly','https://opener-bucket.s3.ap-northeast-2.amazonaws.com/static/fc8dcf07-2c14-4b66-aede-5b13165e2547.blob',1500),(12,'2023-05-17 09:48:19','2023-05-18 04:00:15','2023-05-15','sooyeon0515@naver.com','FEMALE','2023-05-18','수연임','$2a$10$zufZ.uFk.tmmWnQvAVx.Pu9urdrrGjRIzMpKtgJOVzKmQrMvb6V/G','https://opener-bucket.s3.ap-northeast-2.amazonaws.com/static/3ced84c0-c113-4bde-9a05-b52a778b45b3.blob',1484),(13,'2023-05-17 10:31:04','2023-05-18 17:05:12','1999-11-16','yoonmihy@naver.com','FEMALE','2023-05-18','미미짱','$2a$10$igpfsJqkuaKAiY0kP7d57OL3khSiqM9oU0n7dS4AiNFwWp8.ZumZG','https://opener-bucket.s3.ap-northeast-2.amazonaws.com/static/10c5f627-759e-4317-80b9-9ded9b8c850d.sloth-lying-on-tree-branch.jpg',836),(14,'2023-05-17 10:32:09','2023-05-18 17:06:46','1996-06-15','daydeuk@naver.com','MALE','2023-05-18','대이득','$2a$10$SM5wuqkBxI0JH18LpGSf6e8HEHDO3hsAyM.aXxsJynwBPXDcV0EFW','https://opener-bucket.s3.ap-northeast-2.amazonaws.com/static/7bdc5d83-ffd0-4c29-a19a-e237c56ca7ef.blob',1468);
/*!40000 ALTER TABLE `member` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-05-19  7:39:39
