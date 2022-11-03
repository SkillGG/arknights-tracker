import { isSettings, Settings } from "./utils";

export type DB_UpdateToServer = {
  id: string;
  data: DB_ReadFromServer;
  type: "merge" | "upload";
};
export type DB_UpdateFromServer =
  | {
      err: string;
    }
  | { success: string };

export const isUpdateToServerData = (n: any): n is DB_UpdateToServer =>
  n.id !== undefined &&
  n.id &&
  n.data &&
  typeof n.data === "object" &&
  isPityData(n.pity) &&
  isRecData(n.rec) &&
  isSettings(n.settings);

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

const isPityData = (n: any): n is PityData =>
  n.first10s &&
  Array.isArray(n.first10s) &&
  n.no5s &&
  Array.isArray(n.no5s) &&
  n.specialPity &&
  Array.isArray(n.specialPity) &&
  n.standardPity !== undefined;

export type RecruitmentData = {
  history: string;
};

const isRecData = (n: any): n is RecruitmentData =>
  n.data.rec && typeof n.data.rec.history === "string";

export type SettingsData = Settings;

export type DB_ReadFromServer = {
  pity: PityData;
  rec: RecruitmentData;
  settings: SettingsData;
};

export type DB_LoginToServer =
  | {
      anon: false;
      name: string;
      pass: string;
    }
  | { anon: true; id: number };

type LoginSuccess = { success: number };
type LoginError = { err: string };
export type DB_LoginFromServer = LoginSuccess | LoginError;
export const isLoginSuccess = (n: DB_LoginFromServer): n is LoginSuccess =>
  (n as any).success !== undefined;

export const isLoginToServerData = (n: any): n is DB_LoginToServer =>
  n.anon !== undefined &&
  (n.anon
    ? n.id !== undefined && typeof n === "string"
    : n.name !== undefined &&
      n.pass !== undefined &&
      typeof n.name === "string" &&
      typeof n.pass === "string");

export type DB_RegisterToServer =
  | {
      anon: true;
    }
  | { anon: false; name: string; pass: string };

export type DB_RegisterFromServer = DB_LoginFromServer;

export const isRegisterToServerData = (n: any): n is DB_RegisterToServer =>
  n.anon !== undefined &&
  (n.anon ||
    (n.name !== undefined &&
      typeof n.name === "string" &&
      n.pass !== undefined &&
      typeof n.pass === "string" &&
      n.name.length > 1 &&
      n.pass.length > 1));
