interface UserI {
  name: string;
  accessToken: string;
  avatar: string;
  role: number;
}

interface MenuItemI {
  key: string;
  icon?: Object;
  icon_name?: string;
  title: string;
  path: string;
  children?: Array<MenuItemI>;
  sub_menu: Array<string>;
  parent: string;
  role?: Array<number>;
  status: number;
}

interface DictI {
  id?: number;
  status: number;
  create_time: number;
  label: string;
  label_view: string;
  type: string;
  type_view: string;
  name: string;
  value: number;
}

interface AjaxErrorI extends Error{
  date: number;
  data: any;
  url: string;
  referer: string;
  method: string;
  status: number;
}

interface CommonErrorI extends Error{
  date: number;
}
