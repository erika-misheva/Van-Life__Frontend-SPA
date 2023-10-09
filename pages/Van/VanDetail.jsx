import React, { Suspense } from "react";
import { Link, useLocation, useLoaderData, defer, Await } from "react-router-dom";
import { getVan} from "../../api";

export function loader({ params }) {
    return defer({ van: getVan(params.id) })
}
export default function VanDetail() {
    const vanPromise = useLoaderData();
    const location = useLocation();


    const search = location.state?.search || ""
    const type = location.state?.type || "all"

    function renderVanElement(van) {
        console.log(van);
        return (
            <div className="van-detail-container">
                <Link
                    to={`..${search}`}
                    relative='path'
                    className="back-button"
                >&larr; <span>Back to {type} vans</span></Link>
                {van ? (
                    <div className="van-detail">
                        <img src={van.imageUrl} />
                        <i className={`van-type ${van.type} selected`}>{van.type}</i>
                        <h2>{van.name}</h2>
                        <p className="van-price"><span>${van.price}</span>/day</p>
                        <p>{van.description}</p>
                        <button className="link-button">Rent this van</button>
                    </div>
                ) : <h2>Loading...</h2>}
            </div>
        )
    }

    return (
           <>
           <Suspense fallback="Loading...">
            <Await resolve={vanPromise.van}>
                {renderVanElement}
            </Await>
           </Suspense>
           </>
    )
}