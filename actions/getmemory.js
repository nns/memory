require('date-utils');
var action = {};

action.name = 'getmemory';
action.description = 'get';

action.inputs ={
  'required': [],
  'optional': ["user","date"]
};

action.outputExample = {
  status: 'OK',
  content:''
};

action.run = function(api, connection, next){
  console.log('getmemory');
  
  var prms = api.utils.mapParamsFromURL(connection, action.inputs.optional);
  console.log('getmemory');
  if(prms.date && prms.user){
    api.redis.client.zrange(prms.date + ':' + prms.user, 0, -1,  function(err, response){
      console.log(response);
      connection.response.status = 'OK';
      connection.response.content = response;
      next(connection, true);
    });
  } else {
    connection.response.status = 'NG';
    next(connection, true);
  }
};

exports.action = action;
