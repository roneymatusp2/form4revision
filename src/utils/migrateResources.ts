import { pdfService } from '../services/pdfService';
import { resourceLinks } from './resourceLinks';

interface ResourceValue {
    questions?: string;
    answers?: string;
}

interface MigrationStats {
    total: number;
    success: number;
    failed: number;
    errors: string[];
}

async function fetchPDFFile(url: string): Promise<File> {
    try {
        const response = await fetch(url);
        const blob = await response.blob();
        return new File([blob], url.split('/').pop() || 'document.pdf', { type: 'application/pdf' });
    } catch (error) {
        throw new Error(`Failed to fetch PDF from ${url}: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
}

export async function migrateResources(): Promise<{ success: boolean; message: string; stats?: MigrationStats }> {
    const stats: MigrationStats = {
        total: 0,
        success: 0,
        failed: 0,
        errors: []
    };

    try {
        // Number and Algebra
        for (const [key, value] of Object.entries(resourceLinks.numberAlgebra)) {
            stats.total++;
            try {
                if (typeof value === 'string') {
                    const file = await fetchPDFFile(value);
                    await pdfService.uploadPDF(
                        file,
                        key,
                        key,
                        'reference'
                    );
                    stats.success++;
                } else if (typeof value === 'object' && value !== null) {
                    const resourceValue = value as ResourceValue;
                    
                    if (resourceValue.questions) {
                        stats.total++;
                        try {
                            const file = await fetchPDFFile(resourceValue.questions);
                            await pdfService.uploadPDF(
                                file,
                                `${key} - Questions`,
                                key,
                                'question'
                            );
                            stats.success++;
                        } catch (error) {
                            stats.failed++;
                            stats.errors.push(`Failed to process questions for ${key}: ${error instanceof Error ? error.message : 'Unknown error'}`);
                        }
                    }
                    
                    if (resourceValue.answers) {
                        stats.total++;
                        try {
                            const file = await fetchPDFFile(resourceValue.answers);
                            await pdfService.uploadPDF(
                                file,
                                `${key} - Answers`,
                                key,
                                'answer'
                            );
                            stats.success++;
                        } catch (error) {
                            stats.failed++;
                            stats.errors.push(`Failed to process answers for ${key}: ${error instanceof Error ? error.message : 'Unknown error'}`);
                        }
                    }
                }
            } catch (error) {
                stats.failed++;
                stats.errors.push(`Failed to process ${key}: ${error instanceof Error ? error.message : 'Unknown error'}`);
            }
        }

        // Geometry and Measurement
        for (const [key, value] of Object.entries(resourceLinks.geometryMeasurement)) {
            if (typeof value === 'object' && value !== null) {
                const resourceValue = value as ResourceValue;
                
                if (resourceValue.questions) {
                    await pdfService.uploadPDF(
                        new File([], resourceValue.questions),
                        `${key} - Questions`,
                        key,
                        'question'
                    );
                }
                
                if (resourceValue.answers) {
                    await pdfService.uploadPDF(
                        new File([], resourceValue.answers),
                        `${key} - Answers`,
                        key,
                        'answer'
                    );
                }
            }
        }

        // Trigonometry
        for (const [key, value] of Object.entries(resourceLinks.trigonometry)) {
            if (typeof value === 'object' && value !== null) {
                const resourceValue = value as ResourceValue;
                
                if (resourceValue.questions) {
                    await pdfService.uploadPDF(
                        new File([], resourceValue.questions),
                        `${key} - Questions`,
                        key,
                        'question'
                    );
                }
                
                if (resourceValue.answers) {
                    await pdfService.uploadPDF(
                        new File([], resourceValue.answers),
                        `${key} - Answers`,
                        key,
                        'answer'
                    );
                }
            }
        }

        const message = `Migration completed. Success: ${stats.success}/${stats.total} files. Failed: ${stats.failed}`;
        return {
            success: stats.failed === 0,
            message,
            stats
        };
    } catch (error) {
        console.error('Error during migration:', error);
        return {
            success: false,
            message: `Migration failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
            stats
        };
    }
} 