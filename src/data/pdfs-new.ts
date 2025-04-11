import { resourceLinks } from './externalResources';

// Updated data structure to match the F3 End of Year Exams structure
const pdfs = {
  'unit-1': {
    'natural-numbers': [
      { id: 'pdf1', title: 'Factors, Multiples & Primes – Corbettmaths', url: 'https://corbettmaths.com/wp-content/uploads/2024/12/Factors-Multiples-Primes.pdf', type: 'questions' },
      { id: 'pdf2', title: 'Integers & Number Properties – Save My Exams', url: 'https://cdn.savemyexams.com/uploads/2018/09/1.1-Integers-HCF_LCM-Prime-numbers-Rational_Irrational-Numbers-Sig-Figs-Dec-Places-Extension-cover.pdf', type: 'questions' },
      { id: 'pdf3', title: 'Types of Numbers – Math Support', url: 'https://www.mathssupport.org/product/topic-1-numbers-questions-and-answers/', type: 'reference' },
      { id: 'pdf4', title: 'Natural Numbers Worksheet', url: 'https://corbettmaths.com/wp-content/uploads/2019/01/Types-of-Numbers.pdf', type: 'questions' },
      { id: 'pdf5', title: 'Natural Numbers Solutions', url: 'https://corbettmaths.com/wp-content/uploads/2019/01/Types-of-Numbers-Answers.pdf', type: 'answers' }
    ],
    'standard-form': [
      { id: 'pdf12', title: 'Standard Form – Corbettmaths', url: 'https://corbettmaths.com/wp-content/uploads/2013/02/standard-form-pdf.pdf', type: 'questions' },
      { id: 'pdf13', title: 'Standard Form – Maths4Everyone', url: 'https://www.maths4everyone.com/resources/downloads/standard-form-gcse-9-1-practice-questions-30210.pdf', type: 'questions' },
      { id: 'pdf14', title: 'Standard Form – Dr Austin Maths', url: 'https://www.draustinmaths.com/standard-form', type: 'reference' },
      { id: 'pdf15', title: 'Standard Form Worksheet – Physics & Maths Tutor', url: 'https://pmt.physicsandmathstutor.com/download/Maths/GCSE/Worksheets/Number/f.%20Standard%20Form.pdf', type: 'questions' },
      { id: 'pdf16', title: 'Standard Form Exercises', url: 'https://corbettmaths.com/wp-content/uploads/2019/02/Standard-Form.pdf', type: 'questions' },
      { id: 'pdf17', title: 'Standard Form Solutions', url: 'https://corbettmaths.com/wp-content/uploads/2019/02/Standard-Form-Answers.pdf', type: 'answers' }
    ],
    'common-factors': [
      { id: 'pdf6', title: 'Multiples, Factors and Primes – Corbettmaths', url: 'https://corbettmaths.com/wp-content/uploads/2013/02/multiples-factors-primes-pdf.pdf', type: 'questions' },
      { id: 'pdf7', title: 'Common Multiples and LCM – Corbettmaths', url: 'https://corbettmaths.com/wp-content/uploads/2018/11/Common-multiples-and-LCM-pdf.pdf', type: 'questions' },
      { id: 'pdf8', title: 'Factors, Multiples and Primes – Dr Austin Maths', url: 'https://www.draustinmaths.com/factors-multiples-and-primes', type: 'reference' },
      { id: 'pdf9', title: 'HCF and LCM Practice', url: 'https://corbettmaths.com/wp-content/uploads/2018/11/HCF-and-LCM-pdf.pdf', type: 'questions' },
      { id: 'pdf10', title: 'HCF and LCM Solutions', url: 'https://corbettmaths.com/wp-content/uploads/2018/11/HCF-and-LCM-Answers.pdf', type: 'answers' },
      { id: 'pdf11', title: 'Prime Factorization Guide', url: resourceLinks.numberAlgebra.primeFactorsHCFLCM, type: 'reference' }
    ],
    'four-operations': [
      { id: 'pdf18', title: 'Expressions, Formulae and Proof – Dr Austin Maths', url: 'https://www.draustinmaths.com/expressions-formulae-and-proof', type: 'reference' },
      { id: 'pdf19', title: 'Four Operations with Solutions – Physics & Maths Tutor', url: 'https://pmt.physicsandmathstutor.com/download/Maths/GCSE/Worksheets/Number/Solutions/a.%20Four%20Operations.pdf', type: 'answers' },
      { id: 'pdf20', title: 'Order of Operations', url: 'https://corbettmaths.com/wp-content/uploads/2018/11/Order-of-Operations-pdf.pdf', type: 'questions' },
      { id: 'pdf21', title: 'Order of Operations Solutions', url: 'https://corbettmaths.com/wp-content/uploads/2018/11/Order-of-Operations-Answers.pdf', type: 'answers' },
      { id: 'pdf22', title: 'Fractions Worksheet', url: 'https://corbettmaths.com/wp-content/uploads/2018/11/Fractions-of-an-Amount-pdf.pdf', type: 'questions' },
      { id: 'pdf23', title: 'Fractions Solutions', url: 'https://corbettmaths.com/wp-content/uploads/2018/11/Fractions-of-an-Amount-Answers.pdf', type: 'answers' },
      { id: 'pdf24', title: 'Types of Fractions Guide', url: 'https://corbettmaths.com/wp-content/uploads/2018/11/Fractions-Textbook.pdf', type: 'reference' }
    ],
    'surds': [
      { id: 'pdf34', title: 'Powers & Roots (Indices) – Maths4Everyone', url: 'https://www.maths4everyone.com/resources/downloads/powers-and-roots-gcse-9-1-practice-questions-30206.pdf', type: 'questions' },
      { id: 'pdf35', title: 'Surds – Mathsaurus', url: 'https://mathsaurus.com/gcse-and-igcse/igcse-exam-questions-by-topic/', type: 'reference' },
      { id: 'pdf36', title: 'Working with Surds', url: 'https://corbettmaths.com/wp-content/uploads/2019/09/Surds.pdf', type: 'questions' },
      { id: 'pdf37', title: 'Surds Solutions', url: 'https://corbettmaths.com/wp-content/uploads/2019/09/Surds-Answers.pdf', type: 'answers' }
    ],
    'decimals-fractions': [
      { id: 'pdf25', title: 'Decimals ↔ Fractions Conversions – Corbettmaths', url: 'https://corbettmaths.com/wp-content/uploads/2019/02/Fractions-to-Decimals.pdf', type: 'questions' },
      { id: 'pdf26', title: 'Fractions, Decimals & Percentages – Save My Exams', url: 'https://www.savemyexams.com/igcse/maths/cie/25/core/topic-questions/', type: 'reference' },
      { id: 'pdf27', title: 'Converting Fractions, Decimals, Percentages', url: 'https://corbettmaths.com/wp-content/uploads/2018/11/FDP-Conversions-pdf.pdf', type: 'questions' },
      { id: 'pdf28', title: 'Conversion Solutions', url: 'https://corbettmaths.com/wp-content/uploads/2018/11/FDP-Conversions-Answers.pdf', type: 'answers' }
    ],
    'ratio-proportion': [
      { id: 'pdf29', title: 'Ratio Exam Questions – Maths4Everyone', url: 'https://www.maths4everyone.com/resources/downloads/ratio-gcse-9-1-practice-questions-30261.pdf', type: 'questions' },
      { id: 'pdf30', title: 'Direct & Inverse Proportion Practice – Dr Austin Maths', url: 'https://www.draustinmaths.com/algebra', type: 'reference' },
      { id: 'pdf31', title: 'Ratio & Proportion – Save My Exams', url: 'https://www.savemyexams.com/igcse/maths/cie/25/core/topic-questions/', type: 'reference' },
      { id: 'pdf32', title: 'Ratio and Proportion Exercises', url: 'https://corbettmaths.com/wp-content/uploads/2019/09/Ratio.pdf', type: 'questions' },
      { id: 'pdf33', title: 'Ratio and Proportion Solutions', url: 'https://corbettmaths.com/wp-content/uploads/2019/09/Ratio-Answers.pdf', type: 'answers' }
    ]
  },
  'unit-2': {
    'exponents-indices': [
      { id: 'pdf38', title: 'Powers & Roots (Indices) – Maths4Everyone', url: 'https://www.maths4everyone.com/resources/downloads/powers-and-roots-gcse-9-1-practice-questions-30206.pdf', type: 'questions' },
      { id: 'pdf39', title: 'Powers, Roots & Fractional Indices – Physics & Maths Tutor', url: 'https://www.physicsandmathstutor.com/maths-revision/gcse-number/', type: 'reference' },
      { id: 'pdf40', title: 'Rules of Indices – Mathsaurus', url: 'https://mathsaurus.com/gcse-and-igcse/igcse-exam-questions-by-topic/', type: 'reference' },
      { id: 'pdf41', title: 'Exponent Rules Practice', url: 'https://corbettmaths.com/wp-content/uploads/2019/02/Indices.pdf', type: 'questions' },
      { id: 'pdf42', title: 'Exponent Rules Solutions', url: 'https://corbettmaths.com/wp-content/uploads/2019/02/Indices-Answers.pdf', type: 'answers' }
    ],
    'expansion-brackets': [
      { id: 'pdf43', title: 'Expanding & Factorising (Revision Grid) – Dr Austin Maths', url: 'https://www.draustinmaths.com/algebra', type: 'reference' },
      { id: 'pdf44', title: 'Expanding & Factorising Brackets – Save My Exams', url: 'https://www.savemyexams.com/igcse/maths/cie/25/extended/topic-questions/', type: 'reference' },
      { id: 'pdf45', title: 'Expanding Brackets', url: 'https://corbettmaths.com/wp-content/uploads/2013/02/expanding-brackets-pdf.pdf', type: 'questions' },
      { id: 'pdf46', title: 'Expanding Brackets Solutions', url: 'https://corbettmaths.com/wp-content/uploads/2013/02/expanding-brackets-answers.pdf', type: 'answers' }
    ],
    'factorisation': [
      { id: 'pdf47', title: 'Expanding & Factorising (Revision Grid) – Dr Austin Maths', url: 'https://www.draustinmaths.com/algebra', type: 'reference' },
      { id: 'pdf48', title: 'Expanding & Factorising Brackets – Save My Exams', url: 'https://www.savemyexams.com/igcse/maths/cie/25/extended/topic-questions/', type: 'reference' },
      { id: 'pdf49', title: 'Factorisation (Common Factor)', url: 'https://corbettmaths.com/wp-content/uploads/2019/02/Factorisation.pdf', type: 'questions' },
      { id: 'pdf50', title: 'Factorisation Solutions', url: 'https://corbettmaths.com/wp-content/uploads/2019/02/Factorisation-Answers.pdf', type: 'answers' },
      { id: 'pdf51', title: 'Difference of Two Squares', url: 'https://corbettmaths.com/wp-content/uploads/2019/02/Factorising-Difference-of-Two-Squares.pdf', type: 'questions' }
    ]
  },
  'unit-3': {
    'units-measurement': [
      { id: 'pdf98', title: 'Units Conversion & Basic Measures', url: 'https://www.doingmaths.co.uk/uploads/1/1/7/0/11709346/units_conversion_worksheet.pdf', type: 'questions' },
      { id: 'pdf99', title: 'Units of Measurement Exercises', url: 'https://corbettmaths.com/wp-content/uploads/2019/02/Unit-Conversions.pdf', type: 'questions' },
      { id: 'pdf100', title: 'Units of Measurement Solutions', url: 'https://corbettmaths.com/wp-content/uploads/2019/02/Unit-Conversions-Answers.pdf', type: 'answers' }
    ],
    'perimeter-area': [
      { id: 'pdf101', title: 'Area and Perimeter Exam Questions – Maths4Everyone', url: 'https://www.maths4everyone.com/resources/downloads/area-and-perimeter-gcse-9-1-practice-questions-30310.pdf', type: 'questions' },
      { id: 'pdf102', title: 'Area & Perimeter – Save My Exams', url: 'https://www.savemyexams.com/igcse/maths/cie/25/extended/topic-questions/', type: 'reference' },
      { id: 'pdf103', title: 'Perimeter and Area Worksheet', url: 'https://corbettmaths.com/wp-content/uploads/2019/02/Area-of-2D-Shapes.pdf', type: 'questions' },
      { id: 'pdf104', title: 'Perimeter and Area Solutions', url: 'https://corbettmaths.com/wp-content/uploads/2019/02/Area-of-2D-Shapes-Answers.pdf', type: 'answers' }
    ],
    'circle-vocabulary': [
      { id: 'pdf105', title: 'Circle Terminology Practice', url: 'https://corbettmaths.com/wp-content/uploads/2019/02/Circle-Theorems.pdf', type: 'questions' },
      { id: 'pdf106', title: 'Circle Terminology Solutions', url: 'https://corbettmaths.com/wp-content/uploads/2019/02/Circle-Theorems-Answers.pdf', type: 'answers' },
      { id: 'pdf107', title: 'Circle Theorems Revision – Dr Austin Maths', url: 'https://www.draustinmaths.com/geometry', type: 'reference' }
    ],
    'circle-calculations': [
      { id: 'pdf112', title: 'Circle Area and Circumference', url: 'https://corbettmaths.com/wp-content/uploads/2018/09/Area-and-Circumference-of-a-Circle-pdf.pdf', type: 'questions' },
      { id: 'pdf113', title: 'Circle Area and Circumference Solutions', url: 'https://corbettmaths.com/wp-content/uploads/2018/09/Area-and-Circumference-of-a-Circle-Answers.pdf', type: 'answers' },
      { id: 'pdf108', title: 'Circle Theorems Exam Questions – Maths Genie', url: 'https://www.mathsgenie.co.uk/resources/90_circle-theorems.pdf', type: 'questions' },
      { id: 'pdf109', title: 'Circle Theorems Answers – Corbettmaths', url: 'https://corbettmaths.com/wp-content/uploads/2023/09/Circle-Theorems-Answers-1.pdf', type: 'answers' }
    ],
    'arc-sector': [
      { id: 'pdf110', title: 'Arc Length and Sector Area', url: 'https://corbettmaths.com/wp-content/uploads/2019/02/Arc-Length-and-Sector-Area.pdf', type: 'questions' },
      { id: 'pdf111', title: 'Arc Length and Sector Area Solutions', url: 'https://corbettmaths.com/wp-content/uploads/2019/02/Arc-Length-and-Sector-Area-Answers.pdf', type: 'answers' }
    ]
  },
  'unit-4': {
    'linear-equations': [
      { id: 'pdf52', title: 'Solving Equations (One-variable) – Corbettmaths', url: 'https://corbettmaths.com/wp-content/uploads/2019/02/Solving-Equations.pdf', type: 'questions' },
      { id: 'pdf53', title: 'Linear Equations – Save My Exams', url: 'https://www.savemyexams.com/igcse/maths/cie/25/extended/topic-questions/', type: 'reference' },
      { id: 'pdf54', title: 'Equations and Inequalities – Dr Austin Maths', url: 'https://www.draustinmaths.com/equations-and-inequalities', type: 'reference' },
      { id: 'pdf55', title: 'Linear Equations Worksheet', url: 'https://corbettmaths.com/wp-content/uploads/2019/02/Solving-Equations.pdf', type: 'questions' },
      { id: 'pdf56', title: 'Linear Equations Solutions', url: 'https://corbettmaths.com/wp-content/uploads/2019/02/Solving-Equations-Answers.pdf', type: 'answers' }
    ],
    'inequalities-interpretation': [
      { id: 'pdf57', title: 'Linear Inequalities Worksheet – Maths Genie', url: 'https://www.mathsgenie.co.uk/resources/4-inequalities.pdf', type: 'questions' },
      { id: 'pdf58', title: 'Linear Inequalities Answers – Maths Genie', url: 'https://www.mathsgenie.co.uk/resources/4-inequalitiesans.pdf', type: 'answers' },
      { id: 'pdf59', title: 'Inequalities – Save My Exams', url: 'https://www.savemyexams.com/igcse/maths/cie/25/extended/topic-questions/', type: 'reference' }
    ],
    'inequalities-solution': [
      { id: 'pdf60', title: 'Inequalities – Dr Austin Maths', url: 'https://www.draustinmaths.com/equations-and-inequalities', type: 'reference' },
      { id: 'pdf57', title: 'Linear Inequalities Worksheet – Maths Genie', url: 'https://www.mathsgenie.co.uk/resources/4-inequalities.pdf', type: 'questions' },
      { id: 'pdf58', title: 'Linear Inequalities Answers – Maths Genie', url: 'https://www.mathsgenie.co.uk/resources/4-inequalitiesans.pdf', type: 'answers' }
    ],
    'linear-functions': [
      { id: 'pdf61', title: 'Coordinates and Linear Graphs – Dr Austin Maths', url: 'https://www.draustinmaths.com/coordinates-and-linear-graphs', type: 'reference' },
      { id: 'pdf62', title: 'Straight Line Graphs – Maths Genie', url: 'https://www.mathsgenie.co.uk/resources/16-graphs.pdf', type: 'questions' },
      { id: 'pdf63', title: 'Linear Graphs – Save My Exams', url: 'https://www.savemyexams.com/igcse/maths/cie/25/extended/revision-notes/', type: 'reference' },
      { id: 'pdf64', title: 'Linear Functions Practice', url: 'https://corbettmaths.com/wp-content/uploads/2019/03/Straight-Line-Graphs.pdf', type: 'questions' },
      { id: 'pdf65', title: 'Linear Functions Solutions', url: 'https://corbettmaths.com/wp-content/uploads/2019/03/Straight-Line-Graphs-Answers.pdf', type: 'answers' }
    ],
    'simultaneous-equations': [
      { id: 'pdf66', title: 'Simultaneous Equations – Maths Genie', url: 'https://www.mathsgenie.co.uk/resources/5-simultaneous-equations.pdf', type: 'questions' },
      { id: 'pdf67', title: 'Simultaneous Equations Answers – Maths Genie', url: 'https://www.mathsgenie.co.uk/resources/5-simultaneous-equationsans.pdf', type: 'answers' },
      { id: 'pdf68', title: 'Simultaneous Equations – Corbettmaths', url: 'https://corbettmaths.com/wp-content/uploads/2019/09/Simultaneous-Equations.pdf', type: 'questions' },
      { id: 'pdf69', title: 'Simultaneous Equations – Save My Exams', url: 'https://www.savemyexams.com/igcse/maths/cie/25/extended/topic-questions/', type: 'reference' },
      { id: 'pdf70', title: 'Simultaneous Equations Solutions', url: 'https://corbettmaths.com/wp-content/uploads/2019/09/Simultaneous-Equations-Answers.pdf', type: 'answers' }
    ]
  },
  'unit-5': {
    'geometric-terms': [
      { id: 'pdf71', title: 'Cambridge IGCSE Extended Practice Paper', url: 'https://owltutors.co.uk/wp-content/uploads/2019/03/Cambridge-IGCSE-International-Mathematics-0607-Extended-Paper-1.pdf', type: 'questions' },
      { id: 'pdf72', title: 'Geometry Terminology Worksheet', url: 'https://corbettmaths.com/wp-content/uploads/2019/02/Geometry.pdf', type: 'questions' },
      { id: 'pdf73', title: 'Geometry Terminology Solutions', url: 'https://corbettmaths.com/wp-content/uploads/2019/02/Geometry-Answers.pdf', type: 'answers' }
    ],
    'shape-vocabulary': [
      { id: 'pdf74', title: 'Shape Vocabulary – Corbettmaths', url: 'https://corbettmaths.com/wp-content/uploads/2019/07/2D-Shapes.pdf', type: 'reference' },
      { id: 'pdf75', title: 'Polygon Vocabulary Practice', url: resourceLinks.geometryMeasurement.shapes2D.questions, type: 'questions' },
      { id: 'pdf76', title: 'Polygon Vocabulary Solutions', url: resourceLinks.geometryMeasurement.shapes2D.answers, type: 'answers' }
    ],
    'measuring-angles': [
      { id: 'pdf77', title: 'Bearings – Corbettmaths', url: 'https://corbettmaths.com/wp-content/uploads/2019/10/Bearings.pdf', type: 'questions' },
      { id: 'pdf78', title: 'Bearings Solutions', url: 'https://corbettmaths.com/wp-content/uploads/2019/10/Bearings-Answers.pdf', type: 'answers' },
      { id: 'pdf79', title: 'Measuring Angles Worksheet', url: 'https://corbettmaths.com/wp-content/uploads/2019/02/Measuring-Angles.pdf', type: 'questions' },
      { id: 'pdf80', title: 'Measuring Angles Solutions', url: 'https://corbettmaths.com/wp-content/uploads/2019/02/Measuring-Angles-Answers.pdf', type: 'answers' }
    ],
    'angle-relationships': [
      { id: 'pdf81', title: 'Angles in Parallel Lines – Corbettmaths', url: 'https://corbettmaths.com/wp-content/uploads/2019/02/Angles-in-Parallel-Lines.pdf', type: 'questions' },
      { id: 'pdf82', title: 'Angles in Parallel Lines Solutions', url: 'https://corbettmaths.com/wp-content/uploads/2019/02/Angles-in-Parallel-Lines-Answers.pdf', type: 'answers' },
      { id: 'pdf83', title: 'Angle Properties – Hodder & Stoughton Limited', url: 'https://media.hachettelearning.com/medialibraries/hodder/answers-and-extras/maths/9781398373921/373921-cam-igcse-maths-wb-answers.pdf', type: 'answers' },
      { id: 'pdf84', title: 'Angle Properties', url: resourceLinks.geometryMeasurement.angleRules, type: 'reference' }
    ],
    'polygon-angles': [
      { id: 'pdf85', title: 'Angles in Polygons – Maths4Everyone', url: 'https://www.maths4everyone.com/resources/downloads/angles-in-polygons-gcse-9-1-practice-questions-30212.pdf', type: 'questions' },
      { id: 'pdf86', title: 'Angles: Polygons – Maths Genie', url: 'https://www.mathsgenie.co.uk/resources/35_angles-polygons.pdf', type: 'questions' },
      { id: 'pdf87', title: 'Angles: Polygons Solutions – Maths Genie', url: 'https://www.mathsgenie.co.uk/resources/35_angles-polygonsans.pdf', type: 'answers' },
      { id: 'pdf88', title: 'Angle Sums in Polygons Practice', url: 'https://corbettmaths.com/wp-content/uploads/2019/02/Interior-and-Exterior-Angles.pdf', type: 'questions' },
      { id: 'pdf89', title: 'Angle Sums Solutions', url: 'https://corbettmaths.com/wp-content/uploads/2019/02/Interior-and-Exterior-Angles-Answers.pdf', type: 'answers' }
    ],
    'pythagoras-theorem': [
      { id: 'pdf90', title: 'Pythagoras – Save My Exams', url: 'https://www.savemyexams.com/igcse/maths/cie/25/extended/topic-questions/', type: 'reference' },
      { id: 'pdf91', title: 'Pythagoras and SOHCAHTOA – Maths Genie', url: 'https://www.mathsgenie.co.uk/resources/18-trigonometry-and-pythagoras.pdf', type: 'questions' },
      { id: 'pdf92', title: 'Pythagoras and SOHCAHTOA Solutions – Maths Genie', url: 'https://www.mathsgenie.co.uk/resources/18-trigonometry-and-pythagorasans.pdf', type: 'answers' },
      { id: 'pdf93', title: 'Pythagoras Theorem Worksheet', url: resourceLinks.geometryMeasurement.pythagoras.questions, type: 'questions' },
      { id: 'pdf94', title: 'Pythagoras Theorem Solutions', url: resourceLinks.geometryMeasurement.pythagoras.answers, type: 'answers' }
    ]
  },
  'unit-8': {
    'right-angled-trigonometry': [
      { id: 'pdf114', title: 'Trigonometry (SOHCAHTOA) – Maths4Everyone', url: 'https://www.maths4everyone.com/resources/downloads/trigonometry-gcse-9-1-practice-questions-30320.pdf', type: 'questions' },
      { id: 'pdf115', title: 'SOHCAHTOA – Maths Genie', url: 'https://www.mathsgenie.co.uk/resources/5-SOHCAHTOAans.pdf', type: 'answers' },
      { id: 'pdf116', title: 'Trigonometry – Save My Exams', url: 'https://www.savemyexams.com/igcse/maths/cie/25/extended/topic-questions/', type: 'reference' },
      { id: 'pdf117', title: 'Right-Angled Trigonometry Exercises', url: 'https://corbettmaths.com/wp-content/uploads/2019/10/Trigonometry.pdf', type: 'questions' },
      { id: 'pdf118', title: 'Right-Angled Trigonometry Solutions', url: 'https://corbettmaths.com/wp-content/uploads/2019/10/Trigonometry-Answers.pdf', type: 'answers' }
    ],
    'pythagoras-trigonometry': [
      { id: 'pdf119', title: 'Pythagoras and SOHCAHTOA Worksheet – Maths Genie', url: 'https://www.mathsgenie.co.uk/resources/18-trigonometry-and-pythagoras.pdf', type: 'questions' },
      { id: 'pdf120', title: 'Pythagoras and SOHCAHTOA Solutions – Maths Genie', url: 'https://www.mathsgenie.co.uk/resources/18-trigonometry-and-pythagorasans.pdf', type: 'answers' },
      { id: 'pdf121', title: 'Trigonometry (SOHCAHTOA) – Maths4Everyone', url: 'https://www.maths4everyone.com/resources/downloads/trigonometry-gcse-9-1-practice-questions-30320.pdf', type: 'questions' },
      { id: 'pdf122', title: 'SOHCAHTOA Guide', url: resourceLinks.trigonometry.rightAngledTrigonometry, type: 'reference' }
    ],
    'angles-elevation-depression': [
      { id: 'pdf123', title: 'Trigonometry (SOHCAHTOA) – Maths4Everyone', url: 'https://www.maths4everyone.com/resources/downloads/trigonometry-gcse-9-1-practice-questions-30320.pdf', type: 'questions' },
      { id: 'pdf124', title: 'Angles of Elevation and Depression Practice', url: 'https://corbettmaths.com/wp-content/uploads/2019/10/Bearings.pdf', type: 'questions' },
      { id: 'pdf125', title: 'Elevation and Depression Solutions', url: 'https://corbettmaths.com/wp-content/uploads/2019/10/Bearings-Answers.pdf', type: 'answers' },
      { id: 'pdf126', title: 'Real-World Applications', url: 'https://corbettmaths.com/wp-content/uploads/2019/10/Trigonometry-Textbook.pdf', type: 'reference' }
    ],
    'perpendicular-distance': [
      { id: 'pdf127', title: 'Sine & Cosine Rules – Maths4Everyone', url: 'https://www.st-thomas-of-aquins.org.uk/wp-content/uploads/2014/06/sine-and-cosine-rule-solutions.pdf', type: 'answers' },
      { id: 'pdf128', title: 'Perpendicular Distance Worksheet', url: resourceLinks.trigonometry.pythagoras.questions, type: 'questions' },
      { id: 'pdf129', title: 'Perpendicular Distance Solutions', url: resourceLinks.trigonometry.pythagoras.answers, type: 'answers' },
      { id: 'pdf130', title: 'Distance from Point to Line', url: 'https://corbettmaths.com/wp-content/uploads/2019/10/Trigonometry-3D.pdf', type: 'reference' }
    ]
  },
  'exam-practice': {
    'past-papers': [
      { id: 'pdf131', title: 'IGCSE Exam Questions by Topic – Mathsaurus', url: 'https://mathsaurus.com/gcse-and-igcse/igcse-exam-questions-by-topic/', type: 'questions' },
      { id: 'pdf132', title: 'Cambridge IGCSE International Maths Past Papers – Save My Exams', url: 'https://www.savemyexams.com/igcse/maths/cie/international-maths/past-papers/', type: 'papers' },
      { id: 'pdf133', title: 'Official Cambridge Past Papers', url: 'https://www.cambridgeinternational.org/programmes-and-qualifications/cambridge-igcse-international-mathematics-0607/past-papers/', type: 'papers' }
    ]
  }
};

export { pdfs };
export default pdfs;