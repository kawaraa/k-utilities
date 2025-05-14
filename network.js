export class RequestRateLimiter {
  constructor(windowInMins = 1, maxRequestPerWindow = 100) {
    this.requests = new Map();
    this.WINDOW_SIZE = windowInMins * (60 * 1000); // 1 minute
    this.MAX_REQUESTS = maxRequestPerWindow; // or 60 which mean a request per second
  }

  limitRate = (request, response, next) => {
    const clientIp = request.ip || request.connection.remoteAddress; // Get client's IP address
    const newRequestData = { count: 1, timestamp: Date.now() };
    const requestData = this.requests.get(clientIp);

    if (!requestData) this.requests.set(clientIp, newRequestData);
    else {
      const exceededTheMaximum = newRequestData.timestamp - requestData.timestamp < this.WINDOW_SIZE;
      requestData.count++;

      if (requestData.count > this.MAX_REQUESTS && exceededTheMaximum) {
        // If the request count exceeds the maximum, send a 429 response
        return response.status(429).send("Too many requests, please try again later.");
      } else {
        // If the time window has elapsed, reset the request count
        this.requests.set(clientIp, requestData);
      }
    }

    next(); // Continue to the next middleware or route handler
  };
}

// This function return the INET Address which the private IP address of the device on the local network.
// This function tested on MacOS only.
export function getPrivateIpAddress() {
  const nets = require("os").networkInterfaces();
  const results = {};

  for (const name of Object.keys(nets)) {
    for (const net of nets[name]) {
      // skip over non-ipv4 and internal (i.e. 127.0.0.1) addresses
      if (net.family === "IPv4" && !net.internal) {
        if (!results[name]) results[name] = [];
        results[name].push(net.address);
      }
    }
  }
  return results["en0"] && results["en0"][0] ? results["en0"][0] : null;
}
