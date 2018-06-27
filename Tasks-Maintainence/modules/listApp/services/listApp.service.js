angular.module("listApp")
    .service("listAppService", ["$http", function($http) {
    	let tasks = [];
    	(function(){
    		$http.get("data/task.json")
    			.then(function(response){
    				tasks = response.data.tasks;
    			}, function(err) {
    				console.log(err)
    			})
    	}());

    	this.listAppFunctions = {
            getTasksLength: function() {
                return tasks.length;
            },

            getAllTasks: function() {
            	return tasks;
            },

            getTaskByIndex: function() {
                let index = arguments[0] === undefined ? 0 : arguments[0];
                if (tasks.length > index) {
                    return tasks[index];
                } else {
                    return undefined;
                }
            },

            addTask: function(task){
            	tasks.unshift(task);
            }
        }
        
    }]);
