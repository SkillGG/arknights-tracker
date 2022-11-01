import { Settings } from "./utils";

export type DB_UpdateToServer = {};
export type DB_UpdateFromServer = {};

export type DB_ReadToServer =
  | { anon: true; id: number }
  | {
      anon: false;
      pass: string;
      name: string;
    };
export const isReadToServerData = (n: any): n is DB_ReadToServer => {
  return (
    n.anon !== undefined &&
    (n.anon ? n.id !== undefined : n.pass !== undefined && n.name !== undefined)
  );
};

export type PityData = {
  first10s: string[];
  no5s: { [key: string]: number }[];
  specialPity: { [key: string]: number }[];
  standardPity: number;
};

export type RecruitmentData = {
  history: string;
};

export type SettingsData = Settings;

export type DB_ReadFromServer = {
  pity: PityData;
  rec: RecruitmentData;
  settings: SettingsData;
};

export type DB_LoginToServer = {};
export type DB_LoginFromServer = {};

export const isLoginToServerData = (n: any): n is DB_LoginToServer => {
  return false;
};
