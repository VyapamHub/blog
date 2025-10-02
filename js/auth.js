// =================================================================
// 1. FIREBASE CONFIGURATION & INITIALIZATION
// =================================================================
// (आपके द्वारा साझा किया गया कॉन्फ़िगरेशन अब यहाँ उपयोग किया जा रहा है)
const firebaseConfig = {
    apiKey: "AIzaSyBU12pwqkapZydnpVjmhvFUDaunhCRmXVI",
    authDomain: "cgvyapam-guide-auth.firebaseapp.com",
    projectId: "cgvyapam-guide-auth",
    storageBucket: "cgvyapam-guide-auth.firebasestorage.app",
    messagingSenderId: "467763362263",
    appId: "1:467763362263:web:47bc4fc775b83069597392",
    measurementId: "G-P9YCBE8E52"
};

// आवश्यक Firebase लाइब्रेरीज का आयात (Import)
// नोट: मैंने उन लाइब्रेरी संस्करणों को अपडेट कर दिया है जिनका आप उपयोग कर रहे हैं (12.3.0)
import { initializeApp } from 'https://www.gstatic.com/firebasejs/12.3.0/firebase-app.js';
import { 
    getAuth, 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword,
    updateProfile,
    onAuthStateChanged, // यूज़र की स्थिति जाँचने के लिए
    signOut
} from 'https://www.gstatic.com/firebasejs/12.3.0/firebase-auth.js';
import { 
    getFirestore, 
    doc, 
    setDoc 
} from 'https://www.gstatic.com/firebasejs/12.3.0/firebase-firestore.js';


// Firebase App, Auth, और Firestore को इनिशियलाइज़ करना
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);


// सामान्य UI एलिमेंट्स
const errorMessageDiv = document.getElementById('error-message');
const successMessageDiv = document.getElementById('success-message');
const mainNav = document.querySelector('.main-nav .nav-links'); // हेडर नेविगेशन


// यूज़र के लिए नेविगेशन बार अपडेट करना
const setupNavbar = (user) => {
    if (mainNav) {
        // 'लॉगिन / रजिस्टर' बटन को हटाएँ
        let authButton = mainNav.querySelector('li a.btn-primary');
        if (authButton) {
            authButton.parentElement.remove();
        }

        if (user) {
            // यूज़र लॉगिन है: डैशबोर्ड और लॉगआउट दिखाएँ
            // सुनिश्चित करें कि यह केवल एक बार जोड़े
            if (!mainNav.querySelector('li a[href="dashboard.html"]')) {
                mainNav.innerHTML += `
                    <li><a href="dashboard.html">डैशबोर्ड</a></li>
                    <li><a href="#" id="logout-link" class="btn btn-secondary">लॉगआउट</a></li>
                `;
            }
        } else {
            // यूज़र लॉगिन नहीं है: लॉगिन/रजिस्टर दिखाएँ
            mainNav.innerHTML += `
                <li><a href="login.html" class="btn btn-primary">लॉगिन / रजिस्टर</a></li>
            `;
        }
    }
};

// =================================================================
// 2. AUTHENTICATION STATE LISTENER
// =================================================================
// हर बार जब यूज़र की लॉगिन स्थिति बदलती है तो यह फ़ंक्शन चलता है
onAuthStateChanged(auth, (user) => {
    setupNavbar(user); // नेविगेशन बार अपडेट करें

    // यदि आप डैशबोर्ड या सुरक्षित पेज पर हैं, तो यहाँ रीडायरेक्ट लॉजिक जोड़ें
    // उदाहरण के लिए, यदि user null है और आप dashboard.html पर हैं, तो login.html पर भेजें
    const path = window.location.pathname;
    if (path.includes('dashboard.html') && !user) {
        window.location.href = 'login.html'; 
    }
});


// =================================================================
// 3. LOGOUT LOGIC (लॉगआउट फ़ंक्शन को नेविगेशन बार से जोड़ना)
// =================================================================
document.addEventListener('click', async (e) => {
    if (e.target && e.target.id === 'logout-link') {
        e.preventDefault();
        try {
            await signOut(auth);
            alert('आप सफलतापूर्वक लॉगआउट हो गए हैं।');
            window.location.href = 'index.html';
        } catch (error) {
            console.error('Logout failed:', error);
        }
    }
});


// =================================================================
// 4. REGISTRATION LOGIC
// =================================================================

const registrationForm = document.getElementById('registrationForm');

if (registrationForm) {
    registrationForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        errorMessageDiv.style.display = 'none';
        successMessageDiv.style.display = 'none';

        const email = registrationForm['email'].value;
        const password = registrationForm['password'].value;
        const fullName = registrationForm['fullName'].value;
        const place = registrationForm['place'].value;
        const phone = registrationForm['phone'].value;

        try {
            // 2. नया यूज़र बनाना
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // 3. यूज़र का नाम अपडेट करना
            await updateProfile(user, { displayName: fullName });

            // 4. Firestore में अतिरिक्त डेटा स्टोर करना
            await setDoc(doc(db, "users", user.uid), {
                fullName: fullName,
                email: email,
                place: place,
                phone: phone, 
                createdAt: new Date()
            });

            successMessageDiv.textContent = 'रजिस्ट्रेशन सफल! आपको लॉगिन पेज पर ले जाया जा रहा है...';
            successMessageDiv.style.display = 'block';
            registrationForm.reset(); 

            setTimeout(() => {
                 window.location.href = 'login.html';
            }, 3000); 

        } catch (error) {
            let message = 'रजिस्ट्रेशन विफल रहा। कृपया फिर से प्रयास करें।';
            if (error.code === 'auth/email-already-in-use') {
                message = 'यह ईमेल पहले से पंजीकृत है।';
            } else if (error.code === 'auth/weak-password') {
                message = 'पासवर्ड बहुत कमजोर है (न्यूनतम 6 अक्षर)।';
            }
            
            errorMessageDiv.textContent = message;
            errorMessageDiv.style.display = 'block';
        }
    });
}


// =================================================================
// 5. LOGIN LOGIC
// =================================================================
const loginForm = document.getElementById('loginForm');

if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        errorMessageDiv.style.display = 'none';
        successMessageDiv.style.display = 'none';

        const email = loginForm['email'].value;
        const password = loginForm['password'].value;

        try {
            // Firebase Authentication का उपयोग करके लॉगिन करना
            await signInWithEmailAndPassword(auth, email, password);

            successMessageDiv.textContent = 'लॉगिन सफल! आपको होम पेज पर ले जाया जा रहा है...';
            successMessageDiv.style.display = 'block';

            setTimeout(() => {
                 window.location.href = 'index.html'; 
            }, 2000); 

        } catch (error) {
            let message = 'लॉगिन विफल रहा। कृपया फिर से प्रयास करें।';
            if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
                message = 'गलत ईमेल या पासवर्ड। कृपया जाँच करें।';
            } else if (error.code === 'auth/invalid-email') {
                message = 'कृपया एक वैध ईमेल ID दर्ज करें।';
            }

            errorMessageDiv.textContent = message;
            errorMessageDiv.style.display = 'block';
        }
    });
}