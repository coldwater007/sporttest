/*
Navicat MySQL Data Transfer

Source Server         : mysql
Source Server Version : 50639
Source Host           : 120.78.168.177:3306
Source Database       : edu_system

Target Server Type    : MYSQL
Target Server Version : 50639
File Encoding         : 65001

Date: 2018-07-01 15:05:57
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for administrators
-- ----------------------------
DROP TABLE IF EXISTS `administrators`;
CREATE TABLE `administrators` (
  `id` varchar(45) CHARACTER SET gb2312 NOT NULL,
  `password` varchar(45) CHARACTER SET utf8 NOT NULL,
  `power` smallint(6) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=gbk;

-- ----------------------------
-- Table structure for could_not_test_record
-- ----------------------------
DROP TABLE IF EXISTS `could_not_test_record`;
CREATE TABLE `could_not_test_record` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `Sno` varchar(50) DEFAULT NULL,
  `content` varchar(200) DEFAULT NULL,
  `time` date DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=186 DEFAULT CHARSET=gb2312;

-- ----------------------------
-- Table structure for courses
-- ----------------------------
DROP TABLE IF EXISTS `courses`;
CREATE TABLE `courses` (
  `T_no` int(11) NOT NULL AUTO_INCREMENT,
  `T_place` varchar(256) CHARACTER SET gb2312 NOT NULL,
  `T_teacher` varchar(45) CHARACTER SET gb2312 NOT NULL,
  `T_time` date NOT NULL,
  `T_time_course` varchar(40) CHARACTER SET gb2312 NOT NULL,
  `T_limit` int(11) NOT NULL,
  `T_start` varchar(10) NOT NULL DEFAULT '0',
  `T_num` int(11) unsigned zerofill DEFAULT NULL,
  PRIMARY KEY (`T_no`)
) ENGINE=InnoDB AUTO_INCREMENT=727 DEFAULT CHARSET=gbk;

-- ----------------------------
-- Table structure for grades
-- ----------------------------
DROP TABLE IF EXISTS `grades`;
CREATE TABLE `grades` (
  `id` varchar(255) NOT NULL,
  `testtime` varchar(255) NOT NULL,
  `name` varchar(255) CHARACTER SET utf8 NOT NULL,
  `sex` varchar(255) DEFAULT NULL,
  `height` varchar(255) DEFAULT NULL,
  `weight` varchar(255) DEFAULT NULL,
  `lung` varchar(255) DEFAULT NULL,
  `frun` varchar(255) DEFAULT NULL,
  `jump` varchar(255) DEFAULT NULL,
  `zuowei` varchar(255) DEFAULT NULL,
  `erun` varchar(255) DEFAULT NULL,
  `onerun` varchar(255) DEFAULT NULL,
  `ywqz` varchar(255) DEFAULT NULL,
  `ytxs` varchar(255) DEFAULT NULL,
  `zongfen` varchar(255) DEFAULT NULL,
  `level` varchar(255) DEFAULT NULL,
  `xuejihao` varchar(255) CHARACTER SET utf8 DEFAULT NULL,
  PRIMARY KEY (`id`,`testtime`)
) ENGINE=InnoDB DEFAULT CHARSET=gb2312 ROW_FORMAT=COMPACT;

-- ----------------------------
-- Table structure for loads
-- ----------------------------
DROP TABLE IF EXISTS `loads`;
CREATE TABLE `loads` (
  `Loadid` varchar(15) NOT NULL,
  `Password` varchar(40) NOT NULL DEFAULT '0',
  PRIMARY KEY (`Loadid`)
) ENGINE=InnoDB DEFAULT CHARSET=gb2312;

-- ----------------------------
-- Table structure for news
-- ----------------------------
DROP TABLE IF EXISTS `news`;
CREATE TABLE `news` (
  `id` smallint(6) NOT NULL AUTO_INCREMENT,
  `title` varchar(45) DEFAULT NULL,
  `time` date DEFAULT NULL,
  `writer` varchar(20) DEFAULT NULL,
  `content` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=gb2312;

-- ----------------------------
-- Table structure for sc_point
-- ----------------------------
DROP TABLE IF EXISTS `sc_point`;
CREATE TABLE `sc_point` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `pid` int(11) DEFAULT NULL,
  `Sno` varchar(45) DEFAULT NULL,
  `grade` smallint(6) DEFAULT NULL,
  `content` varchar(50) DEFAULT NULL,
  `Tname` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for sc_pointname
-- ----------------------------
DROP TABLE IF EXISTS `sc_pointname`;
CREATE TABLE `sc_pointname` (
  `pid` int(11) NOT NULL AUTO_INCREMENT,
  `content` varchar(60) DEFAULT NULL,
  `department` varchar(30) DEFAULT NULL,
  `referencegrade` int(11) DEFAULT NULL,
  PRIMARY KEY (`pid`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for scs
-- ----------------------------
DROP TABLE IF EXISTS `scs`;
CREATE TABLE `scs` (
  `Sno` varchar(45) CHARACTER SET utf8 NOT NULL,
  `STno` varchar(45) CHARACTER SET utf8 NOT NULL,
  PRIMARY KEY (`Sno`,`STno`)
) ENGINE=InnoDB DEFAULT CHARSET=gb2312;

-- ----------------------------
-- Table structure for students
-- ----------------------------
DROP TABLE IF EXISTS `students`;
CREATE TABLE `students` (
  `Sno` varchar(45) CHARACTER SET gb2312 NOT NULL,
  `Sname` varchar(45) CHARACTER SET utf8 NOT NULL,
  `Ssex` varchar(45) CHARACTER SET gb2312 DEFAULT NULL,
  `Snation` varchar(45) CHARACTER SET gb2312 DEFAULT NULL,
  `Sdepartment` varchar(100) CHARACTER SET gb2312 DEFAULT NULL,
  `Sclass` varchar(45) CHARACTER SET gb2312 DEFAULT NULL,
  `Sgrade` varchar(45) CHARACTER SET gb2312 DEFAULT NULL,
  `Sbirth` varchar(0) DEFAULT NULL,
  `Sendurance` varchar(45) CHARACTER SET gb2312 DEFAULT NULL,
  `SPower` varchar(45) CHARACTER SET gb2312 DEFAULT NULL,
  `Sspeed` varchar(45) CHARACTER SET gb2312 DEFAULT NULL,
  `state` varchar(6) DEFAULT NULL,
  `point` varchar(6) DEFAULT NULL,
  `email` varchar(50) CHARACTER SET utf8 DEFAULT NULL,
  PRIMARY KEY (`Sno`)
) ENGINE=InnoDB DEFAULT CHARSET=gbk;

-- ----------------------------
-- Table structure for stugrade2013
-- ----------------------------
DROP TABLE IF EXISTS `stugrade2013`;
CREATE TABLE `stugrade2013` (
  `id` varchar(255) NOT NULL,
  `name` varchar(255) CHARACTER SET utf8 NOT NULL,
  `sex` varchar(255) DEFAULT NULL,
  `height` varchar(255) DEFAULT NULL,
  `weight` varchar(255) DEFAULT NULL,
  `lung` varchar(255) DEFAULT NULL,
  `frun` varchar(255) DEFAULT NULL,
  `jump` varchar(255) DEFAULT NULL,
  `zuowei` varchar(255) DEFAULT NULL,
  `erun` varchar(255) DEFAULT NULL,
  `onerun` varchar(255) DEFAULT NULL,
  `ywqz` varchar(255) DEFAULT NULL,
  `ytxs` varchar(255) DEFAULT NULL,
  `zongfen` varchar(255) DEFAULT NULL,
  `level` varchar(255) DEFAULT NULL,
  `xuejihao` varchar(255) CHARACTER SET utf8 DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=gb2312;

-- ----------------------------
-- Table structure for stugrade2014
-- ----------------------------
DROP TABLE IF EXISTS `stugrade2014`;
CREATE TABLE `stugrade2014` (
  `id` varchar(255) NOT NULL,
  `name` varchar(255) CHARACTER SET utf8 NOT NULL,
  `sex` varchar(255) DEFAULT NULL,
  `height` varchar(255) DEFAULT NULL,
  `weight` varchar(255) DEFAULT NULL,
  `lung` varchar(255) DEFAULT NULL,
  `frun` varchar(255) DEFAULT NULL,
  `jump` varchar(255) DEFAULT NULL,
  `zuowei` varchar(255) DEFAULT NULL,
  `erun` varchar(255) DEFAULT NULL,
  `onerun` varchar(255) DEFAULT NULL,
  `ywqz` varchar(255) DEFAULT NULL,
  `ytxs` varchar(255) DEFAULT NULL,
  `zongfen` varchar(255) DEFAULT NULL,
  `level` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=gb2312;

-- ----------------------------
-- Table structure for stugrade2015
-- ----------------------------
DROP TABLE IF EXISTS `stugrade2015`;
CREATE TABLE `stugrade2015` (
  `id` varchar(255) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `sex` varchar(255) DEFAULT NULL,
  `height` varchar(255) DEFAULT NULL,
  `weight` varchar(255) DEFAULT NULL,
  `lung` varchar(255) DEFAULT NULL,
  `frun` varchar(255) DEFAULT NULL,
  `jump` varchar(255) DEFAULT NULL,
  `zuowei` varchar(255) DEFAULT NULL,
  `erun` varchar(255) DEFAULT NULL,
  `onerun` varchar(255) DEFAULT NULL,
  `ywqz` varchar(255) DEFAULT NULL,
  `ytxs` varchar(255) DEFAULT NULL,
  `zongfen` varchar(255) DEFAULT NULL,
  `level` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for stugrade2016
-- ----------------------------
DROP TABLE IF EXISTS `stugrade2016`;
CREATE TABLE `stugrade2016` (
  `id` varchar(255) NOT NULL,
  `name` varchar(255) CHARACTER SET utf8 NOT NULL,
  `sex` varchar(255) DEFAULT NULL,
  `height` varchar(255) DEFAULT NULL,
  `weight` varchar(255) DEFAULT NULL,
  `lung` varchar(255) DEFAULT NULL,
  `frun` varchar(255) DEFAULT NULL,
  `jump` varchar(255) DEFAULT NULL,
  `zuowei` varchar(255) DEFAULT NULL,
  `erun` varchar(255) DEFAULT NULL,
  `onerun` varchar(255) DEFAULT NULL,
  `ywqz` varchar(255) DEFAULT NULL,
  `ytxs` varchar(255) DEFAULT NULL,
  `zongfen` varchar(255) DEFAULT NULL,
  `level` varchar(255) DEFAULT NULL,
  `xuejihao` varchar(255) CHARACTER SET utf8 DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=gb2312;

-- ----------------------------
-- Table structure for stugrade2017
-- ----------------------------
DROP TABLE IF EXISTS `stugrade2017`;
CREATE TABLE `stugrade2017` (
  `id` varchar(255) NOT NULL,
  `name` varchar(255) CHARACTER SET utf8 NOT NULL,
  `sex` varchar(255) DEFAULT NULL,
  `height` varchar(255) DEFAULT NULL,
  `weight` varchar(255) DEFAULT NULL,
  `lung` varchar(255) DEFAULT NULL,
  `frun` varchar(255) DEFAULT NULL,
  `jump` varchar(255) DEFAULT NULL,
  `zuowei` varchar(255) DEFAULT NULL,
  `erun` varchar(255) DEFAULT NULL,
  `onerun` varchar(255) DEFAULT NULL,
  `ywqz` varchar(255) DEFAULT NULL,
  `ytxs` varchar(255) DEFAULT NULL,
  `zongfen` varchar(255) DEFAULT NULL,
  `level` varchar(255) DEFAULT NULL,
  `xuejihao` varchar(255) CHARACTER SET utf8 DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=gb2312;

-- ----------------------------
-- Table structure for teacher
-- ----------------------------
DROP TABLE IF EXISTS `teacher`;
CREATE TABLE `teacher` (
  `Tno` varchar(45) CHARACTER SET utf8 NOT NULL,
  `Isfree` varchar(45) CHARACTER SET gb2312 DEFAULT NULL,
  PRIMARY KEY (`Tno`)
) ENGINE=InnoDB DEFAULT CHARSET=gbk;

-- ----------------------------
-- Table structure for test_initialize
-- ----------------------------
DROP TABLE IF EXISTS `test_initialize`;
CREATE TABLE `test_initialize` (
  `Testno` varchar(10) NOT NULL,
  `Testname` varchar(45) NOT NULL,
  `Testlocaty` varchar(45) NOT NULL,
  `Testyear` varchar(4) DEFAULT NULL,
  PRIMARY KEY (`Testno`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for test_item
-- ----------------------------
DROP TABLE IF EXISTS `test_item`;
CREATE TABLE `test_item` (
  `Test_no` varchar(10) CHARACTER SET gb2312 NOT NULL,
  `Test_name` varchar(45) CHARACTER SET gb2312 NOT NULL,
  `Test_kind` varchar(45) CHARACTER SET gb2312 NOT NULL,
  `Test_locaty` varchar(45) CHARACTER SET gb2312 NOT NULL,
  `Test_sex` varchar(10) CHARACTER SET gb2312 DEFAULT NULL,
  PRIMARY KEY (`Test_no`)
) ENGINE=InnoDB DEFAULT CHARSET=gbk;

-- ----------------------------
-- Table structure for test_place
-- ----------------------------
DROP TABLE IF EXISTS `test_place`;
CREATE TABLE `test_place` (
  `Tplaceno` varchar(10) CHARACTER SET gb2312 NOT NULL,
  `Tplacename` varchar(45) CHARACTER SET gb2312 NOT NULL,
  `Tistrue` tinyint(4) NOT NULL,
  PRIMARY KEY (`Tplaceno`)
) ENGINE=InnoDB DEFAULT CHARSET=gbk;

-- ----------------------------
-- Procedure structure for test_insert
-- ----------------------------
DROP PROCEDURE IF EXISTS `test_insert`;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `test_insert`()
BEGIN 
 DECLARE i INT DEFAULT 657;
WHILE i<727
DO 
insert into sc_record(rno,rnum) values (i,0); 
SET i=i+1; 
END WHILE ; 
commit; 

END
;;
DELIMITER ;
