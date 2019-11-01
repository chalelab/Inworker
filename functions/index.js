const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp()

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

const userCollectionRef = admin.firestore().collection('usuarios');


exports.onUserRegister = functions.auth.user().onCreate(async (user, event) => {
  const { email, uid = '', passwordSalt = '' } = user;
  const data = {
    email,
    uid,
    passwordSalt

  }
  console.log(data)
  try {
    const userDocRef = await userCollectionRef.add(data)
    console.log({ success: true, res: 'usuario creado!' });
  } catch (error) {
    console.log({ success: false, ress: error.message });
  }
})

exports.updateUser = functions.https.onRequest(async (request, res) => {
  console.log('Method', request.method)
  const { method } = request;
  if (method == 'POST') {
    const { uid, name } = request.body;
    console.log('uid',uid)
    userCollectionRef.listDocuments().then(l=>{
      admin.firestore().getAll(l).then((docs)=>{
        for (const iterator of docs) {
          console.log(iterator.id,iterator.data())
          
        }
      })
    })
    userCollectionRef.where("iud", "==", uid).get()
    .then((q)=>{
      // console.log(q.docs)
    })
    
    res.send('ok')

  }else {
    res.send('Metodo no declarado')
  }



})

