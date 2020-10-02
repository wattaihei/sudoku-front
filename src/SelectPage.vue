<template>
    <div id='selectPage'>
        <h1></h1>
        <h2>難易度を選んでください</h2>
        <table class="problemTable">
            <tr v-for="(num, key) in 5" :key="key">
                <td>
                    <button @click="clickedGenerate(num)" class="generateButton">{{ num }}</button>
                </td>
                <td>
                    {{ message[num] }}
                </td>
            </tr>
        </table>
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
    data () {
        return {
            message : {
                1 : "簡単です",
                2 : "単純な操作だけで解けます",
                3 : "少しテクニックが必要かも",
                4 : "かなり難しい",
                5 : "人間が解けるのかはわからない"
            }
        }
    },
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
.problemTable {
    margin-left: auto;
    margin-right: auto;
}

.generateButton {
    margin-left: auto;
    margin-right: auto;
    width: 100px;
    height: 50px;
}

</style>