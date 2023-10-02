import { useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid';
import '../styles/tasklist.scss'

import { FiTrash, FiCheckSquare } from 'react-icons/fi'

interface Task {
  id: string;
  title: string;
  isComplete: boolean;
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  function handleCreateNewTask() {
    // Crie uma nova task com um id random, não permita criar caso o título seja vazio.
   
      if(newTaskTitle.trim() !== ''){
        const newTask: Task = {
          id: uuidv4(),
          title: newTaskTitle,
          isComplete: false
        }
        //É preciso usar o operador Spread que são os 3 pontos(...tasks) para passar o array já existente no primeiro parâmetro
        setTasks([...tasks, newTask]);
        setNewTaskTitle('');

      } else {
        return console.error('A task não pode ser criada sem título');
      }
      console.log(tasks);
  }

  function handleToggleTaskCompletion(id: string) {
    // Altere entre `true` ou `false` o campo `isComplete` de uma task com dado ID

    //primeiro eu percorro o arrray de tasks para achar o objeto que desejo atualizar
    const updateTasksStatus = tasks.map(task => {
      if(task.id === id){//verifico se alguns dos objetos da lista tem o ID passado
        //retorno para a variável criada o array atualizado
        return { ...task, isComplete : !task.isComplete };//E o objeto em questão terá a variável isComplete com o seu valor alterado
      } else {
        return task//Em caso de não encontrar um objeto com ID, só devolvo a lista de tasks
      }
    });

    setTasks(updateTasksStatus);//Passo para o useState a lista atualizada
  }

  function handleRemoveTask(id: string) {
    // Remova uma task da listagem pelo ID
    // Primeiro eu crio um objeto qualquer (deleteTask) que irá receber o valor retornado do metódo filter()
    setTasks((deleteTask) => deleteTask.filter(task => task.id !== id));
    // O filter() só ira devolver os objetos com o ID diferente do que eu quero excluir
  }

  return (
    <section className="task-list container">
      <header>
        <h2>Minhas tasks</h2>

        <div className="input-group">
          <input 
            type="text" 
            placeholder="Adicionar novo todo" 
            onChange={(e) => setNewTaskTitle(e.target.value)}
            value={newTaskTitle}
          />
          <button type="submit" data-testid="add-task-button" onClick={handleCreateNewTask}>
            <FiCheckSquare size={16} color="#fff"/>
          </button>
        </div>
      </header>

      <main>
        <ul>
          {tasks.map(task => (
            <li key={task.id}>
              <div className={task.isComplete ? 'completed' : ''} data-testid="task" >
                <label className="checkbox-container">
                  <input 
                    type="checkbox"
                    readOnly
                    checked={task.isComplete}
                    onClick={() => handleToggleTaskCompletion(task.id)}
                  />
                  <span className="checkmark"></span>
                </label>
                <p>{task.title}</p>
              </div>

              <button type="button" data-testid="remove-task-button" onClick={() => handleRemoveTask(task.id)}>
                <FiTrash size={16}/>
              </button>
            </li>
          ))}
          
        </ul>
      </main>
    </section>
  )
}