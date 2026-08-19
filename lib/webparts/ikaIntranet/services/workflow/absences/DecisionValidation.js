export var ABSENCE_DECISION_CONFIG = {
    modalTitle: function (action) {
        return action === 'valider' ? "Valider le signalement d'absence" : "Rejeter le signalement d'absence";
    },
    modalMessage: function (item, action) {
        return action === 'valider'
            ? "Vous allez approuver le signalement d'absence \u00AB ".concat(item.titre, " \u00BB de ").concat(item.demandeur, ".")
            : "Vous allez rejeter le signalement d'absence \u00AB ".concat(item.titre, " \u00BB de ").concat(item.demandeur, ". Cette action est irr\u00E9versible.");
    },
    validateLabel: 'Valider le signalement',
    rejectLabel: 'Rejeter le signalement',
    validateVerb: 'Validé',
    rejectVerb: 'Rejeté',
    decisionSectionTitle: 'Décision de validation'
};
//# sourceMappingURL=DecisionValidation.js.map