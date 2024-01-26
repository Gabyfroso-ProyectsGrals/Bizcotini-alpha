import React, { useState, useContext } from 'react'

import CategoriaContx from '../components/context/CategoriaContx';
import CarritoContx from '../components/context/CarritoContx';

import { FaRegUser } from "react-icons/fa";
import { ImBookmarks } from "react-icons/im";
import { IoAccessibilitySharp } from "react-icons/io5";
import { IoCart } from "react-icons/io5";
import { IoBug } from "react-icons/io5";
import { IoInformationCircleOutline } from "react-icons/io5";

import { IoIosWarning } from "react-icons/io";




import ModuleCss from './components.module.css';

function SegmentoLi({ name='err', children, height=8, handle }) {

    return (
        <li className={ModuleCss.AsideLi} style={{ minHeight: `${height}ch` }}>
            <button className={`${ModuleCss.btnAside}`} onClick={handle}>
                <abbr> {children} {name} </abbr>
            </button>
        </li>
    )
}


function Configuraciones({}) {

    const { ResetAll, ResetCarro, ResetFavoritos, ResetMoreForUser } = useContext(CarritoContx);
    
    return(
        <ul className={ModuleCss.ulConfig}>
            <li>
                <abbr>Tamaño letras</abbr>
            </li>
            <li>
                <abbr>Fuente letras</abbr>
            </li>
            <li>
                <abbr>Discapacidad Visual</abbr>
            </li>
            <li>
                <abbr> <IoIosWarning/> Reseteos </abbr>
                <div>
                    <button onClick={ResetCarro}>
                        Carro
                    </button>
                    <button onClick={ResetFavoritos}>
                        Favoritos
                    </button>
                    <button onClick={ResetMoreForUser}>
                        Notas
                    </button>
                    <button onClick={ResetAll}>
                        TODO
                    </button>
                </div>
            </li>
        </ul>
    )
}

function AsideMenu({ uploadMenuExtend, DisableAll }) {

    const { updateCategory } = useContext(CategoriaContx)

    const [MenuConfig, setMenuConfig] = useState(false);

    const handleConfig = ()=>{
        setMenuConfig(!MenuConfig)
    }

    return (
        <div className={ModuleCss.divMenu} >
            <aside>
                <ul>
                    <SegmentoLi name={'User'} height={6}>
                        <FaRegUser />
                    </SegmentoLi>


                    <SegmentoLi name={'Carrito'} height={8}
                    handle={()=>{updateCategory('carrito'); DisableAll()}}>
                        <IoCart />
                    </SegmentoLi>


                    <SegmentoLi name={'Favoritos'} height={8}
                    handle={()=>{updateCategory('favoritos'); DisableAll()}}>
                        <ImBookmarks />
                    </SegmentoLi>


                    <SegmentoLi name={'Configuraciones'} height={10} handle={handleConfig}>
                        <IoAccessibilitySharp />
                    </SegmentoLi>
                    {MenuConfig && <Configuraciones/>}


                    <SegmentoLi name={'Contacto'} height={6}
                    handle={()=>{updateCategory('contacto'); DisableAll()}}>
                        <IoBug />

                    </SegmentoLi>


                    <SegmentoLi name={'Legales'} height={6}
                    handle={()=>{updateCategory('legales'); DisableAll()}}>
                        <IoInformationCircleOutline />
                    </SegmentoLi>
                </ul>
            </aside>
            <button className={ModuleCss.btn} onClick={() => { uploadMenuExtend() }} />
        </div>
    )
}

export default AsideMenu;