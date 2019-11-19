import firebase from 'firebase';
import { saveToken, saveUserid, getUserid, saveUserInfo } from "./storage";
const apiKey = 'AIzaSyBePNpesPBLXP3BuAoAyq2C0hhByY7R5oU';


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
export const changeEmail = async ({email,id}) => {
    try {
        const url = `https://identitytoolkit.googleapis.com/v1/accounts:update?key=${apiKey}`
        const body = JSON.stringify({ email, returnSecureToken: true,idToken:id });
        const jsonResponse = await fetch(url, { method: 'POST', body })
        const response = await jsonResponse.json()
        console.log('change email',response)
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
    saveUserid('')
    saveUserInfo({})
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

export async function updateUser({ name, avatar ,email}) {

    try {
        saveUserInfo({avatar,email})
        const usersCol = firebase.firestore().collection('usuarios');
        const userCollection = usersCol.doc(getUserid())
        const _users = await userCollection.set({ avatar }, { merge: true })
        return { success: true, res: _users };
    }  catch (error) {
      console.log('error get users', error.message);
      return { success: false, res: error.message };
  }
}

/**
 * @returns {{res:[{email:String,id:String}],success:Boolean}}}
 */
export async function getUsers() {
    try {
        const userCollection = firebase.firestore().collection('usuarios')
        const _users = await userCollection.get()
        const users = [];
        _users.forEach(doc => {
            const docData = doc.data()
            users.push({ email: docData.email, id: doc.id,name:docData.name })

        })
        console.log(users);
        return { success: true, res: users };


    } catch (error) {
        console.log('error get users', error.message);
        return { success: false, res: error.message };
    }

}


export async function getUser() {
    try {
        const id = getUserid()
        const userCollection = firebase.firestore().collection('usuarios').doc(id)
        const _users = await userCollection.get()
        saveUserInfo({
            email:_users.data().email,
            avatar:_users.data().avatar
        })}
        catch (error) {
          console.log('error get users', error.message);
          return { success: false, res: error.message };
      }
    }
/**

 */
export async function getUserById(id) {
    try {
        const userCollection = firebase.firestore().collection('usuarios').doc(id)
        const _users = await userCollection.get()
        return { success: true, res: _users.data() };

    } catch (error) {
        console.log('error get users', error.message);
        return { success: false, res: error.message };
    }

}
export async function updateUserById(id,{name}) {
    try {
        const userCollection = firebase.firestore().collection('usuarios').doc(id)
        const _users = await userCollection.update({name})
        return { success: true, res: _users };

    } catch (error) {
        console.log('error get users', error.message);
        return { success: false, res: error.message };
    }

}

