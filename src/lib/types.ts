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
  video: string;
  desc: string;
}

export type ProjectInfoData = {
  title: string;
  strings?: string[];
  numbers?: number[];
  number?: number;
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

export interface PortfolioOutletContextData extends ProjectJsonData {
  pid?: string;
  setTimelineCB: (tl?: gsap.core.Timeline) => void
}

export type OutletContextDomEls = {
  mainEl: HTMLDivElement | null;
  gutterEl: HTMLDivElement | null;
  columnFullEl: HTMLDivElement | null;
  columnBottomEl: HTMLDivElement | null;
}