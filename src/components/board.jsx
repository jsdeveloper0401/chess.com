// import React, { useEffect, useState } from "react";
// import Square from "./square";
// import Piece from "./piece";
// import {
//     initGame,
//     blackPawn,
//     blackBishop,
//     blackKing,
//     blackQueen,
//     blackKnight,
//     blackRook,
//     whitePawn,
//     whiteBishop,
//     whiteKing,
//     whiteQueen,
//     whiteKnight,
//     whiteRook,
// } from "../gameLogic";
// import "./board.css";

// const pieceMap = {
//     BLACK_PAWN: blackPawn,
//     BLACK_BISHOP: blackBishop,
//     BLACK_KNIGHT: blackKnight,
//     BLACK_KING: blackKing,
//     BLACK_QUEEN: blackQueen,
//     BLACK_ROOK: blackRook,
//     WHITE_PAWN: whitePawn,
//     WHITE_BISHOP: whiteBishop,
//     WHITE_KNIGHT: whiteKnight,
//     WHITE_KING: whiteKing,
//     WHITE_QUEEN: whiteQueen,
//     WHITE_ROOK: whiteRook,
// };

// const Board = () => {
//     const [board, setBoard] = useState([]);

//     useEffect(() => {
//         const initialBoard = initGame().map((row) =>
//             row.map((square) => {
//                 if (square.piece) {
//                     const piece = pieceMap[square.piece](square.id);
//                     return { ...square, piece };
//                 }
//                 return square;
//             })
//         );
//         setBoard(initialBoard);
//     }, []);

//     return (
//         <div style={{ display: "flex", flexDirection: "column" }}>
//             {board.map((row, rowIndex) => (
//                 <div key={rowIndex} className="squareRow">
//                     {row.map((square, colIndex) => (
//                         <Square key={square.id} color={square.color}>
//                             {square.piece && (
//                                 <Piece
//                                     type={square.piece}
//                                     color={square.color}
//                                 />
//                             )}
//                         </Square>
//                     ))}
//                 </div>
//             ))}
//         </div>
//     );
// };

// export default Board;

import React, { useEffect, useState } from "react";
import Square from "./square";
import Piece from "./piece";
import {
    initGame,
    blackPawn,
    blackBishop,
    blackKing,
    blackQueen,
    blackKnight,
    blackRook,
    whitePawn,
    whiteBishop,
    whiteKing,
    whiteQueen,
    whiteKnight,
    whiteRook,
    // movePiece,
} from "../gameLogic";
import "./board.css";

const pieceMap = {
    BLACK_PAWN: blackPawn,
    BLACK_BISHOP: blackBishop,
    BLACK_KNIGHT: blackKnight,
    BLACK_KING: blackKing,
    BLACK_QUEEN: blackQueen,
    BLACK_ROOK: blackRook,
    WHITE_PAWN: whitePawn,
    WHITE_BISHOP: whiteBishop,
    WHITE_KNIGHT: whiteKnight,
    WHITE_KING: whiteKing,
    WHITE_QUEEN: whiteQueen,
    WHITE_ROOK: whiteRook,
};

const Board = () => {
    const [board, setBoard] = useState([]);
    const [selectedPiece, setSelectedPiece] = useState(null);

    useEffect(() => {
        const initialBoard = initGame().map((row) =>
            row.map((square) => {
                if (square.piece) {
                    const piece = pieceMap[square.piece](square.id);
                    return { ...square, piece };
                }
                return square;
            })
        );
        setBoard(initialBoard);
    }, []);

    const handlePieceClick = (position) => {
        if (!selectedPiece) {
            setSelectedPiece(position);
        } else {
            const fromId = selectedPiece;
            const toId = position;
            const updatedBoard = movePiece(board, fromId, toId);
            setBoard(updatedBoard);
            setSelectedPiece(null);
        }
    };

    return (
        <div style={{ display: "flex", flexDirection: "column" }}>
            {board.map((row, rowIndex) => (
                <div key={rowIndex} className="squareRow">
                    {row.map((square, colIndex) => (
                        <Square key={square.id} color={square.color}>
                            {square.piece && (
                                <Piece
                                    type={square.piece}
                                    onPieceClick={handlePieceClick}
                                />
                            )}
                        </Square>
                    ))}
                </div>
            ))}
        </div>
    );
};

export default Board;
