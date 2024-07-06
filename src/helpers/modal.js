import React, { useRef } from "react";
import {
    blackBishop,
    blackKnight,
    blackRook,
    blackQueen,
    whiteQueen,
    whiteRook,
    whiteKnight,
    whiteBishop,
} from "../Data/pieces.js";

const ModalCreator = ({ body }) => {
    const modalRef = useRef(null);

    const show = () => {
        modalRef.current.style.display = "block";
        document.getElementById("root").classList.add("blur");
    };

    const hide = () => {
        modalRef.current.style.display = "none";
        document.getElementById("root").classList.remove("blur");
    };

    return (
        <div ref={modalRef} className="modal">
            {body}
        </div>
    );
};

const PawnPromotion = ({ color, callback, id }) => {
    const rookCallback = () => {
        const selectedPiece = color === "white" ? whiteRook : blackRook;
        callback(selectedPiece, id);
        modal.hide();
    };

    const knightCallback = () => {
        const selectedPiece = color === "white" ? whiteKnight : blackKnight;
        callback(selectedPiece, id);
        modal.hide();
    };

    const bishopCallback = () => {
        const selectedPiece = color === "white" ? whiteBishop : blackBishop;
        callback(selectedPiece, id);
        modal.hide();
    };

    const queenCallback = () => {
        const selectedPiece = color === "white" ? whiteQueen : blackQueen;
        callback(selectedPiece, id);
        modal.hide();
    };

    const body = (
        <div className="modal-content">
            <p>Your Pawn has been promoted 🥳</p>
            <div className="image-container">
                <img
                    onClick={rookCallback}
                    src={`../Assets/images/pieces/${color}/rook.png`}
                    alt="Rook"
                />
                <img
                    onClick={knightCallback}
                    src={`../Assets/images/pieces/${color}/knight.png`}
                    alt="Knight"
                />
                <img
                    onClick={bishopCallback}
                    src={`../Assets/images/pieces/${color}/bishop.png`}
                    alt="Bishop"
                />
                <img
                    onClick={queenCallback}
                    src={`../Assets/images/pieces/${color}/queen.png`}
                    alt="Queen"
                />
            </div>
        </div>
    );

    const modal = <ModalCreator body={body} />;

    return (
        <>
            <button onClick={modal.show}>Promote Pawn</button>
            {modal}
        </>
    );
};

export default PawnPromotion;
