import { TravelInfomation } from '@/shared/model/enumerations/travel-infomation.model';
export interface IMedicalDeclaration {
  id?: string;
  departureDate?: Date;
  travelInfo?: TravelInfomation;
  travelInfoOther?: string | null;
  vehicleNo?: string;
  chairNo?: string | null;
  entryDate?: Date;
  departurePlace?: string | null;
  entryPlace?: string | null;
  visitedCountryIn14Days?: string | null;
  addressContact?: string;
  declareForCustomerId?: string;
  checkInTime?: Date | null;
}

export class MedicalDeclaration implements IMedicalDeclaration {
  constructor(
    public id?: string,
    public departureDate?: Date,
    public travelInfo?: TravelInfomation,
    public travelInfoOther?: string | null,
    public vehicleNo?: string,
    public chairNo?: string | null,
    public entryDate?: Date,
    public departurePlace?: string | null,
    public entryPlace?: string | null,
    public visitedCountryIn14Days?: string | null,
    public addressContact?: string,
    public declareForCustomerId?: string,
    public checkInTime?: Date | null
  ) {}
}
