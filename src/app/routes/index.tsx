import { useCallback } from 'react';

import { useContentContext } from '../contexts/content-context';
import SearchNav from 'app/components/search-nav/search-nav';
import ContentList from 'app/pages/contents';

import RouteStyles from './index.module.css';

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
            <SearchNav title={pageTitle} value={search} onChange={handleSearchInput} />
            <ContentList />
        </div>
    );
}
