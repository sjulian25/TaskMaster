import React, { useState, useEffect } from 'react';
import { taskService } from '../services/api';

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

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