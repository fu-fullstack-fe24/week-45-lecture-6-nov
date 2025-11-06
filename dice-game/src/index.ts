const buttonRef = document.querySelector('button') as HTMLButtonElement;
const diceRef = document.querySelector('#diceElem') as HTMLElement;
let throws : number = 0;
let currentGoal : number = 1;
let lastThrow : number = 1;

interface Dice {
    sides : number,
    throw : () => number
}

const dice : Dice = {
    sides : 6,
    throw : () => {
        return Math.floor(Math.random() * dice.sides + 1);
    }
}

buttonRef.addEventListener('click', () => {
    const result : number = dice.throw();
    console.log(result);
    

    diceRef.classList.remove(`dots-${lastThrow}`);
    diceRef.classList.add(`dots-${result}`);

    throws++;

    if(result === currentGoal) {
        const diceDotsRef = document.querySelector(`.dots-${result}`) as HTMLElement;
        diceDotsRef.classList.remove('faded');

        if(currentGoal < 6) {
            currentGoal++;
        } else {
            const msgRef = document.querySelector('#winningMessage') as HTMLElement;
            msgRef.textContent = `Wohoo! Du vann på ${throws} kast! Kalaskul!`;

            throws = 0;
            currentGoal = 1;
            resetUi(dice.sides);
        }
    }
    lastThrow = result;
});

const resetUi = (numberOfDices : number) : void => {
    for(let i = 0; i <= numberOfDices; i++) {
        document.querySelector<HTMLElement>(`dots-${i}`).classList.add('faded');
    }
}