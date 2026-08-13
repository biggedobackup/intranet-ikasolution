"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ABSENCE_DECISION_CONFIG = void 0;
exports.applyAbsenceDecision = applyAbsenceDecision;
var tslib_1 = require("tslib");
exports.ABSENCE_DECISION_CONFIG = {
    modalTitle: function (action) {
        return action === 'valider' ? 'Valider le signalement d&apos;absence' : 'Rejeter le signalement d&apos;absence';
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
function applyAbsenceDecision(item, action, comment, date) {
    return tslib_1.__assign(tslib_1.__assign({}, item), { statut: action === 'valider' ? 'Approuvé' : 'Refusé', decisionComment: comment, decisionDate: date });
}
//# sourceMappingURL=DecisionValidation.js.map