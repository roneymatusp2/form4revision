// Cambridge IGCSE International Mathematics (0607) Extended Curriculum Resources

export interface ExternalResource {
  title: string;
  url: string;
  source: string;
  type?: 'pdf' | 'video' | 'external';
}

// Corrected: This represents the structure for ONE subtopic's resources
export interface SubtopicResourceSet {
  videos: ExternalResource[];
  exercises: ExternalResource[];
  solutions: ExternalResource[];
  otherResources: ExternalResource[];
}

// Corrected: This maps unit IDs to an object where keys are subtopic slugs
// and values are the SubtopicResourceSet for that specific subtopic.
export interface CurriculumResourcesType {
  [unitId: string]: {
    [subtopicSlug: string]: SubtopicResourceSet;
  };
}

export const curriculumResources: CurriculumResourcesType = {
  'unit-1': {
    'natural-numbers': {
      videos: [
        // Removed broken videos
      ],
      exercises: [
        // Removed broken links
        { title: "Reciprocals", url: "https://corbettmaths.com/wp-content/uploads/2013/02/reciprocals-pdf1.pdf", source: "Corbettmaths", type: "pdf" },
        { title: "Factors, Multiples and Primes Revision Grid", url: "https://www.draustinmaths.com/_files/ugd/7ac124_ee92d1afd48c47ccbd2c86598bb2de3f.pdf", source: "Dr. Austin Maths", type: "pdf" }
      ],
      solutions: [],
      otherResources: []
    },
    'standard-form': {
      videos: [],
      exercises: [
        // Removed broken links
        { title: "Standard Form Questions", url: "https://www.mathsgenie.co.uk/resources/5-standard-form.pdf", source: "Maths Genie", type: "pdf" }
      ],
      solutions: [
        { title: "Standard Form Answers", url: "https://www.mathsgenie.co.uk/resources/5-standard-formans.pdf", source: "Maths Genie", type: "pdf" }
      ],
      otherResources: [
        // Removed broken links
      ]
    },
    'common-factors': {
      videos: [],
      exercises: [
        // Removed broken links
        { title: "HCF and LCM Questions", url: "https://www.mathsgenie.co.uk/resources/4-HCF-and-LCM.pdf", source: "Maths Genie", type: "pdf" }
      ],
      solutions: [
        { title: "HCF and LCM Answers", url: "https://www.mathsgenie.co.uk/resources/4-HCF-and-LCMans.pdf", source: "Maths Genie", type: "pdf" }
      ],
      otherResources: []
    },
    'four-operations': {
      videos: [],
      exercises: [
        // Removed broken links
        { title: "Multiplying Fractions", url: "https://corbettmaths.com/wp-content/uploads/2013/02/multiplying-fractions-pdf.pdf", source: "Corbettmaths", type: "pdf" },
        { title: "Dividing Fractions", url: "https://corbettmaths.com/wp-content/uploads/2013/02/dividing-fractions-pdf.pdf", source: "Corbettmaths", type: "pdf" },
        { title: "BIDMAS Practice", url: "https://www.mathsgenie.co.uk/resources/1-the-order-of-operations.pdf", source: "Maths Genie", type: "pdf" },
        { title: "Fractions Practice", url: "https://www.mathsgenie.co.uk/resources/3-fractions.pdf", source: "Maths Genie", type: "pdf" },
        { title: "Fractions Answers", url: "https://www.mathsgenie.co.uk/resources/3-fractionsans.pdf", source: "Maths Genie", type: "pdf" }
      ],
      solutions: [],
      otherResources: []
    },
    'surds': {
      videos: [],
      exercises: [
        { title: "Surds Worksheet", url: "https://corbettmaths.com/wp-content/uploads/2013/02/surds-pdf1.pdf", source: "Corbettmaths", type: "pdf" },
        // Removed broken links
        { title: "Surds Questions", url: "https://www.mathsgenie.co.uk/resources/7-surds.pdf", source: "Maths Genie", type: "pdf" }
      ],
      solutions: [],
      otherResources: []
    },
    'decimals-fractions': {
      videos: [],
      exercises: [
        // Removed broken links
        { title: "Ordering FDP Worksheet", url: "https://corbettmaths.com/wp-content/uploads/2013/02/ordering-fdp-pdf.pdf", source: "Corbettmaths", type: "pdf" },
        { title: "Recurring Decimals Worksheet", url: "https://corbettmaths.com/wp-content/uploads/2013/02/recurring-decimals-pdf.pdf", source: "Corbettmaths", type: "pdf" }
        // Removed other broken links
      ],
      solutions: [],
      otherResources: []
    },
    'ratio-proportion': {
      videos: [],
      exercises: [
        // Removed broken links
        { title: "Writing and Simplifying Ratio", url: "https://www.mathsgenie.co.uk/resources/3-writing-and-simplifying-ratio.pdf", source: "Maths Genie", type: "pdf" },
        { title: "Sharing Ratio", url: "https://www.mathsgenie.co.uk/resources/3-sharing-ratio.pdf", source: "Maths Genie", type: "pdf" },
        { title: "Ratio Practice Questions", url: "https://www.maths4everyone.com/resources/downloads/ratio-gcse-9-1-practice-questions-30262.pdf", source: "Maths4Everyone", type: "pdf" }
      ],
      solutions: [],
      otherResources: []
    },
    'linear-functions': {
      videos: [
        { title: "Intro to Linear Functions", url: "https://www.youtube.com/embed/MXV65i9g1Xg", source: "Khan Academy", type: "video" },
        // Removed broken videos
        { title: "Gradient and Y-Intercept", url: "https://www.youtube.com/embed/HdlnBX82jxI", source: "Corbettmaths", type: "video" },
        // Removed broken videos
        { title: "Understanding Function Notation", url: "https://www.youtube.com/embed/kvGsIo1TmsM", source: "Khan Academy", type: "video" },
        { title: "Graphing Linear Equations", url: "https://www.youtube.com/embed/2UrcUfBizyw", source: "Khan Academy", type: "video" },
        // New videos from provided list
        { title: "Slope-Intercept Form", url: "https://www.youtube.com/embed/IqrY3BcuQsA", source: "Khan Academy", type: "video" },
        { title: "Gradient of a Line", url: "https://www.youtube.com/embed/YtHJP1rZ3pI", source: "Corbettmaths", type: "video" }
      ],
      exercises: [
        { title: "Straight Line Graphs", url: "https://www.mathsgenie.co.uk/resources/16-graphs.pdf", source: "Maths Genie", type: "pdf" }
        // Removed broken links
      ],
      solutions: [
        // Removed broken links
      ],
      otherResources: [
        // Removed broken links
      ]
    },
    'parallel-perpendicular-lines': {
      videos: [
        // New videos from provided list
        { title: "Slopes of Parallel and Perpendicular Lines", url: "https://www.youtube.com/embed/9hryH94KFJA", source: "Khan Academy", type: "video" }
      ],
      exercises: [
        { title: "Parallel and Perpendicular Lines", url: "https://www.mathsgenie.co.uk/resources/6-parallel-and-perpendicular-lines.pdf", source: "Maths Genie", type: "pdf" }
      ],
      solutions: [],
      otherResources: []
    },
    'perpendicular-bisector': {
      videos: [
        // New videos from provided list
        { title: "Equation of a Perpendicular Bisector", url: "https://www.youtube.com/embed/qc9gcY-24bk", source: "Mario's Math Tutoring", type: "video" }
      ],
      exercises: [],
      solutions: [],
      otherResources: []
    },
    'distance-formula': {
      videos: [
        { title: "Distance Between Two Points", url: "https://www.youtube.com/embed/q8Qm0Xbqre4", source: "Corbettmaths", type: "video" },
        // New videos from provided list
        { title: "Distance Formula and Midpoint Formula", url: "https://www.youtube.com/embed/VnBPATOtXJc", source: "Algebra 1", type: "video" },
        { title: "Length of a Line Segment", url: "https://www.youtube.com/embed/bs6ODTGktDg", source: "Maths Genie", type: "video" }
      ],
      exercises: [
        { title: "Distance Between Two Points", url: "https://corbettmaths.com/wp-content/uploads/2019/01/Distance-between-2-points-pdf.pdf", source: "Corbettmaths", type: "pdf" }
      ],
      solutions: [],
      otherResources: [
        { title: "Distance Formula", url: "https://pmt.physicsandmathstutor.com/download/Maths/A-level/Pure/Coordinate-Geometry-1/Cheat-Sheets/Straight%20Line%20Graphs.pdf", source: "Physics & Maths Tutor", type: "pdf" }
      ]
    },
    'simultaneous-equations': {
      videos: [
        { title: "Solving Systems of Equations", url: "https://www.youtube.com/embed/nok99JOhcjo", source: "Khan Academy", type: "video" },
        // New videos from provided list
        { title: "Solving Simultaneous Equations by Elimination", url: "https://www.youtube.com/embed/phlus4x0UqM", source: "HackingMaths", type: "video" }
      ],
      exercises: [
        { title: "Simultaneous Equations", url: "https://www.mathsgenie.co.uk/resources/5-simultaneous-equations.pdf", source: "Maths Genie", type: "pdf" }
        // Removed broken links
      ],
      solutions: [
        { title: "Simultaneous Equations Answers", url: "https://www.mathsgenie.co.uk/resources/5-simultaneous-equationsans.pdf", source: "Maths Genie", type: "pdf" }
        // Removed broken links
      ],
      otherResources: [
        // Removed broken links
      ]
    }
  },
  'unit-2': {
    'exponents-indices': {
      videos: [],
      exercises: [
        { title: "Indices Worksheet", url: "https://corbettmaths.com/wp-content/uploads/2013/02/indices-pdf.pdf", source: "Corbettmaths", type: "pdf" },
        // Removed broken links
        { title: "Indices Questions", url: "https://www.mathsgenie.co.uk/resources/4-indices.pdf", source: "Maths Genie", type: "pdf" },
        { title: "Fractional and Negative Indices", url: "https://www.mathsgenie.co.uk/resources/6-fractional-and-negative-indices.pdf", source: "Maths Genie", type: "pdf" }
        // Removed broken links
      ],
      solutions: [],
      otherResources: []
    },
    'expansion-brackets': {
      videos: [],
      exercises: [
        { title: "Expanding Single Brackets", url: "https://corbettmaths.com/wp-content/uploads/2013/02/expanding-brackets-pdf1.pdf", source: "Corbettmaths", type: "pdf" },
        // Removed broken links
        { title: "Expanding and Factorising", url: "https://www.mathsgenie.co.uk/resources/4-expanding-and-factorising.pdf", source: "Maths Genie", type: "pdf" },
        { title: "Expanding Triple Brackets", url: "https://www.mathsgenie.co.uk/resources/6-expanding-triple-brackets.pdf", source: "Maths Genie", type: "pdf" }
      ],
      solutions: [],
      otherResources: []
    },
    'factorisation': {
      videos: [],
      exercises: [
        // Removed broken links
        { title: "Factorising Quadratics", url: "https://corbettmaths.com/wp-content/uploads/2013/02/factorising-quadratics-pdf1.pdf", source: "Corbettmaths", type: "pdf" },
        { title: "Difference of Two Squares", url: "https://corbettmaths.com/wp-content/uploads/2013/02/difference-between-two-squares-pdf.pdf", source: "Corbettmaths", type: "pdf" },
        // Removed broken links
        { title: "Expanding and Factorising Quadratics", url: "https://www.mathsgenie.co.uk/resources/5-expanding-and-factorising-quadratics.pdf", source: "Maths Genie", type: "pdf" },
        { title: "Factorising Harder Quadratics", url: "https://www.mathsgenie.co.uk/resources/7-factorising-harder-quadratics.pdf", source: "Maths Genie", type: "pdf" }
      ],
      solutions: [],
      otherResources: []
    },
    'basic-angle-relationships': {
      videos: [
        { title: "Angles at the Intersection of Two Lines", url: "https://www.youtube.com/embed/nuPgmrpGdXQ", source: "Khan Academy", type: "video" }
      ],
      exercises: [
        { title: "Missing Angles Practice Questions", url: "https://corbettmaths.com/wp-content/uploads/2024/01/Missing-Angles.pdf", source: "Corbettmaths", type: "pdf" }
      ],
      solutions: [
        { title: "Missing Angles Mark Scheme", url: "https://corbettmaths.com/wp-content/uploads/2024/01/missing-angles-answers.pdf", source: "Corbettmaths", type: "pdf" }
      ],
      otherResources: []
    },
    'parallel-line-angles': {
      videos: [
        { title: "Angles, Parallel Lines & Transversals", url: "https://www.youtube.com/embed/fuBUbiDJuuY", source: "Khan Academy", type: "video" }
      ],
      exercises: [
        { title: "Angles in Parallel Lines Worksheet", url: "https://corbettmaths.com/wp-content/uploads/2024/02/Angles-Parallel-Lines.pdf", source: "Corbettmaths", type: "pdf" }
      ],
      solutions: [
        { title: "Angles in Parallel Lines Mark Scheme", url: "https://corbettmaths.com/wp-content/uploads/2024/02/Angles-Parallel-Answers.pdf", source: "Corbettmaths", type: "pdf" }
      ],
      otherResources: [
        { title: "Interactive Parallel Lines Diagram", url: "https://www.geogebra.org/m/BAymZ5AG", source: "GeoGebra", type: "external" }
      ]
    },
    'angle-sums': {
      videos: [
        { title: "Sum of Interior Angles of a Polygon", url: "https://www.youtube.com/embed/u8aQG2xIZgM", source: "Khan Academy", type: "video" }
      ],
      exercises: [
        { title: "Angles in Polygons Worksheet", url: "https://corbettmaths.com/wp-content/uploads/2023/09/Angles-Polygons.pdf", source: "Corbettmaths", type: "pdf" }
      ],
      solutions: [
        { title: "Angles in Polygons Mark Scheme", url: "https://corbettmaths.com/wp-content/uploads/2023/09/Angles-Polygons-Answers.pdf", source: "Corbettmaths", type: "pdf" }
      ],
      otherResources: []
    },
    'polygon-angles': {
      videos: [
        { title: "Angles in Polygons (Interior & Exterior)", url: "https://www.youtube.com/embed/gVo8ZrtlSp0", source: "Corbettmaths", type: "video" }
      ],
      exercises: [
        { title: "Angles in Polygons Worksheet", url: "https://corbettmaths.com/wp-content/uploads/2023/09/Angles-Polygons.pdf", source: "Corbettmaths", type: "pdf" }
      ],
      solutions: [
        { title: "Angles in Polygons Mark Scheme", url: "https://corbettmaths.com/wp-content/uploads/2023/09/Angles-Polygons-Answers.pdf", source: "Corbettmaths", type: "pdf" }
      ],
      otherResources: []
    },
    'angle-vocabulary': {
      videos: [
        { title: "Types of Angles", url: "https://www.youtube.com/embed/PHA3BC9o2q0", source: "Corbettmaths", type: "video" }
      ],
      exercises: [
        { title: "Types of Angle Worksheet", url: "https://corbettmaths.com/wp-content/uploads/2018/09/Types-of-Angle-pdf.pdf", source: "Corbettmaths", type: "pdf" }
      ],
      solutions: [
        { title: "Types of Angle Mark Scheme", url: "https://corbettmaths.com/wp-content/uploads/2018/09/Types-of-Angle-Answers.pdf", source: "Corbettmaths", type: "pdf" }
      ],
      otherResources: []
    }
  },
  'unit-3': {
    'units-measurement': {
      videos: [],
      exercises: [
        { title: "Metric Units Worksheet", url: "https://corbettmaths.com/wp-content/uploads/2013/02/metric-units-pdf1.pdf", source: "Corbettmaths", type: "pdf" },
        // Removed broken links
        { title: "Conversions and Units", url: "https://www.mathsgenie.co.uk/resources/3-conversions-and-units.pdf", source: "Maths Genie", type: "pdf" },
        // Removed broken links
        { title: "Metric Units", url: "https://corbettmaths.com/wp-content/uploads/2020/05/Metric-Units.pdf", source: "Corbettmaths", type: "pdf" }
      ],
      solutions: [],
      otherResources: []
    },
    'perimeter-area': {
      videos: [],
      exercises: [
        { title: "Perimeter Worksheet", url: "https://corbettmaths.com/wp-content/uploads/2013/02/perimeter-pdf1.pdf", source: "Corbettmaths", type: "pdf" },
        { title: "Area of Rectangle", url: "https://corbettmaths.com/wp-content/uploads/2013/02/area-of-a-rectangle-pdf1.pdf", source: "Corbettmaths", type: "pdf" },
        // Removed broken links
        { title: "Area of Parallelogram", url: "https://corbettmaths.com/wp-content/uploads/2013/02/area-of-a-parallelogram-pdf1.pdf", source: "Corbettmaths", type: "pdf" },
        // Removed broken links
        { title: "Area of Compound Shapes", url: "https://corbettmaths.com/wp-content/uploads/2013/02/area-of-compound-shapes-pdf1.pdf", source: "Corbettmaths", type: "pdf" },
        { title: "Area and Perimeter", url: "https://www.mathsgenie.co.uk/resources/2-area-and-perimeter.pdf", source: "Maths Genie", type: "pdf" },
        { title: "Area of Compound Shapes", url: "https://www.mathsgenie.co.uk/resources/37_area-of-compound-shapes.pdf", source: "Maths Genie", type: "pdf" },
        // Removed broken links
        { title: "Area and Perimeter Practice", url: "https://www.maths4everyone.com/resources/downloads/area-and-perimeter-gcse-9-1-practice-questions-30272.pdf", source: "Maths4Everyone", type: "pdf" }
      ],
      solutions: [],
      otherResources: []
    },
    'circle-vocabulary': {
      videos: [],
      exercises: [],
      solutions: [],
      otherResources: []
    },
    'circle-calculations': {
      videos: [],
      exercises: [],
      solutions: [],
      otherResources: []
    },
    'arc-sector': {
      videos: [],
      exercises: [],
      solutions: [],
      otherResources: []
    },
    'bearings': {
      videos: [
        { title: "Introduction to Bearings", url: "https://www.youtube.com/embed/rsFBdL3gRBU", source: "HEGARTYMATHS", type: "video" },
        { title: "Bearings Tutorial", url: "https://www.youtube.com/embed/O_vt9yctoZY", source: "Corbettmaths", type: "video" }
      ],
      exercises: [
        { title: "Bearings Worksheet", url: "https://corbettmaths.com/wp-content/uploads/2013/02/bearings-pdf1.pdf", source: "Corbettmaths", type: "pdf" },
        { title: "Bearings Practice Grid", url: "https://www.draustinmaths.com/_files/ugd/7ac124_6b36747ebfb743e0a8f51cdc8d35da44.docx", source: "Dr Austin Maths", type: "pdf" }
      ],
      solutions: [
        { title: "Bearings Mark Scheme", url: "https://corbettmaths.com/wp-content/uploads/2018/11/Bearings-Answers.pdf", source: "Corbettmaths", type: "pdf" }
      ],
      otherResources: [
        { title: "Bearings Interactive Guide", url: "https://www.bbc.co.uk/bitesize/guides/zshqfcw/revision/1", source: "BBC Bitesize", type: "external" }
      ]
    },
    'pythagoras-theorem': {
      videos: [
        { title: "Pythagoras' Theorem", url: "https://www.youtube.com/embed/CnHgqfBSgco", source: "GCSE Maths", type: "video" },
        { title: "Pythagorean Theorem Introduction", url: "https://www.youtube.com/embed/AA6RfgP-AHU", source: "Khan Academy", type: "video" }
      ],
      exercises: [
        { title: "Pythagoras' Theorem Worksheet", url: "https://corbettmaths.com/wp-content/uploads/2013/02/pythagoras-pdf1.pdf", source: "Corbettmaths", type: "pdf" },
        { title: "Pythagoras' Theorem Practice", url: "https://www.onmaths.com/assets/pythagorean.pdf", source: "Onmaths", type: "pdf" }
      ],
      solutions: [
        { title: "Pythagoras' Theorem Mark Scheme", url: "https://corbettmaths.com/wp-content/uploads/2019/02/Answer-Pythagoras.pdf", source: "Corbettmaths", type: "pdf" }
      ],
      otherResources: [
        { title: "Pythagorean Theorem Interactive Practice", url: "https://www.khanacademy.org/math/cc-eighth-grade-math/cc-8th-geometry/cc-8th-pythagorean-theorem/e/pythagorean_theorem_1", source: "Khan Academy", type: "external" }
      ]
    },
    'chord-properties': {
      videos: [
        { title: "Chord Length and Distance to Centre", url: "https://www.youtube.com/embed/YftaFVn7kK4", source: "Wyzant", type: "video" },
        { title: "Circle Theorems - Chords", url: "https://www.youtube.com/embed/xdK2CyXGlBg", source: "Corbettmaths", type: "video" }
      ],
      exercises: [
        { title: "Circle Theorems Worksheet", url: "https://corbettmaths.com/wp-content/uploads/2013/02/circle-theorems-1-pdf.pdf", source: "Corbettmaths", type: "pdf" },
        { title: "Chords & Tangents Problems", url: "https://www.savemyexams.com/igcse/maths/cambridge-cie/international-maths-extended/revision-notes/geometry/circle-theorems/theorems-with-chords--tangents/", source: "Save My Exams", type: "pdf" }
      ],
      solutions: [
        { title: "Circle Theorems Mark Scheme", url: "https://corbettmaths.com/wp-content/uploads/2018/09/Circle-Theorems-Answers.pdf", source: "Corbettmaths", type: "pdf" }
      ],
      otherResources: [
        { title: "Circle Geometry Interactive", url: "https://www.geogebra.org/m/umMnKPjq", source: "GeoGebra", type: "external" }
      ]
    },
    'circle-distances': {
      videos: [
        { title: "Distance Between Points in Circle Geometry", url: "https://www.youtube.com/embed/q8Qm0Xbqre4", source: "Corbettmaths", type: "video" },
        { title: "Distance Formula in Coordinate Geometry", url: "https://www.youtube.com/embed/z9cQBZ8Kpz4", source: "Khan Academy", type: "video" }
      ],
      exercises: [
        { title: "Distance Between Two Points", url: "https://corbettmaths.com/wp-content/uploads/2019/01/Distance-between-2-points-pdf.pdf", source: "Corbettmaths", type: "pdf" },
        { title: "Circle Geometry Problems", url: "https://www.savemyexams.com/igcse/maths/cambridge-cie/international-maths-extended/revision-notes/geometry/circle-theorems/circle-properties/", source: "Save My Exams", type: "pdf" }
      ],
      solutions: [
        { title: "Distance Between Two Points Mark Scheme", url: "https://corbettmaths.com/wp-content/uploads/2019/01/Answer-Distance-between-two-points.pdf", source: "Corbettmaths", type: "pdf" }
      ],
      otherResources: [
        { title: "Distance Formula Interactive Practice", url: "https://www.khanacademy.org/math/geometry/hs-geo-analytic-geometry/hs-geo-distance-and-midpoints/e/distance_formula", source: "Khan Academy", type: "external" }
      ]
    }
  },
  'unit-4': {
    'linear-equations': {
      videos: [],
      exercises: [
        // Removed broken links
        { title: "Solving Equations", url: "https://www.mathsgenie.co.uk/resources/3-solving-equations.pdf", source: "Maths Genie", type: "pdf" }
        // Removed broken links
      ],
      solutions: [],
      otherResources: []
    },
    'inequalities-interpretation': {
      videos: [],
      exercises: [
        // Removed broken links
      ],
      solutions: [],
      otherResources: []
    },
    'inequalities-solution': {
      videos: [],
      exercises: [
        // Removed broken links
      ],
      solutions: [],
      otherResources: []
    },
    'algebraic-fractions-simplification': {
      videos: [
        { title: "Simplifying Algebraic Fractions", url: "https://www.youtube.com/embed/tlKN8NNNxdI", source: "Corbettmaths", type: "video" },
        { title: "Simplifying Algebraic Fractions", url: "https://www.youtube.com/embed/gMojR-U4NDQ", source: "Maths Genie", type: "video" }
      ],
      exercises: [
        { title: "Simplifying Algebraic Fractions Worksheet", url: "https://www.draustinmaths.com/_files/ugd/7ac124_c6ab4dd8b40747e2b1307a44ad3f7f03.pdf", source: "Dr Austin Maths", type: "pdf" },
        { title: "Algebraic Fractions Practice Questions", url: "https://justmaths.co.uk/wp-content/uploads/2015/12/Algebra-H-Algebraic-Fractions-v2.pdf", source: "JustMaths", type: "pdf" }
      ],
      solutions: [
        { title: "Algebraic Fractions Solutions", url: "https://justmaths.co.uk/wp-content/uploads/2015/12/Algebra-H-Algebraic-Fractions-v2-SOLUTIONS-1-1.pdf", source: "JustMaths", type: "pdf" },
        { title: "Simplifying Algebraic Fractions Guide", url: "https://www.savemyexams.com/igcse/maths/cie/25/extended/revision-notes/algebra-and-sequences/algebraic-fractions/simplifying/", source: "SaveMyExams", type: "pdf" }
      ],
      otherResources: [
        { title: "Interactive Algebraic Fractions", url: "https://www.westiesworkshop.com/course-support/algebra/algebraic-fractions/", source: "Westie's Workshop", type: "external" }
      ]
    },
    'algebraic-fractions-addition': {
      videos: [
        { title: "Adding & Subtracting Algebraic Fractions", url: "https://www.youtube.com/embed/w3JewxYjiNs", source: "Corbettmaths", type: "video" },
        { title: "Algebraic Fractions - Addition and Subtraction", url: "https://www.youtube.com/embed/khZnlxI6MSw", source: "Maths Genie", type: "video" }
      ],
      exercises: [
        { title: "Adding & Subtracting Algebraic Fractions Worksheet", url: "https://www.draustinmaths.com/_files/ugd/7ac124_eace8abe85a14cb78c24e97df3a9e36e.pdf", source: "Dr Austin Maths", type: "pdf" },
        { title: "Practice Strips - Adding & Subtracting", url: "https://www.draustinmaths.com/_files/ugd/7ac124_33fa4edcfbe14a3ca5c0a95ed54a25b5.pdf", source: "Dr Austin Maths", type: "pdf" }
      ],
      solutions: [
        { title: "Algebraic Fractions Practice Solutions", url: "https://www.savemyexams.com/igcse/maths/cie/25/extended/revision-notes/algebra-and-sequences/algebraic-fractions/solving-algebraic-fractions/", source: "SaveMyExams", type: "pdf" }
      ],
      otherResources: [
        { title: "MME Interactive Learning", url: "https://mmerevise.co.uk/a-level-maths-revision/algebraic-fractions/", source: "MME Revise", type: "external" }
      ]
    },
    'algebraic-fractions-multiplication': {
      videos: [
        { title: "Multiplying & Simplifying Algebraic Fractions", url: "https://www.youtube.com/embed/YL-13QneHrY", source: "GCSE Tutorial", type: "video" },
        { title: "Multiplying & Dividing Algebraic Fractions", url: "https://www.youtube.com/embed/0waEImwwz7A", source: "Corbettmaths", type: "video" }
      ],
      exercises: [
        { title: "Multiplying Algebraic Fractions Worksheet", url: "https://www.draustinmaths.com/_files/ugd/7ac124_e0b3be394a7146d68a7e0f9a1cd8ac30.pdf", source: "Dr Austin Maths", type: "pdf" },
        { title: "Dividing Algebraic Fractions Worksheet", url: "https://www.draustinmaths.com/_files/ugd/7ac124_bac69254bb7d465eb65eb93d99e7d6d1.pdf", source: "Dr Austin Maths", type: "pdf" }
      ],
      solutions: [
        { title: "Multiplying & Dividing Solutions", url: "https://www.savemyexams.com/igcse/maths/cie/25/extended/revision-notes/algebra-and-sequences/algebraic-fractions/solving-algebraic-fractions/", source: "SaveMyExams", type: "pdf" }
      ],
      otherResources: [
        { title: "Complete Algebraic Fractions Resources", url: "https://sites.google.com/online.island.edu.hk/maths/igcse/unit-5-algebra-2-quadratics/algebraic-fractions", source: "IS Mathematics", type: "external" }
      ]
    },
    'algebraic-fractions-equations': {
      videos: [
        { title: "Solving Equations with Algebraic Fractions", url: "https://www.youtube.com/embed/waEkFiYSOhU", source: "Maths Genie", type: "video" },
        { title: "Fractional Equations", url: "https://www.youtube.com/embed/UsR4rcCRBgE", source: "Corbettmaths", type: "video" }
      ],
      exercises: [
        { title: "Equations with Algebraic Fractions", url: "https://www.draustinmaths.com/_files/ugd/7ac124_9a4a5a6e94de4b85b44a3a6d6cd03f34.pdf", source: "Dr Austin Maths", type: "pdf" },
        { title: "Solving Algebraic Fraction Equations", url: "https://pmt.physicsandmathstutor.com/download/Maths/GCSE/Topic-Qs/Edexcel/Set-2/Algebra/Higher/Solving-Equations-and-Inequalities/Solving%20Algebraic%20Fraction%20Equations%20(H).pdf", source: "Physics & Maths Tutor", type: "pdf" }
      ],
      solutions: [
        { title: "Algebraic Equations Guide", url: "https://www.savemyexams.com/igcse/maths/cie/25/extended/revision-notes/algebra-and-sequences/algebraic-fractions/solving-algebraic-fractions/", source: "SaveMyExams", type: "pdf" }
      ],
      otherResources: [
        { title: "Khan Academy Fractional Equations", url: "https://www.khanacademy.org/math/cc-sixth-grade-math/cc-6th-equations-and-inequalities/cc-6th-one-step-mult-div-equations/v/one-step-multiplication-fractional-coefficients", source: "Khan Academy", type: "external" }
      ]
    },
    'exponents-indices': {
      videos: [],
      exercises: [],
      solutions: [],
      otherResources: []
    },
    'expansion-brackets': {
      videos: [],
      exercises: [],
      solutions: [],
      otherResources: []
    },
    'factorisation': {
      videos: [],
      exercises: [],
      solutions: [],
      otherResources: []
    }
  },
  'unit-5': {
    'quadratic-fundamentals': {
      videos: [
        { title: "Introduction to Quadratic Equations", url: "https://www.youtube.com/embed/IWigvJcCAJ0", source: "Khan Academy", type: "video" },
        { title: "Quadratic Expressions Introduction", url: "https://www.youtube.com/embed/f5B3PzPZkZ4", source: "Khan Academy", type: "video" }
      ],
      exercises: [
        { title: "Quadratic Expressions Worksheet", url: "https://www.draustinmaths.com/_files/ugd/7ac124_e8a0f6138cd849aebaed7619d9c1cffa.pdf", source: "Dr Austin Maths", type: "pdf" },
        { title: "Quadratic Equations Practice", url: "https://www.maths4everyone.com/resources/downloads/quadratic-equations-gcse-9-1-practice-questions-30242.pdf", source: "Maths4Everyone", type: "pdf" }
      ],
      solutions: [
        { title: "Quadratic Equations Solutions", url: "https://www.savemyexams.com/igcse/maths/cie/25/extended/revision-notes/algebra-and-sequences/quadratic-equations/", source: "SaveMyExams", type: "pdf" }
      ],
      otherResources: [
        { title: "Khan Academy Quadratics Course", url: "https://www.khanacademy.org/math/algebra-basics/alg-basics-quadratics-and-polynomials", source: "Khan Academy", type: "external" }
      ]
    },
    'factorisation-method': {
      videos: [
        { title: "Solving Quadratics by Factorising", url: "https://www.youtube.com/embed/m-qyV6C56ec", source: "Maths Genie", type: "video" },
        { title: "Factoring Simple Quadratic Expressions", url: "https://www.youtube.com/embed/eF6zYNzlZKQ", source: "Khan Academy", type: "video" }
      ],
      exercises: [
        { title: "Solving Quadratics by Factorising Worksheet", url: "https://corbettmaths.com/wp-content/uploads/2013/02/solving-quadratics-by-factorising-1-pdf.pdf", source: "Corbettmaths", type: "pdf" },
        { title: "Factorising Practice Questions", url: "https://www.mathsgenie.co.uk/resources/86_solving-quadratics-by-factorising.pdf", source: "Maths Genie", type: "pdf" }
      ],
      solutions: [
        { title: "Solving Quadratics Solutions", url: "https://corbettmaths.com/wp-content/uploads/2013/02/solving-quadratics-factorising-ans.pdf", source: "Corbettmaths", type: "pdf" }
      ],
      otherResources: [
        { title: "Maths Genie Quadratics Resources", url: "https://www.mathsgenie.co.uk/solving-quadratics.html", source: "Maths Genie", type: "external" }
      ]
    },
    'quadratic-formula': {
      videos: [
        { title: "The Quadratic Formula", url: "https://www.youtube.com/embed/i7idZfS8t8w", source: "Khan Academy", type: "video" },
        { title: "Quadratic Formula Explained", url: "https://www.youtube.com/embed/3J0ccr74LcU", source: "Corbettmaths", type: "video" }
      ],
      exercises: [
        { title: "Quadratic Formula Worksheet", url: "https://www.maths4everyone.com/resources/downloads/the-quadratic-formulae-20272.pdf", source: "Maths4Everyone", type: "pdf" },
        { title: "Mixed Quadratic Equations Practice", url: "https://justmaths.co.uk/wp-content/uploads/2015/11/Algebra-F-Factorising-Expanding-Factorising-Solving-Quadratics-v3.pdf", source: "JustMaths", type: "pdf" }
      ],
      solutions: [
        { title: "Quadratic Formula Guide", url: "https://www.savemyexams.com/igcse/maths/cie/25/extended/revision-notes/algebra-and-sequences/quadratic-equations/quadratic-formula/", source: "SaveMyExams", type: "pdf" }
      ],
      otherResources: [
        { title: "Quadratic Formula Applications", url: "https://www.khanacademy.org/math/algebra/x2f8bb11595b61c86:quadratic-functions-equations/x2f8bb11595b61c86:standard-form-quadratic/v/application-problem-with-quadratic-formula", source: "Khan Academy", type: "external" }
      ]
    },
    'gdc-quadratics': {
      videos: [
        { title: "Solving Quadratics with a GDC", url: "https://www.youtube.com/embed/Xw1YDdBWFOE", source: "IB Maths", type: "video" },
        { title: "Using a Calculator for Quadratics", url: "https://www.youtube.com/embed/zp2GNFhOzgo", source: "Mark Willis", type: "video" }
      ],
      exercises: [
        { title: "GDC-Based Quadratic Problems", url: "https://www.onmaths.com/resource/solve-quadratic-equations/", source: "OnMaths", type: "external" }
      ],
      solutions: [
        { title: "Solving Quadratics with Technology", url: "https://www.savemyexams.com/a-level/maths/cie/20/pure-1/revision-notes/algebra-and-functions/quadratics/solving-quadratic-equations/", source: "SaveMyExams", type: "pdf" }
      ],
      otherResources: [
        { title: "Interactive Quadratic Solver", url: "https://www.onmaths.com/resource/solving-quadratic-equations/", source: "OnMaths", type: "external" }
      ]
    },
    'parabola-properties': {
      videos: [
        { title: "Graphing Quadratic Functions (Vertex & Intercepts)", url: "https://www.youtube.com/embed/rM_A8t0CV7A", source: "Maths Genie", type: "video" },
        { title: "Graphing Quadratics in Factored Form", url: "https://www.youtube.com/embed/0y-7xP-zRCQ", source: "Khan Academy", type: "video" }
      ],
      exercises: [
        { title: "Quadratic Graphs", url: "https://www.mathsgenie.co.uk/resources/5-quadratic-graphs.pdf", source: "Maths Genie", type: "pdf" },
        { title: "Sketching Quadratics", url: "https://corbettmaths.com/wp-content/uploads/2019/04/Sketching-Quadratics.pdf", source: "Corbettmaths", type: "pdf" }
      ],
      solutions: [
        { title: "Quadratic Graphs Solutions", url: "https://www.mathsgenie.co.uk/resources/5-quadratic-graphsans.pdf", source: "Maths Genie", type: "pdf" }
      ],
      otherResources: [
        { title: "Graphing Parabolas Using Roots and Vertex", url: "https://www.khanacademy.org/math/algebra/x2f8bb11595b61c86:quadratic-functions-equations/x2f8bb11595b61c86:standard-form-quadratic/v/graphing-a-parabola-using-roots-and-vertex", source: "Khan Academy", type: "external" }
      ]
    }
  },
  'unit-6': {
    'linear-sequences': {
      videos: [
        { title: "nth Term of a Linear Sequence", url: "https://www.youtube.com/embed/qnVVTBAfNu4", source: "Corbettmaths", type: "video" }
      ],
      exercises: [
        { title: "Linear Sequences Worksheet", url: "https://www.draustinmaths.com/_files/ugd/7ac124_dce56bf2a95b4c9eacf7693a3c0ec80f.pdf", source: "Dr Austin Maths", type: "pdf" }
      ],
      solutions: [
        { title: "Linear Sequences Answers", url: "https://www.draustinmaths.com/_files/ugd/7ac124_ef69186a26ee4e4884c0a6b0ac093674.pdf", source: "Dr Austin Maths", type: "pdf" }
      ],
      otherResources: [
        { title: "Arithmetic Sequence Interactive Practice", url: "https://www.khanacademy.org/math/algebra/x2f8bb11595b61c86:sequences/x2f8bb11595b61c86:introduction-to-arithmetic-sequences/e/arithmetic_sequences_2", source: "Khan Academy", type: "external" }
      ]
    },
    'quadratic-sequences': {
      videos: [
        { title: "nth Term of a Quadratic Sequence", url: "https://www.youtube.com/embed/AL-joUBnEIw", source: "Corbettmaths", type: "video" }
      ],
      exercises: [
        { title: "Quadratic Sequences Worksheet", url: "https://www.draustinmaths.com/_files/ugd/7ac124_82e5dd114ad7464d83873f86ca7d3e6b.pdf", source: "Dr Austin Maths", type: "pdf" }
      ],
      solutions: [
        { title: "Quadratic Sequences Answers", url: "https://www.draustinmaths.com/_files/ugd/7ac124_92bbff4670e04d5ba3bca2f783e47eeb.pdf", source: "Dr Austin Maths", type: "pdf" }
      ],
      otherResources: [
        { title: "Quadratic Sequences Interactive Game", url: "https://www.geogebra.org/m/qMdj8Std", source: "GeoGebra", type: "external" }
      ]
    },
    'cubic-sequences': {
      videos: [
        { title: "Cubic Sequences (nth term)", url: "https://www.youtube.com/embed/5hacfQYS6Ds", source: "GCSE Maths Tutor", type: "video" },
        { title: "Sequences Made Easy (IGCSE 0607)", url: "https://www.youtube.com/embed/LQcUHHaJwJs", source: "Vision IGCSE Math", type: "video" }
      ],
      exercises: [
        { title: "Cubic Sequences Worksheet", url: "https://www.radfordmathematics.com/algebra/sequences-series/difference-method-sequences/cubic-sequences-worksheet-1.pdf", source: "Radford Mathematics", type: "pdf" }
      ],
      solutions: [
        { title: "Cubic Sequences Solution Tutorial", url: "https://www.radfordmathematics.com/algebra/sequences-series/difference-method-sequences/cubic-sequences.html", source: "Radford Mathematics", type: "external" }
      ],
      otherResources: []
    },
    'geometric-sequences': {
      videos: [
        { title: "Geometric Progressions", url: "https://www.youtube.com/embed/Jlo6EVJiq9g", source: "Corbettmaths", type: "video" }
      ],
      exercises: [
        { title: "Geometric Progressions", url: "https://corbettmaths.com/wp-content/uploads/2024/11/Geometric-Progressions.pdf", source: "Corbettmaths", type: "pdf" },
        { title: "Geometric Sequences Worksheet", url: "https://www.draustinmaths.com/_files/ugd/7ac124_062a407016ff471aa9d0977f7092ada9.pdf", source: "Dr Austin Maths", type: "pdf" }
      ],
      solutions: [
        { title: "Geometric Sequences Answers", url: "https://www.draustinmaths.com/_files/ugd/7ac124_4ae4bad5691a45e1b274d4c0bcbc7bba.pdf", source: "Dr Austin Maths", type: "pdf" }
      ],
      otherResources: [
        { title: "Geometric Sequence Simulator", url: "https://www.geogebra.org/m/Yfj7yAt8", source: "GeoGebra", type: "external" }
      ]
    }
  },
  'unit-7': {
    'function-notation': {
      videos: [
        { title: "Function Notation Introduction", url: "https://www.youtube.com/embed/ZRQJGecu1fs", source: "GCSE Higher Maths", type: "video" },
        { title: "What is a Function?", url: "https://www.youtube.com/embed/kvGsIo1TmsM", source: "Khan Academy", type: "video" },
        { title: "Functions", url: "https://www.youtube.com/embed/uha8WJ5J-WA", source: "Corbettmaths", type: "video" }
      ],
      exercises: [
        { title: "Function Notation Strips", url: "https://www.draustinmaths.com/_files/ugd/7ac124_a2ceb2d9edfa42b3bebdaf902f95a6bb.pdf", source: "Dr Austin Maths", type: "pdf" },
        { title: "Functions Practice Questions", url: "https://corbettmaths.com/wp-content/uploads/2020/03/Functions.pdf", source: "Corbettmaths", type: "pdf" }
      ],
      solutions: [
        { title: "Functions Textbook Solutions", url: "https://corbettmaths.com/wp-content/uploads/2019/10/Functions-Answers.pdf", source: "Corbettmaths", type: "pdf" },
        { title: "Domain and Range Solutions", url: "https://www.mathsgenie.co.uk/resources/6-domain-and-rangeans.pdf", source: "Maths Genie", type: "pdf" }
      ],
      otherResources: [
        { title: "Interactive Function Notation", url: "https://learn.desmos.com/functions", source: "Desmos", type: "external" },
        { title: "Khan Academy Function Exercises", url: "https://www.khanacademy.org/math/algebra/x2f8bb11595b61c86:functions/x2f8bb11595b61c86:intro-to-functions/e/evaluating-functions", source: "Khan Academy", type: "external" }
      ]
    },
    'composite-functions': {
      videos: [
        { title: "Composite Functions", url: "https://www.youtube.com/embed/lSRehCwoxs8", source: "GCSE Higher Maths", type: "video" },
        { title: "Composite Functions", url: "https://www.youtube.com/embed/z_rNIy_bWCU", source: "Maths Genie", type: "video" },
        { title: "Composite Functions Introduction", url: "https://www.youtube.com/embed/iy1lmMREZB0", source: "Khan Academy", type: "video" }
      ],
      exercises: [
        { title: "Composite and Inverse Functions", url: "https://www.mathsgenie.co.uk/resources/7-composite-and-inverse-functions.pdf", source: "Maths Genie", type: "pdf" },
        { title: "Composite Functions Worksheet", url: "https://www.draustinmaths.com/_files/ugd/7ac124_b23c7ddbcd244b0ea84df5fe6b977de1.pdf", source: "Dr Austin Maths", type: "pdf" }
      ],
      solutions: [
        { title: "Composite Functions Solutions", url: "https://www.mathsgenie.co.uk/resources/7-composite-and-inverse-functionsans.pdf", source: "Maths Genie", type: "pdf" }
      ],
      otherResources: [
        { title: "Composite Functions Explorer", url: "https://www.desmos.com/calculator/composite-functions", source: "Desmos", type: "external" },
        { title: "Khan Academy Composite Practice", url: "https://www.khanacademy.org/math/algebra/x2f8bb11595b61c86:functions/x2f8bb11595b61c86:composite-functions/e/composite-functions", source: "Khan Academy", type: "external" }
      ]
    },
    'inverse-functions': {
      videos: [
        { title: "Inverse Functions", url: "https://www.youtube.com/embed/zpF9nbjResY", source: "Corbettmaths", type: "video" },
        { title: "Inverse Functions", url: "https://www.youtube.com/embed/xOfN_VeTDcE", source: "Corbettmaths", type: "video" },
        { title: "Inverse Functions Introduction", url: "https://www.youtube.com/embed/-9SMitx3QFY", source: "Khan Academy", type: "video" }
      ],
      exercises: [
        { title: "Inverse Functions Worksheet", url: "https://www.draustinmaths.com/_files/ugd/7ac124_1e9e7f82c2ca405fa3fc1a7a3984d9c0.pdf", source: "Dr Austin Maths", type: "pdf" },
        { title: "Composite and Inverse Functions", url: "https://www.mathsgenie.co.uk/resources/7-composite-and-inverse-functions.pdf", source: "Maths Genie", type: "pdf" }
      ],
      solutions: [
        { title: "Inverse Functions Solutions", url: "https://www.physicsandmathstutor.com/pdf-pages/?pdf=https%3A%2F%2Fpmt.physicsandmathstutor.com%2Fdownload%2FMaths%2FA-level%2FFunctions%2FSolutions%2FInverse-Functions-Solutions.pdf", source: "Physics & Maths Tutor", type: "pdf" }
      ],
      otherResources: [
        { title: "Inverse Functions Visualizer", url: "https://www.desmos.com/calculator/inverse-functions", source: "Desmos", type: "external" },
        { title: "Khan Academy Inverse Practice", url: "https://www.khanacademy.org/math/algebra/x2f8bb11595b61c86:functions/x2f8bb11595b61c86:inverse-functions/e/inverse-functions", source: "Khan Academy", type: "external" }
      ]
    },
    'variation': {
      videos: [
        { title: "Direct & Inverse Proportion Explained", url: "https://www.youtube.com/embed/rtLKCv5buLw", source: "SaveMyExams", type: "video" },
        { title: "Direct Proportion", url: "https://www.youtube.com/embed/KFXK7-ClVxA", source: "Corbettmaths", type: "video" },
        { title: "Direct & Inverse Variation", url: "https://www.youtube.com/embed/q0DVOFwef5k", source: "Khan Academy", type: "video" }
      ],
      exercises: [
        { title: "Variation Worksheet", url: "https://www.draustinmaths.com/_files/ugd/7ac124_ef9fc6401e424f6c8adfa9c1a9c92da4.pdf", source: "Dr Austin Maths", type: "pdf" },
        { title: "Direct & Inverse Proportion Practice", url: "https://www.maths4everyone.com/resources/downloads/direct-proportion-gcse-9-1-practice-questions-30244.pdf", source: "Maths4Everyone", type: "pdf" }
      ],
      solutions: [
        { title: "Variation Solutions", url: "https://www.physicsandmathstutor.com/pdf-pages/?pdf=https%3A%2F%2Fpmt.physicsandmathstutor.com%2Fdownload%2FMaths%2FGCSE%2FTopic-Qs%2FEdexcel%2FSet-1%2FRatio-and-Proportion%2FHigher%2FDirect-and-Inverse-Proportion%2520(H)-Answers.pdf", source: "Physics & Maths Tutor", type: "pdf" }
      ],
      otherResources: [
        { title: "Variation Models Interactive", url: "https://www.desmos.com/calculator/variation", source: "Desmos", type: "external" },
        { title: "Khan Academy Variation Practice", url: "https://www.khanacademy.org/math/algebra/x2f8bb11595b61c86:direct-inverse-variation/e/direct_and_inverse_variation", source: "Khan Academy", type: "external" }
      ]
    }
  },
  'unit-8': {
    'right-angled-trigonometry': {
      videos: [
        { title: "Introduction to Trigonometry", url: "https://www.youtube.com/embed/F21S9Wpi0y8", source: "Khan Academy", type: "video" },
        // New videos from provided list
        { title: "SOHCAHTOA Explained", url: "https://www.youtube.com/embed/wXMO_jYBKPE", source: "Corbettmaths", type: "video" },
        { title: "Trigonometry - Finding Missing Sides", url: "https://www.youtube.com/embed/bALUluXOuTc", source: "Corbettmaths", type: "video" },
        { title: "Trigonometry - Finding Missing Angles", url: "https://www.youtube.com/embed/fP6zFupOxqM", source: "Corbettmaths", type: "video" }
      ],
      exercises: [
        { title: "Trigonometry Worksheet", url: "https://corbettmaths.com/wp-content/uploads/2013/02/trigonometry-pdf1.pdf", source: "Corbettmaths", type: "pdf" }
        // Removed broken links
      ],
      solutions: [
        // Removed broken links
      ],
      otherResources: [
        // Removed broken links
      ]
    },
    'angles-elevation-depression': {
      videos: [
        // New videos from provided list
        { title: "Angles of Elevation and Depression", url: "https://www.youtube.com/embed/_WllQRr_n7I", source: "Khan Academy", type: "video" }
      ],
      exercises: [
        // Removed broken links
      ],
      solutions: [],
      otherResources: []
    },
    'pythagoras-trigonometry': {
      videos: [],
      exercises: [],
      solutions: [],
      otherResources: []
    },
    'perpendicular-distance': {
      videos: [],
      exercises: [],
      solutions: [],
      otherResources: []
    }
  }
};

// Additional Cambridge official resources
export const officialResources: ExternalResource[] = [
  // Removed broken links
  { title: "Cambridge IGCSE 0607 Syllabus 2023-2024", url: "https://www.cambridgeinternational.org/Images/597050-2023-2024-syllabus.pdf", source: "Cambridge International", type: "pdf" },
  { title: "Cambridge IGCSE 0607 Syllabus 2025-2027", url: "https://www.cambridgeinternational.org/Images/662472-2025-2027-syllabus.pdf", source: "Cambridge International", type: "pdf" },
  { title: "Cambridge IGCSE Learner Guide", url: "https://www.cienotes.com/wp-content/uploads/2018/08/499921-learner-guide-2020-.pdf", source: "Cambridge International", type: "pdf" }
  // Removed other broken links
];

// Data structure for units
export const unitTitles = {
  'unit-1': 'Unit 1: Number & Coordinate Geometry',
  'unit-2': 'Unit 2: Geometry & Angles',
  'unit-3': 'Unit 3: Mensuration & Circle Geometry',
  'unit-4': 'Unit 4: Algebraic Manipulation & Equations',
  'unit-5': 'Unit 5: Quadratic Patterns and Models',
  'unit-6': 'Unit 6: Sequences',
  'unit-7': 'Unit 7: Functions and Variation',
  'unit-8': 'Unit 8: Trigonometry'
};

// Unit colors matching TopicCard.tsx with enhanced vibrant colors
export const unitColors = {
  'unit-1': 'indigo',
  'unit-2': 'emerald',
  'unit-3': 'teal',
  'unit-4': 'blue',
  'unit-5': 'orange',
  'unit-6': 'purple',
  'unit-7': 'violet',
  'unit-8': 'rose',
  'unit-9': 'green'
};