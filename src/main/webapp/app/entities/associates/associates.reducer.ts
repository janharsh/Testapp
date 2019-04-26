import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IAssociates, defaultValue } from 'app/shared/model/associates.model';

export const ACTION_TYPES = {
  FETCH_ASSOCIATES_LIST: 'associates/FETCH_ASSOCIATES_LIST',
  FETCH_ASSOCIATES: 'associates/FETCH_ASSOCIATES',
  CREATE_ASSOCIATES: 'associates/CREATE_ASSOCIATES',
  UPDATE_ASSOCIATES: 'associates/UPDATE_ASSOCIATES',
  DELETE_ASSOCIATES: 'associates/DELETE_ASSOCIATES',
  RESET: 'associates/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IAssociates>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type AssociatesState = Readonly<typeof initialState>;

// Reducer

export default (state: AssociatesState = initialState, action): AssociatesState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_ASSOCIATES_LIST):
    case REQUEST(ACTION_TYPES.FETCH_ASSOCIATES):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_ASSOCIATES):
    case REQUEST(ACTION_TYPES.UPDATE_ASSOCIATES):
    case REQUEST(ACTION_TYPES.DELETE_ASSOCIATES):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_ASSOCIATES_LIST):
    case FAILURE(ACTION_TYPES.FETCH_ASSOCIATES):
    case FAILURE(ACTION_TYPES.CREATE_ASSOCIATES):
    case FAILURE(ACTION_TYPES.UPDATE_ASSOCIATES):
    case FAILURE(ACTION_TYPES.DELETE_ASSOCIATES):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_ASSOCIATES_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_ASSOCIATES):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_ASSOCIATES):
    case SUCCESS(ACTION_TYPES.UPDATE_ASSOCIATES):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_ASSOCIATES):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: {}
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState
      };
    default:
      return state;
  }
};

const apiUrl = 'api/associates';

// Actions

export const getEntities: ICrudGetAllAction<IAssociates> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_ASSOCIATES_LIST,
  payload: axios.get<IAssociates>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<IAssociates> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_ASSOCIATES,
    payload: axios.get<IAssociates>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IAssociates> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_ASSOCIATES,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IAssociates> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_ASSOCIATES,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IAssociates> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_ASSOCIATES,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
