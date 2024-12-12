import { useState, useEffect } from 'react';
import { taskService } from '../services/api';
import { TaskForm } from '../components/tasks/TaskForm';  // Importar el formulario de tareas

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);  // Estado para mostrar/ocultar el formulario

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await taskService.getTasks();
        setTasks(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error al cargar tareas', error);
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    window.location.href = '/login';
  };

  const handleTaskSaved = () => {
    taskService.getTasks().then((response) => {
      setTasks(response.data);  // Actualizar las tareas después de agregar una nueva
      setShowForm(false);  // Ocultar el formulario después de guardar
    });
  };

  if (loading) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Dashboard de Tareas</h1>
        <button 
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Cerrar Sesión
        </button>
      </div>

      {/* Botón para mostrar/ocultar el formulario */}
      <button 
        onClick={() => setShowForm(!showForm)}
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded"
      >
        {showForm ? 'Cancelar' : 'Agregar tarea'}
      </button>

      {/* Mostrar el formulario de tareas si el estado es true */}
      {showForm && <TaskForm onTaskSaved={handleTaskSaved} />}

      <div className="grid gap-4">
        {tasks.map(task => (
          <div 
            key={task.id} 
            className="bg-white shadow rounded p-4"
          >
            <h2 className="font-bold">{task.title}</h2>
            <p>{task.description}</p>
            <span className="text-sm text-gray-500">{task.status}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
