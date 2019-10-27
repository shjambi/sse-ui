const http = require('http');

http.createServer((request, response) => {
  console.log(`Request url: ${request.url}`);

  const eventHistory = [];

  request.on('close', () => {
    closeConnection(response);
  });

  if (request.url.toLowerCase() === '/eventsource') {
    response.writeHead(200, {
      'Connection': 'keep-alive',
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Access-Control-Allow-Origin': '*'
    });

    checkConnectionToRestore(request, response, eventHistory);
    getCounterFromRedis(response, eventHistory);
    getCountFromRedis(response, eventHistory);
    getResultFromRedis(response, eventHistory);
    // readTweetFromKafka(response, eventHistory);
    // getAllEventsFromPostgres(response, eventHistory)

  } else {
    response.writeHead(404);
    response.end();  
  }
}).listen(5000, () => {
  console.log(`Server running at localhost:5000`);
});

function getCounterFromRedis(response, eventHistory){
  var max = 2147483647;
  var redis = require('redis');
  var client    = redis.createClient({
    port      : process.env.REDIS_PORT,
    host      : process.env.REDIS_HOST
  });
  client.on('error', function(err){
    console.log('Something went wrong ', err)
  });
  client.keys('*:counter', function(error, keys) {
    if (error) throw error;
    // console.log('GET keys ->', keys)
    for (let j = 0; j < keys.length; j++){
      var i = 0;
      function f() {
          // console.log(keys[j],i);
          if (!response.finished) {
            client.get(keys[j], function(error, count) {
              if (error) throw error;
              // console.log(keys[j] + ' GET new count ->', count)
              const eventString = `event: redisTweetCount\ndata: {"key":"${keys[j]}", "value":"${count}"}\n\n`;    
              response.write(eventString);
              eventHistory.push(eventString);
            }); 
          }             
          i++;
          if( i < max ){
              setTimeout( f, 1000 );
          }
      }
      f();
    }
  });
}

function getCountFromRedis(response, eventHistory) {
  // var redis = require('redis');
  var redis = require('ioredis');
  var client    = redis.createClient({
    port      : process.env.REDIS_PORT,
    host      : process.env.REDIS_HOST
  });

  client.on('connect', function() {
    console.log('Redis client connected')
  });

  client.on('error', function(err) {
    console.log('Something went wrong ' + err)
  });

  var subscriber = redis.createClient();
  subscriber.config('set', 'notify-keyspace-events', 'KEA');
  subscriber.subscribe('__keyevent@0__:set', '__keyevent@0__:incr');
  subscriber.on('message', function(channel, key) {
    if (!response.finished) {
      client.get(key, function(error, value) {
        if (error) {
          console.log(error);
          throw error;
        }
        const eventString = `event: redisTweetCount\ndata: {"key":"${key}", "value":"${value}"}\n\n`;    
        response.write(eventString);
        eventHistory.push(eventString);
      })
    }
  });
}

function getResultFromRedis(response, eventHistory){
  var max = 2147483647;
  var redis = require('redis');
  var client    = redis.createClient({
    port      : process.env.REDIS_PORT,
    host      : process.env.REDIS_HOST
  });
  client.on('error', function(err){
    console.log('Something went wrong ', err)
  });
  client.keys('*:result', function(error, keys) {
    if (error) throw error;
    // console.log('GET keys ->', keys)
    for (let j = 0; j < keys.length; j++){
      var i = 0;
      function f() {
          if (!response.finished) {
            client.lrange(keys[j], 0, 99, function(error, result) {
              if (error) throw error;
              const eventString = `event: redisTweetResult\ndata: {"key":"${keys[j]}", "value":[${result}]}\n\n`;    
              // console.log(j)
              // console.log(eventHistory)
              response.write(eventString);
              eventHistory.push(eventString);
            }); 
          }             
          i++;
          if( i < max ){
              setTimeout( f, 3000 );
          }
      }
      f();
    }
  });
}

// function getAllEventsFromPostgres(response, eventHistory) {
//   const Pool = require('pg').Pool
//   const pool = new Pool({
//     user: 'me',
//     host: 'localhost',
//     database: 'test',
//     password: 'password',
//     port: 5432,
//   })
//   pool.query('SELECT * FROM events ORDER BY name ASC', (error, results) => {
//     if (error) {
//       throw error
//     }
//     // response.status(200).json(results.rows)
//     if (results) {
//       if (!response.finished) {
//         console.log(`\nRetrieving existing events from Postgres:`);
//         let eventChannel = 'existingEventChannel'
//         results.rows.forEach((event) => {
//           const eventString = `event: ${eventChannel}\ndata: ${JSON.stringify(event)}\n\n`;
//           response.write(eventString);
//           eventHistory.push(eventString);           
//           console.log(event);
//         })
//       }
//     }
//   })
// } 

// function readTweetFromKafka(response, eventHistory) {
//   var kafka = require('kafka-node')
//   var client = new kafka.KafkaClient({kafkaHost: 'localhost:9092'})
//   var Consumer = kafka.Consumer
//   var topic = 'test2';

//   client.on('connect', function() {
//     console.log('Kafka client connected')
//   });

//   client.on('error', function(err) {
//     console.log('Something went wrong with Kafka client: ' + err)
//   });

//   var consumer = new Consumer(
//     client, [{topic: topic, partition: 0, offset: 0}], {fromOffset: true}
//   );

//   let messageId = 0;
//   consumer.on('message', function(message){
//     if (!response.finished){
//       let tweetChannel = 'kafkaTweetStreamChannel'   
//       const eventString = `id: ${messageId}\nevent: ${tweetChannel}\ndata: ${message.value}\n\n`;
//       response.write(eventString);
//       eventHistory.push(eventString);
//       console.log(message.value);
//       messageId += 1;
//     }
//   })
// }

function closeConnection(response) {
  if (!response.finished) {
    response.end();
    console.log('Stopped sending events.\n\n');
  }
}

function checkConnectionToRestore(request, response, eventHistory) {
  if (request.headers['last-event-id']) {
    const eventId = parseInt(request.headers['last-event-id']);

    eventsToReSend = eventHistory.filter((e) => e.id > eventId);

    eventsToReSend.forEach((e) => {
      if (!response.finished) {
        response.write(e);
      }
    });
  }
}
