function whiteQueenClick(square) {
    const piece = square.piece;

    // Agar belgi o'zingizga teng bo'lsa, avvalgi o'zining belgilarini tozalang
    if (piece === selfHighlightState) {
        clearPreviousSelfHighlight(selfHighlightState);
        clearHighlightLocal();
        return;
    }

    // Agar "captureHighlight" mavjud bo'lsa
    if (square.captureHighlight) {
        movePieceFromXToY(selfHighlightState, piece.current_position);
        clearPreviousSelfHighlight(selfHighlightState);
        clearHighlightLocal();
        return;
    }

    // Hozirgi o'zgargichlarni tozalang
    clearPreviousSelfHighlight(selfHighlightState);
    clearHighlightLocal();

    // Belgilashni aniqlash loyixasi
    selfHighlight(piece);
    hightlight_state = true;
    selfHighlightState = piece;

    // MoveState ga piyodani qo'shish
    moveState = piece;

    // Joriy pozitsiyani aniqlang
    const current_pos = piece.current_position;

    // Global state flat bo'lib, uni o'zgarishlarni uyg'otish
    const flatArray = globalState.flat();

    // Highlightlar uchun id larini berish
    let hightlightSquareIds = giveQueenHighlightIds(current_pos);

    // Vaqtincha massiv
    let temp = [];

    // Obektlarni ajratish
    const {
        bottomLeft,
        topLeft,
        bottomRight,
        topRight,
        top,
        right,
        left,
        bottom,
    } = hightlightSquareIds;

    // Result
    let result = [];
    result.push(checkSquareCaptureId(bottomLeft));
    result.push(checkSquareCaptureId(topLeft));
    result.push(checkSquareCaptureId(bottomRight));
    result.push(checkSquareCaptureId(topRight));
    result.push(checkSquareCaptureId(top));
    result.push(checkSquareCaptureId(right));
    result.push(checkSquareCaptureId(bottom));
    result.push(checkSquareCaptureId(left));

    // insert into temp
    temp.push(bottomLeft);
    temp.push(topLeft);
    temp.push(bottomRight);
    temp.push(topRight);
    temp.push(top);
    temp.push(right);
    temp.push(bottom);
    temp.push(left);

    // highlightSquareIds = checkSquareCaptureId(hightlightSquareIds);
    hightlightSquareIds = result.flat();

    // Yuqori parvozlar
    hightlightSquareIds.forEach((hightlight) => {
        const element = keySquareMapper[hightlight];
        element.highlight = true;
    });

    // CaptureIds
    let captureIds = [];

    for (let index = 0; index < temp.length; index++) {
        const arr = temp[index];

        for (let j = 0; j < arr.length; j++) {
            const element = arr[j];

            let checkPieceResult = checkWeatherPieceExistsOrNot(element);
            if (
                checkPieceResult &&
                checkPieceResult.piece &&
                checkPieceResult.piece.piece_name
                    .toLowerCase()
                    .includes("white")
            ) {
                break;
            }

            if (checkPieceOfOpponentOnElement(element, "white")) {
                break;
            }
        }
    }

    // console.log(captureIds);
    // captureIds = checkSquareCaptureId(captureIds);

    // captureIds.forEach((element) => {
    //   checkPieceOfOpponentOnElement(element, "white");
    // });

    globalStateRender();
}

function whiteKingClick(square) {
    const piece = square.piece;

    if (piece === selfHighlightState) {
        clearPreviousSelfHighlight(selfHighlightState);
        clearHighlightLocal();
        return;
    }

    if (square.captureHighlight) {
        movePieceFromXToY(selfHighlightState, piece.current_position);
        clearPreviousSelfHighlight(selfHighlightState);
        clearHighlightLocal();
        return;
    }

    clearPreviousSelfHighlight(selfHighlightState);
    clearHighlightLocal();

    selfHighlight(piece);
    hightlight_state = true;
    selfHighlightState = piece;

    moveState = piece;

    const current_pos = piece.current_position;
    const flatArray = globalState.flat();

    let hightlightSquareIds = giveKingHighlightIds(current_pos);
    let temp = [];

    const {
        bottomLeft,
        topLeft,
        bottomRight,
        topRight,
        top,
        right,
        left,
        bottom,
    } = hightlightSquareIds;

    let result = [];

    if (!piece.move) {
        const rook1 = globalPiece.white_rook_1;
        const rook2 = globalPiece.white_rook_2;
        if (!rook1.move) {
            const b1 = keySquareMapper["b1"];
            const c1 = keySquareMapper["c1"];
            const d1 = keySquareMapper["d1"];
            if (!b1.piece && !c1.piece && !d1.piece) {
                result.push("c1");
            }
        }
        if (!rook2.move) {
            const f1 = keySquareMapper["f1"];
            const g1 = keySquareMapper["g1"];
            if (!f1.piece && !g1.piece) {
                result.push("g1");
            }
        }
    }

    result.push(checkSquareCaptureId(bottomLeft));
    result.push(checkSquareCaptureId(topLeft));
    result.push(checkSquareCaptureId(bottomRight));
    result.push(checkSquareCaptureId(topRight));
    result.push(checkSquareCaptureId(top));
    result.push(checkSquareCaptureId(right));
    result.push(checkSquareCaptureId(bottom));
    result.push(checkSquareCaptureId(left));

    // insert into temp
    temp.push(bottomLeft);
    temp.push(topLeft);
    temp.push(bottomRight);
    temp.push(topRight);
    temp.push(top);
    temp.push(right);
    temp.push(bottom);
    temp.push(left);

    // hightlightSquareIds = checkSquareCaptureId(hightlightSquareIds);
    hightlightSquareIds = result.flat();

    hightlightSquareIds.forEach((hightlight) => {
        const element = keySquareMapper[hightlight];
        element.highlight = true;
    });

    let captureIds = [];

    for (let index = 0; index < temp.length; index++) {
        const arr = temp[index];

        for (let j = 0; j < arr.length; j++) {
            const element = arr[j];

            let checkPieceResult = checkWeatherPieceExistsOrNot(element);
            if (
                checkPieceResult &&
                checkPieceResult.piece &&
                checkPieceResult.piece.piece_name
                    .toLowerCase()
                    .includes("white")
            ) {
                break;
            }

            if (checkPieceOfOpponentOnElement(element, "white")) {
                break;
            }
        }
    }

    // console.log(captureIds);
    // captureIds = checkSquareCaptureId(captureIds);

    // captureIds.forEach((element) => {
    //   checkPieceOfOpponentOnElement(element, "white");
    // });

    globalStateRender();
}

function blackKingClick(square) {
    const piece = square.piece;

    if (piece === selfHighlightState) {
        clearPreviousSelfHighlight(selfHighlightState);
        clearHighlightLocal();
        return;
    }

    if (square.captureHighlight) {
        movePieceFromXToY(selfHighlightState, piece.current_position);
        clearPreviousSelfHighlight(selfHighlightState);
        clearHighlightLocal();
        return;
    }

    clearPreviousSelfHighlight(selfHighlightState);
    clearHighlightLocal();

    selfHighlight(piece);
    hightlight_state = true;
    selfHighlightState = piece;

    moveState = piece;

    const current_pos = piece.current_position;

    let hightlightSquareIds = giveKingHighlightIds(current_pos);
    let temp = [];

    const {
        bottomLeft,
        topLeft,
        bottomRight,
        topRight,
        top,
        right,
        left,
        bottom,
    } = hightlightSquareIds;

    let result = [];

    if (!piece.move) {
        const rook1 = globalPiece.black_rook_1;
        const rook2 = globalPiece.black_rook_2;
        if (!rook1.move) {
            const b1 = keySquareMapper["b8"];
            const c1 = keySquareMapper["c8"];
            const d1 = keySquareMapper["d8"];
            if (!b1.piece && !c1.piece && !d1.piece) {
                result.push("c8");
            }
        }
        if (!rook2.move) {
            const f1 = keySquareMapper["f8"];
            const g1 = keySquareMapper["g8"];
            if (!f1.piece && !g1.piece) {
                result.push("g8");
            }
        }
    }

    result.push(checkSquareCaptureId(bottomLeft));
    result.push(checkSquareCaptureId(topLeft));
    result.push(checkSquareCaptureId(bottomRight));
    result.push(checkSquareCaptureId(topRight));
    result.push(checkSquareCaptureId(top));
    result.push(checkSquareCaptureId(right));
    result.push(checkSquareCaptureId(bottom));
    result.push(checkSquareCaptureId(left));

    // insert into temp
    temp.push(bottomLeft);
    temp.push(topLeft);
    temp.push(bottomRight);
    temp.push(topRight);
    temp.push(top);
    temp.push(right);
    temp.push(bottom);
    temp.push(left);

    // hightlightSquareIds = checkSquareCaptureId(hightlightSquareIds);
    hightlightSquareIds = result.flat();

    hightlightSquareIds.forEach((hightlight) => {
        const element = keySquareMapper[hightlight];
        element.highlight = true;
    });

    let captureIds = [];

    for (let index = 0; index < temp.length; index++) {
        const arr = temp[index];

        for (let j = 0; j < arr.length; j++) {
            const element = arr[j];

            let checkPieceResult = checkWeatherPieceExistsOrNot(element);
            if (
                checkPieceResult &&
                checkPieceResult.piece &&
                checkPieceResult.piece.piece_name
                    .toLowerCase()
                    .includes("black")
            ) {
                break;
            }

            if (checkPieceOfOpponentOnElement(element, "black")) {
                break;
            }
        }
    }

    // console.log(captureIds);
    // captureIds = checkSquareCaptureId(captureIds);

    // captureIds.forEach((element) => {
    //   checkPieceOfOpponentOnElement(element, "black");
    // });

    globalStateRender();
}
