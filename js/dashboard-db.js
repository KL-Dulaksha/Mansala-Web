/**
 * Mansala — Core Dashboard Database, Authentication & RBAC Engine
 * University of Ruhuna • Faculty of Science
 * 
 * Supports:
 *  - Two distinct roles: Administrator & Coordinator
 *  - Role-Based Access Control (RBAC) enforced on data and UI
 *  - Workspace switching for dual-role Administrators (Admin Workspace & Coordinator Workspace)
 *  - Persistent storage in localStorage with seed recovery
 */
(function(window) {
  'use strict';

  const STORAGE_KEYS = {
    SESSION: 'mansala_session_user',
    WORKSPACE: 'mansala_active_workspace', // 'admin' | 'coordinator'
    USERS: 'mansala_db_users',
    RESOURCES: 'mansala_db_resources',
    QUIZZES: 'mansala_db_quizzes',
    PROJECTS_UPCOMING: 'mansala_db_projects_upcoming',
    PROJECTS_PAST: 'mansala_db_projects_past',
    DONATIONS: 'mansala_db_donations',
    MENTORS: 'mansala_db_mentors',
    ENQUIRIES: 'mansala_db_enquiries',
    ACTIVITY: 'mansala_db_activity',
    SETTINGS: 'mansala_db_settings'
  };

  const SEED_DATA = {
    users: [
  {
    "id": "usr-admin-1",
    "name": "Dr. N. Wickramasinghe",
    "username": "admin",
    "email": "admin@mansala.ruh.ac.lk",
    "password": "admin",
    "role": "admin",
    "hasCoordinatorPrivileges": true,
    "title": "Lead Programme Administrator & Senior Lecturer",
    "department": "Faculty of Science, University of Ruhuna",
    "assignedSubject": "All Subjects",
    "phone": "+94 41 222 2681",
    "status": "Active"
  },
  {
    "id": "usr-coord-1",
    "name": "K. L. Perera",
    "username": "cordinator1",
    "email": "cordinator1@mansala.ruh.ac.lk",
    "password": "cordinator1",
    "role": "coordinator",
    "hasCoordinatorPrivileges": true,
    "title": "O/L Science Content Coordinator",
    "department": "Department of Physics, University of Ruhuna",
    "assignedSubject": "Science",
    "phone": "+94 71 834 9102",
    "status": "Active"
  },
  {
    "id": "usr-coord-2",
    "name": "S. Jayasuriya",
    "username": "cordinator2",
    "email": "cordinator2@mansala.ruh.ac.lk",
    "password": "cordinator2",
    "role": "coordinator",
    "hasCoordinatorPrivileges": true,
    "title": "O/L Mathematics Content Coordinator",
    "department": "Department of Mathematics, University of Ruhuna",
    "assignedSubject": "Mathematics",
    "phone": "+94 77 412 8590",
    "status": "Active"
  },
  {
    "id": "usr-coord-3",
    "name": "M. Fernando",
    "username": "cordinator3",
    "email": "cordinator3@mansala.ruh.ac.lk",
    "password": "cordinator3",
    "role": "coordinator",
    "hasCoordinatorPrivileges": true,
    "title": "Mentorship & Revision Material Coordinator",
    "department": "Department of Chemistry, University of Ruhuna",
    "assignedSubject": "Science & Mathematics",
    "phone": "+94 70 293 4811",
    "status": "Active"
  }
],
    resources: [
  {
    "id": "res-1",
    "title": "O/L Science \u2014 2023 Past Paper",
    "titleSi": "සා/පෙළ විද්‍යාව — 2023 පසුගිය ප්‍රශ්න පත්‍රය",
    "descSi": "2023 ජාතික විභාගයේ සම්පූර්ණ අ.පො.ස. සාමාන්‍ය පෙළ විද්‍යාව ප්‍රශ්න පත්‍රය. සියලුම කොටස්, බහුවරණ සහ ව්‍යුහගත රචනා ප්‍රශ්න ඇතුළත් වේ.",
    "subject": "Science",
    "subjectKey": "science",
    "type": "Past Paper",
    "typeKey": "past-papers",
    "year": "2023",
    "grade": "Grade 10 & 11",
    "size": "2.4 MB",
    "desc": "Complete G.C.E. Ordinary Level Science examination paper from the 2023 national examination. Includes all sections, multiple choice, and structured essay questions.",
    "topics": "physics chemistry biology national examination past paper structured essay questions ruhuna",
    "downloadUrl": "#download-ol-sci-2023",
    "ownerId": "usr-coord-1",
    "ownerName": "K. L. Perera",
    "status": "published",
    "dateAdded": "2026-10-25"
  },
  {
    "id": "res-2",
    "title": "Mathematics Model Paper \u2014 Algebra & Geometry",
    "titleSi": "ගණිතය ආදර්ශ ප්‍රශ්න පත්‍රය — වීජ ගණිතය සහ ජ්‍යාමිතිය",
    "descSi": "සා/පෙළ විෂය නිර්දේශගත වීජීය ප්‍රකාශන, වර්ගජ සමීකරණ සහ ජ්‍යාමිතික සාධන කෙරෙහි අවධානය යොමු කළ ආදර්ශ ප්‍රශ්න පත්‍රය. ව්‍යුහගත පුහුණුව සඳහා ඉතා යෝග්‍ය වේ.",
    "subject": "Mathematics",
    "subjectKey": "mathematics",
    "type": "Model Paper",
    "typeKey": "model-papers",
    "year": "2024",
    "grade": "Grade 11",
    "size": "1.8 MB",
    "desc": "A model paper focusing on algebraic expressions, quadratic equations, and geometric proofs aligned with the O/L syllabus. Ideal for structured practice.",
    "topics": "mathematics algebra geometry quadratic equations proofs theorems riders model paper exam practice",
    "downloadUrl": "#download-ol-maths-model-alg-geom",
    "ownerId": "usr-coord-2",
    "ownerName": "S. Jayasuriya",
    "status": "published",
    "dateAdded": "2026-10-24"
  },
  {
    "id": "res-3",
    "title": "Science Revision Notes \u2014 Energy & Force",
    "titleSi": "විද්‍යාව පුනරීක්ෂණ සටහන් — ශක්තිය සහ බලය",
    "descSi": "ශක්තිය, කාර්යය, ක්ෂමතාව සහ බලය පිළිබඳ මූලික සංකල්ප ආවරණය වන කෙටි පුනරීක්ෂණ සටහන්. රූප සටහන් සහ සූත්‍ර ඇතුළත් වේ.",
    "subject": "Science",
    "subjectKey": "science",
    "type": "Notes",
    "typeKey": "notes",
    "year": "2023",
    "grade": "Grade 11 Physics",
    "size": "3.1 MB",
    "desc": "Concise revision notes covering key concepts in energy, work, power, and force. Includes diagrams, formulae, and worked examples for quick review.",
    "topics": "science physics energy force work power mechanics newton laws worked examples revision notes",
    "downloadUrl": "#download-ol-sci-notes-energy-force",
    "ownerId": "usr-coord-3",
    "ownerName": "M. Fernando",
    "status": "published",
    "dateAdded": "2026-10-23"
  },
  {
    "id": "res-4",
    "title": "O/L Mathematics \u2014 2023 Marking Scheme",
    "titleSi": "සා/පෙළ ගණිතය — 2023 ලකුණු දීමේ පටිපාටිය",
    "descSi": "2023 සා/පෙළ ගණිතය ප්‍රශ්න පත්‍රය සඳහා වන නිල ලකුණු දීමේ පටිපාටිය. පියවරෙන් පියවර ලකුණු ලබාදීමේ මාර්ගෝපදේශ සහ විකල්ප පිළිතුරු ඇතුළත් වේ.",
    "subject": "Mathematics",
    "subjectKey": "mathematics",
    "type": "Marking Scheme",
    "typeKey": "marking-schemes",
    "year": "2023",
    "grade": "Grade 11",
    "size": "1.2 MB",
    "desc": "Official-style marking scheme for the 2023 O/L Mathematics paper. Contains step-by-step marking guidelines and acceptable alternative answers.",
    "topics": "mathematics marking scheme 2023 answers step by step solutions rubric exam scoring",
    "downloadUrl": "#download-ol-maths-2023-marking",
    "ownerId": "usr-coord-2",
    "ownerName": "S. Jayasuriya",
    "status": "published",
    "dateAdded": "2026-10-22"
  },
  {
    "id": "res-5",
    "title": "Science Model Paper \u2014 Biology & Chemistry",
    "titleSi": "විද්‍යාව ආදර්ශ ප්‍රශ්න පත්‍රය — ජීව විද්‍යාව සහ රසායන විද්‍යාව",
    "descSi": "සා/පෙළ සූදානම සඳහා ජීව විද්‍යාව (මානව දේහ පද්ධති, පරිසර විද්‍යාව) සහ රසායන විද්‍යාව (පරමාණු, රසායනික ප්‍රතික්‍රියා) ආවරණය වන විස්තීර්ණ ආදර්ශ ප්‍රශ්න පත්‍රය.",
    "subject": "Science",
    "subjectKey": "science",
    "type": "Model Paper",
    "typeKey": "model-papers",
    "year": "2024",
    "grade": "Grade 10 & 11",
    "size": "2.7 MB",
    "desc": "A comprehensive model paper covering biology (human body systems, ecology) and chemistry (atoms, chemical reactions) for O/L preparation.",
    "topics": "science biology chemistry human body ecology atoms chemical reactions model exam paper",
    "downloadUrl": "#download-ol-sci-model-bio-chem",
    "ownerId": "usr-coord-1",
    "ownerName": "K. L. Perera",
    "status": "published",
    "dateAdded": "2026-10-21"
  },
  {
    "id": "res-6",
    "title": "Revision Guide \u2014 Trigonometry & Statistics",
    "titleSi": "පුනරීක්ෂණ මාර්ගෝපදේශය — ත්‍රිකෝණමිතිය සහ සංඛ්‍යානය",
    "descSi": "ත්‍රිකෝණමිතික අනුපාත, දත්ත නිරූපණය සහ සංඛ්‍යානමය මිමි ආවරණය වන ව්‍යුහගත පුනරීක්ෂණ මාර්ගෝපදේශය. පිළිතුරු සහිත පුහුණු ප්‍රශ්න ඇතුළත් වේ.",
    "subject": "Mathematics",
    "subjectKey": "mathematics",
    "type": "Revision Materials",
    "typeKey": "revision-materials",
    "year": "2023",
    "grade": "Grade 11",
    "size": "2.0 MB",
    "desc": "A structured revision guide covering trigonometric ratios, data representation, and statistical measures. Includes practice questions with answers.",
    "topics": "mathematics trigonometry statistics data analysis ratios angles elevation depression revision guide",
    "downloadUrl": "#download-ol-maths-guide-trig-stats",
    "ownerId": "usr-coord-3",
    "ownerName": "M. Fernando",
    "status": "published",
    "dateAdded": "2026-10-20"
  },
  {
    "id": "res-7",
    "title": "2023 G.C.E. O/L Science \u2014 Complete Examination Dossier",
    "titleSi": "2023 අ.පො.ස. සා/පෙළ විද්‍යාව — සම්පූර්ණ විභාග ලේඛනය",
    "descSi": "2023 සම්පූර්ණ ජාතික විභාග ප්‍රශ්න පත්‍රය, විවරණ සහිත ලකුණු දීමේ පටිපාටිය සහ සිසුන් නිතර සිදුකරන වැරදි පිළිබඳ උපදේශක සටහන් සහිත විස්තීර්ණ විභාග ලේඛනය.",
    "subject": "Science",
    "subjectKey": "science",
    "type": "Past Paper",
    "typeKey": "past-papers",
    "year": "2023",
    "grade": "Grade 10 & 11",
    "size": "2.4 MB",
    "desc": "An exhaustive review document containing the full 2023 national examination paper, complete with an annotated marking scheme, mentor commentary on frequent errors, and model answers.",
    "topics": "science master dossier past paper marking scheme commentary frequent errors 2023 national exam",
    "downloadUrl": "#download-sci-2023-master-dossier",
    "ownerId": "usr-coord-1",
    "ownerName": "K. L. Perera",
    "status": "published",
    "dateAdded": "2026-10-19"
  },
  {
    "id": "res-8",
    "title": "Mathematics Notes \u2014 Simultaneous Equations & Quadratics",
    "titleSi": "ගණිතය සටහන් — සමගාමී සමීකරණ සහ වර්ගජ ප්‍රකාශන",
    "descSi": "වීජීය ආදේශය, ඉවත් කිරීම සහ ප්‍රස්ථාරික පරාවලික විසඳුම් පිළිබඳ පියවරෙන් පියවර විභාග ආදර්ශ ප්‍රශ්න 15 ක් සහිත සවිස්තරාත්මක පුනරීක්ෂණ සටහන්.",
    "subject": "Mathematics",
    "subjectKey": "mathematics",
    "type": "Notes",
    "typeKey": "notes",
    "year": "2024",
    "grade": "Grade 11",
    "size": "1.8 MB",
    "desc": "Comprehensive step-by-step revision guide on algebraic elimination, substitution, and graphical parabolas solutions with 15 worked model exam questions.",
    "topics": "mathematics algebra simultaneous equations quadratics graphs unit 07 elimination substitution",
    "downloadUrl": "#download-maths-notes-simultaneous",
    "ownerId": "usr-coord-3",
    "ownerName": "M. Fernando",
    "status": "published",
    "dateAdded": "2026-10-18"
  },
  {
    "id": "res-9",
    "title": "Science Concept Summary \u2014 Chemical Reactions, Acids & Bases",
    "titleSi": "විද්‍යා සංකල්ප සාරාංශය — රසායනික ප්‍රතික්‍රියා, අම්ල සහ භස්ම",
    "descSi": "රසායනික ප්‍රතික්‍රියා වර්ගීකරණය, සංකීර්ණ සමීකරණ තුලනය, pH පරිමාණ යෙදීම් සහ රසායනාගාර පරීක්ෂණ සාරාංශය.",
    "subject": "Science",
    "subjectKey": "science",
    "type": "Notes",
    "typeKey": "notes",
    "year": "2024",
    "grade": "Grade 11 Chemistry",
    "size": "3.1 MB",
    "desc": "Clear classification of chemical reaction types, balancing complex equations, pH scale applications, and laboratory test summaries for quick recall.",
    "topics": "science chemistry chemical reactions acids bases salts ph scale neutralization laboratory tests",
    "downloadUrl": "#download-sci-notes-chemical-reactions",
    "ownerId": "usr-coord-3",
    "ownerName": "M. Fernando",
    "status": "published",
    "dateAdded": "2026-10-17"
  },
  {
    "id": "res-10",
    "title": "O/L Mathematics \u2014 2022 Past Paper & Mentor Solutions",
    "titleSi": "සා/පෙළ ගණිතය — 2022 පසුගිය ප්‍රශ්න පත්‍රය සහ උපදේශක විසඳුම්",
    "descSi": "රුහුණ විශ්වවිද්‍යාල ශිෂ්‍ය උපදේශක විසඳුම් සමඟින් I කොටස (කෙටි ප්‍රශ්න) සහ II කොටස (ව්‍යුහගත ගැටළු) ඇතුළත් සම්පූර්ණ 2022 අ.පො.ස. සාමාන්‍ය පෙළ ගණිත ප්‍රශ්න පත්‍රය.",
    "subject": "Mathematics",
    "subjectKey": "mathematics",
    "type": "Past Paper",
    "typeKey": "past-papers",
    "year": "2022",
    "grade": "Grade 10 & 11",
    "size": "2.1 MB",
    "desc": "Full G.C.E. Ordinary Level Mathematics examination paper from 2022 including Part I (short questions) and Part II structured problems with Ruhuna mentor solutions.",
    "topics": "mathematics past paper 2022 solutions part I part II algebra geometry trigonometry arithmetic",
    "downloadUrl": "#download-maths-2022-pastpaper",
    "ownerId": "usr-coord-2",
    "ownerName": "S. Jayasuriya",
    "status": "published",
    "dateAdded": "2026-10-16"
  },
  {
    "id": "res-11",
    "title": "O/L Science \u2014 2022 Past Paper (Parts I & II)",
    "titleSi": "සා/පෙළ විද්‍යාව — 2022 පසුගිය ප්‍රශ්න පත්‍රය (I සහ II කොටස්)",
    "descSi": "බහුවරණ ප්‍රශ්න, ව්‍යුහගත රචනා සහ නිවැරදි පිළිතුරු ලිවීමේ උපදෙස් ඇතුළත් සම්පූර්ණ 2022 සා/පෙළ විද්‍යාව පසුගිය ප්‍රශ්න පත්‍රය.",
    "subject": "Science",
    "subjectKey": "science",
    "type": "Past Paper",
    "typeKey": "past-papers",
    "year": "2022",
    "grade": "Grade 10 & 11",
    "size": "2.5 MB",
    "desc": "Complete 2022 G.C.E. O/L Science past paper covering multiple-choice questions, structured essays, and university mentor guidance on answering precision.",
    "topics": "science past paper 2022 mcq structured essay physics chemistry biology answers",
    "downloadUrl": "#download-sci-2022-pastpaper",
    "ownerId": "usr-coord-1",
    "ownerName": "K. L. Perera",
    "status": "published",
    "dateAdded": "2026-10-15"
  },
  {
    "id": "res-12",
    "title": "Mathematics Revision Materials \u2014 Geometric Theorems & Proofs",
    "titleSi": "ගණිතය පුනරීක්ෂණ ද්‍රව්‍ය — ජ්‍යාමිතික ප්‍රමේයයන් සහ සාධන",
    "descSi": "වෘත්ත ප්‍රමේයයන්, චක්‍රීය චතුරස්‍ර, ස්පර්ශක සහ සම්මත සාධන පියවර රූප සටහන් ආධාරයෙන් පැහැදිලි කරන ඉක්මන් පුනරීක්ෂණ පොත් පිංච.",
    "subject": "Mathematics",
    "subjectKey": "mathematics",
    "type": "Revision Materials",
    "typeKey": "revision-materials",
    "year": "2024",
    "grade": "Grade 10 & 11",
    "size": "2.2 MB",
    "desc": "Visual quick-reference booklet covering circle theorems, cyclic quadrilaterals, tangents, and standard rider proof steps with diagrammatic aids.",
    "topics": "mathematics geometry circle theorems cyclic quadrilaterals riders proofs tangents revision guide",
    "downloadUrl": "#download-maths-geometry-theorems",
    "ownerId": "usr-coord-3",
    "ownerName": "M. Fernando",
    "status": "published",
    "dateAdded": "2026-10-14"
  },
  {
    "id": "res-13",
    "title": "O/L Science \u2014 2021 Marking Scheme & Examiner Comments",
    "titleSi": "සා/පෙළ විද්‍යාව — 2021 ලකුණු දීමේ පටිපාටිය සහ පරීක්ෂක සටහන්",
    "descSi": "සම්මත ශ්‍රේණිගත කිරීමේ නිර්ණායක සහ උපදේශක සටහන් සහිත 2021 සා/පෙළ විද්‍යා ප්‍රශ්න පත්‍රය සඳහා වන පියවරෙන් පියවර ලකුණු දීමේ මාර්ගෝපදේශය.",
    "subject": "Science",
    "subjectKey": "science",
    "type": "Marking Scheme",
    "typeKey": "marking-schemes",
    "year": "2021",
    "grade": "Grade 10 & 11",
    "size": "1.5 MB",
    "desc": "Step-by-step marking guidelines for the 2021 O/L Science paper with university undergraduate mentor notes detailing standard grading rubrics.",
    "topics": "science marking scheme 2021 examiner comments grading rubrics physics chemistry biology",
    "downloadUrl": "#download-sci-2021-marking-scheme",
    "ownerId": "usr-coord-1",
    "ownerName": "K. L. Perera",
    "status": "published",
    "dateAdded": "2026-10-13"
  },
  {
    "id": "res-14",
    "title": "O/L Mathematics \u2014 2024 Model Examination Paper",
    "titleSi": "සා/පෙළ ගණිතය — 2024 ආදර්ශ විභාග ප්‍රශ්න පත්‍රය",
    "descSi": "සමබර I සහ II කොටස් බෙදාහැරීම් සහිත 2024 අ.පො.ස. සාමාන්‍ය පෙළ ගණිත විභාගය අනුකරණය කරන ජාතික මට්ටමේ ආදර්ශ ප්‍රශ්න පත්‍රය.",
    "subject": "Mathematics",
    "subjectKey": "mathematics",
    "type": "Model Paper",
    "typeKey": "model-papers",
    "year": "2024",
    "grade": "Grade 10 & 11",
    "size": "1.9 MB",
    "desc": "Comprehensive national-standard model paper simulating the 2024 G.C.E. O/L Mathematics examination with balanced Part I and Part II distributions.",
    "topics": "mathematics model paper 2024 exam simulation algebra geometry numbers matrices probability",
    "downloadUrl": "#download-maths-2024-model",
    "ownerId": "usr-coord-2",
    "ownerName": "S. Jayasuriya",
    "status": "published",
    "dateAdded": "2026-10-12"
  },
  {
    "id": "res-15",
    "title": "Science Revision Notes \u2014 Cellular Biology & Genetics",
    "titleSi": "විද්‍යාව පුනරීක්ෂණ සටහන් — සෛල ජීව විද්‍යාව සහ ප්‍රවේණිය",
    "descSi": "ශාක හා සත්ත්ව සෛල ව්‍යුහයන්, අනූනනය, ඌනනය, මෙන්ඩලීය ප්‍රවේණිය සහ ඒකමුහුම් අභිජනන ආවරණය වන ව්‍යුහගත පුනරීක්ෂණ සාරාංශය.",
    "subject": "Science",
    "subjectKey": "science",
    "type": "Notes",
    "typeKey": "notes",
    "year": "2024",
    "grade": "Grade 10 Biology",
    "size": "2.8 MB",
    "desc": "Structured revision summary covering plant and animal cell structures, organelles, mitosis, meiosis, Mendelian inheritance, and monohybrid crosses.",
    "topics": "science biology cells genetics inheritance mendel mitosis meiosis grade 10 notes",
    "downloadUrl": "#download-sci-cellular-genetics",
    "ownerId": "usr-coord-3",
    "ownerName": "M. Fernando",
    "status": "published",
    "dateAdded": "2026-10-11"
  },
  {
    "id": "res-16",
    "title": "O/L Mathematics \u2014 2021 Past Paper & Step-by-Step Solutions",
    "titleSi": "සා/පෙළ ගණිතය — 2021 පසුගිය ප්‍රශ්න පත්‍රය සහ පියවරෙන් පියවර විසඳුම්",
    "descSi": "සියලුම ප්‍රශ්න සඳහා විශ්වවිද්‍යාල ඉංජිනේරු ශිෂ්‍යයන් විසින් සම්පාදිත පියවරෙන් පියවර විසඳුම් සහිත 2021 සාමාන්‍ය පෙළ ගණිත නිල ප්‍රශ්න පත්‍රය.",
    "subject": "Mathematics",
    "subjectKey": "mathematics",
    "type": "Past Paper",
    "typeKey": "past-papers",
    "year": "2021",
    "grade": "Grade 10 & 11",
    "size": "2.3 MB",
    "desc": "Official 2021 G.C.E. Ordinary Level Mathematics examination with fully worked step-by-step solutions compiled by university engineering undergraduates.",
    "topics": "mathematics past paper 2021 worked solutions step by step national exam algebra geometry",
    "downloadUrl": "#download-maths-2021-pastpaper",
    "ownerId": "usr-coord-2",
    "ownerName": "S. Jayasuriya",
    "status": "published",
    "dateAdded": "2026-10-10"
  },
  {
    "id": "res-17",
    "title": "Science Model Paper \u2014 Physics Mechanics & Wave Optics",
    "titleSi": "විද්‍යාව ආදර්ශ ප්‍රශ්න පත්‍රය — භෞතික විද්‍යා යාන්ත්‍ර විද්‍යාව සහ තරංග ප්‍රකාශ විද්‍යාව",
    "descSi": "චලිත ප්‍රස්ථාර, ගම්‍යතාව, පරාවර්තනය, වර්තනය, කාච සහ විද්‍යුත් චුම්භක තරංග වර්ණාවලිය ආවරණය වන පිළිතුරු සහිත විශේෂිත භෞතික විද්‍යා ආදර්ශ ප්‍රශ්න පත්‍රය.",
    "subject": "Science",
    "subjectKey": "science",
    "type": "Model Paper",
    "typeKey": "model-papers",
    "year": "2023",
    "grade": "Grade 11 Physics",
    "size": "2.6 MB",
    "desc": "Specialised physics model paper covering motion graphs, momentum, reflection, refraction, lenses, and electromagnetic wave spectra with answer key.",
    "topics": "science physics model paper mechanics light optics lenses reflection refraction waves",
    "downloadUrl": "#download-sci-model-physics",
    "ownerId": "usr-coord-1",
    "ownerName": "K. L. Perera",
    "status": "published",
    "dateAdded": "2026-10-09"
  },
  {
    "id": "res-18",
    "title": "Mathematics Revision Guide \u2014 Probability & Cumulative Sets",
    "titleSi": "ගණිතය පුනරීක්ෂණ මාර්ගෝපදේශය — සම්භාවිතාව සහ කුලක",
    "descSi": "වෙන් රූප සටහන්, කුලක කර්ම, නියැදි අවකාශ, රුක් සටහන් සහ ස්වාධීන සිදුවීම් සම්භාවිතා ගණනය කිරීම් පිළිබඳ කෙටි පුනරීක්ෂණ මාර්ගෝපදේශය.",
    "subject": "Mathematics",
    "subjectKey": "mathematics",
    "type": "Revision Materials",
    "typeKey": "revision-materials",
    "year": "2023",
    "grade": "Grade 11",
    "size": "1.7 MB",
    "desc": "Concise review of Venn diagrams, set operations, sample spaces, tree diagrams, and independent event probability calculations with past exam problems.",
    "topics": "mathematics probability sets venn diagrams tree diagrams sample spaces statistics",
    "downloadUrl": "#download-maths-guide-probability",
    "ownerId": "usr-coord-3",
    "ownerName": "M. Fernando",
    "status": "published",
    "dateAdded": "2026-10-08"
  },
  {
    "id": "res-19",
    "title": "O/L Science \u2014 2024 National Syllabus Model Dossier",
    "titleSi": "සා/පෙළ විද්‍යාව — 2024 ජාතික විෂය නිර්දේශ ආදර්ශ ලේඛනය",
    "descSi": "ප්‍රායෝගික විද්‍යාත්මක යෙදීම්, ව්‍යුහගත රචනා සහ විශ්වවිද්‍යාල උපදේශක ලකුණු ලබාදීමේ නිර්ණායක ඇතුළත් සම්පූර්ණ 2024 ආදර්ශ විභාග ලේඛනය.",
    "subject": "Science",
    "subjectKey": "science",
    "type": "Model Paper",
    "typeKey": "model-papers",
    "year": "2024",
    "grade": "Grade 10 & 11",
    "size": "3.0 MB",
    "desc": "Full-length 2024 model examination dossier integrating real-life science applications, structured essays, and university mentor scoring criteria.",
    "topics": "science model paper 2024 dossier chemistry physics biology national syllabus",
    "downloadUrl": "#download-sci-2024-dossier",
    "ownerId": "usr-coord-1",
    "ownerName": "K. L. Perera",
    "status": "published",
    "dateAdded": "2026-10-07"
  },
  {
    "id": "res-20",
    "title": "Mathematics Notes \u2014 Commercial Arithmetic & Compound Interest",
    "titleSi": "ගණිතය සටහන් — වාණිජ ගණිතය සහ වැල් පොලිය",
    "descSi": "ප්‍රතිශත, බදු, රේගු ගාස්තු, වැල් පොලිය, හීනවන ශේෂ ක්ෂයවීම් සහ කොටස් වෙළඳපල ලාභාංශ සඳහා අත්‍යවශ්‍ය සූත්‍ර සහ විසඳූ උදාහරණ.",
    "subject": "Mathematics",
    "subjectKey": "mathematics",
    "type": "Notes",
    "typeKey": "notes",
    "year": "2023",
    "grade": "Grade 10 & 11",
    "size": "1.6 MB",
    "desc": "Essential formulae and worked examples for percentages, taxes, customs duty, compound interest, reducing balance depreciation, and share market dividends.",
    "topics": "mathematics commercial arithmetic interest taxes compound interest percentages finance notes",
    "downloadUrl": "#download-maths-notes-commercial",
    "ownerId": "usr-coord-3",
    "ownerName": "M. Fernando",
    "status": "published",
    "dateAdded": "2026-10-06"
  },
  {
    "id": "res-21",
    "title": "Science Revision Notes \u2014 Electricity, Magnetism & Circuits",
    "titleSi": "විද්‍යා පුනරීක්ෂණ සටහන් — විද්‍යුතය, චුම්භකත්වය සහ පරිපථ",
    "descSi": "ධාරාව, වෝල්ටීයතාව, ප්‍රතිරෝධය, ඕම්ගේ නියමය, ශ්‍රේණිගත/සමාන්තරගත පරිපථ, විද්‍යුත් චුම්භක ප්‍රේරණය සහ ගෘහ විදුලි රැහැන් ඇදීම පිළිබඳ විස්තීර්ණ සටහන්.",
    "subject": "Science",
    "subjectKey": "science",
    "type": "Notes",
    "typeKey": "notes",
    "year": "2022",
    "grade": "Grade 11 Physics",
    "size": "2.9 MB",
    "desc": "Comprehensive notes covering current, voltage, resistance, Ohm's law, series/parallel circuit analysis, electromagnetic induction, and domestic wiring.",
    "topics": "science physics electricity magnetism circuits ohms law electromagnetic induction notes",
    "downloadUrl": "#download-sci-notes-electricity",
    "ownerId": "usr-coord-3",
    "ownerName": "M. Fernando",
    "status": "published",
    "dateAdded": "2026-10-25"
  },
  {
    "id": "res-22",
    "title": "O/L Mathematics \u2014 2022 Marking Scheme & Answering Rubric",
    "titleSi": "සා/පෙළ ගණිතය — 2022 ලකුණු දීමේ පටිපාටිය සහ පිළිතුරු මාර්ගෝපදේශය",
    "descSi": "2022 සියලුම ප්‍රශ්න සඳහා ක්‍රම ලකුණු (M), නිරවද්‍යතා ලකුණු (A), සහ ස්වාධීන ලකුණු (B) බෙදාහැරීම් සහිත සම්පූර්ණ ලකුණු දීමේ පටිපාටිය.",
    "subject": "Mathematics",
    "subjectKey": "mathematics",
    "type": "Marking Scheme",
    "typeKey": "marking-schemes",
    "year": "2022",
    "grade": "Grade 11",
    "size": "1.3 MB",
    "desc": "Complete marking scheme with mark breakdowns for method marks (M), accuracy marks (A), and independent marks (B) across all 2022 questions.",
    "topics": "mathematics marking scheme 2022 rubric answers marks breakdown exam solutions",
    "downloadUrl": "#download-maths-2022-marking",
    "ownerId": "usr-coord-2",
    "ownerName": "S. Jayasuriya",
    "status": "published",
    "dateAdded": "2026-10-24"
  },
  {
    "id": "res-23",
    "title": "Science Concept Summary \u2014 Ecology, Biomes & Environment",
    "titleSi": "විද්‍යා සංකල්ප සාරාංශය — පරිසර විද්‍යාව, ජෛව කලාප සහ පරිසරය",
    "descSi": "ආහාර දාම, පරිසර පිරමිඩ, ජෛව භූ-රසායනික චක්‍ර, ශ්‍රී ලංකාවේ වනාන්තර ජෛව කලාප සහ ජෛව විවිධත්ව සංරක්ෂණය පිළිබඳ කෙටි සමාලෝචන සටහන්.",
    "subject": "Science",
    "subjectKey": "science",
    "type": "Notes",
    "typeKey": "notes",
    "year": "2023",
    "grade": "Grade 10 Biology",
    "size": "2.1 MB",
    "desc": "Quick review notes on food chains, ecological pyramids, biogeochemical cycles, Sri Lankan forest biomes, and human impacts on biodiversity conservation.",
    "topics": "science biology ecology ecosystems environment conservation biomes biodiversity",
    "downloadUrl": "#download-sci-ecology-summary",
    "ownerId": "usr-coord-3",
    "ownerName": "M. Fernando",
    "status": "published",
    "dateAdded": "2026-10-23"
  },
  {
    "id": "res-24",
    "title": "O/L Mathematics \u2014 2023 Model Paper (Part I Short Questions)",
    "titleSi": "සා/පෙළ ගණිතය — 2023 ආදර්ශ ප්‍රශ්න පත්‍රය (I කොටස කෙටි ප්‍රශ්න)",
    "descSi": "සියලුම මූලික ඒකක ආවරණය වන පරිදි ක්ෂණික පිළිතුරු සහ කෙටි ක්‍රම සහිත I කොටසේ කෙටි ප්‍රශ්න 50 ක දැඩි පුහුණු එකතුවක්.",
    "subject": "Mathematics",
    "subjectKey": "mathematics",
    "type": "Model Paper",
    "typeKey": "model-papers",
    "year": "2023",
    "grade": "Grade 10 & 11",
    "size": "1.4 MB",
    "desc": "Intensive practice collection of 50 timed Part I short questions covering all core units with instant answer keys and mentor shortcut techniques.",
    "topics": "mathematics model paper 2023 part I short questions speed techniques algebra geometry",
    "downloadUrl": "#download-maths-2023-part1-model",
    "ownerId": "usr-coord-2",
    "ownerName": "S. Jayasuriya",
    "status": "published",
    "dateAdded": "2026-10-22"
  },
  {
    "id": "res-25",
    "title": "Science Revision Materials \u2014 Periodic Table & Atomic Structure",
    "titleSi": "විද්‍යාව පුනරීක්ෂණ ද්‍රව්‍ය — ආවර්තිතා වගුව සහ පරමාණුක ව්‍යුහය",
    "descSi": "පළමු මූලද්‍රව්‍ය 20, ඉලෙක්ට්‍රොනික වින්‍යාසය, ආවර්තිතා ප්‍රවණතා, විද්‍යුත් සෘණතාව සහ අයනික/සහසංයුජ බන්ධන ආකෘති පිළිබඳ දෘශ්‍ය සටහන්.",
    "subject": "Science",
    "subjectKey": "science",
    "type": "Revision Materials",
    "typeKey": "revision-materials",
    "year": "2024",
    "grade": "Grade 10 & 11 Chemistry",
    "size": "2.5 MB",
    "desc": "Visual quick-reference charts for the first 20 elements, electron configurations, periodic trends, electronegativity, and ionic/covalent bonding models.",
    "topics": "science chemistry periodic table atomic structure electron configuration bonding revision guide",
    "downloadUrl": "#download-sci-periodic-table-guide",
    "ownerId": "usr-coord-3",
    "ownerName": "M. Fernando",
    "status": "published",
    "dateAdded": "2026-10-21"
  }
],
    quizzes: [
  {
    "id": "quiz-forces-motion",
    "title": "Forces & Motion",
    "titleSi": "බල සහ චලිතය",
    "topicSi": "භෞතික විද්‍යාව",
    "descSi": "නිව්ටන්ගේ චලිත නියම, වේගය, ප්‍රවේගය, ඒකාකාර ත්වරණය සහ සරල රේඛීය යාන්ත්‍ර විද්‍යාවේ සම්ප්‍රයුක්ත බල ගවේෂණය කරන්න.",
    "subject": "Science",
    "subjectKey": "science",
    "topic": "Physics",
    "difficulty": "Medium",
    "difficultyBadge": "badge--medium",
    "desc": "Explore Newton's laws of motion, speed, velocity, uniform acceleration and resultant forces in straight-line mechanics.",
    "questionsCount": 5,
    "duration": "~12 min",
    "questions": [
      {
        "text": "An object of mass 4 kg initially at rest on a smooth horizontal surface is acted upon by a constant horizontal resultant force of 12 N. What is the velocity of the object after 5 seconds?",
        "textSi": "සුමට තිරස් පෘෂ්ඨයක් මත මුලින් නිශ්චලතාවයේ තිබූ 4 kg ස්කන්ධයක් සහිත වස්තුවක් මත 12 N නියත තිරස් සම්ප්‍රයුක්ත බලයක් ක්‍රියා කරයි. තත්පර 5 කට පසු වස්තුවේ ප්‍රවේගය කුමක්ද?",
        "syllabus": "Grade 11 Science \u2022 Unit 03: Motion in a Straight Line",
        "syllabusSi": "11 ශ්‍රේණිය විද්‍යාව • 03 ඒකකය: සරල රේඛීය චලිතය",
        "optionsSi": [
          "3 m s\u207b\u00b9",
          "15 m s\u207b\u00b9",
          "20 m s\u207b\u00b9",
          "23 m s\u207b\u00b9"
        ],
        "options": [
          "3 m s\u207b\u00b9",
          "15 m s\u207b\u00b9",
          "20 m s\u207b\u00b9",
          "23 m s\u207b\u00b9"
        ],
        "correct": 1,
        "explanation": "Resultant acceleration is determined by Newton's Second Law: a = F / m = 12 N / 4 kg = 3 m s\u207b\u00b2. Under constant acceleration starting from rest (u = 0): v = u + at = 0 + (3 m s\u207b\u00b2 \u00d7 5 s) = 15 m s\u207b\u00b9.",
        "explanationSi": "නිව්ටන්ගේ දෙවන චලිත නියමයට අනුව සම්ප්‍රයුක්ත ත්වරණය: a = F / m = 12 N / 4 kg = 3 m s⁻². වස්තුව නිශ්චලතාවයෙන් ආරම්භ වන බැවින් (u = 0): v = u + at = 0 + (3 m s⁻² × 5 s) = 15 m s⁻¹."
      },
      {
        "text": "When a moving passenger bus applies brakes suddenly, standing passengers tend to stumble forward. Which property of matter explains this phenomenon?",
        "textSi": "ධාවනය වන මගී බස් රථයක් හදිසියේ තිරිංග යෙදූ විට, හිටගෙන සිටින මගීන් ඉදිරියට නැඹුරු වන්නේ පදාර්ථයේ කුමන ගුණය නිසාද?",
        "syllabus": "Grade 11 Science \u2022 Newton's First Law & Inertia",
        "syllabusSi": "11 ශ්‍රේණිය විද්‍යාව • නිව්ටන්ගේ පළමු නියමය සහ අවස්ථිතිය",
        "optionsSi": [
          "පෘථිවියේ ගුරුත්වාකර්ෂණ බලය",
          "චලිත අවස්ථිතිය",
          "පාවහන් සහ බස් රථයේ බිම අතර ඝර්ෂණය",
          "ක්‍රියා-ප්‍රතික්‍රියා බල යුගලය"
        ],
        "options": [
          "Gravitational pull of the earth",
          "Inertia of motion",
          "Friction between shoes and the bus floor",
          "Action-reaction pair forces"
        ],
        "correct": 1,
        "explanation": "According to Newton's First Law, an object continues in its state of uniform motion unless acted upon by an external resultant force. When the bus stops, the passengers' bodies retain inertia of motion and tend to continue moving forward.",
        "explanationSi": "නිව්ටන්ගේ පළමු චලිත නියමයට අනුව, බාහිර අසමතුලිත බලයක් ක්‍රියා නොකරන තාක් වස්තුවක් ඒකාකාර ප්‍රවේගයෙන් චලනය වේ. බස් රථය නතර වන විට මගීන්ගේ ශරීර චලිත අවස්ථිතිය නිසා දිගටම ඉදිරියට ගමන් කිරීමට උත්සාහ කරයි."
      },
      {
        "text": "A motor vehicle accelerates uniformly in a straight line from 10 m s\u207b\u00b9 to 30 m s\u207b\u00b9 in a duration of 4 seconds. What is the acceleration of the vehicle?",
        "syllabus": "Grade 11 Science \u2022 Linear Kinematics",
        "options": [
          "2.5 m s\u207b\u00b2",
          "4.0 m s\u207b\u00b2",
          "5.0 m s\u207b\u00b2",
          "10.0 m s\u207b\u00b2"
        ],
        "correct": 2,
        "explanation": "Acceleration is rate of change of velocity: a = (v - u) / t = (30 m s\u207b\u00b9 - 10 m s\u207b\u00b9) / 4 s = 20 / 4 = 5.0 m s\u207b\u00b2."
      },
      {
        "text": "An aircraft cruises horizontally in a straight line at a constant speed of 850 km h\u207b\u00b9. What is the net resultant force acting on the aircraft?",
        "syllabus": "Grade 11 Science \u2022 Balanced & Unbalanced Forces",
        "options": [
          "0 N",
          "Equal to the engine thrust force",
          "Equal to the total aircraft weight",
          "850 N"
        ],
        "correct": 0,
        "explanation": "When an object moves with constant velocity (constant speed in an unchanging direction), acceleration is zero. By Newton's First Law (F_net = m \u00b7 a), the net resultant force acting on the aircraft must be 0 N."
      },
      {
        "text": "An astronaut has a mass of 60 kg on Earth. If the gravitational field strength on the surface of the Moon is 1.6 N kg\u207b\u00b9, what is the weight of the astronaut on the Moon?",
        "syllabus": "Grade 10 Science \u2022 Mass and Weight",
        "options": [
          "60 N",
          "96 N",
          "375 N",
          "600 N"
        ],
        "correct": 1,
        "explanation": "Mass is an intrinsic property that remains constant (m = 60 kg). Weight is gravitational force: W = m \u00b7 g = 60 kg \u00d7 1.6 N kg\u207b\u00b9 = 96 N."
      }
    ],
    "ownerId": "usr-coord-1",
    "ownerName": "K. L. Perera",
    "status": "published",
    "dateAdded": "2026-10-24"
  },
  {
    "id": "quiz-chemical-reactions",
    "title": "Chemical Reactions & Acids",
    "titleSi": "රසායනික ප්‍රතික්‍රියා සහ අම්ල",
    "topicSi": "රසායන විද්‍යාව",
    "descSi": "රසායනික ප්‍රතික්‍රියා වර්ගීකරණය, සමීකරණ තුලනය, pH පරිමාණය සහ අම්ල-භස්ම උදාසීනීකරණය පරීක්ෂා කරන්න.",
    "subject": "Science",
    "subjectKey": "science",
    "topic": "Chemistry",
    "difficulty": "Challenging",
    "difficultyBadge": "badge--challenging",
    "desc": "Test your grasp of chemical reaction types, balancing complex equations, the pH scale, and metal displacement.",
    "questionsCount": 5,
    "duration": "~15 min",
    "questions": [
      {
        "text": "When magnesium ribbon is heated in air, it burns with a dazzling white flame to produce magnesium oxide: 2Mg + O\u2082 \u2192 2MgO. Which type of chemical reaction is this?",
        "syllabus": "Grade 11 Science \u2022 Chemical Reaction Classifications",
        "options": [
          "Decomposition reaction",
          "Combination (Synthesis) reaction",
          "Displacement reaction",
          "Neutralisation reaction"
        ],
        "correct": 1,
        "explanation": "Two pure elemental substances (Mg and O\u2082) react to form a single chemical compound (MgO). This fits the pattern A + B \u2192 AB, which is a combination (synthesis) reaction."
      },
      {
        "text": "When balancing the chemical reaction Fe + Cl\u2082 \u2192 FeCl\u2083, which set of coefficients balances the equation in order?",
        "syllabus": "Grade 11 Science \u2022 Balancing Chemical Equations",
        "options": [
          "1, 1, 1",
          "2, 3, 2",
          "3, 2, 3",
          "2, 2, 2"
        ],
        "correct": 1,
        "explanation": "To balance chlorine atoms, take LCM of 2 and 3, which is 6: 3Cl\u2082 gives 6 Cl atoms, and 2FeCl\u2083 gives 6 Cl atoms. Balance iron with 2Fe on the left: 2Fe + 3Cl\u2082 \u2192 2FeCl\u2083."
      },
      {
        "text": "What is the pH value of a neutral aqueous solution at a standard temperature of 25 \u00b0C?",
        "syllabus": "Grade 11 Science \u2022 Acids, Bases & the pH Scale",
        "options": [
          "pH = 0",
          "pH = 1",
          "pH = 7",
          "pH = 14"
        ],
        "correct": 2,
        "explanation": "In pure neutral water at 25 \u00b0C, [H\u207a] = [OH\u207b] = 1.0 \u00d7 10\u207b\u2077 mol dm\u207b\u00b3. The negative logarithm pH = -log\u2081\u2080(10\u207b\u2077) = 7.0."
      },
      {
        "text": "When dilute hydrochloric acid is poured over calcium carbonate chips, gas bubbles form vigorously. The released gas turns lime water milky. Identify this gas:",
        "syllabus": "Grade 11 Science \u2022 Gas Identification & Salt Properties",
        "options": [
          "Hydrogen (H\u2082)",
          "Oxygen (O\u2082)",
          "Carbon dioxide (CO\u2082)",
          "Chlorine (Cl\u2082)"
        ],
        "correct": 2,
        "explanation": "Carbonate + Acid \u2192 Salt + Water + Carbon Dioxide. CaCO\u2083 + 2HCl \u2192 CaCl\u2082 + H\u2082O + CO\u2082. Carbon dioxide reacts with aqueous calcium hydroxide Ca(OH)\u2082 to precipitate insoluble white CaCO\u2083, turning the solution milky."
      },
      {
        "text": "According to the electrochemical activity series of metals, which metal will displace copper from an aqueous solution of copper(II) sulfate (CuSO\u2084)?",
        "syllabus": "Grade 11 Science \u2022 Reactivity Series of Metals",
        "options": [
          "Silver (Ag)",
          "Gold (Au)",
          "Zinc (Zn)",
          "Platinum (Pt)"
        ],
        "correct": 2,
        "explanation": "Zinc (Zn) is positioned significantly higher than copper (Cu) in the reactivity series. Therefore, zinc oxidises and displaces copper: Zn(s) + CuSO\u2084(aq) \u2192 ZnSO\u2084(aq) + Cu(s). Silver, gold, and platinum are less reactive than copper."
      }
    ],
    "ownerId": "usr-coord-1",
    "ownerName": "K. L. Perera",
    "status": "published",
    "dateAdded": "2026-10-23"
  },
  {
    "id": "quiz-cellular-biology",
    "title": "Cell Biology & Human Body",
    "titleSi": "සෛල ජීව විද්‍යාව සහ මානව දේහය",
    "topicSi": "ජීව විද්‍යාව",
    "descSi": "සෛල ව්‍යුහය, සෛල විභාජනය (අනූනනය/ඌනනය), සංසරණ සහ ශ්වසන පද්ධති ආශ්‍රිත සංකල්ප ඇගයීම.",
    "subject": "Science",
    "subjectKey": "science",
    "topic": "Biology",
    "difficulty": "Medium",
    "difficultyBadge": "badge--medium",
    "desc": "Check your understanding of organelle functions, circulatory pathways, digestive enzymes, and plant osmosis.",
    "questionsCount": 5,
    "duration": "~12 min",
    "questions": [
      {
        "text": "Which organelle is considered the powerhouse of eukaryotic cells, responsible for generating ATP through cellular respiration?",
        "syllabus": "Grade 10 Science \u2022 Cell Structure & Organelles",
        "options": [
          "Ribosome",
          "Endoplasmic reticulum",
          "Mitochondrion",
          "Golgi body"
        ],
        "correct": 2,
        "explanation": "Mitochondria perform aerobic cellular respiration, oxidising glucose and fatty acids to produce adenosine triphosphate (ATP), the primary energy carrier of living cells."
      },
      {
        "text": "Which blood vessel transports freshly oxygenated blood from the lungs directly into the left atrium of the human heart?",
        "syllabus": "Grade 10 Science \u2022 Human Circulatory System",
        "options": [
          "Pulmonary artery",
          "Pulmonary vein",
          "Aorta",
          "Superior vena cava"
        ],
        "correct": 1,
        "explanation": "The pulmonary veins are unique among veins in carrying oxygen-rich blood from the pulmonary capillary beds in the lungs into the left atrium of the heart."
      },
      {
        "text": "Which digestive enzyme present in human saliva begins the chemical digestion of cooked starch into maltose?",
        "syllabus": "Grade 10 Science \u2022 Human Digestive System",
        "options": [
          "Pepsin",
          "Salivary amylase (ptyalin)",
          "Trypsin",
          "Lipase"
        ],
        "correct": 1,
        "explanation": "Salivary amylase (ptyalin), secreted by salivary glands in the mouth cavity, hydrolyses \u03b1-1,4-glycosidic bonds in cooked starch to produce maltose disaccharides."
      },
      {
        "text": "What happens to a healthy plant cell when it is placed into a hypertonic (concentrated salt) solution?",
        "syllabus": "Grade 10 Science \u2022 Osmosis in Plant Tissues",
        "options": [
          "The cell bursts due to osmotic lysis",
          "The cell becomes fully turgid",
          "Plasmolysis occurs as water leaves the central vacuole",
          "No movement of water takes place"
        ],
        "correct": 2,
        "explanation": "Water flows out of the cell down its water potential gradient via osmosis. As the central vacuole empties, the cytoplasm shrinks away from the cell wall, causing plasmolysis."
      },
      {
        "text": "In terrestrial plant leaves, which specialized epidermal cells regulate the opening and closing of stomata for gas exchange?",
        "syllabus": "Grade 11 Science \u2022 Transpiration & Gas Exchange",
        "options": [
          "Sieve tube cells",
          "Guard cells",
          "Xylem tracheids",
          "Palisade mesophyll cells"
        ],
        "correct": 1,
        "explanation": "Each stomatal pore is flanked by a pair of chloroplast-containing guard cells. Changes in internal turgor pressure cause guard cells to bow outward, opening or closing the pore."
      }
    ],
    "ownerId": "usr-coord-1",
    "ownerName": "K. L. Perera",
    "status": "published",
    "dateAdded": "2026-10-22"
  },
  {
    "id": "quiz-work-energy-power",
    "title": "Work, Energy & Power",
    "titleSi": "කාර්යය, ශක්තිය සහ ක්ෂමතාව",
    "topicSi": "භෞතික විද්‍යාව",
    "descSi": "කාර්යය ගණනය, විභව සහ චාලක ශක්තිය, ශක්ති සංස්ථිති නියමය සහ යාන්ත්‍රික ක්ෂමතාව පරීක්ෂා කරන්න.",
    "subject": "Science",
    "subjectKey": "science",
    "topic": "Physics",
    "difficulty": "Medium",
    "difficultyBadge": "badge--medium",
    "desc": "Calculate mechanical work, kinetic energy, gravitational potential energy, and understand power output.",
    "questionsCount": 5,
    "duration": "~12 min",
    "questions": [
      {
        "text": "A horizontal force of 25 N moves an object by 4 metres in the direction of the force. What is the total work done?",
        "syllabus": "Grade 11 Science \u2022 Mechanical Work",
        "options": [
          "6.25 J",
          "29 J",
          "100 J",
          "1000 J"
        ],
        "correct": 2,
        "explanation": "Work Done W = F \u00b7 s = 25 N \u00d7 4 m = 100 Joules (J)."
      },
      {
        "text": "What is the kinetic energy of an object of mass 2 kg moving with a uniform velocity of 4 m s\u207b\u00b9?",
        "syllabus": "Grade 11 Science \u2022 Kinetic Energy",
        "options": [
          "8 J",
          "16 J",
          "32 J",
          "64 J"
        ],
        "correct": 1,
        "explanation": "Kinetic Energy KE = 0.5 \u00b7 m \u00b7 v\u00b2 = 0.5 \u00d7 2 kg \u00d7 (4 m s\u207b\u00b9)\u00b2 = 1 \u00d7 16 = 16 Joules (J)."
      },
      {
        "text": "An object of mass 5 kg is raised vertically through a height of 3 metres in a gravitational field of g = 10 N kg\u207b\u00b9. What is its gained gravitational potential energy?",
        "syllabus": "Grade 11 Science \u2022 Potential Energy",
        "options": [
          "15 J",
          "50 J",
          "150 J",
          "300 J"
        ],
        "correct": 2,
        "explanation": "Potential Energy PE = m \u00b7 g \u00b7 h = 5 kg \u00d7 10 N kg\u207b\u00b9 \u00d7 3 m = 150 Joules (J)."
      },
      {
        "text": "An electric crane lifts a concrete beam performing 6000 J of work in a time interval of 12 seconds. What is the power output of the crane?",
        "syllabus": "Grade 11 Science \u2022 Power & Efficiency",
        "options": [
          "50 W",
          "500 W",
          "720 W",
          "72000 W"
        ],
        "correct": 1,
        "explanation": "Power P = Work Done / Time = 6000 J / 12 s = 500 Watts (W)."
      },
      {
        "text": "According to the Law of Conservation of Energy, which statement is true for an ideal falling pendulum without air resistance?",
        "syllabus": "Grade 11 Science \u2022 Conservation of Energy",
        "options": [
          "Total mechanical energy increases steadily",
          "Total mechanical energy remains constant",
          "Potential energy and kinetic energy both increase",
          "Kinetic energy is destroyed at the bottom"
        ],
        "correct": 1,
        "explanation": "Energy can neither be created nor destroyed; it merely transforms. In an ideal system, the sum of kinetic energy and potential energy remains constant at every point in motion."
      }
    ],
    "ownerId": "usr-coord-1",
    "ownerName": "K. L. Perera",
    "status": "published",
    "dateAdded": "2026-10-21"
  },
  {
    "id": "quiz-periodic-table-bonding",
    "title": "Periodic Table & Bonding",
    "titleSi": "ආවර්තිතා වගුව සහ රසායනික බන්ධන",
    "topicSi": "රසායන විද්‍යාව",
    "descSi": "ඉලෙක්ට්‍රොනික වින්‍යාසය, ආවර්තිතා ප්‍රවණතා, විද්‍යුත් සෘණතාව, සහ සහසංයුජ/අයනික බන්ධන පිළිබඳ ප්‍රශ්න.",
    "subject": "Science",
    "subjectKey": "science",
    "topic": "Chemistry",
    "difficulty": "Easy",
    "difficultyBadge": "badge--easy",
    "desc": "Review electronic configurations of elements 1-20, octet rules, ionic bonding, and covalent molecules.",
    "questionsCount": 5,
    "duration": "~10 min",
    "questions": [
      {
        "text": "What is the ground-state electron configuration of a Sodium atom (Na) having an atomic number of 11?",
        "syllabus": "Grade 10 Science \u2022 Atomic Structure & Configurations",
        "options": [
          "2, 8, 1",
          "2, 9",
          "2, 8, 2",
          "1, 8, 2"
        ],
        "correct": 0,
        "explanation": "Sodium has 11 electrons. The maximum capacity of shells is 2 in the first shell, 8 in the second shell, and the remaining 1 in the third shell: (2, 8, 1)."
      },
      {
        "text": "Which group in the modern Periodic Table contains noble (inert) gases with complete outer electron shells?",
        "syllabus": "Grade 10 Science \u2022 Periodic Table Groups",
        "options": [
          "Group I",
          "Group II",
          "Group VII",
          "Group VIII (Group 18)"
        ],
        "correct": 3,
        "explanation": "Group VIII (Group 18) elements (Helium, Neon, Argon) have stable outer octet configurations (or duplet for He), making them chemically inert."
      },
      {
        "text": "When sodium (a metal) reacts with chlorine (a non-metal), which type of chemical bond is formed by electron transfer?",
        "syllabus": "Grade 10 Science \u2022 Chemical Bonding",
        "options": [
          "Covalent bond",
          "Ionic (electrovalent) bond",
          "Metallic bond",
          "Hydrogen bond"
        ],
        "correct": 1,
        "explanation": "Sodium loses 1 electron to form Na\u207a, and Chlorine gains 1 electron to form Cl\u207b. The strong electrostatic attraction between opposite ions forms an ionic bond."
      },
      {
        "text": "In a molecule of water (H\u2082O), the chemical bonds between the oxygen atom and hydrogen atoms are formed by:",
        "syllabus": "Grade 10 Science \u2022 Covalent Bonding",
        "options": [
          "Complete transfer of electrons",
          "Sharing of electron pairs",
          "Magnetic attraction",
          "Proton exchange"
        ],
        "correct": 1,
        "explanation": "Non-metal atoms share pairs of valence electrons to achieve stable noble-gas configurations, forming covalent bonds."
      },
      {
        "text": "How many valence electrons does an Oxygen atom (atomic number 8, electron configuration 2, 6) possess?",
        "syllabus": "Grade 10 Science \u2022 Valence Electrons",
        "options": [
          "2",
          "4",
          "6",
          "8"
        ],
        "correct": 2,
        "explanation": "Valence electrons are electrons located in the outermost electron shell. Oxygen has 6 electrons in its outermost shell."
      }
    ],
    "ownerId": "usr-coord-1",
    "ownerName": "K. L. Perera",
    "status": "published",
    "dateAdded": "2026-10-20"
  },
  {
    "id": "quiz-nervous-system-senses",
    "title": "Nervous System & Senses",
    "titleSi": "ස්නායු පද්ධතිය සහ සංවේදක ඉන්ද්‍රියයන්",
    "topicSi": "ජීව විද්‍යාව",
    "descSi": "ස්නායු ආවේග, ප්‍රත්‍යාවර්ත චාප, මිනිස් ඇස සහ කණෙහි ව්‍යුහය හා කාර්යයන් පිළිබඳ ඇගයීම.",
    "subject": "Science",
    "subjectKey": "science",
    "topic": "Biology",
    "difficulty": "Challenging",
    "difficultyBadge": "badge--challenging",
    "desc": "Test your knowledge of neuron anatomy, reflex action pathways, eye optics, and brain coordination functions.",
    "questionsCount": 5,
    "duration": "~14 min",
    "questions": [
      {
        "text": "What is the primary structural and functional cellular unit of the human nervous system?",
        "syllabus": "Grade 11 Science \u2022 Human Nervous System",
        "options": [
          "Nephron",
          "Neuron (Nerve cell)",
          "Myocyte",
          "Osteocyte"
        ],
        "correct": 1,
        "explanation": "The neuron (nerve cell) is the fundamental functional unit of nervous tissue, specialized for transmitting electrical nerve impulses."
      },
      {
        "text": "What is the correct sequential pathway of nerve impulses in a spinal reflex arc?",
        "syllabus": "Grade 11 Science \u2022 Reflex Action Pathways",
        "options": [
          "Receptor \u2192 Sensory neuron \u2192 Interneuron \u2192 Motor neuron \u2192 Effector",
          "Effector \u2192 Motor neuron \u2192 Sensory neuron \u2192 Receptor",
          "Receptor \u2192 Motor neuron \u2192 Interneuron \u2192 Sensory neuron \u2192 Effector",
          "Brain \u2192 Sensory neuron \u2192 Effector \u2192 Motor neuron"
        ],
        "correct": 0,
        "explanation": "In a reflex arc: Stimulus detected by Receptor \u2192 transmitted along Sensory neuron to spinal cord \u2192 passed via Interneuron (relay neuron) \u2192 transmitted via Motor neuron to Effector (muscle or gland) to produce instant response."
      },
      {
        "text": "Which structure of the human eye focuses refracted light rays onto the photosensitive retina?",
        "syllabus": "Grade 11 Science \u2022 Sensory Organs (Eye)",
        "options": [
          "Iris",
          "Crystalline lens",
          "Sclera",
          "Pupil"
        ],
        "correct": 1,
        "explanation": "The flexible biconvex crystalline lens, whose curvature is adjusted by ciliary muscles, provides fine focusing of light rays onto the retina."
      },
      {
        "text": "Which major part of the human brain is primarily responsible for motor coordination, balance, and posture?",
        "syllabus": "Grade 11 Science \u2022 Brain Functions",
        "options": [
          "Cerebrum",
          "Cerebellum",
          "Medulla oblongata",
          "Hypothalamus"
        ],
        "correct": 1,
        "explanation": "The cerebellum coordinates voluntary muscle movements, maintenance of balance, equilibrium, and precise posture."
      },
      {
        "text": "Which endocrine gland is located at the base of the brain and often termed the master gland because its hormones regulate other endocrine glands?",
        "syllabus": "Grade 11 Science \u2022 Endocrine System",
        "options": [
          "Thyroid gland",
          "Adrenal gland",
          "Pituitary gland",
          "Pancreas"
        ],
        "correct": 2,
        "explanation": "The pituitary gland secretes tropic hormones (such as TSH, ACTH, and growth hormone) that regulate the activity of other endocrine glands throughout the body."
      }
    ],
    "ownerId": "usr-coord-1",
    "ownerName": "K. L. Perera",
    "status": "published",
    "dateAdded": "2026-10-19"
  },
  {
    "id": "quiz-algebra-fundamentals",
    "title": "Algebra Fundamentals",
    "titleSi": "වීජ ගණිතයේ මූලිකාංග",
    "topicSi": "වීජ ගණිතය",
    "descSi": "වීජීය ප්‍රකාශන සරල කිරීම, රේඛීය සමීකරණ විසඳීම සහ වර්ගජ ප්‍රකාශන සාධක වෙන් කිරීම ප්‍රගුණ කරන්න.",
    "subject": "Mathematics",
    "subjectKey": "mathematics",
    "topic": "Algebra",
    "difficulty": "Easy",
    "difficultyBadge": "badge--easy",
    "desc": "Master simplifying algebraic expressions, solving linear equations, and factorising quadratic expressions.",
    "questionsCount": 5,
    "duration": "~10 min",
    "questions": [
      {
        "text": "What is the value of x that satisfies the linear equation: 3x + 5 = 20?",
        "syllabus": "Grade 10 Mathematics \u2022 Linear Equations",
        "options": [
          "x = 3",
          "x = 5",
          "x = 7",
          "x = 15"
        ],
        "correct": 1,
        "explanation": "Subtract 5 from both sides: 3x = 20 - 5 \u2192 3x = 15. Divide both sides by 3: x = 15 / 3 = 5."
      },
      {
        "text": "Simplify the algebraic expression: 4(2a - 3b) - 2(a - 5b)",
        "syllabus": "Grade 10 Mathematics \u2022 Algebraic Expressions",
        "options": [
          "6a - 2b",
          "6a - 22b",
          "8a + 2b",
          "10a - 2b"
        ],
        "correct": 0,
        "explanation": "Expand brackets carefully: 8a - 12b - 2a + 10b. Group like terms: (8a - 2a) + (-12b + 10b) = 6a - 2b."
      },
      {
        "text": "What is the largest integer value of x that satisfies the linear inequality: 2x - 7 < 5?",
        "syllabus": "Grade 10 Mathematics \u2022 Linear Inequalities",
        "options": [
          "4",
          "5",
          "6",
          "7"
        ],
        "correct": 1,
        "explanation": "Add 7 to both sides: 2x < 12. Divide both sides by 2: x < 6. Since x must be strictly less than 6, the largest integer value is 5."
      },
      {
        "text": "Factorise completely: 6x\u00b2 - 9xy",
        "syllabus": "Grade 10 Mathematics \u2022 Factorisation",
        "options": [
          "3(2x\u00b2 - 3xy)",
          "x(6x - 9y)",
          "3x(2x - 3y)",
          "3xy(2x - 3)"
        ],
        "correct": 2,
        "explanation": "Find the highest common factor (HCF) of 6x\u00b2 and 9xy, which is 3x. Dividing each term by 3x yields 3x(2x - 3y)."
      },
      {
        "text": "Simplify the algebraic fraction: (x\u00b2 - 9) / (x + 3), where x \u2260 -3",
        "syllabus": "Grade 11 Mathematics \u2022 Algebraic Fractions",
        "options": [
          "x + 3",
          "x - 3",
          "x - 9",
          "1 / (x + 3)"
        ],
        "correct": 1,
        "explanation": "Recognise the difference of two squares: x\u00b2 - 9 = (x - 3)(x + 3). Cancel the common factor (x + 3): (x - 3)(x + 3) / (x + 3) = x - 3."
      }
    ],
    "ownerId": "usr-coord-2",
    "ownerName": "S. Jayasuriya",
    "status": "published",
    "dateAdded": "2026-10-18"
  },
  {
    "id": "quiz-geometry-measurement",
    "title": "Geometry & Measurement",
    "titleSi": "ජ්‍යාමිතිය සහ මිනුම්",
    "topicSi": "ජ්‍යාමිතිය",
    "descSi": "බහුඅස්‍රවල අභ්‍යන්තර කෝණ, පයිතගරස් ප්‍රමේයය, වෘත්ත ප්‍රමේය සහ ඝන වස්තු මිනුම් ආශ්‍රිත ගැටලු විසඳන්න.",
    "subject": "Mathematics",
    "subjectKey": "mathematics",
    "topic": "Geometry",
    "difficulty": "Medium",
    "difficultyBadge": "badge--medium",
    "desc": "Solve problems involving interior angles of polygons, Pythagorean theorem, circle theorems, and solid mensuration.",
    "questionsCount": 5,
    "duration": "~12 min",
    "questions": [
      {
        "text": "What is the sum of the interior angles of a regular convex hexagon (6-sided polygon)?",
        "syllabus": "Grade 10 Mathematics \u2022 Polygon Angles",
        "options": [
          "360\u00b0",
          "540\u00b0",
          "720\u00b0",
          "1080\u00b0"
        ],
        "correct": 2,
        "explanation": "The formula for the sum of interior angles of an n-sided polygon is (n - 2) \u00d7 180\u00b0. For a hexagon (n = 6): (6 - 2) \u00d7 180\u00b0 = 4 \u00d7 180\u00b0 = 720\u00b0."
      },
      {
        "text": "In a right-angled triangle ABC, the perpendicular legs measure 6 cm and 8 cm. What is the length of the hypotenuse side?",
        "syllabus": "Grade 10 Mathematics \u2022 Pythagoras' Theorem",
        "options": [
          "10 cm",
          "12 cm",
          "14 cm",
          "100 cm"
        ],
        "correct": 0,
        "explanation": "By Pythagoras' Theorem: c\u00b2 = a\u00b2 + b\u00b2 = 6\u00b2 + 8\u00b2 = 36 + 64 = 100. Thus c = \u221a100 = 10 cm."
      },
      {
        "text": "In a circle with centre O, an arc subtends an angle of 110\u00b0 at the centre. What is the angle subtended by the same arc at any point on the remaining circumference?",
        "syllabus": "Grade 11 Mathematics \u2022 Circle Theorems",
        "options": [
          "45\u00b0",
          "55\u00b0",
          "110\u00b0",
          "220\u00b0"
        ],
        "correct": 1,
        "explanation": "Circle Theorem: The angle subtended by an arc at the centre of a circle is double the angle subtended by the same arc at any point on the circumference. Angle = 110\u00b0 / 2 = 55\u00b0."
      },
      {
        "text": "In a cyclic quadrilateral ABCD, angle A measures 75\u00b0. What is the measure of the opposite interior angle C?",
        "syllabus": "Grade 11 Mathematics \u2022 Cyclic Quadrilaterals",
        "options": [
          "75\u00b0",
          "90\u00b0",
          "105\u00b0",
          "115\u00b0"
        ],
        "correct": 2,
        "explanation": "Cyclic Quadrilateral Theorem: The opposite angles of a cyclic quadrilateral are supplementary (their sum is 180\u00b0). Angle C = 180\u00b0 - 75\u00b0 = 105\u00b0."
      },
      {
        "text": "What is the volume of a right circular cylinder having a base radius of 7 cm and a height of 10 cm? (Take \u03c0 = 22/7)",
        "syllabus": "Grade 11 Mathematics \u2022 Mensuration of Solids",
        "options": [
          "440 cm\u00b3",
          "770 cm\u00b3",
          "1540 cm\u00b3",
          "2200 cm\u00b3"
        ],
        "correct": 2,
        "explanation": "Volume of cylinder V = \u03c0 \u00b7 r\u00b2 \u00b7 h = (22/7) \u00d7 (7 cm)\u00b2 \u00d7 10 cm = (22/7) \u00d7 49 \u00d7 10 = 22 \u00d7 7 \u00d7 10 = 1540 cm\u00b3."
      }
    ],
    "ownerId": "usr-coord-2",
    "ownerName": "S. Jayasuriya",
    "status": "published",
    "dateAdded": "2026-10-17"
  },
  {
    "id": "quiz-probability-statistics",
    "title": "Probability & Statistics",
    "titleSi": "සම්භාවිතාව සහ සංඛ්‍යානය",
    "topicSi": "සංඛ්‍යානය",
    "descSi": "වෙන් රූප සටහන්, රුක් සටහන්, නියැදි අවකාශ සහ සංඛ්‍යානමය මධ්‍යන්‍ය, මාතය හා මධ්‍යස්ථය ගණනය කරන්න.",
    "subject": "Mathematics",
    "subjectKey": "mathematics",
    "topic": "Statistics",
    "difficulty": "Easy",
    "difficultyBadge": "badge--easy",
    "desc": "Practice calculating event probabilities, central tendency measures (mean, median), and reading ogive curves.",
    "questionsCount": 5,
    "duration": "~10 min",
    "questions": [
      {
        "text": "A fair standard six-sided die numbered 1 to 6 is rolled once. What is the theoretical probability of obtaining a prime number?",
        "syllabus": "Grade 11 Mathematics \u2022 Basic Probability",
        "options": [
          "1/6",
          "1/3",
          "1/2",
          "2/3"
        ],
        "correct": 2,
        "explanation": "The prime numbers on a die are 2, 3, and 5 (1 is neither prime nor composite). There are 3 favorable outcomes out of 6 possibilities: P(prime) = 3/6 = 1/2."
      },
      {
        "text": "The arithmetic mean of five numbers 4, 8, x, 12, and 16 is 10. What is the value of x?",
        "syllabus": "Grade 10 Mathematics \u2022 Measures of Central Tendency",
        "options": [
          "8",
          "10",
          "12",
          "14"
        ],
        "correct": 1,
        "explanation": "Mean = (4 + 8 + x + 12 + 16) / 5 = 10 \u2192 (40 + x) / 5 = 10 \u2192 40 + x = 50 \u2192 x = 10."
      },
      {
        "text": "What is the median of the following ordered numerical dataset: 3, 7, 8, 9, 12, 14, 17?",
        "syllabus": "Grade 10 Mathematics \u2022 Median of Discrete Data",
        "options": [
          "8",
          "9",
          "10",
          "12"
        ],
        "correct": 1,
        "explanation": "There are n = 7 values. The median of an odd dataset is the ((7 + 1) / 2) = 4th value in the sorted list, which is 9."
      },
      {
        "text": "Two fair coins are tossed simultaneously. What is the probability of obtaining at least one Head outcome?",
        "syllabus": "Grade 11 Mathematics \u2022 Sample Space & Combined Events",
        "options": [
          "1/4",
          "1/2",
          "3/4",
          "1"
        ],
        "correct": 2,
        "explanation": "The complete sample space is S = {HH, HT, TH, TT} (4 equally likely outcomes). Outcomes containing at least one Head are {HH, HT, TH} (3 outcomes). P = 3/4."
      },
      {
        "text": "On a cumulative frequency curve (ogive), the median value of the distribution is read from the horizontal axis corresponding to what percentage of the total cumulative frequency?",
        "syllabus": "Grade 11 Mathematics \u2022 Cumulative Frequency Curves",
        "options": [
          "25%",
          "50%",
          "75%",
          "100%"
        ],
        "correct": 1,
        "explanation": "The median divides ordered data into two halves. On an ogive curve, it corresponds to the 50th percentile (N / 2 of total frequency). The 25th percentile gives Q1, and 75th gives Q3."
      }
    ],
    "ownerId": "usr-coord-2",
    "ownerName": "S. Jayasuriya",
    "status": "published",
    "dateAdded": "2026-10-16"
  },
  {
    "id": "quiz-simultaneous-equations",
    "title": "Simultaneous Equations",
    "titleSi": "සමගාමී සමීකරණ",
    "topicSi": "වීජ ගණිතය",
    "descSi": "විචල්‍යයන් දෙකක් සහිත සමගාමී සමීකරණ ආදේශ සහ ඉවත් කිරීමේ ක්‍රම මගින් විසඳීම.",
    "subject": "Mathematics",
    "subjectKey": "mathematics",
    "topic": "Algebra",
    "difficulty": "Medium",
    "difficultyBadge": "badge--medium",
    "desc": "Solve paired linear equations using elimination and substitution methods and interpret intersection graphs.",
    "questionsCount": 5,
    "duration": "~12 min",
    "questions": [
      {
        "text": "Solve the pair of simultaneous linear equations: x + y = 10 and x - y = 4. What is the value of x?",
        "syllabus": "Grade 11 Mathematics \u2022 Simultaneous Equations",
        "options": [
          "x = 5",
          "x = 7",
          "x = 8",
          "x = 14"
        ],
        "correct": 1,
        "explanation": "Add the two equations together: (x + y) + (x - y) = 10 + 4 \u2192 2x = 14 \u2192 x = 7. Then y = 10 - 7 = 3."
      },
      {
        "text": "If 2x + 3y = 13 and x = 2, what is the value of y?",
        "syllabus": "Grade 10 Mathematics \u2022 Substitution Method",
        "options": [
          "y = 2",
          "y = 3",
          "y = 4",
          "y = 5"
        ],
        "correct": 1,
        "explanation": "Substitute x = 2: 2(2) + 3y = 13 \u2192 4 + 3y = 13 \u2192 3y = 9 \u2192 y = 3."
      },
      {
        "text": "For the straight-line equation y = 3x - 6, what are the coordinates of the y-intercept?",
        "syllabus": "Grade 10 Mathematics \u2022 Linear Graphs (y = mx + c)",
        "options": [
          "(0, 3)",
          "(3, 0)",
          "(0, -6)",
          "(-6, 0)"
        ],
        "correct": 2,
        "explanation": "In standard form y = mx + c, the y-intercept occurs where x = 0, giving y = c = -6. The coordinates are (0, -6)."
      },
      {
        "text": "What is the gradient of the straight line passing through the points (1, 2) and (4, 8)?",
        "syllabus": "Grade 10 Mathematics \u2022 Gradient of a Line",
        "options": [
          "m = 1",
          "m = 2",
          "m = 3",
          "m = 6"
        ],
        "correct": 1,
        "explanation": "Gradient m = (y\u2082 - y\u2081) / (x\u2082 - x\u2081) = (8 - 2) / (4 - 1) = 6 / 3 = 2."
      },
      {
        "text": "What is the equation of the axis of symmetry for the parabola given by y = (x - 3)\u00b2 + 2?",
        "syllabus": "Grade 11 Mathematics \u2022 Quadratic Graphs",
        "options": [
          "x = -3",
          "x = 2",
          "x = 3",
          "y = 2"
        ],
        "correct": 2,
        "explanation": "For a quadratic vertex form y = a(x - h)\u00b2 + k, the vertex is at (h, k) and the vertical axis of symmetry is the line x = h. Here h = 3, so x = 3."
      }
    ],
    "ownerId": "usr-coord-2",
    "ownerName": "S. Jayasuriya",
    "status": "published",
    "dateAdded": "2026-10-15"
  },
  {
    "id": "quiz-circle-theorems",
    "title": "Circle Theorems & Tangents",
    "titleSi": "වෘත්ත ප්‍රමේයයන් සහ ස්පර්ශක",
    "topicSi": "ජ්‍යාමිතිය",
    "descSi": "වෘත්ත ජ්‍යාමිතික ප්‍රමේය, ස්පර්ශක-අරය සම්බන්ධතා, ඒකාන්තර ඛණ්ඩ ප්‍රමේය සහ ජ්‍යාමිතික සාධන.",
    "subject": "Mathematics",
    "subjectKey": "mathematics",
    "topic": "Geometry",
    "difficulty": "Challenging",
    "difficultyBadge": "badge--challenging",
    "desc": "Master circle geometry theorems, tangent-radius relationships, alternate segment theorem, and geometric riders.",
    "questionsCount": 5,
    "duration": "~15 min",
    "questions": [
      {
        "text": "What is the angle subtended by a diameter in a semicircle?",
        "syllabus": "Grade 11 Mathematics \u2022 Angle in a Semicircle",
        "options": [
          "45\u00b0",
          "60\u00b0",
          "90\u00b0 (Right angle)",
          "180\u00b0"
        ],
        "correct": 2,
        "explanation": "Theorem: The angle in a semicircle is a right angle (90\u00b0). An arc of 180\u00b0 subtends half its central angle at the circumference: 180\u00b0 / 2 = 90\u00b0."
      },
      {
        "text": "What is the angle between a tangent to a circle and the radius drawn to the point of contact?",
        "syllabus": "Grade 11 Mathematics \u2022 Tangents to a Circle",
        "options": [
          "45\u00b0",
          "60\u00b0",
          "90\u00b0",
          "Depends on radius"
        ],
        "correct": 2,
        "explanation": "Theorem: A tangent to a circle is perpendicular to the radius drawn through the point of contact, forming an exact 90\u00b0 angle."
      },
      {
        "text": "From an external point P, two tangents PA and PB are drawn to a circle touching at points A and B. What is the relationship between lengths PA and PB?",
        "syllabus": "Grade 11 Mathematics \u2022 Tangents from External Point",
        "options": [
          "PA > PB",
          "PA < PB",
          "PA = PB",
          "PA + PB = diameter"
        ],
        "correct": 2,
        "explanation": "Theorem: The lengths of the two tangents drawn from an external point to a circle are equal (PA = PB)."
      },
      {
        "text": "According to the Alternate Segment Theorem, the angle between a tangent and a chord through the point of contact equals:",
        "syllabus": "Grade 11 Mathematics \u2022 Alternate Segment Theorem",
        "options": [
          "The angle in the alternate segment",
          "Twice the angle in the alternate segment",
          "Half the angle at the centre",
          "The angle of the sector"
        ],
        "correct": 0,
        "explanation": "The Alternate Segment Theorem states that the angle between a tangent and a chord drawn through the point of contact is equal to the angle subtended by the chord in the alternate segment."
      },
      {
        "text": "Angles subtended by the same arc at the circumference in the same segment of a circle are:",
        "syllabus": "Grade 11 Mathematics \u2022 Angles in Same Segment",
        "options": [
          "Supplementary",
          "Complementary",
          "Equal",
          "Bisected"
        ],
        "correct": 2,
        "explanation": "Theorem: Angles subtended by the same arc at the circumference in the same segment of a circle are equal to each other."
      }
    ],
    "ownerId": "usr-coord-2",
    "ownerName": "S. Jayasuriya",
    "status": "published",
    "dateAdded": "2026-10-14"
  },
  {
    "id": "quiz-commercial-arithmetic",
    "title": "Commercial Arithmetic",
    "titleSi": "වාණිජ ගණිතය",
    "topicSi": "අංක ගණිතය",
    "descSi": "ප්‍රතිශත, බදු, වැල් පොලිය, හීනවන ශේෂ ක්ෂයවීම් සහ කොටස් වෙළඳපල ලාභාංශ ගණනය කිරීම.",
    "subject": "Mathematics",
    "subjectKey": "mathematics",
    "topic": "Arithmetic",
    "difficulty": "Easy",
    "difficultyBadge": "badge--easy",
    "desc": "Calculate simple interest, percentage profit/loss, customs duty, municipal rates, and compound growth.",
    "questionsCount": 5,
    "duration": "~10 min",
    "questions": [
      {
        "text": "A student deposits Rs. 10,000 in a savings account offering a simple interest rate of 8% per annum. What is the total interest earned after 3 years?",
        "syllabus": "Grade 10 Mathematics \u2022 Simple Interest",
        "options": [
          "Rs. 800",
          "Rs. 1,600",
          "Rs. 2,400",
          "Rs. 3,200"
        ],
        "correct": 2,
        "explanation": "Simple Interest I = (P \u00b7 R \u00b7 T) / 100 = (10,000 \u00d7 8 \u00d7 3) / 100 = Rs. 2,400."
      },
      {
        "text": "A book purchased for Rs. 500 is sold for Rs. 600. What is the percentage profit on the cost price?",
        "syllabus": "Grade 10 Mathematics \u2022 Profit & Loss Percentages",
        "options": [
          "10%",
          "15%",
          "20%",
          "25%"
        ],
        "correct": 2,
        "explanation": "Profit = Selling Price - Cost Price = 600 - 500 = Rs. 100. Percentage profit = (100 / 500) \u00d7 100% = 20%."
      },
      {
        "text": "A sales receipt shows a purchase value of Rs. 2,000. If Value Added Tax (VAT) of 15% is levied, what is the total amount payable?",
        "syllabus": "Grade 11 Mathematics \u2022 Taxes & VAT",
        "options": [
          "Rs. 2,150",
          "Rs. 2,300",
          "Rs. 2,450",
          "Rs. 3,000"
        ],
        "correct": 1,
        "explanation": "VAT amount = 15% of Rs. 2,000 = (15 / 100) \u00d7 2,000 = Rs. 300. Total payable = Rs. 2,000 + Rs. 300 = Rs. 2,300."
      },
      {
        "text": "Customs duty of 20% is charged on an imported electronic device valued at Rs. 15,000. How much customs duty must be paid?",
        "syllabus": "Grade 11 Mathematics \u2022 Customs Duty",
        "options": [
          "Rs. 1,500",
          "Rs. 2,000",
          "Rs. 3,000",
          "Rs. 4,500"
        ],
        "correct": 2,
        "explanation": "Customs Duty = (20 / 100) \u00d7 15,000 = Rs. 3,000."
      },
      {
        "text": "A local municipal council charges an annual property rate of 12% on an assessed house value of Rs. 100,000. What is the annual rates payment?",
        "syllabus": "Grade 11 Mathematics \u2022 Municipal Rates",
        "options": [
          "Rs. 1,200",
          "Rs. 6,000",
          "Rs. 12,000",
          "Rs. 24,000"
        ],
        "correct": 2,
        "explanation": "Annual Rates = (12 / 100) \u00d7 100,000 = Rs. 12,000."
      }
    ],
    "ownerId": "usr-coord-2",
    "ownerName": "S. Jayasuriya",
    "status": "draft",
    "dateAdded": "2026-10-13"
  },
    {
    "id": "quiz-commercial-arithmetic",
    "title": "Commercial Arithmetic",
    "subject": "Mathematics",
    "subjectKey": "mathematics",
    "topic": "Arithmetic",
    "difficulty": "Easy",
    "difficultyBadge": "badge--easy",
    "desc": "Calculate simple interest, percentage profit/loss, customs duty, municipal rates, and compound growth.",
    "questionsCount": 5,
    "duration": "~10 min",
    "questions": [
      {
        "text": "A student deposits Rs. 10,000 in a savings account offering a simple interest rate of 8% per annum. What is the total interest earned after 3 years?",
        "syllabus": "Grade 10 Mathematics • Simple Interest",
        "options": [
          "Rs. 800",
          "Rs. 1,600",
          "Rs. 2,400",
          "Rs. 3,200"
        ],
        "correct": 2,
        "explanation": "Simple Interest I = (P · R · T) / 100 = (10,000 × 8 × 3) / 100 = Rs. 2,400."
      },
      {
        "text": "A book purchased for Rs. 500 is sold for Rs. 600. What is the percentage profit on the cost price?",
        "syllabus": "Grade 10 Mathematics • Profit & Loss Percentages",
        "options": [
          "10%",
          "15%",
          "20%",
          "25%"
        ],
        "correct": 2,
        "explanation": "Profit = Selling Price - Cost Price = 600 - 500 = Rs. 100. Percentage profit = (100 / 500) × 100% = 20%."
      },
      {
        "text": "A sales receipt shows a purchase value of Rs. 2,000. If Value Added Tax (VAT) of 15% is levied, what is the total amount payable?",
        "syllabus": "Grade 11 Mathematics • Taxes & VAT",
        "options": [
          "Rs. 2,150",
          "Rs. 2,300",
          "Rs. 2,450",
          "Rs. 3,000"
        ],
        "correct": 1,
        "explanation": "VAT amount = 15% of Rs. 2,000 = (15 / 100) × 2,000 = Rs. 300. Total payable = Rs. 2,000 + Rs. 300 = Rs. 2,300."
      },
      {
        "text": "Customs duty of 20% is charged on an imported electronic device valued at Rs. 15,000. How much customs duty must be paid?",
        "syllabus": "Grade 11 Mathematics • Customs Duty",
        "options": [
          "Rs. 1,500",
          "Rs. 2,000",
          "Rs. 3,000",
          "Rs. 4,500"
        ],
        "correct": 2,
        "explanation": "Customs Duty = (20 / 100) × 15,000 = Rs. 3,000."
      },
      {
        "text": "A local municipal council charges an annual property rate of 12% on an assessed house value of Rs. 100,000. What is the annual rates payment?",
        "syllabus": "Grade 11 Mathematics • Municipal Rates",
        "options": [
          "Rs. 1,200",
          "Rs. 6,000",
          "Rs. 12,000",
          "Rs. 24,000"
        ],
        "correct": 2,
        "explanation": "Annual Rates = (12 / 100) × 100,000 = Rs. 12,000."
      }
    ],
    "ownerId": "usr-coord-2",
    "ownerName": "S. Jayasuriya",
    "status": "published",
    "dateAdded": "2026-10-12"
  }
],
    mentors: [
  {
    "id": "men-1",
    "name": "T. D. Rathnayake",
    "facultyYear": "Science (3rd Year)",
    "subjectFocus": "Science",
    "cohortId": "SC-01",
    "cohortName": "Cohort SC-01 (Matara)",
    "menteeCount": 5,
    "status": "Active",
    "assignedCoordinatorId": "usr-coord-1"
  },
  {
    "id": "men-2",
    "name": "P. K. Senaratne",
    "facultyYear": "Science (2nd Year)",
    "subjectFocus": "Mathematics",
    "cohortId": "MA-01",
    "cohortName": "Cohort MA-01 (Galle)",
    "menteeCount": 5,
    "status": "Active",
    "assignedCoordinatorId": "usr-coord-2"
  },
  {
    "id": "men-3",
    "name": "R. M. Alahakoon",
    "facultyYear": "Science (3rd Year)",
    "subjectFocus": "Science",
    "cohortId": "SC-02",
    "cohortName": "Cohort SC-02 (Hambantota)",
    "menteeCount": 5,
    "status": "Active",
    "assignedCoordinatorId": "usr-coord-1"
  },
  {
    "id": "men-4",
    "name": "D. S. Weerakkody",
    "facultyYear": "Science (4th Year)",
    "subjectFocus": "Mathematics",
    "cohortId": "MA-02",
    "cohortName": "Cohort MA-02 (Matara)",
    "menteeCount": 5,
    "status": "Active",
    "assignedCoordinatorId": "usr-coord-2"
  },
  {
    "id": "men-5",
    "name": "N. H. Karunaratne",
    "facultyYear": "Science (2nd Year)",
    "subjectFocus": "Science",
    "cohortId": "SC-03",
    "cohortName": "Cohort SC-03 (Galle)",
    "menteeCount": 5,
    "status": "Active",
    "assignedCoordinatorId": "usr-coord-1"
  },
  {
    "id": "men-6",
    "name": "K. A. Gunawardena",
    "facultyYear": "Science (3rd Year)",
    "subjectFocus": "Mathematics",
    "cohortId": "MA-03",
    "cohortName": "Cohort MA-03 (Hambantota)",
    "menteeCount": 5,
    "status": "Active",
    "assignedCoordinatorId": "usr-coord-2"
  },
  {
    "id": "men-7",
    "name": "H. M. Wickramasinghe",
    "facultyYear": "Science (3rd Year)",
    "subjectFocus": "Science",
    "cohortId": "SC-04",
    "cohortName": "Cohort SC-04 (Matara)",
    "menteeCount": 5,
    "status": "Active",
    "assignedCoordinatorId": "usr-coord-1"
  },
  {
    "id": "men-8",
    "name": "W. P. Jayawardena",
    "facultyYear": "Science (2nd Year)",
    "subjectFocus": "Mathematics",
    "cohortId": "MA-04",
    "cohortName": "Cohort MA-04 (Galle)",
    "menteeCount": 5,
    "status": "Active",
    "assignedCoordinatorId": "usr-coord-2"
  },
  {
    "id": "men-9",
    "name": "S. L. Dissanayake",
    "facultyYear": "Science (4th Year)",
    "subjectFocus": "Science",
    "cohortId": "SC-05",
    "cohortName": "Cohort SC-05 (Hambantota)",
    "menteeCount": 5,
    "status": "Active",
    "assignedCoordinatorId": "usr-coord-1"
  },
  {
    "id": "men-10",
    "name": "B. M. Samarasinghe",
    "facultyYear": "Science (3rd Year)",
    "subjectFocus": "Mathematics",
    "cohortId": "MA-05",
    "cohortName": "Cohort MA-05 (Matara)",
    "menteeCount": 5,
    "status": "Active",
    "assignedCoordinatorId": "usr-coord-2"
  },
  {
    "id": "men-11",
    "name": "G. R. Abeysekera",
    "facultyYear": "Science (2nd Year)",
    "subjectFocus": "Science",
    "cohortId": "SC-06",
    "cohortName": "Cohort SC-06 (Galle)",
    "menteeCount": 5,
    "status": "Active",
    "assignedCoordinatorId": "usr-coord-1"
  },
  {
    "id": "men-12",
    "name": "C. K. Liyanage",
    "facultyYear": "Science (3rd Year)",
    "subjectFocus": "Mathematics",
    "cohortId": "MA-06",
    "cohortName": "Cohort MA-06 (Hambantota)",
    "menteeCount": 5,
    "status": "Active",
    "assignedCoordinatorId": "usr-coord-2"
  }
],
    enquiries: [
  {
    "id": "enq-1",
    "senderName": "K. M. Bandara",
    "senderEmail": "km.bandara@gmail.com",
    "subject": "Need help with Science past paper question (Forces & Motion)",
    "category": "Resource Request",
    "subjectArea": "Science",
    "receivedDate": "2026-10-25",
    "status": "Pending",
    "message": "Can we get step-by-step marking guidelines for the 2023 Physics section structured essay question 4?",
    "assignedCoordinatorId": "usr-coord-1",
    "assignedCoordinatorName": "K. L. Perera"
  },
  {
    "id": "enq-2",
    "senderName": "M. N. Wickramasinghe",
    "senderEmail": "mn.wick@yahoo.com",
    "subject": "Mathematics 1:5 Mentor Cohort Registration",
    "category": "Mentorship Guidance",
    "subjectArea": "Mathematics",
    "receivedDate": "2026-10-24",
    "status": "Pending",
    "message": "My school is in Hambantota district. How do we enrol students for the upcoming November mentor sessions?",
    "assignedCoordinatorId": "usr-coord-2",
    "assignedCoordinatorName": "S. Jayasuriya"
  },
  {
    "id": "enq-3",
    "senderName": "H. G. Silva",
    "senderEmail": "hg.silva@outlook.com",
    "subject": "Clarification on Forces & Motion Quiz Question 2",
    "category": "Quiz Feedback",
    "subjectArea": "Science",
    "receivedDate": "2026-10-22",
    "status": "Resolved",
    "message": "Thank you for the quick explanation on Newton's third law. The diagram helped a lot.",
    "assignedCoordinatorId": "usr-coord-1",
    "assignedCoordinatorName": "K. L. Perera"
  },
  {
    "id": "enq-4",
    "senderName": "P. D. Jayasundara",
    "senderEmail": "p.jayasundara@gmail.com",
    "subject": "Request for 2024 Model Paper Part II answer key",
    "category": "Resource Request",
    "subjectArea": "Mathematics",
    "receivedDate": "2026-10-21",
    "status": "Resolved",
    "message": "Is the worked answer key for quadratic equations available for download?",
    "assignedCoordinatorId": "usr-coord-2",
    "assignedCoordinatorName": "S. Jayasuriya"
  },
  {
    "id": "enq-5",
    "senderName": "S. R. Munasinghe",
    "senderEmail": "sr.muna@gmail.com",
    "subject": "New Mentor Application for Grade 11 Science",
    "category": "General Enquiry",
    "subjectArea": "Science",
    "receivedDate": "2026-10-20",
    "status": "Pending",
    "message": "I am a 3rd year science undergraduate interested in volunteering for the Southern Province school visits.",
    "assignedCoordinatorId": "usr-coord-3",
    "assignedCoordinatorName": "M. Fernando"
  },
  {
    "id": "enq-6",
    "senderName": "T. K. De Silva",
    "senderEmail": "desilva.tk@gmail.com",
    "subject": "Feedback on Periodic Table Interactive Quiz",
    "category": "Quiz Feedback",
    "subjectArea": "Science",
    "receivedDate": "2026-10-18",
    "status": "Resolved",
    "message": "The questions are very representative of the real O/L exam structure. Excellent work!",
    "assignedCoordinatorId": "usr-coord-1",
    "assignedCoordinatorName": "K. L. Perera"
  }
],
    activity: [
  {
    "id": "act-1",
    "timestamp": "2 hours ago",
    "actorId": "usr-coord-1",
    "actorName": "K. L. Perera",
    "actorRole": "coordinator",
    "actionType": "resource_upload",
    "title": "K. L. Perera uploaded O/L Science \u2014 2023 Past Paper",
    "description": "Complete past paper and marking scheme added to Science repository."
  },
  {
    "id": "act-2",
    "timestamp": "5 hours ago",
    "actorId": "usr-coord-2",
    "actorName": "S. Jayasuriya",
    "actorRole": "coordinator",
    "actionType": "quiz_publish",
    "title": "S. Jayasuriya published new quiz: Algebra Fundamentals",
    "description": "A 10-question practice assessment on polynomials, factorization, and quadratic expressions."
  },
  {
    "id": "act-3",
    "timestamp": "1 day ago",
    "actorId": "usr-admin-1",
    "actorName": "Dr. N. Wickramasinghe",
    "actorRole": "admin",
    "actionType": "admin_approval",
    "title": "Dr. N. Wickramasinghe approved 2 new mentor cohorts",
    "description": "Assigned Cohort SC-02 and Cohort MA-03 for Hambantota underprivileged schools."
  },
  {
    "id": "act-4",
    "timestamp": "1 day ago",
    "actorId": "system",
    "actorName": "System",
    "actorRole": "system",
    "actionType": "enquiry_received",
    "title": "New enquiry received from K. M. Bandara",
    "description": "Subject: 'Need help with Science past paper question (Forces & Motion)'."
  },
  {
    "id": "act-5",
    "timestamp": "2 days ago",
    "actorId": "usr-coord-3",
    "actorName": "M. Fernando",
    "actorRole": "coordinator",
    "actionType": "resource_update",
    "title": "M. Fernando updated Mathematics Notes \u2014 Simultaneous Equations",
    "description": "Added worked step-by-step graphical examples for grade 11 students."
  },
  {
    "id": "act-6",
    "timestamp": "3 days ago",
    "actorId": "usr-coord-1",
    "actorName": "K. L. Perera",
    "actorRole": "coordinator",
    "actionType": "quiz_publish",
    "title": "K. L. Perera published new quiz: Forces & Motion",
    "description": "10 interactive multiple-choice questions with worked step-by-step solutions."
  },
  {
    "id": "act-7",
    "timestamp": "4 days ago",
    "actorId": "usr-admin-1",
    "actorName": "Dr. N. Wickramasinghe",
    "actorRole": "admin",
    "actionType": "mentor_approved",
    "title": "Mentor registration approved for T. D. Rathnayake",
    "description": "Undergraduate mentor certified for Cohort SC-01 (Science 1:5 model)."
  }
],
    settings: {
  "notificationEmail": "coordinator@mansala.ruh.ac.lk",
  "directorEmail": "admin@mansala.ruh.ac.lk",
  "enforceStrictRatio": true,
  "maxMenteesPerCohort": 5,
  "allowCoordinatorSelfPublish": true,
  "publicResourcesVisible": true
}
  ,
    projectsUpcoming: [
  {
    "id": "proj-akuressa-flood-relief-2026",
    "category": "relief",
    "categoryLabel": "Disaster & Flood Relief",
    "categoryLabelSi": "ආපදා සහන සේවා",
    "schoolName": "Akuressa Flood-Affected Homes & School Cleanup Drive",
    "schoolNameSi": "අකුරැස්ස ගංවතුරින් විපතට පත් නිවාස සහ පාසල් පිරිසිදු කිරීමේ මෙහෙයුම",
    "town": "Akuressa",
    "district": "Matara",
    "date": "November 28, 2026",
    "targetStudents": 180,
    "beneficiaryText": "45 Families & 1 Primary School",
    "beneficiaryTextSi": "පවුල් 45ක් සහ ප්‍රාථමික පාසලක්",
    "beneficiaryShort": "45 Families Supported",
    "beneficiaryShortSi": "පවුල් 45කට උපකාර",
    "subject": "Emergency Flood Relief & Classroom Restoration",
    "subjectSi": "හදිසි ගංවතුර සහන සහ පන්තිකාමර පුනරුත්ථාපනය",
    "targetAmount": 60000,
    "raisedAmount": 42000,
    "description": "Volunteer cleanup mission supplying high-pressure washers, disinfectants, dry ration packs, and replacing flood-damaged study kits & school bags for displaced children.",
    "descriptionSi": "ගංවතුරින් යටවූ නිවාස සහ පාසල් පිරිසිදු කිරීම, විෂබීජ නාශක ද්‍රව්‍ය, වියළි ආහාර සහ දරුවන්ගේ අහිමි වූ පොත්පත් හා පාසල් බෑග් ලබා දීමේ ශිෂ්‍ය මෙහෙයුම."
  },
  {
    "id": "proj-deniyaya-school-aid-2026",
    "category": "school-aid",
    "categoryLabel": "School Aid & Donations",
    "categoryLabelSi": "පාසල් උපකරණ හා පරිත්‍යාග",
    "schoolName": "Deniyaya Rural School Science Lab & Library Donation",
    "schoolNameSi": "දෙනියාය දුෂ්කර පාසලට විද්‍යාගාර උපකරණ සහ පුස්තකාල පොත් පරිත්‍යාගය",
    "town": "Deniyaya",
    "district": "Matara",
    "date": "December 12, 2026",
    "targetStudents": 320,
    "beneficiaryText": "320 Rural Students",
    "beneficiaryTextSi": "ග්‍රාමීය සිසුන් 320 දෙනෙකුට",
    "beneficiaryShort": "320 Students Equipped",
    "beneficiaryShortSi": "සිසුන් 320කට උපකරණ",
    "subject": "Laboratory Glassware & Library Books",
    "subjectSi": "විද්‍යාගාර වීදුරු බඩු සහ පුස්තකාල පොත්",
    "targetAmount": 55000,
    "raisedAmount": 31000,
    "description": "Procuring essential student microscopes, test-tube racks, chemical reagents, and 350+ G.C.E. O/L syllabus reference books for a tea-estate sector rural school lacking laboratory facilities.",
    "descriptionSi": "විද්‍යාගාර පහසුකම් නොමැති වතුකරයේ දුෂ්කර පාසලක් සඳහා ක්ෂුද්‍රදර්ශක, රසායනික උපකරණ සහ සා/පෙළ පරිශීලන පොත් 350කට අධික ප්‍රමාණයක් පරිත්‍යාග කිරීම."
  },
  {
    "id": "proj-aloysius-2026",
    "category": "seminar",
    "categoryLabel": "School Seminar",
    "categoryLabelSi": "පාසල් සම්මන්ත්‍රණය",
    "beneficiaryText": "180 O/L Candidates",
    "beneficiaryTextSi": "සා/පෙළ සිසුන් 180ක්",
    "beneficiaryShort": "180 Candidates Supported",
    "beneficiaryShortSi": "සිසුන් 180කට උපකාර",
    "schoolName": "St. Aloysius' College",
    "schoolNameSi": "ශාන්ත ඇලෝසියස් විද්‍යාලය",
    "town": "Galle",
    "district": "Galle",
    "date": "November 22, 2026",
    "targetStudents": 180,
    "subject": "Science & Mathematics Revision",
    "subjectSi": "විද්‍යාව හා ගණිතය පුනරීක්ෂණ",
    "targetAmount": 45000,
    "raisedAmount": 32500,
    "description": "Full-day intensive theory review, practical question analysis, and printed revision workbooks provided by University of Ruhuna science undergraduates.",
    "descriptionSi": "සා/පෙළ සිසුන් සඳහා පවත්වනු ලබන පූර්ණ දින සම්මන්ත්‍රණය. සිසුන් 180 දෙනෙකුට නොමිලේ ප්‍රශ්න පත්‍ර කට්ටල සහ උපදෙස් ලබා දීම."
  },
  {
    "id": "proj-mahinda-2026",
    "category": "seminar",
    "categoryLabel": "School Seminar",
    "categoryLabelSi": "පාසල් සම්මන්ත්‍රණය",
    "beneficiaryText": "220 O/L Candidates",
    "beneficiaryTextSi": "සා/පෙළ සිසුන් 220ක්",
    "beneficiaryShort": "220 Candidates Supported",
    "beneficiaryShortSi": "සිසුන් 220කට උපකාර",
    "schoolName": "Mahinda College",
    "schoolNameSi": "මහින්ද විද්‍යාලය",
    "town": "Galle",
    "district": "Galle",
    "date": "December 05, 2026",
    "targetStudents": 220,
    "subject": "Grade 11 Target Exam Papers",
    "subjectSi": "11 ශ්‍රේණිය ඉලක්කගත ප්‍රශ්න පත්‍ර",
    "targetAmount": 50000,
    "raisedAmount": 18000,
    "description": "Special paper discussion seminar with step-by-step marking schemes, model questions, and personal mentor consultation for students seeking 'A' passes.",
    "descriptionSi": "වැඩි ලකුණු හිමිවන විද්‍යාව සහ ගණිතය ඒකක ආවරණය කරමින් ලකුණු දීමේ පටිපාටිය සමඟින් පවත්වන විශේෂ වැඩමුළුව."
  },
  {
    "id": "proj-weeraketiya-2026",
    "category": "seminar",
    "categoryLabel": "School Seminar",
    "categoryLabelSi": "පාසල් සම්මන්ත්‍රණය",
    "beneficiaryText": "150 O/L Candidates",
    "beneficiaryTextSi": "සා/පෙළ සිසුන් 150ක්",
    "beneficiaryShort": "150 Candidates Supported",
    "beneficiaryShortSi": "සිසුන් 150කට උපකාර",
    "schoolName": "Weeraketiya Central College",
    "schoolNameSi": "වීරකැටිය මධ්‍ය මහා විද්‍යාලය",
    "town": "Weeraketiya",
    "district": "Hambantota",
    "date": "December 18, 2026",
    "targetStudents": 150,
    "subject": "Science Practical & Theory Workshop",
    "subjectSi": "විද්‍යා ප්‍රායෝගික හා න්‍යායාත්මක වැඩමුළුව",
    "targetAmount": 40000,
    "raisedAmount": 38000,
    "description": "Hands-on problem solving workshop focusing on core chemistry, physics equations, and high-weightage biology units for rural students.",
    "descriptionSi": "ග්‍රාමීය පාසල් සිසුන් ඉලක්ක කරගත් විද්‍යා ප්‍රායෝගික පරීක්ෂණ සහ ගණනය කිරීම් පිළිබඳ ප්‍රායෝගික සම්මන්ත්‍රණය."
  },
  {
    "id": "proj-rahula-2027",
    "category": "seminar",
    "categoryLabel": "School Seminar",
    "categoryLabelSi": "පාසල් සම්මන්ත්‍රණය",
    "beneficiaryText": "200 O/L Candidates",
    "beneficiaryTextSi": "සා/පෙළ සිසුන් 200ක්",
    "beneficiaryShort": "200 Candidates Supported",
    "beneficiaryShortSi": "සිසුන් 200කට උපකාර",
    "schoolName": "Rahula College",
    "schoolNameSi": "රාහුල විද්‍යාලය",
    "town": "Matara",
    "district": "Matara",
    "date": "January 08, 2027",
    "targetStudents": 200,
    "subject": "Speed Mathematics & Geometric Proofs",
    "subjectSi": "වේග ගණිතය සහ ජ්‍යාමිතික ප්‍රමේයයන්",
    "targetAmount": 48000,
    "raisedAmount": 12000,
    "description": "Techniques for speed calculation, geometry construction, and graph problems designed by Ruhuna mathematics undergrads.",
    "descriptionSi": "රුහුණ විශ්වවිද්‍යාලයේ ගණිත අධ්‍යයන අංශයේ සිසුන් විසින් මෙහෙයවනු ලබන ජ්‍යාමිතික ප්‍රමේයයන් හා වේග ගණනය කිරීම් වැඩමුළුව."
  },
  {
    "id": "proj-richmond-2027",
    "category": "seminar",
    "categoryLabel": "School Seminar",
    "categoryLabelSi": "පාසල් සම්මන්ත්‍රණය",
    "beneficiaryText": "190 O/L Candidates",
    "beneficiaryTextSi": "සා/පෙළ සිසුන් 190ක්",
    "beneficiaryShort": "190 Candidates Supported",
    "beneficiaryShortSi": "සිසුන් 190කට උපකාර",
    "schoolName": "Richmond College",
    "schoolNameSi": "රිච්මන්ඩ් විද්‍යාලය",
    "town": "Galle",
    "district": "Galle",
    "date": "January 20, 2027",
    "targetStudents": 190,
    "subject": "Coordinate Geometry & Trigonometry",
    "subjectSi": "ඛණ්ඩාංක ජ්‍යාමිතිය සහ ත්‍රිකෝණමිතිය",
    "targetAmount": 42000,
    "raisedAmount": 24000,
    "description": "Advanced problem breakdown seminar addressing the highest difficulty questions on Ordinary Level Mathematics Paper 2.",
    "descriptionSi": "සා/පෙළ දෙවන ප්‍රශ්න පත්‍රයේ වඩාත් සංකීර්ණ ගැටලු විසඳීමේ උපායමාර්ග පිළිබඳ විශේෂ සම්මන්ත්‍රණය."
  },
  {
    "id": "proj-sujatha-2027",
    "category": "seminar",
    "categoryLabel": "School Seminar",
    "categoryLabelSi": "පාසල් සම්මන්ත්‍රණය",
    "beneficiaryText": "210 O/L Candidates",
    "beneficiaryTextSi": "සා/පෙළ සිසුන් 210ක්",
    "beneficiaryShort": "210 Candidates Supported",
    "beneficiaryShortSi": "සිසුන් 210කට උපකාර",
    "schoolName": "Sujatha Vidyalaya",
    "schoolNameSi": "සුජාතා විද්‍යාලය",
    "town": "Matara",
    "district": "Matara",
    "date": "February 03, 2027",
    "targetStudents": 210,
    "subject": "Science Practical Demos & Plant Biology",
    "subjectSi": "විද්‍යා ප්‍රායෝගික නිරීක්ෂණ හා ශාක ජීව විද්‍යාව",
    "targetAmount": 40000,
    "raisedAmount": 35000,
    "description": "Interactive laboratory demonstrations of plant histology, photosynthesis equations, and biology revision modules for candidates.",
    "descriptionSi": "ප්‍රභාසංස්ලේෂණය හා ශාක පටක පිළිබඳ ප්‍රායෝගික නිරූපණ සහ ප්‍රශ්න පත්‍ර සාකච්ඡාව."
  },
  {
    "id": "proj-southlands-2027",
    "category": "seminar",
    "categoryLabel": "School Seminar",
    "categoryLabelSi": "පාසල් සම්මන්ත්‍රණය",
    "beneficiaryText": "175 O/L Candidates",
    "beneficiaryTextSi": "සා/පෙළ සිසුන් 175ක්",
    "beneficiaryShort": "175 Candidates Supported",
    "beneficiaryShortSi": "සිසුන් 175කට උපකාර",
    "schoolName": "Southlands College",
    "schoolNameSi": "සවුත්ලන්ඩ්ස් විද්‍යාලය",
    "town": "Galle",
    "district": "Galle",
    "date": "February 16, 2027",
    "targetStudents": 175,
    "subject": "Physics Optics & Wave Theory",
    "subjectSi": "භෞතික විද්‍යාව - ආලෝකය හා තරංග",
    "targetAmount": 45000,
    "raisedAmount": 15000,
    "description": "Ray diagram constructions, convex lens formulas, and sound wave calculation workshops conducted by Ruhuna physics volunteers.",
    "descriptionSi": "කිරණ සටහන්, උත්තල කාච සහ තරංග චලිතය පිළිබඳ ගැටලු විසඳීමේ ශිල්පක්‍රම වැඩමුළුව."
  },
  {
    "id": "proj-walasmulla-upcoming-2027",
    "category": "seminar",
    "categoryLabel": "School Seminar",
    "categoryLabelSi": "පාසල් සම්මන්ත්‍රණය",
    "beneficiaryText": "165 O/L Candidates",
    "beneficiaryTextSi": "සා/පෙළ සිසුන් 165ක්",
    "beneficiaryShort": "165 Candidates Supported",
    "beneficiaryShortSi": "සිසුන් 165කට උපකාර",
    "schoolName": "Walasmulla National School",
    "schoolNameSi": "වළස්මුල්ල ජාතික පාසල",
    "town": "Walasmulla",
    "district": "Hambantota",
    "date": "March 02, 2027",
    "targetStudents": 165,
    "subject": "Mathematics Probability & Tree Diagrams",
    "subjectSi": "සම්භාවිතාව සහ රුක් සටහන්",
    "targetAmount": 36000,
    "raisedAmount": 28000,
    "description": "Eliminating fear in probability calculations through intuitive tree diagrams and step-by-step problem sets.",
    "descriptionSi": "රුක් සටහන් ඇසුරින් සම්භාවිතා ගැටලු පහසුවෙන් විසඳීමේ කෙටි ක්‍රම සහ ආදර්ශ ප්‍රශ්න පත්‍ර."
  },
  {
    "id": "proj-matara-central-2027",
    "category": "seminar",
    "categoryLabel": "School Seminar",
    "categoryLabelSi": "පාසල් සම්මන්ත්‍රණය",
    "beneficiaryText": "185 O/L Candidates",
    "beneficiaryTextSi": "සා/පෙළ සිසුන් 185ක්",
    "beneficiaryShort": "185 Candidates Supported",
    "beneficiaryShortSi": "සිසුන් 185කට උපකාර",
    "schoolName": "Matara Central College",
    "schoolNameSi": "මාතර මධ්‍ය මහා විද්‍යාලය",
    "town": "Matara",
    "district": "Matara",
    "date": "March 18, 2027",
    "targetStudents": 185,
    "subject": "Chemistry Stoichiometry & Organic Acids",
    "subjectSi": "රසායනික ගණනය හා කාබනික අම්ල",
    "targetAmount": 35000,
    "raisedAmount": 9000,
    "description": "Molar concentration calculations, reactivity series, and balancing tricky chemical equations for rural students.",
    "descriptionSi": "මවුලික සාන්ද්‍රණය, රසායනික ප්‍රතික්‍රියා තුලනය කිරීම සහ කාබනික රසායන මූලධර්ම."
  }
],
    projectsPast: [
  {
    "id": "past-kamburupitiya-flood-restoration",
    "category": "relief",
    "categoryLabel": "Disaster & Flood Relief",
    "categoryLabelSi": "ආපදා සහන සේවා",
    "schoolName": "Kamburupitiya Post-Flood House & Classroom Restoration",
    "schoolNameSi": "කඹුරුපිටිය ගංවතුර පසු නිවාස හා පන්තිකාමර ප්‍රතිසංස්කරණය",
    "town": "Kamburupitiya",
    "district": "Matara",
    "dateHeld": "October 04, 2026",
    "studentsReached": 180,
    "beneficiaryText": "30 Families & 180 Students",
    "beneficiaryTextSi": "පවුල් 30ක් සහ සිසුන් 180ක්",
    "summary": "45 undergraduate volunteers spent two days clearing thick mud and debris from 30 flooded homes and restoring the ground-floor primary classrooms, handing over emergency dry rations.",
    "summarySi": "සරසවි සිසුන් 45 දෙනෙකු එක්ව ගංවතුරෙන් යටවූ නිවාස 30ක් සහ ප්‍රාථමික පන්තිකාමර මඩ ඉවත් කර පිරිසිදු කර වියළි සලාක සහ අත්‍යවශ්‍ය ද්‍රව්‍ය බෙදා දෙන ලදී.",
    "coverImg": "https://images.unsplash.com/photo-1547683905-f686c993aae5?w=800&auto=format&fit=crop&q=80",
    "volunteerTeam": "Faculty of Science Disaster Response Volunteer Brigade",
    "subjectFocus": "Emergency Silt Clearance, Sanitation & School Restoral",
    "subjectFocusSi": "ගංවතුර මඩ ඉවත් කිරීම, සනීපාරක්ෂාව සහ පාසල යථා තත්ත්වයට පත් කිරීම",
    "fullNarrative": "Following torrential monsoon rainfall across the Nilwala basin, floodwaters inundated residential areas and the village primary school in Kamburupitiya. Mobilizing a rapid response team of 45 undergraduates, Mansala volunteers cleared sludge, disinfected flooded classrooms, restored water connections, and distributed 60 dry ration packs and replacement study stationery to displaced families.",
    "fullNarrativeSi": "නිල්වලා ගංගා ද්‍රෝණියේ ඇති වූ ගංවතුර තත්ත්වය හේතුවෙන් කඹුරුපිටිය ප්‍රදේශයේ නිවාස සහ ප්‍රාථමික පාසල යටවීමෙන් පසු, විද්‍යා පීඨ ශිෂ්‍ය ස්වේච්ඡා කණ්ඩායම විසින් දින දෙකක් පුරා මඩ ඉවත් කිරීම, විෂබීජහරණය සහ වියළි ආහාර බෙදා දීමේ ක්ෂේත්‍ර මෙහෙයුමක් ක්‍රියාත්මක කරන ලදී.",
    "gallery": [
      {
        "url": "https://images.unsplash.com/photo-1547683905-f686c993aae5?w=800&auto=format&fit=crop&q=80",
        "caption": "Undergraduate team removing thick flood sediment and debris from primary school classrooms."
      },
      {
        "url": "https://images.unsplash.com/photo-1593113598332-cd288d649433?w=800&auto=format&fit=crop&q=80",
        "caption": "High-pressure washing and disinfecting the school corridors and contaminated wells."
      },
      {
        "url": "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&auto=format&fit=crop&q=80",
        "caption": "Handing over dry ration food parcels and hygiene kits to affected rural village families."
      },
      {
        "url": "https://images.unsplash.com/photo-1577896851231-70ef18881754?w=800&auto=format&fit=crop&q=80",
        "caption": "Distributing new waterproof school bags, exercise books, and pencil cases to affected children."
      }
    ]
  },
  {
    "id": "past-hambantota-stationery-desk-drive",
    "category": "school-aid",
    "categoryLabel": "School Aid & Donations",
    "categoryLabelSi": "පාසල් උපකරණ හා පරිත්‍යාග",
    "schoolName": "Hambantota Underprivileged School Stationery & Desk Drive",
    "schoolNameSi": "හම්බන්තොට දුෂ්කර පාසල් ඩෙස්ක් පුටු ප්‍රතිසංස්කරණය සහ ලිපිද්‍රව්‍ය පරිත්‍යාගය",
    "town": "Ambalantota",
    "district": "Hambantota",
    "dateHeld": "August 28, 2026",
    "studentsReached": 150,
    "beneficiaryText": "150 Students & 40 Desks Repaired",
    "beneficiaryTextSi": "සිසුන් 150ක් සහ ප්‍රතිසංස්කරණය කළ ඩෙස්ක් 40ක්",
    "summary": "Undergraduates repaired 40 broken classroom desks and chairs, and distributed complete annual stationery packs, calculators, and geometry boxes to 150 deserving candidates.",
    "summarySi": "කැඩී බිඳී ගිය පාසල් ඩෙස්ක්-පුටු 40ක් ප්‍රතිසංස්කරණය කරමින් සිසුන් 150 දෙනෙකුට වාර්ෂික ලිපිද්‍රව්‍ය කට්ටල, ගණක යන්ත්‍ර සහ ජ්‍යාමිති පෙට්ටි බෙදා දෙන ලදී.",
    "coverImg": "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=800&auto=format&fit=crop&q=80",
    "volunteerTeam": "Faculty of Science Community Outreach Committee",
    "subjectFocus": "Classroom Furniture Restoration & Essential Learning Supplies",
    "subjectFocusSi": "පන්තිකාමර උපකරණ ප්‍රතිසංස්කරණය සහ අත්‍යවශ්‍ය අධ්‍යාපන ද්‍රව්‍ය",
    "fullNarrative": "Identified through our rural school network as having severe furniture shortages where Grade 10 and 11 students had to share damaged desks on concrete floors. Ruhuna science undergrads brought woodworking and metal repair tools, refurbished 40 double-desks and chairs, and equipped every candidate with a high-quality stationery kit.",
    "fullNarrativeSi": "හම්බන්තොට දුෂ්කර පාසලක පන්තිකාමර ඩෙස්ක්-පුටු හිඟය හඳුනාගෙන, සරසවි සිසුන් විසින් ඩෙස්ක් 40ක් අලුත්වැඩියා කර සිසුන් 150 දෙනෙකුට අවශ්‍ය සියලුම ලිපිද්‍රව්‍ය හා ජ්‍යාමිති පෙට්ටි පරිත්‍යාග කරන ලදී.",
    "gallery": [
      {
        "url": "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=800&auto=format&fit=crop&q=80",
        "caption": "Refurbished double-desks and chairs arranged inside the refreshed Grade 11 classroom."
      },
      {
        "url": "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&auto=format&fit=crop&q=80",
        "caption": "Undergraduates assembling and varnishing desks alongside school carpentry alumni."
      },
      {
        "url": "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=800&auto=format&fit=crop&q=80",
        "caption": "Students joyfully receiving their geometry sets, Oxford instruments, and mathematical log tables."
      },
      {
        "url": "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&auto=format&fit=crop&q=80",
        "caption": "Principal delivering vote of thanks to the University of Ruhuna student contingent."
      }
    ]
  },
  {
    "id": "past-vijitha-matara",
    "category": "seminar",
    "categoryLabel": "School Seminar",
    "categoryLabelSi": "පාසල් සම්මන්ත්‍රණය",
    "beneficiaryText": "210 O/L Candidates",
    "beneficiaryTextSi": "සා/පෙළ සිසුන් 210ක්",
    "schoolName": "Dickwella Vijitha Central College",
    "schoolNameSi": "දික්වැල්ල විජිත මධ්‍ය මහා විද්‍යාලය",
    "town": "Dickwella",
    "district": "Matara",
    "dateHeld": "October 14, 2026",
    "studentsReached": 210,
    "summary": "Conducted intensive coordinate geometry and chemical reactions workshop with 210 printed revision packs distributed.",
    "summarySi": "විද්‍යාව හා ගණිතය විෂයයන්හි සංකීර්ණ ඒකක ආවරණය කරමින් සිසුන් 210 දෙනෙකුට නොමිලේ අභ්‍යාස පොත් බෙදා දෙන ලදී.",
    "coverImg": "https://images.unsplash.com/photo-1577896851231-70ef18881754?w=800&auto=format&fit=crop&q=80",
    "volunteerTeam": "Faculty of Science Undergrads - Cohort 3 (Mathematics & Chemistry)",
    "subjectFocus": "Mathematics Geometry & Chemistry Reactions",
    "fullNarrative": "Our undergraduate volunteers held an immersive 7-hour seminar for 210 O/L candidates at the Vijitha Central College Main Hall. The morning session covered speed mathematics and coordinate geometry proofs, while the afternoon session featured live chemistry experiments clarifying acids, bases, and salts. School teachers noted a noticeable surge in student confidence for their upcoming provincial trials.",
    "gallery": [
      {
        "url": "https://images.unsplash.com/photo-1577896851231-70ef18881754?w=800&auto=format&fit=crop&q=80",
        "caption": "Undergraduate mentors conducting step-by-step theorem proofs on the main hall blackboard."
      },
      {
        "url": "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&auto=format&fit=crop&q=80",
        "caption": "1:5 Small group peer mentorship - 1 mentor assisting 5 students with calculus and coordinate problems."
      },
      {
        "url": "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=800&auto=format&fit=crop&q=80",
        "caption": "Distribution of 210 free printed model paper booklets and stationary kits to candidates."
      },
      {
        "url": "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&auto=format&fit=crop&q=80",
        "caption": "Post-seminar group photo with the school principal, staff, and University of Ruhuna volunteer committee."
      }
    ]
  },
  {
    "id": "past-elpitiya-ananda",
    "category": "seminar",
    "categoryLabel": "School Seminar",
    "categoryLabelSi": "පාසල් සම්මන්ත්‍රණය",
    "beneficiaryText": "175 O/L Candidates",
    "beneficiaryTextSi": "සා/පෙළ සිසුන් 175ක්",
    "schoolName": "Ananda Central College",
    "schoolNameSi": "ඇල්පිටිය ආනන්ද මධ්‍ය මහා විද්‍යාලය",
    "town": "Elpitiya",
    "district": "Galle",
    "dateHeld": "September 28, 2026",
    "studentsReached": 175,
    "summary": "Specialized focus on Grade 11 Functions, Quadratic Equations, and Physics Mechanics problem solving.",
    "summarySi": "ශ්‍රිත, වර්ගජ සමීකරණ සහ යාන්ත්‍ර විද්‍යාව ගැටලු විසඳීමේ ක්‍රමෝපායන් පිළිබඳ විශේෂ වැඩමුළුව.",
    "coverImg": "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&auto=format&fit=crop&q=80",
    "volunteerTeam": "Faculty of Science Undergrads - Cohort 2 (Physics & Applied Maths)",
    "subjectFocus": "Quadratic Equations & Newton Mechanics",
    "fullNarrative": "Focusing on analytical problem-solving skills, 175 students participated in a full day of physics problem breakdowns and algebra practice. Each student completed 40 targeted exam-level questions with individual tutor feedback.",
    "gallery": [
      {
        "url": "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&auto=format&fit=crop&q=80",
        "caption": "Interactive physics demonstration on force vectors and pulleys conducted by student mentors."
      },
      {
        "url": "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=800&auto=format&fit=crop&q=80",
        "caption": "Individual students receiving tailored step-by-step marking rubric guidance."
      },
      {
        "url": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop&q=80",
        "caption": "Q&A session addressing the most common pitfalls in O/L paper 2 questions."
      }
    ]
  },
  {
    "id": "past-beliatta-vijayaba",
    "category": "seminar",
    "categoryLabel": "School Seminar",
    "categoryLabelSi": "පාසල් සම්මන්ත්‍රණය",
    "beneficiaryText": "190 O/L Candidates",
    "beneficiaryTextSi": "සා/පෙළ සිසුන් 190ක්",
    "schoolName": "Ruhunu Vijayaba National College",
    "schoolNameSi": "රුහුණු විජයබා ජාතික පාසල",
    "town": "Beliatta",
    "district": "Hambantota",
    "dateHeld": "September 12, 2026",
    "studentsReached": 190,
    "summary": "Hands-on Chemistry stoichiometry masterclass and biology genetics charts for Southern province students.",
    "summarySi": "රසායනික ගණනය කිරීම් සහ ප්‍රවේණිය පිළිබඳ ප්‍රායෝගික පුනරීක්ෂණ සම්මන්ත්‍රණය.",
    "coverImg": "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&auto=format&fit=crop&q=80",
    "volunteerTeam": "Faculty of Science Undergrads - Cohort 4 (Chemistry & Botany)",
    "subjectFocus": "Stoichiometry & Plant Physiology",
    "fullNarrative": "Over 190 O/L candidates attended this intensive science workshop. Mentors utilized visual diagrams and interactive demonstrations to de-mystify the most challenging Grade 11 science units.",
    "gallery": [
      {
        "url": "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&auto=format&fit=crop&q=80",
        "caption": "Live demonstration of acid-base titration and colorimetric indicators."
      },
      {
        "url": "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=800&auto=format&fit=crop&q=80",
        "caption": "Students actively solving numerical molar concentration problems in groups."
      },
      {
        "url": "https://images.unsplash.com/photo-1577896851231-70ef18881754?w=800&auto=format&fit=crop&q=80",
        "caption": "Handover of science model exam kits to the College Principal."
      }
    ]
  },
  {
    "id": "past-galle-vidyaloka",
    "category": "seminar",
    "categoryLabel": "School Seminar",
    "categoryLabelSi": "පාසල් සම්මන්ත්‍රණය",
    "beneficiaryText": "240 O/L Candidates",
    "beneficiaryTextSi": "සා/පෙළ සිසුන් 240ක්",
    "schoolName": "Vidyaloka College",
    "schoolNameSi": "විද්‍යාලෝක විද්‍යාලය",
    "town": "Galle",
    "district": "Galle",
    "dateHeld": "August 20, 2026",
    "studentsReached": 240,
    "summary": "Simulated Model Exam Paper 1 and 2 walk-through with complete marking breakdown and timing tips.",
    "summarySi": "පූර්ණ ආදර්ශ විභාග ප්‍රශ්න පත්‍ර 1 සහ 2 සාකච්ඡාව සහ කාල කළමනාකරණ උපදෙස්.",
    "coverImg": "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=800&auto=format&fit=crop&q=80",
    "volunteerTeam": "Faculty of Science Undergrads - Cohort 1 (Core Academic Team)",
    "subjectFocus": "Combined Science & Mathematics Paper 1 & 2",
    "fullNarrative": "With 240 candidates in attendance, this was one of our largest single-day outreach sessions. Students sat for a timed 1-hour model test followed by a 4-hour comprehensive marking walkthrough led by university rank-holders.",
    "gallery": [
      {
        "url": "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=800&auto=format&fit=crop&q=80",
        "caption": "Students sitting for the morning timed mock examination."
      },
      {
        "url": "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&auto=format&fit=crop&q=80",
        "caption": "Cohort leads explaining common traps in multiple choice questions."
      },
      {
        "url": "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=800&auto=format&fit=crop&q=80",
        "caption": "Mentors distributing personalized mark breakdown sheets to each student."
      }
    ]
  },
  {
    "id": "past-walasmulla-national",
    "category": "seminar",
    "categoryLabel": "School Seminar",
    "categoryLabelSi": "පාසල් සම්මන්ත්‍රණය",
    "beneficiaryText": "160 O/L Candidates",
    "beneficiaryTextSi": "සා/පෙළ සිසුන් 160ක්",
    "schoolName": "Walasmulla National School",
    "schoolNameSi": "වළස්මුල්ල ජාතික පාසල",
    "town": "Walasmulla",
    "district": "Hambantota",
    "dateHeld": "July 15, 2026",
    "studentsReached": 160,
    "summary": "Physics electric circuits, current calculations, and ray diagram constructions masterclass.",
    "summarySi": "විද්‍යුත් පරිපථ, ධාරා ගණනය කිරීම් සහ ආලෝක කිරණ සටහන් පිළිබඳ ප්‍රායෝගික වැඩමුළුව.",
    "coverImg": "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=800&auto=format&fit=crop&q=80",
    "volunteerTeam": "Faculty of Science Undergrads - Cohort 5 (Physics Society)",
    "subjectFocus": "Current Electricity & Optics",
    "fullNarrative": "A targeted seminar helping 160 rural students master complex electric circuit questions, series and parallel resistor calculations, and lens ray diagrams.",
    "gallery": [
      {
        "url": "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=800&auto=format&fit=crop&q=80",
        "caption": "Hands-on resistor circuit board experiment demonstration."
      },
      {
        "url": "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&auto=format&fit=crop&q=80",
        "caption": "Undergrad mentor explaining Snell's Law and total internal reflection on blackboard."
      },
      {
        "url": "https://images.unsplash.com/photo-1577896851231-70ef18881754?w=800&auto=format&fit=crop&q=80",
        "caption": "Candidates working in small groups solving multi-step resistor networks."
      }
    ]
  },
  {
    "id": "past-weligama-sumangala",
    "category": "seminar",
    "categoryLabel": "School Seminar",
    "categoryLabelSi": "පාසල් සම්මන්ත්‍රණය",
    "beneficiaryText": "185 O/L Candidates",
    "beneficiaryTextSi": "සා/පෙළ සිසුන් 185ක්",
    "schoolName": "Sri Sumangala Girls' College",
    "schoolNameSi": "ශ්‍රී සුමංගල බාලිකා විද්‍යාලය",
    "town": "Weligama",
    "district": "Matara",
    "dateHeld": "June 28, 2026",
    "studentsReached": 185,
    "summary": "Speed math tricks, probability tree diagrams, and cumulative frequency curves revision.",
    "summarySi": "සම්භාවිතාව, සංචිත සංඛ්‍යාත වක්‍ර සහ ගණිත ගැටලු විසඳීමේ කෙටි ක්‍රම.",
    "coverImg": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop&q=80",
    "volunteerTeam": "Faculty of Science Undergrads - Cohort 2 (Mathematics Union)",
    "subjectFocus": "Probability & Statistics",
    "fullNarrative": "185 female candidates participated in an energetic session dedicated to eliminating exam fear in mathematics. Focused heavily on probability trees, pie charts, and statistics.",
    "gallery": [
      {
        "url": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop&q=80",
        "caption": "Speed calculation challenge using mental arithmetic tricks."
      },
      {
        "url": "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=800&auto=format&fit=crop&q=80",
        "caption": "Graph drawing technique demonstration for histograms and ogives."
      },
      {
        "url": "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&auto=format&fit=crop&q=80",
        "caption": "Presentation of appreciation plaque by the College Principal."
      }
    ]
  },
  {
    "id": "past-rathgama-devapathiraja",
    "category": "seminar",
    "categoryLabel": "School Seminar",
    "categoryLabelSi": "පාසල් සම්මන්ත්‍රණය",
    "beneficiaryText": "145 O/L Candidates",
    "beneficiaryTextSi": "සා/පෙළ සිසුන් 145ක්",
    "schoolName": "Devapathiraja College",
    "schoolNameSi": "දේවපතිරාජ විද්‍යාලය",
    "town": "Rathgama",
    "district": "Galle",
    "dateHeld": "May 19, 2026",
    "studentsReached": 145,
    "summary": "Genetics Punnett squares, plant anatomy, and human circulatory system comprehensive review.",
    "summarySi": "ප්‍රවේණි විද්‍යාව, ශාක ව්‍යුහය සහ මානව රුධිර සංසරණ පද්ධතිය පිළිබඳ පුනරීක්ෂණය.",
    "coverImg": "https://images.unsplash.com/photo-1577896851231-70ef18881754?w=800&auto=format&fit=crop&q=80",
    "volunteerTeam": "Faculty of Science Undergrads - Cohort 6 (Biological Sciences)",
    "subjectFocus": "Genetics & Human Physiology",
    "fullNarrative": "145 students benefited from focused biology modules. Mentors brought 3D anatomical models from the university zoology laboratory to aid visual learning.",
    "gallery": [
      {
        "url": "https://images.unsplash.com/photo-1577896851231-70ef18881754?w=800&auto=format&fit=crop&q=80",
        "caption": "Demonstration of human heart chambers using 3D anatomical models."
      },
      {
        "url": "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&auto=format&fit=crop&q=80",
        "caption": "Solving monohybrid and dihybrid genetics questions on worksheets."
      }
    ]
  },
  {
    "id": "past-tangalle-boys",
    "category": "seminar",
    "categoryLabel": "School Seminar",
    "categoryLabelSi": "පාසල් සම්මන්ත්‍රණය",
    "beneficiaryText": "170 O/L Candidates",
    "beneficiaryTextSi": "සා/පෙළ සිසුන් 170ක්",
    "schoolName": "Tangalle Boys' School",
    "schoolNameSi": "තංගල්ල පිරිමි විද්‍යාලය",
    "town": "Tangalle",
    "district": "Hambantota",
    "dateHeld": "April 22, 2026",
    "studentsReached": 170,
    "summary": "Geometric constructions with compass & ruler, tangent theorems, and circle geometry workshop.",
    "summarySi": "ජ්‍යාමිතික නිර්මාණ, කවකටු භාවිතය සහ වෘත්ත ප්‍රමේයයන් පිළිබඳ පුහුණු වැඩමුළුව.",
    "coverImg": "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&auto=format&fit=crop&q=80",
    "volunteerTeam": "Faculty of Science Undergrads - Cohort 3 (Mathematics)",
    "subjectFocus": "Geometric Constructions & Circle Theorems",
    "fullNarrative": "Accurate compass and ruler constructions are high-value points on O/L Paper 2. Over 170 candidates learned foolproof steps to construct triangles, tangents, and circumcircles.",
    "gallery": [
      {
        "url": "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&auto=format&fit=crop&q=80",
        "caption": "Giant blackboard compass construction demonstration."
      },
      {
        "url": "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=800&auto=format&fit=crop&q=80",
        "caption": "Mentors checking accuracy of student geometric angle bisectors."
      }
    ]
  },
  {
    "id": "past-kalutara-siddhartha",
    "category": "seminar",
    "categoryLabel": "School Seminar",
    "categoryLabelSi": "පාසල් සම්මන්ත්‍රණය",
    "beneficiaryText": "130 O/L Candidates",
    "beneficiaryTextSi": "සා/පෙළ සිසුන් 130ක්",
    "schoolName": "Pimbura Siddhartha Central College",
    "schoolNameSi": "පිඹුර සිද්ධාර්ථ මධ්‍ය මහා විද්‍යාලය",
    "town": "Kalutara",
    "district": "Kalutara",
    "dateHeld": "March 10, 2026",
    "studentsReached": 130,
    "summary": "Rural boundary outreach delivering 130 complete question banks and intensive past paper analysis.",
    "summarySi": "ග්‍රාමීය පාසල් සිසුන් 130 දෙනෙකු සඳහා ප්‍රශ්න පත්‍ර කට්ටල සහ පුනරීක්ෂණ සම්මන්ත්‍රණය.",
    "coverImg": "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&auto=format&fit=crop&q=80",
    "volunteerTeam": "Faculty of Science Undergrads - Cohort 1",
    "subjectFocus": "Combined Science Term Revision",
    "fullNarrative": "Expanding beyond the Southern Province into adjacent rural Kalutara, our team worked with 130 students lacking lab facilities, reviewing 5 years of past paper essays.",
    "gallery": [
      {
        "url": "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&auto=format&fit=crop&q=80",
        "caption": "Discussion of past 5 years of G.C.E. O/L science essay questions."
      },
      {
        "url": "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=800&auto=format&fit=crop&q=80",
        "caption": "Student representatives accepting science revision booklets."
      }
    ]
  },
  {
    "id": "past-tissa-debarawewa",
    "category": "seminar",
    "categoryLabel": "School Seminar",
    "categoryLabelSi": "පාසල් සම්මන්ත්‍රණය",
    "beneficiaryText": "195 O/L Candidates",
    "beneficiaryTextSi": "සා/පෙළ සිසුන් 195ක්",
    "schoolName": "Debarawewa Central College",
    "schoolNameSi": "දෙබරවැව මධ්‍ය මහා විද්‍යාලය",
    "town": "Tissamaharama",
    "district": "Hambantota",
    "dateHeld": "February 18, 2026",
    "studentsReached": 195,
    "summary": "Exam technique, stress management, and rapid question solving methods for Deep South candidates.",
    "summarySi": "විභාග උපක්‍රම, මානසික ඒකාග්‍රතාව සහ වේගවත් ගැටලු විසඳීමේ ක්‍රම.",
    "coverImg": "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=800&auto=format&fit=crop&q=80",
    "volunteerTeam": "Faculty of Science Undergrads - Cohort 4",
    "subjectFocus": "Exam Technique & Mathematics Revision",
    "fullNarrative": "Our launch seminar for 2026 in Tissamaharama reached 195 students with intensive problem solving sessions and confidence-building mentor panels.",
    "gallery": [
      {
        "url": "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=800&auto=format&fit=crop&q=80",
        "caption": "Opening plenary on time distribution across O/L Section A and Section B."
      },
      {
        "url": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop&q=80",
        "caption": "One-on-one mentor coaching on trigonometry and elevation angles."
      }
    ]
  },
  {
    "id": "past-balapitiya-siddhartha",
    "category": "seminar",
    "categoryLabel": "School Seminar",
    "categoryLabelSi": "පාසල් සම්මන්ත්‍රණය",
    "beneficiaryText": "155 O/L Candidates",
    "beneficiaryTextSi": "සා/පෙළ සිසුන් 155ක්",
    "schoolName": "Balapitiya Siddhartha Central College",
    "schoolNameSi": "බලපිටිය සිද්ධාර්ථ මධ්‍ය මහා විද්‍යාලය",
    "town": "Balapitiya",
    "district": "Galle",
    "dateHeld": "January 22, 2026",
    "studentsReached": 155,
    "summary": "Core Chemistry acids, bases, and salts analysis with comprehensive exam mark schemes.",
    "summarySi": "අම්ල, භෂ්ම සහ ලවණ ආශ්‍රිත ප්‍රශ්න පත්‍ර විශ්ලේෂණය සහ ලකුණු ලබා ගැනීමේ උපදෙස්.",
    "coverImg": "https://images.unsplash.com/photo-1577896851231-70ef18881754?w=800&auto=format&fit=crop&q=80",
    "volunteerTeam": "Faculty of Science Undergrads - Cohort 1",
    "subjectFocus": "Acids, Bases & Salts Reaction Rates",
    "fullNarrative": "155 candidates participated in an intensive 6-hour chemistry focus group tackling practical exam equations and titration graph questions.",
    "gallery": [
      {
        "url": "https://images.unsplash.com/photo-1577896851231-70ef18881754?w=800&auto=format&fit=crop&q=80",
        "caption": "Blackboard derivation of chemical reaction rates and catalysts."
      },
      {
        "url": "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&auto=format&fit=crop&q=80",
        "caption": "Mentors answering individual student doubts on pH indicators."
      }
    ]
  },
  {
    "id": "past-hakmana-methodist",
    "category": "seminar",
    "categoryLabel": "School Seminar",
    "categoryLabelSi": "පාසල් සම්මන්ත්‍රණය",
    "beneficiaryText": "165 O/L Candidates",
    "beneficiaryTextSi": "සා/පෙළ සිසුන් 165ක්",
    "schoolName": "Hakmana Methodist Central College",
    "schoolNameSi": "හක්මන මෙතෝදිස්ත මධ්‍ය මහා විද්‍යාලය",
    "town": "Hakmana",
    "district": "Matara",
    "dateHeld": "January 10, 2026",
    "studentsReached": 165,
    "summary": "Algebraic fractions, simultaneous equations, and indices foundation masterclass.",
    "summarySi": "වීජීය භාග, යුගල සමීකරණ සහ දර්ශක පිළිබඳ මූලික සංකල්ප පුහුණු වැඩමුළුව.",
    "coverImg": "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&auto=format&fit=crop&q=80",
    "volunteerTeam": "Faculty of Science Undergrads - Cohort 5",
    "subjectFocus": "Algebraic Fractions & Indices",
    "fullNarrative": "A high-impact seminar targeting students aiming to convert 'W' and 'S' grades into solid 'C' and 'B' passes in mathematics.",
    "gallery": [
      {
        "url": "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&auto=format&fit=crop&q=80",
        "caption": "Mentors walking through LCM finding in algebraic fractions."
      },
      {
        "url": "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=800&auto=format&fit=crop&q=80",
        "caption": "Students completing timed 10-question practice drills."
      }
    ]
  }
],
    donations: [
  {
    "id": "don-flood-relief-1",
    "donorName": "Eng. Rohan Wickramasinghe",
    "email": "rohan.w@sltnet.lk",
    "phone": "+94 71 884 1002",
    "projectId": "proj-akuressa-flood-relief-2026",
    "projectName": "Akuressa Flood-Affected Homes & School Cleanup Drive",
    "amount": 15000,
    "paymentMethod": "Direct Bank Deposit (BOC)",
    "reference": "TXN-BOC-990214",
    "date": "2026-11-06",
    "slipUrl": "assets/images/sample-slip-1.png",
    "notes": "Dedicated for high-pressure washers & school sanitation packs.",
    "status": "pending"
  },
  {
    "id": "don-school-aid-1",
    "donorName": "Dr. K. Samarakoon",
    "email": "k.samarakoon@med.ruh.ac.lk",
    "phone": "+94 77 339 4110",
    "projectId": "proj-deniyaya-school-aid-2026",
    "projectName": "Deniyaya Rural School Science Lab & Library Donation",
    "amount": 10000,
    "paymentMethod": "LankaQR",
    "reference": "LQR-883901",
    "date": "2026-11-05",
    "slipUrl": "assets/images/sample-slip-2.png",
    "notes": "For basic science laboratory microscopes and glassware.",
    "status": "approved"
  },
  {
    "id": "don-1",
    "donorName": "Dr. Sunil Karunaratne",
    "email": "sunil.k@gmail.com",
    "phone": "+94 77 123 4567",
    "projectId": "proj-aloysius-2026",
    "projectName": "St. Aloysius' College",
    "amount": 10000,
    "paymentMethod": "Bank Transfer (BOC)",
    "reference": "TXN-8849201",
    "date": "2026-11-01",
    "slipUrl": "assets/images/sample-slip-1.png",
    "notes": "Direct transfer to Dean's Fund for Science seminar revision packs.",
    "status": "approved"
  },
  {
    "id": "don-2",
    "donorName": "Malini Abeykoon",
    "email": "malini.abey@outlook.com",
    "phone": "+94 71 456 7890",
    "projectId": "proj-mahinda-2026",
    "projectName": "Mahinda College",
    "amount": 5000,
    "paymentMethod": "LankaQR",
    "reference": "LQR-992144",
    "date": "2026-11-03",
    "slipUrl": "assets/images/sample-slip-2.png",
    "notes": "Wishing all the best for the students.",
    "status": "approved"
  },
  {
    "id": "don-3",
    "donorName": "Ranjith Weerakkody",
    "email": "ranjith.w@yahoo.com",
    "phone": "+94 70 882 1934",
    "projectId": "proj-weeraketiya-2026",
    "projectName": "Weeraketiya Central College",
    "amount": 7500,
    "paymentMethod": "Bank Transfer (BOC)",
    "reference": "BOC-7719284",
    "date": "2026-11-06",
    "slipUrl": "assets/images/sample-slip-3.png",
    "notes": "Donated for model paper printouts.",
    "status": "pending"
  },
  {
    "id": "don-4",
    "donorName": "Chaminda Senanayake",
    "email": "chaminda.s@gmail.com",
    "phone": "+94 76 991 2288",
    "projectId": "proj-anuradhapura-2026",
    "projectName": "Anuradhapura Central College",
    "amount": 12000,
    "paymentMethod": "Direct Bank Deposit",
    "reference": "DEP-449102",
    "date": "2026-11-06",
    "slipUrl": "assets/images/sample-slip-4.png",
    "notes": "Dedicated to student science laboratory kits.",
    "status": "pending"
  },
  {
    "id": "don-5",
    "donorName": "Anonymous Alumni",
    "email": "alumni98@gmail.com",
    "phone": "+94 77 000 1122",
    "projectId": "general",
    "projectName": "General Outreach & Seminar Fund",
    "amount": 2000,
    "paymentMethod": "LankaQR",
    "reference": "LQR-002131",
    "date": "2026-10-28",
    "slipUrl": "assets/images/sample-slip-5.png",
    "notes": "Receipt image unreadable; need clear copy.",
    "status": "rejected"
  }
]
  };

  // Helper to load or initialize from localStorage
  
  const DB_VERSION_KEY = 'mansala_db_version';
  const CURRENT_DB_VERSION = '2.7_coordinator_auth_provisioning';
  try {
    if (typeof localStorage !== 'undefined' && localStorage.getItem(DB_VERSION_KEY) !== CURRENT_DB_VERSION) {
      localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(SEED_DATA.users));
      localStorage.setItem(STORAGE_KEYS.PROJECTS_UPCOMING, JSON.stringify(SEED_DATA.projectsUpcoming));
      localStorage.setItem(STORAGE_KEYS.PROJECTS_PAST, JSON.stringify(SEED_DATA.projectsPast));
      localStorage.setItem(STORAGE_KEYS.DONATIONS, JSON.stringify(SEED_DATA.donations));
      localStorage.setItem(DB_VERSION_KEY, CURRENT_DB_VERSION);
    }
  } catch (e) {}

  function getCollection(key, seed) {
    try {
      const data = localStorage.getItem(key);
      if (data) {
        const parsed = JSON.parse(data);
        if (key === STORAGE_KEYS.USERS && Array.isArray(parsed) && Array.isArray(seed)) {
          const seedMap = {};
          seed.forEach(s => { if (s.id) seedMap[s.id] = s; });
          let usersUpdated = false;
          parsed.forEach(item => {
            const s = seedMap[item.id];
            if (s) {
              if (item.id === 'usr-admin-1') {
                if (item.username !== s.username || item.password !== s.password) {
                  item.username = s.username;
                  item.password = s.password;
                  usersUpdated = true;
                }
              } else if (item.id.startsWith('usr-coord-')) {
                if (item.username !== s.username || item.password !== s.password || item.email !== s.email) {
                  item.username = s.username;
                  item.email = s.email;
                  item.password = s.password;
                  usersUpdated = true;
                }
              }
            }
          });
          if (usersUpdated) {
            try { localStorage.setItem(key, JSON.stringify(parsed)); } catch (e) {}
          }
        }
        if (key === STORAGE_KEYS.RESOURCES && Array.isArray(parsed) && Array.isArray(seed)) {
          const seedMap = {};
          seed.forEach(s => { if (s.id) seedMap[s.id] = s; });
          parsed.forEach(item => {
            if (seedMap[item.id]) {
              if (!item.titleSi && seedMap[item.id].titleSi) item.titleSi = seedMap[item.id].titleSi;
              if (!item.descSi && seedMap[item.id].descSi) item.descSi = seedMap[item.id].descSi;
            }
          });
        }
        if (key === STORAGE_KEYS.QUIZZES && Array.isArray(parsed) && Array.isArray(seed)) {
          const seedMap = {};
          seed.forEach(s => { if (s.id) seedMap[s.id] = s; });
          parsed.forEach(item => {
            const seedItem = seedMap[item.id];
            if (seedItem) {
              if (!item.titleSi && seedItem.titleSi) item.titleSi = seedItem.titleSi;
              if (!item.topicSi && seedItem.topicSi) item.topicSi = seedItem.topicSi;
              if (!item.descSi && seedItem.descSi) item.descSi = seedItem.descSi;
              if (Array.isArray(item.questions) && Array.isArray(seedItem.questions)) {
                item.questions.forEach((q, idx) => {
                  const seedQ = seedItem.questions[idx];
                  if (seedQ) {
                    if (!q.textSi && seedQ.textSi) q.textSi = seedQ.textSi;
                    if (!q.syllabusSi && seedQ.syllabusSi) q.syllabusSi = seedQ.syllabusSi;
                    if ((!q.optionsSi || q.optionsSi.every(o => !o)) && seedQ.optionsSi) q.optionsSi = seedQ.optionsSi;
                    if (!q.explanationSi && seedQ.explanationSi) q.explanationSi = seedQ.explanationSi;
                  }
                });
              }
            }
          });
        }
        return parsed;
      }
    } catch (e) {
      console.warn('Storage read failed for ' + key, e);
    }
    // Initialize seed
    try {
      localStorage.setItem(key, JSON.stringify(seed));
    } catch (e) {}
    return JSON.parse(JSON.stringify(seed));
  }

  function saveCollection(key, data) {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (e) {
      console.error('Storage save failed for ' + key, e);
    }
  }

  // ==================== AUTHENTICATION SERVICE ====================
  const Auth = {
    /**
     * Get currently logged-in user or null
     */
    getCurrentUser: function() {
      try {
        const raw = sessionStorage.getItem(STORAGE_KEYS.SESSION) || localStorage.getItem(STORAGE_KEYS.SESSION);
        if (raw) {
          return JSON.parse(raw);
        }
      } catch (e) {}
      return null;
    },

    /**
     * Authenticate with username/email & password
     */
    login: function(identifier, password, rememberMe) {
      const users = getCollection(STORAGE_KEYS.USERS, SEED_DATA.users);
      const clean = (identifier || '').trim().toLowerCase();
      // Alias normalization for coordinator1 <-> cordinator1
      let aliasClean = clean;
      if (clean === 'coordinator1') aliasClean = 'cordinator1';
      else if (clean === 'cordinator1') aliasClean = 'coordinator1';
      else if (clean === 'coordinator2') aliasClean = 'cordinator2';
      else if (clean === 'cordinator2') aliasClean = 'coordinator2';
      else if (clean === 'coordinator3') aliasClean = 'cordinator3';
      else if (clean === 'cordinator3') aliasClean = 'coordinator3';

      const user = users.find(u => 
        (u.username && (u.username.toLowerCase() === clean || u.username.toLowerCase() === aliasClean)) || 
        (u.email && (
          u.email.toLowerCase() === clean || 
          u.email.toLowerCase() === aliasClean ||
          u.email.toLowerCase() === clean + '@mansala.ruh.ac.lk' ||
          u.email.toLowerCase() === aliasClean + '@mansala.ruh.ac.lk'
        ))
      );

      if (!user) {
        return { success: false, message: 'Invalid credentials. User not found.' };
      }

      if (user.status && user.status.toLowerCase() === 'suspended') {
        return { success: false, message: 'This coordinator account has been suspended. Please contact the administrator.' };
      }

      let isPassMatch = (user.password === password);
      if (!isPassMatch) {
        const passTrim = (password || '').trim();
        // Allow coordinator spelling variations for password as well
        if (user.username === 'cordinator1' || user.username === 'coordinator1') {
          if (passTrim === 'cordinator1' || passTrim === 'coordinator1') isPassMatch = true;
        } else if (user.username === 'cordinator2' || user.username === 'coordinator2') {
          if (passTrim === 'cordinator2' || passTrim === 'coordinator2') isPassMatch = true;
        } else if (user.username === 'cordinator3' || user.username === 'coordinator3') {
          if (passTrim === 'cordinator3' || passTrim === 'coordinator3') isPassMatch = true;
        }
      }

      if (!isPassMatch) {
        return { success: false, message: 'Invalid password. Please check your credentials.' };
      }

      // Strip password for session
      const sessionUser = Object.assign({}, user);
      delete sessionUser.password;

      // Save session
      const serialized = JSON.stringify(sessionUser);
      if (rememberMe) {
        localStorage.setItem(STORAGE_KEYS.SESSION, serialized);
      } else {
        sessionStorage.setItem(STORAGE_KEYS.SESSION, serialized);
      }

      // Default active workspace
      if (sessionUser.role === 'admin') {
        localStorage.setItem(STORAGE_KEYS.WORKSPACE, 'admin');
      } else {
        localStorage.setItem(STORAGE_KEYS.WORKSPACE, 'coordinator');
      }

      // Log successful login
      MansalaDB.logActivity(sessionUser, 'login', `${sessionUser.name} logged in to dashboard`, 'Portal authentication session started.');

      return { success: true, user: sessionUser };
    },

    /**
     * End active session
     */
    logout: function() {
      const user = Auth.getCurrentUser();
      if (user) {
        MansalaDB.logActivity(user, 'logout', `${user.name} logged out`, 'Session terminated.');
      }
      sessionStorage.removeItem(STORAGE_KEYS.SESSION);
      localStorage.removeItem(STORAGE_KEYS.SESSION);
      localStorage.removeItem(STORAGE_KEYS.WORKSPACE);
      window.location.href = 'login.html';
    },

    /**
     * Guard route by required role
     */
    requireAuth: function(requiredRole) {
      const user = Auth.getCurrentUser();
      if (!user) {
        // Save target redirect URL
        sessionStorage.setItem('mansala_redirect_after_login', window.location.pathname + window.location.search + window.location.hash);
        window.location.replace('login.html?auth=required');
        return null;
      }

      if (requiredRole === 'admin' && user.role !== 'admin') {
        // Unauthorized coordinator trying to access admin dashboard
        alert('Access Denied: Administrator privileges required to access this dashboard.');
        window.location.replace('coordinator-dashboard.html');
        return null;
      }

      return user;
    },

    /**
     * Get active workspace: 'admin' | 'coordinator'
     */
    getActiveWorkspace: function() {
      const user = Auth.getCurrentUser();
      if (!user) return 'coordinator';
      if (user.role !== 'admin') return 'coordinator';
      return localStorage.getItem(STORAGE_KEYS.WORKSPACE) || 'admin';
    },

    /**
     * Switch active workspace for Administrators
     */
    setActiveWorkspace: function(workspace) {
      const user = Auth.getCurrentUser();
      if (!user || user.role !== 'admin') {
        throw new Error('Only Administrators with coordinator privileges can switch workspaces.');
      }
      if (workspace !== 'admin' && workspace !== 'coordinator') {
        workspace = 'admin';
      }
      localStorage.setItem(STORAGE_KEYS.WORKSPACE, workspace);
      return workspace;
    }
  };

  // ==================== INDEXEDDB CLIENT-SIDE FILE STORAGE ====================
  const MansalaFiles = {
    dbName: 'mansala_file_storage',
    storeName: 'files',
    _dbPromise: null,

    getDb: function() {
      if (this._dbPromise) return this._dbPromise;
      this._dbPromise = new Promise((resolve) => {
        if (typeof indexedDB === 'undefined') {
          return resolve(null);
        }
        try {
          const request = indexedDB.open(this.dbName, 1);
          request.onupgradeneeded = function(e) {
            const db = e.target.result;
            if (!db.objectStoreNames.contains('files')) {
              db.createObjectStore('files', { keyPath: 'id' });
            }
          };
          request.onsuccess = function(e) {
            resolve(e.target.result);
          };
          request.onerror = function(e) {
            console.warn('IndexedDB open error:', e);
            resolve(null);
          };
        } catch (err) {
          console.warn('IndexedDB init failed:', err);
          resolve(null);
        }
      });
      return this._dbPromise;
    },

    saveFile: async function(id, fileData, fileName, mimeType) {
      if (!id || !fileData) return false;
      const db = await this.getDb();
      if (!db) {
        try {
          localStorage.setItem('mansala_file_' + id, fileData);
          if (fileName) localStorage.setItem('mansala_filename_' + id, fileName);
          return true;
        } catch (e) {
          console.warn('LocalStorage file fallback failed', e);
          return false;
        }
      }
      return new Promise((resolve) => {
        try {
          const tx = db.transaction('files', 'readwrite');
          const store = tx.objectStore('files');
          store.put({ id: id, fileData: fileData, fileName: fileName, mimeType: mimeType || 'application/pdf', timestamp: Date.now() });
          tx.oncomplete = () => resolve(true);
          tx.onerror = () => resolve(false);
        } catch (e) {
          resolve(false);
        }
      });
    },

    getFile: async function(id) {
      if (!id) return null;
      const db = await this.getDb();
      if (!db) {
        try {
          const lsData = localStorage.getItem('mansala_file_' + id);
          const lsName = localStorage.getItem('mansala_filename_' + id);
          return lsData ? { id, fileData: lsData, fileName: lsName } : null;
        } catch (e) {
          return null;
        }
      }
      return new Promise((resolve) => {
        try {
          const tx = db.transaction('files', 'readonly');
          const store = tx.objectStore('files');
          const request = store.get(id);
          request.onsuccess = function() {
            const result = request.result;
            if (result && result.fileData) {
              resolve(result);
            } else {
              try {
                const lsData = localStorage.getItem('mansala_file_' + id);
                const lsName = localStorage.getItem('mansala_filename_' + id);
                resolve(lsData ? { id, fileData: lsData, fileName: lsName } : null);
              } catch (e) {
                resolve(null);
              }
            }
          };
          request.onerror = function() {
            try {
              const lsData = localStorage.getItem('mansala_file_' + id);
              const lsName = localStorage.getItem('mansala_filename_' + id);
              resolve(lsData ? { id, fileData: lsData, fileName: lsName } : null);
            } catch (e) {
              resolve(null);
            }
          };
        } catch (e) {
          resolve(null);
        }
      });
    },

    deleteFile: async function(id) {
      if (!id) return;
      try {
        localStorage.removeItem('mansala_file_' + id);
        localStorage.removeItem('mansala_filename_' + id);
      } catch (e) {}
      const db = await this.getDb();
      if (!db) return;
      try {
        const tx = db.transaction('files', 'readwrite');
        tx.objectStore('files').delete(id);
      } catch (e) {}
    }
  };

  // ==================== ROLE-ENFORCED DATABASE SERVICE ====================
  const MansalaDB = {
    /**
     * Get learning resources respecting user role and ownership
     */
    getResources: function(currentUser, options) {
      const list = getCollection(STORAGE_KEYS.RESOURCES, SEED_DATA.resources);
      if (!currentUser || (options && options.public)) {
        return list.filter(r => r.status === 'published');
      }
      const isCoord = (currentUser.role === 'coordinator') || (currentUser.role === 'admin' && options && options.workspace === 'coordinator');

      if (isCoord && currentUser.role === 'coordinator') {
        // Coordinators strictly see only their own content in their management dashboard
        return list.filter(r => r.ownerId === currentUser.id);
      }

      // Admin in Coordinator Workspace: see resources owned by admin or options
      if (currentUser.role === 'admin' && options && options.workspace === 'coordinator') {
        return list.filter(r => r.ownerId === currentUser.id || r.ownerId === 'usr-admin-1');
      }

      // Admin in Admin Workspace: see all resources
      return list;
    },

    /**
     * Save/Create/Update learning resource with RBAC check
     */
    saveResource: async function(currentUser, resourceData) {
      const list = getCollection(STORAGE_KEYS.RESOURCES, SEED_DATA.resources);
      const isNew = !resourceData.id;
      const targetId = isNew ? ('res-' + Date.now()) : resourceData.id;

      // Extract file data and action
      const fileDataToStore = resourceData.fileData;
      const fileNameToStore = resourceData.fileName;
      const fileTypeToStore = resourceData.fileType || 'application/pdf';
      const fileAction = resourceData.fileAction;

      let hasFile = false;

      if (fileDataToStore && fileDataToStore.startsWith('data:')) {
        // User uploaded new file
        await MansalaFiles.saveFile(targetId, fileDataToStore, fileNameToStore, fileTypeToStore);
        hasFile = true;
      } else if (fileAction === 'removed') {
        // User explicitly removed attached file
        await MansalaFiles.deleteFile(targetId);
        hasFile = false;
      } else if (!isNew) {
        // Retain existing file status if not changed
        const existing = list.find(r => r.id === resourceData.id);
        if (existing && existing.hasFile) {
          hasFile = true;
        } else {
          const stored = await MansalaFiles.getFile(targetId);
          hasFile = !(!stored || !stored.fileData);
        }
      }

      // Clone clean metadata for localStorage (avoid 5MB QuotaExceededError!)
      const cleanData = Object.assign({}, resourceData);
      delete cleanData.fileData;
      delete cleanData.fileAction;

      cleanData.hasFile = hasFile;
      if (hasFile) {
        cleanData.fileName = fileNameToStore || cleanData.fileName;
        cleanData.downloadUrl = '#indexeddb:' + targetId;
      } else if (fileAction === 'removed') {
        cleanData.fileName = '';
        cleanData.downloadUrl = '#download';
      }

      if (!isNew) {
        const existing = list.find(r => r.id === resourceData.id);
        if (!existing) {
          throw new Error('Resource not found.');
        }
        // RBAC enforcement: Coordinator cannot modify content owned by others
        if (currentUser.role === 'coordinator' && existing.ownerId !== currentUser.id) {
          throw new Error('Unauthorized: You can only modify learning resources created by your own account.');
        }
        Object.assign(existing, cleanData, {
          lastModified: new Date().toISOString().split('T')[0]
        });
        saveCollection(STORAGE_KEYS.RESOURCES, list);
        MansalaDB.logActivity(currentUser, 'resource_update', `${currentUser.name} updated resource: ${existing.title}`, `Updated ${existing.subject} (${existing.type}).`);
        return existing;
      } else {
        const newResource = Object.assign({}, cleanData, {
          id: targetId,
          ownerId: currentUser.id,
          ownerName: currentUser.name,
          dateAdded: new Date().toISOString().split('T')[0],
          status: resourceData.status || 'published'
        });
        list.unshift(newResource);
        saveCollection(STORAGE_KEYS.RESOURCES, list);
        MansalaDB.logActivity(currentUser, 'resource_upload', `${currentUser.name} uploaded new resource: ${newResource.title}`, `New ${newResource.subject} ${newResource.type} added to library.`);
        return newResource;
      }
    },

    /**
     * Retrieve binary/Base64 file data for a resource from IndexedDB
     */
    getResourceFile: async function(resourceId) {
      if (!resourceId) return null;
      // 1. Check IndexedDB
      const idbResult = await MansalaFiles.getFile(resourceId);
      if (idbResult && idbResult.fileData) {
        return idbResult;
      }
      // 2. Check localStorage collection
      const list = getCollection(STORAGE_KEYS.RESOURCES, SEED_DATA.resources);
      const item = list.find(r => r.id === resourceId);
      if (item && item.fileData) {
        return { id: resourceId, fileData: item.fileData, fileName: item.fileName || (item.title + '.pdf') };
      }
      return null;
    },

    /**
     * Delete resource with RBAC check
     */
    deleteResource: async function(currentUser, resourceId) {
      const list = getCollection(STORAGE_KEYS.RESOURCES, SEED_DATA.resources);
      const index = list.findIndex(r => r.id === resourceId);
      if (index === -1) throw new Error('Resource not found.');

      const target = list[index];
      if (currentUser.role === 'coordinator' && target.ownerId !== currentUser.id) {
        throw new Error('Unauthorized: You cannot delete learning resources created by another coordinator.');
      }

      list.splice(index, 1);
      saveCollection(STORAGE_KEYS.RESOURCES, list);
      MansalaDB.logActivity(currentUser, 'resource_delete', `${currentUser.name} removed resource: ${target.title}`, `Removed from library.`);
      try {
        await MansalaFiles.deleteFile(resourceId);
      } catch (e) {}
      return true;
    },

    /**
     * Toggle resource publish status
     */
    toggleResourceStatus: function(currentUser, resourceId) {
      const list = getCollection(STORAGE_KEYS.RESOURCES, SEED_DATA.resources);
      const target = list.find(r => r.id === resourceId);
      if (!target) throw new Error('Resource not found.');

      if (currentUser.role === 'coordinator' && target.ownerId !== currentUser.id) {
        throw new Error('Unauthorized: You cannot alter publication status for another coordinator.');
      }

      target.status = target.status === 'published' ? 'draft' : 'published';
      saveCollection(STORAGE_KEYS.RESOURCES, list);
      MansalaDB.logActivity(currentUser, 'resource_status', `${currentUser.name} marked ${target.title} as ${target.status}`, `Status updated to ${target.status}.`);
      return target;
    },

    /**
     * Delete Enquiry (ADMIN ONLY)
     */
    deleteEnquiry: function(currentUser, enquiryId) {
      if (currentUser && currentUser.role !== 'admin') {
        throw new Error('Unauthorized: Only administrators can delete enquiries.');
      }
      let list = getCollection(STORAGE_KEYS.ENQUIRIES, SEED_DATA.enquiries);
      const target = list.find(e => e.id === enquiryId);
      list = list.filter(e => e.id !== enquiryId);
      saveCollection(STORAGE_KEYS.ENQUIRIES, list);
      if (currentUser && target) {
        MansalaDB.logActivity(currentUser, 'enquiry_delete', `${currentUser.name} deleted enquiry #${enquiryId}`, `From ${target.senderName} (${target.subject}).`);
      }
      return true;
    },

    /**
     * Get quizzes respecting role & ownership
     */
    getQuizzes: function(currentUser, options) {
      const list = getCollection(STORAGE_KEYS.QUIZZES, SEED_DATA.quizzes);
      if (!currentUser || (options && options.public)) {
        return list.filter(q => q.status === 'published');
      }
      const isCoord = (currentUser.role === 'coordinator') || (currentUser.role === 'admin' && options && options.workspace === 'coordinator');

      if (isCoord && currentUser.role === 'coordinator') {
        return list.filter(q => q.ownerId === currentUser.id);
      }

      if (currentUser.role === 'admin' && options && options.workspace === 'coordinator') {
        return list.filter(q => q.ownerId === currentUser.id || q.ownerId === 'usr-admin-1');
      }

      return list;
    },

    /**
     * Save/Create/Update quiz with RBAC check
     */
    saveQuiz: function(currentUser, quizData) {
      const list = getCollection(STORAGE_KEYS.QUIZZES, SEED_DATA.quizzes);
      const isNew = !quizData.id;

      if (!isNew) {
        const existing = list.find(q => q.id === quizData.id);
        if (!existing) throw new Error('Quiz not found.');
        if (currentUser.role === 'coordinator' && existing.ownerId !== currentUser.id) {
          throw new Error('Unauthorized: You can only modify quizzes created by your own account.');
        }
        Object.assign(existing, quizData);
        saveCollection(STORAGE_KEYS.QUIZZES, list);
        MansalaDB.logActivity(currentUser, 'quiz_update', `${currentUser.name} updated quiz: ${existing.title}`, `Question bank and metadata saved.`);
        return existing;
      } else {
        const newQuiz = Object.assign({}, quizData, {
          id: 'quiz-' + (Date.now()),
          ownerId: currentUser.id,
          ownerName: currentUser.name,
          dateAdded: new Date().toISOString().split('T')[0],
          status: quizData.status || 'published'
        });
        list.unshift(newQuiz);
        saveCollection(STORAGE_KEYS.QUIZZES, list);
        MansalaDB.logActivity(currentUser, 'quiz_publish', `${currentUser.name} created quiz: ${newQuiz.title}`, `New assessment available for students.`);
        return newQuiz;
      }
    },

    /**
     * Delete quiz with RBAC check
     */
    deleteQuiz: function(currentUser, quizId) {
      const list = getCollection(STORAGE_KEYS.QUIZZES, SEED_DATA.quizzes);
      const index = list.findIndex(q => q.id === quizId);
      if (index === -1) throw new Error('Quiz not found.');

      const target = list[index];
      if (currentUser.role === 'coordinator' && target.ownerId !== currentUser.id) {
        throw new Error('Unauthorized: You cannot delete quizzes created by another coordinator.');
      }

      list.splice(index, 1);
      saveCollection(STORAGE_KEYS.QUIZZES, list);
      MansalaDB.logActivity(currentUser, 'quiz_delete', `${currentUser.name} deleted quiz: ${target.title}`, `Removed from assessments.`);
      return true;
    },

    /**
     * Toggle quiz publish status
     */
    toggleQuizStatus: function(currentUser, quizId) {
      const list = getCollection(STORAGE_KEYS.QUIZZES, SEED_DATA.quizzes);
      const target = list.find(q => q.id === quizId);
      if (!target) throw new Error('Quiz not found.');

      if (currentUser.role === 'coordinator' && target.ownerId !== currentUser.id) {
        throw new Error('Unauthorized: You cannot alter publication status for another coordinator.');
      }

      target.status = target.status === 'published' ? 'draft' : 'published';
      saveCollection(STORAGE_KEYS.QUIZZES, list);
      MansalaDB.logActivity(currentUser, 'quiz_status', `${currentUser.name} set quiz ${target.title} to ${target.status}`, `Status updated.`);
      return target;
    },

    /**
     * Get Mentors & Cohorts
     */
    getMentors: function(currentUser, options) {
      const list = getCollection(STORAGE_KEYS.MENTORS, SEED_DATA.mentors);
      if (currentUser.role === 'coordinator') {
        // Return cohorts assigned to this coordinator or matching subject
        return list.filter(m => m.assignedCoordinatorId === currentUser.id || (currentUser.assignedSubject && m.subjectFocus.includes(currentUser.assignedSubject)));
      }
      return list;
    },

    /**
     * Get Enquiries
     */
    getEnquiries: function(currentUser, options) {
      const list = getCollection(STORAGE_KEYS.ENQUIRIES, SEED_DATA.enquiries);
      if (currentUser && currentUser.role === 'coordinator') {
        return list.filter(e => e.assignedCoordinatorId === currentUser.id || (currentUser.assignedSubject && e.subjectArea.includes(currentUser.assignedSubject)));
      }
      return list;
    },

    /**
     * Update Enquiry Status
     */
    updateEnquiryStatus: function(currentUser, enquiryId, status) {
      const list = getCollection(STORAGE_KEYS.ENQUIRIES, SEED_DATA.enquiries);
      const target = list.find(e => e.id === enquiryId);
      if (!target) throw new Error('Enquiry not found.');

      target.status = status;
      saveCollection(STORAGE_KEYS.ENQUIRIES, list);
      MansalaDB.logActivity(currentUser, 'enquiry_update', `${currentUser.name} updated enquiry #${enquiryId} to ${status}`, `From ${target.senderName} (${target.subject}).`);
      return target;
    },

    /**
     * Get Coordinators (ADMIN ONLY)
     */
    getCoordinators: function(currentUser) {
      if (currentUser.role !== 'admin') {
        throw new Error('Unauthorized: Only administrators can access coordinator management.');
      }
      const users = getCollection(STORAGE_KEYS.USERS, SEED_DATA.users);
      const resources = getCollection(STORAGE_KEYS.RESOURCES, SEED_DATA.resources);
      const quizzes = getCollection(STORAGE_KEYS.QUIZZES, SEED_DATA.quizzes);

      // Return coordinators augmented with their publication statistics
      return users.filter(u => u.role === 'coordinator').map(c => {
        const cRes = resources.filter(r => r.ownerId === c.id);
        const cQuiz = quizzes.filter(q => q.ownerId === c.id);
        return Object.assign({}, c, {
          totalResources: cRes.length,
          publishedResources: cRes.filter(r => r.status === 'published').length,
          totalQuizzes: cQuiz.length,
          publishedQuizzes: cQuiz.filter(q => q.status === 'published').length,
          status: c.status || 'Active'
        });
      });
    },

    /**
     * Create / Provision a new Academic Coordinator (ADMIN ONLY)
     * Admin enters name, username, email, initial password, department, subject track, phone, status.
     */
    createCoordinator: function(currentUser, coordinatorData) {
      if (!currentUser || currentUser.role !== 'admin') {
        throw new Error('Unauthorized: Only administrators can create coordinator accounts.');
      }
      if (!coordinatorData.name || !coordinatorData.name.trim()) {
        throw new Error('Coordinator full name is required.');
      }
      if (!coordinatorData.username || !coordinatorData.username.trim()) {
        throw new Error('Coordinator login username is required.');
      }
      if (!coordinatorData.password || !coordinatorData.password.trim()) {
        throw new Error('An initial password must be set for the coordinator.');
      }

      const users = getCollection(STORAGE_KEYS.USERS, SEED_DATA.users);
      const cleanUsername = coordinatorData.username.trim().toLowerCase();
      const cleanEmail = (coordinatorData.email || (cleanUsername + '@mansala.ruh.ac.lk')).trim().toLowerCase();

      // Check for collision with existing username or email
      const conflict = users.find(u => 
        (u.username && u.username.toLowerCase() === cleanUsername) ||
        (u.email && u.email.toLowerCase() === cleanEmail)
      );
      if (conflict) {
        throw new Error(`A user with username "${cleanUsername}" or email "${cleanEmail}" already exists.`);
      }

      const newId = 'usr-coord-' + Date.now();
      const subject = coordinatorData.assignedSubject || 'Science';
      const newCoordinator = {
        id: newId,
        name: coordinatorData.name.trim(),
        username: cleanUsername,
        email: cleanEmail,
        password: coordinatorData.password.trim(),
        role: 'coordinator',
        hasCoordinatorPrivileges: true,
        department: coordinatorData.department ? coordinatorData.department.trim() : 'Faculty of Science, University of Ruhuna',
        assignedSubject: subject,
        title: coordinatorData.title ? coordinatorData.title.trim() : (`O/L ${subject} Content Coordinator`),
        phone: coordinatorData.phone ? coordinatorData.phone.trim() : '',
        status: coordinatorData.status || 'Active',
        dateCreated: new Date().toISOString().split('T')[0]
      };

      users.push(newCoordinator);
      saveCollection(STORAGE_KEYS.USERS, users);
      MansalaDB.logActivity(
        currentUser,
        'coordinator_create',
        `${currentUser.name} provisioned coordinator account for ${newCoordinator.name}`,
        `Username: @${newCoordinator.username} | Subject: ${newCoordinator.assignedSubject} | Department: ${newCoordinator.department}`
      );
      return newCoordinator;
    },

    /**
     * Update Coordinator Permissions, Credentials & Responsibilities (ADMIN ONLY)
     */
    updateCoordinator: function(currentUser, coordinatorId, updates) {
      if (!currentUser || currentUser.role !== 'admin') {
        throw new Error('Unauthorized: Only administrators can modify coordinator permissions.');
      }
      const users = getCollection(STORAGE_KEYS.USERS, SEED_DATA.users);
      const target = users.find(u => u.id === coordinatorId);
      if (!target) throw new Error('Coordinator not found.');

      // Check username collision if username changed
      if (updates.username) {
        const cleanUname = updates.username.trim().toLowerCase();
        const conflict = users.find(u => u.id !== coordinatorId && u.username && u.username.toLowerCase() === cleanUname);
        if (conflict) throw new Error(`Username "${cleanUname}" is already taken by another user.`);
        target.username = cleanUname;
      }

      // Check email collision if email changed
      if (updates.email) {
        const cleanEmail = updates.email.trim().toLowerCase();
        const conflict = users.find(u => u.id !== coordinatorId && u.email && u.email.toLowerCase() === cleanEmail);
        if (conflict) throw new Error(`Email "${cleanEmail}" is already registered to another user.`);
        target.email = cleanEmail;
      }

      if (updates.name && updates.name.trim()) target.name = updates.name.trim();
      if (updates.password && updates.password.trim()) target.password = updates.password.trim();
      if (updates.department !== undefined) target.department = updates.department.trim();
      if (updates.assignedSubject !== undefined) target.assignedSubject = updates.assignedSubject;
      if (updates.title !== undefined) target.title = updates.title.trim();
      if (updates.phone !== undefined) target.phone = updates.phone.trim();
      if (updates.status !== undefined) target.status = updates.status;

      saveCollection(STORAGE_KEYS.USERS, users);
      MansalaDB.logActivity(
        currentUser,
        'coordinator_update',
        `${currentUser.name} updated coordinator account for ${target.name}`,
        `Username: @${target.username} | Status: ${target.status} | Subject: ${target.assignedSubject}`
      );
      return target;
    },

    /**
     * Delete Coordinator Account (ADMIN ONLY)
     */
    deleteCoordinator: function(currentUser, coordinatorId) {
      if (!currentUser || currentUser.role !== 'admin') {
        throw new Error('Unauthorized: Only administrators can remove coordinator accounts.');
      }
      if (coordinatorId === currentUser.id || coordinatorId === 'usr-admin-1') {
        throw new Error('Cannot delete administrator account.');
      }

      const users = getCollection(STORAGE_KEYS.USERS, SEED_DATA.users);
      const index = users.findIndex(u => u.id === coordinatorId);
      if (index === -1) throw new Error('Coordinator not found.');

      const target = users[index];
      users.splice(index, 1);
      saveCollection(STORAGE_KEYS.USERS, users);

      MansalaDB.logActivity(
        currentUser,
        'coordinator_delete',
        `${currentUser.name} removed coordinator account: ${target.name}`,
        `Revoked access for username @${target.username} (${target.email}).`
      );
      return true;
    },

    /**
     * Get Activity Log
     */
    getActivityLog: function(currentUser, options) {
      const list = getCollection(STORAGE_KEYS.ACTIVITY, SEED_DATA.activity);
      if (currentUser && currentUser.role === 'coordinator') {
        // Coordinator only sees their own activity and general announcements
        return list.filter(a => a.actorId === currentUser.id || a.actorRole === 'system');
      }
      // Admin sees complete programme timeline
      return list;
    },

    /**
     * Append to activity log
     */
    logActivity: function(currentUser, actionType, title, description) {
      const list = getCollection(STORAGE_KEYS.ACTIVITY, SEED_DATA.activity);
      const newEntry = {
        id: 'act-' + Date.now(),
        timestamp: 'Just now',
        actorId: currentUser ? currentUser.id : 'system',
        actorName: currentUser ? currentUser.name : 'System',
        actorRole: currentUser ? currentUser.role : 'system',
        actionType: actionType || 'general',
        title: title,
        description: description || ''
      };
      list.unshift(newEntry);
      // Cap at 40 entries
      if (list.length > 40) list.pop();
      saveCollection(STORAGE_KEYS.ACTIVITY, list);
      return newEntry;
    },

    /**
     * Get Analytics
     */
    getAnalytics: function(currentUser, workspace) {
      const resources = getCollection(STORAGE_KEYS.RESOURCES, SEED_DATA.resources);
      const quizzes = getCollection(STORAGE_KEYS.QUIZZES, SEED_DATA.quizzes);
      const mentors = getCollection(STORAGE_KEYS.MENTORS, SEED_DATA.mentors);
      const enquiries = getCollection(STORAGE_KEYS.ENQUIRIES, SEED_DATA.enquiries);
      const users = getCollection(STORAGE_KEYS.USERS, SEED_DATA.users);

      if (currentUser.role === 'admin' && workspace !== 'coordinator') {
        const donations = getCollection(STORAGE_KEYS.DONATIONS, SEED_DATA.donations);
        const upcomingProjects = getCollection(STORAGE_KEYS.PROJECTS_UPCOMING, SEED_DATA.projectsUpcoming);
        const totalFundsRaised = upcomingProjects.reduce((sum, p) => sum + (Number(p.raisedAmount) || 0), 0);
        const pendingDonations = donations.filter(d => (d.status || '').toLowerCase() === 'pending').length;

        // Programme-wide analytics for Administrator
        return {
          totalResources: resources.length,
          publishedResources: resources.filter(r => r.status === 'published').length,
          draftResources: resources.filter(r => r.status === 'draft').length,
          scienceResources: resources.filter(r => r.subject.toLowerCase() === 'science').length,
          mathsResources: resources.filter(r => r.subject.toLowerCase() === 'mathematics').length,
          totalQuizzes: quizzes.length,
          publishedQuizzes: quizzes.filter(q => q.status === 'published').length,
          totalQuestions: quizzes.reduce((acc, q) => acc + (q.questions ? q.questions.length : 0), 0),
          upcomingProjects: upcomingProjects.length,
          totalFundsRaised: totalFundsRaised,
          pendingDonations: pendingDonations,
          totalMentors: mentors.length,
          totalCohorts: 6,
          totalMentees: mentors.reduce((acc, m) => acc + (m.menteeCount || 5), 0),
          totalCoordinators: users.filter(u => u.role === 'coordinator').length,
          totalEnquiries: enquiries.length,
          pendingEnquiries: enquiries.filter(e => e.status.toLowerCase() === 'pending').length,
          resolvedEnquiries: enquiries.filter(e => e.status.toLowerCase() === 'resolved').length
        };
      } else {
        // Coordinator-specific analytics
        const myRes = resources.filter(r => r.ownerId === currentUser.id);
        const myQuiz = quizzes.filter(q => q.ownerId === currentUser.id);
        const myMentors = mentors.filter(m => m.assignedCoordinatorId === currentUser.id || (currentUser.assignedSubject && m.subjectFocus.includes(currentUser.assignedSubject)));
        const myEnq = enquiries.filter(e => e.assignedCoordinatorId === currentUser.id || (currentUser.assignedSubject && e.subjectArea.includes(currentUser.assignedSubject)));

        return {
          totalResources: myRes.length,
          publishedResources: myRes.filter(r => r.status === 'published').length,
          draftResources: myRes.filter(r => r.status === 'draft').length,
          totalQuizzes: myQuiz.length,
          publishedQuizzes: myQuiz.filter(q => q.status === 'published').length,
          totalMentors: myMentors.length,
          totalMentees: myMentors.reduce((acc, m) => acc + (m.menteeCount || 5), 0),
          totalEnquiries: myEnq.length,
          pendingEnquiries: myEnq.filter(e => e.status.toLowerCase() === 'pending').length,
          resolvedEnquiries: myEnq.filter(e => e.status.toLowerCase() === 'resolved').length
        };
      }
    },

    /**
     * Get Settings
     */
        // ==================== SEMINAR PROJECTS (UPCOMING) ====================
    /**
     * Get upcoming seminar projects
     */
    getUpcomingProjects: function(currentUser, options) {
      if (currentUser && currentUser.role === 'coordinator' && !(options && options.public)) {
        return [];
      }
      const list = getCollection(STORAGE_KEYS.PROJECTS_UPCOMING, SEED_DATA.projectsUpcoming);
      return list;
    },

    /**
     * Save / Add / Update upcoming project
     */
    saveUpcomingProject: function(currentUser, projectData) {
      const list = getCollection(STORAGE_KEYS.PROJECTS_UPCOMING, SEED_DATA.projectsUpcoming);
      const isNew = !projectData.id;

      const cat = projectData.category || 'seminar';
      const catLabel = projectData.categoryLabel || (
        cat === 'relief' ? 'Disaster & Flood Relief' :
        cat === 'school-aid' ? 'School Aid & Donations' : 'School Seminar'
      );
      const catLabelSi = projectData.categoryLabelSi || (
        cat === 'relief' ? 'ආපදා සහන සේවා' :
        cat === 'school-aid' ? 'පාසල් උපකරණ හා පරිත්‍යාග' : 'පාසල් සම්මන්ත්‍රණය'
      );

      // Flexible beneficiary resolution
      let numTarget = Number(projectData.targetStudents) || 0;
      if (!numTarget && projectData.beneficiaryText) {
        const numMatch = String(projectData.beneficiaryText).match(/\d+/);
        if (numMatch) numTarget = parseInt(numMatch[0], 10);
      }
      if (!numTarget) numTarget = 150;

      const benText = projectData.beneficiaryText || `${numTarget} Students Target`;
      const benTextSi = projectData.beneficiaryTextSi || benText;
      const benShort = projectData.beneficiaryShort || `${numTarget} Beneficiaries`;
      const benShortSi = projectData.beneficiaryShortSi || benShort;

      const schoolSi = projectData.schoolNameSi || projectData.school_si || '';

      if (!isNew) {
        const existing = list.find(p => p.id === projectData.id);
        if (!existing) throw new Error('Upcoming project not found.');
        Object.assign(existing, projectData, {
          category: cat,
          categoryLabel: catLabel,
          categoryLabelSi: catLabelSi,
          beneficiaryText: benText,
          beneficiaryTextSi: benTextSi,
          beneficiaryShort: benShort,
          beneficiaryShortSi: benShortSi,
          schoolNameSi: schoolSi,
          targetAmount: Number(projectData.targetAmount) || existing.targetAmount || 0,
          raisedAmount: Number(projectData.raisedAmount) || existing.raisedAmount || 0,
          targetStudents: numTarget || existing.targetStudents || 150,
          lastModified: new Date().toISOString().split('T')[0]
        });
        saveCollection(STORAGE_KEYS.PROJECTS_UPCOMING, list);
        MansalaDB.logActivity(currentUser, 'project_update', `${currentUser ? currentUser.name : 'Admin'} updated upcoming project: ${existing.schoolName}`, `Target: Rs. ${existing.targetAmount}, Raised: Rs. ${existing.raisedAmount}`);
        return existing;
      } else {
        const newProj = Object.assign({}, projectData, {
          id: 'proj-' + (Date.now()),
          category: cat,
          categoryLabel: catLabel,
          categoryLabelSi: catLabelSi,
          beneficiaryText: benText,
          beneficiaryTextSi: benTextSi,
          beneficiaryShort: benShort,
          beneficiaryShortSi: benShortSi,
          schoolNameSi: schoolSi,
          targetAmount: Number(projectData.targetAmount) || 0,
          raisedAmount: Number(projectData.raisedAmount) || 0,
          targetStudents: numTarget,
          ownerId: currentUser ? currentUser.id : 'usr-admin-1',
          ownerName: currentUser ? currentUser.name : 'System Administrator',
          dateAdded: new Date().toISOString().split('T')[0]
        });
        list.unshift(newProj);
        saveCollection(STORAGE_KEYS.PROJECTS_UPCOMING, list);
        MansalaDB.logActivity(currentUser, 'project_create', `${currentUser ? currentUser.name : 'Admin'} created upcoming project: ${newProj.schoolName}`, `Category: ${catLabel}, Target: Rs. ${newProj.targetAmount}`);
        return newProj;
      }
    },

    /**
     * Delete upcoming seminar
     */
    deleteUpcomingProject: function(currentUser, projectId) {
      const list = getCollection(STORAGE_KEYS.PROJECTS_UPCOMING, SEED_DATA.projectsUpcoming);
      const index = list.findIndex(p => p.id === projectId);
      if (index === -1) throw new Error('Project not found.');
      const target = list[index];

      list.splice(index, 1);
      saveCollection(STORAGE_KEYS.PROJECTS_UPCOMING, list);
      MansalaDB.logActivity(currentUser, 'project_delete', `${currentUser ? currentUser.name : 'Admin'} deleted project: ${target.schoolName}`, 'Removed from upcoming campaigns.');
      return true;
    },

    /**
     * Mark an upcoming seminar as completed -> moves to Past Projects Showcase
     */
    markProjectCompleted: function(currentUser, projectId, completionData) {
      const upcomingList = getCollection(STORAGE_KEYS.PROJECTS_UPCOMING, SEED_DATA.projectsUpcoming);
      const pastList = getCollection(STORAGE_KEYS.PROJECTS_PAST, SEED_DATA.projectsPast);

      const uIdx = upcomingList.findIndex(p => p.id === projectId);
      if (uIdx === -1) throw new Error('Upcoming seminar not found.');
      const upcoming = upcomingList[uIdx];

      // Remove from upcoming
      upcomingList.splice(uIdx, 1);
      saveCollection(STORAGE_KEYS.PROJECTS_UPCOMING, upcomingList);

      // Create past project
      const c = completionData || {};
      const cat = c.category || upcoming.category || 'seminar';
      const catLabel = c.categoryLabel || upcoming.categoryLabel || (
        cat === 'relief' ? 'Disaster & Flood Relief' :
        cat === 'school-aid' ? 'School Aid & Donations' : 'School Seminar'
      );
      const catLabelSi = c.categoryLabelSi || upcoming.categoryLabelSi || (
        cat === 'relief' ? 'ආපදා සහන සේවා' :
        cat === 'school-aid' ? 'පාසල් උපකරණ හා පරිත්‍යාග' : 'පාසල් සම්මන්ත්‍රණය'
      );

      let reached = Number(c.studentsReached) || upcoming.targetStudents || 180;
      if (!reached && c.beneficiaryText) {
        const numMatch = String(c.beneficiaryText).match(/\d+/);
        if (numMatch) reached = parseInt(numMatch[0], 10);
      }

      const benText = c.beneficiaryText || upcoming.beneficiaryText || `${reached} Beneficiaries Reached`;
      const benTextSi = c.beneficiaryTextSi || upcoming.beneficiaryTextSi || benText;
      const benShort = c.beneficiaryShort || upcoming.beneficiaryShort || `${reached} Beneficiaries`;
      const benShortSi = c.beneficiaryShortSi || upcoming.beneficiaryShortSi || benShort;

      const newPast = {
        id: 'past-' + Date.now(),
        category: cat,
        categoryLabel: catLabel,
        categoryLabelSi: catLabelSi,
        beneficiaryText: benText,
        beneficiaryTextSi: benTextSi,
        beneficiaryShort: benShort,
        beneficiaryShortSi: benShortSi,
        schoolName: c.schoolName || upcoming.schoolName,
        schoolNameSi: c.schoolNameSi || upcoming.schoolNameSi || '',
        town: c.town || upcoming.town || upcoming.district,
        district: c.district || upcoming.district,
        dateHeld: c.dateHeld || upcoming.date || new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
        studentsReached: reached,
        summary: c.summary || upcoming.description || 'Successfully completed field community outreach mission.',
        summarySi: c.summarySi || upcoming.descriptionSi || '',
        coverImg: c.coverImg || 'https://images.unsplash.com/photo-1577896851231-70ef18881754?w=800&auto=format&fit=crop&q=80',
        volunteerTeam: c.volunteerTeam || upcoming.volunteerTeam || 'Students\' Union Undergrads - Faculty of Science',
        subjectFocus: c.subjectFocus || upcoming.subject || 'Community Relief & Educational Welfare',
        subjectFocusSi: c.subjectFocusSi || upcoming.subjectSi || '',
        fullNarrative: c.fullNarrative || c.summary || upcoming.description,
        fullNarrativeSi: c.fullNarrativeSi || upcoming.descriptionSi || '',
        reportUrl: c.reportUrl || '#',
        gallery: Array.isArray(c.gallery) && c.gallery.length > 0 ? c.gallery : [
          {
            url: c.coverImg || 'https://images.unsplash.com/photo-1577896851231-70ef18881754?w=800',
            caption: 'Volunteers and beneficiaries during mission delivery.'
          }
        ],
        dateAdded: new Date().toISOString().split('T')[0]
      };

      pastList.unshift(newPast);
      saveCollection(STORAGE_KEYS.PROJECTS_PAST, pastList);
      MansalaDB.logActivity(currentUser, 'project_completed', `${currentUser ? currentUser.name : 'Admin'} completed project: ${upcoming.schoolName}`, `Moved to completed showcase with ${newPast.beneficiaryText}`);
      return newPast;
    },

    /**
     * Get past seminar showcase
     */
    getPastProjects: function(currentUser, options) {
      if (currentUser && currentUser.role === 'coordinator' && !(options && options.public)) {
        return [];
      }
      const list = getCollection(STORAGE_KEYS.PROJECTS_PAST, SEED_DATA.projectsPast);
      return list;
    },

    /**
     * Save / Add / Update past project
     */
    savePastProject: function(currentUser, projectData) {
      const list = getCollection(STORAGE_KEYS.PROJECTS_PAST, SEED_DATA.projectsPast);
      const isNew = !projectData.id;

      const cat = projectData.category || 'seminar';
      const catLabel = projectData.categoryLabel || (
        cat === 'relief' ? 'Disaster & Flood Relief' :
        cat === 'school-aid' ? 'School Aid & Donations' : 'School Seminar'
      );
      const catLabelSi = projectData.categoryLabelSi || (
        cat === 'relief' ? 'ආපදා සහන සේවා' :
        cat === 'school-aid' ? 'පාසල් උපකරණ හා පරිත්‍යාග' : 'පාසල් සම්මන්ත්‍රණය'
      );

      let reached = Number(projectData.studentsReached) || 0;
      if (!reached && projectData.beneficiaryText) {
        const numMatch = String(projectData.beneficiaryText).match(/\d+/);
        if (numMatch) reached = parseInt(numMatch[0], 10);
      }
      if (!reached) reached = 150;

      const benText = projectData.beneficiaryText || `${reached} Beneficiaries Reached`;
      const benTextSi = projectData.beneficiaryTextSi || benText;
      const benShort = projectData.beneficiaryShort || `${reached} Beneficiaries`;
      const benShortSi = projectData.beneficiaryShortSi || benShort;

      const schoolSi = projectData.schoolNameSi || projectData.school_si || '';

      if (!isNew) {
        const existing = list.find(p => p.id === projectData.id);
        if (!existing) throw new Error('Past project not found.');
        Object.assign(existing, projectData, {
          category: cat,
          categoryLabel: catLabel,
          categoryLabelSi: catLabelSi,
          beneficiaryText: benText,
          beneficiaryTextSi: benTextSi,
          beneficiaryShort: benShort,
          beneficiaryShortSi: benShortSi,
          schoolNameSi: schoolSi,
          studentsReached: reached || existing.studentsReached || 0,
          lastModified: new Date().toISOString().split('T')[0]
        });
        saveCollection(STORAGE_KEYS.PROJECTS_PAST, list);
        MansalaDB.logActivity(currentUser, 'past_project_update', `${currentUser ? currentUser.name : 'Admin'} updated completed project: ${existing.schoolName}`, 'Recap and gallery details updated.');
        return existing;
      } else {
        const newPast = Object.assign({}, projectData, {
          id: 'past-' + (Date.now()),
          category: cat,
          categoryLabel: catLabel,
          categoryLabelSi: catLabelSi,
          beneficiaryText: benText,
          beneficiaryTextSi: benTextSi,
          beneficiaryShort: benShort,
          beneficiaryShortSi: benShortSi,
          schoolNameSi: schoolSi,
          studentsReached: reached,
          dateAdded: new Date().toISOString().split('T')[0]
        });
        list.unshift(newPast);
        saveCollection(STORAGE_KEYS.PROJECTS_PAST, list);
        MansalaDB.logActivity(currentUser, 'past_project_create', `${currentUser ? currentUser.name : 'Admin'} added past project recap: ${newPast.schoolName}`, `Held on ${newPast.dateHeld} with ${newPast.beneficiaryText}.`);
        return newPast;
      }
    },

    /**
     * Delete past project
     */
    deletePastProject: function(currentUser, projectId) {
      const list = getCollection(STORAGE_KEYS.PROJECTS_PAST, SEED_DATA.projectsPast);
      const index = list.findIndex(p => p.id === projectId);
      if (index === -1) throw new Error('Past project not found.');
      const target = list[index];

      list.splice(index, 1);
      saveCollection(STORAGE_KEYS.PROJECTS_PAST, list);
      MansalaDB.logActivity(currentUser, 'past_project_delete', `${currentUser ? currentUser.name : 'Admin'} removed past project: ${target.schoolName}`, 'Removed from completed showcase.');
      return true;
    },

    // ==================== DONATIONS & BANK SLIPS VERIFICATION ====================
    /**
     * Get donations (supports filter by status: 'all', 'pending', 'approved', 'rejected')
     */
    getDonations: function(currentUser, options) {
      if (currentUser && currentUser.role === 'coordinator') {
        return [];
      }
      const list = getCollection(STORAGE_KEYS.DONATIONS, SEED_DATA.donations);
      if (options && options.status && options.status !== 'all') {
        return list.filter(d => d.status.toLowerCase() === options.status.toLowerCase());
      }
      return list;
    },

    /**
     * Submit donation slip from public Give Funds form
     */
    submitDonation: function(donationData) {
      const list = getCollection(STORAGE_KEYS.DONATIONS, SEED_DATA.donations);
      const newDonation = {
        id: 'don-' + Date.now(),
        donorName: donationData.donorName || 'Anonymous Donor',
        email: donationData.email || '',
        phone: donationData.phone || '',
        projectId: donationData.projectId || 'general',
        projectName: donationData.projectName || 'General Outreach & Seminar Fund',
        amount: Number(donationData.amount) || 0,
        paymentMethod: donationData.paymentMethod || 'Bank Transfer',
        reference: donationData.reference || ('REF-' + Math.floor(100000 + Math.random() * 900000)),
        date: donationData.date || new Date().toISOString().split('T')[0],
        slipUrl: donationData.slipUrl || 'assets/images/sample-slip-1.png',
        notes: donationData.notes || '',
        status: 'pending',
        dateSubmitted: new Date().toISOString().split('T')[0]
      };

      list.unshift(newDonation);
      saveCollection(STORAGE_KEYS.DONATIONS, list);
      const amtText = Number(newDonation.amount) > 0 ? `Rs. ${Number(newDonation.amount).toLocaleString()}` : 'Awaiting admin slip verification';
      MansalaDB.logActivity(null, 'donation_submit', `New donation slip submitted by ${newDonation.donorName}`, `${amtText} for ${newDonation.projectName} (Pending verification).`);
      return newDonation;
    },

    /**
     * Approve or Reject Donation Slip
     * When Approved: automatically increases the linked Upcoming Project's raisedAmount!
     */
    updateDonationStatus: function(currentUser, donationId, newStatus, adminNotes, verifiedAmount) {
      const donations = getCollection(STORAGE_KEYS.DONATIONS, SEED_DATA.donations);
      const target = donations.find(d => d.id === donationId);
      if (!target) throw new Error('Donation record not found.');

      const previousStatus = target.status;
      const previousAmount = Number(target.amount) || 0;

      // If verifiedAmount was supplied, update target.amount with the verified amount from receipt
      if (verifiedAmount !== undefined && verifiedAmount !== null && !isNaN(Number(verifiedAmount)) && Number(verifiedAmount) > 0) {
        target.amount = Number(verifiedAmount);
      }

      target.status = newStatus;
      if (adminNotes) target.adminNotes = adminNotes;
      target.verifiedBy = currentUser ? currentUser.name : 'Administrator';
      target.verifiedDate = new Date().toISOString().split('T')[0];

      // AUTO-INCREMENT LINKED PROJECT RAISED AMOUNT ON APPROVAL
      if (newStatus === 'approved' && previousStatus !== 'approved') {
        if (target.projectId && target.projectId !== 'general') {
          const upcoming = getCollection(STORAGE_KEYS.PROJECTS_UPCOMING, SEED_DATA.projectsUpcoming);
          let proj = upcoming.find(p => p.id === target.projectId);
          if (!proj && target.projectName) {
            proj = upcoming.find(p => p.schoolName && (p.schoolName.toLowerCase() === target.projectName.toLowerCase() || p.schoolName.toLowerCase().includes(target.projectName.toLowerCase())));
          }
          if (proj) {
            proj.raisedAmount = (Number(proj.raisedAmount) || 0) + Number(target.amount);
            saveCollection(STORAGE_KEYS.PROJECTS_UPCOMING, upcoming);
            MansalaDB.logActivity(currentUser, 'donation_applied', `Rs. ${target.amount.toLocaleString()} credited to ${proj.schoolName}`, `New total raised: Rs. ${proj.raisedAmount.toLocaleString()} / Rs. ${proj.targetAmount.toLocaleString()}`);
          }
        }
      } else if (previousStatus === 'approved' && newStatus === 'approved' && previousAmount !== Number(target.amount)) {
        // If amount changed while already approved, adjust difference
        if (target.projectId && target.projectId !== 'general') {
          const diff = Number(target.amount) - previousAmount;
          const upcoming = getCollection(STORAGE_KEYS.PROJECTS_UPCOMING, SEED_DATA.projectsUpcoming);
          let proj = upcoming.find(p => p.id === target.projectId);
          if (!proj && target.projectName) {
            proj = upcoming.find(p => p.schoolName && (p.schoolName.toLowerCase() === target.projectName.toLowerCase() || p.schoolName.toLowerCase().includes(target.projectName.toLowerCase())));
          }
          if (proj) {
            proj.raisedAmount = Math.max(0, (Number(proj.raisedAmount) || 0) + diff);
            saveCollection(STORAGE_KEYS.PROJECTS_UPCOMING, upcoming);
          }
        }
      } else if (previousStatus === 'approved' && newStatus !== 'approved') {
        // If an approval was revoked/rejected, safely subtract
        if (target.projectId && target.projectId !== 'general') {
          const upcoming = getCollection(STORAGE_KEYS.PROJECTS_UPCOMING, SEED_DATA.projectsUpcoming);
          let proj = upcoming.find(p => p.id === target.projectId);
          if (!proj && target.projectName) {
            proj = upcoming.find(p => p.schoolName && (p.schoolName.toLowerCase() === target.projectName.toLowerCase() || p.schoolName.toLowerCase().includes(target.projectName.toLowerCase())));
          }
          if (proj) {
            proj.raisedAmount = Math.max(0, (Number(proj.raisedAmount) || 0) - Number(target.amount));
            saveCollection(STORAGE_KEYS.PROJECTS_UPCOMING, upcoming);
          }
        }
      }

      saveCollection(STORAGE_KEYS.DONATIONS, donations);
      MansalaDB.logActivity(currentUser, 'donation_' + newStatus, `${currentUser ? currentUser.name : 'Admin'} ${newStatus} donation #${target.id}`, `Donor: ${target.donorName}, Amount: Rs. ${Number(target.amount).toLocaleString()}`);
      return target;
    },

    /**
     * Delete a donation record
     * If the donation was 'approved', automatically deducts its amount from the linked project's raisedAmount
     * so that the project's raised amount goes down and funding percentage goes down accordingly.
     */
    deleteDonation: function(currentUser, donationId) {
      const donations = getCollection(STORAGE_KEYS.DONATIONS, SEED_DATA.donations);
      const index = donations.findIndex(d => d.id === donationId);
      if (index === -1) throw new Error('Donation record not found.');
      const target = donations[index];

      // If the donation was approved and has an amount, deduct it from the linked upcoming project
      if ((target.status || '').toLowerCase() === 'approved' && Number(target.amount) > 0) {
        if (target.projectId && target.projectId !== 'general') {
          const upcoming = getCollection(STORAGE_KEYS.PROJECTS_UPCOMING, SEED_DATA.projectsUpcoming);
          let proj = upcoming.find(p => p.id === target.projectId);
          if (!proj && target.projectName) {
            proj = upcoming.find(p => p.schoolName && (p.schoolName.toLowerCase() === target.projectName.toLowerCase() || p.schoolName.toLowerCase().includes(target.projectName.toLowerCase())));
          }
          if (proj) {
            const deductAmt = Number(target.amount);
            proj.raisedAmount = Math.max(0, (Number(proj.raisedAmount) || 0) - deductAmt);
            saveCollection(STORAGE_KEYS.PROJECTS_UPCOMING, upcoming);
            MansalaDB.logActivity(
              currentUser,
              'donation_deducted',
              `Rs. ${deductAmt.toLocaleString()} deducted from ${proj.schoolName} (Donation deleted)`,
              `New total raised: Rs. ${proj.raisedAmount.toLocaleString()} / Rs. ${proj.targetAmount.toLocaleString()} (${Math.min(100, Math.round((proj.raisedAmount / (proj.targetAmount || 1)) * 100))}%)`
            );
          }
        }
      }

      // Remove donation from collection
      donations.splice(index, 1);
      saveCollection(STORAGE_KEYS.DONATIONS, donations);

      // Log deletion
      MansalaDB.logActivity(
        currentUser,
        'donation_delete',
        `${currentUser ? currentUser.name : 'Admin'} removed donation #${target.id}`,
        `Donor: ${target.donorName}, Stated Amount: Rs. ${Number(target.amount || 0).toLocaleString()} (Status: ${target.status})`
      );

      return true;
    },

    /**
     * Submit public enquiry from contact.html
     */
    submitEnquiry: function(enquiryData) {
      const list = getCollection(STORAGE_KEYS.ENQUIRIES, SEED_DATA.enquiries);
      const name = enquiryData.senderName || enquiryData.name || enquiryData.fromName || 'Anonymous Student';
      const email = enquiryData.senderEmail || enquiryData.email || enquiryData.fromEmail || '';
      const cat = enquiryData.category || enquiryData.subjectArea || 'General Enquiry';
      const today = new Date().toISOString().split('T')[0];

      const newEnq = {
        id: 'enq-' + Date.now(),
        senderName: name,
        senderEmail: email,
        email: email,
        phone: enquiryData.phone || '',
        subject: enquiryData.subject || 'General Enquiry',
        category: cat,
        subjectArea: enquiryData.subjectArea || cat,
        message: enquiryData.message || '',
        receivedDate: today,
        date: today,
        status: 'Pending',
        assignedCoordinatorId: enquiryData.assignedCoordinatorId || 'usr-coord-1',
        assignedCoordinatorName: enquiryData.assignedCoordinatorName || 'Science Desk'
      };

      list.unshift(newEnq);
      saveCollection(STORAGE_KEYS.ENQUIRIES, list);
      MansalaDB.logActivity(null, 'enquiry_submit', `New enquiry from ${newEnq.senderName}`, `Subject: ${newEnq.subject}`);
      return newEnq;
    },

    /**
     * System Settings & Configuration (Admin-Only)
     */
    getSettings: function(currentUser) {
      if (currentUser.role !== 'admin') {
        throw new Error('Unauthorized: System settings access is restricted to Administrators.');
      }
      return getCollection(STORAGE_KEYS.SETTINGS, SEED_DATA.settings);
    },

    /**
     * Save Settings
     */
    saveSettings: function(currentUser, newSettings) {
      if (currentUser.role !== 'admin') {
        throw new Error('Unauthorized: System settings update is restricted to Administrators.');
      }
      const settings = getCollection(STORAGE_KEYS.SETTINGS, SEED_DATA.settings);
      Object.assign(settings, newSettings);
      saveCollection(STORAGE_KEYS.SETTINGS, settings);
      MansalaDB.logActivity(currentUser, 'settings_update', `${currentUser.name} updated system settings`, 'Programme configuration adjusted.');
      return settings;
    },

    /**
     * Reset database to initial seed (convenience helper)
     */
    resetToSeed: function() {
      localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(SEED_DATA.users));
      localStorage.setItem(STORAGE_KEYS.RESOURCES, JSON.stringify(SEED_DATA.resources));
      localStorage.setItem(STORAGE_KEYS.QUIZZES, JSON.stringify(SEED_DATA.quizzes));
      localStorage.setItem(STORAGE_KEYS.PROJECTS_UPCOMING, JSON.stringify(SEED_DATA.projectsUpcoming));
      localStorage.setItem(STORAGE_KEYS.PROJECTS_PAST, JSON.stringify(SEED_DATA.projectsPast));
      localStorage.setItem(STORAGE_KEYS.DONATIONS, JSON.stringify(SEED_DATA.donations));
      localStorage.setItem(STORAGE_KEYS.MENTORS, JSON.stringify(SEED_DATA.mentors));
      localStorage.setItem(STORAGE_KEYS.ENQUIRIES, JSON.stringify(SEED_DATA.enquiries));
      localStorage.setItem(STORAGE_KEYS.ACTIVITY, JSON.stringify(SEED_DATA.activity));
      localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(SEED_DATA.settings));
      console.log('Mansala DB reset to clean seed data.');
    }
  };

  // Expose to window
  window.MansalaFiles = MansalaFiles;
  window.MansalaAuth = Auth;
  window.MansalaDB = MansalaDB;
  MansalaDB.Files = MansalaFiles;
  window.escapeHtml = function escapeHtml(str) {
      if (str === null || str === undefined) return '';
      return String(str).replace(/[&<>"']/g, function(m) {
        switch (m) {
          case '&': return '&amp;';
          case '<': return '&lt;';
          case '>': return '&gt;';
          case '"': return '&quot;';
          case "'": return '&#39;';
          default: return m;
        }
      });
    };

})(window);
