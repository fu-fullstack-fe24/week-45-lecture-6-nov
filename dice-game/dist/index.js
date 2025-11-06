const buttonRef = document.querySelector('button');
const diceRef = document.querySelector('#diceElem');
let throws = 0;
let currentGoal = 1;
let lastThrow = 1;
const dice = {
    sides: 6,
    throw: () => {
        return Math.floor(Math.random() * dice.sides + 1);
    }
};
buttonRef.addEventListener('click', () => {
    const result = dice.throw();
    console.log(result);
    diceRef.classList.remove(`dots-${lastThrow}`);
    diceRef.classList.add(`dots-${result}`);
    throws++;
    if (result === currentGoal) {
        const diceDotsRef = document.querySelector(`.dots-${result}`);
        diceDotsRef.classList.remove('faded');
        if (currentGoal < 6) {
            currentGoal++;
        }
        else {
            const msgRef = document.querySelector('#winningMessage');
            msgRef.textContent = `Wohoo! Du vann på ${throws} kast! Kalaskul!`;
            throws = 0;
            currentGoal = 1;
            resetUi(dice.sides);
        }
    }
    lastThrow = result;
});
const resetUi = (numberOfDices) => {
    for (let i = 0; i <= numberOfDices; i++) {
        document.querySelector(`dots-${i}`).classList.add('faded');
    }
};
