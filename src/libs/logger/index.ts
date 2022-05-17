export default class Logger {
  static log(...arg: any[]) {
    console.log(...arg);
  }

  static warn(...arg: any[]) {
    console.warn(...arg);
  }

  static error(...arg: any[]) {
    console.error(...arg);
  }
}
