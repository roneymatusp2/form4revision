// exercises.ts - All exercise resources for Cambridge IGCSE International Mathematics (0607)
import { ExternalResource } from '../types';

export const exerciseResources: { [unitId: string]: { [subtopicSlug: string]: ExternalResource[] } } = {
  'unit-1': {
    'natural-numbers': [
      { title: "Reciprocals", url: "https://corbettmaths.com/wp-content/uploads/2013/02/reciprocals-pdf1.pdf", source: "Corbettmaths", type: "pdf" },
      { title: "Factors, Multiples and Primes Revision Grid", url: "https://www.draustinmaths.com/_files/ugd/7ac124_ee92d1afd48c47ccbd2c86598bb2de3f.pdf", source: "Dr. Austin Maths", type: "pdf" }
    ],
    'standard-form': [
      { title: "Standard Form Questions", url: "https://www.mathsgenie.co.uk/resources/5-standard-form.pdf", source: "Maths Genie", type: "pdf" }
    ],
    'common-factors': [
      { title: "HCF and LCM Questions", url: "https://www.mathsgenie.co.uk/resources/4-HCF-and-LCM.pdf", source: "Maths Genie", type: "pdf" }
    ],
    'four-operations': [
      { title: "Multiplying Fractions", url: "https://corbettmaths.com/wp-content/uploads/2013/02/multiplying-fractions-pdf.pdf", source: "Corbettmaths", type: "pdf" },
      { title: "Dividing Fractions", url: "https://corbettmaths.com/wp-content/uploads/2013/02/dividing-fractions-pdf.pdf", source: "Corbettmaths", type: "pdf" },
      { title: "BIDMAS Practice", url: "https://www.mathsgenie.co.uk/resources/1-the-order-of-operations.pdf", source: "Maths Genie", type: "pdf" },
      { title: "Fractions Practice", url: "https://www.mathsgenie.co.uk/resources/3-fractions.pdf", source: "Maths Genie", type: "pdf" }
    ],
    'surds': [
      { title: "Surds Worksheet", url: "https://corbettmaths.com/wp-content/uploads/2013/02/surds-pdf1.pdf", source: "Corbettmaths", type: "pdf" },
      { title: "Surds Questions", url: "https://www.mathsgenie.co.uk/resources/7-surds.pdf", source: "Maths Genie", type: "pdf" }
    ],
    'decimals-fractions': [
      { title: "Ordering FDP Worksheet", url: "https://corbettmaths.com/wp-content/uploads/2013/02/ordering-fdp-pdf.pdf", source: "Corbettmaths", type: "pdf" },
      { title: "Recurring Decimals Worksheet", url: "https://corbettmaths.com/wp-content/uploads/2013/02/recurring-decimals-pdf.pdf", source: "Corbettmaths", type: "pdf" }
    ],
    'ratio-proportion': [
      { title: "Writing and Simplifying Ratio", url: "https://www.mathsgenie.co.uk/resources/3-writing-and-simplifying-ratio.pdf", source: "Maths Genie", type: "pdf" },
      { title: "Sharing Ratio", url: "https://www.mathsgenie.co.uk/resources/3-sharing-ratio.pdf", source: "Maths Genie", type: "pdf" },
      { title: "Ratio Practice Questions", url: "https://www.maths4everyone.com/resources/downloads/ratio-gcse-9-1-practice-questions-30262.pdf", source: "Maths4Everyone", type: "pdf" }
    ],
    'linear-functions': [
      { title: "Straight Line Graphs", url: "https://www.mathsgenie.co.uk/resources/16-graphs.pdf", source: "Maths Genie", type: "pdf" }
    ],
    'parallel-perpendicular-lines': [
      { title: "Parallel and Perpendicular Lines", url: "https://www.mathsgenie.co.uk/resources/6-parallel-and-perpendicular-lines.pdf", source: "Maths Genie", type: "pdf" }
    ],
    'distance-formula': [
      { title: "Distance Between Two Points", url: "https://corbettmaths.com/wp-content/uploads/2019/01/Distance-between-2-points-pdf.pdf", source: "Corbettmaths", type: "pdf" },
      { title: "Kuta Software: The Distance Formula (inc. Answers)", url: "https://cdn.kutasoftware.com/Worksheets/Geo/3-The%20Distance%20Formula.pdf", source: "Kuta Software", type: "pdf" },
      { title: "Third Space Learning: Distance Formula Page (Worksheet/Questions)", url: "https://thirdspacelearning.com/gcse-maths/algebra/distance-formula/", source: "Third Space Learning", type: "external" },
      { title: "Yonkers: Coordinate Plane Distances", url: "https://www.yonkerspublicschools.org/cms/lib/NY01814060/Centricity/Domain/1999/6th-lesson%207%20wksht-1.pdf", source: "Yonkers Public Schools", type: "pdf" },
      { title: "CBSD: Coordinate Geometry Review (inc. Distance)", url: "https://www.cbsd.org/cms/lib/PA01916442/Centricity/Domain/2780/Coordinate%20Geometry%20Review.pdf", source: "CBSD", type: "pdf" },
      { title: "Amphi: Distance in the Coordinate Plane Activity", url: "https://www.amphi.com/cms/lib/AZ01901095/Centricity/Domain/256/1-6B%20Distance%20in%20the%20Coordinate%20Plane.pdf", source: "Amphi", type: "pdf" }
    ],
    'simultaneous-equations': [
      { title: "Solving Simultaneous Equations Graphically Worksheet", url: "https://www.mathsgenie.co.uk/resources/5-simultaneous-equations.pdf", source: "Maths Genie", type: "pdf" },
      { title: "Solving Simultaneous Equations by Substitution Practice Strips", url: "https://www.draustinmaths.com/_files/ugd/7ac124_cea2b0712ca24097a035a428f4d93233.pdf", source: "Dr Austin Maths", type: "pdf" },
      { title: "Simultaneous Equations (Elimination Practice)", url: "https://www.draustinmaths.com/_files/ugd/7ac124_1e4f9811d2b3468abfe7b4375336b4e9.pdf", source: "Dr Austin Maths", type: "pdf" }
    ]
  },
  'unit-2': {
    'exponents-indices': [
      { title: "Indices Worksheet", url: "https://corbettmaths.com/wp-content/uploads/2013/02/indices-pdf.pdf", source: "Corbettmaths", type: "pdf" },
      { title: "Indices Questions", url: "https://www.mathsgenie.co.uk/resources/4-indices.pdf", source: "Maths Genie", type: "pdf" },
      { title: "Fractional and Negative Indices", url: "https://www.mathsgenie.co.uk/resources/6-fractional-and-negative-indices.pdf", source: "Maths Genie", type: "pdf" }
    ],
    'expansion-brackets': [
      { title: "Expanding Single Brackets", url: "https://corbettmaths.com/wp-content/uploads/2013/02/expanding-brackets-pdf1.pdf", source: "Corbettmaths", type: "pdf" },
      { title: "Expanding and Factorising", url: "https://www.mathsgenie.co.uk/resources/4-expanding-and-factorising.pdf", source: "Maths Genie", type: "pdf" },
      { title: "Expanding Triple Brackets", url: "https://www.mathsgenie.co.uk/resources/6-expanding-triple-brackets.pdf", source: "Maths Genie", type: "pdf" }
    ],
    'factorisation': [
      { title: "Factorising Quadratics", url: "https://corbettmaths.com/wp-content/uploads/2013/02/factorising-quadratics-pdf1.pdf", source: "Corbettmaths", type: "pdf" },
      { title: "Difference of Two Squares", url: "https://corbettmaths.com/wp-content/uploads/2013/02/difference-between-two-squares-pdf.pdf", source: "Corbettmaths", type: "pdf" },
      { title: "Expanding and Factorising Quadratics", url: "https://www.mathsgenie.co.uk/resources/5-expanding-and-factorising-quadratics.pdf", source: "Maths Genie", type: "pdf" },
      { title: "Factorising Harder Quadratics", url: "https://www.mathsgenie.co.uk/resources/7-factorising-harder-quadratics.pdf", source: "Maths Genie", type: "pdf" }
    ],
    'basic-angle-relationships': [
      { title: "Angles Around a Point / Straight Line Worksheets", url: "https://www.draustinmaths.com/angles-and-polygons", source: "Dr Austin Maths", type: "external" },
      { title: "Angles Around a Point Worksheet Pack", url: "https://www.tes.com/teaching-resources/shop/Maths4Everyone?sortBy=newest&p=4", source: "Maths4Everyone", type: "external" },
      { title: "Missing Angles Practice Questions", url: "https://corbettmaths.com/2019/08/22/missing-angles-practice-questions/", source: "Corbettmaths", type: "pdf" }
    ],
    'parallel-line-angles': [
      { title: "Angles in Parallel Lines Worksheet", url: "https://www.draustinmaths.com/angles-and-polygons", source: "Dr Austin Maths", type: "external" },
      { title: "Angles in Parallel Lines Exam Questions", url: "https://www.mathsgenie.co.uk/resources/33_angles-parallel-lines.pdf", source: "Maths Genie", type: "pdf" },
      { title: "Angles in Parallel Lines Revision Notes", url: "https://www.savemyexams.com/igcse/maths/cie/25/extended/revision-notes/geometry/angles-in-polygons-and-parallel-lines/angles-in-parallel-lines/", source: "Save My Exams", type: "pdf" }
    ],
    'angle-sums': [
      { title: "Angles in Triangles & Quadrilaterals Worksheets", url: "https://www.draustinmaths.com/angles-and-polygons", source: "Dr Austin Maths", type: "external" },
      { title: "Angles in Irregular Polygons Worksheet", url: "https://www.draustinmaths.com/angles-and-polygons", source: "Dr Austin Maths", type: "external" },
      { title: "Angles in Polygons Practice Questions", url: "https://corbettmaths.com/2018/04/04/angles-in-polygons-2/", source: "Corbettmaths", type: "pdf" },
      { title: "Angles in Polygons Revision Notes", url: "https://www.savemyexams.com/igcse/maths/cie/25/extended/revision-notes/geometry/angles-in-polygons-and-parallel-lines/angles-in-polygons/", source: "Save My Exams", type: "pdf" }
    ],
    'polygon-angles': [
      { title: "Interior & Exterior Angles Activity", url: "https://www.draustinmaths.com/angles-and-polygons", source: "Dr Austin Maths", type: "external" },
      { title: "Regular Polygons Exam Questions", url: "https://www.mathsgenie.co.uk/resources/33_angles-polygons.pdf", source: "Maths Genie", type: "pdf" },
      { title: "Regular Polygons Revision Notes", url: "https://www.savemyexams.com/igcse/maths/cie/25/extended/revision-notes/geometry/angles-in-polygons-and-parallel-lines/angles-in-polygons/", source: "Save My Exams", type: "pdf" }
    ],
    'angle-vocabulary': [
      { title: "Angle Vocabulary Study Guide", url: "https://www.bbc.co.uk/bitesize/topics/zb6tyrd", source: "BBC Bitesize", type: "external" },
      { title: "Angles Revision Guide & Worksheet", url: "https://thirdspacelearning.com/gcse-maths/geometry-and-measure/angles/", source: "Third Space Learning", type: "external" }
    ]
  },
  'unit-3': {
    'units-measurement': [
      { title: "Metric Units Worksheet", url: "https://corbettmaths.com/wp-content/uploads/2013/02/metric-units-pdf1.pdf", source: "Corbettmaths", type: "pdf" },
      { title: "Conversions and Units", url: "https://www.mathsgenie.co.uk/resources/3-conversions-and-units.pdf", source: "Maths Genie", type: "pdf" },
      { title: "Metric Units", url: "https://corbettmaths.com/wp-content/uploads/2020/05/Metric-Units.pdf", source: "Corbettmaths", type: "pdf" }
    ],
    'perimeter-area': [
      { title: "Perimeter Worksheet", url: "https://corbettmaths.com/wp-content/uploads/2013/02/perimeter-pdf1.pdf", source: "Corbettmaths", type: "pdf" },
      { title: "Area of Rectangle", url: "https://corbettmaths.com/wp-content/uploads/2013/02/area-of-a-rectangle-pdf1.pdf", source: "Corbettmaths", type: "pdf" },
      { title: "Area of Parallelogram", url: "https://corbettmaths.com/wp-content/uploads/2013/02/area-of-a-parallelogram-pdf1.pdf", source: "Corbettmaths", type: "pdf" },
      { title: "Area of Compound Shapes", url: "https://corbettmaths.com/wp-content/uploads/2013/02/area-of-compound-shapes-pdf1.pdf", source: "Corbettmaths", type: "pdf" },
      { title: "Area and Perimeter", url: "https://www.mathsgenie.co.uk/resources/2-area-and-perimeter.pdf", source: "Maths Genie", type: "pdf" },
      { title: "Area of Compound Shapes", url: "https://www.mathsgenie.co.uk/resources/37_area-of-compound-shapes.pdf", source: "Maths Genie", type: "pdf" },
      { title: "Area and Perimeter Practice", url: "https://www.maths4everyone.com/resources/downloads/area-and-perimeter-gcse-9-1-practice-questions-30272.pdf", source: "Maths4Everyone", type: "pdf" }
    ],
    'bearings': [
      { title: "Bearings Worksheet", url: "https://www.mathsgenie.co.uk/resources/5-bearings.pdf", source: "Maths Genie", type: "pdf" },
      { title: "Bearings Practice Grid", url: "https://www.draustinmaths.com/_files/ugd/7ac124_6b36747ebfb743e0a8f51cdc8d35da44.docx", source: "Dr Austin Maths", type: "external" }
    ],
    'pythagoras-theorem': [
      { title: "Pythagoras Worksheet", url: "https://www.mathsgenie.co.uk/resources/5-pythagoras.pdf", source: "Maths Genie", type: "pdf" },
      { title: "Pythagoras' Theorem Worksheet", url: "https://corbettmaths.com/wp-content/uploads/2013/02/pythagoras-pdf1.pdf", source: "Corbettmaths", type: "pdf" }
    ],
    'chord-properties': [
      { title: "Perpendicular from Centre to a Chord", url: "https://www.draustinmaths.com/_files/ugd/7ac124_649cf513c0e5405683f709c3b013e49e.pdf", source: "Dr Austin Maths", type: "pdf" },
      { title: "Circle Theorems Worksheet", url: "https://corbettmaths.com/wp-content/uploads/2013/02/circle-theorems-1-pdf.pdf", source: "Corbettmaths", type: "pdf" }
    ],
    'circle-distances': [
      { title: "Distance Between 2 Points Worksheet", url: "https://corbettmaths.com/wp-content/uploads/2019/01/Distance-between-2-points-pdf.pdf", source: "Corbettmaths", type: "pdf" },
      { title: "Circle Geometry Problems", url: "https://www.savemyexams.com/igcse/maths/cambridge-cie/international-maths-extended/revision-notes/geometry/circle-theorems/circle-properties/", source: "Save My Exams", type: "pdf" }
    ]
  },
  'unit-4': {
    'linear-equations': [
      { title: 'Solving Equations', url: 'https://www.mathsgenie.co.uk/resources/3-solving-equations.pdf', source: 'Maths Genie', type: 'pdf' }
    ],
    'algebraic-fractions-simplification': [
      { title: 'Algebraic Fractions – Simplifying by Factorising', url: 'https://www.maths4everyone.com/resources/downloads/algebraic-fractions-simplifying-20286.pdf', source: 'Maths4Everyone', type: 'pdf' },
      { title: 'Simplifying Algebraic Fractions Worksheet', url: 'https://www.draustinmaths.com/_files/ugd/7ac124_c6ab4dd8b40747e2b1307a44ad3f7f03.pdf', source: 'Dr Austin Maths', type: 'pdf' },
      { title: 'Simplifying Algebraic Fractions', url: 'https://corbettmaths.com/wp-content/uploads/2013/02/simplifying-algebraic-fractions-pdf1.pdf', source: 'Corbettmaths', type: 'pdf' }
    ],
    'algebraic-fractions-addition': [
      { title: 'Algebraic Fractions – Addition and Subtraction', url: 'https://www.maths4everyone.com/resources/downloads/algebraic-fractions-adding-and-subtracting-20288.pdf', source: 'Maths4Everyone', type: 'pdf' },
      { title: 'Adding & Subtracting Algebraic Fractions Worksheet', url: 'https://www.draustinmaths.com/_files/ugd/7ac124_eace8abe85a14cb78c24e97df3a9e36e.pdf', source: 'Dr Austin Maths', type: 'pdf' },
      { title: 'Practice Strips - Adding & Subtracting', url: 'https://www.draustinmaths.com/_files/ugd/7ac124_33fa4edcfbe14a3ca5c0a95ed54a25b5.pdf', source: 'Dr Austin Maths', type: 'pdf' }
    ],
    'algebraic-fractions-multiplication': [
      { title: 'Multiplying Algebraic Fractions Worksheet', url: 'https://www.draustinmaths.com/_files/ugd/7ac124_e0b3be394a7146d68a7e0f9a1cd8ac30.pdf', source: 'Dr Austin Maths', type: 'pdf' },
      { title: 'Dividing Algebraic Fractions Worksheet', url: 'https://www.draustinmaths.com/_files/ugd/7ac124_bac69254bb7d465eb65eb93d99e7d6d1.pdf', source: 'Dr Austin Maths', type: 'pdf' },
      { title: 'Multiplying & Dividing Algebraic Fractions', url: 'https://www.savemyexams.com/igcse/maths/cie/25/extended/revision-notes/algebra-and-sequences/algebraic-fractions/simplifying/', source: 'Save My Exams', type: 'pdf' }
    ],
    'algebraic-fractions-equations': [
      { title: 'Algebraic Fractions (Equations)', url: 'https://www.maths4everyone.com/resources/downloads/algebraic-fractions-equations-gcse-9-1-practice-questions-30218.pdf', source: 'Maths4Everyone', type: 'pdf' },
      { title: 'Solving Equations with Algebraic Fractions', url: 'https://www.draustinmaths.com/_files/ugd/7ac124_9a4a5a6e94de4b85b44a3a6d6cd03f34.pdf', source: 'Dr Austin Maths', type: 'pdf' },
      { title: 'Solving Algebraic Fraction Equations', url: 'https://pmt.physicsandmathstutor.com/download/Maths/GCSE/Topic-Qs/Edexcel/Set-1/Algebra/Higher/Notation-Vocabulary-and-Manipulation/Solving%20Algebraic%20Fractions%20(H).pdf', source: 'Physics & Maths Tutor', type: 'pdf' }
    ],
    'distance-between-points': [
      { title: 'Corbettmaths – Distance Between Two Points Practice Questions', url: 'https://corbettmaths.com/2019/08/28/distance-between-two-points-practice-questions/', source: 'Corbettmaths', type: 'pdf' },
      { title: 'Kuta Software - Distance Formula Worksheet (inc Answers)', url: 'https://cdn.kutasoftware.com/Worksheets/Geo/3-The%20Distance%20Formula.pdf', source: 'Kuta Software', type: 'pdf'},
      { title: 'Fullerton SD - Length of Line Segments Worksheet', url: 'https://www.fullertonsd.org/cms/lib/CA50010905/Centricity/domain/1073/math/Extra%20Practice%20and%20Support/9_2_Extra_Practice_L2.pdf', source: 'Fullerton SD', type: 'pdf'},
      { title: 'MathWorksheets4Kids - Length of a Line Segment', url: 'https://www.mathworksheets4kids.com/length-line-segment.php', source: 'MathWorksheets4Kids', type: 'external'}
    ],
    'midpoints': [
      { title: 'Maths4Everyone – Midpoints Worksheet (PDF)', url: 'https://www.maths4everyone.com/resources/downloads/midpoints-40029.pdf', source: 'Maths4Everyone', type: 'pdf' },
      { title: 'Kuta Software - Midpoint Formula Worksheet (inc Answers)', url: 'https://cdn.kutasoftware.com/Worksheets/Alg1/Midpoint%20Formula.pdf', source: 'Kuta Software', type: 'pdf'},
      { title: 'Downstairs Math - Distance and Midpoint Formula Worksheet (inc Answers)', url: 'https://downstairsmath.weebly.com/uploads/3/7/1/8/37189031/distance_and_midpt_ws_2.pdf', source: 'Downstairs Math', type: 'pdf'},
      { title: 'CBSD - Coordinate Geometry Review (inc Midpoint)', url: 'https://www.cbsd.org/cms/lib/PA01916442/Centricity/Domain/2780/Coordinate%20Geometry%20Review.pdf', source: 'CBSD', type: 'pdf'}
    ],
    'gradient-slope': [
      { title: 'Corbettmaths – Gradient Practice Questions', url: 'https://corbettmaths.com/2019/09/02/gradient-practice-questions/', source: 'Corbettmaths', type: 'pdf' },
      { title: 'Corbettmaths - Gradient Worksheet PDF', url: 'https://corbettmaths.com/wp-content/uploads/2018/12/Gradient-pdf.pdf', source: 'Corbettmaths', type: 'pdf'},
      { title: 'Kuta Software - Slope From Two Points Worksheet (inc Answers)', url: 'https://cdn.kutasoftware.com/Worksheets/Alg1/Slope%20From%20Two%20Points.pdf', source: 'Kuta Software', type: 'pdf'}
    ],
    'parallel-perpendicular-lines': [
      { title: "Parallel and Perpendicular Lines", url: "https://www.mathsgenie.co.uk/resources/6-parallel-and-perpendicular-lines.pdf", source: "Maths Genie", type: "pdf" },
      { title: 'Dr Austin Maths – Parallel and Perpendicular Lines Practice', url: 'https://www.draustinmaths.com/coordinates-and-linear-graphs', source: 'Dr Austin Maths', type: 'external' },
      { title: 'Big Ideas Math - Parallel/Perpendicular Lines PDF (Ch 3)', url: 'https://static.bigideasmath.com/protected/content/pe/hstx/hstx_geometry_pe_03.pdf', source: 'Big Ideas Math', type: 'pdf'},
      { title: 'JMAP - Parallel/Perpendicular Lines Worksheet (inc Answers)', url: 'https://www.jmap.org/Worksheets/G.GPE.B.5.ParallelandPerpendicularLines7.pdf', source: 'JMAP', type: 'pdf'}
    ],
    'perpendicular-bisector': [
      { title: 'Save My Exams – Perpendicular Lines & Bisectors Notes', url: 'https://www.savemyexams.com/igcse/maths/cie/international-maths/23/extended/revision-notes/coordinate-geometry-and-graphs/straight-line-graphs/perpendicular-lines/', source: 'Save My Exams', type: 'pdf' },
      { title: 'RHnet - Equation of Perpendicular Bisector Practice PDF', url: 'https://www.rhnet.org/site/handlers/filedownload.ashx?moduleinstanceid=3560&dataid=17455&FileName=equation%20of%20perpendicular%20bisector%20practice.pdf', source: 'RHnet', type: 'pdf'},
      { title: 'Glow Blogs - Perpendicular Bisectors Worksheet PDF', url: 'https://blogs.glowscotland.org.uk/ab/public/rothesayacademymaths/uploads/sites/935/2016/03/Unit1_Lines-_PerpendicularBisectors.pdf', source: 'Glow Blogs', type: 'pdf'}
    ],
    'length-of-line': [
      { title: 'Dr Austin Maths – Midpoints and Lengths of Lines Worksheet', url: 'https://www.draustinmaths.com/coordinates-and-linear-graphs', source: 'Dr Austin Maths', type: 'external' },
      { title: 'Fullerton SD - Length of Line Segments Worksheet', url: 'https://www.fullertonsd.org/cms/lib/CA50010905/Centricity/domain/1073/math/Extra%20Practice%20and%20Support/9_2_Extra_Practice_L2.pdf', source: 'Fullerton SD', type: 'pdf'},
      { title: 'Corbettmaths - Distance Between Two Points PDF', url: 'https://corbettmaths.com/wp-content/uploads/2019/01/Distance-between-2-points-pdf.pdf', source: 'Corbettmaths', type: 'pdf'}
    ],
    'linear-functions': [
      { title: 'Maths Genie - Straight Line Graphs', url: 'https://www.mathsgenie.co.uk/resources/16-graphs.pdf', source: 'Maths Genie', type: 'pdf' },
      { title: 'MME Revise - y=mx+c Worksheets Page', url: 'https://mmerevise.co.uk/gcse-maths-revision/ymxc-gcse-maths-revision-worksheets/', source: 'MME Revise', type: 'external' },
      { title: 'Corbettmaths - Equation of a Line Worksheet', url: 'https://corbettmaths.com/wp-content/uploads/2018/12/Equation-of-a-Line-pdf.pdf', source: 'Corbettmaths', type: 'pdf'},
      { title: 'Third Space Learning - y=mx+c Worksheet Page', url: 'https://thirdspacelearning.com/gcse-maths/algebra/y-mx-c/', source: 'Third Space Learning', type: 'external'}
    ]
  },
  'unit-5': {
    'quadratic-fundamentals': [
      { title: "Expanding & Factorising Quadratics", url: "https://www.draustinmaths.com/_files/ugd/7ac124_ca1558333a9a4f57b18a8f390e3d332f.pdf", source: "Dr Austin Maths", type: "pdf" },
      { title: "Quadratic Expressions Worksheet", url: "https://www.draustinmaths.com/_files/ugd/7ac124_e8a0f6138cd849aebaed7619d9c1cffa.pdf", source: "Dr Austin Maths", type: "pdf" },
      { title: "Quadratic Equations Practice", url: "https://www.maths4everyone.com/resources/downloads/quadratic-equations-gcse-9-1-practice-questions-30242.pdf", source: "Maths4Everyone", type: "pdf" }
    ],
    'factorisation-method': [
      { title: "Factorising Quadratics (Sum and Product method)", url: "https://www.draustinmaths.com/_files/ugd/7ac124_1e4f9811d2b3468abfe7b4375336b4e9.pdf", source: "Dr Austin Maths", type: "pdf" },
      { title: "Solving Quadratics by Factorising Worksheet", url: "https://corbettmaths.com/wp-content/uploads/2013/02/solving-quadratics-by-factorising-1-pdf.pdf", source: "Corbettmaths", type: "pdf" },
      { title: "Factorising Practice Questions", url: "https://www.mathsgenie.co.uk/resources/86_solving-quadratics-by-factorising.pdf", source: "Maths Genie", type: "pdf" }
    ],
    'quadratic-formula': [
      { title: "Quadratic Formula Practice", url: "https://www.mathsgenie.co.uk/resources/7-quadratic-formula.pdf", source: "Maths Genie", type: "pdf" },
      { title: "Quadratic Formula Worksheet", url: "https://www.maths4everyone.com/resources/downloads/the-quadratic-formulae-20272.pdf", source: "Maths4Everyone", type: "pdf" },
      { title: "Mixed Quadratic Equations Practice", url: "https://justmaths.co.uk/wp-content/uploads/2015/11/Algebra-F-Factorising-Expanding-Factorising-Solving-Quadratics-v3.pdf", source: "JustMaths", type: "pdf" }
    ],
    'gdc-quadratics': [
      { title: "GDC-Based Quadratic Problems", url: "https://www.onmaths.com/resource/solve-quadratic-equations/", source: "OnMaths", type: "external" }
    ],
    'parabola-properties': [
      { title: "Plotting Quadratic Graphs", url: "https://www.draustinmaths.com/_files/ugd/7ac124_b3b2d0fee0954747b10647051f5f7955.pdf", source: "Dr Austin Maths", type: "pdf" },
      { title: "Quadratic Graphs", url: "https://www.mathsgenie.co.uk/resources/5-quadratic-graphs.pdf", source: "Maths Genie", type: "pdf" },
      { title: "Sketching Quadratics", url: "https://corbettmaths.com/wp-content/uploads/2019/04/Sketching-Quadratics.pdf", source: "Corbettmaths", type: "pdf" }
    ]
  },
  'unit-6': {
    'linear-sequences': [
      { title: "Sequences (Nth Term) Practice Questions", url: "https://corbettmaths.com/wp-content/uploads/2019/09/Sequences-nth-Term.pdf", source: "Corbettmaths", type: "pdf" },
      { title: "Nth Term of a Linear Sequence", url: "https://www.draustinmaths.com/_files/ugd/7ac124_dce56bf2a95b4c9eacf7693a3c0ec80f.pdf", source: "Dr Austin Maths", type: "pdf" },
      { title: "Arithmetic Sequences Basics", url: "https://www.maths4everyone.com/resources/downloads/arithmetic-sequences-basics-20264.pdf", source: "Maths4Everyone", type: "pdf" },
      { title: "Sequences (9-1 GCSE)", url: "https://justmaths.co.uk/wp-content/uploads/2015/12/Algebra-H-Sequences-v2.pdf", source: "JustMaths", type: "pdf" }
    ],
    'quadratic-sequences': [
      { title: "Quadratic Nth Term Practice", url: "https://corbettmaths.com/wp-content/uploads/2019/09/Quadratic-nth-Term.pdf", source: "Corbettmaths", type: "pdf" },
      { title: "Quadratic Sequence Practice", url: "https://www.draustinmaths.com/_files/ugd/7ac124_82e5dd114ad7464d83873f86ca7d3e6b.pdf", source: "Dr Austin Maths", type: "pdf" },
      { title: "Nth Term of a Quadratic Sequence", url: "https://www.mathsgenie.co.uk/resources/7-quadratic-sequences.pdf", source: "Maths Genie", type: "pdf" },
      { title: "Quadratic Sequences (Revision Notes)", url: "https://www.savemyexams.com/gcse/maths/edexcel/22/higher/revision-notes/algebra/sequences/quadratic-sequences/", source: "Save My Exams", type: "pdf" }
    ],
    'cubic-sequences': [
      { title: "Cubic Sequences Worksheet", url: "https://www.radfordmathematics.com/algebra/sequences-series/difference-method-sequences/cubic-sequences-worksheet-1.pdf", source: "Radford Mathematics", type: "pdf" },
      { title: "Cubic Sequence Investigation", url: "https://www.tes.com/teaching-resource/cubic-sequences-worksheet-12094709", source: "TES", type: "pdf" },
      { title: "Cubic Sequences Lesson", url: "https://classroom.thenational.academy/lessons/simple-quadratic-and-cubic-sequences-c4ukar", source: "Oak National Academy", type: "external" },
      { title: "Types of Sequences", url: "https://www.savemyexams.com/igcse/maths/cie/25/extended/revision-notes/algebra-and-sequences/sequences/types-of-sequences/", source: "Save My Exams", type: "pdf" }
    ],
    'geometric-sequences': [
      { title: "Geometric Sequences Practice", url: "https://corbettmaths.com/wp-content/uploads/2024/11/Geometric-Progressions.pdf", source: "Corbettmaths", type: "pdf" },
      { title: "Geometric Sequences Grid", url: "https://www.draustinmaths.com/_files/ugd/7ac124_062a407016ff471aa9d0977f7092ada9.pdf", source: "Dr Austin Maths", type: "pdf" },
      { title: "Geometric/Exponential Sequences", url: "https://www.maths4everyone.com/resources/downloads/sequences-2-ks2-sats-solutions-30046.pdf", source: "Maths4Everyone", type: "pdf" },
      { title: "Geometric Progressions", url: "https://www.savemyexams.com/igcse/further-maths/cie/additional-maths/25/revision-notes/sequences-and-series/arithmetic-and-geometric-progressions/geometric-progressions/", source: "Save My Exams", type: "pdf" }
    ]
  },
  'unit-7': {
    'function-notation': [
      { title: "Function Notation Strips", url: "https://www.draustinmaths.com/_files/ugd/7ac124_a2ceb2d9edfa42b3bebdaf902f95a6bb.pdf", source: "Dr Austin Maths", type: "pdf" },
      { title: "Functions Practice Questions", url: "https://corbettmaths.com/wp-content/uploads/2020/03/Functions.pdf", source: "Corbettmaths", type: "pdf" },
      { title: "Single Functions Worksheet", url: "https://www.maths4everyone.com/resources/downloads/single-functions-20274.pdf", source: "Maths4Everyone", type: "pdf" }
    ],
    'composite-functions': [
      { title: "Composite and Inverse Functions", url: "https://www.mathsgenie.co.uk/resources/7-composite-and-inverse-functions.pdf", source: "Maths Genie", type: "pdf" },
      { title: "Composite Functions Worksheet", url: "https://www.draustinmaths.com/_files/ugd/7ac124_b23c7ddbcd244b0ea84df5fe6b977de1.pdf", source: "Dr Austin Maths", type: "pdf" },
      { title: "Composite & Inverse Functions Questions", url: "https://corbettmaths.com/2018/04/04/composite-functions-3/", source: "Corbettmaths", type: "pdf" }
    ],
    'inverse-functions': [
      { title: "Inverse Functions Worksheet", url: "https://www.draustinmaths.com/_files/ugd/7ac124_1e9e7f82c2ca405fa3fc1a7a3984d9c0.pdf", source: "Dr Austin Maths", type: "pdf" },
      { title: "Composite and Inverse Functions", url: "https://www.mathsgenie.co.uk/resources/7-composite-and-inverse-functions.pdf", source: "Maths Genie", type: "pdf" },
      { title: "Compound and Inverse Functions Exam Worksheet", url: "https://www.mathsgenie.co.uk/resources/functions.pdf", source: "Maths Genie", type: "pdf" }
    ],
    'variation': [
      { title: "Variation Worksheet", url: "https://www.draustinmaths.com/_files/ugd/7ac124_ef9fc6401e424f6c8adfa9c1a9c92da4.pdf", source: "Dr Austin Maths", type: "pdf" },
      { title: "Direct & Inverse Proportion Practice", url: "https://www.maths4everyone.com/resources/downloads/direct-proportion-gcse-9-1-practice-questions-30244.pdf", source: "Maths4Everyone", type: "pdf" }
    ]
  },
  'unit-8': {
    'right-angled-trigonometry': [
      { title: "Trigonometry Worksheet", url: "https://corbettmaths.com/wp-content/uploads/2013/02/trigonometry-pdf1.pdf", source: "Corbettmaths", type: "pdf" }
    ]
  }
};

export default exerciseResources;