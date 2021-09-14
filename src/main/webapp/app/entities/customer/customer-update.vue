<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <form name="editForm" role="form" novalidate v-on:submit.prevent="save()">
        <h2
          id="golfCheckingUiApp.customer.home.createOrEditLabel"
          data-cy="CustomerCreateUpdateHeading"
          v-text="$t('golfCheckingUiApp.customer.home.createOrEditLabel')"
        >
          Create or edit a Customer
        </h2>
        <div>
          <div class="form-group" v-if="customer.id">
            <label for="id" v-text="$t('global.field.id')">ID</label>
            <input type="text" class="form-control" id="id" name="id" v-model="customer.id" readonly />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('golfCheckingUiApp.customer.username')" for="customer-username">Username</label>
            <input
              type="text"
              class="form-control"
              name="username"
              id="customer-username"
              data-cy="username"
              :class="{ valid: !$v.customer.username.$invalid, invalid: $v.customer.username.$invalid }"
              v-model="$v.customer.username.$model"
              required
            />
            <div v-if="$v.customer.username.$anyDirty && $v.customer.username.$invalid">
              <small class="form-text text-danger" v-if="!$v.customer.username.required" v-text="$t('entity.validation.required')">
                This field is required.
              </small>
              <small
                class="form-text text-danger"
                v-if="!$v.customer.username.maxLength"
                v-text="$t('entity.validation.maxlength', { max: 50 })"
              >
                This field cannot be longer than 50 characters.
              </small>
            </div>
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('golfCheckingUiApp.customer.fullName')" for="customer-fullName">Full Name</label>
            <input
              type="text"
              class="form-control"
              name="fullName"
              id="customer-fullName"
              data-cy="fullName"
              :class="{ valid: !$v.customer.fullName.$invalid, invalid: $v.customer.fullName.$invalid }"
              v-model="$v.customer.fullName.$model"
              required
            />
            <div v-if="$v.customer.fullName.$anyDirty && $v.customer.fullName.$invalid">
              <small class="form-text text-danger" v-if="!$v.customer.fullName.required" v-text="$t('entity.validation.required')">
                This field is required.
              </small>
              <small
                class="form-text text-danger"
                v-if="!$v.customer.fullName.maxLength"
                v-text="$t('entity.validation.maxlength', { max: 100 })"
              >
                This field cannot be longer than 100 characters.
              </small>
            </div>
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('golfCheckingUiApp.customer.birthDay')" for="customer-birthDay">Birth Day</label>
            <b-input-group class="mb-3">
              <b-input-group-prepend>
                <b-form-datepicker
                  aria-controls="customer-birthDay"
                  v-model="$v.customer.birthDay.$model"
                  name="birthDay"
                  class="form-control"
                  :locale="currentLanguage"
                  button-only
                  today-button
                  reset-button
                  close-button
                >
                </b-form-datepicker>
              </b-input-group-prepend>
              <b-form-input
                id="customer-birthDay"
                data-cy="birthDay"
                type="text"
                class="form-control"
                name="birthDay"
                :class="{ valid: !$v.customer.birthDay.$invalid, invalid: $v.customer.birthDay.$invalid }"
                v-model="$v.customer.birthDay.$model"
                required
              />
            </b-input-group>
            <div v-if="$v.customer.birthDay.$anyDirty && $v.customer.birthDay.$invalid">
              <small class="form-text text-danger" v-if="!$v.customer.birthDay.required" v-text="$t('entity.validation.required')">
                This field is required.
              </small>
            </div>
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('golfCheckingUiApp.customer.sex')" for="customer-sex">Sex</label>
            <select
              class="form-control"
              name="sex"
              :class="{ valid: !$v.customer.sex.$invalid, invalid: $v.customer.sex.$invalid }"
              v-model="$v.customer.sex.$model"
              id="customer-sex"
              data-cy="sex"
              required
            >
              <option value="MALE" v-bind:label="$t('golfCheckingUiApp.SEX.MALE')">MALE</option>
              <option value="FEMALE" v-bind:label="$t('golfCheckingUiApp.SEX.FEMALE')">FEMALE</option>
              <option value="UNKNOWN" v-bind:label="$t('golfCheckingUiApp.SEX.UNKNOWN')">UNKNOWN</option>
            </select>
            <div v-if="$v.customer.sex.$anyDirty && $v.customer.sex.$invalid">
              <small class="form-text text-danger" v-if="!$v.customer.sex.required" v-text="$t('entity.validation.required')">
                This field is required.
              </small>
            </div>
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('golfCheckingUiApp.customer.passportNo')" for="customer-passportNo"
              >Passport No</label
            >
            <input
              type="text"
              class="form-control"
              name="passportNo"
              id="customer-passportNo"
              data-cy="passportNo"
              :class="{ valid: !$v.customer.passportNo.$invalid, invalid: $v.customer.passportNo.$invalid }"
              v-model="$v.customer.passportNo.$model"
              required
            />
            <div v-if="$v.customer.passportNo.$anyDirty && $v.customer.passportNo.$invalid">
              <small class="form-text text-danger" v-if="!$v.customer.passportNo.required" v-text="$t('entity.validation.required')">
                This field is required.
              </small>
              <small
                class="form-text text-danger"
                v-if="!$v.customer.passportNo.maxLength"
                v-text="$t('entity.validation.maxlength', { max: 100 })"
              >
                This field cannot be longer than 100 characters.
              </small>
            </div>
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('golfCheckingUiApp.customer.addressContact')" for="customer-addressContact"
              >Address Contact</label
            >
            <input
              type="text"
              class="form-control"
              name="addressContact"
              id="customer-addressContact"
              data-cy="addressContact"
              :class="{ valid: !$v.customer.addressContact.$invalid, invalid: $v.customer.addressContact.$invalid }"
              v-model="$v.customer.addressContact.$model"
              required
            />
            <div v-if="$v.customer.addressContact.$anyDirty && $v.customer.addressContact.$invalid">
              <small class="form-text text-danger" v-if="!$v.customer.addressContact.required" v-text="$t('entity.validation.required')">
                This field is required.
              </small>
              <small
                class="form-text text-danger"
                v-if="!$v.customer.addressContact.maxLength"
                v-text="$t('entity.validation.maxlength', { max: 500 })"
              >
                This field cannot be longer than 500 characters.
              </small>
            </div>
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('golfCheckingUiApp.customer.telephoneNo')" for="customer-telephoneNo"
              >Telephone No</label
            >
            <input
              type="text"
              class="form-control"
              name="telephoneNo"
              id="customer-telephoneNo"
              data-cy="telephoneNo"
              :class="{ valid: !$v.customer.telephoneNo.$invalid, invalid: $v.customer.telephoneNo.$invalid }"
              v-model="$v.customer.telephoneNo.$model"
              required
            />
            <div v-if="$v.customer.telephoneNo.$anyDirty && $v.customer.telephoneNo.$invalid">
              <small class="form-text text-danger" v-if="!$v.customer.telephoneNo.required" v-text="$t('entity.validation.required')">
                This field is required.
              </small>
              <small
                class="form-text text-danger"
                v-if="!$v.customer.telephoneNo.maxLength"
                v-text="$t('entity.validation.maxlength', { max: 50 })"
              >
                This field cannot be longer than 50 characters.
              </small>
            </div>
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('golfCheckingUiApp.customer.email')" for="customer-email">Email</label>
            <input
              type="text"
              class="form-control"
              name="email"
              id="customer-email"
              data-cy="email"
              :class="{ valid: !$v.customer.email.$invalid, invalid: $v.customer.email.$invalid }"
              v-model="$v.customer.email.$model"
              required
            />
            <div v-if="$v.customer.email.$anyDirty && $v.customer.email.$invalid">
              <small class="form-text text-danger" v-if="!$v.customer.email.required" v-text="$t('entity.validation.required')">
                This field is required.
              </small>
              <small
                class="form-text text-danger"
                v-if="!$v.customer.email.maxLength"
                v-text="$t('entity.validation.maxlength', { max: 100 })"
              >
                This field cannot be longer than 100 characters.
              </small>
            </div>
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('golfCheckingUiApp.customer.travelInfo')" for="customer-travelInfo"
              >Travel Info</label
            >
            <select
              class="form-control"
              name="travelInfo"
              :class="{ valid: !$v.customer.travelInfo.$invalid, invalid: $v.customer.travelInfo.$invalid }"
              v-model="$v.customer.travelInfo.$model"
              id="customer-travelInfo"
              data-cy="travelInfo"
              required
            >
              <option value="AIR_FLY" v-bind:label="$t('golfCheckingUiApp.TravelInfomation.AIR_FLY')">AIR_FLY</option>
              <option value="SHIP" v-bind:label="$t('golfCheckingUiApp.TravelInfomation.SHIP')">SHIP</option>
              <option value="CAR" v-bind:label="$t('golfCheckingUiApp.TravelInfomation.CAR')">CAR</option>
              <option value="OTHER" v-bind:label="$t('golfCheckingUiApp.TravelInfomation.OTHER')">OTHER</option>
            </select>
            <div v-if="$v.customer.travelInfo.$anyDirty && $v.customer.travelInfo.$invalid">
              <small class="form-text text-danger" v-if="!$v.customer.travelInfo.required" v-text="$t('entity.validation.required')">
                This field is required.
              </small>
            </div>
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('golfCheckingUiApp.customer.travelInfoOther')" for="customer-travelInfoOther"
              >Travel Info Other</label
            >
            <input
              type="text"
              class="form-control"
              name="travelInfoOther"
              id="customer-travelInfoOther"
              data-cy="travelInfoOther"
              :class="{ valid: !$v.customer.travelInfoOther.$invalid, invalid: $v.customer.travelInfoOther.$invalid }"
              v-model="$v.customer.travelInfoOther.$model"
            />
            <div v-if="$v.customer.travelInfoOther.$anyDirty && $v.customer.travelInfoOther.$invalid">
              <small
                class="form-text text-danger"
                v-if="!$v.customer.travelInfoOther.maxLength"
                v-text="$t('entity.validation.maxlength', { max: 500 })"
              >
                This field cannot be longer than 500 characters.
              </small>
            </div>
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('golfCheckingUiApp.customer.vehicleNo')" for="customer-vehicleNo"
              >Vehicle No</label
            >
            <input
              type="text"
              class="form-control"
              name="vehicleNo"
              id="customer-vehicleNo"
              data-cy="vehicleNo"
              :class="{ valid: !$v.customer.vehicleNo.$invalid, invalid: $v.customer.vehicleNo.$invalid }"
              v-model="$v.customer.vehicleNo.$model"
              required
            />
            <div v-if="$v.customer.vehicleNo.$anyDirty && $v.customer.vehicleNo.$invalid">
              <small class="form-text text-danger" v-if="!$v.customer.vehicleNo.required" v-text="$t('entity.validation.required')">
                This field is required.
              </small>
              <small
                class="form-text text-danger"
                v-if="!$v.customer.vehicleNo.maxLength"
                v-text="$t('entity.validation.maxlength', { max: 500 })"
              >
                This field cannot be longer than 500 characters.
              </small>
            </div>
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('golfCheckingUiApp.customer.chairNo')" for="customer-chairNo">Chair No</label>
            <input
              type="text"
              class="form-control"
              name="chairNo"
              id="customer-chairNo"
              data-cy="chairNo"
              :class="{ valid: !$v.customer.chairNo.$invalid, invalid: $v.customer.chairNo.$invalid }"
              v-model="$v.customer.chairNo.$model"
            />
            <div v-if="$v.customer.chairNo.$anyDirty && $v.customer.chairNo.$invalid">
              <small
                class="form-text text-danger"
                v-if="!$v.customer.chairNo.maxLength"
                v-text="$t('entity.validation.maxlength', { max: 500 })"
              >
                This field cannot be longer than 500 characters.
              </small>
            </div>
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('golfCheckingUiApp.customer.departureDate')" for="customer-departureDate"
              >Departure Date</label
            >
            <b-input-group class="mb-3">
              <b-input-group-prepend>
                <b-form-datepicker
                  aria-controls="customer-departureDate"
                  v-model="$v.customer.departureDate.$model"
                  name="departureDate"
                  class="form-control"
                  :locale="currentLanguage"
                  button-only
                  today-button
                  reset-button
                  close-button
                >
                </b-form-datepicker>
              </b-input-group-prepend>
              <b-form-input
                id="customer-departureDate"
                data-cy="departureDate"
                type="text"
                class="form-control"
                name="departureDate"
                :class="{ valid: !$v.customer.departureDate.$invalid, invalid: $v.customer.departureDate.$invalid }"
                v-model="$v.customer.departureDate.$model"
                required
              />
            </b-input-group>
            <div v-if="$v.customer.departureDate.$anyDirty && $v.customer.departureDate.$invalid">
              <small class="form-text text-danger" v-if="!$v.customer.departureDate.required" v-text="$t('entity.validation.required')">
                This field is required.
              </small>
            </div>
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('golfCheckingUiApp.customer.entryDate')" for="customer-entryDate"
              >Entry Date</label
            >
            <b-input-group class="mb-3">
              <b-input-group-prepend>
                <b-form-datepicker
                  aria-controls="customer-entryDate"
                  v-model="$v.customer.entryDate.$model"
                  name="entryDate"
                  class="form-control"
                  :locale="currentLanguage"
                  button-only
                  today-button
                  reset-button
                  close-button
                >
                </b-form-datepicker>
              </b-input-group-prepend>
              <b-form-input
                id="customer-entryDate"
                data-cy="entryDate"
                type="text"
                class="form-control"
                name="entryDate"
                :class="{ valid: !$v.customer.entryDate.$invalid, invalid: $v.customer.entryDate.$invalid }"
                v-model="$v.customer.entryDate.$model"
                required
              />
            </b-input-group>
            <div v-if="$v.customer.entryDate.$anyDirty && $v.customer.entryDate.$invalid">
              <small class="form-text text-danger" v-if="!$v.customer.entryDate.required" v-text="$t('entity.validation.required')">
                This field is required.
              </small>
            </div>
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('golfCheckingUiApp.customer.departurePlace')" for="customer-departurePlace"
              >Departure Place</label
            >
            <input
              type="text"
              class="form-control"
              name="departurePlace"
              id="customer-departurePlace"
              data-cy="departurePlace"
              :class="{ valid: !$v.customer.departurePlace.$invalid, invalid: $v.customer.departurePlace.$invalid }"
              v-model="$v.customer.departurePlace.$model"
            />
            <div v-if="$v.customer.departurePlace.$anyDirty && $v.customer.departurePlace.$invalid">
              <small
                class="form-text text-danger"
                v-if="!$v.customer.departurePlace.maxLength"
                v-text="$t('entity.validation.maxlength', { max: 500 })"
              >
                This field cannot be longer than 500 characters.
              </small>
            </div>
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('golfCheckingUiApp.customer.entryPlace')" for="customer-entryPlace"
              >Entry Place</label
            >
            <input
              type="text"
              class="form-control"
              name="entryPlace"
              id="customer-entryPlace"
              data-cy="entryPlace"
              :class="{ valid: !$v.customer.entryPlace.$invalid, invalid: $v.customer.entryPlace.$invalid }"
              v-model="$v.customer.entryPlace.$model"
            />
            <div v-if="$v.customer.entryPlace.$anyDirty && $v.customer.entryPlace.$invalid">
              <small
                class="form-text text-danger"
                v-if="!$v.customer.entryPlace.maxLength"
                v-text="$t('entity.validation.maxlength', { max: 500 })"
              >
                This field cannot be longer than 500 characters.
              </small>
            </div>
          </div>
          <div class="form-group">
            <label
              class="form-control-label"
              v-text="$t('golfCheckingUiApp.customer.visitedCountryIn14Days')"
              for="customer-visitedCountryIn14Days"
              >Visited Country In 14 Days</label
            >
            <input
              type="text"
              class="form-control"
              name="visitedCountryIn14Days"
              id="customer-visitedCountryIn14Days"
              data-cy="visitedCountryIn14Days"
              :class="{ valid: !$v.customer.visitedCountryIn14Days.$invalid, invalid: $v.customer.visitedCountryIn14Days.$invalid }"
              v-model="$v.customer.visitedCountryIn14Days.$model"
            />
            <div v-if="$v.customer.visitedCountryIn14Days.$anyDirty && $v.customer.visitedCountryIn14Days.$invalid">
              <small
                class="form-text text-danger"
                v-if="!$v.customer.visitedCountryIn14Days.maxLength"
                v-text="$t('entity.validation.maxlength', { max: 50 })"
              >
                This field cannot be longer than 50 characters.
              </small>
            </div>
          </div>
          <div class="form-group">
            <label
              class="form-control-label"
              v-text="$t('golfCheckingUiApp.customer.declareForCustomerId')"
              for="customer-declareForCustomerId"
              >Declare For Customer Id</label
            >
            <input
              type="text"
              class="form-control"
              name="declareForCustomerId"
              id="customer-declareForCustomerId"
              data-cy="declareForCustomerId"
              :class="{ valid: !$v.customer.declareForCustomerId.$invalid, invalid: $v.customer.declareForCustomerId.$invalid }"
              v-model="$v.customer.declareForCustomerId.$model"
              required
            />
            <div v-if="$v.customer.declareForCustomerId.$anyDirty && $v.customer.declareForCustomerId.$invalid">
              <small
                class="form-text text-danger"
                v-if="!$v.customer.declareForCustomerId.required"
                v-text="$t('entity.validation.required')"
              >
                This field is required.
              </small>
              <small
                class="form-text text-danger"
                v-if="!$v.customer.declareForCustomerId.maxLength"
                v-text="$t('entity.validation.maxlength', { max: 50 })"
              >
                This field cannot be longer than 50 characters.
              </small>
            </div>
          </div>
        </div>
        <div>
          <button type="button" id="cancel-save" data-cy="entityCreateCancelButton" class="btn btn-secondary" v-on:click="previousState()">
            <font-awesome-icon icon="ban"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.cancel')">Cancel</span>
          </button>
          <button
            type="submit"
            id="save-entity"
            data-cy="entityCreateSaveButton"
            :disabled="$v.customer.$invalid || isSaving"
            class="btn btn-primary"
          >
            <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.save')">Save</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script lang="ts" src="./customer-update.component.ts"></script>
