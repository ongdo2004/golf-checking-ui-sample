import { Component, Vue, Inject } from 'vue-property-decorator';

import { IMedicalDeclaration } from '@/shared/model/medical-declaration.model';
import MedicalDeclarationService from './medical-declaration.service';

@Component
export default class MedicalDeclarationDetails extends Vue {
  @Inject('medicalDeclarationService') private medicalDeclarationService: () => MedicalDeclarationService;
  public medicalDeclaration: IMedicalDeclaration = {};

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.medicalDeclarationId) {
        vm.retrieveMedicalDeclaration(to.params.medicalDeclarationId);
      }
    });
  }

  public retrieveMedicalDeclaration(medicalDeclarationId) {
    this.medicalDeclarationService()
      .find(medicalDeclarationId)
      .then(res => {
        this.medicalDeclaration = res;
      });
  }

  public previousState() {
    this.$router.go(-1);
  }
}
