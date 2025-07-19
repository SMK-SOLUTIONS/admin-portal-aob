
import { useState } from 'react';
import './LoginPage.css'; // Assume custom styles if needed
import AgilusLogo from './Agilus Logo.jpg';
import PropTypes from 'prop-types';

function LoginPage({ onLogin }) {
  const [step, setStep] = useState(1);
  const [emailOrMobile, setEmailOrMobile] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [useOtp, setUseOtp] = useState(true);

  const handleLogin = () => {
    if ((useOtp && otp === '123456') || (!useOtp && password === 'admin')) {
      sessionStorage.setItem('isLoggedIn', 'true');
      onLogin(true);
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-[#034ea2] to-gray-400">
      <div className="bg-white p-10 rounded-3xl shadow-lg w-full max-w-md text-center">
        <img src={AgilusLogo} alt="Logo" className="mx-auto mb-6 w-52" />
        {step === 1 && (
          <>
            <label className="block text-left font-semibold text-[#034ea2] mb-2">Mobile / Email ID
            <input
              type="text"
              value={emailOrMobile}
              onChange={(e) => setEmailOrMobile(e.target.value)}
              className="w-full px-4 py-2 border rounded mb-4"
              placeholder="Enter Mobile or Email"
            />
            </label>
            <div className="flex justify-between text-sm mb-4">
              <label>
                <input type="radio" checked={useOtp} onChange={() => setUseOtp(true)} /> Login with OTP
              </label>
              <label>
                <input type="radio" checked={!useOtp} onChange={() => setUseOtp(false)} /> Login with Password
              </label>
            </div>
            <button
              onClick={() => setStep(2)}
              className="w-full bg-[#034ea2] text-white py-2 rounded hover:bg-[#034da296]"
            >
              {useOtp ? 'Send OTP' : 'Continue'}
            </button>
          </>
        )}
        {step === 2 && (
          <>
            {useOtp ? (
                <label className="block text-left font-semibold text-[#034ea2] mb-2">Enter OTP
                  <input
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    className="w-full px-4 py-2 border rounded mb-4"
                    placeholder="Enter OTP (e.g. 123456)"
                  />
                </label>
            ) : (
                <label className="block text-left font-semibold text-[#034ea2] mb-2">password
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-2 border rounded mb-4"
                    placeholder="Enter Password (e.g. admin)"
                  />
                </label>
            )}
            <button
              onClick={handleLogin}
              className="w-full bg-[#034ea2] text-white py-2 rounded hover:bg-[#034da296]"
            >
              Login
            </button>
          </>
        )}
      </div>
    </div>
  );
}

LoginPage.propTypes = {
  onLogin: PropTypes.func.isRequired,
};

export default LoginPage;
