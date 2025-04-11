import { Models } from 'appwrite';

export interface Topic extends Models.Document {
    name: string;
    slug: string;
    subtopics?: Subtopic[];
}

export interface Subtopic extends Models.Document {
    $collectionId: string;
    $databaseId: string;
    $createdAt: string;
    $updatedAt: string;
    $permissions: string[];
    name: string;
    slug: string;
    topicId: string;
}

const topics: Topic[] = [
    {
        $id: 'unit-1',
        name: 'Unit 1: Number Systems, Different Representations and Use of Numbers',
        slug: 'number-systems',
        $collectionId: 'topics',
        $databaseId: 'database',
        $createdAt: new Date().toISOString(),
        $updatedAt: new Date().toISOString(),
        $permissions: [],
        subtopics: [
            {
                $id: 'ns-1',
                name: 'Natural numbers, integers, primes, squares, cubes, triangles, rational/irrational numbers, real numbers, reciprocals',
                slug: 'natural-numbers',
                topicId: 'unit-1',
                $collectionId: 'subtopics',
                $databaseId: 'database',
                $createdAt: new Date().toISOString(),
                $updatedAt: new Date().toISOString(),
                $permissions: []
            },
            {
                $id: 'ns-2',
                name: 'Standard Form and four operations with it',
                slug: 'standard-form',
                topicId: 'unit-1',
                $collectionId: 'subtopics',
                $databaseId: 'database',
                $createdAt: new Date().toISOString(),
                $updatedAt: new Date().toISOString(),
                $permissions: []
            },
            {
                $id: 'ns-3',
                name: 'Common factors, common multiples, prime factors, HCF, LCM',
                slug: 'common-factors',
                topicId: 'unit-1',
                $collectionId: 'subtopics',
                $databaseId: 'database',
                $createdAt: new Date().toISOString(),
                $updatedAt: new Date().toISOString(),
                $permissions: []
            },
            {
                $id: 'ns-4',
                name: 'Operations, brackets, powers, roots, fractions (proper/improper/mixed)',
                slug: 'four-operations',
                topicId: 'unit-1',
                $collectionId: 'subtopics',
                $databaseId: 'database',
                $createdAt: new Date().toISOString(),
                $updatedAt: new Date().toISOString(),
                $permissions: []
            },
            {
                $id: 'ns-5',
                name: 'Surds, simplification and rationalising the denominator',
                slug: 'surds',
                topicId: 'unit-1',
                $collectionId: 'subtopics',
                $databaseId: 'database',
                $createdAt: new Date().toISOString(),
                $updatedAt: new Date().toISOString(),
                $permissions: []
            },
            {
                $id: 'ns-6',
                name: 'Equivalences between decimals, fractions and percentages',
                slug: 'decimals-fractions',
                topicId: 'unit-1',
                $collectionId: 'subtopics',
                $databaseId: 'database',
                $createdAt: new Date().toISOString(),
                $updatedAt: new Date().toISOString(),
                $permissions: []
            },
            {
                $id: 'ns-7',
                name: 'Ratio and Proportion',
                slug: 'ratio-proportion',
                topicId: 'unit-1',
                $collectionId: 'subtopics',
                $databaseId: 'database',
                $createdAt: new Date().toISOString(),
                $updatedAt: new Date().toISOString(),
                $permissions: []
            }
        ]
    },
    {
        $id: 'unit-2',
        name: 'Unit 2: Algebraic Manipulation',
        slug: 'algebraic-manipulation',
        $collectionId: 'topics',
        $databaseId: 'database',
        $createdAt: new Date().toISOString(),
        $updatedAt: new Date().toISOString(),
        $permissions: [],
        subtopics: [
            {
                $id: 'am-1',
                name: 'Rules for exponents/indices (including negative and fractional powers)',
                slug: 'exponents-indices',
                topicId: 'unit-2',
                $collectionId: 'subtopics',
                $databaseId: 'database',
                $createdAt: new Date().toISOString(),
                $updatedAt: new Date().toISOString(),
                $permissions: []
            },
            {
                $id: 'am-2',
                name: 'Expansion of brackets (including square of binomial)',
                slug: 'expansion-brackets',
                topicId: 'unit-2',
                $collectionId: 'subtopics',
                $databaseId: 'database',
                $createdAt: new Date().toISOString(),
                $updatedAt: new Date().toISOString(),
                $permissions: []
            },
            {
                $id: 'am-3',
                name: 'Factorisation: common factor, grouping, difference of squares, trinomials',
                slug: 'factorisation',
                topicId: 'unit-2',
                $collectionId: 'subtopics',
                $databaseId: 'database',
                $createdAt: new Date().toISOString(),
                $updatedAt: new Date().toISOString(),
                $permissions: []
            }
        ]
    },
    {
        $id: 'unit-3',
        name: 'Unit 3: Mensuration',
        slug: 'mensuration',
        $collectionId: 'topics',
        $databaseId: 'database',
        $createdAt: new Date().toISOString(),
        $updatedAt: new Date().toISOString(),
        $permissions: [],
        subtopics: [
            {
                $id: 'mns-1',
                name: 'Units: mm, cm, m, km, mm², cm², m², km², mm³, cm³, m³, ml, g, kg',
                slug: 'units-measurement',
                topicId: 'unit-3',
                $collectionId: 'subtopics',
                $databaseId: 'database',
                $createdAt: new Date().toISOString(),
                $updatedAt: new Date().toISOString(),
                $permissions: []
            },
            {
                $id: 'mns-2',
                name: 'Perimeter and area of rectangle, triangle, parallelogram, trapezium, compound shapes',
                slug: 'perimeter-area',
                topicId: 'unit-3',
                $collectionId: 'subtopics',
                $databaseId: 'database',
                $createdAt: new Date().toISOString(),
                $updatedAt: new Date().toISOString(),
                $permissions: []
            },
            {
                $id: 'mns-3',
                name: 'Circle vocabulary and terminology',
                slug: 'circle-vocabulary',
                topicId: 'unit-3',
                $collectionId: 'subtopics',
                $databaseId: 'database',
                $createdAt: new Date().toISOString(),
                $updatedAt: new Date().toISOString(),
                $permissions: []
            },
            {
                $id: 'mns-4',
                name: 'Circumference and area of a circle',
                slug: 'circle-calculations',
                topicId: 'unit-3',
                $collectionId: 'subtopics',
                $databaseId: 'database',
                $createdAt: new Date().toISOString(),
                $updatedAt: new Date().toISOString(),
                $permissions: []
            },
            {
                $id: 'mns-5',
                name: 'Arc length and area of sector',
                slug: 'arc-sector',
                topicId: 'unit-3',
                $collectionId: 'subtopics',
                $databaseId: 'database',
                $createdAt: new Date().toISOString(),
                $updatedAt: new Date().toISOString(),
                $permissions: []
            }
        ]
    },
    {
        $id: 'unit-4',
        name: 'Unit 4: Linear Patterns, Models, and Representations',
        slug: 'linear-patterns',
        $collectionId: 'topics',
        $databaseId: 'database',
        $createdAt: new Date().toISOString(),
        $updatedAt: new Date().toISOString(),
        $permissions: [],
        subtopics: [
            {
                $id: 'lpm-1',
                name: 'Solution of linear equations (including those with fractional expressions)',
                slug: 'linear-equations',
                topicId: 'unit-4',
                $collectionId: 'subtopics',
                $databaseId: 'database',
                $createdAt: new Date().toISOString(),
                $updatedAt: new Date().toISOString(),
                $permissions: []
            },
            {
                $id: 'lpm-2',
                name: 'Writing, showing and interpretation of inequalities (including number line)',
                slug: 'inequalities-interpretation',
                topicId: 'unit-4',
                $collectionId: 'subtopics',
                $databaseId: 'database',
                $createdAt: new Date().toISOString(),
                $updatedAt: new Date().toISOString(),
                $permissions: []
            },
            {
                $id: 'lpm-3',
                name: 'Solution of linear inequalities',
                slug: 'inequalities-solution',
                topicId: 'unit-4',
                $collectionId: 'subtopics',
                $databaseId: 'database',
                $createdAt: new Date().toISOString(),
                $updatedAt: new Date().toISOString(),
                $permissions: []
            },
            {
                $id: 'lpm-4',
                name: 'Linear functions (y = mx + c, ax + by = d): writing, graphing, function notation',
                slug: 'linear-functions',
                topicId: 'unit-4',
                $collectionId: 'subtopics',
                $databaseId: 'database',
                $createdAt: new Date().toISOString(),
                $updatedAt: new Date().toISOString(),
                $permissions: []
            },
            {
                $id: 'lpm-5',
                name: 'Simultaneous equations',
                slug: 'simultaneous-equations',
                topicId: 'unit-4',
                $collectionId: 'subtopics',
                $databaseId: 'database',
                $createdAt: new Date().toISOString(),
                $updatedAt: new Date().toISOString(),
                $permissions: []
            }
        ]
    },
    {
        $id: 'unit-5',
        name: 'Unit 5: Angles',
        slug: 'angles',
        $collectionId: 'topics',
        $databaseId: 'database',
        $createdAt: new Date().toISOString(),
        $updatedAt: new Date().toISOString(),
        $permissions: [],
        subtopics: [
            {
                $id: 'ang-1',
                name: 'Geometric terms: point, vertex, line, plane, parallel, perpendicular, angles, interior, exterior',
                slug: 'geometric-terms',
                topicId: 'unit-5',
                $collectionId: 'subtopics',
                $databaseId: 'database',
                $createdAt: new Date().toISOString(),
                $updatedAt: new Date().toISOString(),
                $permissions: []
            },
            {
                $id: 'ang-2',
                name: 'Shape vocabulary (triangles, quadrilaterals, polygons, solid figures)',
                slug: 'shape-vocabulary',
                topicId: 'unit-5',
                $collectionId: 'subtopics',
                $databaseId: 'database',
                $createdAt: new Date().toISOString(),
                $updatedAt: new Date().toISOString(),
                $permissions: []
            },
            {
                $id: 'ang-3',
                name: 'Measuring angles and three-figure bearings',
                slug: 'measuring-angles',
                topicId: 'unit-5',
                $collectionId: 'subtopics',
                $databaseId: 'database',
                $createdAt: new Date().toISOString(),
                $updatedAt: new Date().toISOString(),
                $permissions: []
            },
            {
                $id: 'ang-4',
                name: 'Angle relationships (on straight lines, at points, parallel lines)',
                slug: 'angle-relationships',
                topicId: 'unit-5',
                $collectionId: 'subtopics',
                $databaseId: 'database',
                $createdAt: new Date().toISOString(),
                $updatedAt: new Date().toISOString(),
                $permissions: []
            },
            {
                $id: 'ang-5',
                name: 'Polygon angles (sum of angles, interior/exterior angles)',
                slug: 'polygon-angles',
                topicId: 'unit-5',
                $collectionId: 'subtopics',
                $databaseId: 'database',
                $createdAt: new Date().toISOString(),
                $updatedAt: new Date().toISOString(),
                $permissions: []
            },
            {
                $id: 'ang-6',
                name: 'Pythagoras\' Theorem and applications',
                slug: 'pythagoras-theorem',
                topicId: 'unit-5',
                $collectionId: 'subtopics',
                $databaseId: 'database',
                $createdAt: new Date().toISOString(),
                $updatedAt: new Date().toISOString(),
                $permissions: []
            }
        ]
    },
    {
        $id: 'unit-8',
        name: 'Unit 8: Trigonometry of Triangles and Periodic Functions',
        slug: 'trigonometry',
        $collectionId: 'topics',
        $databaseId: 'database',
        $createdAt: new Date().toISOString(),
        $updatedAt: new Date().toISOString(),
        $permissions: [],
        subtopics: [
            {
                $id: 'trig-1',
                name: 'Right-angled triangle trigonometry (SOHCAHTOA)',
                slug: 'right-angled-trigonometry',
                topicId: 'unit-8',
                $collectionId: 'subtopics',
                $databaseId: 'database',
                $createdAt: new Date().toISOString(),
                $updatedAt: new Date().toISOString(),
                $permissions: []
            },
            {
                $id: 'trig-2',
                name: 'Solving problems using Pythagoras\' theorem and trigonometry',
                slug: 'pythagoras-trigonometry',
                topicId: 'unit-8',
                $collectionId: 'subtopics',
                $databaseId: 'database',
                $createdAt: new Date().toISOString(),
                $updatedAt: new Date().toISOString(),
                $permissions: []
            },
            {
                $id: 'trig-3',
                name: 'Angles of elevation and depression',
                slug: 'angles-elevation-depression',
                topicId: 'unit-8',
                $collectionId: 'subtopics',
                $databaseId: 'database',
                $createdAt: new Date().toISOString(),
                $updatedAt: new Date().toISOString(),
                $permissions: []
            },
            {
                $id: 'trig-4',
                name: 'Perpendicular distance from a point to a line',
                slug: 'perpendicular-distance',
                topicId: 'unit-8',
                $collectionId: 'subtopics',
                $databaseId: 'database',
                $createdAt: new Date().toISOString(),
                $updatedAt: new Date().toISOString(),
                $permissions: []
            }
        ]
    }
];

export default topics;