import { useContentContext } from 'app/contexts/content-context';
import { ContentListItem } from 'app/components/content-list-item/content-list-item';

export default function ContentList() {
    const { contents } = useContentContext();
    return (
        <div className="grid grid-cols-3 gap-4 pt-16 h-full">
            {contents.map((content) => (
                <ContentListItem content={content} key={content.id} />
            ))}
        </div>
    );
}
