import {useContext, useState} from "react";
import {Navigate, Link} from "react-router-dom";
import {UserContext} from "../UserContext";

export default function LoginPage() {
  const [username,setUsername] = useState('');
  const [password,setPassword] = useState('');
  const [redirect,setRedirect] = useState(false);
  const [error, setError] = useState('');
  const {setUserInfo} = useContext(UserContext);

  async function login(ev) {
    ev.preventDefault();
    setError('');
    const response = await fetch('http://localhost:4000/login', {
      method: 'POST',
      body: JSON.stringify({username, password}),
      headers: {'Content-Type':'application/json'},
      credentials: 'include',
    });
    if (response.ok) {
      response.json().then(userInfo => {
        setUserInfo(userInfo);
        setRedirect(true);
      });
    } else {
      setError('Invalid username or password');
    }
  }

  if (redirect) {
    return <Navigate to={'/'} />
  }
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#fff'
    }}>
      <form onSubmit={login} style={{
        width: '100%',
        maxWidth: '400px',
        padding: '2rem',
        backgroundColor: 'white',
        borderRadius: '12px',
        border: '1px solid #e5e7eb',
        boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.07), 0 2px 4px -2px rgb(0 0 0 / 0.05)'
      }}>
        <h1 style={{
          fontSize: '2rem',
          fontWeight: '700',
          color: '#1a1a1a',
          marginBottom: '2rem',
          textAlign: 'center',
          letterSpacing: '-0.025em',
          lineHeight: '1.2',
          fontFamily: 'system-ui, -apple-system, sans-serif'
        }}>Login</h1>
        
        {error && (
          <div style={{
            backgroundColor: '#fff0f0',
            color: '#d32f2f',
            padding: '0.75rem',
            borderRadius: '0.5rem',
            marginBottom: '1rem',
            fontSize: '0.95rem',
            border: '1px solid #ffd6d6'
          }}>
            {error}
          </div>
        )}

        <div style={{ marginBottom: '1.5rem' }}>
          <input 
            type="text"
            placeholder="Username"
            value={username}
            onChange={ev => setUsername(ev.target.value)}
            style={{
              width: '100%',
              padding: '0.75rem 1rem',
              borderRadius: '0.5rem',
              border: '1px solid #e5e7eb',
              fontSize: '1rem',
              outline: 'none',
              background: '#fff',
              color: '#1a1a1a',
              marginBottom: 0,
              transition: 'border-color 0.2s',
            }}
          />
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <input 
            type="password"
            placeholder="Password"
            value={password}
            onChange={ev => setPassword(ev.target.value)}
            style={{
              width: '100%',
              padding: '0.75rem 1rem',
              borderRadius: '0.5rem',
              border: '1px solid #e5e7eb',
              fontSize: '1rem',
              outline: 'none',
              background: '#fff',
              color: '#1a1a1a',
              marginBottom: 0,
              transition: 'border-color 0.2s',
            }}
          />
        </div>

        <button style={{
          width: '100%',
          padding: '0.75rem 1rem',
          backgroundColor: '#1a1a1a',
          color: 'white',
          borderRadius: '0.5rem',
          fontSize: '1rem',
          fontWeight: '500',
          cursor: 'pointer',
          transition: 'background-color 0.2s',
          border: 'none',
          marginBottom: '1rem'
        }}>Login</button>

        
      </form>
    </div>
  );
}