// Create our regex
let templateRegex;

module.exports = {
    setDelimiters(pLeft, pRight) {
        templateRegex = new RegExp(pLeft + '(.*?)' + pRight, 'g');
    },

    // Quick and dirty template method
    TemplateHelper(pTemplate, pValues) {
        if (templateRegex == null) module.exports.setDelimiters('\%\%', '\%\%');

        return pTemplate.replace(templateRegex, function (i, pMatch) {
            return pValues[pMatch];
        });
    }
};
