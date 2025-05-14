export default class CustomError extends Error {
  constructor(message, name = "General") {
    super(message ? message + " (!)" : "Something went wrong, Please try again (!)");
    Object.setPrototypeOf(this, Error.prototype); // fixes the bug in inheriting class from the WebSocket in safari
    this.name = name + "Error";
  }

  static validate(error) {
    return /\([!]+\)/i.test(error.message) ? error : new CustomError();
  }
  static validateMsg(message) {
    return /\([!]+\)/i.test(message) ? message : "Something went wrong, Please try again (!)";
  }
  static toJson(error) {
    if (!error) return JSON.stringify({ error: new CustomError().message });
    return JSON.stringify({ error: CustomError.validate(error).message });
  }
}
module.exports = CustomError;
