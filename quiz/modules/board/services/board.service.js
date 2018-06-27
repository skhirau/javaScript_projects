angular.module("board")
    .service("boardService", ["$http", "$q", function($http, $q) {

    	let questionData = [];

    	this.getValue = {
    		getQuestionsList: function(){
    			let defer = $q.defer();
	    		$http.get("data/question.json")
	    			.then(function(response){
	    				questionData = response.data;
	    				defer.resolve(questionData)
	    			}, function(err){
	    				defer.reject(err)
	    			})
	    		return defer.promise;
    		},

    		getQuestionData: function(index){
    			let dataToReturn = {};
    			angular.extend(dataToReturn, questionData[index])
    			return dataToReturn;
    		}
    	};

    	this.setValue = {
    		updateQuestionData: function(index, data){
    			questionData[index] = data;
    		}
    	}

    	this.actions = {
    		checkAllSubmitted: function(){
    			let flag = true;
    			angular.forEach(questionData, function(value){
    				if(value.selectedOption === undefined || value.selectedOption === -1)
    					flag = false;
    			})
    			return flag;
    		},

    		generateGraph: function(){
    			let correct = 0,
    				wrong = 0;
    			angular.forEach(questionData, function(value){
    				if(value.selectedOption === value.answer)
    					correct++;
    				else
    					wrong++;
    			});
    			let canvas = document.getElementById("quizReultGraph");
    			let ctx = canvas.getContext('2d');
    			ctx.clearRect(0,0,400,350);
    			ctx.beginPath();
				ctx.moveTo(70, 70);
				ctx.lineTo(70, 300);
				ctx.stroke();

    			ctx.beginPath();
				ctx.moveTo(70, 300);
				ctx.lineTo(350, 300);
				ctx.stroke();

				let total = questionData.length;
				let remainder = total % 4;
				let showNumber = parseInt(total/4);
				ctx.fillText("0",63,310);
				ctx.fillText("correct",113,310);
				ctx.fillText("wrong",213,310);
				ctx.fillText(showNumber,63,255);
				ctx.fillText(showNumber*2,63,205);
				ctx.fillText(showNumber*3,63,155);
				ctx.fillText(showNumber*4,63,105);
				ctx.fillText("0",63,310);

				let x = parseInt(correct/showNumber);
				let rem = correct/showNumber - x;
				let y = x + rem;
				let height = y*50;

				ctx.rect(90, 300-height, 75, height);
				ctx.stroke();

				x = parseInt(wrong/showNumber);
				rem = wrong/showNumber - x;
				y = x + rem;
				height = y*50;

				ctx.rect(190,300-height,75,height);
				ctx.stroke();
    		}
    	}


    }]);