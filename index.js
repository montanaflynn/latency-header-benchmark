module.exports = function(requestSent, headers){

	// If the server is not sending the latency headers we stop here
	if (!requestSent || typeof requestSent != "number"){
	  throw new Error("Missing request sent timestamp argument")
	}

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
	return {
		"outgoingLatency" : outgoingLatency,
		"processingLatency" : processingLatency,
		"incomingLatency" : incomingLatency,
		"roundtripLatency" : roundtripLatency
	}

}
