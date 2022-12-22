<template>
  <div class="container">
    randomNumbers {{ store.randomNumbers }}
  </div>
  <PagingControllers/>
</template>

<script>

import PagingControllers from "@/components/PagingControllers";
import {store} from "@/store/store";

export default {
  components: {PagingControllers},

  setup() {
    return {
      store
    }
  },

  data() {
    return {

      appConfig: this.appConfig1,

      barChartHeight: 1,
      barChartContainerWidth: 1,
      barChartContainerHeight: 1,

      currentPage: 0,

      maxRandomNumber: -1
    }
  },

  mounted() {
    this.onResize();
    window.addEventListener('resize', this.onResize);
  },

  unmounted() {
    window.removeEventListener('resize', this.onResize);
  },

  methods: {

    getCurrentTranslateX() {
      if (!this.$refs.barsContainer) {
        return this.appConfig.BARS_CONTAINER_MARGIN_X;
      }

      let transformTranslate = Array.from(this.$refs.barsContainer.transform.baseVal).filter(SVGTransform => SVGTransform.type === 2)[0];
      return transformTranslate.matrix.e;
    },

    onDragAnDropBarChart(e) {

      const barChart = e.currentTarget;

      let transformTranslate = Array.from(this.$refs.barsContainer.transform.baseVal).filter(SVGTransform => SVGTransform.type === 2)[0];
      let startTranslateX = transformTranslate.matrix.e;

      let onMouseMove = function (e1) {
        if (e1.offsetX > 0 && e1.offsetX <= this.barChartContainerWidth - this.appConfig.BARS_CONTAINER_MARGIN_X
            && e1.offsetY > 0 && e1.offsetY < this.barChartHeight
            && startTranslateX + e1.offsetX - e.offsetX <= this.appConfig.BARS_CONTAINER_MARGIN_X) {

          transformTranslate.setTranslate(startTranslateX + e1.offsetX - e.offsetX, transformTranslate.matrix.f);
          for (let i = this.numPages + 1; i > 0; i--) {
            if (transformTranslate.matrix.e > -i * this.barChartContainerWidth && transformTranslate.matrix.e <= -(i - 1) * this.barChartContainerWidth) {
              this.currentPage = i - 1;
            }
            if (transformTranslate.matrix.e >= 0) {
              this.currentPage = 0;
            }
          }
        } else {
          barChart.removeEventListener('mousemove', _onMouseMove, {capture: true});
        }
      }
      let _onMouseMove = onMouseMove.bind(this);

      barChart.onmouseup = function () {
        barChart.removeEventListener('mousemove', _onMouseMove, {capture: true});
      }

      barChart.addEventListener("mousemove", _onMouseMove, {capture: true});
    },

    onResize() {
      this.barChartHeight = this.$refs?.barChart?.clientHeight;
      this.barChartContainerWidth = this.$refs?.barChartContainer?.clientWidth;
      this.barChartContainerHeight = this.$refs?.barChartContainer?.clientHeight;
    },
  },

  computed: {

    barChartWidth() {
      const width = store.randomNumbers.length * this.appConfig.BAR_WIDTH + this.appConfig.BAR_GAP * store.randomNumbers.length - this.appConfig.BARS_CONTAINER_MARGIN_X;
      return width < this.barChartContainerWidth ? this.barChartContainerWidth : width;
    },

    yOrigin() {
      let minBarHeight = Math.min.apply(null, this.barHeights);
      return minBarHeight < 0 ? this.barChartHeight / 2 + (this.barChartHeight / 2 + minBarHeight) - this.appConfig.BARS_CONTAINER_MARGIN_Y : this.barChartHeight - this.appConfig.BARS_CONTAINER_MARGIN_Y;
    },

    barHeights() {
      const heights = [...store.randomNumbers];

      const absMax = heights.reduce(function (max, item) {
        return Math.max(Math.abs(max), Math.abs(item));
      });

      const minRandomNumber = Math.min.apply(null, heights);
      const maxRandomNumber = Math.max.apply(null, heights);

      let normScaleFactor;

      if (minRandomNumber < 0 && maxRandomNumber > this.barChartHeight || (minRandomNumber < 0 && maxRandomNumber < this.barChartHeight)) {
        normScaleFactor = (this.barChartHeight - this.appConfig.BARS_CONTAINER_MARGIN_Y) / 2;
      }

      if ((minRandomNumber >= 0 && maxRandomNumber > this.barChartHeight) || (minRandomNumber >= 0 && maxRandomNumber < this.barChartHeight)) {
        normScaleFactor = this.barChartHeight - 2 * this.appConfig.BARS_CONTAINER_MARGIN_Y;
      }

      const minMaxNorm = array => {
        let norm;
        for (let i = 0; i < array.length; i++) {
          norm = (array[i] / absMax) * normScaleFactor;
          array[i] = parseInt(norm);
        }
      };

      minMaxNorm(heights);

      return heights
    },

    numPages() {
      return Math.ceil(store.randomNumbers.length / (Math.floor(this.barChartContainerWidth / (this.appConfig.BAR_WIDTH + this.appConfig.BAR_GAP))))
    },
  }
}

</script>

<style scoped>

svg text {
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

svg text::selection {
  background: none;
}

.container {
  position: absolute;
  top: 50%;
  left: 50%;

  transform: translate(-50%, -50%);

  width: 60vw;
  height: 40vh;
}

.bar-chart-container {
  height: 100%;
  overflow: hidden;
}

.bar-chart {
  position: relative;
  height: 100%;

}

.bar {
  fill: red;
}

.axes text {
  height: 20px;
  vertical-align: center;
  font: bold 1.2em sans-serif;
}

.button-controls {
  display: flex;
  justify-content: center;
  gap: 10px;

  margin: 5px;

}

</style>
