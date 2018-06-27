angular.module("listApp")
    .service("listAppService", ["$http", "$q", function($http, $q) {

        this.getTeam = function(repositoryName) {

            var requiredData = ["team", "player"];
            return $q.all(requiredData.map(function(item) {
                if(item==="team"){
                   return $http({
                        method: 'GET',
                        url: "data/team.json"
                    }); 
                }
                else if(item==="player"){
                    return $http({
                        method: 'GET',
                        url: "data/player.json"
                    });
                }
                }))
                .then(function(results) {
                    var resultObj = {};
                    resultObj[requiredData[0]]=results[0].data.teams;
                    resultObj[requiredData[1]]=results[1].data.players;
                    return resultObj;
                });

        }
    }]);