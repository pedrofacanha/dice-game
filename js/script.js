// set nodes
let userElement = document.getElementById("userName");
let cpuElement = document.getElementById("cpu");
let userDice1 = document.getElementById("die1");
let userDice2 = document.getElementById("die2");
let cpuDice1 = document.getElementById("die3");
let cpuDice2 = document.getElementById("die4");
let finalResult = document.getElementById("finalResult");
let resetButton = document.getElementById("resetBtn");
let button = document.querySelector(".myBtn");

// Set initial scores
let userScore = 0;
let cpuScore = 0;

// Set initial rounds
let roundsPlayed = 0;

// User input
const userName = prompt("What's your name?");

// Create player Object
const player = 
{
    'name': userName
}

// Game
function rollDices() 
{

    if (roundsPlayed < 3) 
    {
        function animation()
        {
            let dice = document.querySelectorAll(".die");

            dice.forEach(function(die)
            {
                die.style.transition = "opacity 2s ease-in-out";
                die.style.opacity = 1;

            setTimeout(function() 
            {
                die.style.transition = "opacity 2s ease-in-out";
                die.style.opacity = 0;
            }, 2000);

            })
        }
        
        // Generate random numbers for Player and PC
        let userDiceNumber1 = generateRandomNumber(6);
        let userDiceNumber2 = generateRandomNumber(6);

        let cpuDiceNumber1 = generateRandomNumber(6);
        let cpuDiceNumber2 = generateRandomNumber(6);
        
        // Set random dice images for user
        userDice1.setAttribute("src", `images/dice${userDiceNumber1}.png`);
        userDice2.setAttribute("src", `images/dice${userDiceNumber2}.png`);

        // Set random dice images for CPU
        cpuDice1.setAttribute("src", `images/dice${cpuDiceNumber1}.png`);
        cpuDice2.setAttribute("src", `images/dice${cpuDiceNumber2}.png`);

        animation();

        // Score calculation function
        function calculateScore(dice1, dice2) 
        {
            if (dice1 === 1 || dice2 === 1) 
            {
                return 0;
            } 
            else if (dice1 === dice2) 
            {
                return (dice1 + dice2) * 2;
            } 
            else 
            {
                return dice1 + dice2;
            }
        }

        // Generate a random number
        function generateRandomNumber(number) 
        {
            return Math.floor(Math.random() * number) + 1;
        }

        // Add scores to elements
        userScore += calculateScore(userDiceNumber1, userDiceNumber2);
        cpuScore += calculateScore(cpuDiceNumber1, cpuDiceNumber2);

        // Increment rounds played
        roundsPlayed++;

        // Update the UI with the results
        function updateUI() 
        {
            finalResult.innerHTML = `${userName}: ${userScore} pts! <br> CPU: ${cpuScore} pts!`;

            // End game after 3 rounds
            if (roundsPlayed === 3) 
            {
                button.disabled = true;  // Disable the button to prevent further rolls

                let res = "";

                // Display final result
                if (userScore > cpuScore) 
                {
                    res += `${userName} WIN!`;
                } 
                else if (cpuScore > userScore) 
                {
                    res += "CPU WIN!";
                } 
                else 
                {
                    res += "DRAW!";
                }
                // Append the result to the final message
                finalResult.innerHTML += `<br> Game Over! ${res}`;
            }
        }

        updateUI();
    }
}


function restartGame()
{
    userScore = 0;
    cpuScore = 0;
    roundsPlayed = 0;
    button.disabled = false;

    let dice = document.querySelectorAll(".die")

    dice.forEach(function(die)
    {
        die.style.opacity = 0;
    })

    finalResult.innerHTML = `Dice game`;
}

// Display user's name after prompt
userElement.innerHTML = player.name;
