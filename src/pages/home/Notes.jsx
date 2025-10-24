import React from 'react';

// TODO: Create a CSS file at this path and move your 'notes.css'
// styles into it. Then, uncomment the line below.
import './styles/Notes.css';

// Data for the notes/articles
const notesData = [
  {
    title: "Design systems for small teams",
    text: "How I approach component-driven design, tokens and scale without bureaucracy."
  },
  {
    title: "Optimizing Flutter animations",
    text: "Tips and patterns for smooth cross-platform motion and performance tuning."
  },
  {
    title: "Photography — light, story, intent",
    text: "Editorial lighting approaches that also inform interface composition."
  }
];

const Notes = () => {
  return (
    <section id="notes" className="notes-section section site-container">
      <h2 className="section-title">Notes & Writings</h2>
      <div className="notes-grid">
        
        {notesData.map((note, index) => (
          <article className="note-card" key={index}>
            <div className="card-content">
              <h3 className="note-card__title">{note.title}</h3>
              <p className="note-card__text">{note.text}</p>
            </div>
          </article>
        ))}

      </div>
    </section>
  );
};

export default Notes;
