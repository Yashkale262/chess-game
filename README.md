# Online Chess Game
This is a web application that allows users to play chess online. It provides two main options for playing the game:  Playing online with a random opponent or challenging a friend by generating a join code.

This game is hosted at: https://chess-game-yash.onrender.com/

## Features
- Play Online: By choosing this option, the user will be connected to another player who is also looking to play online. The system will match the user with a suitable opponent and start the game.

- Challenge a Friend: Selecting this option will generate a unique join code that can be shared with a friend. The opponent player can enter this join code to connect with the user and start playing the game.
- A timer is implemented to track the time for each player's turn. This ensures that the game progresses smoothly and players have a limited amount of time to make their moves.

## Game Logic
1. The entire logic for the chess game has been developed and implemented in this web application. The logic includes the following components:

2. Chessboard: The game board consists of an 8x8 grid with 64 squares. Each square can contain a chess piece or be empty.

3. Chess Pieces: All standard chess pieces are implemented, including the king, queen, rook, bishop, knight, and pawn. Each piece has its own movement rules and constraints.

4. Valid Moves: The logic ensures that players can only make valid moves according to the rules of chess. Illegal moves are not allowed.

5. Capturing Pieces: When a player moves their piece to a square occupied by an opponent's piece, the opponent's piece is captured and removed from the board.

6. Check and Checkmate: The logic checks for check and checkmate conditions, ensuring that players cannot make moves that would put their own king in checkmate.

7. Stalemate Draw: The logic detects a stalemate draw when a player is not in check but has no legal moves available. In this case, the game ends in a draw.

8. Castling: The logic allows players to perform castling, a special move involving the king and one of the rooks. This move is subject to certain conditions and can be used for strategic purposes.

## Technologies Used
The web application has been developed using the following technologies:

Node.js: A JavaScript runtime used for building the server-side components of the application.

Socket .io: A library for enabling real-time communication between the server and the clients. It is used to facilitate online gameplay and messaging.

React: A JavaScript library for building user interfaces. React is used to create the interactive components and user interface of the web application.

CSS: Cascading Style Sheets (CSS) is used for styling the web application and creating a visually appealing user interface.