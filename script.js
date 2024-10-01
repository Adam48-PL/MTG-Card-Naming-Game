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

        if (cardName && allCards.includes(cardName)) {
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

    // Event listener for the "Enter" key
    function handleKeyDown(event) {
        console.log("Key pressed:", event.key); // Debugging
        if (event.key === 'Enter') { // Check if the pressed key is "Enter"
            event.preventDefault();   // Prevent the default form submission or page reload
            submitCard();             // Call the submitCard function
        }
    }

    window.onload = function() {
        loadCards();
        const cardInput = document.getElementById('cardInput');
        cardInput.addEventListener('keydown', handleKeyDown); // Attach keydown listener to input
        console.log("Event listener attached to input."); // Debugging
    };

    window.submitCard = submitCard; // Expose submitCard globally
})();
