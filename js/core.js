let world = new World();
let player = null;

async function startGame() {
    await world.loadData(); // Load world data

    // Rudimentary character creation
    const playerName = prompt("Enter your name:");
    const playerClass = prompt("Enter your class (e.g., Warrior, Mage):");
    player = new Character(playerName, playerClass, 'room1'); // Start in room1

    // Initial look
    displayOutput(player.look(world));
}

function handleInput(command) {
    const output = handleCommand(command, player, world);
    displayOutput(output);
}

function displayOutput(text) {
    const outputArea = document.getElementById('output');
    outputArea.textContent += text + '\n';
}

window.onload = () => {
    document.getElementById('inputForm').addEventListener('submit', (event) => {
        event.preventDefault();
        const input = document.getElementById('input');
        handleInput(input.value);
        input.value = ''; // Clear input
    });
    startGame();
};
