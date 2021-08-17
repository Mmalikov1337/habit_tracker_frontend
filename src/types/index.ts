export interface ISVG {
	extraClassName?: string;
}

export type habitPriority = "lowest" | "low" | "normal" | "high" | "highest";

export enum UserActionTypes {
	SET_USER_INFO = "SET_USER_INFO",
	SET_AUTHENTIFICATED = "SET_AUTHENTIFICATED",
}

export class UserState {
	id: number | null;
	email: string | null;
	name: string | null;
	stats: string | null;
	rang: string | null;
	bio: string | null;
	permission_lvl: number | null;
	photo: string | null;
	is_email_activated: any;

	constructor(user: any) {
		this.id = Number(user.id) ?? null;
		this.email = user.email ?? null;
		this.name = user.name ?? null;
		this.stats = user.stats ?? null;
		this.rang = user.rang ?? null;
		this.bio = user.bio ?? null;
		this.permission_lvl = user.permission_lvl ?? null;
		this.photo = user.photo ?? null;
		this.is_email_activated = user.is_email_activated ?? null;
	}
}

export interface UserInfoAction {
	type: UserActionTypes.SET_USER_INFO;
	payload: UserState;
}
export interface UserAuthentificatedAction {
	type: UserActionTypes.SET_AUTHENTIFICATED;
	payload: isAuthentificatedState;
}
export type UserAction = UserInfoAction | UserAuthentificatedAction;

export interface LoginSucceed {
	access: string;
	refresh: string;
	userData: UserState;
}

export interface isAuthentificatedState {
	authentificated: boolean;
}
