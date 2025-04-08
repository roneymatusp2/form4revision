import React, { useState } from 'react';
import AppwriteService from '../../services/appwriteService';
import { pdfService } from '../../services/pdfService';
import { MigrationResult } from '../../utils/appwriteMigration';

interface UploadDetails {
    title: string;
    subtopicId: string;
    resourceType: 'question' | 'answer' | 'reference';
}

type MigrationStats = NonNullable<MigrationResult['stats']>;

export const ContentManager: React.FC = () => {
    const [message, setMessage] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [migrationStats, setMigrationStats] = useState<MigrationStats | null>(null);
    const [uploadDetails, setUploadDetails] = useState<UploadDetails>({
        title: '',
        subtopicId: '',
        resourceType: 'reference'
    });

    const handleMigration = async () => {
        setIsLoading(true);
        setMigrationStats(null);
        try {
            const result = await AppwriteService.migrateContent();
            setMessage(result.message);
            if (result.success && result.stats) {
                setMigrationStats(result.stats);
            }
        } catch (error) {
            setMessage(`Migration failed: ${error instanceof Error ? error.message : 'Unknown error occurred'}`);
        } finally {
            setIsLoading(false);
        }
    };

    const handleFileUpload = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedFile) {
            setMessage('Please select a file first');
            return;
        }

        setIsLoading(true);
        try {
            const result = await pdfService.uploadPDF(
                selectedFile,
                uploadDetails.title,
                uploadDetails.subtopicId,
                uploadDetails.resourceType
            );
            setMessage(`File uploaded successfully: ${result.title}`);
            setSelectedFile(null);
            setUploadDetails({
                title: '',
                subtopicId: '',
                resourceType: 'reference'
            });
        } catch (error) {
            setMessage(`Upload failed: ${error instanceof Error ? error.message : 'Unknown error occurred'}`);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="p-4 bg-white rounded-xl shadow-lg">
            <h1 className="text-2xl font-bold mb-6 text-gray-900">Content Manager</h1>
            
            <div className="mb-8 space-y-6">
                <h2 className="text-xl font-semibold mb-4 text-gray-800">Upload PDF</h2>
                <form onSubmit={handleFileUpload} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Title:</label>
                            <input
                                type="text"
                                value={uploadDetails.title}
                                onChange={(e) => setUploadDetails({...uploadDetails, title: e.target.value})}
                                className="border border-gray-300 p-2 rounded-lg w-full focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                required
                            />
                        </div>
                        
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Subtopic ID:</label>
                            <input
                                type="text"
                                value={uploadDetails.subtopicId}
                                onChange={(e) => setUploadDetails({...uploadDetails, subtopicId: e.target.value})}
                                className="border border-gray-300 p-2 rounded-lg w-full focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                required
                            />
                        </div>
                    </div>
                    
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Resource Type:</label>
                        <select
                            value={uploadDetails.resourceType}
                            onChange={(e) => setUploadDetails({
                                ...uploadDetails,
                                resourceType: e.target.value as UploadDetails['resourceType']
                            })}
                            className="border border-gray-300 p-2 rounded-lg w-full focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                            required
                        >
                            <option value="reference">Reference</option>
                            <option value="question">Question</option>
                            <option value="answer">Answer</option>
                        </select>
                    </div>
                    
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">File:</label>
                        <input
                            type="file"
                            onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                            className="border border-gray-300 p-2 rounded-lg w-full focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                            accept=".pdf"
                            required
                        />
                    </div>
                    
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-gradient-to-r from-indigo-600 to-indigo-700 text-white px-6 py-3 rounded-lg font-medium hover:from-indigo-700 hover:to-indigo-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 transition-all duration-200"
                    >
                        {isLoading ? (
                            <div className="flex items-center justify-center">
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Uploading...
                            </div>
                        ) : 'Upload PDF'}
                    </button>
                </form>
            </div>

            <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4 text-gray-800">Migration Tools</h2>
                <button
                    onClick={handleMigration}
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white px-6 py-3 rounded-lg font-medium hover:from-green-700 hover:to-green-800 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 transition-all duration-200"
                >
                    {isLoading ? (
                        <div className="flex items-center justify-center">
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Migrating...
                        </div>
                    ) : 'Start Migration'}
                </button>
            </div>

            {message && (
                <div className={`p-4 rounded-lg border ${
                    message.includes('failed') 
                        ? 'bg-red-50 border-red-200 text-red-700' 
                        : 'bg-green-50 border-green-200 text-green-700'
                }`}>
                    {message}
                </div>
            )}

            {migrationStats && (
                <div className="mt-6 p-6 bg-gray-50 rounded-lg border border-gray-200">
                    <h3 className="text-lg font-semibold mb-4 text-gray-900">Migration Statistics</h3>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                            <p className="text-sm text-gray-500">Topics</p>
                            <p className="text-2xl font-bold text-indigo-600">{migrationStats.topics}</p>
                        </div>
                        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                            <p className="text-sm text-gray-500">Subtopics</p>
                            <p className="text-2xl font-bold text-green-600">{migrationStats.subtopics}</p>
                        </div>
                        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                            <p className="text-sm text-gray-500">Resources</p>
                            <p className="text-2xl font-bold text-blue-600">{migrationStats.resources}</p>
                        </div>
                        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                            <p className="text-sm text-gray-500">Failed</p>
                            <p className="text-2xl font-bold text-red-600">{migrationStats.failed}</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}; 