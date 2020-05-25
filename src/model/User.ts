import { USER_ROLE } from '../constant';

class User implements UserI {
  accessToken: string;

  avatar: string;

  role: number;

  name: string;

  constructor(accessToken = '', avatar = 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    name = '请登录', role = USER_ROLE.guest) {
    this.accessToken = accessToken;
    this.avatar = avatar;
    this.name = name;
    this.role = role;
  }
}

export default User;
