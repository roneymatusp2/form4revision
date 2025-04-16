import React from 'react';
import { useParams, Link } from 'react-router-dom';
import topics from '../data/topics';
import { getTopicColorScheme } from '../utils/topicColors';

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

  const colors = getTopicColorScheme(topic.$id);

  return (
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link to="/" className="text-blue-600 hover:underline">
            &larr; Back to Home
          </Link>
        </div>

        <div>
          <div className={`h-2 w-32 mb-6 ${colors.header}`}></div>
          <h1 className={`text-3xl font-bold mb-4 ${colors.title}`}>{topic.name}</h1>
          <p className="text-lg text-gray-600 mb-8">Mathematics topic resources</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {topic.subtopics && topic.subtopics.map((subtopic) => (
            <div 
              key={subtopic.$id}
              className={`bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 topic-card border-t-4 ${colors.border}`}
            >
              <Link
                to={`/subtopic/${subtopic.$id}`}
                className="block h-full w-full"
              >
                <div className={`p-6 ${colors.bg}`}>
                  <h2 className={`text-xl font-bold mb-2 ${colors.title}`}>{subtopic.name}</h2>
                  <p className="text-gray-600 mb-4">View exercises, answers and video resources</p>
                  <span className={`inline-block px-4 py-2 rounded-md text-white font-medium ${colors.button}`}>
                    View Resources
                  </span>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
  );
};

export default TopicPage;
