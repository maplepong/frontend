//params = type, validate, label, id, placeholder;
const InputTest = (params) => {
	handleBlur = () => {
		validate;
	}

	var type, validate, label, id, placeholder;
	type = params.type == undefined ? '' : ` type=` + params.type;
	label = params.label == undefined ? '' : `<InputLabel>` + params.label + `</InputLabel>`;
	id = params.id == undefined ? '' : ` id=` + params.id;
	placeholder = params.placeholder == undefined ? '' : ` placeholder=` + params.placeholder;
	validate = params.placeholder == undefined ? `` : ` onblur={handleBlur} `;
	

	return label + `<input` + id + placeholder + type + validate + `></input>`
}