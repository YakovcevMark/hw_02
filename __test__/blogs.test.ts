import {setupApp} from "../src/setup-app";
import express from "express";
import request from 'supertest'
import {HTTP_STATUS_CODES} from "../src/core/constants/http-status-codes";
import {BlogInputModel} from "../src/models/blogs/types/blog.input.model";
import {RoutePaths} from "../src/models/paths";
import {BlogViewModel} from "../src/models/blogs/types/blog.view.model";
import {validationMessages} from "../src/core/validation";

const blogCreate: BlogInputModel = {
    name: "blog Name",
    description: "blog description",
    websiteUrl: "https://google.com",
}
// jest.useFakeTimers({legacyFakeTimers:true})
describe(RoutePaths.blogs, () => {
    const app = express();
    let createdBlog: BlogViewModel | null = null;

    setupApp(app);

    const getAll = async () => await request(app).get(RoutePaths.blogs)

    beforeAll(async () => {
        await request(app).delete("/testing/all-data").expect(HTTP_STATUS_CODES.NO_CONTENT_204)
    });

    it('getAll', async () => {
        const resp = await getAll()
        expect(resp.status).toBe(HTTP_STATUS_CODES.OK_200)
        expect(resp.body).toStrictEqual([])
    })

    it('post', async () => {
        const resp = await request(app).post(RoutePaths.blogs).send(blogCreate)
        expect(resp.status).toBe(HTTP_STATUS_CODES.CREATED_201)
        expect(resp.body.name).toBe(blogCreate.name)
        expect(resp.body.description).toBe(blogCreate.description)
        expect(resp.body.websiteUrl).toBe(blogCreate.websiteUrl)
        createdBlog = resp.body;
        const all = await getAll()
        expect(all.status).toBe(HTTP_STATUS_CODES.OK_200)
        expect(all.body.length).toBe(1)
    })

    it('post with incorrect name:', async () => {
        const resp = await request(app).post(RoutePaths.blogs).send({...blogCreate, name: '             '})


        expect(resp.status).toBe(HTTP_STATUS_CODES.CLIENT_ERROR_400)
        expect(resp.body).toStrictEqual({
            errorsMessages: [
                {
                    field: 'name',
                    message: validationMessages.stringField
                },
                {
                    field: 'name',
                    message: validationMessages.stringMaxLength(15)
                }
            ]
        })
    })


    it('should get entity by id', async () => {
        const resp = await request(app).get(`${RoutePaths.blogs}${createdBlog?.id}`)
        expect(resp.status).toBe(HTTP_STATUS_CODES.OK_200)
        expect(resp.body).toStrictEqual(createdBlog)
    })

    it('should delete entity by id', async () => {
        await request(app).delete(`${RoutePaths.blogs}${createdBlog?.id}`).expect(HTTP_STATUS_CODES.NO_CONTENT_204)
    })

    it("shouldn't get entity by id after deleting", async () => {
        await request(app).get(`${RoutePaths.blogs}${createdBlog?.id}`).expect(HTTP_STATUS_CODES.NOT_FOUND_404)
    })
})