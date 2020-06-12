import * as authApis from './auth';
import * as userApis from './user';

const apis = {
  ...authApis,
  ...userApis,
};

export default apis;
