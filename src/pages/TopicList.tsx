import React from 'react';
import { Link } from 'react-router-dom';
import { Models } from 'appwrite';
import topics from '../data/topics';
import { getTopicColorScheme } from '../utils/topicColors';

interface Topic extends Models.Document {
    name: string;
    slug: string;
}

export const TopicList: React.FC = () => {
    return (
        <div>
            <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-4">Explore Mathematics Topics</h1>
                <p className="text-gray-600 max-w-3xl mx-auto">
                    Our curriculum covers all essential areas of the Cambridge IGCSE™ International Mathematics Extended
                    syllabus, with comprehensive resources to help you excel.
                </p>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {topics.map((topic, index) => {
                    const colors = getTopicColorScheme(topic.$id);
                    
                    return (
                        <Link
                            key={topic.$id}
                            to={`/topic/${topic.$id}`}
                            className="relative overflow-hidden shadow-md rounded-lg bg-white border border-gray-200 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 block"
                        >
                            {/* Gradient header bar */}
                            <div className={`h-2 w-full ${colors.header}`}></div>
                            
                            <div className={`p-6 ${colors.bg} ${colors.pattern}`}>
                                <h2 className={`text-xl font-semibold mb-2 ${colors.title}`}>
                                    {topic.name}
                                </h2>
                                <p className="text-gray-600 mb-4">
                                    Explore all subtopics and resources.
                                </p>
                                
                                <span
                                    className={`inline-flex items-center mt-4 px-4 py-2 text-white text-sm rounded-lg transition-colors ${colors.button}`}
                                >
                                    <span>Explore Topic</span>
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
                                </span>
                            </div>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
};

export default TopicList;