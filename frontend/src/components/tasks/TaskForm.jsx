import PropTypes from 'prop-types';
import { useState } from 'react';
import { taskService } from '../../services/api';

export const TaskForm = ({ onTaskSaved }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('pending');  // Valor por defecto
  const [priority, setPriority] = useState('medium'); // Valor por defecto
  const [dueDate, setDueDate] = useState(''); // Estado para la fecha de vencimiento
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const taskData = {
      title,
      description,
      status,
      priority,
    };

    // Solo incluir due_date si tiene un valor válido
    if (dueDate) {
      taskData.due_date = dueDate;
    }

    try {
      setLoading(true);
      await taskService.createTask(taskData);
      onTaskSaved(); // Llamar a la función que actualiza las tareas en el dashboard
      setTitle('');
      setDescription('');
      setStatus('pending');
      setPriority('medium');
      setDueDate(''); // Limpiar el campo de fecha después de guardar
    } catch (error) {
      console.error('Error al guardar la tarea', error);
      console.error('Respuesta del servidor:', error.response ? error.response.data : error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow p-4 rounded">
      <div className="mb-4">
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">Título</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">Descripción</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="status" className="block text-sm font-medium text-gray-700">Estado</label>
        <select
          id="status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
        >
          <option value="pending">Pendiente</option>
          <option value="in_progress">En Progreso</option>
          <option value="completed">Completada</option>
        </select>
      </div>
      <div className="mb-4">
        <label htmlFor="priority" className="block text-sm font-medium text-gray-700">Prioridad</label>
        <select
          id="priority"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
        >
          <option value="low">Baja</option>
          <option value="medium">Media</option>
          <option value="high">Alta</option>
        </select>
      </div>
      <div className="mb-4">
        <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700">Fecha de vencimiento</label>
        <input
          type="date"
          id="dueDate"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
        />
      </div>
      <button
        type="submit"
        disabled={loading}
        className={`bg-blue-500 text-white px-4 py-2 rounded ${loading ? 'opacity-50' : ''}`}
      >
        {loading ? 'Guardando...' : 'Guardar Tarea'}
      </button>
    </form>
  );
};

TaskForm.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    description: PropTypes.string,
    status: PropTypes.oneOf(['pending', 'in_progress', 'completed']),
    priority: PropTypes.oneOf(['low', 'medium', 'high']),
    due_date: PropTypes.string,
  }),
  onTaskSaved: PropTypes.func.isRequired,
};
