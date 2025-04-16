import { Client, Storage } from 'appwrite';

// Initialize Appwrite client
const client = new Client();

client
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('67fdd2a3002121dd60cd'); // Você pode manter o mesmo projeto ou criar um novo

// Initialize Appwrite storage
const storage = new Storage(client);

// Storage bucket IDs para Form 4
export const STORAGE_BUCKETS = {
    PDF: '67f03c12001381e227aa',
    VIDEOS: '67f03c7600242f02fd1a',
    EXTERNAL: '67f03d6f0021c674bd8d'
};

export { client, storage };
