import { Form, useActionData } from "react-router-dom";
import { db } from '../../api'
import {
    collection,
    doc,
    getDocs,
    setDoc
}
from "firebase/firestore/lite";
import { validateInputs } from "../../utils";
import '../../styles/addEditVan.css'

export async function action({ request }) {
    try {
        const vansCollectionRef = collection(db, "vans")
        const querySnapshot = await getDocs(vansCollectionRef)
        const dataArrLength = querySnapshot.docs.length;
        const uid = localStorage.getItem('userId');
        const formData = await request.formData();
        const name = formData.get("name");
        const type = formData.get("type");
        const price = formData.get("price");
        const image = formData.get("image");
        const description = formData.get("description");
        const nextVanId = (dataArrLength + 1).toString();
        const validateIput = await validateInputs(price);
       if (validateIput) {
            await setDoc(doc(db, 'vans', nextVanId), {
                name: name,
                type: type,
                price: price,
                imageUrl: image,
                description: description,
                uid: uid
            })
        } else {
          return "The price must be number. Try again"
        }
        return "Succesfully created new Van! To see your van go to Vans Page"
    } catch (error) {
        console.info(`action error: `, error);
        return error.message;
    }
}

export default function AddHostVan() {
    const message = useActionData();
    return (
        <Form className="van-form" method="post" replace encType="multipart/form-data">
            <div className="wrapperDiv">
            <h1>Add Van</h1>
            {message && <h2>{message}</h2>}
            <div className="input-group">
                <h3>Name</h3>
                <input
                    name="name"
                    type="text"
                    required
                />
            </div>
        
            <div className="input-group">
            <h3>Type</h3>
            <div id="radio">
            <label>
                <input type="radio" name="type" value="simple" required />
                simple
            </label>
      
            <label>
                <input type="radio" name="type" value="luxury" required />
                luxury
            </label>

            <label>
                <input type="radio" name="type" value="rugged" required />
                rugged
            </label>
            </div>
            </div>

            <div className="input-group">
            <h3>Price pro day</h3>
            <p>You must enter a number</p>
            <input
                name="price"
                type="text"
                required
            />
            </div>

            <div className="input-group">
            <h3>Image Url</h3>
            <input type="text" name="image" required />
            </div>

            <div className="input-group">
            <h3>Description</h3>
            <textarea name="description" rows={4} cols={40} required/>
            </div>

            <button className="submit-button">Create Van</button>
            </div>
        </Form>
    );
}

