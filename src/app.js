import Component from "./core/Component.js";
import Items from "./components/Items.js";
import ItemAppender from "./components/ItemAppender.js";
import ItemFilter from "./components/ItemFilter.js";
import router from "../src/core/Router.js";

export default class app extends Component {
  setup() {
    this.state = {};
    document.addEventListener("DOMContentLoaded", () => {
      ["home", "about", "contact", "login"].forEach((path) => {
        const button = document.getElementById(path);
        button.addEventListener("click", () => {
          const newPath = "/" + path;
          history.pushState({}, "", newPath);
          router(); // 변경된 URL에 따라 컴포넌트 렌더링
        });
      });

      window.addEventListener("routeChange", router);
      window.addEventListener("popstate", router);

      // 초기 페이지 로드 시 라우터 호출
      router();
    });
  }

  template() {
    return `
		<h1>Simple Spa</h1>
		<header>
			<button id="home">Home</button>
			<button id="about">About</button>
			<button id="contact">Contact</button>
			<button id="login">Login</button>
		</header>
		<header data-component="item-appender"></header>
		<main data-component="items"></main>
		<footer data-component="item-filter"></footer>
		<main></main>
		`;
  }

  mounted() {
    //구조분해할당
    // 하나의 객체에서 사용하는 메소드를 넘겨줄 bind를 사용하여 this를 변경하거나,
    // 다음과 같이 새로운 함수를 만들어줘야 한다.
    // ex) { addItem: contents => addItem(contents) }
    const { filteredItems, addItem, deleteItem, toggleItem, filterItem } = this;
    const $itemAppender = this.$target.querySelector(
      '[data-component="item-appender"]'
    );
    const $items = this.$target.querySelector('[data-component="items"]');
    const $itemFilter = this.$target.querySelector(
      '[data-component="item-filter"]'
    );

    new Items($items, {
      filteredItems,
      deleteItem: deleteItem.bind(this),
      toggleItem: toggleItem.bind(this),
    });

    new ItemAppender($itemAppender, { addItem: addItem.bind(this) });

    new ItemFilter($itemFilter, {
      filterItem: filterItem.bind(this),
    });
  }
  get filteredItems() {
    const { isFilter, items } = this.state;
    return items.filter(
      ({ active }) =>
        (isFilter === 1 && active) ||
        (isFilter === 2 && !active) ||
        isFilter === 0
    );
  }

  deleteItem(seq) {
    const items = [...this.state.items];
    //seq가 같은 item을 findIndex로 찾아서 제거
    items.splice(
      items.findIndex((v) => v.seq === seq),
      1
    );
    this.setState({ items });
  }

  toggleItem(seq) {
    const items = [...this.state.items];
    const index = items.findIndex((v) => v.seq === seq);
    items[index].active = !items[index].active;
    this.setState({ items });
  }

  filterItem(isFilter) {
    this.setState({ isFilter });
  }

  // addItem($content){
  // 	var items = [ ...this.state.items];
  // 	items = [...items, {
  // 		seq : items.length + 1,
  // 		content: $content,
  // 		active: false,
  // 	}]
  // this.setState ({items});
  // };

  addItem(contents) {
    const { items } = this.state;
    const seq = Math.max(0, ...items.map((v) => v.seq)) + 1;
    const active = false;
    this.setState({
      items: [...items, { seq, contents, active }],
    });
  }
}
