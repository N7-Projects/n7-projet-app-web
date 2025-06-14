import { ownerType } from "./ownerType.ts";

export type VehiculeType = {
  id: number;
  duration: string;
  vehiculeType: null;
  branch: string;
  model: string;
  licensePlate: string;
  owner: ownerType;
  firstLicensePlate: Date;
};
