const socket = require('socket.io');
const express = require('express');
const { formatMessage, menuOptions } = require('./Helper');

class Socket {
	constructor(server) {
		this.io = socket(server, { cors: { origin: '*' } });
		this.botName = 'Dinma Bot';
		this.userName = 'User';
	}

	_emitUserMessage(socket, message) {
		socket.emit('userMessage', formatMessage(this.userName, message));
	}

	_emitBotMessage(socket, message) {
		socket.emit('botMessage', formatMessage(this.botName, message));
	}

	_userChat(data) {
		this.io.emit('userCart', data);
	}

	_clearCart() {
		this.io.emit('clearCart');
	}

	_viewOrderHistory() {
		this.io.emit('viewOrderHistory');
	}

	_checkUserMessage(socket, message) {
		if (message === '1') {
			this._emitBotMessage(socket, 'You have selected Meat Pie');
			this._userChat({ menu: 'Meat Pie' });
		} else if (message === '2') {
			this._emitBotMessage(socket, 'You have selected Chicken Pie ');
			this._userChat({ menu: 'Chicken Pie' });
		} else if (message === '3') {
			this._emitBotMessage(socket, 'You have selected Beef Pie');
			this._userChat({ menu: 'Beef Pie' });
		} else if (message === '4') {
			this._emitBotMessage(socket, 'You have selected Fish Pie');
			this._userChat({ menu: 'Fish Pie' });
		} else if (message === '90') {
			this._clearCart();
		} else if (message === '99') {
			this._viewOrderHistory();
		} else {
			this._emitBotMessage(socket, 'Invalid option');
		}
	}

	initializeSocket() {
		this.io.on('connection', (socket) => {
			console.log('New user connected' + socket.id);

			// this._emitBotMessage(socket, 'Hello, I am Dinma Bot');

			this._emitBotMessage(
				socket,
				'Here is the list of menu options you can choose from',
			);

			///display menu options
			menuOptions.forEach((el) => {
				this._emitBotMessage(socket, el);
			});

			socket.on('userMessage', (message) => {
				this._checkUserMessage(socket, message);

				this._emitUserMessage(socket, message);
			});
		});
	}

	/**
	 * @static
	 * @function createSocket
	 * @param {object} server- server instance
	 * @memberof Socket
	 * @returns {object} socketInstance - returns socket instance
	 * @description Creates a socket instance
	 */
	static createSocket(server) {
		const _createSocketInstance = (server) => {
			const socketInstance = new Socket(server);
			return socketInstance.initializeSocket();
		};

		return {
			SocketInstance: _createSocketInstance,
		};
	}
}

module.exports = Socket;
