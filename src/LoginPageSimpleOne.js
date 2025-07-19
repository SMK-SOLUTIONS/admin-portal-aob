
import { useState } from 'react';
const LoginPage = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const handleLogin = () => {
    if (username === 'admin' && password === 'admin') {
      onLogin(true);
    } else {
      alert('Invalid credentials');
    }
  };
  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-80">
        <h2 className="text-xl font-bold mb-4 text-center">Admin Login</h2>
        <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} className="w-full mb-3 px-3 py-2 border rounded"/>
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full mb-3 px-3 py-2 border rounded"/>
        <button onClick={handleLogin} className="w-full bg-blue-600 text-white py-2 rounded">Login</button>
      </div>
    </div>
  );
};
export default LoginPage;
