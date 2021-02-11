// This function return the INET Address which the private IP address of the device on the local network.
// This function tested on MacOS only.
module.exports = () => {
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
};
