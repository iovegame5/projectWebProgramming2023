CREATE DATABASE  IF NOT EXISTS `wp_project` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `wp_project`;
-- MySQL dump 10.13  Distrib 8.0.31, for macos12 (x86_64)
--
-- Host: 127.0.0.1    Database: wp_project
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
-- Table structure for table `chat_room`
--

DROP TABLE IF EXISTS `chat_room`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `chat_room` (
  `room_id` int NOT NULL AUTO_INCREMENT,
  `seller_id` int NOT NULL,
  `buyer_id` int NOT NULL,
  `lastmsgtxt` varchar(255) NOT NULL DEFAULT '',
  `lastmsgtime` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`room_id`),
  KEY `chat_room_ibfk_1` (`seller_id`),
  KEY `chat_room_ibfk_2` (`buyer_id`),
  CONSTRAINT `chat_room_ibfk_1` FOREIGN KEY (`seller_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE,
  CONSTRAINT `chat_room_ibfk_2` FOREIGN KEY (`buyer_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `chat_room`
--

LOCK TABLES `chat_room` WRITE;
/*!40000 ALTER TABLE `chat_room` DISABLE KEYS */;
INSERT INTO `chat_room` VALUES (3,4,7,'ขกทำเจคว่ะ','2023-05-21T20:06:18.826Z'),(4,5,7,'ฟหก','2023-05-21T08:09:50.475Z'),(5,7,4,'asd','2023-05-21T23:31:31.194Z'),(6,5,4,'wtf','2023-05-21T20:02:30.912Z'),(7,4,19,'โฟล์คเท่จังครับ','2023-05-22T03:01:33.989Z'),(8,7,19,'asdas','2023-05-21T23:46:22.994Z'),(9,4,20,'',NULL),(10,7,20,'',NULL),(11,4,21,'เวหฟ','2023-05-22T02:46:35.179Z'),(12,4,22,'ว่าไงสุดหล่อ','2023-05-22T03:34:38.992Z'),(13,4,23,'ๆำๆไำๆไำกฟหกฟ','2023-05-22T04:23:42.460Z'),(14,22,4,'',NULL),(15,23,4,'สวัสดี','2023-05-22T04:22:55.253Z'),(16,4,24,'ก','2023-09-11T02:53:33.977Z'),(17,23,25,'สวัสดีครับ','2024-01-14T06:46:34.307Z'),(18,21,25,'คว','2024-01-14T10:25:07.698Z');
/*!40000 ALTER TABLE `chat_room` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `favorite`
--

DROP TABLE IF EXISTS `favorite`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `favorite` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `user_id` varchar(45) NOT NULL,
  `product_id` varchar(45) NOT NULL,
  `is_fav` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=46 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `favorite`
--

LOCK TABLES `favorite` WRITE;
/*!40000 ALTER TABLE `favorite` DISABLE KEYS */;
INSERT INTO `favorite` VALUES (1,'1','27',NULL),(2,'2','28',NULL),(3,'1','28',NULL),(20,'6','27',NULL),(37,'20','36',NULL),(42,'22','38',NULL),(43,'4','40',NULL),(45,'24','38',NULL);
/*!40000 ALTER TABLE `favorite` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `messages`
--

DROP TABLE IF EXISTS `messages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `messages` (
  `message_id` int NOT NULL AUTO_INCREMENT,
  `message` varchar(255) NOT NULL,
  `sender_id` int NOT NULL,
  `reciver_id` int NOT NULL,
  `sent_time` varchar(255) NOT NULL,
  `room_id` int NOT NULL,
  PRIMARY KEY (`message_id`),
  KEY `ibk_1_idx` (`room_id`),
  KEY `ibk_2_idx` (`sender_id`),
  KEY `ibk_3_idx` (`reciver_id`),
  CONSTRAINT `ibk_1` FOREIGN KEY (`room_id`) REFERENCES `chat_room` (`room_id`) ON DELETE CASCADE,
  CONSTRAINT `ibk_2` FOREIGN KEY (`sender_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE,
  CONSTRAINT `ibk_3` FOREIGN KEY (`reciver_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=356 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `messages`
--

LOCK TABLES `messages` WRITE;
/*!40000 ALTER TABLE `messages` DISABLE KEYS */;
INSERT INTO `messages` VALUES (50,'ฟหกก',7,4,'2023-05-20T12:13:27.614Z',3),(52,'หฟกฟหก',7,4,'2023-05-20T12:16:15.843Z',3),(55,'ฟหกฟหกฟห',7,4,'2023-05-20T12:35:17.156Z',3),(56,'เห้ย อะไรวะ เห้ย อะไรวะ เห้ย อะไรวะเห้ย อะไร เห้ย อะไรวะ เห้ย อะไรวะ เห้ย อะไรวะ เห้ย อะไรวะ เห้ย อะไรวะ เห้ย อะไรวะ เห้ย อะไรวะ  เห้ย อะไรวะ เห้ย อะไรวะ เห้ย อะไรวะ เห้ย อะไรวะ เห้ย อะไรวะ เห้ย อะไรวะ เห้ย อะไรวะ เห้ย อะไรวะ',7,4,'2023-05-20T12:35:41.080Z',3),(58,'สวัสดีจ้า',7,4,'2023-05-20T12:42:33.285Z',3),(60,'สวัสดีครับ',7,4,'2023-05-21T07:23:43.776Z',3),(63,'ชื่อไร',7,4,'2023-05-21T07:23:45.552Z',3),(64,'อะ',7,4,'2023-05-21T07:23:45.973Z',3),(66,'555',7,4,'2023-05-21T07:23:47.136Z',3),(68,'อะไรวะ',7,4,'2023-05-21T07:23:49.278Z',3),(70,'ส',7,4,'2023-05-21T07:25:08.261Z',3),(71,'ส',7,4,'2023-05-21T07:25:08.262Z',3),(72,'ส',7,4,'2023-05-21T07:25:13.894Z',3),(74,'ฟหกฟหก',7,4,'2023-05-21T07:25:32.710Z',3),(76,'ฟหกฟห',7,4,'2023-05-21T07:25:42.861Z',3),(79,'ฟหกฟหกฟห',7,5,'2023-05-21T07:25:48.612Z',4),(80,'asdd',7,4,'2023-05-21T08:06:21.258Z',3),(82,'asd',7,5,'2023-05-21T08:07:13.628Z',4),(85,'สวัสดี',7,5,'2023-05-21T08:07:55.779Z',4),(86,'เห้ย',7,4,'2023-05-21T08:07:58.306Z',3),(89,'อะไรวะ',7,4,'2023-05-21T08:08:00.343Z',3),(91,'เห้ย',7,4,'2023-05-21T08:08:02.511Z',3),(93,'asd',7,4,'2023-05-21T08:09:00.213Z',3),(94,'asd',7,4,'2023-05-21T08:09:01.871Z',3),(96,'ห',7,4,'2023-05-21T08:09:19.307Z',3),(97,'ห',7,4,'2023-05-21T08:09:19.307Z',3),(98,'ฟ',7,4,'2023-05-21T08:09:21.789Z',3),(100,'s',7,4,'2023-05-21T08:09:47.017Z',3),(102,'ห',7,5,'2023-05-21T08:09:48.945Z',4),(105,'ฟหก',7,5,'2023-05-21T08:09:50.475Z',4),(106,'อะไรครับเนี่ย',4,7,'2023-05-21T08:10:22.491Z',3),(109,'อ่อน',7,4,'2023-05-21T08:12:02.667Z',3),(110,'ตวย',4,7,'2023-05-21T08:12:31.676Z',3),(112,'เอ้า',4,7,'2023-05-21T08:12:36.696Z',3),(115,'เฉย',7,4,'2023-05-21T08:13:38.040Z',3),(116,'ฟหก',4,7,'2023-05-21T08:13:41.768Z',3),(118,'asd',7,4,'2023-05-21T08:15:12.835Z',3),(121,'s',7,4,'2023-05-21T08:15:20.432Z',3),(122,'asd',4,7,'2023-05-21T08:18:18.140Z',3),(124,'อะไรวะ',4,7,'2023-05-21T08:18:27.785Z',3),(127,'ฟหก',4,7,'2023-05-21T08:18:35.368Z',3),(128,'อฟห',7,4,'2023-05-21T08:19:15.435Z',3),(130,'ฟหก',4,7,'2023-05-21T08:19:19.474Z',3),(132,'asd',7,4,'2023-05-21T08:20:11.977Z',3),(135,'asd',4,7,'2023-05-21T08:20:16.724Z',3),(136,'asd',7,4,'2023-05-21T08:21:36.843Z',3),(139,'asd',7,4,'2023-05-21T08:21:40.354Z',3),(140,'asd',7,4,'2023-05-21T08:22:21.747Z',3),(142,'asdl',7,4,'2023-05-21T08:22:31.238Z',3),(144,'asd',7,4,'2023-05-21T08:23:33.881Z',3),(145,'asd',7,4,'2023-05-21T08:23:51.516Z',3),(146,'asd',7,4,'2023-05-21T08:24:46.742Z',3),(147,'gg',7,4,'2023-05-21T08:24:49.686Z',3),(148,'asd',7,4,'2023-05-21T08:26:01.761Z',3),(149,'อะไรวะ',7,4,'2023-05-21T08:26:24.393Z',3),(150,'asd',7,4,'2023-05-21T08:27:39.712Z',3),(152,'asgasg',4,7,'2023-05-21T08:27:44.193Z',3),(155,'asd',7,4,'2023-05-21T08:28:31.749Z',3),(157,'asdasfvasv',4,7,'2023-05-21T08:28:35.814Z',3),(158,'อะไรว',4,7,'2023-05-21T08:29:32.629Z',5),(160,'ฟหกหฟ',4,7,'2023-05-21T08:32:08.033Z',5),(163,'ฟหด',7,4,'2023-05-21T08:32:10.927Z',5),(164,'ฟห',7,4,'2023-05-21T08:32:11.103Z',5),(166,'ดฟ',7,4,'2023-05-21T08:32:11.240Z',5),(168,'หด',7,4,'2023-05-21T08:32:11.379Z',5),(170,'ฟหด',7,4,'2023-05-21T08:32:11.528Z',5),(172,'ฟห',7,4,'2023-05-21T08:32:11.678Z',5),(174,'ดฟห',7,4,'2023-05-21T08:32:11.827Z',5),(176,'ด',7,4,'2023-05-21T08:32:11.979Z',5),(179,'ฟห',7,4,'2023-05-21T08:32:12.189Z',5),(181,'ฟหกฟห',4,7,'2023-05-21T08:32:17.924Z',5),(183,'gd,',4,7,'2023-05-21T08:33:23.739Z',5),(185,'asd',7,4,'2023-05-21T08:34:22.295Z',5),(187,'อะไรวะ',4,7,'2023-05-21T08:34:34.282Z',5),(188,'ฟหก',4,7,'2023-05-21T08:35:57.215Z',3),(190,'เห้ย',4,7,'2023-05-21T08:36:23.537Z',5),(192,'ฟหก',4,7,'2023-05-21T08:36:27.231Z',5),(194,'asd',7,4,'2023-05-21T08:37:15.180Z',5),(195,'asd',7,4,'2023-05-21T08:37:15.186Z',5),(197,'ก',4,7,'2023-05-21T08:37:56.081Z',3),(198,'ฟห',7,4,'2023-05-21T08:37:58.889Z',3),(199,'ฟห',7,4,'2023-05-21T08:37:58.896Z',3),(200,'อ',7,4,'2023-05-21T08:41:37.098Z',3),(202,'เห้ย',7,4,'2023-05-21T08:41:43.231Z',3),(204,'omg',4,7,'2023-05-21T08:41:46.056Z',3),(206,'asdasd',7,4,'2023-05-21T09:42:35.758Z',5),(208,'เห้ย',4,7,'2023-05-21T10:14:47.924Z',5),(210,'asd',7,4,'2023-05-21T11:11:44.664Z',3),(211,'asd',7,4,'2023-05-21T11:11:44.669Z',3),(212,'อะไรวะ',4,7,'2023-05-21T11:38:58.973Z',3),(215,'อิอิซ่าห้ห้า',4,7,'2023-05-21T11:39:03.443Z',3),(217,'ดีจ้า',4,5,'2023-05-21T11:41:49.526Z',6),(219,'เห้ย',4,5,'2023-05-21T11:41:52.626Z',6),(220,'สวัสดีครับคุณ',4,7,'2023-05-21T14:10:50.571Z',3),(222,'wtf',4,5,'2023-05-21T20:02:30.912Z',6),(224,'เห้ย',4,7,'2023-05-21T20:02:49.102Z',5),(226,'อะไรวะ',7,4,'2023-05-21T20:02:51.826Z',5),(227,'อะไรวะ',7,4,'2023-05-21T20:02:51.833Z',5),(228,'งงอะดิ',4,7,'2023-05-21T20:02:57.054Z',5),(230,'เอองงเหมือนกัน',7,4,'2023-05-21T20:03:01.888Z',5),(231,'เอองงเหมือนกัน',7,4,'2023-05-21T20:03:01.893Z',5),(233,'ขกทำเจคว่ะ',4,7,'2023-05-21T20:06:18.826Z',3),(234,'ขกทำเจกว่ะ',19,4,'2023-05-21T20:08:55.785Z',7),(236,'เหมือนกัน',4,19,'2023-05-21T20:09:04.394Z',7),(237,'เหมือนกัน',4,19,'2023-05-21T20:09:04.399Z',7),(238,'สวัสดีครับ',19,7,'2023-05-21T20:30:33.392Z',8),(239,'สวัสดีครับ',19,7,'2023-05-21T20:30:33.392Z',8),(240,'wtf',19,7,'2023-05-21T20:30:44.000Z',8),(242,'เกิดอะไรขึืน',19,7,'2023-05-21T20:30:49.379Z',8),(244,'jiojkljl;',19,4,'2023-05-21T20:34:59.403Z',7),(246,'asd',4,7,'2023-05-21T23:31:31.194Z',5),(248,'asd',4,19,'2023-05-21T23:32:52.132Z',7),(250,'ฟหก',19,4,'2023-05-21T23:39:44.847Z',7),(253,'ฟหก',19,4,'2023-05-21T23:39:45.897Z',7),(254,'ฟหก',19,4,'2023-05-21T23:39:46.152Z',7),(257,'ฟห',19,4,'2023-05-21T23:39:46.366Z',7),(258,'กฟหก',19,4,'2023-05-21T23:39:46.655Z',7),(261,'ฟหก',19,4,'2023-05-21T23:39:47.075Z',7),(262,'ฟหก',4,19,'2023-05-21T23:39:55.676Z',7),(264,'asdas',19,7,'2023-05-21T23:46:22.994Z',8),(266,'lkkl;k;lk',21,4,'2023-05-22T02:31:28.943Z',11),(268,'ยบเส.ไดสลฟสวหด',21,4,'2023-05-22T02:43:20.031Z',11),(271,'ฟหกฟสหดาฟห',21,4,'2023-05-22T02:46:04.563Z',11),(272,'สวัสดีครับ',4,21,'2023-05-22T02:46:31.352Z',11),(275,'ฟหวด',21,4,'2023-05-22T02:46:34.028Z',11),(277,'งฟหดว',21,4,'2023-05-22T02:46:34.268Z',11),(279,'ฟห',21,4,'2023-05-22T02:46:34.357Z',11),(280,'ดวฟ',21,4,'2023-05-22T02:46:34.489Z',11),(282,'วด',21,4,'2023-05-22T02:46:34.621Z',11),(284,'ฟหว',21,4,'2023-05-22T02:46:34.729Z',11),(286,'ดวฟห',21,4,'2023-05-22T02:46:34.841Z',11),(288,'วเด',21,4,'2023-05-22T02:46:34.968Z',11),(290,'ฟหว',21,4,'2023-05-22T02:46:35.085Z',11),(292,'เวหฟ',21,4,'2023-05-22T02:46:35.179Z',11),(295,'โฟล์คเท่จังครับ',19,4,'2023-05-22T03:01:33.989Z',7),(296,'ดีจ้า',22,4,'2023-05-22T03:33:55.566Z',12),(298,'สวัสดีครับ',4,22,'2023-05-22T03:34:34.988Z',12),(301,'ว่าไงสุดหล่อ',22,4,'2023-05-22T03:34:38.992Z',12),(303,'สวัสดีครั',23,4,'2023-05-22T04:05:17.210Z',13),(305,'อิอิ',4,23,'2023-05-22T04:05:39.586Z',13),(307,'สวัสดีครับ',23,4,'2023-05-22T04:05:47.976Z',13),(308,'สวัสดี',4,23,'2023-05-22T04:22:55.253Z',15),(311,'ๆำๆไำๆไำกฟหกฟ',4,23,'2023-05-22T04:23:42.460Z',13),(312,'ควย',24,4,'2023-09-11T02:53:09.798Z',16),(313,'ควย',24,4,'2023-09-11T02:53:09.801Z',16),(314,'อะไร',24,4,'2023-09-11T02:53:14.488Z',16),(317,'ครับ',24,4,'2023-09-11T02:53:15.977Z',16),(318,'เนี่ย',24,4,'2023-09-11T02:53:16.751Z',16),(319,'เนี่ย',24,4,'2023-09-11T02:53:16.753Z',16),(320,'ฟหก',24,4,'2023-09-11T02:53:32.697Z',16),(321,'ฟหก',24,4,'2023-09-11T02:53:32.699Z',16),(322,'ฟห',24,4,'2023-09-11T02:53:32.898Z',16),(324,'ก',24,4,'2023-09-11T02:53:33.057Z',16),(326,'หก',24,4,'2023-09-11T02:53:33.221Z',16),(328,'ฟหก',24,4,'2023-09-11T02:53:33.386Z',16),(330,'ฟหก',24,4,'2023-09-11T02:53:33.706Z',16),(331,'ฟหก',24,4,'2023-09-11T02:53:33.708Z',16),(332,'ฟห',24,4,'2023-09-11T02:53:33.846Z',16),(333,'ฟห',24,4,'2023-09-11T02:53:33.848Z',16),(334,'ก',24,4,'2023-09-11T02:53:33.976Z',16),(335,'ก',24,4,'2023-09-11T02:53:33.977Z',16),(336,'สวัสดีครับ',25,23,'2024-01-14T06:46:34.307Z',17),(339,'สวัสดรีคตรับ',25,21,'2024-01-14T10:20:57.800Z',18),(341,'ของไปยัง',25,21,'2024-01-14T10:21:04.404Z',18),(342,'ยังคับ',21,25,'2024-01-14T10:21:13.411Z',18),(343,'ยังคับ',21,25,'2024-01-14T10:21:13.415Z',18),(344,'กกฟหกฟหก',25,21,'2024-01-14T10:24:45.814Z',18),(346,'ฟหก',25,21,'2024-01-14T10:24:49.049Z',18),(349,'กฟหกกฟหกฟหก',25,21,'2024-01-14T10:24:54.423Z',18),(351,'หกฟหกฟหก',25,21,'2024-01-14T10:24:56.472Z',18),(352,'ยังคับ',25,21,'2024-01-14T10:25:00.270Z',18),(354,'คว',21,25,'2024-01-14T10:25:07.692Z',18),(355,'คว',21,25,'2024-01-14T10:25:07.698Z',18);
/*!40000 ALTER TABLE `messages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_image`
--

DROP TABLE IF EXISTS `product_image`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product_image` (
  `product_image_id` int NOT NULL AUTO_INCREMENT,
  `path_image` varchar(255) NOT NULL,
  `upload_by_id` int NOT NULL,
  `product_id` int NOT NULL,
  `upload_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `main` int NOT NULL,
  PRIMARY KEY (`product_image_id`),
  KEY `_idx` (`product_id`),
  CONSTRAINT `` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=68 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_image`
--

LOCK TABLES `product_image` WRITE;
/*!40000 ALTER TABLE `product_image` DISABLE KEYS */;
INSERT INTO `product_image` VALUES (45,'/uploads/products_img/myImage-1684697620234.jpeg',2,36,'2023-05-22 02:33:40',1),(46,'/uploads/products_img/myImage-1684697620237.jpeg',2,36,'2023-05-22 02:33:40',0),(47,'/uploads/products_img/myImage-1684697620238.jpeg',2,36,'2023-05-22 02:33:40',0),(51,'/uploads/products_img/myImage-1684724439407.png',2,38,'2023-05-22 10:00:39',1),(52,'/uploads/products_img/myImage-1684724439416.png',2,38,'2023-05-22 10:00:39',0),(53,'/uploads/products_img/myImage-1684724439421.png',2,38,'2023-05-22 10:00:39',0),(55,'/uploads/products_img/myImage-1684726344100.jpeg',4,39,'2023-05-22 10:32:24',1),(56,'/uploads/products_img/myImage-1684726344101.jpeg',4,39,'2023-05-22 10:32:24',0),(57,'/uploads/products_img/myImage-1684726344102.jpeg',4,39,'2023-05-22 10:32:24',0),(58,'/uploads/products_img/myImage-1684727143351.jpeg',22,40,'2023-05-22 10:45:43',0),(59,'/uploads/products_img/myImage-1684727143351.jpeg',22,40,'2023-05-22 10:45:43',0),(60,'/uploads/products_img/myImage-1684727143352.jpeg',22,40,'2023-05-22 10:45:43',1),(61,'/uploads/products_img/myImage-1684728435917.jpeg',23,41,'2023-05-22 11:07:15',0),(63,'/uploads/products_img/myImage-1684728435920.jpeg',23,41,'2023-05-22 11:07:15',1),(64,'/uploads/products_img/myImage-1684728739993.png',23,41,'2023-05-22 11:12:19',0),(65,'/uploads/products_img/myImage-1705227583729.jpg',21,42,'2024-01-14 17:19:43',0),(66,'/uploads/products_img/myImage-1705227583738.jpg',21,42,'2024-01-14 17:19:43',1),(67,'/uploads/products_img/myImage-1705227583742.jpg',21,42,'2024-01-14 17:19:43',0);
/*!40000 ALTER TABLE `product_image` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_type`
--

DROP TABLE IF EXISTS `product_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product_type` (
  `product_type_id` int NOT NULL,
  `type_name` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`product_type_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_type`
--

LOCK TABLES `product_type` WRITE;
/*!40000 ALTER TABLE `product_type` DISABLE KEYS */;
INSERT INTO `product_type` VALUES (1,'กีตาร์โปร่ง'),(2,'กีตาร์ไฟฟ้า'),(3,'เอฟเฟค'),(4,'แอมป์');
/*!40000 ALTER TABLE `product_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `product_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `product_name` varchar(255) NOT NULL,
  `product_price` int NOT NULL,
  `product_type` int NOT NULL,
  `product_detail` varchar(255) NOT NULL,
  PRIMARY KEY (`product_id`),
  KEY `_idx` (`product_type`)
) ENGINE=InnoDB AUTO_INCREMENT=43 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (36,4,'asdasfasfa',1231,1,'asfaskd fl,asl;df l;asdl;fasfasdf'),(38,4,'โฟล์ค 3 สี',99999,3,'นี่คือโฟล์คจราจร อิอิ 55555555555'),(39,4,'TEST TEST TEST ',25000,1,'TEST TEST TEST TEST TEST TEST TEST TEST TEST '),(40,22,'aospfka;sfas',123123,3,'asf,;\'asfdsafsdfsdgsdfgsdfgsdfgsdfg'),(41,23,'ฟหกฟหดฟดฟหดฟห',2133,1,'asdsadasdasfasfs dfasdfadfasdfadsf'),(42,21,'กีตาร์1236315641',5000,2,'กีตาร์กีตาร์กีตาร์กีตาร์กีตาร์กีตาร์กีตาร์กีตาร์กีตาร์กีตาร์');
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `report_type`
--

DROP TABLE IF EXISTS `report_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `report_type` (
  `report_type_id` int NOT NULL,
  `report_type_name` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`report_type_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `report_type`
--

LOCK TABLES `report_type` WRITE;
/*!40000 ALTER TABLE `report_type` DISABLE KEYS */;
INSERT INTO `report_type` VALUES (1,'ระบบ'),(2,'สินค้า');
/*!40000 ALTER TABLE `report_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reports`
--

DROP TABLE IF EXISTS `reports`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reports` (
  `report_id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `report_by_id` int NOT NULL,
  `report_title` varchar(45) NOT NULL,
  `report_des` varchar(100) NOT NULL,
  `report_type` int NOT NULL,
  `report_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`report_id`),
  UNIQUE KEY `report_id_UNIQUE` (`report_id`),
  KEY `report_idx` (`report_by_id`),
  CONSTRAINT `report` FOREIGN KEY (`report_by_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reports`
--

LOCK TABLES `reports` WRITE;
/*!40000 ALTER TABLE `reports` DISABLE KEYS */;
INSERT INTO `reports` VALUES (1,5,'ระบบช้า','ระบบช้ามากครับ',1,'2023-05-20 10:06:04'),(2,5,'dfgdfg','dfgdfgdfg',2,'2023-05-20 10:28:41'),(3,4,'กฟหกฟหก','ฟหเหฟเผกเหกด',2,'2023-05-20 12:00:53'),(4,4,'asdasdasd','asfasvasvsa',1,'2023-05-21 09:04:39'),(5,7,'ไอนี่มันโกงครับอิอิ','บลาๆบลาๆบลาๆบลาๆบลาๆบลาๆบลาๆบลาๆบลาๆบลาๆบลาๆ บลาๆบลาๆ บลาๆ',2,'2023-05-21 11:00:56'),(6,22,'หิวข้าวมากครับแอดมิน','หิว หิว หิวหิวหิวหิวหิวหิวหิวหิวหิวหิวหิวหิวหิวหิวหิวหิวหิวหิวหิวหิวหิว',1,'2023-05-22 03:42:57'),(7,22,'asdasdasd','d12dasfasfa',1,'2023-05-22 03:43:29'),(8,23,'uhweufhwkehfef','li3jt34jljerlgijerg',2,'2023-05-22 04:13:01');
/*!40000 ALTER TABLE `reports` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tokens`
--

DROP TABLE IF EXISTS `tokens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tokens` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `token` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `token_UNIQUE` (`token`),
  KEY `tokens_fk_idx` (`user_id`),
  CONSTRAINT `tokens_fk` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=65 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tokens`
--

LOCK TABLES `tokens` WRITE;
/*!40000 ALTER TABLE `tokens` DISABLE KEYS */;
INSERT INTO `tokens` VALUES (1,4,'s4/hC@wD!BF#!VgzfuNmY*k5/o=$6=21qqMQBVjI2Poz2M!ANxhDmy2Xi^ii@fb2P0O!@&s7jGXZSYlP*M4J&#zAoYs=JnnJFa5Q'),(2,4,'Lkew5QWupG@UjoHt8e#V85UY=-h!&k8u2j*/=-Qq#t#X=Q^*ZFo#8q*Df#xPHWreIha40geEuuFqsKoyHnAQ9m*88V6C6COujl1&'),(3,5,'g/ZKudmTfW2@kNi6MEOdJ68agxnQhTRR9g6v!4U=Ry@pneovE9mrCJP@6^YQXE3kuc4KTiY$M331k643di^w-7j4DrtF#WY!^=M5'),(4,5,'v^PEfo=h#cYSO4LT3Evr8xhnkMd$Xgnl^DO^v$9fC73fhTXoAMq@V^XbgYn4LNoySwEi=lfr6kt5qYj6*DxWtam-9-R0gaFCaVXy'),(5,6,'gAB^TrqGDZuy2c1bHc-H/VlM!1rYcpcd!FqPRVf6v*cMrN=xM40$mgH9m2I=0sSX&4oA61Ccvyo1xb3rXUr^f#U7T!9lzWfSUoEh'),(6,5,'/AEy3X831u@mrbeUvcpORcnPfNn42081&bxVH8LNRSjOAgw/ZTIXtuGVv5Dyg5l2&FatN2RLXLyy@rg=z5JdAK#sgXWvdYN/Fd0S'),(7,6,'jU&11Q0Ah*vD!^l5$dx@2bKL$SqISl7OpMtUGOwSi/1tMSl1yed^q4UxQ9HDJSBBUqk&UnW^pgMwJ5^*aZW&EzxD**u$dgQ5VkO@'),(8,5,'sbn5U1QiLgeJ7=qZMD6V-Z*@dJ!tatxA4tOpt$xS2XAhevInMSSD5jr#sHNfk3@/8bSSI^wtU$BAw-4P1czpiReUm7rv-rk&o0yb'),(9,5,'!17$Q#5a!aUs#PMmcVyo6RMaK0VRcCDQ!ZTxjM9#0wcs0GV8H8gC9o$uVMJ#p*^&Gt/CH!*68&QuLT8GTKuN-usBDtRrW2ygST5H'),(10,5,'EuorRm0BCTwNP7jrm/^V7Z4wqD$FR1T2rEP3fHhT9*nsSF-XuhvEKPlp@GYdU^QOY$WY4l5S5s2wwNSeVSiO26vrNZ^I&38AhoI='),(11,5,'G7oTiR5sDeMje*JF1wUzTRZt93^L*k/8!vlUxi/44pR!V-pGQA&#F$3V4avUpC-PMgkb*apUR4PnFDheLEm#lZce989U=qj3Q^*0'),(12,5,'KNL*LjKlzG=^uL!tlnn@@m6ewdBLXvdCv#r0K##H7TUMR-#8I6=$vhkLzV^#T60=23@0pVaFr3bwu#70pL29Hb4qwC1@cpm$Xq/i'),(13,5,'vKpF==!!EPoxq/PHloqDate&iEKbF^p=M*Pxf6CJ0/X/$/ElwD-Y9Ipt-E&$ZpfIQopepS^#OPy=ZTc$LXSGT*bSInF1Jj#*P^o^'),(14,4,'HprF$Un9kn2Hny5*jm!UX$kh6IxRlDnO3vuGwYhxl-*Fio-7oqZDoBrF^j/GLl57R59IfTDwt6Jm^$DLjvftYFgYkLGelx&qS5II'),(15,7,'#V0Y@nI!EH/ppi6TIobhKiVWAqA8mJd43289HllJ9#pbcxi7wA=TM4t9Ud8WNAm63**0ufVRgvTH-PPkfeEsFrzduDjgD6FUtolX'),(16,7,'ENb7EyuRm/u7S&o=Xi$KL&=AH^^^4=O!tb6TlDdA/1ny3KZv#V$FV4!l5E@pZIkBhC-gGYnNzaYoZ9xmc!0*K-6JWO#=U-@^Huiu'),(17,4,'4gwDw7v#IK11FxJ46yTb-0/0!#0ORvt9-z@N9*7*mq2eZ2xEpYGkbm&4Kl3^*i07jkpN42U*rRlEx5S6-wDVEnDvg*XvMInmw#54'),(18,7,'W2MUcR6sH54QGaN0cTF3d0$$hRQ@UN&w0O0sx9d39*jHdkCGeHbCMezGJrvY/COKJ#WK&Ea-lFz@Io$xDr551ZYBoCVh#FMEcqq2'),(19,4,'OQYO3fer3drUpaGOs-9NAONRGGhH^U9MG*Wcxs$yjilgoc7-6C2o8Vn^TT7/k3lCf5zh^A=^W$1inFo8eK90PB-MGXOqmKpO!Z6@'),(20,7,'1GH13Sm56rE&RFXbsmSNhpnZq4xhzzO$-VvvzxWgq/vT-sIh385dm@@r*L&^4Ho!BA1z4YrMr-Gr@5zgT5wxa*ZsTHeFC!9W$OiS'),(21,4,'$txPdoxeMYjTC6WiLvP1zwZ!F#H*^dT$VZI4-YCBEBNDOj!XRujTNecgulIt3Ygg2&k3p/xmBHS6oR/kP#qBTi@C7jJBo5I@swQ&'),(22,4,'6@&WnLiDB&zPD=V0tYxi4LFZ/r76#OwdJGkArkWLz2pAKNxK1MH43Adiyc6JmFY/UiaHXib2vsDeTKZvVpB29Z0EO&8q/ZkgnNeN'),(23,7,'Y#dOqyP/0xnZz-F$JzrNH5fq231O=*t^KHjRjBFB#12/GVkZLI#3KjZno1*jhsJlYa#@!hCT#89Jk7*cA=cBrtIYtWbt41$m=bib'),(24,4,'mn$qRv&ICLqOW!OPlPFSmcLuMczCAqf&lZV6GoqkwWRgUvLt=17tK&01UO-7cCfj1s0arrU64qqHh7R=!ZMBy43VvTl5P99C=c3t'),(25,7,'FyBr@znkgTUqxlxS*QVX#^^f8cQiNfC6Bv9rj1W0NO8wut@v71bx-Jx7nC=Bm3G9YiQ9TvWIX&&7/pln!PtzB*QfzIF@7HY6N05='),(26,4,'AGl67VCT!99Um2#2Xj#EC7KXRYO8A0@!Y#^!*QJ4psm&feA8P4O6vU0PjGYpP@OTs@Uln$6$5Mr!UyOSFrQn5gya8k7vf8VAX/pr'),(27,7,'KGN*lv2sC2zmNDmcCP$fxe&zs9spQ*$hk2Ei=Apw5aP!uUwYUsTiYsdc6G0eOG2HWwjci/!NYtYjNU5MdB44jY3nEj2*V0I48pM6'),(28,4,'K0Fku6bq@=uLlUn1/nev5YqV#F6YY=bnL=S&bR/QmTSW!YbIh!rziFK/wfep2lba3dWnND^YM-2bOSV-d#z7A4Po*hEjQa^$pbD-'),(29,19,'$rpwyHC1gV*0&xQt7*/=HtCtkqAb/=Fc9&Q*K=v=SWQLhCcHP4c^elg7Hvcx1lQgNUf$Rowj^0tc7yH5bwjbiN^vdwh=cn9Y8S-$'),(30,4,'4IM=CX^6Z/72PesD^uiWZ/9Xm-w=c$!eBHB*gke&*WXGSZ!E#i&hDO2f&*!7PfQsG4i/Xvx0KZL=7c1tqbg1o4Q/Iae&L3EP=HoR'),(31,20,'rDIxHIfod@t$l*l3SZwh7d^bp60uJEv^ZOHI!kWgmFGB/#TDnuzAzQh-/nCtL7&FAt4APM^rY&gb#e7xy9uUskoF3!AIc$F8is=&'),(32,4,'6z3hpVHSuyW5KeeeMOQb1iVzi&=Xgu/&66V01V2z^^k1p$3o/dlt5dE0=aTq@GezMBoQ3ZkhnY0*Hjvah^hSnR6EN6K&Qb&qiyUv'),(33,7,'$V17Wbfp-!$izk@E1T9-HdZV&WUNKaXfqV5e8kFwTnRLrthyzEXl-frzzFFElct2PIDIZ7arYtn7rzZEO2vzhHtAO=G!xC&AA^X-'),(34,4,'@K0VN^xU23$c#cv/RIGD8xBYA@L5l@L62r-==KV8LrgBH8wD3q&rJwi-o5eXO1TGheb-dW*73xftUeti*wr=G&ou/qoBOh3hjI&W'),(35,19,'oFJGzTY-CM1#@Oyph1codPcX^YB33mNlhG/dDmeI48M7@3b349MmkmID@$#NY@2EcvLw5JS9WE1rBVow3GiuxABE@^m4&Bh$KzYs'),(36,21,'Rg4I#xP5BBMPpLj^O/zMQuPELsyX#aA5hVy9Yb95zzm3XyBZOIlh1=bw338Ooiezz3/Nc7$ACXj785O1gC7iNsS3A/3FsJUtt!L*'),(37,21,'JS5C&v!mlHp3Zi0LlBliSPmCv1K2l3aGezQRyfw@h#gllf6g0akuV38$P-mjEh*azEl8#qBKzuolWePhRcbPa@#&kmrIkAup@xp1'),(38,21,'l0OkSmbsRp!$pI$oObkQ9medvaDa*ie&AbOTcv&K5gaXxg2oe#Z9$^yHh&f6yMq2U5xU3L5wK6HfU#r=psFcV&RsRK7#OPvgbku$'),(39,19,'FAqh#tsKUF0F3IP*/5H0*ZQ#nD#z2pDsOn//B5--z=h1us@0StrNI0jyLDfK^uh&T-cOy0wZa9upoWeatXgCHfDPxxC=q*39@RN/'),(40,21,'CWj#tN$W@=w#gr4PJStCYRgPvj-FN5XLkHBbGM8@=Uf0d=LPW$TZSvM@vO7d7*CAviB9RQOigC68k*IH-M=I*eu-&IBa@v6GhXOp'),(41,4,'xfR6OivhDWs7m=13wScn^&phw$TZfyYG2Fa*Y^qB8C/!mMbC&pL1-Qp@hxt7*Y6T$g=h$$-Pz/gzHXf*Sc9mV8dz=yzDop&6G2fw'),(42,4,'j0RqSKi@kXEKid$bNUI2/T@&XjIyZhBt*5pRdc^a6p*T*^JvaRQWDwJuYAIMq/L$-&qbu*H!i0XjO&jWfvnH*F@9VMGtF2fdXaH5'),(43,19,'DuTztjUggfGZeL#1fm8A7e^CIsxuplWeaqyMckU2l6h0Y1x@D1IQd=2Y@EPV3CvP@2gru#d2bXOzmvEG00Ping5nnIZj&w$Odr0e'),(44,19,'$dc5QBL-OxnPKQyGC*fCdd7EOy#BM3^hVMfIjrnaCvpmv!&PwXDQL0I3sf#al#H0b$ULF^l52WMkv!bQmDoER@TA90tTo6Hhkr5N'),(45,4,'lYQVmY$J5n$4@&dZqO^5@Gos0sdioTDArljf#CbzZ!2n10&@GCKgE@FNTGIqr!Y1VK6dut7PL#xZ2BFLju&kFV3^0/LRW$ns$^xr'),(46,4,'cl1=$2B6g#awGK9f*ONNf6ImOTRmfBQ3iM1/hep&R*p=@ni/XNvY8TtI/FWTZjgYbylYP7UzTdwB@lvPJD-VIvh1C*2a-k59*kqz'),(47,7,'T$O*1ZOBd8H9LG2$Nqjotm@=8kZ6OSkM-dvqOhcZu1X9rV^0=/*xs2oFPvr7oL=F&7Fp$glX=wf^OEtR/L6nYe0YTH*hGRI9TlQE'),(48,21,'Fy9Knq#kNZL9*dx@58OG*MWSZl^A&2TqOMObqo3q^IwAPm6phtRIb8ivf$qiulT2CAsp9LrN^NMdDbU96AqOGJiomQ#67NZ*NpC3'),(49,7,'yS1uCgGEYnE^kREFcpobl-=ggNp4-BNWjd-P@lpcuxmTrjenVD5c6q=^rPn3jB7C8@rpy#ClV2yULOojIOxa/tKsHRh5!P7mcRQ1'),(50,19,'ds^zZF6#Nr$g/fpSFI!Ot7ytdRMkkWTR#$Nq1X=sQ1$FPJ3J2FDXCAD2G6FJk^HxaF3wciLxGHn9-AV5fr5*pvOk-adJ$vQ-R=CS'),(51,4,'OwXfYFNR3xrsNy99sxtWm*f#9WZTwuChoCLkj-ut17rs4!qroOe93aYZV8Ukw@nDMvc=qVP-acCYh0yOaYg-n3QEvs^$-DbgFIKF'),(52,22,'DizVy/*S#REmEK!oyG*d@XmmB1QpQv@L2Aer@bLrdH9Y-tR40RCsN=65zIMos5I@Gq^55gSoPXr^q0CGp3Clbwm$NUrc/uVxrgVB'),(53,4,'^8M61tl*ZShaOZj=vj9TsGNLarl=eLNpsd/l!gC&1hWs7q-IB@N7YthX!yj#1pKdBSoUNz6L8QkSLSnnyoi#fNSg#jG=Egilriqy'),(54,22,'FZKN1j!!9Nm5sKD!fJmncnl*0seI0Qg!G7b*euDwg24$56NVNbkS1$tMA3#l/G2-7gXL7yrF8WaGh*0Yue@7fQta^bAEqkSbo!3Z'),(55,22,'Pwove05Vr!8^ki5pH=KWM9lBX&JhiGUlvAndz!GZR81ftOZlRG5t-KafOFhLBvyf9!q86G7V@UM7/=niO&CNAe3rqlqtsiYKZrLy'),(56,4,'28$Cqi&u@HPuKU4Lm^8tw$ov/Ud2fCW9LMwKZfH1&=$JmDDBxWDEOGaP#$6qVbVKkP5@@tnElOnYogGQt=B=1wttfyOkF*CdbZQ6'),(57,23,'YXH#IqI/bIFEclaTFnKuLx9#kz3SANgTeUt!Su8SU!9u#9iPQP9Rh*i2-M=CQOs!L$YkWvO2gWhIdFoD@-RUawrTlCNUSzrcHRQ3'),(58,4,'yK*VT6W7BRz=HzP1sJanmBdCpetc5MxEADSzOcsFWcFC2X=R8tv7@x5-Wtk*xd=hCJHGcSo*yDyQ/*@r3BIBvLg27hHUv*JUmCMs'),(59,23,'eM@jyzW2MH68*&AHOEjLcmoqeE0I$CYI=55tTsWsAm*hP2qiKaE5-^EQ#U5oOomtfR=6tE0azg9w5sz2YJE&Ui!5DAcumIwl1Z@i'),(60,23,'HzKJVjWQ73pHo#8#TGG!IaanpwZ8rDPCzxtL7drEMeJ*Zh2g^dXmr-hcN7A*qALln/G2USI6idpr/IR$hxPwf3vwk2pMvLOfHwiV'),(61,24,'pdjK6Nk*Q-AzSImM2lOyFgXkzZg@ej=0kzPzb@&7^tFYvtKV6tjX9M*s=P*WA!$&D$k3/2CLzFq!Ntp&nt8o8423@uT=NTE/a3jU'),(62,25,'x$SjkyH90rCaE5hlix@CZqNwtD^zJTXwBZ1e0KTymYYZIUW7TC3Bsiqgn-jghxugDaNNBY$gXkPBkHQwxL5RXrPoT8X=vkV/nfAA'),(63,21,'DEp!FhJ4w4W03^R087kCt2nSFL8TSLCkMNXvfkYCwqV0#hH61NucYkWDh1D6!k/*yyNTTMLt^EWan/GOfT7R89&ofNFjh4&pQX$/'),(64,25,'GcSqIvaG&y9NJd-^Yv2zIRi0zhSrw3m0=wK!o21CmteW1pTiBWp##^Bq!kAw2Asf7/=&P^k2LI$ae35luAYcK5czByMD^6KmKR4k');
/*!40000 ALTER TABLE `tokens` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(45) NOT NULL,
  `password` varchar(255) NOT NULL,
  `firstname` varchar(45) NOT NULL,
  `lastname` varchar(45) NOT NULL,
  `phone` char(10) NOT NULL,
  `usertype` varchar(45) NOT NULL DEFAULT 'normal',
  `Avatar` varchar(45) DEFAULT 'uploads/user_img/avatar.png',
  `email` varchar(45) NOT NULL,
  `join_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `isbanned` tinyint NOT NULL DEFAULT '0',
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `username_UNIQUE` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (4,'iovegame5','$2b$05$bS7WuH0qk1cF/gxKJ.Nq9uLo79sAnzfWAT.3xc6wavS29u5RzVeZO','aasdasf','teat lastname','0912315231','admin','uploads/user_img/avatar.png','game2999@hotmail.com','2023-05-17 12:08:19',0),(5,'Choat','$2b$05$3uAyRMcJ49v1tSXs0cdg5uq9PXxBmQrjpBQpFtk6USxWPGBn01/Uy','asddd','teat lastname','0912315231','normal','uploads/user_img/avatar.png','game2999@hotmail.com','2023-05-17 13:41:34',0),(6,'PPwer','$2b$05$JLWnBMdGxU13MN5C9sbzAO6D67uN1pVj5Ai8q5e.Ie0GsXqHFIHqS','asddd','teat lastname','0912315231','normal','uploads/user_img/avatar.png','game2999@hotmail.com','2023-05-18 02:11:17',1),(7,'iovegame6','$2b$05$pozRI6aTyJTm0ILFQRfj.uFIJ2LRxDDuhS1HbFwhusdYsPww7cWU2','Test firstname','teat lastname','0912315231','normal','uploads/user_img/avatar.png','game2999@hotmail.com','2023-05-20 12:03:23',1),(8,'aaaaaaa1','$2b$05$siZ927pIfCG5JWHjtsK4tuHNbADzUrCV5ch9NFpD2hW1DkhYLuxnG','test','teat lastname','0912341234','normal','uploads/user_img/avatar.png','game2999@hotmail.com','2023-05-21 14:42:57',0),(9,'aaaaaaa2','$2b$05$NlLWd1Pjp9bwxcfng09sWOp2W.GylMxGUrxuzlGub52ldPtegvbWi','test','teat lastname','0912341234','normal','uploads/user_img/avatar.png','game2999@hotmail.com','2023-05-21 14:42:59',0),(10,'aaaaaaa3','$2b$05$Nvhx/IREBeSSbPMX4tYIou4JNjb8URyQY3rcaF3Dr0rvRhaG0PQyW','test','teat lastname','0912341234','normal','uploads/user_img/avatar.png','game2999@hotmail.com','2023-05-21 14:43:01',0),(11,'aaaaaaa4','$2b$05$f4e0GIgTDGNkEVB9hoCnkePZXzn8JwNe66.8PelZlGAsch31zEG6q','test','teat lastname','0912341234','normal','uploads/user_img/avatar.png','game2999@hotmail.com','2023-05-21 14:43:03',0),(12,'aaaaaaa5','$2b$05$9zS1N0ucVeA3L2Lxn0i9buLeeJF6qPz/mmurrCpIUUzz2mwYzJXpu','test','teat lastname','0912341234','normal','uploads/user_img/avatar.png','game2999@hotmail.com','2023-05-21 14:43:05',0),(13,'aaaaaaa6','$2b$05$xc77R82./VuJ/FiNjdPeWuoyys9xWlVHiTX08uL/M.Zs0aUid/IPu','test','teat lastname','0912341234','normal','uploads/user_img/avatar.png','game2999@hotmail.com','2023-05-21 14:43:06',0),(14,'aaaaaaa7','$2b$05$SrxDJNoIyBjsxa22WWbGjeA.EAtYB.OccmbUvOwpIDNUlzf4Pdm2i','test','teat lastname','0912341234','normal','uploads/user_img/avatar.png','game2999@hotmail.com','2023-05-21 14:43:08',1),(15,'aaaaaaa8','$2b$05$9od/1BkFoUV/mBse2OdOTuogT6jZGzE0wCL707YehlsVgSM5MB9NC','test','teat lastname','0912341234','normal','uploads/user_img/avatar.png','game2999@hotmail.com','2023-05-21 14:43:10',0),(16,'aaaaaaa9','$2b$05$sK7pBOXw.08oFl91HH.69.OmcMSGLeaLA4W1SWxke00qfwztkHkGG','test','teat lastname','0912341234','normal','uploads/user_img/avatar.png','game2999@hotmail.com','2023-05-21 14:43:12',0),(17,'aaaaaaa10','$2b$05$1OST7jMFITg6bCLv4K7TgeheGxXZiJsKH7owTgj9YvH7secvBx/8i','test','teat lastname','0912341234','normal','uploads/user_img/avatar.png','game2999@hotmail.com','2023-05-21 14:43:14',0),(18,'aaaaaaa11','$2b$05$/tcPO4f9YdWuW/lslCpSAOrKRhYVrlb8WY6KkefKs7lHWDjCTBH3m','test','teat lastname','0912341234','normal','uploads/user_img/avatar.png','game2999@hotmail.com','2023-05-21 14:43:36',0),(19,'iovegame7','$2b$05$jEHtTsr2b0Dx0B5ZxW7trOfe6dFl37Gh.IATzsW25Mz1FGVftfCji','Thanakorn','Amatrawet','0912345123','normal','uploads/user_img/avatar.png','left4ded@hotmail.comjkj','2023-05-21 20:08:17',1),(20,'iovegame8','$2b$05$FqeB8302FyHcoGEviTSRkuGcR/Dtco6i.hvFXgDkzARsEx/1TCWuq','Randy','Ortan','0912341234','normal','uploads/user_img/avatar.png','asd@hotmail.com','2023-05-21 23:05:13',0),(21,'admin','$2b$05$j17zBtBQr4DVxiH1hxkJ9e2HfpsNV2cO60kVVhakZM07ziyrgJy.i','Admin','Kageetai','0999999999','admin','uploads/user_img/avatar.png','admin@gmail.com','2023-05-21 23:44:03',0),(22,'test1','$2b$05$lXPmYU.foE0CrePyPipSneHnEp6wE6lHfPkOS7DuRmiuSJ1zuZE/K','Mister','Tester','0991234123','normal','uploads/user_img/avatar.png','test@gmail.com','2023-05-22 03:33:42',0),(23,'test2','$2b$05$S/W/H8hcbXs903HAboqo9eW0St.rChMNytpNKalOE6B9SepfCvB1G','test','testtest','0912312312','normal','uploads/user_img/avatar.png','test2@gmail.com','2023-05-22 04:04:08',1),(24,'gamelnwza','$2b$05$r3KpmPNzzFWPjysbiVLFw.QmGBVXMPyaSNcjKTsFtBmtGt.m2Hf0i','Thanakorn','Amatrawet','0999991234','normal','uploads/user_img/avatar.png','game2999@hotmail.co.th','2023-09-11 02:52:51',0),(25,'game2999','$2b$05$Ks9oqxYSVXEsfb8Vc8DEmOufMoP4gsQznlwcAZ6thhcf6J0yZJp1O','Thanakorn','Amatrawet','0922467684','normal','uploads/user_img/avatar.png','game2999@hotmail.com','2024-01-14 06:46:01',0);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-02-27 16:42:33
