let allCards = [];
let namedCards = [];
let score = 0;

async function loadCards() {
    try {
        const response = await fetch('https://api.jsonbin.io/b/your-json-bin-id');
        const cardsData = await response.json();
        allCards = cardsData.map(card => card.name.toLowerCase()); // Normalize to lower case for comparison
        console.log("All cards loaded:", allCards);
    } catch (error) {
        console.error("Failed to load cards:", error);
    }
}

function submitCard() {
    const cardInput = document.getElementById('cardInput');
    const cardName = cardInput.value.trim().toLowerCase(); // Normalize to lower case for comparison

    if (cardName && !namedCards.includes(cardName) && allCards.includes(cardName)) {
        namedCards.push(cardName);
        score++;
        updateScore();
        updateNamedCards();
    } else {
        alert("Card name is invalid or already named.");
    }

    cardInput.value = '';
    cardInput.focus();
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
