(function () {
    const STORAGE_KEY = "tilliDemoOtpVerified";
    const OTP_MODAL_ID = "tilliDemoOtpModal";
    const LOCK_CLASS = "demo-otp-locked";

    const state = {
        sessionId: null,
        targetUrl: null,
        channel: "email",
        sending: false,
        verifying: false
    };

    function createModal() {
        if (document.getElementById(OTP_MODAL_ID)) {
            return;
        }

        const style = document.createElement("style");
        style.textContent = `
        .demo-otp-overlay {
            position: fixed;
            inset: 0;
            background: rgba(15, 23, 42, 0.45);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 9999;
            padding: 1.5rem;
        }
        .demo-otp-container {
            max-width: 420px;
            width: 100%;
            background: #ffffff;
            border-radius: 16px;
            padding: 2rem;
            box-shadow: 0 25px 55px rgba(15, 23, 42, 0.25);
            position: relative;
        }
        .demo-otp-header {
            margin-bottom: 1.5rem;
        }
        .demo-otp-header h2 {
            margin: 0 0 0.5rem 0;
            font-size: 1.5rem;
            color: #0f172a;
        }
        .demo-otp-header p {
            margin: 0;
            color: #475569;
            font-size: 0.95rem;
        }
        .demo-otp-channel {
            display: flex;
            gap: 0.75rem;
            margin-bottom: 1rem;
        }
        .demo-otp-channel button {
            flex: 1;
            border-radius: 9999px;
            border: 1px solid #cbd5f5;
            padding: 0.5rem 0.75rem;
            background: #f8fafc;
            color: #1e293b;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.2s ease;
        }
        .demo-otp-channel button.active {
            background: linear-gradient(135deg, #5B9EFF, #4080E0);
            color: #fff;
            border-color: transparent;
            box-shadow: 0 10px 20px rgba(59, 130, 246, 0.2);
        }
        .demo-otp-field {
            display: flex;
            flex-direction: column;
            margin-bottom: 1rem;
        }
        .demo-otp-field label {
            font-weight: 600;
            color: #0f172a;
            margin-bottom: 0.35rem;
        }
        .demo-otp-field input {
            border-radius: 10px;
            border: 1px solid #cbd5f5;
            padding: 0.75rem 0.85rem;
            font-size: 1rem;
            transition: border 0.2s ease;
        }
        .demo-otp-field input:focus {
            outline: none;
            border-color: #5B9EFF;
            box-shadow: 0 0 0 3px rgba(91, 158, 255, 0.25);
        }
        .demo-otp-actions {
            display: flex;
            flex-direction: column;
            gap: 0.75rem;
            margin-top: 1.25rem;
        }
        .demo-otp-actions button {
            border: none;
            border-radius: 10px;
            padding: 0.85rem;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.2s ease;
        }
        .demo-otp-btn-primary {
            background: linear-gradient(135deg, #5B9EFF, #4080E0);
            color: #fff;
        }
        .demo-otp-btn-primary:hover {
            transform: translateY(-1px);
            box-shadow: 0 10px 20px rgba(91, 158, 255, 0.25);
        }
        .demo-otp-btn-secondary {
            background: #e2e8f0;
            color: #0f172a;
        }
        .demo-otp-error {
            background: #fee2e2;
            color: #b91c1c;
            border-radius: 8px;
            padding: 0.75rem;
            font-size: 0.9rem;
            margin-top: 0.5rem;
        }
        .demo-otp-success {
            background: #dcfce7;
            color: #166534;
            border-radius: 8px;
            padding: 0.75rem;
            font-size: 0.9rem;
            margin-top: 0.5rem;
        }
        body.${LOCK_CLASS} {
            overflow: hidden;
        }
        body.${LOCK_CLASS} .otp-guarded {
            filter: blur(2px);
            pointer-events: none;
            user-select: none;
        }
        @media (max-width: 480px) {
            .demo-otp-container {
                padding: 1.5rem;
            }
        }`;
        document.head.appendChild(style);

        const overlay = document.createElement("div");
        overlay.className = "demo-otp-overlay";
        overlay.id = OTP_MODAL_ID;
        overlay.style.display = "none";
        overlay.innerHTML = `
            <div class="demo-otp-container" role="dialog" aria-modal="true" aria-labelledby="demoOtpTitle">
                <div class="demo-otp-header">
                    <h2 id="demoOtpTitle">Verify to unlock the demo</h2>
                    <p>Enter your email address or mobile number. We’ll send a one-time passcode (OTP) via Nudge and grant access once you verify.</p>
                </div>
                <div class="demo-otp-channel" role="radiogroup">
                    <button type="button" data-channel="email" class="active">Email</button>
                    <button type="button" data-channel="sms">SMS</button>
                </div>
                <div class="demo-otp-field" data-input="email">
                    <label for="demoOtpEmail">Work email address</label>
                    <input type="email" id="demoOtpEmail" placeholder="name@company.com" autocomplete="email">
                </div>
                <div class="demo-otp-field" data-input="phone" style="display:none;">
                    <label for="demoOtpPhone">Mobile number</label>
                    <input type="tel" id="demoOtpPhone" placeholder="+1 555 000 0000" autocomplete="tel">
                </div>
                <div class="demo-otp-field" data-input="otp" style="display:none;">
                    <label for="demoOtpCode">Enter OTP</label>
                    <input type="text" id="demoOtpCode" inputmode="numeric" maxlength="6" placeholder="6-digit code">
                </div>
                <div class="demo-otp-actions">
                    <button type="button" class="demo-otp-btn-primary" data-action="send">Send OTP</button>
                    <button type="button" class="demo-otp-btn-primary" data-action="verify" style="display:none;">Verify &amp; continue</button>
                    <button type="button" class="demo-otp-btn-secondary" data-action="cancel">Cancel</button>
                </div>
                <div class="demo-otp-error" style="display:none;"></div>
                <div class="demo-otp-success" style="display:none;"></div>
            </div>
        `;
        document.body.appendChild(overlay);
    }

    function openModal(targetUrl) {
        createModal();
        state.sessionId = null;
        state.targetUrl = targetUrl || null;
        state.sending = false;
        state.verifying = false;

        const overlay = document.getElementById(OTP_MODAL_ID);
        const emailInput = document.getElementById("demoOtpEmail");
        const phoneInput = document.getElementById("demoOtpPhone");
        const otpInput = document.getElementById("demoOtpCode");
        const errorEl = overlay.querySelector(".demo-otp-error");
        const successEl = overlay.querySelector(".demo-otp-success");
        const sendBtn = overlay.querySelector('[data-action="send"]');
        const verifyBtn = overlay.querySelector('[data-action="verify"]');
        const otpField = overlay.querySelector('[data-input="otp"]');

        emailInput.value = "";
        phoneInput.value = "";
        otpInput.value = "";
        errorEl.style.display = "none";
        successEl.style.display = "none";
        successEl.textContent = "";

        otpField.style.display = "none";
        verifyBtn.style.display = "none";
        sendBtn.style.display = "block";
        sendBtn.disabled = false;
        verifyBtn.disabled = false;

        document.body.classList.add(LOCK_CLASS);
        overlay.style.display = "flex";
        if (state.channel === "sms") {
            phoneInput.focus();
        } else {
            emailInput.focus();
        }
    }

    function closeModal() {
        const overlay = document.getElementById(OTP_MODAL_ID);
        if (overlay) {
            overlay.style.display = "none";
        }
        document.body.classList.remove(LOCK_CLASS);
    }

    function setChannel(channel) {
        state.channel = channel;
        const overlay = document.getElementById(OTP_MODAL_ID);
        overlay.querySelectorAll(".demo-otp-channel button").forEach(btn => {
            btn.classList.toggle("active", btn.dataset.channel === channel);
        });
        overlay.querySelector('[data-input="email"]').style.display = channel === "email" ? "flex" : "none";
        overlay.querySelector('[data-input="phone"]').style.display = channel === "sms" ? "flex" : "none";
    }

    async function sendOtp() {
        if (state.sending) return;
        state.sending = true;

        const overlay = document.getElementById(OTP_MODAL_ID);
        const errorEl = overlay.querySelector(".demo-otp-error");
        const successEl = overlay.querySelector(".demo-otp-success");
        const sendBtn = overlay.querySelector('[data-action="send"]');
        const verifyBtn = overlay.querySelector('[data-action="verify"]');
        const otpField = overlay.querySelector('[data-input="otp"]');

        errorEl.style.display = "none";
        successEl.style.display = "none";
        successEl.textContent = "";

        const email = document.getElementById("demoOtpEmail").value.trim();
        const phone = document.getElementById("demoOtpPhone").value.trim();

        if (state.channel === "email" && !email) {
            errorEl.textContent = "Please enter a valid work email address.";
            errorEl.style.display = "block";
            state.sending = false;
            return;
        }

        if (state.channel === "sms" && !phone) {
            errorEl.textContent = "Please enter a valid mobile number with country code.";
            errorEl.style.display = "block";
            state.sending = false;
            return;
        }

        sendBtn.disabled = true;
        sendBtn.textContent = "Sending…";

        // DEV MODE: Bypass API on localhost
        const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';

        try {
            if (isLocalhost) {
                // Development mode bypass
                console.log('[DEV MODE] OTP bypass enabled on localhost');
                await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API delay

                state.sessionId = "dev-session-" + Date.now();
                successEl.textContent = `[DEV MODE] OTP sent via ${state.channel}. Use code: 123456`;
                successEl.style.display = "block";

                otpField.style.display = "flex";
                verifyBtn.style.display = "block";
                sendBtn.style.display = "none";
                document.getElementById("demoOtpCode").focus();

                state.sending = false;
                return;
            }

            const response = await fetch("/api/nudge/send-otp", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email: state.channel === "email" ? email : undefined,
                    phone: state.channel === "sms" ? phone : undefined,
                    firstName: "",
                    company: "",
                    channel: state.channel
                })
            });
            const result = await response.json();
            if (!response.ok || !result.success) {
                throw result;
            }

            state.sessionId = result.sessionId;
            successEl.textContent = "OTP sent. Check your inbox and enter the 6-digit code below.";
            successEl.style.display = "block";

            otpField.style.display = "flex";
            verifyBtn.style.display = "block";
            document.getElementById("demoOtpCode").focus();
        } catch (error) {
            const details = error && error.details ? JSON.stringify(error.details) : "";
            errorEl.textContent = error.error
                ? `${error.error}${details ? ` (${details})` : ""}`
                : "Unable to send OTP right now. Please try again later.";
            errorEl.style.display = "block";
        } finally {
            sendBtn.disabled = false;
            sendBtn.textContent = "Resend OTP";
            state.sending = false;
        }
    }

    async function verifyOtp() {
        if (state.verifying) return;
        if (!state.sessionId) {
            const overlay = document.getElementById(OTP_MODAL_ID);
            const errorEl = overlay.querySelector(".demo-otp-error");
            errorEl.textContent = "Request an OTP first.";
            errorEl.style.display = "block";
            return;
        }

        const code = document.getElementById("demoOtpCode").value.trim();
        if (!code || code.length < 4) {
            const overlay = document.getElementById(OTP_MODAL_ID);
            const errorEl = overlay.querySelector(".demo-otp-error");
            errorEl.textContent = "Enter the 6-digit OTP code.";
            errorEl.style.display = "block";
            return;
        }

        state.verifying = true;
        const overlay = document.getElementById(OTP_MODAL_ID);
        const errorEl = overlay.querySelector(".demo-otp-error");
        const successEl = overlay.querySelector(".demo-otp-success");
        const verifyBtn = overlay.querySelector('[data-action="verify"]');

        errorEl.style.display = "none";
        successEl.style.display = "none";

        verifyBtn.disabled = true;
        verifyBtn.textContent = "Verifying…";

        // DEV MODE: Bypass API on localhost
        const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';

        try {
            if (isLocalhost) {
                // Development mode bypass - accept "123456" as valid code
                console.log('[DEV MODE] OTP verification bypass enabled');
                await new Promise(resolve => setTimeout(resolve, 300)); // Simulate API delay

                if (code === "123456") {
                    sessionStorage.setItem(STORAGE_KEY, "true");
                    successEl.textContent = "[DEV MODE] Verified! Redirecting to the demo…";
                    successEl.style.display = "block";
                    setTimeout(() => {
                        closeModal();
                        if (state.targetUrl) {
                            window.location.assign(state.targetUrl);
                        } else {
                            document.dispatchEvent(new CustomEvent("tilli-demo-unlocked"));
                        }
                    }, 800);
                } else {
                    throw { error: "[DEV MODE] Invalid code. Use: 123456" };
                }
                state.verifying = false;
                return;
            }

            const response = await fetch("/api/nudge/verify-otp", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    sessionId: state.sessionId,
                    code
                })
            });
            const result = await response.json();
            if (!response.ok || !result.success) {
                throw result;
            }

            sessionStorage.setItem(STORAGE_KEY, "true");
            successEl.textContent = "Verified! Redirecting to the demo…";
            successEl.style.display = "block";
            setTimeout(() => {
                closeModal();
                if (state.targetUrl) {
                    window.location.assign(state.targetUrl);
                } else {
                    document.dispatchEvent(new CustomEvent("tilli-demo-unlocked"));
                }
            }, 800);
        } catch (error) {
            errorEl.textContent = error.error || "OTP verification failed. Please try again.";
            errorEl.style.display = "block";
        } finally {
            verifyBtn.disabled = false;
            verifyBtn.textContent = "Verify & continue";
            state.verifying = false;
        }
    }

    function attachEventHandlers() {
        const overlay = document.getElementById(OTP_MODAL_ID);
        if (!overlay) return;

        overlay.querySelectorAll(".demo-otp-channel button").forEach(btn => {
            btn.addEventListener("click", () => setChannel(btn.dataset.channel));
        });

        overlay.querySelector('[data-action="send"]').addEventListener("click", sendOtp);
        overlay.querySelector('[data-action="verify"]').addEventListener("click", verifyOtp);
        overlay.querySelector('[data-action="cancel"]').addEventListener("click", () => {
            closeModal();
            state.targetUrl = null;
        });

        overlay.addEventListener("click", event => {
            if (event.target === overlay) {
                closeModal();
                state.targetUrl = null;
            }
        });
    }

    function shouldGate() {
        return sessionStorage.getItem(STORAGE_KEY) !== "true";
    }

    function gatePageIfNeeded() {
        if (!document.body.hasAttribute("data-requires-demo-otp") || !shouldGate()) {
            return;
        }
        const contentTargets = document.querySelectorAll("[data-demo-guard]");
        contentTargets.forEach(el => el.classList.add("otp-guarded"));
        openModal();
    }

    function registerDemoTriggers() {
        const links = document.querySelectorAll("[data-nudge-demo-trigger]");
        links.forEach(link => {
            link.addEventListener("click", event => {
                if (!shouldGate()) {
                    return;
                }
                event.preventDefault();
                const href = link.getAttribute("href");
                // Use getAttribute to preserve relative URLs and hash fragments
                state.targetUrl = href || window.location.href;
                openModal(state.targetUrl);
            });
        });
    }

    document.addEventListener("DOMContentLoaded", () => {
        createModal();
        attachEventHandlers();
        registerDemoTriggers();
        gatePageIfNeeded();

        document.addEventListener("tilli-demo-unlocked", () => {
            document.querySelectorAll("[data-demo-guard]").forEach(el => {
                el.classList.remove("otp-guarded");
            });
        });
    });
})();
