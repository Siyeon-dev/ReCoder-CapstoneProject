import * as ace from "ace-builds/src-noconflict/ace";

import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/ext-language_tools";

import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/mode-php";

// Setup Ace
export let codeEditor = null;

let defaultCode = `console.log('hello world');`;
let statusModeEditor = null;

export let editorLib = {
	clearConsoleScreen(consoleMessages, consoleLogList) {
		// Remove all elements in the log list
		while (consoleLogList.firstChild) {
			consoleLogList.removeChild(consoleLogList.firstChild);
		}

		consoleMessages.length = 0;
	},
	printConsole(consoleMessages, consoleLogList) {
		consoleMessages.forEach((log) => {
			const newLogItem = document.createElement("li");
			const newLogText = document.createElement("pre");

			newLogText.textContent = `> ${log.message}`;

			newLogItem.appendChild(newLogText);
			consoleLogList.appendChild(newLogItem);
		});
	},
	init(argQuestionCode, argLangType) {
		defaultCode = argQuestionCode === "" ? defaultCode : argQuestionCode;

		// Configure Ace
		codeEditor = ace.edit("editorCode");
		// Theme
		codeEditor.setTheme("ace/theme/github");
		this.setModeEditor(argLangType);
		// Set language
		codeEditor.session.setMode("ace/mode/javascript");

		// Set Options
		codeEditor.setOptions({
			enableBasicAutocompletion: true,
			enableLiveAutocompletion: true,
			autoScrollEditorIntoView: true,
			copyWithEmptySelection: true,
			enableSnippets: true,
			fontSize: "16pt",
		});

		// Set Default
		codeEditor.setValue(defaultCode);
	},

	setModeEditor(modeEditor) {
		// eslint-disable-next-line default-case
		switch (modeEditor) {
			case "JavaScript":
				statusModeEditor = "ace/mode/javascript";
				break;
			case "Python":
				statusModeEditor = "ace/mode/python";
				break;
			case "Java":
				statusModeEditor = "ace/mode/java";
				break;
			case "PHP":
				statusModeEditor = "ace/mode/php";
				break;
		}
	},
};
