// Create variable 'game'
let game;

// When 'new game' is clicked, create a new game and start it
document.getElementById('btn__reset').addEventListener('click', () => {
    game = new Game();
    game.startGame();
});

/** When a letter on the virtual keyboard is clicked send that 
 * element to the game handler
*/
const keyboard = document.getElementById('qwerty');
keyboard.addEventListener('click', (e) => {
    if(e.target.tagName === 'BUTTON') {
        game.handleInteraction(e.target);
    }
});

/** When a computer key is pressed, get that key's element
 * and send it to the game handler
 */
document.addEventListener('keydown', (e) => {
    const keypress = e.key;
    const virtualKeys = keyboard.getElementsByClassName('key');
    for(let i = 0; i < virtualKeys.length; i++){
        if(virtualKeys[i].textContent === keypress) {
            game.handleInteraction(virtualKeys[i]);
        }
    }
});