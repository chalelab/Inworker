import * as firebaseServices from './firebase'

test('Servicio de login', async () => {
    expect(await firebaseServices.login()).toEqual({})
})

