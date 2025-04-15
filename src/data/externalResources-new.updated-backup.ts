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
        { title: "Graphing Linear Equations", url: "https://www.youtube.com/embed/2UrcUfBizyw", source: "Khan Academy", type: "video" }
        // Removed broken videos
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
    'simultaneous-equations': {
      videos: [
        { title: "Solving Systems of Equations", url: "https://www.youtube.com/embed/nok99JOhcjo", source: "Khan Academy", type: "video" }
        // Removed broken videos
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
    },
    'parallel-perpendicular-lines': {
      videos: [
        // Removed broken videos
      ],
      exercises: [
        { title: "Parallel and Perpendicular Lines", url: "https://www.mathsgenie.co.uk/resources/6-parallel-and-perpendicular-lines.pdf", source: "Maths Genie", type: "pdf" }
      ],
      solutions: [],
      otherResources: []
    },
    'perpendicular-bisector': {
      videos: [
        // Removed broken videos
      ],
      exercises: [],
      solutions: [],
      otherResources: [
        // Removed broken links
      ]
    },
    'distance-formula': {
      videos: [
        { title: "Distance Between Two Points", url: "https://www.youtube.com/embed/q8Qm0Xbqre4", source: "Corbettmaths", type: "video" }
      ],
      exercises: [
        { title: "Distance Between Two Points", url: "https://corbettmaths.com/wp-content/uploads/2019/01/Distance-between-2-points-pdf.pdf", source: "Corbettmaths", type: "pdf" }
      ],
      solutions: [],
      otherResources: [
        { title: "Distance Formula", url: "https://pmt.physicsandmathstutor.com/download/Maths/A-level/Pure/Coordinate-Geometry-1/Cheat-Sheets/Straight%20Line%20Graphs.pdf", source: "Physics & Maths Tutor", type: "pdf" }
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
        { title: "Angles at a point, on straight lines", url: "https://www.youtube.com/embed/DGKwdHMiqCg", source: "Khan Academy", type: "video" },
        // Removed broken videos
        { title: "Angles on Parallel Lines", url: "https://www.youtube.com/embed/6oJ3QqbL7Yc", source: "Math Antics", type: "video" },
        { title: "Angles In Parallel Lines", url: "https://www.youtube.com/embed/WI_U1X-jPHg", source: "FuseSchool", type: "video" },
        { title: "Alternate, Corresponding and Allied Angles", url: "https://www.youtube.com/embed/I5auyoXYoX0", source: "Corbettmaths", type: "video" }
        // Removed broken videos
      ],
      exercises: [
        // Removed broken links
      ],
      solutions: [
        // Removed broken links
      ],
      otherResources: [
        // Removed broken links
      ]
    },
    'parallel-line-angles': {
      videos: [],
      exercises: [],
      solutions: [],
      otherResources: []
    },
    'angle-sums': {
      videos: [],
      exercises: [],
      solutions: [],
      otherResources: []
    },
    'polygon-angles': {
      videos: [],
      exercises: [],
      solutions: [],
      otherResources: []
    },
    'angle-vocabulary': {
      videos: [],
      exercises: [],
      solutions: [],
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
        // Removed broken videos
      ],
      exercises: [
        { title: "Bearings Worksheet", url: "https://corbettmaths.com/wp-content/uploads/2013/02/bearings-pdf1.pdf", source: "Corbettmaths", type: "pdf" },
        // Removed broken links
      ],
      solutions: [
        // Removed broken links
      ],
      otherResources: []
    },
    'pythagoras-theorem': {
      videos: [],
      exercises: [
        { title: "Pythagoras Theorem Worksheet", url: "https://corbettmaths.com/wp-content/uploads/2013/02/pythagoras-pdf1.pdf", source: "Corbettmaths", type: "pdf" },
        // Removed broken links
      ],
      solutions: [
        // Removed broken links
      ],
      otherResources: []
    },
    'chord-properties': {
      videos: [],
      exercises: [],
      solutions: [],
      otherResources: []
    },
    'circle-distances': {
      videos: [],
      exercises: [],
      solutions: [],
      otherResources: []
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
        // Removed broken videos
      ],
      exercises: [
        // Removed broken links
      ],
      solutions: [
        // Removed broken links
      ],
      otherResources: []
    },
    'algebraic-fractions-addition': {
      videos: [
        // Removed broken videos
      ],
      exercises: [
        // Removed broken links
      ],
      solutions: [],
      otherResources: []
    },
    'algebraic-fractions-multiplication': {
      videos: [
        // Removed broken videos
      ],
      exercises: [
        // Removed broken links
      ],
      solutions: [],
      otherResources: [
        // Removed broken links
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
        // Removed broken videos
      ],
      exercises: [
        // Removed broken links
      ],
      solutions: [
        // Removed broken links
      ],
      otherResources: []
    },
    'factorisation-method': {
      videos: [
        // Removed broken videos
      ],
      exercises: [
        // Removed broken links
      ],
      solutions: [
        // Removed broken links
      ],
      otherResources: []
    },
    'quadratic-formula': {
      videos: [
        { title: "The Quadratic Formula", url: "https://www.youtube.com/embed/i7idZfS8t8w", source: "Khan Academy", type: "video" },
        // Removed broken videos
        { title: "Quadratic Formula Explained", url: "https://www.youtube.com/embed/3J0ccr74LcU", source: "Corbettmaths", type: "video" }
      ],
      exercises: [],
      solutions: [],
      otherResources: [
        // Removed broken links
      ]
    },
    'gdc-quadratics': {
      videos: [
        // Removed broken videos
        { title: "Solving Quadratic Equations Using GDC", url: "https://www.youtube.com/embed/zp2GNFhOzgo", source: "Mark Willis", type: "video" }
      ],
      exercises: [],
      solutions: [],
      otherResources: [
        // Removed broken links
      ]
    },
    'parabola-properties': {
      videos: [
        // Removed broken videos
        { title: "Line of Symmetry", url: "https://www.youtube.com/embed/k6Men7ELOxQ", source: "Corbettmaths", type: "video" }
      ],
      exercises: [
        { title: "Quadratic Graphs", url: "https://www.mathsgenie.co.uk/resources/5-quadratic-graphs.pdf", source: "Maths Genie", type: "pdf" },
        { title: "Sketching Quadratics", url: "https://corbettmaths.com/wp-content/uploads/2019/04/Sketching-Quadratics.pdf", source: "Corbettmaths", type: "pdf" }
      ],
      solutions: [],
      otherResources: []
    }
  },
  'unit-6': {
    'linear-sequences': {
      videos: [
        // Removed broken videos
      ],
      exercises: [
        // Removed broken links
      ],
      solutions: [
        // Removed broken links
      ],
      otherResources: [
        // Removed broken links
      ]
    },
    'quadratic-sequences': {
      videos: [
        // Removed broken videos
        { title: "Quadratic Nth Term", url: "https://www.youtube.com/embed/AL-joUBnEIw", source: "Corbettmaths", type: "video" }
      ],
      exercises: [
        // Removed broken links
      ],
      solutions: [],
      otherResources: [
        { title: "Quadratic Sequences", url: "https://www.mathsgenie.co.uk/questions-quadratic-sequences.html", source: "Maths Genie", type: "external" }
        // Removed broken links
      ]
    },
    'cubic-sequences': {
      videos: [
        // Removed broken videos
      ],
      exercises: [],
      solutions: [],
      otherResources: [
        // Removed broken links
      ]
    },
    'geometric-sequences': {
      videos: [
        // Removed broken videos
      ],
      exercises: [
        { title: "Geometric Progressions", url: "https://corbettmaths.com/wp-content/uploads/2024/11/Geometric-Progressions.pdf", source: "Corbettmaths", type: "pdf" }
      ],
      solutions: [],
      otherResources: [
        // Removed broken links
      ]
    }
  },
  'unit-7': {
    'function-notation': {
      videos: [
        // Removed broken videos
        { title: "Understanding Function Notation", url: "https://www.youtube.com/embed/kvGsIo1TmsM", source: "Khan Academy", type: "video" },
        { title: "Functions", url: "https://www.youtube.com/embed/uha8WJ5J-WA", source: "Corbettmaths", type: "video" },
        { title: "Domain and Range", url: "https://www.youtube.com/embed/O0uUVH8dRiU", source: "Khan Academy", type: "video" }
        // Removed broken videos
      ],
      exercises: [
        // Removed broken links
        { title: "Domain and Range Questions", url: "https://www.mathsgenie.co.uk/resources/6-domain-and-range.pdf", source: "Maths Genie", type: "pdf" }
      ],
      solutions: [
        { title: "Domain and Range Solutions", url: "https://www.mathsgenie.co.uk/resources/6-domain-and-rangeans.pdf", source: "Maths Genie", type: "pdf" }
      ],
      otherResources: [
        // Removed broken links
      ]
    },
    'composite-functions': {
      videos: [
        // Removed broken videos
        { title: "Composite Functions", url: "https://www.youtube.com/embed/z_rNIy_bWCU", source: "Maths Genie", type: "video" }
        // Removed broken videos
      ],
      exercises: [
        // Removed broken links
        { title: "Composite and Inverse Functions", url: "https://www.mathsgenie.co.uk/resources/7-composite-and-inverse-functions.pdf", source: "Maths Genie", type: "pdf" }
      ],
      solutions: [
        // Removed broken links
      ],
      otherResources: [
        // Removed broken links
      ]
    },
    'inverse-functions': {
      videos: [
        // Removed broken videos
        { title: "Inverse Functions", url: "https://www.youtube.com/embed/xOfN_VeTDcE", source: "Corbettmaths", type: "video" }
      ],
      exercises: [
        // Removed broken links
      ],
      solutions: [],
      otherResources: [
        // Removed broken links
      ]
    },
    'variation': {
      videos: [
        // Removed broken videos
      ],
      exercises: [
        // Removed broken links
      ],
      solutions: [],
      otherResources: []
    }
  },
  'unit-8': {
    'right-angled-trigonometry': {
      videos: [
        { title: "Introduction to Trigonometry", url: "https://www.youtube.com/embed/F21S9Wpi0y8", source: "Khan Academy", type: "video" }
        // Removed broken videos
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
        // Removed broken videos
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