// ------------------- GLOBALS

// frame rate of game
var frameRate = 30;
var assetManager = null;

//collision detection
collisionMethod = ndgmr.checkPixelCollision;
window.alphaThresh = 0.75;

// game variables & assets
var spritesheet;
var stage = null;
var canvas = null;
var mousePointer, mouseX, mouseY;

// Keys - Directional Variables
var key;
var downKey, upKey, leftKey, rightKey = false;

//page variables
var btnBegin;
var infoCloudCount, infoBirdCount, arenaCloudCount;
// ---- BOOLEANS
var isGameOver;
// --- INTERVALS
var infoCloudInterval, infoBirdInterval, arenaCloudInterval, shootInterval, isArrowsInterval, isArrowsInfoTitleInterval, instMoveInterval, instAimInterval, instArrowInterval, instStatsInterval;
// --- CONTAINERS
var cloudContainer, infoBirdContainer, arenaBirdsContainer, statsContainer, instructionContainer, mousePointerContainer;
// ------------------- VISUALS

// --- BACKGROUNDS & ASSETS
var infoTitle;
var imgRipWilly;
var gameBackground;
var instructionsBackground;
// menu options
var newGame, restartText, quitGame, instructions;
var arrowPointer;
var developerCredits;
// -- BUTTONS
var btnPause, btnThanks;
// -- STATS
var imgStatsBar, imgWave;
// --- SPEECH
var isInstructions, imgSpeech, imgStatsInstructions;

// -- NUMBER GAMEPLAY VARIABLES

// -- GAME OBJECTS
var cloud, arenaBird, bird, arrow, willy;

 // Arrays
var birds = [];
var arrows =[];

// -- BIRD VARIABLES
var birdDelay, birdTimer;

var numWave, numLives, numKills, numEnemies, numArrows, numArrowsWilly, numArrowsShot, accuracy;
// increase this every wave
var targetNumEnemies;
//arena assets - bitmapText representives of score
var numEnemiesText, numWaveText;

// ------------------------------------------------------------ event handlers
function onInit() {
    // get reference to canvas
    canvas = document.getElementById("wtw-stage");
    // set canvas to as wide/high as the browser window
    canvas.width = 600;
    canvas.height = 600;
    // create stage object
    stage = new createjs.Stage(canvas);
    stage.enableMouseOver(10);

    cloudContainer = new createjs.Container();
    infoBirdContainer = new createjs.Container();
    arenaBirdsContainer = new createjs.Container();
    statsContainer = new createjs.Container();
    instructionContainer = new createjs.Container();
    mousePointerContainer = new createjs.Container();

    // construct preloader object to load spritesheet and sound assets
    assetManager = new AssetManager();
    stage.addEventListener("onAssetLoaded", onProgress);
    stage.addEventListener("onAllAssetsLoaded", onReady);
    // load the assets
    assetManager.loadAssets(manifest);
    // btnBegin = document.getElementById("btnBegin");
    //disable the button until the game is loaded
    // btnBegin.disabled = true;

    //sounds
    createjs.Sound.registerSound("../assets/sounds/pew.ogg", "shootArrow");
    createjs.Sound.registerSound("../assets/sounds/willy_dead.ogg", "willyDies");
    createjs.Sound.registerSound("../assets/sounds/bird_dead.ogg", "birdDies");
    createjs.Sound.registerSound("../assets/sounds/wave_complete.ogg", "waveComplete");
    createjs.Sound.registerSound("../assets/sounds/game_over.ogg", "gameOver");
    createjs.Sound.registerSound("../assets/sounds/willy_talks.ogg", "willy_talks");

    //FIRST TIME VISIT - isInstructions should = true
    isInstructions = true;
}

function onProgress(e) { console.log("progress: " + assetManager.getProgress());}
// CALLED WHEN ALL ASSETS ARE LOADED
function onReady(e) {
    // kill event listener
    stage.removeEventListener("onAssetLoaded", onProgress);
    stage.removeEventListener("onAllAssetsLoaded", onReady);

    //enable the begin button when the game is ready
    // btnBegin.disabled = false;
    // $('#btnBegin').click(function(){
    //     $("div#main").fadeIn(800);
    //     $('html, body').animate({
    //         scrollTop: $("#main").offset().top
    //     }, 750);
    //     btnBegin.disabled = true;
    // });

    // Adding aimer for the mouse
    mousePointer = assetManager.getSprite("assets");
    mousePointer.gotoAndStop("mousePointer");
    canvas.addEventListener("mouseenter", addMousePointer);
    canvas.addEventListener("mouseout", removeMousePointer);

    // startup the ticker
    createjs.Ticker.setFPS(frameRate);
    createjs.Ticker.addEventListener("tick", onTick);

    //get access to assets
    spritesheet = assetManager.getSpriteSheet("assets");

    loadStartScreen();
}
function onNewGame(e) {

    // RESET Game Variables
    downKey = false;
    upKey = false;
    leftKey = false;
    rightKey = false;
    isGameOver = false;
    numWave = 1;
    numArrowsWilly = 10;
    targetNumEnemies = 5;
    numEnemies = targetNumEnemies;
    loadArenaScreen();

}
function isNotFirstVisitAssets(){
        document.addEventListener("keydown", keyDownMove);
        document.addEventListener("keyup", keyUpMove);

        // construct and setup birdTimer to drop birds on displaylist
        birdDelay = 2000;
        birdTimer = window.setInterval(onAddBird, birdDelay);

        // add pause button right away
        btnPause = assetManager.getSprite("assets");
        btnPause.x = 500;
        btnPause.y = 515;
        btnPause.gotoAndStop("btnPause");
        statsContainer.addChild(btnPause);

        // setup event listener to go to pause screen
        btnPause.addEventListener("click", onPause);
        //let willy move right away
        document.addEventListener("keydown", keyDownMove);
        document.addEventListener("keyup", keyUpMove);

        // --- SHOOTING FUNCTION - Mouse Pointer ----
        //delay shooting ability by half a second - will prevent arrow from being fired when the arena intially loads
        shootInterval = setTimeout(function(){
            stage.addEventListener("click", function(e) {
                mouseX = Math.floor(e.stageX);
                mouseY = Math.floor(e.stageY);
            });
            stage.addEventListener("click", shootProjectile);
            clearTimeout(shootInterval);
        }, 500);
}

function onPause(e){

    if(!willy.getIsPaused()){
        stage.removeEventListener("click", shootProjectile);
        //game is paused
        willy.setIsPaused(true);
        clearInterval(birdTimer);
        stage.removeChild(infoTitle);
        infoTitle = assetManager.getSprite("assets");
        infoTitle.gotoAndStop("pauseText");
        infoTitle.x = 200;
        infoTitle.y = 175;
        stage.addChild(infoTitle);
        stage.removeEventListener("click", shootProjectile);
        statsContainer.removeChild(btnPause);
        btnPause = assetManager.getSprite("assets");
        btnPause.x = 500;
        btnPause.y = 515;
        btnPause.gotoAndStop("btnResume");
        // setup event listener to go to pause screen
        btnPause.addEventListener("click", onPause);
        statsContainer.addChild(btnPause);
    }else{
        //game is playing
        willy.setIsPaused(false);
        birdTimer = window.setInterval(onAddBird, birdDelay);
        stage.removeChild(infoTitle);
        statsContainer.removeChild(btnPause);
        btnPause = assetManager.getSprite("assets");
        btnPause.x = 500;
        btnPause.y = 515;
        btnPause.gotoAndStop("btnPause");
        // setup event listener to go to pause screen
        btnPause.addEventListener("click", onPause);
        statsContainer.addChild(btnPause);
        shootInterval = setTimeout(function(){
            stage.addEventListener("click", shootProjectile);
            clearTimeout(shootInterval);
        }, 500);
    }
}
function onQuitGame(e){
    onReady();
}
function onInstructions(e){
    document.removeEventListener("keydown", onKeyDownGameOverScreen);
    document.removeEventListener("keydown", onKeyDownStartScreen);
    document.addEventListener("keydown", onKeyDownInstructions);

    instructionsBackground = assetManager.getSprite("assets");
    instructionsBackground.gotoAndStop("instructionsBackground");
    stage.addChild(instructionsBackground);

    btnThanks = assetManager.getSprite("assets");
    btnThanks.x = 210;
    btnThanks.y = 450;
    btnThanks.gotoAndStop("btnThanks");
    stage.addChild(btnThanks);
    btnThanks.addEventListener("click", function(){
        if(!isGameOver){
            document.addEventListener("keydown", onKeyDownGameOverScreen);
        }else{
            document.addEventListener("keydown", onKeyDownStartScreen);
        }
        stage.removeChild(instructionsBackground);
        stage.removeChild(btnThanks);
    });
    // always add aimer last
    removeMousePointer()
    addMousePointer();
    stage.addChild(mousePointerContainer);
}

// --------- LOAD SCREEN ASSETS --------

function loadStartScreen(){
    // setup event listeners for keyboard keys
    document.addEventListener("keydown", onKeyDownStartScreen);
    document.removeEventListener("keydown", onKeyDownInstructions);
    document.removeEventListener("keydown", onKeyDownGameOverScreen);
    document.removeEventListener("keydown", onKeyDownArenaScreen);
    document.removeEventListener("keydown", keyDownMove);
    document.removeEventListener("keyup", keyUpMove);
    stage.removeEventListener("click", shootProjectile);
    // prevent any movement
    downKey = false;
    upKey = false;
    leftKey = false;
    rightKey = false;

    // clear the stage and all of the containers
    stage.removeAllChildren();
    infoBirdContainer.removeAllChildren();
    cloudContainer.removeAllChildren();

    //Add in Clear Interval Function and pass it desired interval
    clearInterval(infoCloudInterval);
    clearInterval(infoBirdInterval);
    clearInterval(arenaCloudInterval);

    gameBackground = assetManager.getSprite("assets");
    gameBackground.gotoAndStop("startBackground");
    stage.addChild(gameBackground);

    stage.addChild(cloudContainer);
    stage.addChild(infoBirdContainer);

    imgSpeech = assetManager.getSprite("assetsCharacters");
    imgSpeech.x = 320;
    imgSpeech.y = 425;
    imgSpeech.gotoAndStop("speech_start_screen");
    stage.addChild(imgSpeech);

    willy = new Willy(stage, assetManager);
    willy.resetMe();
    willy.setXPosYPos(295, 490);

    //add clouds and backgrounds
    addBirdsInfoScreen(5);
    addCloudsInfoScreen(4);

    infoTitle = assetManager.getSprite("assets");
    infoTitle.x = 120;
    infoTitle.y = 125;
    infoTitle.gotoAndStop("gameTitleText");
    stage.addChild(infoTitle);

    arrowPointer = assetManager.getSprite("assets");
    arrowPointer.x = 200;
    arrowPointer.y = 339;
    arrowPointer.gotoAndStop("arrowPointer");
    stage.addChild(arrowPointer);

    newGame = assetManager.getSprite("assets");
    newGame.x = 240;
    newGame.y = 325;
    newGame.gotoAndStop("newGameText");
    stage.addChild(newGame);
    // setup event listener to start game
    newGame.addEventListener("click", onNewGame);

    instructions = assetManager.getSprite("assets");
    instructions.x = 240;
    instructions.y = 365;
    instructions.gotoAndStop("instructionsText");
    stage.addChild(instructions);
    // setup event listener to instructions
    instructions.addEventListener("click", onInstructions);

    developerCredits = assetManager.getSprite("assets");
    developerCredits.x = 235;
    developerCredits.y = 575;
    developerCredits.gotoAndStop("developerText");
    stage.addChild(developerCredits);

    // always add aimer last
    removeMousePointer()
    addMousePointer();
    stage.addChild(mousePointerContainer);
}
function loadArenaScreen(){
    // setup event listeners for keyboard keys
    document.removeEventListener("keydown", onKeyDownStartScreen);
    document.removeEventListener("keydown", onKeyDownInstructions);
    document.removeEventListener("keydown", onKeyDownGameOverScreen);
    document.addEventListener("keydown", onKeyDownArenaScreen);
    // prevent any movement
    downKey = false;
    upKey = false;
    leftKey = false;
    rightKey = false;
    //remove and reset assets
    stage.removeAllChildren();
    cloudContainer.removeAllChildren();
    clearInterval(infoCloudInterval);
    infoBirdContainer.removeAllChildren();
    clearInterval(infoBirdInterval);

    gameBackground = assetManager.getSprite("assets");
    gameBackground.gotoAndStop("arenaBackground");
    stage.addChild(gameBackground);

    // -- WILLY --
    willy = new Willy(stage, assetManager);
    willy.resetMe();
    willy.setKillCount(0);
    willy.setNumArrows(10);
    willy.setXPosYPos(290, 325);

    //add arena clouds
    stage.addChild(cloudContainer);
    addCloudsArenaScreen(4);
    //add birds container afetr clearing it out
    arenaBirdsContainer.removeAllChildren();
    stage.addChild(arenaBirdsContainer);

    //IF NEW GAME DISPLAY INSTRUCTIONS
    if(isInstructions){
        //play sound
        createjs.Sound.play("willy_talks");

        imgSpeech = assetManager.getSprite("assetsCharacters");
        imgSpeech.x = 85;
        imgSpeech.y = 225;
        imgSpeech.gotoAndStop("instruc_move");
        instructionContainer.addChild(imgSpeech);
        stage.addChild(instructionContainer);

        instMoveInterval = setTimeout(function(){
            //play sound
            createjs.Sound.play("willy_talks");
            instructionContainer.removeChild(imgSpeech);
            imgSpeech = assetManager.getSprite("assetsCharacters");
            imgSpeech.x = 315;
            imgSpeech.y = 225;
            imgSpeech.gotoAndStop("instruc_aim");
            instructionContainer.addChild(imgSpeech);
            clearInterval(instMoveInterval);
        }, 3500);
        instAimInterval = setTimeout(function(){
            //play sound
            createjs.Sound.play("willy_talks");
            instructionContainer.removeChild(imgSpeech);
            imgSpeech = assetManager.getSprite("assetsCharacters");
            imgSpeech.x = 85;
            imgSpeech.y = 225;
            imgSpeech.gotoAndStop("instruc_arrow");
            instructionContainer.addChild(imgSpeech);
            clearInterval(instAimInterval);
        }, 7500);
         instArrowInterval = setTimeout(function(){
            //play sound
            createjs.Sound.play("willy_talks");
            instructionContainer.removeChild(imgSpeech);
            imgSpeech = assetManager.getSprite("assetsCharacters");
            imgSpeech.x = 315;
            imgSpeech.y = 225;
            imgSpeech.gotoAndStop("instruc_stats");
            instructionContainer.addChild(imgSpeech);

            imgStatsInstructions = assetManager.getSprite("assetsCharacters");
            imgStatsInstructions.x = 20;
            imgStatsInstructions.y = 75;
            imgStatsInstructions.gotoAndStop("stats_instruc");
            instructionContainer.addChild(imgStatsInstructions);
        }, 11500);
        instStatsInterval = setTimeout(function(){
            clearInterval(instAimInterval);
            instructionContainer.removeAllChildren();
            clearInterval(instStatsInterval);
            isNotFirstVisitAssets();
        }, 16500);
    }else{
        isNotFirstVisitAssets();
    }

    // -- Stats Assets
    imgStatsBar = assetManager.getSprite("assetsCharacters");
    imgStatsBar.x = 0;
    imgStatsBar.y = 0;
    imgStatsBar.gotoAndStop("stats_bar");
    statsContainer.addChild(imgStatsBar);

    numLives = new createjs.BitmapText(willy.getLives().toString(), spritesheet);
    numLives.x = 105;
    numLives.y = 10;
    statsContainer.addChild(numLives);

    numKills = new createjs.BitmapText(willy.getKillCount().toString(), spritesheet);
    numKills.x = 265;
    numKills.y = 10;
    statsContainer.addChild(numKills);

    numEnemiesText = new createjs.BitmapText(numEnemies.toString(), spritesheet);
    if(numEnemies < 20){
        numEnemiesText.letterSpacing = 5;
    }
    numEnemiesText.x = 415;
    numEnemiesText.y = 10;
    statsContainer.addChild(numEnemiesText);

    numArrows = new createjs.BitmapText(willy.getNumArrows().toString(), spritesheet);
    if(willy.getNumArrows() < 20){
        numArrows.letterSpacing = 5;
    }
    numArrows.x = 550;
    numArrows.y = 10;
    statsContainer.addChild(numArrows);

    imgWave = assetManager.getSprite("assetsCharacters");
    imgWave.x = 225;
    imgWave.y = 500;
    imgWave.gotoAndStop("stats_wave");
    statsContainer.addChild(imgWave);

    statsContainer.removeChild(numWaveText);
    numWaveText = new createjs.BitmapText(numWave.toString(), spritesheet);
    numWaveText.x = 315;
    numWaveText.y = 515;
    statsContainer.addChild(numWaveText);

    stage.addChild(developerCredits);

    //add containers
    stage.addChild(statsContainer);
    // always add aimer last
    removeMousePointer()
    addMousePointer();
    stage.addChild(mousePointerContainer);
}
function loadGameOverScreen(){
    // resetting variables
    clearInterval(birdTimer);
    isGameOver = false;
    // no longer first visit so do not need speech instructions
    isInstructions = false;
    // remove/setup event listeners for keyboard keys
    // setup event listeners for keyboard keys
    document.removeEventListener("keydown", onKeyDownStartScreen);
    document.removeEventListener("keydown", onKeyDownInstructions);
    document.addEventListener("keydown", onKeyDownGameOverScreen);
    document.removeEventListener("keydown", onKeyDownArenaScreen);
    document.removeEventListener("keydown", keyDownMove);
    document.removeEventListener("keyup", keyUpMove);
    stage.removeEventListener("click", shootProjectile);
    // prevent any movement
    downKey, upKey, leftKey, rightKey = false;
    //play game over sound
    createjs.Sound.play("gameOver");
    //remove all assets and intervals
    stage.removeAllChildren();
    statsContainer.removeAllChildren();
    cloudContainer.removeAllChildren();
    clearInterval(arenaCloudInterval);
    arenaBirdsContainer.removeAllChildren();

    //info background
    gameBackground = assetManager.getSprite("assets");
    gameBackground.gotoAndStop("infoBackground");
    stage.addChild(gameBackground);

    stage.addChild(cloudContainer);
    stage.addChild(infoBirdContainer);
    addCloudsInfoScreen(4);
    addBirdsInfoScreen(6);

    arrowPointer = assetManager.getSprite("assets");
    arrowPointer.x = 200;
    arrowPointer.y = 339;
    arrowPointer.gotoAndStop("arrowPointer");
    stage.addChild(arrowPointer);

    restartText = assetManager.getSprite("assets");
    restartText.x = 240;
    restartText.y = 325;
    restartText.gotoAndStop("restartText");
    stage.addChild(restartText);
    // setup event listener to Quit Game
    restartText.addEventListener("click", onNewGame);

    // Add Instructions Back In
    stage.addChild(instructions);

    quitGame = assetManager.getSprite("assets");
    quitGame.x = 240;
    quitGame.y = 410;
    quitGame.gotoAndStop("quitText");
    stage.addChild(quitGame);
    // setup event listener to Quit Game
    quitGame.addEventListener("click", onQuitGame);

    numWaveText = new createjs.BitmapText(numWave.toString(), spritesheet);
    if(numWave< 20){
        numWaveText.letterSpacing = 5;
    }
    numWaveText.x = 150;
    numWaveText.y = 260;
    stage.addChild(numWaveText);

    numArrowsShot = new createjs.BitmapText(willy.getArrowCount().toString(), spritesheet);
    if(willy.getArrowCount() < 20){
        numArrowsShot.letterSpacing = 5;
    }
    numArrowsShot.x = 315;
    numArrowsShot.y = 260;
    stage.addChild(numArrowsShot);

    numKills = new createjs.BitmapText(willy.getKillCount().toString(), spritesheet);
    if(willy.getKillCount() < 20){
        numKills.letterSpacing = 5;
    }
    numKills.x = 420;
    numKills.y = 260;
    stage.addChild(numKills);

    accuracy = new createjs.BitmapText(willy.getAccuracy().toString(), spritesheet);
    if(willy.getAccuracy() < 20){
        accuracy.letterSpacing = 5;
    }
    accuracy.x = 560;
    accuracy.y = 259;
    stage.addChild(accuracy);

    imgRipWilly = assetManager.getSprite("assetsCharacters");
    imgRipWilly.x = 255;
    imgRipWilly.y = 475;
    imgRipWilly.gotoAndStop("rip_willy");
    stage.addChild(imgRipWilly);

    imgSpeech = assetManager.getSprite("assetsCharacters");
    imgSpeech.x = 320;
    imgSpeech.y = 435;
    imgSpeech.gotoAndStop("rip_willy_speech");
    stage.addChild(imgSpeech);

    stage.addChild(developerCredits);

    // always add aimer last
    removeMousePointer()
    addMousePointer();
    stage.addChild(mousePointerContainer);

}
// --------- END LOAD SCREEN ASSETS --------
// --------- SCREEN KEYDOWN FUNCTIONS --------
function onKeyDownStartScreen(e) {
    // keystroke for "P" Button activating the menu screen
    if (e.keyCode == 78) onNewGame();
    if (e.keyCode == 73) onInstructions();
    if(e.keyCode == "38" || e.keyCode == "87"){
        //direction = "up";
        arrowPointer.y = 339;
        e.preventDefault();
    } else if(e.keyCode == "40" || e.keyCode == "83"){
        //direction = "down";
        arrowPointer.y = 380;
        e.preventDefault();
    }
    if(e.keyCode == "13" && arrowPointer.y === 339){
        onNewGame();
    }
    if(e.keyCode == "13" && arrowPointer.y === 380){
        onInstructions();
    }
}
function onKeyDownInstructions(e) {
    if(e.keyCode == "13"){
        if(!isGameOver){
            document.addEventListener("keydown", onKeyDownGameOverScreen);
        }else{
            document.addEventListener("keydown", onKeyDownStartScreen);
        }
        stage.removeChild(instructionsBackground);
        stage.removeChild(btnThanks);
    }
}
function onKeyDownArenaScreen(e) {
    // keystroke for "P" Button activating the menu screen
    if (e.keyCode == 80) onPause();
}
function onKeyDownGameOverScreen(e) {

    if(e.keyCode == "38" || e.keyCode == "87"){
        //direction = "up";
        switch(arrowPointer.y){
            case 425:
                arrowPointer.y = 380;
                break;
            case 380:
                arrowPointer.y = 339;
                break;
            default:
                break;
        }
        e.preventDefault();
    } else if(e.keyCode == "40" || e.keyCode == "83"){
        //direction = "down";
        switch(arrowPointer.y){
            case 339:
                arrowPointer.y = 380;
                break;
            case 380:
                arrowPointer.y = 425;
                break;
            default:
                break;
        }
        e.preventDefault();
    }
    if(e.keyCode == "13" && arrowPointer.y === 339){
        onNewGame();
    }
    if(e.keyCode == "13" && arrowPointer.y === 380){
        onInstructions();
    }
    if(e.keyCode == "13" && arrowPointer.y === 425){
        onReady();
    }
}
function keyDownMove(e){
    key = e.which;
    if(key == "37" || key == "65"){
        //direction = "left";
        leftKey = true;
        e.preventDefault();
    } else if(key == "38" || key == "87"){
        //direction = "up";
        upKey = true;
        e.preventDefault();
    }else if(key == "39" || key == "68"){
        //direction = "right";
        rightKey = true;
        e.preventDefault();
    }else if(key == "40" || key == "83"){
        //direction = "down";
        downKey = true;
        e.preventDefault();
    }
}
function keyUpMove(e){
    key = e.which;
    if(key == "37" || key == "65"){
        //direction = "left";
        leftKey = false;
        e.preventDefault();
    } else if(key == "38" || key == "87"){
        //direction = "up";
        upKey = false;
        e.preventDefault();
    }else if(key == "39" || key == "68"){
        //direction = "right";
        rightKey = false;
        e.preventDefault();
    }else if(key == "40" || key == "83"){
        //direction = "down";
        downKey = false;
        e.preventDefault();
    }
}
function moveWilly(){
    if(leftKey){
        willy.moveLeft();
    } else if(upKey){
        willy.moveUp();
    }else if(rightKey){
        willy.moveRight();
    }else if(downKey){
        willy.moveDown();
    }
}
// --------- END KEYDOWN FUNCTIONS --------
// --------- WAVE --------
function increaseWave(){
    //remove Willy's shooting ability
    stage.removeEventListener("click", shootProjectile);
    //remove pause button
    statsContainer.removeChild(btnPause);
    //play wave complete sound
    createjs.Sound.play("waveComplete");
    willy.setIsWaveComplete(true);
    //stop adding birds to the screen and disregard arrow count
    clearInterval(birdTimer);
    clearInterval(isArrowsInterval);
    clearInterval(isArrowsInfoTitleInterval);

    infoTitle = assetManager.getSprite("assets");
    infoTitle.gotoAndStop("waveComplete");
    infoTitle.x = 225;
    infoTitle.y = 200;
    stage.addChild(infoTitle);

    //increase number of arrows willy has at his disposal - update stats bar
    numArrowsWilly = numArrowsWilly + 5;
    willy.setNumArrows(numArrowsWilly);
    statsContainer.removeChild(numArrows);
    numArrows = new createjs.BitmapText(willy.getNumArrows().toString(), spritesheet);
    if(willy.getNumArrows() < 20){
        numArrows.letterSpacing = 5;
    }
    numArrows.x = 550;
    numArrows.y = 10;
    statsContainer.addChild(numArrows);
    //increase numWave - update stats bar
    statsContainer.removeChild(numWaveText);
    numWaveText = new createjs.BitmapText((numWave+=1).toString(), spritesheet);
    numWaveText.x = 315;
    numWaveText.y = 515;
    statsContainer.addChild(numWaveText);
    //increase number of enemies for wave
    targetNumEnemies +=3;
    numEnemies = targetNumEnemies;
    waveInterval = setTimeout(function(){
        birds = [];
        arenaBirdsContainer.removeAllChildren();
        stage.removeChild(arenaBirdsContainer);
        stage.removeChild(infoTitle);
        statsContainer.addChild(btnPause);
        willy.setIsWaveComplete(false);
        stage.addChild(arenaBirdsContainer);
        stage.addEventListener("click", shootProjectile);
        //increase bird generation
        birdDelay -= 100;
        birdTimer = window.setInterval(onAddBird, birdDelay);
        clearTimeout(waveInterval);
    }, 3000);

}

// --------- END WAVE --------
// --------- MOUSE EVENTS --------
function shootProjectile(){
    //console.log("SHOOT");

    //play sound
    createjs.Sound.play("shootArrow");

    willy.decreaseNumArrows();
    willy.increaseArrowCount();
    statsContainer.removeChild(numArrows);
    numArrows = new createjs.BitmapText(willy.getNumArrows().toString(), spritesheet);
    if(willy.getNumArrows() < 20){
        numArrows.letterSpacing = 5;
    }
    numArrows.x = 550;
    numArrows.y = 10;
    statsContainer.addChild(numArrows);
    // add arrow on mouse click to the stage
    arrow = new Projectile(stage, assetManager);
    arrow.setupMe(mouseX, mouseY, willy.getWillyX(), willy.getWillyY());
    arrows.push(arrow);

    //check for depleted arrows
    if (willy.getNumArrows() === 0){
        // Willy has no more arrows
        stage.removeEventListener("click", shootProjectile);
        //remove pause button
        statsContainer.removeChild(btnPause);
        //allow time for last arrow shot to play out
        isArrowsInterval = setTimeout(function(){
            infoTitle = assetManager.getSprite("assets");
            infoTitle.gotoAndStop("arrowsDepleted");
            infoTitle.x = 125;
            infoTitle.y = 150;
            stage.addChild(infoTitle);
            //pause birds
            willy.setIsPaused(true);
            clearInterval(birdTimer);
            //arenaBirdsContainer.removeAllChildren();
            clearTimeout(isArrowsInterval);
        }, 3000);
        isArrowsInfoTitleInterval = setTimeout(function(){
            stage.removeChild(infoTitle);
            loadGameOverScreen()
            clearTimeout(isArrowsInfoTitleInterval);
        }, 6000);
    }
}
function addMousePointer(){
    $( "#wtw-stage" ).mousemove(function( event ) {
        mousePointer.x = stage.mouseX - 20;
        mousePointer.y = stage.mouseY - 20;
    });
    mousePointerContainer.addChild(mousePointer);
}
function removeMousePointer(){
    mousePointerContainer.removeAllChildren();
}
// --------- CLOUDS --------

function addCloudsInfoScreen(numClouds){
    infoCloudCount = 1;
    // set interval
    infoCloudInterval = setInterval(addInfoCloud, 6000);
    function addInfoCloud() {
        if(infoCloudCount <= numClouds){
            var cloud = new Cloud(stage, cloudContainer, assetManager);
            cloud.getInfoScreenClouds();
            infoCloudCount ++;
        }else{
            clearInterval(infoCloudInterval);
        }
    }
};
function addCloudsArenaScreen(numClouds){
    arenaCloudCount = 1;
    // set interval
    arenaCloudInterval = setInterval(addArenaCloud, 5000);
    function addArenaCloud() {
        if(arenaCloudCount <= numClouds){
            var cloud = new Cloud(stage, cloudContainer, assetManager);
            cloud.getArenaClouds();
            arenaCloudCount ++;
        }else{
            clearInterval(arenaCloudInterval);
        }
    }
};
// --------- END CLOUDS --------

// --------- BIRDS --------
function addBirdsInfoScreen(numBirds){
    infoBirdCount = 1;
    // set interval
    infoBirdInterval = setInterval(addInfoBird, 4000);
    function addInfoBird() {
        if(infoBirdCount <= numBirds){
            var bird = new Bird(stage, infoBirdContainer, arenaBirdsContainer, assetManager, willy);
            bird.getInfoScreenBirds();
            infoBirdCount ++;
        }else{
            clearInterval(infoBirdInterval);
        }
    }
}
function onAddBird(e) {
    arenaBird = new Bird(stage, infoBirdContainer, arenaBirdsContainer, assetManager, willy, arrows);
    arenaBird.setupMe();
    birds.push(arenaBird);
}
// --------- END BIRDS --------

// --------- END WILLY --------
// --------- TICK --------

function onTick(e) {
    // TESTING FPS
    // document.getElementById("wtw-fps").innerHTML = createjs.Ticker.getMeasuredFPS();

    if(willy.getIsBirdKilled()){
        //play bird dies sound
         createjs.Sound.play("birdDies");
        statsContainer.removeChild(numKills);
        numKills = new createjs.BitmapText(willy.getKillCount().toString(), spritesheet);
        if(willy.getKillCount() < 20){
            numKills.letterSpacing = 5;
        }
        numKills.x = 265;
        numKills.y = 10;
        statsContainer.addChild(numKills);
        numEnemies -= 1;
        if(numEnemies === 0){
            increaseWave();
        }
        statsContainer.removeChild(numEnemiesText);
        numEnemiesText = new createjs.BitmapText(numEnemies.toString(), spritesheet);
        if(numEnemies < 20){
            numEnemiesText.letterSpacing = 5;
        }
        numEnemiesText.x = 415;
        numEnemiesText.y = 10;
        statsContainer.addChild(numEnemiesText);
        willy.setIsBirdKilled(false);
    }else if(willy.getIsWillyKilled()){
        downKey = false;
        upKey = false;
        leftKey = false;
        rightKey = false;
        //play willy dies sound
        createjs.Sound.play("willyDies");
        willy.decreaseLivesCount();
        statsContainer.removeChild(numLives);
        numLives = new createjs.BitmapText(willy.getLives().toString(), spritesheet);
        numLives.x = 105;
        numLives.y = 10;
        statsContainer.addChild(numLives);
        willy.setIsWillyKilled(false);
        if(willy.getLives() === 0 ){
            //prevent depleted arrow title from appearing if WIlly dies after last shot and before game over
            clearInterval(isArrowsInterval);
            clearInterval(isArrowsInfoTitleInterval);
            loadGameOverScreen();
        }
    }else if(!willy.getIsPaused()){
        moveWilly();
    }
    // update the stage!
    stage.update();
}
