import React, { useState } from 'react';
import '../stylesheets/Tarea.css';
import {AiOutlineCloseSquare, AiOutlineEdit} from 'react-icons/ai';

//React task component

function Tarea({id, texto, status,completada, completarTarea, eliminarTarea, numberofChildren, numberofDone, numberofComplete, children, showupdateTask})
{


  return(
    <div className='outerContainer'>

    
    <div className={status === 2 ? 'tareaContenedor completada':(status ===1 ? 'tareaContenedor completada':'tareaContenedor') }>
      <div className='tareaTexto'
          onClick={()=>completarTarea(id)}
      >
        {texto}
      </div>
      <div onClick={()=>completarTarea(id)}>
        STATUS:
        {status === 2 ? 'COMPLETE' : (status=== 1 ? 'DONE' : 'IN PROGRESS')}
      </div>
      <div className='tareaContenedoricono'
            onClick={()=>showupdateTask(id)}>
        <AiOutlineEdit className='tareaicono'/>
      </div>

    </div>
    id: {id}
    <div>
    number of dependencies: {numberofChildren(id)}
    </div>
    <div>
    number of DONE: {numberofDone(id)}
    </div>
    <div>
    number of COMPLETE: {numberofComplete(id)}
    </div>
   
    </div>
  );
}

export default Tarea;