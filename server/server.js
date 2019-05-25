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
    // sendEvents(response, eventHistory);
    
    // getAllEventsFromPostgres(response, eventHistory);
    getNewEventFromRedis(response, eventHistory);
    getNewProcessFromRedis(response, eventHistory);
    // getCountFromRedis(response, eventHistory);
    // readTweetFromKafka(response, eventHistory);

  } else {
    response.writeHead(404);
    response.end();  
  }
}).listen(5000, () => {
  console.log(`Server running at localhost:5000`);
});

function getNewEventFromRedis(response, eventHistory) {
  var redis = require('ioredis');
  // var redis = new Redis();
  var client    = redis.createClient({
    port      : process.env.REDIS_PORT,
    host      : process.env.REDIS_HOST
  });
  var channel = 'new_event_created';
  
  client.on('message', (channel, message) => {
    if (!response.finished) {
      console.log(`\nReceived the following message from ${channel}: ${message}`);
      let eventChannel = 'newEventChannel'    
      const eventString = `event: ${eventChannel}\ndata: ${message}\n\n`;
      response.write(eventString);
      eventHistory.push(eventString);
     }
  })

  client.subscribe(channel, (error) => {
    if (error) {
        throw new Error(error);
    }
    console.log(`Listening for updates on ${channel} Redis channel.`);
  });
}
  
function getNewProcessFromRedis(response, eventHistory) {
  var redis = require('ioredis');
  // var redis = new Redis();
  var client    = redis.createClient({
    port      : process.env.REDIS_PORT,
    host      : process.env.REDIS_HOST
  });
  var channel = 'processed_technique_created';
  
  client.on('message', (channel, message) => {
    if (!response.finished) {
      console.log(`\nReceived the following message from ${channel}: ${message}`);
      let processChannel = 'newProcessChannel'    
      const processString = `event: ${processChannel}\ndata: ${message}\n\n`;
      response.write(processString);
      eventHistory.push(processString);
      }
  })

  client.subscribe(channel, (error) => {
    if (error) {
        throw new Error(error);
    }
    console.log(`Listening for updates on ${channel} Redis channel.`);
  });
} 
//https://medium.com/@ridwanfajar/using-redis-pub-sub-with-node-js-its-quite-easy-c9c8b4dae79f
// redis|⇒ redis-cli
// 127.0.0.1:6379> publish new_event_created "{\"name\":\"2012 Hurricane Sandy\", \"terms\": [\"storm\", \"Caribbean\"], \"active\": true}"


function getCountFromRedis(response, eventHistory) {
  var redis = require('redis');
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
  var myKey = 'my-test-key';
  subscriber.subscribe('__keyevent@0__:set', myKey);

  subscriber.on('message', function(channel, key) {
    if (!response.finished) {
      client.get(myKey, function(error, value) {
        if (error) {
          console.log(error);
          throw error;
        }
        const eventString = `event: redisTweetCount\n data: ${value}\n\n`;
        response.write(eventString);
        eventHistory.push(eventString);
        console.log(`GET value of #{} -> ` + value );
      })
    }
  });
}
// https://hackernoon.com/using-redis-with-node-js-8d87a48c5dd7

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
