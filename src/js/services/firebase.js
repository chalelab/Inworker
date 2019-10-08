import { saveToken } from "./storage";
const apiKey = 'AIzaSyBePNpesPBLXP3BuAoAyq2C0hhByY7R5oU'
export const login = async (email, password) => {
    try {
        const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`
        const body = JSON.stringify({ email, password, returnSecureToken: true });
        const jsonResponse = await fetch(url, { method: 'POST', body })
        const response = await jsonResponse.json()
        if (response.idToken) {
            return { success: true, res: response }
        } else {
            return { success: false, res: traslateFirebaseMessageError(response.error.message) }

        }
    } catch (error) {
        return { success: false, res: error.message }
    }
}
export const signup = async (email, password) => {
    try {
        const url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${apiKey}`
        const body = JSON.stringify({ email, password, returnSecureToken: true });
        const jsonResponse = await fetch(url, { method: 'POST', body })
        const response = await jsonResponse.json()
        if (response.idToken) {
            return { success: true, res: response }
        } else {
            return { success: false, res: traslateFirebaseMessageError(response.error.message) }

        }
    } catch (error) {
        return { success: false, res: error.message }
    }
}
export const signout = () => {
    return saveToken('');
}
export const passwordRecovery = async (email) => {
    try {
        const url = `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${apiKey}`
        const body = JSON.stringify({ email, requestType: "PASSWORD_RESET" });
        const jsonResponse = await fetch(url, { method: 'POST', body })
        const response = await jsonResponse.json()
        if (response.email) {
            return { success: true, res: response }
        } else {
            return { success: false, res: traslateFirebaseMessageError(response.error.message) }

        }
    } catch (error) {
        return { success: false, res: error.message }
    }
}

export function traslateFirebaseMessageError(errorMessage) {
    switch (errorMessage) {
        case 'EMAIL_NOT_FOUND':
            return 'El correo ingresado no existe';
        case 'INVALID_PASSWORD':
            return 'Contraseña incorrecta, intenta nuevamente'
        default:
            return errorMessage;
    }
}