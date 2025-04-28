import {Link} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import {UserContext} from "./UserContext";

export default function Header() {
  const {setUserInfo,userInfo} = useContext(UserContext);
  useEffect(() => {
    fetch('http://localhost:4000/profile', {
      credentials: 'include',
    }).then(response => {
      response.json().then(userInfo => {
        setUserInfo(userInfo);
      });
    });
  }, []);

  function logout() {
    fetch('http://localhost:4000/logout', {
      credentials: 'include',
      method: 'POST',
    });
    setUserInfo(null);
  }

  const username = userInfo?.username;

  return (
    <header>
      <Link to="/" className="logo">  <img src="/aitam.webp" alt="logo" style={{ objectFit: 'contain'}} />
      </Link>
      <nav>
        {username && (
          <>
            <Link to="/create">
              <img src="/create.png" alt="Create" style={{width: '40px', height: '40px', objectFit: 'contain'}} />
            
            </Link>
            <Link to="/" onClick={logout}>
              <img src="/logout.png" alt="Logout" style={{width: '40px', height: '40px', objectFit: 'contain'}} />
             
            </Link>
          </>
        )}
      </nav>
    </header>
  );
}
