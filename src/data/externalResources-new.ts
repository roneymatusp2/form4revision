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
        { title: "Solving Simultaneous Equations Graphically", url: "https://www.youtube.com/embed/9hryH94KFJA", source: "Corbettmaths", type: "video" },
        { title: "Systems of Equations with Graphing", url: "https://www.youtube.com/embed/nok99JOhcjo", source: "Khan Academy", type: "video" },
        { title: "Simultaneous Equations using Substitution", url: "https://www.youtube.com/embed/phlus4x0UqM", source: "Corbettmaths", type: "video" },
        { title: "Simultaneous Equations by Substitution", url: "https://www.youtube.com/embed/0waEImwwz7A", source: "FuseSchool", type: "video" },
        { title: "Simultaneous Equations (Elimination Method)", url: "https://www.youtube.com/embed/z_rNIy_bWCU", source: "Corbettmaths", type: "video" },
        { title: "Solving Systems of Equations by Elimination", url: "https://www.youtube.com/embed/i7idZfS8t8w", source: "Khan Academy", type: "video" }
      ],
      exercises: [
        { title: "Solving Simultaneous Equations Graphically Worksheet", url: "https://www.mathsgenie.co.uk/resources/5-simultaneous-equations.pdf", source: "Maths Genie", type: "pdf" },
        { title: "Solving Simultaneous Equations by Substitution Practice Strips", url: "https://www.draustinmaths.com/_files/ugd/7ac124_cea2b0712ca24097a035a428f4d93233.pdf", source: "Dr Austin Maths", type: "pdf" },
        { title: "Simultaneous Equations (Elimination Practice)", url: "https://www.draustinmaths.com/_files/ugd/7ac124_1e4f9811d2b3468abfe7b4375336b4e9.pdf", source: "Dr Austin Maths", type: "pdf" }
      ],
      solutions: [
        { title: "Graphical Simultaneous Equations Model Solutions", url: "https://www.mathsgenie.co.uk/resources/5-simultaneous-equationsans.pdf", source: "Maths Genie", type: "pdf" },
        { title: "Substitution Method Answers", url: "https://www.draustinmaths.com/_files/ugd/7ac124_279f05f5f79c45059658b741c52f30d7.pdf", source: "Dr Austin Maths", type: "pdf" },
        { title: "Elimination Practice Answers", url: "https://www.draustinmaths.com/_files/ugd/7ac124_ff7487c8484c45fb9c9bbb7f7c837be1.pdf", source: "Dr Austin Maths", type: "pdf" }
      ],
      otherResources: [
        { title: "Interactive Graphing Tool for Simultaneous Equations", url: "https://www.khanacademy.org/math/algebra/x2f8bb11595b61c86:systems-of-equations/x2f8bb11595b61c86:solving-systems-with-graphing/e/graphing_systems_of_equations", source: "Khan Academy", type: "external" }
      ]
    }
  },
  'unit-2': {
    'exponents-indices': {
      videos: [],
      exercises: [
        { title: "Indices Worksheet", url: "https://corbettmaths.com/wp-content/uploads/2013/02/indices-pdf.pdf", source: "Corbettmaths", type: "pdf" },
        { title: "Indices Questions", url: "https://www.mathsgenie.co.uk/resources/4-indices.pdf", source: "Maths Genie", type: "pdf" },
        { title: "Fractional and Negative Indices", url: "https://www.mathsgenie.co.uk/resources/6-fractional-and-negative-indices.pdf", source: "Maths Genie", type: "pdf" }
      ],
      solutions: [],
      otherResources: []
    },
    'expansion-brackets': {
      videos: [],
      exercises: [
        { title: "Expanding Single Brackets", url: "https://corbettmaths.com/wp-content/uploads/2013/02/expanding-brackets-pdf1.pdf", source: "Corbettmaths", type: "pdf" },
        { title: "Expanding and Factorising", url: "https://www.mathsgenie.co.uk/resources/4-expanding-and-factorising.pdf", source: "Maths Genie", type: "pdf" },
        { title: "Expanding Triple Brackets", url: "https://www.mathsgenie.co.uk/resources/6-expanding-triple-brackets.pdf", source: "Maths Genie", type: "pdf" }
      ],
      solutions: [],
      otherResources: []
    },
    'factorisation': {
      videos: [],
      exercises: [
        { title: "Factorising Quadratics", url: "https://corbettmaths.com/wp-content/uploads/2013/02/factorising-quadratics-pdf1.pdf", source: "Corbettmaths", type: "pdf" },
        { title: "Difference of Two Squares", url: "https://corbettmaths.com/wp-content/uploads/2013/02/difference-between-two-squares-pdf.pdf", source: "Corbettmaths", type: "pdf" },
        { title: "Expanding and Factorising Quadratics", url: "https://www.mathsgenie.co.uk/resources/5-expanding-and-factorising-quadratics.pdf", source: "Maths Genie", type: "pdf" },
        { title: "Factorising Harder Quadratics", url: "https://www.mathsgenie.co.uk/resources/7-factorising-harder-quadratics.pdf", source: "Maths Genie", type: "pdf" }
      ],
      solutions: [],
      otherResources: []
    },
    'basic-angle-relationships': {
      videos: [
        { title: "Angles at a Point & Straight Line", url: "https://www.youtube.com/watch?v=mdAwUsf0k1s", source: "Corbettmaths", type: "video" },
        { title: "Vertical Angles", url: "https://www.khanacademy.org/math/cc-seventh-grade-math/cc-7th-geometry/cc-7th-angles/v/complementary-and-supplementary-angles", source: "Khan Academy", type: "video" }
      ],
      exercises: [
        { title: "Angles Around a Point / Straight Line Worksheets", url: "https://www.draustinmaths.com/angles-and-polygons", source: "Dr Austin Maths", type: "pdf" },
        { title: "Angles Around a Point Worksheet Pack", url: "https://www.tes.com/teaching-resources/shop/Maths4Everyone?sortBy=newest&p=4", source: "Maths4Everyone", type: "pdf" },
        { title: "Missing Angles Practice Questions", url: "https://corbettmaths.com/2019/08/22/missing-angles-practice-questions/", source: "Corbettmaths", type: "pdf" }
      ],
      solutions: [
        { title: "Angles Around a Point / Straight Line Answers", url: "https://www.draustinmaths.com/angles-and-polygons", source: "Dr Austin Maths", type: "pdf" },
        { title: "Angles Around a Point Worksheet Answers", url: "https://www.tes.com/teaching-resources/shop/Maths4Everyone?sortBy=newest&p=4", source: "Maths4Everyone", type: "pdf" }
      ],
      otherResources: []
    },
    'parallel-line-angles': {
      videos: [
        { title: "Angles Formed by Parallel Lines & Transversals", url: "https://www.khanacademy.org/math/9th-grade-matatag/x6b946bfca15ae3f5:unit-1/x6b946bfca15ae3f5:parallel-and-perpendicular-lines/v/angles-formed-by-parallel-lines-and-transversals", source: "Khan Academy", type: "video" },
        { title: "Angles (Everything You Need to Know)", url: "https://www.youtube.com/watch?v=VXDn5rwS7-0", source: "OnMaths", type: "video" }
      ],
      exercises: [
        { title: "Angles in Parallel Lines Worksheet", url: "https://www.draustinmaths.com/angles-and-polygons", source: "Dr Austin Maths", type: "pdf" },
        { title: "Angles in Parallel Lines Exam Questions", url: "https://www.mathsgenie.co.uk/resources/33_angles-parallel-linesans.pdf", source: "Maths Genie", type: "pdf" },
        { title: "Angles in Parallel Lines Revision Notes", url: "https://www.savemyexams.com/igcse/maths/cie/25/extended/revision-notes/geometry/angles-in-polygons-and-parallel-lines/angles-in-parallel-lines/", source: "Save My Exams", type: "pdf" }
      ],
      solutions: [
        { title: "Angles in Parallel Lines Answers", url: "https://www.draustinmaths.com/angles-and-polygons", source: "Dr Austin Maths", type: "pdf" },
        { title: "Angles in Parallel Lines Mark Scheme", url: "https://www.mathsgenie.co.uk/angles-parallel.html", source: "Maths Genie", type: "pdf" }
      ],
      otherResources: [
        { title: "Transum Angles in Parallel Lines Interactive Exercise", url: "https://www.transum.org/software/SW/Starter_of_the_day/Students/Angles_Parallel.asp", source: "Transum", type: "external" }
      ]
    },
    'angle-sums': {
      videos: [
        { title: "Angles in Polygons", url: "https://www.youtube.com/watch?v=aDjalmyUXTc", source: "Maths Genie", type: "video" }
      ],
      exercises: [
        { title: "Angles in Triangles & Quadrilaterals Worksheets", url: "https://www.draustinmaths.com/angles-and-polygons", source: "Dr Austin Maths", type: "pdf" },
        { title: "Angles in Irregular Polygons Worksheet", url: "https://www.draustinmaths.com/angles-and-polygons", source: "Dr Austin Maths", type: "pdf" },
        { title: "Angles in Polygons Practice Questions", url: "https://corbettmaths.com/2018/04/04/angles-in-polygons-2/", source: "Corbettmaths", type: "pdf" },
        { title: "Angles in Polygons Revision Notes", url: "https://www.savemyexams.com/igcse/maths/cie/25/extended/revision-notes/geometry/angles-in-polygons-and-parallel-lines/angles-in-polygons/", source: "Save My Exams", type: "pdf" }
      ],
      solutions: [
        { title: "Angles in Triangles & Quadrilaterals Answers", url: "https://www.draustinmaths.com/angles-and-polygons", source: "Dr Austin Maths", type: "pdf" },
        { title: "Angles in Irregular Polygons Answers", url: "https://www.draustinmaths.com/angles-and-polygons", source: "Dr Austin Maths", type: "pdf" },
        { title: "Angles in Polygons Answers", url: "https://corbettmaths.com/2018/04/04/angles-in-polygons-2/", source: "Corbettmaths", type: "pdf" }
      ],
      otherResources: [
        { title: "GeoGebra Polygon Angle Sum Explorer", url: "https://www.geogebra.org/m/qMdj8Std", source: "GeoGebra", type: "external" }
      ]
    },
    'polygon-angles': {
      videos: [
        { title: "Interior and Exterior Angles", url: "https://corbettmaths.com/2012/08/10/angles-in-polygons/", source: "Corbettmaths", type: "video" }
      ],
      exercises: [
        { title: "Interior & Exterior Angles Activity", url: "https://www.draustinmaths.com/angles-and-polygons", source: "Dr Austin Maths", type: "pdf" },
        { title: "Regular Polygons Exam Questions", url: "https://www.mathsgenie.co.uk/resources/33_angles-parallel-linesans.pdf", source: "Maths Genie", type: "pdf" },
        { title: "Regular Polygons Revision Notes", url: "https://www.savemyexams.com/igcse/maths/cie/25/extended/revision-notes/geometry/angles-in-polygons-and-parallel-lines/angles-in-polygons/", source: "Save My Exams", type: "pdf" }
      ],
      solutions: [
        { title: "Interior & Exterior Angles Answers", url: "https://www.draustinmaths.com/angles-and-polygons", source: "Dr Austin Maths", type: "pdf" },
        { title: "Regular Polygons Mark Scheme", url: "https://www.mathsgenie.co.uk/angles-parallel.html", source: "Maths Genie", type: "pdf" }
      ],
      otherResources: [
        { title: "Visnos Polygon Explorer", url: "https://www.visnos.com/demos/polygon-explorer", source: "Visnos", type: "external" },
        { title: "GeoGebra Interior/Exterior Angles Applet", url: "https://www.geogebra.org/m/rexj7GJd", source: "GeoGebra", type: "external" }
      ]
    },
    'angle-vocabulary': {
      videos: [
        { title: "Types of Angles", url: "https://corbettmaths.com/contents/#Angles:%20types%20of%C2%A0%C2%A0%20Video%2038%C2%A0", source: "Corbettmaths", type: "video" },
        { title: "Complementary & Supplementary Angles", url: "https://www.khanacademy.org/math/cc-seventh-grade-math/cc-7th-geometry/cc-7th-angles/v/complementary-and-supplementary-angles", source: "Khan Academy", type: "video" }
      ],
      exercises: [
        { title: "Angle Vocabulary Study Guide", url: "https://www.bbc.co.uk/bitesize/topics/zb6tyrd", source: "BBC Bitesize", type: "external" },
        { title: "Angles Revision Guide & Worksheet", url: "https://thirdspacelearning.com/gcse-maths/geometry-and-measure/angles/", source: "Third Space Learning", type: "pdf" }
      ],
      solutions: [],
      otherResources: [
        { title: "ThatQuiz Angle Vocabulary Matching Quiz", url: "https://www.thatquiz.org/tq/preview?c=u8m72rik&s=ms42r9", source: "ThatQuiz", type: "external" },
        { title: "Math is Fun Angle Tester", url: "https://www.mathsisfun.com/angles.html", source: "Math is Fun", type: "external" }
      ]
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
        { title: "Bearings (GCSE Maths)", url: "https://www.youtube.com/watch?v=rsFBdL3gRBU", source: "Maths Genie", type: "video" },
        { title: "Bearings Explained", url: "https://www.youtube.com/watch?v=O_vt9yctoZY", source: "Corbettmaths", type: "video" }
      ],
      exercises: [
        { title: "Bearings Worksheet", url: "https://www.mathsgenie.co.uk/resources/5-bearings.pdf", source: "Maths Genie", type: "pdf" },
        { title: "Bearings Practice Grid", url: "https://www.draustinmaths.com/_files/ugd/7ac124_6b36747ebfb743e0a8f51cdc8d35da44.docx", source: "Dr Austin Maths", type: "pdf" }
      ],
      solutions: [
        { title: "Bearings Solutions", url: "https://www.mathsgenie.co.uk/resources/5-bearingsans.pdf", source: "Maths Genie", type: "pdf" },
        { title: "Bearings Mark Scheme", url: "https://corbettmaths.com/wp-content/uploads/2018/11/Bearings-Answers.pdf", source: "Corbettmaths", type: "pdf" }
      ],
      otherResources: [
        { title: "Bearings Exam", url: "https://www.onmaths.com/resource/bearings/", source: "OnMaths", type: "external" },
        { title: "Bearings Interactive Guide", url: "https://www.bbc.co.uk/bitesize/guides/zshqfcw/revision/1", source: "BBC Bitesize", type: "external" }
      ]
    },
    'pythagoras-theorem': {
      videos: [
        { title: "Pythagoras' Theorem", url: "https://www.youtube.com/watch?v=-BGkrzwbjLI", source: "Maths Genie", type: "video" },
        { title: "Introduction to the Pythagorean Theorem", url: "https://www.youtube.com/watch?v=AA6RfgP-AHU", source: "Khan Academy", type: "video" }
      ],
      exercises: [
        { title: "Pythagoras Worksheet", url: "https://www.mathsgenie.co.uk/resources/5-pythagoras.pdf", source: "Maths Genie", type: "pdf" },
        { title: "Pythagoras' Theorem Worksheet", url: "https://corbettmaths.com/wp-content/uploads/2013/02/pythagoras-pdf1.pdf", source: "Corbettmaths", type: "pdf" }
      ],
      solutions: [
        { title: "Pythagoras Answers", url: "https://www.mathsgenie.co.uk/resources/5-pythagorasans.pdf", source: "Maths Genie", type: "pdf" },
        { title: "Pythagoras' Theorem Mark Scheme", url: "https://corbettmaths.com/wp-content/uploads/2019/02/Answer-Pythagoras.pdf", source: "Corbettmaths", type: "pdf" }
      ],
      otherResources: [
        { title: "Pythagorean Theorem Practice", url: "https://www.khanacademy.org/math/cc-eighth-grade-math/cc-8th-geometry/cc-8th-pythagorean-theorem/e/pythagorean_theorem_1", source: "Khan Academy", type: "external" }
      ]
    },
    'chord-properties': {
      videos: [
        { title: "Circle Theorem – Perpendicular from Centre", url: "https://www.youtube.com/watch?v=YftaFVn7kK4", source: "Wyzant", type: "video" },
        { title: "Circle Chord Theorems", url: "https://www.youtube.com/watch?v=xdK2CyXGlBg", source: "Third Space Learning", type: "video" }
      ],
      exercises: [
        { title: "Perpendicular from Centre to a Chord", url: "https://www.draustinmaths.com/_files/ugd/7ac124_649cf513c0e5405683f709c3b013e49e.pdf", source: "Dr Austin Maths", type: "pdf" },
        { title: "Circle Theorems Worksheet", url: "https://corbettmaths.com/wp-content/uploads/2013/02/circle-theorems-1-pdf.pdf", source: "Corbettmaths", type: "pdf" }
      ],
      solutions: [
        { title: "Perpendicular from Centre Answers", url: "https://www.draustinmaths.com/_files/ugd/7ac124_649cf513c0e5405683f709c3b013e49e.pdf", source: "Dr Austin Maths", type: "pdf" },
        { title: "Circle Theorems Mark Scheme", url: "https://corbettmaths.com/wp-content/uploads/2018/09/Circle-Theorems-Answers.pdf", source: "Corbettmaths", type: "pdf" }
      ],
      otherResources: [
        { title: "Chords & Centre Distance Revision", url: "https://www.savemyexams.com/igcse/maths/cambridge-cie/international-maths-extended/revision-notes/geometry/circle-theorems/theorems-with-chords--tangents/", source: "Save My Exams", type: "pdf" },
        { title: "Circle Geometry Interactive", url: "https://www.geogebra.org/m/umMnKPjq", source: "GeoGebra", type: "external" }
      ]
    },
    'circle-distances': {
      videos: [
        { title: "Distance Between Two Points", url: "https://www.youtube.com/watch?v=q8Qm0Xbqre4", source: "Corbettmaths", type: "video" },
        { title: "Distance Formula", url: "https://www.youtube.com/watch?v=nyZuite17Pc", source: "Khan Academy", type: "video" }
      ],
      exercises: [
        { title: "Distance Between 2 Points Worksheet", url: "https://corbettmaths.com/wp-content/uploads/2019/01/Distance-between-2-points-pdf.pdf", source: "Corbettmaths", type: "pdf" },
        { title: "Circle Geometry Problems", url: "https://www.savemyexams.com/igcse/maths/cambridge-cie/international-maths-extended/revision-notes/geometry/circle-theorems/circle-properties/", source: "Save My Exams", type: "pdf" }
      ],
      solutions: [
        { title: "Distance Worksheet Answers", url: "https://corbettmaths.com/wp-content/uploads/2019/01/Answer-Distance-between-two-points.pdf", source: "Corbettmaths", type: "pdf" }
      ],
      otherResources: [
        { title: "Distance Between Points Exercise", url: "https://www.khanacademy.org/math/geometry/hs-geo-analytic-geometry/hs-geo-distance-and-midpoints/e/distance_formula", source: "Khan Academy", type: "external" }
      ]
    }
  },
  'unit-4': {
    'linear-equations': {
      videos: [],
      exercises: [
        { title: 'Solving Equations', url: 'https://www.mathsgenie.co.uk/resources/3-solving-equations.pdf', source: 'Maths Genie', type: 'pdf' }
      ],
      solutions: [],
      otherResources: []
    },
    'inequalities-interpretation': {
      videos: [],
      exercises: [],
      solutions: [],
      otherResources: []
    },
    'inequalities-solution': {
      videos: [],
      exercises: [],
      solutions: [],
      otherResources: []
    },
    'algebraic-fractions-simplification': {
      videos: [
        { title: 'Simplifying Algebraic Fractions', url: 'https://www.youtube.com/watch?v=gMojR-U4NDQ', source: 'Maths Genie', type: 'video' },
        { title: 'Simplifying Algebraic Fractions', url: 'https://www.youtube.com/watch?v=tlKN8NNNxdI', source: 'Corbettmaths', type: 'video' }
      ],
      exercises: [
        { title: 'Algebraic Fractions – Simplifying by Factorising', url: 'https://www.maths4everyone.com/resources/downloads/algebraic-fractions-simplifying-20286.pdf', source: 'Maths4Everyone', type: 'pdf' },
        { title: 'Simplifying Algebraic Fractions Worksheet', url: 'https://www.draustinmaths.com/_files/ugd/7ac124_c6ab4dd8b40747e2b1307a44ad3f7f03.pdf', source: 'Dr Austin Maths', type: 'pdf' },
        { title: 'Simplifying Algebraic Fractions', url: 'https://corbettmaths.com/wp-content/uploads/2013/02/simplifying-algebraic-fractions-pdf1.pdf', source: 'Corbettmaths', type: 'pdf' }
      ],
      solutions: [
        { title: 'Simplifying Algebraic Fractions Answers', url: 'https://corbettmaths.com/wp-content/uploads/2019/12/answers-simplifying-algebraic-fractions.pdf', source: 'Corbettmaths', type: 'pdf' },
        { title: 'Algebraic Fractions Solutions', url: 'https://justmaths.co.uk/wp-content/uploads/2015/12/Algebra-H-Algebraic-Fractions-v2-SOLUTIONS-1-1.pdf', source: 'JustMaths', type: 'pdf' }
      ],
      otherResources: [
        { title: 'Simplifying Rational Expressions', url: 'https://www.khanacademy.org/math/precalculus/x9e81a4f98389efdf:rational-functions/x9e81a4f98389efdf:reducing-rational-expressions-to-lowest-terms/v/simplifying-rational-expressions-introduction', source: 'Khan Academy', type: 'external' },
        { title: 'Interactive Algebraic Fractions', url: 'https://www.westiesworkshop.com/course-support/algebra/algebraic-fractions/', source: 'Westie\'s Workshop', type: 'external' }
      ]
    },
    'algebraic-fractions-addition': {
      videos: [
        { title: 'Adding & Subtracting Algebraic Fractions', url: 'https://www.youtube.com/watch?v=w3JewxYjiNs', source: 'Corbettmaths', type: 'video' },
        { title: 'Algebraic Fractions (Addition/Subtraction)', url: 'https://www.youtube.com/watch?v=khZnlxI6MSw', source: 'Maths Genie', type: 'video' }
      ],
      exercises: [
        { title: 'Algebraic Fractions – Addition and Subtraction', url: 'https://www.maths4everyone.com/resources/downloads/algebraic-fractions-adding-and-subtracting-20288.pdf', source: 'Maths4Everyone', type: 'pdf' },
        { title: 'Adding & Subtracting Algebraic Fractions Worksheet', url: 'https://www.draustinmaths.com/_files/ugd/7ac124_eace8abe85a14cb78c24e97df3a9e36e.pdf', source: 'Dr Austin Maths', type: 'pdf' },
        { title: 'Practice Strips - Adding & Subtracting', url: 'https://www.draustinmaths.com/_files/ugd/7ac124_33fa4edcfbe14a3ca5c0a95ed54a25b5.pdf', source: 'Dr Austin Maths', type: 'pdf' }
      ],
      solutions: [
        { title: 'Algebraic Fractions Practice Solutions', url: 'https://www.savemyexams.com/igcse/maths/cie/25/extended/revision-notes/algebra-and-sequences/algebraic-fractions/solving-algebraic-fractions/', source: 'SaveMyExams', type: 'pdf' }
      ],
      otherResources: [
        { title: 'Adding & Subtracting Rational Expressions', url: 'https://www.khanacademy.org/math/precalculus/x9e81a4f98389efdf:rational-functions/x9e81a4f98389efdf:adding-and-subtracting-rational-expressions/a/adding-subtracting-rational-expressions-advanced', source: 'Khan Academy', type: 'external' },
        { title: 'MME Interactive Learning', url: 'https://mmerevise.co.uk/a-level-maths-revision/algebraic-fractions/', source: 'MME Revise', type: 'external' }
      ]
    },
    'algebraic-fractions-multiplication': {
      videos: [
        { title: 'Multiplying & Dividing Algebraic Fractions', url: 'https://www.youtube.com/watch?v=0waEImwwz7A', source: 'Corbettmaths', type: 'video' },
        { title: 'Multiplying and Dividing Algebraic Fractions', url: 'https://www.youtube.com/watch?v=A4xrqaj77y0', source: 'MathsCoach', type: 'video' }
      ],
      exercises: [
        { title: 'Multiplying Algebraic Fractions Worksheet', url: 'https://www.draustinmaths.com/_files/ugd/7ac124_e0b3be394a7146d68a7e0f9a1cd8ac30.pdf', source: 'Dr Austin Maths', type: 'pdf' },
        { title: 'Dividing Algebraic Fractions Worksheet', url: 'https://www.draustinmaths.com/_files/ugd/7ac124_bac69254bb7d465eb65eb93d99e7d6d1.pdf', source: 'Dr Austin Maths', type: 'pdf' },
        { title: 'Multiplying & Dividing Algebraic Fractions', url: 'https://www.savemyexams.com/igcse/maths/cie/25/extended/revision-notes/algebra-and-sequences/algebraic-fractions/simplifying/', source: 'Save My Exams', type: 'pdf' }
      ],
      solutions: [
        { title: 'Multiplying & Dividing Solutions', url: 'https://www.savemyexams.com/igcse/maths/cie/25/extended/revision-notes/algebra-and-sequences/algebraic-fractions/solving-algebraic-fractions/', source: 'SaveMyExams', type: 'pdf' },
        { title: 'Algebraic Fractions – Exam Questions (Higher)', url: 'https://www.physicsandmathstutor.com/maths-revision/gcse-algebra/questions-edexcel/higher-algebraic-fractions-videos/', source: 'Physics & Maths Tutor', type: 'external' }
      ],
      otherResources: [
        { title: 'Maths Genie Online Quiz', url: 'https://www.mathsgenie.co.uk/algebraic-fractions.html', source: 'Maths Genie', type: 'external' },
        { title: 'Complete Algebraic Fractions Resources', url: 'https://sites.google.com/online.island.edu.hk/maths/igcse/unit-5-algebra-2-quadratics/algebraic-fractions', source: 'IS Mathematics', type: 'external' }
      ]
    },
    'algebraic-fractions-equations': {
      videos: [
        { title: 'Solving Equations involving Algebraic Fractions', url: 'https://www.youtube.com/watch?v=waEkFiYSOhU', source: 'Maths Genie', type: 'video' },
        { title: 'Solve Equations with Algebraic Fractions', url: 'https://www.youtube.com/watch?v=UsR4rcCRBgE', source: 'Hegarty Maths', type: 'video' }
      ],
      exercises: [
        { title: 'Algebraic Fractions (Equations)', url: 'https://www.maths4everyone.com/resources/downloads/algebraic-fractions-equations-gcse-9-1-practice-questions-30218.pdf', source: 'Maths4Everyone', type: 'pdf' },
        { title: 'Solving Equations with Algebraic Fractions', url: 'https://www.draustinmaths.com/_files/ugd/7ac124_9a4a5a6e94de4b85b44a3a6d6cd03f34.pdf', source: 'Dr Austin Maths', type: 'pdf' },
        { title: 'Solving Algebraic Fraction Equations', url: 'https://pmt.physicsandmathstutor.com/download/Maths/GCSE/Topic-Qs/Edexcel/Set-1/Algebra/Higher/Notation-Vocabulary-and-Manipulation/Solving%20Algebraic%20Fractions%20(H).pdf', source: 'Physics & Maths Tutor', type: 'pdf' }
      ],
      solutions: [
        { title: 'Algebraic Equations Guide', url: 'https://www.savemyexams.com/igcse/maths/cie/25/extended/revision-notes/algebra-and-sequences/algebraic-fractions/solving-algebraic-fractions/', source: 'SaveMyExams', type: 'pdf' }
      ],
      otherResources: [
        { title: 'Solving Equations with Algebraic Fractions Guide', url: 'https://www.savemyexams.com/gcse/maths/aqa/22/higher/revision-notes/algebra/algebraic-fractions/solving-equations/', source: 'Save My Exams', type: 'external' },
        { title: 'Khan Academy Fractional Equations', url: 'https://www.khanacademy.org/math/cc-sixth-grade-math/cc-6th-equations-and-inequalities/cc-6th-one-step-mult-div-equations/v/one-step-multiplication-fractional-coefficients', source: 'Khan Academy', type: 'external' }
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
    },
    'distance-between-points': {
      videos: [
        { title: 'Corbettmaths – Distance Between Two Points', url: 'https://www.youtube.com/watch?v=q8Qm0Xbqre4', source: 'Corbettmaths', type: 'video' }
      ],
      exercises: [
        { title: 'Corbettmaths – Distance Between Two Points Practice', url: 'https://corbettmaths.com/2019/08/28/distance-between-two-points-practice-questions/', source: 'Corbettmaths', type: 'pdf' }
      ],
      solutions: [
        { title: 'Corbettmaths – Distance Between Two Points Answers', url: 'https://corbettmaths.com/2019/08/28/distance-between-two-points-practice-questions/', source: 'Corbettmaths', type: 'pdf' }
      ],
      otherResources: [
        { title: 'Khan Academy – Distance Formula Interactive', url: 'https://www.khanacademy.org/math/geometry/hs-geo-analytic-geometry/hs-geo-distance-and-midpoints/e/distance_formula', source: 'Khan Academy', type: 'external' }
      ]
    },
    'midpoints': {
      videos: [
        { title: 'Corbettmaths – Midpoint of a Line', url: 'https://www.youtube.com/watch?v=LqEYBytlhek', source: 'Corbettmaths', type: 'video' }
      ],
      exercises: [
        { title: 'Maths4Everyone – Midpoints Worksheet (PDF)', url: 'https://www.maths4everyone.com/resources/downloads/midpoints-40029.pdf', source: 'Maths4Everyone', type: 'pdf' }
      ],
      solutions: [
        { title: 'Corbettmaths – Midpoint of a Line Practice & Answers', url: 'https://corbettmaths.com/wp-content/uploads/2019/04/Midpoint-of-a-Line.pdf', source: 'Corbettmaths', type: 'pdf' }
      ],
      otherResources: [
        { title: 'Khan Academy – Midpoint Formula Interactive', url: 'https://www.khanacademy.org/math/geometry/hs-geo-analytic-geometry/hs-geo-distance-and-midpoints/e/midpoint_formula', source: 'Khan Academy', type: 'external' }
      ]
    },
    'gradient-slope': {
      videos: [
        { title: 'Corbettmaths – Gradient of a Line', url: 'https://www.youtube.com/watch?v=YtHJP1rZ3pI', source: 'Corbettmaths', type: 'video' }
      ],
      exercises: [
        { title: 'Corbettmaths – Gradient Practice Questions', url: 'https://corbettmaths.com/2019/09/02/gradient-practice-questions/', source: 'Corbettmaths', type: 'pdf' }
      ],
      solutions: [
        { title: 'Corbettmaths – Gradient Answers', url: 'https://corbettmaths.com/2019/09/02/gradient-practice-questions/', source: 'Corbettmaths', type: 'pdf' }
      ],
      otherResources: [
        { title: 'GeoGebra Graphing Calculator', url: 'https://www.geogebra.org/graphing', source: 'GeoGebra', type: 'external' }
      ]
    },
    'parallel-perpendicular-lines': {
      videos: [
        { title: '1stClassMaths – Parallel & Perpendicular Lines', url: 'https://www.youtube.com/watch?v=S08O1ibtR8s', source: '1stClassMaths', type: 'video' }
      ],
      exercises: [
        { title: 'Dr Austin Maths – Parallel and Perpendicular Lines Practice', url: 'https://www.draustinmaths.com/_files/ugd/7ac124_649cf513c0e5405683f709c3b013e49e.pdf', source: 'Dr Austin Maths', type: 'pdf' }
      ],
      solutions: [
        { title: 'Dr Austin Maths – Parallel and Perpendicular Answers', url: 'https://www.draustinmaths.com/_files/ugd/7ac124_649cf513c0e5405683f709c3b013e49e.pdf', source: 'Dr Austin Maths', type: 'pdf' }
      ],
      otherResources: [
        { title: 'Khan Academy – Parallel & Perpendicular Line Equations Interactive', url: 'https://www.khanacademy.org/math/geometry/hs-geo-analytic-geometry/hs-geo-parallel-perpendicular-eq/e/writing-equations-for-parallel-or-perpendicular-lines', source: 'Khan Academy', type: 'external' }
      ]
    },
    'perpendicular-bisector': {
      videos: [
        { title: 'ExamSolutions – Equation of a Perpendicular Bisector', url: 'https://www.youtube.com/watch?v=yAKWp480CzU', source: 'ExamSolutions', type: 'video' }
      ],
      exercises: [
        { title: 'Save My Exams – Perpendicular Lines & Bisectors Notes', url: 'https://www.savemyexams.com/igcse/maths/cie/international-maths/23/extended/revision-notes/coordinate-geometry-and-graphs/straight-line-graphs/perpendicular-lines/', source: 'Save My Exams', type: 'pdf' }
      ],
      solutions: [
        { title: 'Save My Exams – Topic Questions', url: 'https://www.savemyexams.com/igcse/maths/cie/international-maths/23/extended/revision-notes/coordinate-geometry-and-graphs/straight-line-graphs/perpendicular-lines/', source: 'Save My Exams', type: 'pdf' }
      ],
      otherResources: [
        { title: 'Desmos – Line Visualizer', url: 'https://www.desmos.com/calculator', source: 'Desmos', type: 'external' }
      ]
    },
    'length-of-line': {
      videos: [
        { title: 'Khan Academy – Distance Formula', url: 'https://www.youtube.com/watch?v=nyZuite17Pc', source: 'Khan Academy', type: 'video' }
      ],
      exercises: [
        { title: 'Dr Austin Maths – Midpoints and Lengths of Lines Worksheet', url: 'https://www.draustinmaths.com/_files/ugd/7ac124_cea2b0712ca24097a035a428f4d93233.pdf', source: 'Dr Austin Maths', type: 'pdf' }
      ],
      solutions: [
        { title: 'Dr Austin Maths – Midpoints and Lengths Answers', url: 'https://www.draustinmaths.com/coordinates-and-linear-graphs', source: 'Dr Austin Maths', type: 'pdf' }
      ],
      otherResources: [
        { title: 'Save My Exams – Length of a Line Revision Notes', url: 'https://www.savemyexams.com/igcse/maths/cie/international-maths/23/core/revision-notes/coordinate-geometry-and-graphs/coordinates-and-straight-line-graphs/length-of-a-line/', source: 'Save My Exams', type: 'pdf' }
      ]
    },
    'linear-functions': {
      videos: [
        { title: 'Math Antics – Basic Linear Functions', url: 'https://www.youtube.com/watch?v=2Pq2tMGT7gA', source: 'Math Antics', type: 'video' }
      ],
      exercises: [
        { title: 'Corbettmaths – Equation of a Line y=mx+c Practice', url: 'https://corbettmaths.com/2019/08/29/equation-of-a-line-practice-questions/', source: 'Corbettmaths', type: 'pdf' }
      ],
      solutions: [
        { title: 'Corbettmaths – Equation of a Line Answers', url: 'https://corbettmaths.com/wp-content/uploads/2025/02/Equation-of-a-Line-Answers.pdf', source: 'Corbettmaths', type: 'pdf' }
      ],
      otherResources: [
        { title: 'OnMaths – Parallel and Perpendicular Lines Masterclass', url: 'https://www.onmaths.com/resource/parallel-and-perpendicular-lines/', source: 'OnMaths', type: 'external' }
      ]
    }
  },
  'unit-5': {
    'quadratic-fundamentals': {
      videos: [
        { title: "Introduction to Quadratic Equations", url: "https://www.youtube.com/watch?v=lsLT3dYY3vM", source: "Khan Academy", type: "video" },
        { title: "Quadratic Expressions Introduction", url: "https://www.youtube.com/watch?v=f5B3PzPZkZ4", source: "Khan Academy", type: "video" }
      ],
      exercises: [
        { title: "Expanding & Factorising Quadratics", url: "https://www.draustinmaths.com/_files/ugd/7ac124_ca1558333a9a4f57b18a8f390e3d332f.pdf", source: "Dr Austin Maths", type: "pdf" },
        { title: "Quadratic Expressions Worksheet", url: "https://www.draustinmaths.com/_files/ugd/7ac124_e8a0f6138cd849aebaed7619d9c1cffa.pdf", source: "Dr Austin Maths", type: "pdf" },
        { title: "Quadratic Equations Practice", url: "https://www.maths4everyone.com/resources/downloads/quadratic-equations-gcse-9-1-practice-questions-30242.pdf", source: "Maths4Everyone", type: "pdf" }
      ],
      solutions: [
        { title: "Expanding & Factorising Quadratics – Answers", url: "https://www.draustinmaths.com/_files/ugd/7ac124_ff7487c8484c45fb9c9bbb7f7c837be1.pdf", source: "Dr Austin Maths", type: "pdf" },
        { title: "Quadratic Equations Solutions", url: "https://www.savemyexams.com/igcse/maths/cie/25/extended/revision-notes/algebra-and-sequences/quadratic-equations/", source: "SaveMyExams", type: "pdf" }
      ],
      otherResources: [
        { title: "Quadratic Equation Grapher", url: "https://www.desmos.com/calculator", source: "Desmos", type: "external" },
        { title: "Khan Academy Quadratics Course", url: "https://www.khanacademy.org/math/algebra-basics/alg-basics-quadratics-and-polynomials", source: "Khan Academy", type: "external" }
      ]
    },
    'factorisation-method': {
      videos: [
        { title: "Solving Quadratic Equations by Factorising", url: "https://www.youtube.com/watch?v=m-qyV6C56ec", source: "Maths Genie", type: "video" },
        { title: "Factoring Simple Quadratic Expressions", url: "https://www.youtube.com/watch?v=eF6zYNzlZKQ", source: "Khan Academy", type: "video" }
      ],
      exercises: [
        { title: "Factorising Quadratics (Sum and Product method)", url: "https://www.draustinmaths.com/_files/ugd/7ac124_1e4f9811d2b3468abfe7b4375336b4e9.pdf", source: "Dr Austin Maths", type: "pdf" },
        { title: "Solving Quadratics by Factorising Worksheet", url: "https://corbettmaths.com/wp-content/uploads/2013/02/solving-quadratics-by-factorising-1-pdf.pdf", source: "Corbettmaths", type: "pdf" },
        { title: "Factorising Practice Questions", url: "https://www.mathsgenie.co.uk/resources/86_solving-quadratics-by-factorising.pdf", source: "Maths Genie", type: "pdf" }
      ],
      solutions: [
        { title: "Factorising Quadratics – Answers", url: "https://www.draustinmaths.com/_files/ugd/7ac124_279f05f5f79c45059658b741c52f30d7.pdf", source: "Dr Austin Maths", type: "pdf" },
        { title: "Solving Quadratics Solutions", url: "https://corbettmaths.com/wp-content/uploads/2013/02/solving-quadratics-factorising-ans.pdf", source: "Corbettmaths", type: "pdf" }
      ],
      otherResources: [
        { title: "Factorising Quadratics Puzzle", url: "https://www.maths4everyone.com/resources/Factorise_Quadratics_Puzzle.pdf", source: "Maths4Everyone", type: "pdf" },
        { title: "Maths Genie Quadratics Resources", url: "https://www.mathsgenie.co.uk/solving-quadratics.html", source: "Maths Genie", type: "external" }
      ]
    },
    'quadratic-formula': {
      videos: [
        { title: "Using the Quadratic Formula", url: "https://www.youtube.com/watch?v=3J0ccr74LcU", source: "Corbettmaths", type: "video" },
        { title: "The Quadratic Formula", url: "https://www.youtube.com/watch?v=i7idZfS8t8w", source: "Khan Academy", type: "video" }
      ],
      exercises: [
        { title: "Quadratic Formula Practice", url: "https://www.mathsgenie.co.uk/resources/7-quadratic-formula.pdf", source: "Maths Genie", type: "pdf" },
        { title: "Quadratic Formula Worksheet", url: "https://www.maths4everyone.com/resources/downloads/the-quadratic-formulae-20272.pdf", source: "Maths4Everyone", type: "pdf" },
        { title: "Mixed Quadratic Equations Practice", url: "https://justmaths.co.uk/wp-content/uploads/2015/11/Algebra-F-Factorising-Expanding-Factorising-Solving-Quadratics-v3.pdf", source: "JustMaths", type: "pdf" }
      ],
      solutions: [
        { title: "Quadratic Formula – step-by-step solutions", url: "https://www.youtube.com/watch?v=BeQwP8rZhZM", source: "Corbettmaths", type: "video" },
        { title: "Quadratic Formula Guide", url: "https://www.savemyexams.com/igcse/maths/cie/25/extended/revision-notes/algebra-and-sequences/quadratic-equations/quadratic-formula/", source: "SaveMyExams", type: "pdf" }
      ],
      otherResources: [
        { title: "Sum & Product of Roots Explorer", url: "https://www.geogebra.org/m/hsndnnug", source: "GeoGebra", type: "external" },
        { title: "Quadratic Formula Applications", url: "https://www.khanacademy.org/math/algebra/x2f8bb11595b61c86:quadratic-functions-equations/x2f8bb11595b61c86:standard-form-quadratic/v/application-problem-with-quadratic-formula", source: "Khan Academy", type: "external" }
      ]
    },
    'gdc-quadratics': {
      videos: [
        { title: "Solving Quadratics using a GDC", url: "https://www.youtube.com/watch?v=J7Pj-7POq8E", source: "Casio", type: "video" },
        { title: "Using a Calculator for Quadratics", url: "https://www.youtube.com/watch?v=zpF9nbjOzgo", source: "Mark Willis", type: "video" }
      ],
      exercises: [
        { title: "GDC-Based Quadratic Problems", url: "https://www.onmaths.com/resource/solve-quadratic-equations/", source: "OnMaths", type: "external" }
      ],
      solutions: [
        { title: "Solving Quadratics with Technology", url: "https://www.savemyexams.com/a-level/maths/cie/20/pure-1/revision-notes/algebra-and-functions/quadratics/solving-quadratic-equations/", source: "SaveMyExams", type: "pdf" }
      ],
      otherResources: [
        { title: "Using Technology to Solve Quadratics", url: "https://mathshelpboard.wordpress.com/2013/08/15/how-to-use-equation-solver-in-gdc-to-solve-quadratic-equation/", source: "Ms Zhang\'s Math Help Board", type: "external" },
        { title: "Online Graph Solver", url: "https://www.desmos.com/calculator", source: "Desmos", type: "external" },
        { title: "Interactive Quadratic Solver", url: "https://www.onmaths.com/resource/solving-quadratic-equations/", source: "OnMaths", type: "external" }
      ]
    },
    'parabola-properties': {
      videos: [
        { title: "Forms and Features of Parabolas", url: "https://www.khanacademy.org/math/algebra/x2f8bb11595b61c86:quadratic-functions-equations/x2f8bb11595b61c86:features-of-quadratic-functions/v/forms-of-quadratic-functions", source: "Khan Academy", type: "video" },
        { title: "Graphing Quadratic Functions (Vertex & Intercepts)", url: "https://www.youtube.com/watch?v=rM_A8t0CV7A", source: "Maths Genie", type: "video" }
      ],
      exercises: [
        { title: "Plotting Quadratic Graphs", url: "https://www.draustinmaths.com/_files/ugd/7ac124_b3b2d0fee0954747b10647051f5f7955.pdf", source: "Dr Austin Maths", type: "pdf" },
        { title: "Quadratic Graphs", url: "https://www.mathsgenie.co.uk/resources/5-quadratic-graphs.pdf", source: "Maths Genie", type: "pdf" },
        { title: "Sketching Quadratics", url: "https://corbettmaths.com/wp-content/uploads/2019/04/Sketching-Quadratics.pdf", source: "Corbettmaths", type: "pdf" }
      ],
      solutions: [
        { title: "Plotting Quadratic Graphs – Answers", url: "https://www.draustinmaths.com/_files/ugd/7ac124_b88d5905949b44f799da73e59f695cfe.pdf", source: "Dr Austin Maths", type: "pdf" },
        { title: "Quadratic Graphs Solutions", url: "https://www.mathsgenie.co.uk/resources/5-quadratic-graphsans.pdf", source: "Maths Genie", type: "pdf" }
      ],
      otherResources: [
        { title: "Parabola Explorer (Vertex Form)", url: "https://www.desmos.com/calculator/fmxds1uvhe", source: "Desmos", type: "external" },
        { title: "Graphing Parabolas Using Roots and Vertex", url: "https://www.khanacademy.org/math/algebra/x2f8bb11595b61c86:quadratic-functions-equations/x2f8bb11595b61c86:standard-form-quadratic/v/graphing-a-parabola-using-roots-and-vertex", source: "Khan Academy", type: "external" }
      ]
    }
  },
  'unit-6': {
    'linear-sequences': {
      videos: [
        { title: "Intro to Arithmetic Sequences", url: "https://www.khanacademy.org/math/algebra/x2f8bb11595b61c86:sequences/x2f8bb11595b61c86:introduction-to-arithmetic-sequences/v/arithmetic-sequences", source: "Khan Academy", type: "video" },
        { title: "Number Patterns", url: "https://www.youtube.com/watch?v=qaHMiUoZ7b8", source: "Math Antics", type: "video" },
        { title: "Sequences and Finding the Nth Term", url: "https://www.youtube.com/watch?v=Tv9ObyQOGAc", source: "Maths Genie", type: "video" },
        { title: "nth Term of a Linear Sequence", url: "https://www.youtube.com/watch?v=qnVVTBAfNu4", source: "Corbettmaths", type: "video" }
      ],
      exercises: [
        { title: "Sequences (Nth Term) Practice Questions", url: "https://corbettmaths.com/wp-content/uploads/2019/09/Sequences-nth-Term.pdf", source: "Corbettmaths", type: "pdf" },
        { title: "Nth Term of a Linear Sequence", url: "https://www.draustinmaths.com/_files/ugd/7ac124_dce56bf2a95b4c9eacf7693a3c0ec80f.pdf", source: "Dr Austin Maths", type: "pdf" },
        { title: "Arithmetic Sequences Basics", url: "https://www.maths4everyone.com/resources/downloads/arithmetic-sequences-basics-20264.pdf", source: "Maths4Everyone", type: "pdf" },
        { title: "Sequences (9-1 GCSE)", url: "https://justmaths.co.uk/wp-content/uploads/2015/12/Algebra-H-Sequences-v2.pdf", source: "JustMaths", type: "pdf" }
      ],
      solutions: [
        { title: "Sequences (Nth Term) Answers", url: "https://corbettmaths.com/wp-content/uploads/2019/09/Sequences-nth-Term-Answers.pdf", source: "Corbettmaths", type: "pdf" },
        { title: "Nth Term of Linear Answers", url: "https://www.draustinmaths.com/_files/ugd/7ac124_ef69186a26ee4e4884c0a6b0ac093674.pdf", source: "Dr Austin Maths", type: "pdf" },
        { title: "Sequences (Nth Term) Solutions", url: "https://www.mathsgenie.co.uk/resources/5-sequencesans.pdf", source: "Maths Genie", type: "pdf" },
        { title: "Sequences Answers", url: "https://justmaths.co.uk/wp-content/uploads/2016/01/Algebra-H-Sequences-v2-SOLUTIONS.pdf", source: "JustMaths", type: "pdf" }
      ],
      otherResources: [
        { title: "Linear Sequence Generator", url: "https://mathsbot.com/tables/nthTerm", source: "MathsBot", type: "external" },
        { title: "Sequences Online Test", url: "https://www.onmaths.com/sequences", source: "OnMaths", type: "external" },
        { title: "Arithmetic Sequence Interactive Practice", url: "https://www.khanacademy.org/math/algebra/x2f8bb11595b61c86:sequences/x2f8bb11595b61c86:introduction-to-arithmetic-sequences/e/arithmetic_sequences_2", source: "Khan Academy", type: "external" }
      ]
    },
    'quadratic-sequences': {
      videos: [
        { title: "Quadratic Sequences", url: "https://www.youtube.com/watch?v=GwxK6WMkRqg", source: "Maths Genie", type: "video" },
        { title: "Quadratic Sequences (Version 1)", url: "https://www.youtube.com/watch?v=AL-joUBnEIw", source: "Corbettmaths", type: "video" },
        { title: "Quadratic Sequences (Version 2)", url: "https://www.youtube.com/watch?v=vZl9L0c-Zkg", source: "Corbettmaths", type: "video" },
        { title: "Quadratic Nth Term", url: "https://www.youtube.com/watch?v=5hacfQYS6Ds", source: "GCSE Maths Tutor", type: "video" }
      ],
      exercises: [
        { title: "Quadratic Nth Term Practice", url: "https://corbettmaths.com/wp-content/uploads/2019/09/Quadratic-nth-Term.pdf", source: "Corbettmaths", type: "pdf" },
        { title: "Quadratic Sequence Practice", url: "https://www.draustinmaths.com/_files/ugd/7ac124_82e5dd114ad7464d83873f86ca7d3e6b.pdf", source: "Dr Austin Maths", type: "pdf" },
        { title: "Nth Term of a Quadratic Sequence", url: "https://www.mathsgenie.co.uk/resources/7-quadratic-sequences.pdf", source: "Maths Genie", type: "pdf" },
        { title: "Quadratic Sequences (Revision Notes)", url: "https://www.savemyexams.com/gcse/maths/edexcel/22/higher/revision-notes/algebra/sequences/quadratic-sequences/", source: "Save My Exams", type: "pdf" }
      ],
      solutions: [
        { title: "Quadratic Sequences Answers", url: "https://www.youtube.com/watch?v=0SzVXTdFcQc", source: "Corbettmaths", type: "video" },
        { title: "Quadratic Sequence Practice Answers", url: "https://www.draustinmaths.com/_files/ugd/7ac124_92bbff4670e04d5ba3bca2f783e47eeb.pdf", source: "Dr Austin Maths", type: "pdf" },
        { title: "Quadratic Seq. Solutions", url: "https://www.mathsgenie.co.uk/resources/7-quadratic-sequencesans.pdf", source: "Maths Genie", type: "pdf" },
        { title: "Topic Questions Answers", url: "https://www.savemyexams.com/gcse/maths/edexcel/22/higher/revision-notes/algebra/sequences/quadratic-sequences/", source: "Save My Exams", type: "pdf" }
      ],
      otherResources: [
        { title: "Quadratic Sequence Question Generator", url: "https://mathsbot.com/questionGenerator", source: "MathsBot", type: "external" },
        { title: "Sequence Generator", url: "https://www.transum.org/Maths/Activity/Sequences/", source: "Transum", type: "external" },
        { title: "Quadratic Sequences Interactive Game", url: "https://www.geogebra.org/m/qMdj8Std", source: "GeoGebra", type: "external" }
      ]
    },
    'cubic-sequences': {
      videos: [
        { title: "Cubic Sequences", url: "https://www.youtube.com/watch?v=gMc2rjo6OFU", source: "Interactive Maths", type: "video" },
        { title: "Quadratic vs Cubic Sequences", url: "https://www.youtube.com/watch?v=LQcUHHaJwJs", source: "Mindset", type: "video" },
        { title: "Cubic Sequences (nth term)", url: "https://www.youtube.com/watch?v=5hacfQYS6Ds", source: "Rich Maths Academy", type: "video" }
      ],
      exercises: [
        { title: "Cubic Sequences Worksheet", url: "https://www.radfordmathematics.com/algebra/sequences-series/difference-method-sequences/cubic-sequences-worksheet-1.pdf", source: "Radford Mathematics", type: "pdf" },
        { title: "Cubic Sequence Investigation", url: "https://www.tes.com/teaching-resource/cubic-sequences-worksheet-12094709", source: "TES", type: "pdf" },
        { title: "Cubic Sequences Lesson", url: "https://classroom.thenational.academy/lessons/simple-quadratic-and-cubic-sequences-c4ukar", source: "Oak National Academy", type: "external" },
        { title: "Types of Sequences", url: "https://www.savemyexams.com/igcse/maths/cie/25/extended/revision-notes/algebra-and-sequences/sequences/types-of-sequences/", source: "Save My Exams", type: "pdf" }
      ],
      solutions: [
        { title: "Cubic Worksheet Answers", url: "https://www.radfordmathematics.com/algebra/sequences-series/difference-method-sequences/cubic-sequences.html", source: "Radford Mathematics", type: "external" },
        { title: "Lesson Answers", url: "https://classroom.thenational.academy/lessons/simple-quadratic-and-cubic-sequences-c4ukar", source: "Oak National Academy", type: "external" }
      ],
      otherResources: [
        { title: "Advanced Sequence Generator", url: "https://mathsbot.com/questionGenerator", source: "MathsBot", type: "external" },
        { title: "Desmos Graphing Calculator", url: "https://www.desmos.com/calculator", source: "Desmos", type: "external" },
        { title: "Josephus Problem Activity", url: "https://www.draustinmaths.com/sequences", source: "Dr Austin Maths", type: "external" }
      ]
    },
    'geometric-sequences': {
      videos: [
        { title: "Intro to Geometric Sequences", url: "https://www.khanacademy.org/math/algebra/x2f8bb11595b61c86:sequences/x2f8bb11595b61c86:constructing-geometric-sequences/a/geometric-sequences-review", source: "Khan Academy", type: "video" },
        { title: "Geometric Progressions", url: "https://www.youtube.com/watch?v=Nl0DtMHLX_Y", source: "Corbettmaths", type: "video" },
        { title: "Geometric Sequences (A-Level)", url: "https://www.youtube.com/watch?v=iNEE2ghW19A", source: "Maths Genie", type: "video" },
        { title: "Sequences in Real Life", url: "https://www.youtube.com/watch?v=qaHMiUoZ7b8", source: "Mathantics", type: "video" }
      ],
      exercises: [
        { title: "Geometric Sequences Practice", url: "https://corbettmaths.com/wp-content/uploads/2024/11/Geometric-Progressions.pdf", source: "Corbettmaths", type: "pdf" },
        { title: "Geometric Sequences Grid", url: "https://www.draustinmaths.com/_files/ugd/7ac124_062a407016ff471aa9d0977f7092ada9.pdf", source: "Dr Austin Maths", type: "pdf" },
        { title: "Geometric/Exponential Sequences", url: "https://www.maths4everyone.com/resources/downloads/sequences-2-ks2-sats-solutions-30046.pdf", source: "Maths4Everyone", type: "pdf" },
        { title: "Geometric Progressions", url: "https://www.savemyexams.com/igcse/further-maths/cie/additional-maths/25/revision-notes/sequences-and-series/arithmetic-and-geometric-progressions/geometric-progressions/", source: "Save My Exams", type: "pdf" }
      ],
      solutions: [
        { title: "Geometric Seq. Answers", url: "https://corbettmaths.com/wp-content/uploads/2024/11/Geometric-Progressions-Answers.pdf", source: "Corbettmaths", type: "pdf" },
        { title: "Geometric Sequences Answers", url: "https://www.draustinmaths.com/_files/ugd/7ac124_4ae4bad5691a45e1b274d4c0bcbc7bba.pdf", source: "Dr Austin Maths", type: "pdf" },
        { title: "Sequences 2 Solutions", url: "https://www.maths4everyone.com/resources/downloads/sequences-2-ks2-sats-solutions-30046.pdf", source: "Maths4Everyone", type: "pdf" },
        { title: "Geometric Series Solutions", url: "https://www.physicsandmathstutor.com/maths-revision/gcse-sequences/", source: "Physics & Maths Tutor", type: "external" }
      ],
      otherResources: [
        { title: "Geometric Sequence Generator", url: "https://mathsbot.com/questionGenerator", source: "MathsBot", type: "external" },
        { title: "Compound Interest Simulators", url: "https://www.desmos.com/calculator", source: "Desmos", type: "external" },
        { title: "Interactive Practice", url: "https://www.khanacademy.org/math/algebra/x2f8bb11595b61c86:sequences/x2f8bb11595b61c86:introduction-to-geometric-sequences/e/geometric_sequences_2", source: "Khan Academy", type: "external" },
        { title: "Fibonacci & Beyond", url: "https://mathsbot.com/tools/fibonacci", source: "MathsBot", type: "external" }
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
        { title: "Functions Practice Questions", url: "https://corbettmaths.com/wp-content/uploads/2020/03/Functions.pdf", source: "Corbettmaths", type: "pdf" },
        { title: "Single Functions Worksheet", url: "https://www.maths4everyone.com/resources/downloads/single-functions-20274.pdf", source: "Maths4Everyone", type: "pdf" }
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
        { title: "Composite Functions Worksheet", url: "https://www.draustinmaths.com/_files/ugd/7ac124_b23c7ddbcd244b0ea84df5fe6b977de1.pdf", source: "Dr Austin Maths", type: "pdf" },
        { title: "Composite & Inverse Functions Questions", url: "https://corbettmaths.com/2018/04/04/composite-functions-3/", source: "Corbettmaths", type: "pdf" }
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
        { title: "Composite and Inverse Functions", url: "https://www.mathsgenie.co.uk/resources/7-composite-and-inverse-functions.pdf", source: "Maths Genie", type: "pdf" },
        { title: "Compound and Inverse Functions Exam Worksheet", url: "https://www.mathsgenie.co.uk/resources/functions.pdf", source: "Maths Genie", type: "pdf" }
      ],
      solutions: [
        { title: "Inverse Functions Solutions", url: "https://www.physicsandmathstutor.com/pdf-pages/?pdf=https%3A%2F%2Fpmt.physicsandmathstutor.com%2Fdownload%2FMaths%2FA-level%2FFunctions%2FSolutions%2FInverse-Functions-Solutions.pdf", source: "Physics & Maths Tutor", type: "pdf" }
      ],
      otherResources: [
        { title: "Inverse Functions Visualizer", url: "https://www.desmos.com/calculator/inverse-functions", source: "Desmos", type: "external" },
        { title: "Khan Academy Inverse Practice", url: "https://www.khanacademy.org/math/algebra/x2f8bb11595b61c86:functions/x2f8bb11595b61c86:inverse-functions/e/inverse-functions", source: "Khan Academy", type: "external" },
        { title: "Inverse Function Example", url: "https://www.desmos.com/calculator/43oqownceb", source: "Desmos", type: "external" }
      ]
    },
    'variation': {
      videos: [
        { title: "Direct & Inverse Proportion Explained", url: "https://www.youtube.com/embed/rtLKCv5buLw", source: "SaveMyExams", type: "video" },
        { title: "Direct Proportion", url: "https://www.youtube.com/embed/KFXK7-ClVxA", source: "Corbettmaths", type: "video" },
        { title: "Direct & Inverse Variation", url: "https://www.youtube.com/embed/q0DVOFwef5k", source: "Khan Academy", type: "video" },
        { title: "GDC Power Modelling Example", url: "https://www.youtube.com/watch?v=-WBCcpe0Tqo", source: "Cambridge IGCSE", type: "video" }
      ],
      exercises: [
        { title: "Variation Worksheet", url: "https://www.draustinmaths.com/_files/ugd/7ac124_ef9fc6401e424f6c8adfa9c1a9c92da4.pdf", source: "Dr Austin Maths", type: "pdf" },
        { title: "Direct & Inverse Proportion Practice", url: "https://www.maths4everyone.com/resources/downloads/direct-proportion-gcse-9-1-practice-questions-30244.pdf", source: "Maths4Everyone", type: "pdf" }
      ],
      solutions: [
        { title: "Variation Solutions", url: "https://www.physicsandmathstutor.com/pdf-pages/?pdf=https%3A%2F%2Fpmt.physicsandmathstutor.com%2Fdownload%2FMaths%2FGCSE%2FTopic-Qs%2FEdexcel%2FSet-1%2FRatio-and-Proportion%2FHigher%2FDirect-and-Inverse-Proportion%2520(H)-Answers.pdf", source: "Physics & Maths Tutor", type: "pdf" },
        { title: "Variation Models Guide", url: "https://www.savemyexams.com/igcse/maths/cie/international-maths/23/extended/revision-notes/algebra-and-sequences/proportion/variation-models/", source: "Save My Exams", type: "pdf" }
      ],
      otherResources: [
        { title: "Variation Models Interactive", url: "https://www.desmos.com/calculator/variation", source: "Desmos", type: "external" },
        { title: "Khan Academy Variation Practice", url: "https://www.khanacademy.org/math/algebra/x2f8bb11595b61c86:direct-inverse-variation/e/direct_and_inverse_variation", source: "Khan Academy", type: "external" },
        { title: "Modeling Data with Desmos", url: "https://www.desmos.com/calculator", source: "Desmos", type: "external" }
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