import React, { createContext, useState } from 'react';

const ColorContext = createContext();

const examplecolors = 
{
    Header: 'rgb(106, 49, 6)',
    Aside: 'rgba(152, 74, 19, 0.85)',
    AsideAli: 'rgba(240, 248, 255, 0.6)',
    Footer: 'rgb(120, 13, 63)',
    size:{
        Usize: '1.2rem',
        1: '.8rem',
        2: '1rem',
        3: '1.2rem',
        4: '1.8rem',
        5: '2rem',
        undefined: '1.4rem'
    }
}

export const ColorProvider = ({ children }) => {
    const [color, setColor] = useState(examplecolors);

    const updateColor = (cor)=>{
        console.log(`cambiando color a ${cor}`);
        setColor(cor);
    }

    const Usize = color.size.Usize;

    return (
        <ColorContext.Provider value={{color, updateColor, Usize}}>
            {children}
        </ColorContext.Provider>
    )
}

export default ColorContext;
