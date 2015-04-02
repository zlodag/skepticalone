<?php
$blacklist = [
    [748,42], // Cardio Thoracic On Call - Surgeon **** LIN Zaw
    [748,37], // Cardiology On Call - Cardiologist **** PASUPATI Sanjeevan
    [777,38], // Cardiology Waikato PAMI Cover **** PASUPATI Sanjeevan
    [769,40], // Cardiology CPU PM - Cardiologist **** PASUPATI Sanjeevan
    [929,42], // ENT Schedule Week **** Week 4
    [1508,43], // ENT ENT Consultant on call **** GREGOR Theo
    [1536,58], // General Surgery On Call **** CHRISTEY Grant
    [1470,77], // General Surgery Schedule Week **** Week 4
    [1092,40], // Maxillo-Facial and Oral On Call - Surgeon **** Rakesh Jattan
    [1542,80], // Maxillo-Facial and Oral Schedule Week **** Week 4
    [709,52], // Medicine Admitting Code **** 911OR (Orange)
    [612,53], // Medicine On Call - Cons **** GRAY Erana
    [725,58], // Medicine CPU On Call - Cons **** PASUPATI Sanjeevan
    [639,68], // Medicine On Call Team - Cons **** Orange
    [683,84], // Medicine On Call - Specialist **** SOLANKI Kamal
    [697,88], // Medicine Endoscopy On Call - Cons **** DICKSON Graeme
    [1732,48], // Mental Health Call Consultant Night 1 **** DEY Sangeeta
    [840,42], // Neurology On Call: Neurologist **** GRENHOLM Peter 
    [1106,42], // Neurosurgery On Call - Surgeon **** HUSSAIN Zakier
    [1470,68], // Neurosurgery Schedule Week **** Week 4
    [1155,51], // Obs and Gynae Admitting Consultant **** SINGH VP
    [500,59], // Obs and Gynae On Call: Night - Consultant **** SINGH VP
    [543,391], // Obs and Gynae Schedule Week **** Week 4
    [1300,52], // Oncology On Call: Haematology - Consultant **** GOODMAN Hugh
    [1301,56], // Oncology On Call: Medical Oncology - Consultant **** KUPER Marion
    [1303,59], // Oncology On Call: Radiation Oncology - Consultant **** VAN DER VYVER Hermann
    [1467,66], // Oncology On Call: Palliative Care - Consultant **** BROWN Stuart
    [1036,36], // Ophthalmology On Call -Surgeon **** HOY Ben
    [1475,126], // Ophthalmology Schedule Week **** Week 4
    [1596,48], // Orthopaedics On Call: Ward - Surgeon **** MCCHESNEY Steve
    [1470,109], // Orthopaedics Schedule Week **** Week 4
    [1076,64], // Paediatrics Theatre Week **** Week 4
    [959,72], // Paediatrics On Call: After-hours Paediatric SMO **** McCAY Hamish
    [1247,73], // Paediatrics Admitting Paediatric SMO **** McCAY Hamish
    [994,179], // Paediatrics On Call: Paediatric Surgeon **** SAMARAKKODY Udaya
    [1025,186], // Paediatrics Reg Roster Week **** Week 4
    [1077,187], // Paediatrics SHO Roster Week **** Week 6
    [1101,248], // Paediatrics NICU: L3 PM - Consultant **** NAIR Arun
    [1112,254], // Paediatrics NICU: L2 PM - Consultant **** NAIR Arun
    [1142,43], // Plastics On Call - Surgeon **** YAPRAK Bulent
    [1597,109], // Plastics Theatre Week **** Week 4
    [920,49], // Rehabilitation On Call - Consultant **** MACINDOE Simone
    [833,38], // Renal On Call - PM **** TAN Eddie
    [671,38], // Respiratory On Call - Consultant **** BHIKOO Zaheer
    [876,39], // Urology On Call - Consultant **** LEYLAND John
    [1470,81], // Urology Schedule Week **** Week 4
    [748,42], // Vascular On Call - Vascular Surgeon **** HAGGART Paul
    [905,97], // Vascular Schedule Week **** Week 4
    [1562,30], // Z Hospital Management Duty Chaplain **** SITARAM D
    [1560,34], // Z Hospital Management Catholic Priest **** BOYCE G Fr
    [1573,50], // Z Hospital Management Bed Manager **** Bed Manager
    [1709,51], // Z Hospital Management IHT Coordinator **** IHT
    [1574,52], // Z Hospital Management Duty Manager **** Duty Manager
    [1575,53], // Z Hospital Management Nurse Manager **** LABASCHAGNE Deborah
    [1576,54], // Z Hospital Management Hospital Manager **** DEANE Jo-Anne
    [752,52], // Cardiology CLN AM - Cardiology **** SWAMPILLAI Janice
    [762,55], // Cardiology CLN PM - Cardiology **** REGLIST
    [764,56], // Cardiology CLN PM - Cardiology **** WADE Clyde
    [763,57], // Cardiology CLN PM - Cardiology **** LIEW Tse Vun
    [754,62], // Cardiology Cath Lab 1 AM **** NAIR Rajesh
    [761,63], // Cardiology Cath Lab 1 PM **** NAIR Rajesh
    [759,64], // Cardiology Cath Lab 2 AM **** LIEW Tse Vun
    [760,65], // Cardiology Cath Lab 2 PM **** SEBASTIAN Cherian
    [887,68], // Cardiology Cath Lab 4 AM **** BODDINGTON Dean
    [888,69], // Cardiology Cath Lab 4 PM **** BODDINGTON Dean
    [834,101], // Cardiology Admin-Non Clinical AM **** CHARLESON Hamish
    [910,102], // Cardiology Admin-Non Clinical AM **** DAVIS Mark
    [908,106], // Cardiology Admin-Non Clinical AM **** JOGIA Pranesh
    [915,108], // Cardiology Admin-Non Clinical AM **** MENON Madhav
    [921,111], // Cardiology Admin-Non Clinical AM **** PASUPATI Sanjeevan
    [922,112], // Cardiology Admin-Non Clinical AM **** SEBASTIAN Cherian
    [923,113], // Cardiology Admin-Non Clinical AM **** STILES Martin
    [925,115], // Cardiology Admin-Non Clinical AM **** WADE Clyde
    [905,119], // Cardiology Admin-Non Clinical PM **** DAVIS Mark
    [909,122], // Cardiology Admin-Non Clinical PM **** HEALD Spencer
    [913,123], // Cardiology Admin-Non Clinical PM **** JOGIA Pranesh
    [916,125], // Cardiology Admin-Non Clinical PM **** MENON Madhav
    [927,128], // Cardiology Admin-Non Clinical PM **** PASUPATI Sanjeevan
    [929,130], // Cardiology Admin-Non Clinical PM **** STILES Martin
    [928,131], // Cardiology Admin-Non Clinical PM **** SWAMPILLAI Janice
    [1648,36], // Dermatology CLN Paeds 1 AM **** HILL Sarah
    [1204,40], // Dermatology CLN Paeds 1 PM - Consultant **** YUNG Anthony
    [1571,44], // Dermatology CLN Paeds 2 PM - Registrar **** HARVEY Georgina
    [1201,45], // Dermatology CLN Paeds 2 PM **** HILL Sarah
    [1615,51], // Dermatology CLN Minor Ops AM Reg **** HARVEY Georgina
    [1184,53], // Dermatology CLN 1 AM **** RADEMAKER Marius
    [1657,54], // Dermatology CLN 1 AM **** HA Tom
    [1203,55], // Dermatology CLN 2 AM **** YUNG Anthony
    [983,55], // ENT CLN [A] AM - Surgeon **** To Be Advised
    [984,56], // ENT CLN [A] AM - Reg **** BATES Jeremy
    [987,60], // ENT CLN [ACUTES] AM - Reg **** ROYAN Amal
    [985,64], // ENT CLN [A] PM - Surgeon **** WHITE Julian
    [986,65], // ENT CLN [A] PM - Reg **** CHAN Benjimen
    [1555,66], // ENT CLN [B] PM - Surgeon **** GREGOR Theo
    [1556,67], // ENT CLN [B] PM - Reg **** CHAN Benjimen
    [1527,117], // ENT MCC16 - Surgeon **** CLARKSON John
    [1532,118], // ENT MCC16 - Registrar **** DULKU Kiren
    [1569,120], // ENT MCC17 - Surgeon **** Obs and Gynae
    [1085,59], // General Surgery On Call **** CAMPBELL Ian
    [1509,95], // General Surgery CLN SOP 1 PM - Consultant **** STEWART Adam
    [1511,97], // General Surgery CLN SOP 2 PM - Consultant **** CHRISTEY Grant
    [1520,103], // General Surgery CLN BCC AM - Consultant **** HAYES Lou
    [1665,106], // General Surgery CLN BCC AM - Specialist **** TORRANCE Colette
    [1548,126], // General Surgery Admin-NonClinical AM **** CAMPBELL Ian
    [1570,128], // General Surgery Admin-NonClinical AM **** CHRISTEY Grant
    [1754,166], // General Surgery MCC11 - Surgeon **** Acutes
    [1646,169], // General Surgery MCC25 - Surgeon **** CREIGHTON Jane
    [1650,172], // General Surgery MCC01 - Surgeon **** CHRISTEY Grant
    [1652,173], // General Surgery MCC04 - Surgeon **** VAN DALEN Ralph
    [1657,175], // General Surgery MCC06 - Surgeon **** REID Richard
    [1708,178], // General Surgery MCC ENDO 01 PM - Surgeon **** Gastroenterology
    [1709,180], // General Surgery MCC ENDO 02 AM - Surgeon **** RAFIQUE Mohammad
    [1710,181], // General Surgery MCC ENDO 02 PM - Surgeon **** Gastroenterology
    [1711,183], // General Surgery MCC ENDO 03 AM - Surgeon **** Not Available
    [1712,184], // General Surgery MCC ENDO 03 PM - Surgeon **** Gastroenterology
    [1713,186], // General Surgery MCC ENDO 04 AM - Surgeon **** Gastroenterology
    [1714,187], // General Surgery MCC ENDO 04 PM - Surgeon **** Not Available
    [1606,100], // Maxillo-Facial and Oral MCC15 Dental-Dentist **** Registrar List
    [931,54], // Medicine GM Post Acute **** STEPHENSON Douglas
    [722,56], // Medicine CPU On Call - Cons **** RATNAWEERA Manjula
    [634,66], // Medicine Tokoroa Hospital Ward **** RATNAWEERA Manjula
    [944,67], // Medicine Tokoroa Hospital Clinic and Teaching **** RATNAWEERA Manjula
    [750,69], // Medicine CLN Gen Med AM **** Cancel
    [649,70], // Medicine CLN Gen Med PM **** Cancel
    [1097,76], // Medicine Rehabilitation **** MUNTHREE Sumi
    [1101,77], // Medicine Diabetes **** FISHER Maggie
    [1100,78], // Medicine Infectious Disease Consults **** MILLS Graham
    [756,115], // Medicine CLN Gastro AM **** BROOKER Jim
    [766,123], // Medicine Red Team - Cons **** KHAN Asad
    [767,124], // Medicine Blue Team - Cons **** BROOKLYN Trevor
    [768,125], // Medicine Gold Team - Cons **** MILLS Graham
    [771,126], // Medicine Green Team - Cons **** QUINCEY Vicki
    [770,127], // Medicine Silver Team - Cons **** STEPHENSON Douglas
    [769,128], // Medicine Orange Team - Cons **** GRAY Erana
    [1037,129], // Medicine Purple Team - Cons **** REEVE Paul
    [932,130], // Medicine Red Ward  AM **** KHAN Asad
    [933,131], // Medicine Blue Ward AM **** BROOKLYN Trevor
    [934,132], // Medicine Gold Ward AM **** MILLS Graham
    [935,133], // Medicine Green Ward AM **** QUINCEY Vicki
    [1056,136], // Medicine Purple Ward AM **** REEVE Paul
    [1066,139], // Medicine General Medicine Admin-Non Clinical PM **** REEVE Paul
    [1004,175], // Medicine ENDO 1 AM **** Respiratory
    [1008,176], // Medicine ENDO 1 PM **** Vacant
    [1013,177], // Medicine ENDO 2 AM **** Vacant
    [1005,178], // Medicine ENDO 2 PM **** BROOKER Jim
    [1014,179], // Medicine ENDO 3 AM **** GenSurg
    [1006,180], // Medicine ENDO 3 PM **** BROOKLYN Trevor
    [1009,181], // Medicine ENDO 4 AM **** DICKSON Graeme
    [1007,182], // Medicine ENDO 4 PM **** Vacant
    [987,189], // Medicine Gastro Admin-NonClinical PM **** DICKSON Graeme
    [1104,203], // Medicine On Call - Infectious Diseases **** MILLS Graham
    [778,41], // Neurology On Duty: Neurologist **** GRENHOLM Peter 
    [779,51], // Neurology CLN JS AM **** SCHEPEL Jan
    [797,52], // Neurology CLN JS PM **** SCHEPEL Jan
    [934,54], // Neurology CLN PG AM **** GRENHOLM Peter 
    [830,67], // Neurology Clinic Reg Supv AM **** GRENHOLM Peter 
    [831,68], // Neurology Clinic Reg Supv PM **** SCHEPEL Jan
    [1104,41], // Neurosurgery On Duty - Surgeon **** HUSSAIN Zakier
    [1332,54], // Neurosurgery CLN PM - Consultant **** MUTHU Thirayan
    [1250,55], // Neurosurgery CLN AM - Registrar **** RAKASZ Lucas 
    [1251,56], // Neurosurgery CLN PM - Registrar **** RAKASZ Lucas 
    [1655,82], // Neurosurgery Clinical Admin AM **** MUTHU Thirayan
    [1666,83], // Neurosurgery Clinical Admin AM **** GAN Peter
    [1654,84], // Neurosurgery Clinical-Non Clinical Admin PM **** GAN Peter
    [1621,98], // Neurosurgery MCC06 - Surgeon **** General Surgery
    [1660,104], // Neurosurgery Intvl Radiology **** HUSSAIN Zakier
    [27,52], // Obs and Gynae On Duty: AM - Consultant **** LIN Sylvia
    [580,55], // Obs and Gynae On Duty : PM - Consultant **** LIN Sylvia
    [910,58], // Obs and Gynae On Duty: Evening - Consultant **** SINGH VP
    [1067,163], // Obs and Gynae REG Admin PM **** LI Lulu
    [884,169], // Obs and Gynae Ward Round REG - Blue Team AM **** LI Lulu
    [747,182], // Obs and Gynae Ward Rounds REG - AM **** CAMANO Isabel
    [716,213], // Obs and Gynae ULTRASOUND TRAINING **** BURLING Michael
    [718,215], // Obs and Gynae ULTRASOUND TRAINING **** BURLING Michael
    [822,240], // Obs and Gynae Teaching or Training (Misc) PM **** KAMDAR Toral
    [465,258], // Obs and Gynae Antenatal CLN 1 AM SMO **** MAKEPEACE Penelope
    [480,259], // Obs and Gynae Antenatal CLN 1 AM - Reg **** CAMANO Isabel
    [469,284], // Obs and Gynae Colposcopy CLN 1 AM SMO **** RAMAN Kannan
    [595,285], // Obs and Gynae Colposcopy CLN 1 AM - Reg **** LI Lulu
    [475,326], // Obs and Gynae Colposcopy CLN 1 PM SMO **** McCONNELL Sean
    [622,327], // Obs and Gynae Colposcopy CLN 1 PM Reg **** COLBOURNE Lara
    [776,329], // Obs and Gynae Colposcopy CLN 2 PM SMO **** MAKEPEACE Penelope
    [1055,331], // Obs and Gynae Colposcopy CLN 2 PM Reg **** Cancel
    [681,357], // Obs and Gynae Admin PM **** RAMAN Kannan
    [1004,365], // Obs and Gynae ANC Grading AM **** DUDLEY Narena
    [650,369], // Obs and Gynae Non Clinical AM **** DUDLEY Narena
    [651,370], // Obs and Gynae Non Clinical AM **** McCONNELL Sean
    [1064,393], // Obs and Gynae Rostered Day Off - REG **** HANNA Adelle
    [1163,430], // Obs and Gynae MCC17 - Surgeon 1 **** ROHLANDT Deirdre
    [1164,431], // Obs and Gynae MCC17 - Surgeon 2 **** BARRETT Alison
    [1165,432], // Obs and Gynae MCC17 - Registrar 1 **** COLBOURNE Lara
    [1166,433], // Obs and Gynae MCC17 - Registrar 2 **** CAMANO Isabel
    [925,451], // Obs and Gynae MCC20 - Surgeon 1 **** SINGH VP
    [934,452], // Obs and Gynae MCC20 - Surgeon 2 **** RAVIKANTI Lakshmi
    [938,453], // Obs and Gynae MCC20 - Registrar 1 **** SALEH Tarek
    [1822,51], // Oncology On Call: Haematology IP Team - Consultant **** PULLON Humphrey
    [1302,64], // Oncology On Call: Palliative Care - Consultant **** HOSKINS Lara
    [1319,75], // Oncology Haem Rotorua Clinic - Cons **** GAVRILOVA Natalia
    [1320,76], // Oncology Haem Rotorua Clinic - Reg **** RUKA Myra
    [1443,86], // Oncology Clinic Haem HG (AM) **** GOODMAN Hugh
    [1448,89], // Oncology Clinic Haem JAB (PM) **** BELL Julie-Anne
    [1751,160], // Oncology Clinical-Non Clinical Admin Haem HP (AM) **** PULLON Humphrey
    [1752,161], // Oncology Clinical-Non Clinical Admin Haem HP (PM) **** PULLON Humphrey
    [1755,166], // Oncology Clinical-Non Clinical Admin Haem JAB (AM) **** BELL Julie-Anne
    [1756,168], // Oncology Clinical-Non Clinical Admin Haem SI (AM) **** ISLAM Shahidul
    [1759,169], // Oncology Clinical-Non Clinical Admin Haem SI (PM) **** ISLAM Shahidul
    [1608,178], // Oncology Waikato Hospital - Laboratory Haematologist **** MOORE Helen
    [1573,179], // Oncology Referral Centre Triage Only: Consultant **** ISLAM Shahidul
    [1401,183], // Oncology Haematology Clinics - Reg **** FERGUSON James
    [1543,186], // Oncology Haematology Wards - Reg **** AYE Myat Moe
    [1723,190], // Oncology Clinic Med Onc MJ (AM) **** JAMESON Michael
    [1729,191], // Oncology Clinic Med Onc MJ (PM) **** JAMESON Michael
    [1726,196], // Oncology Clinic Med Onc LN (AM) **** NAGLE Lawrence
    [1732,197], // Oncology Clinic Med Onc LN (PM) **** NAGLE Lawrence
    [1734,204], // Oncology Clinical-Non Clinical Admin Med Onc IK (AM) **** KENNEDY Ian
    [1735,205], // Oncology Clinical-Non Clinical Admin Med Onc IK (PM) **** KENNEDY Ian
    [1737,208], // Oncology Clinical-Non Clinical Admin Med Onc MK (AM) **** KUPER Marion
    [1742,209], // Oncology Clinical-Non Clinical Admin Med Onc MK (PM) **** KUPER Marion
    [1765,214], // Oncology Clinical-Non Clinical Admin Med Onc EE (AM) **** EPNER Elliot
    [1764,215], // Oncology Clinical-Non Clinical Admin Med Onc EE (PM) **** EPNER Elliot
    [1763,216], // Oncology Clinical-Non Clinical Admin Med Onc AT (AM) **** TAN Alvin
    [1745,217], // Oncology Clinical-Non Clinical Admin Med Onc AT (PM) **** TAN Alvin
    [1698,231], // Oncology Clinic Radiation Oncology CH (AM) **** HARTOPEANU Cristian
    [1699,232], // Oncology Clinic Radiation Oncology CH (PM) **** HARTOPEANU Cristian
    [1700,233], // Oncology Clinic Radiation Oncology HVdV (AM) **** VAN DER VYVER Hermann
    [1705,234], // Oncology Clinic Radiation Oncology HVdV (PM) **** VAN DER VYVER Hermann
    [1701,237], // Oncology Clinic Radiation Oncology ZT (AM) **** THOTATHIL Ziad
    [1706,238], // Oncology Clinic Radiation Oncology ZT (PM) **** THOTATHIL Ziad
    [1707,240], // Oncology Clinic Radiation Oncology MS (PM) **** SEEL Matthew
    [1833,244], // Oncology Clinic Radiation Oncology RH (AM) **** HUANG Roger
    [1834,245], // Oncology Clinic Radiation Oncology RH (PM) **** HUANG Roger
    [1713,250], // Oncology Clinical-Non Clinical Admin CDG Rad Onc (AM) **** DE GROOT Charles
    [1717,251], // Oncology Clinical-Non Clinical Admin CDG Rad Onc (PM) **** DE GROOT Charles
    [1715,254], // Oncology Clinical-Non Clinical Admin MS Rad Onc (AM) **** SEEL Matthew
    [1424,269], // Oncology Clinic - Palliative Care (lLH) **** HOSKINS Lara
    [1818,272], // Oncology Clinic - Palliative Care (SB) **** BROWN Stuart
    [1557,54], // Ophthalmology CLN Avastin AM - Consultant **** Registrar List
    [1522,55], // Ophthalmology CLN Avastin AM - Registrar **** LEE In Jung
    [1519,56], // Ophthalmology CLN Diabetic AM - Consultant **** Registrar List
    [1591,57], // Ophthalmology CLN Diabetic AM - Registrar **** BHIKOO Riyaz
    [1520,64], // Ophthalmology CLN Laser AM - Registrar **** YAP Joel
    [1669,68], // Ophthalmology CLN AM - Optom-PattersonBurn **** PATTERSON BURN
    [1586,73], // Ophthalmology CLN [C] PM - Consultant **** Cancel
    [1584,75], // Ophthalmology CLN [D] PM - Consultant **** HOY Ben
    [1579,78], // Ophthalmology CLN Avastin PM - Consultant **** Registrar List
    [1565,79], // Ophthalmology CLN Avastin PM - Registrar **** BHIKOO Riyaz
    [1180,83], // Ophthalmology CLN Laser PM - Consultant **** Cancel
    [1253,88], // Ophthalmology CLN Min Op -GRC PM - Registrar **** VOON Shong Min
    [1176,90], // Ophthalmology CLN Acutes AM - Registrar **** VOON Shong Min
    [1171,91], // Ophthalmology CLN Acutes PM - Registrar **** LEE In Jung
    [1301,102], // Ophthalmology Admin AM - Registrar **** Eye Reg 1
    [1633,108], // Ophthalmology Admin PM **** MATLOOB Selma
    [1571,128], // Ophthalmology MCC14 - Surgeon **** GUEST Stephen
    [1572,129], // Ophthalmology MCC14 AM - Registrar **** CUNNINGHAM William
    [1635,130], // Ophthalmology MCC14 PM - Registrar **** CUNNINGHAM William
    [1435,61], // Orthopaedics CLN A AM - Consultant **** WOTHERSPOON Paul
    [1440,68], // Orthopaedics CLN B PM - Consultant **** CHOY Godwin
    [1587,69], // Orthopaedics CLN C AM **** Fracture
    [1694,70], // Orthopaedics CLN C AM - Reg **** TRAVIS Elizabeth
    [1471,85], // Orthopaedics CLN Thames  - Consultant **** DEVERALL Hamish
    [1515,118], // Orthopaedics Ward Round AM **** CHOY Godwin
    [1574,146], // Orthopaedics MCC07 **** MCCHESNEY Steve
    [1647,147], // Orthopaedics MCC07 - Reg **** HOGAN Yeung
    [1576,148], // Orthopaedics MCC10 **** DONOVAN Jason
    [1580,151], // Orthopaedics MCC12 **** WILLOUGHBY Richard
    [1582,158], // Orthopaedics MCC08 **** HONG Thin
    [1648,159], // Orthopaedics MCC08 - Reg **** KETTIDATHIL Vinu
    [1692,160], // Orthopaedics MCC08 - Reg **** TRAVIS Elizabeth
    [958,71], // Paediatrics On Duty: Paediatric SMO **** DE ALMEIDA Tilak
    [1564,98], // Paediatrics CLINIC Paeds Med - Reg **** HOWLETT Rachel
    [1590,99], // Paediatrics CLINIC Paeds Med - Reg **** LALA Rachel
    [937,134], // Paediatrics CDC & CPASS Registrar **** ADAMU Zayna
    [1024,185], // Paediatrics Admin **** Week 5
    [1300,199], // Paediatrics CLN Paeds Medical PM - SMO **** GOLDSMITH John
    [1533,205], // Paediatrics CUL Paeds Med **** GRAHAM David
    [1029,214], // Paediatrics Paeds Med Admin AM **** McCAY Hamish
    [1528,215], // Paediatrics Paeds Med Admin AM **** GOLDSMITH John
    [1525,223], // Paediatrics Paeds Med Admin PM **** GRAHAM David
    [1530,224], // Paediatrics Paeds Med Admin PM **** McCAY Hamish
    [1061,232], // Paediatrics Clinic Paeds Surg AM - Surgeon **** BROWN Stuart
    [1102,247], // Paediatrics NICU: L3 AM - Consultant **** WESTON Phil
    [1110,251], // Paediatrics NICU: L3 AM - Reg-NNP **** CARPENTER Lee
    [1156,253], // Paediatrics NICU: L2 AM - Consultant **** BOURCHIER David
    [1113,255], // Paediatrics NICU: L2 AM - Reg-NNP **** EDMOND Tess
    [1095,256], // Paediatrics NICU - AM - HO **** HAJI MOHAMMAD Ruzaimah
    [1116,257], // Paediatrics NICU: PM - HO **** SUTHERLAND Aleisha
    [1149,269], // Paediatrics Paed Surgical Reg - OT (or Clinic) **** JAYARATNAM Sridharan
    [1147,270], // Paediatrics Paed Surgical Reg - Clinic (or OT) **** SIVASUBRAMANIAM Mithila
    [1380,280], // Paediatrics MCC 22 - Paediatrics Surgeon **** SAMARAKKODY Udaya
    [1369,65], // Plastics CLN Plastics OPD AM - Consultant **** WOODFIELD Mike
    [1657,66], // Plastics CLN Plastics OPD AM - Reg **** SANDERS Andrew
    [1370,71], // Plastics CLN Plastics Lesion PM - Consultant **** WOODFIELD Mike
    [1371,72], // Plastics CLN Plastics Trauma PM - Reg **** SANDERS Andrew
    [1669,89], // Plastics Thames Theatre 1 AM - Consultant **** YAPRAK Bulent
    [1671,90], // Plastics Thames Theatre 1 PM - Consultant **** YAPRAK Bulent
    [1404,92], // Plastics Thames Theatre 1 AM - Reg **** SAVAGE Stephanie
    [1673,93], // Plastics Thames Theatre 1PM - Reg **** SAVAGE Stephanie
    [1588,100], // Plastics MCCPROC14AM **** AHMED Zeeshan
    [1382,102], // Plastics MCCPROC14PM **** AHMED Zeeshan
    [1616,122], // Plastics MCC21 - Surgeon **** ADAMS Brandon
    [1618,123], // Plastics MCC21 - Registrar 1 **** TAIB Mujeeb
    [1708,131], // Plastics MCC24 - Plastic acutes Registrar **** SAVAGE Jessica
    [1080,39], // Rehabilitation Clinics AM **** FONSEKA Sarath
    [1062,40], // Rehabilitation Clinics AM **** GOVENDER Siva
    [1066,45], // Rehabilitation Clinics PM **** GOVENDER Siva
    [1068,47], // Rehabilitation Clinics PM **** Cancel
    [1058,64], // Rehabilitation Ward AM **** FOWLER Sarah
    [1056,66], // Rehabilitation Ward AM **** MACINDOE Simone
    [1055,67], // Rehabilitation Ward AM **** KAPLAN Michael
    [1148,78], // Rehabilitation Admin-Non Clinical AM **** SAMAD Sha
    [889,80], // Rehabilitation Admin-Non Clinical PM **** FONSEKA Sarath
    [893,81], // Rehabilitation Admin-Non Clinical PM **** FOWLER Sarah
    [895,83], // Rehabilitation Admin-Non Clinical PM **** KAPLAN Michael
    [1149,85], // Rehabilitation Admin-Non Clinical PM **** SAMAD Sha
    [912,37], // Renal On Call - AM **** TAN Eddie
    [834,50], // Renal Ward Physician **** TAN Eddie
    [835,51], // Renal Transplant Physician **** PANDEY Rakesh
    [836,52], // Renal Hospital Outliers Physician **** RABINDRANATH Kannaiyan
    [837,53], // Renal HHD Physician **** SIZELAND Peter
    [928,54], // Renal CAPD Physician **** SIZELAND Peter
    [854,59], // Renal Gen Nephrology Clinic **** TAN Eddie
    [856,60], // Renal Gen Nephrology Clinic **** RABINDRANATH Kannaiyan
    [939,61], // Renal Gen Nephrology Clinic **** PANDEY Rakesh
    [949,65], // Renal CKD Clinic **** SIZELAND Peter
    [1086,52], // Respiratory GenMed AM **** KHAN Asad
    [994,61], // Respiratory Broncs Clinic AM **** BHIKOO Zaheer
    [1032,72], // Respiratory Lung Function CLN PM **** BHIKOO Zaheer
    [1013,73], // Respiratory Sleep Lab PM **** KHAN Asad
    [1007,80], // Respiratory Admin-Non Clinical AM **** WONG Janice
    [752,59], // Vascular CLN AM Vascular **** HOLDAWAY Chris
    [778,60], // Vascular CLN AM Vascular - Reg 1 **** RAYNER Charles
    [765,62], // Vascular CLN AM Diabetes Vascular **** HAGGART Paul
    [957,69], // Vascular Angio PM - Registrar 1 **** CHANDRA Abe
    [954,93], // Vascular MCC02 - Registrar 1 **** ULOOM Amin
    [929,99], // Vascular Clinical Admin AM **** HOLDAWAY Chris
    [927,100], // Vascular Clinical Admin AM **** HAGGART Paul
    [926,101], // Vascular Clinical Admin AM **** VASUDEVAN Vasu
    [930,103], // Vascular Clinical Admin PM **** HOLDAWAY Chris
    [928,104], // Vascular Clinical Admin PM **** HAGGART Paul
    [925,105], // Vascular Clinical Admin PM **** VASUDEVAN Vasu
    [1561,32], // Z Hospital Management Maori Chaplain **** POUTAPU S
    [1242,92], // Z IOC Test SMO On Duty AM - House Officer **** YOON Tae Young
    [1306,93], // Z IOC Test SMO On Duty PM - House Officer **** GLASS Louis
    [778,55], // Cardio Thoracic: CLN AM Cardiac - Surgeon [0800 - 1200] (KEJRIWAL Nand)
    [752,56], // Cardio Thoracic: CLN AM Cardiac - Surgeon [0800 - 1200] (LIN Zaw)
    [970,65], // Cardio Thoracic: Clinical Admin AM [0800 - 1230] (KEJRIWAL Nand)
    [971,66], // Cardio Thoracic: Clinical Admin AM [0800 - 1230] (LIN Zaw)
    [972,67], // Cardio Thoracic: Clinical Admin AM [0800 - 1230] (ODOM Nick)
    [973,70], // Cardio Thoracic: Clinical Admin PM [1230 - 1630] (KEJRIWAL Nand)
    [974,71], // Cardio Thoracic: Clinical Admin PM [1230 - 1630] (LIN Zaw)
    [975,72], // Cardio Thoracic: Clinical Admin PM [1230 - 1630] (ODOM Nick)
    [961,133], // Cardio Thoracic: MCC03 - Cardiothoracic Surgeon [0800 - 1700] (EL GAMEL Adam)
    [962,134], // Cardio Thoracic: MCC03 - Cardiothoracic Registrar 1 [0800 - 1700] (RADHAKRISHNAN Kamaraj)
    [942,137], // Cardio Thoracic: MCC05 - CardioThoracic Surgeon [0800 - 1700] (LIN Zaw)
    [943,140], // Cardio Thoracic: MCC05 - Cardio Thoracic Registrar 1 [0800 - 1700] (GOYAL Shiromani)
];
