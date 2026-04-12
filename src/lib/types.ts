import type { RefObject } from "react";

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
  image: string;
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

export type RootOutletContext = {
  mainRef: RefObject<HTMLDivElement>;
  gutterRef: RefObject<HTMLDivElement>;
  columnFullRef: RefObject<HTMLDivElement>;
  columnBottomRef: RefObject<HTMLDivElement>;
  mounted: boolean;
}

export type Position = { 
  bottom?: number;
  top?: number;
  left?: number;
  right?: number;
}