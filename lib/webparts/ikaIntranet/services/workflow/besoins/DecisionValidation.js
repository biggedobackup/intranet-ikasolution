export var BESOIN_DECISION_CONFIG = {
    modalTitle: function (action) {
        return action === 'valider' ? "Valider l'expression de besoin" : "Rejeter l'expression de besoin";
    },
    modalMessage: function (item, action) {
        return action === 'valider'
            ? "Vous allez approuver l'expression de besoin \u00AB ".concat(item.titre, " \u00BB de ").concat(item.demandeur, ".")
            : "Vous allez rejeter l'expression de besoin \u00AB ".concat(item.titre, " \u00BB de ").concat(item.demandeur, ". Cette action est irr\u00E9versible.");
    },
    validateLabel: 'Valider le besoin',
    rejectLabel: 'Rejeter le besoin',
    validateVerb: 'Validée',
    rejectVerb: 'Rejetée',
    decisionSectionTitle: 'Décision de validation'
};
//# sourceMappingURL=DecisionValidation.js.map