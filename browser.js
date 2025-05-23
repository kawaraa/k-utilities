export class MultipartRequest extends XMLHttpRequest {
  constructor(responseType = "json") {
    super();
    Object.setPrototypeOf(this, MultipartRequest.prototype);
    this.responseType = responseType;
    // Not: if "Content-Type" is "multipart/form-data", then the data you send must be binary.
  }
  uploadForm(form, url, method = "POST") {
    this.open(method, url, true);
    this.onload = () => {
      const result = this.responseType !== "text" ? this.response : this.responseText;
      const eventName = this.status >= 200 && this.status < 300 && result ? "end" : "error";
      this.dispatch(eventName, result || { message: "Something went wrong please try again(!)" });
    };
    this.send(form);
  }
  uploadFile(file, url, method = "PUT") {
    this.open(method, url, true);
    this.setRequestHeader("Content-Type", "text/plain");
    this.onload = () => {
      const result = this.responseType !== "text" ? this.response : this.responseText;
      const eventName = this.status >= 200 && this.status < 300 && result ? "end" : "error";
      this.dispatch(eventName, result || { message: "Something went wrong please try again(!)" });
    };
    this.send(new File(file)); // if it's not a type of file
  }
  downloadFile(url, method = "GET", responseType = "arraybuffer") {
    // "json", "text", "document", "arraybuffer", "blob"
    this.responseType = responseType;
    this.open(method, url, true);
    this.onload = () => {
      const result = this.responseType !== "text" ? this.response : this.responseText;
      const eventName = this.status >= 200 && this.status < 300 && result ? "end" : "error";
      this.dispatch(
        eventName,
        result || {
          message: "Something went wrong please try again(!)",
        }
      );
    };
    this.send();
  }
  // on upload to server
  on(eventName, listener) {
    if (eventName !== "progress") return this.upload.addEventListener(eventName, listener);
    this.upload.addEventListener(eventName, (e) => {
      if (e.lengthComputable) listener((e.loaded / e.total) * 100);
    });
  }
  // on download from server
  onLoad(eventName, listener) {
    if (eventName !== "progress") return this.addEventListener(eventName, listener);
    this.addEventListener(eventName, (e) => {
      if (e.lengthComputable) listener((e.loaded / e.total) * 100);
    });
  }
  dispatch(eventType, data) {
    this.upload.dispatchEvent(new CustomEvent(eventType, { detail: data }));
  }
}

export class Request {
  fetch(url, method = "GET", responseType = "json") {
    // "json", "text", "document", blob, "arraybuffer"
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.responseType = responseType.toLocaleLowerCase();
      xhr.open(method, url, true);
      xhr.onload = () => {
        const result = xhr.responseType !== "text" ? xhr.response : xhr.responseText;
        if (xhr.status >= 200 && xhr.status < 300 && result) return resolve(result);
        const error = result && result.message ? result.message : result;
        return reject(new Error(error || "Something went wrong please try again(!)"));
      };
      xhr.onerror = (error) => reject(new Error("NetworkError: Please check your connection(!)"));
      xhr.send();
    });
  }
  send(data, url, method = "POST", type = "application/json", responseType = "json") {
    // "application/json", "x-www-form-urlencoded", "text/plain", text/html
    // Not: if "Content-Type" is "application/json", then the data you send must be json.
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.responseType = responseType;
      xhr.open(method, url, true);
      xhr.setRequestHeader("Content-Type", type);
      xhr.onload = () => {
        const result = xhr.responseType !== "text" ? xhr.response : xhr.responseText;
        if (xhr.status >= 200 && xhr.status < 300 && result) return resolve(result);
        const error = result && result.message ? result.message : result;
        return reject(new Error(error || "Something went wrong please try again(!)"));
      };
      xhr.onerror = (error) => reject(new Error("NetworkError: Please check your connection(!)"));
      xhr.send(data ? JSON.stringify(data) : null);
    });
  }
  async downloadFile(url, onData, onEnd) {
    const reader = await fetch(url)
      .then((response) => response.body.getReader())
      .catch(onEnd);

    const stream = new ReadableStream({
      start(controller) {
        function pump() {
          return reader
            .read()
            .then(({ done, value }) => {
              if (done) {
                onEnd();
                return controller.close();
              }
              controller.enqueue(value);
              onData(value);
              return pump();
            })
            .catch(onEnd);
        }
        return pump();
      },
    });
    return stream;
  }
  convertToURLEncoded(obj) {
    const query = [];
    for (let key in obj) {
      query.push(`${key}=${obj[key]}`);
    }
    return `?${query.join("&")}`;
  }
  parseUREncoded(url) {
    if (url.length < 3) return "";
    let obj = {};
    let query = url.replace("?", "").split("&");
    for (let i = 0; i < query.length; i++) {
      let pair = query[i].split("=");
      obj[pair[0]] = pair[1];
    }
    return obj;
  }
  static toJSON(data) {
    try {
      const json = JSON.stringify(data);
      return json;
    } catch (e) {}
    return data;
  }
  static parseJSON(data) {
    try {
      const json = JSON.parse(data);
      return json;
    } catch (e) {}
    return data;
  }
}

export class Socket extends WebSocket {
  constructor(url) {
    super(url);
    Object.setPrototypeOf(this, Socket.prototype); // fixes the bug in inheriting class from the WebSocket in safari
    this.onmessage = (e) => this.dispatch(e);
    this._events = new Set();
  }

  emit(eventType, message) {
    const event = { type: eventType, message };
    this.send(this.toJSON(event));
    return true;
  }
  on(eventType, listener) {
    this._events.add(eventType);
    this.addEventListener(eventType, listener, false);
  }
  dispatch(event) {
    const { type, message } = this.parseJSON(event.data);
    if (!this._events.has(type)) throw new Error(`"${type}" event has no listener.`);
    this.dispatchEvent(new CustomEvent(type, { detail: message }));
  }
  toJSON(data) {
    try {
      const json = JSON.stringify(data);
      return json;
    } catch (e) {}
    return data;
  }
  parseJSON(data) {
    try {
      const json = JSON.parse(data);
      return json;
    } catch (e) {}
    return data;
  }
}
