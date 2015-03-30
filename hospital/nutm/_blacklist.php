<?php
$blacklist = [
    496, // Anaesthesia ONC-RAD SERVICES AM **** ONCOLOGY
    331, // Anaesthesia WH AM ANAES **** NAYAR Krish
    498, // Anaesthesia IPS NURSE **** KING S
    497, // Anaesthesia IPS AM ANAES **** BARNARD John
    1013, // Anaesthesia IPS PM ANAES **** BARNARD John
    397, // Anaesthesia DUTY L3 AM **** BURROWS Thomas
    426, // Anaesthesia WH PM ANAES **** NAYAR Krish
    427, // Anaesthesia WH PM ANAES REG **** CARDINAL Alex
    456, // Anaesthesia CARDIAC CALL **** BYRNE Kelly
    723, // Anaesthesia PAIN CLIN AM ANAES 1 **** KIBBLEWHITE David
    1433, // Anaesthesia PAIN CLIN AM ANAES REG **** BOND Greg
    813, // Anaesthesia PAIN CLIN PM ANAES 1 **** KIBBLEWHITE David
    482, // Anaesthesia PAIN CLIN PM ANAES REG **** BOND Greg
    489, // Anaesthesia ECT-PAC AM ANAES **** CROWTHER Alan
    503, // Anaesthesia ECT-PAC  AM ANAES REG **** MOHAMED Nik
    506, // Anaesthesia PAEDS CALL **** MUNCASTER Andrew
    504, // Anaesthesia PAC PM ANAES **** CROWTHER Alan
    588, // Anaesthesia PAC PM ANAES REG **** MOHAMED Nik
    675, // Anaesthesia SENIOR CALL 1 **** TSE Chris
    677, // Anaesthesia SENIOR CALL 2 **** WILLIAMS David
    676, // Anaesthesia DUTY  L3  PM **** MUNCASTER Andrew
    1689, // Anaesthesia DUTY   L2  ALL DAY **** WILLIAMS David
    1177, // Anaesthesia PAEDS PAIN **** DICK Mike
    1211, // Anaesthesia ADMIN 23322 **** Week 4
    1444, // Anaesthesia MCC 01 GENSURG ACUTE **** LOLOHEA Simi
    1447, // Anaesthesia MCC 01 ANAES ACUTE **** O'DONNELL Aidan
    1448, // Anaesthesia MCC 01 ANAES REG **** WAAKA Ari
    1446, // Anaesthesia MCC 02 SURG **** HAGGART Paul
    1449, // Anaesthesia MCC 02 ANAES **** HOPGOOD Gary
    1450, // Anaesthesia MCC 02 ANAES REG **** SHORT Heather
    1452, // Anaesthesia MCC 03 SURG (Cardiac) **** ODOM Nick
    1455, // Anaesthesia MCC 03 ANAES **** RUDMAN Arthur
    1457, // Anaesthesia MCC 03 ANAES REG **** BARR James
    1454, // Anaesthesia MCC 04 SURG **** WU Linus
    1458, // Anaesthesia MCC 04 ANAES **** SAMARAWEERA Niru
    1459, // Anaesthesia MCC 04 ANAES REG **** MCAULIFFE Daniel
    1461, // Anaesthesia MCC 05 SURG **** HUSSAIN
    1462, // Anaesthesia MCC 05 ANAES **** BAILEY Tania
    1465, // Anaesthesia MCC 06 SURG (Neuro) **** MUTHU
    1469, // Anaesthesia MCC 06 ANAES **** FURLONGER Andrew
    1467, // Anaesthesia KL2 07 ORTHOACUTESURG **** DEVERILL Hamish
    1470, // Anaesthesia KL2  07 ANAES **** MERCER Luke
    1473, // Anaesthesia KL2 08 SURG **** STRICK Neville
    1476, // Anaesthesia KL2 08 ANAES **** SIKIOTIS Lucas
    1477, // Anaesthesia KL2 08 ANAES REG **** DAVIES Simon
    1475, // Anaesthesia KL2 09 ACUTESURG (Other) **** ACUTE
    1479, // Anaesthesia KL2 09 ANAES **** EBERT Rob
    1481, // Anaesthesia KL2 10  SURG **** DONOVAN Jason
    1490, // Anaesthesia KL2 10 ANAES **** CLARK James
    1483, // Anaesthesia KL2 11 SURG **** ACUTE
    1492, // Anaesthesia KL2 11 ANAES **** No Staff
    1494, // Anaesthesia KL2 12 SURG **** NOTAVL
    1487, // Anaesthesia MCC ENDOSCOPIST **** GRUNEWALD Berndt
    1496, // Anaesthesia MCC ENDO ANAES **** MARTIN Andrew
    1489, // Anaesthesia MCC 14 SURG **** WORSLEY David
    1499, // Anaesthesia MCC 14 ANAES **** DICK Mike
    1498, // Anaesthesia MCC 14 ANAES REG **** FUNG Daniel 
    1501, // Anaesthesia MCC 15 SURG **** PatilB
    1513, // Anaesthesia MCC 15 ANAES **** locals
    1503, // Anaesthesia MCC 16 SURG **** REGISTRAR
    1515, // Anaesthesia MCC 16 ANAES **** WATSON Tom
    1516, // Anaesthesia MCC 16 ANAES REG **** ENGLISH Duane
    1511, // Anaesthesia KL3 20 SURG **** RAMAN Kanan
    1523, // Anaesthesia KL3 20 ANAES **** HOSKINS  Jeff
    1526, // Anaesthesia KL3 21 SURG **** MCcEWAN Winston
    1535, // Anaesthesia KL3 21 ANAES **** GOODEY Alan
    1536, // Anaesthesia KL3 21 ANAES REG **** NAIR Renesh
    1528, // Anaesthesia KL3 22 SURG **** EVANS Steve
    1537, // Anaesthesia KL3 22 ANAES **** RENEW Richard
    1530, // Anaesthesia KL3 23 SURG - Urology **** LEYLAND John
    1539, // Anaesthesia KL3 23 ANAES **** KEEL Stephanie
    1540, // Anaesthesia KL3 23 ANAES REG **** BROWN Duncan
    1532, // Anaesthesia KL3 24 SURG PlasAc **** PLASTICS ACUTES
    1541, // Anaesthesia KL3 24 ANAES **** POLLARD Amy
    1534, // Anaesthesia KL3  25 SURG **** REGISTRAR
    1543, // Anaesthesia KL3 25 ANAES **** TSE Chris
    1593, // Anaesthesia MCC 17 SURG **** GREGOR Theo
    1678, // Anaesthesia MCC 17 ANAES **** ENGELBRECHT Conrad
    1680, // Anaesthesia MCC 17 ANAES REG **** EADDY Nick
    1605, // Anaesthesia SPARE PM **** BURROWS Thomas
    1606, // Anaesthesia SPARE PM **** MARTIN Andrew
    1703, // Anaesthesia THAMES **** O'ROURKE Tom
    748, // Cardiology On Call - Cardiologist **** PASUPATI Sanjeevan
    777, // Cardiology Waikato PAMI Cover **** PASUPATI Sanjeevan
    769, // Cardiology CPU PM - Cardiologist **** PASUPATI Sanjeevan
    762, // Cardiology CLN PM - Cardiology **** HEALD Spencer
    764, // Cardiology CLN PM - Cardiology **** FISHER Raewyn
    763, // Cardiology CLN PM - Cardiology **** MENON Madhav
    754, // Cardiology Cath Lab 1 AM **** NOCVR
    759, // Cardiology Cath Lab 2 AM **** DEVLIN Gerry
    760, // Cardiology Cath Lab 2 PM **** DEVLIN Gerry
    887, // Cardiology Cath Lab 4 AM **** WADE Clyde
    888, // Cardiology Cath Lab 4 PM **** WADE Clyde
    910, // Cardiology Admin-Non Clinical AM **** DAVIS Mark
    907, // Cardiology Admin-Non Clinical AM **** HEALD Spencer
    908, // Cardiology Admin-Non Clinical AM **** JOGIA Pranesh
    912, // Cardiology Admin-Non Clinical AM **** LIEW Tse Vun
    915, // Cardiology Admin-Non Clinical AM **** MENON Madhav
    917, // Cardiology Admin-Non Clinical AM **** NAIR Rajesh
    919, // Cardiology Admin-Non Clinical AM **** NUNN Chris
    921, // Cardiology Admin-Non Clinical AM **** PASUPATI Sanjeevan
    922, // Cardiology Admin-Non Clinical AM **** SEBASTIAN Cherian
    924, // Cardiology Admin-Non Clinical AM **** SWAMPILLAI Janice
    905, // Cardiology Admin-Non Clinical PM **** DAVIS Mark
    913, // Cardiology Admin-Non Clinical PM **** JOGIA Pranesh
    914, // Cardiology Admin-Non Clinical PM **** LIEW Tse Vun
    918, // Cardiology Admin-Non Clinical PM **** NAIR Rajesh
    927, // Cardiology Admin-Non Clinical PM **** PASUPATI Sanjeevan
    930, // Cardiology Admin-Non Clinical PM **** SEBASTIAN Cherian
    1242, // Z IOC Test SMO On Duty AM - House Officer **** YOON Tae Young
    1306, // Z IOC Test SMO On Duty PM - House Officer **** FONSEKA Nilakshi
    1441, // Medical RMO Respiratory Gen Clinic - Registrar **** FERRY-PARKER Michael
    1443, // Medical RMO Respiratory Sleep Clinic - Registrar **** MACKENZIE Monique
    1092, // Medical RMO Renal Acute AM - Registrar **** ALI Alina
    1364, // Medical RMO Cardiology On-Call Team **** D Team
    799, // Medical RMO ECHO Protected **** RAMAN Kat
    800, // Medical RMO Cath Lab **** TUN Rein
    801, // Medical RMO EP **** JADEER Assad
    893, // Medical RMO Roster Week **** Week 6
    1102, // Medical RMO General Medicine Week **** Week 6
    653, // Medical RMO General Medicine Team **** Gold
    1739, // Medical RMO GenMed-ID Clinic - Blue Registrar **** LIN Stella
    1743, // Medical RMO Stroke-TIA Clinic - Silver or Red Registrar **** HERAN Parvinder A
    876, // Medical RMO General Medicine Extra Help Team **** Silver
    654, // Medical RMO Interventional Research Fellow **** BHUTTA Usman
    655, // Medical RMO EP Fellow **** GAROFALO Daniel
    1737, // Medical RMO EP Fellow **** KHOKHAR Kashif
    709, // Medicine Admitting Code **** 911GO (Gold)
    612, // Medicine On Call - Cons **** MILLS Graham
    931, // Medicine GM Post Acute **** REEVE Paul
    722, // Medicine CPU On Call - Cons **** STEPHENSON Douglas
    725, // Medicine CPU On Call - Cons **** PASUPATI Sanjeevan
    639, // Medicine On Call Team - Cons **** Gold
    1097, // Medicine Rehabilitation **** MUNTHREE Sumi
    1101, // Medicine Diabetes **** FISHER Maggie
    1100, // Medicine Infectious Disease Consults **** HUGGAN Paul
    1099, // Medicine Clinics ID **** HUGGAN Paul
    683, // Medicine On Call - Specialist **** SOLANKI Kamal
    697, // Medicine Endoscopy On Call - Cons **** BROOKER Jim
    754, // Medicine CLN Gastro AM **** DICKSON Graeme
    756, // Medicine CLN Gastro AM **** BROOKLYN Trevor
    766, // Medicine Red Team - Cons **** KHAN Asad
    767, // Medicine Blue Team - Cons **** BROOKLYN Trevor
    768, // Medicine Gold Team - Cons **** MILLS Graham
    771, // Medicine Green Team - Cons **** QUINCEY Vicki
    770, // Medicine Silver Team - Cons **** STEPHENSON Douglas
    769, // Medicine Orange Team - Cons **** GRAY Erana
    1037, // Medicine Purple Team - Cons **** REEVE Paul
    932, // Medicine Red Ward  AM **** KHAN Asad
    933, // Medicine Blue Ward AM **** BROOKLYN Trevor
    935, // Medicine Green Ward AM **** QUINCEY Vicki
    936, // Medicine Silver Ward AM **** STEPHENSON Douglas
    937, // Medicine Orange Ward AM **** GRAY Erana
    1056, // Medicine Purple Ward AM **** REEVE Paul
    1066, // Medicine General Medicine Admin-Non Clinical PM **** STEPHENSON Douglas
    1067, // Medicine General Medicine Admin-Non Clinical PM **** REEVE Paul
    1069, // Medicine General Medicine Admin-Non Clinical PM **** KHAN Asad
    1074, // Medicine General Medicine Admin-Non Clinical PM **** GRAY Erana
    1076, // Medicine General Medicine Admin-Non Clinical PM **** HUGGAN Paul
    1064, // Medicine General Medicine Admin-Non Clinical AM & PM **** RATNAWEERA Manjula
    1004, // Medicine ENDO 1 AM **** BROOKER Jim
    1008, // Medicine ENDO 1 PM **** GenSurg
    1013, // Medicine ENDO 2 AM **** GenSurg
    1005, // Medicine ENDO 2 PM **** GenSurg
    1014, // Medicine ENDO 3 AM **** Vacant
    1006, // Medicine ENDO 3 PM **** PHILLIPS Elizabeth
    1009, // Medicine ENDO 4 AM **** GenSurg
    1007, // Medicine ENDO 4 PM **** Vacant
    968, // Medicine Gastro Referrer 1st **** BROOKER Jim
    987, // Medicine Gastro Admin-NonClinical PM **** DICKSON Graeme
    989, // Medicine Gastro Admin-NonClinical PM **** BROOKER Jim
    1104, // Medicine On Call - Infectious Diseases **** HUGGAN Paul
    1155, // Obs and Gynae Admitting Consultant **** MAKEPEACE Penelope
    27, // Obs and Gynae On Duty: AM - Consultant **** MAKEPEACE Penelope
    1154, // Obs and Gynae On Duty: AM - Consultant **** HASTIE Stewart
    580, // Obs and Gynae On Duty : PM - Consultant **** MAKEPEACE Penelope
    1161, // Obs and Gynae On Duty : PM - Consultant **** HASTIE Stewart
    910, // Obs and Gynae On Duty: Evening - Consultant **** MAKEPEACE Penelope
    500, // Obs and Gynae On Call: Night - Consultant **** MAKEPEACE Penelope
    177, // Obs and Gynae Thames **** DUDLEY Narena
    1029, // Obs and Gynae Thames Reg **** HANNA Adelle
    182, // Obs and Gynae Tokoroa Reg **** CAMANO Isabel
    465, // Obs and Gynae Antenatal CLN 1 AM SMO **** LIN Sylvia
    480, // Obs and Gynae Antenatal CLN 1 AM - Reg **** SALEH Tarek
    479, // Obs and Gynae Antenatal CLN 1 PM SMO **** LIN Sylvia
    1045, // Obs and Gynae Antenatal CLN 1 PM - Reg **** SALEH Tarek
    469, // Obs and Gynae Colposcopy CLN 1 AM SMO **** VANT Mary
    595, // Obs and Gynae Colposcopy CLN 1 AM - Reg **** Cancel
    470, // Obs and Gynae Gynae CLN 1 AM SMO **** McCONNELL Sean
    475, // Obs and Gynae Colposcopy CLN 1 PM SMO **** Cancel
    970, // Obs and Gynae Gynae CLN 1 PM SMO **** VANT Mary
    1057, // Obs and Gynae Gynae CLN 1 PM Reg **** Cancel
    1004, // Obs and Gynae ANC Grading AM **** MAKEPEACE Penelope
    688, // Obs and Gynae Bedside Teaching **** McCONNELL Sean
    510, // Obs and Gynae Non Clinical PM **** McCONNELL Sean
    1021, // Obs and Gynae Ward Round SMO AM **** LIN Sylvia
    1022, // Obs and Gynae Ward Round SMO AM **** VANT Mary
    1023, // Obs and Gynae Ward Round SMO AM **** McCONNELL Sean
    543, // Obs and Gynae Schedule Week **** Week 4
    1064, // Obs and Gynae Rostered Day Off - REG **** NIELSEN Kamilla
    925, // Obs and Gynae MCC20 - Surgeon 1 **** RAMAN Kannan
    938, // Obs and Gynae MCC20 - Registrar 1 **** BURLING Michael
    778, // Neurology On Duty: Neurologist **** WRIGHT Peter
    840, // Neurology On Call: Neurologist **** GRENHOLM Peter 
    837, // Neurology Ward: Neurologist **** WRIGHT Peter
    903, // Neurology CLN PT AM **** TIMMINGS Paul
    904, // Neurology CLN PT PM **** TIMMINGS Paul
    798, // Neurology CLN CL AM **** LYNCH Chris
    906, // Neurology CLN CL PM **** LYNCH Chris
    779, // Neurology CLN JS AM **** SCHEPEL Jan
    797, // Neurology CLN JS PM **** SCHEPEL Jan
    934, // Neurology CLN PG AM **** GRENHOLM Peter 
    935, // Neurology CLN PG PM **** GRENHOLM Peter 
    895, // Neurology CLN TIA PM **** Ward Doc
    830, // Neurology Clinic Reg Supv AM **** LYNCH Chris
    831, // Neurology Clinic Reg Supv PM **** TIMMINGS Paul
    912, // Renal On Call - AM **** PANDEY Rakesh
    833, // Renal On Call - PM **** PANDEY Rakesh
    834, // Renal Ward Physician **** TAN Eddie
    835, // Renal Transplant Physician **** PANDEY Rakesh
    836, // Renal Hospital Outliers Physician **** RABINDRANATH Kannaiyan
    837, // Renal HHD Physician **** SIZELAND Peter
    928, // Renal CAPD Physician **** SIZELAND Peter
    845, // Renal Transplant Clinic **** PANDEY Rakesh
    2218, // Mental Health Call Consultant Night 2 **** GILOOLY Mary
    748, // Vascular On Call - Vascular Surgeon **** FERRAR David
    752, // Vascular CLN AM Vascular **** FERRAR David
    778, // Vascular CLN AM Vascular - Reg 1 **** CHANDRA Abe
    957, // Vascular Angio PM - Registrar 1 **** ULOOM Amin
    920, // Vascular Interventional Radiology **** FERRAR David
    900, // Vascular MCC02 - Vascular Surgeon **** HAGGART Paul
    954, // Vascular MCC02 - Registrar 1 **** RAYNER Charles
    905, // Vascular Schedule Week **** Week 4
    929, // Vascular Clinical Admin AM **** HOLDAWAY Chris
    926, // Vascular Clinical Admin AM **** VASUDEVAN Vasu
    748, // Cardio Thoracic On Call - Surgeon **** PARKINSON Grant
    971, // Cardio Thoracic Clinical Admin AM **** LIN Zaw
    978, // Cardio Thoracic Clinical Admin AM **** PARKINSON Grant
    974, // Cardio Thoracic Clinical Admin PM **** LIN Zaw
    976, // Cardio Thoracic Clinical Admin PM **** PARKINSON Grant
    961, // Cardio Thoracic MCC03 - Cardiothoracic Surgeon **** ODOM Nick
    962, // Cardio Thoracic MCC03 - Cardiothoracic Registrar 1 **** RADHAKRISHNAN Kamaraj
    1238, // O & G HO Schedule Week **** Week 6
    1076, // Paediatrics Theatre Week **** Week 4
    958, // Paediatrics On Duty: Paediatric SMO **** DE ALMEIDA Tilak
    959, // Paediatrics On Call: After-hours Paediatric SMO **** NEWMAN David
    1247, // Paediatrics Admitting Paediatric SMO **** NEWMAN David
    1564, // Paediatrics CLINIC Paeds Med - Reg **** LUNN Mark
    1590, // Paediatrics CLINIC Paeds Med - Reg **** MUSSA Maryam
    935, // Paediatrics Community & CPASS Registrar **** AIRD Carolyn
    937, // Paediatrics CDC & CPASS Registrar **** ADAMU Zayna
    994, // Paediatrics On Call: Paediatric Surgeon **** SAMARAKKODY Udaya
    1024, // Paediatrics Admin **** Week 5
    1025, // Paediatrics Reg Roster Week **** Week 4
    1077, // Paediatrics SHO Roster Week **** Week 6
    1141, // Paediatrics CLN Paeds Medical AM - SMO **** McCAY Hamish
    1298, // Paediatrics CLN Paeds Medical AM - SMO **** SADANI Sneha
    1300, // Paediatrics CLN Paeds Medical PM - SMO **** SINGH Deepika
    1302, // Paediatrics CLN Paeds Medical PM - SMO **** NEWMAN David
    1301, // Paediatrics CLN Paeds Medical PM - SMO **** CARMICHAEL Eleanor
    1505, // Paediatrics CLN Paeds Medical PM - SMO **** GOLDSMITH John
    1533, // Paediatrics CUL Paeds Med **** GRAHAM David
    1029, // Paediatrics Paeds Med Admin AM **** NEWMAN David
    1528, // Paediatrics Paeds Med Admin AM **** SINGH Deepika
    1529, // Paediatrics Paeds Med Admin AM **** CARMICHAEL Eleanor
    1536, // Paediatrics Paeds Med Admin AM **** DE ALMEIDA Tilak
    1537, // Paediatrics Paeds Med Admin AM **** GOLDSMITH John
    1525, // Paediatrics Paeds Med Admin PM **** DE ALMEIDA Tilak
    1530, // Paediatrics Paeds Med Admin PM **** GRAHAM David
    1531, // Paediatrics Paeds Med Admin PM **** McCAY Hamish
    1534, // Paediatrics Paeds Med Admin PM **** SADANI Sneha
    1062, // Paediatrics Clinic Paeds Surg PM - Surgeon **** KUKKADY Askar
    1102, // Paediatrics NICU: L3 AM - Consultant **** WESTON Phil
    1101, // Paediatrics NICU: L3 PM - Consultant **** MAXWELL Fraser
    1110, // Paediatrics NICU: L3 AM - Reg-NNP **** EDMOND Tess
    1156, // Paediatrics NICU: L2 AM - Consultant **** BOURCHIER David
    1112, // Paediatrics NICU: L2 PM - Consultant **** MAXWELL Fraser
    1113, // Paediatrics NICU: L2 AM - Reg-NNP **** HARRIS Deborah
    1117, // Paediatrics NICU: Night **** GRAHAM Catherine
    1147, // Paediatrics Paed Surgical Reg - Clinic (or OT) **** JAYARATNAM Sridharan
    1370, // Paediatrics Paed Surgical Reg - Clinic (or OT) **** LIYANAGE Anuradha
    1342, // Clinic and OT Schedule Cardiac-Thoracic Registrar (No Team) **** LEE Mei Sze
    1591, // Clinic and OT Schedule Cardiac-Thoracic A House Officer **** DUGGAL Ritam
    1343, // Clinic and OT Schedule ======= B House Officer **** BROWN Elizabeth
    1347, // Clinic and OT Schedule Gen Surg Blue (Breast-Endocrine) Fellow **** MESSER David
    1507, // Clinic and OT Schedule ======== Blue (Cambell-Hayes-Stewart-Creighton) Adv Reg **** TRIVEDI Sid
    1509, // Clinic and OT Schedule ======== Blue Jnr Reg **** KOSURI Divya
    1508, // Clinic and OT Schedule ======== Blue HO **** YU Anne
    1350, // Clinic and OT Schedule ======== Blue HO **** FONSEKA Nilakshi
    1351, // Clinic and OT Schedule Gen Surg Green (Grunewald-Reid-Rafique) Adv Reg **** Sean LIDDLE
    1511, // Clinic and OT Schedule ======== Green Jnr Reg **** OH Sheila
    1510, // Clinic and OT Schedule ======== Green HO **** MAK Josephine
    1354, // Clinic and OT Schedule ======== Green 2 HO **** WILSON Vindhya
    1355, // Clinic and OT Schedule ======== Green HO **** MAK Josephine
    1356, // Clinic and OT Schedule Gen Surg Purple (Trauma) Fellow **** To Be Advised
    1513, // Clinic and OT Schedule ======== Purple (French-MeyerRochow-Christey) Adv Reg **** WELSH Fraser
    1514, // Clinic and OT Schedule ======== Purple Jnr Reg **** MASIREWA Napoleon
    1512, // Clinic and OT Schedule ======== Purple HO **** HE Michael
    1409, // Clinic and OT Schedule ======== Purple HO **** BENNING Charlotte
    1408, // Clinic and OT Schedule Gen Surg Orange (Colorectal) Fellow **** McMANUS Brendan
    1516, // Clinic and OT Schedule ======== Orange (Van Dalen-Lolohea-Wu) Adv Reg **** SMITH Nicholas
    1515, // Clinic and OT Schedule ======== Orange HO **** GLASS Louis
    1357, // Clinic and OT Schedule ======== Orange HO **** FERGUSON Reid
    1964, // Clinic and OT Schedule ============= House Officer **** McGREAL Paul
    1597, // Clinic and OT Schedule Ophthalmology Reg (No Team) **** VOON Shong Min
    1809, // Clinic and OT Schedule Ortho Deverall-Donovan-OMeeghan Team - Senior Reg **** SATYEN Jesani
    1810, // Clinic and OT Schedule ==== Deverall-Donovan-OMeeghan Team - Junior Reg **** MALIK Nazeef
    1811, // Clinic and OT Schedule ==== Strick-Patel-Hong Team - Senior Reg **** SEVAO Joshua
    1813, // Clinic and OT Schedule ==== Macmichael-Choy-Cowley Team - Senior Reg **** SEGAR Anand
    1814, // Clinic and OT Schedule ==== Macmichael-Choy-Cowley Team - Junior Reg **** CALDERA Kal
    1815, // Clinic and OT Schedule ==== McChesney-Willoughby-HardyTeam - Senior Reg **** MANSOURI Reza
    1816, // Clinic and OT Schedule ==== McChesney-Willoughby-HardyTeam - Junior Reg **** WHITING Frances
    1577, // Clinic and OT Schedule ==== Wotherspoon Team Reg **** MILLER Harriet
    1517, // Clinic and OT Schedule Ortho Bone Shop HO **** SETIADARMA Jeffrey
    1573, // Clinic and OT Schedule ==== Deverall-Donovan-OMeeghan Team  HO **** MOH'D ROTHI Illina
    1575, // Clinic and OT Schedule ==== Strick-Patel-Hong Team HO **** HIESS Jessica
    1576, // Clinic and OT Schedule ==== Machmicheal-Choy-Cowley Team HO **** ZHAO Sarah Taoran
    1571, // Clinic and OT Schedule ==== McChesney-Willoughby-Hardy Team HO **** KANDUKURI Sharmila
    1364, // Clinic and OT Schedule ==== Wotherspoon HO **** NAEEM Sadiya
    1851, // Clinic and OT Schedule ==== SHO **** PATEL Chetan
    1581, // Clinic and OT Schedule NICU Reg (No Team) **** HARRIS Deborah
    1584, // Clinic and OT Schedule Community Reg **** AIRD Carolyn
    1585, // Clinic and OT Schedule Child Development Centre-Mothercraft Reg **** ADAMU Zayna
    1582, // Clinic and OT Schedule Paeds Medical Reg (No Team) **** HOWLETT Rachel
    1583, // Clinic and OT Schedule Paeds Surgical Reg (No Team) **** SIVASUBRAMANIAM Mithila
    1345, // Clinic and OT Schedule Plastics A (Ahmed Alkadhi-Woodfield) HO **** TAN Ruth
    1348, // Clinic and OT Schedule ======= B (Yaprak-McEwan) HO **** ANDREWS Alexandria
    1349, // Clinic and OT Schedule ======= C (Asad Akladhi) HO **** KARALUS Luke
    1594, // Clinic and OT Schedule Urology Registrar (No Team) **** PATEL Rajeev
    1595, // Clinic and OT Schedule Urology HO **** FOURIE Gustav
    1344, // Clinic and OT Schedule Vascular Registrar (No Team) **** CHANDRA Abe
    1592, // Clinic and OT Schedule Vascular Holdaway HO **** PUREA Tangi
    1346, // Clinic and OT Schedule ======= Vasudevan HO **** PERRIN Jenni
    1324, // Clinic and OT Schedule Cardiology A (Wade-Devlin-Sebastian-Jogia) Reg **** NIZAR Ahmad N
    1332, // Clinic and OT Schedule ========= A HO **** YOON Tae Young
    1333, // Clinic and OT Schedule ========= A HO **** TUKIA Sione
    1325, // Clinic and OT Schedule Cardiology B (Nunn-Fisher-Menon) Reg **** RAMADAN Mohamed
    1328, // Clinic and OT Schedule ========= B HO **** DOUGLAS Sophie
    1326, // Clinic and OT Schedule Cardiology C (Heald-Stiles-Liew) Reg **** TURAKHIA Nemi (Reg)
    1334, // Clinic and OT Schedule ========= C HO **** LOW Andrew
    1327, // Clinic and OT Schedule Cardiology D (Davis-Nair-Pasupati) Reg **** HAJI HUSSIN Khairunnisa
    1331, // Clinic and OT Schedule ========= D HO **** GANLY Edward
    1330, // Clinic and OT Schedule ========= D HO **** WONG Thomas
    1397, // Clinic and OT Schedule Theatre Schedule Week **** Week 4
    1525, // Clinic and OT Schedule Cardio Thoracic **** PARKINSON Grant
    1524, // Clinic and OT Schedule Cardiology **** PASUPATI Sanjeevan
    1527, // Clinic and OT Schedule General Surgery AM **** VAN DALEN Ralph
    1523, // Clinic and OT Schedule General Surgery PM **** GRUNEWALD Bernd
    1529, // Clinic and OT Schedule MaxFac **** COLQUHOUN Angus
    1530, // Clinic and OT Schedule General Medicine Admitting Code **** 911GO (Gold)
    1531, // Clinic and OT Schedule Endoscopy **** BROOKER Jim
    1532, // Clinic and OT Schedule Rheumatology **** SOLANKI Kamal
    1534, // Clinic and OT Schedule Neurosurgery **** HUSSAIN Zakier
    1535, // Clinic and OT Schedule Obs and Gynae AM **** MAKEPEACE Penelope
    1548, // Clinic and OT Schedule Obs and Gynae PM **** MAKEPEACE Penelope
    1549, // Clinic and OT Schedule Obs and Gynae Night **** MAKEPEACE Penelope
    1536, // Clinic and OT Schedule Oncology: Haematology **** ISLAM Shahidul
    1537, // Clinic and OT Schedule Oncology: Medical **** KUPER Marion
    1538, // Clinic and OT Schedule Oncology: Radiation **** VAN DER VYVER Hermann
    1539, // Clinic and OT Schedule Oncology: Palliative Care **** BONIFANT John
    1540, // Clinic and OT Schedule Ophthalmology **** MERRIMAN Michael
    1541, // Clinic and OT Schedule Orthopaedics AM **** DEVERALL Hamish
    1551, // Clinic and OT Schedule Orthopaedics PM **** DEVERALL Hamish
    1542, // Clinic and OT Schedule Paediatric: Medical **** NEWMAN David
    1543, // Clinic and OT Schedule Paediatric: Surgical **** SAMARAKKODY Udaya
    1544, // Clinic and OT Schedule Plastics **** McEWAN Winston
    1552, // Clinic and OT Schedule Rehabilitation **** FONSEKA Sarath
    1546, // Clinic and OT Schedule Respiratory **** CHANG Cat
    1526, // Clinic and OT Schedule Urology **** LEYLAND John
    1547, // Clinic and OT Schedule Vascular **** FERRAR David
    1554, // Clinic and OT Schedule Endocrinology Reg **** COX Stephanie
    1992, // Clinic and OT Schedule Gastroenterology Registrar **** FULFORTH James
    1968, // Clinic and OT Schedule ========== House Officer **** DHALIWAL Pashwin
    2004, // Clinic and OT Schedule Gen Med AMU.CPU AM Reg **** JENKINS Emily
    2011, // Clinic and OT Schedule Gen Med AMU.CPU PM Reg 1 **** CAMPLING James (Reg)
    2012, // Clinic and OT Schedule Gen Med AMU.CPU PM Reg 2 **** BAKER Anthony
    2010, // Clinic and OT Schedule Gen Med Blue Reg **** LIN Stella
    2003, // Clinic and OT Schedule ======= Blue HO **** ALAIS Khairul
    2002, // Clinic and OT Schedule Gen Med Gold Reg **** WONG Emily (Reg)
    2001, // Clinic and OT Schedule ======= Gold HO **** PANG Lih Jien
    2000, // Clinic and OT Schedule Gen Med Green Reg **** HOPE Renee
    1999, // Clinic and OT Schedule ======= Green HO **** PATEL Prekeesh
    1994, // Clinic and OT Schedule Gen Med Orange Reg **** KAMALAKSHA Sujatha
    1993, // Clinic and OT Schedule ======= Orange HO **** HULME Silvanya
    1998, // Clinic and OT Schedule Gen Med Silver Reg **** AL ARANJI Ghassan
    1997, // Clinic and OT Schedule ======= Silver HO **** ROOME Claire
    1980, // Clinic and OT Schedule Gen Med Red Reg **** HERAN Parvinder A
    2005, // Clinic and OT Schedule ======= Red HO **** SAASAN Amar Deep
    1564, // Clinic and OT Schedule Neurology Wards Reg **** SIU Ronald
    1978, // Clinic and OT Schedule ====== Clinic Reg **** SPARKS Chris (Reg)
    1979, // Clinic and OT Schedule ====== HO **** YEE Kim
    1589, // Clinic and OT Schedule Haematology On Duty Registrar (No Team) **** FERGUSON James
    1565, // Clinic and OT Schedule Medical Oncology Kuper-Nagle Reg **** HARI DASS Prashanth
    1587, // Clinic and OT Schedule ======== Kennedy-Srivastava Reg **** BOON Choon Ean
    1566, // Clinic and OT Schedule ======== Jameison-Link Reg **** VITTA Aditya (Reg)
    1977, // Clinic and OT Schedule Palliative Care Registrar (No Team) **** REID Thomas (Tom)
    1567, // Clinic and OT Schedule Radiation Oncology Hartopeanu-Allen Reg **** NEVE Matthew
    1568, // Clinic and OT Schedule ======== Thotathil-VanDerVyver  Reg **** CHIN John
    1569, // Clinic and OT Schedule ======== DeGroot-Seel-Huang Reg **** JOSEPH Shibu
    1557, // Clinic and OT Schedule Rehab Fowler-OPR2 Reg **** FABUNMI Temitayo
    1826, // Clinic and OT Schedule ===== Fowler-OPR2 HO **** MA Alice
    1559, // Clinic and OT Schedule Rehab Govender-OPR 2 Reg **** YADAVARAJ Satish
    1563, // Clinic and OT Schedule ===== Govender-OPR 2 HO **** YANG Matthew
    1825, // Clinic and OT Schedule Rehab Macindoe-OPR2 Reg **** LEE Jamie
    1561, // Clinic and OT Schedule ===== Macindoe-OPR2 HO **** BANJADE Sagun
    1556, // Clinic and OT Schedule Rehab Fonseka-OPR 3 Reg **** LEE Jamie
    1560, // Clinic and OT Schedule ===== Fonseka-OPR 3 HO **** BANJADE Sagun
    1558, // Clinic and OT Schedule Rehab Kaplan-OPR 4 Reg **** PADALA Deepika
    1562, // Clinic and OT Schedule ===== Kaplan-OPR 4 HO **** KENCH Latitia
    1965, // Clinic and OT Schedule Renal Registrar (No Team) **** ALI Alina
    1586, // Clinic and OT Schedule ===== HO (No Team) **** GREEN Elliott
    1963, // Clinic and OT Schedule ===== HO (No Team) **** DOWNEY Laura
    1981, // Clinic and OT Schedule Respiratory Bhikoo Reg **** FERRY-PARKER Michael
    1967, // Clinic and OT Schedule ====== Bhikoo HO **** ZHOU Su
    1982, // Clinic and OT Schedule Respiratory Chang Reg **** MACKENZIE Monique
    1983, // Clinic and OT Schedule ====== Chang HO **** HE Qiao (Margaret)
    1990, // Clinic and OT Schedule Respiratory Wong Reg **** SALMON Nicola
    1991, // Clinic and OT Schedule ====== Wong HO **** MOH'D KHIR Nurhidayah
    1966, // Clinic and OT Schedule Rheumatology-Diabetes Registrar **** SILVA Cherumi
    1818, // Clinic and OT Schedule ENDO 1 AM - Gastroenterologist **** BROOKER Jim
    1833, // Clinic and OT Schedule ENDO 1 AM - Surgeon **** Not Available
    1832, // Clinic and OT Schedule ENDO 1 PM - Gastroenterologist **** GenSurg
    1834, // Clinic and OT Schedule ENDO 1 PM - Surgeon **** VAN DALEN Ralph
    1829, // Clinic and OT Schedule ENDO 2 AM - Gastroenterologist **** GenSurg
    1835, // Clinic and OT Schedule ENDO 2 AM - Surgeon **** REID Richard
    1831, // Clinic and OT Schedule ENDO 2 PM - Gastroenterologist **** GenSurg
    1836, // Clinic and OT Schedule ENDO 2 PM - Surgeon **** Surgeon
    1830, // Clinic and OT Schedule ENDO 3 AM - Gastroenterologist **** Vacant
    1837, // Clinic and OT Schedule ENDO 3 AM - Surgeon **** Gastroenterology
    1828, // Clinic and OT Schedule ENDO 3 PM - Gastroenterologist **** PHILLIPS Elizabeth
    1838, // Clinic and OT Schedule ENDO 3 PM - Surgeon **** Gastroenterology
    1827, // Clinic and OT Schedule ENDO 4 AM - Gastroenterologist **** GenSurg
    1839, // Clinic and OT Schedule ENDO 4 AM - Surgeon **** GRUNEWALD Bernd
    1819, // Clinic and OT Schedule ENDO 4 PM - Gastroenterologist **** Vacant
    1840, // Clinic and OT Schedule ENDO 4 PM - Surgeon **** Not Available
    1602, // Clinic and OT Schedule MCC - Anaes Endoscopist **** GRUNEWALD Berndt
    1852, // Clinic and OT Schedule ENDO 4 - Anaesthetist **** MARTIN Andrew
    1850, // Clinic and OT Schedule MCC20 - Gynae **** RAMAN Kannan
    1890, // Clinic and OT Schedule MCC20 - Anaesthetist **** HOSKINS  Jeff
    1781, // Clinic and OT Schedule MCC06 - Neurosurgery **** MUTHU Thirayan
    1868, // Clinic and OT Schedule MCC06 - Anaesthetist **** FURLONGER Andrew
    1776, // Clinic and OT Schedule MCC01 - General Surgery **** VAN DALEN Ralph
    1858, // Clinic and OT Schedule MCC01 - Anaesthetist **** O'DONNELL Aidan
    1859, // Clinic and OT Schedule MCC01 - Anaesthetist Reg **** WAAKA Ari
    1730, // Clinic and OT Schedule MCC02  - Vascular **** HAGGART Paul
    1860, // Clinic and OT Schedule MCC02 - Anaesthetist **** HOPGOOD Gary
    1861, // Clinic and OT Schedule MCC02 - Anaesthetist Reg **** SHORT Heather
    1741, // Clinic and OT Schedule MCC03 - Cardiac **** ODOM Nick
    1862, // Clinic and OT Schedule MCC03 - Anaesthetist **** RUDMAN Arthur
    1863, // Clinic and OT Schedule MCC03 - Anaesthetist Reg **** BARR James
    1779, // Clinic and OT Schedule MCC04 - General Surgery **** WU Linus (Shun-Jen)
    1864, // Clinic and OT Schedule MCC04 - Anaesthetist **** SAMARAWEERA Niru
    1865, // Clinic and OT Schedule MCC04 - Anaesthetist Reg **** MCAULIFFE Daniel
    1866, // Clinic and OT Schedule MCC05 - Anaesthetist **** BAILEY Tania
    1750, // Clinic and OT Schedule MCC07 - Orthopaedics **** DEVERALL Hamish
    1870, // Clinic and OT Schedule MCC07 - Anaesthetist **** MERCER Luke
    1751, // Clinic and OT Schedule MCC08 - Orthopaedics **** STRICK Neville
    1872, // Clinic and OT Schedule MCC08 - Anaesthetist **** SIKIOTIS Lucas
    1873, // Clinic and OT Schedule MCC08 - Anaesthetist Reg **** DAVIES Simon
    1874, // Clinic and OT Schedule MCC09 - Anaesthetist **** EBERT Rob
    1748, // Clinic and OT Schedule MCC10 - Orthopaedics **** DONOVAN Jason
    1876, // Clinic and OT Schedule MCC10 - Anaesthetist **** CLARK James
    1878, // Clinic and OT Schedule MCC11 - Anaesthetist **** No Staff
    1752, // Clinic and OT Schedule MCC12 - Orthopaedics **** Neurosurgery
    1753, // Clinic and OT Schedule MCC14 - Ophthalmology **** WORSLEY David
    1882, // Clinic and OT Schedule MCC14 - Anaesthetist **** DICK Mike
    1883, // Clinic and OT Schedule MCC14 - Anaesthetist Reg **** FUNG Daniel 
    1754, // Clinic and OT Schedule MCC15 - Ophthalmology **** PATIL Bheema
    1884, // Clinic and OT Schedule MCC15 - Anaesthetist **** locals
    1775, // Clinic and OT Schedule MCC16 - ENT **** Registrar List
    1886, // Clinic and OT Schedule MCC16 - Anaesthetist **** WATSON Tom
    1887, // Clinic and OT Schedule MCC16 - Anaesthetist Reg **** ENGLISH Duane
    1906, // Clinic and OT Schedule MCC17 - ENT **** GREGOR Theo
    1888, // Clinic and OT Schedule MCC17 - Anaesthetist **** ENGELBRECHT Conrad
    1889, // Clinic and OT Schedule MCC17 - Anaesthetist Reg **** EADDY Nick
    1771, // Clinic and OT Schedule MCC21 - Plastics **** McEWAN Winston
    1892, // Clinic and OT Schedule MCC21 - Anaesthetist **** GOODEY Alan
    1893, // Clinic and OT Schedule MCC21 - Anaesthetist Reg **** NAIR Renesh
    1905, // Clinic and OT Schedule MCC22 - MaxFac **** EVANS Steve
    1894, // Clinic and OT Schedule MCC22 - Anaesthetist **** RENEW Richard
    1797, // Clinic and OT Schedule MCC23 - Urology **** LEYLAND John
    1896, // Clinic and OT Schedule MCC23 - Anaesthetist **** KEEL Stephanie
    1897, // Clinic and OT Schedule MCC23 - Anaesthetist Reg **** BROWN Duncan
    1898, // Clinic and OT Schedule MCC24 - Anaesthetist **** POLLARD Amy
    1799, // Clinic and OT Schedule MCC25 - General Surgery **** Registrar List
    1900, // Clinic and OT Schedule MCC25 - Anaesthetist **** TSE Chris
    1804, // Clinic and OT Schedule CATH LAB 01 AM **** NOCVR
    1806, // Clinic and OT Schedule CATH LAB 02 AM **** DEVLIN Gerry
    1807, // Clinic and OT Schedule CATH LAB 02 PM **** DEVLIN Gerry
    1847, // Clinic and OT Schedule CATH LAB 04 AM **** WADE Clyde
    1848, // Clinic and OT Schedule CATH LAB 04 PM **** WADE Clyde
    1914, // Clinic and OT Schedule Womens Health AM - Anaesthetist **** NAYAR Krish
    1917, // Clinic and OT Schedule Womens Health AM - Anaesthetist Reg **** CARDINAL Alex
    1916, // Clinic and OT Schedule Womens Health PM - Anaesthetist **** NAYAR Krish
    1918, // Clinic and OT Schedule Womens Health PM - Anaesthetist Reg **** CARDINAL Alex
    1919, // Clinic and OT Schedule Inpatient Pain - Nurse **** KING S
    1920, // Clinic and OT Schedule Inpatient Pain AM - Anaesthetist **** BARNARD John
    1921, // Clinic and OT Schedule Inpatient Pain PM - Anaesthetist **** BARNARD John
    1924, // Clinic and OT Schedule ECT-Preadmission AM - Anaesthetist **** CROWTHER Alan
    1926, // Clinic and OT Schedule ECT-Preadmission AM - Anaesthetist Reg **** MOHAMED Nik
    1925, // Clinic and OT Schedule ECT-Preadmission PM - Anaesthetist **** CROWTHER Alan
    1927, // Clinic and OT Schedule ECT-Preadmission PM - Anaesthetist Reg **** MOHAMED Nik
    1915, // Clinic and OT Schedule Oncology-Radiology Services **** ONCOLOGY
    1911, // Clinic and OT Schedule Interventional Radiologist PM **** SWARBRICK Michael
    1934, // Clinic and OT Schedule Interventional Radiologist PM **** SWARBRICK Michael
    1929, // Clinic and OT Schedule Interventional Radiologist PM - Vascular **** FERRAR David
    1944, // Clinic and OT Schedule Thames Theatre 2 AM - Anaesthetist **** O'ROURKE Tom
    1946, // Clinic and OT Schedule Thames Theatre 2 PM - Anaesthetist **** O'ROURKE Tom
    1822, // Oncology On Call: Haematology IP Team - Consultant **** GOODMAN Hugh
    1300, // Oncology On Call: Haematology - Consultant **** ISLAM Shahidul
    1301, // Oncology On Call: Medical Oncology - Consultant **** KUPER Marion
    1303, // Oncology On Call: Radiation Oncology - Consultant **** VAN DER VYVER Hermann
    1302, // Oncology On Call: Palliative Care - Consultant **** BROWN Stuart
    1467, // Oncology On Call: Palliative Care - Consultant **** BONIFANT John
    1330, // Oncology Haem Thames Clinic - Cons **** GOODMAN Hugh
    1331, // Oncology Haem Thames Clinic - Reg **** FERGUSON James
    1448, // Oncology Clinic Haem JAB (PM) **** BELL Julie-Anne
    1445, // Oncology Clinic Haem NG (PM) **** GAVRILOVA Natalia
    1606, // Oncology MedOnc Gisborne Clinic - Cons **** SRIVASTAVA Archana
    1605, // Oncology MedOnc Gisborne Clinic - Cons-Reg **** JAMESON Michael
    1603, // Oncology RadOnc Gisborne Clinic - Consultant **** THOTATHIL Ziad
    1604, // Oncology RadOnc Gisborne Clinic - Consultant **** HUANG Roger
    1755, // Oncology Clinical-Non Clinical Admin Haem JAB (AM) **** BELL Julie-Anne
    1756, // Oncology Clinical-Non Clinical Admin Haem SI (AM) **** ISLAM Shahidul
    1759, // Oncology Clinical-Non Clinical Admin Haem SI (PM) **** ISLAM Shahidul
    1757, // Oncology Clinical-Non Clinical Admin Haem NG (AM) **** GAVRILOVA Natalia
    1608, // Oncology Waikato Hospital - Laboratory Haematologist **** MOORE Helen
    1573, // Oncology Referral Centre Triage Only: Consultant **** ISLAM Shahidul
    1399, // Oncology Haematology Clinics - Reg **** RUKA Myra
    1543, // Oncology Haematology Wards - Reg **** AYE Myat Moe
    1722, // Oncology Clinic Med Onc IK (AM) **** KENNEDY Ian
    1728, // Oncology Clinic Med Onc IK (PM) **** KENNEDY Ian
    1724, // Oncology Clinic Med Onc MK (AM) **** KUPER Marion
    1730, // Oncology Clinic Med Onc MK (PM) **** KUPER Marion
    1726, // Oncology Clinic Med Onc LN (AM) **** NAGLE Lawrence
    1732, // Oncology Clinic Med Onc LN (PM) **** NAGLE Lawrence
    1727, // Oncology Clinic Med Onc EE (AM) **** EPNER Elliot
    1733, // Oncology Clinic Med Onc EE (PM) **** EPNER Elliot
    1769, // Oncology Clinic Med Onc AT (AM) **** TAN Alvin
    1770, // Oncology Clinic Med Onc AT (PM) **** TAN Alvin
    1695, // Oncology Theatre Radiation Oncology HVdV (AM) **** VAN DER VYVER Hermann
    1697, // Oncology Theatre Radiation Oncology ZT (AM) **** THOTATHIL Ziad
    1699, // Oncology Clinic Radiation Oncology CH (PM) **** HARTOPEANU Cristian
    1705, // Oncology Clinic Radiation Oncology HVdV (PM) **** VAN DER VYVER Hermann
    1702, // Oncology Clinic Radiation Oncology CD (AM) **** DE GROOT Charles
    1706, // Oncology Clinic Radiation Oncology ZT (PM) **** Cancel
    1704, // Oncology Clinic Radiation Oncology AA (AM) **** Cancel
    1708, // Oncology Clinic Radiation Oncology AA (PM) **** Cancel
    1711, // Oncology Clinical-Non Clinical Admin CH Rad Onc (AM) **** HARTOPEANU Cristian
    1717, // Oncology Clinical-Non Clinical Admin CDG Rad Onc (PM) **** DE GROOT Charles
    1715, // Oncology Clinical-Non Clinical Admin MS Rad Onc (AM) **** SEEL Matthew
    1719, // Oncology Clinical-Non Clinical Admin MS Rad Onc (PM) **** SEEL Matthew
    1818, // Oncology Clinic - Palliative Care (SB) **** BROWN Stuart
    1536, // General Surgery On Call **** VAN DALEN Ralph
    1085, // General Surgery On Call **** GRUNEWALD Bernd
    1470, // General Surgery Schedule Week **** Week 4
    1508, // General Surgery CLN SOP 1 AM - Consultant **** FRENCH Rowan
    1523, // General Surgery CLN BCC AM - Specialist **** SPELLMAN Louise
    1665, // General Surgery CLN BCC AM - Specialist **** GILBERT Linda
    1517, // General Surgery CLN BCC PM - Specialist **** SPELLMAN Louise
    1666, // General Surgery CLN BCC PM - Specialist **** GILBERT Linda
    1560, // General Surgery Admin-NonClinical AM **** VAN DALEN Ralph
    1549, // General Surgery Admin-NonClinical PM **** CREIGHTON Jane
    1561, // General Surgery Admin-NonClinical PM **** CHRISTEY Grant
    1564, // General Surgery Admin-NonClinical PM **** REID Richard
    1568, // General Surgery Admin-NonClinical PM **** GRUNEWALD Bernd
    1557, // General Surgery Trauma Ward Round AM **** CHRISTEY Grant
    1646, // General Surgery MCC25 - Surgeon **** Registrar List
    1754, // General Surgery MCC11 - Surgeon **** Acutes
    1650, // General Surgery MCC01 - Surgeon **** VAN DALEN Ralph
    1652, // General Surgery MCC04 - Surgeon **** WU Linus (Shun-Jen)
    1707, // General Surgery MCC ENDO 01 AM - Surgeon **** Not Available
    1708, // General Surgery MCC ENDO 01 PM - Surgeon **** VAN DALEN Ralph
    1709, // General Surgery MCC ENDO 02 AM - Surgeon **** REID Richard
    1710, // General Surgery MCC ENDO 02 PM - Surgeon **** Surgeon
    1711, // General Surgery MCC ENDO 03 AM - Surgeon **** Gastroenterology
    1712, // General Surgery MCC ENDO 03 PM - Surgeon **** Gastroenterology
    1713, // General Surgery MCC ENDO 04 AM - Surgeon **** GRUNEWALD Bernd
    1714, // General Surgery MCC ENDO 04 PM - Surgeon **** Not Available
    1659, // Emergency Department Roster Week **** Week 16
    1756, // Emergency Department AM EPIC **** HARVEY Martyn
    1753, // Emergency Department AM 1 - EP Triage **** COHEN Tiffany
    1952, // Emergency Department AM 1 - EP Resus **** NIENABER Anna
    1724, // Emergency Department Resus (RR) AM **** ONG Boon
    1725, // Emergency Department Kids Emerg (KE) AM **** CAMPBELL Stuart
    1729, // Emergency Department Assessment AM **** FUNAKI Penisimani
    1735, // Emergency Department Resus (R2) AM **** MURRAY Aidan
    1823, // Emergency Department AM **** LUCKIE Rachel
    1838, // Emergency Department WBA AM **** MURRAY Aidan
    1831, // Emergency Department Midday **** QWAH Kai 
    1726, // Emergency Department Kids Emerg (KE) PM **** LAWN Hannah
    1730, // Emergency Department Assessment PM **** QUATRE Salma
    1830, // Emergency Department PM **** LAM Sharon
    2014, // Emergency Department WBA PM **** LAWN Hannah
    1757, // Emergency Department PM EPIC **** MARTIN Ian
    1907, // Emergency Department PM - EP Triage **** TAN Wei
    1964, // Emergency Department PM - EP Resus **** BRABYN Christine
    1739, // Emergency Department Evening **** PHILLIPS Jonathan
    1886, // Emergency Department Evening (RR) **** KABALA Katherine
    1741, // Emergency Department Night - Registrar **** BAIN Graeme
    1742, // Emergency Department Night - Registrar **** GONISZEWSKI Mark
    1743, // Emergency Department Night - Registrar **** ROLTON Nikki
    1816, // Emergency Department Other **** SAFIH Shameen
    920, // Rehabilitation On Call - Consultant **** FONSEKA Sarath
    884, // Rehabilitation Ward AM **** FONSEKA Sarath
    1058, // Rehabilitation Ward AM **** FOWLER Sarah
    1057, // Rehabilitation Ward AM **** GOVENDER Siva
    1056, // Rehabilitation Ward AM **** MACINDOE Simone
    886, // Rehabilitation Ward PM **** GOVENDER Siva
    1059, // Rehabilitation Ward PM **** KAPLAN Michael
    888, // Rehabilitation Admin-Non Clinical AM **** KAPLAN Michael
    1148, // Rehabilitation Admin-Non Clinical AM **** SAMAD Sha
    889, // Rehabilitation Admin-Non Clinical PM **** FONSEKA Sarath
    893, // Rehabilitation Admin-Non Clinical PM **** FOWLER Sarah
    1091, // Rehabilitation Admin-Non Clinical PM **** MACINDOE Simone
    1149, // Rehabilitation Admin-Non Clinical PM **** SAMAD Sha
    929, // ENT Schedule Week **** Week 4
    1508, // ENT ENT Consultant on call **** CLARKSON John
    984, // ENT CLN [A] AM - Reg **** BATES Jeremy
    1557, // ENT CLN [B] AM - Reg **** ROYAN Amal
    986, // ENT CLN [A] PM - Reg **** BATES Jeremy
    996, // ENT CLN [ACUTES] PM - Reg **** ROYAN Amal
    1002, // ENT CLN Thames - Surgeon **** To Be Advised
    1023, // ENT CLN Te Kuiti - Surgeon **** WHITE Julian
    1527, // ENT MCC16 - Surgeon **** Registrar List
    1532, // ENT MCC16 - Registrar **** DULKU Kiren
    1569, // ENT MCC17 - Surgeon **** GREGOR Theo
    1570, // ENT MCC14-Surgeon **** CHAN Benjimen
    1036, // Ophthalmology On Call -Surgeon **** MERRIMAN Michael
    1555, // Ophthalmology CLN [A] AM - Consultant **** Cancel
    1581, // Ophthalmology CLN [C] AM - Consultant **** NG Stephen
    1582, // Ophthalmology CLN [C] AM - Registrar **** BHIKOO Riyaz
    1155, // Ophthalmology CLN [D] AM - Consultant **** DICKSON John
    1583, // Ophthalmology CLN [D] AM - Registrar **** No Reg
    1520, // Ophthalmology CLN Laser AM - Registrar **** YAP Joel
    1667, // Ophthalmology CLN AM - Optom-S.Bruder **** BRUDER Susanne
    1586, // Ophthalmology CLN [C] PM - Consultant **** HOY Ben
    1587, // Ophthalmology CLN [C] PM - Registrar **** YAP Joel
    1584, // Ophthalmology CLN [D] PM - Consultant **** MERRIMAN Michael
    1588, // Ophthalmology CLN [D] PM - Registrar **** No Reg
    1595, // Ophthalmology CLN [D] PM - Registrar **** VOON Shong Min
    1176, // Ophthalmology CLN Acutes AM - Registrar **** VOON Shong Min
    1171, // Ophthalmology CLN Acutes PM - Registrar **** LEE In Jung
    1289, // Ophthalmology Admin AM **** GUEST Stephen
    1496, // Ophthalmology Admin AM **** MURPHY Chris
    1633, // Ophthalmology Admin PM **** WORSLEY David
    1475, // Ophthalmology Schedule Week **** Week 4
    1571, // Ophthalmology MCC14 - Surgeon **** WORSLEY David
    1572, // Ophthalmology MCC14 AM - Registrar **** CUNNINGHAM William
    1635, // Ophthalmology MCC14 PM - Registrar **** CUNNINGHAM William
    1573, // Ophthalmology MCC15 - Surgeon **** PATIL Bheema
    1574, // Ophthalmology MCC15 AM - Registrar **** LEE In Jung
    1623, // Ophthalmology MCC15 PM - Registrar **** BHIKOO Riyaz
    1596, // Orthopaedics On Call: Ward - Surgeon **** DEVERALL Hamish
    1435, // Orthopaedics CLN A AM - Consultant **** WOTHERSPOON Paul
    1439, // Orthopaedics CLN A PM - Consultant **** WOTHERSPOON Paul
    1436, // Orthopaedics CLN B AM - Consultant **** CHOY Godwin
    1440, // Orthopaedics CLN B PM - Consultant **** WILLOUGHBY Richard
    1587, // Orthopaedics CLN C AM **** Fracture
    1598, // Orthopaedics CLN LFC AM - Consultant **** COWLEY Grant
    1470, // Orthopaedics Schedule Week **** Week 4
    1515, // Orthopaedics Ward Round AM **** HARDY Stewart
    1688, // Orthopaedics Ward Round AM **** HONG Thin
    1687, // Orthopaedics Ward Round AM **** KETTIDATHIL Vinu
    1574, // Orthopaedics MCC07 **** DEVERALL Hamish
    1647, // Orthopaedics MCC07 - Reg **** HOGAN Yeung
    1576, // Orthopaedics MCC10 **** DONOVAN Jason
    1580, // Orthopaedics MCC12 **** Neurosurgery
    1646, // Orthopaedics MCC12 - Reg **** TRAVIS Elizabeth
    1582, // Orthopaedics MCC08 **** STRICK Neville
    1546, // *ICU ICU - Consultant **** LO Stephen
    1601, // *ICU HDU - Consultant **** HOWARD Grant
    1602, // *ICU CTU - Consultant **** MARTYNOGA Robert
    1547, // *ICU On Call - Consultant **** MARTYNOGA Robert
    1840, // *ICU Main Unit Reg SD **** LIAO Leo
    1625, // *ICU Main Unit Reg LD **** OWEN Adrian
    1841, // *ICU Cardiothoracic Reg AM **** JUNGE Andrea
    1842, // *ICU Cardiothoracic Reg PM **** O'BRIEN Tim
    1850, // *ICU Night - Main **** NOONAN Tom
    1851, // *ICU Night - Cardiac **** HULME Katherine
    1770, // *ICU SHO - ICU - AM **** LIM Calvin (S)
    1839, // *ICU SHO - HDU PM **** WONG Qi
    1843, // *ICU Transport cover **** LINYAMA Joseph
    1844, // *ICU Reliever 1 **** COBBETT Joanne
    1092, // Maxillo-Facial and Oral On Call - Surgeon **** COLQUHOUN Angus
    1542, // Maxillo-Facial and Oral Schedule Week **** Week 4
    1650, // Maxillo-Facial and Oral MCC22 - Surgeon **** EVANS Steve
    1104, // Neurosurgery On Duty - Surgeon **** HUSSAIN Zakier
    1106, // Neurosurgery On Call - Surgeon **** HUSSAIN Zakier
    1250, // Neurosurgery CLN AM - Registrar **** WONG Waikeat (Justin)
    1251, // Neurosurgery CLN PM - Registrar **** WONG Waikeat (Justin)
    1244, // Neurosurgery Ward-Study - Registrar **** HEANEY Jonathon
    1470, // Neurosurgery Schedule Week **** Week 4
    1578, // Neurosurgery Ward AM **** GAN Peter
    1653, // Neurosurgery Clinical-Non Clinical Admin AM **** HUSSAIN Zakier
    1654, // Neurosurgery Clinical-Non Clinical Admin PM **** HUSSAIN Zakier
    1656, // Neurosurgery Clinical Admin PM **** GAN Peter
    1621, // Neurosurgery MCC06 - Surgeon **** MUTHU Thirayan
    1623, // Neurosurgery MCC06 - Registrar **** RAKASZ Lucas 
    1671, // Neurosurgery MCC12 - Surgeon **** HUSSAIN Zakier
    1142, // Plastics On Call - Surgeon **** McEWAN Winston
    1369, // Plastics CLN Plastics OPD AM - Consultant **** ALKADHI Ahmed
    1657, // Plastics CLN Plastics OPD AM - Reg **** AHMED Zeeshan
    1372, // Plastics CLN Plastics OPD AM - Reg **** MAGOYE Theresa
    1370, // Plastics CLN Plastics Lesion PM - Consultant **** ALKADHI Ahmed
    1371, // Plastics CLN Plastics Trauma PM - Reg **** AHMED Zeeshan
    1373, // Plastics CLN Plastics Trauma PM - Reg **** MAGOYE Theresa
    1588, // Plastics MCCPROC14AM **** TAIB Mujeeb
    1382, // Plastics MCCPROC14PM **** TAIB Mujeeb
    1597, // Plastics Theatre Week **** Week 4
    1616, // Plastics MCC21 - Surgeon **** McEWAN Winston
    1618, // Plastics MCC21 - Registrar 1 **** SAVAGE Jessica
    1660, // Plastics MCC21 - Registrar 1 **** EMANUEL Henry
    1708, // Plastics MCC24 - Plastic acutes Registrar **** SANDERS Andrew
    1641, // Plastics MCCPROC14 - Surgeon **** YANG Arthur
    876, // Urology On Call - Consultant **** LEYLAND John
    1470, // Urology Schedule Week **** Week 4
    1564, // Urology MCC23 -Surgeon **** LEYLAND John
    671, // Respiratory On Call - Consultant **** CHANG Cat
    1086, // Respiratory GenMed AM **** KHAN Asad
    991, // Respiratory Ward Round AM **** WONG Janice
    992, // Respiratory Ward Round AM **** CHANG Cat
    1017, // Respiratory Respiratory CLN PM **** KARALUS Noel
    1013, // Respiratory Sleep Lab PM **** CHANG Cat
    1022, // Respiratory Admin-Non Clinical PM **** WONG Janice
    1023, // Respiratory Admin-Non Clinical PM **** KHAN Asad
    1562, // Z Hospital Management Duty Chaplain **** SLIGO B
    1560, // Z Hospital Management Catholic Priest **** BOYCE G Fr
    1573, // Z Hospital Management Bed Manager **** Bed Manager
    1709, // Z Hospital Management IHT Coordinator **** IHT
    1574, // Z Hospital Management Duty Manager **** Duty Manager
    1575, // Z Hospital Management Nurse Manager **** LABASCHAGNE Deborah
    1576, // Z Hospital Management Hospital Manager **** DEANE Jo-Anne
    1265, // Dermatology CLN Minor Ops AM - Consultant **** YUNG Anthony
    1615, // Dermatology CLN Minor Ops AM Reg **** HARVEY Georgina
    1186, // Dermatology CLN 1 PM - Consultant **** YUNG Anthony
    1470, // Z IOC Test RMO Test Staff Linking **** BURROWS Thomas
    1370, // Thames On Call  - DAY Anaesthetist **** O'ROURKE Tom
    1659, // Thames On Call - NIGHT Anaesthetist **** O'ROURKE Tom
    1650, // Thames On Call  - DAY Anaesthetist **** O'ROURKE Tom
    1444, // Thames On Call  DAY - Surgeon **** CREAMER Gowan
    1297, // Thames On Call  - Surgeon **** CREAMER Gowan
    1445, // Thames Admitting - Physician **** AL-MUDALLAL Daud
    1295, // Thames On Call  - Physician **** AL-MUDALLAL Daud
    1397, // Thames Gen Surg Clinic PM **** MUELLER Andrea
    1399, // Thames Gen Med Clinic PM **** McCLAIN Erik
    1422, // Thames ENT Clinic  - Surg **** To Be Advised
    1426, // Thames Obs&Gynae Clinic - Consultant **** DUDLEY Narena
    1427, // Thames Obs&Gynae Clinic - Reg **** HANNA Adelle
    1429, // Thames Haem Clinic  -Consultant **** GOODMAN Hugh
    1428, // Thames Haem Clinic  -Reg **** FERGUSON James
    1344, // Thames ED - Rural Reg **** MORGAN Kirsty
    1311, // Thames ED AM- Med-Spec **** KERR Mike
    1272, // Thames ED MIDDLE - Med-Spec **** DAS Dilip
    1273, // Thames ED PM -Med-Spec **** STIRLING William
    1274, // Thames ED Night - Med-Spec **** KANAN Faiz
    1463, // Thames Clnical Admin PM Phys **** AL-MUDALLAL Daud
    1580, // Thames Clinical Admin PM Phys **** BABAR Nabila
    1303, // Thames IPU AM SHO Medical **** McMANUS Eileen
    1316, // Thames IPU AM SHO Medical **** LIU Shaochen
    1317, // Thames IPU AM SHO Surgical **** ELLIS Verity
    1634, // Thames IPU AM - Physician **** AL-MUDALLAL Daud
    1404, // Thames IPU AM - Physician **** McCLAIN Erik
    1405, // Thames IPU AM - Physician **** BABAR Nabila
    1451, // Thames IPU AM - Surgeon **** MUELLER Andrea
    1609, // Thames Thames Theatre 1 WKT-Gynae- Surgeon **** DUDLEY Narena
    1562, // Thames Theatre Week **** Week 4
    1662, // Thames Theatre 2 AM - Surgeon **** CREAMER Gowan
    1565, // Thames Theatre 2 AM - Anaesthetist **** O'ROURKE Tom
    1663, // Thames Theatre 2 PM - Surgeon **** CREAMER Gowan
    1568, // Thames Theatre 2 PM - Anaesthetist **** O'ROURKE Tom
    1320, // Thames Rural registrar **** MORGAN Kirsty
    1381, // Thames Schedule week **** Week 1
    1529, // Radiology Non Clinical-Admin PM **** ZAMAN Zubayr
    1533, // Radiology Non Clinical-Admin PM **** AU YONG Kong
    1534, // Radiology Non Clinical-Admin PM **** KARATASIOU A
    1535, // Radiology Non Clinical-Admin PM **** LANKA Bina
    1546, // Radiology Non Clinical-Admin PM **** MUTHU Sabaratnam
    1230, // Radiology Duty Radiologists **** COLTMAN Glenn
    1590, // Radiology Duty Registrar **** SIMCOX Kim
    1326, // Radiology BCC AM - Radiologist **** KARATASIOU A
    1331, // Radiology Plain Films AM **** GILBERT Kevin
    1337, // Radiology Plain Films AM **** MEHRAIN Sheida
    1380, // Radiology Plain Films AM **** MUTHU Sabaratnam
    1332, // Radiology Plain Films PM **** NG Jian
    1340, // Radiology Plain Films PM **** NI MHUINEACHAIN Aideen
    1375, // Radiology Lunch Cover 12 - Registrar **** SIMCOX Kim
    1376, // Radiology Lunch Cover 12.30 - Registrar **** LIN Lydia
    1469, // Radiology Specials AM - Registrar **** LIN Lydia
    1346, // Radiology Interventional PM - Radiologist **** SWARBRICK Michael
    1348, // Radiology FNA'S  AM - Radiologist **** NI MHUINEACHAIN Aideen
    1521, // Radiology FNA'S  AM - Registrar **** NG Jian
    1351, // Radiology Ultrasound Rpt AM - Radiologist **** SWARBRICK Michael
    1352, // Radiology Ultrasound Rpt PM - Radiologist **** MEHRAIN Sheida
    1361, // Radiology CT Rpt  AM - Radiologist **** BLAIR Damon
    1363, // Radiology CT Rpt  AM - Radiologist **** LANKA Laxmi
    1584, // Radiology CT Rpt  AM - Radiologist - Registrar **** ZAMAN Zubayr
    1362, // Radiology CT Rpt  PM - Radiologist **** COLTMAN Glenn
    1435, // Radiology CT Rpt  PM - Registrar **** LIN Lydia
    1364, // Radiology CT Rpt  PM - Radiologist **** MELLSOP Nick
    1576, // Radiology Lomas MRI AM  - Radiologist **** LANKA Bina
    1578, // Radiology Lomas MRI PM  - Radiologist **** LANKA Laxmi
    1582, // Radiology Meade MRI PM  - Radiologist **** BLAIR Damon
    1428, // Radiology On Call Radiologist **** FARR Alistair
    1379, // Radiology On Duty PM - Registrar **** NG Jian
    1465, // Radiology On Call Night - Registrar **** FORD Christopher
    1421, // Radiology Melaneoma Conference **** Cancel
    1507, // Radiology Opthalmology Conference **** Cancel
    1390, // Radiology Ortho Conference **** GILBERT Kevin
    1388, // Radiology Neuro Conference **** MELLSOP Nick
    1389, // Radiology ITU Conference **** MELLSOP Nick
    1400, // Radiology NBU Conference **** AU YONG Kong
    1396, // Radiology Paed-Med-Surg Conference **** AU YONG Kong
    1401, // Radiology Rheum Conference **** GILBERT Kevin
    1397, // Radiology Renal Conference **** MELLSOP Nick
    1497, // Radiology CT Colon Reg **** SIMCOX Kim
    1363, // Tokoroa Schedule Week **** Week 4
    1409, // Tokoroa Non Clinical 2 **** SAFIH Shameen
];
