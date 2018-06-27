angular.module("listApp")
    .service("listAppService", ["$http", "$q", function($http, $q) {

        let paginationDataAsPerIndex = {};

        this.getDataForIssueStatistics = function(repositoryName) {

            var apiList = ["open_issues", "averageAge", "oldest", "latest"];
            paginationDataAsPerIndex = {};
            return $q.all(apiList.map(function(item) {
                if(item==="open_issues"){
                   return $http({
                        method: 'GET',
                        url: "https://api.github.com/repos/" +repositoryName
                    }); 
                }
                else if(item==="oldest"){
                    return $http({
                        method: 'GET',
                        url: "https://api.github.com/repos/" +repositoryName+"/issues",
                        params:{
                            direction:"asc",
                            per_page:"1",
                            page:"1"
                        }
                    });
                }
                else if(item==="latest"){
                     return $http({
                        method: 'GET',
                        url: "https://api.github.com/repos/" +repositoryName+"/issues",
                        params:{
                            direction:"desc",
                            per_page:"1",
                            page:"1"
                        }
                    });
                }
                else{
                     return $http({
                        method: 'GET',
                        url: "https://api.github.com/repos/" +repositoryName+"/issues",
                        params:{
                            direction:"desc",
                            per_page:"10",
                            page:"1"
                        }
                    });
                }
                    
                }))
                .then(function(results) {
                    var resultObj = {};
                    results.forEach(function(val, i) {
                        resultObj[apiList[i]]=val.data;
                    });
                    paginationDataAsPerIndex["1"] = resultObj["averageAge"];
                    return resultObj;
                });

        }

        this.getDataForPagination = function(repositoryName, index) {
            let defer = $q.defer();
            if(paginationDataAsPerIndex.hasOwnProperty(index))
                defer.resolve(paginationDataAsPerIndex[index]);

            $http({
                method: 'GET',
                url: "https://api.github.com/repos/" + repositoryName + "/issues",
                params:{
                    direction:"desc",
                    per_page:"10",
                    page:index
                }
            })
            .then(function(response) {
                paginationDataAsPerIndex[index] = response.data;
                defer.resolve(paginationDataAsPerIndex[index]);
            });

            return defer.promise;
        };

    }]);