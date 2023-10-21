
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {
  getFirestore,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
  deleteDoc
  

}
  from "firebase/firestore/lite";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_APP_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_APP_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_APP_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_FIREBASE_APP_ID
};


export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

const vansCollectionRef = collection(db, "vans")

export async function getVans() {
  const querySnapshot = await getDocs(vansCollectionRef)
  const dataArr = querySnapshot.docs.map(doc => ({
    ...doc.data(),
    id: doc.id
  }))
  return dataArr;
}

export async function getVan(id) {
  const docRef = doc(db, "vans", id)
  const vanSnapshot = await getDoc(docRef);
  return {
    ...vanSnapshot.data(),
    id: vanSnapshot.id
  }
}

export async function getHostVans() {
  return new Promise(async (resolve, reject) => {
    try {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
          const uid = user.uid;
          const q = query(vansCollectionRef, where("uid", "==", uid));
          getDocs(q)
            .then((querySnapshot) => {
              const dataArr = querySnapshot.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id,
              }));
              resolve(dataArr);
            })
            .catch((error) => {
              reject(error);
            });
        } else {
          resolve([]);
        }
        unsubscribe();
      });
    } catch (error) {
      reject(error);
    }
  });
}

export async function deleteVan(id){
  await deleteDoc(doc(db, "vans", id));
}
