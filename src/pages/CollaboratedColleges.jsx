import React, { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useNavigate } from 'react-router-dom';

// College data extracted from the PDF
const collegesData = [
    { name: "Siddhartha college", festDays: "18" },
    { name: "VitAp university", festDays: "I will say once date confirm" },
    { name: "Teegala Krishna Reddy engineering college", festDays: "March 13 - march 14" },
    { name: "KLH university", festDays: "Feb-12 and feb-13 national level cultural fest" },
    { name: "Kakatiya institute of technology and science, warangal", festDays: "Feb-27,28-college fest" },
    { name: "Mahatma Gandhi institute of technology", festDays: "Feb 27-28" },
    { name: "ANATHA LAKSHMI INSTITUTE OF TECHNOLOGY AND SCIENCES", festDays: "FEB 10,11" },
    { name: "Sasi Institute of technology and engineering", festDays: "Feb 27 and Feb 28th" },
    { name: "Lendi institute of engineering and technology", festDays: "February 25 annual day 26 to 28 technical fest" },
    { name: "Guru nanak institute of technology", festDays: "Feb 20 - feb 21 2026 (AI summit)" },
    { name: "Andhra University", festDays: "March 15-18" },
    { name: "Vishwa vishwani institute of systems and management", festDays: "Feb 12,13" },
    { name: "Rajiv Gandhi University of Knowledge Technologies, Basar", festDays: "May be feb last week or march 1st week" },
    { name: "Institute of aeronautical engineering", festDays: "March 13 - cultural day, March 15 - annual day" },
    { name: "Joginpally Bhasakar Institite of Engineering and Technology (JBIET)", festDays: "8 to 15 major festival & public holidays per year" },
    { name: "Sri indu college of engeenering and technology", festDays: "Feb 18 annual day" },
    { name: "NIT Jalandhar", festDays: "March 19 - Ugadi event, March 26 to 29 - Annual techno cultural fest" },
    { name: "Guru nanak institute of technical campus", festDays: "Feb 20- Feb 21" },
    { name: "Sree dattha engineering and science", festDays: "In April" },
    { name: "Siddharth institute of engineering technology", festDays: "Feb 12 technical day and feb 13 traditional day" },
    { name: "JNTUH", festDays: "April 8 and April 9" },
    { name: "Sree chaitanya institute of technological sciences", festDays: "Feb 18,19" },
    { name: "CMRIT Bangalore", festDays: "27-28 March" },
    { name: "Rajiv Gandhi University of knowledge and technology (IIIT Ongole)", festDays: "28,29,30" },
    { name: "Newtons group of institutions", festDays: "March 6 7 8" },
    { name: "KLH Aziznagar", festDays: "13th Feb 14thfeb" },
    { name: "Kalasalingam university", festDays: "Feb 27, 28" },
    { name: "MOHAN BABU UNIVERSITY", festDays: "2-3 days October 2026(dates to be confirmed) fest name:-MOHANA MANTRA" },
    { name: "Kalasalingam academy of research and education", festDays: "Feb 27 & 28" },
    { name: "Brilliant group of institutions and technology", festDays: "March 6 auto expo March 7 annual day" },
    { name: "Narsimha reddy engineering college", festDays: "March" },
    { name: "Sri indu college of engineering and technology", festDays: "Feb 19(technotsav,auto expo),feb 20(cultural&flashmob),feb 21(annual day,live band,dj night)" },
    { name: "SRKR ENGINEERING COLLEGE", festDays: "March 1st & 2nd week -- 4 to 5 days continuously" },
    { name: "Centurion university, Vizianagaram", festDays: "Feb 23,Feb 24" },
    { name: "KL University", festDays: "March 2-march 7th" },
    { name: "Veltech university", festDays: "3 days" },
    { name: "Kl university", festDays: "6&7march" },
    { name: "JNTUCEP college of engineering pulivendula", festDays: "3 days" },
    { name: "ICFAI Foundation For Higher Education", festDays: "Feb 26th workshop Feb 27th stalls" },
    { name: "Siddhartha Institute of Engineering & Technology, Ibrahimpatnam", festDays: "2 days, 12,13 feb" },
    { name: "SRM UNIVERSITY AP", festDays: "Feb 25 & Feb 26 - Technical and non technical events, Feb 27 & Feb 28 - Pro Shows" },
    { name: "Guru Nanak institutions technical campus", festDays: "Feb 20 and 21" },
    { name: "Woxsen university", festDays: "March first week" },
    { name: "Rgukt rkvalley (IIIT)", festDays: "March 4,5,6,7,8" },
    { name: "Saveetha Institute of Medical and Technical Sciences", festDays: "2" },
    { name: "Cvr college of engineering", festDays: "March 13th, 14th" },
    { name: "Gurunanak institute of technical campus", festDays: "Feb 20- Feb21" },
    { name: "Srm ap university", festDays: "Feb 25 to 28" },
    { name: "Government medical collage jagtial", festDays: "1 week" },
    { name: "Vr shiddharth deemed to be university", festDays: "20, 21" },
    { name: "Tkr college engineering", festDays: "Dept fest" },
    { name: "Avinash college of commerce", festDays: "Prarambh event" },
    { name: "Saketa junior college", festDays: "Feb 17 cultural day" },
    { name: "Sri Indu institute of engineering and technology", festDays: "Feb 17 - technical event, Feb 18- Cultural day, Feb 19 - Annual day" },
    { name: "Parul university", festDays: "25to28" },
    { name: "kkr& ksr institute of technology and sciences", festDays: "2 days" },
    { name: "MALLA Reddy college of engineering and technology", festDays: "Mar - 3" },
    { name: "Geethanjali College of Engineering", festDays: "April ending, dj nights" },
    { name: "Lovely proffesional university", festDays: "Feb 11 to Feb 13- ensemble fest" },
    { name: "Gitam university", festDays: "27ans 28" },
    { name: "Gurunanak Institute of Technology", festDays: "Feb - 20, 21" },
    { name: "Malla reddy college of engineering", festDays: "Feb 27-28" },
    { name: "Chalapathi institute of engineering and technology", festDays: "Annual day" },
    { name: "MALLA REDDY COLLEGE OF ENGINEERING", festDays: "Visista every year college event feb 27 28" },
    { name: "JNTUGV", festDays: "March 5 and March 6" },
    { name: "TKR COLLEGE OF ENGINEERING AND TECHNOLOGY", festDays: "Feb 13,14- NISHKARSANA IDEATHON" },
    { name: "Dhruva degree college", festDays: "Only 1 day" },
    { name: "Mahaveer institute of science and technology", festDays: "March 12 (annual day)" },
    { name: "Centurion university of Technology and management", festDays: "Feb 21 and 22" },
    { name: "VNRVJIET", festDays: "March 11,12" },
    { name: "Brilliant institute of technology", festDays: "No March 4,5" },
    { name: "Jbiet moinabad", festDays: "Not sure but most probably in March" },
    { name: "CBIT", festDays: "feb 17-21" },
    { name: "Vit ap", festDays: "Feb 22 to 24" },
    { name: "Madanapalle institute of technology and science", festDays: "March 25-26 ashv" },
    { name: "Raghu engineering college", festDays: "March 6,7" },
    { name: "Siddhartha academy of higher education", festDays: "Feb-19, 20" },
    { name: "Sir CR REDDY COLLEGE OF ENGINEERING, ELURU", festDays: "1day, march last week" },
    { name: "BVRIT Hyderabad college of engineering for women", festDays: "April 4th 5th 6th-annual day" },
    { name: "Mlr institution of technology (MLRIT)", festDays: "Only 21feb" },
    { name: "RGUKT SKLM (IIIT)", festDays: "3days in march - techniverse3..which includes technical and non technical" },
    { name: "NEWTONS GROUP OF INSTITUTION", festDays: "March 6 march 7" },
    { name: "SASI", festDays: "feb 27 feb 28" },
    { name: "Vishwa Vishvani", festDays: "Feb 12 and feb 13 management fest" },
    { name: "KL UNIVERSITY VIJAYAWADA", festDays: "3 days" },
    { name: "Nalla malla Reddy engineering college", festDays: "Tech fest Feb 20- Feb21" },
    { name: "CMR TECHNICAL CAMPUSS", festDays: "2 days" },
    { name: "Gitam", festDays: "Feb 27,28,march1" },
    { name: "Klh university", festDays: "Feb 12,feb-13" },
    { name: "SCIENT INSTITUTE OF PHARMACY", festDays: "No" },
    { name: "Sri Venkateshwara College of engineering and technology", festDays: "Feb 26 banner launch 27 culturals 28 cultural day" },
    { name: "SRMIST", festDays: "4" },
    { name: "Badruka", festDays: "Feb 27 something ala. Date raledhu inka. 2 days" },
    { name: "Malla Reddy demmed university", festDays: "March (4,5,6,7) hackathon and workshop" },
    { name: "NRI INSTITUTE OF TECHNOLOGY", festDays: "Feb (27, 28) fest 2k26 sraitam" },
    { name: "Malla reddy college of engineering (MRCE)", festDays: "Feb 27th and 28th techno and cultural fest" },
    { name: "NIT ANDHRA PRADESH", festDays: "March 11- march 14" },
    { name: "Sphoorty engineering college", festDays: "Feb 14 annual day" },
    { name: "JOGINPALLY B R ENGINEERING COLLEGE", festDays: "April 6-7" },
    { name: "Jntu gv vizianagaram", festDays: "9th and 10th" },
    { name: "KLH Aziz Nagar", festDays: "Feb 13th & 14th" },
    { name: "Gurunanak university", festDays: "20,21" },
    { name: "Cmr technical campus", festDays: "Feb 28th Pegasus" },
    { name: "Talla padmavathi college of engineering", festDays: "Feb-27 and Feb-28" },
    { name: "Tkr college of engineering and technology", festDays: "Feb 13 - Feb 14 many events and programs" },
    { name: "Sir cr Reddy college of engineering", festDays: "2 days (march 6&7)" },
    { name: "sasi institute of technology and engineering tadepalligudem", festDays: "April 27-28" },
    { name: "Kl university", festDays: "6to9th March" },
    { name: "Kits warangal", festDays: "2" },
    { name: "Godavari global University", festDays: "March 6th and 7th" },
    { name: "RAGHU ENGINEERING COLLEGE", festDays: "MARCH 1st WEEK OR 2nd WEEK" },
    { name: "Bvcits(Amalapuram)", festDays: "Feb - youth fest" },
    { name: "JNTU Hyderabad", festDays: "April 7,8 college fest" },
    { name: "Vasavi College of engineering", festDays: "April 12cultural day-13 musical night (tentative)" },
    { name: "Sri venkateswara college of engineering tirupati", festDays: "March 6 or March 7" },
    { name: "BVC ENGINEERING COLLEGE", festDays: "Jan 20-21" },
    { name: "Aanm & vvrsr polytechnic", festDays: "Feb(6-10) branch fests and finally Feb 11th annual day from 4:00pm to 11:30 pm" },
    { name: "VASAVI COLLEGE OF ENGINEERING", festDays: "3" },
    { name: "Sree Chaitanya college of engineering karimnagar", festDays: "5" },
    { name: "Sr university", festDays: "Feb 27 - feb 28" },
    { name: "NMAMIT", festDays: "4" },
    { name: "Nalanda college", festDays: "1day" },
    { name: "kl university vijaywada", festDays: "march 2-march 8" },
    { name: "SRM university AP", festDays: "Feb -25th to Feb 28th" },
    { name: "Sharda university agra", festDays: "Feb 15-18" },
    { name: "Cmr technical campus", festDays: "1 day pegasus an event" },
    { name: "Nitte Meenakshi Institute of Technology", festDays: "March 28" },
    { name: "CMR TECHNICAL CAMPUS", festDays: "Feb 28" },
    { name: "RAJIV GANDHI UNIVERSITY OF KNOWLEDGE TECHNOLOGIES", festDays: "Feb last week" },
    { name: "Sri Venkateshwara College of engineering, Tirupati", festDays: "March 6 th and March 7 th" },
    { name: "G.Narayamamma", festDays: "1" },
    { name: "Sree Rama engineering college tirupati", festDays: "12 feb" },
    { name: "Vasavi college of engineering", festDays: "1or 2 days" },
    { name: "Badruka College of Commerce and Arts", festDays: "Feb27-Bizcom day 1, Feb28-Bizcom day 2" },
    { name: "SR UNIVERSITY", festDays: "2days" },
    { name: "Anurag university", festDays: "17,18" },
    { name: "Kitsw", festDays: "Feb 27 ,28" },
    { name: "BONAM Venkata Chalamayya engineering college", festDays: "FEB-20,21" },
    { name: "Aurora university", festDays: "March 12th, March 13th" },
    { name: "ICFAI HYDERABAD", festDays: "3 days may be 20, 21, 22 of march" },
    { name: "Chalapathi Institute of technology", festDays: "February 20&21" },
    { name: "Sri vasavi engineering college", festDays: "Not confirmed may be at may" },
    { name: "Vaageswari college of engineering", festDays: "Feb 18" },
    { name: "Jawaharlal Nehru technological University Hyderabad", festDays: "April 8&9" },
    { name: "Alliance university", festDays: "3 days feb19 to Feb 21" },
    { name: "Siddartha Educational Academy Group of Institutions - SEAT", festDays: "Feb 12&13" },
    { name: "University college of engineering Osmania university (CSE)", festDays: "March 12- march 13" },
    { name: "Sree rama engineering college", festDays: "Feb 12" },
    { name: "SVCET", festDays: "3" },
    { name: "siddhartha institute of engineering and technolaogy", festDays: "13fed" },
    { name: "Tkr collage, Hyderabad", festDays: "3-days,traditional day, annual day,shiznny day main one" },
    { name: "Srkr engineering college bhimavaram", festDays: "Feb" },
    { name: "Srm Ramapuram", festDays: "Feb 27 & 28" },
    { name: "Mahatma Gandhi institute of technology", festDays: "2 days feb 12th and 13th technical fests" },
    { name: "Mallareddy College of engineering and technology", festDays: "March-1 to 5" },
    { name: "Jbiet", festDays: "3days" },
    { name: "MLRIT", festDays: "Traditional Day" },
    { name: "Trinity College of Technology and Engineering", festDays: "Feb 20" },
    { name: "Chalapathi institute of engineering and technology", festDays: "13 culture 14 annual" },
    { name: "CMRTC", festDays: "28 feb" },
    { name: "Sri Venkateswara College of Engineering(SVCE) Tirupati", festDays: "Mar 06,07" },
    { name: "Vnr vjiet", festDays: "2" },
    { name: "Veltech University", festDays: "March 12,13,14" },
    { name: "Andhra Loyola college", festDays: "Feb 23 and 24 - departmental fest" },
    { name: "RK College of engineering and technology vijaywada", festDays: "Feb 23" },
    { name: "Father colombo institute of medical sciences", festDays: "March 5th to 8th college fest" },
    { name: "G.Pullaiah college of engineering and technology", festDays: "April" },
    { name: "Malla Reddy engineering college for women", festDays: "Feb 18" },
    { name: "Indian Institute of information technology design and Manufacturing Kurnool", festDays: "Feb 28 - Mar 1st (Techno-Cultural Fest)" },
    { name: "Kakatiya institute of technology and science warangal", festDays: "Feb 21- Sanskrithi event" },
    { name: "Sridevi women's engineering college", festDays: "March 1st week(2days)- Tech fest & March 2nd week(2days)- cultural fest" },
    { name: "St.peter's engineering college", festDays: "March10-11th march" },
    { name: "Vellore Institute of Technology, Amaravati", festDays: "March 1st week" },
    { name: "Vignana jyothi institute of management", festDays: "19,20,21" },
    { name: "Bv raju institute of technology (narsapur)", festDays: "April 7-Annual day,April 8-Athenes" },
    { name: "GURUNANAK INSTITUTIONS TECHNICAL CAMPUS", festDays: "20th & 21st - AI SUMMIT" },
    { name: "Sruniversity", festDays: "Feb 26 - feb 27" },
    { name: "Chaitanya bharathi institute of technology", festDays: "Feb 17 to Feb 21" },
    { name: "Vijaya teja", festDays: "27,28" },
    { name: "VNR VJIET", festDays: "March 13, March 14" },
    { name: "Kalasaligam University", festDays: "Feb-27,28" },
    { name: "NIT CALICUT, KERALA", festDays: "March 27,28,29" },
    { name: "Nalla Narsimha Reddy Educational societys groups of institution", festDays: "2 days (Feb 26 - Feb 27)" },
    { name: "Mlritm", festDays: "March 22nd" },
    { name: "CMR College of Engineering & Technology", festDays: "April - 4" },
    { name: "CMRIT,BANGALORE", festDays: "Almost 6 days" },
    { name: "Amity University Madhya Pradesh", festDays: "3" },
    { name: "ICFAI business school", festDays: "April -1,2,3 (Cultural event)" },
    { name: "SRU", festDays: "24 feb asthara" },
    { name: "NICMAR", festDays: "22,23" },
    { name: "Vardhaman College of Engineering", festDays: "Feb13,14" },
    { name: "Lendi institution of engineering and technology", festDays: "Feb 26,27 Cultural day, Feb 28 - Annual day" },
    { name: "Bbcit", festDays: "3" },
    { name: "Sri Venkateswara College of engineering", festDays: "March -6,7 - spark" },
    { name: "NALLA NARASHIMA REDDY GROUP OF INSTITUTIONS", festDays: "Feb 26,27,28" },
    { name: "University College of Engineering", festDays: "March 12-13" },
    { name: "MALLA REDDY DEEMED TO BE UNIVERSITY", festDays: "March 6th 7th 2026" },
    { name: "TKR COLLEGE OF ENGINNERING AND TECHNOLOGY", festDays: "13 and 14th" },
    { name: "Sri indhu", festDays: "Only one day 19 feb" },
    { name: "Siddhartha institute of technology and technology", festDays: "12feb - technical fest ,13 feb - traditional day" },
    { name: "St. Peter's Engineering College", festDays: "17-18th of February" },
    { name: "BVC ENGINEERING COLLEGE ODALAREVU", festDays: "20&21 youth fest" },
    { name: "Veltech university", festDays: "3 days in the month of feb /march(dates yet to be announced)" },
    { name: "Chalapathi Institute of Technology", festDays: "Feb 20 -Technical, Feb 21 - Cultural" },
    { name: "NRİİT visidala", festDays: "27;28" },
    { name: "Siddharth instute of engineering and technology", festDays: "Feb 13 Traditional day" },
    { name: "JNTUGV VIZIANAGARAM", festDays: "March 6 -March7" },
    { name: "NRI INSTITUTE Of Technology", festDays: "Feb 27-28" },
    { name: "Kalasalingam university", festDays: "2 days" },
    { name: "JNTU-GV College of engineering Viziangaram", festDays: "March 11 - Culturals day March 12 - Flash mob" },
    { name: "Chalapathy institute of technology guntur", festDays: "20.21st" },
    { name: "Jntu university Kukatpally", festDays: "April 22 ,23" },
    { name: "VIT AP UNIVERSITY", festDays: "22,23,24" },
    { name: "V. R. Siddhartha Engineering college", festDays: "Feb-20, 21" },
    { name: "Palamuru university", festDays: "17" },
    { name: "Vishwa vishwani school of business", festDays: "12-13feb" },
    { name: "Sri Venkateswara College of Engineering", festDays: "3 days March 6,7,8" },
    { name: "SRM UNIVERSITY AP", festDays: "Feb 25 to Feb 28 (2026)" },
    { name: "Bvc engineering collage", festDays: "Feb 20&21" },
    { name: "Guru Nanak Institutions Technical Campus", festDays: "20th poster& research paper presentations, 21st startupexpo" },
    { name: "Guru Nanak institution", festDays: "AI Sumit" },
    { name: "Gurunanak institute of technology", festDays: "20, 21 feb" },
    { name: "Jawaharlal Nehru Technological University,Hyderabad", festDays: "26th & 27th feb" },
    { name: "University College of Engineering Osmania University", festDays: "March 12th and March 13th" },
    { name: "BVC odalarevu", festDays: "20th and 21" },
    { name: "RV INSTITUTE OF TECHNOLOGY", festDays: "Feb 26 and 27" },
    { name: "Chaitnya engineering college kommadhi", festDays: "2days" },
    { name: "VR siddhartha engineering college", festDays: "Feb 20, 21 fest" },
    { name: "Nnrg", festDays: "4 days" },
    { name: "RVIT", festDays: "2 days" },
    { name: "Nri Institute of technology visadala guntur", festDays: "2 days-feb 17,18" },
    { name: "Nalla malla reddyy", festDays: "Feb20-feb-21" },
    { name: "Vignan institute of technology and sciences", festDays: "Annual day expected from march 15 to 25" },
    { name: "Sri Venkateshwara College of engineering karakambadi", festDays: "March-5 Annual day March-6 spark day -1 March-7 spark day 2" },
    { name: "Kasi reddy naryan reddy college of engineering", festDays: "March 6 - * cultural day, March 7 - Annual day" },
    { name: "JNTU-GV COLLEGE OF ENGINEERING VIZIANAGARAM", festDays: "March 6 -Culturals and workshop March 7-Workshop and flashmob" },
    { name: "Teegala Krishna Reddy Engineering College", festDays: "Feb 26 - flashmob, Feb 27 - tech and non tech events and games, Feb 28 - Main event" },
    { name: "Bankatlal badruka college of information technology", festDays: "Feb 21" },
    { name: "Iimc", festDays: "March first week" },
    { name: "MLR INSTITUTE OF TECHNOLOGY", festDays: "Feb 21st - Traditional Day" },
    { name: "KPRIT", festDays: "FEB 27 & 28 ( 2 DAYS SPORTS FEST) for annual day we have time" },
    { name: "Rajiv Gandhi University of knowledge technologies (Ongole)", festDays: "3 days" },
    { name: "RESONANCE", festDays: "March 13 to april 13" },
    { name: "GITAM UNIVERSITY", festDays: "March 9th - march 10th" },
    { name: "CMRIT COLLEGE", festDays: "1" },
    { name: "Vaagdevi degree College", festDays: "March 14 cultural and March 15 annual day" },
    { name: "NEWTONS INSTITUTE OF ENGINEERING COLLEGE", festDays: "March 6th- ferval day, March 7th - annual day" },
    { name: "Vel Tech Rangarajan Dr sagunthala R & D Institute of Science and Tevhnology", festDays: "Feb-14 Alumni meet(Valentine's day theme)" },
    { name: "CMR TRCHNICAL CAMPUS", festDays: "28 feb 2k26" },
    { name: "Tkr College of Engineering and Technology", festDays: "13 and 14th" },
    { name: "Malla reddy college of engineering (MRCE)", festDays: "Feb 27,28 visista 2k26" },
    { name: "KKR AND KSR INSTITUTION OF TECHNOLOGY AND SCIENCE", festDays: "Four days on March 6-9th" },
    { name: "Centurion university", festDays: "Feb 20 -21" },
    { name: "Geethanjali Institute of science and technology", festDays: "March 2nd(Tech fest)" },
    { name: "Sree chaitanya college of Engineering", festDays: "Feb23 - Feb28" },
    { name: "Institute of Aeronautical engineering", festDays: "13 March 2026 - traditional day, 14 March 2026 - Annual day" },
    { name: "Nalla narasimha reddy", festDays: "Feb 26-feb28 cultural and traditional" },
    { name: "GITAM Visakhapatnam", festDays: "3 days" },
    { name: "BIT DEOGHAR", festDays: "3" },
    { name: "Dr.Lankapalli Bullayya College of engineering", festDays: "March 29th" },
    { name: "NSRIT", festDays: "2" },
    { name: "Guru Nanak Institute of technical campus", festDays: "Feb -20&21 AI summit" },
    { name: "VIT-AP", festDays: "FEB-22 TO 24TH-VITOPIA 26" },
    { name: "Birls institute of technology and science, Hyderabad campus", festDays: "20, 21, 22 feb 2026" },
    { name: "Siddhartha institute of engineering and technology", festDays: "Feb12,feb13" },
    { name: "Sri indu engineering College", festDays: "19 ,20,21" },
    { name: "AMET UNIVERSITY", festDays: "3" },
    { name: "Guru Nanak isntitutions Technical campus", festDays: "20,21 Feb" },
    { name: "Osmania University", festDays: "2 days technical fest" },
    { name: "GITAM Vizag", festDays: "3 days Feb 27 ethnic day Feb 28 and mar 1 pro night" },
    { name: "Vel tech University", festDays: "In march" },
    { name: "TKR COLLEGE OF ENGINEERING AND TECHNOLOGY", festDays: "3 days day -1 flash mob day -2 technical fest day -3 non technical fest" },
    { name: "Siddhartha Academy of Higher education (V. R. Siddhartha engineering college)", festDays: "Feb 20,21" },
    { name: "Aditya university", festDays: "2" },
    { name: "Teeegala krishna reddy", festDays: "Fed 27 technical, feb28 non technical" },
    { name: "IIT Tirupati", festDays: "Feb 27,28 , Mar 1" },
    { name: "Lendi institute of engineering and technology", festDays: "Feb26+feb28" },
    { name: "JNTUHUCESTH", festDays: "Feb 26 & 27 - cultural fest" },
    { name: "St Peter's engineering College of Hyderabad", festDays: "2" },
    { name: "Sri Venkateswar college of engineering and technology, Chittoor", festDays: "12 to 14 (3 days)" },
    { name: "St. Mary's group of institutions", festDays: "Feb 19 & 20 sports, Feb 21st fest is going to be held" },
    { name: "Electronics and Communication Engineering,University College of Engineering, Osmania University", festDays: "March 12th and 13th" },
    { name: "NRI INSTITUTE OF TECHNOLOGY", festDays: "FEB-27th-Techinical,FEB-28th-Cultural" },
    { name: "St.Peter's Engineering college", festDays: "2 days" },
    { name: "Anurag University", festDays: "16&17 Hakthoniks (ECE)" },
    { name: "ICFAI FOUNDATION FOR HIGHER EDUCATION", festDays: "27th" },
    { name: "aditya college of engineering madanapalli", festDays: "March 6,cultural day,March 7th annual day" },
    { name: "Vemu institute of technology", festDays: "3 days of fest and we have permission for 2 days" },
    { name: "Gokaraju lailavathi engineering college", festDays: "For ugadi march 17-19 between" },
    { name: "Gokaraju rangaraju institute of technology", festDays: "1" },
    { name: "CMR", festDays: "Feb 28 - PEGSUS" },
    { name: "Gitam University", festDays: "Feb-27- sports, Feb-28- culturals ,Mar-1- party night, dance dj etc." },
    { name: "Nalla Malla Reddy Engineering College", festDays: "Feb 19,20 Tech fest" },
    { name: "Avanthi institute of engineering and technology", festDays: "2days" },
    { name: "NATIONAL INSTITUTE OF TECHNOLOGY CALICUT", festDays: "Match-27,28,29" },
    { name: "TKR college of engineering and technology", festDays: "March 2-technical events,march 3-Non technical events" },
    { name: "SRKR Engineering college Bhimavaram", festDays: "One day" },
    { name: "NRI institute of technology", festDays: "27-28" },
    { name: "Sai University, Chennai", festDays: "Feb 18- Stall expo" },
    { name: "Ng college", festDays: "Feb 18" },
    { name: "BITS PILANI HYDERABAD CAMPUS", festDays: "Feb-20 to Feb 22" },
    { name: "Gitam university", festDays: "3 days" },
    { name: "Sree chaithanya college of engineering", festDays: "Feb 23 rd to 1 weak sports fest" },
    { name: "Sir cr reddy college of engineering", festDays: "March6" },
    { name: "Kalasalingam Academy of research and education", festDays: "2 day's" },
    { name: "St.mary's group of institutions", festDays: "19-feb games ,20-feb freshers party, 21- technical event" },
    { name: "GITAM VIZAG", festDays: "Feb 27-march 1" },
    { name: "Pallavi engineering college", festDays: "March 23,24- sports fest, march 25,27- cultural fest & technical fest, 28- annual day" },
    { name: "JNTUH, KUKATPALLY", festDays: "April- 8 and April-9" },
    { name: "Rajiv Gandhi University of knowledge and technology nuzvid", festDays: "2 days" },
    { name: "NRI institute of technology", festDays: "Feb 27 and Feb 28" },
    { name: "Guru nanak institution technical campus", festDays: "Feb 21 & 22" },
    { name: "Ksrm college of engineering", festDays: "No" },
    { name: "Bvc institute of and technology", festDays: "Feb 27-28" },
    { name: "Kl University", festDays: "Cultural fest 7 days" },
    { name: "Andhra University College of Engineering", festDays: "2days" },
    { name: "Nalla Malla Reddy engineering college", festDays: "Tech fest feb20-21" },
    { name: "NIT RAIPUR", festDays: "20,21,22" },
];

const CollaboratedColleges = () => {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');

    // Filter and sort colleges based on search query
    const filteredColleges = useMemo(() => {
        let colleges = collegesData;
        
        // Filter if search query exists
        if (searchQuery.trim()) {
            const query = searchQuery.toLowerCase();
            colleges = colleges.filter(college => 
                college.name.toLowerCase().includes(query) ||
                college.festDays.toLowerCase().includes(query)
            );
        }
        
        // Sort alphabetically by college name
        return colleges.sort((a, b) => 
            a.name.toLowerCase().localeCompare(b.name.toLowerCase())
        );
    }, [searchQuery]);

    return (
        <div className="min-h-screen bg-white font-sans text-brand-text">
            <Helmet>
                <title>Collaborated Colleges List - Ekthaa</title>
                <meta name="description" content="View the list of colleges we've collaborated with for our Play & Win stalls and promotional events." />
            </Helmet>

            {/* Header */}
            <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-gray-100">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
                    <Link to="/" className="text-2xl font-serif font-bold tracking-tight text-brand-dark">
                        EKTHAA
                    </Link>
                    <button 
                        onClick={() => navigate(-1)}
                        className="text-sm font-medium text-gray-600 hover:text-brand-teal transition-colors"
                    >
                        ← Back
                    </button>
                </div>
            </nav>

            {/* Page Header */}
            <section className="bg-gradient-to-br from-teal-50 via-white to-orange-50 py-12 md:py-16">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
                    <h1 className="text-4xl sm:text-5xl font-serif font-bold text-brand-dark leading-tight mb-4">
                        Collaborated <span className="text-brand-teal">Colleges List</span>
                    </h1>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Search and view the complete list of colleges where we've set up promotional stalls
                    </p>
                </div>
            </section>

            {/* Search and Table Section */}
            <section className="py-8 bg-white">
                <div className="max-w-6xl mx-auto px-4 sm:px-6">
                    
                    {/* Search Bar */}
                    <div className="mb-8">
                        <div className="relative max-w-2xl mx-auto">
                            <input
                                type="text"
                                placeholder="Search by college name or fest dates..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full px-6 py-4 pr-12 text-lg border-2 border-gray-200 rounded-full focus:border-brand-teal focus:outline-none transition-colors"
                            />
                            <svg 
                                className="absolute right-5 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-400"
                                fill="none" 
                                stroke="currentColor" 
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                        <p className="text-center text-sm text-gray-500 mt-3">
                            {filteredColleges.length} college{filteredColleges.length !== 1 ? 's' : ''} found
                        </p>
                    </div>

                    {/* Colleges Table */}
                    <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gradient-to-r from-brand-teal to-teal-500 text-white">
                                    <tr>
                                        <th className="px-6 py-4 text-left text-sm font-semibold">#</th>
                                        <th className="px-6 py-4 text-left text-sm font-semibold">College Name</th>
                                        <th className="px-6 py-4 text-left text-sm font-semibold">Expected Fest Days</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {filteredColleges.length > 0 ? (
                                        filteredColleges.map((college, index) => (
                                            <tr key={index} className="hover:bg-teal-50 transition-colors">
                                                <td className="px-6 py-4 text-gray-600 font-medium">{index + 1}</td>
                                                <td className="px-6 py-4 text-brand-dark font-medium">{college.name}</td>
                                                <td className="px-6 py-4 text-gray-600">{college.festDays}</td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="3" className="px-6 py-12 text-center text-gray-500">
                                                <div className="flex flex-col items-center gap-3">
                                                    <svg className="w-12 h-12 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                    </svg>
                                                    <p className="text-lg">No colleges found matching your search</p>
                                                </div>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-brand-dark text-gray-400 py-10 mt-8">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
                    <p className="text-white font-serif font-bold text-lg mb-1">EKTHAA</p>
                    <p className="text-sm">Building better discovery for local businesses.</p>
                    <p className="text-sm text-gray-500 mt-4">© {new Date().getFullYear()} Ekthaa. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
};

export default CollaboratedColleges;
