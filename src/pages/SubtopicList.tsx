import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Models } from 'appwrite';
import { AppwriteService } from '../services/appwriteService';

interface Topic extends Models.Document {
    name: string;
    slug: string;
}

interface Subtopic extends Models.Document {
    name: string;
    slug: string;
    topicId: string;
}

export const SubtopicList: React.FC = () => {
    const { topicId } = useParams<{ topicId: string }>();
    const [topic, setTopic] = useState<Topic | null>(null);
    const [subtopics, setSubtopics] = useState<Subtopic[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            if (!topicId) return;

            try {
                setLoading(true);
                const [fetchedTopic, fetchedSubtopics] = await Promise.all([
                    AppwriteService.getTopic(topicId),
                    AppwriteService.getSubtopicsByTopic(topicId)
                ]);
                setTopic(fetchedTopic);
                setSubtopics(fetchedSubtopics);
                setError(null);
            } catch (err) {
                console.error('Error fetching data:', err);
                setError('Failed to load content. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [topicId]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-48">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    if (error || !topic) {
        return (
            <div className="text-center py-8">
                <div className="text-red-500 mb-4">{error || 'Topic not found'}</div>
                <Link
                    to="/"
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                    Return to Topics
                </Link>
            </div>
        );
    }

    return (
        <div>
            <div className="mb-8">
                <Link
                    to="/"
                    className="text-blue-500 hover:text-blue-600 flex items-center"
                >
                    <svg
                        className="w-4 h-4 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 19l-7-7 7-7"
                        />
                    </svg>
                    Back to Topics
                </Link>
            </div>

            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{topic.name}</h1>
                <p className="text-gray-600">Select a subtopic to view resources</p>
            </div>

            {subtopics.length === 0 ? (
                <div className="text-center py-8 text-gray-600">
                    No subtopics available for this topic yet.
                </div>
            ) : (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {subtopics.map(subtopic => (
                        <Link
                            key={subtopic.$id}
                            to={`/subtopic/${subtopic.$id}`}
                            className="block p-6 bg-white rounded-lg shadow hover:shadow-md transition-shadow border border-gray-200"
                        >
                            <h2 className="text-xl font-semibold text-gray-900 mb-2">
                                {subtopic.name}
                            </h2>
                            <p className="text-gray-600">
                                View questions, answers, and resources
                            </p>
                            <div className="mt-4 flex items-center text-blue-600">
                                <span className="text-sm">View resources</span>
                                <svg
                                    className="w-4 h-4 ml-2"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M9 5l7 7-7 7"
                                    />
                                </svg>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
};

export default SubtopicList; 