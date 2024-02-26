import Component from "../core/Component.js";

export default class Home extends Component {
    template() {
        return `<h1 id="tr">TRANSCENDENCE</h1>
                <h2 id="title">우당탕탕 초월 대작전</h2>
                <button id="moveLogin">로그인</button>
                `
    }

    setEvent() {
        this.$target.querySelector('#moveLogin').addEventListener('click', (e) => {
            console.log("로그인 버튼 누름"); // 현재 상태 출력하여 확인
            history.pushState({}, '', '/login');
            const event = new CustomEvent('routeChange');
            window.dispatchEvent(event);
        });
    }
}

// 단순한 텍스트를 보여줄 수 있다.
// 버튼을 만들고 setEvent에 EventListener를 작성한 후
// CustomEvent를 발생시키면 app.js에서 이벤트를 포착한 후
// 라우팅하여 페이지를 다시 쓴다.