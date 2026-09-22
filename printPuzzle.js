function printPuzzle() {
    console.log("printPuzzle() functie wordt uitgevoerd...");
    
    const printWindow = window.open('', '_blank');
    if (!printWindow) {
        alert("Het printvenster is geblokkeerd door je browser. Sta pop-ups toe.");
        return;
    }

    const allWordsList = window.currentWordList || Array.from(document.querySelectorAll('#word-list-container .word-tag')).map(el => el.textContent.trim());
    const puzzleGrid = document.getElementById('puzzleGrid');
    const gridHtml = puzzleGrid ? puzzleGrid.innerHTML : '<p>Puzzel grid niet gevonden</p>';

    printWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>Toroidal Word Search Puzzle</title>
            <!-- Laad Tailwind CSS zodat alle grid- en flex-klassen correct worden toegepast -->
            <script src="https://cdn.tailwindcss.com"><\/script>
            <style>
                @media print {
                    body {
                        padding: 0 !important;
                    }
                    button {
                        display: none !important;
                    }
                }
            </style>
        </head>
        <body class="p-6 bg-white text-black flex flex-col items-center">
            <h1 class="text-2xl font-bold mb-1">Word Search Puzzle</h1>
            <div class="text-sm text-gray-500 mb-6">Toroidal Grid</div>
            
            <div class="mb-8 flex justify-center">
                ${gridHtml}
            </div>

            <div class="max-w-3xl w-full border-t border-gray-300 pt-4">
                <h3 class="font-bold text-base mb-3 text-center">Words to Find</h3>
                <div class="flex flex-wrap gap-x-6 gap-y-2 justify-center">
                    ${allWordsList.map(word => `<div class="font-mono text-sm">• ${word}</div>`).join('')}
                </div>
            </div>

            <script>
                // Wacht heel even tot Tailwind geladen is en open dan het printvenster
                window.onload = function() {
                    setTimeout(() => {
                        window.print();
                    }, 250);
                };
            <\/script>
        </body>
        </html>
    `);
    printWindow.document.close();
}
