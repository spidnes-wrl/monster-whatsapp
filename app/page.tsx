'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SignupForm from '@/components/SignupForm';

export default function Home() {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-monster-bg">
      <Header />
      
      <main className="flex-1 flex items-center justify-center px-4 py-20">
        <div className="w-full max-w-6xl">
          {/* Hero Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
            {/* Left: Text */}
            <div>
              <p className="text-monster-text-secondary text-sm font-mono uppercase tracking-wider mb-4">
                un numéro. un assistant. un tri.
              </p>
              <h1 className="text-5xl md:text-6xl font-bold font-display leading-tight mb-6">
                Il répond à ta place — seulement quand ça compte.
              </h1>
              <p className="text-lg text-monster-text-secondary mb-8 leading-relaxed">
                Relie ton numéro WhatsApp, Monster répond aux questions produits/disponibilités/contact via des commandes, et laisse tes messages perso tranquilles.
              </p>
              <button
                onClick={() => setShowForm(true)}
                className="btn-primary text-lg"
              >
                Créer mon assistant
              </button>
            </div>

            {/* Right: Visual */}
            <div className="flex justify-center md:justify-end">
              <div className="space-y-3 w-64">
                {/* Message bubbles visualization */}
                <div className="bg-monster-card border border-monster-border rounded-monster p-4 text-sm">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-2 h-2 rounded-full bg-monster-accent"></div>
                    <span className="font-mono text-xs font-bold text-monster-accent">PRODUIT</span>
                  </div>
                  <p>T-Shirt Bleu - 25€</p>
                </div>
                <div className="bg-monster-card border border-monster-border rounded-monster p-4 text-sm">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-2 h-2 rounded-full bg-monster-accent"></div>
                    <span className="font-mono text-xs font-bold text-monster-accent">.WHO</span>
                  </div>
                  <p>Jean Dupont @jeandupont</p>
                </div>
                <div className="bg-monster-card border border-monster-border rounded-monster p-4 text-sm opacity-40">
                  <p className="text-monster-text-secondary">Salut, ça va? Comment tu vas?</p>
                </div>
                <div className="bg-monster-card border border-monster-border rounded-monster p-4 text-sm opacity-40">
                  <p className="text-monster-text-secondary">Message personnel ignoré...</p>
                </div>
              </div>
            </div>
          </div>

          {/* Form Section */}
          {showForm && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
              <div className="bg-monster-card border border-monster-border rounded-monster max-w-2xl w-full">
                <div className="flex justify-between items-center p-6 border-b border-monster-border">
                  <h2 className="text-2xl font-display font-bold">Crée ton assistant Monster</h2>
                  <button
                    onClick={() => setShowForm(false)}
                    className="text-monster-text-secondary hover:text-monster-text"
                  >
                    ✕
                  </button>
                </div>
                <div className="p-6">
                  <SignupForm onSuccess={() => setShowForm(false)} />
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
