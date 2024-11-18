export function createView() {
    // Set up event listeners for player movement
    document.addEventListener("keydown", (e) => {
        switch (e.key) {
            case "ArrowUp": movePlayer(properties.Direction.UP); break;
            case "ArrowDown": movePlayer(properties.Direction.DOWN); break;
            case "ArrowLeft": movePlayer(properties.Direction.LEFT); break;
            case "ArrowRight": movePlayer(properties.Direction.RIGHT); break;
        }
    });

    // Set up event listeners for movement buttons
    document.getElementById("up").addEventListener("click", () => movePlayer(properties.Direction.UP));
    document.getElementById("down").addEventListener("click", () => movePlayer(properties.Direction.DOWN));
    document.getElementById("left").addEventListener("click", () => movePlayer(properties.Direction.LEFT));
    document.getElementById("right").addEventListener("click", () => movePlayer(properties.Direction.RIGHT));
}

// Render the visible portion of the map
export function renderGame() {
    const gameContainer = document.getElementById("game-container");
    let visibleMap = "";

    for (let y = 0; y < gameState.viewHeight; y++) {
        for (let x = 0; x < gameState.viewWidth; x++) {
            const mapX = gameState.player.position[0] + x - Math.floor(gameState.viewWidth / 2);
            const mapY = gameState.player.position[1] + y - Math.floor(gameState.viewHeight / 2);

            if (mapX >= 0 && mapX < gameState.map[0].length && mapY >= 0 && mapY < gameState.map.length) {
                visibleMap += gameState.map[mapY][mapX];
            } else {
                visibleMap += resources.icons['empty'];
            }
        }
        visibleMap += "<br/>";
    }

    gameContainer.innerHTML = visibleMap;
}