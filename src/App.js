import './css/App.css';
import React from 'react';
import Header from './components/header';
import Footer from './components/footer';

import { CategoryProvider } from './components/context/CategoriaContx.jsx'
import { ColorProvider } from './components/context/UserPreffContx.jsx'
import { CarritoProvider } from './components/context/CarritoContx.jsx'

import Index from './pages/MainPage.jsx';

function App() {
  
  return (
    <CarritoProvider>
      <ColorProvider>
        <div className="App">
          <CategoryProvider>
            <Header /><div className='main'><Index /></div>
          </CategoryProvider>
          <Footer />
        </div>
      </ColorProvider>
    </CarritoProvider>
  );
}

export default App;
