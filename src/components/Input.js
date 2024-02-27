import Component from "../core/Component.js";

export default class Input extends Component {
  $button;
  setup() {
    this.$button = false;
    if (this.props.button === true) this.$button = true;
  }
  template() {
    return `
	<input type="text"></input>
	${this.$button ? `<button id="input-submit" /> ` : ``}
	`;
  }
  setEvent() {
    const { validate } = this.props;
    this.addEvent("keyup", "input", ({ key, target }) => {
      if (key != "Enter") return;
      console.log(target.value);
      validate(target.value);
    });
    if (this.$button) {
      this.addEvent("click", "#input-submit", (target) => {
        validate(target.value);
      });
    }
  }
}
