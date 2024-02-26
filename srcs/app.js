import { Login } from './login.js';
import { setupSignupButton } from './login.js';
import { setupLoginForm } from './login.js';
import { Signup } from './signup.js';
import { Game } from './game.js';

// 컴포넌트 함수들
function Home() {
    return `<h1>TRANSCENDENCE</h1>
            <p>우당탕탕 초월 대작전</p>`;
}

function About() {
    return `<h1>ABOUT</h1>
            <p>참여자: 조수빈 정원이 이시원 박경민</p>
            <p class="fade-move">이주현</p>`;
}

function Contact() {
    return `<h1>CONTACT</h1>
            <p>연락 안 받습니다</p>`;
}

// 라우터 함수
function router() {
    const path = window.location.pathname;
    const main = document.querySelector('main');

    switch (path) {
        case '/home':
            main.innerHTML = Home();
            break;
        case '/about':
            main.innerHTML = About();
            break;
        case '/contact':
            main.innerHTML = Contact();
            break;
        case '/login':
            main.innerHTML = Login();
            setupLoginForm();
            setupSignupButton();
            break;
        case '/signup':
            main.innerHTML = Signup();
            break;
        case '/game':
            main.innerHTML = Game();
            break;
        default:
            main.innerHTML = Home(); // 기본 경로
    }
}

// 이벤트 리스너
document.addEventListener('DOMContentLoaded', () => {
    ['home', 'about', 'contact', 'login'].forEach((path) => {
        const button = document.getElementById(path);
        button.addEventListener('click', () => {
            const newPath = '/' + path;
            history.pushState({}, '', newPath);
            router(); // 변경된 URL에 따라 컴포넌트 렌더링
        });
    });

    window.addEventListener('routeChange', router);
    window.addEventListener('popstate', router);

    // 초기 페이지 로드 시 라우터 호출
    router();
});
