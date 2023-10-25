import { createContext, useContext, useState, useEffect, useMemo, useDeferredValue, useCallback } from 'react';
import { Content } from 'app/types/content-type';
import { Pagination } from 'app/types/pagination-type';
import { fetchContent } from 'app/services/content-service';
import { hasWindowScrolledHalf } from 'app/utils';

type ContentContextProviderProps = {
    children: React.ReactNode;
};

export type ContentContext = {
    loading: boolean;
    pageTitle: string;
    contents: Content[];
    pagination?: Pagination;
    search: string;
    setSearch: React.Dispatch<React.SetStateAction<string>>;
    handleFetchData: (page: number) => void;
    handleScroll: () => void;
};

const ContentContext = createContext<ContentContext>({
    loading: false,
    pageTitle: '',
    contents: [],
    pagination: null,
    search: '',
    setSearch: () => {},
    handleFetchData: () => {},
    handleScroll: () => {},
});

function useContentController() {
    const [loading, setLoading] = useState(false);
    const [pageTitle, setPageTitle] = useState<string>('');
    const [data, setData] = useState<Content[]>([]);
    const [pagination, setPagination] = useState<Pagination>(null);
    const [search, setSearch] = useState<string>('');
    const searchText = useDeferredValue<string>(search);

    const contents = useMemo(() => {
        return data.filter((item) => item.name.toLowerCase().includes(searchText.toLowerCase()));
    }, [data, searchText]);

    useEffect(() => {
        handleFetchData();
    }, []);

    const handleFetchData = useCallback(
        async (page = 1) => {
            setLoading(true);
            const result = await fetchContent(page);
            setLoading(false);
            if (result.success) {
                setPageTitle(result.title);
                if (page > 1) setData((prev) => [...prev, ...result.contents]);
                else setData(result.contents);
                setPagination(result.pagination);
            }
        },
        [setPageTitle, setData, setPagination],
    );

    const handleScroll = useCallback(() => {
        if (hasWindowScrolledHalf() && !loading) {
            const { page, size, total } = pagination;
            if (parseInt(page.toString()) * parseInt(size.toString()) < parseInt(total.toString())) {
                const nextPage = parseInt(page.toString()) + 1;
                handleFetchData(nextPage);
            }
        }
    }, [loading, pagination]);

    return { loading, pageTitle, contents, pagination, search, setSearch, handleFetchData, handleScroll };
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
