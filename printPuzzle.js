  function printPuzzle() {
            const printWindow = window.open('', '_blank');
            
            // Collect all words from the hidden or visible word list data
            const allWordsList = window.currentWordList || Array.from(document.querySelectorAll('#word-list-container .word-tag')).map(el => el.textContent.trim());
        
            printWindow.document.write('
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
                        }
                        h1 {
                            font-size: 24px;
                            margin-bottom: 5px;
                        }
                        .subtitle {
                            font-size: 14px;
                            color: #555;
                            margin-bottom: 20px;
                        }
                        .grid-container {
                            display: inline-block;
                            margin-bottom: 30px;
                            border: 2px solid #000;
                            padding: 4px;
                            background: #fff;
                        }
                        .grid-row {
                            display: flex;
                        }
                        .grid-cell {
                            width: 28px;
                            height: 28px;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            font-family: monospace;
                            font-size: 16px;
                            font-weight: bold;
                            border: 1px solid #ccc;
                        }
                        .word-list-section {
                            max-width: 700px;
                            margin: 0 auto;
                            text-align: left;
                            border-top: 1px solid #ccc;
                            padding-top: 15px;
                        }
                        .word-list-section h3 {
                            margin-bottom: 10px;
                            font-size: 16px;
                            text-align: center;
                        }
                        .print-words-grid {
                            display: flex;
                            flex-wrap: wrap;
                            gap: 10px 20px;
                            justify-content: center;
                        }
                        .print-word-item {
                            font-size: 14px;
                            font-family: monospace;
                            min-width: 120px;
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
                    
                    <div class="grid-container">
                        ${document.getElementById('puzzle-grid').innerHTML}
                    </div>
        
                    <div class="word-list-section">
                        <h3>Words to Find</h3>
                        <div class="print-words-grid">
                            ${allWordsList.map(word => `<div class="print-word-item">• ${word}</div>`).join('')}
                        </div>
                    </div>
        
                    <script>
                        window.onload = function() {
                            window.print();
                        };
                    <\/script>
                </body>
                </html>
            ');
            printWindow.document.close();
        }
