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


-- Dumping database structure for db_innvonix
CREATE DATABASE IF NOT EXISTS `db_innvonix` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `db_innvonix`;

-- Dumping structure for procedure db_innvonix.SpDeleteBlog
DELIMITER //
CREATE DEFINER=`root`@`localhost` PROCEDURE `SpDeleteBlog`(
	IN `id` INT

)
BEGIN
	DECLARE message varchar(30);
 	delete from tbl_blogs where bId=id;
 	set message='Successfully Deleted Data';
   select message;
END//
DELIMITER ;

-- Dumping structure for procedure db_innvonix.SpEditUser
DELIMITER //
CREATE DEFINER=`root`@`localhost` PROCEDURE `SpEditUser`(
	IN `id` INT,
	IN `statusu` VARCHAR(20)
)
BEGIN

  DECLARE message varchar(30);
  UPDATE tbl_user
  SET uStatus=statusu
  WHERE uId=id;
  
  set message='Successfully Updated Data';
  select message;

END//
DELIMITER ;

-- Dumping structure for procedure db_innvonix.SpGetBlogListByIdRole
DELIMITER //
CREATE DEFINER=`root`@`localhost` PROCEDURE `SpGetBlogListByIdRole`(
	IN `id` INT,
	IN `role` VARCHAR(50)
















)
BEGIN

declare userrole varchar(20);
set userrole=role;

if(userrole = 'User')then

	 select tbluser.uId, concat(uFirstName,' ',uLastName) as uName, uRole,uStatus,uEmail,bTitle,bDiscription,bId,bImageName
	 from tbl_user as tbluser
	 inner join tbl_blogs as tblblog
	 on tbluser.uId =tblblog.userId
	
	 where uStatus='Active' and uId=id;
	 
	 else
	 
	 select tbluser.uId, concat(uFirstName,' ',uLastName) as uName, uRole,uStatus,uEmail,bTitle,bDiscription,bId,bImageName
	 from tbl_user as tbluser
	 inner join tbl_blogs as tblblog
	 on tbluser.uId =tblblog.userId;
	  
  end if;
  
END//
DELIMITER ;

-- Dumping structure for procedure db_innvonix.SpGetUserById
DELIMITER //
CREATE DEFINER=`root`@`localhost` PROCEDURE `SpGetUserById`(
	IN `id` INT
)
BEGIN
 select uId, uFirstName,uLastName , uEmail, uRole,uStatus from tbl_user where uId=id;
END//
DELIMITER ;

-- Dumping structure for procedure db_innvonix.SpGetUserList
DELIMITER //
CREATE DEFINER=`root`@`localhost` PROCEDURE `SpGetUserList`()
BEGIN
select uId, concat(uFirstName,' ',uLastName) as uName, uRole,uStatus,uEmail 
 from tbl_user;
END//
DELIMITER ;

-- Dumping structure for procedure db_innvonix.SpInsertBlog
DELIMITER //
CREATE DEFINER=`root`@`localhost` PROCEDURE `SpInsertBlog`(
	IN `id` INT,
	IN `title` VARCHAR(100),
	IN `discription` VARCHAR(500)
,
	IN `imgname` VARCHAR(200)
)
BEGIN
DECLARE message varchar(30);
	
    INSERT INTO tbl_blogs(userId,bTitle,bDiscription,bImageName) VALUES (id,title,discription,imgname);
    
    set message='Successfully Inserted Blog';
    select message;
END//
DELIMITER ;

-- Dumping structure for procedure db_innvonix.SpInsertUser
DELIMITER //
CREATE DEFINER=`root`@`localhost` PROCEDURE `SpInsertUser`(
	IN `fname` VARCHAR(50),
	IN `lname` VARCHAR(50),
	IN `email` VARCHAR(100),
	IN `pass` VARCHAR(10)


)
BEGIN

	DECLARE message varchar(30);
	declare userexist varchar(200);
	
   if EXISTS( SELECT *  FROM tbl_user WHERE `uEmail`= email ) then
   set message='User Already Exists!';
   set userexist='userexist';
   select message,userexist;
   
	else
	
    INSERT INTO tbl_user(uFirstName,uLastName,uEmail,uPassword) VALUES (fname,lname,email,pass);  
    set message='Successfully Inserted Data';
    select message;
    end if;
    
END//
DELIMITER ;

-- Dumping structure for procedure db_innvonix.SpSignIn
DELIMITER //
CREATE DEFINER=`root`@`localhost` PROCEDURE `SpSignIn`(
	IN `email` VARCHAR(50),
	IN `pass` VARCHAR(20)


)
BEGIN

declare message varchar(200);
declare auth varchar(20);

if EXISTS( SELECT *  FROM tbl_user WHERE `uEmail`= email  AND uPassword = pass) then
	set message='Login successfully.';
	set auth='authentic';
       SELECT uId,uFirstName,uRole,uStatus,auth FROM tbl_user WHERE `uEmail`= email  AND uPassword = pass ;
  else
	 
	   set message= 'Oops! Login credentials are invalid!';
	   set auth= 'unauthentic';
	   select message,auth;
	 
	end if;
         
         
 
END//
DELIMITER ;

-- Dumping structure for table db_innvonix.tbl_blogs
CREATE TABLE IF NOT EXISTS `tbl_blogs` (
  `bId` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) NOT NULL,
  `bTitle` varchar(50) NOT NULL,
  `bDiscription` varchar(500) NOT NULL,
  `bImageName` varchar(100) NOT NULL,
  PRIMARY KEY (`bId`)
) ENGINE=InnoDB AUTO_INCREMENT=60 DEFAULT CHARSET=latin1;

-- Dumping data for table db_innvonix.tbl_blogs: ~5 rows (approximately)
/*!40000 ALTER TABLE `tbl_blogs` DISABLE KEYS */;
INSERT INTO `tbl_blogs` (`bId`, `userId`, `bTitle`, `bDiscription`, `bImageName`) VALUES
	(48, 2, 'Highcharts Demo', 'asdad', 'AIimg-1576918039459.png'),
	(55, 3, 'Highcharts Demo', 'sdfsadfsaf', 'Image2-1576924843338.png'),
	(57, 4, '3D column', 'asdad', 'Image2-1577076310522.png'),
	(58, 4, '3D column', 'test', 'Welcome_3_hd-1577076397600.png'),
	(59, 2, '3D column', 'sdfsadfsaf', 'butterfly-free-desktop-wallpaper-1577078683580.png');
/*!40000 ALTER TABLE `tbl_blogs` ENABLE KEYS */;

-- Dumping structure for table db_innvonix.tbl_image
CREATE TABLE IF NOT EXISTS `tbl_image` (
  `imgId` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) NOT NULL DEFAULT '0',
  `bId` int(11) DEFAULT '0',
  `imgName` varchar(100) NOT NULL DEFAULT '0',
  `imgPre` varchar(500) NOT NULL DEFAULT '0',
  PRIMARY KEY (`imgId`)
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=latin1;

-- Dumping data for table db_innvonix.tbl_image: ~3 rows (approximately)
/*!40000 ALTER TABLE `tbl_image` DISABLE KEYS */;
INSERT INTO `tbl_image` (`imgId`, `userId`, `bId`, `imgName`, `imgPre`) VALUES
	(28, 3, 0, 'but1-1576842301437.png', 'publicUploadImageut1-1576842301437.png'),
	(29, 2, 0, 'AIimg-1576847057860.png', 'publicUploadImageAIimg-1576847057860.png'),
	(30, 2, 0, 'butterfly-free-desktop-wallpaper-1576848004424.png', 'publicUploadImageutterfly-free-desktop-wallpaper-1576848004424.png'),
	(31, 2, 0, 'Image2-1576848372022.png', 'publicUploadImageImage2-1576848372022.png');
/*!40000 ALTER TABLE `tbl_image` ENABLE KEYS */;

-- Dumping structure for table db_innvonix.tbl_user
CREATE TABLE IF NOT EXISTS `tbl_user` (
  `uId` int(11) NOT NULL AUTO_INCREMENT,
  `uFirstName` varchar(50) NOT NULL DEFAULT '0',
  `uLastName` varchar(50) NOT NULL DEFAULT '0',
  `uEmail` varchar(100) NOT NULL DEFAULT '0',
  `uPassword` varchar(20) NOT NULL DEFAULT '0',
  `uRole` enum('User','Admin') NOT NULL DEFAULT 'User',
  `uStatus` enum('Active','Inactive') NOT NULL DEFAULT 'Inactive',
  PRIMARY KEY (`uId`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

-- Dumping data for table db_innvonix.tbl_user: ~5 rows (approximately)
/*!40000 ALTER TABLE `tbl_user` DISABLE KEYS */;
INSERT INTO `tbl_user` (`uId`, `uFirstName`, `uLastName`, `uEmail`, `uPassword`, `uRole`, `uStatus`) VALUES
	(1, 'Alpesh', 'Patel', 'abc@yahoo.in', 'abc', 'Admin', 'Active'),
	(2, 'Xyz', 'aaa', 'alpesh119@yahoo.in', 'ax', 'User', 'Active'),
	(3, 'Nikhil', 'km', 'xyz@yahoo.in', 'xyz', 'User', 'Active'),
	(4, 'random', 'test', 'az@yahoo.in', 'az', 'User', 'Active');
/*!40000 ALTER TABLE `tbl_user` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
