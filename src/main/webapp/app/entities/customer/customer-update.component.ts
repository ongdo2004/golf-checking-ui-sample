import { Component, Vue, Inject } from 'vue-property-decorator';

import { required, maxLength } from 'vuelidate/lib/validators';

import { ICustomer, Customer } from '@/shared/model/customer.model';
import CustomerService from './customer.service';

const validations: any = {
  customer: {
    username: {
      required,
      maxLength: maxLength(50),
    },
    fullName: {
      required,
      maxLength: maxLength(100),
    },
    birthDay: {
      required,
    },
    sex: {
      required,
    },
    passportNo: {
      required,
      maxLength: maxLength(100),
    },
    addressContact: {
      required,
      maxLength: maxLength(500),
    },
    telephoneNo: {
      required,
      maxLength: maxLength(50),
    },
    email: {
      required,
      maxLength: maxLength(100),
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
    departureDate: {
      required,
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
    declareForCustomerId: {
      required,
      maxLength: maxLength(50),
    },
  },
};

@Component({
  validations,
})
export default class CustomerUpdate extends Vue {
  @Inject('customerService') private customerService: () => CustomerService;
  public customer: ICustomer = new Customer();
  public isSaving = false;
  public currentLanguage = '';

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.customerId) {
        vm.retrieveCustomer(to.params.customerId);
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
    if (this.customer.id) {
      this.customerService()
        .update(this.customer)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('golfCheckingUiApp.customer.updated', { param: param.id });
          return this.$root.$bvToast.toast(message.toString(), {
            toaster: 'b-toaster-top-center',
            title: 'Info',
            variant: 'info',
            solid: true,
            autoHideDelay: 5000,
          });
        });
    } else {
      this.customerService()
        .create(this.customer)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('golfCheckingUiApp.customer.created', { param: param.id });
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

  public retrieveCustomer(customerId): void {
    this.customerService()
      .find(customerId)
      .then(res => {
        this.customer = res;
      });
  }

  public previousState(): void {
    this.$router.go(-1);
  }

  public initRelationships(): void {}
}
