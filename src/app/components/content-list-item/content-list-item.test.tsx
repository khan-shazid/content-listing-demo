import { ContentListItem } from './content-list-item';
import { render, cleanup, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { IMAGE_URL, STATIC_IMAGES } from 'app/constants';

jest.mock('app/constants', () => ({
    IMAGE_URL: 'https://test.create.diagnal.com/images',
    STATIC_IMAGES: {
        posterPlaceholder: require('app/assets/images/poster-placeholder.png'),
    },
}));

const contentWithImage = {
    name: 'The Birds',
    'poster-image': 'poster1.jpg',
};

const contentWithBadImage = {
    name: 'Image Link Bad',
    'poster-image': 'bad-image.jpg',
};

const renderComponent = (c) => render(<ContentListItem content={c} />);

afterEach(() => {
    // fetchMock.restore();
    cleanup();
});

describe('Content List Item Test', () => {
    it('Test 01 - Check if content list item renders with proper data', async () => {
        const { getByTestId } = renderComponent(contentWithImage);
        const image = getByTestId('content-item-image');

        expect(getByTestId('content-item-title')).toHaveTextContent(contentWithImage.name);
        expect(image).toHaveAttribute('src', IMAGE_URL + '/' + contentWithImage['poster-image']);
    });

    it('Test 02 - Check if content list item renders placeholder if no image', async () => {
        const { getByTestId } = renderComponent(contentWithBadImage);
        const image = getByTestId('content-item-image');

        fireEvent.error(image);

        expect(getByTestId('content-item-title')).toHaveTextContent(contentWithBadImage.name);
        expect(image).toHaveAttribute('src', STATIC_IMAGES.posterPlaceholder);
    });
});