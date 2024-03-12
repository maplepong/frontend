export default function Component($target, props)
{   
    window.state = { ...props };
    window.template;

    // 초기화
    function setup() {
        setState({ someValue: 'initial' });
    }

    // 상태변화
    function setState(newState) {
        window.state = {...window.state, newState};
        render() // setState() 이후 render
    }
    
    // 렌더 함수
    function render() {
        $target.innerHTML = window.template;
        //setState() 관련 로직 필요?
    }
    
    //setCss
    function setCss(href) {
        // Create a link element
        var cssLink = document.createElement("link");
        
        console.log(href);
        // Set the attributes
        cssLink.href = "src/css/" + href;
        cssLink.rel = "stylesheet";
        cssLink.type = "text/css";
        cssLink.id = "dynamic-link";
        
        // Append it to the head
        document.head.appendChild(cssLink);
    }
    
    return { setup, render, setState, setCss };
}
