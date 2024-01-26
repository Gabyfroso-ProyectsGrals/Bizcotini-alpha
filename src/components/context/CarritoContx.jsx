import React, { createContext, useState, useEffect } from 'react'

const CarritoConts = createContext();

export const CarritoProvider = ({ children }) => {

    const [Carro, setCarro] = useState(JSON.parse(localStorage.getItem('carro')) || [{}]);
    const [Favoritos, setFavoritos] = useState(JSON.parse(localStorage.getItem('favoritos')) || [{}]);
    const [MoreForUser, setMoreForUser] = useState(JSON.parse(localStorage.getItem('moreforuser')) || [{}]);

    useEffect(() => {
        // Guardar en localStorage cuando haya cambios en Carro
        localStorage.setItem('carro', JSON.stringify(Carro));

        // Guardar en localStorage cuando haya cambios en Favoritos
        localStorage.setItem('favoritos', JSON.stringify(Favoritos));

        // Guardar en localStorage cuando haya cambios en Favoritos
        localStorage.setItem('moreforuser', JSON.stringify(MoreForUser));


    }, [Carro, Favoritos, MoreForUser]);

    /**
     * Restarts
     */
    const ResetAll = () => {
        if (window.confirm('¿Realmente desea resetear TODAS las preferencias?: se eliminarán: Carros, Favoritos, y preferencias. Puede ayudar con problemas que tenga en la página. como un reseteo de fábrica')) {
            localStorage.clear();

            setCarro([]);
            setFavoritos([]);
            setMoreForUser([]);

        }
    }
    const ResetCarro = () => {
        if (window.confirm('¿Realmente desea resetear el carro?')) {
            localStorage.setItem('carro', JSON.stringify([]));
            setCarro([]);
        }
    }
    const ResetFavoritos = () => {
        if (window.confirm('¿Realmente desea resetear favoritos?')) {
            localStorage.setItem('favoritos', JSON.stringify([]));
            setFavoritos([]);
        }
    }
    const ResetMoreForUser = () => {
        if (window.confirm('¿Realmente desea resetear sus notas y cantidades?')) {
            localStorage.setItem('moreforuser', JSON.stringify([]));
            setMoreForUser([]);
        }
    }


    /**
     * 
     * 
     * Favoritos
     * 
     */
    const boolFav = (id) => {

        return Favoritos.some(elemento => elemento.id === id);
    }

    const adddelFav = (id) => { boolFav(id) ? delFav(id) : addFav(id) }

    const addFav = (id) => {
        if (!boolFav(id)) {
            setFavoritos([...Favoritos, { id: id }]);
        }
    }

    const delFav = (id) => {
        setFavoritos(Favoritos.filter(elemento => elemento.id !== id));
    }


    /**
     * 
     * 
     * Carro
     * 
     * 
     */

    const boolCarro = (id) => {

        return Carro.some(elemento => elemento.id === id);
    }

    const adddelCarro = (id) => { boolCarro(id) ? delCarro(id) : addCarro(id) }

    const addCarro = (id) => {
        if (!boolCarro(id)) {
            setCarro([...Carro, { id: id }]);
        }
    }

    const delCarro = (id) => {
        setCarro(Carro.filter(elemento => elemento.id !== id));
    }

    /**
     * 
     * notas
     * 
     */
    const boolMoreForUser = (id) => {
        return MoreForUser.some(elemento => elemento.id === id);
    }

    const editMoreForUser = (obj = {}) => {

        if (!MoreForUser) {
            console.error('CContext >> MoreForUser not defined');
            return;
        }

        if (!obj.id) {
            console.error('CContext >> objeto no tiene id');
            return;
        }

        if (!MoreForUser.some(elem=> elem.id === obj.id)) {
            MoreForUser.push(obj);
            return;
        }

        const newMFU = MoreForUser.map(MFU=>(
            MFU.id === obj.id ? {
                ...MFU,
                ...obj
            } : MFU
        ))

        setMoreForUser(newMFU)
    }

    const MoreForUserID = (id) => {
        return MoreForUser.filter(elem => elem.id === id)[0];
    }


    /**
     * 
     * 
     * 
     */

    return (
        <CarritoConts.Provider
            value={{
                Carro, addCarro, delCarro, boolCarro, adddelCarro, setCarro,
                Favoritos, addFav, delFav, boolFav, adddelFav, setFavoritos,
                MoreForUser, MoreForUserID, editMoreForUser, boolMoreForUser, setMoreForUser,
                ResetAll, ResetCarro, ResetFavoritos, ResetMoreForUser
            }}>
            {children}
        </CarritoConts.Provider>
    )
}

export default CarritoConts;