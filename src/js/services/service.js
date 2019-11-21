import firebase from 'firebase';

import _ from 'lodash';
import { ServiceModel, OfertModel } from "../models";
import { mapResponse } from '../utils/mapResponse';
import { getUserid } from './storage';

export default class ServiceService {

    constructor() {
        this.serviciosCollection = firebase.firestore().collection('servicios')
    }
    /**
     * 
     * @param {ServiceModel} service 
     */
    async createService(service) {
        try {
            const response = await this.serviciosCollection.add({
                ...service
            })
            console.log("create service response", response);
            return mapResponse(true, response);
        } catch (error) {
            return mapResponse(false, error.message);
        }
    }




    /**
     * 
     * @param {ServiceModel} service 
     */
    async updateService(service) {
        try {
            const _offert = this.serviciosCollection.doc(service.id)
            await _offert.set({ title: service.title, price: service.price }, { merge: true })
            return mapResponse(true, "ok")
        } catch (error) {
            return mapResponse(false, error.message)

        }
    }

    /**
     * 
     * @param {OfertModel} offert 
     */
    async deleteService(offert) {
        try {
            const _offert = this.serviciosCollection.doc(offert.id)
            await _offert.delete()
            return mapResponse(true, "ok")
        } catch (error) {
            return mapResponse(false, error.message)

        }
    }
    async searchOfferts(offertTitle) {
        try {
            const _oferts = []
            const _offert = await this.serviciosCollection.where("keywords", "array-contains", String(offertTitle).toLowerCase()).get()
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
    async getMyServices() {
        try {
            const _services = []
            const _serviceRes = await this.serviciosCollection.where("userId_own", "==", getUserid()).get()
            _serviceRes.forEach((r) => {
                const offertModel = new ServiceModel({ ...r.data(), id: r.id, })
                _services.push(offertModel);
            })
            console.log('get my services', _services);
            return mapResponse(true, _services)
        } catch (error) {
            return mapResponse(false, error.message)

        }
    }
}