#! /usr/bin/env node
// shebang for npx executable scripts
import inquirer from "inquirer";
import chalk from "chalk";
//*************************ENEMY VARIABLES*****************************/
let enemies = ["Skeleton", "Zombie", "Dragon", "Assassin"];
let maxEnemyHealth = 75; // Maximum health of enemy
let enemyAttackDamageToHero = 25; // Maximum attack damage an enemy
//**************************PLAYER VARIABLES****************************/
let heroHealth = 100; // Inital value of Hero Health
let numHealthpotion = 3; // Total number of Health Potions for hero
let healthPotionHealAmount = 30; // Amount of Health a potion can revive
let healthPotionDropChance = 50; // Health Potion Drop Chance by Enemy
//**************************GAME WHILE LOOP***************************/
let gameRunning = true;
console.log(chalk.bold.italic.ansi256(194)("``~~~~~~~~~~~~~~~~~~~~~~~~WelCome to The DeadZone!~~~~~~~~~~~~~~~~~~~~~~~~~~``"));
Game: while (gameRunning) {
    let enemyHealth = Math.floor(Math.random() * maxEnemyHealth + 1); // Computer generated health for the enemy
    let enemyIndex = Math.floor(Math.random() * enemies.length); // Computer generated enemy from the list
    let enemy = enemies[enemyIndex];
    console.log(chalk.bold.underline.yellowBright(`\t# ${enemy} has appeared #\n`));
    while (enemyHealth > 0) {
        // Display the player's and Enemy health
        console.log(chalk.bold.cyanBright(`\t Your Health: ${heroHealth} \n`));
        console.log(chalk.bold.cyanBright(`\t ${enemy} Health: ${enemyHealth} \n`));
        // Game Options for Player
        let options = await inquirer.prompt([
            {
                name: "answer",
                type: "list",
                message: "What would you like to do?",
                choices: [" 1. Attack ", " 2. Take Health Potion ", " 3. Run "],
            },
        ]);
        // Player choice consoles
        // 1. Attack
        if (options.answer === " 1. Attack ") {
            let attackDamageToEnemy = 50;
            let damageToEnemy = Math.floor(Math.random() * attackDamageToEnemy + 1);
            let damageToHero = Math.floor(Math.random() * enemyAttackDamageToHero + 1);
            // Display damage to enemy and player
            enemyHealth -= damageToEnemy;
            heroHealth -= damageToHero;
            console.log(chalk.bold.magenta(`You striked the ${enemy} for damage ${damageToEnemy}`));
            console.log(chalk.bold.yellowBright(`${enemy} striked you for ${damageToHero} damage`));
            // Check if the player's health has dropped below 1
            if (heroHealth < 1) {
                console.log(chalk.redBright("You have taken too much damage, You are too weak to continue!"));
                break;
            }
            // 2. Take Health Potion
        }
        else if (options.answer === " 2. Take Health Potion ") {
            if (numHealthpotion > 0) {
                heroHealth += healthPotionHealAmount;
                numHealthpotion--; // Decrease the number of health potions
                // Display the result of using a health potion
                console.log(chalk.yellowBright(`You used the health potion for ${healthPotionHealAmount}`));
                console.log(chalk.blueBright(`You have ${heroHealth} health!`));
                console.log(chalk.greenBright(`You have ${numHealthpotion} health potions left!`));
            }
            else {
                console.log(chalk.redBright("You have no health potions left!, Defeat enemy for a chance to get one "));
            }
            // 3. Run
        }
        else if (options.answer === " 3. Run ") {
            console.log(chalk.bold.ansi256(170)(`You flee the from ${enemy}`));
            continue Game; // Proceed to the next iteration of the game loop
        }
    }
    // Check if the player's health depleted below 1
    if (heroHealth < 1) {
        console.log(chalk.redBright("Your strength has failed you. You are too wounded to continue!"));
        break;
    }
    console.log(chalk.ansi256(153)(`${enemy} slain!`)); // Displays Enemy's defeat
    console.log(chalk.greenBright(`You have ${heroHealth} health!`)); // Displays player's current health
    // Chance to drop a health potion
    let randomNumber = Math.floor(Math.random() * 100 + 1);
    if (randomNumber < healthPotionDropChance) {
        numHealthpotion++;
        // Display the result of having a health potion
        console.log(chalk.cyanBright("The enemy dropped a health potion. Your health is restored!"));
        console.log(chalk.greenBright(`Your health is ${heroHealth}!`));
        console.log(chalk.ansi256(180)(`Your health potion is ${numHealthpotion}!`));
    }
    // Allow the player to continue or exit
    let userOption = await inquirer.prompt([
        {
            name: "ans",
            message: "Would you like to do now?",
            type: "list",
            choices: [" 1. Continue ", " 2. Exit "],
        },
    ]);
    // If player wishes to continue or exit
    if (userOption.ans === " 1. Continue ") {
        console.log(chalk.bold.cyanBright("The Adventure continues...!"));
    }
    else {
        console.log(chalk.bold.magenta("You successfully escaped the DeadZone!"));
        break;
    }
    console.log(chalk.bold.ansi256(190)("\tThank you for Playing\n"));
}
