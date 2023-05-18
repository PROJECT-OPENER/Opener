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
-- Table structure for table `challenge`
--

DROP TABLE IF EXISTS `challenge`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `challenge` (
  `challenge_id` bigint NOT NULL AUTO_INCREMENT,
  `create_date` datetime DEFAULT NULL,
  `last_modified_date` datetime NOT NULL,
  `caption` longtext,
  `challenge_url` varchar(100) DEFAULT NULL,
  `end_time` varchar(100) DEFAULT NULL,
  `start_time` varchar(100) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`challenge_id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `challenge`
--

LOCK TABLES `challenge` WRITE;
/*!40000 ALTER TABLE `challenge` DISABLE KEYS */;
INSERT INTO `challenge` VALUES (2,'2023-05-16 05:28:37','2023-05-16 05:28:37','WEBVTT\n\n00:00:00.000 --> 00:00:02.004\nI brush my teeth\n\n00:00:02.002 --> 00:00:04.007\nI Spit It Up\n\n00:00:04.010 --> 00:00:07.007\nI go uhm uhm\n\n00:00:07.007 --> 00:00:09.013\nand I\'ll Lean Forward\n\n00:00:10.010 --> 00:00:13.016\npause\n\n00:00:13.020 --> 00:00:15.016\nI tell myself\n\n00:00:16.016 --> 00:00:21.021\npretty bitch','xXJItQK2u7o','','','핫걸 핫보이 모닝 루틴 챌린지'),(3,'2023-05-16 05:29:02','2023-05-16 05:29:02','WEBVTT\n\n00:00:00.000 --> 00:00:03.003\nmy god i love your skirt where did you get it\n\n00:00:03.003 --> 00:00:05.007\nuh it was my mom\'s in the 80s\n\n00:00:06.006 --> 00:00:08.008\nvintage. so adorable\n\n00:00:08.008 --> 00:00:09.012\nthanks\n\n00:00:10.010 --> 00:00:15.015\nthat is the ugliest effing skirt i\'ve ever seen','5pgBDOYhtYU','','','퀸카로 살아남는 법 챌린지'),(8,'2023-05-17 16:46:38','2023-05-17 16:46:38','WEBVTT\n\n00:00:00.000 --> 00:00:08.099\nyou are too concerned with what was and\n\n00:00:03.179 --> 00:00:12.120\nwhat will be it\'s a saying yesterday\n\n00:00:08.099 --> 00:00:16.020\nthis history tomorrow is a mystery but\n\n00:00:12.120 --> 00:00:18.800\ntoday is a gift that is why it is called\n\n00:00:16.020 --> 00:00:18.800\nthe present\n\n','r34e-ST6dAI','','','쿵푸팬더 챌린지'),(9,'2023-05-17 16:47:33','2023-05-17 16:47:33','WEBVTT\n\n00:00:00.000 --> 00:00:04.008\nAre you joking? I\'m 22.\n\n00:00:05.005 --> 00:00:06.011\nAre you joking?\n\n00:00:07.008 --> 00:00:11.010\nof course, I\'ll give you my ID.\n\n00:00:11.011 --> 00:00:13.010\nDid you hear that?\n\n00:00:13.013 --> 00:00:14.016\nDid you think this was my dad?','8jZb9Fnfu_I','','','20대와 40대 신분증 검사 반응 차이 챌린지'),(13,'2023-05-18 00:22:02','2023-05-18 00:22:02','WEBVTT\n\n00:00:00.790 --> 00:00:07.040\n[Music]\n\n00:00:03.760 --> 00:00:07.040\ni don\'t know who you are\n\n00:00:07.839 --> 00:00:12.559\ni don\'t know what you want\n\n00:00:10.080 --> 00:00:14.080\nif you are looking for ransom i can tell\n\n00:00:12.559 --> 00:00:17.119\nyou i don\'t have money\n\n00:00:14.080 --> 00:00:18.800\nbut what i do have are a very particular\n\n00:00:17.119 --> 00:00:20.640\nset of skills\n\n00:00:18.800 --> 00:00:21.680\nskills i have acquired for a very long\n\n00:00:20.640 --> 00:00:23.519\ncareer\n\n00:00:21.680 --> 00:00:24.860\nskills that make me a nightmare for\n\n00:00:23.519 --> 00:00:26.080\npeople like you\n\n00:00:24.860 --> 00:00:27.920\n[Music]\n\n00:00:26.080 --> 00:00:29.519\nif you let my daughter go now that\'ll be\n\n00:00:27.920 --> 00:00:31.359\nthe end of it\n\n00:00:29.519 --> 00:00:33.600\ni will not look for you\n\n00:00:31.359 --> 00:00:35.680\ni will not pursue you\n\n00:00:33.600 --> 00:00:37.680\nbut if you don\'t\n\n00:00:35.680 --> 00:00:40.480\ni will look for you\n\n00:00:37.680 --> 00:00:44.280\ni will find you\n\n00:00:40.480 --> 00:00:44.280\nand i will kill you\n\n00:00:46.640 --> 00:00:55.549\ngood luck\n\n00:00:48.190 --> 00:00:55.549\n[Music]\n\n','R5GGbUIVWGQ','','','테이큰 챌린지'),(14,'2023-05-18 01:00:16','2023-05-18 01:00:16','WEBVTT\n\n00:00:00.799 --> 00:00:05.200\nare you okay it\'s a bloody beautiful\n\n00:00:03.280 --> 00:00:08.240\nnight\n\n00:00:05.200 --> 00:00:10.480\nactually there\'ll be many factors but\n\n00:00:08.240 --> 00:00:11.440\nthat\'s why i think that that\'ll be the\n\n00:00:10.480 --> 00:00:14.960\nfact is\n\n00:00:11.440 --> 00:00:18.560\nperfect you know speak together\n\n00:00:14.960 --> 00:00:22.000\ntalk together and um\n\n00:00:18.560 --> 00:00:23.680\nconsole each other for for for our youth\n\n00:00:22.000 --> 00:00:24.320\ntranslator for the rest of the band yeah\n\n00:00:23.680 --> 00:00:28.800\nof course\n\n00:00:24.320 --> 00:00:28.800\nyeah can i have some bottle of water\n\n00:00:28.840 --> 00:00:31.840\nmonster\n\n','ohUXYMSUgnU','','','방탄소년단 RM 따라잡기 챌린지'),(15,'2023-05-18 02:58:45','2023-05-18 02:58:45','WEBVTT\n\n00:00:00.179 --> 00:00:04.980\nI promise you\n\n00:00:02.700 --> 00:00:08.160\nif you put your mind to it\n\n00:00:04.980 --> 00:00:10.700\nand you work hard and you never give up\n\n00:00:08.160 --> 00:00:13.860\nand you do not listen to the rejection\n\n00:00:10.700 --> 00:00:16.759\nyou can achieve anything that life\n\n00:00:13.860 --> 00:00:16.759\nthrows your way\n\n','aRM8Yv88pqY','','','레이디가가 동기부여 챌린지'),(17,'2023-05-18 13:00:34','2023-05-18 13:00:34','WEBVTT\n\n00:00:00.240 --> 00:00:06.720\nsomeone who\'s generous and helpful is\n\n00:00:04.339 --> 00:00:08.400\na kind\n\n00:00:06.720 --> 00:00:11.400\ncourteous\n\n00:00:08.400 --> 00:00:11.400\nbenevolent\n\n00:00:12.780 --> 00:00:19.800\nnice a question two if you feel unhappy\n\n00:00:16.800 --> 00:00:22.140\nyou are sad\n\n00:00:19.800 --> 00:00:25.140\nupset\n\n00:00:22.140 --> 00:00:25.140\ndejected\n\n00:00:26.039 --> 00:00:33.620\ninteresting and if a painting is\n\n00:00:29.039 --> 00:00:38.700\nattractive you can say it\'s beautiful\n\n00:00:33.620 --> 00:00:38.700\neye-catching huh mesmerizing\n\n','no6sA5iys5Q','','','표현 배우기 챌린지'),(18,'2023-05-18 13:02:06','2023-05-18 13:02:06','WEBVTT\n\n00:00:00.179 --> 00:00:07.259\nstop saying very all the time hey let\'s\n\n00:00:03.360 --> 00:00:08.639\ngo to a restaurant nah I\'m okay God you\n\n00:00:07.259 --> 00:00:12.179\nare indolent\n\n00:00:08.639 --> 00:00:15.059\nno I\'m just exhausted come on I\'m\n\n00:00:12.179 --> 00:00:18.779\nstarving look at yourself you should go\n\n00:00:15.059 --> 00:00:21.180\non a diet you are a beast I don\'t care I\n\n00:00:18.779 --> 00:00:25.260\nwant pizza we have food in the fridge\n\n00:00:21.180 --> 00:00:28.279\nand it\'s delicious you make me depressed\n\n00:00:25.260 --> 00:00:28.279\nsometimes you know\n\n','IA-YkyjN4Wk','','','표현 배우기 챌린지II');
/*!40000 ALTER TABLE `challenge` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-05-19  7:40:42
