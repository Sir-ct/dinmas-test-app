const moment = require('moment');

function formatMessage(username, text) {
	return {
		username,
		text,
		time: moment().format('h:mm a'),
	};
}

const menuOptions = [
	'1. Meat Pie',
	'2. Chicken Pie',
	'3. Beef Pie',
	'4. Fish Pie',
	// '5. Vegetable Pie',
	// '6. Chicken and Chips',
	// '7. Beef and Chips',
	// '8. Fish and Chips',
	// '9. Vegetable and Chips',
	// '10. Chicken and Rice',
];

module.exports = { formatMessage, menuOptions };
