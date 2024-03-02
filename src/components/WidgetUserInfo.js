import Component from "../core/Component.js";

export default class WidgetUserInfo extends Component {
	setup() {
		this.setCss("WidgetUserInfo.css");
	}
	template () {
		return`
		<div id="container">
			<div id="info-line">
				<div class="level">level</div>
				<div class="level">14</div>
				<div class="usernickname">내닉네임</div>
			</div>
			<div id="status-line" style="background-color: #f1f1f1">
				<div id="stat-name">HP</div>
				<div id="stat-value">
					<div id="stat-value-text">25/50</div>
					<div id="stat-value-bar" class="red" data-value="25" />
				</div>
			</div>
			</div>
			<div id="status-line" style="background-color: #DADADA">
				<div id="stat-name">MP</div>
				<div id="stat-value">
					<div id="stat-value-text">4/5</div>
					<div id="stat-value-bar" class="blue" data-value="4" />
				</div>
			</div>
		</div>
		`
	}
}