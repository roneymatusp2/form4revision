import { Client, Databases, Storage, ID, Models, Query } from 'appwrite';
import config from '../config/appwrite';
import { MigrationResult, migrateTopics } from '../utils/appwriteMigration';

const client = new Client()
    .setEndpoint(config.endpoint)
    .setProject(config.projectId);

const databases = new Databases(client);
const storage = new Storage(client);

interface Topic extends Models.Document {
    name: string;
    slug: string;
}

interface Subtopic extends Models.Document {
    name: string;
    slug: string;
    topicId: string;
}

interface Resource extends Models.Document {
    title: string;
    fileId: string;
    subtopicId: string;
    resourceType: 'question' | 'answer' | 'reference' | 'video';
}

export const AppwriteService = {
    async getTopics(): Promise<Topic[]> {
        try {
            const response = await databases.listDocuments(
                config.databaseId,
                config.topicsCollectionId
            );
            return response.documents as Topic[];
        } catch (err) {
            console.error('Error fetching topics:', err);
            throw err;
        }
    },

    async getTopic(topicId: string): Promise<Topic> {
        try {
            const response = await databases.getDocument(
                config.databaseId,
                config.topicsCollectionId,
                topicId
            );
            return response as Topic;
        } catch (err) {
            console.error('Error fetching topic:', err);
            throw err;
        }
    },

    async createTopic(data: { name: string; slug: string }): Promise<Topic> {
        try {
            const response = await databases.createDocument(
                config.databaseId,
                config.topicsCollectionId,
                ID.unique(),
                data
            );
            return response as Topic;
        } catch (err) {
            console.error('Error creating topic:', err);
            throw err;
        }
    },

    async getSubtopicsByTopic(topicId: string): Promise<Subtopic[]> {
        try {
            const response = await databases.listDocuments(
                config.databaseId,
                config.subtopicsCollectionId,
                [Query.equal('topicId', topicId)]
            );
            return response.documents as Subtopic[];
        } catch (err) {
            console.error('Error fetching subtopics:', err);
            throw err;
        }
    },

    async getSubtopic(subtopicId: string): Promise<Subtopic> {
        try {
            const response = await databases.getDocument(
                config.databaseId,
                config.subtopicsCollectionId,
                subtopicId
            );
            return response as Subtopic;
        } catch (err) {
            console.error('Error fetching subtopic:', err);
            throw err;
        }
    },

    async createSubtopic(data: { name: string; slug: string; topicId: string }): Promise<Subtopic> {
        try {
            const response = await databases.createDocument(
                config.databaseId,
                config.subtopicsCollectionId,
                ID.unique(),
                data
            );
            return response as Subtopic;
        } catch (err) {
            console.error('Error creating subtopic:', err);
            throw err;
        }
    },

    async getResourcesBySubtopic(subtopicId: string): Promise<Resource[]> {
        try {
            const response = await databases.listDocuments(
                config.databaseId,
                config.resourcesCollectionId,
                [Query.equal('subtopicId', subtopicId)]
            );
            return response.documents as Resource[];
        } catch (err) {
            console.error('Error fetching resources:', err);
            throw err;
        }
    },

    async createResource(data: {
        title: string;
        subtopicId: string;
        resourceType: Resource['resourceType'];
        fileId: string;
    }): Promise<Resource> {
        try {
            const response = await databases.createDocument(
                config.databaseId,
                config.resourcesCollectionId,
                ID.unique(),
                data
            );
            return response as Resource;
        } catch (err) {
            console.error('Error creating resource:', err);
            throw err;
        }
    },

    async uploadFile(file: File): Promise<string> {
        try {
            const response = await storage.createFile(
                config.bucketId,
                ID.unique(),
                file
            );
            return response.$id;
        } catch (err) {
            console.error('Error uploading file:', err);
            throw err;
        }
    },

    async deleteFile(fileId: string): Promise<void> {
        try {
            await storage.deleteFile(config.bucketId, fileId);
        } catch (err) {
            console.error('Error deleting file:', err);
            throw err;
        }
    },

    getFileView(fileId: string): string {
        return storage.getFileView(config.bucketId, fileId).toString();
    },

    async migrateContent(): Promise<MigrationResult> {
        try {
            return await migrateTopics();
        } catch (error) {
            console.error('Migration failed:', error);
            return {
                success: false,
                message: error instanceof Error ? error.message : 'Migration failed',
                stats: {
                    topics: 0,
                    subtopics: 0,
                    resources: 0,
                    failed: 1
                }
            };
        }
    }
};

export default AppwriteService; 