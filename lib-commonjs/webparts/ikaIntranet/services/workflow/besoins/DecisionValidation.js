"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BESOIN_DECISION_CONFIG = void 0;
exports.applyBesoinDecision = applyBesoinDecision;
var tslib_1 = require("tslib");
exports.BESOIN_DECISION_CONFIG = {
    modalTitle: function (action) {
        return action === 'valider' ? 'Valider l&apos;expression de besoin' : 'Rejeter l&apos;expression de besoin';
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
function applyBesoinDecision(item, action, comment, date) {
    return tslib_1.__assign(tslib_1.__assign({}, item), { statut: action === 'valider' ? 'Approuvé' : 'Refusé', decisionComment: comment, decisionDate: date });
}
//# sourceMappingURL=DecisionValidation.js.map