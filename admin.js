import React, { useState } from 'react';
import './Admin.css';

const Admin = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [password, setPassword] = useState('');
  const [newProject, setNewProject] = useState({
    title: '',
    description: '',
    category: 'graphics',
    imageUrl: '',
    liveUrl: ''
  });

  // Simple password protection (you can change this)
  const ADMIN_PASSWORD = 'Teboho@2024';

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsLoggedIn(true);
      localStorage.setItem('admin_authed', 'true');
    } else {
      alert('Incorrect password!');
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    
    try {
      // Read existing projects
      const response = await fetch('/data/projects.json');
      let existingProjects = [];
      
      if (response.ok) {
        existingProjects = await response.json();
      }
      
      // Add new project
      const updatedProjects = [...existingProjects, {
        ...newProject,
        id: Date.now(),
        date: new Date().toISOString().split('T')[0]
      }];
      
      // This is where you'd normally send to a server
      // For GitHub Pages, we'll use a different approach
      alert('Project added to memory! To save permanently, copy this JSON:');
      console.log('New projects array:', JSON.stringify(updatedProjects, null, 2));
      
      // Instructions for manual save
      alert(`
        Since this is a static site, here's how to save:
        
        1. Go to your GitHub repo
        2. Edit public/data/projects.json
        3. Replace with new JSON data
        4. Commit changes
        
        Or DM me for automated setup!
      `);
      
      // Reset form
      setNewProject({
        title: '',
        description: '',
        category: 'graphics',
        imageUrl: '',
        liveUrl: ''
      });
      
    } catch (error) {
      alert('Error: ' + error.message);
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="admin-login">
        <div className="login-box">
          <h2>⚙️ Admin Access</h2>
          <p>Enter admin password to upload work</p>
          <form onSubmit={handleLogin}>
            <input
              type="password"
              placeholder="Enter admin password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit">🔓 Login</button>
          </form>
          <p className="hint">Password is set by you (check Admin.js line 12)</p>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-panel">
      <div className="admin-header">
        <h1>⚙️ Admin Control Panel</h1>
        <button 
          className="logout-btn"
          onClick={() => {
            setIsLoggedIn(false);
            localStorage.removeItem('admin_authed');
          }}
        >
          🔒 Logout
        </button>
      </div>

      <div className="admin-sections">
        <section className="upload-section">
          <h2>📤 Upload New Project</h2>
          <form onSubmit={handleUpload}>
            <input
              type="text"
              placeholder="Project Title"
              value={newProject.title}
              onChange={(e) => setNewProject({...newProject, title: e.target.value})}
              required
            />
            
            <textarea
              placeholder="Project Description"
              value={newProject.description}
              onChange={(e) => setNewProject({...newProject, description: e.target.value})}
              required
            />
            
            <select
              value={newProject.category}
              onChange={(e) => setNewProject({...newProject, category: e.target.value})}
            >
              <option value="graphics">🎨 Graphics</option>
              <option value="websites">🌐 Websites</option>
              <option value="cv">📄 CV Designs</option>
            </select>
            
            <input
              type="url"
              placeholder="Image URL (upload to Imgur/Dropbox first)"
              value={newProject.imageUrl}
              onChange={(e) => setNewProject({...newProject, imageUrl: e.target.value})}
            />
            
            <input
              type="url"
              placeholder="Live Website URL (for websites only)"
              value={newProject.liveUrl}
              onChange={(e) => setNewProject({...newProject, liveUrl: e.target.value})}
            />
            
            <div className="form-notes">
              <p><strong>Note:</strong> For images, upload to:</p>
              <ul>
                <li><a href="https://imgur.com" target="_blank" rel="noopener">Imgur.com</a> (free)</li>
                <li><a href="https://dropbox.com" target="_blank" rel="noopener">Dropbox</a> (get share link)</li>
                <li><a href="https://github.com" target="_blank" rel="noopener">GitHub</a> (in your repo)</li>
              </ul>
            </div>
            
            <button type="submit" className="upload-btn">📁 Add to Portfolio</button>
          </form>
        </section>

        <section className="profile-section">
          <h2>👤 Update Profile Picture</h2>
          <div className="profile-upload">
            <p>Current Profile:</p>
            <img 
              src="/profile.jpg" 
              alt="Current Profile" 
              className="current-profile"
            />
            <input type="file" accept="image/*" id="profileUpload" />
            <label htmlFor="profileUpload" className="file-upload-btn">
              📷 Upload New Photo
            </label>
            <p className="instruction">
              Replace <code>public/profile.jpg</code> in your GitHub repo
            </p>
          </div>
        </section>

        <section className="data-section">
          <h2>💾 Current Projects Data</h2>
          <button 
            className="view-data-btn"
            onClick={async () => {
              const response = await fetch('/data/projects.json');
              const data = await response.json();
              alert('Check browser console for JSON data!');
              console.log('Current projects:', JSON.stringify(data, null, 2));
            }}
          >
            👁️ View JSON Data
          </button>
          <p>Copy this JSON to update your projects.json file</p>
        </section>
      </div>
    </div>
  );
};

export default Admin;
