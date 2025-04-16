import React, { useState, useEffect } from 'react';
import { 
  getAllResourcesForSubtopic,
  videoResources, 
  exerciseResources,
  solutionResources
} from '../../data/organized';
import { LoadingSpinner } from '../LoadingSpinner';

/**
 * TestResourcesComponent
 * 
 * This component demonstrates how to import and use the organized curriculum resources.
 * It shows how to:
 * 1. Import the necessary functions and data from the organized module
 * 2. Fetch resources for a specific unit and subtopic
 * 3. Display the resources in a structured way
 * 4. Access specific parts of the resource structure directly
 */
const TestResourcesComponent: React.FC = () => {
  const [resources, setResources] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [unitId, setUnitId] = useState<string>('unit-1');
  const [subtopicSlug, setSubtopicSlug] = useState<string>('distance-formula');

  useEffect(() => {
    // Fetch resources for the selected unit and subtopic
    const fetchResources = () => {
      setLoading(true);
      
      // Get all resources for this subtopic
      const subtopicResources = getAllResourcesForSubtopic(unitId, subtopicSlug);
      
      // Update state with the found resources
      setResources(subtopicResources);
      setLoading(false);
      
      // Debug: Log the fetched resources to console
      console.log('Resources found:', subtopicResources);
      
      // Additional examples of how to access specific resource collections
      console.log('All videos for Unit 1:', videoResources['unit-1']);
      
      // Access exercises for a specific subtopic
      console.log('Exercises for simultaneous-equations:', 
        exerciseResources['unit-1']?.['simultaneous-equations'] || []);
        
      // Access solutions for a specific unit
      console.log('Solutions available in Unit 2:', 
        Object.keys(solutionResources['unit-2'] || {}));
    };

    fetchResources();
  }, [unitId, subtopicSlug]);

  // Simple unit and subtopic selection
  const handleUnitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setUnitId(e.target.value);
  };

  const handleSubtopicChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSubtopicSlug(e.target.value);
  };

  if (loading) {
    return <div className="flex justify-center p-8"><LoadingSpinner /></div>;
  }

  if (!resources) {
    return <div className="p-6 text-center text-red-600">No resources found for this combination.</div>;
  }

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">Resource Testing Component</h2>
      
      {/* Simple controls to test different combinations */}
      <div className="bg-gray-100 p-4 rounded-lg mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="unit-select" className="block text-gray-700 mb-2">Select Unit:</label>
          <select 
            id="unit-select"
            value={unitId}
            onChange={handleUnitChange}
            className="w-full p-2 border rounded"
          >
            <option value="unit-1">Unit 1: Number & Coordinate Geometry</option>
            <option value="unit-2">Unit 2: Geometry & Angles</option>
            <option value="unit-3">Unit 3: Mensuration & Circle Geometry</option>
            <option value="unit-4">Unit 4: Algebraic Manipulation & Equations</option>
            <option value="unit-5">Unit 5: Quadratic Patterns and Models</option>
            <option value="unit-6">Unit 6: Sequences</option>
            <option value="unit-7">Unit 7: Functions and Variation</option>
            <option value="unit-8">Unit 8: Trigonometry</option>
          </select>
        </div>
        
        <div>
          <label htmlFor="subtopic-select" className="block text-gray-700 mb-2">Select Subtopic:</label>
          <select 
            id="subtopic-select"
            value={subtopicSlug}
            onChange={handleSubtopicChange}
            className="w-full p-2 border rounded"
          >
            <option value="distance-formula">Distance Formula</option>
            <option value="simultaneous-equations">Simultaneous Equations</option>
            <option value="linear-equations">Linear Equations</option>
            <option value="pythagoras-theorem">Pythagoras Theorem</option>
            <option value="circle-geometry">Circle Geometry</option>
          </select>
        </div>
      </div>
      
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-4 border-b pb-2">
          Resources for {subtopicSlug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
        </h3>
        
        {/* Display resource counts summary */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-6">
          <div className="bg-blue-50 p-3 rounded text-center">
            <span className="block text-lg font-bold text-blue-700">{resources.videos.length}</span>
            <span className="text-blue-600">Videos</span>
          </div>
          <div className="bg-green-50 p-3 rounded text-center">
            <span className="block text-lg font-bold text-green-700">{resources.exercises.length}</span>
            <span className="text-green-600">Exercises</span>
          </div>
          <div className="bg-purple-50 p-3 rounded text-center">
            <span className="block text-lg font-bold text-purple-700">{resources.solutions.length}</span>
            <span className="text-purple-600">Solutions</span>
          </div>
          <div className="bg-yellow-50 p-3 rounded text-center">
            <span className="block text-lg font-bold text-yellow-700">{resources.otherResources.length}</span>
            <span className="text-yellow-600">Other Resources</span>
          </div>
        </div>
      </div>
      
      {/* Videos Section */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-2 text-blue-700 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
            <path fillRule="evenodd" d="M10 0a2 2 0 012 2v12a2 2 0 01-2 2H8a2 2 0 01-2-2V2a2 2 0 012-2h2z" clipRule="evenodd" />
          </svg>
          Videos ({resources.videos.length})
        </h3>
        
        {resources.videos.length === 0 ? (
          <p className="text-gray-500 italic">No videos available for this topic.</p>
        ) : (
          <ul className="space-y-2">
            {resources.videos.map((video: any, index: number) => (
              <li key={index} className="p-3 bg-blue-50 rounded flex items-start">
                <div className="text-blue-600 mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <a href={video.url} target="_blank" rel="noopener noreferrer" 
                    className="text-blue-600 hover:underline font-medium">
                    {video.title}
                  </a>
                  <div className="text-sm text-gray-600 mt-1">Source: {video.source}</div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      
      {/* Exercises Section */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-2 text-green-700 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
            <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
          </svg>
          Exercises ({resources.exercises.length})
        </h3>
        
        {resources.exercises.length === 0 ? (
          <p className="text-gray-500 italic">No exercises available for this topic.</p>
        ) : (
          <ul className="space-y-2">
            {resources.exercises.map((exercise: any, index: number) => (
              <li key={index} className="p-3 bg-green-50 rounded flex items-start">
                <div className="text-green-600 mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                    <path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <a href={exercise.url} target="_blank" rel="noopener noreferrer"
                    className="text-green-600 hover:underline font-medium">
                    {exercise.title}
                  </a>
                  <div className="text-sm text-gray-600 mt-1">Source: {exercise.source}</div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      
      {/* Solutions Section */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-2 text-purple-700 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
          </svg>
          Solutions ({resources.solutions.length})
        </h3>
        
        {resources.solutions.length === 0 ? (
          <p className="text-gray-500 italic">No solutions available for this topic.</p>
        ) : (
          <ul className="space-y-2">
            {resources.solutions.map((solution: any, index: number) => (
              <li key={index} className="p-3 bg-purple-50 rounded flex items-start">
                <div className="text-purple-600 mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <a href={solution.url} target="_blank" rel="noopener noreferrer"
                    className="text-purple-600 hover:underline font-medium">
                    {solution.title}
                  </a>
                  <div className="text-sm text-gray-600 mt-1">Source: {solution.source}</div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      
      {/* Other Resources Section */}
      <div>
        <h3 className="text-lg font-semibold mb-2 text-yellow-700 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
          </svg>
          Other Resources ({resources.otherResources.length})
        </h3>
        
        {resources.otherResources.length === 0 ? (
          <p className="text-gray-500 italic">No additional resources available for this topic.</p>
        ) : (
          <ul className="space-y-2">
            {resources.otherResources.map((resource: any, index: number) => (
              <li key={index} className="p-3 bg-yellow-50 rounded flex items-start">
                <div className="text-yellow-600 mr-3">
                  {resource.type === 'pdf' ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" clipRule="evenodd" />
                    </svg>
                  )}
                </div>
                <div>
                  <a href={resource.url} target="_blank" rel="noopener noreferrer"
                    className="text-yellow-600 hover:underline font-medium">
                    {resource.title}
                  </a>
                  <div className="text-sm text-gray-600 mt-1">
                    Source: {resource.source} 
                    {resource.type === 'pdf' ? ' (PDF)' : ''}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      
      <div className="mt-8 p-4 bg-gray-50 rounded-lg border border-gray-200">
        <h3 className="text-lg font-semibold mb-2">How to Use This Component</h3>
        <p className="mb-2">This component demonstrates how to work with the organized curriculum resources:</p>
        <ul className="list-disc list-inside space-y-1 text-gray-700">
          <li>Import resources and helper functions from <code className="bg-gray-100 px-1">data/organized</code></li>
          <li>Use <code className="bg-gray-100 px-1">getAllResourcesForSubtopic(unitId, subtopicSlug)</code> to get resources</li>
          <li>Access direct resource collections using exported objects like <code className="bg-gray-100 px-1">videoResources['unit-id']['subtopic-slug']</code></li>
          <li>Display resources by category in your application UI</li>
        </ul>
      </div>
    </div>
  );
};

export default TestResourcesComponent;