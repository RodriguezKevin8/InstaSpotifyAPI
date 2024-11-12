// src/Register.jsx
import  { useState } from 'react';
import './Register.css';
import { Link } from 'react-router-dom';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [userType, setUserType] = useState('usuario');

  const handleRegister = (e) => {
    e.preventDefault();
    // Aquí iría la lógica para enviar los datos a tu backend
    console.log('Registrando usuario con:', { username, email, password, name, userType });
  };

  return (
    <div className="register-container">
      <h2>Crear Cuenta</h2>
      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Nombre de usuario"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Nombre"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <select
          value={userType}
          onChange={(e) => setUserType(e.target.value)}
          required
        >
          <option value="usuario">Usuario Normal</option>
          <option value="artista">Artista</option>
        </select>
        <button type="submit">Crear Cuenta</button>
      </form>
      <p>
        ¿Ya tienes una cuenta? <Link to="/login">Iniciar sesión</Link>
      </p>
    </div>
  );
};

export default Register;
