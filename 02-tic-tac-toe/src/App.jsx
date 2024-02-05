import { useState } from 'react';
import confetti from 'canvas-confetti';
import { Square } from './components/Square';
import { TURNS } from './constants';
import { checkWinner, checkEndGame } from './logic/board';
import { WinnerModal } from './components/WinnerModal';

//Storage
import { resetGameStorage } from './logic/storage/index';

function App() {
  const [board, setBoard] = useState(() => {
    const boardFromStorage = window.localStorage.getItem('board');
    return boardFromStorage
      ? JSON.parse(boardFromStorage)
      : Array(9).fill(null);
  });
  const [turn, setTurn] = useState(() => {
    const turnFromStorage = window.localStorage.getItem('turn');
    return turnFromStorage ?? TURNS.X;
  }); // x siempre empieza el juego
  const [winner, setWinner] = useState(() => {
    const winnerFromStorage = window.localStorage.getItem('winner');
    return winnerFromStorage ?? null;
  });

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setTurn(TURNS.X);
    setWinner(null);

    resetGameStorage();
  };

  const updateBoard = (index) => {
    if (board[index] || winner) return; // Si ya hay un valor en el tablero, no se puede actualizar y si ya hay un ganador, no se puede seguir jugando
    // Aquí se debe actualizar el tablero
    const newBoard = [...board];
    newBoard[index] = turn;
    setBoard(newBoard);

    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X;
    setTurn(newTurn);
    // Guardar en el local storage
    window.localStorage.setItem('board', JSON.stringify(newBoard));
    window.localStorage.setItem('turn', newTurn);

    const newWinner = checkWinner(newBoard);
    if (newWinner) {
      confetti();
      setWinner(newWinner);
      window.localStorage.setItem('winner', newWinner);
    } else if (checkEndGame(newBoard)) {
      setWinner(false); // empate
    }
  };

  return (
    <main className='board'>
      <h1>Tic tac toe</h1>
      <button onClick={resetGame}>Empezar de nuevo</button>
      <section className='game'>
        {board.map((_, index) => (
          <Square key={index} index={index} updateBoard={updateBoard}>
            {board[index]}
          </Square>
        ))}
      </section>

      <section className='turn'>
        {/* Aquí se muestra el turno */}
        <Square isSelected={turn === TURNS.X}>{TURNS.X}</Square>
        <Square isSelected={turn === TURNS.O}>{TURNS.O}</Square>
      </section>

      <WinnerModal winner={winner} resetGame={resetGame} />
    </main>
  );
}

export default App;
