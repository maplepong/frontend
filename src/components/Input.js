import Component from "../core/Component.js";

export default class Input extends Component {
  setup() {}
  template() {
    return `
	<input type="text"></input>
	<button id="input-submit" />
	`;
  }
  setEvent() {
    const { submit } = this.props;
    this.addEvent("keyup", "input", ({ key }) => {
      if (key != "Enter") return;
      submit();
    });
    this.addEvent("click", "input", () => {
      submit();
    });
  }
}
