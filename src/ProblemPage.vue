<template>
    <div id="problemPage">
        <h1>{{ title }}</h1>
        <table id="board">
            <tr v-for="(rowstate, row) in state" 
                :key="row"
            >
                <td v-for="(num, col) in rowstate" 
                    :key="col"
                    @click="clickedBoardCell(row, col)"
                    :class="['cell', 
                            col % 3 === 0 ? 'vline-bold' : 'vline', 
                            row % 3 === 0 ? 'hline-bold' : 'hline',
                            col === clickedCol && row === clickedRow ? 'clickedCell' : null,
                            allowKeyboardInput && nearCell(row, col) ? 'clickedNearCell' : null]"
                > 
                    <template v-if="num !== 0">
                        {{ num }}
                    </template>
                </td>
            </tr>
        </table>

        <div id="keyboard">
            <table id="keyboardNumbers">
                <tr>
                    <td v-for="(num, key) in 9"
                        :key="key"
                        @click="clickedKeyboardCell(num)"
                        :class="['cell', 'vline']"
                    >
                        {{ num }}
                    </td>
                </tr>
            </table>
            <table>
                <tr>
                    <td>
                        <button class="checkButton" @click="clickedCheckButton()">check</button>
                    </td>
                    <td>
                        <button class="checkButton" @click="clickedGoToSelectPageButton()">choose again</button>
                    </td>
                </tr>
            </table>
        </div>
       <p>{{ resultMessage }}</p>
    </div>
</template>

<script>
export default {
    name : 'problemPage',
    data () {
        return {
            title : 'sudoku',
            state : [
                [0, 4, 7, 0, 6, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 9, 0, 0, 2],
                [8, 0, 0, 0, 0, 0, 0, 0, 3],
                [5, 0, 4, 7, 0, 0, 0, 1, 0],
                [2, 6, 8, 1, 0, 5, 7, 3, 0],
                [0, 0, 9, 4, 0, 2, 0, 0, 0],
                [7, 0, 0, 6, 0, 1, 9, 4, 0],
                [0, 8, 5, 9, 7, 3, 6, 0, 1],
                [9, 1, 6, 8, 2, 4, 3, 5, 0]
            ],
            answer : [
                [3, 4, 7, 2, 6, 8, 1, 9, 5],
                [6, 5, 1, 3, 4, 9, 8, 7, 2],
                [8, 9, 2, 5, 1, 7, 4, 6, 3],
                [5, 3, 4, 7, 8, 6, 2, 1, 9],
                [2, 6, 8, 1, 9, 5, 7, 3, 4],
                [1, 7, 9, 4, 3, 2, 5, 8, 6],
                [7, 2, 3, 6, 5, 1, 9, 4, 8],
                [4, 8, 5, 9, 7, 3, 6, 2, 1],
                [9, 1, 6, 8, 2, 4, 3, 5, 7]
            ],
            allowKeyboardInput : true, 
            clickedRow : -1,
            clickedCol : -1,
            resultMessage : "",
        }
    },
    beforeRouteEnter(route, redirect, next) {
        const param = route.params
        next(vm => vm.setData(param.state, param.answer))
    },
    methods : {
        setData(state, answer) {
            if (state !== null) {
                this.state = state
            }
            if (answer !== null) {
                this.answer = answer
            }
        },
        nearCell(row, col){
            return (row === this.clickedRow 
                || col === this.clickedCol 
                || ((Math.floor(col/3) === Math.floor(this.clickedCol/3)) && (Math.floor(row/3) === Math.floor(this.clickedRow/3)))) 
                && (col !== this.clickedCol || row !== this.clickedRow)
        },
        clickedBoardCell(row, col) {
            if (this.state[row][col] === 0) {
                this.clickedRow = row
                this.clickedCol = col
                this.allowKeyboardInput = true
            }
        },
        clickedKeyboardCell(num) {
            if (this.allowKeyboardInput) {
                this.state[this.clickedRow].splice(this.clickedCol, 1, num)
                this.allowKeyboardInput = false
                this.clickedCol = -1;
                this.clickedRow = -1;
            }
        },
        clickedCheckButton() {
            let solvedState = 'solved';
            for (let row=0; row<9; row++) {
                for (let col=0; col<9; col++) {
                    if (this.state[row][col] === 0) {
                        solvedState = 'unCompleted'
                        break
                    } else if (this.state[row][col] !== this.answer[row][col]) {
                        solvedState = 'wrong'
                    }
                }
                if (solvedState === 'unCompleted') break
            }
            switch (solvedState) {
                case 'solved':
                    this.resultMessage = "Congratulations!"
                    break
                case 'wrong':
                    this.resultMessage = "Something is Wrong!"
                    break
                case 'unCompleted':
                    this.resultMessage = "Please Complete Cells!"
                    break
                default:
                    break
            }
        },
        clickedGoToSelectPageButton() {
            this.$router.push({
                name : "selectPage"
            })
        },
    }
}
</script>

<style>
#problemPage {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

#board {
    text-align: center;
    border-collapse: collapse;
    margin-left: auto;
    margin-right: auto;
    border: 3px solid;
}

.colgroup {
    border: 3px solid;
}

.vline-bold {
    border-left: 3px solid;
}

.hline-bold {
    border-top: 3px solid;
}

.vline {
    border-left: 1px solid;
}

.hline {
    border-top: 1px solid;
}

.cell {
    margin: 0 auto;
    width: 55px;
    height: 55px;
    font-family:'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    font-size: 30px;
}

.cell:hover {
    background-color:aqua;
}

.clickedCell {
    background-color: rgb(0, 219, 219);
}

.clickedNearCell {
    background-color:aqua;
}

#keyboard {
    margin-top: 100px;
    width: 700px;
    text-align: center;
    border-collapse: collapse;
    margin-left: auto;
    margin-right: auto;

}

#keyboardNumbers {
    border: 3px solid;
}

.checkButton {
    width : 70px;
    height : 30px;
}
</style>
