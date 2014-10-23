# Latency Headers Benchmark

## Usage

latencyHeadersBenchmark(requestSent, headers)

- `requestSent` - Unix timestamp set right before sending the request
- `headers` - Object containing the required response headers

## How it works

Latency headers benchmark makes use of these response headers:

- `x-request-received` is set by the server with the timestamp of when the request was received
- `x-response-sent` is set by the server with the timestamp of when the response was sent

To determine the following latency benchmarks:

- **outgoing network latency**: time between client sending the request and server receiving it
- **server processing latency**: time between server receiving the request and sending the response
- **incoming network latency**: time between server sending the response and client receiving it
- **total round trip latency**: time between client sending the request and receiving response

## Get Started

An example server and app is included in this repo for your convenience.

```shell
# Clone this repo
git clone git@github.com:montanaflynn/latency-header-benchmark.git

# CD to the example dir
cd latency-header-benchmark/example

# Start the server in the background
node server.js &

# Run the app
node app.js

# Kill the example server
pkill latencyServer

```

Copyright (c) 2014, Montana Flynn

Permission to use, copy, modify, and/or distribute this software for any purpose with or without fee is hereby granted, provided that the above copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.