import { LoggedInUser, PeopleUser, Resource } from 'interfaces';

import {
  GetLoggedInUser, GetLoggedInUserRequest, GetLoggedInUserResponse,
  GetUser, GetUserRequest, GetUserResponse,
  GetUserOwn, GetUserOwnRequest, GetUserOwnResponse,
  GetUserRead, GetUserReadRequest, GetUserReadResponse,
} from './types';

/* ACTIONS */
export function getLoggedInUser(): GetLoggedInUserRequest {
  return { type: GetLoggedInUser.REQUEST };
};
export function getLoggedInUserFailure(): GetLoggedInUserResponse {
  return { type: GetLoggedInUser.FAILURE };
};
export function getLoggedInUserSuccess(user: LoggedInUser): GetLoggedInUserResponse {
  return { type: GetLoggedInUser.SUCCESS, payload: { user } };
};

export function getUser(userId: string, index?: number, source?: string): GetUserRequest {
  return { type: GetUser.REQUEST, payload: { userId, index, source } };
};
export function getUserFailure(): GetUserResponse {
  return { type: GetUser.FAILURE };
};
export function getUserSuccess(user: PeopleUser): GetUserResponse {
  return { type: GetUser.SUCCESS, payload: { user } };
};

export function getUserOwn(userId: string): GetUserOwnRequest {
  return { type: GetUserOwn.REQUEST, payload: { userId }};
};
export function getUserOwnFailure(): GetUserOwnResponse {
  return { type: GetUserOwn.FAILURE };
};
export function getUserOwnSuccess(own: Resource[]): GetUserOwnResponse {
  return { type: GetUserOwn.SUCCESS, payload: { own } };
};

export function getUserRead(userId: string): GetUserReadRequest {
  return { type: GetUserRead.REQUEST, payload: { userId }};
};
export function getUserReadFailure(): GetUserReadResponse {
  return { type: GetUserRead.FAILURE };
};
export function getUserReadSuccess(read: Resource[]): GetUserReadResponse {
  return { type: GetUserRead.SUCCESS, payload: { read } };
};

/* REDUCER */
export interface UserReducerState {
  loggedInUser: LoggedInUser;
  profile: {
    own: Resource[],
    read: Resource[],
    user: PeopleUser,
  };
};

export const defaultUser = {
  display_name: '',
  email: '',
  employee_type: '',
  first_name: '',
  full_name: '',
  github_username: '',
  is_active: true,
  last_name: '',
  manager_fullname: '',
  profile_url: '',
  role_name: '',
  slack_id: '',
  team_name: '',
  user_id: '',
};
export const initialState: UserReducerState = {
  loggedInUser: defaultUser,
  profile: {
    own: [],
    read: [],
    user: defaultUser,
  },
};

export default function reducer(state: UserReducerState = initialState, action): UserReducerState {
  switch (action.type) {
    case GetLoggedInUser.SUCCESS:
      return {
        ...state,
        loggedInUser: (<GetLoggedInUserResponse>action).payload.user,
      };
    case GetUser.REQUEST:
    case GetUser.FAILURE:
      return {
        ...state,
        profile: {
          ...state.profile,
          user: defaultUser,
        },
      };
    case GetUser.SUCCESS:
      return {
        ...state,
        profile: {
          ...state.profile,
          user: (<GetUserResponse>action).payload.user,
        },
      };
    case GetUserOwn.REQUEST:
    case GetUserOwn.FAILURE:
      return {
        ...state,
        profile: {
          ...state.profile,
          own: [],
        }
      };
    case GetUserOwn.SUCCESS:
      return {
        ...state,
        profile: {
          ...state.profile,
          own: (<GetUserOwnResponse>action).payload.own,
        }
      };
    case GetUserRead.REQUEST:
    case GetUserRead.FAILURE:
      return {
        ...state,
        profile: {
          ...state.profile,
          read: [],
        }
      };
    case GetUserRead.SUCCESS:
      return {
        ...state,
        profile: {
          ...state.profile,
          read: (<GetUserReadResponse>action).payload.read,
        }
      };
    default:
      return state;
  }
}
