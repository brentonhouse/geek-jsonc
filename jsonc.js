
const jsonc = {};
const _ = require(`lodash`);
const fs = require(`fs-extra`);
module.exports = jsonc;

jsonc.parser = require(`jsonc-parser`);
jsonc.stringify = (value, replacer, space) => require(`fast-safe-stringify`)(value, replacer, space);
jsonc.colorify = (value, replacer, space) => require(`./color-json`)(value, { indent: space });

jsonc.parse = (json, errors = [], { allowTrailingComma = true, allowEmptyContent = false, disallowComments = false } = {}) => {

	const result = jsonc.parser.parse(json, errors, { allowTrailingComma, allowEmptyContent, disallowComments });
	if (errors.length) {
		console.error(errors.error);
		return null;
	}

	return result;

};

jsonc.readJsonc = async (file, options = {}) => {

	const content = await fs.readFile(file, `utf8`);
	const errors = [];
	const { allowTrailingComma, allowEmptyContent, disallowComments } = options;
	const json = jsonc.parse(content, errors, { allowTrailingComma, allowEmptyContent, disallowComments });
	if (errors.length && options.throwErrors) {
		throw errors[0];
	}
	return json;

};


