import React, { useState, useEffect } from 'react';
import { curriculumResources, unitTitles, unitColors } from '../data/organized';
import { ExternalResource, SubtopicResourceSet } from '../data/types';

interface ResourceSelectorProps {
  unitId: string;
  subtopicSlug: string;
  onResourceSelect?: (resource: ExternalResource) => void;
}

export const ResourceSelector: React.FC<ResourceSelectorProps> = ({ 
  unitId, 
  subtopicSlug,
  onResourceSelect 
}) => {
  const [activeTab, setActiveTab] = useState<'videos' | 'exercises' | 'solutions' | 'other'>('videos');
  const [resources, setResources] = useState<SubtopicResourceSet | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Reset when unit or subtopic changes
    setLoading(true);
    
    // Get resources for this unit/subtopic
    if (unitId && subtopicSlug && 
        curriculumResources[unitId] && 
        curriculumResources[unitId][subtopicSlug]) {
      setResources(curriculumResources[unitId][subtopicSlug]);
    } else {
      setResources(null);
    }
    
    setLoading(false);
  }, [unitId, subtopicSlug]);

  const handleResourceClick = (resource: ExternalResource) => {
    if (onResourceSelect) {
      onResourceSelect(resource);
    } else {
      // Default behavior: open in new tab
      window.open(resource.url, '_blank');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-48">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!resources) {
    return (
      <div className="bg-yellow-50 border border-yellow-200 text-yellow-600 px-4 py-3 rounded">
        No resources available for this subtopic.
      </div>
    );
  }

  const unitColor = unitColors[unitId] || 'gray';
  const colorClasses = {
    indigo: 'text-indigo-700 border-indigo-500 bg-indigo-50 hover:bg-indigo-100',
    emerald: 'text-emerald-700 border-emerald-500 bg-emerald-50 hover:bg-emerald-100',
    teal: 'text-teal-700 border-teal-500 bg-teal-50 hover:bg-teal-100',
    blue: 'text-blue-700 border-blue-500 bg-blue-50 hover:bg-blue-100',
    orange: 'text-orange-700 border-orange-500 bg-orange-50 hover:bg-orange-100',
    purple: 'text-purple-700 border-purple-500 bg-purple-50 hover:bg-purple-100',
    violet: 'text-violet-700 border-violet-500 bg-violet-50 hover:bg-violet-100',
    rose: 'text-rose-700 border-rose-500 bg-rose-50 hover:bg-rose-100',
    green: 'text-green-700 border-green-500 bg-green-50 hover:bg-green-100',
    gray: 'text-gray-700 border-gray-500 bg-gray-50 hover:bg-gray-100',
  };
  
  const getResourceIcon = (type?: string) => {
    switch(type) {
      case 'pdf':
        return (
          <svg className="w-5 h-5 mr-2 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
          </svg>
        );
      case 'video':
        return (
          <svg className="w-5 h-5 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      default:
        return (
          <svg className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 015.656 0l4 4a4 4 0 01-5.656 5.656l-1.102-1.101" />
          </svg>
        );
    }
  };

  // Count items in each category
  const resourceCounts = {
    videos: resources.videos.length,
    exercises: resources.exercises.length,
    solutions: resources.solutions.length,
    other: resources.otherResources.length
  };

  // Get current resources based on active tab
  const currentResources = activeTab === 'videos' 
    ? resources.videos 
    : activeTab === 'exercises' 
    ? resources.exercises 
    : activeTab === 'solutions' 
    ? resources.solutions
    : resources.otherResources;

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <div className="flex border-b mb-4">
        <button
          onClick={() => setActiveTab('videos')}
          className={`px-4 py-2 font-medium text-sm rounded-t-lg mr-1 focus:outline-none ${
            activeTab === 'videos'
              ? `border-b-2 border-${unitColor}-500 text-${unitColor}-700`
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Videos {resourceCounts.videos > 0 && `(${resourceCounts.videos})`}
        </button>
        <button
          onClick={() => setActiveTab('exercises')}
          className={`px-4 py-2 font-medium text-sm rounded-t-lg mr-1 focus:outline-none ${
            activeTab === 'exercises'
              ? `border-b-2 border-${unitColor}-500 text-${unitColor}-700`
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Exercises {resourceCounts.exercises > 0 && `(${resourceCounts.exercises})`}
        </button>
        <button
          onClick={() => setActiveTab('solutions')}
          className={`px-4 py-2 font-medium text-sm rounded-t-lg mr-1 focus:outline-none ${
            activeTab === 'solutions'
              ? `border-b-2 border-${unitColor}-500 text-${unitColor}-700`
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Solutions {resourceCounts.solutions > 0 && `(${resourceCounts.solutions})`}
        </button>
        <button
          onClick={() => setActiveTab('other')}
          className={`px-4 py-2 font-medium text-sm rounded-t-lg focus:outline-none ${
            activeTab === 'other'
              ? `border-b-2 border-${unitColor}-500 text-${unitColor}-700`
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Other {resourceCounts.other > 0 && `(${resourceCounts.other})`}
        </button>
      </div>

      {currentResources.length > 0 ? (
        <div className="space-y-2">
          {currentResources.map((resource, index) => (
            <button
              key={`${resource.title}-${index}`}
              onClick={() => handleResourceClick(resource)}
              className={`w-full flex items-center text-left p-3 rounded-md border ${colorClasses[unitColor] || colorClasses.gray} transition-colors`}
            >
              {getResourceIcon(resource.type)}
              <div className="flex-1">
                <div className="font-medium">{resource.title}</div>
                <div className="text-sm opacity-70">Source: {resource.source}</div>
              </div>
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </button>
          ))}
        </div>
      ) : (
        <div className="text-center py-6 text-gray-500">
          No {activeTab} available for this subtopic.
        </div>
      )}
    </div>
  );
};

export default ResourceSelector;