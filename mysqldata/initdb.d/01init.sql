-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema 41room
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema 41room
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `41room` DEFAULT CHARACTER SET utf8 ;
USE `41room` ;

-- -----------------------------------------------------
-- Table `41room`.`t_building`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `41room`.`t_building` (
  `building_id` CHAR(36) NOT NULL,
  `building_title` VARCHAR(255) NOT NULL,
  `building_description` TEXT NOT NULL,
  `contract_addr` VARCHAR(255) NULL,
  `created_at` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  `modified_at` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`building_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `41room`.`t_tenant`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `41room`.`t_tenant` (
  `tenant_id` CHAR(36) NOT NULL,
  `building_id` CHAR(36) NULL,
  `tenant_login_id` VARCHAR(45) NOT NULL,
  `tenant_login_pw` VARCHAR(255) NOT NULL,
  `tenant_nm` VARCHAR(45) NULL,
  `tenant_dong` VARCHAR(255) NULL,
  `tenant_ho` VARCHAR(45) NULL,
  `wallet_id` VARCHAR(255) NULL,
  `created_at` DATETIME NULL DEFAULT CURRENT_TIMESTAMP(),
  `modified_at` DATETIME NULL DEFAULT CURRENT_TIMESTAMP(),
  PRIMARY KEY (`tenant_id`),
  UNIQUE INDEX `tenant_login_id_UNIQUE` (`tenant_login_id` ASC) VISIBLE,
  INDEX `fk_t_tenant_t_building1_idx` (`building_id` ASC) VISIBLE,
  CONSTRAINT `fk_t_tenant_t_building1`
    FOREIGN KEY (`building_id`)
    REFERENCES `41room`.`t_building` (`building_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `41room`.`t_agent`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `41room`.`t_agent` (
  `agent_id` CHAR(36) NOT NULL,
  `building_id` CHAR(36) NOT NULL,
  `agent_login_id` VARCHAR(45) NOT NULL,
  `agent_login_pw` VARCHAR(255) NOT NULL,
  `agent_nm` VARCHAR(45) NULL,
  `wallet_addr` VARCHAR(255) NULL,
  `created_at` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  `modified_at` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`agent_id`),
  UNIQUE INDEX `agent_login_id_UNIQUE` (`agent_login_id` ASC) VISIBLE,
  INDEX `fk_t_agent_t_building_idx` (`building_id` ASC) VISIBLE,
  CONSTRAINT `fk_t_agent_t_building`
    FOREIGN KEY (`building_id`)
    REFERENCES `41room`.`t_building` (`building_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `41room`.`t_community`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `41room`.`t_community` (
  `community_id` CHAR(36) NOT NULL,
  `tenant_id` CHAR(36) NOT NULL,
  `community_title` VARCHAR(255) NOT NULL,
  `community_content` TEXT NULL,
  `created_at` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  `modified_at` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  `contract_addr` VARCHAR(255) NULL,
  PRIMARY KEY (`community_id`),
  INDEX `fk_t_community_t_tenant1_idx` (`tenant_id` ASC) VISIBLE,
  CONSTRAINT `fk_t_community_t_tenant1`
    FOREIGN KEY (`tenant_id`)
    REFERENCES `41room`.`t_tenant` (`tenant_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `41room`.`t_plant`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `41room`.`t_plant` (
  `plant_id` CHAR(36) NOT NULL,
  `building_id` CHAR(36) NOT NULL,
  `plant_nm` VARCHAR(255) NOT NULL,
  `plant_desc` TEXT NULL,
  `plant_img` VARCHAR(255) NOT NULL,
  `plant_fee` FLOAT NOT NULL,
  `created_at` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  `modified_at` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`plant_id`),
  INDEX `fk_t_plant_t_building1_idx` (`building_id` ASC) VISIBLE,
  CONSTRAINT `fk_t_plant_t_building1`
    FOREIGN KEY (`building_id`)
    REFERENCES `41room`.`t_building` (`building_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `41room`.`t_vote`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `41room`.`t_vote` (
  `vote_id` CHAR(36) NOT NULL,
  `community_id` CHAR(36) NOT NULL,
  `vote_title` VARCHAR(255) NOT NULL,
  `vote_description` TEXT NULL,
  `vote_start` DATETIME NULL,
  `vote_end` DATETIME NULL,
  PRIMARY KEY (`vote_id`),
  INDEX `fk_t_vote_t_community1_idx` (`community_id` ASC) VISIBLE,
  CONSTRAINT `fk_t_vote_t_community1`
    FOREIGN KEY (`community_id`)
    REFERENCES `41room`.`t_community` (`community_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `41room`.`t_reply`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `41room`.`t_reply` (
  `reply_id` CHAR(36) NOT NULL,
  `reply_content` LONGTEXT NOT NULL,
  `created_at` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  `modified_at` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  `community_id` CHAR(36) NOT NULL,
  `tenant_id` CHAR(36) NOT NULL,
  PRIMARY KEY (`reply_id`),
  INDEX `fk_t_reply_t_community1_idx` (`community_id` ASC) VISIBLE,
  INDEX `fk_t_reply_t_tenant1_idx` (`tenant_id` ASC) VISIBLE,
  CONSTRAINT `fk_t_reply_t_community1`
    FOREIGN KEY (`community_id`)
    REFERENCES `41room`.`t_community` (`community_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_t_reply_t_tenant1`
    FOREIGN KEY (`tenant_id`)
    REFERENCES `41room`.`t_tenant` (`tenant_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `41room`.`t_review`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `41room`.`t_review` (
  `review_id` CHAR(36) NOT NULL,
  `plant_id` CHAR(36) NOT NULL,
  `tenant_id` CHAR(36) NOT NULL,
  `review_content` LONGTEXT NOT NULL,
  `review_grade` FLOAT NOT NULL,
  `created_at` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  `modified_at` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`review_id`),
  INDEX `fk_t_review_t_plant1_idx` (`plant_id` ASC) VISIBLE,
  INDEX `fk_t_review_t_tenant1_idx` (`tenant_id` ASC) VISIBLE,
  CONSTRAINT `fk_t_review_t_plant1`
    FOREIGN KEY (`plant_id`)
    REFERENCES `41room`.`t_plant` (`plant_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_t_review_t_tenant1`
    FOREIGN KEY (`tenant_id`)
    REFERENCES `41room`.`t_tenant` (`tenant_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
