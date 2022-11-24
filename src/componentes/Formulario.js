import React, {useState}  from "react";
import '../stylesheets/Formulario.css';

let count = 1
function generateID() {
    return count++;
}

//React component of the Form 
function Formulario(props)
{

  const [input, setInput] = useState('')

  const [input2, setInput2] = useState(0)




  const manejarCambio = e =>
  {
    setInput(e.target.value);
  }

  const manejarEnvio = e =>
  {
    e.preventDefault();
    if(input === '')
    {
      alert("Please type a title")
    }
    else{
      const tareaNueva = 
    {
      id: generateID(),
      texto: input,
      completada: false,
      parent: Number(input2),
      status: 0
    }
    props.onSubmit(tareaNueva);

    }
    
  }


  return(
    <form className="tareaFormulario"
          onSubmit={manejarEnvio}>
      <input
      className="tareaInput"
      type='text'
      placeholder="Task Title"
      name="texto"
      onChange={manejarCambio}
      />
      <button className="tareaBoton">
        Add task
      </button>
      <input
      className="parentInput"
      type='number'
      placeholder="OPTIONAL: PARENT ID"
      name="parentid"
      onChange={(e)=>setInput2(e.target.value)}
      />
      
    </form>
  );
}

export default Formulario;