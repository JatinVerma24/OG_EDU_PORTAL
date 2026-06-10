import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./lib/firebase";

onAuthStateChanged(auth, (user) => {
    if (user) {
        // Update CTA buttons to "Go to Dashboard"
        const ctaBtns = document.querySelectorAll('.nav-actions a, .hero-actions a, .cta-banner a, .drawer-footer a');
        ctaBtns.forEach(btn => {
            if ((btn as HTMLAnchorElement).href.includes('auth.html')) {
                if (btn.classList.contains('btn-filled')) {
                    btn.textContent = "Go to Dashboard ⚡";
                } else {
                    btn.textContent = "Dashboard";
                }
                (btn as HTMLAnchorElement).href = "/senior/dashboard.html";
            }
        });

        // Hide "Sign In" link if it exists separately and user is logged in
        const signInBtns = document.querySelectorAll('.btn-ghost');
        signInBtns.forEach(btn => {
            if ((btn as HTMLAnchorElement).href.includes('auth.html')) {
                (btn as HTMLElement).style.display = 'none';
            }
        });
    }
});
