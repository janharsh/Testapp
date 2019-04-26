import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { ISkills, defaultValue } from 'app/shared/model/skills.model';

export const ACTION_TYPES = {
  FETCH_SKILLS_LIST: 'skills/FETCH_SKILLS_LIST',
  FETCH_SKILLS: 'skills/FETCH_SKILLS',
  CREATE_SKILLS: 'skills/CREATE_SKILLS',
  UPDATE_SKILLS: 'skills/UPDATE_SKILLS',
  DELETE_SKILLS: 'skills/DELETE_SKILLS',
  RESET: 'skills/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<ISkills>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type SkillsState = Readonly<typeof initialState>;

// Reducer

export default (state: SkillsState = initialState, action): SkillsState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_SKILLS_LIST):
    case REQUEST(ACTION_TYPES.FETCH_SKILLS):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_SKILLS):
    case REQUEST(ACTION_TYPES.UPDATE_SKILLS):
    case REQUEST(ACTION_TYPES.DELETE_SKILLS):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_SKILLS_LIST):
    case FAILURE(ACTION_TYPES.FETCH_SKILLS):
    case FAILURE(ACTION_TYPES.CREATE_SKILLS):
    case FAILURE(ACTION_TYPES.UPDATE_SKILLS):
    case FAILURE(ACTION_TYPES.DELETE_SKILLS):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_SKILLS_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_SKILLS):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_SKILLS):
    case SUCCESS(ACTION_TYPES.UPDATE_SKILLS):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_SKILLS):
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

const apiUrl = 'api/skills';

// Actions

export const getEntities: ICrudGetAllAction<ISkills> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_SKILLS_LIST,
  payload: axios.get<ISkills>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<ISkills> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_SKILLS,
    payload: axios.get<ISkills>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<ISkills> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_SKILLS,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<ISkills> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_SKILLS,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<ISkills> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_SKILLS,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
