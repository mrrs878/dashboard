import AjaxError from '../model/AjaxError';
import CommonError from '../model/CommonError';
import ajax from '../tools/ajax';

type ErrorT = AjaxError | CommonError;

const ERROR_HANDLERS = new Map<Object, any>([
  [AjaxError, (error: AjaxError) => {
    const { stack, message, data, date, url, method, referer, status } = error;
    if (process.env.NODE_ENV === 'production') {
      ajax.post('/ajaxError', { stack, message, url, method, referer, status, date, data })
        .catch((e) => console.log(e));
    } else console.log(error);
  }],
  [CommonError, (error: CommonError) => {
    const message = error.message || error;
    const stack = error.stack || error;
    const { date } = error;
    if (process.env.NODE_ENV === 'production') {
      ajax.post('/commonError', { message, stack, date }).catch((e) => console.log(e));
    } else console.log(error);
  }],
]);

function handleError(error: ErrorT) {
  const errorType = Reflect.getPrototypeOf(error).constructor;
  const handler = ERROR_HANDLERS.get(errorType);
  handler(error);
}

export default function () {
  console.error = (...errors: Array<ErrorT>) => errors.forEach((error) => handleError(error));
}
