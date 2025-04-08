import React, { useState } from 'react';
import { migrateResources } from '../../utils/migrateResources';

export const ResourceMigration: React.FC = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    const handleMigration = async () => {
        setIsLoading(true);
        setError(null);
        setSuccess(false);

        try {
            await migrateResources();
            setSuccess(true);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred during migration');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">Resource Migration</h2>
            <button
                onClick={handleMigration}
                disabled={isLoading}
                className={`px-4 py-2 rounded ${
                    isLoading
                        ? 'bg-gray-400'
                        : 'bg-blue-500 hover:bg-blue-600'
                } text-white`}
            >
                {isLoading ? 'Migrating...' : 'Start Migration'}
            </button>

            {error && (
                <div className="mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
                    {error}
                </div>
            )}

            {success && (
                <div className="mt-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded">
                    Migration completed successfully!
                </div>
            )}
        </div>
    );
}; 