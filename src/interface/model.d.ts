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
  items?: Array<MenuItemI>;
}
