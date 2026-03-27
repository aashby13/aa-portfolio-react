export type ProjectTypeData = {
  id: string;
  text: string;
}

export type ProjectRoleData = {
  id: string;
  me: string;
  company: string;
}

export type ProjectMoreData = {
  class: string;
  video: string;
  desc: string;
}

export type ProjectInfoData = {
  title: string;
  strings?: string[];
  numbers?: number[];
}

export type ProjectData = {
  id: string;
  index: number;
  name: string;
  type: ProjectTypeData | string;
  role: string;
  info: ProjectInfoData[];
  more: ProjectMoreData;
}

export type TypesData = {
  [key: string]: ProjectTypeData;
}

export interface LoadedJsonData {
  projects: ProjectData[];
  roles: ProjectRoleData[];
}

export interface ProjectJsonData extends LoadedJsonData {
  types: ProjectTypeData[];
}

export type OutletContextDomEls = {
  gutterEl: HTMLDivElement | null;
  columnMidEl: HTMLDivElement | null;
  columnBottomEl: HTMLDivElement | null;
}