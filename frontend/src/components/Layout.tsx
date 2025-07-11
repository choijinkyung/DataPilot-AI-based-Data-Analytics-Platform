// src/components/Layout.tsx
import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import '@styles/components/layout.scss'; // 선택: 스타일 정의

const Layout = () => {
  return (
    <div className="layout">
      <nav className="navbar">
        <div className="logo">DataPilot</div>
        <ul className="nav-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/upload">Upload</Link></li>
          <li><Link to="/analyze">Analyze</Link></li>
          <li><Link to="/results">Results</Link></li>
          <li><Link to="/user">User</Link></li>
        </ul>
      </nav>

      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;