import Component from "../core/Component.js";

//props: text-label, func-validate(target.value), text-placeholder
// label: input 왼쪽에 오는 텍스트
// validate: 유효성 검사를 위한 함수. 검사안할경우 false
// -- target.value: input 안에 들어오는 값 전달
// placeholder: input에 기본으로 들어가있는 text
// id: id;
// type: input type;

export default class Input extends Component {
	$data;
	setup() {
		this.props = this.props == undefined ? {} : this.props;
  }
  template() {
	const $ = this.props;
    return `
	${$.label == undefined
      ? ""
      : "<InputLabel>" + $.label + "</InputLabel>"
  }
	<input
	type="${$.type == undefined ? 'text' : $.type}"
  	${$.id == undefined ? '' : 'id="'+ $.id + '"'}
	style="margin: 5px"
	${($.placeholder == undefined 
    ? ""
    : 'placeholder ="' + $.placeholder + '"')}
	></input>
	`;
  }
  setEvent() {
    const { validate } = this.props;
    const $input = this.$target.querySelector("input");
    $input.onblur = () => {
		if (validate !== undefined && $input.value != "")
			validate($input.value);
    };
  }
}

