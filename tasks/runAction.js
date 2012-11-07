var task = {};

/////////////////////////////////////////////////////////////////////
// metadata
task.name = "runAction";
task.description = "I will run an action and return the connection object";
task.scope = "any";
task.frequency = 0;

/////////////////////////////////////////////////////////////////////
// functional 

task.run = function(api, params, next){
	if(params == null){params = {};}

	connection = api.utils.setupConnection(api, {id: 0}, 'task', 0, 0);
	connection.params = params;
	
	api.processAction(api, connection, null, function(connection, cont){
		if(connection.error){
			api.log("task error: "+connection.error, "red");
		}else{
			if(api.configData.log.logRequests){
				api.logJSON({
					label: "action @ task",
					params: JSON.stringify(params),
				}, "grey");
			}
		}
		next(true, connection);
	})
};

/////////////////////////////////////////////////////////////////////
// exports
exports.task = task;
