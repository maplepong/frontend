export function Login() {
    return `
        <h1>로그인</h1>
        <form id="loginForm">
            <div class="form-group">
                <label for="username">사용자 이름:</label>
                <input type="text" id="username" name="username" required>
            </div>
            <div class="form-group">
                <label for="password">비밀번호:</label>
                <input type="password" id="password" name="password" required>
            </div>
            <button type="submit">로그인</button>
            <div class="button-row">
            <button type="button" class="api-login">42 Seoul API로 로그인</button>
            <button type="button" class="signup">회원가입</button>
        </div>
        </form>
    `;
}

export function setupSignupButton() {
    const signupButton = document.querySelector('.signup');
    if (signupButton) {
        signupButton.addEventListener('click', () => {
            history.pushState({}, '', '/signup');
            const routeChangeEvent = new CustomEvent('routeChange');
            window.dispatchEvent(routeChangeEvent);
        });
    }
}

export function setupLoginForm() {
    const form = document.getElementById('loginForm');
    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            // 자격 증명 검증 로직...
            if (username === 'admin' && password === 'password') {
                console.log('로그인 성공');
                history.pushState({}, '', '/game');
                const routeChangeEvent = new CustomEvent('routeChange');
                window.dispatchEvent(routeChangeEvent);
            } else {
                alert('잘못된 사용자 이름 또는 비밀번호입니다.');
            }
        });
    }
}
