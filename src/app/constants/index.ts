export const BASE_URL = process.env.REACT_APP_BE_URL;
export const IMAGE_URL = process.env.REACT_APP_IMAGE_URL;

export const contentUrls = {
    getContent: (page) => `${BASE_URL}/data/page${page}.json`
}