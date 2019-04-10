String.prototype.explode = function(delimiter) {
	var emptyArray = { 0: '' };

	if (arguments.length != 2
		|| typeof arguments[0] == 'undefined'
		|| typeof arguments[1] == 'undefined') {
		return null;
	}

	if ( delimiter === ''
		|| delimiter === false
		|| delimiter === null) {
		return false;
	}

	if (typeof delimiter == 'function'
		|| typeof delimiter == 'object'
		|| typeof string == 'function'
		|| typeof string == 'object') {
		return emptyArray;
	}

	if (delimiter === true) {
		delimiter = '1';
	}
	return this.toString().split(delimiter.toString());
}



module.exports = {
	randomString: function(length) {
		var id = "";
		var characters = "abcdef0123456789";
		for (var i = 0; i < length; i++)  {
			id += characters.charAt(this.randomInt(0, characters.length));
		}
		return id;
	},
	randomInt: function(minimumValue, maximumValue) {
		return Math.floor(Math.random() * (maximumValue - minimumValue) ) + minimumValue;
	}
}
