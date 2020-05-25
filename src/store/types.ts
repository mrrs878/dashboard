import * as actions from './actions';

type ActionTypeT<T, P> = {
  type: T,
  data: P,
};

type IncreaseCountT = ActionTypeT<actions.ADD_COUNT, number>;
type DecreaseCountT = ActionTypeT<actions.ADD_COUNT, number>;
type UpdateUser = ActionTypeT<actions.UPDATE_USER, UserI>;
type ClearUser = ActionTypeT<actions.CLEAR_USER, any>;
type UpdateMenu = ActionTypeT<actions.UPDATE_MENU, any>;

type ActionsT = IncreaseCountT | DecreaseCountT | UpdateUser | ClearUser | UpdateMenu;

export default ActionsT;
