import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import topics, { Subtopic, Topic } from '../data/topics';
import { motion } from 'framer-motion';
import { getTopicColorScheme, TopicColorScheme } from '../utils/topicColors';
import { 
  curriculumResources, 
  officialResources, 
  ExternalResource as ExternalResourceType,
  SubtopicResourceSet
} from '../data/externalResources-new';

const SubtopicPage: React.FC = () => {
  const { subtopicId } = useParams<{ subtopicId: string }>();
  const [activeTab, setActiveTab] = useState<'videos' | 'exercises' | 'answers' | 'external'>('videos');
  const [subtopic, setSubtopic] = useState<Subtopic | null>(null);
  const [parentTopic, setParentTopic] = useState<Topic | null>(null);
  const [loadedResources, setLoadedResources] = useState<SubtopicResourceSet | null>(null);
  
  useEffect(() => {
    if (!subtopicId) return;

    // Find the subtopic and its parent topic
    let foundSubtopic: Subtopic | null = null;
    let foundTopic: Topic | null = null;

    for (const topic of topics) {
      const matchedSubtopic = topic.subtopics?.find(sub => sub.$id === subtopicId) || null;
      if (matchedSubtopic) {
        foundSubtopic = matchedSubtopic;
        foundTopic = topic;
        break;
      }
    }

    if (foundSubtopic && foundTopic) {
      setSubtopic(foundSubtopic);
      setParentTopic(foundTopic);

      // Load ALL resources for this subtopic from curriculumResources
      const topicResources = curriculumResources[foundTopic.$id];
      if (topicResources && topicResources[foundSubtopic.slug]) {
        setLoadedResources(topicResources[foundSubtopic.slug] as SubtopicResourceSet);
      } else {
        // Set empty resources if none found
        setLoadedResources({
          videos: [],
          exercises: [],
          solutions: [],
          otherResources: []
        });
      }
    }
  }, [subtopicId]);

  // Get color scheme from the centralized utility
  const colors = parentTopic ? getTopicColorScheme(parentTopic.$id) : getTopicColorScheme('default');
  
  // Use the gradient directly from the colors scheme
  const gradient = colors.gradient || colors.header; // Fallback to header if gradient not defined

  if (!subtopic || !parentTopic || !loadedResources) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-red-600">Loading or Subtopic not found</h1>
        <p className="mt-4">
          The subtopic you're looking for doesn't exist. Please return to the{' '}
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
      <div className="mb-8">
        <Link to={`/topic/${parentTopic.$id}`} className="text-blue-600 hover:underline inline-flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          Back to {parentTopic.name}
        </Link>
      </div>

      {/* Header with unit color */}
      <div className={`${gradient} rounded-t-lg p-6 text-white mb-6`}>
        <h1 className="text-3xl font-bold">{subtopic.name}</h1>
        <p className="mt-2 text-white text-opacity-90">
          From {parentTopic.name}
        </p>
      </div>

      {/* Navigation Tabs */}
      <div className="flex flex-wrap border-b mb-6">
        <button 
          onClick={() => setActiveTab('videos')}
          className={`px-4 py-2 font-medium rounded-t-lg transition-colors ${activeTab === 'videos' ? colors.activeTab : colors.inactiveTab}`}
        >
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Videos
          </div>
        </button>
        <button 
          onClick={() => setActiveTab('exercises')}
          className={`px-4 py-2 font-medium rounded-t-lg transition-colors ${activeTab === 'exercises' ? colors.activeTab : colors.inactiveTab}`}
        >
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Exercises & References
          </div>
        </button>
        <button 
          onClick={() => setActiveTab('answers')}
          className={`px-4 py-2 font-medium rounded-t-lg transition-colors ${activeTab === 'answers' ? colors.activeTab : colors.inactiveTab}`}
        >
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Answers
          </div>
        </button>
        <button 
          onClick={() => setActiveTab('external')}
          className={`px-4 py-2 font-medium rounded-t-lg transition-colors ${activeTab === 'external' ? colors.activeTab : colors.inactiveTab}`}
        >
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
            External Resources
          </div>
        </button>
      </div>

      {/* Content based on active tab */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {activeTab === 'videos' && (
          <div className="space-y-6">
            <h2 className={`text-2xl font-bold mb-4 ${colors.title}`}>Video Tutorials</h2>
            {loadedResources.videos.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {loadedResources.videos.map((video: ExternalResourceType, index: number) => (
                  <div key={`video-${index}`} className={`rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 ${colors.bg}`}>
                    <div className="aspect-w-16 aspect-h-9">
                      <iframe
                        src={video.url}
                        title={video.title}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="w-full h-64"
                      ></iframe>
                    </div>
                    <div className={`p-4 border-t ${colors.border} border-opacity-30`}>
                      <h3 className={`text-lg font-semibold ${colors.title}`}>{video.title}</h3>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-yellow-700">
                      No video tutorials available for this subtopic yet. Check back soon as we continue to add more resources.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'exercises' && (
          <div className="space-y-6">
            <h2 className={`text-2xl font-bold mb-4 ${colors.title}`}>Exercises & References</h2>
            {loadedResources.exercises.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {loadedResources.exercises.map((pdf: ExternalResourceType, index: number) => (
                  <a 
                    key={`exercise-${index}`} 
                    href={pdf.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className={`flex items-start p-4 rounded-lg ${colors.bg} transition-all hover:shadow-md border ${colors.border} border-opacity-30`}
                  >
                    <div className={`p-3 rounded-lg ${colors.light} mr-4`}>
                      <svg xmlns="http://www.w3.org/2000/svg" className={`h-8 w-8 ${colors.text}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className={`text-lg font-semibold ${colors.title}`}>{pdf.title}</h3>
                      <p className="text-gray-600 text-sm mt-1">Source: {pdf.source}</p>
                      <div className={`mt-2 inline-flex items-center text-xs px-2 py-1 rounded-full ${colors.light} ${colors.text}`}>
                        PDF Exercise
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            ) : (
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-yellow-700">
                      No exercise worksheets or reference materials available for this subtopic yet. Please check other subtopics or come back later.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'answers' && (
          <div className="space-y-6">
            <h2 className={`text-2xl font-bold mb-4 ${colors.title}`}>Answers & Solutions</h2>
            {loadedResources.solutions.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {loadedResources.solutions.map((pdf: ExternalResourceType, index: number) => (
                  <a 
                    key={`solution-${index}`} 
                    href={pdf.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className={`flex items-start p-4 rounded-lg ${colors.bg} transition-all hover:shadow-md border ${colors.border} border-opacity-30`}
                  >
                    <div className={`p-3 rounded-lg ${colors.light} mr-4`}>
                      <svg xmlns="http://www.w3.org/2000/svg" className={`h-8 w-8 ${colors.text}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className={`text-lg font-semibold ${colors.title}`}>{pdf.title}</h3>
                      <p className="text-gray-600 text-sm mt-1">Source: {pdf.source}</p>
                      <div className={`mt-2 inline-flex items-center text-xs px-2 py-1 rounded-full ${colors.light} ${colors.text}`}>
                        PDF Solution/Answers
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            ) : (
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-yellow-700">
                      No answer sheets available for this subtopic yet. Try checking the exercise materials first, or visit other subtopics.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'external' && (
          <div className="space-y-6">
            <h2 className={`text-2xl font-bold mb-4 ${colors.title}`}>External Resources</h2>
            
            {loadedResources.otherResources.length > 0 ? (
              <div className="space-y-4">
                {loadedResources.otherResources.map((resource: ExternalResourceType, index: number) => (
                  <a 
                    key={`other-${index}`} 
                    href={resource.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className={`flex items-start p-4 rounded-lg ${colors.bg} transition-all hover:shadow-md border ${colors.border} border-opacity-30 block`}
                  >
                    <div className={`p-3 rounded-lg ${colors.light} mr-4`}>
                      <svg xmlns="http://www.w3.org/2000/svg" className={`h-8 w-8 ${colors.text}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </div>
                    <div>
                      <h3 className={`text-lg font-semibold ${colors.title}`}>{resource.title}</h3>
                      <p className="text-gray-600 text-sm mt-1">Source: {resource.source}</p>
                      <div className={`mt-2 inline-flex items-center text-xs px-2 py-1 rounded-full ${colors.light} ${colors.text}`}>
                        {resource.type === 'pdf' ? 'Reference PDF' : 'External Link'}
                      </div>
                    </div>
                  </a>
                ))}
                
                {/* Display Cambridge official resources for every subtopic */}
                <h3 className={`text-xl font-semibold mt-8 mb-4 ${colors.title}`}>Cambridge Official Resources</h3>
                <div className="space-y-4">
                  {officialResources.map((resource, index) => (
                    <a 
                      key={`official-${index}`} 
                      href={resource.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className={`flex items-start p-4 rounded-lg ${colors.bg} transition-all hover:shadow-md border ${colors.border} border-opacity-30 block`}
                    >
                      <div className={`p-3 rounded-lg ${colors.light} mr-4`}>
                        <svg xmlns="http://www.w3.org/2000/svg" className={`h-8 w-8 ${colors.text}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className={`text-lg font-semibold ${colors.title}`}>{resource.title}</h3>
                        <p className="text-gray-600 text-sm mt-1">Source: {resource.source}</p>
                        <div className={`mt-2 inline-flex items-center text-xs px-2 py-1 rounded-full ${colors.light} ${colors.text}`}>
                          Official Cambridge Resource
                        </div>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            ) : (
              <div className="space-y-8">
                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-yellow-700">
                        No specific external resources available for this subtopic yet. Please check the Cambridge official resources below.
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* Display Cambridge official resources for every subtopic */}
                <h3 className={`text-xl font-semibold mt-8 mb-4 ${colors.title}`}>Cambridge Official Resources</h3>
                <div className="space-y-4">
                  {officialResources.map((resource, index) => (
                    <a 
                      key={`official-${index}`} 
                      href={resource.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className={`flex items-start p-4 rounded-lg ${colors.bg} transition-all hover:shadow-md border ${colors.border} border-opacity-30 block`}
                    >
                      <div className={`p-3 rounded-lg ${colors.light} mr-4`}>
                        <svg xmlns="http://www.w3.org/2000/svg" className={`h-8 w-8 ${colors.text}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className={`text-lg font-semibold ${colors.title}`}>{resource.title}</h3>
                        <p className="text-gray-600 text-sm mt-1">Source: {resource.source}</p>
                        <div className={`mt-2 inline-flex items-center text-xs px-2 py-1 rounded-full ${colors.light} ${colors.text}`}>
                          Official Cambridge Resource
                        </div>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </motion.div>

      {/* Add at the bottom of the page */}
      <div className="mt-8">
        <Link 
          to={`/topic/${parentTopic.$id}`} 
          className={`inline-flex items-center px-4 py-2 rounded-lg text-white ${colors.button}`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 15l-3-3m0 0l3-3m-3 3h8M3 12a9 9 0 1118 0 9 9 0 01-18 0z" />
          </svg>
          Back to {parentTopic.name}
        </Link>
      </div>
    </div>
  );
};

export default SubtopicPage;