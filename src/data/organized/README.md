# Organized Curriculum Resources for Cambridge IGCSE International Mathematics (0607)

This directory contains organized educational resources for the Cambridge IGCSE International Mathematics (0607) Extended curriculum. Resources are categorized by type and organized by unit and subtopic.

## Structure

The resources are organized into the following files:

- `videos.ts` - Video resources from YouTube and other platforms
- `pdfs.ts` - PDF documents including worksheets, notes, and guides
- `exercises.ts` - Practice exercises and problem sets
- `solutions.ts` - Solutions and answer keys to exercises
- `otherResources.ts` - Interactive tools, simulations, and other supplementary materials
- `index.ts` - Exports all resources and provides a combined structure

## Usage

Import the resources into your application:

```typescript
// Import specific resource categories
import { videoResources, pdfResources } from './data/organized';

// Import combined resources structure
import { curriculumResources } from './data/organized';
```

### Access Resources by Unit and Subtopic

```typescript
// Access videos for a specific subtopic
const linearFunctionVideos = videoResources['unit-1']['linear-functions'];

// Access all resource types for a specific subtopic
const trigonometryResources = curriculumResources['unit-8']['right-angled-trigonometry'];
```

## Resource Types

Each resource has the following properties:

```typescript
interface ExternalResource {
  title: string;      // Resource title
  url: string;        // URL to the resource
  source: string;     // Provider/author of the resource
  type?: 'pdf' | 'video' | 'external';  // Resource type
}
```

## Units

The curriculum is organized into 8 units:

1. Number & Coordinate Geometry
2. Geometry & Angles
3. Mensuration & Circle Geometry
4. Algebraic Manipulation & Equations
5. Quadratic Patterns and Models
6. Sequences
7. Functions and Variation
8. Trigonometry

## Adding New Resources

When adding new resources, place them in the appropriate file based on type and organized by unit ID and subtopic slug.

## Official Cambridge Resources

Official Cambridge resources are included in `otherResources.ts` as `officialCambridgeResources`.