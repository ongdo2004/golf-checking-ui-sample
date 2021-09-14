import { SEX } from '@/shared/model/enumerations/sex.model';
import { TravelInfomation } from '@/shared/model/enumerations/travel-infomation.model';
export interface ICustomer {
  id?: string;
  username?: string;
  fullName?: string;
  birthDay?: Date;
  sex?: SEX;
  passportNo?: string;
  addressContact?: string;
  telephoneNo?: string;
  email?: string;
  travelInfo?: TravelInfomation;
  travelInfoOther?: string | null;
  vehicleNo?: string;
  chairNo?: string | null;
  departureDate?: Date;
  entryDate?: Date;
  departurePlace?: string | null;
  entryPlace?: string | null;
  visitedCountryIn14Days?: string | null;
  declareForCustomerId?: string;
}

export class Customer implements ICustomer {
  constructor(
    public id?: string,
    public username?: string,
    public fullName?: string,
    public birthDay?: Date,
    public sex?: SEX,
    public passportNo?: string,
    public addressContact?: string,
    public telephoneNo?: string,
    public email?: string,
    public travelInfo?: TravelInfomation,
    public travelInfoOther?: string | null,
    public vehicleNo?: string,
    public chairNo?: string | null,
    public departureDate?: Date,
    public entryDate?: Date,
    public departurePlace?: string | null,
    public entryPlace?: string | null,
    public visitedCountryIn14Days?: string | null,
    public declareForCustomerId?: string
  ) {}
}
