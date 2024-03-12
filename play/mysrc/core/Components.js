export default function Component($target, props)
{
    window.state = {...props};
    window.template;

    function setState(newState) {
        window.state = {...window.state, newState};
        render();
    }

    function render() {
        $target.innerHTML = window.template;
    }

    function setup() {
        setState({ someValue: 'initial' });
    }

    setup();
    return { render, setState };
}