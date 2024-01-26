import React, { useState, useContext } from 'react'

import CategoriaCntx from './context/CategoriaContx';
import Aside from './aside';

import { FiAlignJustify } from "react-icons/fi";
import { FiAlignCenter } from "react-icons/fi";
import { FiArrowUpCircle } from "react-icons/fi";

import info from '../util/info.json'
import Logo from '../img/index/Logo.png';

import ModuleCss from './components.module.css';

function NavAside() {
    const categorias = info.categorias;
    const categoriasnames = categorias.names;

    const [MenuExtend, setMenuExtend] = useState(false);
    const uploadMenuExtend = ()=>{
        setMenuExtend(!MenuExtend)
    }

    const { updateCategory } = useContext(CategoriaCntx);


    return (
        <nav className={ModuleCss.NavAside}>
            <h1 style={{ textAlign: 'center' }}>
                Bizcotini
            </h1>
            <nav style={{
                width: '100%',
                height: '100%',
                padding: '8px 0',
                maxHeight: '70vh',
                overflow: 'hidden',
                overflowY: 'auto'
            }}>
                <ul style={{
                    display: 'flex', flexFlow: 'row wrap', justifyContent: 'center',
                    transform: `${MenuExtend ? 'scaleY(1)' : 'scaleY(0) translateY(20%)'}`,
                    transition: 'transform .4s ease-in-out'
                }}>
                    {
                        MenuExtend && categoriasnames.map((categoria, i) => {

                            return (
                                <li className={`${ModuleCss.ali} ${MenuExtend ? ModuleCss.active : ModuleCss.nactive}`}
                                    key={i}>
                                    <button className={ModuleCss.btn}
                                        onClick={(e) => {
                                            updateCategory(categoria); setTimeout(() => {
                                                uploadMenuExtend();
                                            }, 200);
                                        }} />
                                    <p>{categoria}</p>
                                    <img src={`${categorias[categoria]}/index.jpg`} alt={categoria} />
                                </li>
                            )
                        })
                    }
                </ul>
            </nav>

            <div className={ModuleCss.expansor}
                style={{ transform: `${MenuExtend ? 'rotate(180deg)' : 'translateY(-10px)'}`, transition: 'transform .8s ease-in-out' }}>
                <FiArrowUpCircle className={ModuleCss.btn} /><button className={ModuleCss.btn} onClick={() => { setMenuExtend(!MenuExtend) }} />
            </div>
        </nav>
    )
}


export default function Header() {

    const {updateCategory} = useContext(CategoriaCntx);

    const [category, setCategory] = useState('bizcotini');


    const changecategory = ()=>{
        const newCategory = (category=== 'bizcotini'? 'index' : 'bizcotini');

        setCategory(newCategory);
        updateCategory(newCategory);
    }

    const [Search, setSearch] = useState(false);
    const [MenuExtend, setMenuExtend] = useState(false);
    const uploadMenuExtend = ()=>{
        setMenuExtend(!MenuExtend)
    }

    const DisableAll = ()=>{
        setTimeout(() => {
            setMenuExtend(false);
        }, 400);

        setSearch(false);
    }


    return (
        <>
        {MenuExtend && (<Aside DisableAll={DisableAll} uploadMenuExtend={uploadMenuExtend}/>)}
        <div className={ModuleCss.fixedheader}>
            <header style={{ display: 'block', minHeight: '60px', height: 'auto' }}>
                <nav>
                    <ul style={{ display: 'flex', flexFlow: 'row nowrap' }}>
                        <li className={`${ModuleCss.index} ${ModuleCss.hli}`}>
                            <img src={ Logo } alt='LOGO' />
                            <button className={ModuleCss.btn} onClick={()=>{ changecategory() }}/>
                        </li>

                        {
                            Search && (<li className={`${ModuleCss.search} ${ModuleCss.hli}`}></li>)
                        }

                        <li className={`${ModuleCss.util} ${ModuleCss.hli}`}>
                            <button className={ModuleCss.btn} onClick={uploadMenuExtend} />
                            {
                                MenuExtend ? (<FiAlignCenter />) : (<FiAlignJustify />)
                            }
                        </li>
                    </ul>
                </nav>
            </header>
            <NavAside/>

        </div>
        </>
    )
}
