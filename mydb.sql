-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               5.6.26 - MySQL Community Server (GPL)
-- Server OS:                    Win32
-- HeidiSQL Version:             9.4.0.5125
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;


-- Dumping database structure for db_helious_test
CREATE DATABASE IF NOT EXISTS `db_helious_test` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `db_helious_test`;

-- Dumping structure for procedure db_helious_test.SpDeleteUser
DELIMITER //
CREATE DEFINER=`root`@`localhost` PROCEDURE `SpDeleteUser`(
	IN `id` INT
)
BEGIN

	DECLARE message varchar(30);
 	delete from tbl_user where uId=id;
 	set message='Successfully Deleted Data';
   select message;
 	
END//
DELIMITER ;

-- Dumping structure for procedure db_helious_test.SpEditUser
DELIMITER //
CREATE DEFINER=`root`@`localhost` PROCEDURE `SpEditUser`(
	IN `id` INT,
	IN `fname` VARCHAR(100),
	IN `lname` VARCHAR(100),
	IN `email` VARCHAR(100),
	IN `role` VARCHAR(20),
	IN `statusu` VARCHAR(20)

)
BEGIN

  DECLARE message varchar(30);
  UPDATE tbl_user
  SET uFirstName = fname, uLastName = lname, uEmail=email,uRole=role,uStatus=statusu
  WHERE uId=id;
  
  set message='Successfully Updated Data';
  select message;
END//
DELIMITER ;

-- Dumping structure for procedure db_helious_test.SpGetUserById
DELIMITER //
CREATE DEFINER=`root`@`localhost` PROCEDURE `SpGetUserById`(
	IN `id` INT

)
BEGIN
 select uId, uFirstName,uLastName , uEmail, uRole,uStatus from tbl_user where uId=id;
END//
DELIMITER ;

-- Dumping structure for procedure db_helious_test.SpGetUserList
DELIMITER //
CREATE DEFINER=`root`@`localhost` PROCEDURE `SpGetUserList`()
BEGIN

select uId, concat(uFirstName,' ',uLastName) as uName, uRole,DATE_FORMAT(uCreated, "%d-%m-%Y") as uCreated,uStatus from tbl_user;

END//
DELIMITER ;

-- Dumping structure for procedure db_helious_test.SpInsertUser
DELIMITER //
CREATE DEFINER=`root`@`localhost` PROCEDURE `SpInsertUser`(
	IN `fname` VARCHAR(100),
	IN `lname` VARCHAR(100),
	IN `email` VARCHAR(100),
	IN `role` VARCHAR(50),
	IN `statusu` VARCHAR(50)

)
BEGIN

	DECLARE message varchar(30);
	
   INSERT INTO tbl_user(uFirstName,uLastName,uEmail,uRole,uStatus) VALUES (fname,lname,email,role,statusu);
    
    set message='Successfully Inserted Data';
    select message;
END//
DELIMITER ;

-- Dumping structure for procedure db_helious_test.SpSearchUser
DELIMITER //
CREATE DEFINER=`root`@`localhost` PROCEDURE `SpSearchUser`(
	IN `searchname` VARCHAR(50)
)
BEGIN
  set @myvar=searchname;
  select uId, concat(uFirstName,' ',uLastName) as uName, uRole,DATE_FORMAT(uCreated, "%d-%m-%Y") as uCreated,uStatus 
  from tbl_user
  where concat(uFirstName,uLastName) 
  Like concat('%',@myvar,'%');
  
END//
DELIMITER ;

-- Dumping structure for table db_helious_test.tbl_user
CREATE TABLE IF NOT EXISTS `tbl_user` (
  `uId` int(11) NOT NULL AUTO_INCREMENT,
  `uFirstName` varchar(100) DEFAULT NULL,
  `uLastName` varchar(100) DEFAULT NULL,
  `uEmail` varchar(100) DEFAULT NULL,
  `uRole` enum('Admin','Partner') DEFAULT NULL,
  `uCreated` datetime DEFAULT CURRENT_TIMESTAMP,
  `uStatus` enum('Active','Inactive') DEFAULT NULL,
  PRIMARY KEY (`uId`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=latin1;

-- Dumping data for table db_helious_test.tbl_user: ~1 rows (approximately)
/*!40000 ALTER TABLE `tbl_user` DISABLE KEYS */;
INSERT INTO `tbl_user` (`uId`, `uFirstName`, `uLastName`, `uEmail`, `uRole`, `uCreated`, `uStatus`) VALUES
	(11, 'Alpesh', 'Patel', 'alpesh119@yahoo.in', 'Admin', '2019-12-16 11:51:35', 'Active');
/*!40000 ALTER TABLE `tbl_user` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
