import React, {useState, useEffect} from 'react';
import api from './services/api';
//import React, { useState } from 'react';

import './global.css';
import './Sidebar.css';
import './Main.css';
import './App.css';

import DevItem from './components/devItem';
import DevForm from './components/DevForm';

// 3 conceitos:
// componente: bloco isolado de html, css e js, q n interfere no resto da app.
// propriedade: informações que um componente pai passa para o componente filho.
// estado: informações mantidas pelo componente (lembrar: imutabilidade).

function App() {

  const [devs, setDevs] = useState([]);

  useEffect(() => {
    async function loadDevs() {
      const response = await api.get('/devs');
      
      setDevs(response.data);
    }

    loadDevs();
  }, []);

  async function handleSubmit(data){
    const response = await api.post('/devs', data);

    setDevs([...devs, response.data]);
  }

  return(
    <div id="app">
      <aside>
        <strong>Cadastrar</strong>
        <DevForm onSubmit={handleSubmit}/>
      </aside>

      <main>
        <ul>
          {devs.map(dev => (
            <DevItem key={dev._id} dev={dev} />
          ))}
        </ul>
      </main>
    </div>
  );

}

export default App;
