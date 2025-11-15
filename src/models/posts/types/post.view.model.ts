import {PostInputModel} from "./post.input.model";

export type PostViewModel = PostInputModel & {
    id: string
    blogName: string
    createdAt: string;
}