
import { useState } from 'react';

// Simulated mock user data
const mockUsers = [
  { username: 'admin', password: 'admin123', otp: '123456', role: 'Super Admin' },
  { username: 'ch_user', password: 'channel123', otp: '654321', role: 'CH' }
];

const LoginPage = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [loginMode, setLoginMode] = useState('password'); // 'password' or 'otp'
  const [error, setError] = useState('');

  const handleLogin = () => {
    const user = mockUsers.find(u => u.username === username);

    if (!user) {
      setError('User not found');
      return;
    }

    if (loginMode === 'password' && user.password === password) {
      sessionStorage.setItem('user', JSON.stringify(user));
      onLogin(user);
    } else if (loginMode === 'otp' && user.otp === otp) {
      sessionStorage.setItem('user', JSON.stringify(user));
      onLogin(user);
    } else {
      setError('Invalid credentials');
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100 text-gray-800">
      <div className="bg-white shadow-md rounded px-8 py-6 w-full max-w-sm">
        <h2 className="text-xl font-semibold mb-4 text-center">Admin Portal Login</h2>

        <input
          className="w-full p-2 mb-3 border border-gray-300 rounded"
          type="text"
          placeholder="Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />

        {loginMode === 'password' ? (
          <input
            className="w-full p-2 mb-3 border border-gray-300 rounded"
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        ) : (
          <input
            className="w-full p-2 mb-3 border border-gray-300 rounded"
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={e => setOtp(e.target.value)}
          />
        )}

        {error && <div className="text-red-500 mb-2 text-sm">{error}</div>}

        <button
          className="bg-gray-800 text-white w-full py-2 rounded hover:bg-[#034ea2]"
          onClick={handleLogin}
        >
          Login
        </button>

        <div className="mt-4 text-center text-sm">
          {loginMode === 'password' ? (
            <button
              className="text-blue-500 underline"
              onClick={() => { setLoginMode('otp'); setError(''); }}
            >
              Login with OTP
            </button>
          ) : (
            <button
              className="text-blue-500 underline"
              onClick={() => { setLoginMode('password'); setError(''); }}
            >
              Login with Password
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
