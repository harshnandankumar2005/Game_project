let playerHealth = 100;
let enemyHealth = 100;

const maxHealth = 100;

const playerAttackPower = 20;
const enemyAttackPower = 15;

let specialUsed = false;
let gameOver = false;

const playerHealthBar = document.getElementById("playerHealth");
const enemyHealthBar = document.getElementById("enemyHealth");

const playerHealthText = document.getElementById("playerHealthText");
const enemyHealthText = document.getElementById("enemyHealthText");

const attackBtn = document.getElementById("attackBtn");
const specialBtn = document.getElementById("specialBtn");
const healBtn = document.getElementById("healBtn");
const restartBtn = document.getElementById("restartBtn");

const log = document.getElementById("log");
const gameStatus = document.getElementById("gameStatus");


/* UPDATE HEALTH */

function updateHealth() {

    playerHealth = Math.max(0, Math.min(maxHealth, playerHealth));
    enemyHealth = Math.max(0, Math.min(maxHealth, enemyHealth));

    playerHealthBar.style.width = playerHealth + "%";
    enemyHealthBar.style.width = enemyHealth + "%";

    playerHealthText.textContent =
        `${playerHealth} / ${maxHealth}`;

    enemyHealthText.textContent =
        `${enemyHealth} / ${maxHealth}`;
}


/* BATTLE LOG */

function addLog(message) {

    const entry = document.createElement("p");

    entry.textContent = message;

    log.prepend(entry);
}


/* DISABLE BUTTONS */

function disableButtons() {

    attackBtn.disabled = true;
    specialBtn.disabled = true;
    healBtn.disabled = true;

}


/* ENABLE BUTTONS */

function enableButtons() {

    attackBtn.disabled = false;

    if (!specialUsed) {
        specialBtn.disabled = false;
    }

    healBtn.disabled = false;
}


/* ENEMY TURN */

function enemyTurn() {

    if (gameOver) {
        return;
    }

    setTimeout(() => {

        const damage =
            Math.floor(Math.random() * 8) + enemyAttackPower - 4;

        playerHealth -= damage;

        addLog(`👹 Dark Orc attacks and deals ${damage} damage!`);

        updateHealth();

        checkGameOver();

    }, 700);
}


/* NORMAL ATTACK */

attackBtn.addEventListener("click", function () {

    if (gameOver) {
        return;
    }

    const damage =
        Math.floor(Math.random() * 8) + playerAttackPower - 4;

    enemyHealth -= damage;

    addLog(`⚔️ Wizard attacks and deals ${damage} damage!`);

    updateHealth();

    checkGameOver();

    if (!gameOver) {
        enemyTurn();
    }

});


/* SPECIAL ATTACK */

specialBtn.addEventListener("click", function () {

    if (gameOver || specialUsed) {
        return;
    }

    const damage =
        Math.floor(Math.random() * 15) + 30;

    enemyHealth -= damage;

    specialUsed = true;

    specialBtn.disabled = true;

    addLog(`🔥 SPECIAL ATTACK! Wizard deals ${damage} damage!`);

    updateHealth();

    checkGameOver();

    if (!gameOver) {
        enemyTurn();
    }

});


/* HEAL */

healBtn.addEventListener("click", function () {

    if (gameOver) {
        return;
    }

    const healAmount =
        Math.floor(Math.random() * 11) + 15;

    const oldHealth = playerHealth;

    playerHealth = Math.min(
        maxHealth,
        playerHealth + healAmount
    );

    const actualHeal =
        playerHealth - oldHealth;

    addLog(`❤️ Wizard heals for ${actualHeal} HP!`);

    updateHealth();

    enemyTurn();

});


/* GAME OVER */

function checkGameOver() {

    if (enemyHealth <= 0) {

        gameOver = true;

        gameStatus.textContent = "🏆 VICTORY!";

        addLog("🏆 You defeated the Dark Orc!");

        disableButtons();

        return;
    }


    if (playerHealth <= 0) {

        gameOver = true;

        gameStatus.textContent = "💀 DEFEAT!";

        addLog("💀 The Dark Orc defeated you!");

        disableButtons();

        return;
    }

}


/* RESTART */

restartBtn.addEventListener("click", function () {

    playerHealth = 100;
    enemyHealth = 100;

    specialUsed = false;
    gameOver = false;

    gameStatus.textContent = "READY TO FIGHT";

    log.innerHTML =
        "<p>⚔️ The battle is about to begin...</p>";

    updateHealth();

    enableButtons();

});


/* INITIALIZE */

updateHealth();
