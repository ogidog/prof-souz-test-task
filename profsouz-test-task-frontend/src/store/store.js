import {reactive} from 'vue'

export const store = reactive({
    randomNumbers: [10, -50, 300, 100, -150, 50, 30, 100, 150, 50, 30, 100, 150, 50, 15, 80, 150, 50, 30, 100, 150,],

    addNumber(number) {
        this.randomNumbers.push(number);
    },

    removeNumber() {
        this.randomNumbers.pop();
    }
})
