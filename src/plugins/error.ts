class AjaxError extends Error {
  constructor(config, stack, message, response) {
    super();
    this.config = config;
    this.stack = stack;
    this.message = message;
    this.response = response;
    this.date = new Date().getTime();
  }
}

class CommonError extends Error {
}

type ErrorT = AjaxError | CommonError;

const ERROR_HANDLERS = new Map<Error, any>([
  [AjaxError, (error: AjaxError) => {
    const { config, stack, message, response, date } = error;
    const { status } = response;
    const { url, method, headers } = config;
    const { referer } = headers;
    if (process.env.NODE_ENV === 'production') $axios.post('/ajaxError', { stack, message, url, method, referer, status, date });
    else console.log(error);
  }],
  [CommonError, (error: CommonError) => {
    const message = error.message || error;
    const stack = error.stack || error;
    const date = new Date().getTime();
    if (process.env.NODE_ENV === 'production') $axios.post('/commonError', { message, stack, date });
    else console.log(error);
  }],
]);

function handleError(error: ErrorT) {
  const errorType = Reflect.getPrototypeOf(error).constructor;
  const handler = ERROR_HANDLERS.get(errorType);
  handler(error);
}

export { AjaxError, CommonError };

export default function () {
  console.error = (...errors: Array<unknown>) => errors.forEach((error) => handleError(error));
}
