// index.ts - Export all organized curriculum resources
import { videoResources } from './videos';
import { pdfResources } from './pdfs';
import { exerciseResources } from './exercises';
import { solutionResources } from './solutions';
import { otherResources, officialResources } from './otherResources';
import { ExternalResource } from '../types';

// Data structure for units
export const unitTitles = {
  'unit-1': 'Unit 1: Number & Coordinate Geometry',
  'unit-2': 'Unit 2: Geometry & Angles',
  'unit-3': 'Unit 3: Mensuration & Circle Geometry',
  'unit-4': 'Unit 4: Algebraic Manipulation & Equations',
  'unit-5': 'Unit 5: Quadratic Patterns and Models',
  'unit-6': 'Unit 6: Sequences',
  'unit-7': 'Unit 7: Functions and Variation',
  'unit-8': 'Unit 8: Trigonometry'
};

// Unit colors matching TopicCard.tsx with enhanced vibrant colors
export const unitColors = {
  'unit-1': 'indigo',
  'unit-2': 'emerald',
  'unit-3': 'teal',
  'unit-4': 'blue',
  'unit-5': 'orange',
  'unit-6': 'purple',
  'unit-7': 'violet',
  'unit-8': 'rose',
  'unit-9': 'green' // For future use
};

// Export everything
export {
  videoResources,
  pdfResources,
  exerciseResources,
  solutionResources,
  otherResources,
  officialResources
};

// Helper function to get all resources for a specific unit and subtopic
export const getResourcesByUnitAndSubtopic = (
  unitId: string,
  subtopicSlug: string
): {
  videos: ExternalResource[];
  pdfs: ExternalResource[];
  exercises: ExternalResource[];
  solutions: ExternalResource[];
  otherResources: ExternalResource[];
} => {
  return {
    videos: videoResources[unitId]?.[subtopicSlug] || [],
    pdfs: pdfResources[unitId]?.[subtopicSlug] || [],
    exercises: exerciseResources[unitId]?.[subtopicSlug] || [],
    solutions: solutionResources[unitId]?.[subtopicSlug] || [],
    otherResources: otherResources[unitId]?.[subtopicSlug] || []
  };
};

// This function matches the existing structure expected by your application
export const getAllResourcesForSubtopic = (
  unitId: string,
  subtopicSlug: string
): {
  videos: ExternalResource[];
  exercises: ExternalResource[];
  solutions: ExternalResource[];
  otherResources: ExternalResource[];
} => {
  // Get all resources
  const resources = getResourcesByUnitAndSubtopic(unitId, subtopicSlug);
  
  // Combine PDFs into the appropriate categories based on type
  // We're assuming PDFs are already categorized in the appropriate arrays
  // If they're in pdfResources specifically, you might want to distribute them
  
  return {
    videos: resources.videos,
    exercises: resources.exercises,
    solutions: resources.solutions,
    otherResources: [...resources.pdfs, ...resources.otherResources]
  };
};

export default {
  unitTitles,
  unitColors,
  videoResources,
  pdfResources,
  exerciseResources,
  solutionResources,
  otherResources,
  officialResources,
  getResourcesByUnitAndSubtopic,
  getAllResourcesForSubtopic
};