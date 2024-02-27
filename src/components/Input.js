import Component from "../core/Component.js";

//props: text-label, func-validate(target.value), text-placeholder
// label: input 왼쪽에 오는 텍스트
// validate: 유효성 검사를 위한 함수. 검사안할경우 false
// -- target.value: input 안에 들어오는 값 전달
// placeholder: input에 기본으로 들어가있는 text

export default class Input extends Component {
  setup() {
    this.props.placeholder =
      this.props.placeholder === undefined ? null : this.props.placeholder;
    this.props.label = this.props.label === undefined ? null : this.props.label;
  }
  template() {
    return `
	${
    this.props.label === null
      ? ""
      : "<InputLabel>" + this.props.label + "</InputLabel>"
  }
	<input type="text" 
	style="margin: 5px"
	${(this.props.placeholder = null
    ? ""
    : 'placeholder ="' + this.props.placeholder + '"')}
	></input>
	`;
  }
  setEvent() {
    const { validate } = this.props;
    const $input = this.$target.querySelector("input");
    $input.onfocus = () => {
      $input.style.backgroundColor = "green";
    };
    $input.onblur = () => {
      $input.style.backgroundColor = "white";
    };
    this.addEvent("keyup", "input", ({ key, target }) => {
      if (key != "Enter") return;
      validate(target.value);
    });
    if (this.$button) {
      this.addEvent("click", "#input-submit", target => {
        validate(target.value);
      });
    }
  }
}
