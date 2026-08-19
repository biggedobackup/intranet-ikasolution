import { __assign } from "tslib";
import * as React from 'react';
import { FaArrowLeft, FaCalendarDays, FaUser, FaUserCheck, FaPaperPlane, FaRotate, FaCircleCheck, FaTriangleExclamation, FaPaperclip } from 'react-icons/fa6';
import { CONGE_TYPES, loadConge, createConge, updateConge, loadCongeAttachment, uploadCongeAttachment, removeCongeAttachment } from '../../../services/workflow/conges/index';
import { getCurrentUserName, getCurrentUserEmail, isBlank, isValidEmail, computeJoursInclusive } from '../../../services/shared/index';
import { UserPicker } from '../../../components/UserPicker';
import { FileAttachmentField } from '../../../components/FileAttachmentField';
var emptyForm = {
    titre: '',
    type: CONGE_TYPES[0],
    dateDebut: '',
    dateFin: '',
    jours: '',
    motif: '',
    validateurEmail: ''
};
function formFromExisting(existing) {
    return {
        titre: existing.titre,
        type: existing.type || CONGE_TYPES[0],
        dateDebut: existing.dateDebut,
        dateFin: existing.dateFin,
        jours: String(existing.jours || ''),
        motif: existing.motif,
        validateurEmail: existing.validateurEmail
    };
}
function validateForm(form, demandeurEmail) {
    var errors = {};
    if (isBlank(form.titre))
        errors.titre = 'Le titre est obligatoire.';
    if (isBlank(form.validateurEmail)) {
        errors.validateurEmail = 'Veuillez sélectionner un validateur.';
    }
    else if (!isValidEmail(form.validateurEmail)) {
        errors.validateurEmail = 'Sélectionnez un validateur dans la liste proposée.';
    }
    else if (demandeurEmail && form.validateurEmail.trim().toLowerCase() === demandeurEmail.trim().toLowerCase()) {
        errors.validateurEmail = 'Le validateur ne peut pas être le demandeur lui-même.';
    }
    if (!form.dateDebut)
        errors.dateDebut = 'La date de début est obligatoire.';
    if (!form.dateFin)
        errors.dateFin = 'La date de fin est obligatoire.';
    if (form.dateDebut && form.dateFin && form.dateFin < form.dateDebut) {
        errors.dateFin = 'La date de fin doit être postérieure ou égale à la date de début.';
    }
    else if (form.dateDebut && form.dateFin && (!form.jours || Number(form.jours) <= 0)) {
        errors.dateFin = 'Impossible de calculer le nombre de jours pour ces dates.';
    }
    if (isBlank(form.motif))
        errors.motif = 'Le motif est obligatoire.';
    else if (form.motif.trim().length < 5)
        errors.motif = 'Le motif doit contenir au moins 5 caractères.';
    return errors;
}
export var AjouterConge = function (props) {
    var mode = props.mode, id = props.id, siteUrl = props.siteUrl;
    var isEdit = mode === 'modifier';
    var _a = React.useState(isEdit), loading = _a[0], setLoading = _a[1];
    var _b = React.useState(false), saving = _b[0], setSaving = _b[1];
    var _c = React.useState(''), error = _c[0], setError = _c[1];
    var _d = React.useState(false), notFound = _d[0], setNotFound = _d[1];
    var _e = React.useState(''), demandeurNom = _e[0], setDemandeurNom = _e[1];
    var _f = React.useState(''), demandeurEmail = _f[0], setDemandeurEmail = _f[1];
    var _g = React.useState(undefined), original = _g[0], setOriginal = _g[1];
    var _h = React.useState(emptyForm), form = _h[0], setForm = _h[1];
    var _j = React.useState({}), errors = _j[0], setErrors = _j[1];
    var _k = React.useState(undefined), newId = _k[0], setNewId = _k[1];
    var _l = React.useState(false), submitted = _l[0], setSubmitted = _l[1];
    var _m = React.useState(undefined), existingAttachment = _m[0], setExistingAttachment = _m[1];
    var _o = React.useState(undefined), file = _o[0], setFile = _o[1];
    var _p = React.useState(''), attachmentWarning = _p[0], setAttachmentWarning = _p[1];
    React.useEffect(function () {
        setForm(function (prev) {
            var computed = computeJoursInclusive(prev.dateDebut, prev.dateFin);
            var next = computed !== undefined ? String(computed) : '';
            return next === prev.jours ? prev : __assign(__assign({}, prev), { jours: next });
        });
    }, [form.dateDebut, form.dateFin]);
    React.useEffect(function () {
        if (!siteUrl)
            return undefined;
        var cancelled = false;
        if (isEdit && id) {
            setLoading(true);
            loadConge(siteUrl, id)
                .then(function (existing) {
                if (cancelled)
                    return;
                if (!existing) {
                    setNotFound(true);
                    setLoading(false);
                    return;
                }
                setOriginal(existing);
                setForm(formFromExisting(existing));
                setDemandeurNom(existing.demandeur);
                setDemandeurEmail(existing.demandeurEmail);
                setLoading(false);
                loadCongeAttachment(siteUrl, id).then(function (att) { if (!cancelled)
                    setExistingAttachment(att); }).catch(function () { return undefined; });
            })
                .catch(function () { if (!cancelled) {
                setLoading(false);
                setNotFound(true);
            } });
        }
        else {
            getCurrentUserName(siteUrl).then(function (name) { if (!cancelled)
                setDemandeurNom(name); }).catch(function () { return undefined; });
            getCurrentUserEmail(siteUrl).then(function (email) { if (!cancelled)
                setDemandeurEmail(email); }).catch(function () { return undefined; });
        }
        return function () { cancelled = true; };
    }, [siteUrl, isEdit, id]);
    var setField = function (key, value) {
        setForm(function (prev) {
            var _a;
            return (__assign(__assign({}, prev), (_a = {}, _a[key] = value, _a)));
        });
        setErrors(function (prev) {
            var _a;
            return (prev[key] ? __assign(__assign({}, prev), (_a = {}, _a[key] = undefined, _a)) : prev);
        });
    };
    var handleRemoveAttachment = function () {
        if (!siteUrl || !id || !existingAttachment)
            return;
        removeCongeAttachment(siteUrl, id, existingAttachment.fileName)
            .then(function (ok) { if (ok)
            setExistingAttachment(undefined); })
            .catch(function () { return undefined; });
    };
    var handleSubmit = function (e) {
        e.preventDefault();
        if (!siteUrl) {
            setError('Impossible de contacter SharePoint (site introuvable).');
            return;
        }
        var validationErrors = validateForm(form, demandeurEmail);
        setErrors(validationErrors);
        if (Object.keys(validationErrors).length > 0) {
            setError('Veuillez corriger les champs indiqués avant de continuer.');
            return;
        }
        setError('');
        setSaving(true);
        var payload = {
            titre: form.titre,
            type: form.type,
            dateDebut: form.dateDebut,
            dateFin: form.dateFin,
            jours: Number(form.jours) || 0,
            motif: form.motif,
            validateurEmail: form.validateurEmail
        };
        var finish = function (ok, createdId) {
            setSaving(false);
            if (ok) {
                if (createdId)
                    setNewId(createdId);
                setSubmitted(true);
            }
            else {
                setError("Une erreur est survenue lors de l'enregistrement. Vérifiez les champs (notamment l'email du validateur) et réessayez.");
            }
        };
        var afterSave = function (ok, targetId) {
            if (ok && targetId && file) {
                uploadCongeAttachment(siteUrl, targetId, file)
                    .then(function (uploaded) { if (!uploaded)
                    setAttachmentWarning("La demande a été enregistrée mais l'envoi de la pièce jointe a échoué."); finish(ok, targetId); })
                    .catch(function () { setAttachmentWarning("La demande a été enregistrée mais l'envoi de la pièce jointe a échoué."); finish(ok, targetId); });
                return;
            }
            finish(ok, targetId);
        };
        if (isEdit && id) {
            updateConge(siteUrl, id, payload).then(function (ok) { return afterSave(ok, id); }).catch(function () { return finish(false); });
        }
        else {
            createConge(siteUrl, payload).then(function (createdId) { return afterSave(!!createdId, createdId); }).catch(function () { return finish(false); });
        }
    };
    var inputCls = 'w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-ikaBlue bg-white shadow-sm';
    if (loading) {
        return (React.createElement("main", { className: "pt-6 sm:pt-8 pb-14 min-h-screen bg-slate-100 text-slate-800" },
            React.createElement("div", { className: "mx-auto max-w-2xl px-4 sm:px-6 lg:px-8" },
                React.createElement("div", { className: "bg-white rounded-2xl p-10 shadow-sm border border-slate-200 text-center text-sm text-slate-500 font-semibold" }, "Chargement de la demande..."))));
    }
    if (notFound) {
        return (React.createElement("main", { className: "pt-6 sm:pt-8 pb-14 min-h-screen bg-slate-100 text-slate-800" },
            React.createElement("div", { className: "mx-auto max-w-2xl px-4 sm:px-6 lg:px-8" },
                React.createElement("div", { className: "bg-white rounded-2xl p-10 shadow-sm border border-slate-200 text-center" },
                    React.createElement("p", { className: "text-sm text-slate-500 font-semibold" }, "Demande introuvable."),
                    React.createElement("a", { href: "#page-workflow-liste-conge", className: "mt-4 inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-ikaBlue text-white font-bold text-xs hover:bg-blue-600 shadow transition" },
                        React.createElement(FaArrowLeft, null),
                        " Retour \u00E0 la liste")))));
    }
    if (submitted) {
        return (React.createElement("main", { className: "pt-6 sm:pt-8 pb-14 min-h-screen bg-slate-100 text-slate-800" },
            React.createElement("div", { className: "mx-auto max-w-2xl px-4 sm:px-6 lg:px-8" },
                React.createElement("div", { className: "bg-white rounded-2xl p-10 shadow-sm border border-slate-200 text-center" },
                    React.createElement("div", { className: "flex justify-center" },
                        React.createElement("span", { className: "w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center" },
                            React.createElement(FaCircleCheck, { className: "text-3xl" }))),
                    React.createElement("h1", { className: "mt-4 text-xl font-black text-ikaBlueDark" }, isEdit ? 'Demande modifiée' : 'Demande envoyée'),
                    React.createElement("p", { className: "mt-2 text-sm text-slate-500" },
                        "Votre demande de cong\u00E9 a bien \u00E9t\u00E9 ",
                        isEdit ? 'modifiée' : 'enregistrée',
                        "."),
                    attachmentWarning ? (React.createElement("p", { className: "mt-2 text-xs font-semibold text-amber-600" }, attachmentWarning)) : null,
                    React.createElement("div", { className: "mt-6 flex flex-col sm:flex-row items-center justify-center gap-3" },
                        newId ? (React.createElement("a", { href: "#page-workflow-detail-conge&id=".concat(newId), className: "inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-ikaBlue text-white font-bold text-xs hover:bg-blue-600 shadow transition" }, "Voir la demande")) : null,
                        React.createElement("a", { href: "#page-workflow-liste-conge", className: "inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-700 font-bold text-xs hover:bg-slate-50 transition" },
                            React.createElement(FaArrowLeft, null),
                            " Retour \u00E0 la liste"))))));
    }
    return (React.createElement("main", { className: "pt-6 sm:pt-8 pb-14 min-h-screen bg-slate-100 text-slate-800" },
        React.createElement("div", { className: "mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 space-y-4" },
            React.createElement("nav", { className: "flex items-center gap-2 text-[11px] font-semibold text-slate-500 flex-wrap" },
                React.createElement("a", { href: "#page-accueil", className: "hover:text-ikaBlue transition" }, "Accueil"),
                React.createElement("span", null, "/"),
                React.createElement("a", { href: "#page-workflow-liste-conge", className: "hover:text-ikaBlue transition" }, "Demandes de Cong\u00E9"),
                React.createElement("span", null, "/"),
                React.createElement("span", { className: "text-ikaBlue" }, isEdit ? "Modifier : ".concat(form.titre || '') : 'Nouvelle demande de congé')),
            React.createElement("div", { className: "bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden" },
                React.createElement("div", { className: "px-6 sm:px-8 py-5 border-b border-slate-100" },
                    React.createElement("h1", { className: "text-xl sm:text-2xl font-black text-ikaBlueDark" }, isEdit ? 'Modifier la demande de congé' : 'Nouvelle demande de congé'),
                    React.createElement("p", { className: "mt-1 text-xs text-slate-500" }, "La demande sera transmise au validateur indiqu\u00E9.")),
                React.createElement("form", { onSubmit: handleSubmit, className: "p-6 sm:p-8 space-y-5" },
                    error ? (React.createElement("div", { className: "flex items-start gap-2 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-xs font-semibold text-rose-600" },
                        React.createElement(FaTriangleExclamation, { className: "mt-0.5 shrink-0" }),
                        " ",
                        React.createElement("span", null, error))) : null,
                    React.createElement("div", null,
                        React.createElement("label", { className: "block text-xs font-bold text-slate-700 mb-1.5" }, "Titre"),
                        React.createElement("input", { type: "text", value: form.titre, onChange: function (e) { return setField('titre', e.target.value); }, required: true, placeholder: "Titre de la demande", className: "".concat(inputCls, " ").concat(errors.titre ? 'border-rose-300' : '') }),
                        errors.titre ? React.createElement("p", { className: "mt-1 text-[11px] font-semibold text-rose-600" }, errors.titre) : null),
                    React.createElement("div", null,
                        React.createElement("label", { className: "block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5" },
                            React.createElement(FaUser, { className: "text-ikaBlue text-[10px]" }),
                            " Demandeur"),
                        React.createElement("input", { type: "text", value: demandeurNom, disabled: true, readOnly: true, placeholder: "Chargement...", className: "".concat(inputCls, " bg-slate-50 text-slate-500 cursor-not-allowed") })),
                    React.createElement("div", null,
                        React.createElement("label", { className: "block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5" },
                            React.createElement(FaUserCheck, { className: "text-ikaBlue text-[10px]" }),
                            " Validateur"),
                        React.createElement(UserPicker, { siteUrl: siteUrl, value: form.validateurEmail, onChange: function (email) { return setField('validateurEmail', email); }, placeholder: "Rechercher un collaborateur...", className: "".concat(inputCls, " ").concat(errors.validateurEmail ? 'border-rose-300' : '') }),
                        errors.validateurEmail ? React.createElement("p", { className: "mt-1 text-[11px] font-semibold text-rose-600" }, errors.validateurEmail) : null),
                    React.createElement("div", null,
                        React.createElement("label", { className: "block text-xs font-bold text-slate-700 mb-1.5" }, "Type de cong\u00E9"),
                        React.createElement("select", { value: form.type, onChange: function (e) { return setField('type', e.target.value); }, className: inputCls }, CONGE_TYPES.map(function (t) { return React.createElement("option", { key: t, value: t }, t); }))),
                    React.createElement("div", { className: "grid grid-cols-1 sm:grid-cols-3 gap-4" },
                        React.createElement("div", null,
                            React.createElement("label", { className: "block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5" },
                                React.createElement(FaCalendarDays, { className: "text-ikaBlue text-[10px]" }),
                                " Date de d\u00E9but"),
                            React.createElement("input", { type: "date", value: form.dateDebut, onChange: function (e) { return setField('dateDebut', e.target.value); }, required: true, className: "".concat(inputCls, " ").concat(errors.dateDebut ? 'border-rose-300' : '') }),
                            errors.dateDebut ? React.createElement("p", { className: "mt-1 text-[11px] font-semibold text-rose-600" }, errors.dateDebut) : null),
                        React.createElement("div", null,
                            React.createElement("label", { className: "block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5" },
                                React.createElement(FaCalendarDays, { className: "text-ikaBlue text-[10px]" }),
                                " Date de fin"),
                            React.createElement("input", { type: "date", value: form.dateFin, onChange: function (e) { return setField('dateFin', e.target.value); }, required: true, className: "".concat(inputCls, " ").concat(errors.dateFin ? 'border-rose-300' : '') }),
                            errors.dateFin ? React.createElement("p", { className: "mt-1 text-[11px] font-semibold text-rose-600" }, errors.dateFin) : null),
                        React.createElement("div", null,
                            React.createElement("label", { className: "block text-xs font-bold text-slate-700 mb-1.5" }, "Nombre de jours"),
                            React.createElement("input", { type: "text", value: form.jours ? "".concat(form.jours, " jour(s)") : '', disabled: true, readOnly: true, placeholder: "S\u00E9lectionnez les dates", className: "".concat(inputCls, " bg-slate-50 text-slate-500 cursor-not-allowed") }),
                            React.createElement("p", { className: "mt-1 text-[11px] text-slate-400" }, "Calcul\u00E9 automatiquement selon les dates."))),
                    React.createElement("div", null,
                        React.createElement("label", { className: "block text-xs font-bold text-slate-700 mb-1.5" }, "Motif"),
                        React.createElement("textarea", { value: form.motif, onChange: function (e) { return setField('motif', e.target.value); }, required: true, rows: 4, placeholder: "D\u00E9crivez le motif de votre demande...", className: "".concat(inputCls, " ").concat(errors.motif ? 'border-rose-300' : '') }),
                        errors.motif ? React.createElement("p", { className: "mt-1 text-[11px] font-semibold text-rose-600" }, errors.motif) : null),
                    React.createElement("div", null,
                        React.createElement("label", { className: "block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5" },
                            React.createElement(FaPaperclip, { className: "text-ikaBlue text-[10px]" }),
                            " Pi\u00E8ce jointe (optionnel)"),
                        React.createElement(FileAttachmentField, { existing: existingAttachment, onRemoveExisting: handleRemoveAttachment, file: file, onFileChange: setFile, className: inputCls })),
                    React.createElement("div", { className: "pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3" },
                        React.createElement("button", { type: "submit", disabled: saving, className: "inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-ikaBlue text-white font-bold text-xs hover:bg-blue-600 shadow transition disabled:opacity-60 disabled:cursor-not-allowed" },
                            React.createElement(FaPaperPlane, null),
                            " ",
                            saving ? 'Enregistrement...' : (isEdit ? 'Enregistrer les modifications' : 'Envoyer la demande')),
                        React.createElement("a", { href: isEdit ? "#page-workflow-modifier-conge&id=".concat(id) : '#page-workflow-ajouter-conge', onClick: function (e) { e.preventDefault(); setForm(original ? formFromExisting(original) : emptyForm); setError(''); setFile(undefined); setErrors({}); }, className: "inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-700 font-bold text-xs hover:bg-slate-50 transition" },
                            React.createElement(FaRotate, null),
                            " R\u00E9initialiser"),
                        React.createElement("a", { href: "#page-workflow-liste-conge", className: "inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-700 font-bold text-xs hover:bg-slate-50 transition" },
                            React.createElement(FaArrowLeft, null),
                            " Annuler")))))));
};
export default AjouterConge;
//# sourceMappingURL=AjouterConge.js.map