import React, { useState, useRef } from 'react';
import StickyNote from './components/StickyNote';
import './App.css';

const App = () => {
  const [notes, setNotes] = useState([]);
  const [nextId, setNextId] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
  const [selectedColor, setSelectedColor] = useState('#FFB3BA');
  const noteContainerRef = useRef(null);

  const addNote = (e) => {
    if (isAdding && e.target.className === 'note-container') {
      const noteContainer = noteContainerRef.current;
      const stickyNoteWidth = 200; 
      const stickyNoteHeight = 150; 

      const containerRect = noteContainer.getBoundingClientRect();
      const offsetX = e.clientX - containerRect.left;
      const offsetY = e.clientY - containerRect.top;

      // Calculate the maximum allowed coordinates for the sticky note
      const maxX = containerRect.width - stickyNoteWidth;
      const maxY = containerRect.height - stickyNoteHeight;

      const newNote = {
        id: nextId,
        // Ensure x coordinate is within bounds
        x: Math.max(0, Math.min(offsetX, maxX)),
        // Ensure y coordinate is within bounds
        y: Math.max(0, Math.min(offsetY, maxY)),
        color: selectedColor,
        content: '',
      };

      setNotes([...notes, newNote]);
      setNextId(nextId + 1);
      setIsAdding(false);
    }
  };

  const updateNote = (id, updatedNote) => {
    setNotes(notes.map((note) => (note.id === id ? updatedNote : note)));
  };

  const removeNote = (id) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  return (
    <div className="App">
      <h1>Sticky Notes</h1>
      <h2>Click on 'Add Note', choose colour from the colour pallete given below and then click anywhere inside the box to add sticky-note</h2>
      <div className="add-note-container">
        <button onClick={() => setIsAdding(true)}>Add Note</button>
        <div className="color-palette-container">
          {['#FFB3BA', '#FFDFBA', '#FFFFBA', '#BAFFC9', '#BAE1FF'].map((color) => (
            <div
              key={color}
              className="color-swatch"
              style={{ backgroundColor: color }}
              onClick={() => setSelectedColor(color)}
            />
          ))}
        </div>
      </div>
      <div className="note-container" ref={noteContainerRef} onClick={addNote}>
        {notes.map((note) => (
          <StickyNote
            key={note.id}
            note={note}
            updateNote={updateNote}
            removeNote={removeNote}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
