export default class Component {
  constructor($target, props) {
    this.$target = $target;
    this.props = props;
    this.setup();
    this.render(); // 최초 렌더
    this.setEvent();
  }

  // 생성시 new Component(채워넣을 최상위 노드 변수) 이런 식으로 들어감.
  // target은 생성할 모든 요소를 자식으로 하는 부모 노드.
  $target;

  // 상태 : 내부 구조
  state;

  // 부모 컴포넌트가 자식 컴포넌트에게 상태 혹은 메소드를 넘겨주기 위함
  props;

  // 컴포넌트 생성시 상태 초기화
  // 예시는 Items.js 참조
  setup() {}

  // 내부 구조 생성기
  // html 텍스트 리턴
  template() {
    return "";
  }

  // 렌더 이후 추가적인 기능 수행
  mounted() {}

  // target 내부에 template()함수를 통해 리턴받은 구조를 넣어 렌더
  // 최초 한번 이후에는 setState를 통해서만 함수 소환
  render() {
    this.$target.innerHTML = this.template();
    this.mounted();
  }

  // 이벤트 핸들러 등록
  // 렌더할 때마다 하는 것에서 타겟 생성 시에만 이벤트를 설정하게 변경 - 라이프 사이클 변경
  setEvent() {}

  //상태가 변경/추가될 경우 state상태 변수를 업데이트하고 렌더
  setState(newState) {
    this.state = { ...this.state, ...newState };
    this.render();
  }

  setProps() {}

  // 컴포넌트에 이벤트를 등록하기 편하게 만들어 둔 함수. setEvent에서 불러오면 됨
  // eventType: click, hover 등 '텍스트'
  // selector: 해당 자식 노드 중에서 원하는 걸 걸러낼 필터. "태그/id/class" 상관없음.
  //           "a, b" or로 선택 가능
  // callback: 이벤트 발생 시 실행시킬 함수
  addEvent(eventType, selector, callback) {
    const children = [...this.$target.querySelectorAll(selector)];
    this.$target.addEventListener(eventType, event => {
      event.preventDefault();
      if (!event.target.closest(selector)) return false;
      callback(event);
    });
  }

  setCss(href) {
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
}