var currentGame;
function AudioControl(game) {
    currentGame = game;
}

var recognition = new webkitSpeechRecognition();//new (window.SpeechRecognition || window.webkitSpeechRecognition || window.mozSpeechRecognition || window.msSpeechRecognition)();
recognition.lang = 'en-US';
recognition.interimResults = true;
recognition.maxAlternatives = 5;
recognition.continuous = true;
recognition.start();

let gestureStore = {
    'up':KEY_UP,
    'left':KEY_LEFT,
    'right':KEY_RIGHT,
    'down':KEY_DOWN,
    'enter':KEY_ENTER
};

let actionStore = {
    'power pill': 1,
    'pill': 2,
    'ghost': 3,
}

recognition.onresult = function(event) {
    
    var keyFromAudio = null;
    var actionFromAudio = null;
    if(!event.results[event.results.length-1].isFinal) { return; }
    for(i = 0; i < event.results[event.results.length-1].length; i++) {
        let iResult = event.results[event.results.length-1][i]; 
        if(keyFromAudio != null) { 
            console.log(keyFromAudio);
            break; 
        }
        for(var key in gestureStore) {
            if(iResult.transcript.includes(key)) {
                keyFromAudio = gestureStore[key];
                break;
            }
            console.log(iResult);
        }
        for(var key in actionStore) {
            if(iResult.transcript.includes(key)) {
                actionFromAudio = actionStore[key];
                break;
            }
        }
    }

    if (keyFromAudio != null) { currentGame._keyPressed =  keyFromAudio; }
    else if (actionFromAudio != null) {
        switch(actionFromAudio) {
            case 1:
                let path = currentGame._scene._pacman.findClosestPowerPellet();
                currentGame.pathToTaget = path;
                console.log('Find a power pill');
                break;
            case 2:
                console.log('Find a pill');
                break;
            case 3:
                console.log('Find a ghost');
                break;
        }
    } 

    console.log('???');
};