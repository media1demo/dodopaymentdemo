//src/index.js

import { Webhook } from 'standardwebhooks';
import DodoPayments from 'dodopayments';

const PRODUCT_ID = 'pdt_eCqU7zSrzmDHYstrWiYwu';
const TRIAL_DURATION_MS = 24 * 60 * 60 * 1000; // 1 day in milliseconds



const LANDING_PAGE_HTML = `
<!DOCTYPE html>
<html lang="en" class="scroll-smooth">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>One Second Student Report</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet">
    <meta name="description" content="One Second Report helps educators instantly identify AI-generated content and ensure academic integrity with advanced typing rhythm analysis. Get fast, reliable student work authenticity reports.">
    <meta name="keywords" content="ai detector, plagiarism checker, typing rhythm analysis, academic integrity, student work authenticity, ai content detection, education technology, teacher tools">
    <meta name="author" content="One Second Report">
    <link rel="canonical" href="https://www.onesecreport.imaginea.store/onesecondreport.html">
    <link rel="icon" href="favicon.ico" sizes="any">
    <link rel="icon" href="favicon.svg" type="image/svg+xml">
    <link rel="apple-touch-icon" href="apple-touch-icon.png">
    <link rel="manifest" href="site.webmanifest">
    <meta property="og:title" content="AI Content Detector & Typing Analysis | One Second Report">
    <meta property="og:description" content="Instantly identify AI-generated content and ensure academic integrity with advanced typing rhythm analysis.">
    <meta property="og:type" content="website">
    <meta property="og:url" content="https://www.onesecreport.imaginea.store/onesecondreport.html">
    <meta property="og:image" content="https://www.onesecreport.imaginea.store/web-app-manifest-512x512.png">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="AI Content Detector & Typing Analysis | One Second Report">
    <meta name="twitter:description" content="Instantly identify AI-generated content and ensure academic integrity with advanced typing rhythm analysis.">
    <meta name="twitter:image" content="https://www.onesecreport.imaginea.store/web-app-manifest-512x512.png">
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        body { font-family: 'Inter', sans-serif; background-color: #ffffff; color: #000000; -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; }
        .btn-primary { background-color: #000000; color: #ffffff; border: 1px solid #000000; transition: all 0.3s ease; }
        .btn-primary:hover { background-color: #333333; transform: translateY(-2px); box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); }
        .btn-outline { background-color: transparent; color: #000000; border: 1px solid #000000; transition: all 0.3s ease; }
        .btn-outline:hover { background-color: #000000; color: #ffffff; }
        .sentence-ai { background-color: #ffcccc; color: #000000; padding: 4px 8px; border-radius: 4px; margin: 2px; }
        .sentence-human { background-color: #ccffcc; color: #000000; padding: 4px 8px; border-radius: 4px; margin: 2px; }
        .step-indicator { transition: all 0.4s ease; }
        .step-inactive { background-color: #f0f0f0; color: #666666; }
        .step-active { background-color: #000000; color: #ffffff; transform: scale(1.05); }
        /* --- Styles for Modal --- */
        .modal-overlay { position: fixed; top: 0; left: 0; right: 0; bottom: 0; background-color: rgba(0,0,0,0.6); display: flex; justify-content: center; align-items: center; z-index: 1000; opacity: 0; visibility: hidden; transition: opacity 0.3s ease, visibility 0.3s ease; backdrop-filter: blur(5px); }
        .modal-overlay.active { opacity: 1; visibility: visible; }
        .modal-content { background: white; padding: 2.5rem; border-radius: 1rem; max-width: 500px; width: 90%; transform: scale(0.9); transition: transform 0.3s ease; }
        .modal-overlay.active .modal-content { transform: scale(1); }
    </style>
</head>
<body class="overflow-x-hidden">
    <section class="text-center pt-10 pb-20 bg-gray-50">
        <div class="container mx-auto px-6">
            <div class="max-w-5xl mx-auto">
                <h1 class="text-5xl md:text-7xl mb-8 leading-tight font-black">
                    Identify Assignment
                    <span class="relative inline-block">
                        in 1 Second
                        <div class="absolute -bottom-2 left-0 right-0 h-1 bg-black rounded-full"></div>
                    </span>
                </h1>
                <p class="max-w-4xl mx-auto text-xl md:text-2xl text-gray-700 mb-12 leading-relaxed">
                    Teachers can now see students assignments in one second whether they wrote honestly or not.
                </p>
                <!-- GET STARTED BUTTON ADDED HERE -->
                <button id="get-started-btn" class="btn-primary text-xl font-bold px-10 py-4 rounded-xl transition duration-300 ease-in-out hover:shadow-lg">
                    Get Started Now
                </button>
            </div>
            <div class="mt-12">
                <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div class="text-center">
                        <div class="bg-white p-6 rounded-2xl shadow-lg h-96 relative overflow-hidden border border-gray-200">
                            <div class="flex items-center mb-4"><div class="flex space-x-2"><div class="w-3 h-3 bg-red-500 rounded-full"></div><div class="w-3 h-3 bg-yellow-500 rounded-full"></div><div class="w-3 h-3 bg-green-500 rounded-full"></div></div><span class="ml-2 text-sm font-medium">Student Work</span></div>
                            <div class="text-left font-mono text-sm leading-relaxed h-64 overflow-y-auto"><div id="student-text" class="whitespace-pre-wrap"></div></div>
                        </div>
                    </div>
                    <div class="text-center">
                        <div class="bg-white p-6 rounded-2xl shadow-lg h-96 relative overflow-hidden border border-gray-200 flex flex-col justify-center">
                            <div id="analysis-icon" class="mb-4 transition-all duration-500"><div class="w-16 h-16 mx-auto bg-gray-100 rounded-2xl flex items-center justify-center"><svg class="w-8 h-8 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v6a2 2 0 002 2h6a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/></svg></div></div>
                            <h3 id="analysis-title" class="text-lg font-bold text-gray-600 mb-2">Analysis in Progress</h3>
                            <p id="analysis-description" class="text-sm text-gray-500 mb-4">Detecting AI usage...</p>
                            <div id="analysis-details" class="space-y-2 text-xs text-left opacity-0 transition-opacity duration-500"><div class="flex items-center justify-between p-2 bg-gray-50 rounded"><span>AI sentences:</span><span id="ai-count" class="font-mono font-bold">0</span></div><div class="flex items-center justify-between p-2 bg-gray-50 rounded"><span>Human sentences:</span><span id="human-count" class="font-mono font-bold">0</span></div></div>
                        </div>
                    </div>
                    <div class="text-center">
                        <div class="bg-white p-6 rounded-2xl shadow-lg h-96 relative overflow-hidden border border-gray-200">
                            <div class="flex items-center justify-between mb-4 text-xs text-gray-500"><div class="flex items-center space-x-2"><div class="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div><span>One Second Report</span></div><div id="report-indicator" class="px-2 py-1 rounded text-xs font-semibold bg-gray-100 text-gray-500">Status: Analyzing</div></div>
                            <div class="text-left h-64 overflow-y-auto"><div id="report-output" class="text-sm whitespace-pre-wrap leading-relaxed min-h-full p-3 bg-gray-50 rounded-lg border">Report will appear here...</div></div>
                        </div>
                    </div>
                </div>
                <div class="flex justify-center my-12"><div class="flex items-center space-x-4"><div id="step1" class="step-indicator px-4 py-2 rounded-full text-sm font-semibold">Step 1</div><div class="w-8 h-0.5 bg-gray-300"></div><div id="step2" class="step-indicator px-4 py-2 rounded-full text-sm font-semibold">Step 2</div><div class="w-8 h-0.5 bg-gray-300"></div><div id="step3" class="step-indicator px-4 py-2 rounded-full text-sm font-semibold">Step 3</div></div></div>
                <div class="text-center mt-8"><button id="restart-demo" class="btn-outline px-6 py-3 rounded-xl">Restart Demo</button></div>
            </div>
        </div>
    </section>
    <footer class="bg-white border-t border-gray-200">
        <div class="container mx-auto px-6 py-12">
            <div class="flex flex-col md:flex-row justify-between items-center">
                <div class="flex items-center space-x-3 mb-4 md:mb-0"><div class="w-8 h-8 bg-black rounded-lg flex items-center justify-center"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="text-white"><path d="M8 9H12V11H10V14H8V9ZM14 9H16V15H14V9Z" fill="currentColor"/></svg></div><span class="text-lg font-bold">One Second Report</span></div>
                <div class="text-gray-600 text-center md:text-right"><p>&copy; 2025 One Second Report. Empowering educators with instant insights.</p></div>
            </div>
        </div>
    </footer>

    <!-- EMAIL MODAL ADDED HERE -->
    <div id="email-modal" class="modal-overlay">
        <div class="modal-content text-center relative">
            <button id="close-modal-btn" class="absolute top-2 right-4 text-gray-500 hover:text-black text-3xl font-bold">&times;</button>
            <h2 class="text-3xl font-bold mb-4">Get Full Access</h2>
            <p class="text-gray-600 mb-6">Enter your email to start a free trial or subscribe to unlock all features.</p>
            <form id="email-form" class="space-y-4">
                <input type="email" id="email-input" placeholder="your@email.com" required class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <button type="submit" data-action="trial" class="btn-primary w-full py-3 rounded-lg font-semibold" style= "display:none"   >Start Free Trial</button>
                    <button type="submit" data-action="checkout" class="bg-green-600 text-white w-full py-3 rounded-lg font-semibold hover:bg-green-700">Subscribe Now</button>
                </div>
            </form>
        </div>
    </div>

    <script>
        // --- YOUR EXISTING ANIMATION SCRIPT ---
        const studentText = "The Industrial Revolution was a major turning point in history. It began in Britain in the late 18th century. This period saw the transition from manual production methods to machines. New chemical manufacturing and iron production processes were developed. The introduction of steam power was particularly important. Textile industries were the first to adopt modern production methods.";
        const studentTextEl = document.getElementById('student-text');
        const reportOutputEl = document.getElementById('report-output');
        const analysisIcon = document.getElementById('analysis-icon');
        const analysisTitle = document.getElementById('analysis-title');
        const analysisDescription = document.getElementById('analysis-description');
        const analysisDetails = document.getElementById('analysis-details');
        const aiCount = document.getElementById('ai-count');
        const humanCount = document.getElementById('human-count');
        const reportIndicator = document.getElementById('report-indicator');
        const stepIndicators = [document.getElementById('step1'), document.getElementById('step2'), document.getElementById('step3')];
        const restartDemoBtn = document.getElementById('restart-demo');
        let typingInterval;

        const updateStepIndicator = (activeIndex) => {
            stepIndicators.forEach((step, index) => {
                step.className = 'step-indicator px-4 py-2 rounded-full text-sm font-semibold ';
                step.className += (index === activeIndex) ? 'step-active' : 'step-inactive';
            });
        };

        const resetUI = () => {
            clearInterval(typingInterval);
            studentTextEl.innerHTML = '';
            reportOutputEl.innerHTML = 'Report will appear here...';
            analysisTitle.textContent = 'Analysis in Progress';
            analysisDescription.textContent = 'Detecting AI usage...';
            analysisDetails.classList.add('opacity-0');
            setTimeout(runDemo, 5000); // ADD THIS LINE: Restarts the demo after 5 seconds

            reportIndicator.className = 'px-2 py-1 rounded text-xs font-semibold bg-gray-100 text-gray-500';
            reportIndicator.textContent = 'Status: Analyzing';
            updateStepIndicator(-1);
        };

        function runDemo() {
            resetUI();
            updateStepIndicator(0);
            let i = 0;
            typingInterval = setInterval(() => {
                if (i < studentText.length) {
                    studentTextEl.textContent += studentText.charAt(i);
                    i++;
                } else {
                    clearInterval(typingInterval);
                    setTimeout(analyzeContent, 1000);
                }
            }, 10);
        }

        function analyzeContent() {
            updateStepIndicator(1);
            analysisTitle.textContent = 'Analyzing Content...';
            analysisIcon.innerHTML = \`<div class="w-16 h-16 mx-auto rounded-2xl flex items-center justify-center"><svg class="w-8 h-8 text-black animate-spin" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg></div>\`;
            setTimeout(generateReport, 2000);
        }

        function generateReport() {
            updateStepIndicator(2);
            analysisTitle.textContent = 'Analysis Complete';
            analysisDescription.textContent = 'Report generated successfully.';
            analysisIcon.innerHTML = \`<div class="w-16 h-16 mx-auto rounded-2xl flex items-center justify-center"><svg class="w-8 h-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.623 0-1.602-.39-3.124-1.098-4.51M12 4.5v1.428" /></svg></div>\`;
            reportOutputEl.innerHTML = studentText.split('. ').map((s, idx) => s.trim() ? \`<span class="\${idx % 2 === 0 ? 'sentence-human' : 'sentence-ai'}">\${s}.</span>\` : '').join(' ');
            reportIndicator.className = 'px-2 py-1 rounded text-xs font-semibold bg-green-100 text-green-800';
            reportIndicator.textContent = 'Status: Complete';
            aiCount.textContent = '3';
            humanCount.textContent = '3';
            analysisDetails.classList.remove('opacity-0');
        }

        restartDemoBtn.addEventListener('click', runDemo);
        window.addEventListener('load', runDemo);

        // --- NEW SCRIPT FOR MODAL AND PAYMENT ---
        const getStartedBtn = document.getElementById('get-started-btn');
        const emailModal = document.getElementById('email-modal');
        const emailForm = document.getElementById('email-form');
        const emailInput = document.getElementById('email-input');
        const closeModalBtn = document.getElementById('close-modal-btn');
        
        const showModal = () => emailModal.classList.add('active');
        const hideModal = () => emailModal.classList.remove('active');

        getStartedBtn.addEventListener('click', showModal);
        closeModalBtn.addEventListener('click', hideModal);
        emailModal.addEventListener('click', (e) => {
            if (e.target === emailModal) hideModal();
        });


        emailForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = emailInput.value.trim();
            if (!email) { alert('Please enter a valid email.'); return; }
            
            const action = e.submitter.dataset.action;
            const workerUrl = window.location.origin;

            if (action === 'trial') {
                // MODIFICATION: Point to the new dedicated trial route
                window.location.href = \`https://demo.imaginea.store/track?email=\${encodeURIComponent(email)}\`;
                
            } else if (action === 'checkout') {
                window.location.href = \`\${workerUrl}/checkout?email=\${encodeURIComponent(email)}\`;
            }
        });

        
        setTimeout(showModal, 3000);

    <\/script>
</body>
</html>
`;

// ADD DEFAULT EXPORT HERE

export default {
    async fetch(request, env, ctx) {
        const url = new URL(request.url);
        const method = request.method;
        const kv = env.SUBSCRIPTIONS_KV;

        if (!kv) {
            return new Response("KV storage is not bound.", { status: 500 });
        }


        if (url.pathname === '/api/verify-payment' && method === 'POST') {
            try {
                const body = await request.json();
                const email = body.email;
                
                if (!email) {
                    return new Response(JSON.stringify({ error: 'Email required' }), { status: 400 });
                }
        
                // Check KV first
                const userData = await kv.get(email, { type: "json" });
                if (userData?.hasPaid && userData?.subscriptions?.status === 'active') {
                    return new Response(JSON.stringify({ status: 'paid' }));
                }
        
                // Fallback: Check with DodoPayments API
                const dodo = new DodoPayments({
                    bearerToken: env.DODO_PAYMENTS_API_KEY
                });
        
                try {
                    const subscriptions = await dodo.subscriptions.list({
                        customer_email: email
                    });
        
                    const activeSubscription = subscriptions.data?.find(
                        sub => sub.status === 'active' || sub.status === 'trialing'
                    );
        
                    if (activeSubscription) {
                        // Update KV with the found subscription
                        await kv.put(email, JSON.stringify({
                            hasPaid: true,
                            trialStarted: userData?.trialStarted || null,
                            subscriptions: {
                                status: 'active',
                                next_billing_date: activeSubscription.next_billing_date
                            }
                        }));
                        
                        return new Response(JSON.stringify({ status: 'paid' }));
                    }
                } catch (apiError) {
                    console.error('DodoPayments API error:', apiError);
                }
        
                return new Response(JSON.stringify({ status: 'unpaid' }));
                
            } catch (err) {
                return new Response(JSON.stringify({ error: err.message }), { status: 500 });
            }
        }
        

        if (url.pathname === '/api/webhook' && method === 'POST') {
            try {
                const secret = env.DODO_PAYMENTS_WEBHOOK_KEY;
                if (!secret) throw new Error("Webhook secret not configured.");
                const bodyText = await request.text();
                const headers = Object.fromEntries(request.headers);
                const wh = new Webhook(secret);
                const payload = wh.verify(bodyText, headers);
                const email = payload.data.customer?.email;
                if (!email) {
                    console.warn('Webhook received without email');
                    return new Response(JSON.stringify({ status: 'success', warning: 'no email' }), { status: 200 });
                }
                const currentUserData = await kv.get(email, { type: "json" }) || { hasPaid: false, trialStarted: null };
                
                // Log the webhook event
                console.log(`[WEBHOOK] Received: ${payload.type} for ${email}`);
                
                if (payload.type === 'subscription.active' || 
                    payload.type === 'subscription.renewed' || 
                    payload.type === 'payment.succeeded') {
                    
                    currentUserData.hasPaid = true;
                    currentUserData.subscriptions = {
                        status: 'active',
                        next_billing_date: payload.data.next_billing_date || 
                            new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
                    };
                    
                    await kv.put(email, JSON.stringify(currentUserData));
                    console.log(`[KV] ✓ Subscription activated for ${email}`);
                    
                    return new Response(JSON.stringify({ 
                        status: 'success', 
                        message: 'Subscription activated' 
                    }), { status: 200 });
                }
                
                return new Response(JSON.stringify({ status: 'success' }), { status: 200 });
                
            } catch (err) {
                console.error('[WEBHOOK ERROR]:', err.message);
                return new Response(JSON.stringify({ error: err.message }), { status: 400 });
            }
        }
        


//         // --- ROUTE 2: HOME PAGE / ACCESS CHECK (With Cookie Support) ---
// if (url.pathname === '/' && method === 'GET') {
//     // Try to get email from URL parameter first, then from cookie
//     let email = url.searchParams.get('email');
    
//     if (!email) {
//         // Check for session cookie
//         const cookies = request.headers.get('Cookie') || '';
//         const sessionMatch = cookies.match(/session_email=([^;]+)/);
//         if (sessionMatch) {
//             email = decodeURIComponent(sessionMatch[1]);
//         }
//     }
    
//     if (!email) {
//         return new Response(LANDING_PAGE_HTML, { headers: { 'Content-Type': 'text/html;charset=UTF-8' } });
//     }
    
//     const userData = await kv.get(email, { type: "json" });
//     const headers = { 'Content-Type': 'text/html;charset=UTF-8' };
    
//     // Set persistent cookie for 30 days
//     headers['Set-Cookie'] = `session_email=${encodeURIComponent(email)}; Path=/; Max-Age=2592000; HttpOnly; Secure; SameSite=Lax`;
    
//     if (userData?.hasPaid && userData?.subscriptions?.status === 'active') {
//         return new Response(generateAppPage(email, 'paid', userData.subscriptions.next_billing_date), { headers });
//     } else {
//         const now = Date.now();
//         if (!userData?.trialStarted) {
//             const trialData = { hasPaid: false, trialStarted: new Date().toISOString() };
//             await kv.put(email, JSON.stringify(trialData));
//             return new Response(generateAppPage(email, 'trial', new Date(now + TRIAL_DURATION_MS).toISOString()), { headers });
//         } else {
//             const trialEnd = new Date(userData.trialStarted).getTime() + TRIAL_DURATION_MS;
//             if (now < trialEnd) {
//                 return new Response(generateAppPage(email, 'trial', new Date(trialEnd).toISOString()), { headers });
//             } else {
//                 return new Response(generateExpiredPage(email), { headers });
//             }
//         }
//     }
// }



if (url.pathname === '/' && method === 'GET') {
    // Try to get email from URL parameter first, then from cookie
    let email = url.searchParams.get('email');
    
    if (!email) {
        // Check for session cookie
        const cookies = request.headers.get('Cookie') || '';
        const sessionMatch = cookies.match(/session_email=([^;]+)/);
        if (sessionMatch) {
            email = decodeURIComponent(sessionMatch[1]);
        }
    }
    
    if (!email) {
        return new Response(LANDING_PAGE_HTML, { headers: { 'Content-Type': 'text/html;charset=UTF-8' } });
    }
    
    const userData = await kv.get(email, { type: "json" });
    const headers = { 'Content-Type': 'text/html;charset=UTF-8' };
    
    // Set persistent cookie for 30 days
    headers['Set-Cookie'] = `session_email=${encodeURIComponent(email)}; Path=/; Max-Age=2592000; HttpOnly; Secure; SameSite=Lax`;
    
    if (userData?.hasPaid && userData?.subscriptions?.status === 'active') {
        return new Response(generateAppPage(email, 'paid', userData.subscriptions.next_billing_date), { headers });
    } else {
        const now = Date.now();
        if (!userData?.trialStarted) {
            const trialData = { hasPaid: false, trialStarted: new Date().toISOString() };
            await kv.put(email, JSON.stringify(trialData));
            return new Response(generateAppPage(email, 'trial', new Date(now + TRIAL_DURATION_MS).toISOString()), { headers });
        } else {
            const trialEnd = new Date(userData.trialStarted).getTime() + TRIAL_DURATION_MS;
            if (now < trialEnd) {
                return new Response(generateAppPage(email, 'trial', new Date(trialEnd).toISOString()), { headers });
            } else {
                return new Response(generateExpiredPage(email), { headers });
            }
        }
    }
}
        // --- ROUTE 3: CHECKOUT (No changes) ---
        if (url.pathname === '/checkout' && method === 'GET') {
            const email = url.searchParams.get('email');
            const baseUrl = (env.DODO_PAYMENTS_ENVIRONMENT === 'live_mode') ? 'https://checkout.dodopayments.com/buy' : 'https://test.checkout.dodopayments.com/buy';
            const successUrl = new URL(env.DODO_PAYMENTS_RETURN_URL || `${url.origin}/success`);
            if (email) successUrl.searchParams.append('email', email);
            let checkoutUrl = `${baseUrl}/${PRODUCT_ID}?redirect_url=${encodeURIComponent(successUrl.toString())}`;
            if (email) checkoutUrl += `&email=${encodeURIComponent(email)}`;
            return Response.redirect(checkoutUrl, 302);
        }

        // --- **MODIFIED** ROUTE 4: SUCCESS PAGE ---
        if (url.pathname === '/success' && method === 'GET') {
            const customerEmail = url.searchParams.get('email') || '';
            if (!customerEmail) {
                return new Response("Payment successful, but we could not identify your account. Please contact support.", { status: 400 });
            }
            // Serve the new verification page instead of redirecting immediately
            return new Response(generateVerificationPage(customerEmail), {
                headers: { 'Content-Type': 'text/html;charset=UTF-8' }
            });
        }

        // --- **MODIFIED** ROUTE 5: API CHECK ACCESS ---
        if (url.pathname === '/api/check-access' && method === 'POST') {
            try {
                const body = await request.json();
                const email = body.email;
                if (!email) {
                    return new Response(JSON.stringify({ status: 'error', reason: 'no_email' }), { status: 400 });
                }
                const userData = await kv.get(email, { type: "json" });
                // Check for the specific paid status
                if (userData?.hasPaid && userData?.subscriptions?.status === 'active') {
                    return new Response(JSON.stringify({ status: 'paid' }));
                }
                // Otherwise, the user is not considered paid yet
                return new Response(JSON.stringify({ status: 'unpaid' }));
            } catch (err) {
                return new Response(JSON.stringify({ status: 'error', message: err.message }), { status: 500 });
            }
        }

        return new Response('Page Not Found.', { status: 404 });
    }
};


function generateAppPage(email, accessType, expiryDate) {
    const trialBanner = accessType === 'trial' ? `
        <div class="status-banner trial">
            <div class="banner-content">
                <div class="banner-left">
                    <span class="badge">FREE TRIAL</span>
                    <span class="banner-text">Expires: ${new Date(expiryDate).toLocaleString()}</span>
                </div>
                <a href="/checkout?email=${encodeURIComponent(email)}" class="upgrade-btn">
                    <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                        <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                    </svg>
                    Upgrade to Pro
                </a>
            </div>
        </div>
    ` : '';
    
    const subscriptionBanner = accessType === 'paid' ? `
        <div class="status-banner paid">
            <div class="banner-content">
                <div class="banner-left">
                    <span class="badge pro">PRO</span>
                    <span class="banner-text">Active until ${new Date(expiryDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                </div>
                <span class="user-email">${email}</span>
            </div>
        </div>
    ` : '';

    return `<!DOCTYPE html>
<html>
<head>
    <title>AI Content Humanizer - Dashboard</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        * { 
            margin: 0; 
            padding: 0; 
            box-sizing: border-box; 
        }
        
        body { 
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            overflow: hidden;
        }
        
        .status-banner {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            z-index: 10000;
            padding: 12px 24px;
            background: rgba(10, 25, 47, 0.85); /* Matching header-bg from your theme */
            backdrop-filter: blur(8px);
            border-bottom: 1px solid #1d3150; /* Matching border-color from your theme */
            animation: slideDown 0.3s ease-out;
        }
        
        @keyframes slideDown {
            from { transform: translateY(-100%); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
        }
        
        .banner-content {
            max-width: 1400px;
            margin: 0 auto;
            display: flex;
            justify-content: space-between;
            align-items: center;
            color: #ccd6f6; /* Matching text-primary from your theme */
        }
        
        .banner-left { display: flex; align-items: center; gap: 16px; }
        
        .badge {
            background: rgba(100, 255, 218, 0.1); /* Teal accent */
            color: #64ffda;
            padding: 6px 14px;
            border-radius: 20px;
            font-size: 12px;
            font-weight: 700;
            letter-spacing: 0.5px;
            text-transform: uppercase;
            border: 1px solid rgba(100, 255, 218, 0.2);
        }
        
        .banner-text { font-size: 14px; font-weight: 500; color: #8892b0; }
        
        .upgrade-btn {
            display: flex;
            align-items: center;
            gap: 8px;
            background-color: #64ffda; /* Teal accent */
            color: #0A192F; /* Dark blue text */
            padding: 10px 24px;
            border-radius: 24px;
            text-decoration: none;
            font-weight: 600;
            font-size: 14px;
            transition: all 0.2s ease;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }
        
        .upgrade-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 16px rgba(100, 255, 218, 0.2);
            background-color: #52c4b3;
        }
        
        .iframe-container {
            position: fixed;
            top: 57px; /* Adjusted for banner height */
            left: 0;
            right: 0;
            bottom: 0;
            /* THIS IS THE KEY CHANGE: Matching your theme's background */
            background: #0A192F; 
        }
        
        iframe {
            width: 100%;
            height: 100%;
            border: none;
            display: block;
        }

        
        /* Custom modal for upgrade prompts */
        .modal-overlay {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.6);
            backdrop-filter: blur(4px);
            z-index: 20000;
            animation: fadeIn 0.2s ease-out;
        }
        
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        
        .modal-overlay.active {
            display: flex;
            justify-content: center;
            align-items: center;
        }
        
        .modal {
            background: white;
            border-radius: 16px;
            padding: 32px;
            max-width: 480px;
            width: 90%;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
            animation: slideUp 0.3s ease-out;
        }
        
        @keyframes slideUp {
            from {
                transform: translateY(40px);
                opacity: 0;
            }
            to {
                transform: translateY(0);
                opacity: 1;
            }
        }
        
        .modal-icon {
            width: 64px;
            height: 64px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 24px;
            font-size: 32px;
        }
        
        .modal h2 {
            font-size: 24px;
            margin-bottom: 12px;
            text-align: center;
            color: #1a1a1a;
        }
        
        .modal p {
            font-size: 15px;
            line-height: 1.6;
            color: #666;
            text-align: center;
            margin-bottom: 24px;
        }
        
        .modal-buttons {
            display: flex;
            gap: 12px;
        }
        
        .modal-btn {
            flex: 1;
            padding: 14px 24px;
            border: none;
            border-radius: 10px;
            font-weight: 600;
            font-size: 15px;
            cursor: pointer;
            transition: all 0.2s ease;
        }
        
        .modal-btn.primary {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
        }
        
        .modal-btn.primary:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 16px rgba(102, 126, 234, 0.3);
        }
        
        .modal-btn.secondary {
            background: #f5f5f5;
            color: #666;
        }
        
        .modal-btn.secondary:hover {
            background: #e5e5e5;
        }
        
        @media (max-width: 768px) {
            .banner-content {
                flex-direction: column;
                gap: 12px;
            }
            
            .banner-left {
                flex-direction: column;
                gap: 8px;
                text-align: center;
            }
            
            .status-banner {
                padding: 16px;
            }
        }
    </style>
</head>
<body>
    ${trialBanner}
    ${subscriptionBanner}
    
    <div class="iframe-container">
        <iframe 
            id="appFrame"
            src="https://demo.imaginea.store/track" 
            allow="clipboard-read; clipboard-write"
            sandbox="allow-same-origin allow-scripts allow-forms"
        ></iframe>
    </div>
    
    <div class="modal-overlay" id="upgradeModal">
        <div class="modal">
            <div class="modal-icon">🔒</div>
            <h2>Premium Feature</h2>
            <p>This feature is only available for Pro subscribers. Upgrade now to unlock all features and get unlimited access!</p>
            <div class="modal-buttons">
                <button class="modal-btn secondary" onclick="closeModal()">Maybe Later</button>
                <button class="modal-btn primary" onclick="upgradeNow()">Upgrade to Pro</button>
            </div>
        </div>
    </div>
    
    <script>
        const email = "${email}";
        const accessType = "${accessType}";
        
        function closeModal() {
            document.getElementById('upgradeModal').classList.remove('active');
        }
        
        function upgradeNow() {
            window.location.href = '/checkout?email=' + encodeURIComponent(email);
        }
        
        window.addEventListener('message', async (event) => {
            if (event.origin !== 'https://demo.imaginea.store') return;
            
            if (event.data.type === 'BUTTON_CLICK') {
                const buttonName = event.data.button;
                
                if (accessType === 'trial' && 
                    (buttonName === 'printDashboard' || buttonName === 'analysis')) {
                    event.source.postMessage({
                        type: 'BUTTON_BLOCKED',
                        message: 'This feature requires a paid subscription',
                        showUpgrade: true
                    }, event.origin);
                    
                    document.getElementById('upgradeModal').classList.add('active');
                } else if (accessType === 'paid') {
                    event.source.postMessage({
                        type: 'BUTTON_ALLOWED',
                        button: buttonName
                    }, event.origin);
                }
            }
        });
        
        const iframe = document.getElementById('appFrame');
        iframe.addEventListener('load', () => {
            iframe.contentWindow.postMessage({
                type: 'ACCESS_LEVEL',
                accessType: accessType,
                email: email
            }, 'https://demo.imaginea.store');
        });
        
        // Close modal on overlay click
        document.getElementById('upgradeModal').addEventListener('click', (e) => {
            if (e.target.id === 'upgradeModal') {
                closeModal();
            }
        });
    </script>
</body>
</html>`;
}

function generateVerificationPage(email) {
    const encodedEmail = encodeURIComponent(email);
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Verifying Payment...</title>
        <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; display: flex; align-items: center; justify-content: center; min-height: 100vh; background-color: #f3f4f6; color: #111827; margin: 0; }
            .container { text-align: center; padding: 20px; }
            .spinner { width: 56px; height: 56px; border: 7px solid #d1d5db; border-top-color: #3b82f6; border-radius: 50%; animation: spin 1s linear infinite; margin: 0 auto 24px; }
            @keyframes spin { to { transform: rotate(360deg); } }
            h1 { font-size: 24px; font-weight: 600; margin-bottom: 8px; }
            p { color: #4b5563; }
            .error { color: #ef4444; display: none; margin-top: 16px; }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="spinner"></div>
            <h1>Verifying Your Payment</h1>
            <p>Please wait a moment while we confirm your subscription...</p>
            <p class="error" id="errorMessage">Couldn't confirm payment after 10 seconds. Redirecting you now...</p>
        </div>
        <script>
            const email = "${email}";
            const maxAttempts = 15; // Try 5 times (total 10 seconds)
            let attempts = 0;

            async function checkStatus() {
                attempts++;
                try {
                    const response = await fetch('/api/verify-payment', {  // Changed endpoint
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ email: email })
                    });
            
                    const data = await response.json();

                    if (data.status === 'paid') {
                        // SUCCESS: The KV is updated! Redirect to the main app page.
                        window.location.href = '/?email=${encodedEmail}';
                    } else if (attempts < maxAttempts) {
                        // Not paid yet, try again in 2 seconds.
                        setTimeout(checkStatus, 2000);
                    } else {
                        // FAILED: Still not paid. Show an error and redirect to the home page anyway.
                        // The user might be on a trial or something else went wrong.
                        document.getElementById('errorMessage').style.display = 'block';
                        setTimeout(() => {
                            window.location.href = '/?email=${encodedEmail}';
                        }, 2000);
                    }
                } catch (error) {
                    console.error('Error checking payment status:', error);
                    // On error, redirect to the home page as a fallback.
                    window.location.href = '/?email=${encodedEmail}';
                }
            }
            
            // Start checking immediately when the page loads.
            window.onload = checkStatus;
        <\/script>
    </body>
    </html>
    `;
}


function generateExpiredPage(email) {
    return `<!DOCTYPE html>
<html>
<head>
    <title>Trial Expired - Upgrade to Continue</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            padding: 20px;
        }
        
        .container {
            max-width: 560px;
            width: 100%;
            background: white;
            padding: 48px;
            border-radius: 24px;
            box-shadow: 0 25px 80px rgba(0, 0, 0, 0.25);
            text-align: center;
            animation: slideIn 0.4s ease-out;
        }
        
        @keyframes slideIn {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .icon {
            width: 80px;
            height: 80px;
            background: linear-gradient(135deg, #ffeaa7 0%, #fdcb6e 100%);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 40px;
            margin: 0 auto 24px;
            box-shadow: 0 8px 24px rgba(253, 203, 110, 0.3);
        }
        
        h1 {
            color: #1a1a1a;
            font-size: 28px;
            margin-bottom: 12px;
            font-weight: 700;
        }
        
        .subtitle {
            color: #666;
            font-size: 16px;
            margin-bottom: 32px;
            line-height: 1.6;
        }
        
        .features {
            background: #f8f9fa;
            border-radius: 16px;
            padding: 28px;
            margin: 32px 0;
            text-align: left;
        }
        
        .features-title {
            font-size: 18px;
            font-weight: 700;
            color: #1a1a1a;
            margin-bottom: 20px;
            text-align: center;
        }
        
        .feature-item {
            display: flex;
            align-items: flex-start;
            gap: 12px;
            margin-bottom: 16px;
            color: #444;
            font-size: 15px;
            line-height: 1.5;
        }
        
        .feature-item:last-child {
            margin-bottom: 0;
        }
        
        .feature-icon {
            width: 24px;
            height: 24px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-size: 14px;
            flex-shrink: 0;
            margin-top: 2px;
        }
        
        .button {
            display: inline-block;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 16px 48px;
            border-radius: 12px;
            text-decoration: none;
            font-weight: 600;
            font-size: 16px;
            box-shadow: 0 8px 24px rgba(102, 126, 234, 0.4);
            transition: all 0.3s ease;
            margin-top: 8px;
        }
        
        .button:hover {
            transform: translateY(-3px);
            box-shadow: 0 12px 32px rgba(102, 126, 234, 0.5);
        }
        
        .button:active {
            transform: translateY(-1px);
        }
        
        .price {
            margin-top: 24px;
            color: #888;
            font-size: 14px;
        }
        
        .price strong {
            color: #667eea;
            font-size: 20px;
        }
        
        @media (max-width: 640px) {
            .container {
                padding: 32px 24px;
            }
            
            h1 {
                font-size: 24px;
            }
            
            .button {
                width: 100%;
                padding: 16px 32px;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="icon">⏰</div>
        <h1>Your Trial Has Ended</h1>
        <p class="subtitle">Thanks for trying AI Content Humanizer! Your 24-hour free trial has expired. Upgrade now to continue using all features.</p>
        
        <div class="features">
            <div class="features-title">Unlock Pro Features</div>
            <div class="feature-item">
                <div class="feature-icon">✓</div>
                <div><strong>Unlimited humanization</strong> - Transform any AI content instantly</div>
            </div>
            <div class="feature-item">
                <div class="feature-icon">✓</div>
                <div><strong>Advanced analysis tools</strong> - Deep insights & tracking</div>
            </div>
            <div class="feature-item">
                <div class="feature-icon">✓</div>
                <div><strong>Export & print</strong> - Download and share your content</div>
            </div>
            <div class="feature-item">
                <div class="feature-icon">✓</div>
                <div><strong>Priority support</strong> - Get help whenever you need it</div>
            </div>
        </div>
        
        <a href="/checkout?email=${encodeURIComponent(email)}" class="button">
            Upgrade to Pro
        </a>
        
        <div class="price">
            Starting at <strong>$9.99/month</strong>
        </div>
    </div>
</body>
</html>`;
}

function generateHtmlPage(title, bodyContent) {
    return `<!DOCTYPE html>
<html>
<head>
    <title>${title}</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            padding: 20px;
        }
        
        .container {
            max-width: 480px;
            width: 100%;
            background: white;
            padding: 48px;
            border-radius: 24px;
            box-shadow: 0 25px 80px rgba(0, 0, 0, 0.25);
            text-align: center;
            animation: slideIn 0.4s ease-out;
        }
        
        @keyframes slideIn {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .logo {
            width: 72px;
            height: 72px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            border-radius: 16px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 36px;
            margin: 0 auto 24px;
            box-shadow: 0 8px 24px rgba(102, 126, 234, 0.3);
        }
        
        h1 {
            color: #1a1a1a;
            font-size: 28px;
            margin-bottom: 12px;
            font-weight: 700;
        }
        
        p {
            color: #666;
            font-size: 15px;
            margin-bottom: 32px;
            line-height: 1.6;
        }
        
        p strong {
            color: #667eea;
            font-weight: 600;
        }
        
        form {
            display: flex;
            flex-direction: column;
            gap: 16px;
        }
        
        input {
            padding: 16px 20px;
            width: 100%;
            border-radius: 12px;
            border: 2px solid #e5e7eb;
            font-size: 16px;
            transition: all 0.2s ease;
            font-family: inherit;
        }
        
        input:focus {
            outline: none;
            border-color: #667eea;
            box-shadow: 0 0 0 4px rgba(102, 126, 234, 0.1);
        }
        
        input::placeholder {
            color: #9ca3af;
        }
        
        button, .button {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 16px 32px;
            border: none;
            border-radius: 12px;
            cursor: pointer;
            font-size: 16px;
            font-weight: 600;
            box-shadow: 0 8px 24px rgba(102, 126, 234, 0.4);
            transition: all 0.3s ease;
            text-decoration: none;
            display: inline-block;
            font-family: inherit;
        }
        
        button:hover, .button:hover {
            transform: translateY(-3px);
            box-shadow: 0 12px 32px rgba(102, 126, 234, 0.5);
        }
        
        button:active, .button:active {
            transform: translateY(-1px);
        }
        
        button:disabled {
            opacity: 0.6;
            cursor: not-allowed;
            transform: none;
        }
        
        .feature-list {
            background: #f8f9fa;
            border-radius: 16px;
            padding: 24px;
            margin: 24px 0;
            text-align: left;
        }
        
        .feature-list ul {
            list-style: none;
        }
        
        .feature-list li {
            padding: 8px 0;
            color: #444;
            font-size: 14px;
            display: flex;
            align-items: center;
            gap: 12px;
        }
        
        .feature-list li:before {
            content: "✓";
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: 20px;
            height: 20px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            border-radius: 50%;
            font-size: 12px;
            font-weight: bold;
            flex-shrink: 0;
        }
        
        @media (max-width: 640px) {
            .container {
                padding: 32px 24px;
            }
            
            h1 {
                font-size: 24px;
            }
            
            .logo {
                width: 64px;
                height: 64px;
                font-size: 32px;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        ${bodyContent}
    </div>
</body>
</html>`;
}