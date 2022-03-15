const integral = (Math.pow(3, 3) + Math.pow(3, 2)) - (Math.pow(2, 3) + Math.pow(2, 2));


function getRandomPoint(min, max) {
    return +(Math.random()*(max-min+1)+min).toFixed(2);
}


let x = 2;
let area = {};

do {
    area[x] = 3*Math.pow(x, 2) + 2 * x // 3x² + 2X
    x = +(x+0.01).toFixed(2);
} while(x < 3.01)



// Canvas
const cvs = document.getElementById("canvas");
const ctx = cvs.getContext("2d");

document.getElementById('form').onsubmit = calcular;

function calcular(){
    let points = [];
    let favor = 0;
    
    let [ xMin, xMax, yMin, yMax, tries ] = [
        document.querySelector('#limiteXMin').value,
        document.querySelector('#limiteXMax').value,
        document.querySelector('#limiteYMin').value,
        document.querySelector('#limiteYMax').value,
        document.querySelector('#simulations').value
    ];
    
    for(let i = 0; i < tries; i++){
        points.push( [getRandomPoint(+xMin, xMax-1), getRandomPoint(+yMin, +yMax-1)] );
    }

    ctx.clearRect(0, 0, cvs.width, cvs.height);
    for(const punto of points){
        const [ x,  y ] = punto;
        if(area[x]){
            const size = 15;
            if(y < area[x]){
                favor++;
                ctx.fillStyle = "blue";
                ctx.fillRect(x*size, y*size, size, size)
            }
        }
    }
    
    const areaRect =  (yMax - yMin) * (xMax - xMin);
    const monteCarlo = areaRect * (((favor*100)/tries) / 100);
    const error = ((tries-favor) * 100)/tries;

    showResults({area: areaRect, monteCarlo, error});
}

const showResults = ({area, monteCarlo, error}) => {
    const $results = document.getElementById('results');
    let str =`
        <h2>Resultados</h2>
        <div class="result-control">
            <strong>Area de la Zona de Evaluacion</strong>
            <input type="text" disabled value="${area}" />
        </div>
        <div class="result-control">
            <strong>Evaluacion de MonteCarlo</strong>
            <input type="text" disabled value="${monteCarlo}" />
        </div>
        <div class="result-control">
            <strong>Area de la Integral</strong>
            <input type="text" disabled value="${integral}" />
        </div>
        <div class="result-control">
            <strong>Margen de Error</strong>
            <input type="text" disabled value="${error}%" />
        </div>
    `;

    $results.innerHTML = str;
}