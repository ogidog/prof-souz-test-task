<template>
  <div class="container">
    <div class="bar-chart-container" ref="barChartContainer">
      <svg class="bar-chart" ref="barChart" v-if="this.randomNumbers.length" :width="this.barChartWidth"
           @mousedown="onDragAnDropBarChart($event)">
        <g class="bars-container" ref="barsContainer"
           :transform="`translate(${this.getCurrentTranslateX()}, ${this.yOrigin}) scale(1,-1)`">
          <rect class="bar" v-for="(value, index) in this.barHeights" :key="index"
                :height="Math.abs(value)"
                :width="this.BAR_WIDTH"
                :x="index * (this.BAR_WIDTH + this.BAR_GAP)"
                :y="value < 0 ? value : 0"
          ></rect>
          <text transform="scale(1,-1)" v-for="(value, index) in this.barHeights" :key="index"
                :x="index * (this.BAR_WIDTH + this.BAR_GAP)+this.BAR_WIDTH/2" dominant-baseline="middle"
                text-anchor="middle"
                :y="value > 0? -value - 5: -value + 15"
          >
            {{ this.randomNumbers[index] }}
          </text>
        </g>
        <g class="axes">
          <rect :x="this.barChartContainerWidth-this.BARS_CONTAINER_MARGIN_X" y="0"
                :width="this.BARS_CONTAINER_MARGIN_X" :height="this.barChartContainerHeight"
                fill="white"></rect>
          <line :x1="0" :y1="this.yOrigin" :x2="this.barChartContainerWidth"
                :y2="this.yOrigin" stroke-dasharray="10 " stroke-width="2" stroke="gray"></line>
          <polygon
              :points="`${this.barChartContainerWidth-20} ${this.yOrigin-10},
                        ${this.barChartContainerWidth} ${this.yOrigin},
                        ${this.barChartContainerWidth-20} ${this.yOrigin+10}`"
              fill="gray"/>

          <rect x="-1" y="0" :width="20" :height="this.barChartContainerHeight"
                fill="white"></rect>
          <line x1="15" :y1="0" x2="15"
                :y2="this.barChartContainerHeight"
                stroke-dasharray="10 " stroke-width="2" stroke="gray"></line>
          <polygon points="5 20, 15 0, 25 20" fill="gray"/>

          <text x="0" :y="this.yOrigin+20">0</text>

        </g>
      </svg>
    </div>
    <div class="button-controls">
      <button @click="onPrevPaging">{{ "<" }}</button>
      <button @click="onBarAdd">Add Bar</button>
      <button @click="onBarRemove">Remove Bar</button>
      <button @click="onNextPaging">{{ ">" }}</button>
    </div>
  </div>
</template>

<script>
import {API_SERVER_URI} from "@/commons/env";

export default {

  created() {

    this.BAR_WIDTH = 50;
    this.BAR_GAP = 2;
    this.BARS_CONTAINER_MARGIN_X = 20;
    this.BARS_CONTAINER_MARGIN_Y = 20;

    this.MIN_VALUE = -200;
    this.MAX_VALUE = 550;

  },

  data() {
    return {

      randomNumbers: [10, -50, 300, 100, -150, 50, 30, 100, 150, 50, 30, 100, 150, 50, 15, 80, 150, 50, 30, 100, 150,],

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
        return this.BARS_CONTAINER_MARGIN_X;
      }

      let transformTranslate = Array.from(this.$refs.barsContainer.transform.baseVal).filter(SVGTransform => SVGTransform.type === 2)[0];
      return transformTranslate.matrix.e;
    },

    getRandomNumber(minValue, maxValue) {
      const url = ""
          + API_SERVER_URI
          + process.env.VUE_APP_RANDOM_NUMBER_API_URI
          + "?minvalue=" + minValue + "&maxvalue=" + maxValue

      return fetch(url).then(response => {
        return response.json()
      }).then(response => response["randomNumber"]).catch(error => NaN);
    },

    async onBarAdd() {
      let randomNumber = (await this.getRandomNumber(this.MIN_VALUE, this.MAX_VALUE));
      randomNumber && this.randomNumbers.push(randomNumber) || console.log("Error with adding bar");
    },

    onBarRemove() {
      this.randomNumbers.pop();
    },

    onNextPaging() {
      if (this.currentPage !== this.numPages - 1) {
        this.currentPage += 1
        let transformTranslate = Array.from(this.$refs.barsContainer.transform.baseVal).filter(SVGTransform => SVGTransform.type === 2)[0];
        transformTranslate.setTranslate(-this.currentPage * this.barChartContainerWidth, transformTranslate.matrix.f);
      }
    },

    onPrevPaging() {
      if (this.currentPage !== 0) {
        let transformTranslate = Array.from(this.$refs.barsContainer.transform.baseVal).filter(SVGTransform => SVGTransform.type === 2)[0];
        transformTranslate.setTranslate(-this.currentPage * this.barChartContainerWidth + this.barChartContainerWidth + this.BARS_CONTAINER_MARGIN_X, transformTranslate.matrix.f);
        this.currentPage -= 1
      }
    },

    onDragAnDropBarChart(e) {

      const barChart = e.currentTarget;

      let transformTranslate = Array.from(this.$refs.barsContainer.transform.baseVal).filter(SVGTransform => SVGTransform.type === 2)[0];
      let startTranslateX = transformTranslate.matrix.e;

      let onMouseMove = function (e1) {
        if (e1.offsetX > 0 && e1.offsetX <= this.barChartContainerWidth - this.BARS_CONTAINER_MARGIN_X
            && e1.offsetY > 0 && e1.offsetY < this.barChartHeight
            && startTranslateX + e1.offsetX - e.offsetX <= this.BARS_CONTAINER_MARGIN_X) {

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
      const width = this.randomNumbers.length * this.BAR_WIDTH + this.BAR_GAP * this.randomNumbers.length - this.BARS_CONTAINER_MARGIN_X;
      return width < this.barChartContainerWidth ? this.barChartContainerWidth : width;
    },

    yOrigin() {
      let minBarHeight = Math.min.apply(null, this.barHeights);
      return minBarHeight < 0 ? this.barChartHeight / 2 + (this.barChartHeight / 2 + minBarHeight) - this.BARS_CONTAINER_MARGIN_Y : this.barChartHeight - this.BARS_CONTAINER_MARGIN_Y;
    },

    barHeights() {
      const heights = [...this.randomNumbers];

      const absMax = heights.reduce(function (max, item) {
        return Math.max(Math.abs(max), Math.abs(item));
      });

      const minRandomNumber = Math.min.apply(null, heights);
      const maxRandomNumber = Math.max.apply(null, heights);

      let normScaleFactor;

      if (minRandomNumber < 0 && maxRandomNumber > this.barChartHeight || (minRandomNumber < 0 && maxRandomNumber < this.barChartHeight)) {
        normScaleFactor = (this.barChartHeight - this.BARS_CONTAINER_MARGIN_Y) / 2;
      }

      if ((minRandomNumber >= 0 && maxRandomNumber > this.barChartHeight) || (minRandomNumber >= 0 && maxRandomNumber < this.barChartHeight)) {
        normScaleFactor = this.barChartHeight - 2 * this.BARS_CONTAINER_MARGIN_Y;
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
      return Math.ceil(this.randomNumbers.length / (Math.floor(this.barChartContainerWidth / (this.BAR_WIDTH + this.BAR_GAP))))
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
