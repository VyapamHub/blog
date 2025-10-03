// =================================================================
// 1. FIREBASE CONFIGURATION & INITIALIZATION
// =================================================================
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
import { initializeApp } from 'https://www.gstatic.com/firebasejs/12.3.0/firebase-app.js';
import { 
    getAuth, 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword,
    updateProfile,
    onAuthStateChanged, 
    signOut
} from 'https://www.gstatic.com/firebasejs/12.3.0/firebase-auth.js';
import { 
    getFirestore, 
    doc, 
    setDoc,
    // [IMPORT FIXED] deleteDoc को लाइक हटाने के लिए जोड़ना आवश्यक है
    deleteDoc
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
    // पहले मौजूदा auth बटनों को हटा दें (ताकि वे डुप्लीकेट न हों)
    let existingDashboard = mainNav ? mainNav.querySelector('li a[href="dashboard.html"]') : null;
    let existingLogout = mainNav ? mainNav.querySelector('li a[id="logout-link"]') : null;
    let existingLogin = mainNav ? mainNav.querySelector('li a[href="login.html"]') : null;
    
    if (existingDashboard) existingDashboard.parentElement.remove();
    if (existingLogout) existingLogout.parentElement.remove();
    if (existingLogin) existingLogin.parentElement.remove();
    
    if (mainNav) {
        if (user) {
            // यूज़र लॉगिन है: डैशबोर्ड और लॉगआउट दिखाएँ
            mainNav.innerHTML += `
                <li><a href="dashboard.html">डैशबोर्ड</a></li>
                <li><a href="#" id="logout-link" class="btn btn-secondary">लॉगआउट</a></li>
            `;
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
onAuthStateChanged(auth, (user) => {
    setupNavbar(user); // नेविगेशन बार अपडेट करें

    // यदि आप डैशबोर्ड या सुरक्षित पेज पर हैं, तो यहाँ रीडायरेक्ट लॉजिक जोड़ें
    const path = window.location.pathname;
    const protectedPages = ['dashboard.html', 'anm-mcq-test.html', 'premium-content.html'];
    
    const isProtected = protectedPages.some(page => path.includes(page));

    if (isProtected && !user) {
        window.location.href = 'login.html'; 
        return;
    }
    
    // यदि यूज़र लॉगिन है और गलती से login.html/register.html पर है, तो उसे index.html पर भेज दें
    if ((path.includes('login.html') || path.includes('register.html')) && user) {
        window.location.href = 'index.html';
    }
    
    // [FIX] onAuthStateChanged के अंदर currentUser को सेट करें
    // और कमेंट/लाइक को दोबारा लोड करें ताकि UI तुरंत अपडेट हो
    currentUser = user; 
    loadLikesAndComments(); // यह सुनिश्चित करता है कि 'Liked!' स्थिति सही हो
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
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            await updateProfile(user, { displayName: fullName });

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
        console.log("LOGIN ATTEMPT STARTED.");
        e.preventDefault();
        errorMessageDiv.style.display = 'none';
        successMessageDiv.style.display = 'none';

        const email = loginForm['email'].value;
        const password = loginForm['password'].value;

        try {
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
// =================================================================
// 6. COMMENT & LIKE LOGIC
// =================================================================

import { 
    collection, 
    addDoc, 
    query, 
    where, 
    getDocs, 
    orderBy, 
    serverTimestamp,
    // [FIXED] deleteDoc का आयात पहले से ही ऊपर किया गया है, runTransaction और increment की यहाँ आवश्यकता नहीं है
} from 'https://www.gstatic.com/firebasejs/12.3.0/firebase-firestore.js';

// **महत्वपूर्ण:** हम प्रत्येक पोस्ट को एक unique ID से पहचानते हैं। 
const CURRENT_POST_ID = 'anm-mcq-post-1'; // आपको हर पोस्ट फ़ाइल के लिए इसे बदलना होगा!

const commentsContainer = document.getElementById('commentsContainer');
const commentForm = document.getElementById('commentForm');
const likeBtn = document.getElementById('likeBtn');
const likeCountSpan = document.getElementById('likeCount');
const authMessage = document.getElementById('authMessage');

let currentUser = null; // वर्तमान में लॉगिन यूज़र का डेटा
let hasUserLiked = false; // क्या यूज़र पहले ही लाइक कर चुका है?

// [REMOVED] पुरानी onAuthStateChanged कॉल हटा दी गई क्योंकि यह मुख्य लिसनर के अंदर एकीकृत (integrated) है।

// A. कमेंट लोड करना और प्रदर्शित करना
const loadComments = async () => {
    if (!commentsContainer) return;
    
    commentsContainer.innerHTML = 'लोड हो रहा है...';
    
    const commentsRef = collection(db, 'comments');
    const q = query(
        commentsRef, 
        where('postId', '==', CURRENT_POST_ID), 
        orderBy('createdAt', 'desc') 
    );
    
    const snapshot = await getDocs(q);
    
    if (snapshot.empty) {
        commentsContainer.innerHTML = '<p>कोई टिप्पणी नहीं मिली। पहली टिप्पणी करने वाले बनें!</p>';
        return;
    }

    let commentsHTML = '';
    snapshot.forEach(doc => {
        const data = doc.data();
        const date = data.createdAt ? data.createdAt.toDate().toLocaleDateString('hi-IN') : 'हाल ही में';
        
        commentsHTML += `
            <div class="comment-item">
                <p class="comment-author"><strong>${data.userName || 'अज्ञात यूज़र'}</strong> • ${date}</p>
                <p class="comment-text">${data.content}</p>
            </div>
        `;
    });
    
    commentsContainer.innerHTML = commentsHTML;
};


// B. कमेंट सबमिट करना
if (commentForm) {
    commentForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        if (!currentUser) {
            alert('टिप्पणी करने के लिए आपको लॉगिन करना होगा।');
            return;
        }

        const commentInput = document.getElementById('commentInput');
        const content = commentInput.value.trim();

        if (content.length > 0) {
            try {
                await addDoc(collection(db, 'comments'), {
                    postId: CURRENT_POST_ID,
                    userId: currentUser.uid,
                    // [FIX] यूज़र का displayName उपयोग करें
                    userName: currentUser.displayName || 'नया यूज़र', 
                    content: content,
                    createdAt: serverTimestamp() 
                });

                commentInput.value = ''; 
                // [FIX] alert के बजाय सफलता संदेश दिखाएँ
                authMessage.textContent = 'टिप्पणी सफलतापूर्वक सबमिट हुई!';
                authMessage.style.display = 'block';
                setTimeout(() => authMessage.style.display = 'none', 3000);
                
                loadComments(); 
                
            } catch (error) {
                console.error("कमेंट सबमिट करने में विफल:", error);
                alert("टिप्पणी सबमिट नहीं हो पाई।");
            }
        }
    });
}


// C. लाइक/वोटिंग लॉजिक
const loadLikesAndComments = async () => {
    loadComments();
    if (!likeCountSpan) return;

    // 1. कुल लाइक लोड करना
    try {
        const likesRef = collection(db, 'likes');
        const q = query(likesRef, where('postId', '==', CURRENT_POST_ID));
        const snapshot = await getDocs(q);
        
        const totalLikes = snapshot.docs.length;
        likeCountSpan.textContent = `${totalLikes} Likes`;

        // 2. यूज़र का लाइक स्टेटस चेक करना
        hasUserLiked = false;
        if (currentUser) {
            const userLike = snapshot.docs.find(doc => doc.data().userId === currentUser.uid);
            
            // [FIX] Like Status UI अपडेट करें
            if (userLike) {
                hasUserLiked = true;
                likeBtn.classList.add('liked'); 
                likeBtn.textContent = '✔️ Liked!';
            } else {
                 hasUserLiked = false; // यदि यूज़र लॉग इन है लेकिन लाइक नहीं किया है
                 likeBtn.classList.remove('liked');
                 likeBtn.textContent = '👍 लाइक';
            }
        } else {
             // [FIX] यूज़र लॉगआउट है तो 'Liked' स्थिति साफ़ करें
             likeBtn.classList.remove('liked');
             likeBtn.textContent = '👍 लाइक';
        }


    } catch (error) {
        console.error("लाइक लोड करने में विफल:", error);
        likeCountSpan.textContent = '0 Likes (त्रुटि)';
    }
};

// D. लाइक बटन पर क्लिक करें
if (likeBtn) {
    likeBtn.addEventListener('click', async () => {
        if (!currentUser) {
            alert('लाइक करने के लिए कृपया लॉगिन करें।');
            return;
        }

        const likesRef = collection(db, 'likes');
        
        if (hasUserLiked) {
            // unlike: यूज़र का मौजूदा लाइक हटाएँ
            try {
                const q = query(likesRef, where('postId', '==', CURRENT_POST_ID), where('userId', '==', currentUser.uid));
                const snapshot = await getDocs(q);
                
                if (!snapshot.empty) {
                    // [FIXED] deleteDoc का उपयोग
                    await deleteDoc(doc(db, 'likes', snapshot.docs[0].id)); 
                    // alert('Like हटा दिया गया।');
                }
            } catch (error) {
                 console.error("Unlike विफल:", error);
                 alert('Like हटाने में विफल रहा।');
            }

        } else {
            // like: नया लाइक जोड़ें
            try {
                await addDoc(likesRef, {
                    postId: CURRENT_POST_ID,
                    userId: currentUser.uid,
                    createdAt: serverTimestamp()
                });
                // alert('पोस्ट पसंद आया!');
            } catch (error) {
                console.error("Like विफल:", error);
                alert('Like जोड़ने में विफल रहा।');
            }
        }
        // UI और काउंट अपडेट करें
        loadLikesAndComments(); 
    });
}