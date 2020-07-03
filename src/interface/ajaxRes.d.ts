interface BaseResI<T> {
  success: boolean;
  code: number;
  data: T;
  msg: string;
}

interface LoginResI extends BaseResI<UserI>{
}
interface GetInfoByTokenResI extends BaseResI<UserI>{
}
interface LogoutResI extends BaseResI<any>{
}
interface GetMenusResI extends BaseResI<Array<MenuItemI>>{
}

interface GetDictsResT extends BaseResI<Array<DictI>>{
}

interface GetDictResT extends BaseResI<DictI>{
}

interface GetDashboardDataResI extends BaseResI<Array<DashboardDataI>>{
}
