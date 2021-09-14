<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <div v-if="customer">
        <h2 class="jh-entity-heading" data-cy="customerDetailsHeading">
          <span v-text="$t('golfCheckingUiApp.customer.detail.title')">Customer</span> {{ customer.id }}
        </h2>
        <dl class="row jh-entity-details">
          <dt>
            <span v-text="$t('golfCheckingUiApp.customer.username')">Username</span>
          </dt>
          <dd>
            <span>{{ customer.username }}</span>
          </dd>
          <dt>
            <span v-text="$t('golfCheckingUiApp.customer.fullName')">Full Name</span>
          </dt>
          <dd>
            <span>{{ customer.fullName }}</span>
          </dd>
          <dt>
            <span v-text="$t('golfCheckingUiApp.customer.birthDay')">Birth Day</span>
          </dt>
          <dd>
            <span>{{ customer.birthDay }}</span>
          </dd>
          <dt>
            <span v-text="$t('golfCheckingUiApp.customer.sex')">Sex</span>
          </dt>
          <dd>
            <span v-text="$t('golfCheckingUiApp.SEX.' + customer.sex)">{{ customer.sex }}</span>
          </dd>
          <dt>
            <span v-text="$t('golfCheckingUiApp.customer.passportNo')">Passport No</span>
          </dt>
          <dd>
            <span>{{ customer.passportNo }}</span>
          </dd>
          <dt>
            <span v-text="$t('golfCheckingUiApp.customer.addressContact')">Address Contact</span>
          </dt>
          <dd>
            <span>{{ customer.addressContact }}</span>
          </dd>
          <dt>
            <span v-text="$t('golfCheckingUiApp.customer.telephoneNo')">Telephone No</span>
          </dt>
          <dd>
            <span>{{ customer.telephoneNo }}</span>
          </dd>
          <dt>
            <span v-text="$t('golfCheckingUiApp.customer.email')">Email</span>
          </dt>
          <dd>
            <span>{{ customer.email }}</span>
          </dd>
          <dt>
            <span v-text="$t('golfCheckingUiApp.customer.travelInfo')">Travel Info</span>
          </dt>
          <dd>
            <span v-text="$t('golfCheckingUiApp.TravelInfomation.' + customer.travelInfo)">{{ customer.travelInfo }}</span>
          </dd>
          <dt>
            <span v-text="$t('golfCheckingUiApp.customer.travelInfoOther')">Travel Info Other</span>
          </dt>
          <dd>
            <span>{{ customer.travelInfoOther }}</span>
          </dd>
          <dt>
            <span v-text="$t('golfCheckingUiApp.customer.vehicleNo')">Vehicle No</span>
          </dt>
          <dd>
            <span>{{ customer.vehicleNo }}</span>
          </dd>
          <dt>
            <span v-text="$t('golfCheckingUiApp.customer.chairNo')">Chair No</span>
          </dt>
          <dd>
            <span>{{ customer.chairNo }}</span>
          </dd>
          <dt>
            <span v-text="$t('golfCheckingUiApp.customer.departureDate')">Departure Date</span>
          </dt>
          <dd>
            <span>{{ customer.departureDate }}</span>
          </dd>
          <dt>
            <span v-text="$t('golfCheckingUiApp.customer.entryDate')">Entry Date</span>
          </dt>
          <dd>
            <span>{{ customer.entryDate }}</span>
          </dd>
          <dt>
            <span v-text="$t('golfCheckingUiApp.customer.departurePlace')">Departure Place</span>
          </dt>
          <dd>
            <span>{{ customer.departurePlace }}</span>
          </dd>
          <dt>
            <span v-text="$t('golfCheckingUiApp.customer.entryPlace')">Entry Place</span>
          </dt>
          <dd>
            <span>{{ customer.entryPlace }}</span>
          </dd>
          <dt>
            <span v-text="$t('golfCheckingUiApp.customer.visitedCountryIn14Days')">Visited Country In 14 Days</span>
          </dt>
          <dd>
            <span>{{ customer.visitedCountryIn14Days }}</span>
          </dd>
          <dt>
            <span v-text="$t('golfCheckingUiApp.customer.declareForCustomerId')">Declare For Customer Id</span>
          </dt>
          <dd>
            <span>{{ customer.declareForCustomerId }}</span>
          </dd>
        </dl>
        <button type="submit" v-on:click.prevent="previousState()" class="btn btn-info" data-cy="entityDetailsBackButton">
          <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.back')"> Back</span>
        </button>
        <router-link v-if="customer.id" :to="{ name: 'CustomerEdit', params: { customerId: customer.id } }" custom v-slot="{ navigate }">
          <button @click="navigate" class="btn btn-primary">
            <font-awesome-icon icon="pencil-alt"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.edit')"> Edit</span>
          </button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./customer-details.component.ts"></script>
