
\set ON_ERROR_STOP on
\c bojan
drop database if exists leasing;
create database leasing;
\c leasing;

 
create table kund (
    kundPersnr    char(11),
    kundNamn       text,
    kundEpost      text,
    kundAdress     text,
    kundNarmasteServiceVerkstad text,
    representerasAv char(11),
    primary key (kundPersnr)
);
    
create table bil (
    regNr     char(6) primary key,
    årTal     char(4),
    bilNamn       text,
    bilHyrare  text,
    
    foreign key (bilHyrare) references kund (kundPersnr)
);
 
create table representant(
    representantPersnr char(11) PRIMARY KEY,
    representantNamn text,
    jobbarPa text
); 

 alter table kund
 add foreign key (representerasAv) references representant(representantPersnr);
    