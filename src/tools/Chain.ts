/**
 * @overview: 实现职责链模式
 * @description: 实现职责链模式
 * @author: Mr.RS<mrrs878@foxmail.com>
 * @date 2020/7/1/0001
*/

const NEXT_SUCCESSOR = 'nextSuccessor';

class Chain {
  private fn: Function;

  private successor: Chain | null;

  constructor(fn: Function) {
    this.fn = fn;
    this.successor = null;
  }

  setNextSuccessor(successor: Chain) {
    this.successor = successor;
  }

  passRequest(...argument: Array<any>): any {
    const res = this.fn.call(this, ...argument);
    if (res === NEXT_SUCCESSOR) {
      return this.successor?.passRequest.apply(this.successor, argument);
    }
    return res;
  }
}

export { NEXT_SUCCESSOR };
export default Chain;
