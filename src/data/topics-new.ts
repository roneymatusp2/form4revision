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
        $id: 'unit-4',
        name: 'Linear Patterns',
        slug: 'linear-patterns',
        $collectionId: 'topics',
        $databaseId: 'database',
        $createdAt: new Date().toISOString(),
        $updatedAt: new Date().toISOString(),
        $permissions: [],
        subtopics: [
            {
                $id: 'lpm-1',
                name: 'Simultaneous equations',
                slug: 'simultaneous-equations',
                topicId: 'unit-4',
                $collectionId: 'subtopics',
                $databaseId: 'database',
                $createdAt: new Date().toISOString(),
                $updatedAt: new Date().toISOString(),
                $permissions: []
            },
            {
                $id: 'lpm-2',
                name: 'Linear functions y=mx+c',
                slug: 'linear-functions',
                topicId: 'unit-4',
                $collectionId: 'subtopics',
                $databaseId: 'database',
                $createdAt: new Date().toISOString(),
                $updatedAt: new Date().toISOString(),
                $permissions: []
            },
            {
                $id: 'lpm-3',
                name: 'Parallel and perpendicular lines',
                slug: 'parallel-perpendicular',
                topicId: 'unit-4',
                $collectionId: 'subtopics',
                $databaseId: 'database',
                $createdAt: new Date().toISOString(),
                $updatedAt: new Date().toISOString(),
                $permissions: []
            },
            {
                $id: 'lpm-4',
                name: 'Perpendicular bisector',
                slug: 'perpendicular-bisector',
                topicId: 'unit-4',
                $collectionId: 'subtopics',
                $databaseId: 'database',
                $createdAt: new Date().toISOString(),
                $updatedAt: new Date().toISOString(),
                $permissions: []
            },
            {
                $id: 'lpm-5',
                name: 'Midpoints, gradient, distance between two points',
                slug: 'midpoints-gradient-distance',
                topicId: 'unit-4',
                $collectionId: 'subtopics',
                $databaseId: 'database',
                $createdAt: new Date().toISOString(),
                $updatedAt: new Date().toISOString(),
                $permissions: []
            },
            {
                $id: 'lpm-6',
                name: 'Length of a line',
                slug: 'line-length',
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
        name: 'Angles',
        slug: 'angles',
        $collectionId: 'topics',
        $databaseId: 'database',
        $createdAt: new Date().toISOString(),
        $updatedAt: new Date().toISOString(),
        $permissions: [],
        subtopics: [
            {
                $id: 'ang-1',
                name: 'Angles at a point, on straight lines, vertically opposite angles',
                slug: 'basic-angle-relationships',
                topicId: 'unit-5',
                $collectionId: 'subtopics',
                $databaseId: 'database',
                $createdAt: new Date().toISOString(),
                $updatedAt: new Date().toISOString(),
                $permissions: []
            },
            {
                $id: 'ang-2',
                name: 'Alternate, corresponding and co-interior angles on parallel lines',
                slug: 'parallel-line-angles',
                topicId: 'unit-5',
                $collectionId: 'subtopics',
                $databaseId: 'database',
                $createdAt: new Date().toISOString(),
                $updatedAt: new Date().toISOString(),
                $permissions: []
            },
            {
                $id: 'ang-3',
                name: 'Angle sum of triangles, quadrilaterals and polygons',
                slug: 'angle-sums',
                topicId: 'unit-5',
                $collectionId: 'subtopics',
                $databaseId: 'database',
                $createdAt: new Date().toISOString(),
                $updatedAt: new Date().toISOString(),
                $permissions: []
            },
            {
                $id: 'ang-4',
                name: 'Interior and exterior angles of a polygon, angles of regular polygons',
                slug: 'polygon-angles',
                topicId: 'unit-5',
                $collectionId: 'subtopics',
                $databaseId: 'database',
                $createdAt: new Date().toISOString(),
                $updatedAt: new Date().toISOString(),
                $permissions: []
            },
            {
                $id: 'ang-5',
                name: 'Bearings',
                slug: 'bearings',
                topicId: 'unit-5',
                $collectionId: 'subtopics',
                $databaseId: 'database',
                $createdAt: new Date().toISOString(),
                $updatedAt: new Date().toISOString(),
                $permissions: []
            },
            {
                $id: 'ang-6',
                name: 'Pythagoras theorem',
                slug: 'pythagoras-theorem',
                topicId: 'unit-5',
                $collectionId: 'subtopics',
                $databaseId: 'database',
                $createdAt: new Date().toISOString(),
                $updatedAt: new Date().toISOString(),
                $permissions: []
            },
            {
                $id: 'ang-7',
                name: 'Chord length, distance of chord to centre',
                slug: 'chord-properties',
                topicId: 'unit-5',
                $collectionId: 'subtopics',
                $databaseId: 'database',
                $createdAt: new Date().toISOString(),
                $updatedAt: new Date().toISOString(),
                $permissions: []
            },
            {
                $id: 'ang-8',
                name: 'Angle vocabulary',
                slug: 'angle-vocabulary',
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
        $id: 'unit-2',
        name: 'Algebraic Manipulation',
        slug: 'algebraic-manipulation',
        $collectionId: 'topics',
        $databaseId: 'database',
        $createdAt: new Date().toISOString(),
        $updatedAt: new Date().toISOString(),
        $permissions: [],
        subtopics: [
            {
                $id: 'am-1',
                name: 'Algebraic fractions: simplification, including use of factorisation',
                slug: 'algebraic-fractions-simplification',
                topicId: 'unit-2',
                $collectionId: 'subtopics',
                $databaseId: 'database',
                $createdAt: new Date().toISOString(),
                $updatedAt: new Date().toISOString(),
                $permissions: []
            },
            {
                $id: 'am-2',
                name: 'Addition or subtraction of fractions with linear denominators or single term',
                slug: 'algebraic-fractions-addition',
                topicId: 'unit-2',
                $collectionId: 'subtopics',
                $databaseId: 'database',
                $createdAt: new Date().toISOString(),
                $updatedAt: new Date().toISOString(),
                $permissions: []
            },
            {
                $id: 'am-3',
                name: 'Multiplication or division and simplification of two fractions',
                slug: 'algebraic-fractions-multiplication',
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
        $id: 'unit-6',
        name: 'Quadratic Patterns and Models',
        slug: 'quadratic-patterns',
        $collectionId: 'topics',
        $databaseId: 'database',
        $createdAt: new Date().toISOString(),
        $updatedAt: new Date().toISOString(),
        $permissions: [],
        subtopics: [
            {
                $id: 'qpm-1',
                name: 'Quadratic expressions, equations and functions',
                slug: 'quadratic-fundamentals',
                topicId: 'unit-6',
                $collectionId: 'subtopics',
                $databaseId: 'database',
                $createdAt: new Date().toISOString(),
                $updatedAt: new Date().toISOString(),
                $permissions: []
            },
            {
                $id: 'qpm-2',
                name: 'Solving quadratic equations by factorisation',
                slug: 'factorisation-method',
                topicId: 'unit-6',
                $collectionId: 'subtopics',
                $databaseId: 'database',
                $createdAt: new Date().toISOString(),
                $updatedAt: new Date().toISOString(),
                $permissions: []
            },
            {
                $id: 'qpm-3',
                name: 'Quadratic formula, sum and product',
                slug: 'quadratic-formula',
                topicId: 'unit-6',
                $collectionId: 'subtopics',
                $databaseId: 'database',
                $createdAt: new Date().toISOString(),
                $updatedAt: new Date().toISOString(),
                $permissions: []
            },
            {
                $id: 'qpm-4',
                name: 'Using GDC to solve quadratic equations',
                slug: 'gdc-quadratics',
                topicId: 'unit-6',
                $collectionId: 'subtopics',
                $databaseId: 'database',
                $createdAt: new Date().toISOString(),
                $updatedAt: new Date().toISOString(),
                $permissions: []
            },
            {
                $id: 'qpm-5',
                name: 'Finding key points of a parabola (vertex, intercepts)',
                slug: 'parabola-properties',
                topicId: 'unit-6',
                $collectionId: 'subtopics',
                $databaseId: 'database',
                $createdAt: new Date().toISOString(),
                $updatedAt: new Date().toISOString(),
                $permissions: []
            }
        ]
    },
    {
        $id: 'unit-7',
        name: 'Sequences',
        slug: 'sequences',
        $collectionId: 'topics',
        $databaseId: 'database',
        $createdAt: new Date().toISOString(),
        $updatedAt: new Date().toISOString(),
        $permissions: [],
        subtopics: [
            {
                $id: 'seq-1',
                name: 'Linear sequences',
                slug: 'linear-sequences',
                topicId: 'unit-7',
                $collectionId: 'subtopics',
                $databaseId: 'database',
                $createdAt: new Date().toISOString(),
                $updatedAt: new Date().toISOString(),
                $permissions: []
            },
            {
                $id: 'seq-2',
                name: 'Quadratic sequences',
                slug: 'quadratic-sequences',
                topicId: 'unit-7',
                $collectionId: 'subtopics',
                $databaseId: 'database',
                $createdAt: new Date().toISOString(),
                $updatedAt: new Date().toISOString(),
                $permissions: []
            },
            {
                $id: 'seq-3',
                name: 'Cubic sequences',
                slug: 'cubic-sequences',
                topicId: 'unit-7',
                $collectionId: 'subtopics',
                $databaseId: 'database',
                $createdAt: new Date().toISOString(),
                $updatedAt: new Date().toISOString(),
                $permissions: []
            },
            {
                $id: 'seq-4',
                name: 'Geometric sequences',
                slug: 'geometric-sequences',
                topicId: 'unit-7',
                $collectionId: 'subtopics',
                $databaseId: 'database',
                $createdAt: new Date().toISOString(),
                $updatedAt: new Date().toISOString(),
                $permissions: []
            }
        ]
    },
    {
        $id: 'unit-9',
        name: 'Further Patterns',
        slug: 'further-patterns',
        $collectionId: 'topics',
        $databaseId: 'database',
        $createdAt: new Date().toISOString(),
        $updatedAt: new Date().toISOString(),
        $permissions: [],
        subtopics: [
            {
                $id: 'fp-1',
                name: 'Function notation',
                slug: 'function-notation',
                topicId: 'unit-9',
                $collectionId: 'subtopics',
                $databaseId: 'database',
                $createdAt: new Date().toISOString(),
                $updatedAt: new Date().toISOString(),
                $permissions: []
            },
            {
                $id: 'fp-2',
                name: 'Composite functions',
                slug: 'composite-functions',
                topicId: 'unit-9',
                $collectionId: 'subtopics',
                $databaseId: 'database',
                $createdAt: new Date().toISOString(),
                $updatedAt: new Date().toISOString(),
                $permissions: []
            },
            {
                $id: 'fp-3',
                name: 'Inverse functions',
                slug: 'inverse-functions',
                topicId: 'unit-9',
                $collectionId: 'subtopics',
                $databaseId: 'database',
                $createdAt: new Date().toISOString(),
                $updatedAt: new Date().toISOString(),
                $permissions: []
            },
            {
                $id: 'fp-4',
                name: 'Direct, inverse and best variation using GDC',
                slug: 'variation',
                topicId: 'unit-9',
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