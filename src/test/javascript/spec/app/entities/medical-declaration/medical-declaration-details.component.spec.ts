/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import VueRouter from 'vue-router';

import * as config from '@/shared/config/config';
import MedicalDeclarationDetailComponent from '@/entities/medical-declaration/medical-declaration-details.vue';
import MedicalDeclarationClass from '@/entities/medical-declaration/medical-declaration-details.component';
import MedicalDeclarationService from '@/entities/medical-declaration/medical-declaration.service';
import router from '@/router';

const localVue = createLocalVue();
localVue.use(VueRouter);

config.initVueApp(localVue);
const i18n = config.initI18N(localVue);
const store = config.initVueXStore(localVue);
localVue.component('font-awesome-icon', {});
localVue.component('router-link', {});

describe('Component Tests', () => {
  describe('MedicalDeclaration Management Detail Component', () => {
    let wrapper: Wrapper<MedicalDeclarationClass>;
    let comp: MedicalDeclarationClass;
    let medicalDeclarationServiceStub: SinonStubbedInstance<MedicalDeclarationService>;

    beforeEach(() => {
      medicalDeclarationServiceStub = sinon.createStubInstance<MedicalDeclarationService>(MedicalDeclarationService);

      wrapper = shallowMount<MedicalDeclarationClass>(MedicalDeclarationDetailComponent, {
        store,
        i18n,
        localVue,
        router,
        provide: { medicalDeclarationService: () => medicalDeclarationServiceStub },
      });
      comp = wrapper.vm;
    });

    describe('OnInit', () => {
      it('Should call load all on init', async () => {
        // GIVEN
        const foundMedicalDeclaration = { id: 'ABC' };
        medicalDeclarationServiceStub.find.resolves(foundMedicalDeclaration);

        // WHEN
        comp.retrieveMedicalDeclaration('ABC');
        await comp.$nextTick();

        // THEN
        expect(comp.medicalDeclaration).toBe(foundMedicalDeclaration);
      });
    });

    describe('Before route enter', () => {
      it('Should retrieve data', async () => {
        // GIVEN
        const foundMedicalDeclaration = { id: 'ABC' };
        medicalDeclarationServiceStub.find.resolves(foundMedicalDeclaration);

        // WHEN
        comp.beforeRouteEnter({ params: { medicalDeclarationId: 'ABC' } }, null, cb => cb(comp));
        await comp.$nextTick();

        // THEN
        expect(comp.medicalDeclaration).toBe(foundMedicalDeclaration);
      });
    });

    describe('Previous state', () => {
      it('Should go previous state', async () => {
        comp.previousState();
        await comp.$nextTick();

        expect(comp.$router.currentRoute.fullPath).toContain('/');
      });
    });
  });
});
