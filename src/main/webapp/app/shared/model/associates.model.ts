import { ISkills } from 'app/shared/model/skills.model';

export interface IAssociates {
  id?: string;
  associate?: string;
  bskills?: ISkills[];
}

export const defaultValue: Readonly<IAssociates> = {};
