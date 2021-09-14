/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';

import * as config from '@/shared/config/config';
import MedicalDeclarationComponent from '@/entities/medical-declaration/medical-declaration.vue';
import MedicalDeclarationClass from '@/entities/medical-declaration/medical-declaration.component';
import MedicalDeclarationService from '@/entities/medical-declaration/medical-declaration.service';

const localVue = createLocalVue();

config.initVueApp(localVue);
const i18n = config.initI18N(localVue);
const store = config.initVueXStore(localVue);
localVue.component('font-awesome-icon', {});
localVue.component('b-badge', {});
localVue.component('jhi-sort-indicator', {});
localVue.directive('b-modal', {});
localVue.component('b-button', {});
localVue.component('router-link', {});

const bModalStub = {
  render: () => {},
  methods: {
    hide: () => {},
    show: () => {},
  },
};

describe('Component Tests', () => {
  describe('MedicalDeclaration Management Component', () => {
    let wrapper: Wrapper<MedicalDeclarationClass>;
    let comp: MedicalDeclarationClass;
    let medicalDeclarationServiceStub: SinonStubbedInstance<MedicalDeclarationService>;

    beforeEach(() => {
      medicalDeclarationServiceStub = sinon.createStubInstance<MedicalDeclarationService>(MedicalDeclarationService);
      medicalDeclarationServiceStub.retrieve.resolves({ headers: {} });

      wrapper = shallowMount<MedicalDeclarationClass>(MedicalDeclarationComponent, {
        store,
        i18n,
        localVue,
        stubs: { jhiItemCount: true, bPagination: true, bModal: bModalStub as any },
        provide: {
          medicalDeclarationService: () => medicalDeclarationServiceStub,
        },
      });
      comp = wrapper.vm;
    });

    it('Should call load all on init', async () => {
      // GIVEN
      medicalDeclarationServiceStub.retrieve.resolves({ headers: {}, data: [{ id: 'ABC' }] });

      // WHEN
      comp.retrieveAllMedicalDeclarations();
      await comp.$nextTick();

      // THEN
      expect(medicalDeclarationServiceStub.retrieve.called).toBeTruthy();
      expect(comp.medicalDeclarations[0]).toEqual(expect.objectContaining({ id: 'ABC' }));
    });

    it('should load a page', async () => {
      // GIVEN
      medicalDeclarationServiceStub.retrieve.resolves({ headers: {}, data: [{ id: 'ABC' }] });
      comp.previousPage = 1;

      // WHEN
      comp.loadPage(2);
      await comp.$nextTick();

      // THEN
      expect(medicalDeclarationServiceStub.retrieve.called).toBeTruthy();
      expect(comp.medicalDeclarations[0]).toEqual(expect.objectContaining({ id: 'ABC' }));
    });

    it('should re-initialize the page', async () => {
      // GIVEN
      medicalDeclarationServiceStub.retrieve.reset();
      medicalDeclarationServiceStub.retrieve.resolves({ headers: {}, data: [{ id: 'ABC' }] });

      // WHEN
      comp.loadPage(2);
      await comp.$nextTick();
      comp.clear();
      await comp.$nextTick();

      // THEN
      expect(medicalDeclarationServiceStub.retrieve.callCount).toEqual(2);
      expect(comp.page).toEqual(1);
      expect(comp.medicalDeclarations[0]).toEqual(expect.objectContaining({ id: 'ABC' }));
    });

    it('should calculate the sort attribute for an id', () => {
      // WHEN
      const result = comp.sort();

      // THEN
      expect(result).toEqual(['id,asc']);
    });

    it('should calculate the sort attribute for a non-id attribute', () => {
      // GIVEN
      comp.propOrder = 'name';

      // WHEN
      const result = comp.sort();

      // THEN
      expect(result).toEqual(['name,asc', 'id']);
    });
    it('Should call delete service on confirmDelete', async () => {
      // GIVEN
      medicalDeclarationServiceStub.delete.resolves({});

      // WHEN
      comp.prepareRemove({ id: 'ABC' });
      comp.removeMedicalDeclaration();
      await comp.$nextTick();

      // THEN
      expect(medicalDeclarationServiceStub.delete.called).toBeTruthy();
      expect(medicalDeclarationServiceStub.retrieve.callCount).toEqual(1);
    });
  });
});
