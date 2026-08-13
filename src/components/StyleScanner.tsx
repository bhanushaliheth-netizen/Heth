import React, { useState, useRef, useEffect } from 'react';
import { useGoogleVerse } from '../context/GoogleVerseContext';
import { StyleProfile, FitOption, StyleOption, ColorOption } from '../types';
import {
  Camera,
  Upload,
  CheckCircle2,
  X,
  Sparkles,
  ShieldAlert,
  RotateCcw,
  Sliders,
  ArrowRight,
  Shirt,
  ScanLine,
} from 'lucide-react';

export const StyleScanner: React.FC = () => {
  const { activeModal, setActiveModal, styleProfile, updateStyleProfile, showToast } = useGoogleVerse();

  // Mode state: 'select' | 'privacy' | 'camera' | 'upload' | 'scanning' | 'results' | 'manual'
  const [mode, setMode] = useState<'select' | 'privacy' | 'camera' | 'upload' | 'scanning' | 'results' | 'manual'>('select');
  const [pendingMode, setPendingMode] = useState<'camera' | 'upload' | null>(null);

  // Upload/Captured Photo State
  const [photoUrl, setPhotoUrl] = useState<string | null>(styleProfile?.userImage || null);
  const [cameraStream, setCameraStream] = useState<MediaStream | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Scanning Animation Progress
  const [scanStep, setScanStep] = useState(0);
  const scanSteps = [
    '01 — Detecting outfit silhouette & structure',
    '02 — Analyzing color palette & tone contrast',
    '03 — Identifying apparel categories & textures',
    '04 — Matching tech-fashion style vectors',
    '05 — Building your personal GoogleVerse profile',
  ];

  // Editable Profile Form State
  const [fit, setFit] = useState<FitOption>(styleProfile?.fit || 'Relaxed');
  const [style, setStyle] = useState<StyleOption>(styleProfile?.style || 'Tech');
  const [colors, setColors] = useState<ColorOption>(styleProfile?.colors || 'Neutral');
  const [favorites, setFavorites] = useState<string[]>(
    styleProfile?.favoriteCategories || ['Hoodies', 'T-Shirts']
  );

  // Stop camera on unmount/close
  useEffect(() => {
    return () => {
      if (cameraStream) {
        cameraStream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [cameraStream]);

  if (activeModal !== 'scanner') return null;

  const startPrivacyCheck = (target: 'camera' | 'upload') => {
    setPendingMode(target);
    setMode('privacy');
  };

  const handlePrivacyAccept = async () => {
    if (pendingMode === 'camera') {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        setCameraStream(stream);
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
        setMode('camera');
      } catch (err) {
        showToast('Camera access unavailable. Switched to upload mode.');
        setMode('upload');
      }
    } else if (pendingMode === 'upload') {
      setMode('upload');
    }
  };

  const captureCameraPhoto = () => {
    if (videoRef.current) {
      const canvas = document.createElement('canvas');
      canvas.width = 640;
      canvas.height = 480;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(videoRef.current, 0, 0, 640, 480);
        const dataUrl = canvas.toDataURL('image/png');
        setPhotoUrl(dataUrl);

        // Stop stream
        if (cameraStream) {
          cameraStream.getTracks().forEach((track) => track.stop());
          setCameraStream(null);
        }

        startScanningSequence(dataUrl);
      }
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const url = reader.result as string;
        setPhotoUrl(url);
      };
      reader.readAsDataURL(file);
    }
  };

  const startScanningSequence = (imgUrl: string | null) => {
    setMode('scanning');
    setScanStep(0);

    let current = 0;
    const interval = setInterval(() => {
      current++;
      if (current < scanSteps.length) {
        setScanStep(current);
      } else {
        clearInterval(interval);
        completeScan(imgUrl);
      }
    }, 700);
  };

  const completeScan = (imgUrl: string | null) => {
    // Generate intelligent AI style profile
    const generatedProfile: StyleProfile = {
      fit,
      style,
      colors,
      favoriteCategories: favorites,
      styleMatch: 94,
      energy: 'Creative & Tech-Inspired',
      userImage: imgUrl || undefined,
      detectedColors: ['#0f172a', '#4285F4', '#f1f5f9'],
    };

    updateStyleProfile(generatedProfile);
    setMode('results');
  };

  const toggleFavorite = (cat: string) => {
    setFavorites((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  const saveManualPreferences = () => {
    const customProfile: StyleProfile = {
      fit,
      style,
      colors,
      favoriteCategories: favorites,
      styleMatch: 90,
      energy: 'Self-Curated Vibe',
      userImage: photoUrl || undefined,
    };
    updateStyleProfile(customProfile);
    showToast('Saved your GoogleVerse style profile!');
    setActiveModal(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden max-h-[90vh] flex flex-col">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100 bg-slate-50/50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-slate-900 text-white flex items-center justify-center font-bold">
              <ScanLine className="w-4 h-4 text-[#FBBC05]" />
            </div>
            <div>
              <h3 className="font-extrabold text-slate-900 text-base uppercase tracking-tight">
                AI STYLE SCANNER
              </h3>
              <p className="text-[11px] font-medium text-slate-500">
                Show us your look. We'll help you discover your GoogleVerse.
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              if (cameraStream) cameraStream.getTracks().forEach((t) => t.stop());
              setActiveModal(null);
            }}
            className="p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-200/50 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body Content */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">

          {/* MODE: Select Option */}
          {mode === 'select' && (
            <div className="space-y-6 text-center py-4">
              <div className="space-y-2">
                <h4 className="text-2xl font-black text-slate-900 uppercase">
                  SCAN YOUR STYLE.
                </h4>
                <p className="text-xs text-slate-500 max-w-md mx-auto">
                  Use your device camera or upload a full-body photo. Our AI vision scanner creates your personalized GoogleVerse style profile in seconds.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-lg mx-auto pt-2">
                <button
                  onClick={() => startPrivacyCheck('camera')}
                  className="flex flex-col items-center justify-center p-6 bg-slate-50 hover:bg-slate-900 hover:text-white rounded-2xl border border-slate-200 transition-all group shadow-sm"
                >
                  <div className="w-12 h-12 rounded-2xl bg-slate-200 group-hover:bg-slate-800 text-slate-800 group-hover:text-white flex items-center justify-center mb-3">
                    <Camera className="w-6 h-6 text-[#4285F4]" />
                  </div>
                  <span className="font-extrabold text-sm uppercase tracking-wide">📷 USE CAMERA</span>
                  <span className="text-[11px] opacity-75 mt-1">Live outfit scan</span>
                </button>

                <button
                  onClick={() => startPrivacyCheck('upload')}
                  className="flex flex-col items-center justify-center p-6 bg-slate-50 hover:bg-slate-900 hover:text-white rounded-2xl border border-slate-200 transition-all group shadow-sm"
                >
                  <div className="w-12 h-12 rounded-2xl bg-slate-200 group-hover:bg-slate-800 text-slate-800 group-hover:text-white flex items-center justify-center mb-3">
                    <Upload className="w-6 h-6 text-[#EA4335]" />
                  </div>
                  <span className="font-extrabold text-sm uppercase tracking-wide">🖼️ UPLOAD PHOTO</span>
                  <span className="text-[11px] opacity-75 mt-1">JPG or PNG image</span>
                </button>
              </div>

              <div className="pt-4 border-t border-slate-100">
                <button
                  onClick={() => setMode('manual')}
                  className="text-xs font-bold text-slate-600 hover:text-slate-900 underline underline-offset-4 uppercase tracking-wider"
                >
                  CONTINUE WITHOUT SCAN →
                </button>
              </div>
            </div>
          )}

          {/* MODE: Privacy Message */}
          {mode === 'privacy' && (
            <div className="space-y-6 text-center py-4 bg-amber-50/50 p-6 rounded-2xl border border-amber-200">
              <div className="w-12 h-12 bg-amber-100 text-amber-800 rounded-2xl flex items-center justify-center mx-auto">
                <ShieldAlert className="w-6 h-6" />
              </div>

              <div className="space-y-2">
                <h4 className="text-lg font-extrabold text-slate-900 uppercase">
                  YOUR IMAGE, YOUR CONTROL.
                </h4>
                <p className="text-xs text-slate-600 max-w-md mx-auto leading-relaxed">
                  Your photo is used only for this demo experience to create a style profile and enable virtual try-on. Do not upload sensitive or private images.
                </p>
              </div>

              <div className="flex items-center justify-center gap-3 pt-2">
                <button
                  onClick={() => setMode('select')}
                  className="px-5 py-2.5 bg-white hover:bg-slate-100 text-slate-700 text-xs font-bold rounded-full border border-slate-300"
                >
                  CANCEL
                </button>
                <button
                  onClick={handlePrivacyAccept}
                  className="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-full shadow-sm"
                >
                  CONTINUE
                </button>
              </div>
            </div>
          )}

          {/* MODE: Camera Stream */}
          {mode === 'camera' && (
            <div className="space-y-4 text-center">
              <div className="space-y-1">
                <h4 className="text-base font-extrabold text-slate-900 uppercase">
                  STEP INTO THE FRAME
                </h4>
                <p className="text-xs text-slate-500">
                  Stand at a comfortable distance and make sure your full outfit is visible.
                </p>
              </div>

              {/* Video Stream Box with Silhouette Overlay */}
              <div className="relative w-full max-w-md h-72 mx-auto rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 flex items-center justify-center">
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className="w-full h-full object-cover"
                />

                {/* Silhouette Overlay Guide */}
                <div className="absolute inset-4 border-2 border-dashed border-[#4285F4]/60 rounded-xl pointer-events-none flex flex-col items-center justify-center">
                  <div className="w-24 h-36 border border-[#4285F4] rounded-full opacity-30 mb-2" />
                  <span className="text-[10px] font-bold text-white/80 bg-slate-900/80 px-2 py-0.5 rounded-full">
                    ALIGN OUTFIT
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-center gap-3 pt-2">
                <button
                  onClick={() => {
                    if (cameraStream) cameraStream.getTracks().forEach((t) => t.stop());
                    setMode('upload');
                  }}
                  className="px-4 py-2 bg-slate-100 text-slate-700 text-xs font-bold rounded-full"
                >
                  UPLOAD A PHOTO INSTEAD
                </button>

                <button
                  onClick={captureCameraPhoto}
                  className="px-6 py-2.5 bg-[#4285F4] hover:bg-blue-600 text-white text-xs font-bold rounded-full shadow-md flex items-center gap-2"
                >
                  <Camera className="w-4 h-4" />
                  <span>CAPTURE STYLE</span>
                </button>
              </div>
            </div>
          )}

          {/* MODE: Upload Photo */}
          {mode === 'upload' && (
            <div className="space-y-4 text-center">
              {!photoUrl ? (
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full h-64 border-2 border-dashed border-slate-300 hover:border-slate-800 rounded-2xl bg-slate-50 hover:bg-slate-100/80 flex flex-col items-center justify-center p-6 cursor-pointer transition-colors"
                >
                  <Upload className="w-10 h-10 text-slate-400 mb-3" />
                  <h4 className="text-sm font-extrabold text-slate-900 uppercase">
                    DROP YOUR PHOTO HERE
                  </h4>
                  <p className="text-xs text-slate-500 mt-1">or BROWSE FILES (JPG, JPEG, PNG)</p>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/jpeg,image/jpg,image/png"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="relative w-48 h-64 mx-auto rounded-2xl overflow-hidden border border-slate-300 shadow-md">
                    <img src={photoUrl} alt="Outfit preview" className="w-full h-full object-cover" />
                  </div>

                  <div className="flex items-center justify-center gap-3">
                    <button
                      onClick={() => setPhotoUrl(null)}
                      className="px-4 py-2 bg-slate-100 text-slate-700 text-xs font-bold rounded-full"
                    >
                      CHANGE PHOTO
                    </button>
                    <button
                      onClick={() => startScanningSequence(photoUrl)}
                      className="px-6 py-2.5 bg-slate-900 text-white text-xs font-bold rounded-full shadow-md flex items-center gap-2"
                    >
                      <Sparkles className="w-4 h-4 text-[#FBBC05]" />
                      <span>USE THIS PHOTO</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* MODE: Scanning Sequence Animation */}
          {mode === 'scanning' && (
            <div className="space-y-6 text-center py-8">
              <div className="relative w-20 h-20 mx-auto flex items-center justify-center">
                <div className="absolute inset-0 rounded-full border-4 border-slate-200 border-t-[#4285F4] animate-spin" />
                <Sparkles className="w-8 h-8 text-[#FBBC05] animate-pulse" />
              </div>

              <div className="space-y-2">
                <h4 className="text-xl font-black text-slate-900 uppercase tracking-tight">
                  SCANNING YOUR STYLE...
                </h4>
                <p className="text-xs font-semibold text-[#4285F4] tracking-wide">
                  {scanSteps[scanStep]}
                </p>
              </div>

              {/* Step Indicators */}
              <div className="flex justify-center gap-2 pt-2">
                {scanSteps.map((_, idx) => (
                  <div
                    key={idx}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      idx <= scanStep ? 'w-8 bg-[#4285F4]' : 'w-2 bg-slate-200'
                    }`}
                  />
                ))}
              </div>
            </div>
          )}

          {/* MODE: Results & Profile Card */}
          {mode === 'results' && (
            <div className="space-y-6 text-center">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full text-xs font-bold border border-emerald-200">
                <CheckCircle2 className="w-4 h-4" />
                <span>STYLE PROFILE READY.</span>
              </div>

              <div className="bg-slate-900 text-white p-6 rounded-2xl text-left space-y-4 shadow-xl relative overflow-hidden">
                {/* Accent particles */}
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#4285F4]/20 rounded-full blur-2xl" />

                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div>
                    <span className="text-[10px] font-bold tracking-widest text-slate-400 uppercase">
                      YOUR GOOGLEVERSE STYLE
                    </span>
                    <h4 className="text-lg font-black text-white uppercase">{style} TECH</h4>
                  </div>
                  <div className="text-right">
                    <span className="text-2xl font-black text-[#FBBC05]">94%</span>
                    <span className="text-[10px] block font-bold text-slate-400">STYLE MATCH</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase block font-bold">FIT PREFERENCE</span>
                    <span className="font-semibold text-slate-200">{fit}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase block font-bold">COLOR VIBE</span>
                    <span className="font-semibold text-slate-200">{colors}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase block font-bold">STYLE ENERGY</span>
                    <span className="font-semibold text-slate-200">Creative & Tech-Inspired</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase block font-bold">FAVORITES</span>
                    <span className="font-semibold text-slate-200">{favorites.join(' + ')}</span>
                  </div>
                </div>

                <p className="text-xs text-slate-300 italic pt-1">
                  “You're a strong match for our Creator & Developer collection.”
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  onClick={() => setMode('manual')}
                  className="w-full sm:w-auto px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-full border border-slate-200 flex items-center justify-center gap-2"
                >
                  <Sliders className="w-4 h-4" />
                  <span>EDIT PREFERENCES</span>
                </button>

                <button
                  onClick={() => setActiveModal(null)}
                  className="w-full sm:w-auto px-7 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-full shadow-md flex items-center justify-center gap-2"
                >
                  <span>EXPLORE MY MERCH</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* MODE: Manual Preferences Editing */}
          {mode === 'manual' && (
            <div className="space-y-5 text-left">
              <div className="text-center space-y-1">
                <h4 className="text-lg font-black text-slate-900 uppercase">
                  MANUAL STYLE PREFERENCES
                </h4>
                <p className="text-xs text-slate-500">
                  Customize your fit, aesthetic, and color vibes directly.
                </p>
              </div>

              {/* FIT */}
              <div className="space-y-2">
                <label className="text-xs font-extrabold text-slate-900 uppercase tracking-wider block">
                  FIT PREFERENCE
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {(['Relaxed', 'Regular', 'Oversized', 'Slim'] as FitOption[]).map((f) => (
                    <button
                      key={f}
                      onClick={() => setFit(f)}
                      className={`py-2 rounded-xl text-xs font-semibold border transition-all ${
                        fit === f
                          ? 'bg-slate-900 text-white border-slate-900'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {f}
                    </button>
                  ))}
                </div>
              </div>

              {/* STYLE */}
              <div className="space-y-2">
                <label className="text-xs font-extrabold text-slate-900 uppercase tracking-wider block">
                  STYLE AESTHETIC
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(['Minimal', 'Street', 'Tech', 'Playful', 'Futuristic', 'Casual'] as StyleOption[]).map((s) => (
                    <button
                      key={s}
                      onClick={() => setStyle(s)}
                      className={`py-2 rounded-xl text-xs font-semibold border transition-all ${
                        style === s
                          ? 'bg-slate-900 text-white border-slate-900'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* COLORS */}
              <div className="space-y-2">
                <label className="text-xs font-extrabold text-slate-900 uppercase tracking-wider block">
                  COLOR VIBE
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(['Neutral', 'Blue', 'Red', 'Yellow', 'Green', 'Mixed'] as ColorOption[]).map((c) => (
                    <button
                      key={c}
                      onClick={() => setColors(c)}
                      className={`py-2 rounded-xl text-xs font-semibold border transition-all ${
                        colors === c
                          ? 'bg-slate-900 text-white border-slate-900'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>

              {/* FAVORITES */}
              <div className="space-y-2">
                <label className="text-xs font-extrabold text-slate-900 uppercase tracking-wider block">
                  FAVORITE CATEGORIES
                </label>
                <div className="flex flex-wrap gap-2">
                  {['T-Shirts', 'Hoodies', 'Caps', 'Bags', 'Accessories'].map((cat) => (
                    <button
                      key={cat}
                      onClick={() => toggleFavorite(cat)}
                      className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                        favorites.includes(cat)
                          ? 'bg-[#4285F4] text-white border-[#4285F4]'
                          : 'bg-slate-50 text-slate-700 border-slate-200'
                      }`}
                    >
                      {cat} {favorites.includes(cat) ? '✓' : '+'}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-4 flex justify-end gap-3">
                <button
                  onClick={() => setMode('select')}
                  className="px-4 py-2 bg-slate-100 text-slate-700 text-xs font-bold rounded-full"
                >
                  BACK
                </button>
                <button
                  onClick={saveManualPreferences}
                  className="px-6 py-2.5 bg-slate-900 text-white text-xs font-bold rounded-full shadow-md"
                >
                  SAVE MY STYLE
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
