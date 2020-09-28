<template>
    <div id='selectPage'>
        <div v-for="(num, key) in 5" :key="key">
            <button @click="clickedGenerate(num)" class="generateButton">{{ num }}</button>
        </div>
        <router-view></router-view>
    </div>
</template>


<script>
const axiosBase = require('axios');
const axios = axiosBase.create({
    baseURL : 'https://sudoku-rs.herokuapp.com/problems/',
    responseType: 'json'  
});
export default {
    name : 'selectPage',
    methods : {
        async clickedGenerate(num) {
            const params = await this.getProblemAndAnswer(num);
            this.$router.push({
                name : 'problemPage',
                params : params
            })
        },
        async getProblemAndAnswer(num) {
            const httpResponse = await axios.get(String(num))
            return {
                state : this.arrayToState(httpResponse.data.problem),
                answer : this.arrayToState(httpResponse.data.answer)
            }
        },
        arrayToState(arr) {
            let retState = []
            for (let row=0; row<9; row++) {
                let rowState = []
                for (let col=0; col<9; col++) {
                    rowState.push(arr[row*9+col]);
                }
                retState.push(rowState)
            }
            return retState
        }
    }
}
</script>

<style>
.generateButton {
    margin-left: auto;
    margin-right: auto;
    width: 300px;
    height: 100px;
}

</style>