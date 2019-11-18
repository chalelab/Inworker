import firebase from 'firebase';

import _ from 'lodash';
import OfertModel from "../models/offert";
import { mapResponse } from '../utils/mapResponse';
import { getUserid } from './storage';

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
            const response = await this.offertsCollection.add({
                title: String(offert.title).toLowerCase(),
                active: true,
                userId: getUserid(),
                ...offert.toObject(),
                keywords: [
                    ...new Set(
                        [
                            '',
                            ...this.generateKeyWords(String(offert.title).toLowerCase()),
                            ...this.generateKeyWords(offert.price),
                        ]
                    )
                ]
            })
            console.log("create offert response", response);
            return mapResponse(true, response);
        } catch (error) {
            return mapResponse(false, error.message);
        }
    }

    generateKeyWords(offertName) {
        const arrName = [];
        let currName = '';
        _.split(offertName, " ").forEach(word => {
            // currName += letter;
            arrName.push(word);
        })
        _.split(offertName, "").forEach(letter => {
            currName += letter;
            arrName.push(currName);
        })
        return arrName;
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
    async searchOfferts(offertTitle) {
        try {
            const _oferts = []
            const _offert = await this.offertsCollection.where("keywords", "array-contains", String(offertTitle).toLowerCase()).get()
            _offert.forEach((r) => {
                const offertModel = new OfertModel({ id: r.id, ...r.data() })
                _oferts.push(offertModel);

            })
            console.log('_offerts', _oferts);
            return mapResponse(true, _oferts)
        } catch (error) {
            return mapResponse(false, error.message)

        }
    }
    async getMyOfferts() {
        try {
            const _oferts = []
            const _offert = await this.offertsCollection.where("userId", "==", getUserid()).get()
            _offert.forEach((r) => {
                const offertModel = new OfertModel({ id: r.id, ...r.data() })
                _oferts.push(offertModel);

            })
            console.log('findMyOfferts', _oferts);
            return mapResponse(true, _oferts)
        } catch (error) {
            return mapResponse(false, error.message)

        }
    }
}