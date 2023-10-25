import { createContext, useContext, useState, useEffect, useMemo, useDeferredValue, useCallback } from 'react';
import { Content } from 'app/types/content-type';
import { Pagination } from 'app/types/pagination-type';
import { fetchContent } from 'app/services/content-service';

type ContentContextProviderProps = {
    children: React.ReactNode;
};

type ContentContext = {
    pageTitle: string;
    contents: Content[];
    pagination?: Pagination;
    search: string;
    setSearch: React.Dispatch<React.SetStateAction<string>>;
    handleFetchData: (page: number) => void;
};

const ContentContext = createContext<ContentContext>({
    pageTitle: '',
    contents: [],
    pagination: null,
    search: '',
    setSearch: () => {},
    handleFetchData: () => {},
});

function useContentController() {
    // const [loading, setLoading] = useState(false);
    const [pageTitle, setPageTitle] = useState<string>('');
    const [data, setData] = useState<Content[]>([]);
    const [pagination, setPagination] = useState<Pagination>(null);
    const [search, setSearch] = useState<string>('');
    const searchText = useDeferredValue<string>(search);

    const contents = useMemo(() => {
        return data.filter((item) => item.name.includes(searchText));
    }, [data, searchText]);

    useEffect(() => {
        handleFetchData();
    }, []);

    const handleFetchData = useCallback(
        async (page = 1) => {
            const result = await fetchContent(page);
            if (result.success) {
                setPageTitle(result.title);
                setData(result.contents);
                setPagination(result.pagination);
            }
        },
        [setPageTitle, setData, setPagination],
    );

    return { pageTitle, contents, pagination, search, setSearch, handleFetchData };
}

export function ContentContextProvider({ children }: ContentContextProviderProps) {
    return <ContentContext.Provider value={useContentController()}>{children}</ContentContext.Provider>;
}

export function useContentContext() {
    const context = useContext<ContentContext>(ContentContext);
    if (!context) {
        throw new Error('useContentContext must be inside ContentContextProvider');
    }
    return context;
}
