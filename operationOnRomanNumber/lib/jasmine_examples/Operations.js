var operateOnRomans = function(romanNumberA, romanNumberB, operant){
	let self = this;
	self.dictionary = {
		M: 1000,
		D: 500,
		C: 100,
		L: 50,
		X: 10,
		V: 5,
		I: 1
	};

	self.utilities = {
		convertToInteger: function(romanNumber) {
			let flag = true,
			    dictionaryKeys = Object.keys(self.dictionary),
			    lastIndex,
			    lastChar = null,
			    value = 0,
			    contains = {}
			    firstLetter = null;
			romanNumber = romanNumber.replace(/((M)|(D)|(C)|(L)|(X)|(V)|(I))/g, function($1){
				if(firstLetter === null){
					firstLetter = true;
					lastChar = firstLetter;
					lastIndex = dictionaryKeys.indexOf($1);
				}
				let dictionaryValue = self.dictionary[$1];
				if(lastChar !== $1 || firstLetter){
					lastChar = $1;
					let currentIndex = dictionaryKeys.indexOf($1);
					if(lastIndex === 0){
						value = parseInt(value) + parseInt(dictionaryValue);
					}
					else if(lastIndex === currentIndex + 1){
						let lastKeyValue = parseInt(self.dictionary[dictionaryKeys[lastIndex]]) * parseInt(contains[dictionaryKeys[lastIndex]]);
						value = parseInt(value) + parseInt(dictionaryValue) - parseInt(lastKeyValue) - parseInt(lastKeyValue);
					}else if(lastIndex === currentIndex + 2){
						contains[dictionaryKeys[currentIndex]] = 1;
						let lastKeyValue = parseInt(self.dictionary[dictionaryKeys[lastIndex]]);
						value = parseInt(value) + parseInt(dictionaryValue) - parseInt(lastKeyValue) - parseInt(lastKeyValue);
					}
					else if(lastIndex <= currentIndex){
						value = parseInt(value) + parseInt(dictionaryValue);
					}else if(lastIndex !== 0){
						flag = false;
					}
					lastIndex = currentIndex;
				}else{
					value = parseInt(value) + parseInt(dictionaryValue);
				}
				firstLetter = false;
				if(contains.hasOwnProperty($1)){
					contains[$1]++;
				}else{
					contains[$1] = 1;
				}
				if(contains[$1] > 3){
					flag = false;
				}
				return "";
			});
			if(flag === true && romanNumber === ""){
				return value;
			}else
				return undefined;
		},

		convertToRoman: function(romanNumber) {
			let numberInString = "" + romanNumber;
			if(romanNumber > 3999){
				throw new Error("Exceeds 3999");
				return;
			}
			if(romanNumber <= 0){
				throw new Error("Not a Valid Input");
				return;
			}
			if(parseInt(romanNumber) !== romanNumber){
				throw new Error("Not a Valid Input");
				return;
			}
			let dictionaryKeys = Object.keys(self.dictionary);
			function getRomanRepresentation(number, length){
				if(length === 0){
					let data = "";
					for(let i = 0; i< number/1000; i++)
						data = data + "M";
					return data;
				}
				let keys, values;
				if(length === 1){
					keys = ["M", "D", "C"];
					values = [1000, 500, 100];
				}
				else if(length === 2){
					keys = ["C", "L", "X"];
					values = [100, 50, 10];
				}
				else if(length === 3){
					keys = ["X", "V", "I"];
					values = [10, 5, 1];
				}
				let data = "";
				if(number === 0){
					return "";
				}
				if(number === values[0]){
					data = data + keys[0];
				}
				else if(number === values[1]){
					data = data + keys[1];
				}
				else if(number <= (values[2]*3)){
					for(let i = 0; i< number/values[2]; i++)
						data = data + keys[2];
				}
				else if(number === (values[2]*4)){
					data = data + keys[2] + keys[1];
				}
				else if(number <= (values[2]*8)){
					data = data + keys[1];
					for(let i = 0; i< (number/values[2]) - 5; i++)
						data = data + keys[2];
				}
				else if(number === (values[2]*9)){
					data = data + keys[2] + keys[0];
				}
				return data;
			}
			let valueToReturn = "";
			for(let i = numberInString.length; i > 0; i--){
				let data = getRomanRepresentation(parseInt(numberInString[numberInString.length - i]) * Math.pow(10, i - 1), 4 - i);
				valueToReturn = valueToReturn + data;
			}
			return valueToReturn;
		}
	};

	let valueA = self.utilities.convertToInteger(romanNumberA);
	let valueB = self.utilities.convertToInteger(romanNumberB);
	let resultingValue;
	if(valueA && valueB){
		switch(operant){
			case "+":
				resultingValue = valueA + valueB;
				break;
			case "-":
				resultingValue = valueA - valueB;
				break;
			case "/":
				resultingValue = valueB !== 0 ? valueA/valueB : NaN;
				break;
			case "*":
				resultingValue = valueA * valueB;
		}
		if(resultingValue !== NaN)
			return self.utilities.convertToRoman(resultingValue);
		else{
			throw new Error("Not Possible")
			return;
		}
	}
	else{
		throw new Error("Not Proper Values")
		return;
	}
}

module.exports = operateOnRomans;
