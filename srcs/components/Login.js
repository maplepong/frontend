import Component from "../core/Component.js"

export default class Login extends Component {
    constructor($target) {
        super($target); // 기반 클래스의 생성자 호출
        // 으레 클래스 문법이 그렇듯이(C++ 등)
        // 상속된 클래스의 경우, 기반 클래스의 생성자가 먼저 호출된 후
        // 파생 클래스의 생성자가 호출되는 것처럼, 파생 클래스의 생성자 호출 이전에
        // super로 기반 클래스의 생성자를 호출한다.
        // this.$target = $target;
        // this.setup();
        // this.render();
    }

    setup() {
        // state 설정
        this.state = { // 아이디와 비밀번호 객체
            username: '',
            password: ''
        }
    }

    template() {
        // 로그인 폼 HTML 반환
        return `
            <div id="toHome">홈으로</div>
            <div class="login-container">
                <form id="loginForm">
                    <input type="text" id="username" name="username" placeholder="Username" />
                    <input type="password" id="password" name="password" placeholder="Password" />
                    <button type="submit">로그인</button>
                </form>
            </div>
        `;
    }

    setEvent() {
        // 로그인 폼 이벤트 리스너 등록
        this.$target.querySelector('#loginForm').addEventListener('submit', (e) => {
            e.preventDefault(); // 폼 제출 기본 동작 방지
            this.setState({
                username: this.$target.querySelector('#username').value,
                password: this.$target.querySelector('#password').value
            });
            // 여기서 로그인 처리 로직을 추가할 수 있음
            // 추가 필요₩
            console.log(this.state); // 현재 상태 출력하여 확인
        });

        // 홈으로 가기 이벤트 리스너 등록
        this.$target.querySelector('#toHome').addEventListener('click', (e) => {
            console.log("홈으로 누름"); // 현재 상태 출력하여 확인
            history.pushState({}, '', '/home');
            // History Api Stack에 /home 추가 후 이동 
            const event = new CustomEvent('routeChange');
            window.dispatchEvent(event);
        });
    }
}

// state에 username과 password 란을 작성해놓았다.
// username과 password를 입력받아 console에 출력한다.
// 차후 로그인 관련 추가 작업 필요.
// Home으로 라우팅할 수 있는 이벤트가 추가되어 있다.