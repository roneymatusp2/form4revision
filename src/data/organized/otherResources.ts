// otherResources.ts - All other resources for Cambridge IGCSE International Mathematics (0607)
import { ExternalResource } from '../types';

export const otherResources: { [unitId: string]: { [subtopicSlug: string]: ExternalResource[] } } = {
  'unit-1': {
    'distance-formula': [
      { title: "Distance Formula Cheat Sheet", url: "https://pmt.physicsandmathstutor.com/download/Maths/A-level/Pure/Coordinate-Geometry-1/Cheat-Sheets/Straight%20Line%20Graphs.pdf", source: "Physics & Maths Tutor", type: "pdf" },
      { title: "BYJU'S: Distance Formula Explanation", url: "https://byjus.com/maths/distance-between-two-points-formula/", source: "BYJU'S", type: "external"},
      { title: "Cuemath: Distance Between Two Points Explanation", url: "https://www.cuemath.com/geometry/distance-between-two-points/", source: "Cuemath", type: "external"},
      { title: "CK-12: Distance Formula Explanation", url: "https://flexbooks.ck12.org/cbook/ck-12-cbse-math-class-10/section/7.2/related/lesson/distance-formula-in-the-coordinate-plane-geom/", source: "CK-12 Foundation", type: "external"},
      { title: "HowStuffWorks: Distance Formula Explanation", url: "https://science.howstuffworks.com/math-concepts/distance-formula.htm", source: "HowStuffWorks", type: "external"},
      { title: "AMSI: Introduction to Coordinate Geometry PDF", url: "https://amsi.org.au/teacher_modules/pdfs/Introduction_to_coordinate_geometry.pdf", source: "AMSI", type: "pdf"},
      { title: "Khan Academy: Distance Formula Interactive Exercise", url: "https://www.khanacademy.org/math/geometry/hs-geo-analytic-geometry/hs-geo-distance-and-midpoints/e/distance_formula", source: "Khan Academy", type: "external" },
      { title: "ProjectMaths: Discovering Distance Formula PDF", url: "https://www.projectmaths.ie/documents/T&L/TheDistanceFormula.pdf", source: "ProjectMaths", type: "pdf"},
      { title: "FCT EMIS: Distance Formula Lesson Plan PDF", url: "https://fctemis.org/notes/18042_Cordinate%20Geometry%20I.pdf", source: "FCT EMIS", type: "pdf"}
    ],
    'simultaneous-equations': [
      { title: "Interactive Graphing Tool for Simultaneous Equations", url: "https://www.khanacademy.org/math/algebra/x2f8bb11595b61c86:systems-of-equations/x2f8bb11595b61c86:solving-systems-with-graphing/e/graphing_systems_of_equations", source: "Khan Academy", type: "external" }
    ]
  },
  'unit-2': {
    'basic-angle-relationships': [
    ],
    'parallel-line-angles': [
      { title: "Transum Angles in Parallel Lines Interactive Exercise", url: "https://www.transum.org/software/SW/Starter_of_the_day/Students/Angles_Parallel.asp", source: "Transum", type: "external" }
    ],
    'angle-sums': [
      { title: "GeoGebra Polygon Angle Sum Explorer", url: "https://www.geogebra.org/m/qMdj8Std", source: "GeoGebra", type: "external" }
    ],
    'polygon-angles': [
      { title: "Visnos Polygon Explorer", url: "https://www.visnos.com/demos/polygon-explorer", source: "Visnos", type: "external" },
      { title: "GeoGebra Interior/Exterior Angles Applet", url: "https://www.geogebra.org/m/rexj7GJd", source: "GeoGebra", type: "external" }
    ],
    'angle-vocabulary': [
      { title: "ThatQuiz Angle Vocabulary Matching Quiz", url: "https://www.thatquiz.org/tq/preview?c=u8m72rik&s=ms42r9", source: "ThatQuiz", type: "external" },
      { title: "Math is Fun Angle Tester", url: "https://www.mathsisfun.com/angles.html", source: "Math is Fun", type: "external" }
    ]
  },
  'unit-3': {
    'bearings': [
      { title: "Bearings Exam", url: "https://www.onmaths.com/resource/bearings/", source: "OnMaths", type: "external" },
      { title: "Bearings Interactive Guide", url: "https://www.bbc.co.uk/bitesize/guides/zshqfcw/revision/1", source: "BBC Bitesize", type: "external" }
    ],
    'pythagoras-theorem': [
      { title: "Pythagorean Theorem Practice", url: "https://www.khanacademy.org/math/cc-eighth-grade-math/cc-8th-geometry/cc-8th-pythagorean-theorem/e/pythagorean_theorem_1", source: "Khan Academy", type: "external" }
    ],
    'chord-properties': [
      { title: "Chords & Centre Distance Revision", url: "https://www.savemyexams.com/igcse/maths/cambridge-cie/international-maths-extended/revision-notes/geometry/circle-theorems/theorems-with-chords--tangents/", source: "Save My Exams", type: "pdf" },
      { title: "Circle Geometry Interactive", url: "https://www.geogebra.org/m/umMnKPjq", source: "GeoGebra", type: "external" }
    ],
    'circle-distances': [
      { title: "Distance Between Points Exercise", url: "https://www.khanacademy.org/math/geometry/hs-geo-analytic-geometry/hs-geo-distance-and-midpoints/e/distance_formula", source: "Khan Academy", type: "external" }
    ]
  },
  'unit-4': {
    'algebraic-fractions-simplification': [
      { title: 'Simplifying Rational Expressions', url: 'https://www.khanacademy.org/math/precalculus/x9e81a4f98389efdf:rational-functions/x9e81a4f98389efdf:reducing-rational-expressions-to-lowest-terms/v/simplifying-rational-expressions-introduction', source: 'Khan Academy', type: 'external' },
      { title: 'Interactive Algebraic Fractions', url: 'https://www.westiesworkshop.com/course-support/algebra/algebraic-fractions/', source: 'Westie\'s Workshop', type: 'external' }
    ],
    'algebraic-fractions-addition': [
      { title: 'Adding & Subtracting Rational Expressions', url: 'https://www.khanacademy.org/math/precalculus/x9e81a4f98389efdf:rational-functions/x9e81a4f98389efdf:adding-and-subtracting-rational-expressions/a/adding-subtracting-rational-expressions-advanced', source: 'Khan Academy', type: 'external' },
      { title: 'MME Interactive Learning', url: 'https://mmerevise.co.uk/a-level-maths-revision/algebraic-fractions/', source: 'MME Revise', type: 'external' }
    ],
    'algebraic-fractions-multiplication': [
      { title: 'Maths Genie Online Quiz', url: 'https://www.mathsgenie.co.uk/algebraic-fractions.html', source: 'Maths Genie', type: 'external' },
      { title: 'Complete Algebraic Fractions Resources', url: 'https://sites.google.com/online.island.edu.hk/maths/igcse/unit-5-algebra-2-quadratics/algebraic-fractions', source: 'IS Mathematics', type: 'external' }
    ],
    'algebraic-fractions-equations': [
      { title: 'Solving Equations with Algebraic Fractions Guide', url: 'https://www.savemyexams.com/gcse/maths/aqa/22/higher/revision-notes/algebra/algebraic-fractions/solving-equations/', source: 'Save My Exams', type: 'external' },
      { title: 'Khan Academy Fractional Equations', url: 'https://www.khanacademy.org/math/cc-sixth-grade-math/cc-6th-equations-and-inequalities/cc-6th-one-step-mult-div-equations/v/one-step-multiplication-fractional-coefficients', source: 'Khan Academy', type: 'external' }
    ],
    'distance-between-points': [
      { title: 'Khan Academy – Distance Formula Interactive', url: 'https://www.khanacademy.org/math/geometry/hs-geo-analytic-geometry/hs-geo-distance-and-midpoints/e/distance_formula', source: 'Khan Academy', type: 'external' },
      { title: 'Maths Centre - Coordinate Geometry Overview (inc Distance)', url: 'https://www.mathscentre.co.nz/downloads/assets/f42e/2.pdf', source: 'Maths Centre', type: 'pdf'}
    ],
    'midpoints': [
      { title: 'Khan Academy – Midpoint Formula Interactive', url: 'https://www.khanacademy.org/math/geometry/hs-geo-analytic-geometry/hs-geo-distance-and-midpoints/e/midpoint_formula', source: 'Khan Academy', type: 'external' },
      { title: 'Maths Centre - Coordinate Geometry Overview (inc Midpoint)', url: 'https://www.mathscentre.co.nz/downloads/assets/f42e/2.pdf', source: 'Maths Centre', type: 'pdf'}
    ],
    'gradient-slope': [
      { title: 'GeoGebra Graphing Calculator', url: 'https://www.geogebra.org/graphing', source: 'GeoGebra', type: 'external' },
      { title: 'Scoilnet - Coordinate Geometry Notes (inc Slope)', url: 'https://www.scoilnet.ie/uploads/resources/35835/35603.pdf', source: 'Scoilnet', type: 'pdf'},
      { title: 'CSEC Math Tutor - Coordinate Geometry Notes (inc Gradient)', url: 'https://www.csecmathtutor.com/uploads/1/1/4/4/11440199/coordinate_geometry.pdf', source: 'CSEC Math Tutor', type: 'pdf'}
    ],
    'parallel-perpendicular-lines': [
      { title: 'Khan Academy – Parallel & Perpendicular Line Equations Interactive', url: 'https://www.khanacademy.org/math/geometry/hs-geo-analytic-geometry/hs-geo-parallel-perpendicular-eq/e/writing-equations-for-parallel-or-perpendicular-lines', source: 'Khan Academy', type: 'external' },
      { title: 'Big Ideas Math - Equations of Parallel/Perp Lines Notes (Sec 3.5)', url: 'https://ca01001129.schoolwires.net/cms/lib/CA01001129/Centricity/Domain/830/Chapter3sect5notes.pdf', source: 'Big Ideas Math', type: 'pdf'}
    ],
    'perpendicular-bisector': [
      { title: 'Desmos – Line Visualizer', url: 'https://www.desmos.com/calculator', source: 'Desmos', type: 'external' },
      { title: 'Big Ideas Math - Perpendicular/Angle Bisectors Notes (Ch 6.1)', url: 'https://static.bigideasmath.com/protected/content/ipe/aga22cc/aga22cc_geometry_ipe_06_01.pdf', source: 'Big Ideas Math', type: 'pdf'}
    ],
    'length-of-line': [
      { title: 'Save My Exams – Length of a Line Revision Notes', url: 'https://www.savemyexams.com/igcse/maths/cie/international-maths/23/core/revision-notes/coordinate-geometry-and-graphs/coordinates-and-straight-line-graphs/length-of-a-line/', source: 'Save My Exams', type: 'pdf' },
      { title: 'MathWorksheets4Kids - Length of a Line Segment Worksheets Page', url: 'https://www.mathworksheets4kids.com/length-line-segment.php', source: 'MathWorksheets4Kids', type: 'external'}
    ],
    'linear-functions': [
      { title: 'OnMaths – Parallel and Perpendicular Lines Masterclass', url: 'https://www.onmaths.com/resource/parallel-and-perpendicular-lines/', source: 'OnMaths', type: 'external' }
    ]
  },
  'unit-5': {
    'quadratic-fundamentals': [
      { title: "Quadratic Equation Grapher", url: "https://www.desmos.com/calculator", source: "Desmos", type: "external" },
      { title: "Khan Academy Quadratics Course", url: "https://www.khanacademy.org/math/algebra-basics/alg-basics-quadratics-and-polynomials", source: "Khan Academy", type: "external" }
    ],
    'factorisation-method': [
      { title: "Factorising Quadratics Puzzle", url: "https://www.maths4everyone.com/resources/Factorise_Quadratics_Puzzle.pdf", source: "Maths4Everyone", type: "pdf" },
      { title: "Maths Genie Quadratics Resources", url: "https://www.mathsgenie.co.uk/solving-quadratics.html", source: "Maths Genie", type: "external" }
    ],
    'quadratic-formula': [
      { title: "Sum & Product of Roots Explorer", url: "https://www.geogebra.org/m/hsndnnug", source: "GeoGebra", type: "external" },
      { title: "Quadratic Formula Applications", url: "https://www.khanacademy.org/math/algebra/x2f8bb11595b61c86:quadratic-functions-equations/x2f8bb11595b61c86:standard-form-quadratic/v/application-problem-with-quadratic-formula", source: "Khan Academy", type: "external" }
    ],
    'gdc-quadratics': [
      { title: "Using Technology to Solve Quadratics", url: "https://mathshelpboard.wordpress.com/2013/08/15/how-to-use-equation-solver-in-gdc-to-solve-quadratic-equation/", source: "Ms Zhang\'s Math Help Board", type: "external" },
      { title: "Online Graph Solver", url: "https://www.desmos.com/calculator", source: "Desmos", type: "external" },
      { title: "Interactive Quadratic Solver", url: "https://www.onmaths.com/resource/solving-quadratic-equations/", source: "OnMaths", type: "external" }
    ],
    'parabola-properties': [
      { title: "Parabola Explorer (Vertex Form)", url: "https://www.desmos.com/calculator/fmxds1uvhe", source: "Desmos", type: "external" },
      { title: "Graphing Parabolas Using Roots and Vertex", url: "https://www.khanacademy.org/math/algebra/x2f8bb11595b61c86:quadratic-functions-equations/x2f8bb11595b61c86:standard-form-quadratic/v/graphing-a-parabola-using-roots-and-vertex", source: "Khan Academy", type: "external" }
    ]
  },
  'unit-6': {
    'linear-sequences': [
      { title: "Linear Sequence Generator", url: "https://mathsbot.com/tables/nthTerm", source: "MathsBot", type: "external" },
      { title: "Sequences Online Test", url: "https://www.onmaths.com/sequences", source: "OnMaths", type: "external" },
      { title: "Arithmetic Sequence Interactive Practice", url: "https://www.khanacademy.org/math/algebra/x2f8bb11595b61c86:sequences/x2f8bb11595b61c86:introduction-to-arithmetic-sequences/e/arithmetic_sequences_2", source: "Khan Academy", type: "external" }
    ],
    'quadratic-sequences': [
      { title: "Quadratic Sequence Question Generator", url: "https://mathsbot.com/questionGenerator", source: "MathsBot", type: "external" },
      { title: "Sequence Generator", url: "https://www.transum.org/Maths/Activity/Sequences/", source: "Transum", type: "external" },
      { title: "Quadratic Sequences Interactive Game", url: "https://www.geogebra.org/m/qMdj8Std", source: "GeoGebra", type: "external" }
    ],
    'cubic-sequences': [
      { title: "Advanced Sequence Generator", url: "https://mathsbot.com/questionGenerator", source: "MathsBot", type: "external" },
      { title: "Desmos Graphing Calculator", url: "https://www.desmos.com/calculator", source: "Desmos", type: "external" },
      { title: "Josephus Problem Activity", url: "https://www.draustinmaths.com/sequences", source: "Dr Austin Maths", type: "external" }
    ],
    'geometric-sequences': [
      { title: "Geometric Sequence Generator", url: "https://mathsbot.com/questionGenerator", source: "MathsBot", type: "external" },
      { title: "Compound Interest Simulators", url: "https://www.desmos.com/calculator", source: "Desmos", type: "external" },
      { title: "Interactive Practice", url: "https://www.khanacademy.org/math/algebra/x2f8bb11595b61c86:sequences/x2f8bb11595b61c86:introduction-to-geometric-sequences/e/geometric_sequences_2", source: "Khan Academy", type: "external" },
      { title: "Fibonacci & Beyond", url: "https://mathsbot.com/tools/fibonacci", source: "MathsBot", type: "external" }
    ]
  },
  'unit-7': {
    'function-notation': [
      { title: "Interactive Function Notation", url: "https://learn.desmos.com/functions", source: "Desmos", type: "external" },
      { title: "Khan Academy Function Exercises", url: "https://www.khanacademy.org/math/algebra/x2f8bb11595b61c86:functions/x2f8bb11595b61c86:intro-to-functions/e/evaluating-functions", source: "Khan Academy", type: "external" }
    ],
    'composite-functions': [
      { title: "Composite Functions Explorer", url: "https://www.desmos.com/calculator/composite-functions", source: "Desmos", type: "external" },
      { title: "Khan Academy Composite Practice", url: "https://www.khanacademy.org/math/algebra/x2f8bb11595b61c86:functions/x2f8bb11595b61c86:composite-functions/e/composite-functions", source: "Khan Academy", type: "external" }
    ],
    'inverse-functions': [
      { title: "Inverse Functions Visualizer", url: "https://www.desmos.com/calculator/inverse-functions", source: "Desmos", type: "external" },
      { title: "Khan Academy Inverse Practice", url: "https://www.khanacademy.org/math/algebra/x2f8bb11595b61c86:functions/x2f8bb11595b61c86:inverse-functions/e/inverse-functions", source: "Khan Academy", type: "external" },
      { title: "Inverse Function Example", url: "https://www.desmos.com/calculator/43oqownceb", source: "Desmos", type: "external" }
    ],
    'variation': [
      { title: "Variation Models Interactive", url: "https://www.desmos.com/calculator/variation", source: "Desmos", type: "external" },
      { title: "Khan Academy Variation Practice", url: "https://www.khanacademy.org/math/algebra/x2f8bb11595b61c86:direct-inverse-variation/e/direct_and_inverse_variation", source: "Khan Academy", type: "external" },
      { title: "Modeling Data with Desmos", url: "https://www.desmos.com/calculator", source: "Desmos", type: "external" }
    ]
  }
};

// Cambridge Official Resources
export const officialResources: ExternalResource[] = [
  { title: "Cambridge IGCSE 0607 Syllabus 2023-2024", url: "https://www.cambridgeinternational.org/Images/597050-2023-2024-syllabus.pdf", source: "Cambridge International", type: "pdf" },
  { title: "Cambridge IGCSE 0607 Syllabus 2025-2027", url: "https://www.cambridgeinternational.org/Images/662472-2025-2027-syllabus.pdf", source: "Cambridge International", type: "pdf" },
  { title: "Cambridge IGCSE Learner Guide", url: "https://www.cambridgeinternational.org/Images/688522-learner-guide-for-cambridge-igcse-international-mathematics-0607-.pdf", source: "Cambridge International", type: "pdf" }
];

export default otherResources;