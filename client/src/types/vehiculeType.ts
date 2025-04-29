import { ownerType } from "./ownerType.ts";

export type vehiculeType = {
  id: number;
  duration: string;
  vehiculeType: null;
  branch: string;
  model: string;
  licensePlate: string;
  owner: ownerType;
  firstLicensePlate: Date;
};
