// src/app/admin/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { Wish } from '@/types/birthday';
import { ShieldCheck, Check, X, RefreshCw, KeyRound, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function AdminPage() {
  const [adminKey, setAdminKey] = useState('bundanovi-admin-secret-2026');
  const [isLogged, setIsLogged] = useState(false);
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all');
  const [actionMsg, setActionMsg] = useState<string | null>(null);

  const fetchAdminWishes = async () => {
    setLoading(true);
    setActionMsg(null);
    try {
      const res = await fetch(`/api/admin/wishes?key=${encodeURIComponent(adminKey)}`);
      const data = await res.json();
      if (res.ok && data.success) {
        setWishes(data.data || []);
        setIsLogged(true);
      } else {
        setActionMsg('Kunci admin salah atau tidak valid.');
        setIsLogged(false);
      }
    } catch (err) {
      setActionMsg('Gagal terhubung ke API admin.');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (id: string, newStatus: 'approved' | 'rejected') => {
    try {
      const res = await fetch(`/api/admin/wishes/${id}?key=${encodeURIComponent(adminKey)}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setWishes((prev) =>
          prev.map((w) => (w.id === id ? { ...w, status: newStatus } : w))
        );
        setActionMsg(`Pesan berhasil diubah statusnya menjadi ${newStatus.toUpperCase()}!`);
      } else {
        setActionMsg(data.error || 'Gagal mengubah status.');
      }
    } catch (err) {
      setActionMsg('Kesalahan jaringan saat update status.');
    }
  };

  const filteredWishes = wishes.filter((w) => {
    if (filter === 'all') return true;
    return w.status === filter;
  });

  return (
    <div className="min-h-screen bg-[#FFFDF7] p-4 sm:p-8 font-sans">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Top Navigation */}
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-mono font-bold text-[#8C65FF] hover:underline"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali ke Pesta Ulang Tahun</span>
          </Link>
          <span className="retro-badge bg-[#1E1233] text-[#FFDA35] font-mono">
            PANEL MODERASI WALL OF WISHES
          </span>
        </div>

        {/* Admin Login / Auth Box */}
        {!isLogged ? (
          <div className="retro-window max-w-md mx-auto p-6 bg-white space-y-4">
            <div className="flex items-center gap-2 text-[#8C65FF] font-black">
              <KeyRound className="w-5 h-5" />
              <h2 className="text-lg">Autentikasi Pengelola</h2>
            </div>
            <p className="text-xs text-gray-600 font-semibold">
              Masukkan kunci admin untuk memoderasi ucapan yang masuk sebelum dipajang ke publik.
            </p>
            <input
              type="password"
              value={adminKey}
              onChange={(e) => setAdminKey(e.target.value)}
              placeholder="Masukkan Admin Secret Key"
              className="w-full px-3.5 py-2 rounded-xl border-2 border-[#1E1233] text-sm font-mono"
            />
            {actionMsg && <p className="text-xs font-bold text-red-600">{actionMsg}</p>}
            <button
              onClick={fetchAdminWishes}
              disabled={loading}
              className="w-full retro-btn retro-btn-yellow text-xs cursor-pointer"
            >
              {loading ? 'Memeriksa Kunci...' : 'Masuk Panel Moderasi'}
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Header Toolbar */}
            <div className="flex flex-wrap items-center justify-between gap-4 bg-white p-5 rounded-2xl border-3 border-[#1E1233] shadow-[4px_4px_0px_#1E1233]">
              <div>
                <h1 className="text-xl font-black text-[#1E1233]">
                  Daftar Ucapan Pengunjung & Seed
                </h1>
                <p className="text-xs text-[#554070] font-semibold">
                  Total ucapan: {wishes.length} pesan
                </p>
              </div>

              {/* Status Filters */}
              <div className="flex items-center gap-2">
                {(['all', 'pending', 'approved', 'rejected'] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setFilter(tab)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold capitalize transition-all border-2 border-[#1E1233] cursor-pointer ${
                      filter === tab
                        ? 'bg-[#FFDA35] text-[#1E1233] shadow-[2px_2px_0px_#1E1233]'
                        : 'bg-white text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
                <button
                  onClick={fetchAdminWishes}
                  className="p-1.5 bg-[#8C65FF] text-white rounded-lg border-2 border-[#1E1233] cursor-pointer"
                  title="Refresh data"
                >
                  <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                </button>
              </div>
            </div>

            {actionMsg && (
              <div className="p-3 bg-[#EFF6FF] border-2 border-[#3B82F6] rounded-xl text-xs font-bold text-[#1D4ED8]">
                {actionMsg}
              </div>
            )}

            {/* Wishes Table / Card List */}
            <div className="space-y-3">
              {filteredWishes.length === 0 ? (
                <div className="p-8 text-center text-xs font-mono text-gray-500 bg-white rounded-xl border-2 border-dashed border-gray-300">
                  Tidak ada pesan dalam kategori ini.
                </div>
              ) : (
                filteredWishes.map((wish) => (
                  <div
                    key={wish.id}
                    className="bg-white p-4 sm:p-5 rounded-xl border-2 border-[#1E1233] shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                  >
                    <div className="space-y-1 max-w-2xl">
                      <div className="flex items-center gap-2">
                        <span className="font-black text-sm text-[#1E1233]">
                          {wish.display_name}
                        </span>
                        <span
                          className={`text-[10px] font-mono px-2 py-0.5 rounded-full font-bold uppercase ${
                            wish.status === 'approved'
                              ? 'bg-green-100 text-green-800'
                              : wish.status === 'pending'
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-red-100 text-red-800'
                          }`}
                        >
                          {wish.status}
                        </span>
                        <span className="text-[10px] text-gray-400 font-mono">
                          {new Date(wish.created_at).toLocaleString('id-ID')}
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-[#3E2F54] font-medium leading-relaxed">
                        “{wish.message}”
                      </p>
                    </div>

                    {/* Action buttons */}
                    <div className="flex items-center gap-2 shrink-0">
                      {wish.status !== 'approved' && (
                        <button
                          onClick={() => handleUpdateStatus(wish.id, 'approved')}
                          className="px-3 py-1.5 rounded-lg bg-[#22C55E] hover:bg-[#16A34A] text-white text-xs font-bold flex items-center gap-1 border-2 border-[#1E1233] cursor-pointer shadow-[2px_2px_0px_#1E1233]"
                        >
                          <Check className="w-3.5 h-3.5" />
                          <span>Setujui</span>
                        </button>
                      )}
                      {wish.status !== 'rejected' && (
                        <button
                          onClick={() => handleUpdateStatus(wish.id, 'rejected')}
                          className="px-3 py-1.5 rounded-lg bg-[#EF4444] hover:bg-[#DC2626] text-white text-xs font-bold flex items-center gap-1 border-2 border-[#1E1233] cursor-pointer shadow-[2px_2px_0px_#1E1233]"
                        >
                          <X className="w-3.5 h-3.5" />
                          <span>Tolak</span>
                        </button>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
