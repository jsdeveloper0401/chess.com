function Square(color, id, piece) {
    return { color, id, piece };
}

function SquareRow(rowId, pieces = []) {
    const squareRow = [];
    const abcd = ["a", "b", "c", "d", "e", "f", "g", "h"];

    abcd.forEach((element, index) => {
        const piece = pieces[index] || null;
        const color =
            rowId % 2 === 0
                ? index % 2 === 0
                    ? "white"
                    : "black"
                : index % 2 === 0
                ? "black"
                : "white";
        squareRow.push(Square(color, element + rowId, piece));
    });

    return squareRow;
}

function initGame() {
    return [
        SquareRow(8, [
            "BLACK_ROOK",
            "BLACK_KNIGHT",
            "BLACK_BISHOP",
            "BLACK_QUEEN",
            "BLACK_KING",
            "BLACK_BISHOP",
            "BLACK_KNIGHT",
            "BLACK_ROOK",
        ]),
        SquareRow(7, Array(8).fill("BLACK_PAWN")),
        SquareRow(6),
        SquareRow(5),
        SquareRow(4),
        SquareRow(3),
        SquareRow(2, Array(8).fill("WHITE_PAWN")),
        SquareRow(1, [
            "WHITE_ROOK",
            "WHITE_KNIGHT",
            "WHITE_BISHOP",
            "WHITE_QUEEN",
            "WHITE_KING",
            "WHITE_BISHOP",
            "WHITE_KNIGHT",
            "WHITE_ROOK",
        ]),
    ];
}

// black pieces
function blackPawn(current_position) {
    return {
        current_position,
        img: "/src/assets/img/black/pawn.png",
        piece_name: "BLACK_PAWN",
    };
}
function blackBishop(current_position) {
    return {
        current_position,
        img: "/src/assets/img/black/bishop.png",
        piece_name: "BLACK_BISHOP",
    };
}
function blackKnight(current_position) {
    return {
        current_position,
        img: "/src/assets/img/black/knight.png",
        piece_name: "BLACK_KNIGHT",
    };
}
function blackKing(current_position) {
    return {
        move: false,
        current_position,
        img: "/src/assets/img/black/king.png",
        piece_name: "BLACK_KING",
    };
}
function blackQueen(current_position) {
    return {
        current_position,
        img: "/src/assets/img/black/queen.png",
        piece_name: "BLACK_QUEEN",
    };
}
function blackRook(current_position) {
    return {
        move: false,
        current_position,
        img: "/src/assets/img/black/rook.png",
        piece_name: "BLACK_ROOK",
    };
}

// white pieces
function whitePawn(current_position) {
    return {
        current_position,
        img: "/src/assets/img/white/pawn.png",
        piece_name: "WHITE_PAWN",
    };
}
function whiteRook(current_position) {
    return {
        move: false,
        current_position,
        img: "/src/assets/img/white/rook.png",
        piece_name: "WHITE_ROOK",
    };
}
function whiteKnight(current_position) {
    return {
        current_position,
        img: "/src/assets/img/white/knight.png",
        piece_name: "WHITE_KNIGHT",
    };
}
function whiteBishop(current_position) {
    return {
        current_position,
        img: "/src/assets/img/white/bishop.png",
        piece_name: "WHITE_BISHOP",
    };
}
function whiteQueen(current_position) {
    return {
        current_position,
        img: "/src/assets/img/white/queen.png",
        piece_name: "WHITE_QUEEN",
    };
}
function whiteKing(current_position) {
    return {
        move: false,
        current_position,
        img: "/src/assets/img/white/king.png",
        piece_name: "WHITE_KING",
    };
}

export {
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
};
