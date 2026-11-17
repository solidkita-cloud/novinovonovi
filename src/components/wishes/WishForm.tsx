// src/components/wishes/WishForm.tsx
'use client';

import React, { useState } from 'react';
import { Send, Sparkles, CheckCircle2, AlertCircle } from 'lucide-react';
import confetti from 'canvas-confetti';

interface WishFormProps {
  onWishSubmitted?: () => void;
}

export const WishForm: React.FC<WishFormProps> = ({ onWishSubmitted }) => {
  const [displayName, setDisplayName] = useState('');
  const [message, setMessage] = useState('');
  const [honeypot, setHoneypot] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMsg(null);
    setErrorMsg(null);

    if (!displayName.trim() || displayName.trim().length < 2) {
      setErrorMsg('Silakan tulis nama panggilanmu (minimal 2 karakter).');
      return;
    }

    if (!message.trim() || message.trim().length < 5) {
      setErrorMsg('Pesan ucapan minimal 5 karakter ya!');
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch('/api/wishes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          display_name: displayName,
          message: message,
          honeypot: honeypot,
        }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setSuccessMsg(
          data.message ||
            'YAY! Pesanmu sudah dikirim ke arsip kebahagiaan Bunda Novi! Floppy akan memastikan pesan ini diperiksa sebelum dipajang!'
        );
        setDisplayName('');
        setMessage('');
        confetti({
          particleCount: 60,
          spread: 60,
          origin: { y: 0.7 },
          colors: ['#FF4FA3', '#FFDA35', '#B7F45A'],
        });
        if (onWishSubmitted) onWishSubmitted();
      } else {
        setErrorMsg(data.error || 'Gagal mengirim ucapan. Silakan coba lagi.');
      }
    } catch (err) {
      setErrorMsg('Terjadi kesalahan koneksi. Mohon coba lagi.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-white border-3 border-[#1E1233] rounded-2xl p-6 sm:p-8 shadow-[6px_6px_0px_#FFDA35]">
      <div className="space-y-1 mb-6 text-center sm:text-left">
        <h3 className="text-xl sm:text-2xl font-black text-[#1E1233]">
          Kirim Ucapanmu Untuk Bunda Novi 💌
        </h3>
        <p className="text-xs sm:text-sm text-[#554070] font-semibold">
          Tuliskan doa, kesan, atau pesan hangatmu. Floppy akan menyimpannya rapi di Wall of Wishes!
        </p>
      </div>

      {successMsg ? (
        <div className="p-6 bg-[#F0FDF4] border-3 border-[#16A34A] rounded-2xl shadow-[4px_4px_0px_#16A34A] space-y-3 text-center">
          <div className="inline-flex p-3 bg-[#DCFCE7] text-[#16A34A] rounded-full">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h4 className="text-lg font-black text-[#166534]">Pesan Berhasil Terkirim!</h4>
          <p className="text-xs sm:text-sm font-semibold text-[#15803D] leading-relaxed max-w-md mx-auto">
            {successMsg}
          </p>
          <button
            onClick={() => setSuccessMsg(null)}
            className="retro-btn retro-btn-yellow text-xs mt-2 cursor-pointer"
          >
            Kirim Ucapan Lainnya
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Honeypot field for bot protection */}
          <div style={{ display: 'none', opacity: 0, position: 'absolute', left: '-9999px' }}>
            <label htmlFor="website_url_hp">Leave empty</label>
            <input
              type="text"
              id="website_url_hp"
              name="website_url_hp"
              value={honeypot}
              onChange={(e) => setHoneypot(e.target.value)}
              tabIndex={-1}
              autoComplete="off"
            />
          </div>

          {errorMsg && (
            <div className="p-3 bg-[#FEF2F2] border-2 border-[#EF4444] rounded-xl text-xs font-bold text-[#B91C1C] flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Display Name Input */}
          <div className="space-y-1">
            <label className="block text-xs font-black text-[#1E1233] font-mono uppercase tracking-wider">
              Nama Panggilan Kamu: <span className="text-[#FF4FA3]">*</span>
            </label>
            <input
              type="text"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              maxLength={40}
              placeholder="Contoh: Budi Divisi IT / Sobat Es Kopi"
              className="w-full px-4 py-2.5 rounded-xl border-2 border-[#1E1233] bg-[#FFFDF9] text-[#1E1233] font-semibold text-sm focus:outline-none focus:ring-2 focus:ring-[#8C65FF] shadow-[2px_2px_0px_#1E1233]"
              required
            />
            <p className="text-[10px] text-right text-gray-500 font-mono">
              {displayName.length}/40 karakter
            </p>
          </div>

          {/* Message Input */}
          <div className="space-y-1">
            <label className="block text-xs font-black text-[#1E1233] font-mono uppercase tracking-wider">
              Pesan & Doa Ucapan: <span className="text-[#FF4FA3]">*</span>
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              maxLength={500}
              rows={3}
              placeholder="Tuliskan ucapan tulus, doa, atau candaan hangat untuk Bunda Novi di sini..."
              className="w-full px-4 py-2.5 rounded-xl border-2 border-[#1E1233] bg-[#FFFDF9] text-[#1E1233] font-semibold text-sm focus:outline-none focus:ring-2 focus:ring-[#8C65FF] shadow-[2px_2px_0px_#1E1233]"
              required
            />
            <p className="text-[10px] text-right text-gray-500 font-mono">
              {message.length}/500 karakter
            </p>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={submitting}
            className="w-full retro-btn retro-btn-pink text-sm sm:text-base py-3 cursor-pointer"
          >
            {submitting ? (
              <span>Mengirim Pesan...</span>
            ) : (
              <>
                <Send className="w-4 h-4" />
                <span>SEND TO BUNDA NOVI! 💌</span>
              </>
            )}
          </button>
        </form>
      )}
    </div>
  );
};
