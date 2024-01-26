import React, { useContext, useState } from 'react';

import CarritoCtx from '../components/context/CarritoContx.jsx';
import ProductoEnchant, { AllProducts, ProductoPresentEdit } from './ProductosEnchant';

import errMarket from '../components/error/ErrorMarket.js';

function FavoritosPage() {
    const { boolFav } = useContext(CarritoCtx);

    const newElements = AllProducts.filter(elem => boolFav(elem.id));

    return (
        <>
            <h1 className='ctr title'>Favoritos</h1>
            <h3> ¿desea tentarse con alguno de estos productos? </h3>

            <article className='ArrayArticulos'>
                {
                    newElements && newElements.map((obj, i) => <ProductoEnchant obj={obj} key={i} />)
                }
            </article>
        </>
    )
}

function CarritoPage() {
    const { boolCarro, ResetCarro, MoreForUser } = useContext(CarritoCtx);

    const ArrayCarrito = AllProducts.filter(elem => boolCarro(elem.id));

    const [AuxElements, setAuxElements] = useState(false);

    async function copiarAlPortapapeles(texto) {
        const errInstance = new errMarket(MoreForUser);

        try {
            await navigator.clipboard.writeText(texto);
            console.log(`Texto copiado al portapapeles: ${texto}`);
        } catch (err) {
            console.error('Error al copiar al portapapeles:', err);
            errInstance.Copy();
            setAuxElements(true);
        }
    }

    const handleSend = () => {

    }

    const handleCopy = () => {
        const paraCopiar = JSON.stringify(MoreForUser) || 'Error';

        copiarAlPortapapeles(paraCopiar);
    }

    const handleEliminar = () => {
        if (window.confirm('¿Realmente quieres eliminar todo?')) ResetCarro();
    }

    return (
        <>
            <section>
                <h1 className='ctr title'>Carrito</h1>
                <div className='CarritoBtns'>
                    <button onClick={handleSend}>
                        Enviar
                    </button>
                    <button onClick={handleCopy}>
                        Copiar
                    </button>
                    <button onClick={handleEliminar}>
                        Eliminar todo
                    </button>
                </div>
            </section>

            {
                AuxElements &&
                <section className='AuxElem'>
                    <h3>Esta sección es por posibles errores, puedes copiar esto y enviarlo por whatsapp manualmente</h3>

                    <textarea id='TextAreaCopy' value={JSON.stringify(MoreForUser)} readOnly
                        style={{ resize: 'none', width: '80%', height: 'auto', padding: '10px', backgroundColor: 'gray' }} />
                </section>
            }


            <article className='articleEdit'>
                {
                    ArrayCarrito && ArrayCarrito.map((obj, i) => {
                        return (
                            <div key={i}>
                                <ProductoEnchant obj={obj} />
                                <ProductoPresentEdit obj={obj} />
                            </div>
                        )
                    })
                }
            </article>

            <section className='CarritoBtns'>
                <button onClick={handleCopy}>
                    Copiar
                </button>
                <button onClick={handleSend}>
                    Enviar
                </button>

            </section>

            {
                AuxElements &&
                <section className='AuxElem'>
                    <h3>Esta sección es por posibles errores, puedes copiar esto y enviarlo por whatsapp manualmente</h3>

                    <textarea id='TextAreaCopy' value={JSON.stringify(MoreForUser)} readOnly
                        style={{ resize: 'none', width: '80%', height: 'auto', padding: '10px', backgroundColor: 'gray' }} />
                </section>
            }
        </>
    )
}

export { CarritoPage, FavoritosPage };