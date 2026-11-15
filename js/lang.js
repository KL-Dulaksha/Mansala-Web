/**
 * Mansala - Global Bilingual Language Manager (EN / SI)
 * Translates the entire public portal seamlessly into Sinhala or English.
 * Supports all public pages: Home, About, Projects, Learning Resources, Quizzes, Mentorship, Help Desk
 * and future pages automatically.
 */
(function() {
  'use strict';

  const STORAGE_KEY = 'mansala_lang';

  // Comprehensive Dictionary of 500+ Terms, Headings, Paragraphs & Card Text
  const TRANSLATIONS = {
    "Visual quick-reference charts for the first 20 elements, electron configurations, periodic trends, electronegativity, and ionic/covalent bonding models.": "පළමු මූලද්‍රව්‍ය 20, ඉලෙක්ට්‍රොනික වින්‍යාසය, ආවර්තිතා ප්‍රවණතා, විද්‍යුත් සෘණතාව සහ අයනික/සහසංයුජ බන්ධන ආකෘති පිළිබඳ දෘශ්‍ය සටහන්.",
    "Science Revision Materials – Periodic Table & Atomic Structure": "විද්‍යාව පුනරීක්ෂණ ද්‍රව්‍ය — ආවර්තිතා වගුව සහ පරමාණුක ව්‍යුහය",
    "Science Revision Materials — Periodic Table & Atomic Structure": "විද්‍යාව පුනරීක්ෂණ ද්‍රව්‍ය — ආවර්තිතා වගුව සහ පරමාණුක ව්‍යුහය",
    "Intensive practice collection of 50 timed Part I short questions covering all core units with instant answer keys and mentor shortcut techniques.": "සියලුම මූලික ඒකක ආවරණය වන පරිදි ක්ෂණික පිළිතුරු සහ කෙටි ක්‍රම සහිත I කොටසේ කෙටි ප්‍රශ්න 50 ක දැඩි පුහුණු එකතුවක්.",
    "O/L Mathematics – 2023 Model Paper (Part I Short Questions)": "සා/පෙළ ගණිතය — 2023 ආදර්ශ ප්‍රශ්න පත්‍රය (I කොටස කෙටි ප්‍රශ්න)",
    "O/L Mathematics — 2023 Model Paper (Part I Short Questions)": "සා/පෙළ ගණිතය — 2023 ආදර්ශ ප්‍රශ්න පත්‍රය (I කොටස කෙටි ප්‍රශ්න)",
    "Quick review notes on food chains, ecological pyramids, biogeochemical cycles, Sri Lankan forest biomes, and human impacts on biodiversity conservation.": "ආහාර දාම, පරිසර පිරමිඩ, ජෛව භූ-රසායනික චක්‍ර, ශ්‍රී ලංකාවේ වනාන්තර ජෛව කලාප සහ ජෛව විවිධත්ව සංරක්ෂණය පිළිබඳ කෙටි සමාලෝචන සටහන්.",
    "Science Concept Summary – Ecology, Biomes & Environment": "විද්‍යා සංකල්ප සාරාංශය — පරිසර විද්‍යාව, ජෛව කලාප සහ පරිසරය",
    "Science Concept Summary — Ecology, Biomes & Environment": "විද්‍යා සංකල්ප සාරාංශය — පරිසර විද්‍යාව, ජෛව කලාප සහ පරිසරය",
    "Complete marking scheme with mark breakdowns for method marks (M), accuracy marks (A), and independent marks (B) across all 2022 questions.": "2022 සියලුම ප්‍රශ්න සඳහා ක්‍රම ලකුණු (M), නිරවද්‍යතා ලකුණු (A), සහ ස්වාධීන ලකුණු (B) බෙදාහැරීම් සහිත සම්පූර්ණ ලකුණු දීමේ පටිපාටිය.",
    "O/L Mathematics – 2022 Marking Scheme & Answering Rubric": "සා/පෙළ ගණිතය — 2022 ලකුණු දීමේ පටිපාටිය සහ පිළිතුරු මාර්ගෝපදේශය",
    "O/L Mathematics — 2022 Marking Scheme & Answering Rubric": "සා/පෙළ ගණිතය — 2022 ලකුණු දීමේ පටිපාටිය සහ පිළිතුරු මාර්ගෝපදේශය",
    "Comprehensive notes covering current, voltage, resistance, Ohm's law, series/parallel circuit analysis, electromagnetic induction, and domestic wiring.": "ධාරාව, වෝල්ටීයතාව, ප්‍රතිරෝධය, ඕම්ගේ නියමය, ශ්‍රේණිගත/සමාන්තරගත පරිපථ, විද්‍යුත් චුම්භක ප්‍රේරණය සහ ගෘහ විදුලි රැහැන් ඇදීම පිළිබඳ විස්තීර්ණ සටහන්.",
    "Science Revision Notes – Electricity, Magnetism & Circuits": "විද්‍යා පුනරීක්ෂණ සටහන් — විද්‍යුතය, චුම්භකත්වය සහ පරිපථ",
    "Science Revision Notes — Electricity, Magnetism & Circuits": "විද්‍යා පුනරීක්ෂණ සටහන් — විද්‍යුතය, චුම්භකත්වය සහ පරිපථ",
    "Essential formulae and worked examples for percentages, taxes, customs duty, compound interest, reducing balance depreciation, and share market dividends.": "ප්‍රතිශත, බදු, රේගු ගාස්තු, වැල් පොලිය, හීනවන ශේෂ ක්ෂයවීම් සහ කොටස් වෙළඳපල ලාභාංශ සඳහා අත්‍යවශ්‍ය සූත්‍ර සහ විසඳූ උදාහරණ.",
    "Mathematics Notes – Commercial Arithmetic & Compound Interest": "ගණිතය සටහන් — වාණිජ ගණිතය සහ වැල් පොලිය",
    "Mathematics Notes — Commercial Arithmetic & Compound Interest": "ගණිතය සටහන් — වාණිජ ගණිතය සහ වැල් පොලිය",
    "Full-length 2024 model examination dossier integrating real-life science applications, structured essays, and university mentor scoring criteria.": "ප්‍රායෝගික විද්‍යාත්මක යෙදීම්, ව්‍යුහගත රචනා සහ විශ්වවිද්‍යාල උපදේශක ලකුණු ලබාදීමේ නිර්ණායක ඇතුළත් සම්පූර්ණ 2024 ආදර්ශ විභාග ලේඛනය.",
    "O/L Science – 2024 National Syllabus Model Dossier": "සා/පෙළ විද්‍යාව — 2024 ජාතික විෂය නිර්දේශ ආදර්ශ ලේඛනය",
    "O/L Science — 2024 National Syllabus Model Dossier": "සා/පෙළ විද්‍යාව — 2024 ජාතික විෂය නිර්දේශ ආදර්ශ ලේඛනය",
    "Concise review of Venn diagrams, set operations, sample spaces, tree diagrams, and independent event probability calculations with past exam problems.": "වෙන් රූප සටහන්, කුලක කර්ම, නියැදි අවකාශ, රුක් සටහන් සහ ස්වාධීන සිදුවීම් සම්භාවිතා ගණනය කිරීම් පිළිබඳ කෙටි පුනරීක්ෂණ මාර්ගෝපදේශය.",
    "Mathematics Revision Guide – Probability & Cumulative Sets": "ගණිතය පුනරීක්ෂණ මාර්ගෝපදේශය — සම්භාවිතාව සහ කුලක",
    "Mathematics Revision Guide — Probability & Cumulative Sets": "ගණිතය පුනරීක්ෂණ මාර්ගෝපදේශය — සම්භාවිතාව සහ කුලක",
    "Specialised physics model paper covering motion graphs, momentum, reflection, refraction, lenses, and electromagnetic wave spectra with answer key.": "චලිත ප්‍රස්ථාර, ගම්‍යතාව, පරාවර්තනය, වර්තනය, කාච සහ විද්‍යුත් චුම්භක තරංග වර්ණාවලිය ආවරණය වන පිළිතුරු සහිත විශේෂිත භෞතික විද්‍යා ආදර්ශ ප්‍රශ්න පත්‍රය.",
    "Science Model Paper – Physics Mechanics & Wave Optics": "විද්‍යාව ආදර්ශ ප්‍රශ්න පත්‍රය — භෞතික විද්‍යා යාන්ත්‍ර විද්‍යාව සහ තරංග ප්‍රකාශ විද්‍යාව",
    "Science Model Paper — Physics Mechanics & Wave Optics": "විද්‍යාව ආදර්ශ ප්‍රශ්න පත්‍රය — භෞතික විද්‍යා යාන්ත්‍ර විද්‍යාව සහ තරංග ප්‍රකාශ විද්‍යාව",
    "Official 2021 G.C.E. Ordinary Level Mathematics examination with fully worked step-by-step solutions compiled by university engineering undergraduates.": "සියලුම ප්‍රශ්න සඳහා විශ්වවිද්‍යාල ඉංජිනේරු ශිෂ්‍යයන් විසින් සම්පාදිත පියවරෙන් පියවර විසඳුම් සහිත 2021 සාමාන්‍ය පෙළ ගණිත නිල ප්‍රශ්න පත්‍රය.",
    "O/L Mathematics – 2021 Past Paper & Step-by-Step Solutions": "සා/පෙළ ගණිතය — 2021 පසුගිය ප්‍රශ්න පත්‍රය සහ පියවරෙන් පියවර විසඳුම්",
    "O/L Mathematics — 2021 Past Paper & Step-by-Step Solutions": "සා/පෙළ ගණිතය — 2021 පසුගිය ප්‍රශ්න පත්‍රය සහ පියවරෙන් පියවර විසඳුම්",
    "Structured revision summary covering plant and animal cell structures, organelles, mitosis, meiosis, Mendelian inheritance, and monohybrid crosses.": "ශාක හා සත්ත්ව සෛල ව්‍යුහයන්, අනූනනය, ඌනනය, මෙන්ඩලීය ප්‍රවේණිය සහ ඒකමුහුම් අභිජනන ආවරණය වන ව්‍යුහගත පුනරීක්ෂණ සාරාංශය.",
    "Science Revision Notes – Cellular Biology & Genetics": "විද්‍යාව පුනරීක්ෂණ සටහන් — සෛල ජීව විද්‍යාව සහ ප්‍රවේණිය",
    "Science Revision Notes — Cellular Biology & Genetics": "විද්‍යාව පුනරීක්ෂණ සටහන් — සෛල ජීව විද්‍යාව සහ ප්‍රවේණිය",
    "Comprehensive national-standard model paper simulating the 2024 G.C.E. O/L Mathematics examination with balanced Part I and Part II distributions.": "සමබර I සහ II කොටස් බෙදාහැරීම් සහිත 2024 අ.පො.ස. සාමාන්‍ය පෙළ ගණිත විභාගය අනුකරණය කරන ජාතික මට්ටමේ ආදර්ශ ප්‍රශ්න පත්‍රය.",
    "O/L Mathematics – 2024 Model Examination Paper": "සා/පෙළ ගණිතය — 2024 ආදර්ශ විභාග ප්‍රශ්න පත්‍රය",
    "O/L Mathematics — 2024 Model Examination Paper": "සා/පෙළ ගණිතය — 2024 ආදර්ශ විභාග ප්‍රශ්න පත්‍රය",
    "Step-by-step marking guidelines for the 2021 O/L Science paper with university undergraduate mentor notes detailing standard grading rubrics.": "සම්මත ශ්‍රේණිගත කිරීමේ නිර්ණායක සහ උපදේශක සටහන් සහිත 2021 සා/පෙළ විද්‍යා ප්‍රශ්න පත්‍රය සඳහා වන පියවරෙන් පියවර ලකුණු දීමේ මාර්ගෝපදේශය.",
    "O/L Science – 2021 Marking Scheme & Examiner Comments": "සා/පෙළ විද්‍යාව — 2021 ලකුණු දීමේ පටිපාටිය සහ පරීක්ෂක සටහන්",
    "O/L Science — 2021 Marking Scheme & Examiner Comments": "සා/පෙළ විද්‍යාව — 2021 ලකුණු දීමේ පටිපාටිය සහ පරීක්ෂක සටහන්",
    "Visual quick-reference booklet covering circle theorems, cyclic quadrilaterals, tangents, and standard rider proof steps with diagrammatic aids.": "වෘත්ත ප්‍රමේයයන්, චක්‍රීය චතුරස්‍ර, ස්පර්ශක සහ සම්මත සාධන පියවර රූප සටහන් ආධාරයෙන් පැහැදිලි කරන ඉක්මන් පුනරීක්ෂණ පොත් පිංච.",
    "Mathematics Revision Materials – Geometric Theorems & Proofs": "ගණිතය පුනරීක්ෂණ ද්‍රව්‍ය — ජ්‍යාමිතික ප්‍රමේයයන් සහ සාධන",
    "Mathematics Revision Materials — Geometric Theorems & Proofs": "ගණිතය පුනරීක්ෂණ ද්‍රව්‍ය — ජ්‍යාමිතික ප්‍රමේයයන් සහ සාධන",
    "Complete 2022 G.C.E. O/L Science past paper covering multiple-choice questions, structured essays, and university mentor guidance on answering precision.": "බහුවරණ ප්‍රශ්න, ව්‍යුහගත රචනා සහ නිවැරදි පිළිතුරු ලිවීමේ උපදෙස් ඇතුළත් සම්පූර්ණ 2022 සා/පෙළ විද්‍යාව පසුගිය ප්‍රශ්න පත්‍රය.",
    "O/L Science – 2022 Past Paper (Parts I & II)": "සා/පෙළ විද්‍යාව — 2022 පසුගිය ප්‍රශ්න පත්‍රය (I සහ II කොටස්)",
    "O/L Science — 2022 Past Paper (Parts I & II)": "සා/පෙළ විද්‍යාව — 2022 පසුගිය ප්‍රශ්න පත්‍රය (I සහ II කොටස්)",
    "Full G.C.E. Ordinary Level Mathematics examination paper from 2022 including Part I (short questions) and Part II structured problems with Ruhuna mentor solutions.": "රුහුණ විශ්වවිද්‍යාල ශිෂ්‍ය උපදේශක විසඳුම් සමඟින් I කොටස (කෙටි ප්‍රශ්න) සහ II කොටස (ව්‍යුහගත ගැටළු) ඇතුළත් සම්පූර්ණ 2022 අ.පො.ස. සාමාන්‍ය පෙළ ගණිත ප්‍රශ්න පත්‍රය.",
    "O/L Mathematics – 2022 Past Paper & Mentor Solutions": "සා/පෙළ ගණිතය — 2022 පසුගිය ප්‍රශ්න පත්‍රය සහ උපදේශක විසඳුම්",
    "O/L Mathematics — 2022 Past Paper & Mentor Solutions": "සා/පෙළ ගණිතය — 2022 පසුගිය ප්‍රශ්න පත්‍රය සහ උපදේශක විසඳුම්",
    "Science Concept Summary – Chemical Reactions, Acids & Bases": "විද්‍යා සංකල්ප සාරාංශය — රසායනික ප්‍රතික්‍රියා, අම්ල සහ භස්ම",
    "Mathematics Notes – Simultaneous Equations & Quadratics": "ගණිතය සටහන් — සමගාමී සමීකරණ සහ වර්ගජ ප්‍රකාශන",
    "2023 G.C.E. O/L Science – Complete Examination Dossier": "2023 අ.පො.ස. සා/පෙළ විද්‍යාව — සම්පූර්ණ විභාග ලේඛනය",
    "Revision Guide – Trigonometry & Statistics": "පුනරීක්ෂණ මාර්ගෝපදේශය — ත්‍රිකෝණමිතිය සහ සංඛ්‍යානය",
    "Science Model Paper – Biology & Chemistry": "විද්‍යාව ආදර්ශ ප්‍රශ්න පත්‍රය — ජීව විද්‍යාව සහ රසායන විද්‍යාව",
    "O/L Mathematics – 2023 Marking Scheme": "සා/පෙළ ගණිතය — 2023 ලකුණු දීමේ පටිපාටිය",
    "Science Revision Notes – Energy & Force": "විද්‍යාව පුනරීක්ෂණ සටහන් — ශක්තිය සහ බලය",
    "Mathematics Model Paper – Algebra & Geometry": "ගණිතය ආදර්ශ ප්‍රශ්න පත්‍රය — වීජ ගණිතය සහ ජ්‍යාමිතිය",
    "O/L Science – 2023 Past Paper": "සා/පෙළ විද්‍යාව — 2023 පසුගිය ප්‍රශ්න පත්‍රය",
    "Exit quiz": "ප්‍රශ්නාවලියෙන් ඉවත් වන්න",
    "Search projects": "ව්‍යාපෘති සොයන්න",
    "Sort resources": "සම්පත් පෙළගස්වන්න",
    "Next page": "මීළඟ පිටුව",
    "Previous page": "පෙර පිටුව",
    "Remove slip": "ලදුපත ඉවත් කරන්න",
    "Replace slip": "ලදුපත මාරු කරන්න",
    "Copy Account Number": "ගිණුම් අංකය පිටපත් කරන්න",
    "Close modal": "වසන්න",
    "Open menu": "මෙනුව විවෘත කරන්න",
    "Switch Language (English / Sinhala)": "භාෂාව මාරු කරන්න (ඉංග්‍රීසි / සිංහල)",
    "Main navigation": "ප්‍රධාන සංචලනය",
    "Describe your question or request in detail...": "ඔබගේ ප්‍රශ්නය හෝ ඉල්ලීම සවිස්තරාත්මකව සඳහන් කරන්න…",
    "Describe your question or request in detail…": "ඔබගේ ප්‍රශ්නය හෝ ඉල්ලීම සවිස්තරාත්මකව සඳහන් කරන්න…",
    "your.email@example.com": "ඔබගේ විද්‍යුත් තැපෑල (your.email@example.com)",
    "Enter your full name": "ඔබගේ සම්පූර්ණ නම ඇතුළත් කරන්න",
    "Search by title, subject, or topic...": "මාතෘකාව, විෂය හෝ කරුණු අනුව සොයන්න...",
    "e.g. Priyantha Dissanayake (B.Sc. 2018 Batch)": "උදා: ප්‍රියන්ත දිසානායක (B.Sc. 2018 කණ්ඩායම)",
    "Search projects by cause, school, town, or district (e.g. Akuressa, Flood, Lab, Galle)...": "ව්‍යාපෘති, පාසල, නගරය හෝ දිස්ත්‍රික්කය අනුව සොයන්න (උදා: අකුරැස්ස, ගංවතුර, විද්‍යාගාර, ගාල්ල)...",
  "All Causes": "සියලුම ව්‍යාපෘති",
  "School Seminars": "පාසල් සම්මන්ත්‍රණ",
  "Active Causes & Target Goals": "ක්‍රියාකාරී ව්‍යාපෘති සහ අරමුදල් ඉලක්ක",
  "Active Causes &amp; Target Goals": "ක්‍රියාකාරී ව්‍යාපෘති සහ අරමුදල් ඉලක්ක",
  "Completed Projects & Recaps": "පසුගිය ප්‍රජා ව්‍යාපෘති සමාලෝචනය",
  "Completed Projects &amp; Recaps": "පසුගිය ප්‍රජා ව්‍යාපෘති සමාලෝචනය",
  "Community Outreach, Relief & Educational Projects": "ප්‍රජා සත්කාරක, සහන සහ අධ්‍යාපනික ව්‍යාපෘති",
  "Community Outreach, Relief &amp; Educational Projects": "ප්‍රජා සත්කාරක, සහන සහ අධ්‍යාපනික ව්‍යාපෘති",
  "Learning Resources Past Papers, Notes & Marking Schemes": "ඉගෙනුම් සම්පත් පසුගිය ප්‍රශ්න පත්‍ර, සටහන් සහ ලකුණු දීමේ පටිපාටි",
  "Learning Resources Past Papers, Notes &amp; Marking Schemes": "ඉගෙනුම් සම්පත් පසුගිය ප්‍රශ්න පත්‍ර, සටහන් සහ ලකුණු දීමේ පටිපාටි",
  "Practice Quizzes Self-Paced Topic Assessments": "ප්‍රශ්නාවලි පුහුණුව ස්වයං අධ්‍යයන මාතෘකා ඇගයීම්",
  "1:5 Mentorship Undergraduate Cohort Guidance": "1:5 උපදේශනය විශ්වවිද්‍යාල ශිෂ්‍ය මගපෙන්වීම",
  "විද්‍යා පීඨ ශිෂ්‍ය සංගමය Faculty of Science Students' Union • University of Ruhuna": "විද්‍යා පීඨ ශිෂ්‍ය සංගමය • රුහුණ විශ්වවිද්‍යාලය",
  "Students' Union • Faculty of Science • University of Ruhuna": "ශිෂ්‍ය සංගමය • විද්‍යා පීඨය • රුහුණ විශ්වවිද්‍යාලය",
  "Support an Active Cause &rarr;": "ක්‍රියාකාරී ව්‍යාපෘතියකට දායක වන්න &rarr;",
  "View Past Field Recaps &rarr;": "පසුගිය ක්ෂේත්‍ර වාර්තා බලන්න &rarr;",
  "Download Papers & Notes &rarr;": "ප්‍රශ්න පත්‍ර හා සටහන් ලබාගන්න &rarr;",
  "Download Papers &amp; Notes &rarr;": "ප්‍රශ්න පත්‍ර හා සටහන් ලබාගන්න &rarr;",
  "Practise Quizzes &rarr;": "ප්‍රශ්නාවලි පුහුණු වන්න &rarr;",
  "1:5 Mentorship &rarr;": "1:5 උපදේශනය &rarr;",
  "Learn About Mentorship": "උපදේශනය පිළිබඳව දැනගන්න",
  "Try Practice Quizzes": "ප්‍රශ්නාවලි පුහුණු වන්න",
  "Discover Our Initiative": "අපගේ වැඩසටහන ගවේෂණය කරන්න",
  "Discover Our Initiative &rarr;": "අපගේ වැඩසටහන ගවේෂණය කරන්න &rarr;",
  "Explore All Learning Resources": "සියලුම ඉගෙනුම් සම්පත් ගවේෂණය කරන්න",
  "Explore the Mentorship Programme": "උපදේශන වැඩසටහන ගවේෂණය කරන්න",
  "Programme Background on About Page": "වැඩසටහන් පසුබිම (අප ගැන පිටුවෙන්)",
  "Browse Resources": "සම්පත් පිරික්සන්න",
  "Browse Resources &rarr;": "සම්පත් පිරික්සන්න &rarr;",
  "Try a Quiz": "ප්‍රශ්නාවලියක් කරන්න",
  "Try a Quiz &rarr;": "ප්‍රශ්නාවලියක් කරන්න &rarr;",
  "Explore Mentorship": "උපදේශනය ගවේෂණය කරන්න",
  "Explore Mentorship &rarr;": "උපදේශනය ගවේෂණය කරන්න &rarr;",
  "Support a Community Project &rarr;": "ප්‍රජා ව්‍යාපෘතියකට ආධාර කරන්න &rarr;",
  "Support a Community Cause &rarr;": "ප්‍රජා ව්‍යාපෘතියකට ආධාර කරන්න &rarr;",
  "Access Free Study Hub": "නොමිලේ අධ්‍යාපන පියසට පිවිසෙන්න",
  "Access Free O/L Resources &rarr;": "නොමිලේ සා/පෙළ සම්පත් ලබාගන්න &rarr;",
  "View Active & Completed Projects": "ක්‍රියාකාරී හා පසුගිය ව්‍යාපෘති නරඹන්න",
  "View Active &amp; Completed Projects": "ක්‍රියාකාරී හා පසුගිය ව්‍යාපෘති නරඹන්න",
  "Enter Free Study Hub": "නොමිලේ අධ්‍යාපන පියසට පිවිසෙන්න",
  "Download Official Fieldwork Report (PDF)": "නිල ක්ෂේත්‍ර වාර්තාව බාගත කරන්න (PDF)",
  "⬇ Download PDF (Pending Publication)": "⬇ PDF බාගත කරන්න (ප්‍රකාශනය වෙමින් පවතී)",
  "About the Programme": "වැඩසටහන පිළිබඳව",
  "Our Key Support Areas": "අපගේ ප්‍රධාන සහායක අංශ",
  "Academic Curriculum Focus": "විෂයමාලා ආවරණ අවධානය",
  "Direct intervention targeting the most challenging components of the G.C.E. Ordinary Level syllabus.": "අ.පො.ස. සාමාන්‍ය පෙළ විෂය නිර්දේශයේ වඩාත්ම අභියෝගාත්මක කොටස් ඉලක්ක කරගත් සෘජු අධ්‍යාපනික මැදිහත්වීම.",
  "Grade 10 & 11": "10 සහ 11 ශ්‍රේණි",
  "Grade 10 &amp; 11": "10 සහ 11 ශ්‍රේණි",
  "Mechanics & Motion": "යාන්ත්‍ර විද්‍යාව සහ චලිතය",
  "Mechanics &amp; Motion": "යාන්ත්‍ර විද්‍යාව සහ චලිතය",
  "Chemical Equations": "රසායනික සමීකරණ",
  "Acids & Bases": "අම්ල සහ භස්ම",
  "Acids &amp; Bases": "අම්ල සහ භස්ම",
  "Human Biology": "මානව ජීව විද්‍යාව",
  "Electricity": "ධාරා විද්‍යුතය",
  "Practical Lab Summaries": "ප්‍රායෝගික පරීක්ෂණ සාරාංශ",
  "Simultaneous Equations": "සමගාමී සමීකරණ",
  "Quadratic Graphing": "වර්ගජ ප්‍රස්ථාර",
  "Geometric Theorems": "ජ්‍යාමිතික ප්‍රමේයයන්",
  "Trigonometry": "ත්‍රිකෝණමිතිය",
  "Matrices": "න්‍යාස",
  "Marking Rubrics": "ලකුණු ලබාදීමේ ක්‍රමවේද",
  "Undergraduate Answering Precision & Technique": "සරසවි සිසු විභාග පිළිතුරු ලිවීමේ ශිල්පක්‍රම",
  "Undergraduate Answering Precision &amp; Technique": "සරසවි සිසු විභාග පිළිතුරු ලිවීමේ ශිල්පක්‍රම",
  "University mentors deliver focused analytical breakdowns of past paper essay questions, common student misconceptions, step-by-step mathematical working, and marking rubric requirements.": "පසුගිය විභාග රචනා ප්‍රශ්න, සිසුන් අතර බහුලව සිදුවන වැරදි, පියවරෙන් පියවර ගණනය කිරීම් සහ නිවැරදි ලකුණු දීමේ නිර්ණායක පිළිබඳව විශ්වවිද්‍යාල උපදේශකවරුන් සවිස්තරාත්මකව පහදා දෙයි.",
  "Academic Repository": "අධ්‍යයන ලේඛනාගාරය",
  "Curated Study Dossiers": "සම්පාදිත අධ්‍යයන ලේඛන",
  "Download syllabus-aligned revision materials prepared for O/L Science & Mathematics candidates.": "සා/පෙළ විද්‍යාව හා ගණිතය විෂයයන් වෙනුවෙන් සකස් කළ විෂය නිර්දේශගත පුනරීක්ෂණ ද්‍රව්‍ය ලබාගන්න.",
  "Download syllabus-aligned revision materials prepared for O/L Science &amp; Mathematics candidates.": "සා/පෙළ විද්‍යාව හා ගණිතය විෂයයන් වෙනුවෙන් සකස් කළ විෂය නිර්දේශගත පුනරීක්ෂණ ද්‍රව්‍ය ලබාගන්න.",
  "Interactive Self-Assessment": "අන්තර්ක්‍රියාකාරී ස්වයං ඇගයීම",
  "Try our interactive quizzes to assess your understanding and track your progress.": "අන්තර්ක්‍රියාකාරී ප්‍රශ්නාවලි මඟින් ඔබේ විෂය දැනුම පරීක්ෂා කර ප්‍රගතිය හඳුනාගන්න.",
  "Cohort Guidance Model": "කුඩා කණ්ඩායම් මගපෙන්වීමේ ආකෘතිය",
  "Personalised academic guidance connecting university undergraduate mentors with small cohorts of five O/L candidates.": "රුහුණ විද්‍යා පීඨ සිසුන් සමඟ සා/පෙළ සිසුන් පස් දෙනෙකුගෙන් යුත් කුඩා කණ්ඩායම් සම්බන්ධ කෙරෙන පෞද්ගලික අධ්‍යාපනික උපදේශනය.",
  "What Mentors Provide": "උපදේශකවරුන් සපයන මගපෙන්වීම",
  "Direct Benefits for Students": "සිසුන්ට ලැබෙන සෘජු ප්‍රතිලාභ",
  "Confidence & Mastery: Overcome subject apprehension through structured practice.": "විශ්වාසය සහ නිපුණතාවය: ක්‍රමානුකූල පුහුණුව තුළින් විෂය බිය දුරු කරගන්න.",
  "Confidence &amp; Mastery: Overcome subject apprehension through structured practice.": "විශ්වාසය සහ නිපුණතාවය: ක්‍රමානුකූල පුහුණුව තුළින් විෂය බිය දුරු කරගන්න.",
  "Undergraduate Volunteer": "සරසවි ස්වේච්ඡා සිසුන්",
  "University Mentor (University of Ruhuna)": "විශ්වවිද්‍යාල උපදේශක (රුහුණ විශ්වවිද්‍යාලය)",
  "Guides small group of 5 candidates • Diagnoses syllabus gaps • Analyzes marking schemes • Tracks progress": "සිසුන් 5 දෙනෙකුගේ කණ්ඩායමකට මග පෙන්වයි • විෂය දුර්වලතා හඳුනා ගනී • ලකුණු දීමේ පටිපාටි විවරණය කරයි • ප්‍රගතිය නිරීක්ෂණය කරයි",
  "Science & Maths Core": "විද්‍යාව හා ගණිතය මූලික විෂයයන්",
  "Science &amp; Maths Core": "විද්‍යාව හා ගණිතය මූලික විෂයයන්",
  "Science & Maths Focus": "විද්‍යාව හා ගණිතය මූලික විෂයයන්",
  "Science &amp; Maths Focus": "විද්‍යාව හා ගණිතය මූලික විෂයයන්",
  "Theory & Concept Revision": "සිද්ධාන්ත සහ සංකල්ප පුනරීක්ෂණය",
  "Theory &amp; Concept Revision": "සිද්ධාන්ත සහ සංකල්ප පුනරීක්ෂණය",
  "Structured Essay Guidance": "ව්‍යුහගත රචනා ප්‍රශ්න මගපෙන්වීම",
  "Doubt Clearing & Methods": "ගැටළු නිරවුල් කිරීම සහ කෙටි ක්‍රම",
  "Doubt Clearing &amp; Methods": "ගැටළු නිරවුල් කිරීම සහ කෙටි ක්‍රම",
  "Explore free learning resources, challenge yourself with interactive quizzes, or discover how our mentorship programme can support your O/L journey.": "නොමිලේ ඉගෙනුම් සම්පත් ලබාගන්න, අන්තර්ක්‍රියාකාරී ප්‍රශ්නාවලි මඟින් දැනුම පරීක්ෂා කරගන්න, නැතහොත් අපගේ උපදේශන වැඩසටහන හා සම්බන්ධ වන්න.",
  "Movement Overview": "ව්‍යාපාරික දළ විශ්ලේෂණය",
  "The Context": "පසුබිම හා සන්දර්භය",
  "Why Mansala expanded beyond traditional academic boundaries": "මංසල සාම්ප්‍රදායික අධ්‍යාපනික සීමාවන්ගෙන් ඔබ්බට ව්‍යාප්ත වූයේ ඇයි",
  "Sri Lanka's rural educational landscape faces profound systemic disparities. Students in underserved rural districts often lack access to well-equipped science laboratories, updated library collections, and qualified subject teachers. Consequently, pass rates in foundational subjects such as G.C.E. Ordinary Level Science and Mathematics remain significantly depressed compared to urban centres.": "ශ්‍රී ලංකාවේ ග්‍රාමීය අධ්‍යාපන ක්ෂේත්‍රය දැඩි පද්ධතිමය විෂමතාවන්ට මුහුණ දෙයි. පහසුකම් අඩු ග්‍රාමීය දිස්ත්‍රික්කවල සිසුන්ට හොඳින් සන්නද්ධ වූ විද්‍යාගාර, යාවත්කාලීන පුස්තකාල සහ සුදුසුකම් ලත් ගුරුවරුන්ගේ හිඟය නිරන්තරයෙන් බලපායි. එහි ප්‍රතිඵලයක් ලෙස සාමාන්‍ය පෙළ විද්‍යාව හා ගණිතය වැනි මූලික විෂයයන්හි සමත් ප්‍රතිශතය නාගරික ප්‍රදේශවලට සාපේක්ෂව සැලකිය යුතු ලෙස පහළ මට්ටමක පවතී.",
  "Compounding this educational divide, recurring seasonal natural disasters — particularly monsoon-triggered floods and landslides in the Southern Province and surrounding districts — routinely inundate rural classrooms, destroy school libraries, and displace vulnerable farming and daily-wage families. Under such extreme strain, children's education is often the first casualty.": "මෙම අධ්‍යාපනික පරතරයට අමතරව, දකුණු පළාත සහ ඒ අවට දිස්ත්‍රික්කවල වාරකන් වැසි සමඟ ඇතිවන ගංවතුර සහ නායයෑම් හේතුවෙන් ග්‍රාමීය පන්තිකාමර ජලයෙන් යටවීම, පුස්තකාල විනාශ වීම සහ අඩු ආදායම්ලාභී පවුල් අවතැන් වීම නිරන්තරයෙන් සිදුවේ. මෙවැනි හදිසි ආපදා හමුවේ දරුවන්ගේ අධ්‍යාපනය වඩාත්ම අවදානමට ලක්වන අංශය බවට පත්වෙයි.",
  "Recognising that academic excellence cannot flourish in isolation from social welfare, the Faculty of Science Students' Union broadened Mansala from an O/L revision workshop into a comprehensive dual-wing intervention model: combining emergency flood relief and tangible school infrastructure aid with high-impact, free academic resources and mentorship.": "ප්‍රජා සුබසාධනයෙන් බැහැරව අධ්‍යාපනික විශිෂ්ටත්වයක් පමණක් ළඟා කරගත නොහැකි බව වටහාගත් විද්‍යා පීඨ ශිෂ්‍ය සංගමය, මංසල සාමාන්‍ය පෙළ සම්මන්ත්‍රණයකින් ඔබ්බට ගෙන යමින් ද්විත්ව මෙහෙවර ආකෘතියක් දක්වා පුළුල් කළේය: එනම් හදිසි ආපදා සහන සහ පාසල් යටිතල පහසුකම් සංවර්ධනය, නොමිලේ ලබාදෙන උසස් අධ්‍යාපනික සම්පත් සහ උපදේශනය සමඟ ඒකාබද්ධ කිරීමයි.",
  "Guiding Light": "මගපෙන්වන ආලෝකය",
  "The Vision": "අපගේ දැක්ම",
  "National Humanitarian Equity • Academic Distinction": "ජාතික මානුෂීය සමානාත්මතාවය • අධ්‍යාපනික විශිෂ්ටත්වය",
  "National Humanitarian Equity &bull; Academic Distinction": "ජාතික මානුෂීය සමානාත්මතාවය • අධ්‍යාපනික විශිෂ්ටත්වය",
  "Core guiding principle of the Faculty of Science Students' Union, University of Ruhuna": "රුහුණ විශ්වවිද්‍යාලයේ විද්‍යා පීඨ ශිෂ්‍ය සංගමයේ මූලික මාර්ගෝපදේශක ප්‍රතිපත්තිය",
  "Action & Delivery": "ක්‍රියාකාරීත්වය සහ ඉටුකිරීම",
  "Action &amp; Delivery": "ක්‍රියාකාරීත්වය සහ ඉටුකිරීම",
  "The Mission": "අපගේ මෙහෙවර",
  "Undergraduate Action • Grassroots Delivery Framework": "සරසවි සිසු ක්‍රියාකාරීත්වය • බිම් මට්ටමේ මෙහෙයුම් ව්‍යුහය",
  "Undergraduate Action &bull; Grassroots Delivery Framework": "සරසවි සිසු ක්‍රියාකාරීත්වය • බිම් මට්ටමේ මෙහෙයුම් ව්‍යුහය",
  "Translating science education and student compassion into tangible community impact": "විද්‍යා අධ්‍යාපනය සහ ශිෂ්‍ය සහකම්පනය ප්‍රායෝගික ප්‍රජා සත්කාරයක් බවට පත් කිරීම",
  "Strategic Roadmap": "උපායමාර්ගික සැලැස්ම",
  "Six foundational commitments driving Mansala's humanitarian and educational impact.": "මංසල මානුෂීය සහ අධ්‍යාපනික මෙහෙවර මෙහෙයවන මූලික ප්‍රතිඥා හය.",
  "Emergency Disaster & Flood Relief": "හදිසි ආපදා සහ ගංවතුර සහන",
  "Emergency Disaster &amp; Flood Relief": "හදිසි ආපදා සහ ගංවතුර සහන",
  "Rapidly deploy volunteer taskforces to flood- and landslide-affected regions to conduct school cleanups, restore sanitation, and deliver dry food rations to vulnerable families.": "ගංවතුර සහ නායයෑම්වලින් පීඩාවට පත් ප්‍රදේශවල පාසල් පිරිසිදු කිරීම, සනීපාරක්ෂක පහසුකම් යථා තත්ත්වයට පත් කිරීම සහ පීඩාවට පත් පවුල් වෙත වියළි ආහාර බෙදා දීම සඳහා ස්වේච්ඡා කණ්ඩායම් ක්ෂණිකව යෙදවීම.",
  "Rural School Aid & Science Labs": "ග්‍රාමීය පාසල් ආධාර සහ විද්‍යාගාර",
  "Rural School Aid &amp; Science Labs": "ග්‍රාමීය පාසල් ආධාර සහ විද්‍යාගාර",
  "Direct equip under-resourced rural schools with science laboratory apparatus, glassware, chemicals, library books, and essential student stationery kits.": "පහසුකම් අඩු ග්‍රාමීය පාසල් සඳහා විද්‍යාගාර උපකරණ, වීදුරු භාණ්ඩ, රසායනික ද්‍රව්‍ය, පුස්තකාල පොත්පත් සහ අත්‍යවශ්‍ය ලිපිද්‍රව්‍ය කට්ටල සෘජුවම ලබා දීම.",
  "Directly equip under-resourced rural schools with science laboratory apparatus, glassware, chemicals, library books, and essential student stationery kits.": "පහසුකම් අඩු ග්‍රාමීය පාසල් සඳහා විද්‍යාගාර උපකරණ, වීදුරු භාණ්ඩ, රසායනික ද්‍රව්‍ය, පුස්තකාල පොත්පත් සහ අත්‍යවශ්‍ය ලිපිද්‍රව්‍ය කට්ටල සෘජුවම ලබා දීම.",
  "Free Curated Study Dossiers": "නොමිලේ සම්පාදිත අධ්‍යයන ලේඛන",
  "Author and publish comprehensive, syllabus-aligned revision dossiers, model examination papers, and detailed marking schemes with 100% free digital access.": "විෂය නිර්දේශයට අනුකූල පුනරීක්ෂණ සටහන්, ආදර්ශ ප්‍රශ්න පත්‍ර සහ සවිස්තර ලකුණු දීමේ පටිපාටි සම්පාදනය කර 100% නොමිලේ ඩිජිටල් මාධ්‍යයෙන් ප්‍රකාශයට පත් කිරීම.",
  "1:5 Mentorship & Seminars": "1:5 උපදේශනය සහ සම්මන්ත්‍රණ",
  "1:5 Mentorship &amp; Seminars": "1:5 උපදේශනය සහ සම්මන්ත්‍රණ",
  "Conduct intensive, volunteer-led regional problem-solving seminars and structured small-group mentorship to build student confidence and examination mastery.": "සිසුන්ගේ විභාග ආත්මවිශ්වාසය සහ විෂය ප්‍රවීණතාවය ගොඩනැංවීම උදෙසා ප්‍රාදේශීය සම්මන්ත්‍රණ සහ 1:5 කුඩා කණ්ඩායම් උපදේශන වැඩසටහන් මෙහෙයවීම.",
  "100% Transparent Governance": "100% විනිවිදභාවයෙන් යුතු පාලනය",
  "Maintain total transparency in all community funding, bank transfers, and relief procurement with published audit recaps and verified deposit slips.": "ප්‍රසිද්ධ කරන ලද විගණන වාර්තා සහ තහවුරු කළ බැංකු තැන්පතු පත්‍රිකා මඟින් සියලුම මූල්‍ය ආධාර සහ වියදම්වල පූර්ණ විනිවිදභාවය තහවුරු කිරීම.",
  "Cultivate Civic Leadership": "ප්‍රජා නායකත්වය ගොඩනැංවීම",
  "Nurture a generation of university undergraduates with frontline empathy, crisis-response leadership, pedagogical skills, and deep civic commitment.": "සහකම්පනය, ආපදා ප්‍රතිචාර නායකත්වය, ඉගැන්වීමේ කුසලතා සහ සමාජ වගකීමෙන් සපිරි විශ්වවිද්‍යාල උපාධි අපේක්ෂක පරපුරක් බිහි කිරීම.",
  "Community Stakeholders": "ප්‍රජා පාර්ශ්වකරුවන්",
  "Whom the Mansala movement serves and empowers across Sri Lanka.": "මංසල ව්‍යාපාරය මගින් ශ්‍රී ලංකාව පුරා සවිබල ගන්වන සහ සේවය කරන පාර්ශ්ව.",
  "O/L Students & Rural Candidates": "සා/පෙළ සිසුන් සහ ග්‍රාමීය අපේක්ෂකයින්",
  "O/L Students &amp; Rural Candidates": "සා/පෙළ සිසුන් සහ ග්‍රාමීය අපේක්ෂකයින්",
  "Secondary school students in underprivileged and rural districts preparing for the G.C.E. O/L examination. They receive free master study dossiers, interactive diagnostic quizzes, regional seminar training, and 1:5 mentorship to achieve academic distinction.": "අඩු පහසුකම් සහිත ග්‍රාමීය දිස්ත්‍රික්කවල සාමාන්‍ය පෙළ විභාගයට සූදානම් වන ද්විතීයික පාසල් සිසුන්. ඔවුන් වෙත නොමිලේ අධ්‍යයන ලිපිගොනු, ප්‍රශ්නාවලි, ප්‍රාදේශීය සම්මන්ත්‍රණ සහ 1:5 උපදේශනය ලබා දේ.",
  "Disaster-Affected Families & Communities": "ආපදාවට පත් පවුල් සහ ප්‍රජාවන්",
  "Disaster-Affected Families &amp; Communities": "ආපදාවට පත් පවුල් සහ ප්‍රජාවන්",
  "Vulnerable families hit by natural calamities such as seasonal floods and landslides. Mansala deploys volunteer taskforces to deliver essential food dry rations, clean water kits, and emergency recovery assistance during acute crises.": "වාරකන් ගංවතුර සහ නායයෑම් වැනි ස්වාභාවික ආපදාවලට ලක්වන පවුල්. හදිසි ආපදා අවස්ථාවලදී වියළි ආහාර, පිරිසිදු පානීය ජලය සහ ප්‍රතිසාධන ආධාර සැපයීමට මංසල ස්වේච්ඡා කණ්ඩායම් ක්‍රියා කරයි.",
  "Under-Resourced Schools & Regional Teachers": "අඩු පහසුකම් සහිත පාසල් සහ ප්‍රාදේශීය ගුරුවරුන්",
  "Under-Resourced Schools &amp; Regional Teachers": "අඩු පහසුකම් සහිත පාසල් සහ ප්‍රාදේශීය ගුරුවරුන්",
  "Rural primary and secondary schools facing acute infrastructure and lab deficits. Mansala donates science laboratory equipment, restores library bookshelves, provides classroom stationery packs, and supplies teachers with quality curriculum revision materials.": "දැඩි යටිතල පහසුකම් හා විද්‍යාගාර හිඟයකට මුහුණ දෙන ග්‍රාමීය පාසල්. විද්‍යාගාර උපකරණ, පුස්තකාල පොත්පත්, ලිපිද්‍රව්‍ය සහ ගුරුවරුන් සඳහා විෂයමාලා පුනරීක්ෂණ ද්‍රව්‍ය මංසල මගින් පරිත්‍යාග කෙරේ.",
  "Undergraduate Volunteers & Emerging Leaders": "සරසවි ස්වේච්ඡා සිසුන් සහ නැගී එන නායකයින්",
  "Undergraduate Volunteers &amp; Emerging Leaders": "සරසවි ස්වේච්ඡා සිසුන් සහ නැගී එන නායකයින්",
  "University of Ruhuna undergraduates who dedicate their talent and energy. Through real-world fieldwork, logistics management, teaching, and crisis relief, they cultivate unmatched leadership, civic empathy, and professional maturity.": "තම කාලය හා ශ්‍රමය කැප කරන රුහුණ විශ්වවිද්‍යාලයේ උපාධි අපේක්ෂකයින්. ප්‍රායෝගික ක්ෂේත්‍ර මෙහෙයුම්, ඉගැන්වීම් සහ ආපදා කළමනාකරණය තුළින් ඔවුහු විශිෂ්ට නායකත්වයක් හා පරිණතභාවයක් ගොඩනගා ගනිති.",
  "Operational Architecture": "ක්‍රියාකාරී ව්‍යුහය",
  "Our dual pillars combining frontline humanitarian aid with 100% free national academic empowerment.": "පෙරමුණේ මානුෂීය ආධාර සහ 100% නොමිලේ ජාතික අධ්‍යාපනික සවිබල ගැන්වීම ඒකාබද්ධ කෙරෙන අපගේ මූලික කුළුණු ද්විත්වය.",
  "Disaster Relief • School Aid": "ආපදා සහන • පාසල් ආධාර",
  "Study Hub • O/L Seminars": "අධ්‍යාපන පියස • සා/පෙළ සම්මන්ත්‍රණ",
  "Direct undergraduate-led fieldwork delivering emergency crisis relief and restoring educational infrastructure across rural Sri Lanka:": "ශ්‍රී ලංකාව පුරා හදිසි ආපදා සහන සැලසීම සහ අධ්‍යාපනික යටිතල පහසුකම් යථා තත්ත්වයට පත් කිරීම සඳහා සෘජු සරසවි සිසු නායකත්වයෙන් යුත් ක්ෂේත්‍ර මෙහෙවර:",
  "Emergency Flood & Disaster Cleanup: Hands-on volunteer taskforces assisting flooded schools and homes with mud clearance and sanitary restorations.": "හදිසි ගංවතුර සහ ආපදා පිරිසිදු කිරීම්: ගංවතුරින් විපතට පත් පාසල් සහ නිවාස මඩ ඉවත් කර පිරිසිදු කිරීමට සහ සනීපාරක්ෂාව යථා තත්ත්වයට පත් කිරීමට සහභාගී වන ස්වේච්ඡා බලකාය.",
  "Emergency Flood &amp; Disaster Cleanup: Hands-on volunteer taskforces assisting flooded schools and homes with mud clearance and sanitary restorations.": "හදිසි ගංවතුර සහ ආපදා පිරිසිදු කිරීම්: ගංවතුරින් විපතට පත් පාසල් සහ නිවාස මඩ ඉවත් කර පිරිසිදු කිරීමට සහ සනීපාරක්ෂාව යථා තත්ත්වයට පත් කිරීමට සහභාගී වන ස්වේච්ඡා බලකාය.",
  "Dry Ration & Family Care Packages: Essential food hampers and emergency welfare kits for displaced and flood-affected households.": "වියළි ආහාර සහ පවුල් සුබසාධන ඇසුරුම්: අවතැන් වූ සහ ආපදාවට පත් පවුල් සඳහා අත්‍යවශ්‍ය ආහාර ද්‍රව්‍ය සහ හදිසි සුබසාධන කට්ටල ලබා දීම.",
  "Dry Ration &amp; Family Care Packages: Essential food hampers and emergency welfare kits for displaced and flood-affected households.": "වියළි ආහාර සහ පවුල් සුබසාධන ඇසුරුම්: අවතැන් වූ සහ ආපදාවට පත් පවුල් සඳහා අත්‍යවශ්‍ය ආහාර ද්‍රව්‍ය සහ හදිසි සුබසාධන කට්ටල ලබා දීම.",
  "Science Lab Apparatus Donations: Donating essential glassware, basic equipment, and chemical sets to schools with neglected laboratories.": "විද්‍යාගාර උපකරණ පරිත්‍යාග: විද්‍යාගාර පහසුකම් නොමැති හෝ අබලන් වූ පාසල් සඳහා අත්‍යවශ්‍ය වීදුරු භාණ්ඩ, උපකරණ සහ රසායනික ද්‍රව්‍ය පරිත්‍යාග කිරීම.",
  "School Library & Stationery Kits: Providing textbooks, reading material, and full stationery packages to underprivileged children.": "පාසල් පුස්තකාල සහ ලිපිද්‍රව්‍ය කට්ටල: අඩු ආදායම්ලාභී දරුවන් සඳහා පෙළපොත්, කියවීම් පොත් සහ සම්පූර්ණ ලිපිද්‍රව්‍ය කට්ටල ලබා දීම.",
  "School Library &amp; Stationery Kits: Providing textbooks, reading material, and full stationery packages to underprivileged children.": "පාසල් පුස්තකාල සහ ලිපිද්‍රව්‍ය කට්ටල: අඩු ආදායම්ලාභී දරුවන් සඳහා පෙළපොත්, කියවීම් පොත් සහ සම්පූර්ණ ලිපිද්‍රව්‍ය කට්ටල ලබා දීම.",
  "100% Transparent Audits: Publicly published verified transfer slips, project completion recaps, and exact expenditure accounting.": "100% විනිවිදභාවයෙන් යුතු විගණනය: ප්‍රසිද්ධ කරන ලද තහවුරු කළ බැංකු තැන්පතු පත්‍රිකා, ව්‍යාපෘති සමාලෝචන සහ නිවැරදි වියදම් ගිණුම්කරණය.",
  "A comprehensive digital and on-the-ground study platform built to eliminate the private tuition barrier for every Sri Lankan student:": "සෑම ශ්‍රී ලාංකික සිසුවෙකුටම අමතර පන්ති බාධකය දුරු කිරීම උදෙසා නිර්මාණය කරන ලද ඩිජිටල් හා ප්‍රායෝගික අධ්‍යාපන පියස:",
  "Curated learning resources, topic-wise practice quizzes, and structured undergraduate mentorship designed to help every student achieve exam distinction:": "සෑම සිසුවෙකුටම විභාග විශිෂ්ටත්වය ළඟා කර ගැනීමට මගපෙන්වන ඉගෙනුම් සම්පත්, පුහුණු ප්‍රශ්නාවලි සහ සරසවි සිසු උපදේශනය:",
  "Curated Study Dossiers: Chapter-by-chapter revision notes, term papers, and step-by-step model marking schemes for Science and Mathematics.": "සම්පාදිත අධ්‍යයන ලේඛන: විද්‍යාව හා ගණිතය විෂයයන් සඳහා පාඩම් අනුව සැකසූ පුනරීක්ෂණ සටහන්, වාර විභාග ප්‍රශ්න පත්‍ර සහ පියවරෙන් පියවර ලකුණු දීමේ පටිපාටි.",
  "Regional In-Person Seminars: Full-day academic workshops with exam question paper walkthroughs conducted directly in rural schools.": "ප්‍රාදේශීය සම්මන්ත්‍රණ: ග්‍රාමීය පාසල්වල සෘජුවම පැවැත්වෙන පූර්ණ දින විභාග ප්‍රශ්න පත්‍ර සාකච්ඡා සම්මන්ත්‍රණ.",
  "Interactive Diagnostic Quizzes: Instant self-assessment quizzes with real-time scoring, timers, and comprehensive explanatory answers.": "අන්තර්ක්‍රියාකාරී පුහුණු ප්‍රශ්නාවලි: ක්ෂණික ලකුණු, කාල ගණනය සහ සවිස්තරාත්මක පිළිතුරු විවරණ සහිත ස්වයං ඇගයීම් ප්‍රශ්නාවලි.",
  "1:5 Undergraduate Mentorship: Small cohort mentoring connecting Ruhuna Science undergraduates with students requiring personalized guidance.": "1:5 සරසවි සිසු උපදේශනය: පෞද්ගලික මගපෙන්වීමක් අවශ්‍ය සිසුන් රුහුණ විද්‍යා පීඨ සිසුන් සමඟ සම්බන්ධ කරන කුඩා කණ්ඩායම් උපදේශනය.",
  "100% Free & Open Access: Zero registration fees, open PDF downloads, and unrestricted access for all teachers, parents, and students.": "100% නොමිලේ විවෘත ප්‍රවේශය: කිසිදු ලියාපදිංචි ගාස්තුවක් නැත, නොමිලේ PDF බාගත කිරීම් සහ සියලුම ගුරුවරුන්, දෙමාපියන් සහ සිසුන් සඳහා විවෘත ප්‍රවේශය.",
  "100% Free &amp; Open Access: Zero registration fees, open PDF downloads, and unrestricted access for all teachers, parents, and students.": "100% නොමිලේ විවෘත ප්‍රවේශය: කිසිදු ලියාපදිංචි ගාස්තුවක් නැත, නොමිලේ PDF බාගත කිරීම් සහ සියලුම ගුරුවරුන්, දෙමාපියන් සහ සිසුන් සඳහා විවෘත ප්‍රවේශය.",
  "Our Driving Force": "අපගේ ගාමක බලවේගය",
  "The heart, hands, and intellect driving the Mansala movement.": "මංසල ව්‍යාපාරය මෙහෙයවන හදවත, දෑත් සහ බුද්ධිය.",
  "At the core of Mansala are the undergraduate volunteers from the University of Ruhuna. These dedicated students — across disciplines of Physical Science, Biological Science, Mathematics, and Computer Science — unite under the Faculty of Science Students' Union to dedicate their time, knowledge, and physical labour to transform lives.": "මංසල ව්‍යාපාරයේ ජීවය වන්නේ රුහුණ විශ්වවිද්‍යාලයේ උපාධි අපේක්ෂක ස්වේච්ඡා සිසුන්ය. භෞතික විද්‍යාව, ජෛව විද්‍යාව, ගණිතය සහ පරිගණක විද්‍යාව යන විෂය ධාරාවන් හදාරන මෙම සිසුන්, විද්‍යා පීඨ ශිෂ්‍ය සංගමය යටතේ එක්ව තම දැනුම, කාලය සහ ශ්‍රමය කැප කරමින් ජීවිත වෙනස් කිරීමට පෙරමුණ ගනී.",
  "Field Relief Volunteers": "ක්ෂේත්‍ර සහන ස්වේච්ඡා බලකාය",
  "Lead on-the-ground emergency flood cleanup operations, mud clearance, dry ration packaging, and family welfare distributions in affected regions.": "ආපදාවට පත් ප්‍රදේශවල ගංවතුර පිරිසිදු කිරීම්, මඩ ඉවත් කිරීම, වියළි ආහාර ඇසිරීම සහ පවුල් වෙත ආධාර බෙදා හැරීමේ ක්ෂේත්‍ර මෙහෙයුම් මෙහෙයවයි.",
  "School Aid & Lab Curators": "පාසල් ආධාර සහ විද්‍යාගාර භාරකාර මණ්ඩලය",
  "School Aid &amp; Lab Curators": "පාසල් ආධාර සහ විද්‍යාගාර භාරකාර මණ්ඩලය",
  "Coordinate school infrastructure assessments, procure laboratory apparatus and chemicals, and organise book collections for rural school libraries.": "පාසල් යටිතල පහසුකම් තක්සේරු කිරීම් සම්බන්ධීකරණය, විද්‍යාගාර උපකරණ සහ රසායනික ද්‍රව්‍ය ලබා ගැනීම සහ පුස්තකාල සඳහා පොත්පත් එකතු කිරීම සිදු කරයි.",
  "Academic Content Authors": "අධ්‍යයන අන්තර්ගත සම්පාදකයින්",
  "Research and author curriculum-aligned master revision dossiers, step-by-step marking schemes, and regional seminar test papers for O/L Science and Mathematics.": "සාමාන්‍ය පෙළ විද්‍යාව හා ගණිතය විෂයයන් සඳහා විෂය නිර්දේශගත පුනරීක්ෂණ සටහන්, ලකුණු දීමේ පටිපාටි සහ සම්මන්ත්‍රණ ප්‍රශ්න පත්‍ර සම්පාදනය කරයි.",
  "Undergraduate Mentors": "සරසවි ශිෂ්‍ය උපදේශකවරුන්",
  "Conduct structured 1:5 small-group mentoring sessions, resolve challenging questions, and provide empathetic academic coaching to help students excel.": "1:5 කුඩා කණ්ඩායම් උපදේශන සැසි පවත්වමින්, අපහසු ගැටළු නිරවුල් කරමින් සිසුන්ට විශිෂ්ට ප්‍රතිඵල ලබා ගැනීමට මගපෙන්වයි.",
  "Quiz & Assessment Designers": "ප්‍රශ්නාවලි සහ ඇගයීම් නිර්මාණකරුවන්",
  "Quiz &amp; Assessment Designers": "ප්‍රශ්නාවලි සහ ඇගයීම් නිර්මාණකරුවන්",
  "Design interactive topic-wise multiple choice and short-answer diagnostic assessments with immediate scoring and full solution breakdowns.": "ක්ෂණික ලකුණු සහ සවිස්තරාත්මක විසඳුම් සහිත අන්තර්ක්‍රියාකාරී බහුවරණ සහ කෙටි පිළිතුරු ප්‍රශ්නාවලි නිර්මාණය කරයි.",
  "Logistics & Platform Engineers": "මෙහෙයුම් සහ තාක්ෂණික ඉංජිනේරුවන්",
  "Logistics &amp; Platform Engineers": "මෙහෙයුම් සහ තාක්ෂණික ඉංජිනේරුවන්",
  "Manage the open-access Study Hub, deploy regional seminar audiovisual setups, and ensure transparent public tracking of community initiatives.": "නොමිලේ අධ්‍යාපන පියස කළමනාකරණය, සම්මන්ත්‍රණ ශ්‍රව්‍ය දෘශ්‍ය පහසුකම් සැකසීම සහ ප්‍රජා ව්‍යාපෘති පිළිබඳ විනිවිදභාවය තහවුරු කරයි.",
  "Institutional Transparency": "ආයතනික විනිවිදභාවය",
  "Institutional endorsements, faculty approvals, and transparency records.": "ආයතනික අනුමැතීන්, පීඨ නිර්දේශ සහ විනිවිදභාවයෙන් යුතු වාර්තා.",
  "University Lecturer's Letter Regarding Mansala": "මංසල වැඩසටහන පිළිබඳ විශ්වවිද්‍යාල කථිකාචාර්ය ලිපිය",
  "Verification in Progress": "තහවුරු කිරීම ක්‍රියාත්මකයි",
  "Date: Verified Programme Letter": "දිනය: තහවුරු කළ නිල ලිපිය",
  "Format: PDF": "ආකෘතිය: PDF",
  "Dean's Letter — Programme Endorsement": "පීඨාධිපතිතුමන්ගේ නිල නිර්දේශ ලිපිය",
  "Official Letter of Faculty Endorsement": "විද්‍යා පීඨ නිල නිර්දේශ ලිපිය",
  "Dean, Faculty of Science, University of Ruhuna": "පීඨාධිපති, විද්‍යා පීඨය, රුහුණ විශ්වවිද්‍යාලය",
  "Official Endorsement": "නිල නිර්දේශය",
  "Be Part of the Impact": "මෙහෙවරේ කොටස්කරුවෙකු වන්න",
  "Join the Mansala Movement Today": "අදම මංසල ව්‍යාපාරය හා අත්වැල් බැඳගන්න",
  "Whether you are an O/L student preparing for your examinations, an alumnus or donor wishing to support emergency flood relief and rural school aid, or an undergraduate eager to volunteer, your journey with Mansala starts here.": "ඔබ විභාගයට සූදානම් වන සා/පෙළ සිසුවෙකු වුවද, ආපදා සහන සහ පාසල් ආධාර සඳහා දායක වීමට කැමති ආදි සිසුවෙකු හෝ ආධාරකරුවෙකු වුවද, ස්වේච්ඡාවෙන් එක්වන සරසවි සිසුවෙකු වුවද, ඔබේ මංසල ගමන මෙතැනින් ඇරඹේ.",
  "Official University Bank Account": "නිල විශ්වවිද්‍යාල බැංකු ගිණුම",
  "Bank & Branch": "බැංකුව සහ ශාඛාව",
  "Bank &amp; Branch": "බැංකුව සහ ශාඛාව",
  "Bank of Ceylon (BOC) • Ruhuna Campus (Branch 683)": "ලංකා බැංකුව (BOC) • රුහුණ විශ්වවිද්‍යාල ශාඛාව (ශාඛා අංක 683)",
  "Account Name": "ගිණුම් නාමය",
  "Faculty of Science Students' Union – Mansala": "විද්‍යා පීඨ ශිෂ්‍ය සංගමය – මංසල",
  "Account Number": "ගිණුම් අංකය",
  "Copy": "පිටපත් කරන්න",
  "Click to browse or drag & drop transfer slip": "තැන්පතු පත්‍රිකාව තේරීමට ක්ලික් කරන්න හෝ මෙතැනට ඇදගෙන එන්න",
  "Click to browse or drag &amp; drop transfer slip": "තැන්පතු පත්‍රිකාව තේරීමට ක්ලික් කරන්න හෝ මෙතැනට ඇදගෙන එන්න",
  "Supported: JPG, PNG, PDF (Max 10MB)": "සහාය දක්වන ආකෘති: JPG, PNG, PDF (උපරිම 10MB)",
  "Replace": "වෙනස් කරන්න",
  "Submit Donation Slip": "තැන්පතු පත්‍රිකාව යොමු කරන්න",
  "A confirmation record has been generated for transparency reporting.": "විනිවිදභාවය තහවුරු කිරීම සඳහා තහවුරු කිරීමේ වාර්තාවක් සටහන් කර ගන්නා ලදී.",
  "Done & Return to Projects": "අවසන් කර නැවත ව්‍යාපෘති වෙත යන්න",
  "Done &amp; Return to Projects": "අවසන් කර නැවත ව්‍යාපෘති වෙත යන්න",
  "Verified Photographic Archive": "තහවුරු කළ ඡායාරූප ලේඛනාගාරය",
  "Certified by Faculty of Science Students' Union": "විද්‍යා පීඨ ශිෂ්‍ය සංගමය මගින් සහතික කරන ලදී",
  "FACULTY OF SCIENCE — UNIVERSITY OF RUHUNA": "විද්‍යා පීඨය — රුහුණ විශ්වවිද්‍යාලය",
  "Wellamadama, Matara 81000, Sri Lanka • Tel: +94 41 2222681 • Web: www.sci.ruh.ac.lk": "වැල්ලමඩම, මාතර 81000, ශ්‍රී ලංකාව • දුරකථන: +94 41 2222681 • වෙබ්: www.sci.ruh.ac.lk",
  "This is to formally certify that \"මංසල – Mansala\" is an approved humanitarian outreach, community relief, and educational initiative organised by the undergraduate students and the Science Faculty Students' Union of the University of Ruhuna.": "රුහුණ විශ්වවිද්‍යාලයේ විද්‍යා පීඨ ශිෂ්‍ය සංගමය සහ උපාධි අපේක්ෂක සිසුන් විසින් සංවිධානය කරනු ලබන \"මංසල\" වැඩසටහන නිල වශයෙන් අනුමත කරන ලද මානුෂීය සහන සහ අධ්‍යාපනික ප්‍රජා සත්කාරක ව්‍යාපෘතියක් බව මෙයින් සහතික කෙරේ.",
  "The movement operates under the academic guidance of faculty members and the financial supervision of the Senior Treasurer. All contributions collected through this official portal are strictly allocated for:": "මෙම ව්‍යාපාරය පීඨ ආචාර්ය මණ්ඩලයේ අධ්‍යාපනික මගපෙන්වීම සහ ජ්‍යෙෂ්ඨ භාණ්ඩාගාරිකතුමන්ගේ මූල්‍ය අධීක්ෂණය යටතේ ක්‍රියාත්මක වේ. මෙම නිල ද්වාරය හරහා එක්රැස් වන සියලුම ආධාර පහත සඳහන් අරමුණු සඳහා පමණක් යොදවනු ලැබේ:",
  "Emergency disaster & flood relief, classroom restoration, and dry ration distribution.": "හදිසි ආපදා සහ ගංවතුර සහන, පන්තිකාමර යථා තත්ත්වයට පත් කිරීම සහ වියළි ආහාර බෙදා හැරීම.",
  "Emergency disaster &amp; flood relief, classroom restoration, and dry ration distribution.": "හදිසි ආපදා සහ ගංවතුර සහන, පන්තිකාමර යථා තත්ත්වයට පත් කිරීම සහ වියළි ආහාර බෙදා හැරීම.",
  "Procuring essential science lab apparatus, student microscopes, and library reference books for underprivileged rural schools.": "අඩු පහසුකම් සහිත ග්‍රාමීය පාසල් සඳහා අත්‍යවශ්‍ය විද්‍යාගාර උපකරණ, අන්වීක්ෂ සහ පුස්තකාල පරිශීලන පොත්පත් ලබා දීම.",
  "Printing syllabus-aligned model exam workbooks and volunteer undergraduate travel logistics.": "විෂය නිර්දේශගත ආදර්ශ විභාග අභ්‍යාස පොත් මුද්‍රණය සහ ස්වේච්ඡා සරසවි සිසුන්ගේ ප්‍රවාහන වියදම් ආවරණය කිරීම.",
  "All bank accounts specified on this domain (BOC Account No. 00084729104) are registered under the official Faculty of Science Students' Union. Complete financial statements are subjected to annual university audit procedures.": "මෙම වෙබ් අඩවියේ දක්වා ඇති සියලුම බැංකු ගිණුම් (ලංකා බැංකු ගිණුම් අංක 00084729104) නිල විද්‍යා පීඨ ශිෂ්‍ය සංගමය යටතේ ලියාපදිංචි කර ඇත. සම්පූර්ණ මූල්‍ය වාර්තා වාර්ෂික විශ්වවිද්‍යාල විගණන ක්‍රියා පටිපාටියට යටත් කෙරේ.",
  "No learning resources found": "ඉගෙනුම් සම්පත් හමු නොවීය",
  "We couldn't find any materials matching your search criteria. Try adjusting your search keywords or clearing active filters.": "ඔබේ සෙවුමට ගැළපෙන කිසිදු ඉගෙනුම් ද්‍රව්‍යයක් හමු නොවීය. කරුණාකර සෙවුම් වචන වෙනස් කරන්න හෝ පෙරහන් ඉවත් කරන්න.",
  "Clear All Filters": "සියලු පෙරහන් ඉවත් කරන්න",
  "Find past papers, model papers, notes and revision materials.": "පසුගිය ප්‍රශ්න පත්‍ර, ආදර්ශ ප්‍රශ්න පත්‍ර, කෙටි සටහන් සහ පුනරීක්ෂණ ද්‍රව්‍ය සොයාගන්න.",
  "Sort by:": "අනුපිළිවෙල:",
  "Grade 11": "11 ශ්‍රේණිය",
  "Grade 11 Physics": "11 ශ්‍රේණිය භෞතික විද්‍යාව",
  "Grade 11 Chemistry": "11 ශ්‍රේණිය රසායන විද්‍යාව",
  "Self-Paced Diagnostic Practice": "ස්වයං-වේගවත් ප්‍රශ්නාවලි පුහුණුව",
  "Every quiz is untimed and provides detailed worked solutions for every question. Test your knowledge, identify concepts requiring review, and practice until you achieve mastery.": "සෑම ප්‍රශ්නාවලියක් සඳහාම සවිස්තරාත්මක විසඳුම් ලබා දී ඇත. ඔබේ දැනුම පරීක්ෂා කර, වැඩිදුර අවධානය අවශ්‍ය කොටස් හඳුනාගෙන නිපුණතාවය ලබාගන්න.",
  "Start Quiz": "ප්‍රශ්නාවලිය අරඹන්න",
  "Start Quiz &rarr;": "ප්‍රශ්නාවලිය අරඹන්න &rarr;",
  "Exit Quiz": "ප්‍රශ්නාවලියෙන් ඉවත් වන්න",
  "&larr; Previous": "&larr; පෙර",
  "Next &rarr;": "ඊළඟ &rarr;",
  "Great Effort!": "විශිෂ්ට උත්සාහයක්!",
  "Correct": "නිවැරදි",
  "Incorrect": "වැරදි",
  "Unanswered": "පිළිතුරු නොදුන්",
  "Try Again": "නැවත උත්සාහ කරන්න",
  "Explore More Quizzes &rarr;": "තවත් ප්‍රශ්නාවලි බලන්න &rarr;",
  "&larr; Back to Results": "&larr; ප්‍රතිඵල වෙත ආපසු",
  "Step-by-Step Worked Solution:": "පියවරෙන් පියවර සවිස්තර විසඳුම:",
  "&larr; Previous Question": "&larr; පෙර ප්‍රශ්නය",
  "Next Question &rarr;": "ඊළඟ ප්‍රශ්නය &rarr;",
  "Ready to Submit?": "පිළිතුරු භාර දීමට සූදානම්ද?",
  "You have answered 5 of 5 questions.": "ඔබ සියලු ප්‍රශ්න 5 ටම පිළිතුරු ලබා දී ඇත.",
  "Yes, Submit": "ඔව්, භාර දෙන්න",
  "Your Answer (Correct)": "ඔබගේ පිළිතුර (නිවැරදියි)",
  "Correct Answer": "නිවැරදි පිළිතුර",
  "Your Choice": "ඔබේ තේරීම",
  "Pedagogical Framework": "ඉගැන්වීම් ක්‍රමවේදය",
  "Stage 01 • Assessment & Cohort": "1 වන අදියර • ඇගයීම සහ කණ්ඩායම් පිහිටුවීම",
  "Stage 01 &bull; Assessment &amp; Cohort": "1 වන අදියර • ඇගයීම සහ කණ්ඩායම් පිහිටුවීම",
  "Diagnostic & Group Formation": "මූලික ඇගයීම සහ කුඩා කණ්ඩායම් බෙදීම",
  "Diagnostic &amp; Group Formation": "මූලික ඇගයීම සහ කුඩා කණ්ඩායම් බෙදීම",
  "Stage 02 • Active Learning": "2 වන අදියර • සක්‍රීය ඉගෙනුම",
  "Stage 02 &bull; Active Learning": "2 වන අදියර • සක්‍රීය ඉගෙනුම",
  "Weekly Problem Dissection & Doubt Clearing": "සතිපතා ගැටළු විසඳීම සහ සැක දුරු කිරීම",
  "Weekly Problem Dissection &amp; Doubt Clearing": "සතිපතා ගැටළු විසඳීම සහ සැක දුරු කිරීම",
  "Small-group sessions focus on breaking down difficult past paper questions, practicing complex algebraic formulations, understanding chemical equation balancing, and clarifying textbook ambiguities with university mentors.": "විශ්වවිද්‍යාල උපදේශකවරුන් සමග පසුගිය විභාග ප්‍රශ්න පත්‍රවල අපහසු කොටස් සාකච්ඡා කිරීම, සංකීර්ණ වීජ ගණිත ගැටළු පුහුණු වීම, රසායනික සමීකරණ තුලනය සහ පෙළපොත්වල අපැහැදිලි කරුණු නිරවුල් කර ගැනීම කුඩා කණ්ඩායම් සැසි මගින් සිදු කෙරේ.",
  "Stage 03 • Examination Mastery": "3 වන අදියර • විභාග ජයග්‍රහණය",
  "Stage 03 &bull; Examination Mastery": "3 වන අදියර • විභාග ජයග්‍රහණය",
  "Technique, Timing & Mental Readiness": "විභාග උපක්‍රම, කාල කළමනාකරණය සහ මානසික සූදානම",
  "Technique, Timing &amp; Mental Readiness": "විභාග උපක්‍රම, කාල කළමනාකරණය සහ මානසික සූදානම",
  "Mentors coach candidates on examination strategy — navigating the structured essay sections, optimal time allocation per question, accurate scientific drawing, and handling examination anxiety with self-assurance.": "ව්‍යුහගත රචනා ප්‍රශ්නවලට පිළිතුරු සැපයීම, එක් එක් ප්‍රශ්නයට නිවැරදිව කාලය කළමනාකරණය කිරීම, නිවැරදි විද්‍යාත්මක රූප සටහන් ඇඳීම සහ විභාග භීතිය ජයගැනීම පිළිබඳව විශ්වවිද්‍යාල උපදේශකවරුන් සිසුන්ට මග පෙන්වයි.",
  "General Administration & Operations": "පොදු පරිපාලනය සහ මෙහෙයුම්",
  "General Administration &amp; Operations": "පොදු පරිපාලනය සහ මෙහෙයුම්",
  "Curriculum & Paper Analysis": "විෂය නිර්දේශය සහ ප්‍රශ්න පත්‍ර විශ්ලේෂණය",
  "Curriculum &amp; Paper Analysis": "විෂය නිර්දේශය සහ ප්‍රශ්න පත්‍ර විශ්ලේෂණය",
  "1:5 Cohort Matching & Support": "1:5 උපදේශක කණ්ඩායම් සම්බන්ධීකරණය",
  "1:5 Cohort Matching &amp; Support": "1:5 උපදේශක කණ්ඩායම් සම්බන්ධීකරණය",
  "Student Engagement & Outreach": "ශිෂ්‍ය සබඳතා සහ ප්‍රජා සත්කාර",
  "Student Engagement &amp; Outreach": "ශිෂ්‍ය සබඳතා සහ ප්‍රජා සත්කාර",
  "Submit Enquiry": "විමසීම යොමු කරන්න",
  "Your inquiry has been logged into the Mansala Coordinator Desk. An academic team member will review and respond shortly.": "ඔබගේ විමසීම මංසල සම්බන්ධීකාරක කවුළුව වෙත යොමු විය. අප කණ්ඩායමේ සාමාජිකයෙකු කඩිනමින් ඔබව සම්බන්ධ කරගනු ඇත.",
  "Category": "ප්‍රවර්ගය",
  "— Select a category —": "— ප්‍රවර්ගයක් තෝරන්න —",
  "General Enquiry": "සාමාන්‍ය විමසීම",
  "Resource Request": "ඉගෙනුම් සම්පත් ඉල්ලීම",
  "Quiz Feedback": "ප්‍රශ්නාවලි ප්‍රතිපෝෂණ",
  "Mentorship Query": "උපදේශන විමසීම",
  "Technical Issue": "තාක්ෂණික ගැටළු",
  "Other": "වෙනත්",
  "Our volunteer coordination team reviews enquiries daily and will respond via email.": "අපගේ ස්වේච්ඡා සම්බන්ධීකරණ කණ්ඩායම දිනපතා විමසීම් සමාලෝචනය කර විද්‍යුත් තැපෑල ඔස්සේ ප්‍රතිචාර දක්වනු ඇත.",
  "Students and parents can also follow the programme and reach out for support through our community channels. Stay updated on new study materials, revision guides, and examination guidance.": "සිසුන්ට සහ දෙමාපියන්ට අපගේ සමාජ මාධ්‍ය නාලිකා ඔස්සේ වැඩසටහන සමඟ සම්බන්ධ විය හැකි අතර නව අධ්‍යයන ද්‍රව්‍ය, පුනරීක්ෂණ මාර්ගෝපදේශ සහ විභාග මගපෙන්වීම් පිළිබඳ තොරතුරු ලබාගත හැක.",
  "Who can use the learning resources?": "ඉගෙනුම් සම්පත් භාවිතා කළ හැක්කේ කාටද?",
  "The learning resources on this platform are created for students preparing for the G.C.E. Ordinary Level (O/L) examination, particularly in Science and Mathematics. However, anyone interested in learning these subjects is welcome to access the materials. All resources are provided free of charge.": "මෙම වේදිකාවේ ඇති ඉගෙනුම් සම්පත් සාමාන්‍ය පෙළ විද්‍යාව හා ගණිතය විභාගයට සූදානම් වන සිසුන් සඳහා සකස් කර ඇත. කෙසේ වෙතත්, මෙම විෂයයන් ඉගෙනීමට කැමති ඕනෑම අයෙකුට නොමිලේ මෙම ද්‍රව්‍ය ලබාගත හැකිය.",
  "How do I access practice quizzes?": "පුහුණු ප්‍රශ්නාවලි ලබා ගන්නේ කෙසේද?",
  "You can access all available practice quizzes by visiting the Quizzes page. Quizzes are organised by subject and topic, and each quiz indicates its difficulty level and estimated completion time. Quizzes are self-paced, completely free, and provide instant results along with step-by-step worked answers.": "ප්‍රශ්නාවලි පිටුවට පිවිසීමෙන් ඔබට සියලුම පුහුණු ප්‍රශ්නාවලි ලබාගත හැක. විෂය සහ මාතෘකාව අනුව සංවිධානය කර ඇති අතර, ක්ෂණික ප්‍රතිඵල සහ සවිස්තරාත්මක පිළිතුරු විවරණ නොමිලේ ලබා දේ.",
  "Is there a cost to participate in Manasala?": "මංසල වැඩසටහනට සම්බන්ධ වීමට මුදලක් අය කෙරේද?",
  "No. මංසල – Mansala is a completely free programme. All learning resources, quizzes, mentorship sessions, and activities are offered at no cost to students. The programme is funded and supported by the Students' Union of the Faculty of Science of the University of Ruhuna and its volunteer network.": "නැත. මංසල සම්පූර්ණයෙන්ම නොමිලේ ක්‍රියාත්මක වන වැඩසටහනකි. සියලුම ඉගෙනුම් සම්පත්, ප්‍රශ්නාවලි, උපදේශන සැසි සහ ක්‍රියාකාරකම් සිසුන් සඳහා සම්පූර්ණයෙන්ම නොමිලේ ලබා දේ.",
  "How can I become a volunteer mentor?": "ස්වේච්ඡා උපදේශකයෙකු විය හැක්කේ කෙසේද?",
  "If you are a current student at the University of Ruhuna and would like to volunteer as a mentor, you can express your interest through the Mentorship page or contact the Programme Coordinator using the details provided above. Mentors are matched with small groups of O/L students to provide academic guidance and support.": "ඔබ රුහුණ විශ්වවිද්‍යාලයේ සිසුවෙකු නම්, උපදේශන පිටුව හරහා හෝ අපගේ සම්බන්ධීකාරකවරුන් ඇමතීමෙන් ස්වේච්ඡා උපදේශකයෙකු ලෙස ලියාපදිංචි විය හැක.",
  "How do I report an issue with the website?": "වෙබ් අඩවියේ ගැටලුවක් වාර්තා කරන්නේ කෙසේද?",
  "If you encounter a technical issue, broken link, or any problem with the website, please use the Help Desk enquiry form above and select \"Technical Issue\" as the category. Provide as much detail as possible, including what page you were on and what went wrong. Our team will review and address the issue promptly.": "වෙබ් අඩවියේ තාක්ෂණික දෝෂයක් හෝ ගැටලුවක් ඇත්නම්, කරුණාකර ඉහත විමසීම් පෝරමයේ \"තාක්ෂණික ගැටළු\" තෝරා විස්තර යොමු කරන්න. අප කණ්ඩායම කඩිනමින් එය විසඳනු ඇත.",
  "Facebook Community": "ෆේස්බුක් ප්‍රජාව",
  "Instagram Channel": "ඉන්ස්ටග්‍රෑම් පිටුව",
  "WhatsApp Support Group": "වට්ස්ඇප් උපකාරක සමූහය",
  "Staff & Coordinator Portal": "කාර්ය මණ්ඩල සහ සම්බන්ධීකාරක පියස",
  "Staff &amp; Coordinator Portal": "කාර්ය මණ්ඩල සහ සම්බන්ධීකාරක පියස",
  "© මංසල – Mansala. Students' Union, Faculty of Science, University of Ruhuna.": "© මංසල – Mansala. විද්‍යා පීඨ ශිෂ්‍ය සංගමය, රුහුණ විශ්වවිද්‍යාලය.",
  "&copy; මංසල – Mansala. Students' Union, Faculty of Science, University of Ruhuna.": "&copy; මංසල – Mansala. විද්‍යා පීඨ ශිෂ්‍ය සංගමය, රුහුණ විශ්වවිද්‍යාලය.",
  "Official educational outreach by the Students' Union of the Faculty of Science, University of Ruhuna.": "රුහුණ විශ්වවිද්‍යාලයේ විද්‍යා පීඨ ශිෂ්‍ය සංගමයේ නිල අධ්‍යාපනික හා ප්‍රජා සත්කාරක මෙහෙවර.",
  "Official outreach by the Students' Union of the Faculty of Science, University of Ruhuna.": "රුහුණ විශ්වවිද්‍යාලයේ විද්‍යා පීඨ ශිෂ්‍ය සංගමයේ නිල මෙහෙවර.",
  "Every donation, relief package, seminar session, and revision dossier is delivered transparently and entirely free of charge. By connecting higher education directly with grassroots communities, Mansala proves that student-led solidarity can bridge systemic educational gaps and uplift vulnerable lives in times of urgent need.": "සෑම ආධාරයක්, සහන පැකේජයක්, සම්මන්ත්‍රණ සැසියක් සහ පුනරීක්ෂණ ලේඛනයක්ම පූර්ණ විනිවිදභාවයකින් යුතුව සම්පූර්ණයෙන්ම නොමිලේ ලබා දේ. උසස් අධ්‍යාපනය සෘජුවම බිම් මට්ටමේ ප්‍රජාවන් සමඟ සම්බන්ධ කිරීමෙන්, ක්‍රමවේදීය අධ්‍යාපන පරතරයන් පියවීමට සහ හදිසි අවශ්‍යතාවලදී අවදානමට ලක් වූ ජීවිත නගාසිටුවීමට ශිෂ්‍ය සහයෝගීතාවයට හැකි බව මංසල සනාථ කරයි.",
  "Disaster Relief • School Aid": "ආපදා සහන • පාසල් ආධාර",
  "Disaster Relief &bull; School Aid": "ආපදා සහන • පාසල් ආධාර",
  "● Verification in Progress": "● තහවුරු කිරීම ක්‍රියාත්මකයි",
  "● Official Endorsement": "● නිල නිර්දේශය",
  "University Lecturer's Letter Regarding Mansala": "මංසල වැඩසටහන පිළිබඳ විශ්වවිද්‍යාල කථිකාචාර්ය ලිපිය",
  "Dean's Letter — Programme Endorsement": "පීඨාධිපතිතුමන්ගේ නිල නිර්දේශ ලිපිය",
  "Official Letter of Faculty Endorsement": "විද්‍යා පීඨ නිල නිර්දේශ ලිපිය",
  "Dean, Faculty of Science, University of Ruhuna": "පීඨාධිපති, විද්‍යා පීඨය, රුහුණ විශ්වවිද්‍යාලය",
  "Ref ID: UOR/SCI/EDU/DOC-02": "යොමු අංකය: UOR/SCI/EDU/DOC-02",
  "Document Title: Official Letter of Faculty Endorsement": "ලේඛන මාතෘකාව: විද්‍යා පීඨ නිල නිර්දේශ ලිපිය",
  "Document Title:": "ලේඛන මාතෘකාව:",
  "Issued By: Dean, Faculty of Science, University of Ruhuna": "නිකුත් කළේ: පීඨාධිපති, විද්‍යා පීඨය, රුහුණ විශ්වවිද්‍යාලය",
  "Issued By:": "නිකුත් කළේ:",
  "Ref ID:": "යොමු අංකය:",
  "Dickwella Vijitha Central College": "දික්වැල්ල විජිත මධ්‍ය මහා විද්‍යාලය",
  "Project Recap • Held October 14, 2026 • Matara District": "ව්‍යාපෘති සමාලෝචනය • 2026 ඔක්තෝබර් 14 • මාතර දිස්ත්‍රික්කය",
  "Supporting O/L students through personalised 1:5 mentorship designed to build academic confidence and examination success in Science & Mathematics.": "විද්‍යාව හා ගණිතය විෂයයන්හි විභාග සාර්ථකත්වය සහ ආත්මවිශ්වාසය ගොඩනැංවීම උදෙසා නිර්මාණය කරන ලද 1:5 සුවිශේෂී උපදේශනය.",
  "Supporting O/L students through personalised 1:5 mentorship designed to build academic confidence and examination success in Science &amp; Mathematics.": "විද්‍යාව හා ගණිතය විෂයයන්හි විභාග සාර්ථකත්වය සහ ආත්මවිශ්වාසය ගොඩනැංවීම උදෙසා නිර්මාණය කරන ලද 1:5 සුවිශේෂී උපදේශනය.",
  "O/L Science — 2023 Past Paper": "සා/පෙළ විද්‍යාව — 2023 පසුගිය ප්‍රශ්න පත්‍රය",
  "Complete G.C.E. Ordinary Level Science examination paper from the 2023 national examination. Includes all sections, multiple choice, and structured essay questions.": "2023 ජාතික විභාගයේ අ.පො.ස. සාමාන්‍ය පෙළ විද්‍යාව සම්පූර්ණ ප්‍රශ්න පත්‍රය. සියලුම කොටස්, බහුවරණ සහ ව්‍යුහගත රචනා ප්‍රශ්න ඇතුළත් වේ.",
  "A model paper focusing on algebraic expressions, quadratic equations, and geometric proofs aligned with the O/L syllabus. Ideal for structured practice.": "සාමාන්‍ය පෙළ විෂය නිර්දේශයට අනුකූලව වීජීය ප්‍රකාශන, වර්ගජ සමීකරණ සහ ජ්‍යාමිතික සාධන කෙරෙහි අවධානය යොමු කළ ආදර්ශ ප්‍රශ්න පත්‍රයකි.",
  "Science Revision Notes — Energy & Force": "විද්‍යාව පුනරීක්ෂණ සටහන් — ශක්තිය සහ බලය",
  "Concise revision notes covering key concepts in energy, work, power, and force. Includes diagrams, formulae, and worked examples for quick review.": "ශක්තිය, කාර්යය, ක්ෂමතාව සහ බලය පිළිබඳ මූලික සංකල්ප ආවරණය වන කෙටි පුනරීක්ෂණ සටහන්. ඉක්මන් පුනරීක්ෂණය සඳහා රූප සටහන්, සූත්‍ර සහ ගැටළු විසඳුම් ඇතුළත් වේ.",
  "O/L Mathematics — 2023 Marking Scheme": "සා/පෙළ ගණිතය — 2023 ලකුණු දීමේ පටිපාටිය",
  "Official-style marking scheme for the 2023 O/L Mathematics paper. Contains step-by-step marking guidelines and acceptable alternative answers.": "2023 සා/පෙළ ගණිතය ප්‍රශ්න පත්‍රය සඳහා වන ලකුණු දීමේ පටිපාටිය. පියවරෙන් පියවර ලකුණු ලබාදීමේ මාර්ගෝපදේශ සහ පිළිගත හැකි විකල්ප පිළිතුරු ඇතුළත් වේ.",
  "A comprehensive model paper covering biology (human body systems, ecology) and chemistry (atoms, chemical reactions) for O/L preparation.": "සා/පෙළ විභාග සූදානම සඳහා ජීව විද්‍යාව (මානව දේහ පද්ධති, පරිසර විද්‍යාව) සහ රසායන විද්‍යාව (පරමාණු, රසායනික ප්‍රතික්‍රියා) ආවරණය වන සවිස්තරාත්මක ආදර්ශ ප්‍රශ්න පත්‍රයකි.",
  "Revision Guide — Trigonometry & Statistics": "පුනරීක්ෂණ මාර්ගෝපදේශය — ත්‍රිකෝණමිතිය සහ සංඛ්‍යානය",
  "A structured revision guide covering trigonometric ratios, data representation, and statistical measures. Includes practice questions with answers.": "ත්‍රිකෝණමිතික අනුපාත, දත්ත නිරූපණය සහ සංඛ්‍යානමය මිමි ආවරණය වන ව්‍යුහගත පුනරීක්ෂණ මාර්ගෝපදේශයකි. පිළිතුරු සහිත අභ්‍යාස ප්‍රශ්න ඇතුළත් වේ.",
  "2023 G.C.E. O/L Science — Complete Examination Dossier": "2023 අ.පො.ස. සා/පෙළ විද්‍යාව — සම්පූර්ණ විභාග ලේඛනය",
  "An exhaustive review document containing the full 2023 national examination paper, complete with an annotated marking scheme, mentor commentary on frequent errors, and model answers.": "2023 සම්පූර්ණ විභාග ප්‍රශ්න පත්‍රය, විවරණ සහිත ලකුණු දීමේ පටිපාටිය, සිසුන් නිතර සිදුකරන වැරදි පිළිබඳ උපදේශක සටහන් සහ ආදර්ශ පිළිතුරු ඇතුළත් සවිස්තරාත්මක ලේඛනයකි.",
  "Mathematics Notes — Simultaneous Equations & Quadratics": "ගණිතය සටහන් — සමගාමී සමීකරණ සහ වර්ගජ ප්‍රකාශන",
  "Comprehensive step-by-step revision guide on algebraic elimination, substitution, and graphical parabolas solutions with 15 worked model exam questions.": "වීජීය ආදේශය, ඉවත් කිරීම සහ ප්‍රස්ථාරික පරාවලික විසඳුම් පිළිබඳ පියවරෙන් පියවර විභාග ආදර්ශ ප්‍රශ්න 15 ක් සහිත සවිස්තරාත්මක පුනරීක්ෂණ මාර්ගෝපදේශයකි.",
  "Science Concept Summary — Chemical Reactions, Acids & Bases": "විද්‍යා සංකල්ප සාරාංශය — රසායනික ප්‍රතික්‍රියා, අම්ල සහ භස්ම",
  "Science Concept Summary — Chemical Reactions, Acids &amp; Bases": "විද්‍යා සංකල්ප සාරාංශය — රසායනික ප්‍රතික්‍රියා, අම්ල සහ භස්ම",
  "විද්‍යා පීඨ ශිෂ්‍ය සංගමය Faculty of Science Students' Union &bull; University of Ruhuna": "විද්‍යා පීඨ ශිෂ්‍ය සංගමය &bull; රුහුණ විශ්වවිද්‍යාලය",
  "Support an Active Cause →": "ක්‍රියාකාරී ව්‍යාපෘතියකට දායක වන්න →",
  "Support an Active Cause &amp;rarr;": "ක්‍රියාකාරී ව්‍යාපෘතියකට දායක වන්න &rarr;",
  "View Past Field Recaps →": "පසුගිය ක්ෂේත්‍ර වාර්තා බලන්න →",
  "View Past Field Recaps &amp;rarr;": "පසුගිය ක්ෂේත්‍ර වාර්තා බලන්න &rarr;",
  "Download Papers & Notes →": "ප්‍රශ්න පත්‍ර හා සටහන් ලබාගන්න →",
  "Download Papers &amp; Notes &amp;rarr;": "ප්‍රශ්න පත්‍ර හා සටහන් ලබාගන්න &rarr;",
  "Practise Quizzes →": "ප්‍රශ්නාවලි පුහුණු වන්න →",
  "Practise Quizzes &amp;rarr;": "ප්‍රශ්නාවලි පුහුණු වන්න &rarr;",
  "1:5 Mentorship →": "1:5 උපදේශනය →",
  "1:5 Mentorship &amp;rarr;": "1:5 උපදේශනය &rarr;",
  "Discover Our Initiative →": "අපගේ වැඩසටහන ගවේෂණය කරන්න →",
  "Discover Our Initiative &amp;rarr;": "අපගේ වැඩසටහන ගවේෂණය කරන්න &rarr;",
  "Browse Resources →": "සම්පත් පිරික්සන්න →",
  "Browse Resources &amp;rarr;": "සම්පත් පිරික්සන්න &rarr;",
  "Try a Quiz →": "ප්‍රශ්නාවලියක් කරන්න →",
  "Try a Quiz &amp;rarr;": "ප්‍රශ්නාවලියක් කරන්න &rarr;",
  "Explore Mentorship →": "උපදේශනය ගවේෂණය කරන්න →",
  "Explore Mentorship &amp;rarr;": "උපදේශනය ගවේෂණය කරන්න &rarr;",
  "Support a Community Project →": "ප්‍රජා ව්‍යාපෘතියකට ආධාර කරන්න →",
  "Support a Community Project &amp;rarr;": "ප්‍රජා ව්‍යාපෘතියකට ආධාර කරන්න &rarr;",
  "Support a Community Cause →": "ප්‍රජා ව්‍යාපෘතියකට ආධාර කරන්න →",
  "Support a Community Cause &amp;rarr;": "ප්‍රජා ව්‍යාපෘතියකට ආධාර කරන්න &rarr;",
  "Access Free O/L Resources →": "නොමිලේ සා/පෙළ සම්පත් ලබාගන්න →",
  "Access Free O/L Resources &amp;rarr;": "නොමිලේ සා/පෙළ සම්පත් ලබාගන්න &rarr;",
  "Guides small group of 5 candidates &bull; Diagnoses syllabus gaps &bull; Analyzes marking schemes &bull; Tracks progress": "සිසුන් 5 දෙනෙකුගේ කණ්ඩායමකට මගපෙන්වීම &bull; අඩුපාඩු හඳුනාගැනීම &bull; ලකුණු දීමේ පටිපාටි විශ්ලේෂණය &bull; ප්‍රගතිය පරීක්ෂා කිරීම",
  "Compounding this educational divide, recurring seasonal natural disasters &mdash; particularly monsoon-triggered floods and landslides in the Southern Province and surrounding districts &mdash; routinely inundate rural classrooms, destroy school libraries, and displace vulnerable farming and daily-wage families. Under such extreme strain, children's education is often the first casualty.": "මෙම අධ්‍යාපනික පරතරයට අමතරව, දකුණු පළාත සහ ඒ අවට දිස්ත්‍රික්කවල වාරකන් වැසි සමඟ ඇතිවන ගංවතුර සහ නායයෑම් හේතුවෙන් ග්‍රාමීය පන්තිකාමර ජලයෙන් යටවීම, පුස්තකාල විනාශ වීම සහ අඩු ආදායම්ලාභී පවුල් අවතැන් වීම නිරන්තරයෙන් සිදුවේ. මෙවැනි හදිසි ආපදා හමුවේ දරුවන්ගේ අධ්‍යාපනය වඩාත්ම අවදානමට ලක්වන අංශය බවට පත්වෙයි.",
  "National Humanitarian Equity &amp;bull; Academic Distinction": "ජාතික මානුෂීය සමානාත්මතාවය &bull; අධ්‍යාපනික විශිෂ්ටත්වය",
  "Undergraduate Action &amp;bull; Grassroots Delivery Framework": "සරසවි සිසු ක්‍රියාකාරීත්වය &bull; බිම් මට්ටමේ මෙහෙයුම් ව්‍යුහය",
  "Study Hub &bull; O/L Seminars": "අධ්‍යාපන පියස &bull; සා/පෙළ සම්මන්ත්‍රණ",
  "At the core of Mansala are the undergraduate volunteers from the University of Ruhuna. These dedicated students &mdash; across disciplines of Physical Science, Biological Science, Mathematics, and Computer Science &mdash; unite under the Faculty of Science Students' Union to dedicate their time, knowledge, and physical labour to transform lives.": "මංසල ව්‍යාපාරයේ ජීවය වන්නේ රුහුණ විශ්වවිද්‍යාලයේ උපාධි අපේක්ෂක ස්වේච්ඡා සිසුන්ය. භෞතික විද්‍යාව, ජෛව විද්‍යාව, ගණිතය සහ පරිගණක විද්‍යාව යන විෂය ධාරාවන් හදාරන මෙම සිසුන්, විද්‍යා පීඨ ශිෂ්‍ය සංගමය යටතේ එක්ව තම දැනුම, කාලය සහ ශ්‍රමය කැප කරමින් ජීවිත වෙනස් කිරීමට පෙරමුණ ගනී.",
  "Dean's Letter &mdash; Programme Endorsement": "පීඨාධිපතිතුමන්ගේ නිල නිර්දේශ ලිපිය",
  "Bank of Ceylon (BOC) &bull; Ruhuna Campus (Branch 683)": "ලංකා බැංකුව (BOC) &bull; රුහුණ විශ්වවිද්‍යාල ශාඛාව (ශාඛා අංක 683)",
  "Faculty of Science Students' Union &ndash; Mansala": "විද්‍යා පීඨ ශිෂ්‍ය සංගමය – මංසල",
  "FACULTY OF SCIENCE &mdash; UNIVERSITY OF RUHUNA": "විද්‍යා පීඨය — රුහුණ විශ්වවිද්‍යාලය",
  "Wellamadama, Matara 81000, Sri Lanka &bull; Tel: +94 41 2222681 &bull; Web: www.sci.ruh.ac.lk": "වැල්ලමඩම, මාතර 81000, ශ්‍රී ලංකාව &bull; දුරකථන: +94 41 2222681 &bull; වෙබ්: www.sci.ruh.ac.lk",
  "This is to formally certify that \"මංසල &ndash; Mansala\" is an approved humanitarian outreach, community relief, and educational initiative organised by the undergraduate students and the Science Faculty Students' Union of the University of Ruhuna.": "රුහුණ විශ්වවිද්‍යාලයේ විද්‍යා පීඨ ශිෂ්‍ය සංගමය සහ උපාධි අපේක්ෂක සිසුන් විසින් සංවිධානය කරනු ලබන \"මංසල\" වැඩසටහන නිල වශයෙන් අනුමත කරන ලද මානුෂීය සහන සහ අධ්‍යාපනික ප්‍රජා සත්කාරක ව්‍යාපෘතියක් බව මෙයින් සහතික කෙරේ.",
  "Start Quiz &amp;rarr;": "ප්‍රශ්නාවලිය අරඹන්න &rarr;",
  "← Previous": "← පෙර",
  "&amp;larr; Previous": "&larr; පෙර",
  "Next →": "ඊළඟ →",
  "Next &amp;rarr;": "ඊළඟ &rarr;",
  "Explore More Quizzes →": "තවත් ප්‍රශ්නාවලි බලන්න →",
  "Explore More Quizzes &amp;rarr;": "තවත් ප්‍රශ්නාවලි බලන්න &rarr;",
  "← Back to Results": "← ප්‍රතිඵල වෙත ආපසු",
  "&amp;larr; Back to Results": "&larr; ප්‍රතිඵල වෙත ආපසු",
  "← Previous Question": "← පෙර ප්‍රශ්නය",
  "&amp;larr; Previous Question": "&larr; පෙර ප්‍රශ්නය",
  "Next Question →": "ඊළඟ ප්‍රශ්නය →",
  "Next Question &amp;rarr;": "ඊළඟ ප්‍රශ්නය &rarr;",
  "Stage 01 &amp;bull; Assessment &amp; Cohort": "1 වන අදියර &bull; ඇගයීම සහ කණ්ඩායම් පිහිටුවීම",
  "Stage 02 &amp;bull; Active Learning": "2 වන අදියර &bull; සක්‍රීය ඉගෙනුම",
  "Stage 03 &amp;bull; Examination Mastery": "3 වන අදියර &bull; විභාග ජයග්‍රහණය",
  "Mentors coach candidates on examination strategy &mdash; navigating the structured essay sections, optimal time allocation per question, accurate scientific drawing, and handling examination anxiety with self-assurance.": "ව්‍යුහගත රචනා ප්‍රශ්නවලට පිළිතුරු සැපයීම, එක් එක් ප්‍රශ්නයට නිවැරදිව කාලය කළමනාකරණය කිරීම, නිවැරදි විද්‍යාත්මක රූප සටහන් ඇඳීම සහ විභාග භීතිය ජයගැනීම පිළිබඳව විශ්වවිද්‍යාල උපදේශකවරුන් සිසුන්ට මග පෙන්වයි.",
  "&mdash; Select a category &mdash;": "— ප්‍රවර්ගයක් තෝරන්න —",
  "No. මංසල &ndash; Mansala is a completely free programme. All learning resources, quizzes, mentorship sessions, and activities are offered at no cost to students. The programme is funded and supported by the Students' Union of the Faculty of Science of the University of Ruhuna and its volunteer network.": "නැත. මංසල සම්පූර්ණයෙන්ම නොමිලේ ක්‍රියාත්මක වන වැඩසටහනකි. සියලුම ඉගෙනුම් සම්පත්, ප්‍රශ්නාවලි සහ උපදේශන සේවා සිසුන් වෙත ලබා දෙන්නේ කිසිදු අයකිරීමකින් තොරවය. මෙම වැඩසටහන රුහුණ විශ්වවිද්‍යාලයේ විද්‍යා පීඨ ශිෂ්‍ය සංගමය සහ ස්වේච්ඡා ශිෂ්‍ය ජාලය මඟින් පවත්වාගෙන යනු ලැබේ.",
  "© මංසල &ndash; Mansala. Students' Union, Faculty of Science, University of Ruhuna.": "© මංසල – Mansala. විද්‍යා පීඨ ශිෂ්‍ය සංගමය, රුහුණ විශ්වවිද්‍යාලය.",
  "&amp;copy; මංසල &ndash; Mansala. Students' Union, Faculty of Science, University of Ruhuna.": "&copy; මංසල – Mansala. විද්‍යා පීඨ ශිෂ්‍ය සංගමය, රුහුණ විශ්වවිද්‍යාලය.",
  "Disaster Relief &amp;bull; School Aid": "ආපදා සහන &bull; පාසල් ආධාර",
  "Project Recap &bull; Held October 14, 2026 &bull; Matara District": "ව්‍යාපෘති සමාලෝචනය &bull; 2026 ඔක්තෝබර් 14 &bull; මාතර දිස්ත්‍රික්කය",
  "O/L Science &mdash; 2023 Past Paper": "සා/පෙළ විද්‍යාව — 2023 පසුගිය ප්‍රශ්න පත්‍රය",
  "Science Revision Notes &mdash; Energy &amp; Force": "විද්‍යාව පුනරීක්ෂණ සටහන් — ශක්තිය සහ බලය",
  "O/L Mathematics &mdash; 2023 Marking Scheme": "සා/පෙළ ගණිතය — 2023 ලකුණු දීමේ පටිපාටිය",
  "Revision Guide &mdash; Trigonometry &amp; Statistics": "පුනරීක්ෂණ මාර්ගෝපදේශය — ත්‍රිකෝණමිතිය සහ සංඛ්‍යානය",
  "2023 G.C.E. O/L Science &mdash; Complete Examination Dossier": "2023 අ.පො.ස. සා/පෙළ විද්‍යාව — සම්පූර්ණ විභාග ලේඛනය",
  "Mathematics Notes &mdash; Simultaneous Equations &amp; Quadratics": "ගණිතය සටහන් — සමගාමී සමීකරණ සහ වර්ගජ ප්‍රකාශන",
  "Science Concept Summary &mdash; Chemical Reactions, Acids &amp; Bases": "විද්‍යා සංකල්ප සාරාංශය — රසායනික ප්‍රතික්‍රියා, අම්ල සහ භස්ම",
  "මංසල &ndash; Community Outreach &amp; Educational Movement": "මංසල – ප්‍රජා සත්කාරක හා අධ්‍යාපනික ව්‍යාපාරය",
  "About මංසල &ndash; Mansala": "මංසල පිළිබඳව",
  "&ldquo;A Sri Lanka where geographical, economic, and climatic vulnerabilities never compromise a child’s right to quality education and dignified community welfare, achieved through active student solidarity and academic excellence.&rdquo;": "“භූගෝලීය, ආර්ථික හෝ ආපදාමය බාධාවන් කිසිදු දරුවෙකුගේ ගුණාත්මක අධ්‍යාපනයට සහ ප්‍රජා සුබසාධනයට බාධාවක් නොවන, විශ්වවිද්‍යාල ශිෂ්‍ය සහයෝගීතාවයෙන් සවිමත් වූ ශ්‍රී ලංකාවක් නිර්මාණය කිරීම.”",
  "&amp;ldquo;A Sri Lanka where geographical, economic, and climatic vulnerabilities never compromise a child&amp;rsquo;s right to quality education and dignified community welfare, achieved through active student solidarity and academic excellence.&amp;rdquo;": "&ldquo;භූගෝලීය, ආර්ථික හෝ ආපදාමය බාධාවන් කිසිදු දරුවෙකුගේ ගුණාත්මක අධ්‍යාපනයට සහ ප්‍රජා සුබසාධනයට බාධාවක් නොවන, විශ්වවිද්‍යාල ශිෂ්‍ය සහයෝගීතාවයෙන් සවිමත් වූ ශ්‍රී ලංකාවක් නිර්මාණය කිරීම.&rdquo;",
  "&amp;ldquo;To rapidly mobilise university volunteer resources, expertise, and community goodwill to provide frontline disaster relief, equip rural classrooms, and deliver 100% free, syllabus-aligned Science and Mathematics learning materials and small-group mentorship to every aspiring student.&amp;rdquo;": "&ldquo;හදිසි ආපදා සහන සැලසීම, ග්‍රාමීය පාසල් යටිතල පහසුකම් සංවර්ධනය කිරීම සහ සාමාන්‍ය පෙළ සිසුන් වෙනුවෙන් නොමිලේ ගුණාත්මක විද්‍යාව හා ගණිතය ඉගෙනුම් ද්‍රව්‍ය සහ මගපෙන්වීම සලසා දීම උදෙසා විශ්වවිද්‍යාල ශිෂ්‍ය ප්‍රජාව බලමුළු ගැන්වීම.&rdquo;",
  "Flood Recovery &amp; School Cleanup &ndash; Akuressa": "ගංවතුර පුනරුත්ථාපනය සහ පාසල් පිරිසිදු කිරීම – අකුරැස්ස",
  "Faculty of Science &bull; University of Ruhuna": "විද්‍යා පීඨ ශිෂ්‍ය සංගමය &bull; රුහුණ විශ්වවිද්‍යාලය",
  "Students' Union &bull; University of Ruhuna": "විද්‍යා පීඨ ශිෂ්‍ය සංගමය &bull; රුහුණ විශ්වවිද්‍යාලය",
  "Official Endorsement &amp; Constitution": "නිල අනුමැතිය සහ ව්‍යවස්ථාව",
  "Academic Review &amp; Syllabus Mapping": "විෂය නිර්දේශ විශ්ලේෂණය සහ සැලැස්ම",
  "Browse educational materials for O/L Science and Mathematics &mdash; past papers, model papers, notes, and revision guides.": "සා/පෙළ විද්‍යාව හා ගණිතය විෂයයන් සඳහා පසුගිය ප්‍රශ්න පත්‍ර, ආදර්ශ ප්‍රශ්න පත්‍ර, කෙටි සටහන් සහ පුනරීක්ෂණ මාර්ගෝපදේශ.",
  "Stage 01 &bull; Diagnostic Foundation": "පියවර 01 &bull; මූලික හැඳින්වීම සහ පරීක්ෂාව",
  "Stage 02 &bull; Core Subject Mastery": "පියවර 02 &bull; මූලික විෂය ඒකක ප්‍රගුණ කිරීම",
  "Stage 03 &bull; Examination Readiness": "පියවර 03 &bull; විභාග ජයග්‍රහණය සහ ආත්මවිශ්වාසය",
  "Mathematics Model Paper &mdash; Algebra &amp; Geometry": "Mathematics ආදර්ශ ප්‍රශ්න පත්‍රය — Algebra & Geometry",
  "No. මංසල &ndash; Mansala is a completely free programme. All learning resources, quizzes, mentorship sessions, and activities are offered at no cost to students. The programme is funded and supported by the Faculty of Science of the University of Ruhuna and its volunteer network.": "නැත. මංසල සම්පූර්ණයෙන්ම නොමිලේ ක්‍රියාත්මක වන වැඩසටහනකි. සියලුම ඉගෙනුම් සම්පත්, ප්‍රශ්නාවලි සහ උපදේශන සේවා සිසුන් වෙත ලබා දෙන්නේ කිසිදු අයකිරීමකින් තොරවය. මෙම වැඩසටහන රුහුණ විශ්වවිද්‍යාලයේ විද්‍යා පීඨය සහ ස්වේච්ඡා ශිෂ්‍ය ජාලය මඟින් පවත්වාගෙන යනු ලැබේ.",
  "Our coordinators are available to assist you with any questions about මංසල &ndash; Mansala.": "මංසල පිළිබඳ ඔබේ ඕනෑම ගැටලුවක් සඳහා සහය වීමට අපගේ විශ්වවිද්‍යාල සම්බන්ධීකාරක කණ්ඩායම සූදානමින් සිටී.",
  "Past Paper &amp; Marking Scheme": "පසුගිය ප්‍රශ්න පත්‍රය & Marking Scheme",
  "Science Model Paper &mdash; Biology &amp; Chemistry": "Science ආදර්ශ ප්‍රශ්න පත්‍රය — Biology & Chemistry",
  "What is මංසල &ndash; Mansala?": "මංසල යනු කුමක්ද?",
  "© මංසල &ndash; Mansala. Faculty of Science, University of Ruhuna.": "© මංසල – Mansala. Faculty of Science, University of Ruhuna.",
  "© මංසල &ndash; Mansala. Students' Union, University of Ruhuna.": "© මංසල – Mansala. Students' Union, University of Ruhuna.",
  "මංසල &ndash; Mansala": "මංසල",
  "මංසල &ndash; Mansala is an educational outreach programme organised by the Faculty of Science of the University of Ruhuna. It is designed to support Ordinary Level (O/L) students in Sri Lanka by providing free learning resources, practice quizzes, and mentorship in Science and Mathematics. The programme is run entirely by volunteer university students committed to helping the next generation succeed.": "මංසල – Mansala is an educational outreach programme organised by the Faculty of Science of the University of Ruhuna. It is designed to support Ordinary Level (O/L) students in Sri Lanka by providing free learning resources, practice quizzes, and mentorship in Science and Mathematics. The programme is run entirely by volunteer university students committed to helping the next generation succeed.",
  "Cell Biology &amp; Human Body": "සෛල ජීව විද්‍යාව සහ මිනිස් සිරුර",
  "Electricity &amp; Magnetism": "විද්‍යුතය සහ චුම්භකත්වය",
  "Guidance &amp; Mentorship": "මගපෙන්වීම සහ උපදේශනය",
  "Help Desk &amp; Student Enquiries": "උපකාරක කවුළුව සහ ශිෂ්‍ය විමසීම්",
  "Questions &amp; Answers": "ප්‍රශ්න සහ පිළිතුරු",
  "To ensure that every Sri Lankan student preparing for the G.C.E. Ordinary Level examination has free, equitable access to high-quality educational materials, expert academic guidance, and peer mentorship &mdash; regardless of socio-economic background or geographical location.": "සමාජ-ආර්ථික හෝ භූගෝලීය බාධාවන්ගෙන් තොරව, අ.පො.ස. සාමාන්‍ය පෙළ විභාගයට පෙනී සිටින සෑම ශ්‍රී ලාංකේය සිසුවෙකුටම උසස් තත්ත්වයේ ඉගෙනුම් ද්‍රව්‍ය, විෂයානුබද්ධ මගපෙන්වීම සහ ශිෂ්‍ය උපදේශනය නොමිලේ හා සමානාත්මතාවයෙන් යුතුව ලබාදීම අපගේ දැක්මයි.",
  "Develop Diagnostic Assessments &amp; Quizzes": "ස්වයං ඇගයීම් සහ පුහුණු ප්‍රශ්නාවලි නිර්මාණය කිරීම",
  "Foster Academic Confidence &amp; Examination Readiness": "අධ්‍යයන ආත්මවිශ්වාසය සහ විභාග සූදානම ගොඩනැගීම",
  "Chemical Reactions, Acids &amp; Bases Summary": "රසායනික ප්‍රතික්‍රියා, අම්ල සහ භස්ම සාරාංශය",
  "Designers &amp; Developers": "නිර්මාණකරුවන් සහ සංවර්ධකයින්",
  "Mentorship Liaison 1:5 Cohort Matching &amp; Support": "1:5 උපදේශන සම්බන්ධීකරණය සහ සහය",
  "Instant results &amp; explanations": "ක්ෂණික ලකුණු සහ පැහැදිලි කිරීම්",
  "Force &amp; Motion &mdash; Quick Review Quiz": "බලය සහ චලිතය — කෙටි පුහුණු ප්‍රශ්නාවලිය",
  "Forces &amp; Motion": "බලය සහ චලිතය",
  "Work, Energy &amp; Power": "කාර්යය, ශක්තිය සහ ක්ෂමතාව",
  "Periodic Table &amp; Bonding": "ආවර්තිතා වගුව සහ බන්ධන",
  "Nervous System &amp; Senses": "ස්නායු පද්ධතිය සහ සංවේදක",
  "Geometry &amp; Measurement": "ජ්‍යාමිතිය සහ මිනුම්",
  "Probability &amp; Statistics": "සම්භාවිතාව සහ සංඛ්‍යානය",
  "Academic Repository Curated Study Dossiers Download syllabus-aligned revision materials prepared for O/L Science &amp; Mathematics candidates.": "අධ්‍යාපනික ලේඛනාගාරය — සා/පෙළ විද්‍යාව හා ගණිතය සිසුන් වෙනුවෙන් සම්පාදනය කළ විෂය නිර්දේශානුකූල පුනරීක්ෂණ ද්‍රව්‍ය බාගත කරන්න.",
  "At the core of Mansala are the undergraduate volunteers from the University of Ruhuna . These dedicated students &mdash; from diverse faculties and disciplines &mdash; come together under the Faculty of Science to contribute their time, knowledge, and energy to making a difference in the lives of younger students.": "මංසල වැඩසටහනේ හදවත බඳු වන්නේ රුහුණ විශ්වවිද්‍යාලයේ විද්‍යා පීඨ ශිෂ්‍ය ස්වේච්ඡා කණ්ඩායමයි. විවිධ විෂය ක්ෂේත්‍ර නියෝජනය කරන මෙම කැපවූ සිසුන්, බාල පරපුරේ අධ්‍යාපනික ජීවිතය සාර්ථක කරලීම උදෙසා තම කාලය, දැනුම හා ශක්තිය නොමසුරුව දායක කරයි.",
  "Featured Master Dossier Science Past Paper &amp; Marking Scheme 2023 G.C.E. O/L Science &mdash; Complete Examination Dossier &amp; Marking Scheme An exhaustive review document containing the full 2023 national examination paper (Parts I, II &amp; Structured Essay), complete with an annotated marking scheme, mentor commentary on frequent errors, and model answer formulations.": "විශේෂ ප්‍රධාන ලේඛනය: විද්‍යාව පසුගිය ප්‍රශ්න පත්‍රය සහ ලකුණු පටිපාටිය — 2023 අ.පො.ස. සා/පෙළ විද්‍යාව සම්පූර්ණ විභාග ප්‍රශ්න පත්‍රය (I, II හා ව්‍යුහගත රචනා), සවිස්තර ලකුණු පටිපාටිය, සුලබ වැරදි පිළිබඳ විග්‍රහ සහ ආදර්ශ පිළිතුරු ඇතුළත් පූර්ණ අධ්‍යයන සංග්‍රහය.",
  "Mathematics Revision Guide 14 Pages &bull; 1.8 MB Simultaneous Equations &amp; Quadratic Graphing Comprehensive step-by-step revision guide on algebraic elimination, substitution, and graphical solutions with 15 worked model exam questions.": "ගණිතය පුනරීක්ෂණ මාර්ගෝපදේශය (පිටු 14 &bull; 1.8 MB): යුගල සමීකරණ සහ වර්ගජ ප්‍රස්තාර — වීජීය ආදේශය, ඉවත් කිරීම සහ ප්‍රස්තාරික විසඳුම් පිළිබඳ විසඳූ ආදර්ශ ගැටලු 15 ක් සහිත පූර්ණ මාර්ගෝපදේශය.",
  "මංසල &ndash; Mansala is a volunteer-driven educational programme organised by the Faculty of Science of the University of Ruhuna. Born from a genuine desire to give back to the community, Manasala brings together university undergraduates who are passionate about teaching and mentoring to support Ordinary Level (O/L) students preparing for their national examinations in Science and Mathematics.": "<strong>මංසල</strong> යනු රුහුණ විශ්වවිද්‍යාලයේ විද්‍යා පීඨය විසින් සංවිධානය කරනු ලබන ස්වේච්ඡා අධ්‍යාපනික වැඩසටහනකි. ප්‍රජාවට නැවත සේවය කිරීමේ උදාර අරමුණින් බිහිවූ මංසල, විද්‍යාව හා ගණිතය විෂයයන්ගෙන් සාමාන්‍ය පෙළ (සා/පෙළ) ජාතික විභාගයට පෙනී සිටින සිසුන්ට සහය වීම සඳහා ඉගැන්වීමට හා උපදේශනයට කැපවූ විශ්වවිද්‍යාල සිසුන් එක්රැස් කරයි.",
  "The programme was first conceived when members of the Faculty of Science recognised that many O/L students &mdash; particularly those in rural and underserved areas &mdash; face significant challenges accessing quality educational support. By leveraging the knowledge and enthusiasm of university students, Manasala creates a bridge between higher education and secondary school learners, fostering a culture of peer-led learning and academic solidarity.": "ග්‍රාමීය සහ දුෂ්කර ප්‍රදේශවල බොහෝ සා/පෙළ සිසුන් ගුණාත්මක අධ්‍යාපනික සහය ලබා ගැනීමේදී දැඩි අභියෝගවලට මුහුණ දෙන බව හඳුනාගත් විද්‍යා පීඨයේ සාමාජිකයින් විසින් මෙම වැඩසටහන ආරම්භ කරන ලදී. විශ්වවිද්‍යාල සිසුන්ගේ දැනුම සහ උනන්දුව උපයෝගී කරගනිමින්, උසස් අධ්‍යාපනය සහ ද්විතීයික පාසල් සිසුන් අතර පාලමක් නිර්මාණය කරමින් සහයෝගීතා ඉගෙනුම් සංස්කෘතියක් ගොඩනැගීම මංසල අරමුණයි.",
  "Manasala was created to bridge these educational gaps. The programme recognises that education is a collective responsibility and that university students &mdash; having recently navigated the same academic challenges &mdash; are uniquely positioned to mentor, inspire, and guide younger learners.": "<strong>මෙම අධ්‍යාපනික පරතරය පියවීම සඳහා මංසල බිහිවිය.</strong> අධ්‍යාපනය යනු සාමූහික වගකීමක් බවත්, මෑතකදී මෙම විභාග ජයගත් විශ්වවිද්‍යාල සිසුන්ට පාසල් සිසුන් උනන්දු කරවීමට සහ මගපෙන්වීමට සුවිශේෂී හැකියාවක් ඇති බවත් මෙම වැඩසටහන තරයේ විශ්වාස කරයි.",
  "Each mentor is a current undergraduate who has excelled in the very subjects they now help teach. They understand the challenges O/L students face because they have been through the same journey. Through regular interactions &mdash; whether reviewing difficult concepts, working through past papers, or simply offering encouragement &mdash; our mentors help bridge the gap between classroom learning and examination readiness, creating a lasting positive impact on students' educational outcomes.": "සෑම උපදේශකයෙකුම තමන් උගන්වන විෂයයන්හි විශිෂ්ට සාමාර්ථ ලබාගත් විශ්වවිද්‍යාල සිසුන්ය. එම අධ්‍යාපනික අභියෝග ඔවුහු මැනවින් අත්විඳ ඇත්තාහ. නිතිපතා පවත්වන සාකච්ඡා, පසුගිය ප්‍රශ්න පත්‍ර විසඳීම සහ දිරිගැන්වීම් හරහා සිසුන්ගේ අධ්‍යාපන ජයග්‍රහණය උදෙසා ඔවුහු කල්පවත්නා බලපෑමක් ඇති කරති.",
  "The මංසල resource library brings together curated study materials to support O/L students preparing for Science and Mathematics examinations. Browse past examination papers, model question sets, comprehensive revision notes, and exam marking schemes &mdash; all organised for easy access and available completely free of charge.": "සා/පෙළ විද්‍යාව හා ගණිතය විභාග සඳහා සූදානම් වන සිසුන්ට සහය වීම සඳහා මංසල ඉගෙනුම් පුස්තකාලය මඟින් සම්පාදිත අධ්‍යයන ද්‍රව්‍ය එක්රැස් කර ඇත. පසුගිය විභාග ප්‍රශ්න පත්‍ර, ආදර්ශ ප්‍රශ්න කට්ටල, විස්තීර්ණ පුනරීක්ෂණ සටහන් සහ ලකුණු දීමේ පටිපාටි සියල්ල නොමිලේ ලබාගත හැකිය.",
  "Whether you're a student preparing for O/L examinations, a parent seeking information about the programme, or a guardian wanting to connect your child with mentorship opportunities &mdash; our Help Desk is your direct point of contact. Reach out using the contact details below or submit an enquiry through the form.": "ඔබ සා/පෙළ විභාගයට සූදානම් වන සිසුවෙකු වුවද, වැඩසටහන පිළිබඳ තොරතුරු සොයන දෙමාපියෙකු හෝ භාරකරුවෙකු වුවද — අපගේ උපකාරක කවුළුව ඔබේ සෘජු සම්බන්ධතා ස්ථානයයි. පහත විස්තර භාවිතයෙන් හෝ විමසීම් පෝරමය හරහා අප හා සම්බන්ධ වන්න.",
  "Chemical Reactions &amp; Acids": "රසායනික ප්‍රතික්‍රියා සහ අම්ල",
  "Circle Theorems &amp; Tangents": "වෘත්ත ප්‍රමේය සහ ස්පර්ශක",
  "Science (විද්‍යාව) Grade 10 &amp; 11": "විද්‍යාව (Science) 10 සහ 11 ශ්‍රේණි",
  "Mathematics (ගණිතය) Grade 10 &amp; 11": "ගණිතය (Mathematics) 10 සහ 11 ශ්‍රේණි",
  "Curated Study Dossiers Download syllabus-aligned revision materials prepared for O/L Science &amp; Mathematics candidates.": "විෂය නිර්දේශයට අනුකූලව සකස් කරන ලද සා/පෙළ විද්‍යාව සහ ගණිතය පුනරීක්ෂණ ඉගෙනුම් ද්‍රව්‍ය බාගත කරන්න.",
  "Students' Union &amp;bull; Faculty of Science &amp;bull; University of Ruhuna": "විද්‍යා පීඨ ශිෂ්‍ය සංගමය &bull; රුහුණ විශ්වවිද්‍යාලය",
  "Academic Charter • Faculty of Science Students' Union": "අධ්‍යයන ප්‍රඥප්තිය • විද්‍යා පීඨ ශිෂ්‍ය සංගමය",
  "Academic Charter &amp;bull; Faculty of Science Students' Union": "අධ්‍යයන ප්‍රඥප්තිය &bull; විද්‍යා පීඨ ශිෂ්‍ය සංගමය",
  "Operational Charter • Students' Union Outreach": "මෙහෙයුම් ප්‍රඥප්තිය • ශිෂ්‍ය සංගමයේ ප්‍රජා සත්කාරය",
  "Operational Charter &amp;bull; Students' Union Outreach": "මෙහෙයුම් ප්‍රඥප්තිය &bull; ශිෂ්‍ය සංගමයේ ප්‍රජා සත්කාරය",
  "මංසල &ndash; Mansala is a volunteer-driven educational programme organised by the Students' Union of the Faculty of Science of the University of Ruhuna. Born from a genuine desire to give back to the community, Manasala brings together university undergraduates who are passionate about teaching and mentoring to support Ordinary Level (O/L) students preparing for their national examinations in Science and Mathematics.": "<strong>මංසල</strong> යනු රුහුණ විශ්වවිද්‍යාලයේ විද්‍යා පීඨ ශිෂ්‍ය සංගමය විසින් මෙහෙයවනු ලබන ස්වේච්ඡා අධ්‍යාපනික සත්කාරයකි. ප්‍රජාවට නැවත යමක් ලබාදීමේ උදාර අරමුණින් බිහිවූ මංසල, විද්‍යාව හා ගණිතය විෂයයන්ගෙන් සාමාන්‍ය පෙළ (සා/පෙළ) විභාගයට පෙනී සිටින දරුවන්ට ශක්තියක් වීම සඳහා ඉගැන්වීමට සහ මගපෙන්වීමට කැපවුණු විශ්වවිද්‍යාල ශිෂ්‍ය ප්‍රජාව ඒකරාශී කරයි.",
  "The programme was first conceived when members of the Faculty of Science Students' Union recognised that many O/L students &mdash; particularly those in rural and underserved areas &mdash; face significant challenges accessing quality educational support. By leveraging the knowledge and enthusiasm of university students, Manasala creates a bridge between higher education and secondary school learners, fostering a culture of peer-led learning and academic solidarity.": "ග්‍රාමීය සහ දුෂ්කර ප්‍රදේශවල බොහෝ සා/පෙළ සිසුන් ගුණාත්මක අධ්‍යාපනික සහය ලබා ගැනීමේදී දැඩි අපහසුතාවන්ට මුහුණ දෙන බව විද්‍යා පීඨ ශිෂ්‍ය සංගමයේ සාමාජිකයින් හඳුනාගැනීමත් සමඟ මෙම වැඩසටහන ආරම්භ විය. විශ්වවිද්‍යාල සිසුන්ගේ දැනුම හා උනන්දුව උපයෝගී කරගනිමින්, උසස් අධ්‍යාපනය සහ පාසල් සිසුන් අතර පාලමක් නිර්මාණය කරමින් සහෝදරත්වයේ ඉගෙනුම් සංස්කෘතියක් බිහිකිරීම මංසල අරමුණයි.",
  "මංසල &ndash; Mansala is an educational outreach programme organised by the Students' Union of the Faculty of Science of the University of Ruhuna. It is designed to support Ordinary Level (O/L) students in Sri Lanka by providing free learning resources, practice quizzes, and mentorship in Science and Mathematics. The programme is run entirely by volunteer university students committed to helping the next generation succeed.": "මංසල යනු රුහුණ විශ්වවිද්‍යාලයේ විද්‍යා පීඨ ශිෂ්‍ය සංගමය විසින් සංවිධානය කරනු ලබන අධ්‍යාපනික සත්කාරයකි. නොමිලේ ඉගෙනුම් ද්‍රව්‍ය, පුහුණු ප්‍රශ්නාවලි සහ 1:5 උපදේශන සේවාව ලබා දෙමින් ශ්‍රී ලාංකික සා/පෙළ සිසුන්ට සහය වීම මෙහි අරමුණයි.",
  "මංසල – Mansala is a flagship humanitarian and educational outreach movement organised and spearheaded by the Students' Union of the Faculty of Science, University of Ruhuna. Born from a profound sense of social accountability and empathy, Mansala channels the collective energy, intellectual capability, and volunteer spirit of university undergraduates to serve both vulnerable community families and underprivileged rural schools across Sri Lanka.": "මංසල යනු රුහුණ විශ්වවිද්‍යාලයේ විද්‍යා පීඨ ශිෂ්‍ය සංගමය මඟින් මෙහෙයවනු ලබන ප්‍රමුඛ මානුෂීය සහ අධ්‍යාපනික සත්කාරක ව්‍යාපාරයකි. ගැඹුරු සමාජ වගකීමක් සහ සහකම්පනයක් පෙරදැරිව බිහිවූ මංසල, විශ්වවිද්‍යාල උපාධි අපේක්ෂකයන්ගේ සාමූහික ශක්තිය, බුද්ධිමය දායකත්වය සහ ස්වේච්ඡා මෙහෙවර තුළින් ශ්‍රී ලංකාව පුරා අවදානමට ලක් වූ ප්‍රජාවන්ට සහ අඩු පහසුකම් සහිත ග්‍රාමීය පාසල්වලට සේවය කිරීමට කැපවී සිටී.",
  "Operating through two complementary wings — the Humanitarian & Outreach Wing and the Academic Empowerment Wing — Mansala provides rapid, frontline assistance during regional emergencies (such as monsoon floods and natural disasters), delivers direct infrastructure and laboratory apparatus aid to under-resourced schools, and maintains a completely free national study portal for G.C.E. Ordinary Level (O/L) Science and Mathematics candidates.": "ප්‍රධාන අංශ ද්විත්වයක් ඔස්සේ ක්‍රියාත්මක වන මංසල — එනම් මානුෂීය සහ ප්‍රජා සත්කාරක අංශය සහ අධ්‍යාපනික සවිබලගැන්වීමේ අංශය — වාරකන් ගංවතුර සහ ආපදා හමුවේ පෙරමුණේ හදිසි ආධාර සැලසීම, අඩු පහසුකම් සහිත පාසල් සඳහා යටිතල පහසුකම් සහ විද්‍යාගාර උපකරණ පරිත්‍යාග කිරීම සහ සාමාන්‍ය පෙළ විද්‍යාව හා ගණිතය සිසුන් වෙනුවෙන් 100% නොමිලේ ජාතික අධ්‍යාපන පියසක් පවත්වාගෙන යාම සිදු කරයි.",
  "Operating through two complementary wings — the Humanitarian &amp; Outreach Wing and the Academic Empowerment Wing — Mansala provides rapid, frontline assistance during regional emergencies (such as monsoon floods and natural disasters), delivers direct infrastructure and laboratory apparatus aid to under-resourced schools, and maintains a completely free national study portal for G.C.E. Ordinary Level (O/L) Science and Mathematics candidates.": "ප්‍රධාන අංශ ද්විත්වයක් ඔස්සේ ක්‍රියාත්මක වන මංසල — එනම් මානුෂීය සහ ප්‍රජා සත්කාරක අංශය සහ අධ්‍යාපනික සවිබලගැන්වීමේ අංශය — වාරකන් ගංවතුර සහ ආපදා හමුවේ පෙරමුණේ හදිසි ආධාර සැලසීම, අඩු පහසුකම් සහිත පාසල් සඳහා යටිතල පහසුකම් සහ විද්‍යාගාර උපකරණ පරිත්‍යාග කිරීම සහ සාමාන්‍ය පෙළ විද්‍යාව හා ගණිතය සිසුන් වෙනුවෙන් 100% නොමිලේ ජාතික අධ්‍යාපන පියසක් පවත්වාගෙන යාම සිදු කරයි.",
  "At the core of Mansala are the undergraduate volunteers from the University of Ruhuna. These dedicated students — across disciplines of Physical Science, Biological Science, Mathematics, and Computer Science — unite under the Faculty of Science Students' Union to dedicate their time, knowledge, and physical labour to transform lives.": "මංසල ව්‍යාපාරයේ ප්‍රධාන බලවේගය වන්නේ රුහුණ විශ්වවිද්‍යාලයේ උපාධි අපේක්ෂක ස්වේච්ඡා සිසුන්ය. භෞතික විද්‍යාව, ජෛව විද්‍යාව, ගණිතය සහ පරිගණක විද්‍යාව යන විෂය ධාරාවන් හදාරන මෙම සිසුන්, විද්‍යා පීඨ ශිෂ්‍ය සංගමය යටතේ එක්ව තම දැනුම, කාලය සහ ශ්‍රමය කැප කරමින් ජීවිත නගාසිටුවීමට පෙරමුණ ගනී.",
  "At the core of Mansala are the undergraduate volunteers from the University of Ruhuna . These dedicated students — across disciplines of Physical Science, Biological Science, Mathematics, and Computer Science — unite under the Faculty of Science Students' Union to dedicate their time, knowledge, and physical labour to transform lives.": "මංසල ව්‍යාපාරයේ ප්‍රධාන බලවේගය වන්නේ රුහුණ විශ්වවිද්‍යාලයේ උපාධි අපේක්ෂක ස්වේච්ඡා සිසුන්ය. භෞතික විද්‍යාව, ජෛව විද්‍යාව, ගණිතය සහ පරිගණක විද්‍යාව යන විෂය ධාරාවන් හදාරන මෙම සිසුන්, විද්‍යා පීඨ ශිෂ්‍ය සංගමය යටතේ එක්ව තම දැනුම, කාලය සහ ශ්‍රමය කැප කරමින් ජීවිත නගාසිටුවීමට පෙරමුණ ගනී.",
  "Showing 1–6 of 11 upcoming campaigns": "ඉදිරි ව්‍යාපෘති 11 න් 1–6 පෙන්වයි",
  "Showing 1–6 of 14 completed projects": "පසුගිය ව්‍යාපෘති 14 න් 1–6 පෙන්වයි",
  "Max 6 projects per page": "පිටුවකට උපරිම ව්‍යාපෘති 6 කි",
  "A flagship community welfare, humanitarian relief and educational movement organized by the Students' Union of the Faculty of Science, University of Ruhuna.": "රුහුණ විශ්වවිද්‍යාලයේ විද්‍යා පීඨ ශිෂ්‍ය සංගමය මඟින් මෙහෙයවනු ලබන ප්‍රමුඛ ප්‍රජා සුබසාධන, මානුෂීය සහන සහ අධ්‍යාපනික සත්කාරක ව්‍යාපාරයකි.",
  "An educational programme organised by the Students' Union of the University of Ruhuna, supporting O/L students in Science and Mathematics.": "රුහුණ විශ්වවිද්‍යාලයේ විද්‍යා පීඨ ශිෂ්‍ය සංගමය මඟින් මෙහෙයවනු ලබන, සා/පෙළ විද්‍යාව හා ගණිතය සිසුන් සවිබල ගන්වන අධ්‍යාපනික සත්කාරයකි.",
  "Filters 0": "පෙරහන් 0",
  "Active:": "සක්‍රීය:",
  "Material Type": "ද්‍රව්‍ය වර්ගය",
  "Marking Schemes": "ලකුණු දීමේ පටිපාටි",
  "Revision Materials": "පුනරීක්ෂණ ද්‍රව්‍ය",
  "Year": "වර්ෂය",
  "Done": "අවසන්",
  "Showing 1–9 of 25 resources": "සම්පත් 25 න් 1–9 පෙන්වයි",
  "Past Paper": "පසුගිය ප්‍රශ්න පත්‍රය",
  "FORMAT: PDF": "ආකෘතිය: PDF",
  "• FORMAT: PDF": "• ආකෘතිය: PDF",
  "&bull; FORMAT: PDF": "&bull; ආකෘතිය: PDF",
  "Showing 1–6 of 12 curated practice quizzes": "සම්පාදිත ප්‍රශ්නාවලි 12 න් 1–6 පෙන්වයි",
  "Self-paced": "ස්වයං අධ්‍යයනය",
  "Question 1 of 5": "ප්‍රශ්නය 1/5",
  "Forces & Motion • Science": "බල සහ චලිතය • විද්‍යාව",
  "Forces &amp; Motion &bull; Science": "බල සහ චලිතය • විද්‍යාව",
  "Undergraduate Mentor": "විශ්වවිද්‍යාල උපදේශක",
  "Your Choice": "ඔබේ තේරීම",
  "&#10007; Your Choice": "&#10007; ඔබේ තේරීම",
  "Direct undergraduate-led humanitarian relief and educational outreach across Sri Lanka. Review upcoming fundraising goals, track financial transparency with bank slip submission, and explore verified fieldwork reports.": "ශ්‍රී ලංකාව පුරා ක්‍රියාත්මක වන මානුෂීය සහන සේවා සහ අධ්‍යාපනික ව්‍යාපෘති. ඉදිරි අරමුදල් ඉලක්ක, විනිවිදභාවයෙන් යුතු මූල්‍ය ප්‍රගතිය සහ ක්ෂේත්‍ර වාර්තා මෙතැනින් විමසන්න.",
  "Support upcoming school seminars, flood recovery cleanup missions, and rural laboratory equipment donations. 100% of public contributions directly reach target beneficiaries.": "ඉදිරි පාසල් සම්මන්ත්‍රණ, ගංවතුර සහන මෙහෙයුම් සහ පාසල් විද්‍යාගාර පරිත්‍යාග සඳහා දායක වන්න. ඔබේ ආධාර මුදල් සෘජුවම ප්‍රතිලාභීන් වෙත යොදවනු ලැබේ.",
  "Explore past school seminars, post-disaster flood cleanup missions, equipment handovers, and photographic documentation.": "පැවැත්වූ සම්මන්ත්‍රණ, ගංවතුර සහන මෙහෙයුම්, උපකරණ පරිත්‍යාග සහ ඡායාරූප වාර්තා මෙතැනින් නරඹන්න.",
  "Field Missions Completed": "ප්‍රජා මෙහෙයුම්",
  "Beneficiaries Reached": "ප්‍රතිලාභී ජනතාව හා සිසුන්",
  "Focus Area / Aid Delivered": "ක්ෂේත්‍රය / ලබා දුන් ආධාර",
  "Support Cause": "ආධාර කරන්න",
  "Undergraduates in Service of the Community & Future Generations": "ප්‍රජා සුබසාධනය සහ අනාගත පරපුර උදෙසා සරසවි සිසු මෙහෙවර",
  "Undergraduates in Service of the Community &amp; Future Generations": "ප්‍රජා සුබසාධනය සහ අනාගත පරපුර උදෙසා සරසවි සිසු මෙහෙවර",
  "මංසල – Community Outreach & Educational Movement": "මංසල – ප්‍රජා සත්කාරක හා අධ්‍යාපනික ව්‍යාපාරය",
  "මංසල – Community Outreach &amp; Educational Movement": "මංසල – ප්‍රජා සත්කාරක හා අධ්‍යාපනික ව්‍යාපාරය",
  "A flagship humanitarian and educational movement by undergraduates of the Faculty of Science, University of Ruhuna. Spearheading emergency disaster & flood relief, rural school infrastructure aid, and a 100% free G.C.E. O/L Science & Mathematics study portal.": "රුහුණ විශ්වවිද්‍යාලයේ විද්‍යා පීඨ ශිෂ්‍ය ප්‍රජාව විසින් මෙහෙයවන මානුෂීය සහ අධ්‍යාපනික ව්‍යාපාරයකි. ආපදා සහ ගංවතුර සහන සේවා, ග්‍රාමීය පාසල් යටිතල පහසුකම් සංවර්ධනය සහ 100% නොමිලේ සා/පෙළ විද්‍යාව හා ගණිතය ඉගෙනුම් ද්වාරය මෙහි අන්තර්ගත වේ.",
  "A flagship humanitarian and educational movement by undergraduates of the Faculty of Science, University of Ruhuna. Spearheading emergency disaster &amp; flood relief, rural school infrastructure aid, and a 100% free G.C.E. O/L Science &amp; Mathematics study portal.": "රුහුණ විශ්වවිද්‍යාලයේ විද්‍යා පීඨ ශිෂ්‍ය ප්‍රජාව විසින් මෙහෙයවන මානුෂීය සහ අධ්‍යාපනික ව්‍යාපාරයකි. ආපදා සහ ගංවතුර සහන සේවා, ග්‍රාමීය පාසල් යටිතල පහසුකම් සංවර්ධනය සහ 100% නොමිලේ සා/පෙළ විද්‍යාව හා ගණිතය ඉගෙනුම් ද්වාරය මෙහි අන්තර්ගත වේ.",
  "Explore Community & Relief Projects": "ප්‍රජා සහ සහන ව්‍යාපෘති ගවේෂණය",
  "Explore Community &amp; Relief Projects": "ප්‍රජා සහ සහන ව්‍යාපෘති ගවේෂණය",
  "Enter Study Hub": "අධ්‍යාපන පියසට පිවිසෙන්න",
  "Disaster Relief & School Aid": "ආපදා සහන සහ පාසල් ආධාර",
  "Disaster Relief &amp; School Aid": "ආපදා සහන සහ පාසල් ආධාර",
  "Undergraduate Voluntary Movement": "සරසවි සිසු ස්වේච්ඡා මෙහෙවර",
  "Official Movement Identity": "නිල ව්‍යාපාරික අනන්‍යතාව",
  "Outreach & Relief Missions": "ප්‍රජා මෙහෙයුම්",
  "Outreach &amp; Relief Missions": "ප්‍රජා මෙහෙයුම්",
  "Students & Families": "සිසුන් හා පවුල්",
  "About මංසල – Mansala": "මංසල පිළිබඳව",
  "A Dual Movement of Humanitarian Relief & Academic Empowerment": "මානුෂීය සත්කාරය සහ අධ්‍යාපනික සවිබල ගැන්වීම",
  "A Dual Movement of Humanitarian Relief &amp; Academic Empowerment": "මානුෂීය සත්කාරය සහ අධ්‍යාපනික සවිබල ගැන්වීම",
  "Key Strategic Objectives": "ප්‍රධාන උපායමාර්ගික අරමුණු",
  "“A Sri Lanka where geographical, economic, and climatic vulnerabilities never compromise a child’s right to quality education and dignified community welfare, achieved through active student solidarity and academic excellence.”": "“භූගෝලීය, ආර්ථික හෝ ආපදාමය බාධාවන් කිසිදු දරුවෙකුගේ ගුණාත්මක අධ්‍යාපනයට සහ ප්‍රජා සුබසාධනයට බාධාවක් නොවන, විශ්වවිද්‍යාල ශිෂ්‍ය සහයෝගීතාවයෙන් සවිමත් වූ ශ්‍රී ලංකාවක් නිර්මාණය කිරීම.”",
  "&ldquo;A Sri Lanka where geographical, economic, and climatic vulnerabilities never compromise a child&rsquo;s right to quality education and dignified community welfare, achieved through active student solidarity and academic excellence.&rdquo;": "&ldquo;භූගෝලීය, ආර්ථික හෝ ආපදාමය බාධාවන් කිසිදු දරුවෙකුගේ ගුණාත්මක අධ්‍යාපනයට සහ ප්‍රජා සුබසාධනයට බාධාවක් නොවන, විශ්වවිද්‍යාල ශිෂ්‍ය සහයෝගීතාවයෙන් සවිමත් වූ ශ්‍රී ලංකාවක් නිර්මාණය කිරීම.&rdquo;",
  "“To rapidly mobilise university volunteer resources, expertise, and community goodwill to provide frontline disaster relief, equip rural classrooms, and deliver 100% free, syllabus-aligned Science and Mathematics learning materials and small-group mentorship to every aspiring student.”": "“හදිසි ආපදා සහන සැලසීම, ග්‍රාමීය පාසල් යටිතල පහසුකම් සංවර්ධනය කිරීම සහ සාමාන්‍ය පෙළ සිසුන් වෙනුවෙන් නොමිලේ ගුණාත්මක විද්‍යාව හා ගණිතය ඉගෙනුම් ද්‍රව්‍ය සහ මගපෙන්වීම සලසා දීම උදෙසා විශ්වවිද්‍යාල ශිෂ්‍ය ප්‍රජාව බලමුළු ගැන්වීම.”",
  "&ldquo;To rapidly mobilise university volunteer resources, expertise, and community goodwill to provide frontline disaster relief, equip rural classrooms, and deliver 100% free, syllabus-aligned Science and Mathematics learning materials and small-group mentorship to every aspiring student.&rdquo;": "&ldquo;හදිසි ආපදා සහන සැලසීම, ග්‍රාමීය පාසල් යටිතල පහසුකම් සංවර්ධනය කිරීම සහ සාමාන්‍ය පෙළ සිසුන් වෙනුවෙන් නොමිලේ ගුණාත්මක විද්‍යාව හා ගණිතය ඉගෙනුම් ද්‍රව්‍ය සහ මගපෙන්වීම සලසා දීම උදෙසා විශ්වවිද්‍යාල ශිෂ්‍ය ප්‍රජාව බලමුළු ගැන්වීම.&rdquo;",
  "Students &amp; Families": "සිසුන් හා පවුල්",
  "Audited Trust": "විගණනය කළ විශ්වාසය",
  "Two Core Wings of Mansala": "මංසල මූලික අංශ ද්විත්වය",
  "How Would You Like to Engage?": "ඔබ අප හා එක්වීමට කැමති කෙසේද?",
  "Choose your pathway below to support humanitarian community causes or access 100% free G.C.E. O/L study materials.": "මානුෂීය ප්‍රජා සත්කාර සඳහා දායක වීමට හෝ නොමිලේ සා/පෙළ ඉගෙනුම් ද්‍රව්‍ය ලබා ගැනීමට පහතින් ඔබගේ අංශය තෝරාගන්න.",
  "Humanitarian & Outreach Wing": "මානුෂීය සහ ප්‍රජා සත්කාරක අංශය",
  "Humanitarian &amp; Outreach Wing": "මානුෂීය සහ ප්‍රජා සත්කාරක අංශය",
  "For Donors, Alumni & Public": "ආධාරකරුවන්, ආදි සිසුන් සහ ප්‍රජාව සඳහා",
  "For Donors, Alumni &amp; Public": "ආධාරකරුවන්, ආදි සිසුන් සහ ප්‍රජාව සඳහා",
  "Community Welfare, Disaster Relief & School Aid": "ප්‍රජා සුබසාධනය, ආපදා සහන සහ පාසල් ආධාර",
  "Community Welfare, Disaster Relief &amp; School Aid": "ප්‍රජා සුබසාධනය, ආපදා සහන සහ පාසල් ආධාර",
  "Direct undergraduate-led fieldwork delivering emergency flood relief, school library & laboratory donations, and educational seminars across rural Sri Lanka.": "ගංවතුර ආපදා සහන, ග්‍රාමීය පාසල් පුස්තකාල හා විද්‍යාගාර උපකරණ පරිත්‍යාග සහ අධ්‍යාපනික සම්මන්ත්‍රණ සෘජුවම විශ්වවිද්‍යාල සිසුන් විසින් මෙහෙයවනු ලැබේ.",
  "Direct undergraduate-led fieldwork delivering emergency flood relief, school library &amp; laboratory donations, and educational seminars across rural Sri Lanka.": "ගංවතුර ආපදා සහන, ග්‍රාමීය පාසල් පුස්තකාල හා විද්‍යාගාර උපකරණ පරිත්‍යාග සහ අධ්‍යාපනික සම්මන්ත්‍රණ සෘජුවම විශ්වවිද්‍යාල සිසුන් විසින් මෙහෙයවනු ලැබේ.",
  "Emergency flood cleanup & ration drives in affected areas": "ගංවතුරෙන් ආපදාවට පත් ප්‍රදේශ පිරිසිදු කිරීම සහ වියළි ආහාර බෙදා හැරීම",
  "Emergency flood cleanup &amp; ration drives in affected areas": "ගංවතුරෙන් ආපදාවට පත් ප්‍රදේශ පිරිසිදු කිරීම සහ වියළි ආහාර බෙදා හැරීම",
  "Science lab apparatus, library books & stationery kits to rural schools": "ග්‍රාමීය පාසල් සඳහා විද්‍යාගාර උපකරණ, පුස්තකාල පොත් සහ ලිපිද්‍රව්‍ය ආධාර",
  "Science lab apparatus, library books &amp; stationery kits to rural schools": "ග්‍රාමීය පාසල් සඳහා විද්‍යාගාර උපකරණ, පුස්තකාල පොත් සහ ලිපිද්‍රව්‍ය ආධාර",
  "Volunteer-led motivational & academic regional seminars": "ස්වේච්ඡා නායකත්වයෙන් යුත් ප්‍රාදේශීය අධ්‍යාපන සම්මන්ත්‍රණ",
  "Volunteer-led motivational &amp; academic regional seminars": "ස්වේච්ඡා නායකත්වයෙන් යුත් ප්‍රාදේශීය අධ්‍යාපන සම්මන්ත්‍රණ",
  "Support an Active Cause": "සක්‍රීය ව්‍යාපෘතියකට දායක වන්න",
  "View Past Field Recaps": "පසුගිය ක්ෂේත්‍ර වාර්තා බලන්න",
  "Academic Empowerment Wing": "අධ්‍යාපනික සවිබලගැන්වීමේ අංශය",
  "For Students, Parents & Teachers": "සිසුන්, දෙමාපියන් සහ ගුරුවරුන් සඳහා",
  "For Students, Parents &amp; Teachers": "සිසුන්, දෙමාපියන් සහ ගුරුවරුන් සඳහා",
  "Free G.C.E. O/L Science & Maths Study Portal": "නොමිලේ සා/පෙළ විද්‍යාව හා ගණිතය අධ්‍යාපන පියස",
  "Free G.C.E. O/L Science &amp; Maths Study Portal": "නොමිලේ සා/පෙළ විද්‍යාව හා ගණිතය අධ්‍යාපන පියස",
  "Curated learning resources, topic-wise practice quizzes, and structured undergraduate mentorship designed to help every student achieve exam distinction.": "විෂය නිර්දේශයට අනුකූල ඉගෙනුම් සම්පත්, ප්‍රශ්නාවලි සහ විශ්වවිද්‍යාල සිසුන්ගේ උපදේශනය තුළින් සා/පෙළ විශිෂ්ට සාමාර්ථයකට මග පෙන්වයි.",
  "Term test papers, model papers & marking schemes": "වාර විභාග ප්‍රශ්න පත්‍ර, ආදර්ශ ප්‍රශ්න පත්‍ර සහ ලකුණු දීමේ පටිපාටි",
  "Term test papers, model papers &amp; marking schemes": "වාර විභාග ප්‍රශ්න පත්‍ර, ආදර්ශ ප්‍රශ්න පත්‍ර සහ ලකුණු දීමේ පටිපාටි",
  "Interactive topic-based quizzes with step-by-step explanations": "පියවරෙන් පියවර විවරණ සහිත අන්තර්ක්‍රියාකාරී ප්‍රශ්නාවලි",
  "1:5 Mentor-to-Student ratio with Ruhuna Science undergraduates": "රුහුණ විද්‍යා පීඨ සිසුන් සමග 1:5 සමීප උපදේශක සම්බන්ධතාවය",
  "Download Papers & Notes": "ප්‍රශ්න පත්‍ර හා සටහන් ලබාගන්න",
  "Download Papers &amp; Notes": "ප්‍රශ්න පත්‍ර හා සටහන් ලබාගන්න",
  "Field Impact in Action": "ක්‍රියාකාරී ක්ෂේත්‍ර මෙහෙවර",
  "Recent Outreach & Relief Highlights": "මෑතකාලීන ප්‍රජා සත්කාරක සහ සහන මෙහෙයුම්",
  "Recent Outreach &amp; Relief Highlights": "මෑතකාලීන ප්‍රජා සත්කාරක සහ සහන මෙහෙයුම්",
  "A glimpse into our recent on-the-ground volunteer missions across the Southern Province and beyond.": "දකුණු පළාත සහ ඒ අවට ප්‍රදේශවල අප විසින් ක්‍රියාත්මක කරන ලද මෑතකාලීන ස්වේච්ඡා මෙහෙයුම් කිහිපයක්.",
  "Disaster & Flood Relief": "ආපදා සහ ගංවතුර සහන",
  "Disaster &amp; Flood Relief": "ආපදා සහ ගංවතුර සහන",
  "Flood Recovery & School Cleanup – Akuressa": "ගංවතුර පුනරුත්ථාපනය සහ පාසල් පිරිසිදු කිරීම – අකුරැස්ස",
  "Flood Recovery &amp; School Cleanup – Akuressa": "ගංවතුර පුනරුත්ථාපනය සහ පාසල් පිරිසිදු කිරීම – අකුරැස්ස",
  "Undergraduates cleared flood mud from classrooms and homes, restoring learning facilities and distributing essential dry rations & stationery packs to affected families.": "ගංවතුරින් විපතට පත් නිවාස සහ පන්තිකාමර පිරිසිදු කර යථා තත්ත්වයට පත් කරමින්, වියළි ආහාර සහ අත්‍යවශ්‍ය පාසල් උපකරණ බෙදා දීමට සරසවි සිසුන් එක් විය.",
  "Undergraduates cleared flood mud from classrooms and homes, restoring learning facilities and distributing essential dry rations &amp; stationery packs to affected families.": "ගංවතුරින් විපතට පත් නිවාස සහ පන්තිකාමර පිරිසිදු කර යථා තත්ත්වයට පත් කරමින්, වියළි ආහාර සහ අත්‍යවශ්‍ය පාසල් උපකරණ බෙදා දීමට සරසවි සිසුන් එක් විය.",
  "65 Families & 1 School Restored": "පවුල් 65ක් සහ පාසලක් යථා තත්ත්වයට",
  "65 Families &amp; 1 School Restored": "පවුල් 65ක් සහ පාසලක් යථා තත්ත්වයට",
  "Read Field Report": "ක්ෂේත්‍ර වාර්තාව කියවන්න",
  "School Aid & Donations": "පාසල් ආධාර සහ පරිත්‍යාග",
  "School Aid &amp; Donations": "පාසල් ආධාර සහ පරිත්‍යාග",
  "Science Lab Apparatus & Library Book Drive": "විද්‍යාගාර උපකරණ සහ පුස්තකාල පොත් පරිත්‍යාගය",
  "Science Lab Apparatus &amp; Library Book Drive": "විද්‍යාගාර උපකරණ සහ පුස්තකාල පොත් පරිත්‍යාගය",
  "Equipped two underprivileged rural schools in Hambantota with practical Science glassware, measurement tools, desks, and 450+ curated study books.": "හම්බන්තොට දුෂ්කර පාසල් දෙකක් සඳහා ප්‍රායෝගික විද්‍යාගාර වීදුරු උපකරණ, මිනුම් උපකරණ, ඩෙස්ක්-පුටු සහ අධ්‍යාපනික පොත් 450කට අධික ප්‍රමාණයක් පරිත්‍යාග කරන ලදී.",
  "2 Schools & 320+ Students Impacted": "පාසල් 2ක් සහ සිසුන් 320+ දෙනෙකුට ප්‍රතිලාභ",
  "2 Schools &amp; 320+ Students Impacted": "පාසල් 2ක් සහ සිසුන් 320+ දෙනෙකුට ප්‍රතිලාභ",
  "Explore Donation Impact": "පරිත්‍යාග වාර්තාව බලන්න",
  "Educational Seminars": "අධ්‍යාපනික සම්මන්ත්‍රණ",
  "Empowering Rural Candidates for O/L Success": "සා/පෙළ සිසුන් විභාගයට සූදානම් කිරීමේ සම්මන්ත්‍රණ",
  "Conducted full-day interactive revision sessions covering complex Physics, Chemistry, and Geometry modules, supplemented with printed revision model booklets.": "භෞතික විද්‍යාව, රසායන විද්‍යාව සහ ජ්‍යාමිතිය සංකීර්ණ කොටස් ආවරණය කරමින් මුද්‍රිත ආදර්ශ ප්‍රශ්න පත්‍ර සහිතව පවත්වන ලද එක්දින සම්මන්ත්‍රණ මාලාව.",
  "480+ Rural Students Trained": "ග්‍රාමීය සිසුන් 480+ දෙනෙකු පුහුණු කෙරිණි",
  "View Seminar Gallery": "සම්මන්ත්‍රණ ඡායාරූප බලන්න",
  "Study Hub": "අධ්‍යාපන පියස",
  "අධ්යාපන පියස": "අධ්‍යාපන පියස",

  "Community Projects": "ප්‍රජා ව්‍යාපෘති",
  "ප්රජා ව්යාපෘති": "ප්‍රජා ව්‍යාපෘති",
  "O/L Study Hub": "සා/පෙළ අධ්‍යාපන පියස",
  "සා/පෙළ අධ්යාපන පියස": "සා/පෙළ අධ්‍යාපන පියස",
  "Practice Quizzes": "ප්‍රශ්නාවලි පුහුණුව",
  "1:5 Mentorship": "1:5 උපදේශනය",
  "Past Papers, Notes & Marking Schemes": "පසුගිය ප්‍රශ්න පත්‍ර, සටහන් සහ ලකුණු දීමේ පටිපාටි",
  "Past Papers, Notes &amp; Marking Schemes": "පසුගිය ප්‍රශ්න පත්‍ර, සටහන් සහ ලකුණු දීමේ පටිපාටි",
  "Self-Paced Topic Assessments": "ස්වයං අධ්‍යයන මාතෘකා ඇගයීම්",
  "Undergraduate Cohort Guidance": "විශ්වවිද්‍යාල ශිෂ්‍ය මගපෙන්වීම",
  "Support a Cause": "ආධාර කරන්න",
  "Thank You for Supporting Our Students!": "අපගේ සිසුන්ට උපකාර කිරීම පිළිබඳව ඔබට ස්තූතියි!",
  "Faculty Validity & Dean's Endorsement": "පීඨ වලංගුභාවය සහ පීඨාධිපතිතුමාගේ සහතිකය",
  "Faculty Validity &amp; Dean's Endorsement": "පීඨ වලංගුභාවය සහ පීඨාධිපතිතුමාගේ සහතිකය",

  "Home": "මුල් පිටුව",
  "About": "අප ගැන",
  "Projects": "ව්‍යාපෘති",
  "Learning Resources": "ඉගෙනුම් සම්පත්",
  "Quizzes": "ප්‍රශ්නාවලි",
  "Mentorship": "උපදේශනය",
  "Help Desk": "උපකාරක කවුළුව",
  "Navigation": "සංචලනය",
  "Programme": "වැඩසටහන",
  "Contact": "සම්බන්ධ වන්න",
  "Staff & Coordinator Portal": "කාර්ය මණ්ඩල සහ සම්බන්ධීකාරක පිවිසුම",
  "Faculty of Science • University of Ruhuna": "විද්‍යා පීඨ ශිෂ්‍ය සංගමය • රුහුණ විශ්වවිද්‍යාලය",
  "Students' Union • University of Ruhuna": "විද්‍යා පීඨ ශිෂ්‍ය සංගමය • රුහුණ විශ්වවිද්‍යාලය",
  "Official Programme Identity": "නිල වැඩසටහන් අනන්‍යතාව",
  "විද්‍යා පීඨ ශිෂ්‍ය සංගමය": "විද්‍යා පීඨ ශිෂ්‍ය සංගමය",
  "Educational Outreach Initiative for G.C.E. O/L": "අ.පො.ස. සා/පෙළ අධ්‍යාපනික සත්කාරය",
  "Target Exam Batch": "ඉලක්කගත විභාග කණ්ඩායම",
  "Mentor-to-Student Ratio": "උපදේශක-ශිෂ්‍ය අනුපාතය",
  "Supporting Sri Lankan O/L Students in Science & Mathematics": "සා/පෙළ සිසුන් වෙනුවෙන් විද්‍යාව හා ගණිතය අධ්‍යාපනික සත්කාරය",
  "Supporting Sri Lankan O/L Students in Science &amp; Mathematics": "සා/පෙළ සිසුන් වෙනුවෙන් විද්‍යාව හා ගණිතය අධ්‍යාපනික සත්කාරය",
  "මංසල අධ්‍යාපනික සත්කාරය": "මංසල අධ්‍යාපනික සත්කාරය",
  "A community-driven educational outreach initiative by undergraduate volunteers of the University of Ruhuna. Providing syllabus-aligned study materials, topic-based practice quizzes, and structured 1:5 mentorship to help G.C.E. Ordinary Level candidates excel.": "රුහුණ විශ්වවිද්‍යාලයේ විද්‍යා පීඨ ශිෂ්‍ය ස්වේච්ඡා කණ්ඩායම විසින් මෙහෙයවන ප්‍රජා අධ්‍යාපනික සත්කාරයකි. අ.පො.ස. සාමාන්‍ය පෙළ සිසුන් සඳහා විෂය නිර්දේශයට අනුකූල ඉගෙනුම් ද්‍රව්‍ය, ප්‍රශ්නාවලි සහ 1:5 උපදේශනය ලබා දේ.",
  "Explore Learning Resources": "ඉගෙනුම් සම්පත් ගවේෂණය කරන්න",
  "Practise a Quiz": "ප්‍රශ්නාවලියක් පුහුණු වන්න",
  "100% Free Educational Access": "100% නොමිලේ අධ්‍යාපනික ප්‍රවේශය",
  "100% Free:": "100% නොමිලේ:",
  "Science & Mathematics Core Focus": "විද්‍යාව හා ගණිතය මූලික අවධානය",
  "Science &amp; Mathematics Core Focus": "විද්‍යාව හා ගණිතය මූලික අවධානය",
  "1 : 5 University Undergrad Mentorship": "1 : 5 විශ්වවිද්‍යාල උපදේශක අනුපාතය",
  "About the Programme": "වැඩසටහන පිළිබඳව",
  "Community-Driven Educational Outreach": "ප්‍රජා මූලික අධ්‍යාපනික සත්කාරය",
  "Our Key Support Areas": "අපගේ ප්‍රධාන සහයෝගීතා අංශ",
  "How We Support Your Learning": "අප ඔබේ ඉගෙනුමට සහය වන්නේ කෙසේද",
  "Three integrated educational pillars built to prepare G.C.E. Ordinary Level candidates for examination success.": "අ.පො.ස. සාමාන්‍ය පෙළ විභාග ජයග්‍රහණය උදෙසා ගොඩනැගූ ඒකාබද්ධ අධ්‍යාපනික කුලුනු ත්‍රිත්වය.",
  "Free Learning Resources": "නොමිලේ ඉගෙනුම් සම්පත්",
  "Syllabus-aligned revision materials and paper collections compiled for direct exam practice.": "විභාග පුහුණුව සඳහා සම්පාදනය කළ විෂය නිර්දේශානුකූල පුනරීක්ෂණ ද්‍රව්‍ය හා ප්‍රශ්න පත්‍ර එකතුව.",
  "O/L Science and Mathematics past papers.": "සා/පෙළ විද්‍යාව හා ගණිතය පසුගිය විභාග ප්‍රශ්න පත්‍ර.",
  "Model papers, notes, and marking schemes.": "ආදර්ශ ප්‍රශ්න පත්‍ර, කෙටි සටහන් සහ ලකුණු දීමේ පටිපාටි.",
  "Organised learning materials.": "විධිමත්ව පෙළගැස්වූ ඉගෙනුම් ද්‍රව්‍ය.",
  "1:5 Student Mentorship": "1:5 ශිෂ්‍ය උපදේශනය",
  "Focused small-group academic guidance connecting undergraduates with O/L candidates.": "විශ්වවිද්‍යාල සිසුන් සා/පෙළ අපේක්ෂකයන් හා සම්බන්ධ කරන කුඩා කණ්ඩායම් අධ්‍යයන මගපෙන්වීම.",
  "University undergraduate mentors.": "විශ්වවිද්‍යාල උපාධි අපේක්ෂක උපදේශකවරුන්.",
  "One mentor supports five O/L students.": "එක් උපදේශකයෙකු සිසුන් පස්දෙනෙකුට මගපෙන්වයි.",
  "Personalised academic guidance.": "පුද්ගලාරෝපිත අධ්‍යයන උපදේශනය.",
  "Interactive Assessments": "අන්තර්ක්‍රියාකාරී ඇගයීම්",
  "Self-paced diagnostic quizzes that highlight knowledge gaps and measure revision progress.": "දැනුම මැන බැලීමට සහ පුනරීක්ෂණ ප්‍රගතිය තහවුරු කරගැනීමට ස්වයං-වේගී ප්‍රශ්නාවලි.",
  "Subject-based quizzes.": "විෂයානුබද්ධ පුහුණු ප්‍රශ්නාවලි.",
  "Topic-specific practice.": "ඒකක මට්ටමේ ප්‍රායෝගික අභ්‍යාස.",
  "Targeted Syllabus Coverage for O/L Success": "සා/පෙළ ජයග්‍රහණයට ඉලක්කගත විෂය නිර්දේශ ආවරණය",
  "Targeted Syllabus Coverage for O\\/L Success": "සා/පෙළ ජයග්‍රහණයට ඉලක්කගත විෂය නිර්දේශ ආවරණය",
  "Discover Our Initiative": "අපගේ වැඩසටහන ගවේෂණය කරන්න",
  "View Curated Resources": "සම්පාදිත සම්පත් නරඹන්න",
  "Explore Resources": "සම්පත් ගවේෂණය කරන්න",
  "Explore Mentorship": "උපදේශනය ගවේෂණය කරන්න",
  "Practise Now": "දැන්ම පුහුණු වන්න",
  "Get in Touch": "අප හා සම්බන්ධ වන්න",
  "Learn More About මංසල": "මංසල ගැන වැඩිදුර දැනගන්න",
  "Learn More About the Model": "උපදේශන ආකෘතිය ගැන වැඩිදුර දැනගන්න",
  "Browse All Resources": "සියලු සම්පත් නරඹන්න",
  "Browse Resources": "සම්පත් නරඹන්න",
  "Curated Study Dossiers": "සම්පාදිත අධ්‍යයන ලේඛන",
  "Test Your Knowledge": "ඔබේ දැනුම පරීක්ෂා කරගන්න",
  "The 1 : 5 Mentorship Programme": "1 : 5 සුවිශේෂී උපදේශන වැඩසටහන",
  "Ready to Start Learning?": "අධ්‍යාපනය අරඹන්න ඔබ සූදානම්ද?",
  "Access free revision materials, test your understanding through interactive quizzes, or connect with university mentors to support your journey towards O/L success.": "නොමිලේ පුනරීක්ෂණ ද්‍රව්‍ය ලබාගන්න, අන්තර්ක්‍රියාකාරී ප්‍රශ්නාවලි මඟින් දැනුම පරීක්ෂා කරගන්න, නැතහොත් සා/පෙළ ජයග්‍රහණය උදෙසා විශ්වවිද්‍යාල උපදේශකයන් හා සම්බන්ධ වන්න.",
  "Start Practising Quizzes": "ප්‍රශ්නාවලි පුහුණුව අරඹන්න",
  "About මංසල": "මංසල පිළිබඳව",
  "Complete institutional background, academic vision, strategic objectives, and volunteer framework of the University of Ruhuna educational outreach initiative.": "රුහුණ විශ්වවිද්‍යාලයීය අධ්‍යාපනික සත්කාරයේ ආයතනික පසුබිම, දැක්ම, උපායමාර්ගික අරමුණු සහ ස්වේච්ඡා ව්‍යුහය.",
  "Institutional background, humanitarian outreach vision, academic mission, and volunteer fieldwork framework of the flagship student movement at the University of Ruhuna.": "රුහුණ විශ්වවිද්‍යාලයීය ප්‍රමුඛ ශිෂ්‍ය ව්‍යාපාරයේ ආයතනික පසුබිම, මානුෂීය ප්‍රජා සත්කාරක දැක්ම, අධ්‍යාපනික මෙහෙවර සහ ස්වේච්ඡා ක්ෂේත්‍ර ක්‍රියාකාරී ව්‍යුහය.",
  "Programme Introduction": "වැඩසටහන් හැඳින්වීම",
  "Background & Purpose": "පසුබිම සහ අරමුණ",
  "Background &amp; Purpose": "පසුබිම සහ අරමුණ",
  "Our Vision": "අපගේ දැක්ම",
  "Our Mission": "අපගේ මෙහෙවර",
  "Key Objectives": "ප්‍රධාන අරමුණු",
  "Intended Beneficiaries": "ප්‍රතිලාභ ලබන පාර්ශ්ව",
  "Science & Mathematics Support": "විද්‍යාව හා ගණිතය සහයෝගය",
  "Science &amp; Mathematics Support": "විද්‍යාව හා ගණිතය සහයෝගය",
  "University Student Volunteers": "විශ්වවිද්‍යාල ශිෂ්‍ය ස්වේච්ඡා සේවය",
  "Official Documentation": "නිල ලේඛන හා ප්‍රකාශන",
  "Start Learning with මංසල Today": "අදම මංසල සමඟ අධ්‍යයනය අරඹන්න",
  "Official Endorsement & Constitution": "නිල අනුමැතිය සහ ව්‍යවස්ථාව",
  "Code of Conduct for Mentors": "උපදේශක ආචාර ධර්ම පද්ධතිය",
  "Academic Review & Syllabus Mapping": "විෂය නිර්දේශ විශ්ලේෂණය සහ සැලැස්ම",
  "Download PDF": "PDF බාගත කරන්න",
  "Verified Document": "තහවුරු කළ නිල ලේඛනය",
  "Browse educational materials for O/L Science and Mathematics — past papers, model papers, notes, and revision guides.": "සා/පෙළ විද්‍යාව හා ගණිතය විෂයයන් සඳහා පසුගිය ප්‍රශ්න පත්‍ර, ආදර්ශ ප්‍රශ්න පත්‍ර, කෙටි සටහන් සහ පුනරීක්ෂණ මාර්ගෝපදේශ.",
  "Search by topic, paper title, or keyword...": "මාතෘකාව හෝ ප්‍රශ්න පත්‍රය අනුව සොයන්න...",
  "Available Learning Resources": "පවතින ඉගෙනුම් සම්පත්",
  "All Subjects": "සියලු විෂයයන්",
  "Science": "විද්‍යාව",
  "Mathematics": "ගණිතය",
  "All Types": "සියලු වර්ග",
  "Past Papers": "පසුගිය ප්‍රශ්න පත්‍ර",
  "Model Papers": "ආදර්ශ ප්‍රශ්න පත්‍ර",
  "Short Notes": "කෙටි සටහන්",
  "Revision Guides": "පුනරීක්ෂණ මාර්ගෝපදේශ",
  "All Years": "සියලු වර්ෂ",
  "Filters": "පෙරහන්",
  "Clear All": "සියල්ල ඉවත් කරන්න",
  "Sort by: Newest": "වර්ගීකරණය: අලුත්ම",
  "Sort by: Oldest": "වර්ගීකරණය: පැරණිතම",
  "Sort by: Title (A-Z)": "මාතෘකාව (A-Z)",
  "Sort by: Title (Z-A)": "මාතෘකාව (Z-A)",
  "Download Paper": "ප්‍රශ්න පත්‍රය බාගත කරන්න",
  "Download Resource": "සම්පත බාගත කරන්න",
  "Download Material": "ද්‍රව්‍ය බාගත කරන්න",
  "Marking Scheme": "ලකුණු දීමේ පටිපාටිය",
  "View Resource": "සම්පත නරඹන්න",
  "Close Filters": "පෙරහන් වසන්න",
  "Reset": "යළි පිහිටුවන්න",
  "Active Filters:": "සක්‍රිය පෙරහන්:",
  "Clear Filters": "පෙරහන් ඉවත් කරන්න",
  "No resources found": "කිසිදු ඉගෙනුම් සම්පතක් හමු නොවීය",
  "Try adjusting your search query or removing active filters.": "ඔබගේ සෙවුම් වචන වෙනස් කර හෝ පෙරහන් ඉවත් කර නැවත උත්සාහ කරන්න.",
  "Practice Quizzes": "පුහුණු ප්‍රශ්නාවලි",
  "Test your knowledge in Science and Mathematics with interactive practice quizzes.": "අන්තර්ක්‍රියාකාරී පුහුණු ප්‍රශ්නාවලි මඟින් විද්‍යාව හා ගණිතය දැනුම පරීක්ෂා කරගන්න.",
  "All Quizzes": "සියලු ප්‍රශ්නාවලි",
  "Available Practice Quizzes": "පවතින පුහුණු ප්‍රශ්නාවලි",
  "Active Quiz": "ක්‍රියාකාරී ප්‍රශ්නාවලිය",
  "Quiz Results": "ප්‍රශ්නාවලි ප්‍රතිඵල",
  "Start Quiz": "ප්‍රශ්නාවලිය අරඹන්න",
  "Question": "ප්‍රශ්නය",
  "Next Question": "ඊළඟ ප්‍රශ්නය",
  "Previous Question": "පෙර ප්‍රශ්නය",
  "Submit Quiz": "ප්‍රශ්නාවලිය අවසන් කරන්න",
  "Review Answers": "පිළිතුරු සමාලෝචනය",
  "Retake Quiz": "නැවත උත්සාහ කරන්න",
  "Choose Another Quiz": "වෙනත් ප්‍රශ්නාවලියක් තෝරන්න",
  "Your Score": "ඔබේ ලකුණු මට්ටම",
  "Passing Score": "සමත් ලකුණු මට්ටම",
  "Time Taken": "ගතවූ කාලය",
  "Correct Answers": "නිවැරදි පිළිතුරු",
  "Incorrect Answers": "වැරදි පිළිතුරු",
  "Explanation:": "පැහැදිලි කිරීම:",
  "Difficulty:": "අපහසුතා මට්ටම:",
  "Medium": "මධ්‍යම",
  "Hard": "උසස්",
  "Easy": "සරල",
  "10 Questions": "ප්‍රශ්න 10 ක්",
  "5 Questions": "ප්‍රශ්න 5 ක්",
  "15 Mins": "විනාඩි 15",
  "10 Mins": "විනාඩි 10",
  "Pass: 70%": "සමත්: 70%",
  "Mentorship Programme": "උපදේශන වැඩසටහන",
  "Connecting Sri Lankan Ordinary Level students with dedicated university science undergraduates for structured academic guidance and exam confidence.": "අ.පො.ස. සාමාන්‍ය පෙළ සිසුන් රුහුණ විශ්වවිද්‍යාලයේ විද්‍යා පීඨ ශිෂ්‍ය උපදේශකයන් සමඟ සම්බන්ධ කරමින් අධ්‍යයන මගපෙන්වීම ලබා දේ.",
  "About the Mentorship Programme": "උපදේශන වැඩසටහන පිළිබඳව",
  "The 1 : 5 Mentorship Model": "1 : 5 උපදේශන ආකෘතිය",
  "Three-Stage Mentorship Journey": "තෙවැදෑරුම් උපදේශන ගමන්මඟ",
  "Stage 01 • Diagnostic Foundation": "පියවර 01 • මූලික හැඳින්වීම සහ පරීක්ෂාව",
  "Stage 02 • Core Subject Mastery": "පියවර 02 • මූලික විෂය ඒකක ප්‍රගුණ කිරීම",
  "Stage 03 • Examination Readiness": "පියවර 03 • විභාග ජයග්‍රහණය සහ ආත්මවිශ්වාසය",
  "Key Deliverable:": "ප්‍රධාන ප්‍රතිඵලය:",
  "Get Involved in මංසල Manasala": "මංසල සමඟ සම්බන්ධ වන්න",
  "Whether you're an O/L student looking for guidance or a university student wanting to volunteer as a mentor, we'd love to hear from you. Reach out to learn more about how you can participate in the programme.": "ඔබ මගපෙන්වීම අපේක්ෂා කරන සා/පෙළ සිසුවෙකු වුවද, ස්වේච්ඡාවෙන් දායක වීමට කැමති විශ්වවිද්‍යාල සිසුවෙකු වුවද, අප හා සම්බන්ධ වීමට සාදරයෙන් ඇරයුම් කරමු.",
  "Contact & Enquiries": "සම්බන්ධතා සහ විමසීම්",
  "Contact &amp; Enquiries": "සම්බන්ධතා සහ විමසීම්",
  "Help Desk & Contact": "උපකාරක කවුළුව සහ විමසීම්",
  "Help Desk &amp; Contact": "උපකාරක කවුළුව සහ විමසීම්",
  "Have questions about the මංසල programme, study materials, or mentorship? We are here to support your learning journey.": "මංසල වැඩසටහන, ඉගෙනුම් ද්‍රව්‍ය හෝ උපදේශනය පිළිබඳ ගැටලු සඳහා අපේ විශ්වවිද්‍යාල සම්බන්ධීකාරක කණ්ඩායම අමතන්න.",
  "Need help or have a question? Get in touch with our team for guidance, support, and information about the programme.": "වැඩසටහන පිළිබඳ මගපෙන්වීම සහ තොරතුරු සඳහා අපගේ කණ්ඩායම හා සම්බන්ධ වන්න.",
  "We're here to help!": "අප ඔබට සහය වීමට සූදානම්!",
  "Programme Contacts": "වැඩසටහන් සම්බන්ධතා",
  "Submit an Enquiry": "විමසීමක් යොමු කරන්න",
  "Frequently Asked Questions": "නිතර අසන ප්‍රශ්න",
  "Additional Support Channels": "අමතර සහයෝගීතා මාර්ග",
  "Your Name": "ඔබේ නම",
  "Your Email Address": "ඔබේ විද්‍යුත් තැපැල් ලිපිනය",
  "Subject": "මාතෘකාව",
  "Message Category": "පණිවිඩ කාණ්ඩය",
  "Your Message": "ඔබේ පණිවිඩය",
  "Send Message": "පණිවිඩය යවන්න",
  "General Enquiry": "සාමාන්‍ය විමසීමක්",
  "Mentorship Request": "උපදේශන ඉල්ලීමක්",
  "Learning Materials": "ඉගෙනුම් ද්‍රව්‍ය පිළිබඳව",
  "Technical Support": "තාක්ෂණික ගැටලුවක්",
  "Programme Coordinator": "වැඩසටහන් සම්බන්ධීකාරක",
  "Academic Coordinator": "අධ්‍යයන සම්බන්ධීකාරක",
  "Mentorship Liaison": "උපදේශන සම්බන්ධීකාරක",
  "General Administration & Operations": "සාමාන්‍ය පරිපාලනය සහ මෙහෙයුම්",
  "Curriculum & Paper Analysis": "විෂය නිර්දේශ සහ ප්‍රශ්න පත්‍ර විශ්ලේෂණය",
  "1:5 Cohort Matching & Support": "1:5 කණ්ඩායම් සම්බන්ධීකරණය",
  "Student Engagement & Outreach": "ශිෂ්‍ය සබඳතා සහ ප්‍රජා සත්කාරය",
  "School Seminars & Outreach Projects": "පාසල් සම්මන්ත්‍රණ සහ අධ්‍යාපනික ව්‍යාපෘති",
  "School Seminars &amp; Outreach Projects": "පාසල් සම්මන්ත්‍රණ සහ අධ්‍යාපනික ව්‍යාපෘති",
  "Direct educational outreach to rural and deserving schools across Sri Lanka. Review upcoming school seminar goals, track fundraising progress with full financial transparency, and explore past project achievements.": "ශ්‍රී ලංකාව පුරා පිහිටි ග්‍රාමීය හා අවශ්‍යතා සහිත පාසල් සඳහා සෘජු අධ්‍යාපනික සත්කාරය. ඉදිරි සම්මන්ත්‍රණ ඉලක්ක, විනිවිදභාවයෙන් යුතු මූල්‍ය ප්‍රගතිය සහ පසුගිය ව්‍යාපෘති වාර්තා මෙතැනින් විමසන්න.",
  "Seminars Completed": "පැවැත්වූ සම්මන්ත්‍රණ",
  "O/L Candidates Reached": "සහභාගී වූ සා/පෙළ සිසුන්",
  "Transparent Financial Record": "විනිවිදභාවයෙන් යුතු ගිණුම්කරණය",
  "Volunteer Undergrad Mentorship": "විශ්වවිද්‍යාල උපදේශක අනුපාතය",
  "Active Outreach Campaigns": "ක්‍රියාකාරී අධ්‍යාපනික වැඩසටහන්",
  "Upcoming Seminars & Target Goals": "ඉදිරි පාසල් සම්මන්ත්‍රණ සහ අරමුදල් ඉලක්ක",
  "Upcoming Seminars &amp; Target Goals": "ඉදිරි පාසල් සම්මන්ත්‍රණ සහ අරමුදල් ඉලක්ක",
  "Support upcoming school seminars. 100% of public contributions directly fund student revision workbooks, practical kits, and volunteer transportation.": "ඉදිරි පාසල් සම්මන්ත්‍රණ සඳහා දායක වන්න. ඔබේ ආධාර මුදල් සෘජුවම සිසුන්ගේ ප්‍රශ්න පත්‍ර මුද්‍රණය සහ ප්‍රවාහන වියදම් සඳහා යොදවනු ලැබේ.",
  "Max 6 campaigns per page": "පිටුවකට උපරිම සම්මන්ත්‍රණ 6 කි",
  "Give Funds": "ආධාර කරන්න",
  "Official Faculty of Science Endorsement & Audit Oversight": "රුහුණ විශ්වවිද්‍යාලයීය විද්‍යා පීඨ නිල අනුමැතිය සහ විගණන අධීක්ෂණය",
  "Official Faculty of Science Endorsement &amp; Audit Oversight": "රුහුණ විශ්වවිද්‍යාලයීය විද්‍යා පීඨ නිල අනුමැතිය සහ විගණන අධීක්ෂණය",
  "All seminar funds and donation accounts operate under the direct authorization of the Dean's Office and the Senior Treasurer, Faculty of Science, University of Ruhuna. Every rupee is recorded and published for complete financial transparency.": "සියලුම සම්මන්ත්‍රණ අරමුදල් රුහුණ විශ්වවිද්‍යාලයේ විද්‍යා පීඨාධිපතිතුමා සහ ජ්‍යෙෂ්ඨ භාණ්ඩාගාරිකතුමාගේ සෘජු අධීක්ෂණය යටතේ ක්‍රියාත්මක වේ. සෑම රුපියලක් සඳහාම විනිවිදභාවයෙන් යුතු ගිණුම් වාර්තා ඉදිරිපත් කෙරේ.",
  "View Dean's Endorsement Letter": "පීඨාධිපතිතුමාගේ අනුමත ලිපිය",
  "Give General Outreach Donation": "පොදු අරමුදලට ආධාර කරන්න",
  "Verified Impact & Archive": "තහවුරු කළ ප්‍රතිඵල සහ ලේඛනාගාරය",
  "Verified Impact &amp; Archive": "තහවුරු කළ ප්‍රතිඵල සහ ලේඛනාගාරය",
  "Completed Seminars & Recaps": "පසුගිය පාසල් සම්මන්ත්‍රණ සමාලෝචනය",
  "Completed Seminars &amp; Recaps": "පසුගිය පාසල් සම්මන්ත්‍රණ සමාලෝචනය",
  "Explore past school seminars, undergraduate volunteer cohorts, student feedback, and photographic documentation.": "පැවැත්වූ සම්මන්ත්‍රණ, ස්වේච්ඡා කණ්ඩායම්, සිසුන්ගේ ප්‍රතිචාර සහ ඡායාරූප වාර්තා මෙතැනින් නරඹන්න.",
  "Max 6 seminars per page": "පිටුවකට උපරිම සම්මන්ත්‍රණ 6 කි",
  "Search past seminars by school, town, or district (e.g. Aloysius, Galle, Matara)...": "පාසල, නගරය හෝ දිස්ත්‍රික්කය අනුව සොයන්න (උදා: ඇලෝසියස්, ගාල්ල, මාතර)...",
  "View Recap & Photos": "වාර්තාව සහ ඡායාරූප බලන්න",
  "View Recap &amp; Photos": "වාර්තාව සහ ඡායාරූප බලන්න",
  "Direct Bank Transfer & Slip Submission": "සෘජු බැංකු තැන්පතු හා රිසිට්පත් ඉදිරිපත් කිරීම",
  "Direct Bank Transfer &amp; Slip Submission": "සෘජු බැංකු තැන්පතු හා රිසිට්පත් ඉදිරිපත් කිරීම",
  "Submit Transfer Slip": "රිසිට්පත ඉදිරිපත් කරන්න",
  "Download Report (2.4 MB PDF)": "වාර්තාව බාගත කරන්න (2.4 MB PDF)",
  "Download Official PDF Letter": "නිල PDF ලිපිය බාගත කරන්න",
  "Close": "වසන්න",
  "An educational programme organised by the Faculty of Science of the University of Ruhuna, supporting O/L students in Science and Mathematics.": "අ.පො.ස. සා/පෙළ සිසුන් වෙනුවෙන් රුහුණ විශ්වවිද්‍යාලයේ විද්‍යා පීඨය විසින් සංවිධානය කරනු ලබන අධ්‍යාපනික සත්කාරයකි.",
  "An educational programme organised by the  Faculty of Science of the University of Ruhuna, supporting O/L students in Science and Mathematics.": "අ.පො.ස. සා/පෙළ සිසුන් වෙනුවෙන් රුහුණ විශ්වවිද්‍යාලයේ විද්‍යා පීඨය විසින් සංවිධානය කරනු ලබන අධ්‍යාපනික සත්කාරයකි.",
  "Official educational outreach by the Faculty of Science, University of Ruhuna.": "රුහුණ විශ්වවිද්‍යාලයේ විද්‍යා පීඨය මඟින් මෙහෙයවන නිල අධ්‍යාපනික ප්‍රජා සත්කාරය.",
  "Official educational outreach by the  Faculty of Science, University of Ruhuna.": "රුහුණ විශ්වවිද්‍යාලයේ විද්‍යා පීඨය මඟින් මෙහෙයවන නිල අධ්‍යාපනික ප්‍රජා සත්කාරය.",
  "University of Ruhuna, Wellamadama, Matara": "රුහුණ විශ්වවිද්‍යාලය, වැල්ලමඩම, මාතර",
  "Institutional documentation, faculty authorizations, and university endorsement records for the මංසල outreach initiative.": "මංසල අධ්‍යාපනික සත්කාරය සඳහා වන ආයතනික ලියකියවිලි, පීඨ අනුමැතීන් සහ විශ්වවිද්‍යාල සහතික කිරීම් වාර්තා.",
  "Mathematics (ගණිතය)": "Mathematics (ගණිතය)",
  "Mathematics Model Paper — Algebra & Geometry": "Mathematics ආදර්ශ ප්‍රශ්න පත්‍රය — Algebra & Geometry",
  "Model Paper": "ආදර්ශ ප්‍රශ්න පත්‍රය",
  "Model Paper Practice": "ආදර්ශ ප්‍රශ්න පත්‍රය Practice",
  "No. මංසල – Mansala is a completely free programme. All learning resources, quizzes, mentorship sessions, and activities are offered at no cost to students. The programme is funded and supported by the Faculty of Science of the University of Ruhuna and its volunteer network.": "නැත. මංසල සම්පූර්ණයෙන්ම නොමිලේ ක්‍රියාත්මක වන වැඩසටහනකි. සියලුම ඉගෙනුම් සම්පත්, ප්‍රශ්නාවලි සහ උපදේශන සේවා සිසුන් වෙත ලබා දෙන්නේ කිසිදු අයකිරීමකින් තොරවය. මෙම වැඩසටහන රුහුණ විශ්වවිද්‍යාලයේ විද්‍යා පීඨය සහ ස්වේච්ඡා ශිෂ්‍ය ජාලය මඟින් පවත්වාගෙන යනු ලැබේ.",
  "Our coordinators are available to assist you with any questions about මංසල – Mansala.": "මංසල පිළිබඳ ඔබේ ඕනෑම ගැටලුවක් සඳහා සහය වීමට අපගේ විශ්වවිද්‍යාල සම්බන්ධීකාරක කණ්ඩායම සූදානමින් සිටී.",
  "Past Paper & Marking Scheme": "පසුගිය ප්‍රශ්න පත්‍රය & Marking Scheme",
  "Revision Guide": "පුනරීක්ෂණ මාර්ගෝපදේශය",
  "Science (විද්‍යාව)": "Science (විද්‍යාව)",
  "Science Model Paper — Biology & Chemistry": "Science ආදර්ශ ප්‍රශ්න පත්‍රය — Biology & Chemistry",
  "The මංසල Manasala mentorship programme connects enthusiastic university student volunteers from the University of Ruhuna with O/L students who are preparing for their Science and Mathematics examinations. By creating supportive small-group learning relationships, we aim to give every student access to guidance that goes beyond the traditional classroom environment. Mentors share not only academic knowledge but also study strategies, exam tips, and the motivation that comes from knowing someone is invested in your success.": "රුහුණ විශ්වවිද්‍යාලයේ විද්‍යා පීඨ උපාධි අපේක්ෂක ස්වේච්ඡා සිසුන්, විද්‍යාව හා ගණිතය විභාග සඳහා සූදානම් වන සා/පෙළ සිසුන් සමඟ මංසල උපදේශන වැඩසටහන මඟින් සම්බන්ධ කරයි. සම්ප්‍රදායික පන්ති කාමරයෙන් ඔබ්බට ගිය කුඩා කණ්ඩායම් අධ්‍යයන සබඳතා තුළින් සෑම සිසුවෙකුටම පෞද්ගලික අවධානය ලබාදීම අපගේ අරමුණයි. අධ්‍යයන දැනුමට අමතරව විභාග උපක්‍රම, පාඩම් සැලසුම් සහ නිරන්තර දිරිගැන්වීම උපදේශකයින් විසින් ලබාදෙයි.",
  "The මංසල resource library brings together curated study materials to support O/L students preparing for Science and Mathematics examinations. Resources are organised by subject, material type, and year so you can quickly find what you need for syllabus revision and examination practice.": "<strong>මංසල</strong> සම්පත් එකතුව සා/පෙළ විද්‍යාව සහ ගණිතය විභාග සඳහා සූදානම් වන සිසුන්ට අවශ්‍ය සියලුම අධ්‍යයන ද්‍රව්‍ය එක්රැස් කර ඇත. විෂය නිර්දේශ පුනරීක්ෂණය සහ විභාග පුහුණුව සඳහා අවශ්‍ය දෑ පහසුවෙන් සොයාගත හැකි වන පරිදි සම්පත් විෂයය, වර්ගය සහ වසර අනුව වර්ගීකරණය කර ඇත.",
  "What is මංසල – Mansala?": "මංසල යනු කුමක්ද?",
  "© මංසල – Mansala. Faculty of Science, University of Ruhuna.": "© මංසල – Mansala. Faculty of Science, University of Ruhuna.",
  "© මංසල – Mansala. Students' Union, University of Ruhuna.": "© මංසල – Mansala. Students' Union, University of Ruhuna.",
  "ගණිතය": "ගණිතය",
  "මංසල": "මංසල",
  "මංසල is a community-driven educational outreach initiative by undergraduate volunteers of the University of Ruhuna Faculty of Science. The programme aims to make O/L Science and Mathematics education more accessible through free learning resources, interactive assessments, and a structured mentorship programme.": "මංසල යනු රුහුණ විශ්වවිද්‍යාලයේ විද්‍යා පීඨ ශිෂ්‍ය ස්වේච්ඡා කණ්ඩායම විසින් මෙහෙයවන ප්‍රජා මූලික අධ්‍යාපනික සත්කාරයකි. නොමිලේ ඉගෙනුම් ද්‍රව්‍ය, අන්තර්ක්‍රියාකාරී ප්‍රශ්නාවලි සහ විධිමත් 1:5 උපදේශනය හරහා සා/පෙළ විද්‍යාව හා ගණිතය අධ්‍යාපනය වඩාත් සමීප කරවීම අපගේ මූලික අරමුණයි.",
  "මංසල – Mansala": "මංසල",
  "මංසල – Mansala is an educational outreach programme organised by the Faculty of Science of the University of Ruhuna. It is designed to support Ordinary Level (O/L) students in Sri Lanka by providing free learning resources, practice quizzes, and mentorship in Science and Mathematics. The programme is run entirely by volunteer university students committed to helping the next generation succeed.": "මංසල – Mansala is an educational outreach programme organised by the Faculty of Science of the University of Ruhuna. It is designed to support Ordinary Level (O/L) students in Sri Lanka by providing free learning resources, practice quizzes, and mentorship in Science and Mathematics. The programme is run entirely by volunteer university students committed to helping the next generation succeed.",
  "විද්‍යාව": "විද්‍යාව",
  "සිං": "සිං",
  "A structured progression taking students from diagnostic assessment to examination mastery.": "මූලික රෝග විනිශ්චය ඇගයීමේ සිට විභාග ප්‍රවීණතාව දක්වා සිසුන් මෙහෙයවන විධිමත් පියවර ත්‍රිත්වය.",
  "Access free syllabus-aligned study materials, test your skills with practice quizzes, or discover how our 1:5 mentorship programme guides O/L candidates.": "නොමිලේ විෂය නිර්දේශානුකූල ඉගෙනුම් ද්‍රව්‍ය ලබාගන්න, පුහුණු ප්‍රශ්නාවලි මඟින් ඔබේ දැනුම මැනගන්න, නැතහොත් 1:5 උපදේශන වැඩසටහන සමඟ සම්බන්ධ වන්න.",
  "Accuracy": "නිරවද්‍යතාව",
  "Acids & Bases": "අම්ල සහ භෂ්ම",
  "Action Plan": "ක්‍රියාකාරී සැලැස්ම",
  "All": "සියල්ල",
  "Back to Results": "නැවත ප්‍රතිඵල වෙත",
  "Beyond the Help Desk, you can connect with us through our community channels.": "උපකාරක කවුළුවට අමතරව, අපගේ සමාජ මාධ්‍ය සහ ප්‍රජා සන්නිවේදන මාර්ග ඔස්සේද අප හා සම්බන්ධ විය හැකිය.",
  "Biology": "ජීව විද්‍යාව",
  "Bridge Educational Gaps": "අධ්‍යාපනික විෂමතා දුරලීම",
  "Brief summary of your enquiry": "ඔබගේ විමසීම පිළිබඳ කෙටි සාරාංශයක්",
  "Browse All Quizzes": "සියලු ප්‍රශ්නාවලි නරඹන්න",
  "Build and maintain the programme's digital presence, design materials, and create visual resources that enhance the learning experience.": "වැඩසටහනේ ඩිජිටල් ප්‍රවේශය ගොඩනැගීම, ඉගෙනුම් ද්‍රව්‍ය නිර්මාණය කිරීම සහ අධ්‍යයන අත්දැකීම වැඩිදියුණු කරන දෘශ්‍ය සම්පත් සැකසීම.",
  "Calculate mechanical work, kinetic energy, gravitational potential energy, and understand power output.": "යාන්ත්‍රික කාර්යය, චාලක ශක්තිය, ගුරුත්වාකර්ෂණ විභව ශක්තිය සහ ක්ෂමතාව ගණනය කිරීම පුහුණු වන්න.",
  "Cancel": "අවලංගු කරන්න",
  "Category": "කාණ්ඩය",
  "Cell Biology & Human Body": "සෛල ජීව විද්‍යාව සහ මිනිස් සිරුර",
  "Challenging": "අභියෝගාත්මක",
  "Chapter-by-chapter study notes and revision summaries.": "පාඩමෙන් පාඩමට සැකසූ කෙටි සටහන් සහ පුනරීක්ෂණ සාරාංශ.",
  "Charter Affirmed": "ප්‍රඥප්තිය තහවුරු කර ඇත",
  "Chemistry": "රසායන විද්‍යාව",
  "Clear": "පැහැදිලි කරන්න",
  "Clear search": "සෙවුම ඉවත් කරන්න",
  "Close Modal": "කවුළුව වසන්න",
  "Co-Curricular Support": "විෂය සමගාමී සහයෝගය",
  "Coordinator Login": "සම්බන්ධීකාරක පිවිසුම",
  "Core Objectives": "මූලික අරමුණු",
  "Core Topics Covered": "ආවරණය වන ප්‍රධාන ඒකක",
  "Direct Guidance": "සෘජු මගපෙන්වීම",
  "Download": "බාගත කරන්න",
  "Download Guide": "මාර්ගෝපදේශය බාගත කරන්න",
  "Download Notes": "සටහන් බාගත කරන්න",
  "Download PDF Document": "PDF ලේඛනය බාගත කරන්න",
  "Each student receives personal attention tailored to their learning pace and needs.": "සෑම සිසුවෙකුටම ඔවුන්ගේ ඉගෙනුම් වේගයට සහ අවශ්‍යතාවන්ට ගැළපෙන පරිදි පෞද්ගලික අවධානය හිමිවේ.",
  "Educational equity is at the heart of our mission.": "අධ්‍යාපනික සමානාත්මතාව අපගේ මෙහෙවරෙහි හදවත බඳුය.",
  "Electricity & Magnetism": "විද්‍යුතය සහ චුම්භකත්වය",
  "Email": "විද්‍යුත් තැපෑල",
  "Enquiry Form": "විමසීම් පෝරමය",
  "Exam Practice": "විභාග පුහුණුව",
  "Exam Preparation": "විභාග පෙර සූදානම",
  "Explore": "ගවේෂණය කරන්න",
  "Full Name": "සම්පූර්ණ නම",
  "Grade 10 Science": "10 ශ්‍රේණිය විද්‍යාව",
  "Grade 11 Science": "11 ශ්‍රේණිය විද්‍යාව",
  "Grade 10 Mathematics": "10 ශ්‍රේණිය ගණිතය",
  "Grade 11 Mathematics": "11 ශ්‍රේණිය ගණිතය",
  "Guidance & Mentorship": "මගපෙන්වීම සහ උපදේශනය",
  "Help Desk & Student Enquiries": "උපකාරක කවුළුව සහ ශිෂ්‍ය විමසීම්",
  "How It Works": "මෙය ක්‍රියාත්මක වන ආකාරය",
  "Interactive Learning": "අන්තර්ක්‍රියාකාරී ඉගෙනුම",
  "Learn More": "වැඩිදුර දැනගන්න",
  "Leave a Message": "පණිවිඩයක් තබන්න",
  "Level": "මට්ටම",
  "Mathematics Practice": "ගණිත අභ්‍යාස",
  "Message": "පණිවිඩය",
  "Model Question Papers": "ආදර්ශ ප්‍රශ්න පත්‍ර",
  "Name": "නම",
  "Next": "ඊළඟ",
  "No": "නැත",
  "Notes": "සටහන්",
  "Office Hours": "කාර්යාල වේලාවන්",
  "Online Mentoring": "මාර්ගගත උපදේශනය",
  "Open Menu": "මෙනුව විවෘත කරන්න",
  "Our Commitment": "අපගේ කැපවීම",
  "Our Story": "අපගේ කතාව",
  "Our Team": "අපගේ කණ්ඩායම",
  "Past Exam Papers": "පසුගිය විභාග ප්‍රශ්න පත්‍ර",
  "Phone": "දුරකථනය",
  "Physics": "භෞතික විද්‍යාව",
  "Practice Questions": "පුහුණු ප්‍රශ්න",
  "Previous": "පෙර",
  "Programme Overview": "වැඩසටහන් දළ විශ්ලේෂණය",
  "Questions & Answers": "ප්‍රශ්න සහ පිළිතුරු",
  "Quick Links": "ක්ෂණික සබැඳි",
  "Read More": "වැඩිදුර කියවන්න",
  "Register as a Mentor": "උපදේශකයෙකු ලෙස ලියාපදිංචි වන්න",
  "Resources Available": "ලබාගත හැකි සම්පත්",
  "Search": "සොයන්න",
  "Search Resources": "සම්පත් සොයන්න",
  "Select": "තෝරන්න",
  "Select a Category": "කාණ්ඩයක් තෝරන්න",
  "Select Subject": "විෂය තෝරන්න",
  "Send Enquiry": "විමසීම යොමු කරන්න",
  "Sign In": "ඇතුල් වන්න",
  "Social Responsibility": "සමාජ වගකීම",
  "Student Support": "ශිෂ්‍ය සහයෝගය",
  "Submit": "ඉදිරිපත් කරන්න",
  "Target Audience": "ඉලක්කගත ප්‍රජාව",
  "Total Questions": "මුළු ප්‍රශ්න සංඛ්‍යාව",
  "Undergraduate Volunteers": "උපාධි අපේක්ෂක ස්වේච්ඡා කණ්ඩායම",
  "University of Ruhuna": "රුහුණ විශ්වවිද්‍යාලය",
  "View Details": "විස්තර බලන්න",
  "View Results": "ප්‍රතිඵල බලන්න",
  "Volunteer With Us": "අප හා ස්වේච්ඡාවෙන් එක්වන්න",
  "Weekly Sessions": "සතිපතා සැසිවාර",
  "Yes": "ඔව්",
  "මංසල is a community-driven educational outreach initiative by undergraduate volunteers of the University of Ruhuna  Faculty of Science. The programme aims to make O/L Science and Mathematics education more accessible through free learning resources, interactive assessments, and a structured mentorship programme.": "මංසල යනු රුහුණ විශ්වවිද්‍යාලයේ විද්‍යා පීඨ ශිෂ්‍ය ස්වේච්ඡා කණ්ඩායම විසින් මෙහෙයවන ප්‍රජා මූලික අධ්‍යාපනික සත්කාරයකි. නොමිලේ ඉගෙනුම් ද්‍රව්‍ය, අන්තර්ක්‍රියාකාරී ප්‍රශ්නාවලි සහ විධිමත් 1:5 උපදේශනය හරහා සා/පෙළ විද්‍යාව හා ගණිතය අධ්‍යාපනය වඩාත් සමීප කරවීම අපගේ මූලික අරමුණයි.",
  "To ensure that every Sri Lankan student preparing for the G.C.E. Ordinary Level examination has free, equitable access to high-quality educational materials, expert academic guidance, and peer mentorship — regardless of socio-economic background or geographical location.": "සමාජ-ආර්ථික හෝ භූගෝලීය බාධාවන්ගෙන් තොරව, අ.පො.ස. සාමාන්‍ය පෙළ විභාගයට පෙනී සිටින සෑම ශ්‍රී ලාංකේය සිසුවෙකුටම උසස් තත්ත්වයේ ඉගෙනුම් ද්‍රව්‍ය, විෂයානුබද්ධ මගපෙන්වීම සහ ශිෂ්‍ය උපදේශනය නොමිලේ හා සමානාත්මතාවයෙන් යුතුව ලබාදීම අපගේ දැක්මයි.",
  "To mobilise the academic expertise, enthusiasm, and lived examination experience of University of Ruhuna science undergraduates in providing structured revision programmes, diagnostic assessments, and compassionate small-group mentorship for O/L candidates across the island.": "රුහුණ විශ්වවිද්‍යාලයීය විද්‍යා පීඨ සිසුන්ගේ දැනුම, උද්‍යෝගය සහ විභාග අත්දැකීම් උපයෝගී කරගනිමින්, දිවයින පුරා විසිරී සිටින සා/පෙළ සිසුන් වෙනුවෙන් විධිමත් පුනරීක්ෂණ, ප්‍රශ්නාවලි හා කාරුණික කුඩා කණ්ඩායම් උපදේශනයක් සැපයීම අපගේ මෙහෙවරයි.",
  "Provide Free, Syllabus-Aligned Educational Materials": "විෂය නිර්දේශානුකූල අධ්‍යාපනික ද්‍රව්‍ය නොමිලේ ලබා දීම",
  "Facilitate 1:5 Small-Group Peer Mentorship": "1:5 කුඩා කණ්ඩායම් ශිෂ්‍ය උපදේශනය ක්‍රියාත්මක කිරීම",
  "Develop Diagnostic Assessments & Quizzes": "ස්වයං ඇගයීම් සහ පුහුණු ප්‍රශ්නාවලි නිර්මාණය කිරීම",
  "Demystify Challenging STEM Concepts": "විද්‍යාව හා ගණිතයේ සංකීර්ණ සංකල්ප සරලව පැහැදිලි කිරීම",
  "Foster Academic Confidence & Examination Readiness": "අධ්‍යයන ආත්මවිශ්වාසය සහ විභාග සූදානම ගොඩනැගීම",
  "Outreach Volunteers": "ප්‍රජා සත්කාරක ස්වේච්ඡා කණ්ඩායම",
  "Diagram-rich explanations of complex scientific concepts.": "රූප සටහන් සහිතව සංකීර්ණ විද්‍යාත්මක සංකල්ප පැහැදිලි කිරීම.",
  "Personalised study schedules and proven time-management techniques for exam day.": "විභාග දිනය සඳහා පෞද්ගලික අධ්‍යයන කාලසටහන් සහ ඔප්පු කරන ලද කාල කළමනාකරණ ක්‍රමවේද.",
  "Provide small-group 1:5 academic guidance to O/L students, helping them understand difficult concepts and build exam confidence.": "සා/පෙළ සිසුන් වෙනුවෙන් 1:5 කුඩා කණ්ඩායම් අධ්‍යයන මගපෙන්වීමක් සපයමින්, අසීරු සංකල්ප අවබෝධ කරගැනීමට හා විභාග ආත්මවිශ්වාසය ගොඩනැගීමට සහය වීම.",
  "University Mentor (University of Ruhuna)": "විශ්වවිද්‍යාල උපදේශක (රුහුණ විශ්වවිද්‍යාලය)",
  "Ready to Start Learning? Explore free learning resources, challenge yourself with interactive quizzes, or connect with university mentors to support your O/L journey.": "අධ්‍යාපනය අරඹන්න ඔබ සූදානම්ද? නොමිලේ ඉගෙනුම් ද්‍රව්‍ය ලබාගන්න, අන්තර්ක්‍රියාකාරී ප්‍රශ්නාවලි මඟින් දැනුම පරීක්ෂා කරගන්න, නැතහොත් විශ්වවිද්‍යාල උපදේශකයන් හා සම්බන්ධ වන්න.",
  "10 multiple-choice questions": "බහුවරණ ප්‍රශ්න 10 ක්",
  "Academic Coordinator Curriculum & Paper Analysis": "අධ්‍යයන සම්බන්ධීකාරක — විෂය නිර්දේශ සහ ප්‍රශ්න පත්‍ර විශ්ලේෂණය",
  "Academic Coordinator Curriculum &amp; Paper Analysis": "අධ්‍යයන සම්බන්ධීකාරක — විෂය නිර්දේශ සහ ප්‍රශ්න පත්‍ර විශ්ලේෂණය",
  "100% Free: No charges, fees, or hidden conditions for any participant.": "100% නොමිලේ: කිසිදු අය කිරීමක් හෝ සැඟවුණු කොන්දේසි නොමැත.",
  "Find answers to common questions about the programme, resources, and participation.": "වැඩසටහන, ඉගෙනුම් සම්පත් සහ සහභාගීත්වය පිළිබඳ නිතර අසන ප්‍රශ්න සඳහා පිළිතුරු සොයන්න.",
  "Quiz Designers": "ප්‍රශ්නාවලි නිර්මාණකරුවන්",
  "Develop study notes, revision guides, worked examples, and practice questions aligned with the O/L Science and Mathematics syllabus.": "සා/පෙළ විද්‍යාව හා ගණිතය විෂය නිර්දේශයට ගැළපෙන කෙටි සටහන්, පුනරීක්ෂණ මාර්ගෝපදේශ සහ ප්‍රායෝගික ප්‍රශ්න සම්පාදනය කිරීම.",
  "Our volunteer mentors sat these exact national examinations. They know where marks are typically lost, how marking schemes award method marks, and which presentation techniques elevate a student's final grade.": "අපගේ ස්වේච්ඡා උපදේශකවරුන් මෙම ජාතික විභාගයම විශිෂ්ට ලෙස සමත් වූවන්ය. ලකුණු අහිමි වන ස්ථාන, ලකුණු දීමේ පටිපාටිය සහ විභාග ශ්‍රේණිය ඉහළ නංවන පිළිතුරු ලිවීමේ ශිල්පක්‍රම ඔවුහු මැනවින් දනිති.",
  "Faculty of Science Undergraduates": "විද්‍යා පීඨ උපාධි අපේක්ෂකයන්",
  "Our volunteer coordination team reviews enquiries daily and will respond via email.": "අපගේ ස්වේච්ඡා සම්බන්ධීකාරක කණ්ඩායම දිනපතා විමසීම් පරීක්ෂා කර විද්‍යුත් තැපෑල ඔස්සේ ප්‍රතිචාර දක්වයි.",
  "Subject-specific guidance targeting difficult concepts in O/L Science and Mathematics.": "සා/පෙළ විද්‍යාව හා ගණිතයේ අසීරු ඒකක ඉලක්ක කරගත් විෂයානුබද්ධ මගපෙන්වීම.",
  "Students and parents can also follow the programme and reach out for support through our community channels.": "සිසුන්ට සහ දෙමාපියන්ට අපගේ ප්‍රජා සන්නිවේදන මාර්ග ඔස්සේද වැඩසටහන පිළිබඳ තොරතුරු ලබාගත හැකිය.",
  "Guides small group of 5 candidates • Diagnoses syllabus gaps • Analyzes marking schemes • Tracks progress": "සිසුන් 5 දෙනෙකුගේ කණ්ඩායමකට මගපෙන්වීම • අඩුපාඩු හඳුනාගැනීම • ලකුණු දීමේ පටිපාටි විශ්ලේෂණය • ප්‍රගතිය පරීක්ෂා කිරීම",
  "Documents": "ලේඛන",
  "The learning resources on this platform are created for students preparing for the G.C.E. Ordinary Level examination in Sri Lanka.": "මෙම වෙබ් අඩවියේ ඇති ඉගෙනුම් සම්පත් ශ්‍රී ලංකාවේ අ.පො.ස. සාමාන්‍ය පෙළ විභාගයට සූදානම් වන සිසුන් සඳහා විශේෂයෙන් සම්පාදනය කර ඇත.",
  "Create interactive quizzes and assessments that test understanding, reinforce learning, and give students immediate feedback on their progress.": "දැනුම පරීක්ෂා කරන, ඉගෙනුම තහවුරු කරන සහ සිසුන්ට ක්ෂණික ප්‍රතිපෝෂණ ලබාදෙන අන්තර්ක්‍රියාකාරී ප්‍රශ්නාවලි සැකසීම.",
  "Chemical Reactions, Acids & Bases Summary": "රසායනික ප්‍රතික්‍රියා, අම්ල සහ භස්ම සාරාංශය",
  "Opportunities to assess understanding.": "දැනුම සහ අවබෝධය මැන බැලීමේ අවස්ථා.",
  "If you are a current student at the University of Ruhuna and would like to volunteer as a mentor, you can apply through our volunteer portal.": "ඔබ රුහුණ විශ්වවිද්‍යාලයේ සිසුවෙකු නම් සහ ස්වේච්ඡා උපදේශකයෙකු වීමට කැමති නම්, අපගේ ස්වේච්ඡා පිවිසුම හරහා අයදුම් කළ හැකිය.",
  "Undergraduate Answering Precision & Technique": "විශ්වවිද්‍යාල ශිෂ්‍ය පිළිතුරු සැපයීමේ නිරවද්‍යතාව සහ ශිල්පක්‍රම",
  "Essential formula guides and quick-reference calculation sheets.": "අත්‍යවශ්‍ය සූත්‍ර මාර්ගෝපදේශ සහ කෙටි ගණනය කිරීමේ සටහන්.",
  "Designers & Developers": "නිර්මාණකරුවන් සහ සංවර්ධකයින්",
  "Direct Benefits for Students": "සිසුන්ට හිමිවන සෘජු ප්‍රතිලාභ",
  "The heart and driving force of the Manasala programme.": "මංසල වැඩසටහනේ හදවත සහ ප්‍රධාන ගාමක බලවේගය.",
  "Relatable Mentors: Guided by undergraduate achievers who recently cleared O/Ls.": "සමීප උපදේශකවරුන්: මෑතකදී සා/පෙළ ඉහළින්ම සමත් වූ විශ්වවිද්‍යාල ජ්‍යෙෂ්ඨයින්ගේ මගපෙන්වීම.",
  "Volunteers serve in a variety of structured roles across the programme:": "වැඩසටහන පුරා විවිධ වගකීම් සහතික කරමින් ස්වේච්ඡා සිසුන් සේවය කරයි:",
  "Comprehensive coverage spanning Physics, Chemistry, and Biology with an emphasis on experimental questions and scientific reasoning.": "භෞතික, රසායනික හා ජීව විද්‍යාව පුරා විහිදුනු පූර්ණ ආවරණය — ප්‍රායෝගික පරීක්ෂණ සහ විද්‍යාත්මක තර්කනය කෙරෙහි විශේෂ අවධානය.",
  "Past-paper-style practice questions with model answers.": "පසුගිය විභාග ආකෘතියේ පුහුණු ප්‍රශ්න සහ ආදර්ශ පිළිතුරු.",
  "Mentorship Liaison 1:5 Cohort Matching & Support": "1:5 උපදේශන සම්බන්ධීකරණය සහ සහය",
  "Conceptual foundation and methodical problem-solving workflows covering algebra, geometry theorems, graphs, and arithmetic.": "වීජගණිතය, ජ්‍යාමිතික ප්‍රමේයයන්, ප්‍රස්තාර සහ අංකගණිතය ආවරණය වන ක්‍රමවත් ගැටලු විසඳීමේ ක්‍රමවේද.",
  "Test your understanding of Newton's Laws, types of forces, friction, and motion concepts. This quiz contains 10 multiple-choice questions designed for O/L preparation.": "නිව්ටන්ගේ නියම, බල වර්ග, ඝර්ෂණය සහ චලිතය පිළිබඳ ඔබේ අවබෝධය පරීක්ෂා කරගන්න. සා/පෙළ විභාගයට ගැළපෙන බහුවරණ ප්‍රශ්න 10 ක් මෙහි අඩංගු වේ.",
  "What Mentors Provide": "උපදේශකවරුන් සපයන සහයෝගය",
  "Timed quizzes to develop speed, precision, and accuracy.": "වේගය, නිරවද්‍යතාව සහ විභාග කාල කළමනාකරණය පුහුණු කරන ප්‍රශ්නාවලි.",
  "Interactive diagnostic quizzes for regular self-assessment.": "නිතිපතා ස්වයං ඇගයීම සඳහා අන්තර්ක්‍රියාකාරී ප්‍රශ්නාවලි.",
  "Syllabus topics and revision guides are continuously updated by academic teams for the G.C.E. O/L 2026 examination cycle.": "අ.පො.ස. සාමාන්‍ය පෙළ 2026 විභාගය සඳහා විෂය නිර්දේශ ඒකක සහ පුනරීක්ෂණ මාර්ගෝපදේශ නිරන්තරයෙන් යාවත්කාලීන වේ.",
  "Spread awareness about the programme, connect with schools and communities, and help ensure Manasala reaches students who need it most.": "වැඩසටහන පිළිබඳ දැනුවත්භාවය ව්‍යාප්ත කිරීම, පාසල් සහ ප්‍රජාවන් සම්බන්ධ කිරීම සහ සැබවින්ම උපකාර අවශ්‍ය සිසුන් වෙත මංසල ළඟා කරවීම.",
  "Instant results & explanations": "ක්ෂණික ලකුණු සහ පැහැදිලි කිරීම්",
  "Content Creators": "ඉගෙනුම් අන්තර්ගත නිර්මාණකරුවන්",
  "Step-by-step past paper discussions, marking scheme breakdowns, and model answers.": "පසුගිය ප්‍රශ්න පත්‍ර පියවරෙන් පියවර සාකච්ඡාව, ලකුණු පටිපාටි විග්‍රහය සහ ආදර්ශ පිළිතුරු.",
  "Structured 1:5 mentorship for continuous student guidance.": "සිසුන්ගේ අඛණ්ඩ මගපෙන්වීම උදෙසා විධිමත් 1:5 උපදේශනය.",
  "Every volunteer contributes on a fully voluntary basis, driven by a shared belief that education is a collective responsibility and a fundamental right.": "අධ්‍යාපනය යනු සාමූහික වගකීමක් සහ මූලික අයිතිවාසිකමක් යන පොදු විශ්වාසය පෙරදැරි කරගනිමින් සෑම ස්වේච්ඡා සාමාජිකයෙකුම පූර්ණ කැපවීමෙන් දායක වේ.",
  "Manage logistics, scheduling, communications, and programme operations to ensure everything runs smoothly and effectively.": "සියලු කටයුතු ක්‍රමවත්ව සිදුවන බවට තහවුරු කරමින් වැඩසටහන් මෙහෙයුම්, කාලසටහන් සහ සන්නිවේදනය කළමනාකරණය කිරීම.",
  "Graded practice problems arranged from introductory to exam-level.": "මූලික මට්ටමේ සිට විභාග මට්ටම දක්වා ශ්‍රේණිගත කළ පුහුණු ගැටලු.",
  "You can access all available practice quizzes by visiting the Quizzes page. Quizzes are organised by subject and topic.": "ප්‍රශ්නාවලි පිටුවට පිවිසීමෙන් ඔබට සියලු පුහුණු ප්‍රශ්නාවලි වෙත ප්‍රවේශ විය හැකිය. ප්‍රශ්නාවලි විෂය සහ ඒකක අනුව පෙළගස්වා ඇත.",
  "Duration: ~15 minutes": "කාලය: විනාඩි ~15",
  "Dedicated Guidance: The structured 1:5 ratio ensures every student receives dedicated academic guidance.": "විශේෂිත මගපෙන්වීම: 1:5 අනුපාතය මඟින් සෑම සිසුවෙකුටම පෞද්ගලික අවධානය සහ මගපෙන්වීම තහවුරු කරයි.",
  "Clear classification of chemical reaction types, balancing complex equations, pH scale applications, and salt preparation pathways.": "රසායනික ප්‍රතික්‍රියා වර්ගීකරණය, සංකීර්ණ සමීකරණ තුලනය, pH පරිමාණය සහ ලවණ පිළියෙල කිරීමේ ක්‍රම.",
  "Step-by-step worked examples and full solution breakdowns.": "පියවරෙන් පියවර විසඳූ ගැටලු සහ පූර්ණ විවරණ.",
  "Force & Motion — Quick Review Quiz": "බලය සහ චලිතය — කෙටි පුහුණු ප්‍රශ්නාවලිය",
  "Structured weekly revision sessions and regular progress review check-ins.": "සතිපතා විධිමත් පුනරීක්ෂණ සැසි සහ ප්‍රගති සමාලෝචන සාකච්ඡා.",
  "Confidence & Mastery: Overcome subject apprehension through structured practice.": "විශ්වාසය සහ ප්‍රවීණත්වය: විධිමත් පුහුණුව මඟින් විෂය බිය දුරු කරගන්න.",
  "Fill out the form below and a member of our team will get back to you promptly.": "පහත පෝරමය පුරවා එවන්න, අපගේ කණ්ඩායමේ සාමාජිකයෙකු කඩිනමින් ඔබ හා සම්බන්ධ වනු ඇත.",
  "Structured 1:5 mentorship support for challenging topics.": "අසීරු ඒකක සඳහා විධිමත් 1:5 කුඩා කණ්ඩායම් උපදේශන සහයෝගය.",
  "Coordinators": "සම්බන්ධීකාරකවරුන්",
  "Explore Newton's laws of motion, speed, velocity, uniform acceleration and resultant forces.": "නිව්ටන්ගේ චලිත නියම, වේගය, ප්‍රවේගය, ඒකාකාර ත්වරණය සහ සම්ප්‍රයුක්ත බල පිළිබඳව පුහුණු වන්න.",
  "Start Quiz →": "ප්‍රශ්නාවලිය අරඹන්න →",
  "Forces & Motion": "බලය සහ චලිතය",
  "Chemical Reactions": "රසායනික ප්‍රතික්‍රියා",
  "Cellular Biology": "සෛලීය ජීව විද්‍යාව",
  "Work, Energy & Power": "කාර්යය, ශක්තිය සහ ක්ෂමතාව",
  "Periodic Table & Bonding": "ආවර්තිතා වගුව සහ බන්ධන",
  "Nervous System & Senses": "ස්නායු පද්ධතිය සහ සංවේදක",
  "Algebra Fundamentals": "වීජ ගණිත මූලධර්ම",
  "Geometry & Measurement": "ජ්‍යාමිතිය සහ මිනුම්",
  "Probability & Statistics": "සම්භාවිතාව සහ සංඛ්‍යානය",
  "Simultaneous Equations": "සමගාමී සමීකරණ",
  "Circle Theorems": "වෘත්ත ප්‍රමේයයන්",
  "Commercial Arithmetic": "වාණිජ අංක ගණිතය",
  "Full Name *": "සම්පූර්ණ නම *",
  "Email Address *": "විද්‍යුත් තැපැල් ලිපිනය *",
  "Subject *": "විෂය / මාතෘකාව *",
  "Message *": "පණිවිඩය *",
  "Mentors": "උපදේශකවරුන්",
  "02 1:5 Student Mentorship Focused small-group academic guidance connecting undergraduates with O/L candidates.": "02 1:5 ශිෂ්‍ය උපදේශනය — උපාධි අපේක්ෂකයන් සා/පෙළ සිසුන් හා සම්බන්ධ කරන සුවිශේෂී කුඩා කණ්ඩායම් අධ්‍යයන මගපෙන්වීම.",
  "03 Interactive Assessments Self-paced diagnostic quizzes that highlight knowledge gaps and measure revision progress.": "03 අන්තර්ක්‍රියාකාරී ඇගයීම් — දැනුම අඩුපාඩු හඳුනාගෙන පුනරීක්ෂණ ප්‍රගතිය තහවුරු කරන ස්වයං-වේගී ප්‍රශ්නාවලි.",
  "Academic Curriculum Focus Targeted Syllabus Coverage for O/L Success Direct intervention targeting the most challenging components of the G.C.E. Ordinary Level syllabus.": "විෂය නිර්දේශ අවධානය — සා/පෙළ ජයග්‍රහණය උදෙසා අ.පො.ස. සාමාන්‍ය පෙළ විෂය නිර්දේශයේ වඩාත් අසීරු ඒකක ඉලක්ක කරගත් සෘජු අධ්‍යාපනික සහයෝගය.",
  "Academic Repository Curated Study Dossiers Download syllabus-aligned revision materials prepared for O/L Science & Mathematics candidates.": "අධ්‍යාපනික ලේඛනාගාරය — සා/පෙළ විද්‍යාව හා ගණිතය සිසුන් වෙනුවෙන් සම්පාදනය කළ විෂය නිර්දේශානුකූල පුනරීක්ෂණ ද්‍රව්‍ය බාගත කරන්න.",
  "At the core of Mansala are the undergraduate volunteers from the University of Ruhuna . These dedicated students — from diverse faculties and disciplines — come together under the Faculty of Science to contribute their time, knowledge, and energy to making a difference in the lives of younger students.": "මංසල වැඩසටහනේ හදවත බඳු වන්නේ රුහුණ විශ්වවිද්‍යාලයේ විද්‍යා පීඨ ශිෂ්‍ය ස්වේච්ඡා කණ්ඩායමයි. විවිධ විෂය ක්ෂේත්‍ර නියෝජනය කරන මෙම කැපවූ සිසුන්, බාල පරපුරේ අධ්‍යාපනික ජීවිතය සාර්ථක කරලීම උදෙසා තම කාලය, දැනුම හා ශක්තිය නොමසුරුව දායක කරයි.",
  "Clear classification of chemical reaction types, balancing complex equations, pH scale applications, and laboratory test summaries for quick recall.": "රසායනික ප්‍රතික්‍රියා වර්ගීකරණය, සංකීර්ණ සමීකරණ තුලනය කිරීම, pH පරිමාණ භාවිතයන් සහ කඩිනම් මතකයට අවශ්‍ය රසායනාගාර පරීක්ෂණ සාරාංශ.",
  "Cohort Guidance Model The 1 : 5 Mentorship Programme Personalised academic guidance connecting university undergraduate mentors with small cohorts of five O/L candidates.": "කණ්ඩායම් උපදේශන ආකෘතිය — විශ්වවිද්‍යාල උපාධි අපේක්ෂක උපදේශකයෙකු සිසුන් පස්දෙනෙකුගෙන් යුත් කුඩා කණ්ඩායම් හා සම්බන්ධ කරන 1 : 5 පුද්ගලාරෝපිත අධ්‍යයන මගපෙන්වීම.",
  "Comprehensive coverage spanning Physics, Chemistry, and Biology with an emphasis on experimental questions and structured essay precision.": "භෞතික, රසායනික හා ජීව විද්‍යාව පූර්ණ වශයෙන් ආවරණය කරමින් ප්‍රායෝගික පරීක්ෂණ සහ ව්‍යුහගත රචනා ප්‍රශ්න ලිවීමේ නිරවද්‍යතාව පුහුණු කිරීම.",
  "Conceptual foundation and methodical problem-solving workflows covering algebra, geometry theorems, and exam-standard calculation steps.": "වීජගණිතය, ජ්‍යාමිතික ප්‍රමේයයන් සහ විභාග මට්ටමේ පියවරෙන් පියවර ගණනය කිරීම් ආවරණය වන ක්‍රමවත් ගැටලු විසඳීමේ ක්‍රමවේද.",
  "Create interactive quizzes and assessments that test understanding, reinforce learning, and give students a clear picture of their progress.": "දැනුම පරීක්ෂා කරන, ඉගෙනුම තහවුරු කරන සහ සිසුන්ට තම ප්‍රගතිය පිළිබඳ පැහැදිලි චිත්‍රයක් ලබාදෙන අන්තර්ක්‍රියාකාරී ප්‍රශ්නාවලි සහ ඇගයීම් නිර්මාණය කිරීම.",
  "Develop study notes, revision guides, worked examples, and practice questions aligned with the O/L Science and Mathematics curriculum.": "සා/පෙළ විද්‍යාව හා ගණිතය විෂය නිර්දේශයට ගැළපෙන කෙටි සටහන්, පුනරීක්ෂණ මාර්ගෝපදේශ, විසඳූ ආදර්ශ ගැටලු සහ පුහුණු ප්‍රශ්න සම්පාදනය කිරීම.",
  "Every volunteer contributes on a fully voluntary basis, driven by a shared belief that education is a right, not a privilege. The programme provides volunteers with training, support, and recognition for their contributions.": "අධ්‍යාපනය යනු වරප්‍රසාදයක් නොව අයිතිවාසිකමක් යන පොදු හැඟීම පෙරදැරි කරගනිමින් සෑම ස්වේච්ඡා සාමාජිකයෙකුම පූර්ණ කැපවීමෙන් සේවය කරයි. මෙම වැඩසටහන මඟින් ස්වේච්ඡා සාමාජිකයින්ට අවශ්‍ය පුහුණුව, සහයෝගය සහ නිසි ඇගයීම ලබාදේ.",
  "Featured Master Dossier Science Past Paper & Marking Scheme 2023 G.C.E. O/L Science — Complete Examination Dossier & Marking Scheme An exhaustive review document containing the full 2023 national examination paper (Parts I, II & Structured Essay), complete with an annotated marking scheme, mentor commentary on frequent errors, and model answer formulations.": "විශේෂ ප්‍රධාන ලේඛනය: විද්‍යාව පසුගිය ප්‍රශ්න පත්‍රය සහ ලකුණු පටිපාටිය — 2023 අ.පො.ස. සා/පෙළ විද්‍යාව සම්පූර්ණ විභාග ප්‍රශ්න පත්‍රය (I, II හා ව්‍යුහගත රචනා), සවිස්තර ලකුණු පටිපාටිය, සුලබ වැරදි පිළිබඳ විග්‍රහ සහ ආදර්ශ පිළිතුරු ඇතුළත් පූර්ණ අධ්‍යයන සංග්‍රහය.",
  "If you are a current student at the University of Ruhuna and would like to volunteer as a mentor, you can express your interest through the Mentorship page or contact the Programme Coordinator using the details provided above. Mentors are matched with small groups of O/L students to provide academic guidance and support.": "ඔබ රුහුණ විශ්වවිද්‍යාලයේ වත්මන් සිසුවෙකු නම් සහ ස්වේච්ඡා උපදේශකයෙකු ලෙස දායක වීමට කැමති නම්, උපදේශන පිටුව හරහා හෝ ඉහත සඳහන් තොරතුරු ඔස්සේ වැඩසටහන් සම්බන්ධීකාරක අමතා ඔබේ කැමැත්ත ප්‍රකාශ කළ හැකිය.",
  "If you encounter a technical issue, broken link, or any problem with the website, please use the Help Desk enquiry form above and select \"Technical Issue\" as the category. Provide as much detail as possible, including what page you were on and what went wrong. Our team will review and address the issue promptly.": "වෙබ් අඩවියේ කිසියම් තාක්ෂණික ගැටලුවක්, ක්‍රියා විරහිත සබැඳියක් හෝ දෝෂයක් ඇත්නම්, ඉහත උපකාරක කවුළු පෝරමය භාවිත කර කාණ්ඩය ලෙස \"තාක්ෂණික ගැටලුවක්\" තෝරන්න. අදාළ පිටුව සහ ගැටලුව විස්තර කරන්න. අපගේ කණ්ඩායම කඩිනමින් එය විසඳනු ඇත.",
  "Institutional Transparency Official Documentation Programme-related documents, letters, and faculty approvals.": "ආයතනික විනිවිදභාවය: නිල ලේඛන — වැඩසටහනට අදාළ නිල ලිපි ලේඛන, අනුමැතීන් සහ වාර්තා.",
  "Interactive Self-Assessment Test Your Knowledge Try our interactive quizzes to assess your understanding and track your progress.": "අන්තර්ක්‍රියාකාරී ස්වයං ඇගයීම: ඔබේ දැනුම පරීක්ෂා කරගන්න — විභාග අවබෝධය මැන බැලීමට සහ ප්‍රගතිය තහවුරු කරගැනීමට අන්තර්ක්‍රියාකාරී ප්‍රශ්නාවලි සමඟ එක්වන්න.",
  "Manage logistics, scheduling, communications, and programme operations to ensure everything runs smoothly and efficiently.": "වැඩසටහන් මෙහෙයුම්, කාලසටහන්, සන්නිවේදනය සහ ප්‍රවාහන කටයුතු ක්‍රමවත්ව හා කාර්යක්ෂමව පවත්වා ගැනීම කළමනාකරණය කිරීම.",
  "Mathematics Revision Guide 14 Pages • 1.8 MB Simultaneous Equations & Quadratic Graphing Comprehensive step-by-step revision guide on algebraic elimination, substitution, and graphical solutions with 15 worked model exam questions.": "ගණිතය පුනරීක්ෂණ මාර්ගෝපදේශය (පිටු 14 • 1.8 MB): යුගල සමීකරණ සහ වර්ගජ ප්‍රස්තාර — වීජීය ආදේශය, ඉවත් කිරීම සහ ප්‍රස්තාරික විසඳුම් පිළිබඳ විසඳූ ආදර්ශ ගැටලු 15 ක් සහිත පූර්ණ මාර්ගෝපදේශය.",
  "Our volunteer mentors sat these exact national examinations. They know where marks are typically lost and teach candidates how to write clear, examiner-aligned answers.": "අපගේ ස්වේච්ඡා උපදේශකවරුන් මෙම ජාතික විභාගයටම මෑතකදී පෙනී සිට ඉහළින් සමත් වූවන්ය. ලකුණු අහිමි වන ස්ථාන ඔවුන් මැනවින් දන්නා අතර, පරීක්ෂකවරුන් අපේක්ෂා කරන පැහැදිලි හා නිවැරදි පිළිතුරු ලියන ආකාරය සිසුන්ට කියාදෙයි.",
  "Provide small-group 1:5 academic guidance to O/L students, helping them understand difficult concepts and develop effective study habits.": "සා/පෙළ සිසුන් වෙනුවෙන් 1:5 කුඩා කණ්ඩායම් අධ්‍යයන මගපෙන්වීමක් සපයමින්, අසීරු සංකල්ප අවබෝධ කරගැනීමට හා ඵලදායී අධ්‍යයන පුරුදු ගොඩනැගීමට සහය වීම.",
  "Ready to Start Learning? Explore free learning resources, challenge yourself with interactive quizzes, or discover how our mentorship programme can support your O/L journey.": "අධ්‍යාපනය අරඹන්න ඔබ සූදානම්ද? නොමිලේ ඉගෙනුම් ද්‍රව්‍ය ලබාගන්න, අන්තර්ක්‍රියාකාරී ප්‍රශ්නාවලි මඟින් දැනුම පරීක්ෂා කරගන්න, නැතහොත් උපදේශන වැඩසටහන සමඟ සම්බන්ධ වන්න.",
  "Spread awareness about the programme, connect with schools and communities, and help ensure Manasala reaches the students who need it most.": "වැඩසටහන පිළිබඳ දැනුවත්භාවය ව්‍යාප්ත කිරීම, පාසල් සහ ප්‍රජාවන් සම්බන්ධ කිරීම සහ වඩාත්ම උපකාර අවශ්‍ය සිසුන් වෙත මංසල ළඟා කරවීම.",
  "Students and parents can also follow the programme and reach out for support through our community channels. Stay updated on new study materials, revision guides, and examination guidance.": "සිසුන්ට සහ දෙමාපියන්ට අපගේ ප්‍රජා සන්නිවේදන මාර්ග ඔස්සේද වැඩසටහන සමඟ සම්බන්ධ විය හැකිය. නව ඉගෙනුම් ද්‍රව්‍ය සහ විභාග මාර්ගෝපදේශ පිළිබඳව නිරන්තරයෙන් යාවත්කාලීන වන්න.",
  "Syllabus topics and revision guides are continuously updated by academic teams for G.C.E. O/L students.": "අ.පො.ස. සාමාන්‍ය පෙළ 2026 විභාග කණ්ඩායම වෙනුවෙන් අධ්‍යයන කණ්ඩායම් විසින් විෂය නිර්දේශ ඒකක සහ පුනරීක්ෂණ මාර්ගෝපදේශ නිරන්තරයෙන් යාවත්කාලීන කරනු ලැබේ.",
  "Test your understanding of Newton's Laws, types of forces, friction, and motion concepts. This quiz covers key examination topics from the O/L Science syllabus.": "නිව්ටන්ගේ නියම, බල වර්ග, ඝර්ෂණය සහ චලිතය පිළිබඳ ඔබේ අවබෝධය පරීක්ෂා කරගන්න. සා/පෙළ විද්‍යාව විෂය නිර්දේශයේ ප්‍රධාන විභාග ඒකක මෙම ප්‍රශ්නාවලිය මඟින් ආවරණය කෙරේ.",
  "The learning resources on this platform are created for students preparing for the G.C.E. Ordinary Level (O/L) examination, particularly in Science and Mathematics. However, anyone interested in learning these subjects is welcome to access the materials. All resources are provided free of charge.": "මෙම වෙබ් අඩවියේ ඇති ඉගෙනුම් සම්පත් අ.පො.ස. සාමාන්‍ය පෙළ විභාගයට, විශේෂයෙන් විද්‍යාව හා ගණිතය විෂයයන්ට සූදානම් වන සිසුන් සඳහා විශේෂයෙන් සම්පාදනය කර ඇත. සියලුම සම්පත් සම්පූර්ණයෙන්ම නොමිලේ ලබාගත හැකිය.",
  "You can access all available practice quizzes by visiting the Quizzes page. Quizzes are organised by subject and topic, and each quiz indicates its difficulty level and estimated completion time. Quizzes are self-paced, completely free, and provide instant results along with step-by-step worked answers.": "ප්‍රශ්නාවලි පිටුවට පිවිසීමෙන් ඔබට සියලු පුහුණු ප්‍රශ්නාවලි වෙත ප්‍රවේශ විය හැකිය. ප්‍රශ්නාවලි විෂය සහ ඒකක අනුව පෙළගස්වා ඇති අතර, අපහසුතා මට්ටම සහ ගතවන කාලය දක්වා ඇත. සියලු ප්‍රශ්නාවලි නොමිලේ වන අතර පියවරෙන් පියවර විසඳුම් සමඟ ක්ෂණික ප්‍රතිඵල ලබාදේ.",
  "මංසල – Mansala is a volunteer-driven educational programme organised by the Faculty of Science of the University of Ruhuna. Born from a genuine desire to give back to the community, Manasala brings together university undergraduates who are passionate about teaching and mentoring to support Ordinary Level (O/L) students preparing for their national examinations in Science and Mathematics.": "<strong>මංසල</strong> යනු රුහුණ විශ්වවිද්‍යාලයේ විද්‍යා පීඨය විසින් සංවිධානය කරනු ලබන ස්වේච්ඡා අධ්‍යාපනික වැඩසටහනකි. ප්‍රජාවට නැවත සේවය කිරීමේ උදාර අරමුණින් බිහිවූ මංසල, විද්‍යාව හා ගණිතය විෂයයන්ගෙන් සාමාන්‍ය පෙළ (සා/පෙළ) ජාතික විභාගයට පෙනී සිටින සිසුන්ට සහය වීම සඳහා ඉගැන්වීමට හා උපදේශනයට කැපවූ විශ්වවිද්‍යාල සිසුන් එක්රැස් කරයි.",
  "The programme was first conceived when members of the Faculty of Science recognised that many O/L students — particularly those in rural and underserved areas — face significant challenges accessing quality educational support. By leveraging the knowledge and enthusiasm of university students, Manasala creates a bridge between higher education and secondary school learners, fostering a culture of peer-led learning and academic solidarity.": "ග්‍රාමීය සහ දුෂ්කර ප්‍රදේශවල බොහෝ සා/පෙළ සිසුන් ගුණාත්මක අධ්‍යාපනික සහය ලබා ගැනීමේදී දැඩි අභියෝගවලට මුහුණ දෙන බව හඳුනාගත් විද්‍යා පීඨයේ සාමාජිකයින් විසින් මෙම වැඩසටහන ආරම්භ කරන ලදී. විශ්වවිද්‍යාල සිසුන්ගේ දැනුම සහ උනන්දුව උපයෝගී කරගනිමින්, උසස් අධ්‍යාපනය සහ ද්විතීයික පාසල් සිසුන් අතර පාලමක් නිර්මාණය කරමින් සහයෝගීතා ඉගෙනුම් සංස්කෘතියක් ගොඩනැගීම මංසල අරමුණයි.",
  "Through curated learning resources, interactive quizzes, structured mentorship, and community engagement activities, Mansala aims to make a meaningful and lasting impact on the educational journey of every student it reaches. All resources and services offered through the programme are completely free of charge.": "විධිමත්ව සකස් කළ ඉගෙනුම් ද්‍රව්‍ය, අන්තර්ක්‍රියාකාරී ප්‍රශ්නාවලි, 1:5 උපදේශනය සහ ප්‍රජා සත්කාරක ක්‍රියාකාරකම් හරහා සෑම සිසුවෙකුගේම අධ්‍යාපනික ගමනට අර්ථවත් හා කල්පවත්නා බලපෑමක් ඇති කිරීම මංසල හි අපේක්ෂාවයි. මෙම වැඩසටහන මඟින් පිරිනමනු ලබන සියලුම සම්පත් හා සේවාවන් සම්පූර්ණයෙන්ම නොමිලේ ලබා දේ.",
  "Why Manasala was created": "මංසල බිහිවීමට හේතුව",
  "Sri Lanka's O/L examination is a pivotal milestone in every student's academic life, yet access to quality Science and Mathematics education remains unevenly distributed. Students in many parts of the country lack access to experienced teachers, supplementary materials, and the kind of guided practice that builds true understanding and confidence.": "ශ්‍රී ලංකාවේ සාමාන්‍ය පෙළ විභාගය සෑම සිසුවෙකුගේම අධ්‍යාපන ජීවිතයේ තීරණාත්මක කඩඉමකි. එහෙත් ගුණාත්මක විද්‍යාව හා ගණිතය අධ්‍යාපනයට ඇති ප්‍රවේශය දිවයින පුරා සමානව ව්‍යාප්ත වී නොමැත. ප්‍රවීණ ගුරුවරුන්, අතිරේක ඉගෙනුම් ද්‍රව්‍ය සහ නිවැරදි විභාග මගපෙන්වීම් නොමැතිකම බොහෝ සිසුන්ට දැඩි බාධාවකි.",
  "Manasala was created to bridge these educational gaps. The programme recognises that education is a collective responsibility and that university students — having recently navigated the same academic challenges — are uniquely positioned to mentor, inspire, and guide younger learners.": "<strong>මෙම අධ්‍යාපනික පරතරය පියවීම සඳහා මංසල බිහිවිය.</strong> අධ්‍යාපනය යනු සාමූහික වගකීමක් බවත්, මෑතකදී මෙම විභාග ජයගත් විශ්වවිද්‍යාල සිසුන්ට පාසල් සිසුන් උනන්දු කරවීමට සහ මගපෙන්වීමට සුවිශේෂී හැකියාවක් ඇති බවත් මෙම වැඩසටහන තරයේ විශ්වාස කරයි.",
  "By channelling the collective talent and goodwill of university volunteers into a structured, well-organised programme, Manasala aims to ensure that no motivated student is left behind due to a lack of resources or guidance. The programme operates entirely on a voluntary basis, reflecting the Faculty of Science's commitment to social responsibility and educational equity.": "විශ්වවිද්‍යාල ස්වේච්ඡා සිසුන්ගේ දක්ෂතාව සහ කැපවීම විධිමත් වැඩසටහනකට එක්රැස් කිරීම තුළින්, සම්පත් හෝ මගපෙන්වීම් නොමැතිකම නිසා කිසිදු දක්ෂ සිසුවෙකු අතරමං නොවීම සහතික කිරීම මංසල අරමුණයි. සමාජ වගකීම සහ අධ්‍යාපනික සමානාත්මතාව වෙනුවෙන් විද්‍යා පීඨයේ කැපවීම මෙයින් පිළිබිඹු වේ.",
  "Supporting O/L students through personalised 1:5 mentorship designed to build academic confidence, clarify complex topics, and guide students toward examination success.": "අධ්‍යාපනික ආත්මවිශ්වාසය ගොඩනැගීමට, සංකීර්ණ විෂය කරුණු පැහැදිලි කිරීමට සහ සා/පෙළ විභාග ජයග්‍රහණය කරා සිසුන් මෙහෙයවීමට පුද්ගලාරෝපිත 1:5 ශිෂ්‍ය උපදේශනය.",
  "Each mentor is a current undergraduate who has excelled in the very subjects they now help teach. They understand the challenges O/L students face because they have been through the same journey. Through regular interactions — whether reviewing difficult concepts, working through past papers, or simply offering encouragement — our mentors help bridge the gap between classroom learning and examination readiness, creating a lasting positive impact on students' educational outcomes.": "සෑම උපදේශකයෙකුම තමන් උගන්වන විෂයයන්හි විශිෂ්ට සාමාර්ථ ලබාගත් විශ්වවිද්‍යාල සිසුන්ය. එම අධ්‍යාපනික අභියෝග ඔවුහු මැනවින් අත්විඳ ඇත්තාහ. නිතිපතා පවත්වන සාකච්ඡා, පසුගිය ප්‍රශ්න පත්‍ර විසඳීම සහ දිරිගැන්වීම් හරහා සිසුන්ගේ අධ්‍යාපන ජයග්‍රහණය උදෙසා ඔවුහු කල්පවත්නා බලපෑමක් ඇති කරති.",
  "Each university mentor is paired with a small group of five O/L students for focused, personalised guidance.": "සෑම විශ්වවිද්‍යාල උපදේශකයෙකුම සා/පෙළ සිසුන් පස්දෙනෙකුගෙන් යුත් කුඩා කණ්ඩායමකට විශේෂිත, පුද්ගලාරෝපිත මගපෙන්වීමක් සපයයි.",
  "Provides small-group academic guidance, clarifies complex Science and Mathematics questions, shares proven exam preparation methods, and tracks weekly candidate progress.": "කුඩා කණ්ඩායම් අධ්‍යයන මගපෙන්වීම් ලබා දීම, සංකීර්ණ විද්‍යා හා ගණිත ගැටලු නිරවුල් කිරීම, සාර්ථක විභාග උපක්‍රම බෙදාගැනීම සහ සතිපතා ප්‍රගතිය නිරීක්ෂණය කිරීම සිදු කරයි.",
  "Undergraduate mentors from the University of Ruhuna are assigned to dedicated cohorts of five students, ensuring continuous personal feedback and focused academic support.": "රුහුණ විශ්වවිද්‍යාලයේ උපාධි අපේක්ෂක උපදේශකයින් සිසුන් පස්දෙනෙකුගෙන් යුත් කණ්ඩායම් වෙත පත්කර ඇති අතර, අඛණ්ඩ පෞද්ගලික ප්‍රතිපෝෂණ සහ අධ්‍යයන සහයෝගය සහතික කෙරේ.",
  "Every mentee undergoes a gentle, non-judgmental diagnostic evaluation to identify specific learning hurdles in Science and Mathematics. Mentors establish a dedicated 1:5 study circle with agreed weekly revision targets.": "විද්‍යාව හා ගණිතය විෂයයන්හි පවතින දුෂ්කරතා හඳුනා ගැනීම සඳහා සෑම සිසුවෙකුම මූලික මිත්‍රශීලී ඇගයීමකට ලක් කෙරේ. උපදේශකයින් සතිපතා පුනරීක්ෂණ ඉලක්ක සහිත 1:5 අධ්‍යයන කවයක් ස්ථාපිත කරයි.",
  "The මංසල resource library brings together curated study materials to support O/L students preparing for Science and Mathematics examinations. Browse past examination papers, model question sets, comprehensive revision notes, and exam marking schemes — all organised for easy access and available completely free of charge.": "සා/පෙළ විද්‍යාව හා ගණිතය විභාග සඳහා සූදානම් වන සිසුන්ට සහය වීම සඳහා මංසල ඉගෙනුම් පුස්තකාලය මඟින් සම්පාදිත අධ්‍යයන ද්‍රව්‍ය එක්රැස් කර ඇත. පසුගිය විභාග ප්‍රශ්න පත්‍ර, ආදර්ශ ප්‍රශ්න කට්ටල, විස්තීර්ණ පුනරීක්ෂණ සටහන් සහ ලකුණු දීමේ පටිපාටි සියල්ල නොමිලේ ලබාගත හැකිය.",
  "Whether you're a student preparing for O/L examinations, a parent seeking information about the programme, or a guardian wanting to connect your child with mentorship opportunities — our Help Desk is your direct point of contact. Reach out using the contact details below or submit an enquiry through the form.": "ඔබ සා/පෙළ විභාගයට සූදානම් වන සිසුවෙකු වුවද, වැඩසටහන පිළිබඳ තොරතුරු සොයන දෙමාපියෙකු හෝ භාරකරුවෙකු වුවද — අපගේ උපකාරක කවුළුව ඔබේ සෘජු සම්බන්ධතා ස්ථානයයි. පහත විස්තර භාවිතයෙන් හෝ විමසීම් පෝරමය හරහා අප හා සම්බන්ධ වන්න.",
  "මංසල - Mansala is a volunteer-driven educational programme organised by the Faculty of Science of the University of Ruhuna. Born from a genuine desire to give back to the community, Manasala brings together university undergraduates who are passionate about teaching and mentoring to support Ordinary Level (O/L) students preparing for their national examinations in Science and Mathematics.": "<strong>මංසල</strong> යනු රුහුණ විශ්වවිද්‍යාලයේ විද්‍යා පීඨය විසින් සංවිධානය කරනු ලබන ස්වේච්ඡා අධ්‍යාපනික වැඩසටහනකි. ප්‍රජාවට නැවත සේවය කිරීමේ උදාර අරමුණින් බිහිවූ මංසල, විද්‍යාව හා ගණිතය විෂයයන්ගෙන් සාමාන්‍ය පෙළ (සා/පෙළ) ජාතික විභාගයට පෙනී සිටින සිසුන්ට සහය වීම සඳහා ඉගැන්වීමට හා උපදේශනයට කැපවූ විශ්වවිද්‍යාල සිසුන් එක්රැස් කරයි.",
  "Our coordinators are available to assist you with any questions about මංසල - Mansala.": "මංසල පිළිබඳ ඔබේ ඕනෑම ගැටලුවක් සඳහා සහය වීමට අපගේ විශ්වවිද්‍යාල සම්බන්ධීකාරක කණ්ඩායම සූදානමින් සිටී.",
  "Chemical Reactions & Acids": "රසායනික ප්‍රතික්‍රියා සහ අම්ල",
  "Circle Theorems & Tangents": "වෘත්ත ප්‍රමේය සහ ස්පර්ශක",
  "Calculate simple interest, percentage profit/loss, customs duty, municipal rates, and compound growth.": "සරල පොලිය, ප්‍රතිශත ලාභ/අලාභ, රේගු බදු, නගර සභා වරිපනම් සහ වැල් පොලිය ගණනය කරන්න.",
  "Check your understanding of organelle functions, circulatory pathways, digestive enzymes, and plant osmosis.": "සෛල ඉන්ද්‍රියිකා, රුධිර සංසරණ පද්ධතිය, ජීර්ණ එන්සයිම සහ ආශ්‍රැතිය පිළිබඳ ඔබේ දැනුම පරීක්ෂා කරගන්න.",
  "Practice calculating event probabilities, central tendency measures (mean, median), and reading ogive curves.": "සිද්ධි සම්භාවිතාව, මධ්‍යස්ථ ප්‍රවණතා මිනුම් (මධ්‍යන්‍යය, මධ්‍යස්ථය) සහ සංචිත වාර ගණන වක්‍ර ප්‍රගුණ කරන්න.",
  "Test your knowledge of neuron anatomy, reflex action pathways, eye optics, and brain coordination functions.": "නියුරෝන ව්‍යුහය, ප්‍රතීක චාප, ඇසේ දෘෂ්ටිය සහ මොළයේ සමායෝජන ක්‍රියාකාරිත්වය පිළිබඳ දැනුම පරීක්ෂා කරන්න.",
  "Test your grasp of chemical reaction types, balancing complex equations, the pH scale, and metal displacement.": "රසායනික ප්‍රතික්‍රියා වර්ග, සමීකරණ තුලනය, pH පරිමාණය සහ ලෝහ විස්ථාපනය පිළිබඳ දැනුම පරීක්ෂා කරන්න.",
  "Solve paired linear equations using elimination and substitution methods and interpret intersection graphs.": "ඉවත් කිරීමේ සහ ආදේශ කිරීමේ ක්‍රම මගින් සමගාමී සමීකරණ විසඳා ඡේදනය වන ප්‍රස්ථාර අර්ථකථනය කරන්න.",
  "Review electronic configurations of elements 1-20, octet rules, ionic bonding, and covalent molecules.": "1 සිට 20 දක්වා මූලද්‍රව්‍යවල ඉලෙක්ට්‍රෝන වින්‍යාසය, අෂ්ටක නීතිය, අයනික සහ සහසංයුජ බන්ධන සමාලෝචනය කරන්න.",
  "Explore Newton's laws of motion, speed, velocity, uniform acceleration and resultant forces in straight-line mechanics.": "නිව්ටන්ගේ චලිත නියම, වේගය, ප්‍රවේගය, ඒකාකාර ත්වරණය සහ සරල රේඛීය චලිතය පිළිබඳ අධ්‍යයනය කරන්න.",
  "Master simplifying algebraic expressions, solving linear equations, and factorising quadratic expressions.": "වීජීය ප්‍රකාශන සරල කිරීම, රේඛීය සමීකරණ විසඳීම සහ වර්ගජ ප්‍රකාශන සාධක වෙන් කිරීම ප්‍රගුණ කරන්න.",
  "Solve problems involving interior angles of polygons, Pythagorean theorem, circle theorems, and solid mensuration.": "බහුඅස්‍රවල අභ්‍යන්තර කෝණ, පයිතගරස් ප්‍රමේයය, වෘත්ත ප්‍රමේය සහ ඝන වස්තු මිනුම් ආශ්‍රිත ගැටලු විසඳන්න.",
  "Master circle geometry theorems, tangent-radius relationships, alternate segment theorem, and geometric riders.": "වෘත්ත ජ්‍යාමිතික ප්‍රමේය, ස්පර්ශක-අරය සම්බන්ධතා, ඒකාන්තර ඛණ්ඩ ප්‍රමේය සහ ජ්‍යාමිතික ගැටලු ප්‍රගුණ කරන්න.",
  "Supporting O/L students through personalised 1:5 mentorship designed to build academic confidence and examination success in Science & Mathematics.": "සා/පෙළ සිසුන් වෙනුවෙන් විද්‍යාව හා ගණිතය විෂයයන්හි විභාග සාර්ථකත්වය සහ ආත්මවිශ්වාසය ගොඩනැංවීම උදෙසා ක්‍රියාත්මක වන 1:5 සුවිශේෂී මගපෙන්වීම.",
  "Science (විද්‍යාව) Grade 10 & 11": "විද්‍යාව (Science) 10 සහ 11 ශ්‍රේණි",
  "Mathematics (ගණිතය) Grade 10 & 11": "ගණිතය (Mathematics) 10 සහ 11 ශ්‍රේණි",
  "Curated Study Dossiers Download syllabus-aligned revision materials prepared for O/L Science & Mathematics candidates.": "විෂය නිර්දේශයට අනුකූලව සකස් කරන ලද සා/පෙළ විද්‍යාව සහ ගණිතය පුනරීක්ෂණ ඉගෙනුම් ද්‍රව්‍ය බාගත කරන්න.",
  "Procuring essential science practical demonstrator kits for rural secondary schools.": "දුෂ්කර පාසල් සඳහා අත්‍යවශ්‍ය විද්‍යා ප්‍රායෝගික උපකරණ කට්ටල ලබා දීම.",
  "Transport and logistical arrangements for volunteer undergraduate teaching mentors.": "ස්වේච්ඡා විශ්වවිද්‍යාල උපදේශකවරුන්ගේ ප්‍රවාහන හා සම්බන්ධීකරණ කටයුතු සැලසීම.",
  "All bank accounts specified on this domain (BOC Account No. 00084729104) are registered under the official Faculty of Science Dean's Fund, monitored by Ruhuna bursars.": "මෙම වෙබ් අඩවියේ සඳහන් සියලුම බැංකු ගිණුම් (ලංකා බැංකුව ගිණුම් අංක: 00084729104) රුහුණ විශ්වවිද්‍යාලයේ මූල්‍ය නිලධාරීන්ගේ අධීක්ෂණය යටතේ විද්‍යා පීඨ පීඨාධිපති අරමුදල යටතේ නිල වශයෙන් ලියාපදිංචි කර ඇත.",
  "Students' Union • Faculty of Science • University of Ruhuna": "විද්‍යා පීඨ ශිෂ්‍ය සංගමය • රුහුණ විශ්වවිද්‍යාලය",
  "Students' Union of the Faculty of Science of the University of Ruhuna": "රුහුණ විශ්වවිද්‍යාලයේ විද්‍යා පීඨ ශිෂ්‍ය සංගමය",
  "Students' Union, Faculty of Science, University of Ruhuna": "විද්‍යා පීඨ ශිෂ්‍ය සංගමය, රුහුණ විශ්වවිද්‍යාලය",
  "Faculty of Science Students' Union": "විද්‍යා පීඨ ශිෂ්‍ය සංගමය",
  "Students' Union &bull; Faculty of Science &bull; University of Ruhuna": "විද්‍යා පීඨ ශිෂ්‍ය සංගමය • රුහුණ විශ්වවිද්‍යාලය",
  "Faculty of Science Students' Union Volunteers": "විද්‍යා පීඨ ශිෂ්‍ය සංගමයේ ස්වේච්ඡා සාමාජිකයින්",
  "Academic Charter &bull; Faculty of Science Students' Union": "අධ්‍යයන ප්‍රඥප්තිය • විද්‍යා පීඨ ශිෂ්‍ය සංගමය",
  "Operational Charter &bull; Students' Union Outreach": "මෙහෙයුම් ප්‍රඥප්තිය • ශිෂ්‍ය සංගමයේ ප්‍රජා සත්කාරය",
  "An educational programme organised by the Students' Union of the Faculty of Science of the University of Ruhuna, supporting O/L students in Science and Mathematics.": "රුහුණ විශ්වවිද්‍යාලයේ විද්‍යා පීඨ ශිෂ්‍ය සංගමය විසින් සංවිධානය කරනු ලබන, සා/පෙළ විද්‍යාව හා ගණිතය සිසුන් සවිබල ගන්වන අධ්‍යාපනික සත්කාරයකි.",
  "Official educational outreach by the Students' Union of the Faculty of Science, University of Ruhuna.": "රුහුණ විශ්වවිද්‍යාලයේ විද්‍යා පීඨ ශිෂ්‍ය සංගමය විසින් මෙහෙයවනු ලබන නිල අධ්‍යාපනික සත්කාරය.",
  "© මංසල – Mansala. Students' Union, Faculty of Science, University of Ruhuna.": "© මංසල – Mansala. විද්‍යා පීඨ ශිෂ්‍ය සංගමය, රුහුණ විශ්වවිද්‍යාලය.",
  "මංසල is a community-driven educational outreach initiative organised by the Students' Union of the Faculty of Science, University of Ruhuna. The programme aims to make O/L Science and Mathematics education more accessible through free learning resources, interactive assessments, and a structured mentorship programme.": "මංසල යනු රුහුණ විශ්වවිද්‍යාලයේ විද්‍යා පීඨ ශිෂ්‍ය සංගමය විසින් මෙහෙයවන ප්‍රජා මූලික අධ්‍යාපනික සත්කාරයකි. නොමිලේ ඉගෙනුම් ද්‍රව්‍ය, අන්තර්ක්‍රියාකාරී ප්‍රශ්නාවලි සහ 1:5 උපදේශන ආකෘතිය ඔස්සේ සා/පෙළ විද්‍යාව හා ගණිතය අධ්‍යාපනය වඩාත් සමීප කරවීම අපගේ අරමුණයි.",
  "A community-driven educational outreach initiative organised by the Students' Union of the Faculty of Science, University of Ruhuna. Providing syllabus-aligned study materials, topic-based practice quizzes, and structured 1:5 mentorship to help G.C.E. Ordinary Level candidates excel.": "රුහුණ විශ්වවිද්‍යාලයේ විද්‍යා පීඨ ශිෂ්‍ය සංගමය විසින් මෙහෙයවන ප්‍රජා මූලික අධ්‍යාපනික සත්කාරයකි. අ.පො.ස. සාමාන්‍ය පෙළ විභාග ජයග්‍රහණය උදෙසා විෂය නිර්දේශානුකූල ඉගෙනුම් ද්‍රව්‍ය, ප්‍රශ්නාවලි සහ 1:5 උපදේශනය නොමිලේ සපයයි.",
  "මංසල – Mansala is a volunteer-driven educational programme organised by the Students' Union of the Faculty of Science of the University of Ruhuna. Born from a genuine desire to give back to the community, Manasala brings together university undergraduates who are passionate about teaching and mentoring to support Ordinary Level (O/L) students preparing for their national examinations in Science and Mathematics.": "<strong>මංසල</strong> යනු රුහුණ විශ්වවිද්‍යාලයේ විද්‍යා පීඨ ශිෂ්‍ය සංගමය විසින් මෙහෙයවනු ලබන ස්වේච්ඡා අධ්‍යාපනික සත්කාරයකි. ප්‍රජාවට නැවත යමක් ලබාදීමේ උදාර අරමුණින් බිහිවූ මංසල, විද්‍යාව හා ගණිතය විෂයයන්ගෙන් සාමාන්‍ය පෙළ (සා/පෙළ) විභාගයට පෙනී සිටින දරුවන්ට ශක්තියක් වීම සඳහා ඉගැන්වීමට සහ මගපෙන්වීමට කැපවුණු විශ්වවිද්‍යාල ශිෂ්‍ය ප්‍රජාව ඒකරාශී කරයි.",
  "The programme was first conceived when members of the Faculty of Science Students' Union recognised that many O/L students — particularly those in rural and underserved areas — face significant challenges accessing quality educational support. By leveraging the knowledge and enthusiasm of university students, Manasala creates a bridge between higher education and secondary school learners, fostering a culture of peer-led learning and academic solidarity.": "ග්‍රාමීය සහ දුෂ්කර ප්‍රදේශවල බොහෝ සා/පෙළ සිසුන් ගුණාත්මක අධ්‍යාපනික සහය ලබා ගැනීමේදී දැඩි අපහසුතාවන්ට මුහුණ දෙන බව විද්‍යා පීඨ ශිෂ්‍ය සංගමයේ සාමාජිකයින් හඳුනාගැනීමත් සමඟ මෙම වැඩසටහන ආරම්භ විය. විශ්වවිද්‍යාල සිසුන්ගේ දැනුම හා උනන්දුව උපයෝගී කරගනිමින්, උසස් අධ්‍යාපනය සහ පාසල් සිසුන් අතර පාලමක් නිර්මාණය කරමින් සහෝදරත්වයේ ඉගෙනුම් සංස්කෘතියක් බිහිකිරීම මංසල අරමුණයි.",
  "By channelling the collective talent and goodwill of university volunteers into a structured, well-organised programme, Manasala aims to ensure that no motivated student is left behind due to a lack of resources or guidance. The programme operates entirely on a voluntary basis, reflecting the Students' Union of the Faculty of Science's commitment to social responsibility and educational equity.": "විශ්වවිද්‍යාල ස්වේච්ඡා ශිෂ්‍ය ප්‍රජාවගේ දක්ෂතාව සහ සහෝදරත්වය විධිමත් වැඩසටහනක් ඔස්සේ මෙහෙයවීම මඟින්, සම්පත් හෝ මගපෙන්වීමේ හිඟකම නිසා කිසිදු දක්ෂ දරුවෙකු අතහැර නොදැමීම සහතික කිරීම මංසල අරමුණයි. මෙම වැඩසටහන පූර්ණ ස්වේච්ඡා පදනමින් ක්‍රියාත්මක වන අතර, එය විද්‍යා පීඨ ශිෂ්‍ය සංගමයේ සාමාජිකයින්ගේ සමාජ වගකීම මනාව විදහා දක්වයි.",
  "මංසල – Mansala is an educational outreach programme organised by the Students' Union of the Faculty of Science of the University of Ruhuna. It is designed to support Ordinary Level (O/L) students in Sri Lanka by providing free learning resources, practice quizzes, and mentorship in Science and Mathematics. The programme is run entirely by volunteer university students committed to helping the next generation succeed.": "මංසල යනු රුහුණ විශ්වවිද්‍යාලයේ විද්‍යා පීඨ ශිෂ්‍ය සංගමය විසින් සංවිධානය කරනු ලබන අධ්‍යාපනික සත්කාරයකි. නොමිලේ ඉගෙනුම් ද්‍රව්‍ය, පුහුණු ප්‍රශ්නාවලි සහ 1:5 උපදේශන සේවාව ලබා දෙමින් ශ්‍රී ලාංකික සා/පෙළ සිසුන්ට සහය වීම මෙහි අරමුණයි.",
  "No. මංසල – Mansala is a completely free programme. All learning resources, quizzes, mentorship sessions, and activities are offered at no cost to students. The programme is funded and supported by the Students' Union of the Faculty of Science of the University of Ruhuna and its volunteer network.": "නැත. මංසල සම්පූර්ණයෙන්ම නොමිලේ ක්‍රියාත්මක වන වැඩසටහනකි. සියලුම ඉගෙනුම් සම්පත්, ප්‍රශ්නාවලි සහ උපදේශන සේවා සිසුන් වෙත ලබා දෙන්නේ කිසිදු අයකිරීමකින් තොරවය. මෙම වැඩසටහන රුහුණ විශ්වවිද්‍යාලයේ විද්‍යා පීඨ ශිෂ්‍ය සංගමය සහ ස්වේච්ඡා ශිෂ්‍ය ජාලය මඟින් පවත්වාගෙන යනු ලැබේ."
};

  function getSavedLanguage() {
    try {
      return localStorage.getItem(STORAGE_KEY) || 'en';
    } catch (e) {
      return 'en';
    }
  }

  function norm(str) {
    if (!str) return '';
    return str.replace(/\s+/g, ' ').trim();
  }

  function translateSubtree(root, isSi) {
    if (!root) return;

    // 0. Elements with explicit data-en / data-si
    const translatables = root.querySelectorAll ? root.querySelectorAll('[data-en][data-si]') : [];
    translatables.forEach(el => {
      const target = isSi ? el.getAttribute('data-si') : el.getAttribute('data-en');
      if (target !== null && target !== undefined) {
        const dot = el.querySelector('.pill-dot');
        if (dot) {
          el.innerHTML = '<span class="pill-dot"></span> ' + target;
        } else if (el.children.length === 0) {
          el.textContent = target;
        } else {
          el.innerHTML = target;
        }
      }
    });

    // 1. Element-level matching for paragraphs, headings, list items, labels, buttons, logo subtitles
    const blockSelectors = 'p, h1, h2, h3, h4, h5, li, label, button, a.btn, summary, .section__eyebrow, .section__eyebrow--bar, .statement-card__badge, .curriculum-topic-tag, .journey-phase-tag, .hero-desc, .section__subtitle, .stat-label, .trust-item, .card-title, .badge, .hero-badge-pill, .results-count-badge, .logo-subtitle';
    const blockElements = root.querySelectorAll ? root.querySelectorAll(blockSelectors) : [];
    
    blockElements.forEach(el => {
      // Skip if already handled by data-en / data-si
      if (el.hasAttribute('data-en') && el.hasAttribute('data-si')) return;
      if (el.closest('.lang-toggle-btn')) return;

      // CRITICAL FIX: If element contains an <a> tag or interactive elements, do NOT replace innerHTML at the container level!
      // Otherwise, setting innerHTML will destroy the <a> tags, making links disappear / unclickable.
      if (el.querySelector('a, button, input, select, textarea')) return;

      if (el._origHtml === undefined) {
        el._origHtml = el.innerHTML;
        el._origText = norm(el.textContent);
      }

      const key = el._origText;
      if (isSi && TRANSLATIONS[key]) {
        el.innerHTML = TRANSLATIONS[key];
      } else if (!isSi && el._origHtml !== undefined) {
        el.innerHTML = el._origHtml;
      }
    });

    // 2. TreeWalker for any remaining inline text nodes
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
      acceptNode: function(node) {
        const parent = node.parentElement;
        if (!parent) return NodeFilter.FILTER_REJECT;
        const tag = parent.tagName.toLowerCase();
        if (tag === 'script' || tag === 'style' || tag === 'noscript' || tag === 'code' || tag === 'svg' || tag === 'path') {
          return NodeFilter.FILTER_REJECT;
        }
        if (parent.closest('.lang-toggle-btn')) {
          return NodeFilter.FILTER_REJECT;
        }
        // If parent block was already translated at block level, skip its children
        if (parent._origHtml !== undefined && isSi && parent.textContent !== parent._origText) {
          return NodeFilter.FILTER_REJECT;
        }
        // If this text node was previously translated, always accept it so it can be restored on toggle
        if (node._origText !== undefined) {
          return NodeFilter.FILTER_ACCEPT;
        }
        const val = norm(node.nodeValue);
        if (val.length >= 2 && TRANSLATIONS[val]) {
          return NodeFilter.FILTER_ACCEPT;
        }
        return NodeFilter.FILTER_SKIP;
      }
    });

    const nodesToReplace = [];
    while (walker.nextNode()) {
      nodesToReplace.push(walker.currentNode);
    }

    nodesToReplace.forEach(node => {
      if (node._origText === undefined) {
        node._origText = node.nodeValue;
      }
      const raw = node._origText;
      const key = norm(raw);
      if (isSi && TRANSLATIONS[key]) {
        const leading = raw.match(/^\s*/)[0];
        const trailing = raw.match(/\s*$/)[0];
        node.nodeValue = leading + TRANSLATIONS[key] + trailing;
      } else if (!isSi && node._origText !== undefined) {
        node.nodeValue = node._origText;
      }
    });

    // 3. Inputs & Placeholders
    const inputs = root.querySelectorAll ? root.querySelectorAll('input[placeholder], textarea[placeholder]') : [];
    inputs.forEach(input => {
      if (input._origPlaceholder === undefined) {
        input._origPlaceholder = input.getAttribute('placeholder') || '';
      }
      const key = norm(input._origPlaceholder);
      if (isSi && TRANSLATIONS[key]) {
        input.placeholder = TRANSLATIONS[key];
      } else if (!isSi) {
        input.placeholder = input._origPlaceholder;
      }
    });

    
    // 3b. aria-label and title attributes
    const ariaElements = root.querySelectorAll ? root.querySelectorAll('[aria-label], [title]') : [];
    ariaElements.forEach(el => {
      if (el.hasAttribute('aria-label')) {
        if (el._origAriaLabel === undefined) el._origAriaLabel = el.getAttribute('aria-label') || '';
        const key = norm(el._origAriaLabel);
        if (isSi && TRANSLATIONS[key]) {
          el.setAttribute('aria-label', TRANSLATIONS[key]);
        } else if (!isSi && el._origAriaLabel !== undefined) {
          el.setAttribute('aria-label', el._origAriaLabel);
        }
      }
    });

    // 4. Update Header Toggle Buttons UI
    document.querySelectorAll('.lang-toggle-btn').forEach(btn => {
      const enOpt = btn.querySelector('.lang-opt[data-lang-code="en"]');
      const siOpt = btn.querySelector('.lang-opt[data-lang-code="si"]');
      if (enOpt) enOpt.classList.toggle('active', !isSi);
      if (siOpt) siOpt.classList.toggle('active', isSi);
    });
  }

  function applyLanguage(lang) {
    const isSi = lang === 'si';
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch (e) {}

    if (document.body) {
      document.body.classList.remove('lang-en', 'lang-si');
      document.body.classList.add(isSi ? 'lang-si' : 'lang-en');
    }
    if (document.documentElement) {
      document.documentElement.lang = isSi ? 'si' : 'en';
    }

    translateSubtree(document.body, isSi);

    if (typeof lucide !== 'undefined' && lucide.createIcons) {
      lucide.createIcons();
    }

    // Fire global event for dynamic components
    window.dispatchEvent(new CustomEvent('mansala:langchange', { detail: { lang } }));
  }

  function toggleLanguage() {
    const current = getSavedLanguage();
    const next = current === 'en' ? 'si' : 'en';
    applyLanguage(next);
  }

  function bindToggleButtons() {
    document.querySelectorAll('.lang-toggle-btn').forEach(btn => {
      if (!btn.dataset.boundLang) {
        btn.dataset.boundLang = 'true';
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          toggleLanguage();
        });
      }
    });
  }

  function init() {
    bindToggleButtons();
    applyLanguage(getSavedLanguage());
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  window.MansalaLang = {
    getLanguage: getSavedLanguage,
    setLanguage: applyLanguage,
    toggleLanguage: toggleLanguage,
    translate: function(el) {
      translateSubtree(el || document.body, getSavedLanguage() === 'si');
    }
  };

  // Accessible Click / Tap Toggle, Hover Bridge & Active States for .nav-dropdown (Item 3)
  if (typeof document !== 'undefined') {
    // 1. Sync Active State across Parent & Child Links
    const syncStudyHubActive = function() {
      const currentPath = window.location.pathname.toLowerCase();
      const childPages = ['resources.html', 'quizzes.html', 'mentorship.html'];
      const matchedPage = childPages.find(function(p) { return currentPath.endsWith(p); });

      document.querySelectorAll('.nav-dropdown').forEach(function(dropdown) {
        const trigger = dropdown.querySelector('.nav-dropdown-trigger');
        const items = dropdown.querySelectorAll('.nav-dropdown-item');

        if (matchedPage) {
          if (trigger) trigger.classList.add('active');
          items.forEach(function(item) {
            const href = (item.getAttribute('href') || '').toLowerCase();
            const isActive = href.includes(matchedPage);
            item.classList.toggle('active', isActive);
            if (isActive) {
              item.setAttribute('aria-current', 'page');
            } else {
              item.removeAttribute('aria-current');
            }
          });
        }
      });
    };

    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', syncStudyHubActive);
    } else {
      syncStudyHubActive();
    }

    // 2. Hover Bridge with 150ms Close Timeout
    document.querySelectorAll('.nav-dropdown').forEach(function(dropdown) {
      let closeTimeout = null;

      dropdown.addEventListener('mouseenter', function() {
        if (closeTimeout) {
          clearTimeout(closeTimeout);
          closeTimeout = null;
        }
        dropdown.classList.add('is-hovered');
      });

      dropdown.addEventListener('mouseleave', function() {
        closeTimeout = setTimeout(function() {
          dropdown.classList.remove('is-hovered');
        }, 150);
      });
    });

    // 3. Click / Tap Toggle and Outside Click Dismiss
    document.addEventListener('click', function(e) {
      const trigger = e.target.closest('.nav-dropdown-trigger');
      const openDropdown = document.querySelector('.nav-dropdown.is-open');

      if (trigger) {
        const parent = trigger.closest('.nav-dropdown');
        if (parent) {
          const willOpen = !parent.classList.contains('is-open');
          document.querySelectorAll('.nav-dropdown').forEach(function(d) {
            d.classList.remove('is-open');
            d.classList.remove('is-hovered');
            const t = d.querySelector('.nav-dropdown-trigger');
            if (t) t.setAttribute('aria-expanded', 'false');
          });

          if (willOpen) {
            parent.classList.add('is-open');
            trigger.setAttribute('aria-expanded', 'true');
          }
        }
      } else if (!e.target.closest('.nav-dropdown-menu')) {
        if (openDropdown) {
          openDropdown.classList.remove('is-open');
          openDropdown.classList.remove('is-hovered');
          const t = openDropdown.querySelector('.nav-dropdown-trigger');
          if (t) t.setAttribute('aria-expanded', 'false');
        }
      }
    });

    // 4. Escape Key Dismiss
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') {
        const openDropdown = document.querySelector('.nav-dropdown.is-open');
        if (openDropdown) {
          openDropdown.classList.remove('is-open');
          openDropdown.classList.remove('is-hovered');
          const t = openDropdown.querySelector('.nav-dropdown-trigger');
          if (t) t.setAttribute('aria-expanded', 'false');
        }
      }
    });
  }

})();
