var currentGame;
function AudioControl(game) {
    currentGame = game;
}


var recognitionENG = new webkitSpeechRecognition();//new (window.SpeechRecognition || window.webkitSpeechRecognition || window.mozSpeechRecognition || window.msSpeechRecognition)();
recognitionENG.lang = 'en-US';
recognitionENG.interimResults = true;
recognitionENG.maxAlternatives = 5;
recognitionENG.continuous = true;
recognitionENG.start();


var recognitionSPN = new webkitSpeechRecognition();//new (window.SpeechRecognition || window.webkitSpeechRecognition || window.mozSpeechRecognition || window.msSpeechRecognition)();
recognitionSPN.lang = 'es-US';
recognitionSPN.interimResults = true;
recognitionSPN.maxAlternatives = 5;
recognitionSPN.continuous = true;
recognitionSPN.start();

let gestureStore = {
    'up':KEY_UP,
    'left':KEY_LEFT,
    'right':KEY_RIGHT,
    'down':KEY_DOWN,
    'enter':KEY_ENTER,

    'arriba':KEY_UP,
    'izquierd':KEY_LEFT,
    'derech':KEY_RIGHT,
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

    var keyFromAudio = null;
    var actionFromAudio = null;

    /*
    console.log(event);
    for(i = 0; i < event.results.length; i++) {
        console.log(`${event.currentTarget.lang} RESULTS [${i}] [${event.results[i].length}]:`);
        for(j = 0; j < event.results[i].length; j++) {
            console.log(event.results[i][j].transcript+'\n');
        }
    }

     */


    //if(event.results[event.results.length-1][0].confidence < 0.5) { return; }
    for(i = 0; i < event.results[event.results.length-1].length; i++) {
        if(keyFromAudio != null || actionFromAudio != null) { break; }
        let iResult = event.results[event.results.length-1][i];
        //iResult.toLowerCase();
        iResult.transcript = iResult.transcript.toLowerCase();


        for(var key in gestureStore) {
            if(iResult.transcript.includes(key)) {
                keyFromAudio = gestureStore[key];
                console.log(key);
                break;
            }
        }
        for(var key in actionStore) {
            if(iResult.transcript.includes(key)) {
                actionFromAudio = actionStore[key];
                console.log(key);
                break;
            }
        }
    }

    if (keyFromAudio != null) {
        currentGame._keyPressed =  keyFromAudio;
        currentGame.singleDirection = true;
    }
    else if (actionFromAudio != null) {
        var path = null;
        switch(actionFromAudio) {
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
    else if (event.results[event.results.length-1].isFinal){
        callServer(event.results[event.results.length-1][0]);
    }

    //console.log('---    ACTION PROCESSED    ---\n');
};

/*
recognitionENG.onresult = function(event) {
    if (event.timeStamp - timeStamp >= 500) {
        tempBestInterpretation = '';
        maxConfidence = 0;
    }

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
    else { return; }

    var keyFromAudio = null;
    var actionFromAudio = null;

        for (var key in gestureStore) {
            if (tempBestInterpretation.includes(key)) {
                keyFromAudio = gestureStore[key];
                break;
            }
        }
        for (var key in actionStore) {
            if (tempBestInterpretation.includes(key)) {
                actionFromAudio = actionStore[key];
                break;
            }
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

    callServer();
};
*/
//EXAMPLE

function callServer(tempBestInterpretation) {
    console.log('CALLING SERVER')
    fetch("http://localhost:3000/pacmanCommunicator/" + tempBestInterpretation)
        .then(res => res.text())
        .then(res => {
            res = res.toLowerCase();
            console.log('SERVER RESULT = ' + res + '\n');
            for (var key in gestureStore) {
                if (key == res) {
                    currentGame._keyPressed = gestureStore[key];
                    currentGame.singleDirection = true;
                    return;
                }
            }
            var actionFromAudio = null;
            for (var action in actionStore) {
                if (action == res) {
                    actionFromAudio = actionStore[action];
                    break;
                }
            }
            if (actionFromAudio == null) {
                return;
            }
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

        });
}
