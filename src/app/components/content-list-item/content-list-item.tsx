import { memo } from 'react';

import { Content } from 'app/types/content-type';
import { IMAGE_URL } from 'app/constants';
import { LazyLoadImage, trackWindowScroll } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

const Item = ({ content, scrollPosition }: { content: Content; scrollPosition: () => void }) => {
    return (
        <div>
            <LazyLoadImage
                className="w-full"
                wrapperClassName="w-full"
                alt={content.name}
                src={`${IMAGE_URL}/${content['poster-image']}`}
                effect="blur"
                onError={({ currentTarget }) => {
                    currentTarget.onerror = null;
                    currentTarget.src = require('../../assets/images/poster-placeholder.png');
                }}
                scrollPosition={scrollPosition}
                placeholderSrc={require('../../assets/images/poster-placeholder.png')}
            />
            <div className="text-white text-md py-1 font-default font-extralight">{content.name}</div>
        </div>
    );
};

export const ContentListItem = memo(trackWindowScroll(Item));
