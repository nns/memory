// load in the actionHero class
var actionHero = require('actionHero').actionHero;

var params = {};
// if there is no config.js file in the application's root, then actionHero will load in a collection of default params.  You can overwrite them with params.configChanges
params.configChanges = {}

// any additional functions you might wish to define to be globally accessable can be added as part of params.initFunction.  The api object will be availalbe.
params.initFunction = function(api, next){
	next();
}

// start the server!
actionHero.start(params, function(api){
	api.log('Boot Sucessful!');
});
