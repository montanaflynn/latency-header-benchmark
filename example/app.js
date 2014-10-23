// Require http for requests
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