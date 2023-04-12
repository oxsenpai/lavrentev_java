const field = document.querySelector('.field');
const easy_mode = document.querySelector('.easy_mode');
const normal_mode = document.querySelector('.normal_mode');
const hard_mode = document.querySelector('.hard_mode');
const cellSize = 100;

easy_mode.addEventListener('click', () => {
    let a = 3;
    newGame(a);
})

normal_mode.addEventListener('click', () => {
    let a = 8;
    newGame(a);
})

hard_mode.addEventListener('click', () => {
    let a = 15;
    newGame(a);
})

let empty = {
    value: 0,
    top: 0,
    left: 0,
};

let cells = [];

function newGame(a) {
    document.querySelector('.win_text').innerHTML = ''; 
    empty = {
        value: 0,
        top: 0,
        left: 0,
    };
    cells = [];
    cells.push(empty);
    field.innerHTML = '';
    a = +a;
    cell_fill(a);
}

function cell_fill(a){
    const numbers = [...Array(a).keys()].sort(() => Math.random() - 0.5);
    for (let i = 1; i <= a; i++) {
        const cell = document.createElement('div');
        cell.className = 'cell';
        
        const value = numbers[i-1]+1;
        const left = i % Math.sqrt(a+1);
        const top = (i - left)/Math.sqrt(a+1);
        cell.innerHTML = value;
    
        cells.push({
            left: left,
            top: top,
            element: cell,
            value: value,
        });
        
        field.style.width = `${Math.sqrt(a+1)*100}px`;
        field.style.height = `${Math.sqrt(a+1)*100}px`;
        field.style.border = '1px solid black';

        cell.style.top = `${top * cellSize}px`;
        cell.style.left = `${left * cellSize}px`; 
    
        field.append(cell);
    
        cell.addEventListener('click',() => {
           move(i, a);
        });
}
}

function winGame() {
    document.querySelector('.win_text').innerHTML = 'Вы победили!';
    field.innerHTML = '';
    field.style.border = 'none';

}

function move(index, a) {
    console.log(cells);
    const cell = cells[index];

    const leftDiff = Math.abs(empty.left - cell.left);
    const topDiff = Math.abs(empty.top - cell.top);

    if (leftDiff + topDiff > 1) {
        return;
    }

    cell.element.style.top = `${empty.top * cellSize}px`;
    cell.element.style.left = `${empty.left * cellSize}px`;
    
    const emptyLeft = empty.left;
    const emptyTop = empty.top;
    empty.left = cell.left;
    empty.top = cell.top;

    cell.left = emptyLeft;
    cell.top = emptyTop;

    const isFinished = cells.every(cell => {
        console.log(cell.value);
        console.log(cell.top * Math.sqrt(a+1) + cell.left);
        return cell.value === cell.top * Math.sqrt(a+1) + cell.left;
    })
    

    if (isFinished) {
        winGame()
    }
    
}




