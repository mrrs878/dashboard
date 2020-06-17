class CommonError implements CommonErrorI {
  message: string;

  name: string;

  stack: string;

  date: number;


  constructor(message: string, name: string, stack: string, date: number) {
    this.message = message;
    this.name = name;
    this.stack = stack;
    this.date = date;
  }
}

export default CommonError;
