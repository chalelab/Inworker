import ServiceService from './service'
import { ServiceModel } from '../models'
import { mapResponse } from '../utils/mapResponse'

let serviceService = new ServiceService()

beforeEach(() => {
    serviceService = new ServiceService()
})

test('Creacion de ofertas', async () => {
    const service = new ServiceModel({});
    const resul = await serviceService.createService(service);
    expect(resul).toEqual(mapResponse(true,))
})


test("Actualizacion", async () => {
    const service = new ServiceModel({})
    const resul = await serviceService.updateService(service);
    expect(resul).toEqual(mapResponse(true,"ok"))
})

test("Eliminado", async () => {
    const service = new ServiceModel({})
    const resul = await serviceService.deleteService(service);
    expect(resul).toEqual(mapResponse(true,"ok"))

})

