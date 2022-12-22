<template>
  <div class="button-controls">
    <button @click="onPrevPaging">{{ "<" }}</button>
    <button @click="onBarAdd">Add Bar</button>
    <button @click="onBarRemove">Remove Bar</button>
    <button @click="onNextPaging">{{ ">" }}</button>
  </div>
</template>

<script>

import {store} from "@/store/store";

export default {

  name: "PagingControllers",

  setup() {
    return {
      store
    }
  },

  inject: ["appConfig"],

  data() {
    return {}
  },

  methods: {

    getRandomNumber(minValue, maxValue) {
      const url = ""
          + this.appConfig.API_SERVER_URI
          + process.env.VUE_APP_RANDOM_NUMBER_API_URI
          + "?minvalue=" + minValue + "&maxvalue=" + maxValue

      return fetch(url).then(response => {
        return response.json()
      }).then(response => response["randomNumber"]).catch(error => {
        console.log(error)
        return NaN
      });
    },

    async onBarAdd() {
      let randomNumber = (await this.getRandomNumber(this.appConfig.MIN_VALUE, this.appConfig.MAX_VALUE));
      randomNumber ? store.addNumber(randomNumber) : console.log("Error with adding bar")
    },
    onBarRemove() {
      store.removeNumber();
    },

    onPrevPaging() {
      if (store.currentPage !== 0) {
        store.setCurrentPage(store.currentPage - 1);
      }
    },
    onNextPaging() {
      if (store.currentPage !== store.numPages - 1) {
        store.setCurrentPage(store.currentPage + 1);
      }
    },
  }

}

</script>

<style scoped>

.button-controls {
  display: flex;
  justify-content: center;
  gap: 10px;

  margin: 5px;

}

</style>