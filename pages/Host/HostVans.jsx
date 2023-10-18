import React, { Suspense } from "react"
import { Link, useLoaderData, defer, Await } from "react-router-dom"
import { getHostVans, deleteVan } from "../../api";
import { requireAuth } from "../../utils";
import EditHostVan from "./EditHostVan";
import '../../styles/hostVans.css'


export async function loader({ request }) {
    await requireAuth(request)
    return defer({ vans: getHostVans() })
}

export default function HostVans() {
    const dataPromise = useLoaderData()

    function renderVanElements(vans) {
        const hostVansEls = vans.map(van => (
            <Link
                to={van.id}
                key={van.id}
                className="host-van-link-wrapper"
            >
                <div className="host-van-single" key={van.id}>
                    <img src={van.imageUrl} alt={`Photo of ${van.name}`} />
                    <div className="host-van-info">
                        <h3>{van.name}</h3>
                        <p>${van.price}/day</p>
                    </div>
                    <Link to={`../editvan/${van.id}`} key={van.id} className="editButton">edit</Link>
                    <Link to={`.`} key={van.id} className="deleteButton"type="button" onClick={() => deleteVan(van.id)}>delete</Link>
                </div>
            </Link>
        ))
        return (
            <div className="host-vans-list">
                <section>
                    {hostVansEls}
                </section>
            </div>
        )
    }


    return (
        <section id="height-matched">
            <h1 className="host-vans-title">Your listed vans</h1>
            <Link to='../addVan' className="hostVanAddButton">Add Van</Link>
            <Suspense fallback={<h2>Loading vans...</h2>}>
                <Await resolve={dataPromise.vans}>
                    {renderVanElements}
                </Await>
            </Suspense>
        </section>
    )
}
