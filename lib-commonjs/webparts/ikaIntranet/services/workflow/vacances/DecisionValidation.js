"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VACANCE_DECISION_CONFIG = void 0;
exports.applyVacanceDecision = applyVacanceDecision;
var tslib_1 = require("tslib");
exports.VACANCE_DECISION_CONFIG = {
    modalTitle: function (action) {
        return action === 'valider' ? 'Valider la demande de vacances' : 'Rejeter la demande de vacances';
    },
    modalMessage: function (item, action) {
        return action === 'valider'
            ? "Vous allez approuver la demande de vacances \u00AB ".concat(item.titre, " \u00BB de ").concat(item.demandeur, ".")
            : "Vous allez rejeter la demande de vacances \u00AB ".concat(item.titre, " \u00BB de ").concat(item.demandeur, ". Cette action est irr\u00E9versible.");
    },
    validateLabel: 'Valider la demande',
    rejectLabel: 'Rejeter la demande',
    validateVerb: 'Validée',
    rejectVerb: 'Rejetée',
    decisionSectionTitle: 'Décision de validation'
};
function applyVacanceDecision(item, action, comment, date) {
    return tslib_1.__assign(tslib_1.__assign({}, item), { statut: action === 'valider' ? 'Approuvé' : 'Refusé', decisionComment: comment, decisionDate: date });
}
//# sourceMappingURL=DecisionValidation.js.map