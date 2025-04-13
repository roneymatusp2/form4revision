import React, { Suspense } from 'react';
import { createBrowserRouter, RouterProvider, createRoutesFromElements, Route, Outlet } from 'react-router-dom';
import Layout from './components/Layout';
import { LoadingSpinner } from './components/LoadingSpinner';

// Lazy load components for better performance
const HomePage = React.lazy(() => import('./pages/HomePage'));
const TopicList = React.lazy(() => import('./pages/TopicList'));
const SubtopicList = React.lazy(() => import('./pages/SubtopicList'));
const SubtopicPage = React.lazy(() => import('./pages/SubtopicPage'));
const AdminDashboard = React.lazy(() => import('./pages/AdminDashboard'));
const ResourcesPage = React.lazy(() => import('./pages/ResourcesPage'));
const TeacherAdmin = React.lazy(() => import('./pages/TeacherAdmin'));
const NotFoundPage = React.lazy(() => import('./pages/NotFoundPage'));

const MainLayout = () => {
    return (
        <Layout>
            <Suspense fallback={<LoadingSpinner />}>
                <Outlet />
            </Suspense>
        </Layout>
    );
};

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route element={<MainLayout />}>
            <Route
                path="/"
                element={
                    <Suspense fallback={<LoadingSpinner />}>
                        <HomePage />
                    </Suspense>
                }
            />
            <Route
                path="/topics"
                element={
                    <Suspense fallback={<LoadingSpinner />}>
                        <TopicList />
                    </Suspense>
                }
            />
            <Route
                path="/topic/:topicId"
                element={
                    <Suspense fallback={<LoadingSpinner />}>
                        <SubtopicList />
                    </Suspense>
                }
            />
            <Route
                path="/subtopic/:subtopicId"
                element={
                    <Suspense fallback={<LoadingSpinner />}>
                        <SubtopicPage />
                    </Suspense>
                }
            />
            <Route
                path="/resources"
                element={
                    <Suspense fallback={<LoadingSpinner />}>
                        <ResourcesPage />
                    </Suspense>
                }
            />
            <Route
                path="/teacher-admin"
                element={
                    <Suspense fallback={<LoadingSpinner />}>
                        <TeacherAdmin />
                    </Suspense>
                }
            />
            <Route
                path="/admin"
                element={
                    <Suspense fallback={<LoadingSpinner />}>
                        <AdminDashboard />
                    </Suspense>
                }
            />
            {/* 404 Page */}
            <Route
                path="*"
                element={
                    <Suspense fallback={<LoadingSpinner />}>
                        <NotFoundPage />
                    </Suspense>
                }
            />
        </Route>
    )
);

export const App: React.FC = () => {
    return (
        <RouterProvider router={router} fallbackElement={<LoadingSpinner />} />
    );
};

export default App;
