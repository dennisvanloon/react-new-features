import React, { useState, useEffect, useReducer } from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';

// const App = (props) => {
//   const [count, setCount] = useState(props.count || 0);
//   const [text, setText] = useState('') 

//   useEffect(() => {
//     console.log('This should only run once');
//     document.title = count;
//   }, [])
  
//   useEffect(() => {
//     console.log('useEffect ran');
//     document.title = count;
//   }, [count])
  
//   return (
//     <div>
//       <p>The current {text || 'count'} is {count}</p>
//       <button onClick={() => setCount(count + 1)}>+1</button>
//       <button onClick={() => setCount(count - 1)}>-1</button>
//       <button onClick={() => setCount(0)}>Reset</button>
//       <input value={text} onChange={(e) => setText(e.target.value)} />
//     </div>
//   )
// }

const notesReducer = (state, action) => {
  switch(action.type) {
    case 'POPULATE_NOTES':
      return action.notes
    case 'ADD_NOTE':
      return [...state, 
        { title: action.title, body: action.body }
      ]
    case 'REMOVE_NOTE':
      return state.filter((note) => note.title !== action.title)
    default:
      return state
  }
}

const NoteApp = () => {

  const [notes, dispatch] = useReducer(notesReducer, [])
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')

  useEffect(() => {
    const notes = JSON.parse(localStorage.getItem('notes'))
    if (notes) {
      dispatch({ type: 'POPULATE_NOTES', notes})
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes))  
  }, [notes])

  const addNote = (e) => {
    e.preventDefault();
    dispatch ({
      type: 'ADD_NOTE',
      title,
      body
    })
    setTitle('');
    setBody('');
  }

  const removeNote = (title) => {
    dispatch ({
      type: 'REMOVE_NOTE',
      title
    })
  }

  return  (
    <div>
      <h1>Notes</h1>
      {notes.map((note) => (
        <Note key={note.title} note={note} removeNote={removeNote} />
      ))}
      <p>Add note</p>
      <form onSubmit={addNote}>
        <input value={title} onChange={(e) => setTitle(e.target.value)} />
        <textarea value={body} onChange={(e) => setBody(e.target.value)} />
        <button>add note</button>
      </form>
    </div>
  )

}

const Note = ({ note, removeNote }) => {
  useEffect(() => {
    console.log('Setting up effect');
    return () => {
      console.log('Cleaning up effect')
    }
  }, [])
  return (
    <div>
      <h3>{note.title}</h3>
      <p>{note.body}</p>
      <button onClick={() => removeNote(note.title)}>remove</button>
    </div>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <NoteApp />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();


