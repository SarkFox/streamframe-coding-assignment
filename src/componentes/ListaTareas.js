import React, { useState } from "react";
import Formulario from "./Formulario";
import Tarea from "./Tarea";
import '../stylesheets/ListaTareas.css';
import Node from './Node';
import Filter from "./Filter"
import Form2 from "./Form2";

let filtered = false;
let updatedState = false;

function ListaTareas() {

  // USE STATES FOR THE APP 
  const [tareas, setTareas] = useState([]);
  const [tareasF, setTareasF] = useState([]);
  const [idUpdate, setIdUpdate] = useState(0);

  const [nodesTasks, setNodesTasks] = useState([]);


  //Function to add a new task

  const agregarTarea = tarea => {
    //At the moment of add a new task display all task on screen
    filterTasks(3);
    if (tarea.texto.trim()) {

      let conditionParent = false;
      let counter = 0;
      tarea.texto = tarea.texto.trim();
      //Check if its the first task to be added
      if (tareas.length === 0) {
        //check circular dependency in case of being first task
        if (tarea.parent) {
          alert("There are no parent task at the moment, can't add this task with that parent");
        }

        // add the task if all requirements are fullfiled
        else {
          const tareasActualizadas = [tarea, ...tareas]
          setTareas(tareasActualizadas);
          let nodeT = new Node(tarea);

          const nodesTasksUpdated = [nodeT, ...nodesTasks];
          setNodesTasks(nodesTasksUpdated);
        }

      }

      //The task is not the first to be added
      else {
        while (conditionParent === false && counter < tareas.length) {

          //The task has a parent that is valid or it has no parents
          if (tarea.parent === tareas[counter].id || tarea.parent === 0) {

            //add the task to the list and update the list aswell as adding to the data structure (N-ary Tree)
            const tareasActualizadas = [tarea, ...tareas]
            setTareas(tareasActualizadas);
            conditionParent = true;
            const nodeT = new Node(tarea);


            //If  it has no parent then just add it to the list and to the data structure
            if (tarea.parent === 0) {
              const nodesTasksUpdated = [...nodesTasks, nodeT];
              setNodesTasks(nodesTasksUpdated);
            }

            // It has parents, add the task to the parent tree
            else {
              const nodesTasksUpdated = nodesTasks.map(node => {
                if (node.data.id === tarea.parent) {
                  node.add(tarea)
                }
                return node;
              });
              setNodesTasks(nodesTasksUpdated);
              const nodesTaskUpdated2 = [...nodesTasks, nodeT];
              setNodesTasks(nodesTaskUpdated2);


            }


          }

          // try next task to check parent
          else {
            counter++;
          }
          console.log(counter);

        }

        // didnt find a parent, cant add
        if (conditionParent === false) {
          alert("The parent does not exist")
        }

      }

    }

  }



  // Delete a task if needed
  const eliminarTarea = id => {
    const tareasActualizadas = tareas.filter(tarea => tarea.id !== id);
    setTareas(tareasActualizadas);
  }


  //Change the status from a task from IN PROGRESS TO DONE OR COMPLETE depending of it has children or revert from DONE or COMPLETE to In Progress 
  //Plus update all parents status.
  const completarTarea = id => {

    //Check if the task to be updated has children
    let node = nodesTasks.filter(node => node.data.id === id)
    let numberofChildren = node[0].children.length

    if (numberofChildren === 0) {
      //check status of the task to be updated
      let status = node[0].data.status

      //The task has no children and is IN PROGRESS. update status to COMPLETE
      //And update parent status if possible.
      if (status === 0) {


        const tareasActualizadas = tareas.map(tarea => {
          if (tarea.id === id) {
            tarea.completada = !tarea.completada
            tarea.status = 2;
            if (tarea.parent !== 0) {
              let nodev = nodesTasks.filter(node => node.data.id === tarea.parent)
              let parentStatus = nodev[0].data.status
              if (parentStatus === 1) {
                let canfinish = true;
                let children = nodev[0].children;

                for (let i = 0; i < children.length; i++) {
                  if (children[i].data.status === 0 || children[i].data.status === 1) {
                    canfinish = false;
                  }
                }
                //If parent its affected by the change of status, update status of the parent and of its parents recursively
                if (canfinish) {
                  completarTarea(tarea.parent);
                }

              }

            }
          }
          return tarea;
        });

        // Update the list of task showed
        setTareas(tareasActualizadas);


      }
      // Task is COMPLETE, Revert to IN progress and update parent status recursively
      else {
        const tareasActualizadas = tareas.map(tarea => {
          if (tarea.id === id) {
            tarea.completada = !tarea.completada
            tarea.status = 0;
            if (tarea.parent !== 0) {
              let nodev = nodesTasks.filter(node => node.data.id === tarea.parent)
              let parentStatus = nodev[0].data.status
              if (parentStatus === 2) {

                let updateParent = nodev[0].data.id
                completarTarea(updateParent)

              }

            }
          }
          return tarea;
        });
        setTareas(tareasActualizadas);
      }


    }

    //Task has children
    else {
      //check if status can be changed to COMPLETE or DONE by checking children status
      let canfinish = true;
      let children = node[0].children;
      let status = node[0].data.status

      for (let i = 0; i < children.length; i++) {
        if (children[i].data.status === 0 || children[i].data.status === 1) {
          canfinish = false;
        }
      }

      //all Children are in COMPLETE, task can update to COMPLETE
      if (canfinish) {
        //Change from In progress
        if (status === 0) {
          //Change status to COMPLETE and recursively change parents status
          const tareasActualizadas = tareas.map(tarea => {
            if (tarea.id === id) {
              tarea.completada = !tarea.completada
              tarea.status = 2;
              if (tarea.parent !== 0) {
                let nodev = nodesTasks.filter(node => node.data.id === tarea.parent)
                let parentStatus = nodev[0].data.status
                if (parentStatus === 1) {
                  let canfinish = true;
                  let children = nodev[0].children;

                  for (let i = 0; i < children.length; i++) {
                    if (children[i].data.status === 0 || children[i].data.status === 1) {
                      canfinish = false;
                    }
                  }
                  if (canfinish) {
                    completarTarea(tarea.parent);
                  }

                }

              }
            }
            return tarea;
          });
          setTareas(tareasActualizadas);

        }

        //Change from DONE
        else if (status === 1) {

          //Cicle through task
          const tareasActualizadas = tareas.map(tarea => {
            //get the task and update its status
            if (tarea.id === id) {
              tarea.completada = !tarea.completada
              tarea.status = 2;

              //Task has a parent?
              if (tarea.parent !== 0) {
                //UPDATE PARENT RECURSIVELY By checking if it can
                let nodev = nodesTasks.filter(node => node.data.id === tarea.parent)
                let parentStatus = nodev[0].data.status
                if (parentStatus === 1) {
                  let canfinish = true;
                  let children = nodev[0].children;


                  for (let i = 0; i < children.length; i++) {

                    if (children[i].data.status === 0 || children[i].data.status === 1) {
                      canfinish = false;
                    }
                  }
                  if (canfinish) {
                    completarTarea(tarea.parent);
                  }

                }

              }
            }
            return tarea;
          });
          setTareas(tareasActualizadas);

        }

        //REVERT FROM COMPLETE TO IN PROGRESS
        else if (status === 2) {

          //Cycle through tasks
          const tareasActualizadas = tareas.map(tarea => {

            //task founded
            if (tarea.id === id) {
              //udpate task and check if it has parent
              tarea.completada = !tarea.completada
              tarea.status = 0;

              //task has a parent?
              if (tarea.parent !== 0) {
                //update parent recursively
                let nodev = nodesTasks.filter(node => node.data.id === tarea.parent)
                let parentStatus = nodev[0].data.status
                if (parentStatus === 2) {

                  let updateParent = nodev[0].data.id
                  completarTarea(updateParent)


                }

              }

            }
            return tarea;
          });
          setTareas(tareasActualizadas);

        }


      }
      //task cant change its status to COMPLETE
      else {
        //CHANGE STATUS FROM IN PROGRESS TO DONE
        if (status === 0) {
          const tareasActualizadas = tareas.map(tarea => {
            if (tarea.id === id) {
              tarea.completada = !tarea.completada
              tarea.status = 1;

            }
            return tarea;
          });
          setTareas(tareasActualizadas);
          const nodesTasksUpdated = nodesTasks.map(node => {
            if (node.data.id === id) {
              node.data.status = 1;
            }
            return node;
          });
          setNodesTasks(nodesTasksUpdated);
        }

        // revert status from COMPLETE to IN PROGRESS and update parent recursively
        else if (status === 2) {
          const tareasActualizadas = tareas.map(tarea => {
            if (tarea.id === id) {
              tarea.completada = !tarea.completada
              tarea.status = 1;
              if (tarea.parent !== 0) {
                let nodev = nodesTasks.filter(node => node.data.id === tarea.parent)
                let parentStatus = nodev[0].data.status
                if (parentStatus === 2) {

                  let updateParent = nodev[0].data.id
                  completarTarea(updateParent)


                }

              }

            }
            return tarea;
          });
          setTareas(tareasActualizadas);

        }

        // REVER TASK FROM DONE TO IN PROGRESS AS IT CAN CHANGE TO COMPLETE
        else if (status === 1) {
          const tareasActualizadas = tareas.map(tarea => {
            if (tarea.id === id) {
              tarea.completada = !tarea.completada
              tarea.status = 0;
            }
            return tarea;
          });
          setTareas(tareasActualizadas);
          const nodesTasksUpdated = nodesTasks.map(node => {
            if (node.data.id === id) {
              node.data.status = 0;
            }
            return node;
          });
          setNodesTasks(nodesTasksUpdated);
        }
      }

    }

  }



  // Get the number of children of a task
  const numberofChildren = id => {

    let node = nodesTasks.filter(node => node.data.id === id)
    return node[0].children.length
  }

  //get the number of task marked as done from the children of a task given
  const numberofDone = id => {
    let counter = 0;
    let node = nodesTasks.filter(node => node.data.id === id)
    let children = node[0].children
    for (let i = 0; i < children.length; i++) {
      if (children[i].data.status === 1) {
        counter++
      }
    }

    return counter;
  }

  // get the number of tasks marked as COMPLETE from the children of a task given
  const numberofComplete = id => {
    let counter = 0;
    let node = nodesTasks.filter(node => node.data.id === id)
    let children = node[0].children
    for (let i = 0; i < children.length; i++) {
      if (children[i].data.status === 2) {
        counter++
      }
    }

    return counter;
  }

  //Filter a task by a Status given
  const filterTasks = (c) => {
    //If command is different from  ALL, return the task filtered by the condition
    if (c !== 3) {
      filtered = true;
      console.log(filtered)
      console.log(filtered === true);
      let tareasFiltered = tareas.filter((tarea) => {
        if (c === tarea.status) {
          return tarea
        }

      })
      setTareasF(tareasFiltered);

    }

    //The command is ALL, return all tasks
    else {
      filtered = false;
      console.log(filtered)
      setTareasF(tareas);
    }


  }

  //save the state of the id of the task to be updated, change the status of the render to true to render the new form, and call the update function
  const showupdateTask = (taskid) => {
    updatedState = true;
    filterTasks(3);
    setIdUpdate(taskid);
  }

  //Function to get the ids of all the elements in a tree (used to check circular dependency)
  const preorder = (root, ans = []) => {
    if (!root) return ans
    ans.push(root.data.id)
    let children = root.children
    for (let i = 0; i < children.length; i++) {
      let nodeC = nodesTasks.filter(node => node.data.id === children[i].data.id)
      preorder(nodeC[0], ans)
    }

    return ans
  }

  // Update the task selected with the values from the new Form.
  const updateTask = (tarea) => {
    // Check that a title was given
    if (tarea.texto === '') {
      alert("Please type a title")
    }
    else {
      //get the node of the task to be updated and check it has children
      updatedState = false;
      let node = nodesTasks.filter(node => node.data.id === idUpdate)
      let children = node[0].children

      //it has children?
      if (children.length !== 0) {
        //Check if the new parent is one of the elements in the tree of the task to be updated
        let stop = false;
        let ans = [];
        preorder(node[0], ans)
        console.log(ans);
        for (let i = 0; i < ans.length; i++) {
          //The new parent causes a circular dependency
          if (tarea.parent === ans[i]) {
            alert("Cant update this task with the parent given. It'll cause a circular dependency, please select another parent id or type the previous.");
            stop = true;
            setTareas(tareas);
          }
        }

        //No circular dependency
        if (stop === false) {
          //check if a parent was given
          if (tarea.parent === -1) {
            //a parent was not given, update only task text
            if (tarea.texto.trim()) {

              tarea.texto = tarea.texto.trim();
              const tareasActualizadas = tareas.map(task => {
                if (idUpdate === task.id) {
                  task.texto = tarea.texto
                }
                return task
              })
              setTareas(tareasActualizadas)

              const nodesUpdated = nodesTasks.map(node => {
                if (idUpdate === node.data.id) {
                  node.data.texto = tarea.texto
                }
                return node
              })
              setNodesTasks(nodesUpdated)

            }
          }

          // parent was given, check if its valid and update recursively
          else {
            let validparent = false;
            for (let i = 0; i < tareas.length; i++) {
              if (tarea.parent === tareas[i].id) {
                validparent = true;
              }
            }
            //check if the new parent is the same task
            if (tarea.parent === idUpdate) {
              alert("Cant be own parent")
            }

            else {
              //parent is not valid
              if (validparent === false) {
                alert("The parent given does not exist, please type another or the previous")
              }
              //parent is valid, update task and its parents recursively
              else 
              {

                if (tarea.texto.trim()) 
                {

                  //update just text 
                  tarea.texto = tarea.texto.trim();
                  const tareasActualizadas = tareas.map(task => {
                    if (idUpdate === task.id) 
                    {
                      task.texto = tarea.texto;
                    }
                    return task
                  })
                  setTareas(tareasActualizadas)
                  //Change the parent recursively
                  const nodesUpdated = nodesTasks.map(node => 
                  {
                    //check if its the task that has to be updated
                    if (idUpdate === node.data.id) 
                    {
                      //check if it has parent task
                      if (node.data.parent === 0) 
                      {

                        // It has no parents, just add to the new parent
                        node.data.texto = tarea.texto;
                        let nodeparentadd = nodesTasks.filter(node => node.data.id === tarea.parent)
                        nodeparentadd[0].add(node.data)
                        node.data.parent = tarea.parent
                      }
                      //It has parent, delete from the parent and add new parent recursively
                      else {

                        node.data.texto = tarea.texto;
                        let parent = node.data.parent;
                        let parentnoderemove = nodesTasks.filter(nodev => nodev.data.id === parent);
                        parentnoderemove[0].remove(node.data);
                        let nodeparentadd = nodesTasks.filter(node => node.data.id === tarea.parent)
                        nodeparentadd[0].add(node.data)
                        node.data.parent = tarea.parent

                      }

                    }
                    return node
                  })
                  setNodesTasks(nodesUpdated)
                }

              }

            }

          }
        }

      }
      //task has no children
      else 
      {
        //check if a parent was given
        if (tarea.parent === -1) 
        {
          //a parent was not given, just update task's text
          if (tarea.texto.trim()) {

            tarea.texto = tarea.texto.trim();
            const tareasActualizadas = tareas.map(task => {
              if (idUpdate === task.id) {
                task.texto = tarea.texto
              }
              return task
            })
            setTareas(tareasActualizadas)

            const nodesUpdated = nodesTasks.map(node => {
              if (idUpdate === node.data.id) {
                node.data.texto = tarea.texto
              }
              return node
            })
            setNodesTasks(nodesUpdated)

          }
        }

        //a parent was given, check parent and add recursively
        else {

          let validparent = false;
          for (let i = 0; i < tareas.length; i++) 
          {
            //Check if parent exists
            if (tarea.parent === tareas[i].id) 
            {
              validparent = true;
            }
          }

          //check if parent is the same task, causing a circular dependecy
          if (tarea.parent === idUpdate) 
          {
            alert("Cant be own parent")
          }

          //parent is different
          else 
          {
            //parent does not exist
            if (validparent === false) {
              alert("The parent given does not exist, please type another or the previous")
            }

            //parent exist and its valid. update new parent recursively
            else {
              if (tarea.texto.trim()) 
              {

                //update task text
                tarea.texto = tarea.texto.trim();
                const tareasActualizadas = tareas.map(task => {
                  if (idUpdate === task.id) {
                    task.texto = tarea.texto;
                  }
                  return task
                })
                setTareas(tareasActualizadas)

                // update task parents, delete from the parent and add to the new parent recursively
                const nodesUpdated = nodesTasks.map(node => 
                  {
                  console.log(idUpdate);
                  if (idUpdate === node.data.id) 
                  {
                    //Task has no parent, just add to the new parent
                    if (node.data.parent === 0) 
                    {
                      console.log(node.data.id);
                      node.data.texto = tarea.texto;
                      let nodeparentadd = nodesTasks.filter(node => node.data.id === tarea.parent)
                      nodeparentadd[0].add(node.data)
                      node.data.parent = tarea.parent
                    }
                    // task has a parent, delete from current parent and add to the new parent
                    else {
                      console.log(node.data.id);
                      node.data.texto = tarea.texto;
                      let parent = node.data.parent;
                      console.log(nodesTasks);
                      console.log(parent);
                      let parentnoderemove = nodesTasks.filter(nodev => nodev.data.id === parent);
                      console.log(parentnoderemove);
                      parentnoderemove[0].remove(node.data);
                      let nodeparentadd = nodesTasks.filter(node => node.data.id === tarea.parent)
                      nodeparentadd[0].add(node.data)
                      node.data.parent = tarea.parent

                    }

                  }
                  return node
                })
                setNodesTasks(nodesUpdated)
                console.log(nodesTasks);
                console.log(tareas)
              }

            }


          }

        }

      }

    }

  }

  //function to call the filter status
  const onFilterValueSelected = filterValue => 
  {
    filterTasks(filterValue);
    console.log(tareas);
  }


  // REACT component for the Tasks List
  return (
    <>
      <Formulario onSubmit={agregarTarea} />
      <Filter filterValueSelected={onFilterValueSelected} />
      <div className="tareasListaContenedor">
        {console.log(filtered)}
        {updatedState ? (<Form2 onSubmit={updateTask} />) :
          (filtered ? (tareasF.map((tarea) =>

            <Tarea
              key={tarea.id}
              id={tarea.id}
              texto={tarea.texto}
              status={tarea.status}
              completada={tarea.completada}
              completarTarea={completarTarea}
              eliminarTarea={eliminarTarea}
              numberofChildren={numberofChildren}
              numberofDone={numberofDone}
              numberofComplete={numberofComplete}
              showupdateTask={showupdateTask}
            />
          ))
            :
            (tareas.map((tarea) =>
              <Tarea
                key={tarea.id}
                id={tarea.id}
                texto={tarea.texto}
                status={tarea.status}
                completada={tarea.completada}
                completarTarea={completarTarea}
                eliminarTarea={eliminarTarea}
                numberofChildren={numberofChildren}
                numberofDone={numberofDone}
                numberofComplete={numberofComplete}
                showupdateTask={showupdateTask}

              />)


            ))

        }
      </div>
    </>
  );
}

export default ListaTareas;