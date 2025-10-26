
-- MySQL dump 10.13  Distrib 8.0.43, for Linux (x86_64)
--
-- Host: localhost    Database: Ofraud
-- ------------------------------------------------------
-- Server version	8.0.43-0ubuntu0.24.04.2

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categories` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(32) NOT NULL,
  `description` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=177 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (2,'Muebles','Artículos para amueblar y decorar espacios, incluyendo mesas, sillas, sofás y camas.'),(3,'Ropa','Prendas de vestir para diferentes estilos, climas y ocasiones.'),(4,'Electrónica','Dispositivos tecnológicos como celulares, computadoras, televisores y accesorios.'),(5,'Libros','Obras impresas o digitales que abarcan géneros de ficción, no ficción, educación y más.'),(6,'Juguetes','Artículos diseñados para la diversión y el aprendizaje de niños de todas las edades.'),(7,'Deportes','Equipo, ropa y accesorios relacionados con la práctica y disfrute de actividades deportivas.');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `configurations`
--

DROP TABLE IF EXISTS `configurations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `configurations` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(100) DEFAULT NULL,
  `text` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `configurations`
--

LOCK TABLES `configurations` WRITE;
/*!40000 ALTER TABLE `configurations` DISABLE KEYS */;
INSERT INTO `configurations` VALUES (1,'Terminos y condiciones','1.Lorem\nLorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam dolorem pariatur, eligendi adipisci, ipsum deleniti vitae explicabo molestiae rerum earum aut id excepturi dolorum? Corporis maiores omnis placeat, ratione fugit culpa tempora. Est officia nihil harum distinctio fugit iure placeat. Laudantium, nesciunt error alias fugit fugiat magni provident voluptatibus reprehenderit nobis debitis deleniti vitae dolores facere. Doloremque totam ullam dolorum, ratione sunt, necessitatibus quia in ab ipsam corrupti quis quos, aspernatur nemo mollitia! Dignissimos quisquam rem magni, vero eius enim laboriosam. Iure magnam adipisci eos, sint illum suscipit doloremque, neque aperiam beatae eveniet error saepe cum assumenda officiis quaerat ipsam similique eum. Corrupti repudiandae quis dolorem tenetur maxime. Dicta, doloremque dignissimos amet assumenda esse blanditiis excepturi cumque ad voluptatum nobis? Repellendus, quia? Minus, aspernatur officia quo, dolor, libero illo veritatis praesentium quod rerum perferendis repellendus nulla facilis? In eaque rerum quos iste accusantium. Voluptate pariatur animi voluptatibus, distinctio dignissimos unde explicabo mollitia nam quo nihil in qui corrupti ad aspernatur exercitationem cum? Non dolorem eligendi ut mollitia, quis nobis nihil minus, ullam dicta explicabo molestias totam soluta commodi recusandae praesentium! Incidunt minima harum eaque eligendi molestiae impedit deserunt explicabo unde architecto a. Obcaecati ullam ad veritatis soluta cupiditate commodi quas.\n\n2.Lorem\nLorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam dolorem pariatur, eligendi adipisci, ipsum deleniti vitae explicabo molestiae rerum earum aut id excepturi dolorum? Corporis maiores omnis placeat, ratione fugit culpa tempora. Est officia nihil harum distinctio fugit iure placeat. Laudantium, nesciunt error alias fugit fugiat magni provident voluptatibus reprehenderit nobis debitis deleniti vitae dolores facere. Doloremque totam ullam dolorum, ratione sunt, necessitatibus quia in ab ipsam corrupti quis quos, aspernatur nemo mollitia! Dignissimos quisquam rem magni, vero eius enim laboriosam. Iure magnam adipisci eos, sint illum suscipit doloremque, neque aperiam beatae eveniet error saepe cum assumenda officiis quaerat ipsam similique eum. Corrupti repudiandae quis dolorem tenetur maxime. Dicta, doloremque dignissimos amet assumenda esse blanditiis excepturi cumque ad voluptatum nobis? Repellendus, quia? Minus, aspernatur officia quo, dolor, libero illo veritatis praesentium quod rerum perferendis repellendus nulla facilis? In eaque rerum quos iste accusantium. Voluptate pariatur animi voluptatibus, distinctio dignissimos unde explicabo mollitia nam quo nihil in qui corrupti ad aspernatur exercitationem cum? Non dolorem eligendi ut mollitia, quis nobis nihil minus, ullam dicta explicabo molestias totam soluta commodi recusandae praesentium! Incidunt minima harum eaque eligendi molestiae impedit deserunt explicabo unde architecto a. Obcaecati ullam ad veritatis soluta cupiditate commodi quas.\n');
/*!40000 ALTER TABLE `configurations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `notifications`
--

DROP TABLE IF EXISTS `notifications`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `notifications` (
  `id` int NOT NULL AUTO_INCREMENT,
  `message` varchar(500) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `created_by` int NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`created_by`),
  CONSTRAINT `notifications_ibfk_1` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notifications`
--

LOCK TABLES `notifications` WRITE;
/*!40000 ALTER TABLE `notifications` DISABLE KEYS */;
INSERT INTO `notifications` VALUES (6,'El estado de su reporte titulado \"Plataforma de inversión fraudulenta\" ha sido actualizado a \"Rechazado\"','2025-10-15 10:52:54',1,'El estado de su reporte ha cambiado a: Rechazado'),(7,'El estado de su reporte titulado Ximena Me vendió una compo falsa ha sido actualizado a Aprobado','2025-10-17 01:47:08',1,'El estado de su reporte ha cambiado a: Aprobado'),(8,'El estado de su reporte titulado Tienda de componentes de computadoras DDCompus ha sido actualizado a Aprobado','2025-10-17 01:54:59',1,'El estado de su reporte ha cambiado a: Aprobado'),(9,'El estado de su reporte titulado Página de phishing detectada ha sido actualizado a Aprobado','2025-10-17 01:58:07',1,'El estado de su reporte ha cambiado a: Aprobado'),(10,'El estado de su reporte titulado Portal falso de soporte técnico ha sido actualizado a Aprobado','2025-10-17 01:59:55',1,'El estado de su reporte ha cambiado a: Aprobado'),(11,'El estado de su reporte titulado Portal falso de soporte técnico ha sido actualizado a Aprobado','2025-10-17 02:00:22',1,'El estado de su reporte ha cambiado a: Aprobado'),(12,'El estado de su reporte titulado Tienda de componentes de computadoras DDCompus ha sido actualizado a Aprobado','2025-10-18 19:43:13',1,'El estado de su reporte ha cambiado a: Aprobado');
/*!40000 ALTER TABLE `notifications` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `report_categories`
--

DROP TABLE IF EXISTS `report_categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `report_categories` (
  `report_id` int NOT NULL,
  `category_id` int NOT NULL,
  PRIMARY KEY (`report_id`,`category_id`),
  KEY `category_id` (`category_id`),
  CONSTRAINT `report_categories_ibfk_1` FOREIGN KEY (`report_id`) REFERENCES `reports` (`id`) ON DELETE CASCADE,
  CONSTRAINT `report_categories_ibfk_2` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `report_categories`
--

LOCK TABLES `report_categories` WRITE;
/*!40000 ALTER TABLE `report_categories` DISABLE KEYS */;
INSERT INTO `report_categories` VALUES (2,2),(25,2),(33,2),(34,2),(35,2),(38,2),(39,2),(42,2),(3,3),(40,3),(41,3),(43,3),(1,4),(5,4),(7,4),(8,4),(9,4),(10,4),(25,4),(44,4),(45,4),(46,4),(2,5),(3,5),(5,5),(25,5),(36,5),(29,6),(30,6),(31,6),(32,6),(26,7),(27,7),(28,7),(37,7);
/*!40000 ALTER TABLE `report_categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reports`
--

DROP TABLE IF EXISTS `reports`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reports` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(100) NOT NULL,
  `image` longtext,
  `description` text,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `created_by` int NOT NULL DEFAULT '1',
  `status_id` int DEFAULT NULL,
  `report_url` varchar(100) DEFAULT NULL,
  `is_anonymous` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `created_by` (`created_by`),
  KEY `reports_status_FK` (`status_id`),
  CONSTRAINT `reports_ibfk_1` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `reports_status_FK` FOREIGN KEY (`status_id`) REFERENCES `status` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=47 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reports`
--

LOCK TABLES `reports` WRITE;
/*!40000 ALTER TABLE `reports` DISABLE KEYS */;
INSERT INTO `reports` VALUES (1,'Tienda de componentes de computadoras DDCompus','report-pictures/5211a4b631c9dba76cf21c50c4bf3552f8c53548f348a751a78375c48bfbd21f.PNG','Compre una tarjeta rtx 5070 en una oferta en su sitio web. El problema es que me llego una gtx 1070 que no tiene nada que ver con lo que pedí.','2025-09-27 23:50:39','2025-10-18 19:43:12',1,2,'http://ddCompus.com.mx',0),(2,'Página de phishing detectada','report-pictures/0512ec54dc4c50a4e63e024fbc3367c17335b875e58f03bef789878e7cfc98df.jpg','El portal imita la interfaz de una empresa de envíos para robar credenciales de acceso.','2025-09-27 23:51:32','2025-10-17 01:58:07',2,2,'http://envios-gratis-seguro.net',0),(3,'Sitio de ventas falsas','report-pictures/57c0a3a48e923d8bb9e94b3a8ff743a58e9c4e71d4ccf0e6e2e3d513a7f49fdd.jpg','La página ofrece productos electrónicos a precios demasiado bajos y nunca realiza las entregas.','2025-09-27 23:51:51','2025-10-15 08:16:36',3,1,'http://ofertas-electronica-barata.org',0),(5,'Plataforma de inversión fraudulenta','report-pictures/b9237d0f30ecb0a7dc2f84e6a1cc3af324ea742b93a56f5dd8f0cb11e629bf5e.jpg','El sitio promete ganancias irreales en criptomonedas y exige depósitos sin garantía alguna.','2025-09-27 23:52:29','2025-10-15 10:49:59',2,3,'http://crypto-ganancias-rapidas.info',0),(7,'Portal falso de soporte técnico','report-pictures/ccf0a7bb2e9d9a4b8347ff291c4b731ddf28573c4a2a5b5d67e3bc111f0a89f3.jpg','La web se hace pasar por un servicio de soporte oficial y pide pagos por reparaciones inexistentes.','2025-09-27 23:52:50','2025-10-15 10:33:56',1,1,'http://soporte-oficial-falso.com',1),(8,'Portal falso de soporte técnico','report-pictures/9369aa4d20442dfe016d4ac405585770fa62c9b6b0c7eecbc4463f9e35564ac9.jpg','La web se hace pasar por un servicio de soporte oficial y pide pagos por reparaciones inexistentes.','2025-10-06 00:55:39','2025-10-17 01:59:54',1,2,'http://soporte-oficial-falso.com',0),(9,'Portal falso de soporte técnico','report-pictures/282d42fb1ce8181c6d4d364ac866ed7a9d7a3b6afbc592ab91ce6abe824618a7.jpg','La web se hace pasar por un servicio de soporte oficial y pide pagos por reparaciones inexistentes.','2025-10-06 02:32:40','2025-10-17 02:00:21',1,2,'http://soporte-oficial-falso.com',1),(10,'Portal falso de soporte técnico','report-pictures/ccf0a7bb2e9d9a4b8347ff291c4b731ddf28573c4a2a5b5d67e3bc111f0a89f3.jpg','La web se hace pasar por un servicio de soporte oficial y pide pagos por reparaciones inexistentes.','2025-10-06 02:32:41','2025-10-15 08:12:55',1,3,'http://soporte-oficial-falso.com',0),(25,'Pagina fraudulenta','profile-pictures/6059124dc3806372d4b4151b95af26e5586fe7b5490673f9fcc1bf11e5a1d77b.jpg','This is a description for the first report.','2025-10-18 17:35:46','2025-10-18 17:35:46',1,1,'http://soporte-oficial-falso.com',0),(26,'Viaje a la luna','profile-pictures/6059124dc3806372d4b4151b95af26e5586fe7b5490673f9fcc1bf11e5a1d77b.jpg','Es falso. Nunca me contactaron de regreso para darme mis boletos. Primero me pidieron que pagara $99 para “asegurar mi lugar”. Luego, me dijeron que tenía que pagar otros $99 para el “seguro espacial”, después otros $99 para el “equipo lunar”, y así, en total 374 pagos diferentes. Al final, nadie me contestó ni me dio los boletos.','2025-10-18 23:44:33','2025-10-18 23:44:33',12,1,'http://soporte-oficial-falso.com',0),(27,'Viaje a la luna','profile-pictures/6059124dc3806372d4b4151b95af26e5586fe7b5490673f9fcc1bf11e5a1d77b.jpg','Es falso. Nunca me contactaron de regreso para darme mis boletos. Primero me pidieron que pagara $99 para “asegurar mi lugar”. Luego, me dijeron que tenía que pagar otros $99 para el “seguro espacial”, después otros $99 para el “equipo lunar”, y así, en total 374 pagos diferentes. Al final, nadie me contestó ni me dio los boletos.','2025-10-18 23:44:35','2025-10-18 23:44:35',12,1,'http://soporte-oficial-falso.com',0),(28,'Viaje a la luna','profile-pictures/6059124dc3806372d4b4151b95af26e5586fe7b5490673f9fcc1bf11e5a1d77b.jpg','Es falso. Nunca me contactaron de regreso para darme mis boletos. Primero me pidieron que pagara $99 para “asegurar mi lugar”. Luego, me dijeron que tenía que pagar otros $99 para el “seguro espacial”, después otros $99 para el “equipo lunar”, y así, en total 374 pagos diferentes. Al final, nadie me contestó ni me dio los boletos.','2025-10-18 23:44:35','2025-10-18 23:44:35',12,1,'http://soporte-oficial-falso.com',0),(29,'Viaje a la luna','profile-pictures/6059124dc3806372d4b4151b95af26e5586fe7b5490673f9fcc1bf11e5a1d77b.jpg','Es falso. Nunca me contactaron de regreso para darme mis boletos. Primero me pidieron que pagara $99 para “asegurar mi lugar”. Luego, me dijeron que tenía que pagar otros $99 para el “seguro espacial”, después otros $99 para el “equipo lunar”, y así, en total 374 pagos diferentes. Al final, nadie me contestó ni me dio los boletos.','2025-10-18 23:44:48','2025-10-18 23:44:48',12,1,'http://soporte-oficial-falso.com',0),(30,'Viaje a la luna','profile-pictures/6059124dc3806372d4b4151b95af26e5586fe7b5490673f9fcc1bf11e5a1d77b.jpg','Es falso. Nunca me contactaron de regreso para darme mis boletos. Primero me pidieron que pagara $99 para “asegurar mi lugar”. Luego, me dijeron que tenía que pagar otros $99 para el “seguro espacial”, después otros $99 para el “equipo lunar”, y así, en total 374 pagos diferentes. Al final, nadie me contestó ni me dio los boletos.','2025-10-18 23:44:49','2025-10-18 23:44:49',12,1,'http://soporte-oficial-falso.com',0),(31,'Viaje a la luna','profile-pictures/6059124dc3806372d4b4151b95af26e5586fe7b5490673f9fcc1bf11e5a1d77b.jpg','Es falso. Nunca me contactaron de regreso para darme mis boletos. Primero me pidieron que pagara $99 para “asegurar mi lugar”. Luego, me dijeron que tenía que pagar otros $99 para el “seguro espacial”, después otros $99 para el “equipo lunar”, y así, en total 374 pagos diferentes. Al final, nadie me contestó ni me dio los boletos.','2025-10-18 23:44:50','2025-10-18 23:44:50',12,1,'http://soporte-oficial-falso.com',0),(32,'Viaje a la luna','profile-pictures/6059124dc3806372d4b4151b95af26e5586fe7b5490673f9fcc1bf11e5a1d77b.jpg','Es falso. Nunca me contactaron de regreso para darme mis boletos. Primero me pidieron que pagara $99 para “asegurar mi lugar”. Luego, me dijeron que tenía que pagar otros $99 para el “seguro espacial”, después otros $99 para el “equipo lunar”, y así, en total 374 pagos diferentes. Al final, nadie me contestó ni me dio los boletos.','2025-10-18 23:44:56','2025-10-18 23:44:56',12,1,'http://soporte-oficial-falso.com',0),(33,'Prueba','profile-pictures/placeholder.jpg','Prueba','2025-10-19 00:24:22','2025-10-19 00:24:22',12,1,'http://soporte-oficial-falso.com',0),(34,'ventas de sillas: Silla de oficina que teletransporta a la playa por $300','profile-pictures/placeholder.jpg','Compré una silla que “te lleva automáticamente a la playa cuando te sientas”. Pagué $300 y luego me pidieron más por “combustible para teletransporte”. No llegó nada, ni silla ni playa.','2025-10-19 00:33:39','2025-10-19 00:33:39',12,1,'https://muebles.com/sillas/silla-playa',0),(35,'Bien','profile-pictures/dummy.jpg','Buah','2025-10-19 01:08:52','2025-10-19 01:08:52',12,1,'http://soporte-oficial-falso.com',0),(36,'Curso online para aprender a hablar con animales por $50','profile-pictures/dummy.jpg','Me inscribí en un curso para  hablar con mi perro. Pagué $50. No recibí nada útil, solo mensajes automáticos y videos que no servían. Mi perro sigue sin contestarme.','2025-10-19 01:12:45','2025-10-19 01:12:45',12,1,'http://soporte-oficial-falso.com',0),(37,'Boletos vip','profile-pictures/dummy.jpg','Un usuario en redes vendía entradas a buen precio, decía tener “contactos”. Le transferí el dinero, me mandó un código QR falso. En la puerta del evento, el código no funcionó. Y él ya había borrado su cuenta.','2025-10-19 02:14:07','2025-10-19 02:14:07',12,1,'http://evemtos.com',0),(38,'D','profile-pictures/dummy.jpg','N','2025-10-19 02:15:13','2025-10-19 02:15:13',12,1,'http://prueba-reporte.com',0),(39,'Prueba 4k','profile-pictures/default.jpg','Prueba estafa','2025-10-19 02:18:23','2025-10-19 02:18:23',12,1,'https://no-url-provided.com',0),(40,'H','profile-pictures/dummy.jpg','N','2025-10-19 03:02:14','2025-10-19 03:02:14',12,1,'https://no-url-provided.com',0),(41,'O inglés','profile-pictures/dummy.jpg','Prueba mi','2025-10-19 03:03:15','2025-10-19 03:03:15',12,1,'https://no-url-provided.com',0),(42,'Prueba','profile-pictures/default.jpg','B','2025-10-20 05:01:35','2025-10-20 05:01:35',9,1,'https://no-url-provided.com',0),(43,'Prueba','profile-pictures/default.jpg','Prueba','2025-10-20 05:04:38','2025-10-20 05:04:38',9,1,'https://ropanueva.com',0),(44,'ropa de marca original a súper descuento','report-pictures/c9f65fd307aed296db4129eba3b61d45a880175707e6bf70d1991984f015a065.jpg','Vi un anuncio de zapatillas Nike originales al 70% de descuento. Hice el pago por adelantado y después me enviaron unas zapatillas que parecían de juguete, con mala calidad y sin logo real. Traté de reclamar, pero bloquearon mi contacto. Nunca más vi a ese vendedor.','2025-10-20 05:06:05','2025-10-20 05:06:05',9,1,'https://ropanueva.com',0),(45,'televisor Smart a precio muy bajo','report-pictures/4d56077046281243caf38b127923bb066053a1b5425630ac4e71971fea5e3d49.jpg','Una tienda online ofrecía un televisor Smart de 50” a mitad de precio. Compré y pagué. Me enviaron un paquete muy pequeño que contenía un marco vacío con la caja. Intenté reclamar pero nunca respondieron. Claramente una estafa con fotos engañosas.','2025-10-20 05:14:15','2025-10-20 05:14:15',9,1,'http://shop-fast.com',0),(46,'Venta de laptops reacondicionadas','report-pictures/7fc4158c3084497c3f1fbb80d869136fc405cce0112ac7a36bc2f5706fbf606f.jpg','Me ofrecieron una laptop en excelente estado, con garantía, a buen precio. Después de pagar, recibí una laptop muy usada, con fallas y sin sistema operativo. Quise hacer la devolución y no respondieron.','2025-10-20 06:38:49','2025-10-20 06:38:49',12,1,'https://laptosbaratas.com/reacondicionadas',0);
/*!40000 ALTER TABLE `reports` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `role`
--

DROP TABLE IF EXISTS `role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `role` (
  `id` int NOT NULL,
  `role` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `role`
--

LOCK TABLES `role` WRITE;
/*!40000 ALTER TABLE `role` DISABLE KEYS */;
INSERT INTO `role` VALUES (1,'admin'),(2,'moderator'),(3,'user'),(4,'editor'),(5,'guest');
/*!40000 ALTER TABLE `role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `status`
--

DROP TABLE IF EXISTS `status`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `status` (
  `id` int NOT NULL AUTO_INCREMENT,
  `status` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `status`
--

LOCK TABLES `status` WRITE;
/*!40000 ALTER TABLE `status` DISABLE KEYS */;
INSERT INTO `status` VALUES (1,'pendiente'),(2,'aprobada'),(3,'rechazada');
/*!40000 ALTER TABLE `status` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `upvotes`
--

DROP TABLE IF EXISTS `upvotes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `upvotes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `report_id` int NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_vote` (`user_id`,`report_id`),
  KEY `report_id` (`report_id`),
  CONSTRAINT `upvotes_ibfk_1` FOREIGN KEY (`report_id`) REFERENCES `reports` (`id`) ON DELETE CASCADE,
  CONSTRAINT `upvotes_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=50 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `upvotes`
--

LOCK TABLES `upvotes` WRITE;
/*!40000 ALTER TABLE `upvotes` DISABLE KEYS */;
INSERT INTO `upvotes` VALUES (17,7,7,'2025-10-08 20:33:05'),(33,1,3,'2025-10-10 02:12:14'),(36,1,1,'2025-10-10 02:20:41'),(37,7,1,'2025-10-10 02:44:34'),(41,9,9,'2025-10-16 00:13:46'),(42,9,8,'2025-10-16 00:13:49'),(44,9,2,'2025-10-16 00:13:53'),(45,1,2,'2025-10-18 00:59:36'),(48,12,26,'2025-10-19 00:13:48'),(49,12,34,'2025-10-19 00:36:10');
/*!40000 ALTER TABLE `upvotes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_settings`
--

DROP TABLE IF EXISTS `user_settings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_settings` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `is_reactions_enabled` tinyint(1) DEFAULT '1',
  `is_review_enabled` tinyint(1) DEFAULT '1',
  `is_reports_enabled` tinyint(1) DEFAULT '1',
  `is_anonymous_preferred` tinyint DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `fk_user` (`user_id`),
  CONSTRAINT `fk_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_settings`
--

LOCK TABLES `user_settings` WRITE;
/*!40000 ALTER TABLE `user_settings` DISABLE KEYS */;
INSERT INTO `user_settings` VALUES (6,1,1,1,1,1),(7,2,1,1,1,0),(8,3,1,1,1,0),(10,5,1,1,1,0),(11,6,1,1,1,0),(12,7,0,0,0,0),(13,8,1,1,1,0),(14,9,1,0,1,1),(15,10,1,1,1,1),(16,11,1,1,1,0),(17,12,1,1,1,0),(18,13,1,1,1,0);
/*!40000 ALTER TABLE `user_settings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `username` varchar(20) NOT NULL,
  `password` varchar(255) NOT NULL,
  `salt` char(64) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `image_path` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT 'profile-pictures/default.jpg',
  `role_id` int DEFAULT '1',
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `username` (`username`),
  KEY `role_id` (`role_id`),
  CONSTRAINT `users_ibfk_1` FOREIGN KEY (`role_id`) REFERENCES `role` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Arturo Utrillaa','arturo@gmail.com','Arturo_utrilla','1e5e57ac154b31636a42556511bd4b1faf37451b846260f234d28c7ade35c2bd','9tuubdqpqei','2025-09-25 12:14:44','2025-10-10 18:54:55','profile-pictures/default.jpg',1),(2,'Dr. Sahur','thungthungsahur@gmail.com','cool_dr.527','162b322ced31e0c3b83c18d2b13a21df7289742f1a92f34245378d3c64fa4cd7','go4fzup9s4m','2025-09-25 14:59:41','2025-09-25 14:59:41','profile-pictures/default.jpg',1),(3,'Dr. Sahur','1@gmail.com','happy_dr.552','35f21401077fde4f03c2b9c5f836dc4fff139351fa33833642479e734cecfd6d','sgpvdhrs0zc','2025-09-25 15:36:28','2025-09-25 15:36:28','profile-pictures/default.jpg',1),(5,'Test User','test@example.com','fast_test503','465bc89602e2b61b78526fa984a18f043ca34e2d29d670d0ee9b7813c16cd69d','8bmg501lrwc','2025-10-08 14:59:57','2025-10-08 14:59:57','profile-pictures/default.jpg',1),(6,'Ximena Sánchez','ximena@gmail.com','happy_ximena850','4190cf0be66e814ddb69bfc83cca3b4c92e82f8bc13ebd5bceee987a9fbae3c3','3d513ivgakh','2025-10-08 15:03:21','2025-10-08 15:03:21','profile-pictures/default.jpg',1),(7,'Ximena Sánchez','de@gmail.com','smart_ximena192','7a5ff7c333f8cb1e56cd771cc3419fae7544226d3175f2a50a05f0e1f3db2094','xe0ao0la6me','2025-10-08 15:05:51','2025-10-08 15:05:51','profile-pictures/default.jpg',1),(8,'Rodrigo Sánchez','ro@gmail.com','Rodri','36e5573482b4188de2bc8cabfd94b3ff2ef91147e4803eb6c95abdda0c6d4ac4','uvpoeu7cp2','2025-10-09 16:41:53','2025-10-10 00:22:34','profile-pictures/default.jpg',1),(9,'Ana Keila Martínez Moreno','ana@gmail.com','ana_750','c14319e746038c5c3be42a5d6f746bfd281ef844059233603c30e595393c45b1','ejajzg1kl5v','2025-10-10 00:29:56','2025-10-18 09:53:20','profile-pictures/default.jpg',1),(10,'ZAP','zaproxy@example.com','happy_zap34','f616edc19cd94bd9c7acc8cb79bb6cdf89e6c6e7b355d7d2f849c8405f131128','jl17frhq69','2025-10-11 02:03:18','2025-10-11 02:03:18','profile-pictures/default.jpg',1),(11,'admin','admin@gmail.com','smart_admin342','efd7b41611903b4045b76d68b426e766f6e0a89190bf7d32ceca8d7b788b5e77','94ad67yxia4','2025-10-11 04:05:44','2025-10-11 04:05:44','profile-pictures/default.jpg',2),(12,'Cuenta','cuenta@gmail.com','cool_cuenta220','bf75598c3ba599fd6f07fc57559e50a8bba370f8d500e40fcb23b84ab14517c9','x0djutyz4lf','2025-10-13 19:30:01','2025-10-13 19:30:01','profile-pictures/default.jpg',1),(13,'Isa Montaño Mendoza','Isa@gmail.com','happy_isa834','e4ef680582390afd2ee67c7cc4f831c1621ab87e81433655caeeb5746b255473','622l630parc','2025-10-15 19:24:19','2025-10-15 19:24:19','profile-pictures/default.jpg',1);
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

-- Dump completed on 2025-10-20 16:36:40
