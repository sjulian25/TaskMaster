import PropTypes from 'prop-types';  // Importar PropTypes

export const TaskDetail = ({ task }) => {
  return (
    <div className="bg-white shadow rounded p-4">
      <h2 className="font-bold text-xl">{task.title}</h2>
      <p>{task.description}</p>
      <span className="text-sm text-gray-500">{task.status}</span>
    </div>
  );
};

// Validación de las propiedades
TaskDetail.propTypes = {
  task: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
  }).isRequired,
};