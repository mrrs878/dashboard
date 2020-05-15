import User from '../model/User';

export interface CommonStateI {
  count: number,
  user: UserI,
}

export const DEFAULT_COMMON_STATE: CommonStateI = {
  count: 0,
  user: new User(),
};
