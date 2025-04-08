import React, { useEffect, useState } from 'react';
import { Models } from 'appwrite';
import { AppwriteService } from '../services/appwriteService';
import { MigrationResult } from '../utils/appwriteMigration';

interface Topic extends Models.Document {
    name: string;
    slug: string;
}

interface Subtopic extends Models.Document {
    name: string;
    slug: string;
    topicId: string;
}

export const AdminDashboard: React.FC = () => {
    const [topics, setTopics] = useState<Topic[]>([]);
    const [selectedTopic, setSelectedTopic] = useState<string>('');
    const [subtopics, setSubtopics] = useState<Subtopic[]>([]);
    const [newTopic, setNewTopic] = useState('');
    const [newSubtopic, setNewSubtopic] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [migrationStatus, setMigrationStatus] = useState<MigrationResult | null>(null);

    useEffect(() => {
        fetchTopics();
    }, []);

    useEffect(() => {
        if (selectedTopic) {
            fetchSubtopics(selectedTopic);
        } else {
            setSubtopics([]);
        }
    }, [selectedTopic]);

    const fetchTopics = async () => {
        try {
            setLoading(true);
            const fetchedTopics = await AppwriteService.getTopics();
            setTopics(fetchedTopics);
            setError(null);
        } catch (err) {
            console.error('Error fetching topics:', err);
            setError('Failed to load topics. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    const fetchSubtopics = async (topicId: string) => {
        try {
            const fetchedSubtopics = await AppwriteService.getSubtopicsByTopic(topicId);
            setSubtopics(fetchedSubtopics);
            setError(null);
        } catch (err) {
            console.error('Error fetching subtopics:', err);
            setError('Failed to load subtopics. Please try again later.');
        }
    };

    const generateSlug = (name: string): string => {
        return name
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '');
    };

    const handleCreateTopic = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newTopic.trim()) return;

        try {
            setLoading(true);
            await AppwriteService.createTopic({
                name: newTopic.trim(),
                slug: generateSlug(newTopic)
            });
            setNewTopic('');
            await fetchTopics();
            setError(null);
        } catch (err) {
            console.error('Error creating topic:', err);
            setError('Failed to create topic. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    const handleCreateSubtopic = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newSubtopic.trim() || !selectedTopic) return;

        try {
            setLoading(true);
            await AppwriteService.createSubtopic({
                name: newSubtopic.trim(),
                slug: generateSlug(newSubtopic),
                topicId: selectedTopic
            });
            setNewSubtopic('');
            await fetchSubtopics(selectedTopic);
            setError(null);
        } catch (err) {
            console.error('Error creating subtopic:', err);
            setError('Failed to create subtopic. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    const handleMigration = async () => {
        try {
            setLoading(true);
            const result = await AppwriteService.migrateContent();
            setMigrationStatus(result);
        } catch (error) {
            console.error('Migration failed:', error);
            setMigrationStatus({
                success: false,
                message: error instanceof Error ? error.message : 'Migration failed',
                stats: {
                    topics: 0,
                    subtopics: 0,
                    resources: 0,
                    failed: 1
                }
            });
        } finally {
            setLoading(false);
        }
    };

    if (loading && topics.length === 0) {
        return (
            <div className="flex justify-center items-center h-48">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-8">Admin Dashboard</h1>
                {error && (
                    <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded mb-6">
                        {error}
                    </div>
                )}
            </div>

            <div className="grid gap-8 md:grid-cols-2">
                <section className="space-y-6">
                    <h2 className="text-xl font-semibold text-gray-900">Create New Topic</h2>
                    <form onSubmit={handleCreateTopic} className="space-y-4">
                        <div>
                            <label htmlFor="topicName" className="block text-sm font-medium text-gray-700">
                                Topic Name
                            </label>
                            <input
                                type="text"
                                id="topicName"
                                value={newTopic}
                                onChange={(e) => setNewTopic(e.target.value)}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                placeholder="Enter topic name"
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
                        >
                            {loading ? 'Creating...' : 'Create Topic'}
                        </button>
                    </form>
                </section>

                <section className="space-y-6">
                    <h2 className="text-xl font-semibold text-gray-900">Create New Subtopic</h2>
                    <form onSubmit={handleCreateSubtopic} className="space-y-4">
                        <div>
                            <label htmlFor="topicSelect" className="block text-sm font-medium text-gray-700">
                                Select Topic
                            </label>
                            <select
                                id="topicSelect"
                                value={selectedTopic}
                                onChange={(e) => setSelectedTopic(e.target.value)}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                required
                            >
                                <option value="">Select a topic</option>
                                {topics.map(topic => (
                                    <option key={topic.$id} value={topic.$id}>
                                        {topic.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label htmlFor="subtopicName" className="block text-sm font-medium text-gray-700">
                                Subtopic Name
                            </label>
                            <input
                                type="text"
                                id="subtopicName"
                                value={newSubtopic}
                                onChange={(e) => setNewSubtopic(e.target.value)}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                placeholder="Enter subtopic name"
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={loading || !selectedTopic}
                            className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
                        >
                            {loading ? 'Creating...' : 'Create Subtopic'}
                        </button>
                    </form>
                </section>
            </div>

            {selectedTopic && (
                <section className="space-y-4">
                    <h2 className="text-xl font-semibold text-gray-900">Current Subtopics</h2>
                    {subtopics.length === 0 ? (
                        <p className="text-gray-600">No subtopics available for this topic yet.</p>
                    ) : (
                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                            {subtopics.map(subtopic => (
                                <div
                                    key={subtopic.$id}
                                    className="p-4 bg-white rounded-lg shadow border border-gray-200"
                                >
                                    <h3 className="font-medium text-gray-900">{subtopic.name}</h3>
                                </div>
                            ))}
                        </div>
                    )}
                </section>
            )}

            <div className="bg-white rounded-lg shadow p-6 mb-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Content Migration</h2>
                <button
                    onClick={handleMigration}
                    disabled={loading}
                    className={`px-4 py-2 rounded ${
                        loading
                            ? 'bg-gray-400 cursor-not-allowed'
                            : 'bg-blue-500 hover:bg-blue-600'
                    } text-white font-medium transition-colors`}
                >
                    {loading ? 'Migrating...' : 'Start Migration'}
                </button>

                {migrationStatus && (
                    <div className={`mt-4 p-4 rounded ${
                        migrationStatus.success ? 'bg-green-50' : 'bg-red-50'
                    }`}>
                        <p className={`font-medium ${
                            migrationStatus.success ? 'text-green-800' : 'text-red-800'
                        }`}>
                            {migrationStatus.success ? 'Success!' : 'Error'}
                        </p>
                        <p className="text-gray-600 mt-1">{migrationStatus.message}</p>
                        {migrationStatus.stats && (
                            <div className="mt-2">
                                <p className="text-sm text-gray-600">Migration Stats:</p>
                                <ul className="list-disc list-inside mt-1 text-sm text-gray-600">
                                    <li>Topics: {migrationStatus.stats.topics}</li>
                                    <li>Subtopics: {migrationStatus.stats.subtopics}</li>
                                    <li>Resources: {migrationStatus.stats.resources}</li>
                                    <li>Failed: {migrationStatus.stats.failed}</li>
                                </ul>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminDashboard; 