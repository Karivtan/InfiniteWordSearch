//version chat 0.4
function printPuzzle() {
    console.log("printPuzzle() functie wordt uitgevoerd...");

    const printWindow = window.open('', '_blank');

    if (!printWindow) {
        alert("Het printvenster is geblokkeerd door je browser. Sta pop-ups toe.");
        return;
    }

    // =========================================================
    // 1. PUZZEL GRID OPHALEN
    // =========================================================

    const puzzleGrid = document.getElementById('puzzleGrid');

    if (!puzzleGrid) {
        alert("Puzzelgrid (#puzzleGrid) niet gevonden.");
        printWindow.close();
        return;
    }

    // Alle cellen uit jouw bestaande grid
    const cells = Array.from(
        puzzleGrid.querySelectorAll('.cell')
    );

    if (cells.length === 0) {
        alert("Geen puzzelcellen (.cell) gevonden.");
        printWindow.close();
        return;
    }

    // =========================================================
    // 2. AANTAL RIJEN EN KOLOMMEN
    // =========================================================

    // Jouw generator heeft deze informatie al in de DOM:
    // data-row="0" data-col="0", enz.

    const rowNumbers = cells.map(cell =>
        parseInt(cell.dataset.row, 10)
    );

    const colNumbers = cells.map(cell =>
        parseInt(cell.dataset.col, 10)
    );

    const numRows = Math.max(...rowNumbers) + 1;
    const numCols = Math.max(...colNumbers) + 1;

    console.log(`Print grid: ${numRows} rijen x ${numCols} kolommen`);

    // =========================================================
    // 3. GRID HTML OPBOUWEN
    // =========================================================

    let gridHtml = '';

    for (let r = 0; r < numRows; r++) {

        for (let c = 0; c < numCols; c++) {

            const cell = cells.find(
                el =>
                    parseInt(el.dataset.row, 10) === r &&
                    parseInt(el.dataset.col, 10) === c
            );

            const letter = cell
                ? cell.textContent.trim().toUpperCase()
                : '';

            gridHtml += `
                <div class="print-cell">
                    ${letter}
                </div>
            `;
        }
    }

    // =========================================================
    // 4. WOORDENLIJST OPHALEN
    // =========================================================

    const wordListElement = document.getElementById('wordList');

    let words = [];

    if (wordListElement) {

        words = Array.from(
            wordListElement.querySelectorAll('li')
        )
        .map(li => li.textContent.trim())
        .filter(word => word.length > 0);

    }

    console.log("Woorden gevonden:", words);

    // =========================================================
    // 5. WOORDENLIJST HTML
    // =========================================================

    let wordsHtml = '';

    if (words.length > 0) {

        wordsHtml = words
            .map(word => `
                <div class="word-item">
                    ${escapeHtml(word.toUpperCase())}
                </div>
            `)
            .join('');

    } else {

        wordsHtml = `
            <div class="no-words">
                Geen woorden gevonden.
            </div>
        `;
    }

    // =========================================================
    // 6. PRINTVENSTER OPBOUWEN
    // =========================================================

    printWindow.document.write(`
<!DOCTYPE html>

<html lang="nl">

<head>

    <meta charset="UTF-8">

    <title>Toroidal Word Search Puzzle</title>

    <style>

        * {
            box-sizing: border-box;
        }

        html,
        body {
            margin: 0;
            padding: 0;
            background: white;
            color: black;
        }

        body {
            font-family: Arial, sans-serif;
            text-align: center;
            padding: 20px;
        }


        /* =========================================
           TITEL
           ========================================= */

        h1 {
            margin: 0 0 4px 0;
            font-size: 22px;
        }

        .subtitle {
            font-size: 13px;
            color: #555;
            margin-bottom: 20px;
        }


        /* =========================================
           PUZZEL
           ========================================= */

        .grid-container {
            display: inline-block;

            border: 2px solid #000;

            padding: 5px;

            background: #fff;

            margin-bottom: 25px;
        }


        .print-grid {

            display: grid;

            grid-template-columns:
                repeat(${numCols}, 28px);

            grid-template-rows:
                repeat(${numRows}, 28px);

            gap: 1px;

            background: #999;

        }


        .print-cell {

            width: 28px;
            height: 28px;

            display: flex;

            align-items: center;
            justify-content: center;

            background: #fff;

            color: #000;

            font-family:
                "Courier New",
                Courier,
                monospace;

            font-size: 16px;

            font-weight: bold;

            line-height: 28px;

        }


        /* =========================================
           WOORDENLIJST
           ========================================= */

        .word-list-section {

            width: 100%;

            max-width: 650px;

            margin: 0 auto;

            border-top: 1px solid #ccc;

            padding-top: 15px;

        }


        .word-list-section h3 {

            margin: 0 0 14px 0;

            font-size: 15px;

            text-align: center;

            letter-spacing: 1px;

            text-transform: uppercase;

        }


        .words-grid {

            display: grid;

            grid-template-columns:
                repeat(3, minmax(120px, 1fr));

            column-gap: 20px;

            row-gap: 6px;

            text-align: left;

        }


        .word-item {

            font-family:
                "Courier New",
                Courier,
                monospace;

            font-size: 13px;

            padding: 2px 0;

            white-space: nowrap;

        }


        .word-item::before {
            content: "• ";
        }


        .no-words {

            color: #cc0000;

            font-weight: bold;

            padding: 10px;

        }


        /* =========================================
           PRINT
           ========================================= */

        @media print {

            @page {
                margin: 10mm;
            }

            body {
                padding: 0;
            }

            .grid-container {
                margin-bottom: 20px;
            }

        }

    </style>

</head>


<body>


    <h1>Word Search Puzzle</h1>

    <div class="subtitle">
        Toroidal Grid
    </div>


    <!-- =========================================
         PUZZEL GRID
         ========================================= -->

    <div class="grid-container">

        <div class="print-grid">

            ${gridHtml}

        </div>

    </div>


    <!-- =========================================
         WOORDEN DIE GEVONDEN MOETEN WORDEN
         ========================================= -->

    <div class="word-list-section">

        <h3>
            Words to Find (${words.length})
        </h3>

        <div class="words-grid">

            ${wordsHtml}

        </div>

    </div>


    <script>

        window.onload = function() {

            setTimeout(function() {

                window.print();

            }, 300);

        };

    <\/script>


</body>

</html>
    `);

    printWindow.document.close();
}


// =========================================================
// HTML VEILIG MAKEN
// =========================================================

function escapeHtml(text) {

    const div = document.createElement('div');

    div.textContent = text;

    return div.innerHTML;
}