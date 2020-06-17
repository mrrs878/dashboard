class AjaxError implements AjaxErrorI {
  message: string;

  name: string;

  stack: string;

  data: any;

  date: number;

  method: string;

  referer: string;

  status: number;

  url: string;

  constructor(message: string, name: string, stack: string, data: any, date: number, method: string, referer: string, status: number, url: string) {
    this.message = message;
    this.name = name;
    this.stack = stack;
    this.data = data;
    this.date = date;
    this.method = method;
    this.referer = referer;
    this.status = status;
    this.url = url;
  }
}


export default AjaxError;
