function printPuzzle() {
    console.log("printPuzzle() functie wordt uitgevoerd...");
    
    const printWindow = window.open('', '_blank');
    if (!printWindow) {
        alert("Het printvenster is geblokkeerd door je browser. Sta pop-ups toe.");
        return;
    }

    // 1. Verzamel alle woorden en zet ze om naar hoofdletters
    const rawWords = window.currentWordList || Array.from(document.querySelectorAll('#word-list-container .word-tag')).map(el => el.textContent.trim());
    const allWordsList = rawWords.map(w => w.toUpperCase()).sort();

    // 2. Haal het grid op en zorg dat alle letters hoofdletters worden
    const puzzleGrid = document.getElementById('puzzleGrid');
    let gridContent = '';
    
    if (puzzleGrid) {
        // Kloon het grid zodat we de hoofdpagina niet aanpassen
        const clone = puzzleGrid.cloneNode(true);
        // Forceer alle cellen naar hoofdletters
        clone.querySelectorAll('*').forEach(el => {
            if (el.children.length === 0 && el.textContent.trim().length > 0) {
                el.textContent = el.textContent.trim().toUpperCase();
            }
        });
        gridContent = clone.innerHTML;
    } else {
        gridContent = '<p>Puzzel grid niet gevonden</p>';
    }

    printWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>Toroidal Word Search Puzzle</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    text-align: center;
                    padding: 20px;
                    color: #000;
                    background: #fff;
                    margin: 0;
                }
                h1 {
                    font-size: 22px;
                    margin-bottom: 2px;
                }
                .subtitle {
                    font-size: 13px;
                    color: #555;
                    margin-bottom: 15px;
                }
                /* Robuuste grid opmaak gebaseerd op inline-blocks / tables om inklappen te voorkomen */
                .print-grid-container {
                    display: inline-block;
                    border: 2px solid #000;
                    padding: 4px;
                    background: #fff;
                    margin-bottom: 25px;
                }
                /* Zorg dat rijen netjes naast elkaar blijven in flex of block */
                .print-grid-container div, 
                .print-grid-container span {
                    box-sizing: border-box;
                }
                /* Stijlen voor de cellen */
                .grid-row {
                    display: flex !important;
                    flex-direction: row !important;
                }
                .grid-cell {
                    width: 26px !important;
                    height: 26px !important;
                    display: inline-flex !important;
                    align-items: center !important;
                    justify-content: center !important;
                    font-family: 'Courier New', Courier, monospace !important;
                    font-size: 15px !important;
                    font-weight: bold !important;
                    border: 1px solid #bbb !important;
                    background: #fff !important;
                    color: #000 !important;
                }
                /* Woordenlijst sectie */
                .word-list-section {
                    max-width: 650px;
                    margin: 0 auto;
                    border-top: 1px solid #ccc;
                    padding-top: 15px;
                    text-align: left;
                }
                .word-list-section h3 {
                    font-size: 15px;
                    margin-bottom: 10px;
                    text-align: center;
                    text-transform: uppercase;
                    letter-spacing: 1px;
                }
                .words-grid {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 8px 16px;
                    justify-content: center;
                }
                .word-item {
                    font-family: 'Courier New', Courier, monospace;
                    font-size: 13px;
                    min-width: 110px;
                    text-transform: uppercase;
                }
                @media print {
                    body {
                        padding: 0;
                    }
                    button {
                        display: none;
                    }
                }
            </style>
        </head>
        <body>
            <h1>Word Search Puzzle</h1>
            <div class="subtitle">Toroidal Grid</div>
            
            <div>
                <div class="print-grid-container">
                    ${gridContent}
                </div>
            </div>

            <div class="word-list-section">
                <h3>Words to Find (${allWordsList.length})</h3>
                <div class="words-grid">
                    ${allWordsList.map(word => `<div class="word-item">• ${word}</div>`).join('')}
                </div>
            </div>

            <script>
                window.onload = function() {
                    setTimeout(() => {
                        window.print();
                    }, 300);
                };
            <\/script>
        </body>
        </html>
    `);
    printWindow.document.close();
}
