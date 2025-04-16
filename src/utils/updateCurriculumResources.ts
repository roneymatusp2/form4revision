// updateCurriculumResources.ts - Script to integrate organized resources with the site
import { 
  videoResources, 
  pdfResources, 
  exerciseResources, 
  solutionResources, 
  otherResources,
  officialResources,
  unitTitles,
  unitColors,
  getAllResourcesForSubtopic
} from '../data/organized';
import { AppwriteService } from '../services/appwriteService';
import { ExternalResource } from '../data/types';

// Define an interface for resource update operations
interface ResourceUpdateOperation {
  unitId: string;
  subtopicSlug: string;
  resourceType: 'videos' | 'exercises' | 'solutions' | 'otherResources';
  resources: ExternalResource[];
}

/**
 * Update curriculum resources in the database
 * This function can be called from an admin component to update the resources
 */
export const updateCurriculumResources = async (): Promise<void> => {
  console.log('Starting curriculum resources update...');
  
  // Build a list of all operations to perform
  const operations: ResourceUpdateOperation[] = [];
  
  // Process all units and subtopics
  for (const unitId of Object.keys(unitTitles)) {
    // Videos
    for (const subtopicSlug of Object.keys(videoResources[unitId] || {})) {
      operations.push({
        unitId,
        subtopicSlug,
        resourceType: 'videos',
        resources: videoResources[unitId][subtopicSlug]
      });
    }
    
    // Exercises
    for (const subtopicSlug of Object.keys(exerciseResources[unitId] || {})) {
      operations.push({
        unitId,
        subtopicSlug,
        resourceType: 'exercises',
        resources: exerciseResources[unitId][subtopicSlug]
      });
    }
    
    // Solutions
    for (const subtopicSlug of Object.keys(solutionResources[unitId] || {})) {
      operations.push({
        unitId,
        subtopicSlug,
        resourceType: 'solutions',
        resources: solutionResources[unitId][subtopicSlug]
      });
    }
    
    // Other Resources (including PDFs)
    for (const subtopicSlug of Object.keys(otherResources[unitId] || {})) {
      operations.push({
        unitId,
        subtopicSlug,
        resourceType: 'otherResources',
        resources: otherResources[unitId][subtopicSlug]
      });
    }
    
    // PDFs (you might want to categorize these into the appropriate resource types)
    for (const subtopicSlug of Object.keys(pdfResources[unitId] || {})) {
      // You could update the specific resource type based on the PDF's purpose
      // For now, we'll add them to otherResources
      operations.push({
        unitId,
        subtopicSlug,
        resourceType: 'otherResources',
        resources: pdfResources[unitId][subtopicSlug]
      });
    }
  }
  
  // Execute all operations
  console.log(`Prepared ${operations.length} resource update operations`);
  
  try {
    for (const operation of operations) {
      await updateResourcesForSubtopic(
        operation.unitId,
        operation.subtopicSlug,
        operation.resourceType,
        operation.resources
      );
      console.log(`Updated ${operation.resourceType} for ${operation.unitId}/${operation.subtopicSlug}`);
    }
    
    // Update official resources
    await updateOfficialResources(officialResources);
    console.log('Updated official resources');
    
    console.log('Curriculum resources update completed successfully!');
  } catch (error) {
    console.error('Error updating curriculum resources:', error);
    throw error;
  }
};

/**
 * Update resources for a specific subtopic
 */
const updateResourcesForSubtopic = async (
  unitId: string,
  subtopicSlug: string,
  resourceType: 'videos' | 'exercises' | 'solutions' | 'otherResources',
  resources: ExternalResource[]
): Promise<void> => {
  try {
    // Update resources in the database
    // This will depend on how your AppwriteService is implemented
    // You might need to create, update, or delete resources
    
    // Example implementation:
    await AppwriteService.updateSubtopicResources(
      unitId,
      subtopicSlug,
      resourceType,
      resources
    );