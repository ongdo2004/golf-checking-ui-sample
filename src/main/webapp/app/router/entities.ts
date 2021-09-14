import { Authority } from '@/shared/security/authority';
/* tslint:disable */
// prettier-ignore

// prettier-ignore
const Customer = () => import('@/entities/customer/customer.vue');
// prettier-ignore
const CustomerUpdate = () => import('@/entities/customer/customer-update.vue');
// prettier-ignore
const CustomerDetails = () => import('@/entities/customer/customer-details.vue');
// prettier-ignore
const MedicalDeclaration = () => import('@/entities/medical-declaration/medical-declaration.vue');
// prettier-ignore
const MedicalDeclarationUpdate = () => import('@/entities/medical-declaration/medical-declaration-update.vue');
// prettier-ignore
const MedicalDeclarationDetails = () => import('@/entities/medical-declaration/medical-declaration-details.vue');
// jhipster-needle-add-entity-to-router-import - JHipster will import entities to the router here

export default [
  {
    path: '/customer',
    name: 'Customer',
    component: Customer,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/customer/new',
    name: 'CustomerCreate',
    component: CustomerUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/customer/:customerId/edit',
    name: 'CustomerEdit',
    component: CustomerUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/customer/:customerId/view',
    name: 'CustomerView',
    component: CustomerDetails,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/medical-declaration',
    name: 'MedicalDeclaration',
    component: MedicalDeclaration,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/medical-declaration/new',
    name: 'MedicalDeclarationCreate',
    component: MedicalDeclarationUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/medical-declaration/:medicalDeclarationId/edit',
    name: 'MedicalDeclarationEdit',
    component: MedicalDeclarationUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/medical-declaration/:medicalDeclarationId/view',
    name: 'MedicalDeclarationView',
    component: MedicalDeclarationDetails,
    meta: { authorities: [Authority.USER] },
  },
  // jhipster-needle-add-entity-to-router - JHipster will add entities to the router here
];
