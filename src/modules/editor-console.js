import * as Editor from './editor'

export let console = (function (oldConsole) {
	return {
		formatArgsOutput: function (arg) {
			let outputArgMessage;

			// Deal with different primitive types
			switch (this.getType(arg)) {
				case 'string':
					outputArgMessage = `'${arg}'`;
					break;
				case 'object':
					outputArgMessage = `object ${JSON.stringify(arg)}`;
					break;
				case 'array':
					outputArgMessage = `Array ${JSON.stringify(arg)}`;
					break;
				default:
					outputArgMessage = arg;
					break;
			}

			return outputArgMessage;
		},

		getType: function (arg) {
			if (typeof arg === 'string') return 'string';
			if (typeof arg === 'boolean') return 'boolean';
			if (typeof arg === 'function') return 'function';
			if (typeof arg === 'number') return 'number';
			if (typeof arg === 'undifined') return 'undifined';
			if (typeof arg === 'object' && !Array.isArray(arg)) return 'object';
			if (typeof arg === 'object' && Array.isArray(arg)) return 'array';
		},

		logMultipleArguments: function (arguments) {
			let currentLog = '';

			// Deal with multiple arguments
			arguments.forEach((arg) => {
				currentLog += this.formatArgsOutput(arg) + ' ';
			});

			oldConsole.log.apply(oldConsole, arguments);

			Editor.consoleMessages.push({
				message: currentLog,
				class: `log log--default`,
			});

			oldConsole.log(Editor.consoleMessages);
		},

		logSingleArgument: function (logItem) {
			oldConsole.log(logItem);
			Editor.consoleMessages.push({
				message: this.formatArgsOutput(logItem),
				class: `log log--${this.getType(logItem)}`,
			});

			oldConsole.log(Editor.consoleMessages);
		},

		log: function (text) {
			let argsArray = Array.from(arguments);
			return argsArray.length !== 1
				? this.logMultipleArguments(argsArray)
				: this.logSingleArgument(text);
		},
		info: function (text) {
			oldConsole.info(text);
		},
		warn: function (text) {
			oldConsole.warn(text);
		},
		error: function (text) {
			oldConsole.error(text);
			Editor.consoleMessages.push({
				class: 'log log--error',
			});
		},
	};
})(window.console);
