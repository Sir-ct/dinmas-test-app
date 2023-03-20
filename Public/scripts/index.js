const socket = io();
const chatForm = document.getElementById('chat-container');
// const userInput = document.getElementsByClassName('input-box');
const userInput = document.getElementById('textInput');

const sessionStorage = () => {
	const storageKey = 'userSession';
	const cartKey = 'cartItems';
	const orderHistoryKey = 'orderHistory';

	const setSession = (sessionKey, session) => {
		return localStorage.setItem(sessionKey, JSON.stringify(session));
	};

	const getSession = (sessionKey) => {
		return JSON.parse(localStorage.getItem(sessionKey)) || [];
	};

	const deleteSession = (sessionKey) => {
		return localStorage.removeItem(sessionKey);
	};

	const _fetchOrderHistory = () => {
		return getSession(orderHistoryKey);
	};

	const _createOrderHistory = () => {
		const data = getSession(cartKey) || [];
		const existingOrderHistory = getSession(orderHistoryKey) || [];

		const updatedOrderHistory = [...existingOrderHistory, ...data];

		setSession(orderHistoryKey, updatedOrderHistory);
		deleteSession(cartKey);

		return updatedOrderHistory;
	};

	const _findItem = (item) => {
		const userCart = getSession(cartKey);
		const foundItem = userCart.find((cartItem) => {
			return cartItem.idMeal === item.idMeal;
		});
		return foundItem;
	};

	const _updateCart = (item) => {
		const userCart = getSession(cartKey);
		userCart.push(item);
		setSession(cartKey, userCart);

		return item;
	};

	const _fetchCart = () => {
		const userCart = getSession(cartKey);
		return userCart;
	};

	return {
		_updateCart,
		_fetchCart,
		_findItem,
		_fetchOrderHistory,
		_createOrderHistory,
	};
};

//output message to DOM

const outputMessage = (obj) => {
	const div = document.createElement('div');
	div.classList.add('message');

	if (obj.username.includes('Bot')) {
		div.innerHTML = `<div id="chatbox">
	<h5 id="chat-timestamp"></h5>
	<p id="botStarterMessage" class="botText">
		<span
			>${obj.text}</span
		>
	</p>
</div> `;
	} else {
		div.innerHTML = `<div id="chatbox">
	<h5 id="chat-timestamp"></h5>
	<p id="botStarterMessage" class="userText">
		<span
			>${obj.text}</span
		>
	</p>
</div> `;
	}
	document.querySelector('.chat-container').appendChild(div);
};

//take user input and send to server
userInput.addEventListener('keypress', (e) => {
	if (e.keyCode === 13) {
		e.preventDefault();

		socket.emit('userMessage', userInput.value);
		userInput.value = '';
	}
});

socket.on('userMessage', (msg) => {
	outputMessage(msg);
});

socket.on('botMessage', (msg) => {
	console.log(msg);
	outputMessage(msg);
});

socket.on('userCart', (msg) => {
	const { _updateCart, _fetchCart } = sessionStorage();

	const item = _updateCart({ item: msg.menu });
	console.log(item);
});

socket.on('clearCart', (msg) => {
	const { _createOrderHistory, _fetchOrderHistory } =
		sessionStorage();

	const orderHistory = _createOrderHistory();
	console.log(orderHistory);
});

// socket.emit('userMessage', (msg) => {
// 	outputMessage(msg);
// });
