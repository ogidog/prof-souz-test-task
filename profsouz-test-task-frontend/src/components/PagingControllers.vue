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
      }).then(response => response["randomNumber"]).catch(error => NaN);
    },
    onPrevPaging() {
      if (store.currentPage !== 0) {
        let transformTranslate = Array.from(this.$refs.barsContainer.transform.baseVal).filter(SVGTransform => SVGTransform.type === 2)[0];
        transformTranslate.setTranslate(-store.currentPage * this.barChartContainerWidth + this.barChartContainerWidth + this.appConfig.BARS_CONTAINER_MARGIN_X, transformTranslate.matrix.f);
        store.currentPage -= 1
      }
    },
    async onBarAdd() {
      let randomNumber = (await this.getRandomNumber(this.appConfig.MIN_VALUE, this.appConfig.MAX_VALUE));
      randomNumber ? store.addNumber(randomNumber) : console.log("Error with adding bar")
    },
    onBarRemove() {
      store.removeNumber();
    },
    onNextPaging() {
      if (store.currentPage !== this.numPages - 1) {
        store.currentPage += 1
        let transformTranslate = Array.from(this.$refs.barsContainer.transform.baseVal).filter(SVGTransform => SVGTransform.type === 2)[0];
        transformTranslate.setTranslate(-store.currentPage * this.barChartContainerWidth, transformTranslate.matrix.f);
      }
    },

    numPages() {
      return Math.ceil(store.randomNumbers.length / (Math.floor(this.barChartContainerWidth / (this.appConfig.BAR_WIDTH + this.appConfig.BAR_GAP))))
    },
  }

}

</script>

<style scoped>

</style>