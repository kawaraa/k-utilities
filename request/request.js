class Request {
  // static onLoad() {
  //     if (xhr.status >= 200 && xhr.status < 300) return resolve(xhr.response || xhr.responseText);
  //     return reject(new Error(xhr.response || xhr.responseText));
  // }
  static fetch(url, type) {
    // "json", "text", "document"
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      // xhr.responseType = type;
      xhr.open("GET", url, true);
      xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) return resolve(xhr.response || xhr.responseText);
        return reject(new Error(xhr.response || xhr.responseText));
      };
      xhr.onerror = error => reject(new Error("NetworkError: Please check your connection(!)"));
      xhr.send();
    });
  }

  static post(url, data, method = "POST", type = "application/json") {
    // "application/json", "x-www-form-urlencoded", "text/plain", text/html
    // Not: if "Content-Type" is "application/json", then the data you send must be json.
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open(method, url, true);
      xhr.setRequestHeader("Content-Type", type);
      xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) return resolve(xhr.response || xhr.responseText);
        return reject(new Error(xhr.response || xhr.responseText));
      };
      xhr.onerror = error => reject(new Error("NetworkError: Please check your connection(!)"));
      xhr.send(JSON.stringify(data));
    });
  }

  static postFile(url, form, method = "POST", type = "multipart/form-data") {
    // multipart/form-data
    // Not: if "Content-Type" is "multipart/form-data", then the data you send must be binary.
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open(method, url, true);
      xhr.setRequestHeader("Content-Type", type);
      xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) return resolve(xhr.response || xhr.responseText);
        return reject(new Error(xhr.response || xhr.responseText));
      };
      xhr.onerror = error => reject(new Error("NetworkError: Please check your connection(!)"));
      xhr.send(form);
    });
  }

  static convertToURLEncoded(obj) {
    const query = [];
    for (let key in obj) {
      query.push(`${key}=${obj[key]}`);
    }
    return `?${query.join("&")}`;
  }

  static parseUREncoded(url) {
    if (url.length < 3) return "";
    let obj = {};
    let query = url.replace("?", "").split("&");
    for (let i = 0; i < query.length; i++) {
      let pair = query[i].split("=");
      obj[pair[0]] = pair[1];
    }
    return obj;
  }
}

export default Request;
