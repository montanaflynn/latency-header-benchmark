// Require http for requests
var http = require('http')

// Require latency-headers-benchmark from the parent directory
var latencyHeadersBenchmark = require('../index.js')

// This is the starting timestamp of when the request was sent
var requestSent = new Date().getTime()

// Send the request
http.get("http://localhost:1337", function(res) {

  // Run the benchmark
  var results = latencyHeadersBenchmark(requestSent, res.headers)

  // Output the results
  console.log(results)

}).on('error', function(err) {

  // Request was not successful
  throw err 

})
