import { createFromIconfontCN } from '@ant-design/icons/es';
import Mock from 'mockjs';
import MAIN_CONFIG from '../config';

export function createIconFromIconfont() {
  return createFromIconfontCN({
    scriptUrl: MAIN_CONFIG.ICONFONT_URL,
  });
}

export function createMockRes<T, P>(url: string, type: MockMethodT, template: (req?: MockReqI<T>) => P) {
  return Mock.mock(url, type, template);
}

export function getLastItem<T>(src: Array<T>) {
  return src.length === 0 ? src[0] : src[src.length - 1];
}
