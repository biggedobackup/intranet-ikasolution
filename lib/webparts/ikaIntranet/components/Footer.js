import * as React from 'react';
import { FaPhone, FaEnvelope } from 'react-icons/fa6';
import logoUrl from '../assets/imges/logo.png';
export var Footer = function (props) {
    var columns = props.columns || [];
    var year = new Date().getFullYear();
    var logoSrc = props.logoUrl || logoUrl;
    return (React.createElement("footer", { className: "border-t border-slate-200 bg-slate-900 text-white mt-auto" },
        React.createElement("div", { className: "mx-auto grid max-w-[1650px] gap-10 px-4 py-12 sm:px-6 md:grid-cols-2 lg:grid-cols-4 lg:px-8" },
            React.createElement("div", null,
                React.createElement("div", { className: "flex items-center gap-3" },
                    React.createElement("img", { className: "h-14 w-auto bg-white p-1 rounded-xl shadow-md object-contain", src: logoSrc, alt: "IKA SOLUTION" }),
                    React.createElement("div", null,
                        React.createElement("h4", { className: "font-black text-white text-base" }, "IKA INTRANET"),
                        React.createElement("p", { className: "text-xs text-slate-400" }, "Plateforme Interne"))),
                React.createElement("p", { className: "mt-4 text-xs leading-relaxed text-slate-400" }, "Espace r\u00E9serv\u00E9 aux collaborateurs d'IKA SOLUTION. Centralisation de la documentation, de l'agenda, des bilans et du suivi de projets.")),
            columns.map(function (col) { return (React.createElement("div", { key: col.Category },
                React.createElement("h3", { className: "text-xs font-black uppercase tracking-[0.18em] text-white" }, col.Category),
                React.createElement("div", { className: "mt-4 grid gap-2 text-xs font-semibold text-slate-300" }, col.links.map(function (link) {
                    var isTel = link.URL.toLowerCase().startsWith('tel:');
                    var isMail = link.URL.toLowerCase().startsWith('mailto:');
                    var hasUrl = !!link.URL && link.URL !== '#';
                    var cls = 'hover:text-ikaBlue transition flex items-center gap-2';
                    var icon = isTel ? (React.createElement("span", { className: "w-4 h-4 text-emerald-400 flex items-center justify-center" },
                        React.createElement(FaPhone, null))) : isMail ? (React.createElement("span", { className: "w-4 h-4 text-ikaBlue flex items-center justify-center" },
                        React.createElement(FaEnvelope, null))) : null;
                    return hasUrl ? (React.createElement("a", { key: link.Title, className: cls, href: link.URL },
                        icon,
                        link.Title)) : (React.createElement("p", { key: link.Title, className: "text-slate-400 flex items-center gap-2" },
                        icon,
                        link.Title));
                })))); })),
        React.createElement("div", { className: "bg-slate-950 border-t border-slate-800" },
            React.createElement("div", { className: "mx-auto flex max-w-[1600px] flex-col gap-3 px-4 py-4 text-xs font-semibold text-slate-400 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8" },
                React.createElement("span", null,
                    "\u00A9 ",
                    year,
                    " IKA SOLUTION LTD. Intranet d'entreprise confidentiel.")))));
};
export default Footer;
//# sourceMappingURL=Footer.js.map