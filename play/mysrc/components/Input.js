import Component from './Component.js'; // Component 함수 경로 확인 필요

function Input($target, props) {
    // Component 함수를 활용하여 Input 컴포넌트 초기화
    const inputComponent = Component($target, props);

    // Input 컴포넌트의 초기 상태 설정
    inputComponent.setState({ ...props, someValue: 'initial' });

    // Input 컴포넌트의 render 함수 재정의
    inputComponent.render = () => {
        const $ = window.state;
        window.template = `
            ${$.label === undefined ? "" : `<InputLabel>${$.label}</InputLabel>`}
            <input
                type="${$.type === undefined ? 'text' : $.type}"
                ${$.id === undefined ? '' : `id="${$.id}"`}
                style="margin: 5px"
                ${$.placeholder === undefined ? "" : `placeholder="${$.placeholder}"`}
            ></input>
        `;
        // 여기에 필요한 추가 로직을 구현할 수 있습니다.
    };

    // Input 컴포넌트의 이벤트 핸들러 설정
    inputComponent.setEvent = () => {
        const { validate } = window.state;
        const $input = $target.querySelector("input");
        $input.onblur = () => {
            if (validate !== undefined && $input.value !== "")
                validate($input.value);
        };
    };

    // Input 컴포넌트의 초기 렌더링 및 이벤트 핸들러 설정 실행
    inputComponent.render();
    inputComponent.setEvent();

    // 필요한 경우 추가 기능을 여기에 구현

    return inputComponent;
}

export default Input;
