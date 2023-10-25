import ContentList from './index';
import { render, cleanup, act } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { BASE_URL } from 'app/constants';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { ContentContextProvider } from 'app/contexts/content-context';

jest.mock('app/constants', () => ({
    BASE_URL: 'https://test.create.diagnal.com',
    contentUrls: {
        getContent: (page) => `https://test.create.diagnal.com/data/page${page}.json`,
    },
    STATIC_IMAGES: {
        posterPlaceholder: require('app/assets/images/poster-placeholder.png'),
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

afterEach(() => {
    mock.reset();
    cleanup();
});

describe('Content List Test', () => {
    it('Test 01 - Check if content list renders properly with childs', async () => {
        mock.onGet(BASE_URL + '/data/page1.json').reply(200, response);
        const { getByTestId } = await act(async () =>
            render(
                <ContentContextProvider>
                    <ContentList />
                </ContentContextProvider>,
            ),
        );

        const list = getByTestId('content-list');
        console.log(list.children.length);

        expect(list.children).toHaveLength(5);
    });
});
