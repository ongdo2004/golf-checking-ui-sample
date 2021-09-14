<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <div v-if="medicalDeclaration">
        <h2 class="jh-entity-heading" data-cy="medicalDeclarationDetailsHeading">
          <span v-text="$t('golfCheckingUiApp.medicalDeclaration.detail.title')">MedicalDeclaration</span> {{ medicalDeclaration.id }}
        </h2>
        <dl class="row jh-entity-details">
          <dt>
            <span v-text="$t('golfCheckingUiApp.medicalDeclaration.departureDate')">Departure Date</span>
          </dt>
          <dd>
            <span>{{ medicalDeclaration.departureDate }}</span>
          </dd>
          <dt>
            <span v-text="$t('golfCheckingUiApp.medicalDeclaration.travelInfo')">Travel Info</span>
          </dt>
          <dd>
            <span v-text="$t('golfCheckingUiApp.TravelInfomation.' + medicalDeclaration.travelInfo)">{{
              medicalDeclaration.travelInfo
            }}</span>
          </dd>
          <dt>
            <span v-text="$t('golfCheckingUiApp.medicalDeclaration.travelInfoOther')">Travel Info Other</span>
          </dt>
          <dd>
            <span>{{ medicalDeclaration.travelInfoOther }}</span>
          </dd>
          <dt>
            <span v-text="$t('golfCheckingUiApp.medicalDeclaration.vehicleNo')">Vehicle No</span>
          </dt>
          <dd>
            <span>{{ medicalDeclaration.vehicleNo }}</span>
          </dd>
          <dt>
            <span v-text="$t('golfCheckingUiApp.medicalDeclaration.chairNo')">Chair No</span>
          </dt>
          <dd>
            <span>{{ medicalDeclaration.chairNo }}</span>
          </dd>
          <dt>
            <span v-text="$t('golfCheckingUiApp.medicalDeclaration.entryDate')">Entry Date</span>
          </dt>
          <dd>
            <span>{{ medicalDeclaration.entryDate }}</span>
          </dd>
          <dt>
            <span v-text="$t('golfCheckingUiApp.medicalDeclaration.departurePlace')">Departure Place</span>
          </dt>
          <dd>
            <span>{{ medicalDeclaration.departurePlace }}</span>
          </dd>
          <dt>
            <span v-text="$t('golfCheckingUiApp.medicalDeclaration.entryPlace')">Entry Place</span>
          </dt>
          <dd>
            <span>{{ medicalDeclaration.entryPlace }}</span>
          </dd>
          <dt>
            <span v-text="$t('golfCheckingUiApp.medicalDeclaration.visitedCountryIn14Days')">Visited Country In 14 Days</span>
          </dt>
          <dd>
            <span>{{ medicalDeclaration.visitedCountryIn14Days }}</span>
          </dd>
          <dt>
            <span v-text="$t('golfCheckingUiApp.medicalDeclaration.addressContact')">Address Contact</span>
          </dt>
          <dd>
            <span>{{ medicalDeclaration.addressContact }}</span>
          </dd>
          <dt>
            <span v-text="$t('golfCheckingUiApp.medicalDeclaration.declareForCustomerId')">Declare For Customer Id</span>
          </dt>
          <dd>
            <span>{{ medicalDeclaration.declareForCustomerId }}</span>
          </dd>
          <dt>
            <span v-text="$t('golfCheckingUiApp.medicalDeclaration.checkInTime')">Check In Time</span>
          </dt>
          <dd>
            <span v-if="medicalDeclaration.checkInTime">{{ $d(Date.parse(medicalDeclaration.checkInTime), 'long') }}</span>
          </dd>
        </dl>
        <button type="submit" v-on:click.prevent="previousState()" class="btn btn-info" data-cy="entityDetailsBackButton">
          <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.back')"> Back</span>
        </button>
        <router-link
          v-if="medicalDeclaration.id"
          :to="{ name: 'MedicalDeclarationEdit', params: { medicalDeclarationId: medicalDeclaration.id } }"
          custom
          v-slot="{ navigate }"
        >
          <button @click="navigate" class="btn btn-primary">
            <font-awesome-icon icon="pencil-alt"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.edit')"> Edit</span>
          </button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./medical-declaration-details.component.ts"></script>
