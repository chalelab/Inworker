import { createUser, updateUserById, deleteUserById } from './firebase'
import { mapResponse } from '../utils/mapResponse'

test('Creacion', async () => {
    const r = await createUser()
    expect(r).toEqual(mapResponse(true, {}))
})
test('Actualizacion', async () => {
    const r = await updateUserById("123", {})
    expect(r).toEqual(mapResponse(true))
})
test('Eliminacion', async () => {
    const r = await deleteUserById("123", {})
    expect(r).toEqual(mapResponse(true))

})
