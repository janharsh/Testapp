import { IAssociates } from 'app/shared/model/associates.model';

export interface ISkills {
  id?: string;
  skills?: string;
  askills?: IAssociates[];
}

export const defaultValue: Readonly<ISkills> = {};
