import Component from '../core/Component.js'


// props: addItem
export default class ItemAppeneder extends Component {
	template(){
		return `<input type="text" class="appender" placeholder="아이템내용입력칸" />`;
	}

	//props에 addItem 있어야 함
	setEvent(){
		const { addItem } = this.props;
		this.addEvent('keyup', '.appender', ({key, target }) => {
			if (key != 'Enter') return;
				addItem(target.value);
		})
	}
}
