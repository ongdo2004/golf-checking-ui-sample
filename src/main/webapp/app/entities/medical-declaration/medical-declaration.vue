<template>
  <div>
    <h2 id="page-heading" data-cy="MedicalDeclarationHeading">
      <span v-text="$t('golfCheckingUiApp.medicalDeclaration.home.title')" id="medical-declaration-heading">Medical Declarations</span>
      <div class="d-flex justify-content-end">
        <button class="btn btn-info mr-2" v-on:click="handleSyncList" :disabled="isFetching">
          <font-awesome-icon icon="sync" :spin="isFetching"></font-awesome-icon>
          <span v-text="$t('golfCheckingUiApp.medicalDeclaration.home.refreshListLabel')">Refresh List</span>
        </button>
        <router-link :to="{ name: 'MedicalDeclarationCreate' }" custom v-slot="{ navigate }">
          <button
            @click="navigate"
            id="jh-create-entity"
            data-cy="entityCreateButton"
            class="btn btn-primary jh-create-entity create-medical-declaration"
          >
            <font-awesome-icon icon="plus"></font-awesome-icon>
            <span v-text="$t('golfCheckingUiApp.medicalDeclaration.home.createLabel')"> Create a new Medical Declaration </span>
          </button>
        </router-link>
      </div>
    </h2>
    <br />
    <div class="alert alert-warning" v-if="!isFetching && medicalDeclarations && medicalDeclarations.length === 0">
      <span v-text="$t('golfCheckingUiApp.medicalDeclaration.home.notFound')">No medicalDeclarations found</span>
    </div>
    <div class="table-responsive" v-if="medicalDeclarations && medicalDeclarations.length > 0">
      <table class="table table-striped" aria-describedby="medicalDeclarations">
        <thead>
          <tr>
            <th scope="row" v-on:click="changeOrder('id')">
              <span v-text="$t('global.field.id')">ID</span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'id'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('departureDate')">
              <span v-text="$t('golfCheckingUiApp.medicalDeclaration.departureDate')">Departure Date</span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'departureDate'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('travelInfo')">
              <span v-text="$t('golfCheckingUiApp.medicalDeclaration.travelInfo')">Travel Info</span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'travelInfo'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('travelInfoOther')">
              <span v-text="$t('golfCheckingUiApp.medicalDeclaration.travelInfoOther')">Travel Info Other</span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'travelInfoOther'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('vehicleNo')">
              <span v-text="$t('golfCheckingUiApp.medicalDeclaration.vehicleNo')">Vehicle No</span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'vehicleNo'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('chairNo')">
              <span v-text="$t('golfCheckingUiApp.medicalDeclaration.chairNo')">Chair No</span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'chairNo'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('entryDate')">
              <span v-text="$t('golfCheckingUiApp.medicalDeclaration.entryDate')">Entry Date</span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'entryDate'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('departurePlace')">
              <span v-text="$t('golfCheckingUiApp.medicalDeclaration.departurePlace')">Departure Place</span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'departurePlace'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('entryPlace')">
              <span v-text="$t('golfCheckingUiApp.medicalDeclaration.entryPlace')">Entry Place</span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'entryPlace'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('visitedCountryIn14Days')">
              <span v-text="$t('golfCheckingUiApp.medicalDeclaration.visitedCountryIn14Days')">Visited Country In 14 Days</span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'visitedCountryIn14Days'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('addressContact')">
              <span v-text="$t('golfCheckingUiApp.medicalDeclaration.addressContact')">Address Contact</span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'addressContact'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('declareForCustomerId')">
              <span v-text="$t('golfCheckingUiApp.medicalDeclaration.declareForCustomerId')">Declare For Customer Id</span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'declareForCustomerId'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('checkInTime')">
              <span v-text="$t('golfCheckingUiApp.medicalDeclaration.checkInTime')">Check In Time</span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'checkInTime'"></jhi-sort-indicator>
            </th>
            <th scope="row"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="medicalDeclaration in medicalDeclarations" :key="medicalDeclaration.id" data-cy="entityTable">
            <td>
              <router-link :to="{ name: 'MedicalDeclarationView', params: { medicalDeclarationId: medicalDeclaration.id } }">{{
                medicalDeclaration.id
              }}</router-link>
            </td>
            <td>{{ medicalDeclaration.departureDate }}</td>
            <td v-text="$t('golfCheckingUiApp.TravelInfomation.' + medicalDeclaration.travelInfo)">{{ medicalDeclaration.travelInfo }}</td>
            <td>{{ medicalDeclaration.travelInfoOther }}</td>
            <td>{{ medicalDeclaration.vehicleNo }}</td>
            <td>{{ medicalDeclaration.chairNo }}</td>
            <td>{{ medicalDeclaration.entryDate }}</td>
            <td>{{ medicalDeclaration.departurePlace }}</td>
            <td>{{ medicalDeclaration.entryPlace }}</td>
            <td>{{ medicalDeclaration.visitedCountryIn14Days }}</td>
            <td>{{ medicalDeclaration.addressContact }}</td>
            <td>{{ medicalDeclaration.declareForCustomerId }}</td>
            <td>{{ medicalDeclaration.checkInTime ? $d(Date.parse(medicalDeclaration.checkInTime), 'short') : '' }}</td>
            <td class="text-right">
              <div class="btn-group">
                <router-link
                  :to="{ name: 'MedicalDeclarationView', params: { medicalDeclarationId: medicalDeclaration.id } }"
                  custom
                  v-slot="{ navigate }"
                >
                  <button @click="navigate" class="btn btn-info btn-sm details" data-cy="entityDetailsButton">
                    <font-awesome-icon icon="eye"></font-awesome-icon>
                    <span class="d-none d-md-inline" v-text="$t('entity.action.view')">View</span>
                  </button>
                </router-link>
                <router-link
                  :to="{ name: 'MedicalDeclarationEdit', params: { medicalDeclarationId: medicalDeclaration.id } }"
                  custom
                  v-slot="{ navigate }"
                >
                  <button @click="navigate" class="btn btn-primary btn-sm edit" data-cy="entityEditButton">
                    <font-awesome-icon icon="pencil-alt"></font-awesome-icon>
                    <span class="d-none d-md-inline" v-text="$t('entity.action.edit')">Edit</span>
                  </button>
                </router-link>
                <b-button
                  v-on:click="prepareRemove(medicalDeclaration)"
                  variant="danger"
                  class="btn btn-sm"
                  data-cy="entityDeleteButton"
                  v-b-modal.removeEntity
                >
                  <font-awesome-icon icon="times"></font-awesome-icon>
                  <span class="d-none d-md-inline" v-text="$t('entity.action.delete')">Delete</span>
                </b-button>
              </div>
            </td>
          </tr>
        </tbody>
        <infinite-loading
          ref="infiniteLoading"
          v-if="totalItems > itemsPerPage"
          :identifier="infiniteId"
          slot="append"
          @infinite="loadMore"
          force-use-infinite-wrapper=".el-table__body-wrapper"
          :distance="20"
        >
        </infinite-loading>
      </table>
    </div>
    <b-modal ref="removeEntity" id="removeEntity">
      <span slot="modal-title"
        ><span
          id="golfCheckingUiApp.medicalDeclaration.delete.question"
          data-cy="medicalDeclarationDeleteDialogHeading"
          v-text="$t('entity.delete.title')"
          >Confirm delete operation</span
        ></span
      >
      <div class="modal-body">
        <p id="jhi-delete-medicalDeclaration-heading" v-text="$t('golfCheckingUiApp.medicalDeclaration.delete.question', { id: removeId })">
          Are you sure you want to delete this Medical Declaration?
        </p>
      </div>
      <div slot="modal-footer">
        <button type="button" class="btn btn-secondary" v-text="$t('entity.action.cancel')" v-on:click="closeDialog()">Cancel</button>
        <button
          type="button"
          class="btn btn-primary"
          id="jhi-confirm-delete-medicalDeclaration"
          data-cy="entityConfirmDeleteButton"
          v-text="$t('entity.action.delete')"
          v-on:click="removeMedicalDeclaration()"
        >
          Delete
        </button>
      </div>
    </b-modal>
  </div>
</template>

<script lang="ts" src="./medical-declaration.component.ts"></script>
