<template>
  <div class="container">
    <div class="bar-chart-container" ref="barChartContainer">
      <svg class="bar-chart" ref="barChart" :width="this.barChartWidth" @mousedown="onDragAnDropBarChart($event)">
        <g class="bars-container" ref="barsContainer"
           :transform="`translate(${this.BARS_CONTAINER_MARGIN_X}, ${this.barChartHeight}) scale(1,-1)`">
          <rect class="bar" v-for="(value, index) in this.randomNumbers" :key="index"
                :height="this.getBarHeight(value)"
                :width="this.BAR_WIDTH"
                :x="index * (this.BAR_WIDTH + this.BAR_GAP)"
          ></rect>
        </g>
        <g>
          <line x1="0" y1="0" x2="0" :y2="this.barChartContainerHeight" stroke="black" stroke-width="2px"/>
          <line x1="0" y1="0" :x2="this.barChartContainerWidth" y2="0" stroke="black" stroke-width="2px"
                :transform="`translate(0, ${this.barChartContainerHeight})`"/>
        </g>
      </svg>
    </div>
    <div class="button-controls">
      <button @click="onBarAdd">Add Bar</button>
      <button @click="onBarRemove">Remove Bar</button>
    </div>
    <div class="pagination-control" v-if="this.numPages > 1">
      <div class="page-control" @click="onPagingBarChart(pageNum)" v-for="pageNum in [...Array(this.numPages).keys()]"
           :key="pageNum">
        {{ pageNum + 1 }}
      </div>
    </div>
  </div>
</template>

<script>
export default {

  created() {

    this.BAR_WIDTH = 50;
    this.BAR_GAP = 2;
    this.BARS_CONTAINER_MARGIN_X = 50;
    this.BARS_CONTAINER_MARGIN_Y = 50;

    this.randomNumber = (min, max) => Math.floor(Math.random() * max) + min;

  },

  mounted() {
    this.barChartHeight = this.$refs.barChart.clientHeight - this.BARS_CONTAINER_MARGIN_Y;
    this.barChartContainerWidth = this.$refs.barChartContainer.clientWidth;
    this.barChartContainerHeight = this.$refs.barChartContainer.clientHeight;
    this.barsPerPage = Math.floor(this.barChartContainerWidth / (this.BAR_WIDTH + this.BAR_GAP));

    this.maxRandomNumber = Math.max.apply(null, this.randomNumbers);
  },

  beforeUpdate() {
    this.maxRandomNumber = Math.max.apply(null, this.randomNumbers);
  },

  data() {
    return {
      randomNumbers: [80, 45, 56.5, 80, 180, 38, 47, 34, 45, 80, 45, 56, 80, 180, 38, 47, 34, 45, 80, 45, 56, 80, 180, 38, 47, 34, 45],

      barChartHeight: 1,
      barChartContainerWidth: 1,
      barChartContainerHeight: 1,

      barsPerPage: 1,
      currentPage: 0,

      maxRandomNumber: -1
    }
  },

  methods: {

    getBarHeight(value) {
      let height = 1;

      if (this.maxRandomNumber > this.barChartHeight) {
        height = (value * this.barChartHeight / this.maxRandomNumber) - this.BARS_CONTAINER_MARGIN_Y;
      } else {
        height = value
      }

      return height >= 0 ? height : 0;
    },

    onBarAdd() {
      this.randomNumbers.push(this.randomNumber(1, 500));
    },

    onBarRemove() {
      this.randomNumbers.pop();
    },

    onPagingBarChart(pageNum) {
      let transformTranslate = Array.from(this.$refs.barsContainer.transform.baseVal).filter(SVGTransform => SVGTransform.type === 2)[0];
      console.log(transformTranslate)
    },

    onDragAnDropBarChart(e) {

      const barChart = e.currentTarget;
      const barChartContainerWidth = this.barChartContainerWidth;
      const barChartHeight = this.barChartHeight;

      let transformTranslate = Array.from(this.$refs.barsContainer.transform.baseVal).filter(SVGTransform => SVGTransform.type === 2)[0];
      let startTranslateX = transformTranslate.matrix.e;

      let onMouseMove = function (e1) {
        if (e1.offsetX > 0 && e1.offsetX < barChartContainerWidth && e1.offsetY > 0 && e1.offsetY < barChartHeight) {
          transformTranslate.setTranslate(startTranslateX + e1.offsetX - e.offsetX, transformTranslate.matrix.f);
        } else {
          barChart.removeEventListener('mousemove', onMouseMove, {capture: true});
          barChart.onmouseup = null;
        }
      }

      barChart.onmouseup = function () {
        barChart.removeEventListener('mousemove', onMouseMove, {capture: true});
        barChart.onmouseup = null;
      }

      barChart.addEventListener("mousemove", onMouseMove, {capture: true});
    },
  },

  computed: {
    barChartWidth() {
      let width = this.randomNumbers.length * this.BAR_WIDTH + this.BAR_GAP * this.randomNumbers.length - this.BARS_CONTAINER_MARGIN_X;
      return width < this.barChartContainerWidth ? this.barChartContainerWidth : width;
    },

    numPages() {
      return Math.ceil(this.randomNumbers.length / this.barsPerPage)
    }
  }
}

</script>

<style scoped>

.container {
  position: absolute;
  top: 50%;
  left: 50%;

  transform: translate(-50%, -50%);

  width: 50vw;
  height: 30vh;
}

.bar-chart-container {
  height: 100%;
  overflow: hidden;

  border: 1px solid red;
}

.bar-chart {
  position: relative;
  height: 100%;

  border: 0px solid green;
}

.bar {
  fill: red;
  y: 0;
}

.button-controls {
  display: flex;
  justify-content: center;
  gap: 10px;

  margin: 5px;

}

.pagination-control {
  display: flex;
  justify-content: center;
  gap: 10px;

  margin: 5px;
}

.page-control {
  cursor: pointer;
}

</style>
