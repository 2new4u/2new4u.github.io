let lastIndex = null;

document.addEventListener('DOMContentLoaded', () => {
    showRandomFact(); // Show a fact when the page loads
});

function showRandomFact() {
    fetch('facts.json')
        .then(response => response.json())
        .then(data => {
            const facts = data.facts;
            let randomIndex;
            
            // Ensure the new fact is different from the last one
            do {
                randomIndex = Math.floor(Math.random() * facts.length);
            } while (randomIndex === lastIndex);
            
            const randomFact = facts[randomIndex];
            lastIndex = randomIndex;
            
            // Update the fact and source on the page
            document.getElementById('fact').textContent = randomFact.fact;
            document.getElementById('source').innerHTML = `Want to know more?: <a href="${randomFact.link}" target="_blank">${randomFact.source}</a>`;
        })
        .catch(error => {
            console.error('Error fetching the facts:', error);
            document.getElementById('fact').textContent = 'Failed to load a fact.';
            document.getElementById('source').textContent = '';
        });
}
