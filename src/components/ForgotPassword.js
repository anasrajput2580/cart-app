// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// const ForgotPassword = () => {
//   const [email, setEmail] = useState('');
//   const [message, setMessage] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);

//     try {
//       const response = await fetch('/api/reset-password', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ email }),
//       });

//       if (response.ok) {
//         setMessage('A password reset email has been sent to your email address.');
//         setEmail(''); // Clear the input field
//       } else {
//         const errorData = await response.json();
//         setMessage(errorData.message || 'Error sending password reset email. Please try again.');
//       }
//     } catch (error) {
//       setMessage('Network error. Please check your connection and try again.');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const containerStyle = {
//     display: 'flex',
//     justifyContent: 'center',
//     alignItems: 'center',
//     height: '100vh',
//     background: 'linear-gradient(135deg, #6a11cb, #2575fc)',
//     fontFamily: 'Arial, sans-serif',
//   };

//   const formStyle = {
//     backgroundColor: '#ffffff',
//     padding: '2rem',
//     borderRadius: '10px',
//     boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
//     width: '100%',
//     maxWidth: '400px',
//     textAlign: 'center',
//   };

//   const headingStyle = {
//     fontSize: '1.8rem',
//     marginBottom: '1rem',
//     color: '#333333',
//   };

//   const inputStyle = {
//     width: '90%',
//     padding: '10px',
//     margin: '0.5rem 0',
//     border: '1px solid #cccccc',
//     borderRadius: '5px',
//     fontSize: '1rem',
//   };

//   const buttonStyle = {
//     backgroundColor: isLoading ? '#cccccc' : '#6a11cb',
//     color: '#ffffff',
//     border: 'none',
//     padding: '10px 20px',
//     borderRadius: '5px',
//     cursor: isLoading ? 'not-allowed' : 'pointer',
//     fontSize: '1rem',
//     transition: 'background-color 0.3s ease',
//     marginTop: '1rem',
//   };

//   const messageStyle = {
//     marginTop: '1rem',
//     color: message.includes('error') ? 'red' : '#333333',
//     fontSize: '0.9rem',
//   };

//   return (
//     <div style={containerStyle}>
//       <form style={formStyle} onSubmit={handleSubmit}>
//         <h2 style={headingStyle}>Forgot Password</h2>
//         <p>Enter your email address below to reset your password.</p>
//         <input
//           type="email"
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           style={inputStyle}
//           required
//         />
//         <button type="submit" style={buttonStyle} disabled={isLoading}>
//           {isLoading ? 'Sending...' : 'Send Reset Email'}
//         </button>
//         <p style={messageStyle}>{message}</p>
//         <button
//           type="button"
//           onClick={() => navigate('/')}
//           style={{
//             ...buttonStyle,
//             backgroundColor: '#2575fc',
//             marginTop: '1rem',
//           }}
//         >
//           Back to Login
//         </button>
//       </form>
//     </div>
//   );
// };

// export default ForgotPassword;
import React, { useState } from 'react';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [step, setStep] = useState(1); // Step 1: Enter details, Step 2: Reset password
  const [message, setMessage] = useState('');

  const handleValidation = async (e) => {
    e.preventDefault();
    const response = await fetch('/api/validate-user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, username }),
    });

    if (response.ok) {
      setStep(2); // Move to password reset step
    } else {
      setMessage('Invalid email or username.');
    }
  };

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    const response = await fetch('/api/reset-password', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, newPassword }),
    });

    if (response.ok) {
      setMessage('Password successfully updated. You can now log in.');
    } else {
      setMessage('Failed to reset password. Please try again.');
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      {step === 1 ? (
        <form onSubmit={handleValidation}>
          <h2>Forgot Password</h2>
          <p>Enter your email and username to reset your password.</p>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <button type="submit">Validate</button>
        </form>
      ) : (
        <form onSubmit={handlePasswordReset}>
          <h2>Reset Password</h2>
          <p>Enter your new password below.</p>
          <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
          <button type="submit">Reset Password</button>
        </form>
      )}
      {message && <p>{message}</p>}
    </div>
  );
};

export default ForgotPassword;
