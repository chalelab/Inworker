import firebase from 'firebase';

export function saveToken(token) {
    sessionStorage.setItem('token', token);
}
export function saveUserid(userID) {
    sessionStorage.setItem('userId', userID);
}

export function saveUserInfo({ email, avatar, }) {
    const data = JSON.stringify({
        email,
        avatar
    })
    sessionStorage.setItem('user-info', data);
}

export function getUserInfo() {
    const data = sessionStorage.getItem('user-info');
    const { email, avatar } = JSON.parse(data)
    return {
        email,
        avatar,
    }
}

export function getUserid() {
    return sessionStorage.getItem('userId');
}


export function getToken() {
    return sessionStorage.getItem('token');
}

export async function uploadFileToFirebase(file) {
    const imagesRef = firebase.storage().ref('images/').child(`${Date.now()}-${file.name}`)
    return new Promise((resolve, reject) => {
        imagesRef.put(file)
            .then(async (res) => {
                const urlDownload = await res.ref.getDownloadURL()
                console.log('res', urlDownload);
                setTimeout(() => {
                    resolve({
                        success: true,
                        res: {
                            url: urlDownload
                        }
                    })
                }, 2000)
            })
            .catch(err => reject({
                success: false,
                res: err.message
            }))

    })
}

