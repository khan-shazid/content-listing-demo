import { Suspense, lazy, useCallback } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { useContentContext } from '../contexts/content-context';
const SearchNav = lazy(() => import('app/components/search-nav/search-nav'));
const ContentList = lazy(() => import('app/pages/contents'));

import RouteStyles from './index.module.css';
import { FallbackComponent } from 'app/components/fallback-component/fallback-component';
import ReleaseNotes from 'app/pages/release-notes';

const SearchableContentRoute = () => {
    const { pageTitle, search, setSearch } = useContentContext();

    const handleSearchInput = useCallback(
        (e) => {
            setSearch(e.target.value);
        },
        [setSearch],
    );
    return (
        <div className={RouteStyles['content-container']}>
            {/* <FallbackComponent /> */}
            <Suspense fallback={<FallbackComponent />}>
                <SearchNav title={pageTitle} value={search} onChange={handleSearchInput} />
                <ContentList />
            </Suspense>
        </div>
    );
};

const router = createBrowserRouter([
    {
        path: '/',
        element: <SearchableContentRoute />,
    },

    {
        path: '/release-notes',
        element: <ReleaseNotes />,
    },
]);

export default function Routes() {
    return <RouterProvider router={router} />;
}
