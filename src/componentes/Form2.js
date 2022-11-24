import React, {useState}  from "react";
import '../stylesheets/Formulario.css';

//React component of the EDIT form
function Form2(props)
{

  const [input, setInput] = useState('')

  const [input2, setInput2] = useState(-1)




  const manejarCambio = e =>
  {
    setInput(e.target.value);
  }

  const manejarEnvio = e =>
  {
    e.preventDefault();
    const tareaNueva = 
    {
      texto: input,
      parent: Number(input2)
    }
    props.onSubmit(tareaNueva);
  }


  return(
    <form className="tareaFormulario"
          onSubmit={manejarEnvio}>
      <input
      className="tareaInput"
      type='text'
      placeholder="Edit the title"
      name="texto"
      onChange={manejarCambio}
      />
      <button className="tareaBoton">
        Edit task
      </button>
     <input
      className="parentInput"
      type='number'
      placeholder="current parent or new parent id"
      name="parentid"
      onChange={(e)=>setInput2(e.target.value)}
      /> 
      
    </form>
  );
}

export default Form2;