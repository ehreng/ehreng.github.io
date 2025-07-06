/*
  script.js
  Nephelis Industries - Project AETHER
  Functionality for animations, navigation, and interactive elements.
*/

document.addEventListener('DOMContentLoaded', () => {
    // --- Intersection Observer for animations ---
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('h2, .timeline-event, .tech-item, .impact-item').forEach(el => observer.observe(el));

    // --- Header and Navigation Logic ---
    const header = document.querySelector('header');
    const navLinks = document.querySelectorAll('nav a');
    const sections = document.querySelectorAll('main section');
    
    // ... (All other JavaScript logic from the original <script> tag goes here) ...

    // --- Set current year in footer ---
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
});