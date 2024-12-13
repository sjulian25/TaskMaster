// import { Routes, Route, Navigate } from 'react-router-dom';
// import Login from './components/auth/Login';
// import Dashboard from './pages/Dashboard';
// import { PropTypes } from 'prop-types';

// function App() {
//   // Función para verificar si hay token de autenticación
//   const isAuthenticated = () => {
//     return !!localStorage.getItem('access_token');
//   };

//   // Componente de ruta protegida
//   const PrivateRoute = ({ children }) => {
//     return isAuthenticated() ? children : <Navigate to="/login" />;
//   };

//   // Validación de las props
//   PrivateRoute.propTypes = {
//     children: PropTypes.node.isRequired,
//   };

//   return (
//     <Routes>
//       <Route path="/login" element={<Login />} />
//       <Route 
//         path="/dashboard" 
//         element={
//           <PrivateRoute>
//             <Dashboard />
//           </PrivateRoute>
//         } 
//       />
//       <Route path="/" element={<Navigate to="/dashboard" />} />
//     </Routes>
//   );
// }

// export default App;

import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/auth/Login';
import Register from './components/auth/Register'; // Importar el componente de registro
import Dashboard from './pages/Dashboard';
import { PropTypes } from 'prop-types';

function App() {
  // Función para verificar si hay token de autenticación
  const isAuthenticated = () => {
    return !!localStorage.getItem('access_token');
  };

  // Componente de ruta protegida
  const PrivateRoute = ({ children }) => {
    return isAuthenticated() ? children : <Navigate to="/login" />;
  };

  // Validación de las props
  PrivateRoute.propTypes = {
    children: PropTypes.node.isRequired,
  };

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} /> {/* Nueva ruta */}
      <Route 
        path="/dashboard" 
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        } 
      />
      <Route path="/" element={<Navigate to="/dashboard" />} />
    </Routes>
  );
}

export default App;
