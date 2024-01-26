import React, { useEffect } from 'react'

import Productos from '../util/Products.json';
import {ProductoPresent, AllProducts} from './ProductosEnchant'

import '../css/Productos.css';

function Mayus1(cadena = '') {
    return cadena.charAt(0).toUpperCase() + cadena.slice(1);
}




//AL INICIAR DESDE CERO

function Index({ Usize }) {
    const newArray = AllProducts;

    return (
        <>
            <h1 className='title'>
                Bienvenidos a Bizcotini
            </h1>
            <article className='ArrayArticulos'>
                {/* listado de productos */}
                {
                    newArray && newArray.map((obj, i) => {
                        return (
                            <article key={i}>
                                <ProductoPresent obj={obj} />
                            </article>
                        )
                    })
                }
            </article>
        </>
    )
}

function PorCategoria({ categoria, Usize }) {

    const ArrayProduct = Object.values(Productos[categoria]);

    useEffect(() => {

    }, [])




    return (
        <>
            <h1 className='title'>
                {Mayus1(categoria)}
            </h1>

            <article className='ArrayArticulos'>
                {/* Listado de productos recientes y para atraer al público */}
                {
                    ArrayProduct && ArrayProduct.map((obj, i) => {
                        
                        return (
                            <ProductoPresent obj={obj} key={i} />
                        )
                    })
                }
            </article>
        </>
    )
}

export {
    PorCategoria, Index
};