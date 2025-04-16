// solutions.ts - All solution resources for Cambridge IGCSE International Mathematics (0607)
import { ExternalResource } from '../types';

export const solutionResources: { [unitId: string]: { [subtopicSlug: string]: ExternalResource[] } } = {
  'unit-1': {
    'standard-form': [
      { title: "Standard Form Answers", url: "https://www.mathsgenie.co.uk/resources/5-standard-formans.pdf", source: "Maths Genie", type: "pdf" }
    ],
    'common-factors': [
      { title: "HCF and LCM Answers", url: "https://www.mathsgenie.co.uk/resources/4-HCF-and-LCMans.pdf", source: "Maths Genie", type: "pdf" }
    ],
    'four-operations': [
      { title: "Fractions Answers", url: "https://www.mathsgenie.co.uk/resources/3-fractionsans.pdf", source: "Maths Genie", type: "pdf" }
    ],
    'distance-formula': [
      { title: 'Corbettmaths – Distance Between Two Points Answers', url: 'https://corbettmaths.com/wp-content/uploads/2019/01/Answer-Distance-between-two-points.pdf', source: 'Corbettmaths', type: 'pdf' }
    ],
    'simultaneous-equations': [
      { title: "Graphical Simultaneous Equations Model Solutions", url: "https://www.mathsgenie.co.uk/resources/5-simultaneous-equationsans.pdf", source: "Maths Genie", type: "pdf" },
      { title: "Substitution Method Answers", url: "https://www.draustinmaths.com/_files/ugd/7ac124_279f05f5f79c45059658b741c52f30d7.pdf", source: "Dr Austin Maths", type: "pdf" },
      { title: "Elimination Practice Answers", url: "https://www.draustinmaths.com/_files/ugd/7ac124_ff7487c8484c45fb9c9bbb7f7c837be1.pdf", source: "Dr Austin Maths", type: "pdf" }
    ]
  },
  'unit-2': {
    'basic-angle-relationships': [
      { title: "Angles Around a Point / Straight Line Answers", url: "https://www.draustinmaths.com/angles-and-polygons", source: "Dr Austin Maths", type: "external" },
      { title: "Angles Around a Point Worksheet Answers", url: "https://www.tes.com/teaching-resources/shop/Maths4Everyone?sortBy=newest&p=4", source: "Maths4Everyone", type: "external" },
      { title: "Missing Angles Practice Answers", url: "https://corbettmaths.com/wp-content/uploads/2019/08/Missing-Angles-Answers.pdf", source: "Corbettmaths", type: "pdf" }
    ],
    'parallel-line-angles': [
      { title: "Angles in Parallel Lines Answers", url: "https://www.draustinmaths.com/angles-and-polygons", source: "Dr Austin Maths", type: "external" },
      { title: "Angles in Parallel Lines Mark Scheme", url: "https://www.mathsgenie.co.uk/resources/33_angles-parallel-linesans.pdf", source: "Maths Genie", type: "pdf" }
    ],
    'angle-sums': [
      { title: "Angles in Triangles & Quadrilaterals Answers", url: "https://www.draustinmaths.com/angles-and-polygons", source: "Dr Austin Maths", type: "external" },
      { title: "Angles in Irregular Polygons Answers", url: "https://www.draustinmaths.com/angles-and-polygons", source: "Dr Austin Maths", type: "external" },
      { title: "Angles in Polygons Answers", url: "https://corbettmaths.com/wp-content/uploads/2018/09/Angles-in-Polygons-Answers.pdf", source: "Corbettmaths", type: "pdf" }
    ],
    'polygon-angles': [
      { title: "Interior & Exterior Angles Answers", url: "https://www.draustinmaths.com/angles-and-polygons", source: "Dr Austin Maths", type: "external" },
      { title: "Regular Polygons Mark Scheme", url: "https://www.mathsgenie.co.uk/resources/33_angles-polygonsans.pdf", source: "Maths Genie", type: "pdf" }
    ]
  },
  'unit-3': {
    'bearings': [
      { title: "Bearings Solutions", url: "https://www.mathsgenie.co.uk/resources/5-bearingsans.pdf", source: "Maths Genie", type: "pdf" },
      { title: "Bearings Mark Scheme", url: "https://corbettmaths.com/wp-content/uploads/2018/11/Bearings-Answers.pdf", source: "Corbettmaths", type: "pdf" }
    ],
    'pythagoras-theorem': [
      { title: "Pythagoras Answers", url: "https://www.mathsgenie.co.uk/resources/5-pythagorasans.pdf", source: "Maths Genie", type: "pdf" },
      { title: "Pythagoras' Theorem Mark Scheme", url: "https://corbettmaths.com/wp-content/uploads/2019/02/Answer-Pythagoras.pdf", source: "Corbettmaths", type: "pdf" }
    ],
    'chord-properties': [
      { title: "Perpendicular from Centre Answers", url: "https://www.draustinmaths.com/_files/ugd/7ac124_649cf513c0e5405683f709c3b013e49e.pdf", source: "Dr Austin Maths", type: "pdf" },
      { title: "Circle Theorems Mark Scheme", url: "https://corbettmaths.com/wp-content/uploads/2018/09/Circle-Theorems-Answers.pdf", source: "Corbettmaths", type: "pdf" }
    ],
    'circle-distances': [
      { title: "Distance Worksheet Answers", url: "https://corbettmaths.com/wp-content/uploads/2019/01/Answer-Distance-between-two-points.pdf", source: "Corbettmaths", type: "pdf" }
    ]
  },
  'unit-4': {
    'algebraic-fractions-simplification': [
      { title: 'Simplifying Algebraic Fractions Answers', url: 'https://corbettmaths.com/wp-content/uploads/2019/12/answers-simplifying-algebraic-fractions.pdf', source: 'Corbettmaths', type: 'pdf' },
      { title: 'Algebraic Fractions Solutions', url: 'https://justmaths.co.uk/wp-content/uploads/2015/12/Algebra-H-Algebraic-Fractions-v2-SOLUTIONS-1-1.pdf', source: 'JustMaths', type: 'pdf' }
    ],
    'algebraic-fractions-addition': [
      { title: 'Algebraic Fractions Practice Solutions', url: 'https://www.savemyexams.com/igcse/maths/cie/25/extended/revision-notes/algebra-and-sequences/algebraic-fractions/solving-algebraic-fractions/', source: 'SaveMyExams', type: 'pdf' }
    ],
    'algebraic-fractions-multiplication': [
      { title: 'Multiplying & Dividing Solutions', url: 'https://www.savemyexams.com/igcse/maths/cie/25/extended/revision-notes/algebra-and-sequences/algebraic-fractions/solving-algebraic-fractions/', source: 'SaveMyExams', type: 'pdf' },
      { title: 'Algebraic Fractions – Exam Questions (Higher)', url: 'https://www.physicsandmathstutor.com/maths-revision/gcse-algebra/questions-edexcel/higher-algebraic-fractions-videos/', source: 'Physics & Maths Tutor', type: 'external' }
    ],
    'algebraic-fractions-equations': [
      { title: 'Algebraic Equations Guide', url: 'https://www.savemyexams.com/igcse/maths/cie/25/extended/revision-notes/algebra-and-sequences/algebraic-fractions/solving-algebraic-fractions/', source: 'SaveMyExams', type: 'pdf' }
    ],
    'distance-between-points': [
      { title: 'Corbettmaths – Distance Between Two Points Answers', url: 'https://corbettmaths.com/wp-content/uploads/2019/01/Answer-Distance-between-two-points.pdf', source: 'Corbettmaths', type: 'pdf' },
      { title: 'Webflow - Coordinate Geometry Worksheet A (inc Answers)', url: 'https://uploads-ssl.webflow.com/5f4d0d549c879fcac8e96b1f/5fe0f0a54480d762f9d3f945_B%20C1%20Coordinate%20Geometry.pdf', source: 'Webflow/PMT', type: 'pdf'}
    ],
    'midpoints': [
      { title: 'Corbettmaths – Midpoint of a Line Practice & Answers', url: 'https://corbettmaths.com/wp-content/uploads/2019/04/Midpoint-of-a-Line.pdf', source: 'Corbettmaths', type: 'pdf' },
      { title: 'Kuta Software - Midpoint Formula (Geometry version - inc Answers)', url: 'https://cdn.kutasoftware.com/Worksheets/Geo/3-The%20Midpoint%20Formula.pdf', source: 'Kuta Software', type: 'pdf'}
    ],
    'gradient-slope': [
      { title: 'Corbettmaths – Gradient Answers', url: 'https://corbettmaths.com/2019/09/02/gradient-practice-questions/', source: 'Corbettmaths', type: 'pdf' },
      { title: 'Webflow/PMT - Coordinate Geometry Worksheet A (inc Answers)', url: 'https://uploads-ssl.webflow.com/5f4d0d549c879fcac8e96b1f/5fe0f0a54480d762f9d3f945_B%20C1%20Coordinate%20Geometry.pdf', source: 'Webflow/PMT', type: 'pdf'}
    ],
    'parallel-perpendicular-lines': [
      { title: 'Maths Genie - Parallel/Perpendicular Answers PDF', url: 'https://www.mathsgenie.co.uk/resources/6-parallel-and-perpendicular-linesans.pdf', source: 'Maths Genie', type: 'pdf' },
      { title: 'Dr Austin Maths – Parallel and Perpendicular Answers', url: 'https://www.draustinmaths.com/coordinates-and-linear-graphs', source: 'Dr Austin Maths', type: 'external' },
      { title: 'MPCSD - Parallel/Perp Lines Worksheet Answers', url: 'https://teachers.mpcsd.org/mdoroquez/pages/documents/geo/Chapter%203/WS%20-%203.9%20-%20Parallel%20and%20Perp.%20Lines%20in%20the%20Coordinate%20Plane%20-%20ANSWERS.pdf', source: 'MPCSD', type: 'pdf'}
    ],
    'perpendicular-bisector': [
      { title: 'Save My Exams – Topic Questions (Answers likely included)', url: 'https://www.savemyexams.com/igcse/maths/cie/international-maths/23/extended/revision-notes/coordinate-geometry-and-graphs/straight-line-graphs/perpendicular-lines/', source: 'Save My Exams', type: 'pdf' },
      { title: 'Colleen Condra - Equations of Perpendicular Bisectors (inc Answers)', url: 'https://colleencondra.weebly.com/uploads/1/3/9/7/13973661/3-4_lab_answer_key_equations_of_perpendicular_bisectors.pdf', source: 'Colleen Condra Weebly', type: 'pdf'},
      { title: 'JMAP - Perpendicular Bisector Questions (inc Answers)', url: 'https://www.jmap.org/Worksheets/G.GPE.B.5.ParallelandPerpendicularLines8.pdf', source: 'JMAP', type: 'pdf'}
    ],
    'length-of-line': [
      { title: 'Dr Austin Maths – Midpoints and Lengths Answers', url: 'https://www.draustinmaths.com/coordinates-and-linear-graphs', source: 'Dr Austin Maths', type: 'external' },
      { title: 'Corbettmaths - Distance Between Two Points Answers', url: 'https://corbettmaths.com/wp-content/uploads/2019/01/Answer-Distance-between-two-points.pdf', source: 'Corbettmaths', type: 'pdf' }
    ],
    'linear-functions': [
      { title: 'Corbettmaths – Equation of a Line Answers', url: 'https://corbettmaths.com/wp-content/uploads/2025/02/Equation-of-a-Line-Answers.pdf', source: 'Corbettmaths', type: 'pdf' },
      { title: 'RCSDK12 - Review of Linear Functions (inc Answers)', url: 'https://www.rcsdk12.org/cms/lib/NY01001156/Centricity/Domain/4553/linear%20functions%20review%20packet.pdf', source: 'RCSDK12', type: 'pdf'},
      { title: 'MI Schoolwires - Linear Functions Chapter Answers', url: 'https://mi01000971.schoolwires.net/cms/lib/MI01000971/Centricity/Domain/513/Ch%201%20Worked%20Out%20Answer%20Key.pdf', source: 'MI Schoolwires', type: 'pdf'}
    ]
  },
  'unit-5': {
    'quadratic-fundamentals': [
      { title: "Expanding & Factorising Quadratics – Answers", url: "https://www.draustinmaths.com/quadratics", source: "Dr Austin Maths", type: "external" },
      { title: "Quadratic Equations Solutions", url: "https://www.savemyexams.com/igcse/maths/cie/25/extended/revision-notes/algebra-and-sequences/quadratic-equations/", source: "SaveMyExams", type: "pdf" }
    ],
    'factorisation-method': [
      { title: "Factorising Quadratics – Answers", url: "https://www.draustinmaths.com/quadratics", source: "Dr Austin Maths", type: "external" },
      { title: "Solving Quadratics Solutions", url: "https://corbettmaths.com/wp-content/uploads/2013/02/solving-quadratics-factorising-ans.pdf", source: "Corbettmaths", type: "pdf" }
    ],
    'quadratic-formula': [
      { title: "Quadratic Formula – step-by-step solutions", url: "https://www.youtube.com/watch?v=BeQwP8rZhZM", source: "Corbettmaths", type: "video" },
      { title: "Quadratic Formula Guide", url: "https://www.savemyexams.com/igcse/maths/cie/25/extended/revision-notes/algebra-and-sequences/quadratic-equations/quadratic-formula/", source: "SaveMyExams", type: "pdf" }
    ],
    'gdc-quadratics': [
      { title: "Solving Quadratics with Technology", url: "https://www.savemyexams.com/a-level/maths/cie/20/pure-1/revision-notes/algebra-and-functions/quadratics/solving-quadratic-equations/", source: "SaveMyExams", type: "pdf" }
    ],
    'parabola-properties': [
      { title: "Plotting Quadratic Graphs – Answers", url: "https://www.draustinmaths.com/quadratics", source: "Dr Austin Maths", type: "external" },
      { title: "Quadratic Graphs Solutions", url: "https://www.mathsgenie.co.uk/resources/5-quadratic-graphsans.pdf", source: "Maths Genie", type: "pdf" }
    ]
  },
  'unit-6': {
    'linear-sequences': [
      { title: "Sequences (Nth Term) Answers", url: "https://corbettmaths.com/wp-content/uploads/2019/09/Sequences-nth-Term-Answers.pdf", source: "Corbettmaths", type: "pdf" },
      { title: "Nth Term of Linear Answers", url: "https://www.draustinmaths.com/sequences", source: "Dr Austin Maths", type: "external" },
      { title: "Sequences (Nth Term) Solutions", url: "https://www.mathsgenie.co.uk/resources/5-sequencesans.pdf", source: "Maths Genie", type: "pdf" },
      { title: "Sequences Answers", url: "https://justmaths.co.uk/wp-content/uploads/2016/01/Algebra-H-Sequences-v2-SOLUTIONS.pdf", source: "JustMaths", type: "pdf" }
    ],
    'quadratic-sequences': [
      { title: "Quadratic Sequences Answers", url: "https://www.youtube.com/watch?v=0SzVXTdFcQc", source: "Corbettmaths", type: "video" },
      { title: "Quadratic Sequence Practice Answers", url: "https://www.draustinmaths.com/sequences", source: "Dr Austin Maths", type: "external" },
      { title: "Quadratic Seq. Solutions", url: "https://www.mathsgenie.co.uk/resources/7-quadratic-sequencesans.pdf", source: "Maths Genie", type: "pdf" },
      { title: "Topic Questions Answers", url: "https://www.savemyexams.com/gcse/maths/edexcel/22/higher/revision-notes/algebra/sequences/quadratic-sequences/", source: "Save My Exams", type: "pdf" }
    ],
    'cubic-sequences': [
      { title: "Cubic Worksheet Answers", url: "https://www.radfordmathematics.com/algebra/sequences-series/difference-method-sequences/cubic-sequences.html", source: "Radford Mathematics", type: "external" },
      { title: "Lesson Answers", url: "https://classroom.thenational.academy/lessons/simple-quadratic-and-cubic-sequences-c4ukar", source: "Oak National Academy", type: "external" }
    ],
    'geometric-sequences': [
      { title: "Geometric Seq. Answers", url: "https://corbettmaths.com/wp-content/uploads/2024/11/Geometric-Progressions-Answers.pdf", source: "Corbettmaths", type: "pdf" },
      { title: "Geometric Sequences Answers", url: "https://www.draustinmaths.com/sequences", source: "Dr Austin Maths", type: "external" },
      { title: "Sequences 2 Solutions", url: "https://www.maths4everyone.com/resources/downloads/sequences-2-ks2-sats-solutions-30046.pdf", source: "Maths4Everyone", type: "pdf" },
      { title: "Geometric Series Solutions", url: "https://www.physicsandmathstutor.com/maths-revision/gcse-sequences/", source: "Physics & Maths Tutor", type: "external" }
    ]
  },
  'unit-7': {
    'function-notation': [
      { title: "Functions Textbook Solutions", url: "https://corbettmaths.com/wp-content/uploads/2019/10/Functions-Answers.pdf", source: "Corbettmaths", type: "pdf" },
      { title: "Domain and Range Solutions", url: "https://www.mathsgenie.co.uk/resources/6-domain-and-rangeans.pdf", source: "Maths Genie", type: "pdf" }
    ],
    'composite-functions': [
      { title: "Composite Functions Solutions", url: "https://www.mathsgenie.co.uk/resources/7-composite-and-inverse-functionsans.pdf", source: "Maths Genie", type: "pdf" }
    ],
    'inverse-functions': [
      { title: "Inverse Functions Solutions", url: "https://www.physicsandmathstutor.com/pdf-pages/?pdf=https%3A%2F%2Fpmt.physicsandmathstutor.com%2Fdownload%2FMaths%2FA-level%2FFunctions%2FSolutions%2FInverse-Functions-Solutions.pdf", source: "Physics & Maths Tutor", type: "pdf" }
    ],
    'variation': [
      { title: "Variation Solutions", url: "https://www.physicsandmathstutor.com/pdf-pages/?pdf=https%3A%2F%2Fpmt.physicsandmathstutor.com%2Fdownload%2FMaths%2FGCSE%2FTopic-Qs%2FEdexcel%2FSet-1%2FRatio-and-Proportion%2FHigher%2FDirect-and-Inverse-Proportion%2520(H)-Answers.pdf", source: "Physics & Maths Tutor", type: "pdf" },
      { title: "Variation Models Guide", url: "https://www.savemyexams.com/igcse/maths/cie/international-maths/23/extended/revision-notes/algebra-and-sequences/proportion/variation-models/", source: "Save My Exams", type: "pdf" }
    ]
  }
};

export default solutionResources;