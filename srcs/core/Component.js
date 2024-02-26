// Javascript의 클래스 문법을 숙지해두도록 하자
export default class Component {
    $target; 
    // 매개변수로 받은 DOM이다. setup으로 초기설정을 하고
    // render로 렌더링한다. 
    state; //
    
    // 매개변수 DOM을 받아 컴포넌트를 초기화한다.
    constructor ($target) { 
      this.$target = $target;
      this.setup(); 
      // 컴포넌트의 추가적인 설정을 위한 메서드
      // 기본적으로 비어있으며, 상속받는 Class에서
      // override 할 수 있다.
      // state를 정의하면 좋을 것 같다.
      // 용도에 맞게 함수를 추가해보자.
      this.render();
      // 컴포넌트를 렌더링하는 메서드. 
      // $target의 innerHTML을 template 메서드가 반환하는 값으로 설정하고,
      // setEvent 메서드를 호출한다.
    }

    setup () {};
    template () { return ''; }
       // 컴포넌트의 HTML 구조를 문자열 형태로 반환하는 메서드다. 
       // 이 메서드는 render 메서드에서 호출되며, 반환된 HTML 문자열은 $target 요소의 innerHTML로 설정된다.
    render () {
      this.$target.innerHTML = this.template();
      this.setEvent();
    }
    setEvent () {}
    // DOM 요소에 이벤트 리스너를 등록하는 메서드.
    // 기본 구현은 비어 있으며, 필요에 따라 상속받는 클래스에서 구현할 수 있다.
    setState (newState) {
      this.state = { ...this.state, ...newState };
      this.render();
      // 컴포넌트의 상태를 업데이트하는 메서드다. 
      // 새 상태 객체(newState)를 기존 상태(this.state)와 병합한 후, 
      // 컴포넌트를 다시 렌더링합니다.
    }
}