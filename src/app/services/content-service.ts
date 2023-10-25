import { contentUrls } from "app/constants";
import { GetContentResponse } from "app/types/response-type";
import { generateRandom } from "app/utils";
import axios from "axios";



export async function fetchContent(page: number): Promise<GetContentResponse> {
    try {
        const result = await axios.get(contentUrls.getContent(page));
        return ({
            success: true,
            title: result.data.page['title'],
            contents: result.data.page['content-items'].content.map((item) => ({ id: generateRandom(), ...item })),
            pagination: {
                page: result.data.page['page-num-requested'],
                size: result.data.page['page-size-requested'],
                currentPageSize: result.data.page['page-size-returned'],
                total: result.data.page['total-content-items'],
            }
        });
    } catch (e) {
        return ({
            success: false
        })
    }
}