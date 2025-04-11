import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import topics, { Topic, Subtopic } from '../data/topics';

export const SubtopicList: React.FC = () => {
    const { topicId } = useParams<{ topicId: string }>();
    const [topic, setTopic] = useState<Topic | null>(null);
    const [subtopics, setSubtopics] = useState<Subtopic[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!topicId) return;

        // Find the topic with the matching ID
        const foundTopic = topics.find(t => t.$id === topicId) || null;
        setTopic(foundTopic);
        
        // Get its subtopics
        const foundSubtopics = foundTopic?.subtopics || [];
        setSubtopics(foundSubtopics);
        
        setLoading(false);
    }, [topicId]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-48">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    if (!topic) {
        return (
            <div className="text-center py-8">
                <div className="text-red-500 mb-4">Topic not found</div>
                <Link
                    to="/"
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                    Return to Topics
                </Link>
            </div>
        );
    }

    // Get color scheme based on topic ID
    const getColorScheme = () => {
        switch(topic.$id) {
            case 'unit-1': return {
                primary: 'bg-blue-500',
                light: 'bg-blue-100',
                hover: 'hover:bg-blue-600',
                text: 'text-blue-700',
                border: 'border-blue-500'
            };
            case 'unit-2': return {
                primary: 'bg-green-500',
                light: 'bg-green-100',
                hover: 'hover:bg-green-600',
                text: 'text-green-700',
                border: 'border-green-500'
            };
            case 'unit-3': return {
                primary: 'bg-emerald-500',
                light: 'bg-emerald-100',
                hover: 'hover:bg-emerald-600',
                text: 'text-emerald-700',
                border: 'border-emerald-500'
            };
            case 'unit-4': return {
                primary: 'bg-indigo-500',
                light: 'bg-indigo-100',
                hover: 'hover:bg-indigo-600',
                text: 'text-indigo-700',
                border: 'border-indigo-500'
            };
            case 'unit-5': return {
                primary: 'bg-amber-500',
                light: 'bg-amber-100',
                hover: 'hover:bg-amber-600',
                text: 'text-amber-700',
                border: 'border-amber-500'
            };
            case 'unit-8': return {
                primary: 'bg-purple-500',
                light: 'bg-purple-100',
                hover: 'hover:bg-purple-600',
                text: 'text-purple-700',
                border: 'border-purple-500'
            };
            default: return {
                primary: 'bg-gray-500',
                light: 'bg-gray-100',
                hover: 'hover:bg-gray-600',
                text: 'text-gray-700',
                border: 'border-gray-500'
            };
        }
    };

    const colors = getColorScheme();

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="mb-6">
                <Link
                    to="/"
                    className="text-blue-600 hover:underline flex items-center"
                >
                    <svg
                        className="w-5 h-5 mr-2"
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

            {/* Header with topic color */}
            <div className={`${colors.primary} rounded-t-lg p-6 text-white mb-6`}>
                <h1 className="text-3xl font-bold">{topic.name}</h1>
                <p className="mt-2 text-white text-opacity-90">
                    Select a subtopic to access resources
                </p>
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
                            className={`block p-6 bg-white rounded-lg shadow hover:shadow-lg transition-all hover:-translate-y-1 transform duration-200 border-t-4 ${colors.border}`}
                        >
                            <h2 className={`text-xl font-semibold ${colors.text} mb-2`}>
                                {subtopic.name}
                            </h2>
                            <p className="text-gray-600 mb-4">
                                Access exercises, answers and videos
                            </p>
                            <div className={`inline-flex items-center px-3 py-1 rounded-full ${colors.light} ${colors.text}`}>
                                <span className="text-sm font-medium">View resources</span>
                                <svg
                                    className="w-4 h-4 ml-1"
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