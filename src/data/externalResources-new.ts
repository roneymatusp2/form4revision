// Cambridge IGCSE International Mathematics (0607) Extended Curriculum Resources

export interface ExternalResource {
  title: string;
  url: string;
  source: string;
}

export interface SubtopicResources {
  [subtopicSlug: string]: ExternalResource[];
}

export interface CurriculumResourcesType {
  [unitId: string]: SubtopicResources;
}

export const curriculumResources: CurriculumResourcesType = {
  'unit-1': {
    'natural-numbers': [
      { title: "Types of Numbers Worksheet", url: "https://corbettmaths.com/wp-content/uploads/2013/02/types-of-numbers-pdf1.pdf", source: "Corbettmaths" },
      { title: "Prime Numbers Worksheet", url: "https://corbettmaths.com/wp-content/uploads/2013/02/prime-numbers-pdf1.pdf", source: "Corbettmaths" },
      { title: "Square Numbers and Square Roots", url: "https://corbettmaths.com/wp-content/uploads/2013/02/square-numbers-pdf1.pdf", source: "Corbettmaths" },
      { title: "Cube Numbers and Cube Roots", url: "https://corbettmaths.com/wp-content/uploads/2013/02/cube-numbers-pdf1.pdf", source: "Corbettmaths" },
      { title: "Triangular Numbers", url: "https://corbettmaths.com/wp-content/uploads/2013/02/triangular-numbers-pdf2.pdf", source: "Corbettmaths" },
      { title: "Rational and Irrational Numbers", url: "https://corbettmaths.com/wp-content/uploads/2019/09/Irrational-and-Rational-Numbers.pdf", source: "Corbettmaths" },
      { title: "Reciprocals", url: "https://corbettmaths.com/wp-content/uploads/2013/02/reciprocals-pdf1.pdf", source: "Corbettmaths" },
      { title: "Factors, Multiples and Primes Revision Grid", url: "https://www.draustinmaths.com/_files/ugd/7ac124_ee92d1afd48c47ccbd2c86598bb2de3f.pdf", source: "Dr. Austin Maths" }
    ],
    'standard-form': [
      { title: "Standard Form Worksheet", url: "https://corbettmaths.com/wp-content/uploads/2013/02/standard-form-pdf1.pdf", source: "Corbettmaths" },
      { title: "Standard Form Practice Strips", url: "https://www.draustinmaths.com/standard-form", source: "Dr. Austin Maths" },
      { title: "Standard Form Revision Grid", url: "https://www.draustinmaths.com/_files/ugd/7ac124_1548f69d09d94b80824a05fcaba64a2e.pdf", source: "Dr. Austin Maths" },
      { title: "Standard Form Questions", url: "https://www.mathsgenie.co.uk/resources/5-standard-form.pdf", source: "Maths Genie" },
      { title: "Standard Form Answers", url: "https://www.mathsgenie.co.uk/resources/5-standard-formans.pdf", source: "Maths Genie" }
    ],
    'common-factors': [
      { title: "HCF and LCM Worksheet", url: "https://corbettmaths.com/wp-content/uploads/2013/02/hcf-lcm-pdf.pdf", source: "Corbettmaths" },
      { title: "Prime Factorisation Worksheet", url: "https://corbettmaths.com/wp-content/uploads/2013/02/prime-factorisation-pdf.pdf", source: "Corbettmaths" },
      { title: "HCF and LCM Questions", url: "https://www.mathsgenie.co.uk/resources/4-HCF-and-LCM.pdf", source: "Maths Genie" },
      { title: "HCF and LCM Answers", url: "https://www.mathsgenie.co.uk/resources/4-HCF-and-LCMans.pdf", source: "Maths Genie" }
    ],
    'four-operations': [
      { title: "Order of Operations (BODMAS) Worksheet", url: "https://corbettmaths.com/wp-content/uploads/2013/02/order-of-operations-pdf1.pdf", source: "Corbettmaths" },
      { title: "Powers and Roots Worksheet", url: "https://corbettmaths.com/wp-content/uploads/2013/02/powers-and-roots-pdf1.pdf", source: "Corbettmaths" },
      { title: "Adding Fractions (Same Denominator)", url: "https://corbettmaths.com/wp-content/uploads/2013/02/adding-fractions-same-denominator-pdf.pdf", source: "Corbettmaths" },
      { title: "Adding Fractions (Different Denominator)", url: "https://corbettmaths.com/wp-content/uploads/2013/02/adding-fractions-different-denominator-pdf.pdf", source: "Corbettmaths" },
      { title: "Multiplying Fractions", url: "https://corbettmaths.com/wp-content/uploads/2013/02/multiplying-fractions-pdf.pdf", source: "Corbettmaths" },
      { title: "Dividing Fractions", url: "https://corbettmaths.com/wp-content/uploads/2013/02/dividing-fractions-pdf.pdf", source: "Corbettmaths" },
      { title: "Improper Fractions & Mixed Numbers", url: "https://corbettmaths.com/wp-content/uploads/2013/02/improper-fractions-and-mixed-numbers-pdf1.pdf", source: "Corbettmaths" },
      { title: "BIDMAS Practice", url: "https://www.mathsgenie.co.uk/resources/1-the-order-of-operations.pdf", source: "Maths Genie" },
      { title: "Fractions Practice", url: "https://www.mathsgenie.co.uk/resources/3-fractions.pdf", source: "Maths Genie" },
      { title: "Fractions Answers", url: "https://www.mathsgenie.co.uk/resources/3-fractionsans.pdf", source: "Maths Genie" },
      { title: "Powers and Roots Revision Grid", url: "https://www.draustinmaths.com/_files/ugd/7ac124_fe57d7a8da0549ea89a69efd290a5cc5.pdf", source: "Dr. Austin Maths" },
      { title: "Fractions Revision Grid", url: "https://www.draustinmaths.com/_files/ugd/7ac124_abcfff6c75f14b71886e2eaed5cd206d.pdf", source: "Dr. Austin Maths" }
    ],
    'surds': [
      { title: "Surds Worksheet", url: "https://corbettmaths.com/wp-content/uploads/2013/02/surds-pdf1.pdf", source: "Corbettmaths" },
      { title: "Surds Practice Grid", url: "https://www.draustinmaths.com/_files/ugd/7ac124_7c2935bca03146d2906e7cd8bfa70c1e.pdf", source: "Dr. Austin Maths" },
      { title: "Surds Questions", url: "https://www.mathsgenie.co.uk/resources/7-surds.pdf", source: "Maths Genie" },
      { title: "Surds Answers", url: "https://www.mathsgenie.co.uk/resources/7-surdsans.pdf", source: "Maths Genie" }
    ],
    'decimals-fractions': [
      { title: "FDP Conversion Worksheet", url: "https://corbettmaths.com/wp-content/uploads/2013/02/fdp-pdf1.pdf", source: "Corbettmaths" },
      { title: "Ordering FDP Worksheet", url: "https://corbettmaths.com/wp-content/uploads/2013/02/ordering-fdp-pdf.pdf", source: "Corbettmaths" },
      { title: "Recurring Decimals Worksheet", url: "https://corbettmaths.com/wp-content/uploads/2013/02/recurring-decimals-pdf.pdf", source: "Corbettmaths" },
      { title: "FDP Conversions", url: "https://www.mathsgenie.co.uk/resources/2-fdp.pdf", source: "Maths Genie" },
      { title: "Converting Recurring Decimals to Fractions", url: "https://www.mathsgenie.co.uk/resources/6-recurring-decimals-to-fractions.pdf", source: "Maths Genie" }
    ],
    'ratio-proportion': [
      { title: "Ratio Worksheet", url: "https://corbettmaths.com/wp-content/uploads/2013/02/ratio-pdf1.pdf", source: "Corbettmaths" },
      { title: "Sharing in a Ratio", url: "https://corbettmaths.com/wp-content/uploads/2013/02/sharing-in-a-ratio-pdf.pdf", source: "Corbettmaths" },
      { title: "Ratio Problem Solving", url: "https://corbettmaths.com/wp-content/uploads/2018/11/Ratio-Problem-Solving-pdf.pdf", source: "Corbettmaths" },
      { title: "Proportion Worksheet", url: "https://corbettmaths.com/wp-content/uploads/2013/02/proportion-pdf1.pdf", source: "Corbettmaths" },
      { title: "Ratio and Proportion Revision Grid", url: "https://www.draustinmaths.com/_files/ugd/7ac124_8caf4afcaaa44fa28b9498fbfe4af9a4.pdf", source: "Dr. Austin Maths" },
      { title: "Writing and Simplifying Ratio", url: "https://www.mathsgenie.co.uk/resources/3-writing-and-simplifying-ratio.pdf", source: "Maths Genie" },
      { title: "Sharing Ratio", url: "https://www.mathsgenie.co.uk/resources/3-sharing-ratio.pdf", source: "Maths Genie" },
      { title: "Ratio Practice Questions", url: "https://www.maths4everyone.com/resources/downloads/ratio-gcse-9-1-practice-questions-30262.pdf", source: "Maths4Everyone" }
    ]
  },
  'unit-2': {
    'exponents-indices': [
      { title: "Indices Worksheet", url: "https://corbettmaths.com/wp-content/uploads/2013/02/indices-pdf.pdf", source: "Corbettmaths" },
      { title: "Laws of Indices Worksheet", url: "https://corbettmaths.com/wp-content/uploads/2018/11/Laws-of-Indices-pdf.pdf", source: "Corbettmaths" },
      { title: "Fractional Indices", url: "https://corbettmaths.com/wp-content/uploads/2018/11/Fractional-Indices-pdf.pdf", source: "Corbettmaths" },
      { title: "Negative Indices", url: "https://corbettmaths.com/wp-content/uploads/2018/11/Negative-Indices-pdf.pdf", source: "Corbettmaths" },
      { title: "Indices Questions", url: "https://www.mathsgenie.co.uk/resources/4-indices.pdf", source: "Maths Genie" },
      { title: "Fractional and Negative Indices", url: "https://www.mathsgenie.co.uk/resources/6-fractional-and-negative-indices.pdf", source: "Maths Genie" },
      { title: "Simplifying Using Laws of Indices Practice Strips", url: "https://www.draustinmaths.com/_files/ugd/7ac124_c5f2ce9fe1d742dd9cd0c354d0b2ab94.pdf", source: "Dr. Austin Maths" }
    ],
    'expansion-brackets': [
      { title: "Expanding Single Brackets", url: "https://corbettmaths.com/wp-content/uploads/2013/02/expanding-brackets-pdf1.pdf", source: "Corbettmaths" },
      { title: "Expanding Double Brackets", url: "https://corbettmaths.com/wp-content/uploads/2013/02/expanding-brackets-2-pdf.pdf", source: "Corbettmaths" },
      { title: "Expanding Triple Brackets", url: "https://corbettmaths.com/wp-content/uploads/2013/02/expanding-brackets-3-pdf.pdf", source: "Corbettmaths" },
      { title: "Expanding Brackets Revision Grid", url: "https://www.draustinmaths.com/_files/ugd/7ac124_dada3c9a77f04c95ba1d9b2ddf3b9245.pdf", source: "Dr. Austin Maths" },
      { title: "Expanding and Factorising", url: "https://www.mathsgenie.co.uk/resources/4-expanding-and-factorising.pdf", source: "Maths Genie" },
      { title: "Expanding Triple Brackets", url: "https://www.mathsgenie.co.uk/resources/6-expanding-triple-brackets.pdf", source: "Maths Genie" }
    ],
    'factorisation': [
      { title: "Factorising (Common Factor)", url: "https://corbettmaths.com/wp-content/uploads/2013/02/factorising-pdf1.pdf", source: "Corbettmaths" },
      { title: "Factorising Quadratics", url: "https://corbettmaths.com/wp-content/uploads/2013/02/factorising-quadratics-pdf1.pdf", source: "Corbettmaths" },
      { title: "Difference of Two Squares", url: "https://corbettmaths.com/wp-content/uploads/2013/02/difference-between-two-squares-pdf.pdf", source: "Corbettmaths" },
      { title: "Factorising Revision Grid", url: "https://www.draustinmaths.com/_files/ugd/7ac124_e4e34d485daf40d4a18aa76456a8a82a.pdf", source: "Dr. Austin Maths" },
      { title: "Factorising with Common Factors Practice Grid", url: "https://www.draustinmaths.com/_files/ugd/7ac124_c5b33eed09b64ac9a81c6b2e48b60c83.pdf", source: "Dr. Austin Maths" },
      { title: "Expanding and Factorising Quadratics", url: "https://www.mathsgenie.co.uk/resources/5-expanding-and-factorising-quadratics.pdf", source: "Maths Genie" },
      { title: "Factorising Harder Quadratics", url: "https://www.mathsgenie.co.uk/resources/7-factorising-harder-quadratics.pdf", source: "Maths Genie" }
    ]
  },
  'unit-3': {
    'units-measurement': [
      { title: "Metric Units Worksheet", url: "https://corbettmaths.com/wp-content/uploads/2013/02/metric-units-pdf1.pdf", source: "Corbettmaths" },
      { title: "Converting Areas and Volumes", url: "https://corbettmaths.com/wp-content/uploads/2013/02/converting-areas-and-volumes-pdf.pdf", source: "Corbettmaths" },
      { title: "Conversions and Units", url: "https://www.mathsgenie.co.uk/resources/3-conversions-and-units.pdf", source: "Maths Genie" },
      { title: "Converting Metric Units Revision Grid", url: "https://www.draustinmaths.com/_files/ugd/7ac124_fe77e5db5e0f41cc98b7613e8cb15d5a.pdf", source: "Dr. Austin Maths" },
      { title: "Metric Units", url: "https://corbettmaths.com/wp-content/uploads/2020/05/Metric-Units.pdf", source: "Corbettmaths" }
    ],
    'perimeter-area': [
      { title: "Perimeter Worksheet", url: "https://corbettmaths.com/wp-content/uploads/2013/02/perimeter-pdf1.pdf", source: "Corbettmaths" },
      { title: "Area of Rectangle", url: "https://corbettmaths.com/wp-content/uploads/2013/02/area-of-a-rectangle-pdf1.pdf", source: "Corbettmaths" },
      { title: "Area of Triangle", url: "https://corbettmaths.com/wp-content/uploads/2013/02/area-of-a-triangle-pdf1.pdf", source: "Corbettmaths" },
      { title: "Area of Parallelogram", url: "https://corbettmaths.com/wp-content/uploads/2013/02/area-of-a-parallelogram-pdf1.pdf", source: "Corbettmaths" },
      { title: "Area of Trapezium", url: "https://corbettmaths.com/wp-content/uploads/2013/02/area-of-a-trapezium-pdf1.pdf", source: "Corbettmaths" },
      { title: "Area of Compound Shapes", url: "https://corbettmaths.com/wp-content/uploads/2013/02/area-of-compound-shapes-pdf1.pdf", source: "Corbettmaths" },
      { title: "Area and Perimeter", url: "https://www.mathsgenie.co.uk/resources/2-area-and-perimeter.pdf", source: "Maths Genie" },
      { title: "Area of Compound Shapes", url: "https://www.mathsgenie.co.uk/resources/37_area-of-compound-shapes.pdf", source: "Maths Genie" },
      { title: "Area and Perimeter Revision Grid", url: "https://www.draustinmaths.com/_files/ugd/7ac124_42522e3bbbfa49dda73215f4642784dc.pdf", source: "Dr. Austin Maths" },
      { title: "Area and Perimeter Practice", url: "https://www.maths4everyone.com/resources/downloads/area-and-perimeter-gcse-9-1-practice-questions-30272.pdf", source: "Maths4Everyone" }
    ],
    'circle-vocabulary': [
      { title: "Parts of a Circle", url: "https://corbettmaths.com/wp-content/uploads/2013/02/parts-of-a-circle-pdf1.pdf", source: "Corbettmaths" },
      { title: "Circles Worksheet", url: "https://corbettmaths.com/wp-content/uploads/2013/02/circles-pdf1.pdf", source: "Corbettmaths" }
    ],
    'circle-calculations': [
      { title: "Circumference of a Circle", url: "https://corbettmaths.com/wp-content/uploads/2013/02/circumference-pdf1.pdf", source: "Corbettmaths" },
      { title: "Area of a Circle", url: "https://corbettmaths.com/wp-content/uploads/2013/02/area-of-a-circle-pdf1.pdf", source: "Corbettmaths" },
      { title: "Area of a Semi-circle", url: "https://corbettmaths.com/wp-content/uploads/2013/02/area-of-a-semi-circle-pdf1.pdf", source: "Corbettmaths" }
    ],
    'arc-sector': [
      { title: "Arc Length", url: "https://corbettmaths.com/wp-content/uploads/2013/02/arc-length-pdf1.pdf", source: "Corbettmaths" },
      { title: "Area of a Sector", url: "https://corbettmaths.com/wp-content/uploads/2013/02/sector-area-pdf1.pdf", source: "Corbettmaths" },
      { title: "Area of a Sector Questions", url: "https://corbettmaths.com/wp-content/uploads/2018/09/Area-of-a-Sector-pdf.pdf", source: "Corbettmaths" },
      { title: "Area of a Sector Answers", url: "https://corbettmaths.com/wp-content/uploads/2018/09/Area-of-Sectors-Answers.pdf", source: "Corbettmaths" }
    ]
  },
  'unit-4': {
    'linear-equations': [
      { title: "Solving Equations Worksheet", url: "https://corbettmaths.com/wp-content/uploads/2013/02/solving-equations-pdf1.pdf", source: "Corbettmaths" },
      { title: "Equations with Brackets", url: "https://corbettmaths.com/wp-content/uploads/2019/02/Equations-with-Brackets.pdf", source: "Corbettmaths" },
      { title: "Equations with Unknowns on Both Sides", url: "https://corbettmaths.com/wp-content/uploads/2013/02/equations-with-unknowns-on-both-sides-pdf.pdf", source: "Corbettmaths" },
      { title: "Equations with Fractions", url: "https://corbettmaths.com/wp-content/uploads/2013/02/equations-with-fractions-pdf.pdf", source: "Corbettmaths" },
      { title: "Solving Equations", url: "https://www.mathsgenie.co.uk/resources/3-solving-equations.pdf", source: "Maths Genie" },
      { title: "Equations and Inequalities Revision Grid", url: "https://www.draustinmaths.com/_files/ugd/7ac124_49d51b15e0974d9da79b75eec1c2f12a.pdf", source: "Dr. Austin Maths" }
    ],
    'inequalities-interpretation': [
      { title: "Inequalities Worksheet", url: "https://corbettmaths.com/wp-content/uploads/2013/02/inequalities-pdf1.pdf", source: "Corbettmaths" },
      { title: "Representing Inequalities on a Number Line", url: "https://corbettmaths.com/wp-content/uploads/2013/02/representing-inequalities-on-a-number-line-pdf.pdf", source: "Corbettmaths" }
    ],
    'inequalities-solution': [
      { title: "Solving Inequalities Worksheet", url: "https://corbettmaths.com/wp-content/uploads/2013/02/solving-inequalities-pdf1.pdf", source: "Corbettmaths" },
      { title: "Solving Inequalities", url: "https://www.mathsgenie.co.uk/resources/3-solving-inequalities.pdf", source: "Maths Genie" }
    ],
    'linear-functions': [
      { title: "Linear Graphs Worksheet", url: "https://corbettmaths.com/wp-content/uploads/2013/02/linear-graphs-pdf1.pdf", source: "Corbettmaths" },
      { title: "Plotting Linear Graphs", url: "https://corbettmaths.com/wp-content/uploads/2013/02/plotting-linear-graphs-pdf.pdf", source: "Corbettmaths" },
      { title: "Equation of a Straight Line", url: "https://corbettmaths.com/wp-content/uploads/2013/02/equation-of-a-straight-line-pdf1.pdf", source: "Corbettmaths" },
      { title: "Straight Line Graphs Worksheet", url: "https://pmt.physicsandmathstutor.com/download/Maths/GCSE/Worksheets/Algebra/Graphs/a.%20Straight%20Line%20Graphs.pdf", source: "Physics & Maths Tutor" }
    ],
    'simultaneous-equations': [
      { title: "Simultaneous Equations Worksheet", url: "https://corbettmaths.com/wp-content/uploads/2013/02/simultaneous-equations-pdf1.pdf", source: "Corbettmaths" },
      { title: "Simultaneous Equations (Elimination Method)", url: "https://corbettmaths.com/wp-content/uploads/2013/02/simultaneous-equations-elimination-pdf.pdf", source: "Corbettmaths" },
      { title: "Simultaneous Equations (Substitution Method)", url: "https://corbettmaths.com/wp-content/uploads/2013/02/simultaneous-equations-substitution-pdf.pdf", source: "Corbettmaths" },
      { title: "Linear Simultaneous Equations Revision Grid", url: "https://www.draustinmaths.com/_files/ugd/7ac124_ed2f0a6ed51d4f72afd2b30f6f61a4c1.pdf", source: "Dr. Austin Maths" }
    ]
  },
  'unit-5': {
    'geometric-terms': [
      { title: "Geometry Basics Worksheet", url: "https://www.maths4everyone.com/resources/geometry-basics.html", source: "Maths4Everyone" },
      { title: "Geometry Terms", url: "https://corbettmaths.com/wp-content/uploads/2013/02/geometry-terms-pdf.pdf", source: "Corbettmaths" }
    ],
    'shape-vocabulary': [
      { title: "2D Shapes Worksheet", url: "https://corbettmaths.com/wp-content/uploads/2013/02/2d-shapes-pdf1.pdf", source: "Corbettmaths" },
      { title: "3D Shapes Worksheet", url: "https://corbettmaths.com/wp-content/uploads/2013/02/3d-shapes-pdf2.pdf", source: "Corbettmaths" },
      { title: "Names of Polygons", url: "https://corbettmaths.com/wp-content/uploads/2013/02/names-of-polygons-pdf.pdf", source: "Corbettmaths" }
    ],
    'measuring-angles': [
      { title: "Measuring Angles Worksheet", url: "https://corbettmaths.com/wp-content/uploads/2018/02/measuring-angles.pdf", source: "Corbettmaths" },
      { title: "Bearings Worksheet", url: "https://corbettmaths.com/wp-content/uploads/2013/02/bearings-pdf1.pdf", source: "Corbettmaths" },
      { title: "Bearings Answers", url: "https://corbettmaths.com/wp-content/uploads/2024/07/Bearings-Answers.pdf", source: "Corbettmaths" }
    ],
    'angle-relationships': [
      { title: "Angles on a Straight Line", url: "https://corbettmaths.com/wp-content/uploads/2013/02/angles-on-a-straight-line-pdf.pdf", source: "Corbettmaths" },
      { title: "Angles Around a Point", url: "https://corbettmaths.com/wp-content/uploads/2013/02/angles-around-a-point-pdf.pdf", source: "Corbettmaths" },
      { title: "Vertically Opposite Angles", url: "https://corbettmaths.com/wp-content/uploads/2013/02/vertically-opposite-angles-pdf.pdf", source: "Corbettmaths" },
      { title: "Angles in Parallel Lines", url: "https://corbettmaths.com/wp-content/uploads/2013/02/angles-in-parallel-lines-pdf1.pdf", source: "Corbettmaths" },
      { title: "Angles and Polygons Revision Grid", url: "https://www.draustinmaths.com/_files/ugd/7ac124_1f5a6b5e74494e35bfeafd1d0b64a8bc.pdf", source: "Dr. Austin Maths" }
    ],
    'polygon-angles': [
      { title: "Angles in Polygons Worksheet", url: "https://corbettmaths.com/wp-content/uploads/2013/02/angles-in-polygons-pdf2.pdf", source: "Corbettmaths" },
      { title: "Interior and Exterior Angles", url: "https://corbettmaths.com/wp-content/uploads/2013/02/interior-and-exterior-angles-pdf1.pdf", source: "Corbettmaths" },
      { title: "Polygons and Angles", url: "https://www.mathsgenie.co.uk/resources/5-polygons-and-angles.pdf", source: "Maths Genie" }
    ],
    'pythagoras-theorem': [
      { title: "Pythagoras' Theorem Worksheet", url: "https://corbettmaths.com/wp-content/uploads/2013/02/pythagoras-pdf1.pdf", source: "Corbettmaths" },
      { title: "Pythagoras in 3D", url: "https://corbettmaths.com/wp-content/uploads/2013/02/pythagoras-in-3d-pdf1.pdf", source: "Corbettmaths" },
      { title: "Pythagoras' Theorem Revision Grid", url: "https://www.draustinmaths.com/_files/ugd/7ac124_59c20723de3c41e9926dea0b05d5fe8e.pdf", source: "Dr. Austin Maths" }
    ]
  },
  'unit-8': {
    'right-angled-trigonometry': [
      { title: "Trigonometry Worksheet", url: "https://corbettmaths.com/wp-content/uploads/2013/02/trigonometry-pdf1.pdf", source: "Corbettmaths" },
      { title: "Trigonometry - Missing Sides", url: "https://corbettmaths.com/wp-content/uploads/2013/02/trigonometry-missing-sides-pdf.pdf", source: "Corbettmaths" },
      { title: "Trigonometry - Missing Angles", url: "https://corbettmaths.com/wp-content/uploads/2013/02/trigonometry-missing-angles-pdf.pdf", source: "Corbettmaths" },
      { title: "Trigonometry Revision Grid", url: "https://www.draustinmaths.com/_files/ugd/7ac124_cc79be15865842bdaef4c8bfecd2ba67.pdf", source: "Dr. Austin Maths" },
      { title: "SOHCAHTOA (Trigonometry) Worksheet", url: "https://www.mathsgenie.co.uk/resources/5-SOHCAHTOA-ws.pdf", source: "Maths Genie" }
    ],
    'pythagoras-trigonometry': [
      { title: "Mixed Pythagoras and Trigonometry", url: "https://www.maths4everyone.com/resources/pythagoras-and-trigonometry.html", source: "Maths4Everyone" },
      { title: "Trigonometry Problems", url: "https://corbettmaths.com/wp-content/uploads/2013/02/trigonometry-problems-pdf.pdf", source: "Corbettmaths" }
    ],
    'angles-elevation-depression': [
      { title: "Angles of Elevation and Depression", url: "https://corbettmaths.com/wp-content/uploads/2013/02/angles-of-elevation-and-depression-pdf1.pdf", source: "Corbettmaths" },
      { title: "Trigonometry & Bearings Mixed Exercise", url: "https://www.savemyexams.com/igcse/maths/cie/international-maths/23/extended/topic-questions/", source: "SaveMyExams (Registration required)" }
    ],
    'perpendicular-distance': [
      { title: "Coordinate Geometry", url: "https://www.draustinmaths.com/geometry", source: "Dr. Austin Maths" },
      { title: "Distance from a Point to a Line", url: "https://www.mathsgenie.co.uk/resources/7-distance-from-point-to-line.pdf", source: "Maths Genie" }
    ]
  }
};

// Additional Cambridge official resources
export const officialResources: ExternalResource[] = [
  { title: "Cambridge IGCSE International Mathematics (0607) Past Papers", url: "https://www.cambridgeinternational.org/programmes-and-qualifications/cambridge-igcse-international-mathematics-0607/past-papers/", source: "Cambridge International" },
  { title: "Cambridge IGCSE 0607 Syllabus 2023-2024", url: "https://www.cambridgeinternational.org/Images/597050-2023-2024-syllabus.pdf", source: "Cambridge International" },
  { title: "Cambridge IGCSE 0607 Syllabus 2025-2027", url: "https://www.cambridgeinternational.org/Images/662472-2025-2027-syllabus.pdf", source: "Cambridge International" },
  { title: "Cambridge IGCSE Learner Guide", url: "https://www.cienotes.com/wp-content/uploads/2018/08/499921-learner-guide-2020-.pdf", source: "Cambridge International" }
];

// Data structure for units
export const unitTitles = {
  'unit-1': 'Unit 1: Number Systems, Different Representations and Use of Numbers',
  'unit-2': 'Unit 2: Algebraic Manipulation',
  'unit-3': 'Unit 3: Mensuration',
  'unit-4': 'Unit 4: Linear Patterns, Models, and Representations',
  'unit-5': 'Unit 5: Angles',
  'unit-8': 'Unit 8: Trigonometry of Triangles and Periodic Functions'
};

// Unit colors matching TopicCard.tsx
export const unitColors = {
  'unit-1': 'blue',
  'unit-2': 'green',
  'unit-3': 'green',
  'unit-4': 'blue',
  'unit-5': 'orange',
  'unit-8': 'purple'
}; 