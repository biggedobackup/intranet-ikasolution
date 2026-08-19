"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CONGE_DECISION_CONFIG = void 0;
exports.CONGE_DECISION_CONFIG = {
    modalTitle: function (action) {
        return action === 'valider' ? 'Valider la demande de congé' : 'Rejeter la demande de congé';
    },
    modalMessage: function (item, action) {
        return action === 'valider'
            ? "Vous allez approuver la demande de cong\u00E9 \u00AB ".concat(item.titre, " \u00BB de ").concat(item.demandeur, ".")
            : "Vous allez rejeter la demande de cong\u00E9 \u00AB ".concat(item.titre, " \u00BB de ").concat(item.demandeur, ". Cette action est irr\u00E9versible.");
    },
    validateLabel: 'Valider la demande',
    rejectLabel: 'Rejeter la demande',
    validateVerb: 'Validée',
    rejectVerb: 'Rejetée',
    decisionSectionTitle: 'Décision de validation'
};
//# sourceMappingURL=DecisionValidation.js.map