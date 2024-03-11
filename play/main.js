const body = document.body;
let currentStateKey = 0;
const states = [];

function useState(initState) {
    const key = currentStateKey;

    if (states.length === key) {
        states.push(initState);
    }

    const state = states[key];
    const setState = (newState) => {
        
        if (newState === state) return ;
        if (JSON.stringify(newState) === JSON.stringify(state)) return ;
        
        states[key] = newState;
        render();
    }

    currentStateKey += 1;
    return [ state, setState ];
}

function debounceFrame(callback) {
    var nextFrameCallback = -1;
    return () => {
        cancelAnimationFrame(nextFrameCallback);
        nextFrameCallback = requestAnimationFrame(callback);
    }
}

// function Counter () {
//     const [ count, setCount ] = useState(1);
//     // 돔에서 직접 호출하기 위해 window(전역객체)에 할당
//     window.increment = () => setCount(count + 1);
//     return `
//       <div>
//         <strong>count: ${count} </strong>
//         <button onclick="increment()">증가</button>
//       </div>
//     `;
// }

function Cat () {
    const [ cat, setCat ] = useState('고양이');
    window.meow = () => setCat(cat + ' 야옹! ');

    return `
    <div>
      <strong>${cat}</strong>
      <button onclick="meow()">고양이의 울음소리</button>
    </div>
  `;
}

function CounterAndMeow() {
    const [ count, setCount ] = useState(1);
    const [ cat, setCat ] = useState('야옹! ');

    function countMeow(newCount) {
        if (newCount < 0) return ;
        setCount(newCount);
        setCat('야옹! '.repeat(newCount));
    }
    window.increment = () => countMeow(count + 1);
    window.decrement = () => countMeow(count - 1);
    
    return `
        <div>
        <p>고양이가 ${count}번 울어서 ${cat} </p>
        <button onclick="increment()">증가</button>
        <button onclick="decrement()">감소</button>
        </div>
    `;
}

var renderCount = 0;
const render = debounceFrame(() => {
    body.innerHTML = `
        <div>
            renderCount: ${renderCount}
            ${CounterAndMeow()}
        </div>
    `;
    renderCount += 1;
    currentStateKey = 0;
  });

render();