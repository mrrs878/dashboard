class User implements UserI {
  accessToken: string;

  avatar: string;

  name: string;

  constructor(accessToken = '', avatar = 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    name = '请登录') {
    this.accessToken = accessToken;
    this.avatar = avatar;
    this.name = name;
  }
}

export default User;
