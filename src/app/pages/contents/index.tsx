import { useContentContext } from 'app/contexts/content-context';
import { ContentListItem } from 'app/components/content-list-item/content-list-item';
import { useEffect } from 'react';

export default function ContentList() {
    const { loading, contents, handleScroll } = useContentContext();
    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [loading]);

    return (
        <div onScroll={handleScroll} className="grid grid-cols-3 gap-4 pt-16 h-full" data-testid="content-list">
            {contents.map((content) => (
                <ContentListItem content={content} key={content.id} />
            ))}
        </div>
    );
}
