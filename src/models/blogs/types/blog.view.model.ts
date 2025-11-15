import {BlogInputModel} from "./blog.input.model";
import {RequestEntityId} from "../../../core/types";

export type BlogViewModel = BlogInputModel & RequestEntityId & {
    createdAt: string;
    isMembership: boolean;
};