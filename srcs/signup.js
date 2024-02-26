export function Signup() {
    return `
        <h1>회원가입</h1>
        <form id="signupForm">
            <div class="form-group">
                <label for="signupUsername">사용자 이름:</label>
                <input type="text" id="signupUsername" name="username" required>
            </div>
            <div class="form-group">
                <label for="signupEmail">이메일:</label>
                <input type="email" id="signupEmail" name="email" required>
            </div>
            <div class="form-group">
                <label for="signupPassword">비밀번호:</label>
                <input type="password" id="signupPassword" name="password" required>
            </div>
            <div class="form-group">
                <label for="signupPasswordConfirm">비밀번호 확인:</label>
                <input type="password" id="signupPasswordConfirm" name="passwordConfirm" required>
            </div>
            <button type="submit">계정 만들기</button>
        </form>
    `;
}
