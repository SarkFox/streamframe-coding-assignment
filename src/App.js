
import './App.css';
import ListaTareas from './componentes/ListaTareas';


function App() {
  return (
    <div className="App">
      <h1 className='titulo'> Streamframe Coding Assignment| Developed by: <a href="https://www.linkedin.com/in/felipe-velasquez-50996b228/" target="_blank"> Felipe Velasquez</a> </h1>
      <div className='listaPrincipal'>
        <h1 className='tituloTareas'>Tasks:</h1>
        <ListaTareas />
      </div>
    </div>
  );
}

export default App;
