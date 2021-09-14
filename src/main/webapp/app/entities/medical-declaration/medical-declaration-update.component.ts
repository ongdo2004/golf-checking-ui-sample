import { Component, Vue, Inject } from 'vue-property-decorator';

import { required, maxLength } from 'vuelidate/lib/validators';
import dayjs from 'dayjs';
import { DATE_TIME_LONG_FORMAT } from '@/shared/date/filters';

import { IMedicalDeclaration, MedicalDeclaration } from '@/shared/model/medical-declaration.model';
import MedicalDeclarationService from './medical-declaration.service';

const validations: any = {
  medicalDeclaration: {
    departureDate: {
      required,
    },
    travelInfo: {
      required,
    },
    travelInfoOther: {
      maxLength: maxLength(500),
    },
    vehicleNo: {
      required,
      maxLength: maxLength(500),
    },
    chairNo: {
      maxLength: maxLength(500),
    },
    entryDate: {
      required,
    },
    departurePlace: {
      maxLength: maxLength(500),
    },
    entryPlace: {
      maxLength: maxLength(500),
    },
    visitedCountryIn14Days: {
      maxLength: maxLength(50),
    },
    addressContact: {
      required,
      maxLength: maxLength(500),
    },
    declareForCustomerId: {
      required,
      maxLength: maxLength(50),
    },
    checkInTime: {},
  },
};

@Component({
  validations,
})
export default class MedicalDeclarationUpdate extends Vue {
  @Inject('medicalDeclarationService') private medicalDeclarationService: () => MedicalDeclarationService;
  public medicalDeclaration: IMedicalDeclaration = new MedicalDeclaration();
  public isSaving = false;
  public currentLanguage = '';

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.medicalDeclarationId) {
        vm.retrieveMedicalDeclaration(to.params.medicalDeclarationId);
      }
    });
  }

  created(): void {
    this.currentLanguage = this.$store.getters.currentLanguage;
    this.$store.watch(
      () => this.$store.getters.currentLanguage,
      () => {
        this.currentLanguage = this.$store.getters.currentLanguage;
      }
    );
  }

  public save(): void {
    this.isSaving = true;
    if (this.medicalDeclaration.id) {
      this.medicalDeclarationService()
        .update(this.medicalDeclaration)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('golfCheckingUiApp.medicalDeclaration.updated', { param: param.id });
          return this.$root.$bvToast.toast(message.toString(), {
            toaster: 'b-toaster-top-center',
            title: 'Info',
            variant: 'info',
            solid: true,
            autoHideDelay: 5000,
          });
        });
    } else {
      this.medicalDeclarationService()
        .create(this.medicalDeclaration)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('golfCheckingUiApp.medicalDeclaration.created', { param: param.id });
          this.$root.$bvToast.toast(message.toString(), {
            toaster: 'b-toaster-top-center',
            title: 'Success',
            variant: 'success',
            solid: true,
            autoHideDelay: 5000,
          });
        });
    }
  }

  public convertDateTimeFromServer(date: Date): string {
    if (date && dayjs(date).isValid()) {
      return dayjs(date).format(DATE_TIME_LONG_FORMAT);
    }
    return null;
  }

  public updateInstantField(field, event) {
    if (event.target.value) {
      this.medicalDeclaration[field] = dayjs(event.target.value, DATE_TIME_LONG_FORMAT);
    } else {
      this.medicalDeclaration[field] = null;
    }
  }

  public updateZonedDateTimeField(field, event) {
    if (event.target.value) {
      this.medicalDeclaration[field] = dayjs(event.target.value, DATE_TIME_LONG_FORMAT);
    } else {
      this.medicalDeclaration[field] = null;
    }
  }

  public retrieveMedicalDeclaration(medicalDeclarationId): void {
    this.medicalDeclarationService()
      .find(medicalDeclarationId)
      .then(res => {
        res.checkInTime = new Date(res.checkInTime);
        this.medicalDeclaration = res;
      });
  }

  public previousState(): void {
    this.$router.go(-1);
  }

  public initRelationships(): void {}
}
