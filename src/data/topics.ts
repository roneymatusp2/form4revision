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
        name: 'Linear Patterns and Coordinate Geometry',
        slug: 'linear-patterns-geometry',
        $collectionId: 'topics',
        $databaseId: 'database',
        $createdAt: new Date().toISOString(),
        $updatedAt: new Date().toISOString(),
        $permissions: [],
        subtopics: [
            {
                $id: 'lp-1',
                name: 'Linear functions y=mx+c',
                slug: 'linear-functions',
                topicId: 'unit-1',
                $collectionId: 'subtopics',
                $databaseId: 'database',
                $createdAt: new Date().toISOString(),
                $updatedAt: new Date().toISOString(),
                $permissions: []
            },
            {
                $id: 'lp-2',
                name: 'Gradient',
                slug: 'gradient',
                topicId: 'unit-1',
                $collectionId: 'subtopics',
                $databaseId: 'database',
                $createdAt: new Date().toISOString(),
                $updatedAt: new Date().toISOString(),
                $permissions: []
            },
            {
                $id: 'lp-3',
                name: 'Parallel and perpendicular lines',
                slug: 'parallel-perpendicular',
                topicId: 'unit-1',
                $collectionId: 'subtopics',
                $databaseId: 'database',
                $createdAt: new Date().toISOString(),
                $updatedAt: new Date().toISOString(),
                $permissions: []
            },
            {
                $id: 'lp-4',
                name: 'Perpendicular bisector',
                slug: 'perpendicular-bisector',
                topicId: 'unit-1',
                $collectionId: 'subtopics',
                $databaseId: 'database',
                $createdAt: new Date().toISOString(),
                $updatedAt: new Date().toISOString(),
                $permissions: []
            },
            {
                $id: 'lp-5',
                name: 'Midpoints and distance between two points',
                slug: 'midpoints-distance',
                topicId: 'unit-1',
                $collectionId: 'subtopics',
                $databaseId: 'database',
                $createdAt: new Date().toISOString(),
                $updatedAt: new Date().toISOString(),
                $permissions: []
            },
            {
                $id: 'lp-6',
                name: 'Length of a line',
                slug: 'line-length',
                topicId: 'unit-1',
                $collectionId: 'subtopics',
                $databaseId: 'database',
                $createdAt: new Date().toISOString(),
                $updatedAt: new Date().toISOString(),
                $permissions: []
            },
            {
                $id: 'lp-7',
                name: 'Simultaneous equations',
                slug: 'simultaneous-equations',
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
        name: 'Plane Geometry',
        slug: 'plane-geometry',
        $collectionId: 'topics',
        $databaseId: 'database',
        $createdAt: new Date().toISOString(),
        $updatedAt: new Date().toISOString(),
        $permissions: [],
        subtopics: [
            {
                $id: 'pg-1',
                name: 'Angles at a point, on straight lines, vertically opposite angles',
                slug: 'basic-angle-relationships',
                topicId: 'unit-2',
                $collectionId: 'subtopics',
                $databaseId: 'database',
                $createdAt: new Date().toISOString(),
                $updatedAt: new Date().toISOString(),
                $permissions: []
            },
            {
                $id: 'pg-2',
                name: 'Alternate, corresponding and co-interior angles on parallel lines',
                slug: 'parallel-line-angles',
                topicId: 'unit-2',
                $collectionId: 'subtopics',
                $databaseId: 'database',
                $createdAt: new Date().toISOString(),
                $updatedAt: new Date().toISOString(),
                $permissions: []
            },
            {
                $id: 'pg-3',
                name: 'Angle sum of triangles, quadrilaterals and polygons',
                slug: 'angle-sums',
                topicId: 'unit-2',
                $collectionId: 'subtopics',
                $databaseId: 'database',
                $createdAt: new Date().toISOString(),
                $updatedAt: new Date().toISOString(),
                $permissions: []
            },
            {
                $id: 'pg-4',
                name: 'Interior and exterior angles of a polygon, angles of regular polygons',
                slug: 'polygon-angles',
                topicId: 'unit-2',
                $collectionId: 'subtopics',
                $databaseId: 'database',
                $createdAt: new Date().toISOString(),
                $updatedAt: new Date().toISOString(),
                $permissions: []
            },
            {
                $id: 'pg-5',
                name: 'Angle vocabulary',
                slug: 'angle-vocabulary',
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
        name: 'Trigonometry, Pythagoras and Circle Geometry',
        slug: 'trig-pythagoras-circles',
        $collectionId: 'topics',
        $databaseId: 'database',
        $createdAt: new Date().toISOString(),
        $updatedAt: new Date().toISOString(),
        $permissions: [],
        subtopics: [
            {
                $id: 'tpc-1',
                name: 'Bearings',
                slug: 'bearings',
                topicId: 'unit-3',
                $collectionId: 'subtopics',
                $databaseId: 'database',
                $createdAt: new Date().toISOString(),
                $updatedAt: new Date().toISOString(),
                $permissions: []
            },
            {
                $id: 'tpc-2',
                name: 'Pythagoras theorem',
                slug: 'pythagoras-theorem',
                topicId: 'unit-3',
                $collectionId: 'subtopics',
                $databaseId: 'database',
                $createdAt: new Date().toISOString(),
                $updatedAt: new Date().toISOString(),
                $permissions: []
            },
            {
                $id: 'tpc-3',
                name: 'Chord length and distance of chord to centre',
                slug: 'chord-properties',
                topicId: 'unit-3',
                $collectionId: 'subtopics',
                $databaseId: 'database',
                $createdAt: new Date().toISOString(),
                $updatedAt: new Date().toISOString(),
                $permissions: []
            },
            {
                $id: 'tpc-4',
                name: 'Distance between two points in circle geometry',
                slug: 'circle-distances',
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
        name: 'Algebraic Fractions',
        slug: 'algebraic-fractions',
        $collectionId: 'topics',
        $databaseId: 'database',
        $createdAt: new Date().toISOString(),
        $updatedAt: new Date().toISOString(),
        $permissions: [],
        subtopics: [
            {
                $id: 'af-1',
                name: 'Simplification of algebraic fractions using factorisation',
                slug: 'algebraic-fractions-simplification',
                topicId: 'unit-4',
                $collectionId: 'subtopics',
                $databaseId: 'database',
                $createdAt: new Date().toISOString(),
                $updatedAt: new Date().toISOString(),
                $permissions: []
            },
            {
                $id: 'af-2',
                name: 'Addition or subtraction of fractions with linear denominators or single term',
                slug: 'algebraic-fractions-addition',
                topicId: 'unit-4',
                $collectionId: 'subtopics',
                $databaseId: 'database',
                $createdAt: new Date().toISOString(),
                $updatedAt: new Date().toISOString(),
                $permissions: []
            },
            {
                $id: 'af-3',
                name: 'Multiplication or division and simplification of algebraic fractions',
                slug: 'algebraic-fractions-multiplication',
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
        name: 'Quadratic Equations and Functions',
        slug: 'quadratic-patterns-functions',
        $collectionId: 'topics',
        $databaseId: 'database',
        $createdAt: new Date().toISOString(),
        $updatedAt: new Date().toISOString(),
        $permissions: [],
        subtopics: [
            {
                $id: 'qpf-1',
                name: 'Quadratic expressions, equations and functions',
                slug: 'quadratic-fundamentals',
                topicId: 'unit-5',
                $collectionId: 'subtopics',
                $databaseId: 'database',
                $createdAt: new Date().toISOString(),
                $updatedAt: new Date().toISOString(),
                $permissions: []
            },
            {
                $id: 'qpf-2',
                name: 'Solving quadratic equations by factorisation',
                slug: 'factorisation-method',
                topicId: 'unit-5',
                $collectionId: 'subtopics',
                $databaseId: 'database',
                $createdAt: new Date().toISOString(),
                $updatedAt: new Date().toISOString(),
                $permissions: []
            },
            {
                $id: 'qpf-3',
                name: 'Quadratic formula, sum and product of roots',
                slug: 'quadratic-formula',
                topicId: 'unit-5',
                $collectionId: 'subtopics',
                $databaseId: 'database',
                $createdAt: new Date().toISOString(),
                $updatedAt: new Date().toISOString(),
                $permissions: []
            },
            {
                $id: 'qpf-4',
                name: 'Using GDC to solve quadratic equations',
                slug: 'gdc-quadratics',
                topicId: 'unit-5',
                $collectionId: 'subtopics',
                $databaseId: 'database',
                $createdAt: new Date().toISOString(),
                $updatedAt: new Date().toISOString(),
                $permissions: []
            },
            {
                $id: 'qpf-5',
                name: 'Finding key points of a parabola (vertex, intercepts)',
                slug: 'parabola-properties',
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
        $id: 'unit-6',
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
                topicId: 'unit-6',
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
                topicId: 'unit-6',
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
                topicId: 'unit-6',
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
        name: 'Functions and Variation',
        slug: 'functions-variation',
        $collectionId: 'topics',
        $databaseId: 'database',
        $createdAt: new Date().toISOString(),
        $updatedAt: new Date().toISOString(),
        $permissions: [],
        subtopics: [
            {
                $id: 'fv-1',
                name: 'Function notation',
                slug: 'function-notation',
                topicId: 'unit-7',
                $collectionId: 'subtopics',
                $databaseId: 'database',
                $createdAt: new Date().toISOString(),
                $updatedAt: new Date().toISOString(),
                $permissions: []
            },
            {
                $id: 'fv-2',
                name: 'Composite functions',
                slug: 'composite-functions',
                topicId: 'unit-7',
                $collectionId: 'subtopics',
                $databaseId: 'database',
                $createdAt: new Date().toISOString(),
                $updatedAt: new Date().toISOString(),
                $permissions: []
            },
            {
                $id: 'fv-3',
                name: 'Inverse functions',
                slug: 'inverse-functions',
                topicId: 'unit-7',
                $collectionId: 'subtopics',
                $databaseId: 'database',
                $createdAt: new Date().toISOString(),
                $updatedAt: new Date().toISOString(),
                $permissions: []
            },
            {
                $id: 'fv-4',
                name: 'Direct, inverse and best variation using GDC',
                slug: 'variation',
                topicId: 'unit-7',
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