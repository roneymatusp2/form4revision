// types.ts - Type definitions for curriculum resources

export interface ExternalResource {
  title: string;
  url: string;
  source: string;
  type?: 'pdf' | 'video' | 'external';
}

// Structure for ONE subtopic's resources
export interface SubtopicResourceSet {
  videos: ExternalResource[];
  exercises: ExternalResource[];
  solutions: ExternalResource[];
  otherResources: ExternalResource[];
}

// Maps unit IDs to an object where keys are subtopic slugs
// and values are the SubtopicResourceSet for that specific subtopic
export interface CurriculumResourcesType {
  [unitId: string]: {
    [subtopicSlug: string]: SubtopicResourceSet;
  };
}

// Unit information
export interface UnitInfo {
  id: string;
  title: string;
  color: string;
  description?: string;
}

// Subtopic information
export interface SubtopicInfo {
  id: string;
  unitId: string;
  title: string;
  slug: string;
  description?: string;
}
