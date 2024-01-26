import Productos from '../util/Products.json';

import React, { useState, useContext, useEffect } from 'react';

/**
 * Componentes
 */
import CarritoCtx from '../components/context/CarritoContx.jsx';
import ScrollHandler from '../components/ScrollHandler.js';

/**
 * 
 * ICONS
 * 
 */
import { FaBookmark } from "react-icons/fa";//sin
import { GoBookmark } from "react-icons/go";//con

import { CiShoppingCart } from "react-icons/ci"; //sin
import { IoIosCart } from "react-icons/io"; //con

import { FaInfoCircle } from "react-icons/fa";//true
import { CiCircleInfo } from "react-icons/ci";//false

import { FiAlertTriangle } from "react-icons/fi";


const AllProducts = Productos.gride.disponibles.map(obj => Productos[obj]).flat();

const productExample = {
    name: '',
    id: 0,
    precio: 1000,
    description: '',
    nota: '',
    img: '',
    tags: []
}


/**
 * 
 * 
 * 
 * Enchanted
 * 
 * 
 * 
 */

function Interacciones({ Producto, setEmergente, emergente }) {

    const { boolFav, adddelFav, boolCarro, adddelCarro } = useContext(CarritoCtx);

    return (
        <div className='interacciones'>

            {/** Favoritos **/}
            <button className='btn'
                onClick={() => { adddelFav(Producto.id) }}>
                {
                    boolFav(Producto.id) ? <FaBookmark /> : <GoBookmark />
                }
            </button>
            {/** Carro **/}
            <button className='btn'
                onClick={() => { adddelCarro(Producto.id) }}>
                {
                    boolCarro(Producto.id) ? <IoIosCart /> : <CiShoppingCart />
                }
            </button>

            {/** Info **/}
            <button className='btn btnInfo' onClick={() => { setEmergente(!emergente) }}>
                {
                    emergente ? <FaInfoCircle /> : <CiCircleInfo />
                }
            </button>
        </div>
    )
}

function EmergenteUl({ Producto = [{}] }) {

    return (
        <div className='aux'>
            <ScrollHandler ULclassName={'tags'}>
                {
                    Producto.tags ? Producto.tags.map((objetoLocal, i) => (
                        <li key={i}> {objetoLocal} </li>
                    )) : <abbr> Tags Error </abbr>
                }
            </ScrollHandler>
        </div>
    )
}

function ReturnTags(tags = []) {
    const TagsQueInteractuan = ["multysabores", "vegetariano", "vegano"];

    const tagsFilter = tags.filter(tag => TagsQueInteractuan.includes(tag)).join(' ');

    return tagsFilter;
}

/**
 * 
 *  MAIN
 * 
 * 
 * @param {any} param0 
 * @returns <bonito />
 * 
 * 
 */
function ProductoPresent({ obj: Producto = productExample }) {

    const [emergente, setEmergente] = useState(false);

    return (
        <>
            <article className={`producto ${ReturnTags(Producto.tags || [])}`}>
                <div className='emergente'>
                    {
                        emergente && <EmergenteUl Producto={Producto} />
                    }
                </div>


                <h2> {Producto.name ? Producto.name : 'Error en Nombre'} </h2>
                <div className='img'>
                    {
                        Producto.img ? <img alt={Producto.name} src={Producto.img} /> : <abbr>ERROR Foto</abbr>
                    }
                </div>
                <p className='desc'> {Producto.description ? Producto.description : 'Error Descripcion'} </p>


                <p className='precio'> ${Producto.precio ? Producto.precio : 'Error precio'} </p>


                <Interacciones
                    Producto={Producto}
                    setEmergente={setEmergente}
                    emergente={emergente}
                />
            </article>
        </>
    )
}

/**
 *
 * 
 *  
 * 
 * 
 * Para Editar el MFU (MoreForUser)
 * 
 * 
 * 
 * 
 * 
 * 
 * @param {*} param0 
 * @returns 
 */

const TextADDNota =
    (
        <div>
            <h3>¿Desea añadir alguna nota?</h3>
            <p>podría ser por ejemplo: que sea vegano, sin tacc, etc. <br />
                <FiAlertTriangle /> podría cobrarse más por eso </p>
        </div>
    )

function ProductoPresentEdit({ obj: Producto = productExample }) {
    const { MoreForUserID, MoreForUser, editMoreForUser } = useContext(CarritoCtx);

    const defUNota = {
        id: Producto.id,
        nota: '',
        n: 1
    }
    const [UNota, setUNota] = useState(MoreForUserID(Producto.id) || defUNota);
    const [notaPrecioMayor, setNotaPrecioMayor] = useState(false);

    useEffect(() => {
        editMoreForUser(
            {
                ...UNota,
                id: Producto.id
            }
        );

        ColorN((UNota.n >= 1 && UNota.n <= 90)) //true {1,90} || false

        setNotaPrecioMayor(UNota.n > 90);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [UNota])

    const ColorN = (BoolValue = true) => {
        const InputN = document.getElementById(`cantidad${Producto.id}`);

        const corTrue = 'rgb(109, 235, 98)';
        const corFalse = 'rgb(252, 2, 2)';

        if (InputN) {
            if (BoolValue) {
                InputN.style.backgroundColor = corTrue;
                InputN.style.color = 'black';
            } else {
                InputN.style.backgroundColor = corFalse;
                InputN.style.color = 'white';
            }
        }
    };

    const handleChange = (e => {
        const { name, value } = e.target;

        setUNota(prevUNota => (
            {
                ...prevUNota,
                [name]: value
            }
        ));
    })


    /**
     * 
     * @returns Precio: number
     */
    const CalcularPrecio = () => {
        const precioFinal = Producto.precio * UNota.n;

        const numberString = String(precioFinal).replace(/\s/g, '');

        // Aplicar el formato con espacios cada tres lugares desde la derecha
        const numberDecorado = numberString.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');


        return numberDecorado;
    };

    return (
        <article className='productoEdit'>
            <form
                onChange={e => {
                    e.preventDefault();

                    handleChange(e);
                }}>
                {TextADDNota}

                <div>
                    <label htmlFor={`nota${Producto.id}`}>Añadir nota: </label>


                    <textarea
                        id={`nota${Producto.id}`}
                        name='nota'
                        style={{ resize: 'none' }}
                        defaultValue={UNota.nota} />
                </div>

                <div>
                    <label htmlFor={`cantidad${Producto.id}`}>Cuanta cantidad desea:</label>
                    <div>
                        <input
                            type='number'
                            name='n'
                            id={`cantidad${Producto.id}`}
                            defaultValue={UNota.n}
                        />

                        <div>
                            ${CalcularPrecio() || Producto.precio} <abbr style={{ fontSize: '.9rem' }}>(estimado)</abbr>
                        </div>

                    </div>

                </div>
                {
                    notaPrecioMayor &&
                    (
                        <>
                            <div className='PrecioMayor'>
                                <FiAlertTriangle />  Monto superado, si realmente necesita, se tendrá que dar aviso por whatsapp </div>
                        </>
                    )
                }

                {
                    false &&
                    <div>
                        {JSON.stringify(UNota)}
                        <br />
                        {JSON.stringify(MoreForUser)}
                    </div>
                }
            </form>
        </article>
    )
}

export {
    AllProducts, ProductoPresent, productExample, ProductoPresentEdit
}

export default ProductoPresent