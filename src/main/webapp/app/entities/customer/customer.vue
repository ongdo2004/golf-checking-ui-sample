<template>
  <div>
    <h2 id="page-heading" data-cy="CustomerHeading">
      <span v-text="$t('golfCheckingUiApp.customer.home.title')" id="customer-heading">Customers</span>
      <div class="d-flex justify-content-end">
        <button class="btn btn-info mr-2" v-on:click="handleSyncList" :disabled="isFetching">
          <font-awesome-icon icon="sync" :spin="isFetching"></font-awesome-icon>
          <span v-text="$t('golfCheckingUiApp.customer.home.refreshListLabel')">Refresh List</span>
        </button>
        <router-link :to="{ name: 'CustomerCreate' }" custom v-slot="{ navigate }">
          <button
            @click="navigate"
            id="jh-create-entity"
            data-cy="entityCreateButton"
            class="btn btn-primary jh-create-entity create-customer"
          >
            <font-awesome-icon icon="plus"></font-awesome-icon>
            <span v-text="$t('golfCheckingUiApp.customer.home.createLabel')"> Create a new Customer </span>
          </button>
        </router-link>
      </div>
    </h2>
    <br />
    <div class="alert alert-warning" v-if="!isFetching && customers && customers.length === 0">
      <span v-text="$t('golfCheckingUiApp.customer.home.notFound')">No customers found</span>
    </div>
    <div class="table-responsive" v-if="customers && customers.length > 0">
      <table class="table table-striped" aria-describedby="customers">
        <thead>
          <tr>
            <th scope="row" v-on:click="changeOrder('id')">
              <span v-text="$t('global.field.id')">ID</span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'id'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('username')">
              <span v-text="$t('golfCheckingUiApp.customer.username')">Username</span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'username'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('fullName')">
              <span v-text="$t('golfCheckingUiApp.customer.fullName')">Full Name</span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'fullName'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('birthDay')">
              <span v-text="$t('golfCheckingUiApp.customer.birthDay')">Birth Day</span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'birthDay'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('sex')">
              <span v-text="$t('golfCheckingUiApp.customer.sex')">Sex</span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'sex'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('passportNo')">
              <span v-text="$t('golfCheckingUiApp.customer.passportNo')">Passport No</span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'passportNo'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('addressContact')">
              <span v-text="$t('golfCheckingUiApp.customer.addressContact')">Address Contact</span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'addressContact'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('telephoneNo')">
              <span v-text="$t('golfCheckingUiApp.customer.telephoneNo')">Telephone No</span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'telephoneNo'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('email')">
              <span v-text="$t('golfCheckingUiApp.customer.email')">Email</span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'email'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('travelInfo')">
              <span v-text="$t('golfCheckingUiApp.customer.travelInfo')">Travel Info</span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'travelInfo'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('travelInfoOther')">
              <span v-text="$t('golfCheckingUiApp.customer.travelInfoOther')">Travel Info Other</span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'travelInfoOther'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('vehicleNo')">
              <span v-text="$t('golfCheckingUiApp.customer.vehicleNo')">Vehicle No</span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'vehicleNo'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('chairNo')">
              <span v-text="$t('golfCheckingUiApp.customer.chairNo')">Chair No</span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'chairNo'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('departureDate')">
              <span v-text="$t('golfCheckingUiApp.customer.departureDate')">Departure Date</span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'departureDate'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('entryDate')">
              <span v-text="$t('golfCheckingUiApp.customer.entryDate')">Entry Date</span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'entryDate'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('departurePlace')">
              <span v-text="$t('golfCheckingUiApp.customer.departurePlace')">Departure Place</span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'departurePlace'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('entryPlace')">
              <span v-text="$t('golfCheckingUiApp.customer.entryPlace')">Entry Place</span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'entryPlace'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('visitedCountryIn14Days')">
              <span v-text="$t('golfCheckingUiApp.customer.visitedCountryIn14Days')">Visited Country In 14 Days</span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'visitedCountryIn14Days'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('declareForCustomerId')">
              <span v-text="$t('golfCheckingUiApp.customer.declareForCustomerId')">Declare For Customer Id</span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'declareForCustomerId'"></jhi-sort-indicator>
            </th>
            <th scope="row"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="customer in customers" :key="customer.id" data-cy="entityTable">
            <td>
              <router-link :to="{ name: 'CustomerView', params: { customerId: customer.id } }">{{ customer.id }}</router-link>
            </td>
            <td>{{ customer.username }}</td>
            <td>{{ customer.fullName }}</td>
            <td>{{ customer.birthDay }}</td>
            <td v-text="$t('golfCheckingUiApp.SEX.' + customer.sex)">{{ customer.sex }}</td>
            <td>{{ customer.passportNo }}</td>
            <td>{{ customer.addressContact }}</td>
            <td>{{ customer.telephoneNo }}</td>
            <td>{{ customer.email }}</td>
            <td v-text="$t('golfCheckingUiApp.TravelInfomation.' + customer.travelInfo)">{{ customer.travelInfo }}</td>
            <td>{{ customer.travelInfoOther }}</td>
            <td>{{ customer.vehicleNo }}</td>
            <td>{{ customer.chairNo }}</td>
            <td>{{ customer.departureDate }}</td>
            <td>{{ customer.entryDate }}</td>
            <td>{{ customer.departurePlace }}</td>
            <td>{{ customer.entryPlace }}</td>
            <td>{{ customer.visitedCountryIn14Days }}</td>
            <td>{{ customer.declareForCustomerId }}</td>
            <td class="text-right">
              <div class="btn-group">
                <router-link :to="{ name: 'CustomerView', params: { customerId: customer.id } }" custom v-slot="{ navigate }">
                  <button @click="navigate" class="btn btn-info btn-sm details" data-cy="entityDetailsButton">
                    <font-awesome-icon icon="eye"></font-awesome-icon>
                    <span class="d-none d-md-inline" v-text="$t('entity.action.view')">View</span>
                  </button>
                </router-link>
                <router-link :to="{ name: 'CustomerEdit', params: { customerId: customer.id } }" custom v-slot="{ navigate }">
                  <button @click="navigate" class="btn btn-primary btn-sm edit" data-cy="entityEditButton">
                    <font-awesome-icon icon="pencil-alt"></font-awesome-icon>
                    <span class="d-none d-md-inline" v-text="$t('entity.action.edit')">Edit</span>
                  </button>
                </router-link>
                <b-button
                  v-on:click="prepareRemove(customer)"
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
        ><span id="golfCheckingUiApp.customer.delete.question" data-cy="customerDeleteDialogHeading" v-text="$t('entity.delete.title')"
          >Confirm delete operation</span
        ></span
      >
      <div class="modal-body">
        <p id="jhi-delete-customer-heading" v-text="$t('golfCheckingUiApp.customer.delete.question', { id: removeId })">
          Are you sure you want to delete this Customer?
        </p>
      </div>
      <div slot="modal-footer">
        <button type="button" class="btn btn-secondary" v-text="$t('entity.action.cancel')" v-on:click="closeDialog()">Cancel</button>
        <button
          type="button"
          class="btn btn-primary"
          id="jhi-confirm-delete-customer"
          data-cy="entityConfirmDeleteButton"
          v-text="$t('entity.action.delete')"
          v-on:click="removeCustomer()"
        >
          Delete
        </button>
      </div>
    </b-modal>
  </div>
</template>

<script lang="ts" src="./customer.component.ts"></script>
