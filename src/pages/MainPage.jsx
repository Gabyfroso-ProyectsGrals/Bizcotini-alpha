import React, { useContext , useEffect} from 'react'
import CategoryCtx from '../components/context/CategoriaContx.jsx';
import UPreffCtx from '../components/context/UserPreffContx.jsx';


import {CarritoPage, FavoritosPage} from './UserMarket.jsx'
import ContactoPage from './Contacto.jsx'
import LegalesPage from './Legales.jsx';
import {PorCategoria, Index} from './CategoriaPage.jsx'

import '../css/App.css';
import '../css/Carro.css';

function Bizcotini({ Usize }) {
  return (
    <>
      <h1 className='title'>
        Bizcotini
      </h1>

      <article>
        <p>
           Somos una empresa familiar, donde nos dedicamos a la venta de cosas dulces.
        </p>
        <p>
           Nos encontramos en San Miguel de Tucumán, a pesar de no tener local propio, podremos realizar los pedidos a travez de +5493816164351, o a travez de la página en la sección "enviar y pedir".
        </p>
      </article>
    </>
  )
}



function MainPage() {
  const { selecCategory } = useContext(CategoryCtx);
  const { Usize } = useContext(UPreffCtx); 
  
  const categoryComponents = {
    'bizcotini': <Bizcotini Usize={Usize} />,
    'index': <Index Usize={Usize} />,
    'carrito': <CarritoPage Usize={Usize} />,
    'favoritos': <FavoritosPage Usize={Usize}/>,
    'contacto': <ContactoPage Usize={Usize}/>,
    'legales': <LegalesPage Usize={Usize}/>,
  };

  const selectedComponent = categoryComponents[selecCategory] || 
  (<PorCategoria categoria={selecCategory} Usize={Usize}/>)

  return (
    <main>
      <section>
        {selectedComponent}
      </section>
    </main>
  )
}

export default MainPage