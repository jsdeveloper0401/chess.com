import { keySquareMapper } from "../index.js";

// Funksiya: Opponent figurasini tekshirish
function checkOpponentPieceOnSquare(squareId, color) {
    const opponentColor = color === "white" ? "BLACK" : "WHITE";
    const square = keySquareMapper[squareId];

    if (!square || !square.piece) return false;

    const pieceColor = square.piece.piece_name.includes(
        opponentColor.toLowerCase()
    );
    if (pieceColor) {
        square.captureHighlight = true;
        return true;
    }

    return false;
}

// Funksiya: Kvadratda figura mavjudligini tekshirish
function checkPieceExistsOnSquare(squareId) {
    const square = keySquareMapper[squareId];
    return square && square.piece ? square : false;
}

// Funksiya: KVADRATGA ChAPTURE
function checkSquareCaptureId(array) {
    let captureSquares = [];

    for (let squareId of array) {
        const square = keySquareMapper[squareId];
        if (!square.piece) {
            captureSquares.push(squareId);
        } else {
            break;
        }
    }

    return captureSquares;
}

// Funksiya: IFDME OF OPPONENT a element
function checkOpponentPieceOnSquareNoDom(squareId, color) {
    const opponentColor = color === "white" ? "BLACK" : "WHITE";
    const square = keySquareMapper[squareId];

    if (!square || !square.piece) return false;

    return square.piece.piece_name.includes(opponentColor);
}

// Funksiya: GIVE BAISHAP TO

function giveBishopCaptureIds(squareId, color) {
    if (!squareId) return [];

    let highlightSquares = giveBishopHighlightIds(squareId);

    let temp = [];
    const { bottomLeft, topLeft, bottomRight, topRight } = highlightSquares;
    let returnArr = [];

    temp.push(bottomLeft);
    temp.push(topLeft);
    temp.push(bottomRight);
    temp.push(topRight);

    for (let arr of temp) {
        for (let element of arr) {
            let pieceCheckResult = checkPieceExistsOnSquare(element);
            if (
                pieceCheckResult &&
                pieceCheckResult.piece &&
                pieceCheckResult.piece.piece_name.toLowerCase().includes(color)
            ) {
                break;
            }

            if (checkOpponentPieceOnSquareNoDom(element, color)) {
                returnArr.push(element);
                break;
            }
        }
    }

    return returnArr;
}

// Funksiya: GIVE RANKING HIGHLIGHT FOR US TO CAPTURE

function giveRookCapturesIds(squareId, color) {
    if (!squareId) {
        return [];
    }

    let highlightSquares = giveRookHighlightIds(squareId);

    let temp = [];
    const { bottom, top, right, left } = highlightSquares;
    let returnArr = [];

    temp.push(bottom);
    temp.push(top);
    temp.push(right);
    temp.push(left);

    for (let arr of temp) {
        for (let element of arr) {
            let pieceCheckResult = checkPieceExistsOnSquare(element);
            if (
                pieceCheckResult &&
                pieceCheckResult.piece &&
                pieceCheckResult.piece.piece_name.toLowerCase().includes(color)
            ) {
                break;
            }

            if (checkOpponentPieceOnSquareNoDom(element, color)) {
                returnArr.push(element);
                break;
            }
        }
    }

    return returnArr;
}

// Funksiya: GIVE QUEEN CAPTURED FOR
function giveQueenCapturesIds(squareId, color) {
    if (!squareId) return [];

    let returnArr = [];
    returnArr.push(giveBishopCaptureIds(squareId, color));
    returnArr.push(giveRookCapturesIds(squareId, color));
    return returnArr.flat();
}

// Funksiya: GIVE HIGHLIGHT RANKING IDS TO

function giveRookHighlightIds(squareId) {
    let finalReturnArray = [];

    function left(squareId) {
        let alpha = squareId[0];
        let num = Number(squareId[1]);
        let resultArray = [];

        while (num != 8) {
            num = num + 1;
            resultArray.push(`${alpha}${num}`);
        }

        return resultArray;
    }

    function bottom(squareId) {
        let alpha = squareId[0];
        let num = Number(squareId[1]);
        let resultArray = [];

        while (num != 1) {
            num = num - 1;
            resultArray.push(`${alpha}${num}`);
        }

        return resultArray;
    }

    function right(squareId) {
        let alpha = squareId[0];
        let num = Number(squareId[1]);
        let resultArray = [];

        while (alpha != "h") {
            alpha = String.fromCharCode(alpha.charCodeAt(0) + 1);
            resultArray.push(`${alpha}${num}`);
        }

        return resultArray;
    }

    function top(squareId) {
        let alpha = squareId[0];
        let num = Number(squareId[1]);
        let resultArray = [];

        while (alpha != "a") {
            alpha = String.fromCharCode(alpha.charCodeAt(0) - 1);
            resultArray.push(`${alpha}${num}`);
        }

        return resultArray;
    }

    return {
        top: top(squareId),
        bottom: bottom(squareId),
        right: right(squareId),
        left: left(squareId),
    };
}

// Funksiya: GIVE THE CAPTURED FOR
function giveQueenHighlightIds(squareId) {
    const rookMoves = giveRookHighlightIds(squareId);
    const bishopMoves = giveBishopHighlightIds(squareId);
    return {
        top: rookMoves.top,
        bottom: rookMoves.bottom,
        right: rookMoves.right,
        left: rookMoves.left,
        topLeft: bishopMoves.topLeft,
        topRight: bishopMoves.topRight,
        bottomLeft: bishopMoves.bottomLeft,
        bottomRight: bishopMoves.bottomRight,
    };
}

// Funksiya: GIVE THE HIGHLIGHT
function giveKingHighlightIds(squareId) {
    const rookMoves = giveRookHighlightIds(squareId);
    const bishopMoves = giveBishopHighlightIds(squareId);
    const returnResult = {
        left: rookMoves.left,
        right: rookMoves.right,
        top: rookMoves.top,
        bottom: rookMoves.bottom,
        topLeft: bishopMoves.topLeft,
        topRight: bishopMoves.topRight,
        bottomLeft: bishopMoves.bottomLeft,
        bottomRight: bishopMoves.bottomRight,
    };

    for (const key in returnResult) {
        if (Object.hasOwnProperty.call(returnResult, key)) {
            const element = returnResult[key];

            if (element.length != 0) {
                returnResult[key] = new Array(element[0]);
            }
        }
    }

    return returnResult;
}

// Funksiya: GIVE TO CAPTURE FOR
function giveKingCaptureIds(squareId, color) {
    if (!squareId) {
        return [];
    }

    let result = giveKingHighlightIds(squareId);
    result = Object.values(result).flat();
    result = result.filter((element) => {
        if (checkOpponentPieceOnSquareNoDom(element, color)) {
            return true;
        }
    });

    return result;
}

export {
    checkOpponentPieceOnSquare,
    checkSquareCaptureId,
    giveKingCaptureIds,
    giveRookHighlightIds,
    giveQueenHighlightIds,
    giveKingHighlightIds,
    giveKnightHighlightIds,
    giveBishopCaptureIds,
    giveQueenCapturesIds,
    giveKnightCaptureIds,
    checkPieceExistsOnSquare,
    giveRookCapturesIds,
    giveBishopHighlightIds,
};
