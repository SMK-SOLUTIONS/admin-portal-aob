
import { useState } from 'react';

// Simulated mock user data
const mockUsers = [
  { username: 'admin', password: 'admin123', otp: '123456', role: 'Super Admin' },
  { username: 'ch_user', password: 'channel123', otp: '654321', role: 'CH' }
];

const LoginPage = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState('input'); // input or verify
  const [error, setError] = useState('');

  const handleSendOtp = () => {
    const user = mockUsers.find(u => u.username === username);
    if (!user) {
      setError('User not found');
      return;
    }
    setStep('verify');
    setError('');
  };

  const handleVerifyOtp = () => {
    const user = mockUsers.find(u => u.username === username && u.otp === otp);
    if (user) {
      sessionStorage.setItem('user', JSON.stringify(user));
      onLogin(user);
    } else {
      setError('Invalid OTP');
    }
  };

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-gradient-to-tr from-[#034ea2] to-gray-300">
      <div className="bg-white rounded-[40px] w-full max-w-md p-10 shadow-2xl text-center">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Agilus_Diagnostics_Logo.png/600px-Agilus_Diagnostics_Logo.png"
          alt="Agilus Logo"
          className="mx-auto h-20 mb-2"
        />
        <div className="text-sm text-gray-500 mb-6">Subsidiary of Fortis Healthcare Limited</div>

        {step === 'input' ? (
          <>
            <div className="text-left font-semibold text-[#034ea2] mb-2">Mobile / Email ID</div>
            <input
              className="w-full p-3 mb-4 border border-gray-300 rounded-xl focus:outline-none"
              type="text"
              placeholder="Enter Mobile or Email"
              value={username}
              onChange={e => setUsername(e.target.value)}
            />
            {error && <div className="text-red-500 text-sm mb-3">{error}</div>}
            <button
              className="w-full py-3 bg-gray-400 text-white rounded-full text-sm font-medium disabled:opacity-50"
              onClick={handleSendOtp}
              disabled={!username}
            >
              Send OTP
            </button>
          </>
        ) : (
          <>
            <div className="text-left font-semibold text-[#034ea2] mb-2">Enter OTP</div>
            <input
              className="w-full p-3 mb-4 border border-gray-300 rounded-xl focus:outline-none"
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={e => setOtp(e.target.value)}
            />
            {error && <div className="text-red-500 text-sm mb-3">{error}</div>}
            <button
              className="w-full py-3 bg-gray-800 text-white rounded-full text-sm font-medium"
              onClick={handleVerifyOtp}
            >
              Verify OTP
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default LoginPage;
