import React from 'react';

// REVIEW: Indentation in this file uses 4 spaces while every other component uses 2 spaces. Pick one across the codebase (or add Prettier/ESLint config to enforce it).
function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="footer">
            <p>© {currentYear} All rights reserved by MCM.</p>
        </footer>
    );
}

export default Footer;