angular.module("listApp")
    .service("listAppService", ["$http", "$q", function($http, $q) {

        this.getDataForCeleb = function(celebName) {
            let deferred = $q.defer();
               $http({
                    method: 'GET',
                    url: "https://api.themoviedb.org/3/search/person?api_key=119d59037bcc052ab4f6169f3cc28aa3&language=en-US&query="+celebName+"&include_adult=false"
                })
                .then(function(response){
                    console.log(response.data)
                    let dataToPass = [];
                    angular.forEach(response.data.results, function(value){
                        if(value.hasOwnProperty('known_for')){
                            angular.forEach(value.known_for, function(innervalue){
                                if(innervalue.hasOwnProperty("title") && innervalue.poster_path !== null && innervalue.poster_path !== undefined)
                                    dataToPass.push(innervalue)
                            });
                        }
                    })
                    deferred.resolve(dataToPass)
                }, function(err){
                    deferred.reject(err);
                })
            return deferred.promise;
        }

    }]);