import { requireAuth } from "../../utils";
import { getVan } from "../../api";
import { db } from '../../api'
import {
    collection,
    doc,
    getDocs,
    updateDoc
}
    from "firebase/firestore/lite";
import { Form, useActionData, useLoaderData } from "react-router-dom"
import '../../styles/addEditVan.css'

export async function loader({ params, request }) {
    await requireAuth(request);
    return getVan(params.id)
}

export async function action({ request }) {
    try {
        const formData = await request.formData();
        const id = localStorage.getItem("vanId");
        const name = formData.get("name");
        const type = formData.get("type");
        const price = formData.get("price");
        const image = formData.get("image");
        const description = formData.get("description");
        const vanRef = doc(db, "vans", id);
        await updateDoc(vanRef, {
            name: name,
            type: type,
            price: price,
            imageUrl: image,
            description: description,
        });
        localStorage.removeItem("vanId");
        return 'Your van was successfully edited. Go to vans page'
    } catch (error) {
        console.info(`action error: `, error);
    }
}

export default function EditHostVan() {

    const currentVan = useLoaderData();
    const message = useActionData();
    localStorage.setItem("vanId", currentVan.id);
    return (
        <Form className="van-form" method="post" replace encType="multipart/form-data">
           <div className="wrapperDiv">
                <div className="input-group">
                    <h1>Edit your Van</h1>
                    {message && <h3>{message}</h3>}
                    <h3>Name</h3>
                    <input
                        name="name"
                        type="text"
                        defaultValue={currentVan.name}
                        required
                    />
                </div>

                <div className="input-group">
                    <h3>Type</h3>
                    <div id="radio">
                        <label>
                            <input type="radio" id="type" name="type"
                                value="simple" defaultChecked={"simple" === currentVan.type} required />
                            simple
                        </label>

                        <label>
                            <input type="radio" id="luxury" name="type"
                                value="luxury" defaultChecked={"luxury" === currentVan.type} required />
                            luxury
                        </label>

                        <label>
                            <input type="radio" id="rugged" name="type"
                                value="rugged" defaultChecked={"rugged" === currentVan.type} required />
                            rugged
                        </label>
                    </div>
                </div>

                <div className="input-group">
                    <h3>Price pro day</h3>
                    <input
                        name="price"
                        type="text"
                        placeholder="Enter the price"
                        defaultValue={currentVan.price}
                        required
                    />
                </div>

                <div className="input-group">
                    <h3>Image Url</h3>
                    <input type="text" name="image" defaultValue={currentVan.imageUrl} required />
                </div>

                <div className="input-group">
                    <h3>Description</h3>
                    <textarea name="description" rows={4} cols={40} defaultValue={currentVan.description} required />
                </div>

                <button className="submit-button">Edit your Van</button>
             </div>
        </Form>
    )

}