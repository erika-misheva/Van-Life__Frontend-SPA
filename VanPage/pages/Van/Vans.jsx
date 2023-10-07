import React, { useState, useEffect } from 'react';
import { getVans } from "../../api"
import { Link, useSearchParams, useLoaderData } from 'react-router-dom';

export function loader (){
    return getVans();
}

export default function Vans() {
    
    const [searchParams, setSearchParams] = useSearchParams();
    const [error, setError] = React.useState(null);
    const vans = useLoaderData();

    
    const typeFilter = searchParams.get('type')

    const vansToDisplay = typeFilter ? vans.filter
    (van => van.type.toLowerCase() === typeFilter) : vans;

    const vanElements = vansToDisplay && vansToDisplay.map(van => (
        <Link id="van-link" to={`${van.id}`} 
        state={ {search: `?${searchParams.toString()}`,
        type: typeFilter }} key={van.id} >
            <div className="van-tile">
                <img src={van.imageUrl} />
                <div className="van-info">
                    <h3>{van.name}</h3>
                    <p>${van.price}<span>/day</span></p>
                </div>
                <i className={`van-type ${van.type} selected`}>{van.type}</i>
            </div>
        </Link>
    ));

    function handleFilterChange(key, value) {
        setSearchParams(prevParams => {
            if (value === null) {
                prevParams.delete(key)
            } else {
                prevParams.set(key, value)
            }
            return prevParams
        })
    }
  
    if (error) {
        return <h1>There was an error: {error}</h1>
    }
 
    return (
    
        <div className="van-list-container">
            <h1>Explore our van options</h1>
            <div className="van-list-filter-buttons">
                <button
                    onClick={() => handleFilterChange("type", "simple")}
                    className={`van-type simple ${typeFilter === "simple" ? "selected" : ""}`}
                >Simple</button>
                <button
                    onClick={() => handleFilterChange("type", "luxury")}
                    className={`van-type luxury ${typeFilter === "luxury" ? "selected" : ""}`}
                >Luxury</button>
                <button
                    onClick={() => handleFilterChange("type", "rugged")}
                    className={`van-type rugged ${typeFilter === "rugged" ? "selected" : ""}`}
                >Rugged</button>
              {
                typeFilter &&
                 <button
                 onClick={() => handleFilterChange("type", null)}
                 className="van-type clear-filters"
             >Clear filter</button>

              }  
               

            </div>
            <div className="van-list">
                {vanElements}
            </div>
        </div>
    );
}