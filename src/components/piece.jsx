// piece.jsx

import React from "react";
import "./board.css";
import {
    blackPawn,
    blackRook,
    blackKnight,
    blackBishop,
    blackQueen,
    blackKing,
    whitePawn,
    whiteRook,
    whiteKnight,
    whiteBishop,
    whiteQueen,
    whiteKing,
} from "../Data/piece.js"; 

const Piece = ({ type, onPieceClick }) => {
    const handleClick = () => {
        if (onPieceClick) {
            onPieceClick(type.id);
        }
    };

    return (
        <img
            src={type.img}
            alt={type.piece_name}
            className="piece"
            onClick={handleClick}
        />
    );
};

export default Piece;
