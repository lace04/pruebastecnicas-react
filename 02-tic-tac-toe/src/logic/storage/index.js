export const resetGameStorage = () => {
  window.localStorage.removeItem('board');
  window.localStorage.removeItem('turn');
  window.localStorage.removeItem('winner');
};
