<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <form name="editForm" role="form" novalidate v-on:submit.prevent="save()">
        <h2
          id="golfCheckingUiApp.medicalDeclaration.home.createOrEditLabel"
          data-cy="MedicalDeclarationCreateUpdateHeading"
          v-text="$t('golfCheckingUiApp.medicalDeclaration.home.createOrEditLabel')"
        >
          Create or edit a MedicalDeclaration
        </h2>
        <div>
          <div class="form-group" v-if="medicalDeclaration.id">
            <label for="id" v-text="$t('global.field.id')">ID</label>
            <input type="text" class="form-control" id="id" name="id" v-model="medicalDeclaration.id" readonly />
          </div>
          <div class="form-group">
            <label
              class="form-control-label"
              v-text="$t('golfCheckingUiApp.medicalDeclaration.departureDate')"
              for="medical-declaration-departureDate"
              >Departure Date</label
            >
            <b-input-group class="mb-3">
              <b-input-group-prepend>
                <b-form-datepicker
                  aria-controls="medical-declaration-departureDate"
                  v-model="$v.medicalDeclaration.departureDate.$model"
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
                id="medical-declaration-departureDate"
                data-cy="departureDate"
                type="text"
                class="form-control"
                name="departureDate"
                :class="{ valid: !$v.medicalDeclaration.departureDate.$invalid, invalid: $v.medicalDeclaration.departureDate.$invalid }"
                v-model="$v.medicalDeclaration.departureDate.$model"
                required
              />
            </b-input-group>
            <div v-if="$v.medicalDeclaration.departureDate.$anyDirty && $v.medicalDeclaration.departureDate.$invalid">
              <small
                class="form-text text-danger"
                v-if="!$v.medicalDeclaration.departureDate.required"
                v-text="$t('entity.validation.required')"
              >
                This field is required.
              </small>
            </div>
          </div>
          <div class="form-group">
            <label
              class="form-control-label"
              v-text="$t('golfCheckingUiApp.medicalDeclaration.travelInfo')"
              for="medical-declaration-travelInfo"
              >Travel Info</label
            >
            <select
              class="form-control"
              name="travelInfo"
              :class="{ valid: !$v.medicalDeclaration.travelInfo.$invalid, invalid: $v.medicalDeclaration.travelInfo.$invalid }"
              v-model="$v.medicalDeclaration.travelInfo.$model"
              id="medical-declaration-travelInfo"
              data-cy="travelInfo"
              required
            >
              <option value="AIR_FLY" v-bind:label="$t('golfCheckingUiApp.TravelInfomation.AIR_FLY')">AIR_FLY</option>
              <option value="SHIP" v-bind:label="$t('golfCheckingUiApp.TravelInfomation.SHIP')">SHIP</option>
              <option value="CAR" v-bind:label="$t('golfCheckingUiApp.TravelInfomation.CAR')">CAR</option>
              <option value="OTHER" v-bind:label="$t('golfCheckingUiApp.TravelInfomation.OTHER')">OTHER</option>
            </select>
            <div v-if="$v.medicalDeclaration.travelInfo.$anyDirty && $v.medicalDeclaration.travelInfo.$invalid">
              <small
                class="form-text text-danger"
                v-if="!$v.medicalDeclaration.travelInfo.required"
                v-text="$t('entity.validation.required')"
              >
                This field is required.
              </small>
            </div>
          </div>
          <div class="form-group">
            <label
              class="form-control-label"
              v-text="$t('golfCheckingUiApp.medicalDeclaration.travelInfoOther')"
              for="medical-declaration-travelInfoOther"
              >Travel Info Other</label
            >
            <input
              type="text"
              class="form-control"
              name="travelInfoOther"
              id="medical-declaration-travelInfoOther"
              data-cy="travelInfoOther"
              :class="{ valid: !$v.medicalDeclaration.travelInfoOther.$invalid, invalid: $v.medicalDeclaration.travelInfoOther.$invalid }"
              v-model="$v.medicalDeclaration.travelInfoOther.$model"
            />
            <div v-if="$v.medicalDeclaration.travelInfoOther.$anyDirty && $v.medicalDeclaration.travelInfoOther.$invalid">
              <small
                class="form-text text-danger"
                v-if="!$v.medicalDeclaration.travelInfoOther.maxLength"
                v-text="$t('entity.validation.maxlength', { max: 500 })"
              >
                This field cannot be longer than 500 characters.
              </small>
            </div>
          </div>
          <div class="form-group">
            <label
              class="form-control-label"
              v-text="$t('golfCheckingUiApp.medicalDeclaration.vehicleNo')"
              for="medical-declaration-vehicleNo"
              >Vehicle No</label
            >
            <input
              type="text"
              class="form-control"
              name="vehicleNo"
              id="medical-declaration-vehicleNo"
              data-cy="vehicleNo"
              :class="{ valid: !$v.medicalDeclaration.vehicleNo.$invalid, invalid: $v.medicalDeclaration.vehicleNo.$invalid }"
              v-model="$v.medicalDeclaration.vehicleNo.$model"
              required
            />
            <div v-if="$v.medicalDeclaration.vehicleNo.$anyDirty && $v.medicalDeclaration.vehicleNo.$invalid">
              <small
                class="form-text text-danger"
                v-if="!$v.medicalDeclaration.vehicleNo.required"
                v-text="$t('entity.validation.required')"
              >
                This field is required.
              </small>
              <small
                class="form-text text-danger"
                v-if="!$v.medicalDeclaration.vehicleNo.maxLength"
                v-text="$t('entity.validation.maxlength', { max: 500 })"
              >
                This field cannot be longer than 500 characters.
              </small>
            </div>
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('golfCheckingUiApp.medicalDeclaration.chairNo')" for="medical-declaration-chairNo"
              >Chair No</label
            >
            <input
              type="text"
              class="form-control"
              name="chairNo"
              id="medical-declaration-chairNo"
              data-cy="chairNo"
              :class="{ valid: !$v.medicalDeclaration.chairNo.$invalid, invalid: $v.medicalDeclaration.chairNo.$invalid }"
              v-model="$v.medicalDeclaration.chairNo.$model"
            />
            <div v-if="$v.medicalDeclaration.chairNo.$anyDirty && $v.medicalDeclaration.chairNo.$invalid">
              <small
                class="form-text text-danger"
                v-if="!$v.medicalDeclaration.chairNo.maxLength"
                v-text="$t('entity.validation.maxlength', { max: 500 })"
              >
                This field cannot be longer than 500 characters.
              </small>
            </div>
          </div>
          <div class="form-group">
            <label
              class="form-control-label"
              v-text="$t('golfCheckingUiApp.medicalDeclaration.entryDate')"
              for="medical-declaration-entryDate"
              >Entry Date</label
            >
            <b-input-group class="mb-3">
              <b-input-group-prepend>
                <b-form-datepicker
                  aria-controls="medical-declaration-entryDate"
                  v-model="$v.medicalDeclaration.entryDate.$model"
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
                id="medical-declaration-entryDate"
                data-cy="entryDate"
                type="text"
                class="form-control"
                name="entryDate"
                :class="{ valid: !$v.medicalDeclaration.entryDate.$invalid, invalid: $v.medicalDeclaration.entryDate.$invalid }"
                v-model="$v.medicalDeclaration.entryDate.$model"
                required
              />
            </b-input-group>
            <div v-if="$v.medicalDeclaration.entryDate.$anyDirty && $v.medicalDeclaration.entryDate.$invalid">
              <small
                class="form-text text-danger"
                v-if="!$v.medicalDeclaration.entryDate.required"
                v-text="$t('entity.validation.required')"
              >
                This field is required.
              </small>
            </div>
          </div>
          <div class="form-group">
            <label
              class="form-control-label"
              v-text="$t('golfCheckingUiApp.medicalDeclaration.departurePlace')"
              for="medical-declaration-departurePlace"
              >Departure Place</label
            >
            <input
              type="text"
              class="form-control"
              name="departurePlace"
              id="medical-declaration-departurePlace"
              data-cy="departurePlace"
              :class="{ valid: !$v.medicalDeclaration.departurePlace.$invalid, invalid: $v.medicalDeclaration.departurePlace.$invalid }"
              v-model="$v.medicalDeclaration.departurePlace.$model"
            />
            <div v-if="$v.medicalDeclaration.departurePlace.$anyDirty && $v.medicalDeclaration.departurePlace.$invalid">
              <small
                class="form-text text-danger"
                v-if="!$v.medicalDeclaration.departurePlace.maxLength"
                v-text="$t('entity.validation.maxlength', { max: 500 })"
              >
                This field cannot be longer than 500 characters.
              </small>
            </div>
          </div>
          <div class="form-group">
            <label
              class="form-control-label"
              v-text="$t('golfCheckingUiApp.medicalDeclaration.entryPlace')"
              for="medical-declaration-entryPlace"
              >Entry Place</label
            >
            <input
              type="text"
              class="form-control"
              name="entryPlace"
              id="medical-declaration-entryPlace"
              data-cy="entryPlace"
              :class="{ valid: !$v.medicalDeclaration.entryPlace.$invalid, invalid: $v.medicalDeclaration.entryPlace.$invalid }"
              v-model="$v.medicalDeclaration.entryPlace.$model"
            />
            <div v-if="$v.medicalDeclaration.entryPlace.$anyDirty && $v.medicalDeclaration.entryPlace.$invalid">
              <small
                class="form-text text-danger"
                v-if="!$v.medicalDeclaration.entryPlace.maxLength"
                v-text="$t('entity.validation.maxlength', { max: 500 })"
              >
                This field cannot be longer than 500 characters.
              </small>
            </div>
          </div>
          <div class="form-group">
            <label
              class="form-control-label"
              v-text="$t('golfCheckingUiApp.medicalDeclaration.visitedCountryIn14Days')"
              for="medical-declaration-visitedCountryIn14Days"
              >Visited Country In 14 Days</label
            >
            <input
              type="text"
              class="form-control"
              name="visitedCountryIn14Days"
              id="medical-declaration-visitedCountryIn14Days"
              data-cy="visitedCountryIn14Days"
              :class="{
                valid: !$v.medicalDeclaration.visitedCountryIn14Days.$invalid,
                invalid: $v.medicalDeclaration.visitedCountryIn14Days.$invalid,
              }"
              v-model="$v.medicalDeclaration.visitedCountryIn14Days.$model"
            />
            <div v-if="$v.medicalDeclaration.visitedCountryIn14Days.$anyDirty && $v.medicalDeclaration.visitedCountryIn14Days.$invalid">
              <small
                class="form-text text-danger"
                v-if="!$v.medicalDeclaration.visitedCountryIn14Days.maxLength"
                v-text="$t('entity.validation.maxlength', { max: 50 })"
              >
                This field cannot be longer than 50 characters.
              </small>
            </div>
          </div>
          <div class="form-group">
            <label
              class="form-control-label"
              v-text="$t('golfCheckingUiApp.medicalDeclaration.addressContact')"
              for="medical-declaration-addressContact"
              >Address Contact</label
            >
            <input
              type="text"
              class="form-control"
              name="addressContact"
              id="medical-declaration-addressContact"
              data-cy="addressContact"
              :class="{ valid: !$v.medicalDeclaration.addressContact.$invalid, invalid: $v.medicalDeclaration.addressContact.$invalid }"
              v-model="$v.medicalDeclaration.addressContact.$model"
              required
            />
            <div v-if="$v.medicalDeclaration.addressContact.$anyDirty && $v.medicalDeclaration.addressContact.$invalid">
              <small
                class="form-text text-danger"
                v-if="!$v.medicalDeclaration.addressContact.required"
                v-text="$t('entity.validation.required')"
              >
                This field is required.
              </small>
              <small
                class="form-text text-danger"
                v-if="!$v.medicalDeclaration.addressContact.maxLength"
                v-text="$t('entity.validation.maxlength', { max: 500 })"
              >
                This field cannot be longer than 500 characters.
              </small>
            </div>
          </div>
          <div class="form-group">
            <label
              class="form-control-label"
              v-text="$t('golfCheckingUiApp.medicalDeclaration.declareForCustomerId')"
              for="medical-declaration-declareForCustomerId"
              >Declare For Customer Id</label
            >
            <input
              type="text"
              class="form-control"
              name="declareForCustomerId"
              id="medical-declaration-declareForCustomerId"
              data-cy="declareForCustomerId"
              :class="{
                valid: !$v.medicalDeclaration.declareForCustomerId.$invalid,
                invalid: $v.medicalDeclaration.declareForCustomerId.$invalid,
              }"
              v-model="$v.medicalDeclaration.declareForCustomerId.$model"
              required
            />
            <div v-if="$v.medicalDeclaration.declareForCustomerId.$anyDirty && $v.medicalDeclaration.declareForCustomerId.$invalid">
              <small
                class="form-text text-danger"
                v-if="!$v.medicalDeclaration.declareForCustomerId.required"
                v-text="$t('entity.validation.required')"
              >
                This field is required.
              </small>
              <small
                class="form-text text-danger"
                v-if="!$v.medicalDeclaration.declareForCustomerId.maxLength"
                v-text="$t('entity.validation.maxlength', { max: 50 })"
              >
                This field cannot be longer than 50 characters.
              </small>
            </div>
          </div>
          <div class="form-group">
            <label
              class="form-control-label"
              v-text="$t('golfCheckingUiApp.medicalDeclaration.checkInTime')"
              for="medical-declaration-checkInTime"
              >Check In Time</label
            >
            <div class="d-flex">
              <input
                id="medical-declaration-checkInTime"
                data-cy="checkInTime"
                type="datetime-local"
                class="form-control"
                name="checkInTime"
                :class="{ valid: !$v.medicalDeclaration.checkInTime.$invalid, invalid: $v.medicalDeclaration.checkInTime.$invalid }"
                :value="convertDateTimeFromServer($v.medicalDeclaration.checkInTime.$model)"
                @change="updateInstantField('checkInTime', $event)"
              />
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
            :disabled="$v.medicalDeclaration.$invalid || isSaving"
            class="btn btn-primary"
          >
            <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.save')">Save</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script lang="ts" src="./medical-declaration-update.component.ts"></script>
