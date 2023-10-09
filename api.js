
import { initializeApp } from "firebase/app";
import { getFirestore, collection, doc, getDoc, getDocs, query, where } from "firebase/firestore/lite";

const firebaseConfig = {
  apiKey: "AIzaSyA_lV9CrRKRFtymzGyOtoYNplqdsexNjMo",
  authDomain: "vanlife-1025a.firebaseapp.com",
  projectId: "vanlife-1025a",
  storageBucket: "vanlife-1025a.appspot.com",
  messagingSenderId: "467847111512",
  appId: "1:467847111512:web:ae927e84bed2e86fd03b2d"
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const vansCollectionRef = collection(db, "vans")

export async function getVans() {
    const querySnapshot = await getDocs(vansCollectionRef)
    const dataArr = querySnapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
    }))
    return dataArr;
}

export async function getVan(id){
    const docRef = doc(db, "vans", id)
    const vanSnapshot = await getDoc(docRef);
    return {
        ...vanSnapshot.data(),
        id: vanSnapshot.id
    }
}

export async function getHostVans() {
    const q = query(vansCollectionRef, where("hostId", "==", "123"))
    const querySnapshot = await getDocs(q)
    const dataArr = querySnapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
    }))
    return dataArr
}


// export async function getHostVans(id) {
//     const url = id ? `/api/host/vans/${id}` : "/api/host/vans"
//     const res = await fetch(url)
//     if (!res.ok) {
//         throw {
//             message: "Failed to fetch vans",
//             statusText: res.statusText,
//             status: res.status
//         }
//     }
//     const data = await res.json()
//     return data.vans
// }

export async function loginUser(creds) {
    const res = await fetch("/api/login",
        { method: "post", body: JSON.stringify(creds) }
    )
    const data = await res.json()

    if (!res.ok) {
        throw {
            message: data.message,
            statusText: res.statusText,
            status: res.status
        }
    }

    return data
}