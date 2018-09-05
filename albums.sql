-- phpMyAdmin SQL Dump
-- version 4.5.4.1deb2ubuntu2.1
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Sep 05, 2018 at 06:49 PM
-- Server version: 5.7.23-0ubuntu0.16.04.1
-- PHP Version: 7.0.30-1+ubuntu16.04.1+deb.sury.org+1

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
  `album_id` int(11) NOT NULL,
  `artist` varchar(100) NOT NULL,
  `title` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `albums`
--

INSERT INTO `albums` (`album_id`, `artist`, `title`) VALUES
(418, 'alan walker', 'faded'),
(419, 'test', 'test'),
(420, 'alan walker', 'faded'),
(421, 'test', 'test'),
(422, 'alan walker', 'faded'),
(424, 'alan walker', 'faded'),
(425, 'test', 'test'),
(426, 'alan walker', 'faded'),
(427, 'test', 'mee'),
(428, 'czx', 'sss'),
(429, 'esfd', 'aas'),
(430, 'alan walker', 'faded'),
(431, 'alan walker', 'faded'),
(432, 'test', 'test'),
(433, 'alan walker', 'faded'),
(434, 'test', 'test'),
(435, 'alan walker', 'faded'),
(436, 'alan walker', 'faded'),
(437, 'test', 'test'),
(438, 'alan walker', 'faded'),
(439, 'test', 'mee'),
(440, 'czx', 'sss'),
(441, 'esfd', 'aas'),
(442, 'test', 'test'),
(443, 'alan walker', 'faded'),
(444, 'alan walker', 'faded'),
(445, 'test', 'test'),
(446, 'alan walker', 'faded'),
(447, 'test', 'test'),
(448, 'alan walker', 'faded'),
(449, 'alan walker', 'faded'),
(450, 'test', 'test'),
(451, 'alan walker', 'faded'),
(452, 'test', 'mee'),
(453, 'czx', 'sss'),
(454, 'esfd', 'aas'),
(455, 'alan walker', 'faded'),
(456, 'alan walker', 'faded'),
(457, 'test', 'test'),
(458, 'alan walker', 'faded'),
(459, 'test', 'test'),
(460, 'alan walker', 'faded'),
(461, 'alan walker', 'faded'),
(462, 'test', 'test'),
(463, 'alan walker', 'faded'),
(464, 'test', 'mee'),
(465, 'czx', 'sss'),
(466, 'esfd', 'aas'),
(467, 'alan walker', 'faded'),
(468, 'alan walker', 'faded'),
(469, 'test', 'test'),
(470, 'alan walker', 'faded'),
(471, 'test', 'test'),
(472, 'alan walker', 'faded'),
(473, 'alan walker', 'faded'),
(474, 'test', 'test'),
(475, 'alan walker', 'faded'),
(476, 'test', 'mee'),
(477, 'czx', 'sss'),
(478, 'esfd', 'aas'),
(479, 'alan walker', 'faded'),
(480, 'alan walker', 'faded'),
(481, 'test', 'test'),
(482, 'alan walker', 'faded'),
(483, 'test', 'test'),
(484, 'alan walker', 'faded'),
(485, 'alan walker', 'faded'),
(486, 'test', 'test'),
(487, 'alan walker', 'faded'),
(489, 'czx', 'sss'),
(490, 'esfd', 'aas'),
(491, 'test', 'test'),
(492, 'test', 'sss'),
(493, 'alan walker', 'aas'),
(494, 'sss', 'sss');

-- --------------------------------------------------------

--
-- Stand-in structure for view `albums_categories`
--
CREATE TABLE `albums_categories` (
`title` varchar(100)
,`artist` varchar(100)
,`album_id` int(11)
,`category_id` int(11)
,`cat_name` varchar(100)
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
(13, 'Songs'),
(14, 'Music'),
(16, 'Remix'),
(17, 'tree');

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
(427, 16),
(428, 13),
(428, 14),
(428, 16),
(429, 16),
(442, 14),
(492, 13),
(493, 13),
(494, 17);

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
  `discount` decimal(3,2) DEFAULT NULL,
  `start_date` date DEFAULT NULL,
  `end_date` date DEFAULT NULL,
  `album_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure for view `albums_categories`
--
DROP TABLE IF EXISTS `albums_categories`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `albums_categories`  AS  select `t1`.`title` AS `title`,`t1`.`artist` AS `artist`,`t1`.`album_id` AS `album_id`,`t2`.`id` AS `category_id`,`t2`.`name` AS `cat_name` from ((`albums` `t1` join `categories` `t2`) join `have_categories` `t3`) where ((`t1`.`album_id` = `t3`.`album_id`) and (`t2`.`id` = `t3`.`category_id`)) ;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `albums`
--
ALTER TABLE `albums`
  ADD PRIMARY KEY (`album_id`);

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
  MODIFY `album_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=495;
--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;
--
-- AUTO_INCREMENT for table `music`
--
ALTER TABLE `music`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `have_categories`
--
ALTER TABLE `have_categories`
  ADD CONSTRAINT `have_categories_ibfk_1` FOREIGN KEY (`album_id`) REFERENCES `albums` (`album_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `have_categories_ibfk_2` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `music`
--
ALTER TABLE `music`
  ADD CONSTRAINT `music_ibfk_1` FOREIGN KEY (`album_id`) REFERENCES `albums` (`album_id`) ON DELETE CASCADE ON UPDATE CASCADE;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
