import React from 'react';
import { useParams, Link } from 'react-router-dom';
import topics from '../data/topics';

const TopicPage: React.FC = () => {
  const { topicId } = useParams<{ topicId: string }>();
  const topic = topics.find(t => t.$id === topicId);

  if (!topic) {
    return (
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold text-red-600">Topic not found</h1>
          <p className="mt-4">
            The topic you're looking for doesn't exist. Please return to the{' '}
            <Link to="/" className="text-blue-600 hover:underline">
              homepage
            </Link>
            .
          </p>
        </div>
    );
  }

  return (
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link to="/" className="text-blue-600 hover:underline">
            &larr; Back to Home
          </Link>
        </div>

        <div>
          <div className={`h-2 w-32 mb-6 ${
            topic.$id === 'unit-1' ? 'bg-blue-500' : 
            topic.$id === 'unit-2' ? 'bg-green-500' : 
            topic.$id === 'unit-3' ? 'bg-emerald-500' :
            topic.$id === 'unit-4' ? 'bg-indigo-500' :
            topic.$id === 'unit-5' ? 'bg-amber-500' :
            'bg-purple-500'
          }`}></div>
          <h1 className="text-3xl font-bold text-gray-800 mb-4">{topic.name}</h1>
          <p className="text-lg text-gray-600 mb-8">Mathematics topic resources</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {topic.subtopics && topic.subtopics.map((subtopic) => (
            <div 
              key={subtopic.$id} 
              className={`bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 topic-card border-t-4 ${
                topic.$id === 'unit-1' ? 'border-blue-500' :
                topic.$id === 'unit-2' ? 'border-green-500' :
                topic.$id === 'unit-3' ? 'border-emerald-500' :
                topic.$id === 'unit-4' ? 'border-indigo-500' :
                topic.$id === 'unit-5' ? 'border-amber-500' :
                'border-purple-500'
              }`}
            >
              <div className="p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-2">{subtopic.name}</h2>
                <p className="text-gray-600 mb-4">View exercises, answers and video resources</p>
                <Link
                  to={`/subtopic/${subtopic.$id}`}
                  className={`inline-block px-4 py-2 rounded-md text-white font-medium ${
                    topic.$id === 'unit-1'
                      ? 'bg-blue-600 hover:bg-blue-700'
                      : topic.$id === 'unit-2'
                      ? 'bg-green-600 hover:bg-green-700'
                      : topic.$id === 'unit-3'
                      ? 'bg-emerald-600 hover:bg-emerald-700'
                      : topic.$id === 'unit-4'
                      ? 'bg-indigo-600 hover:bg-indigo-700'
                      : topic.$id === 'unit-5'
                      ? 'bg-amber-600 hover:bg-amber-700'
                      : 'bg-purple-600 hover:bg-purple-700'
                  }`}
                >
                  View Resources
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
  );
};

export default TopicPage;
