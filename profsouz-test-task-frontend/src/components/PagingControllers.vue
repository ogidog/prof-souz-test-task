<template>
  <div class="button-controls">
    <button @click="onPrevPaging">{{ "<" }}</button>
    <button @click="onBarAdd">Add Bar</button>
    <button @click="onBarRemove">Remove Bar</button>
    <button @click="onNextPaging">{{ ">" }}</button>
  </div>
</template>

<script>
import {API_SERVER_URI} from "@/commons/env";

import {store} from "@/store/store";

export default {
  name: "PagingControllers",

  methods:{

    getRandomNumber(minValue, maxValue) {
      const url = ""
          + API_SERVER_URI
          + process.env.VUE_APP_RANDOM_NUMBER_API_URI
          + "?minvalue=" + minValue + "&maxvalue=" + maxValue

      return fetch(url).then(response => {
        return response.json()
      }).then(response => response["randomNumber"]).catch(error => NaN);
    },

    onPrevPaging() {
      if (this.currentPage !== 0) {
        let transformTranslate = Array.from(this.$refs.barsContainer.transform.baseVal).filter(SVGTransform => SVGTransform.type === 2)[0];
        transformTranslate.setTranslate(-this.currentPage * this.barChartContainerWidth + this.barChartContainerWidth + this.BARS_CONTAINER_MARGIN_X, transformTranslate.matrix.f);
        this.currentPage -= 1
      }
    },

    async onBarAdd() {
      let randomNumber = (await this.getRandomNumber(this.MIN_VALUE, this.MAX_VALUE));
      randomNumber && store.addNumber(randomNumber) || console.log("Error with adding bar");
    },

    onBarRemove() {
      store.removeNumber();
    },

    onNextPaging() {
      if (this.currentPage !== this.numPages - 1) {
        this.currentPage += 1
        let transformTranslate = Array.from(this.$refs.barsContainer.transform.baseVal).filter(SVGTransform => SVGTransform.type === 2)[0];
        transformTranslate.setTranslate(-this.currentPage * this.barChartContainerWidth, transformTranslate.matrix.f);
      }
    },
  }
}
</script>

<style scoped>

</style>