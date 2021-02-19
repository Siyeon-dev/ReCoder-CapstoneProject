import * as ace from '../../node_modules/ace-builds/src/ace'

// Retrieve Elements
const consoleLogList = document.querySelector('.editor__console-logs');
const executeCodeBtn = document.querySelector('.compile_btn');


// Setup Ace
let codeEditor = ace.edit('code_compiler_area');
let defaultCode = `console.log('hello world');`;
let consoleMessages = [];

let editorLib = {
	clearConsoleScreen() {
		consoleMessages.length = 0;

		// Remove all elements in the log list
		while (consoleLogList.firstChild) {
			consoleLogList.removeChild(consoleLogList.firstChild);
		}
	},
	printConsole() {
		consoleMessages.forEach((log) => {
			const newLogItem = document.createElement('li');
			const newLogText = document.createElement('pre');

			newLogText.className = log.class; // log log--string
			newLogText.textContent = `> ${log.message}`;

			newLogItem.appendChild(newLogText);

			consoleLogList.appendChild(newLogItem);
		});
	},
	init() {
		// Configure Ace

		// Theme
		codeEditor.setTheme('ace/theme/dracula');

		// Set language
		codeEditor.session.setMode('ace/mode/javascript');

		// Set Options
		codeEditor.setOptions({
			fontSize: '12pt',
			enableBasicAutocompletion: true,
			enableLiveAutocompletion: true,
		});

		// Set Default
		codeEditor.setValue(defaultCode);
	},
};

// Events
executeCodeBtn.addEventListener('click', () => {
	// Clear console message
	editorLib.clearConsoleScreen();

	// Get input from the code editor
	const userCode = codeEditor.getValue();

	// Run the user code
	try {
		new Function(userCode)();
	} catch (err) {
		console.error(err);
	}

	// Print to the console
	editorLib.printConsole();
});

// resetCodeBtn.addEventListener('click', () => {
// 	// Clear Ace Editor
// 	codeEditor.setValue(defaultCode);

// 	// Clear console message
// 	editorLib.clearConsoleScreen();
// });

editorLib.init();
