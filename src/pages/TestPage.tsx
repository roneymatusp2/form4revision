import React from 'react';
import TestResourcesComponent from '../components/test/TestResourcesComponent';

/**
 * TestPage
 * 
 * A page that demonstrates the TestResourcesComponent
 * which showcases how to use the organized curriculum resources.
 */
const TestPage: React.FC = () => {
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold text-center mb-8">
        Resource Organization Test
      </h1>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-4 bg-gray-50 border-b">
          <h2 className="text-xl font-semibold">Testing Resource Organization</h2>
          <p className="text-gray-600">
            This page demonstrates how to import and use the organized curriculum resources
            from the <code className="bg-gray-100 px-1">data/organized</code> directory.
          </p>
        </div>
        
        <TestResourcesComponent />
      </div>
      
      <div className="mt-8 bg-blue-50 p-4 rounded-lg border border-blue-200">
        <h3 className="text-lg font-semibold text-blue-700 mb-2">Development Notes</h3>
        <p>
          This test page shows how the organized resources can be easily accessed and displayed.
          You can use this as a reference for implementing similar functionality in your main application components.
        </p>
        <p className="mt-2">
          The component demonstrates:
        </p>
        <ul className="list-disc list-inside mt-2 space-y-1 text-gray-700">
          <li>Importing and using helper functions</li>
          <li>Fetching resources by unit and subtopic</li>
          <li>Displaying resources in a structured UI</li>
          <li>Handling loading states and empty results</li>
        </ul>
      </div>
    </div>
  );
};

export default TestPage;