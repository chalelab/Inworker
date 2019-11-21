import firebase from 'firebase';

import _ from 'lodash';
import { OfertModel, CommentModel } from "../models";
import { mapResponse } from '../utils/mapResponse';
import { getUserid } from './storage';

export default class CommentService {

    constructor() {
        this.commentsCollection = firebase.firestore().collection('comentarios')
    }
    /**
     * 
     * @param {CommentModel} commentModel 
     */
    async createComment(commentModel) {
        try {
            delete commentModel.id;
            const response = await this.commentsCollection.add({
                ...commentModel
            })
            console.log("create comment response", response);
            return mapResponse(true, response);
        } catch (error) {
            return mapResponse(false, error.message);
        }
    }



    /**
     * 
     * @param {OfertModel} offert 
     */
    async updateComment(offert) {
        try {
            const _offert = this.commentsCollection.doc(offert.id)
            await _offert.set(offert.toObject(), { merge: true })
            return mapResponse(true, "ok")
        } catch (error) {
            return mapResponse(false, error.message)

        }
    }

    /**
     * 
     * @param {OfertModel} offert 
     */
    async deleteComment(offert) {
        try {
            const _offert = this.commentsCollection.doc(offert.id)
            await _offert.delete()
            return mapResponse(true, "ok")
        } catch (error) {
            return mapResponse(false, error.message)

        }
    }
    /**
     * 
     * @param {OfertModel} offertModel 
     */
    async getComments(offertModel) {
        try {
            const _coments = []
            const _result = await this.commentsCollection.where("offertId", "==", offertModel.id).get()
            _result.forEach((r) => {
                const offertModel = new CommentModel({ ...r.data(), id: r.id,  })
                _coments.push(offertModel);

            })
            console.log('get comments', _coments);
            return mapResponse(true, _coments)
        } catch (error) {
            return mapResponse(false, error.message)

        }
    }
}