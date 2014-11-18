# Latency Headers Benchmark

Latency headers benchmark makes use of these response headers:

- `x-request-received` is set by the server with the timestamp of when the request was received
- `x-response-sent` is set by the server with the timestamp of when the response was sent

To determine the following latency benchmarks:

- **outgoing network latency**: time between client sending the request and server receiving it
- **server processing latency**: time between server receiving the request and sending the response
- **incoming network latency**: time between server sending the response and client receiving it
- **total round trip latency**: time between client sending the request and receiving response

## Usage

latencyHeadersBenchmark(requestSent, headers)

- __requestSent `integer`__ - Timestamp in milliseconds since epoch of when the request was sent
- __headers `object`__ - With required response headers `x-request-received` and `x-response-sent`

## Example

```javascript
// Require http for the request
var http = require('http')

// Require latency-headers-benchmark 
var latencyBenchmark = require('latency-headers-benchmark')

// Save the timestamp of when the request was sent as its required
var requestSent = new Date().getTime()

// Send the request to a server that returns the latency headers
http.get("http://localhost:1337", function(res) {

  // Run the benchmark
  var results = latencyBenchmark(requestSent, res.headers)

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

### Related projects

- [Latency Header Proof of Concept](https://github.com/montanaflynn/Latency-Headers-PoC/)
- [Express Latency Header Middleware](https://github.com/montanaflynn/express-latency-headers)
- [Koa Latency Header Middleware](https://github.com/montanaflynn/koa-latency-headers)

Copyright (c) 2014, Montana Flynn (http://anonfunction.com/)
