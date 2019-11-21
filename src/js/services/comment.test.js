import CommentService from './comments'
import { CommentModel } from '../models'
import { mapResponse } from '../utils/mapResponse'

let commentService = new CommentService()

beforeEach(() => {
    commentService = new CommentService()
})

test('Creacion', async () => {
    const comment = new CommentModel({id:""});
    const resul = await commentService.createComment(comment);
    expect(resul).toEqual(mapResponse(true))
})


test("Actualizacion", async () => {
    const comment = new CommentModel({})
    const resul = await commentService.updateComment(comment);
    expect(resul).toEqual(mapResponse(true,"ok"))
})

test("Eliminado", async () => {
    const comment = new CommentModel({})
    const resul = await commentService.deleteComment(comment);
    expect(resul).toEqual(mapResponse(true,"ok"))

})

