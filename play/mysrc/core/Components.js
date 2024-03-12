export default function Component($target, props)
{
    // 여기에 정보를 저장하고 싶어요
    window.state = { ...props };
    
    // 여기에 html을 담고 싶어요
    window.template;

    // 초기화를 해볼 거에요
    function setup() {
        setState({ someValue: 'initial' });
    }

    // 상태변화 함수를 반환할 거에요
    function setState(newState) {
        window.state = {...window.state, newState};
        render();
    }

    // 렌더 함수를 반환할 거에요
    function render() {
        $target.innerHTML = window.template;
    }

    function setCss(href){
        // Create a link element
        var cssLink = document.createElement("link");
    
        // Set the attributes
        cssLink.href = "src/css/" + href;
        cssLink.rel = "stylesheet";
        cssLink.type = "text/css";
        cssLink.id = "dynamic-link";
    
        // Append it to the head
        document.head.appendChild(cssLink);
    }

    // 초기화;
    setup();
    return { render, setState };
}
