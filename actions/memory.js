require('date-utils');
var action = {};

action.name = 'memory';
action.description = 'my memory api server';

action.inputs ={
  'required': [],
  'optional': ["user","content","tags"]
};

action.outputExample = {
  status:'OK'
};

action.run = function(api, connection, next){
  console.log('memory');
  var now  = new Date()
    , data = {}
    , prms = api.utils.mapParamsFromURL(connection, action.inputs.optional)
    , yyyymmdd = now.toFormat('YYYYMMDD')
    , tags = prms.tags ? prms.tags.split(',') : ''
    , key = yyyymmdd + ':' + now.getTime()+ ':' + prms.user;

    data.content = prms.content;
    data.date = now.getTime();
    data.tags = tags;
    data.key = key;

  api.redis.client.zadd(yyyymmdd + ':' + prms.user, now.getTime(), JSON.stringify(data));
  for(var i = 0; i < tags.length; i++){
    api.redis.client.zadd(tags[i]+':' + prms.user , now.getTime(), key);
  }
  connection.response.statsu = 'OK';
  next(connection, true);
};

exports.action = action;
