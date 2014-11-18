# Latency Headers Benchmark

Latency headers benchmark makes use of these response headers:

- `x-request-received` is set by the server with the timestamp of when the request was received
- `x-response-sent` is set by the server with the timestamp of when the response was sent

To determine the following latency benchmarks:

- **outgoing network latency**: time between client sending the request and server receiving it
- **server processing latency**: time between server receiving the request and sending the response
- **incoming network latency**: time between server sending the response and client receiving it
- **total round trip latency**: time between client sending the request and receiving response

The original [proof-of-concept](https://github.com/montanaflynn/Latency-Headers-PoC) has more details and examples.

## Usage

latencyHeadersBenchmark(requestSent, headers)

- __requestSent `integer`__ - Timestamp in milliseconds since epoch of when the request was sent
- __headers `object`__ - With required response headers `x-request-received` and `x-response-sent`

## Complete Example

#### server.js

```js
// Load the http module
var http = require('http');

// Make it easy to pkill from npm
process.title = "latencyServer"

// Create the server
var server = http.createServer(function (request, response) {

  // Set the x-request-received header with the current timestamp
  response.setHeader('x-request-received', new Date().getTime());

  // Simulate a delay for processing latency to show up
  setTimeout(function(){

    // Set the x-response-sent header with the current timestamp
    response.setHeader('x-response-sent', new Date().getTime());

    // Set the header status to ok and the content type
    response.writeHead(200, {"Content-Type": "text/plain"});

    // Return the demobligatory hello world response
    response.end("Hello World\n");

  // Remember that delay? 50-75ms sounds like a good target
  }, Math.floor((Math.random() * 25) + 50))

});

// Listen on localhost:1337
server.listen(1337);
```

#### app.js

```js
// Require http for requests
var http = require('http')

// Save the timestamp of when the request was sent as its required
var requestSent = new Date().getTime()

// Send the request to a server that returns the latency headers
http.get("http://localhost:1337", function(res) {

  // Save the response headers for easy access later
  var headers = res.headers

  // Save the timestamp of when the response was received
  var responseReceived = new Date().getTime()

  // Save the headers we care about in variables
  var responseSent = headers['x-response-sent'] || false
  var requestReceived = headers['x-request-received'] || false

  // If the latency headers do not exist
  if (!responseSent || !requestReceived){
    throw new Error("The server did not respond with latency headers.")
  }

  // The math to determine the latencies
  var outgoingLatency = requestReceived - requestSent
  var processingLatency = responseSent - requestReceived
  var incomingLatency = responseReceived - responseSent
  var roundtripLatency = outgoingLatency + processingLatency + incomingLatency

  // Return back the latencies
  var results = {
      "outgoingLatency" : outgoingLatency,
      "processingLatency" : processingLatency,
      "incomingLatency" : incomingLatency,
      "roundtripLatency" : roundtripLatency
  }

  // Output the results
  console.log(results)
})
```

## Try it out

An example server and app is included in this repo for your convenience. 

```shell
# Clone this repo
git clone git@github.com:montanaflynn/latency-header-benchmark.git

# CD to the example dir
cd latency-header-benchmark/example

# Install this package (npmception?)
npm install

# Start the server in the background
node server.js &

# Run the app
node app.js

# Kill the example server
pkill latencyServer
```

Copyright (c) 2014, Montana Flynn (http://anonfunction.com/)
