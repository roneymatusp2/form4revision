import React, { useEffect, useState } from 'react';
import { Models } from 'appwrite';
import { AppwriteService } from '../services/appwriteService';

interface Resource extends Models.Document {
    title: string;
    fileId: string;
    subtopicId: string;
    resourceType: 'question' | 'answer' | 'reference' | 'video';
}

interface ResourceDisplayProps {
    subtopicId: string;
}

export const ResourceDisplay: React.FC<ResourceDisplayProps> = ({ subtopicId }) => {
    const [resources, setResources] = useState<Resource[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchResources = async () => {
            if (!subtopicId) {
                setError('Invalid subtopic ID');
                setLoading(false);
                return;
            }

            try {
                setLoading(true);
                const fetchedResources = await AppwriteService.getResourcesBySubtopic(subtopicId);
                setResources(fetchedResources);
                setError(null);
            } catch (err) {
                console.error('Error fetching resources:', err);
                setError('Failed to load resources. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchResources();
    }, [subtopicId]);

    const handleResourceClick = async (resource: Resource) => {
        try {
            if (resource.fileId) {
                const fileUrl = AppwriteService.getFileView(resource.fileId);
                window.open(fileUrl, '_blank');
            }
        } catch (err) {
            console.error('Error accessing resource:', err);
            setError('Failed to access resource. Please try again later.');
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-48">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded">
                {error}
            </div>
        );
    }

    if (resources.length === 0) {
        return (
            <div className="text-center py-12">
                <p className="text-gray-600">No resources available for this subtopic yet.</p>
            </div>
        );
    }

    const questions = resources.filter(r => r.resourceType === 'question');
    const answers = resources.filter(r => r.resourceType === 'answer');
    const references = resources.filter(r => r.resourceType === 'reference');
    const videos = resources.filter(r => r.resourceType === 'video');

    return (
        <div className="space-y-8">
            {questions.length > 0 && (
                <section>
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">Questions</h2>
                    <div className="space-y-4">
                        {questions.map(resource => (
                            <button
                                key={resource.$id}
                                onClick={() => handleResourceClick(resource)}
                                className="w-full text-left p-4 bg-white rounded-lg shadow border border-gray-200 hover:border-blue-500 transition-colors"
                            >
                                {resource.title}
                            </button>
                        ))}
                    </div>
                </section>
            )}

            {answers.length > 0 && (
                <section>
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">Answers</h2>
                    <div className="space-y-4">
                        {answers.map(resource => (
                            <button
                                key={resource.$id}
                                onClick={() => handleResourceClick(resource)}
                                className="w-full text-left p-4 bg-white rounded-lg shadow border border-gray-200 hover:border-blue-500 transition-colors"
                            >
                                {resource.title}
                            </button>
                        ))}
                    </div>
                </section>
            )}

            {references.length > 0 && (
                <section>
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">References</h2>
                    <div className="space-y-4">
                        {references.map(resource => (
                            <button
                                key={resource.$id}
                                onClick={() => handleResourceClick(resource)}
                                className="w-full text-left p-4 bg-white rounded-lg shadow border border-gray-200 hover:border-blue-500 transition-colors"
                            >
                                {resource.title}
                            </button>
                        ))}
                    </div>
                </section>
            )}

            {videos.length > 0 && (
                <section>
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">Videos</h2>
                    <div className="space-y-4">
                        {videos.map(resource => (
                            <button
                                key={resource.$id}
                                onClick={() => handleResourceClick(resource)}
                                className="w-full text-left p-4 bg-white rounded-lg shadow border border-gray-200 hover:border-blue-500 transition-colors"
                            >
                                {resource.title}
                            </button>
                        ))}
                    </div>
                </section>
            )}
        </div>
    );
}; 