import {
	UserAuthentificatedAction,
	isAuthentificatedState,
	UserInfoAction,
} from "./../types/index";
import { UserActionTypes, UserAction, UserState } from "@src/types";

export const setUserInfo = (payload: UserState): UserAction => {
	return { type: UserActionTypes.SET_USER_INFO, payload };
};

export const setIsAuth = (payload: isAuthentificatedState): UserAuthentificatedAction => {
	return { type: UserActionTypes.SET_AUTHENTIFICATED, payload };
};
