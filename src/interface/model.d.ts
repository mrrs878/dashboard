interface UserI {
  name: string;
  accessToken: string;
  avatar: string;
  role: number;
}

interface MenuItemI {
  label: string;
  icon?: any;
  title: string;
  path?: string;
  children?: Array<MenuItemI>;
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
