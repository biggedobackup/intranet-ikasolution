"use strict";
self["webpackHotUpdate_75e4b5d4_d962_489b_a3d6_4d96675cb3b4_0_0_1"]("ika-intranet-web-part",{

/***/ 1646
/*!*****************************************************************************!*\
  !*** ./lib/webparts/ikaIntranet/pages/workflow/vacances/AjouterVacances.js ***!
  \*****************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AjouterVacances: () => (/* binding */ AjouterVacances),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ 196);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ 5959);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_icons_fa6__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-icons/fa6 */ 251);
/* harmony import */ var _services_workflow_vacances_index__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../services/workflow/vacances/index */ 8344);
/* harmony import */ var _services_shared_index__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../services/shared/index */ 8717);
/* harmony import */ var _components_UserPicker__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../components/UserPicker */ 666);
/* harmony import */ var _components_FileAttachmentField__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../components/FileAttachmentField */ 134);







var emptyForm = { titre: '', destination: '', dateDebut: '', dateFin: '', jours: '', motif: '', validateurEmail: '' };
function formFromExisting(existing) {
    return {
        titre: existing.titre,
        destination: existing.destination,
        dateDebut: existing.dateDebut,
        dateFin: existing.dateFin,
        jours: String(existing.jours || ''),
        motif: existing.motif,
        validateurEmail: existing.validateurEmail
    };
}
function validateForm(form, demandeurEmail) {
    var errors = {};
    if ((0,_services_shared_index__WEBPACK_IMPORTED_MODULE_4__.isBlank)(form.titre))
        errors.titre = 'Le titre est obligatoire.';
    if ((0,_services_shared_index__WEBPACK_IMPORTED_MODULE_4__.isBlank)(form.validateurEmail)) {
        errors.validateurEmail = 'Veuillez sélectionner un validateur.';
    }
    else if (!(0,_services_shared_index__WEBPACK_IMPORTED_MODULE_4__.isValidEmail)(form.validateurEmail)) {
        errors.validateurEmail = 'Sélectionnez un validateur dans la liste proposée.';
    }
    else if (demandeurEmail && form.validateurEmail.trim().toLowerCase() === demandeurEmail.trim().toLowerCase()) {
        errors.validateurEmail = 'Le validateur ne peut pas être le demandeur lui-même.';
    }
    if ((0,_services_shared_index__WEBPACK_IMPORTED_MODULE_4__.isBlank)(form.destination))
        errors.destination = 'La destination est obligatoire.';
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
    if ((0,_services_shared_index__WEBPACK_IMPORTED_MODULE_4__.isBlank)(form.motif))
        errors.motif = 'Le motif est obligatoire.';
    else if (form.motif.trim().length < 5)
        errors.motif = 'Le motif doit contenir au moins 5 caractères.';
    return errors;
}
var AjouterVacances = function (props) {
    var mode = props.mode, id = props.id, siteUrl = props.siteUrl;
    var isEdit = mode === 'modifier';
    var _a = react__WEBPACK_IMPORTED_MODULE_1__.useState(isEdit), loading = _a[0], setLoading = _a[1];
    var _b = react__WEBPACK_IMPORTED_MODULE_1__.useState(false), saving = _b[0], setSaving = _b[1];
    var _c = react__WEBPACK_IMPORTED_MODULE_1__.useState(''), error = _c[0], setError = _c[1];
    var _d = react__WEBPACK_IMPORTED_MODULE_1__.useState(false), notFound = _d[0], setNotFound = _d[1];
    var _e = react__WEBPACK_IMPORTED_MODULE_1__.useState(''), demandeurNom = _e[0], setDemandeurNom = _e[1];
    var _f = react__WEBPACK_IMPORTED_MODULE_1__.useState(''), demandeurEmail = _f[0], setDemandeurEmail = _f[1];
    var _g = react__WEBPACK_IMPORTED_MODULE_1__.useState(undefined), original = _g[0], setOriginal = _g[1];
    var _h = react__WEBPACK_IMPORTED_MODULE_1__.useState(emptyForm), form = _h[0], setForm = _h[1];
    var _j = react__WEBPACK_IMPORTED_MODULE_1__.useState({}), errors = _j[0], setErrors = _j[1];
    var _k = react__WEBPACK_IMPORTED_MODULE_1__.useState(undefined), newId = _k[0], setNewId = _k[1];
    var _l = react__WEBPACK_IMPORTED_MODULE_1__.useState(false), submitted = _l[0], setSubmitted = _l[1];
    var _m = react__WEBPACK_IMPORTED_MODULE_1__.useState(undefined), existingAttachment = _m[0], setExistingAttachment = _m[1];
    var _o = react__WEBPACK_IMPORTED_MODULE_1__.useState(undefined), file = _o[0], setFile = _o[1];
    var _p = react__WEBPACK_IMPORTED_MODULE_1__.useState(''), attachmentWarning = _p[0], setAttachmentWarning = _p[1];
    react__WEBPACK_IMPORTED_MODULE_1__.useEffect(function () {
        setForm(function (prev) {
            var computed = (0,_services_shared_index__WEBPACK_IMPORTED_MODULE_4__.computeJoursInclusive)(prev.dateDebut, prev.dateFin);
            var next = computed !== undefined ? String(computed) : '';
            return next === prev.jours ? prev : (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__assign)((0,tslib__WEBPACK_IMPORTED_MODULE_0__.__assign)({}, prev), { jours: next });
        });
    }, [form.dateDebut, form.dateFin]);
    react__WEBPACK_IMPORTED_MODULE_1__.useEffect(function () {
        if (!siteUrl)
            return undefined;
        var cancelled = false;
        if (isEdit && id) {
            setLoading(true);
            (0,_services_workflow_vacances_index__WEBPACK_IMPORTED_MODULE_3__.loadVacance)(siteUrl, id)
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
                (0,_services_workflow_vacances_index__WEBPACK_IMPORTED_MODULE_3__.loadVacanceAttachment)(siteUrl, id).then(function (att) { if (!cancelled)
                    setExistingAttachment(att); }).catch(function () { return undefined; });
            })
                .catch(function () { if (!cancelled) {
                setLoading(false);
                setNotFound(true);
            } });
        }
        else {
            (0,_services_shared_index__WEBPACK_IMPORTED_MODULE_4__.getCurrentUserName)(siteUrl).then(function (name) { if (!cancelled)
                setDemandeurNom(name); }).catch(function () { return undefined; });
            (0,_services_shared_index__WEBPACK_IMPORTED_MODULE_4__.getCurrentUserEmail)(siteUrl).then(function (email) { if (!cancelled)
                setDemandeurEmail(email); }).catch(function () { return undefined; });
        }
        return function () { cancelled = true; };
    }, [siteUrl, isEdit, id]);
    var setField = function (key, value) {
        setForm(function (prev) {
            var _a;
            return ((0,tslib__WEBPACK_IMPORTED_MODULE_0__.__assign)((0,tslib__WEBPACK_IMPORTED_MODULE_0__.__assign)({}, prev), (_a = {}, _a[key] = value, _a)));
        });
        setErrors(function (prev) {
            var _a;
            return (prev[key] ? (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__assign)((0,tslib__WEBPACK_IMPORTED_MODULE_0__.__assign)({}, prev), (_a = {}, _a[key] = undefined, _a)) : prev);
        });
    };
    var handleRemoveAttachment = function () {
        if (!siteUrl || !id || !existingAttachment)
            return;
        (0,_services_workflow_vacances_index__WEBPACK_IMPORTED_MODULE_3__.removeVacanceAttachment)(siteUrl, id, existingAttachment.fileName)
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
        var validationErrors = validateForm(form);
        setErrors(validationErrors);
        if (Object.keys(validationErrors).length > 0) {
            setError('Veuillez corriger les champs indiqués avant de continuer.');
            return;
        }
        setError('');
        setSaving(true);
        var payload = {
            titre: form.titre,
            destination: form.destination,
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
                (0,_services_workflow_vacances_index__WEBPACK_IMPORTED_MODULE_3__.uploadVacanceAttachment)(siteUrl, targetId, file)
                    .then(function (uploaded) { if (!uploaded)
                    setAttachmentWarning("La demande a été enregistrée mais l'envoi de la pièce jointe a échoué."); finish(ok, targetId); })
                    .catch(function () { setAttachmentWarning("La demande a été enregistrée mais l'envoi de la pièce jointe a échoué."); finish(ok, targetId); });
                return;
            }
            finish(ok, targetId);
        };
        if (isEdit && id) {
            (0,_services_workflow_vacances_index__WEBPACK_IMPORTED_MODULE_3__.updateVacance)(siteUrl, id, payload).then(function (ok) { return afterSave(ok, id); }).catch(function () { return finish(false); });
        }
        else {
            (0,_services_workflow_vacances_index__WEBPACK_IMPORTED_MODULE_3__.createVacance)(siteUrl, payload).then(function (createdId) { return afterSave(!!createdId, createdId); }).catch(function () { return finish(false); });
        }
    };
    var inputCls = 'w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-ikaBlue bg-white shadow-sm';
    if (loading) {
        return (react__WEBPACK_IMPORTED_MODULE_1__.createElement("main", { className: "pt-6 sm:pt-8 pb-14 min-h-screen bg-slate-100 text-slate-800" },
            react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: "mx-auto max-w-2xl px-4 sm:px-6 lg:px-8" },
                react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: "bg-white rounded-2xl p-10 shadow-sm border border-slate-200 text-center text-sm text-slate-500 font-semibold" }, "Chargement de la demande..."))));
    }
    if (notFound) {
        return (react__WEBPACK_IMPORTED_MODULE_1__.createElement("main", { className: "pt-6 sm:pt-8 pb-14 min-h-screen bg-slate-100 text-slate-800" },
            react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: "mx-auto max-w-2xl px-4 sm:px-6 lg:px-8" },
                react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: "bg-white rounded-2xl p-10 shadow-sm border border-slate-200 text-center" },
                    react__WEBPACK_IMPORTED_MODULE_1__.createElement("p", { className: "text-sm text-slate-500 font-semibold" }, "Demande introuvable."),
                    react__WEBPACK_IMPORTED_MODULE_1__.createElement("a", { href: "#page-workflow-liste-vacances", className: "mt-4 inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-ikaBlue text-white font-bold text-xs hover:bg-blue-600 shadow transition" },
                        react__WEBPACK_IMPORTED_MODULE_1__.createElement(react_icons_fa6__WEBPACK_IMPORTED_MODULE_2__.FaArrowLeft, null),
                        " Retour \u00E0 la liste")))));
    }
    if (submitted) {
        return (react__WEBPACK_IMPORTED_MODULE_1__.createElement("main", { className: "pt-6 sm:pt-8 pb-14 min-h-screen bg-slate-100 text-slate-800" },
            react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: "mx-auto max-w-2xl px-4 sm:px-6 lg:px-8" },
                react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: "bg-white rounded-2xl p-10 shadow-sm border border-slate-200 text-center" },
                    react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: "flex justify-center" },
                        react__WEBPACK_IMPORTED_MODULE_1__.createElement("span", { className: "w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center" },
                            react__WEBPACK_IMPORTED_MODULE_1__.createElement(react_icons_fa6__WEBPACK_IMPORTED_MODULE_2__.FaCircleCheck, { className: "text-3xl" }))),
                    react__WEBPACK_IMPORTED_MODULE_1__.createElement("h1", { className: "mt-4 text-xl font-black text-ikaBlueDark" }, isEdit ? 'Demande modifiée' : 'Demande envoyée'),
                    react__WEBPACK_IMPORTED_MODULE_1__.createElement("p", { className: "mt-2 text-sm text-slate-500" },
                        "Votre demande de vacances a bien \u00E9t\u00E9 ",
                        isEdit ? 'modifiée' : 'enregistrée',
                        "."),
                    attachmentWarning ? (react__WEBPACK_IMPORTED_MODULE_1__.createElement("p", { className: "mt-2 text-xs font-semibold text-amber-600" }, attachmentWarning)) : null,
                    react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: "mt-6 flex flex-col sm:flex-row items-center justify-center gap-3" },
                        newId ? (react__WEBPACK_IMPORTED_MODULE_1__.createElement("a", { href: "#page-workflow-detail-vacances&id=".concat(newId), className: "inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-ikaBlue text-white font-bold text-xs hover:bg-blue-600 shadow transition" }, "Voir la demande")) : null,
                        react__WEBPACK_IMPORTED_MODULE_1__.createElement("a", { href: "#page-workflow-liste-vacances", className: "inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-700 font-bold text-xs hover:bg-slate-50 transition" },
                            react__WEBPACK_IMPORTED_MODULE_1__.createElement(react_icons_fa6__WEBPACK_IMPORTED_MODULE_2__.FaArrowLeft, null),
                            " Retour \u00E0 la liste"))))));
    }
    return (react__WEBPACK_IMPORTED_MODULE_1__.createElement("main", { className: "pt-6 sm:pt-8 pb-14 min-h-screen bg-slate-100 text-slate-800" },
        react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: "mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 space-y-4" },
            react__WEBPACK_IMPORTED_MODULE_1__.createElement("nav", { className: "flex items-center gap-2 text-[11px] font-semibold text-slate-500 flex-wrap" },
                react__WEBPACK_IMPORTED_MODULE_1__.createElement("a", { href: "#page-accueil", className: "hover:text-ikaBlue transition" }, "Accueil"),
                react__WEBPACK_IMPORTED_MODULE_1__.createElement("span", null, "/"),
                react__WEBPACK_IMPORTED_MODULE_1__.createElement("a", { href: "#page-workflow-liste-vacances", className: "hover:text-ikaBlue transition" }, "Vacances"),
                react__WEBPACK_IMPORTED_MODULE_1__.createElement("span", null, "/"),
                react__WEBPACK_IMPORTED_MODULE_1__.createElement("span", { className: "text-ikaBlue" }, isEdit ? "Modifier : ".concat(form.titre || '') : 'Nouvelle demande de vacances')),
            react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: "bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden" },
                react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: "px-6 sm:px-8 py-5 border-b border-slate-100" },
                    react__WEBPACK_IMPORTED_MODULE_1__.createElement("h1", { className: "text-xl sm:text-2xl font-black text-ikaBlueDark" }, isEdit ? 'Modifier la demande de vacances' : 'Nouvelle demande de vacances'),
                    react__WEBPACK_IMPORTED_MODULE_1__.createElement("p", { className: "mt-1 text-xs text-slate-500" }, "La demande sera transmise au validateur indiqu\u00E9.")),
                react__WEBPACK_IMPORTED_MODULE_1__.createElement("form", { onSubmit: handleSubmit, className: "p-6 sm:p-8 space-y-5" },
                    error ? (react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: "flex items-start gap-2 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-xs font-semibold text-rose-600" },
                        react__WEBPACK_IMPORTED_MODULE_1__.createElement(react_icons_fa6__WEBPACK_IMPORTED_MODULE_2__.FaTriangleExclamation, { className: "mt-0.5 shrink-0" }),
                        " ",
                        react__WEBPACK_IMPORTED_MODULE_1__.createElement("span", null, error))) : null,
                    react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", null,
                        react__WEBPACK_IMPORTED_MODULE_1__.createElement("label", { className: "block text-xs font-bold text-slate-700 mb-1.5" }, "Titre"),
                        react__WEBPACK_IMPORTED_MODULE_1__.createElement("input", { type: "text", value: form.titre, onChange: function (e) { return setField('titre', e.target.value); }, required: true, placeholder: "Titre de la demande", className: "".concat(inputCls, " ").concat(errors.titre ? 'border-rose-300' : '') }),
                        errors.titre ? react__WEBPACK_IMPORTED_MODULE_1__.createElement("p", { className: "mt-1 text-[11px] font-semibold text-rose-600" }, errors.titre) : null),
                    react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", null,
                        react__WEBPACK_IMPORTED_MODULE_1__.createElement("label", { className: "block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5" },
                            react__WEBPACK_IMPORTED_MODULE_1__.createElement(react_icons_fa6__WEBPACK_IMPORTED_MODULE_2__.FaUser, { className: "text-ikaBlue text-[10px]" }),
                            " Demandeur"),
                        react__WEBPACK_IMPORTED_MODULE_1__.createElement("input", { type: "text", value: demandeurNom, disabled: true, readOnly: true, placeholder: "Chargement...", className: "".concat(inputCls, " bg-slate-50 text-slate-500 cursor-not-allowed") })),
                    react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", null,
                        react__WEBPACK_IMPORTED_MODULE_1__.createElement("label", { className: "block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5" },
                            react__WEBPACK_IMPORTED_MODULE_1__.createElement(react_icons_fa6__WEBPACK_IMPORTED_MODULE_2__.FaUserCheck, { className: "text-ikaBlue text-[10px]" }),
                            " Validateur"),
                        react__WEBPACK_IMPORTED_MODULE_1__.createElement(_components_UserPicker__WEBPACK_IMPORTED_MODULE_5__.UserPicker, { siteUrl: siteUrl, value: form.validateurEmail, onChange: function (email) { return setField('validateurEmail', email); }, placeholder: "Rechercher un collaborateur...", className: "".concat(inputCls, " ").concat(errors.validateurEmail ? 'border-rose-300' : '') }),
                        errors.validateurEmail ? react__WEBPACK_IMPORTED_MODULE_1__.createElement("p", { className: "mt-1 text-[11px] font-semibold text-rose-600" }, errors.validateurEmail) : null),
                    react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", null,
                        react__WEBPACK_IMPORTED_MODULE_1__.createElement("label", { className: "block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5" },
                            react__WEBPACK_IMPORTED_MODULE_1__.createElement(react_icons_fa6__WEBPACK_IMPORTED_MODULE_2__.FaLocationDot, { className: "text-ikaBlue text-[10px]" }),
                            " Destination"),
                        react__WEBPACK_IMPORTED_MODULE_1__.createElement("input", { type: "text", value: form.destination, onChange: function (e) { return setField('destination', e.target.value); }, required: true, placeholder: "Lieu de vacances", className: "".concat(inputCls, " ").concat(errors.destination ? 'border-rose-300' : '') }),
                        errors.destination ? react__WEBPACK_IMPORTED_MODULE_1__.createElement("p", { className: "mt-1 text-[11px] font-semibold text-rose-600" }, errors.destination) : null),
                    react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: "grid grid-cols-1 sm:grid-cols-3 gap-4" },
                        react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", null,
                            react__WEBPACK_IMPORTED_MODULE_1__.createElement("label", { className: "block text-xs font-bold text-slate-700 mb-1.5" }, "Nombre de jours"),
                            react__WEBPACK_IMPORTED_MODULE_1__.createElement("input", { type: "text", value: form.jours ? "".concat(form.jours, " jour(s)") : '', disabled: true, readOnly: true, placeholder: "S\u00E9lectionnez les dates", className: "".concat(inputCls, " bg-slate-50 text-slate-500 cursor-not-allowed") }),
                            react__WEBPACK_IMPORTED_MODULE_1__.createElement("p", { className: "mt-1 text-[11px] text-slate-400" }, "Calcul\u00E9 automatiquement selon les dates.")),
                        react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", null,
                            react__WEBPACK_IMPORTED_MODULE_1__.createElement("label", { className: "block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5" },
                                react__WEBPACK_IMPORTED_MODULE_1__.createElement(react_icons_fa6__WEBPACK_IMPORTED_MODULE_2__.FaCalendarDays, { className: "text-ikaBlue text-[10px]" }),
                                " Date de d\u00E9but"),
                            react__WEBPACK_IMPORTED_MODULE_1__.createElement("input", { type: "date", value: form.dateDebut, onChange: function (e) { return setField('dateDebut', e.target.value); }, required: true, className: "".concat(inputCls, " ").concat(errors.dateDebut ? 'border-rose-300' : '') }),
                            errors.dateDebut ? react__WEBPACK_IMPORTED_MODULE_1__.createElement("p", { className: "mt-1 text-[11px] font-semibold text-rose-600" }, errors.dateDebut) : null),
                        react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", null,
                            react__WEBPACK_IMPORTED_MODULE_1__.createElement("label", { className: "block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5" },
                                react__WEBPACK_IMPORTED_MODULE_1__.createElement(react_icons_fa6__WEBPACK_IMPORTED_MODULE_2__.FaCalendarDays, { className: "text-ikaBlue text-[10px]" }),
                                " Date de fin"),
                            react__WEBPACK_IMPORTED_MODULE_1__.createElement("input", { type: "date", value: form.dateFin, onChange: function (e) { return setField('dateFin', e.target.value); }, required: true, className: "".concat(inputCls, " ").concat(errors.dateFin ? 'border-rose-300' : '') }),
                            errors.dateFin ? react__WEBPACK_IMPORTED_MODULE_1__.createElement("p", { className: "mt-1 text-[11px] font-semibold text-rose-600" }, errors.dateFin) : null)),
                    react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", null,
                        react__WEBPACK_IMPORTED_MODULE_1__.createElement("label", { className: "block text-xs font-bold text-slate-700 mb-1.5" }, "Motif"),
                        react__WEBPACK_IMPORTED_MODULE_1__.createElement("textarea", { value: form.motif, onChange: function (e) { return setField('motif', e.target.value); }, required: true, rows: 4, placeholder: "D\u00E9crivez le motif de votre demande...", className: "".concat(inputCls, " ").concat(errors.motif ? 'border-rose-300' : '') }),
                        errors.motif ? react__WEBPACK_IMPORTED_MODULE_1__.createElement("p", { className: "mt-1 text-[11px] font-semibold text-rose-600" }, errors.motif) : null),
                    react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", null,
                        react__WEBPACK_IMPORTED_MODULE_1__.createElement("label", { className: "block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5" },
                            react__WEBPACK_IMPORTED_MODULE_1__.createElement(react_icons_fa6__WEBPACK_IMPORTED_MODULE_2__.FaPaperclip, { className: "text-ikaBlue text-[10px]" }),
                            " Pi\u00E8ce jointe (optionnel)"),
                        react__WEBPACK_IMPORTED_MODULE_1__.createElement(_components_FileAttachmentField__WEBPACK_IMPORTED_MODULE_6__.FileAttachmentField, { existing: existingAttachment, onRemoveExisting: handleRemoveAttachment, file: file, onFileChange: setFile, className: inputCls })),
                    react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: "pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3" },
                        react__WEBPACK_IMPORTED_MODULE_1__.createElement("button", { type: "submit", disabled: saving, className: "inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-ikaBlue text-white font-bold text-xs hover:bg-blue-600 shadow transition disabled:opacity-60 disabled:cursor-not-allowed" },
                            react__WEBPACK_IMPORTED_MODULE_1__.createElement(react_icons_fa6__WEBPACK_IMPORTED_MODULE_2__.FaPaperPlane, null),
                            " ",
                            saving ? 'Enregistrement...' : (isEdit ? 'Enregistrer les modifications' : 'Envoyer la demande')),
                        react__WEBPACK_IMPORTED_MODULE_1__.createElement("a", { href: isEdit ? "#page-workflow-modifier-vacances&id=".concat(id) : '#page-workflow-ajouter-vacances', onClick: function (e) { e.preventDefault(); setForm(original ? formFromExisting(original) : emptyForm); setError(''); setFile(undefined); setErrors({}); }, className: "inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-700 font-bold text-xs hover:bg-slate-50 transition" },
                            react__WEBPACK_IMPORTED_MODULE_1__.createElement(react_icons_fa6__WEBPACK_IMPORTED_MODULE_2__.FaRotate, null),
                            " R\u00E9initialiser"),
                        react__WEBPACK_IMPORTED_MODULE_1__.createElement("a", { href: "#page-workflow-liste-vacances", className: "inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-700 font-bold text-xs hover:bg-slate-50 transition" },
                            react__WEBPACK_IMPORTED_MODULE_1__.createElement(react_icons_fa6__WEBPACK_IMPORTED_MODULE_2__.FaArrowLeft, null),
                            " Annuler")))))));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (AjouterVacances);


/***/ }

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("af6a89981e95f93e858c")
/******/ })();
/******/ 
/******/ }
);
//# sourceMappingURL=ika-intranet-web-part.ab02170ccb9f75f79bbd.hot-update.js.map