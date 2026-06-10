import { 
    signInWithEmailAndPassword, 
    createUserWithEmailAndPassword, 
    signInWithPopup, 
    updateProfile,
    onAuthStateChanged
} from "firebase/auth";
import { auth, googleProvider } from "./lib/firebase";

// Redirect if already logged in
onAuthStateChanged(auth, (user) => {
    if (user) {
        const target = localStorage.getItem('auth_redirect') || "/senior/dashboard.html";
        localStorage.removeItem('auth_redirect');
        window.location.href = target;
    }
});

// Customize auth page UI for Freshers if they were redirected from the fresher portal
document.addEventListener("DOMContentLoaded", () => {
    const redirect = localStorage.getItem('auth_redirect');
    if (redirect && redirect.includes('/fresher')) {
        const tagline = document.querySelector('.tagline');
        const featureList = document.querySelector('.feature-list');
        const floatingIcons = document.querySelector('.floating-icons');

        if (tagline) tagline.textContent = "Your LPU Induction Hub";
        if (featureList) {
            featureList.innerHTML = `
                <li class="feature-item">
                    <div class="feature-icon" style="display:flex;align-items:center;justify-content:center;">✓</div>
                    <span>LPU 2026 Orientation Guides & Roadmaps</span>
                </li>
                <li class="feature-item">
                    <div class="feature-icon" style="display:flex;align-items:center;justify-content:center;">🗺️</div>
                    <span>Interactive reporting location map</span>
                </li>
                <li class="feature-item">
                    <div class="feature-icon" style="display:flex;align-items:center;justify-content:center;">📋</div>
                    <span>Pre-induction checklist & docs manager</span>
                </li>
            `;
        }
        if (floatingIcons) {
            floatingIcons.innerHTML = `
                <div class="float-icon fi-1">🎒</div>
                <div class="float-icon fi-2">🏫</div>
                <div class="float-icon fi-3">🗺️</div>
            `;
        }
    }
});


const siForm = document.getElementById('signInForm') as HTMLFormElement;
const suForm = document.getElementById('signUpForm') as HTMLFormElement;

// Sign In
siForm?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = (document.getElementById('si-email') as HTMLInputElement).value;
    const password = (document.getElementById('si-password') as HTMLInputElement).value;
    const btn = document.getElementById('si-btn') as HTMLButtonElement;

    try {
        btn.textContent = "Checking...";
        btn.disabled = true;
        await signInWithEmailAndPassword(auth, email, password);
        // onAuthStateChanged will handle redirect
    } catch (error: any) {
        console.error(error);
        alert(error.message);
        btn.textContent = "Sign In ⚡";
        btn.disabled = false;
    }
});

// Sign Up
suForm?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = (document.getElementById('su-email') as HTMLInputElement).value;
    const password = (document.getElementById('su-password') as HTMLInputElement).value;
    const name = (document.getElementById('su-name') as HTMLInputElement).value;
    const btn = document.getElementById('su-btn') as HTMLButtonElement;

    try {
        btn.textContent = "Creating...";
        btn.disabled = true;
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(userCredential.user, { displayName: name });
        
        // Show success overlay
        document.getElementById('successOverlay')?.classList.add('active');
        setTimeout(() => {
            const target = localStorage.getItem('auth_redirect') || "/senior/dashboard.html";
            localStorage.removeItem('auth_redirect');
            window.location.href = target;
        }, 2000);
    } catch (error: any) {
        console.error(error);
        alert(error.message);
        btn.textContent = "Create My Account 🎓";
        btn.disabled = false;
    }
});

// Google Sign In
(window as any).googleSignIn = async function() {
    try {
        await signInWithPopup(auth, googleProvider);
    } catch (error: any) {
        console.error(error);
        alert(error.message);
    }
};
