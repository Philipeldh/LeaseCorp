\set ON_ERROR_STOP on
\c leasing;

-- Vem är representant och vilken kund representerar denne --
insert into representant (representantPersnr, representantNamn, jobbarPa) values 
('551215-6565', 'Bodil Hedvigsson', 'Malmö'),
('850903-1414', 'Per Ottosson', 'Ystad'),
('680807-4124', 'Svea Bodilsson','Ystad'),
('750202-3365', 'Hedvig Hult','Lund'),
('771201-5506', 'Andreas Schultz','Kristianstad'),
('710530-9540', 'Linda Ekensköld','Malmö');

-- Data om kunder --
insert into kund (kundPersnr, kundNamn, kundEpost, kundAdress, kundNarmasteServiceVerkstad, RepresenterasAv) values 
('820303-9898', 'Sune Svensson', 'sune@gmail.com', 'ystadsgatan 12', 'Malmö','551215-6565'),
('891204-2125', 'Anders Persson', 'anders@gmail.com', 'pellevägen 77', 'Malmö','551215-6565'),
('740101-6545', 'Niklas Svantesson', 'niklas@gmail.com', 'ystadsgatan 12', 'Malmö','551215-6565'),
('710501-9554', 'Tord Granheim', 'tord@live.se', 'råtegelvägen 4', 'Helsingborg','551215-6565'),
('850903-1414', 'Per Ottosson', 'per@yahoo.se', 'planetgatan 14', 'Ystad','551215-6565'),
('820707-6444', 'Mikael Trondheim', 'mikael@gmail.com', 'neptunusvägen 5', 'Ystad','680807-4124'),
('771003-7445', 'Linnea Bäckström', 'linnea@live.se', 'banangatan 56', 'Ystad','680807-4124'),
('830311-6445', 'Amanda Nordkvist', 'amanda@mah.se', 'kiwigatan 3', 'Kristianstad','771201-5506'),
('790126-3225', 'Karolina Ström', 'karolina@lth.se', 'mandarinvägen 59', 'Kristianstad','771201-5506'),
('940119-1615', 'Erik Eldh', 'Erik.eldh@sony.com', 'Mobilvägen 4', 'Lund', '750202-3365'),
('961212-1234', 'Joel Lindqvist', 'joel@lindqvist@telia.com', 'Carl Hillsgatan 12a', 'Malmö','710530-9540'),
('890101-4567', 'Sanna Nielsen', 'Sanna@Nielsen.org', 'Osbygatan 7', 'Malmö','710530-9540'),
('920505-3451', 'Marco Liderlin', 'Marco@gmail.com', 'Lurendrejargränd 1', 'Ystad', '850903-1414');

-- Vilken bil kunden leasat --
insert into bil (regNr, årTal, bilNamn, bilHyrare) values 
('xbx455', '2004', 'Opel Insignia', '850903-1414'),
('xwu794', '2008', 'Volkswagen Polo','820303-9898'),
('roh294', '2011', 'Volvo V70','890101-4567'),
('ahh233', '2017', 'Toyota Prius','940119-1615'),
('xyz987', '2017', 'BMW M3', '961212-1234'),
('ahh777', '2016', 'Volvo V50', '710501-9554'),
('xyz234', '2017', 'Volvo v40', '830311-6445'),
('xzy321', '2017', 'Tesla P90D', '820303-9898'),
('zxa999', '2009', 'Opel Insignia', '740101-6545'),
('aaa128', '2017', 'Volvo v90', '891204-2125'),
('lok874', '2016', 'Volkswagen passat', '771003-7445'),
('mnk159', '2007', 'Renault clio', '790126-3225'),
('abc854', '2017', 'Porsche 911 Turbo', '920505-3451');




