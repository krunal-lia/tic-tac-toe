'use strict';

let gameData = {
    size: null,
    turn: 0,
    player: {
        0: 'X',
        1: 'O'
    },
    count: 0,
    boxArray: null,

    init(size) {
        this.size = size;
        let styles = {
            3: 'three',
            4: 'four',
            5: 'five'
        }

        this.boxArray = [];
        for(let i = 0; i < size; i++) {
            this.boxArray.push(Array(size));
        }

        for(let i = 0; i < size; i++) {
            for(let j = 0; j < size; j++) {
                let html = `<div class="box ${styles[this.size]}" id="box-${i}-${j}"></div>`;

                document.querySelector('.js-gamebox').insertAdjacentHTML('beforeend', html);
                
            }
        }
    },

    checkLeftDiagonal(check) {
        for(let i = 0, j = 0; i < this.size && j < this.size; i++ , j++) {
            if(this.boxArray[i][j] !== check) {
                return false;
            }
        }

        return true;
    },

    checkRightDiagonal(check) {
        let i = 0, j = 0;

        j = this.size - 1;

        while(i < this.size && j >= 0) {
            if(this.boxArray[i][j] !== check) {
                return false;
            }
            i++;
            j--;
        }

        return true;
    },

    checkHorizontal(i, check) {
        for(let k = 0; k < this.size; k++) {
            if(this.boxArray[i][k] !== check) {
                return false;
            }
        }

        return true;
    },

    checkVertical(j, check) {
        for(let k = 0; k < this.size; k++) {
            if(this.boxArray[k][j] !== check) {
                return false;
            }
        }

        return true;
    },

    checkWin(i, j, check) {

        let ldStatus = false, rdStatus = false, hStatus = false, vStatus = false;

        //1. CHECK LEFT DIAGONAL
        if(i == j) {
            ldStatus = this.checkLeftDiagonal(check);
            if(ldStatus) return true;
        }

        //1. CHECK RIGHT DIAGONAL
        if(i + j == this.size -1) {
            rdStatus = this.checkRightDiagonal(check);
            if(rdStatus) return true;
        }

        // 2. CHECK FOR HORIZONTAL
        hStatus = this.checkHorizontal(i, check);
        if(hStatus) return true;

        // 3. CHECK FOR VERTICAL
        vStatus = this.checkVertical(j, check);
        if(vStatus) return true;

        return false;
    },

    makeMove(id) {
        let win = false;
        let [box, i, j] = id.split('-');

        i = parseInt(i);
        j = parseInt(j);

        // 1. BOX DISABLE
        document.getElementById(id).style.pointerEvents = 'none';

        // 2. ADD TO BOX ARRAY
        this.boxArray[i][j] = this.player[this.turn];

        // 3. ADD TO UI
        document.getElementById(id).innerText = this.player[this.turn];

        this.count++;

        // 4. CHECK FOR THE WIN
        win = this.checkWin(i, j, this.player[this.turn]);
        if(win) {
            document.querySelector('.js-gamebox').style.pointerEvents = 'none';
            document.querySelector('.player').innerText = this.player[this.turn] + ' WINS';
            document.querySelector('.player').classList.add('result');     
            return;
        } else if(this.count == (this.size * this.size)) {
            document.querySelector('.player').innerText = 'Its Draw!';
            document.querySelector('.player').classList.add('result');
            return;
        }

        // 5. Switch the turn

        this.turn = this.turn ? 0 : 1;
        document.querySelector('.player').innerText = this.player[this.turn] + "'s Turn";
        
    } 

}

document.querySelector('.btns').addEventListener('click', (event) => {

    let id = parseInt(event.target.id);

    if(id) {
        gameData.init(id);

        document.querySelector('.game').style.display = 'block';
        document.querySelector('.btns').style.display = 'none';
    }
    
});

document.querySelector('.js-gamebox').addEventListener('click', (event) => {
    gameData.makeMove(event.target.id);
});

document.querySelector('.reload').addEventListener('click', () => {
    location.reload();
});