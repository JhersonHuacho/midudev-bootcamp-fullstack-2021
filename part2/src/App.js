import { useState, useEffect } from 'react';
import noteServices from './services/notes';
import './App.css';
import Note from './components/Note';
import Notification from './components/Notification';

const Footer = () => {
  
  const footerStyle = {
    color: 'green',
    fontStyle: 'italic',
    fontSize: 16
  }

  return (
    <div className={footerStyle}>
      <br />
      <em>Note app, Department of Computer Science, University of Helsinki 2020 </em>
    </div>
  )
}

function App() {
  //log
  //clo
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');
  const [showAll, setShowAll] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  const addNote = (event) => {
    event.preventDefault();
    const noteObject = {
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() < 0.5
    }
    noteServices.create(noteObject)
      .then(returnedNote => {
        setNotes(notes.concat(returnedNote));
        setNewNote('');
      });
  }

  const handleNoteChange = (event) => {
    setNewNote(event.target.value);
  }

  const toggleImportanceOf = (id) => {
    console.log('importance of ' + id + ' needs to be toggled');
    const note = notes.find(note => note.id === id);
    const changedNote = { ...note, important: !note.important };

    noteServices.update(id, changedNote)
      .then(returnedNote => {
        setNotes(
          notes.map(note => note.id === id ? returnedNote : note)
        );
      })
      .catch(error => {
        setErrorMessage(
          `Note '${note.content}' was already removed from server'`
        );
        // alert(`the note '${note.content}' was already deleted from server`)
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
        setNotes(notes.filter(note => note.id !== id));
      })
  }

  const notesToShow = showAll 
    ? notes
    : notes.filter(note => note.important)
  
  useEffect(() => {
    noteServices.getAll()
      .then(initialNotes => {
        setNotes(initialNotes);
      })
  }, [])

  console.log('render', notes.length, 'notes');
  
  return (
    <div className="App">
      <h1>Notes</h1>
      <Notification message={errorMessage}  />
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          Show {showAll ? 'Important' : 'All'}
        </button>
      </div>
      <ul>
        {notesToShow.map(
          note => (
            // <li key={note.id}>{note.content}</li>
            <Note 
              key={note.id} 
              note={note} 
              toggleImportance={() => toggleImportanceOf(note.id)} 
            />
          )
        )}
      </ul>
      <form onSubmit={addNote}>
        <input 
          value={newNote}
          onChange={handleNoteChange}
        />
        <button type="submit">save</button>
      </form>
      <Footer />
    </div>
  );
}

export default App;
