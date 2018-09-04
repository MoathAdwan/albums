-- phpMyAdmin SQL Dump
-- version 4.5.4.1deb2ubuntu2
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Aug 31, 2018 at 04:12 AM
-- Server version: 5.7.23-0ubuntu0.16.04.1
-- PHP Version: 7.0.31-1+ubuntu16.04.1+deb.sury.org+1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `albums`
--

-- --------------------------------------------------------

--
-- Table structure for table `albums`
--

CREATE TABLE `albums` (
  `id` int(11) NOT NULL,
  `artist` varchar(100) NOT NULL,
  `title` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `albums`
--

INSERT INTO `albums` (`id`, `artist`, `title`) VALUES
(331, 'faded', 'alan walker'),
(332, 'test', 'test');

-- --------------------------------------------------------

--
-- Stand-in structure for view `albums_categories`
--
CREATE TABLE `albums_categories` (
`album_id` int(11)
,`category_id` int(11)
,`name` varchar(100)
);

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `name`) VALUES
(7, 'songs'),
(8, 'music'),
(9, 'remix'),
(10, 'modern'),
(11, 'classic');

-- --------------------------------------------------------

--
-- Table structure for table `have_categories`
--

CREATE TABLE `have_categories` (
  `album_id` int(11) NOT NULL,
  `category_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `have_categories`
--

INSERT INTO `have_categories` (`album_id`, `category_id`) VALUES
(331, 7),
(331, 8),
(332, 7),
(332, 8),
(332, 9),
(332, 10);

-- --------------------------------------------------------

--
-- Table structure for table `music`
--

CREATE TABLE `music` (
  `id` int(11) NOT NULL,
  `duration` time NOT NULL,
  `title` varchar(100) NOT NULL,
  `mp3` text NOT NULL,
  `price_jod` decimal(4,2) DEFAULT NULL,
  `price_dollar` decimal(4,2) DEFAULT NULL,
  `price_euro` decimal(4,2) DEFAULT NULL,
  `discount` decimal(3,2) DEFAULT '0.00',
  `start_date` date DEFAULT NULL,
  `end_date` date DEFAULT NULL,
  `album_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `music`
--

INSERT INTO `music` (`id`, `duration`, `title`, `mp3`, `price_jod`, `price_dollar`, `price_euro`, `discount`, `start_date`, `end_date`, `album_id`) VALUES
(9, '00:03:00', 'test', '252323.mp3', '50.50', '50.50', '50.50', '0.00', NULL, NULL, 331);

-- --------------------------------------------------------

--
-- Structure for view `albums_categories`
--
DROP TABLE IF EXISTS `albums_categories`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `albums_categories`  AS  select `t1`.`id` AS `album_id`,`t2`.`id` AS `category_id`,`t2`.`name` AS `name` from ((`albums` `t1` join `categories` `t2`) join `have_categories` `t3`) where ((`t1`.`id` = `t3`.`album_id`) and (`t2`.`id` = `t3`.`category_id`)) ;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `albums`
--
ALTER TABLE `albums`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `have_categories`
--
ALTER TABLE `have_categories`
  ADD PRIMARY KEY (`album_id`,`category_id`),
  ADD KEY `album_id` (`album_id`),
  ADD KEY `category_id` (`category_id`);

--
-- Indexes for table `music`
--
ALTER TABLE `music`
  ADD PRIMARY KEY (`id`),
  ADD KEY `artist_id` (`album_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `albums`
--
ALTER TABLE `albums`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=333;
--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;
--
-- AUTO_INCREMENT for table `music`
--
ALTER TABLE `music`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `have_categories`
--
ALTER TABLE `have_categories`
  ADD CONSTRAINT `have_categories_ibfk_1` FOREIGN KEY (`album_id`) REFERENCES `albums` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `have_categories_ibfk_2` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `music`
--
ALTER TABLE `music`
  ADD CONSTRAINT `music_ibfk_1` FOREIGN KEY (`album_id`) REFERENCES `albums` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
