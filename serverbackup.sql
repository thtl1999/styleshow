-- MySQL dump 10.16  Distrib 10.3.10-MariaDB, for debian-linux-gnu (x86_64)
--
-- Host: localhost    Database: ss_db
-- ------------------------------------------------------
-- Server version	10.3.10-MariaDB-1:10.3.10+maria~xenial-log

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
-- Table structure for table `Comment`
--

DROP TABLE IF EXISTS `Comment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Comment` (
  `MID` int(11) NOT NULL AUTO_INCREMENT,
  `MUID` int(11) NOT NULL,
  `MCID` int(11) NOT NULL,
  `LLike` int(11) DEFAULT 0,
  `DDislike` int(11) DEFAULT 0,
  `Date_Time` datetime DEFAULT current_timestamp(),
  PRIMARY KEY (`MID`,`MUID`,`MCID`),
  KEY `MUID` (`MUID`),
  KEY `MCID` (`MCID`),
  CONSTRAINT `Comment_ibfk_1` FOREIGN KEY (`MUID`) REFERENCES `User` (`UID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `Comment_ibfk_2` FOREIGN KEY (`MCID`) REFERENCES `Contents` (`CID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Comment`
--

LOCK TABLES `Comment` WRITE;
/*!40000 ALTER TABLE `Comment` DISABLE KEYS */;
/*!40000 ALTER TABLE `Comment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Contentfiles`
--

DROP TABLE IF EXISTS `Contentfiles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Contentfiles` (
  `text` varchar(100) DEFAULT NULL,
  `html` varchar(100) DEFAULT NULL,
  `file` varchar(100) DEFAULT NULL,
  `thumbnail` varchar(100) DEFAULT NULL,
  `CID` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Contentfiles`
--

LOCK TABLES `Contentfiles` WRITE;
/*!40000 ALTER TABLE `Contentfiles` DISABLE KEYS */;
INSERT INTO `Contentfiles` VALUES ('contest blabla','htmlcode here','1434191164d2509c9b71d3a749c6e8bc','1434191164d2509c9b71d3a749c6e8bc',17);
/*!40000 ALTER TABLE `Contentfiles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Contents`
--

DROP TABLE IF EXISTS `Contents`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Contents` (
  `CID` int(11) NOT NULL AUTO_INCREMENT,
  `CUID` int(11) NOT NULL,
  `LLike` int(11) DEFAULT NULL,
  `DDislike` int(11) DEFAULT NULL,
  `Insertdate` datetime DEFAULT current_timestamp(),
  `Views` int(11) DEFAULT NULL,
  `Type` varchar(10) NOT NULL,
  `Page_url` varchar(255) DEFAULT NULL,
  `Title` varchar(255) NOT NULL,
  PRIMARY KEY (`CID`,`CUID`),
  KEY `CUID` (`CUID`),
  CONSTRAINT `Contents_ibfk_1` FOREIGN KEY (`CUID`) REFERENCES `User` (`UID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Contents`
--

LOCK TABLES `Contents` WRITE;
/*!40000 ALTER TABLE `Contents` DISABLE KEYS */;
INSERT INTO `Contents` VALUES (5,1,10,NULL,'2018-11-30 00:11:56',10,'Video',NULL,'This is my black pants that I recommend'),(6,1,20,NULL,'2018-11-30 00:12:07',30,'Video',NULL,'This is my blue pants that I recommend'),(7,1,5,NULL,'2018-11-30 00:12:27',40,'Picture',NULL,'This is my red shirt that I recommend'),(8,1,50,NULL,'2018-11-30 00:12:44',140,'Picture',NULL,'This is my red jacket that I recommend'),(9,1,540,NULL,'2018-11-30 00:13:06',4,'Streaming',NULL,'This is my white jacket that I recommend'),(10,1,5,NULL,'2018-11-30 00:13:40',5,'Streaming',NULL,'This is my white shoes that I recommend'),(11,1,10,NULL,'2018-11-30 00:14:16',1000,'Video',NULL,'This is my green shoes that I recommend'),(12,1,50,NULL,'2018-11-30 00:14:38',50,'Video',NULL,'This is my green shirt that I recommend'),(13,1,20,NULL,'2018-11-30 00:15:03',1000,'Picture',NULL,'This is my yellow shirt that I recommend'),(14,1,2,NULL,'2018-11-30 00:15:15',3,'Picture',NULL,'This is my yellow pants that I recommend'),(15,1,200,NULL,'2018-11-30 00:15:57',30,'Video',NULL,'This is my orange shoes that I recommend'),(16,1,NULL,NULL,'2018-11-30 23:18:20',NULL,'test',NULL,'This is title'),(17,1,NULL,NULL,'2018-12-01 01:55:58',NULL,'Picture',NULL,'title test');
/*!40000 ALTER TABLE `Contents` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Follower`
--

DROP TABLE IF EXISTS `Follower`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Follower` (
  `FUID` int(11) NOT NULL,
  `Follower` int(11) NOT NULL,
  PRIMARY KEY (`FUID`,`Follower`),
  CONSTRAINT `Follower_ibfk_1` FOREIGN KEY (`FUID`) REFERENCES `User` (`UID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Follower`
--

LOCK TABLES `Follower` WRITE;
/*!40000 ALTER TABLE `Follower` DISABLE KEYS */;
INSERT INTO `Follower` VALUES (1,1234);
/*!40000 ALTER TABLE `Follower` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Product`
--

DROP TABLE IF EXISTS `Product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Product` (
  `PID` int(11) NOT NULL AUTO_INCREMENT,
  `PCID` int(11) NOT NULL,
  `PCUID` int(11) NOT NULL,
  `Color` varchar(5) DEFAULT NULL,
  `Type` varchar(10) NOT NULL,
  `Price` int(11) NOT NULL,
  `Img_url` varchar(255) NOT NULL,
  `Size` varchar(5) DEFAULT NULL,
  `Name` varchar(255) NOT NULL,
  PRIMARY KEY (`PID`),
  KEY `PCID` (`PCID`),
  KEY `PCUID` (`PCUID`),
  CONSTRAINT `Product_ibfk_1` FOREIGN KEY (`PCID`) REFERENCES `Contents` (`CID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `Product_ibfk_2` FOREIGN KEY (`PCUID`) REFERENCES `Contents` (`CUID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Product`
--

LOCK TABLES `Product` WRITE;
/*!40000 ALTER TABLE `Product` DISABLE KEYS */;
/*!40000 ALTER TABLE `Product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `User`
--

DROP TABLE IF EXISTS `User`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `User` (
  `UID` int(11) NOT NULL AUTO_INCREMENT,
  `Id` varchar(20) NOT NULL,
  `Pw` varchar(20) NOT NULL,
  `Name` varchar(12) NOT NULL,
  `Nickname` varchar(12) NOT NULL,
  `Page_url` varchar(255) DEFAULT NULL,
  `Email` varchar(255) NOT NULL,
  `Address` varchar(255) NOT NULL,
  `Phone_num` varchar(20) NOT NULL,
  `Bdate` date NOT NULL,
  `Img_url` varchar(255) DEFAULT NULL,
  `Gender` varchar(1) NOT NULL,
  PRIMARY KEY (`UID`),
  UNIQUE KEY `Id` (`Id`),
  UNIQUE KEY `Nickname` (`Nickname`),
  UNIQUE KEY `Phone_num` (`Phone_num`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `User`
--

LOCK TABLES `User` WRITE;
/*!40000 ALTER TABLE `User` DISABLE KEYS */;
INSERT INTO `User` VALUES (1,'123','123','123','123','123','123','123','123','2018-11-24','123','1');
/*!40000 ALTER TABLE `User` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `_test`
--

DROP TABLE IF EXISTS `_test`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `_test` (
  `pa1` varchar(20) DEFAULT NULL,
  `pa2` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `_test`
--

LOCK TABLES `_test` WRITE;
/*!40000 ALTER TABLE `_test` DISABLE KEYS */;
INSERT INTO `_test` VALUES ('seoseungwan','hello'),('hyein','1217'),('fgh','sgg'),('seo2','sdf'),('sdf','asdf'),('1234','1234'),('1234','1234'),('12345','12345'),('12345','12345'),('hello','hi'),('my','name'),('g','g'),('abcd','1111');
/*!40000 ALTER TABLE `_test` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `fileuploadtest`
--

DROP TABLE IF EXISTS `fileuploadtest`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `fileuploadtest` (
  `filename` varchar(50) DEFAULT NULL,
  `filetype` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `fileuploadtest`
--

LOCK TABLES `fileuploadtest` WRITE;
/*!40000 ALTER TABLE `fileuploadtest` DISABLE KEYS */;
INSERT INTO `fileuploadtest` VALUES ('6434c5a64e985e93b6182d6c09fabe8a','video/mp4'),('e50e4a7e4cebcaed6522025ada298bce','video/mp4'),('a7f4fa04229385d9380b9f2f92809884','video/mp4'),('a18a14ae4191d22132cc8baa5014a862','video/mp4'),('138f511a7d85e7ae3297caeb5b2bc390','image/png'),('c0c213a0ee9dc6d4837e622753fb5a89','application/pdf'),('03fd448a456dbc267db6de5eee05cba1','text/plain'),('79cd722fca474b8c181cdec24026fcac','image/jpeg'),('864cb80910bd8aa8e72994ee5b653d4c','text/xml');
/*!40000 ALTER TABLE `fileuploadtest` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `likeid`
--

DROP TABLE IF EXISTS `likeid`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `likeid` (
  `lid` char(20) NOT NULL,
  `lpw` char(50) DEFAULT NULL,
  PRIMARY KEY (`lid`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `likeid`
--

LOCK TABLES `likeid` WRITE;
/*!40000 ALTER TABLE `likeid` DISABLE KEYS */;
INSERT INTO `likeid` VALUES ('hyein',NULL);
/*!40000 ALTER TABLE `likeid` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-12-01  2:13:22
