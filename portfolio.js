import React, { useState, useEffect } from 'react';
import './Portfolio.css';

const Portfolio = () => {
  const [projects, setProjects] = useState([]);
  const [category, setCategory] = useState('all');

  useEffect(() => {
    // Load projects from JSON file
    fetch('/data/projects.json')
      .then(response => response.json())
      .then(data => setProjects(data))
      .catch(() => {
        // Fallback if JSON doesn't exist yet
        setProjects([]);
      });
  }, []);

  const filteredProjects = category === 'all' 
    ? projects 
    : projects.filter(p => p.category === category);

  return (
    <div className="portfolio-page">
      <h1>My Work Portfolio</h1>
      
      <div className="category-filters">
        <button 
          className={category === 'all' ? 'active' : ''}
          onClick={() => setCategory('all')}
        >
          🎯 All Work
        </button>
        <button 
          className={category === 'graphics' ? 'active' : ''}
          onClick={() => setCategory('graphics')}
        >
          🎨 Graphics
        </button>
        <button 
          className={category === 'websites' ? 'active' : ''}
          onClick={() => setCategory('websites')}
        >
          🌐 Websites
        </button>
        <button 
          className={category === 'cv' ? 'active' : ''}
          onClick={() => setCategory('cv')}
        >
          📄 CV Designs
        </button>
      </div>

      <div className="projects-container">
        {filteredProjects.length === 0 ? (
          <div className="empty-state">
            <p>No projects yet. Check back soon!</p>
            <p><small>(Admin can add projects via ⚙️ panel)</small></p>
          </div>
        ) : (
          filteredProjects.map((project, index) => (
            <div key={index} className="project-card">
              {project.imageUrl && (
                <div className="project-image">
                  <img 
                    src={project.imageUrl} 
                    alt={project.title}
                    onError={(e) => {
                      e.target.src = `https://placehold.co/400x300/667eea/fff?text=${encodeURIComponent(project.title)}`;
                    }}
                  />
                </div>
              )}
              <div className="project-info">
                <span className={`category-badge ${project.category}`}>
                  {project.category === 'graphics' && '🎨'}
                  {project.category === 'websites' && '🌐'}
                  {project.category === 'cv' && '📄'}
                  {project.category}
                </span>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                
                {project.category === 'websites' && project.liveUrl && (
                  <a 
                    href={project.liveUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="live-site-btn"
                  >
                    🌐 Visit Live Site
                  </a>
                )}
                
                {project.category === 'graphics' && project.downloadUrl && (
                  <a 
                    href={project.downloadUrl} 
                    className="download-btn"
                    download
                  >
                    ⬇️ Download Sample
                  </a>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Portfolio;
