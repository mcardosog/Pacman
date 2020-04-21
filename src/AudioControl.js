var currentGame;
function AudioControl(game) {
    currentGame = game;
}


var recognitionENG = new webkitSpeechRecognition();//new (window.SpeechRecognition || window.webkitSpeechRecognition || window.mozSpeechRecognition || window.msSpeechRecognition)();
recognitionENG.lang = 'en-US';
recognitionENG.interimResults = true;
recognitionENG.maxAlternatives = 1;
recognitionENG.continuous = true;
recognitionENG.start();

var recognitionSPN = new webkitSpeechRecognition();//new (window.SpeechRecognition || window.webkitSpeechRecognition || window.mozSpeechRecognition || window.msSpeechRecognition)();
recognitionSPN.lang = 'es-US';
recognitionSPN.interimResults = true;
recognitionSPN.maxAlternatives = 1;
recognitionSPN.continuous = true;
recognitionSPN.start();


let gestureStore = {
    'up':KEY_UP,
    'left':KEY_LEFT,
    'right':KEY_RIGHT,
    'down':KEY_DOWN,
    'enter':KEY_ENTER,

    'arriba':KEY_UP,
    'izquierda':KEY_LEFT,
    'derecha':KEY_RIGHT,
    'abajo':KEY_DOWN,
    'entrar':KEY_ENTER,
};

let actionStore = {
    'power': 1,
    'pill': 2,
    'ghost': 3,
    'cherry': 4,

    'poder': 1,
    'píldora': 2,
    'fantasma': 3,
    'cereza': 4,
}


recognitionSPN.onresult = function(event) {
    recognitionENG.onresult(event);
}

var tempBestInterpretation = '';
var timeStamp = 0;

recognitionENG.onresult = function(event) {
    console.log(event);
    if (event.timeStamp - timeStamp >= 2000) {
        tempBestInterpretation = '';
        maxConfidence = 0;
    }
    var interpretationFinal = false;

    const currentResult = event.results[event.results.length - 1][0];
    if (currentResult.confidence > 0.75) {
        const splittedTranscript = currentResult.transcript.split(" ");
        for (var j = 0; j < splittedTranscript.length; j++) {
            if (!tempBestInterpretation.includes(splittedTranscript[j])) {
                tempBestInterpretation = tempBestInterpretation + " " + splittedTranscript[j];
                timeStamp = event.timeStamp;
            }
        }
    }

    console.log(tempBestInterpretation);
    callServer(tempBestInterpretation);
    return;


    var keyFromAudio = null;
    var actionFromAudio = null;
    //if(event.results[event.results.length-1].confidence < 0.7) { return; }
    for (i = 0; i < event.results[event.results.length - 1].length; i++) {
        if (keyFromAudio != null || actionFromAudio != null) {
            break;
        }
        let iResult = event.results[event.results.length - 1][i];
        if (keyFromAudio != null) {
            console.log(keyFromAudio);
            break;
        }
        //callServer(keyFromAudio.transcript);
        // DELETE
        for (var key in gestureStore) {
            if (iResult.transcript.includes(key)) {
                keyFromAudio = gestureStore[key];
                break;
            }
            console.log(iResult);
        }
        for (var key in actionStore) {
            if (iResult.transcript.includes(key)) {
                actionFromAudio = actionStore[key];
                break;
            }
        }
        // HERE
    }

    if (keyFromAudio != null) {
        currentGame._keyPressed = keyFromAudio;
        currentGame.singleDirection = true;
    } else if (actionFromAudio != null) {
        var path = null;
        switch (actionFromAudio) {
            case 1:
                path = currentGame._scene._pacman.findClosestPowerPellet();
                console.log('Find a power pill');
                break;
            case 2:
                path = currentGame._scene._pacman.findClosestPellet();
                console.log('Find a pill');
                break;
            case 3:
                path = currentGame._scene._pacman.findClosestVulnerableGhost();
                console.log('Find a ghost');
                break;
            case 4:
                path = currentGame._scene._pacman.findCherry();
                console.log('Find the cherry');
                break;
        }
        currentGame.singleDirection = false;
        currentGame.pathToTaget = path;
    }
    console.log('---    ACTION PROCESSED    ---\n');
};

//EXAMPLE
function callServer(transcript) {
    console.log('Calling The server')
    fetch("http://localhost:3000/pacmanCommunicator/"+transcript)
        .then(res => res.text())
        .then(res => console.log('SERVER RESULT = '+res+'\n'));
}
