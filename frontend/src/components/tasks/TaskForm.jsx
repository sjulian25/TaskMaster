import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { taskService } from '../../services/api';

export const TaskForm = ({ onTaskSaved, taskToEdit }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('pending');
  const [priority, setPriority] = useState('medium');
  const [dueDate, setDueDate] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (taskToEdit) {
      setTitle(taskToEdit.title || '');
      setDescription(taskToEdit.description || '');
      setStatus(taskToEdit.status || 'pending');
      setPriority(taskToEdit.priority || 'medium');
      setDueDate(taskToEdit.due_date ? new Date(taskToEdit.due_date).toISOString().split('T')[0] : '');
    }
  }, [taskToEdit]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const taskData = {
      title,
      description,
      status,
      priority,
    };

    if (dueDate) {
      taskData.due_date = dueDate;
    }

    try {
      setLoading(true);
      if (taskToEdit) {
        await taskService.updateTask(taskToEdit.id, taskData);
      } else {
        await taskService.createTask(taskData);
      }
      onTaskSaved();
      setTitle('');
      setDescription('');
      setStatus('pending');
      setPriority('medium');
      setDueDate('');
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
        {loading ? 'Guardando...' : taskToEdit ? 'Actualizar Tarea' : 'Guardar Tarea'}
      </button>
    </form>
  );
};

TaskForm.propTypes = {
  taskToEdit: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    description: PropTypes.string,
    status: PropTypes.oneOf(['pending', 'in_progress', 'completed']),
    priority: PropTypes.oneOf(['low', 'medium', 'high']),
    due_date: PropTypes.string,
  }),
  onTaskSaved: PropTypes.func.isRequired,
};
