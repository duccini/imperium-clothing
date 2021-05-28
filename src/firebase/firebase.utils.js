import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyAYCVFKwuTIrDEKEP5Ng1-mk117EwMbloQ",
  authDomain: "imperium-db.firebaseapp.com",
  projectId: "imperium-db",
  storageBucket: "imperium-db.appspot.com",
  messagingSenderId: "295960608631",
  appId: "1:295960608631:web:7acfa1c0de4e03e2fb6b72"
};

/**
 * Firestore Lib retorna um dos 2 tipos de objs: QueryReference ou QuerySnapshot
 * 
 * QueryReference -> é um obj que representa o lugar atual do dado. Ele não possui
 * realmente o atual dado, em vez disso tem prop que mostram detalhes dos dados e
 * metodos para chamar o querysnapshot
 * 
 * QuerySnaphot -> obj que possui os dados da query [.get()]
 * 
 * We use documentRef obj to perform our CRUD methods
 * The documentRef methods are: .set(), .get(), .update and .delete() repectively
 * 
 * collectionRef has the .add() method -> collectionRef.add({value: prop})
 * 
 * We get the snapshotObject from referenceObj using .get() method
 * documentRef.get() or collectionref.get()
 * 
 * documentRef returns a documentSnapshot object
 * collectionRef returns a querySnapshot object
 */

export const createUserProfile = async (userAuth, additionData) => {
  if(!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`)
  const snapshot = await userRef.get()

  if(!snapshot.exists) {
    const { displayName, email } = userAuth
    const createdAt = new Date()

    /**
     * como o id é o mesmo do authentification se grava sem explicitar o id ??
     */

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionData
      })
    } catch(error) {
      console.log('error creating user', error.message)
    }
  }

  return userRef
  
}


firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
