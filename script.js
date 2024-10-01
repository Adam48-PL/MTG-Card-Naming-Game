(function() {
    let allCards = []; // Array to store all card names
    let namedCards = []; // Array to store the named cards
    let score = 0; // Initialize score

    async function loadCards() {
        try {
            const response = await fetch('names.json');
            const cardsData = await response.json();
            
            allCards = cardsData.map(card => card.name.toLowerCase().trim()); // Normalize names (lowercase and trimmed)
            
            console.log("All cards loaded:", allCards);
        } catch (error) {
            console.error("Failed to load cards:", error);
        }
    }

    function submitCard() {
        const cardInput = document.getElementById('cardInput');
        const cardName = cardInput.value.trim().toLowerCase(); // Normalize input

        console.log("namedCards:", namedCards);
        console.log("Type of namedCards:", typeof namedCards); // Debugging

        if (Array.isArray(namedCards)) {
            if (cardName && allCards.includes(cardName)) {
                // Check if cardName is in allCards array
                if (!namedCards.includes(cardName)) {
                    namedCards.push(cardName); // Add to namedCards array
                    score++; // Increment score
                    updateScore(); // Update score display
                    updateNamedCards(); // Update named cards list
                } else {
                    alert("Card name is already named.");
                }
            } else {
                alert("Card name is invalid.");
            }
        } else {
            console.error("Error: namedCards is not an array.");
        }

        cardInput.value = ''; // Clear input field
        cardInput.focus(); // Focus on input field for next entry
    }

    function updateScore() {
        document.getElementById('score').textContent = `Score: ${score}`;
    }

    function updateNamedCards() {
        const namedCardsList = document.getElementById('namedCards');
        namedCardsList.innerHTML = '';
        namedCards.forEach(card => {
            const listItem = document.createElement('li');
            listItem.textContent = card;
            namedCardsList.appendChild(listItem);
        });
    }

    // Add event listener for the "Enter" key
    function handleKeyDown(event) {
        if (event.key === 'Enter') { // Check if the pressed key is "Enter"
            submitCard();
        }
    }

    window.onload = function() {
        loadCards();
        document.getElementById('cardInput').addEventListener('keydown', handleKeyDown); // Attach keydown listener to input
    };

    window.submitCard = submitCard; // Expose submitCard globally
})();
