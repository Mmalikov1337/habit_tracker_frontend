import { UserAuthentificatedAction, isAuthentificatedState } from "./../../types/index";
import { UserAction, UserState, UserActionTypes } from "@src/types";

const initialUserDataState: UserState = new UserState({});
const initialisAuthState: isAuthentificatedState = { authentificated: false };

export const userDataReducer = (state = initialUserDataState, action: UserAction): UserState => {
	// console.log(state, action);
	switch (action.type) {
		case UserActionTypes.SET_USER_INFO: {
			return { ...state, ...action.payload };
		}
		case UserActionTypes.SET_AUTHENTIFICATED: {
			return { ...state, ...action.payload };
		}
		default:
			return state;
	}
};

export const userAuthReducer = (
	state = initialisAuthState,
	action: UserAction
): isAuthentificatedState => {
	// console.log(state, action);
	switch (action.type) {
		case UserActionTypes.SET_AUTHENTIFICATED: {
			return { ...state, ...action.payload };
		}
		default:
			return state;
	}
};
