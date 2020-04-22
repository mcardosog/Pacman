# BILINGUAL GATOR PACMAN

Bilingual gator PACMAN is an HTML5-JavaScript game that receives inputs using the keyboard or voice commands. The original game was conceived to accept keyboard commands but it was modified to receive voice commands in English or Spanish. The app is capable to detect the language automatically.

## Implementation 

The game was retrieved from [pip](https://pip.pypa.io/en/stable/) (Author: ) and it was modified to use The Weeb Speech API ([webkitSpeechRecognition]()) to simulate keyboard input. 

After the modifications, the app counts with a local dictionary to detect intents like directions or actions like "find a ghost". In order to make the app response more natural, the app counts with an [Express](https://expressjs.com) server that handles not recognize transcriptions. The server uses the [Monkey API](https://monkeylearn.com) to recognize the intent.

## Usage
Inside the folder server:
```pyt
npm start
```
Then open the file [Pacman.html](https://github.com/mcardosog/Pacman/blob/master/Pacman.html)

## Requirements
It is necesary to run the app using [Google Chrome](https://www.googleadservices.com/pagead/aclk?sa=L&ai=DChcSEwjMx4iPx_zoAhV57OMHHToNDLcYABAAGgJ5bQ&ohost=www.google.com&cid=CAESQOD2E2xAjiHkQecvlyA_9HOu3lcgWgYjLrx7wDoPKSIjJgSw4MSanJb-lBcJ_X7AqlNs-dY4_y6iC4dmj9ldjJM&sig=AOD64_2z46R0kzYNegy2SWfAg09W6C9b4A&q=&ved=2ahUKEwjytPyOx_zoAhVPXKwKHabVAiUQ0Qx6BAgkEAE&adurl=) and install the extension [Moesif CORS](https://chrome.google.com/webstore/detail/moesif-orign-cors-changer/digfbfaphojjndkpccljibejjbppifbc?hl=en-US)
