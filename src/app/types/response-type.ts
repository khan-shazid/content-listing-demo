import { Content } from "./content-type";
import { Pagination } from "./pagination-type";

export type GetContentResponse = {
    success: boolean;
    title?: "";
    contents?: Content[];
    pagination?: Pagination;
}