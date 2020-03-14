var currentGame;
function AudioControl(game) {
    currentGame = game;
}

var recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition || window.mozSpeechRecognition || window.msSpeechRecognition)();
recognition.lang = 'en-US';
recognition.interimResults = true;
recognition.maxAlternatives = 3;
recognition.continuous = true;
recognition.start();

let gestureStore = {
    'up':KEY_UP,
    'left':KEY_LEFT,
    'right':KEY_RIGHT,
    'down':KEY_DOWN,
    'enter':KEY_ENTER
};

recognition.onresult = function(event) {
    
    var keyFromAudio = null;
    //if(!event.results[event.results.length-1].isFinal) { return; }
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
    }
    if(keyFromAudio == null) { 
        console.log('???');
        return; 
    }
    currentGame.keyPressed(keyFromAudio);
};