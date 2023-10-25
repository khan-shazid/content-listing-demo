import { cleanup } from '@testing-library/react';
import { BASE_URL } from 'app/constants';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { fetchContent } from './content-service';

jest.mock('app/constants', () => ({
    BASE_URL: 'https://test.create.diagnal.com',
    contentUrls: {
        getContent: (page) => `https://test.create.diagnal.com/data/page${page}.json`
    }
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
            ],
        },
    },
};


afterEach(() => {
    mock.reset();
    cleanup();
});

describe('Content List Service Test', () => {
    it('Test 01 - Service is responding with properly formatted data', async () => {
        console.log(BASE_URL + '/data/page1.json')
        mock.onGet(BASE_URL + '/data/page1.json').reply(200, response);
        const result = await fetchContent(1);

        expect(result).toMatchObject({
            success: true,
            title: 'Romantic Comedy',
            contents: [{
                id: expect.any(Number),
                name: 'The Birds',
                'poster-image': 'poster1.jpg'
            }],
            pagination: {
                page: '1',
                size: '20',
                currentPageSize: '20',
                total: '54',
            }
        })
        console.log(result);
    });
});
