import * as ace from 'ace-builds/src-noconflict/ace'

import 'ace-builds/src-noconflict/theme-dracula'
import 'ace-builds/src-noconflict/ext-language_tools'
import 'ace-builds/src-noconflict/mode-javascript'

// Setup Ace
export let codeEditor = null;

let defaultCode = `console.log('hello world');`;

export let editorLib = {
	clearConsoleScreen(consoleMessages, consoleLogList) {
		consoleMessages.length = 0;

		// Remove all elements in the log list
		while (consoleLogList.firstChild) {
			consoleLogList.removeChild(consoleLogList.firstChild);
		}
	},
	printConsole(consoleMessages, consoleLogList) {
		consoleMessages.forEach((log) => {
			const newLogItem = document.createElement('li');
			const newLogText = document.createElement('pre');
			
			// newLogText.className = log.class; // log log--string
			newLogText.textContent = `> ${log.message}`;

			newLogItem.appendChild(newLogText);
			consoleLogList.appendChild(newLogItem);
		});
	},
	init() {
		// Configure Ace
		codeEditor = ace.edit("editorCode");
		// Theme
		codeEditor.setTheme('ace/theme/dracula');

		// Set language
		codeEditor.session.setMode('ace/mode/javascript');

		// Set Options
		codeEditor.setOptions({
			fontSize: '16pt',
			enableBasicAutocompletion: true,
			enableLiveAutocompletion: true,
		});

		// Set Default
		codeEditor.setValue(defaultCode);
	},
};
