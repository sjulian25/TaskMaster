import { useState, useEffect } from 'react';
import { taskService } from '../../services/api';
import { TaskForm } from './TaskForm';

export const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);

  const fetchTasks = async () => {
    try {
      const response = await taskService.getTasks();
      setTasks(response.data);
    } catch (error) {
      console.error('Error al cargar tareas', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await taskService.deleteTask(id);
      fetchTasks();
    } catch (error) {
      console.error('Error al eliminar la tarea', error);
    }
  };

  const handleTaskSaved = () => {
    setSelectedTask(null);
    fetchTasks();
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Lista de Tareas</h1>
      {selectedTask ? (
        <TaskForm task={selectedTask} onTaskSaved={handleTaskSaved} />
      ) : (
        <TaskForm onTaskSaved={handleTaskSaved} />
      )}
      <ul className="space-y-4 mt-4">
        {tasks.map((task) => (
          <li key={task.id} className="border p-4 rounded shadow">
            <h2 className="font-bold">{task.title}</h2>
            <p>{task.description}</p>
            <p>Estado: {task.status}</p>
            <p>Prioridad: {task.priority}</p>
            <p>Fecha de Vencimiento: {task.due_date || 'No especificada'}</p>
            <button
              onClick={() => setSelectedTask(task)}
              className="bg-yellow-500 text-white px-2 py-1 rounded mr-2"
            >
              Editar
            </button>
            <button
              onClick={() => handleDelete(task.id)}
              className="bg-red-500 text-white px-2 py-1 rounded"
            >
              Eliminar
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
