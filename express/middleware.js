// Common headers set by proxies
const headersToCheck = [
  "x-forwarded-for",
  "x-real-ip",
  "x-client-ip",
  "cf-connecting-ip", // Cloudflare
  "true-client-ip", // Akamai and Cloudflare
  "x-cluster-client-ip",
];

export function clientIpParser(req, res, next) {
  for (const header of headersToCheck) {
    // x-forwarded-for can contain multiple IPs (client, proxy1, proxy2, ...), the first IP (original client)
    let ip = req.headers[header]?.split(",")[0]?.trim();
    if (!ip) continue;
    req.ip = ip;
    return next ? next() : req.ip;
  }
  req.ip = req.ip || req.connection.remoteAddress; // Fallback to connection remote address
  return next ? next() : req.ip;
}

// ===== Parse cookies =====
export function cookiesParser(request, response, next) {
  const cookies = request.headers.cookie
    ? request.headers.cookie.split("; ").reduce((prev, current) => {
        const [name, value] = current.split("=");
        prev[name] = value;
        return prev;
      }, {})
    : {};
  request.cookies = cookies;
  next();
}

export class RequestRateLimiter {
  constructor(windowInMins = 1, maxRequestPerWindow = 100) {
    this.requests = new Map();
    this.WINDOW_SIZE = windowInMins * (60 * 1000); // 1 minute
    this.MAX_REQUESTS = maxRequestPerWindow; // or 60 which mean a request per second
  }

  limitRate = (request, response, next) => {
    const clientIp = request.ip || clientIpParser(request); // Get client's IP address
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

export const limitRequestRate = (a, b) => new RequestRateLimiter(a, b).limitRate;
