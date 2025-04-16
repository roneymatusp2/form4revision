// videos.ts - All video resources for Cambridge IGCSE International Mathematics (0607)
import { ExternalResource } from '../types';

export const videoResources: { [unitId: string]: { [subtopicSlug: string]: ExternalResource[] } } = {
  'unit-1': {
    'linear-functions': [
      { title: "Intro to Linear Functions", url: "https://www.youtube.com/embed/MXV65i9g1Xg", source: "Khan Academy", type: "video" },
      { title: "Gradient and Y-Intercept", url: "https://www.youtube.com/embed/HdlnBX82jxI", source: "Corbettmaths", type: "video" },
      { title: "Understanding Function Notation", url: "https://www.youtube.com/embed/kvGsIo1TmsM", source: "Khan Academy", type: "video" },
      { title: "Graphing Linear Equations", url: "https://www.youtube.com/embed/2UrcUfBizyw", source: "Khan Academy", type: "video" },
      { title: "Slope-Intercept Form", url: "https://www.youtube.com/embed/IqrY3BcuQsA", source: "Khan Academy", type: "video" },
      { title: "Gradient of a Line", url: "https://www.youtube.com/embed/YtHJP1rZ3pI", source: "Corbettmaths", type: "video" }
    ],
    'parallel-perpendicular-lines': [
      { title: "Slopes of Parallel and Perpendicular Lines", url: "https://www.youtube.com/embed/9hryH94KFJA", source: "Khan Academy", type: "video" }
    ],
    'perpendicular-bisector': [
      { title: "Equation of a Perpendicular Bisector", url: "https://www.youtube.com/embed/qc9gcY-24bk", source: "Mario's Math Tutoring", type: "video" }
    ],
    'distance-formula': [
      { title: "Distance Between Two Points", url: "https://www.youtube.com/embed/q8Qm0Xbqre4", source: "Corbettmaths", type: "video" },
      { title: "Distance Formula and Midpoint Formula", url: "https://www.youtube.com/embed/VnBPATOtXJc", source: "Algebra 1", type: "video" },
      { title: "Length of a Line Segment", url: "https://www.youtube.com/embed/bs6ODTGktDg", source: "Maths Genie", type: "video" },
      { title: "How To Find The Distance Between Two Points", url: "http://www.youtube.com/watch?v=CWUr6Jo6tag", source: "The Organic Chemistry Tutor", type: "video" },
      { title: "How to Use the Distance Formula", url: "http://www.youtube.com/watch?v=0IOEPcAHgi4", source: "Learn Math Tutorials", type: "video" },
      { title: "Using Distance Formula to Find Distance Between Two Points!", url: "http://www.youtube.com/watch?v=otIjqzKlnXc", source: "Mashup Math", type: "video" },
      { title: "Distance Formula", url: "http://www.youtube.com/watch?v=YDvUy5VYm9E", source: "The Organic Chemistry Tutor", type: "video" }
    ],
    'simultaneous-equations': [
      { title: "Solving Simultaneous Equations Graphically", url: "https://www.youtube.com/embed/9hryH94KFJA", source: "Corbettmaths", type: "video" },
      { title: "Systems of Equations with Graphing", url: "https://www.youtube.com/embed/nok99JOhcjo", source: "Khan Academy", type: "video" },
      { title: "Simultaneous Equations using Substitution", url: "https://www.youtube.com/embed/phlus4x0UqM", source: "Corbettmaths", type: "video" },
      { title: "Simultaneous Equations by Substitution", url: "https://www.youtube.com/embed/0waEImwwz7A", source: "FuseSchool", type: "video" },
      { title: "Simultaneous Equations (Elimination Method)", url: "https://www.youtube.com/embed/z_rNIy_bWCU", source: "Corbettmaths", type: "video" },
      { title: "Solving Systems of Equations by Elimination", url: "https://www.youtube.com/embed/i7idZfS8t8w", source: "Khan Academy", type: "video" }
    ]
  },
  'unit-2': {
    'basic-angle-relationships': [
      { title: "Angles at a Point & Straight Line", url: "https://www.youtube.com/watch?v=mdAwUsf0k1s", source: "Corbettmaths", type: "video" },
      { title: "Vertical Angles", url: "https://www.khanacademy.org/math/cc-seventh-grade-math/cc-7th-geometry/cc-7th-angles/v/complementary-and-supplementary-angles", source: "Khan Academy", type: "video" }
    ],
    'parallel-line-angles': [
      { title: "Angles Formed by Parallel Lines & Transversals", url: "https://www.khanacademy.org/math/9th-grade-matatag/x6b946bfca15ae3f5:unit-1/x6b946bfca15ae3f5:parallel-and-perpendicular-lines/v/angles-formed-by-parallel-lines-and-transversals", source: "Khan Academy", type: "video" },
      { title: "Angles (Everything You Need to Know)", url: "https://www.youtube.com/watch?v=VXDn5rwS7-0", source: "OnMaths", type: "video" }
    ],
    'angle-sums': [
      { title: "Angles in Polygons", url: "https://www.youtube.com/watch?v=aDjalmyUXTc", source: "Maths Genie", type: "video" }
    ],
    'polygon-angles': [
      { title: "Interior and Exterior Angles", url: "https://corbettmaths.com/2012/08/10/angles-in-polygons/", source: "Corbettmaths", type: "video" }
    ],
    'angle-vocabulary': [
      { title: "Types of Angles", url: "https://corbettmaths.com/contents/#Angles:%20types%20of%C2%A0%C2%A0%20Video%2038%C2%A0", source: "Corbettmaths", type: "video" },
      { title: "Complementary & Supplementary Angles", url: "https://www.khanacademy.org/math/cc-seventh-grade-math/cc-7th-geometry/cc-7th-angles/v/complementary-and-supplementary-angles", source: "Khan Academy", type: "video" }
    ]
  },
  'unit-3': {
    'bearings': [
      { title: "Bearings (GCSE Maths)", url: "https://www.youtube.com/watch?v=rsFBdL3gRBU", source: "Maths Genie", type: "video" },
      { title: "Bearings Explained", url: "https://www.youtube.com/watch?v=O_vt9yctoZY", source: "Corbettmaths", type: "video" }
    ],
    'pythagoras-theorem': [
      { title: "Pythagoras' Theorem", url: "https://www.youtube.com/watch?v=-BGkrzwbjLI", source: "Maths Genie", type: "video" },
      { title: "Introduction to the Pythagorean Theorem", url: "https://www.youtube.com/watch?v=AA6RfgP-AHU", source: "Khan Academy", type: "video" }
    ],
    'chord-properties': [
      { title: "Circle Theorem – Perpendicular from Centre", url: "https://www.youtube.com/watch?v=YftaFVn7kK4", source: "Wyzant", type: "video" },
      { title: "Circle Chord Theorems", url: "https://www.youtube.com/watch?v=xdK2CyXGlBg", source: "Third Space Learning", type: "video" }
    ],
    'circle-distances': [
      { title: "Distance Between Two Points", url: "https://www.youtube.com/watch?v=q8Qm0Xbqre4", source: "Corbettmaths", type: "video" },
      { title: "Distance Formula", url: "https://www.youtube.com/watch?v=nyZuite17Pc", source: "Khan Academy", type: "video" }
    ]
  },
  'unit-4': {
    'algebraic-fractions-simplification': [
      { title: 'Simplifying Algebraic Fractions', url: 'https://www.youtube.com/watch?v=gMojR-U4NDQ', source: 'Maths Genie', type: 'video' },
      { title: 'Simplifying Algebraic Fractions', url: 'https://www.youtube.com/watch?v=tlKN8NNNxdI', source: 'Corbettmaths', type: 'video' }
    ],
    'algebraic-fractions-addition': [
      { title: 'Adding & Subtracting Algebraic Fractions', url: 'https://www.youtube.com/watch?v=w3JewxYjiNs', source: 'Corbettmaths', type: 'video' },
      { title: 'Algebraic Fractions (Addition/Subtraction)', url: 'https://www.youtube.com/watch?v=khZnlxI6MSw', source: 'Maths Genie', type: 'video' }
    ],
    'algebraic-fractions-multiplication': [
      { title: 'Multiplying & Dividing Algebraic Fractions', url: 'https://www.youtube.com/watch?v=0waEImwwz7A', source: 'Corbettmaths', type: 'video' },
      { title: 'Multiplying and Dividing Algebraic Fractions', url: 'https://www.youtube.com/watch?v=A4xrqaj77y0', source: 'MathsCoach', type: 'video' }
    ],
    'algebraic-fractions-equations': [
      { title: 'Solving Equations involving Algebraic Fractions', url: 'https://www.youtube.com/watch?v=waEkFiYSOhU', source: 'Maths Genie', type: 'video' },
      { title: 'Solve Equations with Algebraic Fractions', url: 'https://www.youtube.com/watch?v=UsR4rcCRBgE', source: 'Hegarty Maths', type: 'video' }
    ],
    'distance-between-points': [
      { title: 'Corbettmaths – Distance Between Two Points', url: 'https://www.youtube.com/watch?v=q8Qm0Xbqre4', source: 'Corbettmaths', type: 'video' },
      { title: 'The Organic Chemistry Tutor - Distance Formula', url: 'http://www.youtube.com/watch?v=YDvUy5VYm9E', source: 'The Organic Chemistry Tutor', type: 'video' },
      { title: 'Learn Math Tutorials - Distance Formula', url: 'http://www.youtube.com/watch?v=0IOEPcAHgi4', source: 'Learn Math Tutorials', type: 'video' },
      { title: 'Brandon Grasley - Length of a Line Segment', url: 'http://www.youtube.com/watch?v=UpI11modN68', source: 'Brandon Grasley', type: 'video'}
    ],
    'midpoints': [
      { title: 'Corbettmaths – Midpoint of a Line', url: 'https://www.youtube.com/watch?v=LqEYBytlhek', source: 'Corbettmaths', type: 'video' },
      { title: 'The Organic Chemistry Tutor - Midpoint Formula', url: 'http://www.youtube.com/watch?v=pzDfd8NXRXk', source: 'The Organic Chemistry Tutor', type: 'video'},
      { title: 'Cognito - How to Find the Midpoint of a Line', url: 'http://www.youtube.com/watch?v=MpJUxVl_Egw', source: 'Cognito', type: 'video'},
      { title: 'Mashup Math - How to Use the Midpoint Formula', url: 'http://www.youtube.com/watch?v=2T7m9uYkcuQ', source: 'Mashup Math', type: 'video'},
      { title: 'Learn Math Tutorials - How To Find The Midpoint', url: 'http://www.youtube.com/watch?v=8lln-wsg0rU', source: 'Learn Math Tutorials', type: 'video'}
    ],
    'gradient-slope': [
      { title: 'Corbettmaths – Gradient of a Line', url: 'https://www.youtube.com/watch?v=YtHJP1rZ3pI', source: 'Corbettmaths', type: 'video' },
      { title: 'Brian McLogan - How to find the slope between two points', url: 'http://www.youtube.com/watch?v=wvzBH46D6ho', source: 'Brian McLogan', type: 'video'},
      { title: 'Math Antics - Slope And Distance', url: 'http://www.youtube.com/watch?v=rpMu98yRk40', source: 'Math Antics', type: 'video'},
      { title: 'Buffington - How to Find Slope from Two Points', url: 'http://www.youtube.com/watch?v=8trWFtwyUMU', source: 'Buffington', type: 'video'}
    ],
    'parallel-perpendicular-lines': [
      { title: "Slopes of Parallel and Perpendicular Lines", url: "https://www.youtube.com/embed/9hryH94KFJA", source: "Khan Academy", type: "video" },
      { title: '1stClassMaths – Parallel & Perpendicular Lines', url: 'https://www.youtube.com/watch?v=S08O1ibtR8s', source: '1stClassMaths', type: 'video' },
      { title: 'The Organic Chemistry Tutor - Writing Equations Parallel/Perpendicular', url: 'http://www.youtube.com/watch?v=LTb2-LE7StE', source: 'The Organic Chemistry Tutor', type: 'video'},
      { title: 'Professor Dave Explains - Graphing Parallel/Perpendicular Lines', url: 'http://www.youtube.com/watch?v=0oe-GqFrYFU', source: 'Professor Dave Explains', type: 'video'},
      { title: 'Mashup Math - Finding Slopes Parallel/Perpendicular', url: 'http://www.youtube.com/watch?v=acsR7w0I__w', source: 'Mashup Math', type: 'video'}
    ],
    'perpendicular-bisector': [
      { title: "Equation of a Perpendicular Bisector", url: "https://www.youtube.com/embed/qc9gcY-24bk", source: "Mario's Math Tutoring", type: "video" },
      { title: 'ExamSolutions – Equation of a Perpendicular Bisector', url: 'https://www.youtube.com/watch?v=yAKWp480CzU', source: 'ExamSolutions', type: 'video' },
      { title: 'Mario\'s Math Tutoring - Finding the Equation', url: 'http://www.youtube.com/watch?v=qc9gcY-24bk', source: "Mario's Math Tutoring", type: 'video'},
      { title: 'GenieTeach - GCE O-Level Perpendicular Bisector', url: 'http://www.youtube.com/watch?v=lqVonU427i0', source: 'GenieTeach', type: 'video'}
    ],
    'length-of-line': [
      { title: 'Khan Academy – Distance Formula', url: 'https://www.youtube.com/watch?v=nyZuite17Pc', source: 'Khan Academy', type: 'video' },
      { title: 'JensenMath - Midpoint & Length of a Line Segment', url: 'http://www.youtube.com/watch?v=vZZD43NlDwE', source: 'JensenMath', type: 'video'},
      { title: 'Brandon Grasley - Finding the length of a line segment', url: 'http://www.youtube.com/watch?v=UpI11modN68', source: 'Brandon Grasley', type: 'video'}
    ],
    'linear-functions': [
      { title: 'Math Antics – Basic Linear Functions', url: 'https://www.youtube.com/watch?v=2Pq2tMGT7gA', source: 'Math Antics', type: 'video' }
    ]
  },
  'unit-5': {
    'quadratic-fundamentals': [
      { title: "Introduction to Quadratic Equations", url: "https://www.youtube.com/watch?v=lsLT3dYY3vM", source: "Khan Academy", type: "video" },
      { title: "Quadratic Expressions Introduction", url: "https://www.youtube.com/watch?v=f5B3PzPZkZ4", source: "Khan Academy", type: "video" }
    ],
    'factorisation-method': [
      { title: "Solving Quadratic Equations by Factorising", url: "https://www.youtube.com/watch?v=m-qyV6C56ec", source: "Maths Genie", type: "video" },
      { title: "Factoring Simple Quadratic Expressions", url: "https://www.youtube.com/watch?v=eF6zYNzlZKQ", source: "Khan Academy", type: "video" }
    ],
    'quadratic-formula': [
      { title: "Using the Quadratic Formula", url: "https://www.youtube.com/watch?v=3J0ccr74LcU", source: "Corbettmaths", type: "video" },
      { title: "The Quadratic Formula", url: "https://www.youtube.com/watch?v=i7idZfS8t8w", source: "Khan Academy", type: "video" }
    ],
    'gdc-quadratics': [
      { title: "Solving Quadratics using a GDC", url: "https://www.youtube.com/watch?v=J7Pj-7POq8E", source: "Casio", type: "video" },
      { title: "Using a Calculator for Quadratics", url: "https://www.youtube.com/watch?v=zpF9nbjOzgo", source: "Mark Willis", type: "video" }
    ],
    'parabola-properties': [
      { title: "Forms and Features of Parabolas", url: "https://www.khanacademy.org/math/algebra/x2f8bb11595b61c86:quadratic-functions-equations/x2f8bb11595b61c86:features-of-quadratic-functions/v/forms-of-quadratic-functions", source: "Khan Academy", type: "video" },
      { title: "Graphing Quadratic Functions (Vertex & Intercepts)", url: "https://www.youtube.com/watch?v=rM_A8t0CV7A", source: "Maths Genie", type: "video" }
    ]
  },
  'unit-6': {
    'linear-sequences': [
      { title: "Intro to Arithmetic Sequences", url: "https://www.khanacademy.org/math/algebra/x2f8bb11595b61c86:sequences/x2f8bb11595b61c86:introduction-to-arithmetic-sequences/v/arithmetic-sequences", source: "Khan Academy", type: "video" },
      { title: "Number Patterns", url: "https://www.youtube.com/watch?v=qaHMiUoZ7b8", source: "Math Antics", type: "video" },
      { title: "Sequences and Finding the Nth Term", url: "https://www.youtube.com/watch?v=Tv9ObyQOGAc", source: "Maths Genie", type: "video" },
      { title: "nth Term of a Linear Sequence", url: "https://www.youtube.com/watch?v=qnVVTBAfNu4", source: "Corbettmaths", type: "video" }
    ],
    'quadratic-sequences': [
      { title: "Quadratic Sequences", url: "https://www.youtube.com/watch?v=GwxK6WMkRqg", source: "Maths Genie", type: "video" },
      { title: "Quadratic Sequences (Version 1)", url: "https://www.youtube.com/watch?v=AL-joUBnEIw", source: "Corbettmaths", type: "video" },
      { title: "Quadratic Sequences (Version 2)", url: "https://www.youtube.com/watch?v=vZl9L0c-Zkg", source: "Corbettmaths", type: "video" },
      { title: "Quadratic Nth Term", url: "https://www.youtube.com/watch?v=5hacfQYS6Ds", source: "GCSE Maths Tutor", type: "video" }
    ],
    'cubic-sequences': [
      { title: "Cubic Sequences", url: "https://www.youtube.com/watch?v=gMc2rjo6OFU", source: "Interactive Maths", type: "video" },
      { title: "Quadratic vs Cubic Sequences", url: "https://www.youtube.com/watch?v=LQcUHHaJwJs", source: "Mindset", type: "video" },
      { title: "Cubic Sequences (nth term)", url: "https://www.youtube.com/watch?v=5hacfQYS6Ds", source: "Rich Maths Academy", type: "video" }
    ],
    'geometric-sequences': [
      { title: "Intro to Geometric Sequences", url: "https://www.khanacademy.org/math/algebra/x2f8bb11595b61c86:sequences/x2f8bb11595b61c86:constructing-geometric-sequences/a/geometric-sequences-review", source: "Khan Academy", type: "video" },
      { title: "Geometric Progressions", url: "https://www.youtube.com/watch?v=Nl0DtMHLX_Y", source: "Corbettmaths", type: "video" },
      { title: "Geometric Sequences (A-Level)", url: "https://www.youtube.com/watch?v=iNEE2ghW19A", source: "Maths Genie", type: "video" },
      { title: "Sequences in Real Life", url: "https://www.youtube.com/watch?v=qaHMiUoZ7b8", source: "Mathantics", type: "video" }
    ]
  },
  'unit-7': {
    'function-notation': [
      { title: "Function Notation Introduction", url: "https://www.youtube.com/embed/ZRQJGecu1fs", source: "GCSE Higher Maths", type: "video" },
      { title: "What is a Function?", url: "https://www.youtube.com/embed/kvGsIo1TmsM", source: "Khan Academy", type: "video" },
      { title: "Functions", url: "https://www.youtube.com/embed/uha8WJ5J-WA", source: "Corbettmaths", type: "video" }
    ],
    'composite-functions': [
      { title: "Composite Functions", url: "https://www.youtube.com/embed/lSRehCwoxs8", source: "GCSE Higher Maths", type: "video" },
      { title: "Composite Functions", url: "https://www.youtube.com/embed/z_rNIy_bWCU", source: "Maths Genie", type: "video" },
      { title: "Composite Functions Introduction", url: "https://www.youtube.com/embed/iy1lmMREZB0", source: "Khan Academy", type: "video" }
    ],
    'inverse-functions': [
      { title: "Inverse Functions", url: "https://www.youtube.com/embed/zpF9nbjResY", source: "Corbettmaths", type: "video" },
      { title: "Inverse Functions", url: "https://www.youtube.com/embed/xOfN_VeTDcE", source: "Corbettmaths", type: "video" },
      { title: "Inverse Functions Introduction", url: "https://www.youtube.com/embed/-9SMitx3QFY", source: "Khan Academy", type: "video" }
    ],
    'variation': [
      { title: "Direct & Inverse Proportion Explained", url: "https://www.youtube.com/embed/rtLKCv5buLw", source: "SaveMyExams", type: "video" },
      { title: "Direct Proportion", url: "https://www.youtube.com/embed/KFXK7-ClVxA", source: "Corbettmaths", type: "video" },
      { title: "Direct & Inverse Variation", url: "https://www.youtube.com/embed/q0DVOFwef5k", source: "Khan Academy", type: "video" },
      { title: "GDC Power Modelling Example", url: "https://www.youtube.com/watch?v=-WBCcpe0Tqo", source: "Cambridge IGCSE", type: "video" }
    ]
  },
  'unit-8': {
    'right-angled-trigonometry': [
      { title: "Introduction to Trigonometry", url: "https://www.youtube.com/embed/F21S9Wpi0y8", source: "Khan Academy", type: "video" },
      { title: "SOHCAHTOA Explained", url: "https://www.youtube.com/embed/wXMO_jYBKPE", source: "Corbettmaths", type: "video" },
      { title: "Trigonometry - Finding Missing Sides", url: "https://www.youtube.com/embed/bALUluXOuTc", source: "Corbettmaths", type: "video" },
      { title: "Trigonometry - Finding Missing Angles", url: "https://www.youtube.com/embed/fP6zFupOxqM", source: "Corbettmaths", type: "video" }
    ],
    'angles-elevation-depression': [
      { title: "Angles of Elevation and Depression", url: "https://www.youtube.com/embed/_WllQRr_n7I", source: "Khan Academy", type: "video" }
    ]
  }
};

export default videoResources;