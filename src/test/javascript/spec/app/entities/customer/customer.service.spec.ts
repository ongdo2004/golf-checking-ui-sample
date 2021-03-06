/* tslint:disable max-line-length */
import axios from 'axios';
import sinon from 'sinon';
import dayjs from 'dayjs';

import { DATE_FORMAT } from '@/shared/date/filters';
import CustomerService from '@/entities/customer/customer.service';
import { Customer } from '@/shared/model/customer.model';
import { SEX } from '@/shared/model/enumerations/sex.model';
import { TravelInfomation } from '@/shared/model/enumerations/travel-infomation.model';

const error = {
  response: {
    status: null,
    data: {
      type: null,
    },
  },
};

const axiosStub = {
  get: sinon.stub(axios, 'get'),
  post: sinon.stub(axios, 'post'),
  put: sinon.stub(axios, 'put'),
  patch: sinon.stub(axios, 'patch'),
  delete: sinon.stub(axios, 'delete'),
};

describe('Service Tests', () => {
  describe('Customer Service', () => {
    let service: CustomerService;
    let elemDefault;
    let currentDate: Date;

    beforeEach(() => {
      service = new CustomerService();
      currentDate = new Date();
      elemDefault = new Customer(
        'ABC',
        'AAAAAAA',
        'AAAAAAA',
        currentDate,
        SEX.MALE,
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        TravelInfomation.AIR_FLY,
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        currentDate,
        currentDate,
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA'
      );
    });

    describe('Service methods', () => {
      it('should find an element', async () => {
        const returnedFromService = Object.assign(
          {
            birthDay: dayjs(currentDate).format(DATE_FORMAT),
            departureDate: dayjs(currentDate).format(DATE_FORMAT),
            entryDate: dayjs(currentDate).format(DATE_FORMAT),
          },
          elemDefault
        );
        axiosStub.get.resolves({ data: returnedFromService });

        return service.find('ABC').then(res => {
          expect(res).toMatchObject(elemDefault);
        });
      });

      it('should not find an element', async () => {
        axiosStub.get.rejects(error);
        return service
          .find('ABC')
          .then()
          .catch(err => {
            expect(err).toMatchObject(error);
          });
      });

      it('should create a Customer', async () => {
        const returnedFromService = Object.assign(
          {
            id: 'ABC',
            birthDay: dayjs(currentDate).format(DATE_FORMAT),
            departureDate: dayjs(currentDate).format(DATE_FORMAT),
            entryDate: dayjs(currentDate).format(DATE_FORMAT),
          },
          elemDefault
        );
        const expected = Object.assign(
          {
            birthDay: currentDate,
            departureDate: currentDate,
            entryDate: currentDate,
          },
          returnedFromService
        );

        axiosStub.post.resolves({ data: returnedFromService });
        return service.create({}).then(res => {
          expect(res).toMatchObject(expected);
        });
      });

      it('should not create a Customer', async () => {
        axiosStub.post.rejects(error);

        return service
          .create({})
          .then()
          .catch(err => {
            expect(err).toMatchObject(error);
          });
      });

      it('should update a Customer', async () => {
        const returnedFromService = Object.assign(
          {
            username: 'BBBBBB',
            fullName: 'BBBBBB',
            birthDay: dayjs(currentDate).format(DATE_FORMAT),
            sex: 'BBBBBB',
            passportNo: 'BBBBBB',
            addressContact: 'BBBBBB',
            telephoneNo: 'BBBBBB',
            email: 'BBBBBB',
            travelInfo: 'BBBBBB',
            travelInfoOther: 'BBBBBB',
            vehicleNo: 'BBBBBB',
            chairNo: 'BBBBBB',
            departureDate: dayjs(currentDate).format(DATE_FORMAT),
            entryDate: dayjs(currentDate).format(DATE_FORMAT),
            departurePlace: 'BBBBBB',
            entryPlace: 'BBBBBB',
            visitedCountryIn14Days: 'BBBBBB',
            declareForCustomerId: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            birthDay: currentDate,
            departureDate: currentDate,
            entryDate: currentDate,
          },
          returnedFromService
        );
        axiosStub.put.resolves({ data: returnedFromService });

        return service.update(expected).then(res => {
          expect(res).toMatchObject(expected);
        });
      });

      it('should not update a Customer', async () => {
        axiosStub.put.rejects(error);

        return service
          .update({})
          .then()
          .catch(err => {
            expect(err).toMatchObject(error);
          });
      });

      it('should partial update a Customer', async () => {
        const patchObject = Object.assign(
          {
            username: 'BBBBBB',
            birthDay: dayjs(currentDate).format(DATE_FORMAT),
            passportNo: 'BBBBBB',
            addressContact: 'BBBBBB',
            travelInfo: 'BBBBBB',
            departureDate: dayjs(currentDate).format(DATE_FORMAT),
            departurePlace: 'BBBBBB',
            declareForCustomerId: 'BBBBBB',
          },
          new Customer()
        );
        const returnedFromService = Object.assign(patchObject, elemDefault);

        const expected = Object.assign(
          {
            birthDay: currentDate,
            departureDate: currentDate,
            entryDate: currentDate,
          },
          returnedFromService
        );
        axiosStub.patch.resolves({ data: returnedFromService });

        return service.partialUpdate(patchObject).then(res => {
          expect(res).toMatchObject(expected);
        });
      });

      it('should not partial update a Customer', async () => {
        axiosStub.patch.rejects(error);

        return service
          .partialUpdate({})
          .then()
          .catch(err => {
            expect(err).toMatchObject(error);
          });
      });

      it('should return a list of Customer', async () => {
        const returnedFromService = Object.assign(
          {
            username: 'BBBBBB',
            fullName: 'BBBBBB',
            birthDay: dayjs(currentDate).format(DATE_FORMAT),
            sex: 'BBBBBB',
            passportNo: 'BBBBBB',
            addressContact: 'BBBBBB',
            telephoneNo: 'BBBBBB',
            email: 'BBBBBB',
            travelInfo: 'BBBBBB',
            travelInfoOther: 'BBBBBB',
            vehicleNo: 'BBBBBB',
            chairNo: 'BBBBBB',
            departureDate: dayjs(currentDate).format(DATE_FORMAT),
            entryDate: dayjs(currentDate).format(DATE_FORMAT),
            departurePlace: 'BBBBBB',
            entryPlace: 'BBBBBB',
            visitedCountryIn14Days: 'BBBBBB',
            declareForCustomerId: 'BBBBBB',
          },
          elemDefault
        );
        const expected = Object.assign(
          {
            birthDay: currentDate,
            departureDate: currentDate,
            entryDate: currentDate,
          },
          returnedFromService
        );
        axiosStub.get.resolves([returnedFromService]);
        return service.retrieve({ sort: {}, page: 0, size: 10 }).then(res => {
          expect(res).toContainEqual(expected);
        });
      });

      it('should not return a list of Customer', async () => {
        axiosStub.get.rejects(error);

        return service
          .retrieve()
          .then()
          .catch(err => {
            expect(err).toMatchObject(error);
          });
      });

      it('should delete a Customer', async () => {
        axiosStub.delete.resolves({ ok: true });
        return service.delete('ABC').then(res => {
          expect(res.ok).toBeTruthy();
        });
      });

      it('should not delete a Customer', async () => {
        axiosStub.delete.rejects(error);

        return service
          .delete('ABC')
          .then()
          .catch(err => {
            expect(err).toMatchObject(error);
          });
      });
    });
  });
});
