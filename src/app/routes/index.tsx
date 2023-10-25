import { Suspense, lazy, useCallback } from 'react';

import { useContentContext } from '../contexts/content-context';
const SearchNav = lazy(() => import('app/components/search-nav/search-nav'));
const ContentList = lazy(() => import('app/pages/contents'));

import RouteStyles from './index.module.css';
import { FallbackComponent } from 'app/components/fallback-component/fallback-component';

/*
 * we can use router here and set the nav bar as part of layout
 */
export default function Routes() {
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
}
