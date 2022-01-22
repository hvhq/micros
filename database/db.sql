drop database if exists micros;
create database micros;
use micros;

drop table if exists user;
create table user (
    ID int not null auto_increment,
    username varchar(20),
    password varchar(100),
    constraint username_unique unique(username),
    constraint user_pk primary key (ID)
);

drop table if exists note;
create table note (
    ID int not null auto_increment,
    content varchar(250),
    owner varchar(51),
    constraint note_pk primary key (ID)
);

drop table if exists editpermission;
create table editpermission (
    userID int,
    noteID int,
    constraint editpermission_user_fk foreign key (userID) references user(ID),
    constraint editpermission_note_fk foreign key (noteID) references note(ID)
);