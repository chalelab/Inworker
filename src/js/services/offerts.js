import firebase from 'firebase';


import OfertModel from "../models/offert";
import { mapResponse } from '../utils/mapResponse';

export default class OffertService {

    constructor() {
        this.offertsCollection = firebase.firestore().collection('ofertas')
    }
    /**
     * 
     * @param {OfertModel} offert 
     */
    async createOffert(offert) {
        try {
            const response = await this.offertsCollection.add(offert.toObject())
            console.log("create offert response", response);
            return mapResponse(true, response);
        } catch (error) {
            return mapResponse(false, error.message);
        }
    }


    /**
     * 
     * @param {OfertModel} offert 
     */
    async updateOffert(offert) {
        try {
            const _offert = this.offertsCollection.doc(offert.id)
            await _offert.set(offert.toObject(), { merge: true })
            const response = await this.offertsCollection.add(offert)
            console.log("create offert response", response);
            return mapResponse(true, response)
        } catch (error) {
            return mapResponse(false, error.message)

        }
    }
}