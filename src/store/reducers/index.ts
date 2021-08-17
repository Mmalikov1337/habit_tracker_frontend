import { isAuthentificatedState } from "./../../types/index";
import { userAuthReducer, userDataReducer } from "./userReducer";
import { CombinedState, combineReducers, Reducer } from "redux";
import { HYDRATE } from "next-redux-wrapper";
import { UserInfoAction, UserState } from "@src/types";

const rootReducer: Reducer<
	CombinedState<{
		user: UserState;
		auth: isAuthentificatedState;
	}>,
	UserInfoAction
> = combineReducers({
	user: userDataReducer,
	auth: userAuthReducer,
});
export const reducer = (state: any, action: any) => {
	if (action.type === HYDRATE) {
		const nextState = {
			...state, // use previous state
			...action.payload, // apply delta from hydration
		};
		if (state.count) nextState.count = state.count; // preserve count value on client side navigation
		return nextState;
	} else {
		return rootReducer(state, action);
	}
};
export type RootState = ReturnType<typeof rootReducer>;
