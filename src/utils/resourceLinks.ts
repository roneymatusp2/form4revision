interface ResourceLink {
    [key: string]: string | { questions?: string; answers?: string };
}

interface ResourceLinks {
    numberAlgebra: ResourceLink;
    geometryMeasurement: ResourceLink;
    trigonometry: ResourceLink;
}

export const resourceLinks: ResourceLinks = {
    numberAlgebra: {
        'basic-arithmetic': {
            questions: 'basic-arithmetic-questions.pdf',
            answers: 'basic-arithmetic-answers.pdf'
        },
        'algebra-basics': {
            questions: 'algebra-basics-questions.pdf',
            answers: 'algebra-basics-answers.pdf'
        },
        'equations': 'equations-reference.pdf'
    },
    geometryMeasurement: {
        'basic-shapes': {
            questions: 'basic-shapes-questions.pdf',
            answers: 'basic-shapes-answers.pdf'
        },
        'area-perimeter': {
            questions: 'area-perimeter-questions.pdf',
            answers: 'area-perimeter-answers.pdf'
        }
    },
    trigonometry: {
        'basic-trig': {
            questions: 'basic-trig-questions.pdf',
            answers: 'basic-trig-answers.pdf'
        },
        'trig-identities': {
            questions: 'trig-identities-questions.pdf',
            answers: 'trig-identities-answers.pdf'
        }
    }
}; 