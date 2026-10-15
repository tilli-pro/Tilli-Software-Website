/*
 * Tilli lead forms: "Book a Demo" modal + Beacon "Coming Soon" registration.
 * Both submit to /api/vtiger (same endpoint as the contact page), which creates a Lead in Vtiger CRM.
 * Load this in <head> so it claims window.openBookingModal before the pages' legacy inline scripts.
 */
(function () {
    'use strict';

    var API_URL = '/api/vtiger';
    var MODAL_ID = 'tilliLeadModal';
    var PRODUCTS = ['Nudge', 'tilliPay', 'tilliX', 'Beacon', 'tilliArc', 'XDEX', 'Not sure yet'];

    function injectStyles() {
        if (document.getElementById('tilli-lead-forms-css')) return;
        var css = [
            '.tlf-overlay{position:fixed;inset:0;z-index:100000;background:rgba(15,23,42,.65);display:none;align-items:center;justify-content:center;padding:16px;overflow-y:auto}',
            '.tlf-overlay.is-open{display:flex}',
            '.tlf-dialog{position:relative;background:#fff;border-radius:16px;width:100%;max-width:560px;max-height:calc(100vh - 32px);overflow-y:auto;padding:32px;box-shadow:0 24px 64px rgba(15,23,42,.3);font-family:Inter,Lato,system-ui,sans-serif;color:#111827;text-align:left}',
            '.tlf-close{position:absolute;top:12px;right:12px;width:40px;height:40px;border:0;background:transparent;border-radius:999px;font-size:28px;line-height:1;color:#6B7280;cursor:pointer}',
            '.tlf-close:hover,.tlf-close:focus-visible{background:#F3F4F6;color:#111827}',
            '.tlf-eyebrow{display:inline-block;font-size:12px;font-weight:600;letter-spacing:.08em;text-transform:uppercase;color:#325EF6;background:rgba(50,94,246,.08);padding:6px 12px;border-radius:999px;margin-bottom:12px}',
            '.tlf-title{font-size:28px;line-height:1.15;font-weight:500;margin:0 0 8px;color:#111827}',
            '.tlf-sub{color:#6B7280;line-height:1.6;margin:0 0 24px;font-size:15px}',
            '.tlf-form{display:grid;gap:16px;text-align:left}',
            '.tlf-row{display:grid;grid-template-columns:1fr 1fr;gap:16px}',
            '@media (max-width:560px){.tlf-row{grid-template-columns:1fr}.tlf-dialog{padding:24px}}',
            '.tlf-field{display:flex;flex-direction:column;gap:6px}',
            '.tlf-field label,.tlf-legend{font-size:14px;font-weight:500;color:#374151}',
            '.tlf-req{color:#DC2626}',
            '.tlf-field input,.tlf-field select,.tlf-field textarea{font:inherit;font-size:15px;padding:12px 14px;border:1px solid #D1D5DB;border-radius:10px;background:#fff;color:#111827;width:100%;box-sizing:border-box}',
            '.tlf-field textarea{min-height:96px;resize:vertical}',
            '.tlf-field input:focus,.tlf-field select:focus,.tlf-field textarea:focus{outline:none;border-color:#325EF6;box-shadow:0 0 0 3px rgba(50,94,246,.15)}',
            '.tlf-choices{display:grid;gap:10px;border:0;padding:0;margin:0}',
            '.tlf-choice{display:flex;gap:12px;align-items:flex-start;padding:14px;border:1px solid #D1D5DB;border-radius:12px;cursor:pointer}',
            '.tlf-choice:has(input:checked){border-color:#325EF6;background:rgba(50,94,246,.05)}',
            '.tlf-choice input{margin-top:3px;accent-color:#325EF6}',
            '.tlf-choice strong{display:block;font-weight:600;font-size:15px;color:#111827}',
            '.tlf-choice span{display:block;color:#6B7280;font-size:14px;line-height:1.5}',
            '.tlf-hp{position:absolute!important;left:-9999px!important;width:1px;height:1px;overflow:hidden}',
            '.tlf-submit{font:inherit;font-size:16px;font-weight:500;padding:14px 20px;border:0;border-radius:999px;background:#325EF6;color:#fff;cursor:pointer;transition:background .2s}',
            '.tlf-submit:hover{background:#2547C9}',
            '.tlf-submit:disabled{opacity:.6;cursor:not-allowed}',
            '.tlf-status{border-radius:10px;padding:12px 14px;font-size:14px;line-height:1.5}',
            '.tlf-status[hidden]{display:none}',
            '.tlf-status.is-error{background:#FEE2E2;color:#991B1B}',
            '.tlf-success{text-align:center;padding:16px 0}',
            '.tlf-success-icon{width:56px;height:56px;border-radius:999px;background:#D1FAE5;color:#065F46;display:inline-flex;align-items:center;justify-content:center;font-size:26px;margin-bottom:16px}',
            '.tlf-fineprint{font-size:12px;color:#9CA3AF;line-height:1.5;margin:0}',
            '.tlf-fineprint a{color:#6B7280}'
        ].join('\n');
        var style = document.createElement('style');
        style.id = 'tilli-lead-forms-css';
        style.textContent = css;
        document.head.appendChild(style);
    }

    function escapeHtml(str) {
        return String(str).replace(/[&<>"']/g, function (c) {
            return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
        });
    }

    function field(id, label, opts) {
        opts = opts || {};
        var req = opts.required ? ' required aria-required="true"' : '';
        var star = opts.required ? ' <span class="tlf-req" aria-hidden="true">*</span>' : '';
        var input;
        if (opts.type === 'select') {
            input = '<select id="' + id + '" name="' + opts.name + '"' + req + '>' +
                '<option value="">Select…</option>' +
                opts.options.map(function (o) {
                    var sel = o === opts.value ? ' selected' : '';
                    return '<option value="' + escapeHtml(o) + '"' + sel + '>' + escapeHtml(o) + '</option>';
                }).join('') + '</select>';
        } else if (opts.type === 'textarea') {
            input = '<textarea id="' + id + '" name="' + opts.name + '" maxlength="2000" placeholder="' + (opts.placeholder || '') + '"' + req + '></textarea>';
        } else {
            input = '<input id="' + id + '" name="' + opts.name + '" type="' + (opts.type || 'text') + '" maxlength="120"' +
                (opts.autocomplete ? ' autocomplete="' + opts.autocomplete + '"' : '') + req + '>';
        }
        return '<div class="tlf-field"><label for="' + id + '">' + label + star + '</label>' + input + '</div>';
    }

    function commonFields(prefix) {
        return [
            '<div class="tlf-row">',
            field(prefix + '-first', 'First name', { name: 'firstName', required: true, autocomplete: 'given-name' }),
            field(prefix + '-last', 'Last name', { name: 'lastName', required: true, autocomplete: 'family-name' }),
            '</div>',
            field(prefix + '-email', 'Work email', { name: 'email', type: 'email', required: true, autocomplete: 'email' }),
            '<div class="tlf-row">',
            field(prefix + '-company', 'Company', { name: 'company', required: true, autocomplete: 'organization' }),
            field(prefix + '-title', 'Job title', { name: 'jobTitle', autocomplete: 'organization-title' }),
            '</div>',
            field(prefix + '-phone', 'Phone', { name: 'phone', type: 'tel', autocomplete: 'tel' }),
            '<div class="tlf-hp" aria-hidden="true"><label for="' + prefix + '-fax">Leave blank</label>' +
            '<input id="' + prefix + '-fax" name="faxNumber" type="text" tabindex="-1" autocomplete="off"></div>'
        ].join('');
    }

    function successMarkup(title, text) {
        return '<div class="tlf-success" role="status">' +
            '<div class="tlf-success-icon" aria-hidden="true"><svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg></div>' +
            '<h3 class="tlf-title" style="font-size:24px">' + title + '</h3>' +
            '<p class="tlf-sub" style="margin:0">' + text + '</p></div>';
    }

    function submitLead(form, buildPayload, onSuccess) {
        var statusEl = form.querySelector('.tlf-status');
        var btn = form.querySelector('.tlf-submit');
        var btnLabel = btn.textContent;
        var fd = new FormData(form);

        // Honeypot filled in: pretend success, send nothing.
        if (fd.get('faxNumber')) {
            onSuccess();
            return;
        }

        var payload = Object.assign({
            firstName: String(fd.get('firstName') || '').trim(),
            lastName: String(fd.get('lastName') || '').trim(),
            email: String(fd.get('email') || '').trim(),
            company: String(fd.get('company') || '').trim(),
            jobTitle: String(fd.get('jobTitle') || '').trim(),
            phone: String(fd.get('phone') || '').trim(),
            pageUrl: window.location.href,
            submissionDate: new Date().toISOString()
        }, buildPayload(fd));

        statusEl.hidden = true;
        btn.disabled = true;
        btn.textContent = 'Submitting…';

        fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        }).then(function (res) {
            return res.json().catch(function () { return {}; }).then(function (data) {
                if (!res.ok || !data.success) {
                    throw new Error(data.error || ('Request failed (' + res.status + ')'));
                }
            });
        }).then(function () {
            if (typeof window.gtag === 'function') {
                window.gtag('event', 'conversion', { event_category: 'Lead', event_label: payload.formType, value: 1 });
            }
            onSuccess();
        }).catch(function (err) {
            console.error('Lead form submission error:', err);
            statusEl.className = 'tlf-status is-error';
            statusEl.textContent = (err && /Too many requests/.test(err.message))
                ? 'Too many submissions. Please wait a minute and try again.'
                : 'Something went wrong. Please try again in a moment.';
            statusEl.hidden = false;
            btn.disabled = false;
            btn.textContent = btnLabel;
        });
    }

    /* ---------- Book a Demo modal ---------- */

    var lastFocused = null;

    function trapFocus(e, container) {
        var focusables = container.querySelectorAll('button, input:not([tabindex="-1"]), select, textarea, a[href]');
        if (!focusables.length) return;
        var first = focusables[0];
        var last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }

    function buildDemoModal(defaultProduct) {
        var overlay = document.createElement('div');
        overlay.id = MODAL_ID;
        overlay.className = 'tlf-overlay';
        overlay.innerHTML =
            '<div class="tlf-dialog" role="dialog" aria-modal="true" aria-labelledby="tlf-demo-title">' +
            '<button type="button" class="tlf-close" aria-label="Close">&times;</button>' +
            '<div class="tlf-body">' +
            '<span class="tlf-eyebrow">Book a Demo</span>' +
            '<h2 class="tlf-title" id="tlf-demo-title">See Tilli in action</h2>' +
            '<p class="tlf-sub">Tell us a bit about you and our team will reach out to schedule a personalized walkthrough.</p>' +
            '<form class="tlf-form">' +
            commonFields('tlf-demo') +
            field('tlf-demo-product', 'Product of interest', { name: 'productInterest', type: 'select', options: PRODUCTS, value: defaultProduct }) +
            field('tlf-demo-msg', 'What would you like to see?', { name: 'message', type: 'textarea', placeholder: 'Goals, current systems, timeline…' }) +
            '<div class="tlf-status" role="alert" hidden></div>' +
            '<button type="submit" class="tlf-submit">Request Demo</button>' +
            '</form></div></div>';

        overlay.addEventListener('click', function (e) {
            if (e.target === overlay) closeDemo();
        });
        overlay.querySelector('.tlf-close').addEventListener('click', closeDemo);
        overlay.addEventListener('keydown', function (e) {
            if (e.key === 'Escape') closeDemo();
            if (e.key === 'Tab') trapFocus(e, overlay);
        });

        var form = overlay.querySelector('form');
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            submitLead(form, function (fd) {
                return {
                    productInterest: fd.get('productInterest') || 'Tilli Platform',
                    message: String(fd.get('message') || '').trim(),
                    formType: 'Book a Demo',
                    source: 'Tilli Website - Book a Demo'
                };
            }, function () {
                overlay.querySelector('.tlf-body').innerHTML = successMarkup(
                    'Thanks, request received',
                    'Our team will contact you within one business day to schedule your demo.'
                );
                overlay.querySelector('.tlf-close').focus();
            });
        });

        document.body.appendChild(overlay);
        return overlay;
    }

    function openDemo(product) {
        injectStyles();
        var overlay = document.getElementById(MODAL_ID);
        if (overlay && overlay.querySelector('.tlf-success')) {
            overlay.remove();
            overlay = null;
        }
        overlay = overlay || buildDemoModal(typeof product === 'string' ? product : '');
        lastFocused = document.activeElement;
        overlay.classList.add('is-open');
        document.body.style.overflow = 'hidden';
        var firstInput = overlay.querySelector('input');
        if (firstInput) setTimeout(function () { firstInput.focus(); }, 30);
    }

    function closeDemo() {
        var overlay = document.getElementById(MODAL_ID);
        if (overlay) overlay.classList.remove('is-open');
        var legacy = document.getElementById('bookingModal');
        if (legacy) legacy.style.display = 'none';
        document.body.style.overflow = '';
        if (lastFocused && typeof lastFocused.focus === 'function') lastFocused.focus();
    }

    /* ---------- Beacon coming-soon registration (inline) ---------- */

    function renderBeaconForm(container) {
        injectStyles();
        container.innerHTML =
            '<form class="tlf-form">' +
            '<fieldset class="tlf-choices"><legend class="tlf-legend" style="margin-bottom:10px">I&rsquo;d like to</legend>' +
            '<label class="tlf-choice"><input type="radio" name="interest" value="Register to Download" checked>' +
            '<div><strong>Register to download</strong><span>Be first in line when Beacon is available.</span></div></label>' +
            '<label class="tlf-choice"><input type="radio" name="interest" value="Sneak Preview">' +
            '<div><strong>Get a sneak preview</strong><span>A guided early look at Beacon and JAREIS with our team.</span></div></label>' +
            '</fieldset>' +
            commonFields('tlf-beacon') +
            field('tlf-beacon-msg', 'Anything we should know?', { name: 'message', type: 'textarea', placeholder: 'Your ERP / CRM / core banking stack, use case…' }) +
            '<div class="tlf-status" role="alert" hidden></div>' +
            '<button type="submit" class="tlf-submit">Register Interest</button>' +
            '<p class="tlf-fineprint">By registering you agree to be contacted by Tilli about Beacon. See our <a href="/privacy-policy">privacy policy</a>.</p>' +
            '</form>';

        var form = container.querySelector('form');
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            submitLead(form, function (fd) {
                var interest = fd.get('interest') || 'Register to Download';
                var note = String(fd.get('message') || '').trim();
                return {
                    productInterest: 'Beacon',
                    message: 'Beacon - ' + interest + (note ? '\n\n' + note : ''),
                    formType: 'Beacon - ' + interest,
                    source: 'Tilli Website - Beacon Coming Soon'
                };
            }, function () {
                container.innerHTML = successMarkup(
                    'You&rsquo;re on the list',
                    'Thanks for registering. We&rsquo;ll be in touch with Beacon early access details soon.'
                );
            });
        });
    }

    /* ---------- Wire up ---------- */

    // Pages still contain legacy inline `window.openBookingModal = ...` (a broken Outlook iframe).
    // Making the property read-only turns those later assignments into silent no-ops.
    function lock(name, fn) {
        try {
            Object.defineProperty(window, name, { value: fn, writable: false, configurable: false });
        } catch (e) {
            window[name] = fn;
        }
    }
    lock('openBookingModal', openDemo);
    lock('closeBookingModal', closeDemo);

    window.TilliLeadForms = { openDemo: openDemo, closeDemo: closeDemo, renderBeaconForm: renderBeaconForm };

    function init() {
        var beacon = document.querySelector('[data-beacon-form]');
        if (beacon) renderBeaconForm(beacon);
        document.addEventListener('click', function (e) {
            var trigger = e.target.closest && e.target.closest('[data-book-demo]');
            if (trigger) {
                e.preventDefault();
                openDemo(trigger.getAttribute('data-book-demo') || '');
            }
        });
    }

    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
    else init();
})();
