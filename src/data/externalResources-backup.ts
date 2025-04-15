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
        { title: "Natural Numbers Introduction", url: "https://www.youtube.com/embed/Vk6O8r3UKNw", source: "Khan Academy", type: "video" },
        { title: "Types of Numbers", url: "https://www.youtube.com/embed/FWmzg5-Yptw", source: "Corbettmaths", type: "video" }
      ],
      exercises: [
        { title: "Types of Numbers Worksheet", url: "https://corbettmaths.com/wp-content/uploads/2018/11/types-of-numbers-pdf.pdf", source: "Corbettmaths", type: "pdf" },
        { title: "Prime Numbers Worksheet", url: "https://corbettmaths.com/wp-content/uploads/2013/02/prime-numbers-pdf1.pdf", source: "Corbettmaths", type: "pdf" },
        { title: "Square Numbers and Square Roots", url: "https://corbettmaths.com/wp-content/uploads/2013/02/square-numbers-pdf.pdf", source: "Corbettmaths", type: "pdf" },
        { title: "Cube Numbers and Cube Roots", url: "https://corbettmaths.com/wp-content/uploads/2013/02/cube-numbers-pdf1.pdf", source: "Corbettmaths", type: "pdf" },
        { title: "Triangular Numbers", url: "https://corbettmaths.com/wp-content/uploads/2013/02/triangular-numbers-pdf2.pdf", source: "Corbettmaths", type: "pdf" },
        { title: "Rational and Irrational Numbers", url: "https://corbettmaths.com/wp-content/uploads/2019/09/Irrational-and-Rational-Numbers.pdf", source: "Corbettmaths", type: "pdf" },
        { title: "Reciprocals", url: "https://corbettmaths.com/wp-content/uploads/2013/02/reciprocals-pdf1.pdf", source: "Corbettmaths", type: "pdf" },
        { title: "Factors, Multiples and Primes Revision Grid", url: "https://www.draustinmaths.com/_files/ugd/7ac124_ee92d1afd48c47ccbd2c86598bb2de3f.pdf", source: "Dr. Austin Maths", type: "pdf" }
      ],
      solutions: [],
      otherResources: []
    },
    'standard-form': {
      videos: [],
      exercises: [
        { title: "Standard Form Worksheet", url: "https://corbettmaths.com/wp-content/uploads/2013/02/standard-form-pdf1.pdf", source: "Corbettmaths", type: "pdf" },
        { title: "Standard Form Revision Grid", url: "https://www.draustinmaths.com/_files/ugd/7ac124_1548f69d09d94b80824a05fcaba64a2e.pdf", source: "Dr. Austin Maths", type: "pdf" },
        { title: "Standard Form Questions", url: "https://www.mathsgenie.co.uk/resources/5-standard-form.pdf", source: "Maths Genie", type: "pdf" }
      ],
      solutions: [
        { title: "Standard Form Answers", url: "https://www.mathsgenie.co.uk/resources/5-standard-formans.pdf", source: "Maths Genie", type: "pdf" }
      ],
      otherResources: [
        { title: "Standard Form Practice Strips", url: "https://www.draustinmaths.com/standard-form", source: "Dr. Austin Maths", type: "external" }
      ]
    },
    'common-factors': {
      videos: [],
      exercises: [
        { title: "HCF and LCM Worksheet", url: "https://corbettmaths.com/wp-content/uploads/2013/02/hcf-lcm-pdf.pdf", source: "Corbettmaths", type: "pdf" },
        { title: "Prime Factorisation Worksheet", url: "https://corbettmaths.com/wp-content/uploads/2013/02/prime-factorisation-pdf.pdf", source: "Corbettmaths", type: "pdf" },
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
        { title: "Order of Operations (BODMAS) Worksheet", url: "https://corbettmaths.com/wp-content/uploads/2013/02/order-of-operations-pdf1.pdf", source: "Corbettmaths", type: "pdf" },
        { title: "Powers and Roots Worksheet", url: "https://corbettmaths.com/wp-content/uploads/2013/02/powers-and-roots-pdf1.pdf", source: "Corbettmaths", type: "pdf" },
        { title: "Adding Fractions (Same Denominator)", url: "https://corbettmaths.com/wp-content/uploads/2013/02/adding-fractions-same-denominator-pdf.pdf", source: "Corbettmaths", type: "pdf" },
        { title: "Adding Fractions (Different Denominator)", url: "https://corbettmaths.com/wp-content/uploads/2013/02/adding-fractions-different-denominator-pdf.pdf", source: "Corbettmaths", type: "pdf" },
        { title: "Multiplying Fractions", url: "https://corbettmaths.com/wp-content/uploads/2013/02/multiplying-fractions-pdf.pdf", source: "Corbettmaths", type: "pdf" },
        { title: "Dividing Fractions", url: "https://corbettmaths.com/wp-content/uploads/2013/02/dividing-fractions-pdf.pdf", source: "Corbettmaths", type: "pdf" },
        { title: "Improper Fractions & Mixed Numbers", url: "https://corbettmaths.com/wp-content/uploads/2013/02/improper-fractions-and-mixed-numbers-pdf1.pdf", source: "Corbettmaths", type: "pdf" },
        { title: "BIDMAS Practice", url: "https://www.mathsgenie.co.uk/resources/1-the-order-of-operations.pdf", source: "Maths Genie", type: "pdf" },
        { title: "Fractions Practice", url: "https://www.mathsgenie.co.uk/resources/3-fractions.pdf", source: "Maths Genie", type: "pdf" },
        { title: "Fractions Answers", url: "https://www.mathsgenie.co.uk/resources/3-fractionsans.pdf", source: "Maths Genie", type: "pdf" },
        { title: "Powers and Roots Revision Grid", url: "https://www.draustinmaths.com/_files/ugd/7ac124_fe57d7a8da0549ea89a69efd290a5cc5.pdf", source: "Dr. Austin Maths", type: "pdf" },
        { title: "Fractions Revision Grid", url: "https://www.draustinmaths.com/_files/ugd/7ac124_abcfff6c75f14b71886e2eaed5cd206d.pdf", source: "Dr. Austin Maths", type: "pdf" }
      ],
      solutions: [],
      otherResources: []
    },
    'surds': {
      videos: [],
      exercises: [
        { title: "Surds Worksheet", url: "https://corbettmaths.com/wp-content/uploads/2013/02/surds-pdf1.pdf", source: "Corbettmaths", type: "pdf" },
        { title: "Surds Practice Grid", url: "https://www.draustinmaths.com/_files/ugd/7ac124_7c2935bca03146d2906e7cd8bfa70c1e.pdf", source: "Dr. Austin Maths", type: "pdf" },
        { title: "Surds Questions", url: "https://www.mathsgenie.co.uk/resources/7-surds.pdf", source: "Maths Genie", type: "pdf" }
      ],
      solutions: [],
      otherResources: []
    },
    'decimals-fractions': {
      videos: [],
      exercises: [
        { title: "FDP Conversion Worksheet", url: "https://corbettmaths.com/wp-content/uploads/2013/02/fdp-pdf1.pdf", source: "Corbettmaths", type: "pdf" },
        { title: "Ordering FDP Worksheet", url: "https://corbettmaths.com/wp-content/uploads/2013/02/ordering-fdp-pdf.pdf", source: "Corbettmaths", type: "pdf" },
        { title: "Recurring Decimals Worksheet", url: "https://corbettmaths.com/wp-content/uploads/2013/02/recurring-decimals-pdf.pdf", source: "Corbettmaths", type: "pdf" },
        { title: "FDP Conversions", url: "https://www.mathsgenie.co.uk/resources/2-fdp.pdf", source: "Maths Genie", type: "pdf" },
        { title: "Converting Recurring Decimals to Fractions", url: "https://www.mathsgenie.co.uk/resources/6-recurring-decimals-to-fractions.pdf", source: "Maths Genie", type: "pdf" }
      ],
      solutions: [],
      otherResources: []
    },
    'ratio-proportion': {
      videos: [],
      exercises: [
        { title: "Ratio Worksheet", url: "https://corbettmaths.com/wp-content/uploads/2013/02/ratio-pdf1.pdf", source: "Corbettmaths", type: "pdf" },
        { title: "Sharing in a Ratio", url: "https://corbettmaths.com/wp-content/uploads/2013/02/sharing-in-a-ratio-pdf.pdf", source: "Corbettmaths", type: "pdf" },
        { title: "Ratio Problem Solving", url: "https://corbettmaths.com/wp-content/uploads/2018/11/Ratio-Problem-Solving-pdf.pdf", source: "Corbettmaths", type: "pdf" },
        { title: "Proportion Worksheet", url: "https://corbettmaths.com/wp-content/uploads/2013/02/proportion-pdf1.pdf", source: "Corbettmaths", type: "pdf" },
        { title: "Ratio and Proportion Revision Grid", url: "https://www.draustinmaths.com/_files/ugd/7ac124_8caf4afcaaa44fa28b9498fbfe4af9a4.pdf", source: "Dr. Austin Maths", type: "pdf" },
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
        { title: "Drawing Straight Line Graphs", url: "https://www.youtube.com/embed/DGzZ6sFtoO8", source: "Corbettmaths", type: "video" },
        { title: "Gradient and Y-Intercept", url: "https://www.youtube.com/embed/HdlnBX82jxI", source: "Corbettmaths", type: "video" },
        { title: "Finding the Equation of a Straight Line", url: "https://www.youtube.com/embed/ZyS0Bni9a44", source: "Corbettmaths", type: "video" },
        { title: "Midpoint of a Line Segment", url: "https://www.youtube.com/embed/8c-NJwJb0YY", source: "Khan Academy", type: "video" },
        { title: "Understanding Function Notation", url: "https://www.youtube.com/embed/kvGsIo1TmsM", source: "Khan Academy", type: "video" },
        { title: "Graphing Linear Equations", url: "https://www.youtube.com/embed/2UrcUfBizyw", source: "Khan Academy", type: "video" },
        { title: "Linear Equations in Slope-Intercept Form", url: "https://www.youtube.com/embed/m9Y0_O0OXYk", source: "Math Antics", type: "video" }
      ],
      exercises: [
        { title: "Straight Line Graphs", url: "https://www.mathsgenie.co.uk/resources/16-graphs.pdf", source: "Maths Genie", type: "pdf" },
        { title: "Linear Functions Practice", url: "https://corbettmaths.com/wp-content/uploads/2019/03/Straight-Line-Graphs.pdf", source: "Corbettmaths", type: "pdf" },
        { title: "Finding Equations of Lines", url: "https://www.mathsgenie.co.uk/resources/7-equations-of-straight-lines.pdf", source: "Maths Genie", type: "pdf" }
      ],
      solutions: [
        { title: "Linear Functions Solutions", url: "https://corbettmaths.com/wp-content/uploads/2019/03/Straight-Line-Graphs-Answers.pdf", source: "Corbettmaths", type: "pdf" }
      ],
      otherResources: [
        { title: "Coordinates and Linear Graphs", url: "https://www.draustinmaths.com/coordinates-and-linear-graphs", source: "Dr. Austin Maths", type: "external" },
        { title: "Linear Graphs – Save My Exams", url: "https://www.savemyexams.com/igcse/maths/cie/25/extended/revision-notes/", source: "Save My Exams", type: "external" }
      ]
    },
    'simultaneous-equations': {
      videos: [
        { title: "Solving Systems of Equations", url: "https://www.youtube.com/embed/nok99JOhcjo", source: "Khan Academy", type: "video" },
        { title: "Simultaneous Equations (Elimination Method)", url: "https://www.youtube.com/embed/1JXG5aPz_f8", source: "Corbettmaths", type: "video" },
        { title: "Solving Simultaneous Equations Graphically", url: "https://www.youtube.com/embed/ValGgmpE1zs", source: "Corbettmaths", type: "video" },
        { title: "Simultaneous Equations (Elimination Method)", url: "https://www.youtube.com/embed/Zsn_-eD7L6c", source: "Corbettmaths", type: "video" },
        { title: "Solving Simultaneous Equations by Substitution", url: "https://www.youtube.com/embed/GbSPb3X1VO0", source: "Corbettmaths", type: "video" },
        { title: "Word Problems with Simultaneous Equations", url: "https://www.youtube.com/embed/qlGOjlw__Zo", source: "Khan Academy", type: "video" },
        { title: "Linear Systems of 3 Variables", url: "https://www.youtube.com/embed/gMZLnr-i-7o", source: "Khan Academy", type: "video" }
      ],
      exercises: [
        { title: "Simultaneous Equations", url: "https://www.mathsgenie.co.uk/resources/5-simultaneous-equations.pdf", source: "Maths Genie", type: "pdf" },
        { title: "Simultaneous Equations", url: "https://corbettmaths.com/wp-content/uploads/2019/09/Simultaneous-Equations.pdf", source: "Corbettmaths", type: "pdf" },
        { title: "Simultaneous Equations Word Problems", url: "https://corbettmaths.com/wp-content/uploads/2018/11/Simultaneous-Equations-Word-Problems.pdf", source: "Corbettmaths", type: "pdf" }
      ],
      solutions: [
        { title: "Simultaneous Equations Answers", url: "https://www.mathsgenie.co.uk/resources/5-simultaneous-equationsans.pdf", source: "Maths Genie", type: "pdf" },
        { title: "Simultaneous Equations Solutions", url: "https://corbettmaths.com/wp-content/uploads/2019/09/Simultaneous-Equations-Answers.pdf", source: "Corbettmaths", type: "pdf" }
      ],
      otherResources: [
        { title: "Simultaneous Equations Practice Questions", url: "https://www.savemyexams.com/igcse/maths/cie/25/extended/topic-questions/simultaneous-equations/", source: "Save My Exams", type: "external" },
        { title: "Simultaneous Equations – Save My Exams", url: "https://www.savemyexams.com/igcse/maths/cie/25/extended/topic-questions/", source: "Save My Exams", type: "external" }
      ]
    },
    'parallel-perpendicular-lines': {
      videos: [
        { title: "Parallel and Perpendicular Lines", url: "https://www.youtube.com/embed/6oJ3QqbL7Yc", source: "Corbettmaths", type: "video" },
        { title: "Parallel & Perpendicular Lines Intro", url: "https://www.youtube.com/embed/0XOcH_XySp0", source: "Khan Academy", type: "video" }
      ],
      exercises: [
        { title: "Parallel and Perpendicular Lines", url: "https://www.mathsgenie.co.uk/resources/6-parallel-and-perpendicular-lines.pdf", source: "Maths Genie", type: "pdf" }
      ],
      solutions: [],
      otherResources: []
    },
    'perpendicular-bisector': {
      videos: [
        { title: "Perpendicular Bisector", url: "https://www.youtube.com/embed/9L9T7_S72X4", source: "Corbettmaths", type: "video" }
      ],
      exercises: [],
      solutions: [],
      otherResources: [
        { title: "Perpendicular Lines", url: "https://www.savemyexams.com/igcse/maths/cie/international-maths/23/extended/revision-notes/coordinate-geometry-and-graphs/straight-line-graphs/perpendicular-lines/", source: "SaveMyExams", type: "external" }
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
        { title: "Laws of Indices Worksheet", url: "https://corbettmaths.com/wp-content/uploads/2018/11/Laws-of-Indices-pdf.pdf", source: "Corbettmaths", type: "pdf" },
        { title: "Fractional Indices", url: "https://corbettmaths.com/wp-content/uploads/2018/11/Fractional-Indices-pdf.pdf", source: "Corbettmaths", type: "pdf" },
        { title: "Negative Indices", url: "https://corbettmaths.com/wp-content/uploads/2018/11/Negative-Indices-pdf.pdf", source: "Corbettmaths", type: "pdf" },
        { title: "Indices Questions", url: "https://www.mathsgenie.co.uk/resources/4-indices.pdf", source: "Maths Genie", type: "pdf" },
        { title: "Fractional and Negative Indices", url: "https://www.mathsgenie.co.uk/resources/6-fractional-and-negative-indices.pdf", source: "Maths Genie", type: "pdf" },
        { title: "Simplifying Using Laws of Indices Practice Strips", url: "https://www.draustinmaths.com/_files/ugd/7ac124_c5f2ce9fe1d742dd9cd0c354d0b2ab94.pdf", source: "Dr. Austin Maths", type: "pdf" }
      ],
      solutions: [],
      otherResources: []
    },
    'expansion-brackets': {
      videos: [],
      exercises: [
        { title: "Expanding Single Brackets", url: "https://corbettmaths.com/wp-content/uploads/2013/02/expanding-brackets-pdf1.pdf", source: "Corbettmaths", type: "pdf" },
        { title: "Expanding Double Brackets", url: "https://corbettmaths.com/wp-content/uploads/2013/02/expanding-brackets-2-pdf.pdf", source: "Corbettmaths", type: "pdf" },
        { title: "Expanding Triple Brackets", url: "https://corbettmaths.com/wp-content/uploads/2013/02/expanding-brackets-3-pdf.pdf", source: "Corbettmaths", type: "pdf" },
        { title: "Expanding Brackets Revision Grid", url: "https://www.draustinmaths.com/_files/ugd/7ac124_dada3c9a77f04c95ba1d9b2ddf3b9245.pdf", source: "Dr. Austin Maths", type: "pdf" },
        { title: "Expanding and Factorising", url: "https://www.mathsgenie.co.uk/resources/4-expanding-and-factorising.pdf", source: "Maths Genie", type: "pdf" },
        { title: "Expanding Triple Brackets", url: "https://www.mathsgenie.co.uk/resources/6-expanding-triple-brackets.pdf", source: "Maths Genie", type: "pdf" }
      ],
      solutions: [],
      otherResources: []
    },
    'factorisation': {
      videos: [],
      exercises: [
        { title: "Factorising (Common Factor)", url: "https://corbettmaths.com/wp-content/uploads/2013/02/factorising-pdf1.pdf", source: "Corbettmaths", type: "pdf" },
        { title: "Factorising Quadratics", url: "https://corbettmaths.com/wp-content/uploads/2013/02/factorising-quadratics-pdf1.pdf", source: "Corbettmaths", type: "pdf" },
        { title: "Difference of Two Squares", url: "https://corbettmaths.com/wp-content/uploads/2013/02/difference-between-two-squares-pdf.pdf", source: "Corbettmaths", type: "pdf" },
        { title: "Factorising Revision Grid", url: "https://www.draustinmaths.com/_files/ugd/7ac124_e4e34d485daf40d4a18aa76456a8a82a.pdf", source: "Dr. Austin Maths", type: "pdf" },
        { title: "Factorising with Common Factors Practice Grid", url: "https://www.draustinmaths.com/_files/ugd/7ac124_c5b33eed09b64ac9a81c6b2e48b60c83.pdf", source: "Dr. Austin Maths", type: "pdf" },
        { title: "Expanding and Factorising Quadratics", url: "https://www.mathsgenie.co.uk/resources/5-expanding-and-factorising-quadratics.pdf", source: "Maths Genie", type: "pdf" },
        { title: "Factorising Harder Quadratics", url: "https://www.mathsgenie.co.uk/resources/7-factorising-harder-quadratics.pdf", source: "Maths Genie", type: "pdf" }
      ],
      solutions: [],
      otherResources: []
    },
    'basic-angle-relationships': {
      videos: [
        { title: "Angles at a point, on straight lines", url: "https://www.youtube.com/embed/DGKwdHMiqCg", source: "Khan Academy", type: "video" },
        { title: "Angles formed by parallel lines and transversals", url: "https://www.youtube.com/embed/bPPfgZoLMEE", source: "Khan Academy", type: "video" },
        { title: "Angles on Parallel Lines", url: "https://www.youtube.com/embed/6oJ3QqbL7Yc", source: "Math Antics", type: "video" },
        { title: "Angles In Parallel Lines", url: "https://www.youtube.com/embed/WI_U1X-jPHg", source: "FuseSchool", type: "video" },
        { title: "Alternate, Corresponding and Allied Angles", url: "https://www.youtube.com/embed/I5auyoXYoX0", source: "Corbettmaths", type: "video" },
        { title: "Angles in Triangles", url: "https://www.youtube.com/embed/7Gs9YS1PJ_U", source: "Corbettmaths", type: "video" },
        { title: "Angles in Polygons", url: "https://www.youtube.com/embed/_mkqCGYfK2o", source: "Corbettmaths", type: "video" }
      ],
      exercises: [
        { title: "Angles on a Straight Line", url: "https://corbettmaths.com/wp-content/uploads/2013/02/angles-on-a-straight-line-pdf.pdf", source: "Corbettmaths", type: "pdf" },
        { title: "Angles Around a Point", url: "https://corbettmaths.com/wp-content/uploads/2013/02/angles-around-a-point-pdf.pdf", source: "Corbettmaths", type: "pdf" },
        { title: "Vertically Opposite Angles", url: "https://corbettmaths.com/wp-content/uploads/2013/02/vertically-opposite-angles-pdf.pdf", source: "Corbettmaths", type: "pdf" },
        { title: "Angles in Parallel Lines", url: "https://corbettmaths.com/wp-content/uploads/2019/02/Angles-in-Parallel-Lines.pdf", source: "Corbettmaths", type: "pdf" },
        { title: "Angles in Triangles", url: "https://corbettmaths.com/wp-content/uploads/2018/09/Angles-in-Triangles-pdf.pdf", source: "Corbettmaths", type: "pdf" },
        { title: "Angles in Polygons", url: "https://corbettmaths.com/wp-content/uploads/2013/02/angles-in-polygons-pdf1.pdf", source: "Corbettmaths", type: "pdf" }
      ],
      solutions: [
        { title: "Angles in Parallel Lines Solutions", url: "https://corbettmaths.com/wp-content/uploads/2019/02/Angles-in-Parallel-Lines-Answers.pdf", source: "Corbettmaths", type: "pdf" }
      ],
      otherResources: [
        { title: "Angle Properties", url: "https://www.savemyexams.com/igcse/maths/cie/25/extended/revision-notes/geometry/angle-properties/", source: "Save My Exams", type: "external" },
        { title: "Interactive Angle Explorer", url: "https://www.geogebra.org/m/BpjHRGY6", source: "GeoGebra", type: "external" }
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
        { title: "Converting Areas and Volumes", url: "https://corbettmaths.com/wp-content/uploads/2013/02/converting-areas-and-volumes-pdf.pdf", source: "Corbettmaths", type: "pdf" },
        { title: "Conversions and Units", url: "https://www.mathsgenie.co.uk/resources/3-conversions-and-units.pdf", source: "Maths Genie", type: "pdf" },
        { title: "Converting Metric Units Revision Grid", url: "https://www.draustinmaths.com/_files/ugd/7ac124_fe77e5db5e0f41cc98b7613e8cb15d5a.pdf", source: "Dr. Austin Maths", type: "pdf" },
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
        { title: "Area of Triangle", url: "https://corbettmaths.com/wp-content/uploads/2013/02/area-of-a-triangle-pdf1.pdf", source: "Corbettmaths", type: "pdf" },
        { title: "Area of Parallelogram", url: "https://corbettmaths.com/wp-content/uploads/2013/02/area-of-a-parallelogram-pdf1.pdf", source: "Corbettmaths", type: "pdf" },
        { title: "Area of Trapezium", url: "https://corbettmaths.com/wp-content/uploads/2013/02/area-of-a-trapezium-pdf1.pdf", source: "Corbettmaths", type: "pdf" },
        { title: "Area of Compound Shapes", url: "https://corbettmaths.com/wp-content/uploads/2013/02/area-of-compound-shapes-pdf1.pdf", source: "Corbettmaths", type: "pdf" },
        { title: "Area and Perimeter", url: "https://www.mathsgenie.co.uk/resources/2-area-and-perimeter.pdf", source: "Maths Genie", type: "pdf" },
        { title: "Area of Compound Shapes", url: "https://www.mathsgenie.co.uk/resources/37_area-of-compound-shapes.pdf", source: "Maths Genie", type: "pdf" },
        { title: "Area and Perimeter Revision Grid", url: "https://www.draustinmaths.com/_files/ugd/7ac124_42522e3bbbfa49dda73215f4642784dc.pdf", source: "Dr. Austin Maths", type: "pdf" },
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
        { title: "Bearings Introduction", url: "https://www.youtube.com/embed/M4_BUK5Lxhw", source: "Corbettmaths", type: "video" },
        { title: "Bearings Problems", url: "https://www.youtube.com/embed/hrSyNrP6e6s", source: "Corbettmaths", type: "video" }
      ],
      exercises: [
        { title: "Bearings Worksheet", url: "https://corbettmaths.com/wp-content/uploads/2013/02/bearings-pdf1.pdf", source: "Corbettmaths", type: "pdf" },
        { title: "Bearings Questions", url: "https://www.mathsgenie.co.uk/resources/6-bearings.pdf", source: "Maths Genie", type: "pdf" }
      ],
      solutions: [
        { title: "Bearings Solutions", url: "https://www.mathsgenie.co.uk/resources/6-bearingsans.pdf", source: "Maths Genie", type: "pdf" }
      ],
      otherResources: []
    },
    'pythagoras-theorem': {
      videos: [],
      exercises: [
        { title: "Pythagoras Theorem Worksheet", url: "https://corbettmaths.com/wp-content/uploads/2013/02/pythagoras-pdf1.pdf", source: "Corbettmaths", type: "pdf" },
        { title: "Pythagoras Practice Questions", url: "https://www.mathsgenie.co.uk/resources/5-pythagoras-ws.pdf", source: "Maths Genie", type: "pdf" }
      ],
      solutions: [
        { title: "Pythagoras Practice Solutions", url: "https://www.mathsgenie.co.uk/resources/5-pythagorasans.pdf", source: "Maths Genie", type: "pdf" }
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
        { title: "Solving Equations Worksheet", url: "https://corbettmaths.com/wp-content/uploads/2013/02/solving-equations-pdf1.pdf", source: "Corbettmaths", type: "pdf" },
        { title: "Equations with Brackets", url: "https://corbettmaths.com/wp-content/uploads/2019/02/Equations-with-Brackets.pdf", source: "Corbettmaths", type: "pdf" },
        { title: "Equations with Unknowns on Both Sides", url: "https://corbettmaths.com/wp-content/uploads/2013/02/equations-with-unknowns-on-both-sides-pdf.pdf", source: "Corbettmaths", type: "pdf" },
        { title: "Equations with Fractions", url: "https://corbettmaths.com/wp-content/uploads/2013/02/equations-with-fractions-pdf.pdf", source: "Corbettmaths", type: "pdf" },
        { title: "Solving Equations", url: "https://www.mathsgenie.co.uk/resources/3-solving-equations.pdf", source: "Maths Genie", type: "pdf" },
        { title: "Equations and Inequalities Revision Grid", url: "https://www.draustinmaths.com/_files/ugd/7ac124_49d51b15e0974d9da79b75eec1c2f12a.pdf", source: "Dr. Austin Maths", type: "pdf" }
      ],
      solutions: [],
      otherResources: []
    },
    'inequalities-interpretation': {
      videos: [],
      exercises: [
        { title: "Inequalities Worksheet", url: "https://corbettmaths.com/wp-content/uploads/2013/02/inequalities-pdf1.pdf", source: "Corbettmaths", type: "pdf" },
        { title: "Representing Inequalities on a Number Line", url: "https://corbettmaths.com/wp-content/uploads/2013/02/representing-inequalities-on-a-number-line-pdf.pdf", source: "Corbettmaths", type: "pdf" }
      ],
      solutions: [],
      otherResources: []
    },
    'inequalities-solution': {
      videos: [],
      exercises: [
        { title: "Solving Inequalities Worksheet", url: "https://corbettmaths.com/wp-content/uploads/2013/02/solving-inequalities-pdf1.pdf", source: "Corbettmaths", type: "pdf" },
        { title: "Solving Inequalities", url: "https://www.mathsgenie.co.uk/resources/3-solving-inequalities.pdf", source: "Maths Genie", type: "pdf" }
      ],
      solutions: [],
      otherResources: []
    },
    'algebraic-fractions-simplification': {
      videos: [
        { title: "Simplifying Algebraic Fractions", url: "https://www.youtube.com/embed/zCoJMG_MvGI", source: "Corbettmaths", type: "video" },
        { title: "Algebraic Fractions Introduction", url: "https://www.youtube.com/embed/XZJKrUWnEzM", source: "Khan Academy", type: "video" },
        { title: "Simplifying Complex Fractions", url: "https://www.youtube.com/embed/tsEjLbPySH0", source: "Khan Academy", type: "video" }
      ],
      exercises: [
        { title: "Algebraic Fractions (Basic)", url: "https://corbettmaths.com/wp-content/uploads/2019/02/Algebraic-Fractions.pdf", source: "Corbettmaths", type: "pdf" },
        { title: "Simplifying Algebraic Fractions", url: "https://www.mathsgenie.co.uk/resources/9-simplifying-algebraic-fractions.pdf", source: "Maths Genie", type: "pdf" }
      ],
      solutions: [
        { title: "Algebraic Fractions Solutions", url: "https://corbettmaths.com/wp-content/uploads/2019/02/Algebraic-Fractions-Answers.pdf", source: "Corbettmaths", type: "pdf" }
      ],
      otherResources: []
    },
    'algebraic-fractions-addition': {
      videos: [
        { title: "Adding and Subtracting Algebraic Fractions", url: "https://www.youtube.com/embed/4JlkA4BrJR4", source: "Corbettmaths", type: "video" },
        { title: "Add and Subtract Rational Expressions", url: "https://www.youtube.com/embed/CwMT9gi73m0", source: "Khan Academy", type: "video" }
      ],
      exercises: [
        { title: "Adding Algebraic Fractions", url: "https://corbettmaths.com/wp-content/uploads/2013/02/adding-algebraic-fractions-pdf1.pdf", source: "Corbettmaths", type: "pdf" },
        { title: "Advanced Algebraic Fractions", url: "https://www.mathsgenie.co.uk/resources/a-level/pure/algebraicfractionsfurther.pdf", source: "Maths Genie", type: "pdf" }
      ],
      solutions: [],
      otherResources: []
    },
    'algebraic-fractions-multiplication': {
      videos: [
        { title: "Multiplying and Dividing Algebraic Fractions", url: "https://www.youtube.com/embed/s9w3E-SXSEE", source: "Corbettmaths", type: "video" },
        { title: "Multiply and Divide Rational Expressions", url: "https://www.youtube.com/embed/-YmGJV5Xjws", source: "Khan Academy", type: "video" }
      ],
      exercises: [
        { title: "Multiplying Algebraic Fractions", url: "https://corbettmaths.com/wp-content/uploads/2013/02/multiplying-algebraic-fractions.pdf", source: "Corbettmaths", type: "pdf" },
        { title: "Dividing Algebraic Fractions", url: "https://corbettmaths.com/wp-content/uploads/2013/02/dividing-algebraic-fractions.pdf", source: "Corbettmaths", type: "pdf" }
      ],
      solutions: [],
      otherResources: [
        { title: "Algebraic Fractions Complete Guide", url: "https://www.savemyexams.com/igcse/maths/cie/25/extended/revision-notes/algebra-and-sequences/algebraic-fractions/", source: "Save My Exams", type: "external" }
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
        { title: "Introduction to Quadratic Functions", url: "https://www.youtube.com/embed/4--eScc-vMs", source: "Khan Academy", type: "video" },
        { title: "Quadratic Functions Intro", url: "https://www.youtube.com/embed/X__2Hzd_e1g", source: "Khan Academy", type: "video" },
        { title: "Completing the Square", url: "https://www.youtube.com/embed/YBhLfSHXWLM", source: "Corbettmaths", type: "video" }
      ],
      exercises: [
        { title: "Quadratic Functions Worksheet", url: "https://corbettmaths.com/wp-content/uploads/2013/02/quadratic-functions-pdf1.pdf", source: "Corbettmaths", type: "pdf" },
        { title: "Quadratic Patterns Worksheet", url: "https://corbettmaths.com/wp-content/uploads/2013/02/quadratic-patterns-pdf1.pdf", source: "Corbettmaths", type: "pdf" },
        { title: "Completing the Square", url: "https://corbettmaths.com/wp-content/uploads/2019/03/Completing-the-Square.pdf", source: "Corbettmaths", type: "pdf" }
      ],
      solutions: [
        { title: "Completing the Square Solutions", url: "https://corbettmaths.com/wp-content/uploads/2019/03/Completing-the-Square-Answers.pdf", source: "Corbettmaths", type: "pdf" }
      ],
      otherResources: []
    },
    'factorisation-method': {
      videos: [
        { title: "Solving Quadratics by Factorisation", url: "https://www.youtube.com/embed/GJwb1aZUxW8", source: "Corbettmaths", type: "video" },
        { title: "Factoring Simple Quadratics", url: "https://www.youtube.com/embed/1bu0tBpJ0zo", source: "Khan Academy", type: "video" },
        { title: "Factoring Quadratics with Negative Coefficients", url: "https://www.youtube.com/embed/AEZrXQ-VUzk", source: "Khan Academy", type: "video" }
      ],
      exercises: [
        { title: "Solving Quadratic Equations Worksheet", url: "https://corbettmaths.com/wp-content/uploads/2013/02/solving-quadratic-equations-pdf1.pdf", source: "Corbettmaths", type: "pdf" },
        { title: "Factorising Quadratics", url: "https://www.mathsgenie.co.uk/resources/5-factorising-quadratics.pdf", source: "Maths Genie", type: "pdf" }
      ],
      solutions: [
        { title: "Factorising Quadratics Solutions", url: "https://www.mathsgenie.co.uk/resources/5-factorising-quadraticsans.pdf", source: "Maths Genie", type: "pdf" }
      ],
      otherResources: []
    },
    'quadratic-formula': {
      videos: [
        { title: "The Quadratic Formula", url: "https://www.youtube.com/embed/i7idZfS8t8w", source: "Khan Academy", type: "video" },
        { title: "Using the Quadratic Formula", url: "https://www.youtube.com/embed/JBIDo8zaMkU", source: "Corbettmaths", type: "video" },
        { title: "Quadratic Formula Explained", url: "https://www.youtube.com/embed/3J0ccr74LcU", source: "Corbettmaths", type: "video" }
      ],
      exercises: [],
      solutions: [],
      otherResources: [
        { title: "Sum and Product of Roots", url: "https://www.khanacademy.org/math/in-in-grade-10-ncert/x573d8ce20721c073:polynomials/x573d8ce20721c073:relationship-between-zeroes-and-coefficients/e/finding-the-unknown-through-sum-and-product-of-roots", source: "Khan Academy", type: "external" }
      ]
    },
    'gdc-quadratics': {
      videos: [
        { title: "Solving Quadratics with Technology", url: "https://www.youtube.com/embed/2NPZ2SRKK2U", source: "Texas Instruments", type: "video" },
        { title: "Solving Quadratic Equations Using GDC", url: "https://www.youtube.com/embed/zp2GNFhOzgo", source: "Mark Willis", type: "video" }
      ],
      exercises: [],
      solutions: [],
      otherResources: [
        { title: "Solving Equations Using GDC", url: "https://www.savemyexams.com/dp/maths/ib/ai/21/hl/revision-notes/number-and-algebra/number-toolkit/gdc-solving-equations/", source: "SaveMyExams", type: "external" }
      ]
    },
    'parabola-properties': {
      videos: [
        { title: "The Vertex of a Parabola", url: "https://www.youtube.com/embed/EeiVIkUihuk", source: "Khan Academy", type: "video" },
        { title: "Finding Intercepts of Quadratic Functions", url: "https://www.youtube.com/embed/0jQVU71NzpM", source: "Khan Academy", type: "video" },
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
        { title: "Introduction to Sequences", url: "https://www.youtube.com/embed/YgeuJP9tHgQ", source: "Corbettmaths", type: "video" },
        { title: "Linear Sequences", url: "https://www.youtube.com/embed/LHRzDQN0a1o", source: "Corbettmaths", type: "video" },
        { title: "Nth Term", url: "https://www.youtube.com/embed/GecDgFwAlC0", source: "Corbettmaths", type: "video" },
        { title: "Arithmetic Sequences", url: "https://www.youtube.com/embed/ke0LGvMFPrQ", source: "FuseSchool", type: "video" },
        { title: "Finding Terms in a Sequence", url: "https://www.youtube.com/embed/qLJdsYjWUUo", source: "Khan Academy", type: "video" },
        { title: "Finding the Rule for a Linear Pattern", url: "https://www.youtube.com/embed/9EbZfX1TfnY", source: "Khan Academy", type: "video" }
      ],
      exercises: [
        { title: "Sequences Worksheet", url: "https://corbettmaths.com/wp-content/uploads/2013/02/sequences-pdf1.pdf", source: "Corbettmaths", type: "pdf" },
        { title: "Sequences Nth Term", url: "https://corbettmaths.com/wp-content/uploads/2018/12/nth-term-pdf.pdf", source: "Corbettmaths", type: "pdf" },
        { title: "Arithmetic Sequences Questions", url: "https://www.mathsgenie.co.uk/resources/4-nth-term.pdf", source: "Maths Genie", type: "pdf" }
      ],
      solutions: [
        { title: "Arithmetic Sequences Solutions", url: "https://www.mathsgenie.co.uk/resources/4-nth-termans.pdf", source: "Maths Genie", type: "pdf" }
      ],
      otherResources: [
        { title: "Sequences Practice", url: "https://www.savemyexams.com/igcse/maths/cie/25/extended/topic-questions/algebra-and-sequences/sequences/", source: "Save My Exams", type: "external" }
      ]
    },
    'quadratic-sequences': {
      videos: [
        { title: "Quadratic Sequences", url: "https://www.youtube.com/embed/2oHohH6_eis", source: "Corbettmaths", type: "video" },
        { title: "Quadratic Nth Term", url: "https://www.youtube.com/embed/AL-joUBnEIw", source: "Corbettmaths", type: "video" }
      ],
      exercises: [
        { title: "Quadratic Sequences Practice", url: "https://corbettmaths.com/wp-content/uploads/2021/04/Quadratic-Sequences.pdf", source: "Corbettmaths", type: "pdf" }
      ],
      solutions: [],
      otherResources: [
        { title: "Quadratic Sequences", url: "https://www.mathsgenie.co.uk/questions-quadratic-sequences.html", source: "Maths Genie", type: "external" },
        { title: "Quadratic & Cubic Sequences", url: "https://www.savemyexams.com/igcse/maths/cie/international-maths/23/core/revision-notes/algebra-and-sequences/sequences/quadratic-and-cubic-sequences/", source: "SaveMyExams", type: "external" }
      ]
    },
    'cubic-sequences': {
      videos: [
        { title: "Cubic Sequences", url: "https://www.youtube.com/embed/8A0FQ5xJ2YU", source: "CrashMaths", type: "video" }
      ],
      exercises: [],
      solutions: [],
      otherResources: [
        { title: "Quadratic & Cubic Sequences", url: "https://www.savemyexams.com/igcse/maths/cie/international-maths/23/core/revision-notes/algebra-and-sequences/sequences/quadratic-and-cubic-sequences/", source: "SaveMyExams", type: "external" }
      ]
    },
    'geometric-sequences': {
      videos: [
        { title: "Geometric Sequences", url: "https://www.youtube.com/embed/xYO2P_PVQQk", source: "Khan Academy", type: "video" },
        { title: "Geometric Sequences and Series", url: "https://www.youtube.com/embed/WhYdjxYhDnk", source: "Corbettmaths", type: "video" }
      ],
      exercises: [
        { title: "Geometric Progressions", url: "https://corbettmaths.com/wp-content/uploads/2024/11/Geometric-Progressions.pdf", source: "Corbettmaths", type: "pdf" }
      ],
      solutions: [],
      otherResources: [
        { title: "Geometric Sequences", url: "https://www.khanacademy.org/math/algebra/x2f8bb11595b61c86:sequences/x2f8bb11595b61c86:constructing-geometric-sequences/a/geometric-sequences-review", source: "Khan Academy", type: "external" },
        { title: "Geometric Sequences Practice", url: "https://www.khanacademy.org/math/algebra/x2f8bb11595b61c86:sequences/x2f8bb11595b61c86:introduction-to-geometric-sequences/e/geometric_sequences_2", source: "Khan Academy", type: "external" }
      ]
    }
  },
  'unit-7': {
    'function-notation': {
      videos: [
        { title: "Function Notation", url: "https://www.youtube.com/embed/kY4R3WjkRI0", source: "Khan Academy", type: "video" },
        { title: "Understanding Function Notation", url: "https://www.youtube.com/embed/kvGsIo1TmsM", source: "Khan Academy", type: "video" },
        { title: "Functions", url: "https://www.youtube.com/embed/uha8WJ5J-WA", source: "Corbettmaths", type: "video" },
        { title: "Domain and Range", url: "https://www.youtube.com/embed/O0uUVH8dRiU", source: "Khan Academy", type: "video" },
        { title: "Evaluating Functions", url: "https://www.youtube.com/embed/FZ02S8m-cnQ", source: "Khan Academy", type: "video" }
      ],
      exercises: [
        { title: "Function Notation Introduction", url: "https://corbettmaths.com/wp-content/uploads/2019/04/Function-Notation.pdf", source: "Corbettmaths", type: "pdf" },
        { title: "Domain and Range Questions", url: "https://www.mathsgenie.co.uk/resources/6-domain-and-range.pdf", source: "Maths Genie", type: "pdf" }
      ],
      solutions: [
        { title: "Domain and Range Solutions", url: "https://www.mathsgenie.co.uk/resources/6-domain-and-rangeans.pdf", source: "Maths Genie", type: "pdf" }
      ],
      otherResources: [
        { title: "Introduction to Functions", url: "https://www.savemyexams.com/igcse/maths/cie/25/extended/revision-notes/algebra-and-sequences/functions/introduction/", source: "SaveMyExams", type: "external" }
      ]
    },
    'composite-functions': {
      videos: [
        { title: "Composite Functions", url: "https://www.youtube.com/embed/OXt-Dw7jYYM", source: "Khan Academy", type: "video" },
        { title: "Composite Functions", url: "https://www.youtube.com/embed/z_rNIy_bWCU", source: "Maths Genie", type: "video" },
        { title: "Composite Functions", url: "https://www.youtube.com/embed/10-2jg4lhEI", source: "Corbettmaths", type: "video" },
        { title: "Composing Functions", url: "https://www.youtube.com/embed/3L0N4WyDYh4", source: "Khan Academy", type: "video" }
      ],
      exercises: [
        { title: "Composite Functions", url: "https://corbettmaths.com/wp-content/uploads/2019/04/Composite-Functions.pdf", source: "Corbettmaths", type: "pdf" },
        { title: "Composite and Inverse Functions", url: "https://www.mathsgenie.co.uk/resources/7-composite-and-inverse-functions.pdf", source: "Maths Genie", type: "pdf" }
      ],
      solutions: [
        { title: "Composite Functions Solutions", url: "https://corbettmaths.com/wp-content/uploads/2019/04/Composite-Functions-Answers.pdf", source: "Corbettmaths", type: "pdf" }
      ],
      otherResources: [
        { title: "Functions", url: "https://www.draustinmaths.com/functions", source: "Dr. Austin Maths", type: "external" }
      ]
    },
    'inverse-functions': {
      videos: [
        { title: "Inverse Functions", url: "https://www.youtube.com/embed/T4m0-6Nf_QE", source: "Khan Academy", type: "video" },
        { title: "Inverse Functions", url: "https://www.youtube.com/embed/xOfN_VeTDcE", source: "Corbettmaths", type: "video" }
      ],
      exercises: [
        { title: "Inverse Functions", url: "https://corbettmaths.com/wp-content/uploads/2019/04/Inverse-Functions.pdf", source: "Corbettmaths", type: "pdf" }
      ],
      solutions: [],
      otherResources: [
        { title: "Finding Inverse Functions", url: "https://www.khanacademy.org/math/algebra-home/alg-functions/alg-finding-inverse-functions/a/finding-inverse-functions", source: "Khan Academy", type: "external" },
        { title: "Inverse Functions", url: "https://www.savemyexams.com/gcse/maths/edexcel/22/higher/revision-notes/algebra/functions/inverse-functions/", source: "SaveMyExams", type: "external" }
      ]
    },
    'variation': {
      videos: [
        { title: "Direct Variation", url: "https://www.youtube.com/embed/QwE9Vof-OaQ", source: "Khan Academy", type: "video" },
        { title: "Inverse Variation", url: "https://www.youtube.com/embed/3BRkE7qpBqU", source: "Khan Academy", type: "video" }
      ],
      exercises: [
        { title: "Direct and Inverse Proportion", url: "https://corbettmaths.com/wp-content/uploads/2013/02/direct-and-inverse-proportion-pdf.pdf", source: "Corbettmaths", type: "pdf" }
      ],
      solutions: [],
      otherResources: []
    }
  },
  'unit-8': {
    'right-angled-trigonometry': {
      videos: [
        { title: "Introduction to Trigonometry", url: "https://www.youtube.com/embed/F21S9Wpi0y8", source: "Khan Academy", type: "video" },
        { title: "SOHCAHTOA Explained", url: "https://www.youtube.com/embed/wXMO_jYBKPE", source: "Corbettmaths", type: "video" },
        { title: "Trigonometry - Finding Missing Sides", url: "https://www.youtube.com/embed/bALUluXOuTc", source: "Corbettmaths", type: "video" },
        { title: "Trigonometry - Finding Missing Angles", url: "https://www.youtube.com/embed/fP6zFupOxqM", source: "Corbettmaths", type: "video" }
      ],
      exercises: [
        { title: "Trigonometry Worksheet", url: "https://corbettmaths.com/wp-content/uploads/2013/02/trigonometry-pdf1.pdf", source: "Corbettmaths", type: "pdf" },
        { title: "Trigonometry - Missing Sides", url: "https://corbettmaths.com/wp-content/uploads/2013/02/trigonometry-missing-sides-pdf.pdf", source: "Corbettmaths", type: "pdf" },
        { title: "Trigonometry - Missing Angles", url: "https://corbettmaths.com/wp-content/uploads/2013/02/trigonometry-missing-angles-pdf.pdf", source: "Corbettmaths", type: "pdf" },
        { title: "Trigonometry Revision Grid", url: "https://www.draustinmaths.com/_files/ugd/7ac124_cc79be15865842bdaef4c8bfecd2ba67.pdf", source: "Dr. Austin Maths", type: "pdf" },
        { title: "SOHCAHTOA (Trigonometry) Worksheet", url: "https://www.mathsgenie.co.uk/resources/5-SOHCAHTOA-ws.pdf", source: "Maths Genie", type: "pdf" }
      ],
      solutions: [
        { title: "SOHCAHTOA Solutions", url: "https://www.mathsgenie.co.uk/resources/5-sohcahtoaans.pdf", source: "Maths Genie", type: "pdf" }
      ],
      otherResources: [
        { title: "Trigonometry Calculator", url: "https://www.mathsisfun.com/algebra/trig-calculator.html", source: "Maths Is Fun", type: "external" }
      ]
    },
    'angles-elevation-depression': {
      videos: [
        { title: "Angles of Elevation and Depression", url: "https://www.youtube.com/embed/_WllQRr_n7I", source: "Khan Academy", type: "video" }
      ],
      exercises: [
        { title: "Angles of Elevation/Depression", url: "https://corbettmaths.com/wp-content/uploads/2013/02/angles-of-elevation-pdf.pdf", source: "Corbettmaths", type: "pdf" }
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
  { title: "Cambridge IGCSE International Mathematics (0607) Past Papers", url: "https://www.cambridgeinternational.org/programmes-and-qualifications/cambridge-igcse-international-mathematics-0607/past-papers/", source: "Cambridge International", type: "external" },
  { title: "Cambridge IGCSE 0607 Syllabus 2023-2024", url: "https://www.cambridgeinternational.org/Images/597050-2023-2024-syllabus.pdf", source: "Cambridge International", type: "pdf" },
  { title: "Cambridge IGCSE 0607 Syllabus 2025-2027", url: "https://www.cambridgeinternational.org/Images/662472-2025-2027-syllabus.pdf", source: "Cambridge International", type: "pdf" },
  { title: "Cambridge IGCSE Learner Guide", url: "https://www.cienotes.com/wp-content/uploads/2018/08/499921-learner-guide-2020-.pdf", source: "Cambridge International", type: "pdf" },
  { title: "IGCSE Exam Questions by Topic", url: "https://mathsaurus.com/gcse-and-igcse/igcse-exam-questions-by-topic/", source: "Mathsaurus", type: "external" },
  { title: "Cambridge IGCSE International Maths Past Papers", url: "https://www.savemyexams.com/igcse/maths/cie/international-maths/past-papers/", source: "Save My Exams", type: "external" }
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