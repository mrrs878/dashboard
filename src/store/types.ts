import * as actions from './actions';

type ActionTypeT<T, P> = {
  type: T,
  data: P,
};

type IncreaseCountT = ActionTypeT<actions.ADD_COUNT, number>;
type DecreaseCountT = ActionTypeT<actions.ADD_COUNT, number>;
type UpdateUser = ActionTypeT<actions.UPDATE_USER, UserI>;
type ClearUser = ActionTypeT<actions.CLEAR_USER, any>;
type UpdateMenu = ActionTypeT<actions.UPDATE_MENU, Array<MenuItemI>>;
type UpdateRoutes = ActionTypeT<actions.UPDATE_MENU_ROUTES, MenuRoutesI>;
type UpdateDicts = ActionTypeT<actions.UPDATE_DICTS, Array<DictI>>;
type UpdateDict = ActionTypeT<actions.UPDATE_DICT, DictI>;
type UpdateMenuTitles = ActionTypeT<actions.UPDATE_MENU_TITLES, MenuTitlesI>;
type UpdateFullScreen = ActionTypeT<actions.UPDATE_FULL_SCREEN, boolean>;

type ActionsT = IncreaseCountT | DecreaseCountT | UpdateUser
| ClearUser | UpdateMenu | UpdateRoutes | UpdateDicts | UpdateDict | UpdateMenuTitles | UpdateFullScreen;

export default ActionsT;
