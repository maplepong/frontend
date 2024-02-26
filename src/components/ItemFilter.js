import Component from '../core/Component.js'

export default class ItemFilter extends Component{
	setup(){

	}

	template(){
		return `
		<button class="filterBtn" data-is-filter="0">전체</button>
		<button class="filterBtn" data-is-filter="1">활성</button>
		<button class="filterBtn" data-is-filter="2">비활성</button>
		`
	}

	setEvent(){
		const {filterItem } = this.props;
		this.addEvent('click', '.filterBtn', ({target}) => {
			filterItem(Number(target.dataset.isFilter));
		})
	}
}