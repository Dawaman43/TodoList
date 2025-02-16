import React, { useState, useRef } from "react";
import './Todo.css';

const Todo = () => {
  const [todo, setTodo] = useState('');
  const [todos, setTodos] = useState([]);
  const [currentView, setCurrentView] = useState('todo');
  const [editingIndex, setEditingIndex] = useState(null);
  const [editText, setEditText] = useState('');
  const audioRef = useRef(null);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleInput = (e) => {
    setTodo(e.target.value);
  };

  const addTodo = () => {
    if (todo) {
      const currentTime = new Date().toLocaleTimeString(); 
      setTodos([...todos, { text: todo, time: currentTime, completed: false }]);
      setTodo('');
    }
  };

  const removeTodo = (index) => {
    setTodos(todos.filter((_, i) => i !== index)); 
  };

  const toggleComplete = (index) => {
    const updatedTodos = [...todos];
    updatedTodos[index].completed = !updatedTodos[index].completed;
    setTodos(updatedTodos);
  };

  const startEdit = (index) => {
    setEditingIndex(index);
    setEditText(todos[index].text);
  };

  const saveEdit = (index) => {
    if (editText) {
      const updatedTodos = [...todos];
      updatedTodos[index].text = editText;
      setTodos(updatedTodos);
      setEditingIndex(null);
      setEditText('');
    }
  };

  const cancelEdit = () => {
    setEditingIndex(null);
    setEditText('');
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('audio/')) {
      setUploadedFile(URL.createObjectURL(file));
      audioRef.current.load();
    } else {
      alert('Please upload a valid audio file.');
    }
  };

  const handlePlayPause = () => {
    if (audioRef.current.paused) {
      audioRef.current.play();
      setIsPlaying(true);
    } else {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const TodoList = () => (
    <div className="todo-list">
      {todos.map((todoItem, index) => (
        <div key={index} className={`todo-item ${todoItem.completed ? 'completed' : ''}`}>
          {editingIndex === index ? (
            <>
              <input
                type="text"
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                className="edit-input"
                autoFocus
              />
              <button className="btn btn-success" onClick={() => saveEdit(index)}>
                <i className="fas fa-check"></i> Save
              </button>
              <button className="btn btn-danger" onClick={cancelEdit}>
                <i className="fas fa-times"></i> Cancel
              </button>
            </>
          ) : (
            <>
              <span onClick={() => toggleComplete(index)}>{todoItem.text}</span>
              <div className="todo-time">
                <span>Added at: {todoItem.time}</span>
              </div>
              <button className="btn btn-warning" onClick={() => startEdit(index)}>
                <i className="fas fa-edit"></i> Edit
              </button>
              <button
                className="btn btn-danger"
                onClick={() => removeTodo(index)}
              >
                <i className="fas fa-trash-alt"></i>
              </button>
            </>
          )}
        </div>
      ))}
    </div>
  );

  const NumberGuessingGame = () => {
    const [guess, setGuess] = useState('');
    const [numberToGuess, setNumberToGuess] = useState(Math.floor(Math.random() * 100) + 1);
    const [message, setMessage] = useState('');

    const handleGuessChange = (e) => {
      setGuess(e.target.value);
    };

    const checkGuess = () => {
      const parsedGuess = parseInt(guess, 10);
      if (parsedGuess === numberToGuess) {
        setMessage('Congratulations! You guessed the right number!');
        setNumberToGuess(Math.floor(Math.random() * 100) + 1);
      } else if (parsedGuess < numberToGuess) {
        setMessage('Too low, try again.');
      } else {
        setMessage('Too high, try again.');
      }
      setGuess('');
    };

    return (
      <div className="game-container">
        <h2>Number Guessing Game</h2>
        <p>Guess a number between 1 and 100:</p>
        <input
          type="number"
          value={guess}
          onChange={handleGuessChange}
          className="game-input"
        />
        <button className="btn btn-primary" onClick={checkGuess}>Guess</button>
        <p>{message}</p>
      </div>
    );
  };

  const RockPaperScissorsGame = () => {
    const [userChoice, setUserChoice] = useState('');
    const [computerChoice, setComputerChoice] = useState('');
    const [result, setResult] = useState('');

    const choices = ['rock', 'paper', 'scissors'];

    const getComputerChoice = () => {
      return choices[Math.floor(Math.random() * choices.length)];
    };

    const determineWinner = (user, computer) => {
      if (user === computer) return 'It\'s a tie!';
      if (
        (user === 'rock' && computer === 'scissors') ||
        (user === 'scissors' && computer === 'paper') ||
        (user === 'paper' && computer === 'rock')
      ) {
        return 'You win!';
      }
      return 'You lose!';
    };

    const playGame = (choice) => {
      setUserChoice(choice);
      const compChoice = getComputerChoice();
      setComputerChoice(compChoice);
      setResult(determineWinner(choice, compChoice));
    };

    return (
      <div className="game-container">
        <h2>Rock Paper Scissors Game</h2>
        <div className="choices">
          <button className="btn btn-secondary" onClick={() => playGame('rock')}>Rock</button>
          <button className="btn btn-secondary" onClick={() => playGame('paper')}>Paper</button>
          <button className="btn btn-secondary" onClick={() => playGame('scissors')}>Scissors</button>
        </div>
        <div className="result">
          <p>You chose: {userChoice}</p>
          <p>Computer chose: {computerChoice}</p>
          <p>{result}</p>
        </div>
      </div>
    );
  };

  const MusicPlayer = () => (
    <div className="music-player">
      <h2>Music Player</h2>
      <input type="file" accept="audio/*" onChange={handleFileUpload} className="file-input" />
      <div className="cd-container">
        <img
          src="./music-player.jpg"
          alt="CD"
          className={`cd ${isPlaying ? 'rotating' : ''}`}
        />
      </div>
      <audio ref={audioRef} src={uploadedFile || "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"} onPlay={handlePlayPause} onPause={handlePlayPause} controls></audio>
    </div>
  );

  return (
    <div className={`app-container ${isDarkMode ? 'dark-mode' : ''}`}>
      <nav className="navbar">
        <ul className="nav-list">
          <li className="nav-item" onClick={() => setCurrentView('todo')}>Todo List</li>
          <li className="nav-item" onClick={() => setCurrentView('games')}>Games</li>
          <li className="nav-item" onClick={() => setCurrentView('music')}>Music Player</li>
          <li className="nav-item" onClick={toggleDarkMode}>
            <i className={`fas fa-${isDarkMode ? 'sun' : 'moon'}`}></i> {isDarkMode ? 'Light Mode' : 'Dark Mode'}
          </li>
        </ul>
      </nav>
      <section className="content">
        {currentView === 'todo' && (
          <div className="todo-container">
            <div className="todo-input-container">
              <input
                type="text"
                value={todo}
                onChange={handleInput}
                placeholder="Insert your Todo"
                className="todo-input"
              />
              <button onClick={addTodo} className="btn btn-success">
                <i className="fas fa-plus-circle"></i> Add
              </button>
            </div>
            <TodoList />
          </div>
        )}
        {currentView === 'games' && (
          <div className="games-container">
            <div className="game-tab">
              <button className="btn btn-primary" onClick={() => setCurrentView('number-game')}>Number Guessing Game</button>
              <button className="btn btn-primary" onClick={() => setCurrentView('rps-game')}>Rock Paper Scissors Game</button>
            </div>
            {currentView === 'number-game' && <NumberGuessingGame />}
            {currentView === 'rps-game' && <RockPaperScissorsGame />}
          </div>
        )}
        {currentView === 'music' && <MusicPlayer />}
      </section>
    </div>
  );
};

export default Todo;