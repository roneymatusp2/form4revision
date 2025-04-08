import { ID, Query, Models } from 'appwrite';
import { databases, storage, COLLECTION_IDS, BUCKET_IDS, DATABASE_IDS } from '../config/appwrite';

export interface PDFDocument extends Models.Document {
    title: string;
    fileId: string;
    subtopicId: string;
    type: 'question' | 'answer' | 'reference';
}

export const pdfService = {
    async uploadPDF(file: File, title: string, subtopicId: string, type: PDFDocument['type']): Promise<PDFDocument> {
        try {
            // Upload file to storage
            const fileUpload = await storage.createFile(
                BUCKET_IDS.MATH_PDFS,
                ID.unique(),
                file
            );

            if (!fileUpload.$id) {
                throw new Error('File upload failed');
            }

            // Create document in database
            const document = await databases.createDocument<PDFDocument>(
                DATABASE_IDS.MATH_REVISION,
                COLLECTION_IDS.PDFS,
                ID.unique(),
                {
                    title,
                    fileId: fileUpload.$id,
                    subtopicId,
                    type
                }
            );

            return document;
        } catch (error) {
            console.error('Error uploading PDF:', error);
            throw new Error(error instanceof Error ? error.message : 'Failed to upload PDF');
        }
    },

    async getPDFsBySubtopic(subtopicId: string): Promise<PDFDocument[]> {
        try {
            const response = await databases.listDocuments<PDFDocument>(
                DATABASE_IDS.MATH_REVISION,
                COLLECTION_IDS.PDFS,
                [
                    Query.equal('subtopicId', subtopicId)
                ]
            );
            return response.documents;
        } catch (error) {
            console.error('Error fetching PDFs:', error);
            throw new Error(error instanceof Error ? error.message : 'Failed to fetch PDFs');
        }
    },

    async deletePDF(documentId: string, fileId: string): Promise<void> {
        try {
            await Promise.all([
                databases.deleteDocument(
                    DATABASE_IDS.MATH_REVISION,
                    COLLECTION_IDS.PDFS,
                    documentId
                ),
                storage.deleteFile(
                    BUCKET_IDS.MATH_PDFS,
                    fileId
                )
            ]);
        } catch (error) {
            console.error('Error deleting PDF:', error);
            throw new Error(error instanceof Error ? error.message : 'Failed to delete PDF');
        }
    },

    getPDFViewURL(fileId: string): string {
        try {
            return storage.getFileView(BUCKET_IDS.MATH_PDFS, fileId).toString();
        } catch (error) {
            console.error('Error getting PDF view URL:', error);
            throw new Error(error instanceof Error ? error.message : 'Failed to get PDF view URL');
        }
    }
}; 