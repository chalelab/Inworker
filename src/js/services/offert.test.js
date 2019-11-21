import OffertService from './offerts'
import { OfertModel } from '../models'
import { mapResponse } from '../utils/mapResponse'

let offertService = new OffertService()

beforeEach(() => {
    offertService = new OffertService()
})

test('Creacion de ofertas', async () => {
    const offert = new OfertModel({});
    const resul = await offertService.createOffert(offert);
    expect(resul).toEqual(mapResponse(true, {}))
})


test("Actualizacion", async () => {
    const offert = new OfertModel({})
    const resul = await offertService.updateOffert(offert);
    expect(resul).toEqual(mapResponse(true, "ok"))
})

test("Eliminado", async () => {
    const offert = new OfertModel({})
    const resul = await offertService.deleteOffert(offert);
    expect(resul).toEqual(mapResponse(true, "ok"))

})

