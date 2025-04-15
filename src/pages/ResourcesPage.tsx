import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { curriculumResources, officialResources, unitTitles, unitColors, ExternalResource } from '../data/externalResources-new';
import { Topic } from '../data/topics';
import topicsData from '../data/topics';

// Componente para cada recurso individual
const ResourceItem: React.FC<{ resource: ExternalResource }> = ({ resource }) => {
  const getIcon = () => {
    switch (resource.type) {
      case 'video':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9a2.25 2.25 0 0 0 2.25 2.25Z" />
          </svg>
        );
      case 'pdf':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m.75 12 3 3m0 0 3-3m-3 3v-6m-1.5-9H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
          </svg>
        );
      case 'external':
      default:
        return (
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244" />
          </svg>
        );
    }
  };

  return (
    <motion.a
      href={resource.url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center p-3 mb-2 bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-all"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="flex items-center justify-center w-10 h-10 rounded-full mr-4 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300">
        {getIcon()}
      </div>
      <div className="flex-1">
        <h3 className="font-medium text-gray-800 dark:text-white">{resource.title}</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {resource.source} • {resource.type?.toUpperCase() || 'LINK'}
        </p>
      </div>
    </motion.a>
  );
};

// Componente para um subtópico e seus recursos
const SubtopicSection: React.FC<{ 
  subtopicSlug: string, 
  subtopicName: string, 
  resources: {
    videos: ExternalResource[];
    exercises: ExternalResource[];
    solutions: ExternalResource[];
    otherResources: ExternalResource[];
  }
}> = ({ subtopicSlug, subtopicName, resources }) => {
  const [isOpen, setIsOpen] = useState(false);

  // Combina todos os recursos para exibição em uma lista
  const allResources = [
    ...resources.videos,
    ...resources.exercises,
    ...resources.solutions,
    ...resources.otherResources
  ];

  return (
    <div className="mb-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full p-3 bg-gray-100 dark:bg-gray-700 rounded-lg mb-2"
      >
        <h3 className="font-medium text-gray-800 dark:text-white">{subtopicName}</h3>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`w-5 h-5 transition-transform ${isOpen ? 'rotate-180' : 'rotate-0'}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      
      {isOpen && (
        <div className="pl-4">
          {allResources.map((resource, idx) => (
            <ResourceItem key={`${subtopicSlug}-${idx}`} resource={resource} />
          ))}
        </div>
      )}
    </div>
  );
};

// Componente para um tópico e seus subtópicos
const TopicSection: React.FC<{ unitId: string }> = ({ unitId }) => {
  const [isOpen, setIsOpen] = useState(false);
  const topic = topicsData.find((t: Topic) => t.$id === unitId);
  const resources = curriculumResources[unitId] || {};
  
  const getColorClass = () => {
    const color = unitColors[unitId as keyof typeof unitColors] || 'gray';
    
    // Special handling for the units with custom gradients
    if (unitId === 'unit-5') {
      return {
        bg: 'bg-gradient-to-br from-orange-50 to-amber-100 dark:bg-orange-900/20',
        text: 'text-orange-800 dark:text-orange-200',
        border: 'border-orange-200 dark:border-orange-700'
      };
    }
    if (unitId === 'unit-6') {
      return {
        bg: 'bg-gradient-to-br from-purple-50 to-fuchsia-100 dark:bg-purple-900/20',
        text: 'text-purple-800 dark:text-purple-200',
        border: 'border-purple-200 dark:border-purple-700'
      };
    }
    if (unitId === 'unit-9') {
      return {
        bg: 'bg-gradient-to-br from-green-50 to-emerald-100 dark:bg-green-900/20',
        text: 'text-green-800 dark:text-green-200',
        border: 'border-green-200 dark:border-green-700'
      };
    }
    
    // Standard color handling
    return {
      bg: `bg-${color}-100 dark:bg-${color}-900/20`,
      text: `text-${color}-800 dark:text-${color}-200`,
      border: `border-${color}-200 dark:border-${color}-700`
    };
  };
  
  const colors = getColorClass();
  
  // Se não houver recursos ou tópico, não renderize nada
  if (!topic || Object.keys(resources).length === 0) {
    return null;
  }

  // Mapeamento entre slug de subtópico e nome do subtópico
  const subtopicNameMap: Record<string, string> = {};
  topic.subtopics?.forEach((subtopic: any) => {
    subtopicNameMap[subtopic.slug] = subtopic.name;
  });
      
      return (
    <motion.div 
      className={`mb-8 border rounded-xl overflow-hidden ${colors.border}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center justify-between w-full p-4 ${colors.bg} ${colors.text}`}
      >
        <h2 className="text-xl font-bold">{unitTitles[unitId as keyof typeof unitTitles] || topic.name}</h2>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`w-6 h-6 transition-transform ${isOpen ? 'rotate-180' : 'rotate-0'}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
      </button>
      
      {isOpen && (
        <div className="p-4">
          {Object.entries(resources).map(([subtopicSlug, subtopicResources]) => (
            <SubtopicSection
              key={subtopicSlug}
              subtopicSlug={subtopicSlug}
              subtopicName={subtopicNameMap[subtopicSlug] || subtopicSlug}
              resources={subtopicResources}
            />
          ))}
            </div>
      )}
    </motion.div>
  );
};

// Componente para recursos oficiais Cambridge
const OfficialResourcesSection: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      className="mb-8 border border-blue-200 dark:border-blue-800 rounded-xl overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.2 }}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full p-4 bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-200"
      >
        <h2 className="text-xl font-bold">Official Cambridge Resources</h2>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`w-6 h-6 transition-transform ${isOpen ? 'rotate-180' : 'rotate-0'}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      
      {isOpen && (
        <div className="p-4">
          {officialResources.map((resource, idx) => (
            <ResourceItem key={`official-${idx}`} resource={resource} />
        ))}
      </div>
      )}
    </motion.div>
  );
};

// Página principal de recursos
const ResourcesPage: React.FC = () => {
  // Filtrar apenas os IDs de unidade que têm recursos disponíveis
  const availableUnitIds = Object.keys(curriculumResources);
  
  return (
    <div className="container max-w-4xl mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <h1 className="text-3xl font-bold mb-4 text-gray-800 dark:text-white">Learning Resources</h1>
        <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Explore a curated collection of educational resources for each topic in the IGCSE International Mathematics curriculum.
          Click on any topic to expand and discover videos, worksheets, and practice materials.
        </p>
      </motion.div>

      {/* Recursos por tópico */}
      <div>
        {availableUnitIds.map(unitId => (
          <TopicSection key={unitId} unitId={unitId} />
        ))}
      </div>
      
      {/* Recursos oficiais Cambridge */}
      <OfficialResourcesSection />
    </div>
  );
};

export default ResourcesPage;
