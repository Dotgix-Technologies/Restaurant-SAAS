import React from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div
            className="bg-white">
            <Navbar />
            <main className="p-0">
                {children}
            </main>
            <Footer />
        </div>
    );
}
