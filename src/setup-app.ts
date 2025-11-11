import express, {Express} from "express";
import {HTTP_STATUS_CODES} from "./core/constants/http-status-codes";
import {blogsRepository} from "./models/blogs/repository";
import {postsRepository} from "./models/posts/repository";
import {RoutePaths} from "./models/paths";
import {blogsRouter} from "./models/blogs/routes";
import {postsRouter} from "./models/posts/routes";

export const setupApp = (app: Express) => {
    app.use(express.json()); // middleware для парсинга JSON в теле запроса
    app.use(RoutePaths.blogs, blogsRouter)
    app.use(RoutePaths.posts, postsRouter)
    // основной роут
    app.get("/", (req, res) => {
        res.status(200).send("Hello world!");
    });

    app.delete("/testing/all-data", (req, res) => {
        postsRepository.clearDB()
        blogsRepository.clearDB()
        res.sendStatus(HTTP_STATUS_CODES.NO_CONTENT_204)
    });

    return app;
};