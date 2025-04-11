import React from 'react';
import { Link } from 'react-router-dom';

// Reorganized videos based on the F3 End of Year Exams structure
const videos = {
  'unit-1': {
    'natural-numbers': [
      { id: 'v1', title: 'How to Classify Numbers - Khan Academy', url: 'https://www.youtube.com/embed/-QHff5pRdM8' },
      { id: 'v2', title: 'Types Of Numbers - FuseSchool', url: 'https://www.youtube.com/embed/BeQzNT7f7NY' },
      { id: 'v3', title: 'Prime numbers - Khan Academy', url: 'https://www.youtube.com/embed/mIStB5X4U8M' },
      { id: 'v4', title: 'Prime and Composite Numbers', url: 'https://www.youtube.com/embed/ydm2cxacPIM' },
      { id: 'v5', title: 'Square, Cube & Triangular Numbers', url: 'https://www.youtube.com/embed/yezeRz4J_e0' },
      { id: 'v6', title: 'Reciprocals', url: 'https://www.youtube.com/embed/eU7qknXw6U4' }
    ],
    'standard-form': [
      { id: 'v13', title: 'Standard Form', url: 'https://www.youtube.com/embed/cxGyZ3Yx9ow' },
      { id: 'v14', title: 'Standard Form (Adding & Subtracting)', url: 'https://www.youtube.com/embed/Z0IQoVt-Brc' }
    ],
    'common-factors': [
      { id: 'v7', title: 'Finding Factors and Multiples - Math Antics', url: 'https://www.youtube.com/embed/vcn2ruTOwFo' },
      { id: 'v8', title: 'Highest Common Factor - Corbettmaths', url: 'https://www.youtube.com/embed/_9z2Q6fIFvU' },
      { id: 'v9', title: 'HCF and LCM using Venn diagrams - Corbettmaths', url: 'https://www.youtube.com/embed/oK-EFDLeEqc' },
      { id: 'v10', title: 'How to Find the GCF (2 Different Ways)', url: 'https://www.youtube.com/embed/FREquHT2_NM' },
      { id: 'v11', title: 'Least Common Multiple (LCM)', url: 'https://www.youtube.com/embed/53Ed5yjBELc' },
      { id: 'v12', title: 'Prime Factorization', url: 'https://www.youtube.com/embed/0NSQ0jJsmkQ' }
    ],
    'four-operations': [
      { id: 'v15', title: 'Order of Operations - Math Antics', url: 'https://www.youtube.com/embed/dAgfnK528RA' },
      { id: 'v16', title: 'Introduction to Exponents - Khan Academy', url: 'https://www.youtube.com/embed/XZRQhkii0h0' },
      { id: 'v17', title: 'Exponents and Square Roots', url: 'https://www.youtube.com/embed/B4zejSI8zho' },
      { id: 'v18', title: 'Adding and Subtracting Fractions', url: 'https://www.youtube.com/embed/5juto2ze8Lg' },
      { id: 'v19', title: 'Multiplying and Dividing Fractions', url: 'https://www.youtube.com/embed/qmfXyR7Z6Lk' },
      { id: 'v20', title: 'Mixed Numbers and Improper Fractions', url: 'https://www.youtube.com/embed/TutSWA1Jxqc' }
    ],
    'surds': [
      { id: 'v34', title: 'Surds (Introduction & Simplifying)', url: 'https://www.youtube.com/embed/ndU_cCbPAm4' },
      { id: 'v35', title: 'Rationalising the Denominator', url: 'https://www.youtube.com/embed/ifJyCfSGm1M' }
    ],
    'decimals-fractions': [
      { id: 'v21', title: 'Converting Fractions to Decimals - Math Antics', url: 'https://www.youtube.com/embed/Tceuvg9vjyc' },
      { id: 'v22', title: 'Converting Decimals to Percentages - Khan Academy', url: 'https://www.youtube.com/embed/vMwYiAznkJ4' },
      { id: 'v23', title: 'Converting between fractions, decimals and percentages - FuseSchool', url: 'https://www.youtube.com/embed/N1sizvru10g' },
      { id: 'v24', title: 'What Are Percentages?', url: 'https://www.youtube.com/embed/JeVSmq1Nrpw' },
      { id: 'v25', title: 'Converting Between Fractions, Decimals, and Percents', url: 'https://www.youtube.com/embed/2vjbNZaFz3c' }
    ],
    'ratio-proportion': [
      { id: 'v26', title: 'Introduction to Ratios - Khan Academy', url: 'https://www.youtube.com/embed/to4nL0NJvzE' },
      { id: 'v27', title: 'Proportions - Math Antics', url: 'https://www.youtube.com/embed/USmit5zUGas' },
      { id: 'v28', title: 'Ratios and Rates', url: 'https://www.youtube.com/embed/RQ2nYUBVvqI' }
    ]
  },
  'unit-2': {
    'exponents-indices': [
      { id: 'v29', title: 'Introduction to Exponents - Khan Academy', url: 'https://www.youtube.com/embed/XZRQhkii0h0' },
      { id: 'v30', title: 'Negative and Fractional Indices - Corbettmaths', url: 'https://www.youtube.com/embed/BhkwiKgRS-A' },
      { id: 'v31', title: 'Laws of Indices - FuseSchool', url: 'https://www.youtube.com/embed/BUJKEDqGp1U' },
      { id: 'v32', title: 'Algebra Basics: Laws of Exponents (Indices)', url: 'https://www.youtube.com/embed/-zUmvpkhvW8' },
      { id: 'v33', title: 'Laws of Indices', url: 'https://www.youtube.com/embed/ozuXy8_NZcg' }
    ],
    'expansion-brackets': [
      { id: 'v36', title: 'Expanding Double Brackets', url: 'https://www.youtube.com/embed/Wc2cgGU2I08' },
      { id: 'v37', title: 'Rationalising Denominators', url: 'https://www.youtube.com/embed/96SwZpRvhwY' }
    ],
    'factorisation': [
      { id: 'v38', title: 'Factorisation (Common Factor)', url: 'https://www.youtube.com/embed/UrOJrsRv9iI' },
      { id: 'v39', title: 'Factorising Quadratics', url: 'https://www.youtube.com/embed/_lSGP8wYKC4' },
      { id: 'v40', title: 'Difference of Two Squares', url: 'https://www.youtube.com/embed/ZyvVcRRhDo4' }
    ]
  },
  'unit-3': {
    'units-measurement': [
      { id: 'v85', title: 'Metric Units of Length - Math Antics', url: 'https://www.youtube.com/embed/ZNX-a-5jGeM' },
      { id: 'v86', title: 'Converting units of volume - Khan Academy', url: 'https://www.youtube.com/embed/ZVUXgsoeqQo' },
      { id: 'v87', title: 'Convert Units - length, area & volume - Corbettmaths', url: 'https://www.youtube.com/embed/c11R8PKjcrc' },
      { id: 'v88', title: 'Intro to the Metric System', url: 'https://www.youtube.com/embed/ipoFElLKXbM' },
      { id: 'v89', title: 'Convert Units (Length, Area & Volume)', url: 'https://www.youtube.com/embed/KDim3yTQ0nA' }
    ],
    'perimeter-area': [
      { id: 'v90', title: 'Area of Rectangles - Math Antics', url: 'https://www.youtube.com/embed/rSVMrPu0__U' },
      { id: 'v91', title: 'Area of composite shapes - Khan Academy', url: 'https://www.youtube.com/embed/bWpVz7kxFDw' },
      { id: 'v92', title: 'Perimeter - Math Antics', url: 'https://www.youtube.com/embed/AAY1bsazcgM' },
      { id: 'v93', title: 'Area of a Triangle, Parallelogram, and Trapezium', url: 'https://www.youtube.com/embed/7KS7cj8S95Q' },
      { id: 'v94', title: 'Area of Compound Shapes', url: 'https://www.youtube.com/embed/TTin1Zh38_k' }
    ],
    'circle-vocabulary': [
      { id: 'v95', title: 'Parts of a Circle - Khan Academy', url: 'https://www.youtube.com/embed/9hOimVmSuSE' },
      { id: 'v96', title: 'Circle Terminology', url: 'https://www.youtube.com/embed/HxoW8b8DOCw' },
      { id: 'v97', title: 'Naming Parts of a Circle', url: 'https://www.youtube.com/embed/cnSThy0AdhA' }
    ],
    'circle-calculations': [
      { id: 'v98', title: 'Circles, What Is PI? - Math Antics', url: 'https://www.youtube.com/embed/cC0fZ_lkFpQ' },
      { id: 'v99', title: 'Circles, Circumference And Area - Math Antics', url: 'https://www.youtube.com/embed/O-cawByg2aA' },
      { id: 'v100', title: 'Circles – Circumference and Area', url: 'https://www.youtube.com/embed/O-3Mlj3MQ_Q' },
      { id: 'v101', title: 'Circumference of a Circle', url: 'https://www.youtube.com/embed/3UB5e7j_c-A' },
      { id: 'v102', title: 'Area of a Circle', url: 'https://www.youtube.com/embed/chxNfDUmDiE' }
    ],
    'arc-sector': [
      { id: 'v103', title: 'Arc Length and Sector Area - Corbettmaths', url: 'https://www.youtube.com/embed/UJY-JCwr1wQ' },
      { id: 'v104', title: 'Arc Length Formula and Sector Area Formula Explained', url: 'https://www.youtube.com/embed/6PHt7cak0Jw' },
      { id: 'v105', title: 'Area of a Sector and Length of an Arc', url: 'https://www.youtube.com/embed/Wcv0f5PpTv0' }
    ]
  },
  'unit-4': {
    'linear-equations': [
      { id: 'v41', title: 'Solving Linear Equations - Khan Academy', url: 'https://www.youtube.com/embed/NybHckSEQBI' },
      { id: 'v42', title: 'How To Solve Equations With Fractions - The Organic Chemistry Tutor', url: 'https://www.youtube.com/embed/UH1603YUChA' },
      { id: 'v43', title: 'Solving Linear Equations with Fractions - Khan Academy', url: 'https://www.youtube.com/embed/XD-FDGdWnR8' },
      { id: 'v44', title: 'Algebra Basics: Solving 2-Step Equations', url: 'https://www.youtube.com/embed/8Biv_8xjj8E' }
    ],
    'inequalities-interpretation': [
      { id: 'v45', title: 'What are Inequalities?', url: 'https://www.youtube.com/embed/e_tY6X5PwWw' },
      { id: 'v46', title: 'Graphing Inequalities on Number Lines', url: 'https://www.youtube.com/embed/0vOnRZflXKQ' }
    ],
    'inequalities-solution': [
      { id: 'v47', title: 'Solving Algebraic Inequalities', url: 'https://www.youtube.com/embed/I7lQHRcCjqE' },
      { id: 'v48', title: 'Solving and Graphing Two-Step Inequalities', url: 'https://www.youtube.com/embed/HW6cXln0p2s' }
    ],
    'linear-functions': [
      { id: 'v49', title: 'Intro to Linear Functions - Khan Academy', url: 'https://www.youtube.com/embed/MXV65i9g1Xg' },
      { id: 'v50', title: 'Drawing Straight Line Graphs - Corbettmaths', url: 'https://www.youtube.com/embed/DGzZ6sFtoO8' },
      { id: 'v51', title: 'Gradient and Y-Intercept - Corbettmaths', url: 'https://www.youtube.com/embed/HdlnBX82jxI' },
      { id: 'v52', title: 'Finding the Equation of a Straight Line', url: 'https://www.youtube.com/embed/ZyS0Bni9a44' },
      { id: 'v53', title: 'Midpoint of a Line Segment', url: 'https://www.youtube.com/embed/8c-NJwJb0YY' }
    ],
    'simultaneous-equations': [
      { id: 'v54', title: 'Solving Systems of Equations - Khan Academy', url: 'https://www.youtube.com/embed/nok99JOhcjo' },
      { id: 'v55', title: 'Simultaneous Equations (Elimination Method) - Corbettmaths', url: 'https://www.youtube.com/embed/1JXG5aPz_f8' },
      { id: 'v56', title: 'Solving Simultaneous Equations Graphically - Corbettmaths', url: 'https://www.youtube.com/embed/ValGgmpE1zs' },
      { id: 'v57', title: 'Simultaneous Equations (Elimination Method)', url: 'https://www.youtube.com/embed/Zsn_-eD7L6c' },
      { id: 'v58', title: 'Solving Simultaneous Equations by Substitution', url: 'https://www.youtube.com/embed/GbSPb3X1VO0' }
    ]
  },
  'unit-5': {
    'geometric-terms': [
      { id: 'v59', title: 'Points, Lines, & Planes', url: 'https://www.youtube.com/embed/k5etrWdIY6o' },
      { id: 'v60', title: 'Angle Basics (Types of Angles)', url: 'https://www.youtube.com/embed/DGKwdHMiqCg' },
      { id: 'v61', title: 'Polygons', url: 'https://www.youtube.com/embed/IaoZhhx_I9s' }
    ],
    'shape-vocabulary': [
      { id: 'v62', title: 'Polygons - Math Antics', url: 'https://www.youtube.com/embed/IaoZhhx_I9s' },
      { id: 'v63', title: 'Quadrilaterals - Geometry - Khan Academy', url: 'https://www.youtube.com/embed/4qGfPJkNIBM' },
      { id: 'v64', title: 'Types of Triangles - Corbettmaths', url: 'https://www.youtube.com/embed/sRklDTi7r_k' }
    ],
    'measuring-angles': [
      { id: 'v65', title: 'Bearings - Corbettmaths', url: 'https://www.youtube.com/embed/O5CE-VvZDII' },
      { id: 'v66', title: 'Measuring Angles - FuseSchool', url: 'https://www.youtube.com/embed/DGZbixkQHfM' },
      { id: 'v67', title: 'Calculate Bearings - The Maths Prof', url: 'https://www.youtube.com/embed/ACXWbkhDW44' },
      { id: 'v68', title: 'How to Use a Protractor to Measure an Angle', url: 'https://www.youtube.com/embed/QQJoyKQg_qo' },
      { id: 'v69', title: 'What are Bearings?', url: 'https://www.youtube.com/embed/pm8i-thxvCo' }
    ],
    'angle-relationships': [
      { id: 'v70', title: 'Angles formed by parallel lines and transversals - Khan Academy', url: 'https://www.youtube.com/embed/bPPfgZoLMEE' },
      { id: 'v71', title: 'Angles on Parallel Lines - Math Antics', url: 'https://www.youtube.com/embed/6oJ3QqbL7Yc' },
      { id: 'v72', title: 'Angles In Parallel Lines - FuseSchool', url: 'https://www.youtube.com/embed/WI_U1X-jPHg' },
      { id: 'v73', title: 'Alternate, Corresponding and Allied Angles', url: 'https://www.youtube.com/embed/I5auyoXYoX0' }
    ],
    'polygon-angles': [
      { id: 'v74', title: 'Interior and Exterior Angles - Corbettmaths', url: 'https://www.youtube.com/embed/NDF7UwpUVkE' },
      { id: 'v75', title: 'Interior angles of polygons - Khan Academy', url: 'https://www.youtube.com/embed/NgPfarFa7C0' },
      { id: 'v76', title: 'Angles in Polygons - Maths Genie', url: 'https://www.youtube.com/embed/byBQy5GhPwE' },
      { id: 'v77', title: 'Angles in Polygons (Interior & Exterior)', url: 'https://www.youtube.com/embed/SJZuTTSD8Is' }
    ],
    'pythagoras-theorem': [
      { id: 'v78', title: 'Pythagorean theorem - Khan Academy', url: 'https://www.youtube.com/embed/AA6RfgP-AHU' },
      { id: 'v79', title: 'The Pythagorean Theorem - Math Antics', url: 'https://www.youtube.com/embed/WqhlG3Vakw8' },
      { id: 'v80', title: 'Pythagoras\' Theorem - FuseSchool', url: 'https://www.youtube.com/embed/w4Ovhsqdghg' },
      { id: 'v81', title: 'The Pythagorean Theorem', url: 'https://www.youtube.com/embed/q8MdwHp7vD8' },
      { id: 'v82', title: 'Converse of the Pythagorean Theorem', url: 'https://www.youtube.com/embed/WtdzYoZYR-w' }
    ]
  },
  'unit-8': {
    'right-angled-trigonometry': [
      { id: 'v106', title: 'Basic trigonometry - Khan Academy', url: 'https://www.youtube.com/embed/Jsiy4TxgIME' },
      { id: 'v107', title: 'SOHCAHTOA - Corbettmaths', url: 'https://www.youtube.com/embed/O0uUVH8dRiU' },
      { id: 'v108', title: 'Solve for an angle in right triangles - Khan Academy', url: 'https://www.youtube.com/embed/gvHCH10sUgY' },
      { id: 'v109', title: 'Introduction to SOHCAHTOA (Trigonometry)', url: 'https://www.youtube.com/embed/TjBOTT0tr84' },
      { id: 'v110', title: 'Trigonometry (SOH-CAH-TOA)', url: 'https://www.youtube.com/embed/1nZY1pLoQ3Q' }
    ],
    'pythagoras-trigonometry': [
      { id: 'v111', title: 'Intro to the trigonometric ratios - Khan Academy', url: 'https://www.youtube.com/embed/Jsiy4TxgIME' },
      { id: 'v112', title: 'Trigonometry - Finding angles - Corbettmaths', url: 'https://www.youtube.com/embed/BdzeoDuzQFM' },
      { id: 'v113', title: 'How To Solve Right Triangles - The Organic Chemistry Tutor', url: 'https://www.youtube.com/embed/i3bjEOA5_zc' },
      { id: 'v114', title: 'Finding the Hypotenuse Using Pythagorean Theorem', url: 'https://www.youtube.com/embed/tv7pHX8wpeM' },
      { id: 'v115', title: 'Using Trigonometry to Find Missing Sides', url: 'https://www.youtube.com/embed/1nZY1pLoQ3Q' }
    ],
    'angles-elevation-depression': [
      { id: 'v116', title: 'Angles of elevation and depression - Khan Academy', url: 'https://www.youtube.com/embed/bWpgPzR-zBM' },
      { id: 'v117', title: 'Angles of Elevation and Depression - Math Fortress', url: 'https://www.youtube.com/embed/wQWnDe6YdzI' },
      { id: 'v118', title: 'Angles Of Elevation & Depression - FuseSchool', url: 'https://www.youtube.com/embed/Sja5rEqmpa4' },
      { id: 'v119', title: 'Solving problems with trigonometry - Khan Academy', url: 'https://www.youtube.com/embed/bsZpw-Cw3z4' },
      { id: 'v120', title: 'Angles of Elevation and Depression - Eddie Woo', url: 'https://www.youtube.com/embed/3h7p0KiiwQA' },
      { id: 'v121', title: 'Angle of Elevation and Depression Problems - The Organic Chemistry Tutor', url: 'https://www.youtube.com/embed/A3iuSkQYeVM' },
      { id: 'v122', title: 'Angles of Elevation & Depression', url: 'https://www.youtube.com/embed/SCcB0U5KAHw' }
    ],
    'perpendicular-distance': [
      { id: 'v123', title: 'Perpendicular Distance from a Point to a Line - Corbettmaths', url: 'https://www.youtube.com/embed/Qa1AGDzh5gI' },
      { id: 'v124', title: 'Distance from a point to a line - Khan Academy', url: 'https://www.youtube.com/embed/xyzLvrYmNvI' },
      { id: 'v125', title: 'Finding Distance from a Point to a Line - Math Antics', url: 'https://www.youtube.com/embed/vwFoPJjxGF0' },
      { id: 'v126', title: 'Finding the Distance from a Point to a Line', url: 'https://www.youtube.com/embed/kUJ7MYbYi8A' },
      { id: 'v127', title: 'Perpendicular Distance Formula - Derivation and Examples', url: 'https://www.youtube.com/embed/O5BlR8k9b98' }
    ]
  }
};

export { videos };
export default videos;