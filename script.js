const board = document.querySelector('.board');
            const statusDiv = document.querySelector('.status');
            const scoresDiv = document.querySelector('.scores');
            const restartButton = document.querySelector('.restart');
            const resetScoresButton = document.querySelector('.reset-scores');
            let currentPlayer = 'X';
            let winner = null;
            const cells = Array(9).fill(null);
            const scores = { X: 0, O: 0 };

            function checkWinner() {
                const winningConditions = [[0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
                                           [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
                                           [0, 4, 8], [2, 4, 6]];           // diagonals
                for (let condition of winningConditions) {
                    const [a, b, c] = condition;
                    if (cells[a] && cells[a] === cells[b] && cells[a] === cells[c]) {
                        return cells[a];
                    }
                }
                return null;
            }

            function handleCellClick(index) {
                if (winner || cells[index]) return;

                cells[index] = currentPlayer;
                render();

                winner = checkWinner();

                if (winner) {
                    scores[winner]++;
                    setTimeout(() => {
                        alert(`Player ${winner} wins!`);
                        updateScores();
                        restartGame();
                    }, 100);
                } 
                else if (!cells.includes(null)) {
                    setTimeout(() => {
                        alert("It's a tie!");
                        restartGame();
                    }, 100);
                } 
                else{
                    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
                    updateStatus();
                }
            }
            function updateStatus() {
                statusDiv.textContent = winner ? `Player ${winner} wins!` : `Current Player: ${currentPlayer}`;
            }

            function updateScores() {
                scoresDiv.textContent = `Scores - X: ${scores.X}, O: ${scores.O}`;
            }
            function render() {
                board.innerHTML = '';
                cells.forEach((value, index) => {
                    const cell = document.createElement('div');
                    cell.classList.add('cell');
                    if (value) cell.classList.add(value.toLowerCase());
                    cell.textContent = value || '';
                    cell.addEventListener('click', () => handleCellClick(index));
                    board.appendChild(cell);
                });
                updateStatus();
            }
            function restartGame() {
                cells.fill(null);
                currentPlayer = 'X';
                winner = null;
                render();
            }
            function resetScores() {
                scores.X = 0;
                scores.O = 0;
                updateScores();
                resetGame();
            }
            restartButton.addEventListener('click', restartGame);
            resetScoresButton.addEventListener('click', resetScores);

            render();
            updateScores();