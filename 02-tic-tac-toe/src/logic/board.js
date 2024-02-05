import { WIINER_COMBINATIONS } from '../constants';

export const checkWinner = (boardToCheck) => {
  for (const combo of WIINER_COMBINATIONS) {
    const [a, b, c] = combo;
    if (
      boardToCheck[a] &&
      boardToCheck[a] === boardToCheck[b] &&
      boardToCheck[a] === boardToCheck[c]
    ) {
      return boardToCheck[a]; // Devuelve el valor del ganador (X u O)
    }
  }
  return null; // Si no hay ganador, devuelve null
};

export const checkEndGame = (newBoard) => {
  // revisamos si hay un empate
  // si no hay más espacios vacíos
  // en el tablero
  return newBoard.every((square) => square !== null);
};
