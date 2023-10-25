import ContentList from './index';
import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { BASE_URL } from 'app/constants';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

// const contentWithImage = {
//     name: 'The Birds',
//     'poster-image': 'poster1.jpg',
// };

// const contentWithBadImage = {
//     name: 'Image Link Bad',
//     'poster-image': 'bad-image.jpg',
// };

jest.mock('app/constants', () => ({
    BASE_URL: 'https://test.create.diagnal.com',
    contentUrls: {
        getContent: (page) => `https://test.create.diagnal.com/data/page${page}.json`,
    },
}));

const mock = new MockAdapter(axios);

const response = {
    page: {
        title: 'Romantic Comedy',
        'total-content-items': '54',
        'page-num-requested': '1',
        'page-size-requested': '20',
        'page-size-returned': '20',
        'content-items': {
            content: [
                {
                    name: 'The Birds',
                    'poster-image': 'poster1.jpg',
                },
                {
                    name: 'Rear Window',
                    'poster-image': 'poster2.jpg',
                },
                {
                    name: 'Family Pot',
                    'poster-image': 'poster3.jpg',
                },
                {
                    name: 'Family Pot',
                    'poster-image': 'poster2.jpg',
                },
                {
                    name: 'Rear Window',
                    'poster-image': 'poster1.jpg',
                },
            ],
        },
    },
};

const renderComponent = () => render(<ContentList />);

afterEach(() => {
    mock.reset();
    cleanup();
});

describe('Content List Test', () => {
    it('Test 01 - Check if content list renders properly', async () => {
        mock.onGet(BASE_URL + '/data/page1.json').reply(200, response);
        const { getByTestId } = renderComponent();

        const list = getByTestId('content-list');
        console.log(list);

        // expect(getByTestId('content-list')).toHaveTextContent(contentWithImage.name);
    });

    it('Test 02 - Check if content list item renders placeholder if no image', async () => {
        // const { getByTestId } = renderComponent();
        // const image = getByTestId('content-item-image');
        // fireEvent.error(image);
        // expect(getByTestId('content-item-title')).toHaveTextContent(contentWithBadImage.name);
        // expect(image).toHaveAttribute('src', STATIC_IMAGES.posterPlaceholder);
    });
});
