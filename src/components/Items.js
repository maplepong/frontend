import Component from "../core/Component.js";

export default class Items extends Component {
  // Items 컴포넌트의 경우, 아이템(할일)이 두가지 있음
  // 여기서 추가/삭제되는 것이 상태가 변경되는 것이고, 렌더가 되는 타이밍이라고 생각하면 됨
  setup() {
    // this.state = { items: ['item1', 'item2']};
  }

  template() {
    const { filteredItems } = this.props;
    return `
		 <ul>
			${filteredItems
        .map(
          ({ contents, active, seq }) => `
				<li data-seq="${seq}">
					${contents}
					<button class='toggleBtn' style="color: ${active ? "red" : "blue"}">
						${active ? "활성" : "비활성"} 
					</button>
					<button class="deleteBtn">삭제</button>
				</li>
			`
        )
        .join("")}
		</ul>
		`;
  }

  setEvent() {
    const { deleteItem, toggleItem } = this.props;

    this.addEvent("click", ".toggleBtn", ({ target }) => {
      toggleItem(Number(target.closest("[data-seq]").dataset.seq));
    });
    this.addEvent("click", ".deleteBtn", ({ target }) => {
      deleteItem(Number(target.closest("[data-seq]").dataset.seq));
    });
  }
}
