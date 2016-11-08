
CREATE DATABASE blog;
USE blog;
CREATE TABLE user(
   id INT PRIMARY KEY auto_increment,
   username VARCHAR(20) NOT NULL,
   password VARCHAR(50) NOT NULL,
   email VARCHAR(50) NOT NULL
);
CREATE TABLE article(
   id INT PRIMARY KEY auto_increment,
   title VARCHAR(100) NOT NULL,
   content TEXT NOT NULL,
   time DATETIME NOT NULL,
   uid INT NOT NULL
);
CREATE TABLE comments
(
  id INT PRIMARY KEY auto_increment,
  content TEXT NOT NULL,  -- ��������
  time DATETIME NOT NULL, -- ����ʱ��
  uid INT NOT NULL, -- ��������
  aid INT NOT NULL -- ��������
);