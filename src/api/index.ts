import * as authApis from './auth';
import * as userApis from './user';
import * as articleApis from './article';

const apis = {
  ...authApis,
  ...userApis,
  ...articleApis,
};

export default apis;
