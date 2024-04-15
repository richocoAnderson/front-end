// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import authService from '../services/authService';

// function RegisterPage() {
//   const [email, setemail] = useState('');
//   const [password, setPassword] = useState('');
//   const history = useNavigate();

//   const handleRegister = async () => {
//     try {
//       await authService.register(email, password);
//       history.push('/login');
//     } catch (error) {
//       console.error('Registration error:', error);
//       // Handle registration error (e.g., show error message)
//     }
//   };

//   return (
//     <div>
//       <h2>Register</h2>
//       <input type="text" placeholder="email" value={email} onChange={(e) => setemail(e.target.value)} />
//       <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
//       <button onClick={handleRegister}>Register</button>
//     </div>
//   );
// }

// export default RegisterPage;
