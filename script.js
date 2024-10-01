let allCards = []; // Array to store all card names

async function loadCards() {
    try {
        const response = await fetch('names.json');
        const cardsData = await response.json();
        
        allCards = cardsData.map(card => card.name.toLowerCase()); // Store card names in lower case
        
        console.log("All cards loaded:", allCards);
    } catch (error) {
        console.error("Failed to load cards:", error);
    }
}

function submitCard() {
    const cardInput = document.getElementById('cardInput');
    const cardName = cardInput.value.trim().toLowerCase(); // Normalize input
    
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

window.onload = loadCards;