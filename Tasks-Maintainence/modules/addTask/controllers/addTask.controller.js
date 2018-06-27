function addTaskController($scope, listAppService) {
    $scope.showView = "Info";

    $scope.Template = "";
    $scope.Historical = "";
    $scope.Operation = "";
    $scope.attributeurl = "";
    $scope.attributeValue = "";
    $scope.legalAction = "";

    $scope.addTask = function() {
        document.getElementById("Add Task_background").style.display = "block";
    };

    $scope.changeView = function(type) {
        $scope.showView = type;
    };

    $scope.enableAfterFilling = true;

    $scope.change = function(key, value) {
        $scope[key] = value;
        if ($scope.legalAction !== undefined && $scope.legalAction !== "" && $scope.Template !== undefined && $scope.Template !== "" && $scope.Historical !== undefined && $scope.Historical !== "" && $scope.Operation !== undefined && $scope.Operation !== "" && $scope.attributeurl !== undefined && $scope.attributeurl !== "" && $scope.attributeValue !== undefined && $scope.attributeValue !== "") {
            $scope.enableAfterFilling = false;
        } else
            $scope.enableAfterFilling = true;
    };

    $scope.submit = function() {
        let addZero = function(vNumber) {
            return ((vNumber < 10) ? "0" : "") + vNumber;
        };
        let vDate = new Date();
        let vDay = addZero(vDate.getDate());
        let vMonth = addZero(vDate.getMonth() + 1);
        let vYear = addZero(vDate.getFullYear());
        let vHour = addZero(vDate.getHours());
        let vMinute = addZero(vDate.getMinutes());
        let vSecond = addZero(vDate.getSeconds());
        let dateRequired = vYear + "-" + vMonth + "-" + vDay + "T" + vHour + ":" + vMinute + ":" + vSecond;
        let obj = {
            "id": null,
            "org_id": null,
            "status": null,
            "action_date": null,
            "created_at": dateRequired,
            "updated_at": dateRequired,
            "legal__action__type_id": null,
            "previous_id": null,
            "Legal_Action_Type": {
                "id": null,
                "legal_action": $scope.legalAction,
                "template": $scope.Template,
                "historical": $scope.Historical,
                "createdAt": dateRequired,
                "updatedAt": dateRequired,
                "Action_Type_Operation": [{
                        "id": 78654,
                        "operation": $scope.Operation,
                        "url": $scope.attributeurl,
                        "created_at": dateRequired,
                        "updated_at": dateRequired,
                        "legalActionTypeId": null
                    }
                ]
            },
            "Documents": [],
            "Action_Attribute": {
                "id": null,
                "value": $scope.attributeValue,
                "created_at": dateRequired,
                "updated_at": dateRequired,
                "attribute_id": null,
                "legal__action_id": null
            }
        };
        listAppService.listAppFunctions.addTask(obj);
        document.getElementById("Add Task_background").style.display = "none";
    }
};

addTaskController.$inject = ['$scope', 'listAppService'];

angular.module("addTask")
    .controller("addTaskController", addTaskController);