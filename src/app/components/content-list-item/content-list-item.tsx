import { ReactNode, memo } from 'react';

import { Content } from 'app/types/content-type';
import { IMAGE_URL, STATIC_IMAGES } from 'app/constants';
import { LazyLoadImage, trackWindowScroll } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

const Item = ({ content, scrollPosition }: { content: Content; scrollPosition: () => void }): ReactNode => {
    return (
        <div data-testid="content-item">
            <LazyLoadImage
                data-testid="content-item-image"
                className="w-full"
                wrapperClassName="w-full"
                alt={content.name}
                src={`${IMAGE_URL}/${content['poster-image']}`}
                effect="blur"
                onError={({ currentTarget }) => {
                    currentTarget.onerror = null;
                    currentTarget.src = STATIC_IMAGES.posterPlaceholder;
                }}
                scrollPosition={scrollPosition}
                placeholderSrc={STATIC_IMAGES.posterPlaceholder}
            />
            <div
                className="text-white text-md py-1 font-default font-extralight whitespace-nowrap overflow-hidden text-ellipsis"
                data-testid="content-item-title"
            >
                {content.name}
            </div>
        </div>
    );
};

export const ContentListItem = memo(trackWindowScroll(Item));
