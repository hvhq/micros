drop database if exists micros;
create database micros;
use micros;

drop table if exists user;
create table user (
    ID varchar(51),
    username varchar(20),
    password varchar(100),
    constraint username_unique unique(username),
    constraint user_pk primary key (ID)
);

drop table if exists note;
create table note (
    ID varchar(51),
    content varchar(250),
    owner varchar(51),
    constraint note_pk primary key (ID)
);

drop table if exists editpermission;
create table editpermission (
    userID varchar(51),
    noteID varchar(51),
    constraint editpermission_user_fk foreign key (userID) references user(ID),
    constraint editpermission_note_fk foreign key (noteID) references note(ID)
);