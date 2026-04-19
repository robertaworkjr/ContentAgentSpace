import React, { useState, useCallback, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, ChevronLeft, Video, Download, Settings, Zap, Layers, Cpu, Wind, Flame, Sparkles, Flower, Clock, AlertTriangle, Heart } from 'lucide-react';
import { View, TOOLS, SimulationTool } from '../particle-world/types';
import { EmberSimulation } from '../particle-world/components/EmberSimulation';
import { SakuraSimulation } from '../particle-world/components/SakuraSimulation';
import { RoseSimulation } from '../particle-world/components/RoseSimulation';
import { InfernoSimulation } from '../particle-world/components/InfernoSimulation';
import { BokehSimulation } from '../particle-world/components/BokehSimulation';
import { NexusSimulation } from '../particle-world/components/NexusSimulation';

export default function ParticleWorld() {
  const [view, setView] = useState<View>('welcome');
  const [activeTool, setActiveTool] = useState<SimulationTool | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(15);
  const [recordedBlob, setRecordedBlob] = useState<Blob | null>(null);
  const [showDownload, setShowDownload] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);

  const [trialTimeLeft, setTrialTimeLeft] = useState(30);
  const [isTrialExpired, setIsTrialExpired] = useState(false);

  const [emberConfig, setEmberConfig] = useState({ heat: 1.2, density: 1800, chaos: 0.6, glow: 12, cooling: 0.8, wind: 0.5 });
  const [sakuraConfig, setSakuraConfig] = useState({ gravity: 1.0, density: 1200, chaos: 0.8, size: 1.0, flutter: 1.0, wind: 1.5 });
  const [roseConfig, setRoseConfig] = useState({ gravity: 1.0, density: 1200, chaos: 0.8, size: 1.0, flutter: 1.0, wind: 1.5 });
  const [infernoConfig, setInfernoConfig] = useState({ heat: 1.5, density: 1500, chaos: 1.0, size: 1.2, burn: 1.0, wind: 0.0 });
  const [bokehConfig, setBokehConfig] = useState({ density: 40, size: 1.0, blur: 1.0, chaos: 0.5, wind: 0.2 });
  const [nexusConfig, setNexusConfig] = useState({ density: 60, chaos: 0.8, size: 1.0, wind: 0.1 });

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const timerIntervalRef = useRef<number | null>(null);
  const trialIntervalRef = useRef<number | null>(null);

  const handleCanvasReady = useCallback((canvas: HTMLCanvasElement) => {
    canvasRef.current = canvas;
  }, []);

  useEffect(() => {
    if (view === 'simulator' && !isSubscribed && !isTrialExpired) {
      trialIntervalRef.current = window.setInterval(() => {
        setTrialTimeLeft((prev) => {
          if (prev <= 1) {
            setIsTrialExpired(true);
            setShowPaymentModal(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (trialIntervalRef.current) clearInterval(trialIntervalRef.current);
    }
    return () => {
      if (trialIntervalRef.current) clearInterval(trialIntervalRef.current);
    };
  }, [view, isSubscribed, isTrialExpired]);

  const startRecording = () => {
    if (!canvasRef.current) return;
    chunksRef.current = [];
    const stream = canvasRef.current.captureStream(60);
    const recorder = new MediaRecorder(stream, { mimeType: 'video/webm;codecs=vp9', videoBitsPerSecond: 8000000 });
    recorder.ondataavailable = (e) => { if (e.data.size > 0) chunksRef.current.push(e.data); };
    recorder.onstop = () => {
      const blob = new Blob(chunksRef.current, { type: 'video/webm' });
      setRecordedBlob(blob);
      setShowDownload(true);
      setIsRecording(false);
    };
    mediaRecorderRef.current = recorder;
    recorder.start();
    setIsRecording(true);
    setRecordingTime(15);
    timerIntervalRef.current = window.setInterval(() => {
      setRecordingTime((prev) => { if (prev <= 1) { stopRecording(); return 0; } return prev - 1; });
    }, 1000);
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') mediaRecorderRef.current.stop();
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
  };

  const downloadVideo = () => {
    if (!recordedBlob) return;
    const url = URL.createObjectURL(recordedBlob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `particle-genesis-${Date.now()}.webm`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const launchTool = (tool: SimulationTool) => {
    if (tool.status !== 'available') return;
    if (!isSubscribed && isTrialExpired) { setShowPaymentModal(true); return; }
    setActiveTool(tool);
    setView('simulator');
    setShowDownload(false);
    setRecordedBlob(null);
  };

  const goBack = () => {
    if (view === 'simulator') { setView('menu'); stopRecording(); }
    else { setView('welcome'); }
  };

  return (
    /* pt-16 accounts for the site's fixed navigation bar */
    <div className="min-h-screen bg-[#050505] text-white font-sans overflow-hidden selection:bg-orange-500/30 pt-16">
      <div className="relative" style={{ height: 'calc(100vh - 64px)' }}>
        <AnimatePresence mode="wait">
          {view === 'welcome' && (
            <motion.section
              key="welcome"
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="absolute inset-0 flex flex-col items-center justify-center bg-[radial-gradient(circle_at_center,#1a0a00_0%,#050505_100%)]"
            >
              <motion.h1
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-7xl md:text-9xl font-bold tracking-[0.2em] uppercase bg-gradient-to-b from-white to-neutral-600 bg-clip-text text-transparent mb-4"
              >
                Genesis
              </motion.h1>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.6 }}
                transition={{ delay: 0.4 }}
                className="text-sm tracking-[0.5em] uppercase mb-12"
              >
                Entering the World of Particles
              </motion.p>
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                whileHover={{ scale: 1.05, backgroundColor: 'white', color: 'black' }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setView('menu')}
                className="px-12 py-4 border border-white/30 text-white uppercase tracking-[0.3em] text-sm transition-all duration-500 hover:shadow-[0_0_30px_rgba(255,255,255,0.2)]"
              >
                Enter World
              </motion.button>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                transition={{ delay: 0.8 }}
                className="mt-12 text-center space-y-2"
              >
                <p className="text-[10px] tracking-[0.4em] uppercase text-neutral-400">High quality particles for video</p>
                <p className="text-[10px] tracking-[0.4em] uppercase text-neutral-500">£9.99 for one month • then £6.99 each month after</p>
              </motion.div>
            </motion.section>
          )}

          {view === 'menu' && (
            <motion.section
              key="menu"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="absolute inset-0 flex flex-col items-center justify-center p-8"
            >
              <button
                onClick={goBack}
                className="absolute top-8 left-8 flex items-center gap-2 text-xs uppercase tracking-widest text-neutral-500 hover:text-white transition-colors"
              >
                <ChevronLeft size={16} /> Back
              </button>

              <h2 className="text-3xl font-light tracking-[0.3em] uppercase mb-16 text-neutral-400">
                Select Your <span className="text-white font-medium">Element</span>
              </h2>

              {isTrialExpired && !isSubscribed && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  onClick={() => setShowPaymentModal(true)}
                  className="mb-8 flex items-center gap-3 px-6 py-3 bg-orange-500/10 border border-orange-500/20 rounded-xl text-orange-500 cursor-pointer hover:bg-orange-500/20 transition-all"
                >
                  <Zap size={18} className="animate-pulse" />
                  <span className="text-xs font-bold uppercase tracking-widest">Trial Expired: Unlock Premium Access</span>
                </motion.div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl w-full">
                {TOOLS.map((tool) => (
                  <motion.div
                    key={tool.id}
                    whileHover={(tool.status === 'available' && (isSubscribed || !isTrialExpired)) ? { y: -10, borderColor: 'rgba(255, 77, 0, 0.5)' } : {}}
                    onClick={() => launchTool(tool)}
                    className={`group relative p-8 rounded-2xl border border-white/5 bg-[#111] transition-all duration-500 ${
                      tool.status === 'available' ? 'cursor-pointer hover:bg-[#1a1a1a]' : 'opacity-50 cursor-not-allowed'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-4">
                      <h3 className={`text-xl font-semibold tracking-tight ${
                        (!isSubscribed && isTrialExpired && tool.id !== 'embers') ? 'text-neutral-600' :
                        tool.id === 'sakura' ? 'text-pink-400' :
                        tool.id === 'rose' ? 'text-rose-500' :
                        'text-orange-500'
                      }`}>
                        {tool.title}
                      </h3>
                      {tool.badge && (
                        <span className={`text-[10px] px-2 py-1 rounded-full bg-white/5 border uppercase tracking-tighter transition-colors ${
                          (!isSubscribed && isTrialExpired && tool.id !== 'embers')
                            ? 'text-red-500 border-red-500/30 bg-red-500/10'
                            : 'text-neutral-400 border-white/10'
                        }`}>
                          {(!isSubscribed && isTrialExpired && tool.id !== 'embers') ? 'LOCKED' : tool.badge}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-neutral-500 leading-relaxed mb-6">{tool.description}</p>
                    <div className="flex items-center gap-4 text-neutral-600 group-hover:text-neutral-400 transition-colors">
                      {tool.id === 'embers' && <Flame size={18} />}
                      {tool.id === 'sakura' && <Flower size={18} />}
                      {tool.id === 'rose' && <Heart size={18} />}
                      {tool.id === 'inferno' && <Flame size={18} className="text-orange-600" />}
                      {tool.id === 'bokeh' && <Sparkles size={18} />}
                      {tool.id === 'nexus' && <Cpu size={18} />}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.section>
          )}

          {view === 'simulator' && activeTool && (
            <motion.section
              key="simulator"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex"
            >
              <div className="absolute top-8 left-8 z-50 flex items-center gap-4">
                <button
                  onClick={goBack}
                  className="flex items-center gap-2 px-4 py-2 bg-black/50 backdrop-blur-md rounded-lg border border-white/10 text-xs uppercase tracking-widest text-neutral-300 hover:text-white transition-colors"
                >
                  <ChevronLeft size={16} /> Exit Simulation
                </button>
                {isRecording && (
                  <div className="flex items-center gap-3 px-4 py-2 bg-red-600 rounded-lg animate-pulse shadow-[0_0_20px_rgba(220,38,38,0.5)]">
                    <div className="w-2 h-2 rounded-full bg-white" />
                    <span className="text-xs font-bold tracking-widest">REC: 00:{recordingTime < 10 ? `0${recordingTime}` : recordingTime}</span>
                  </div>
                )}
                {!isSubscribed && (
                  <div className={`flex items-center gap-3 px-4 py-2 border rounded-lg ${
                    isTrialExpired ? 'bg-red-600/20 border-red-500/30 text-red-400' :
                    activeTool.id === 'sakura' ? 'bg-pink-600/20 border-pink-500/30 text-pink-400' :
                    activeTool.id === 'rose' ? 'bg-rose-600/20 border-rose-500/30 text-rose-400' :
                    'bg-orange-600/20 border-orange-500/30 text-orange-400'
                  }`}>
                    <Clock size={16} />
                    <span className="text-xs font-bold tracking-widest uppercase">
                      {isTrialExpired ? 'Trial Expired' : `Trial: 00:${trialTimeLeft < 10 ? `0${trialTimeLeft}` : trialTimeLeft}`}
                    </span>
                  </div>
                )}
              </div>

              <div className="absolute top-8 right-8 z-50 flex gap-3">
                {!isRecording && !showDownload && (
                  <button
                    onClick={startRecording}
                    className="flex items-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-500 rounded-xl font-bold text-xs uppercase tracking-widest transition-all shadow-lg"
                  >
                    <Video size={16} /> Start 15s Capture
                  </button>
                )}
                {showDownload && (
                  <button
                    onClick={downloadVideo}
                    className="flex items-center gap-2 px-6 py-3 bg-white text-black hover:bg-neutral-200 rounded-xl font-bold text-xs uppercase tracking-widest transition-all shadow-lg"
                  >
                    <Download size={16} /> Save WebM
                  </button>
                )}
              </div>

              {/* Simulation Area */}
              <div className="flex-1 relative flex items-center justify-center bg-black">
                <div className={`absolute top-4 left-1/2 -translate-x-1/2 text-[10px] font-mono tracking-[0.3em] uppercase ${
                  activeTool.id === 'sakura' ? 'text-pink-500/50' :
                  activeTool.id === 'rose' ? 'text-rose-500/50' :
                  'text-orange-500/50'
                }`}>
                  1920x1080 | 60 FPS | {activeTool.id === 'sakura' ? 'Flower Kernel' : activeTool.id === 'rose' ? 'Rose Kernel' : 'Ember Kernel'}
                </div>
                {activeTool.id === 'embers' ? (
                  <EmberSimulation config={emberConfig} onCanvasReady={handleCanvasReady} />
                ) : activeTool.id === 'sakura' ? (
                  <SakuraSimulation config={sakuraConfig} onCanvasReady={handleCanvasReady} />
                ) : activeTool.id === 'rose' ? (
                  <RoseSimulation config={roseConfig} onCanvasReady={handleCanvasReady} />
                ) : activeTool.id === 'bokeh' ? (
                  <BokehSimulation config={bokehConfig} onCanvasReady={handleCanvasReady} />
                ) : activeTool.id === 'nexus' ? (
                  <NexusSimulation config={nexusConfig} onCanvasReady={handleCanvasReady} />
                ) : (
                  <InfernoSimulation config={infernoConfig} onCanvasReady={handleCanvasReady} />
                )}
              </div>

              {/* Controls Panel */}
              <div className="w-80 bg-[#0a0a0a] border-l border-white/5 p-8 flex flex-col gap-8 overflow-y-auto">
                <div className={`flex items-center gap-2 mb-2 ${
                  activeTool.id === 'sakura' ? 'text-pink-500' :
                  activeTool.id === 'rose' ? 'text-rose-500' :
                  activeTool.id === 'inferno' ? 'text-orange-600' :
                  'text-orange-500'
                }`}>
                  <Settings size={18} />
                  <h3 className="text-xs font-bold uppercase tracking-[0.2em]">
                    {activeTool.id === 'embers' ? 'Thermal Dynamics' : activeTool.id === 'inferno' ? 'Inferno Kernel' : 'Garden Dynamics'}
                  </h3>
                </div>

                {activeTool.id === 'embers' ? (
                  <>
                    <ControlSlider label="Heat Intensity" icon={<Flame size={14} />} value={emberConfig.heat} min={0.1} max={3} step={0.1} onChange={(v) => setEmberConfig(prev => ({ ...prev, heat: v }))} color="orange" />
                    <ControlSlider label="Ember Density" icon={<Layers size={14} />} value={emberConfig.density} min={100} max={4000} step={100} onChange={(v) => setEmberConfig(prev => ({ ...prev, density: v }))} color="orange" />
                    <ControlSlider label="Turbulence Chaos" icon={<Zap size={14} />} value={emberConfig.chaos} min={0} max={2} step={0.05} onChange={(v) => setEmberConfig(prev => ({ ...prev, chaos: v }))} color="orange" />
                    <ControlSlider label="Glow Radius" icon={<Sparkles size={14} />} value={emberConfig.glow} min={0} max={40} step={1} onChange={(v) => setEmberConfig(prev => ({ ...prev, glow: v }))} color="orange" />
                    <ControlSlider label="Cooling Rate" icon={<Cpu size={14} />} value={emberConfig.cooling} min={0.1} max={2} step={0.1} onChange={(v) => setEmberConfig(prev => ({ ...prev, cooling: v }))} color="orange" />
                    <ControlSlider label="Wind Drift" icon={<Wind size={14} />} value={emberConfig.wind} min={-5} max={5} step={0.1} onChange={(v) => setEmberConfig(prev => ({ ...prev, wind: v }))} color="orange" />
                  </>
                ) : activeTool.id === 'inferno' ? (
                  <>
                    <ControlSlider label="Updraft Heat" icon={<Flame size={14} />} value={infernoConfig.heat} min={0.5} max={4} step={0.1} onChange={(v) => setInfernoConfig(prev => ({ ...prev, heat: v }))} color="orange" />
                    <ControlSlider label="Flame Density" icon={<Layers size={14} />} value={infernoConfig.density} min={200} max={3500} step={100} onChange={(v) => setInfernoConfig(prev => ({ ...prev, density: v }))} color="orange" />
                    <ControlSlider label="Turbulence" icon={<Zap size={14} />} value={infernoConfig.chaos} min={0} max={3} step={0.1} onChange={(v) => setInfernoConfig(prev => ({ ...prev, chaos: v }))} color="orange" />
                    <ControlSlider label="Flame Size" icon={<Sparkles size={14} />} value={infernoConfig.size} min={0.5} max={3} step={0.1} onChange={(v) => setInfernoConfig(prev => ({ ...prev, size: v }))} color="orange" />
                    <ControlSlider label="Burn Rate" icon={<Cpu size={14} />} value={infernoConfig.burn} min={0.2} max={3} step={0.1} onChange={(v) => setInfernoConfig(prev => ({ ...prev, burn: v }))} color="orange" />
                    <ControlSlider label="Wind Shear" icon={<Wind size={14} />} value={infernoConfig.wind} min={-8} max={8} step={0.2} onChange={(v) => setInfernoConfig(prev => ({ ...prev, wind: v }))} color="orange" />
                  </>
                ) : activeTool.id === 'bokeh' ? (
                  <>
                    <ControlSlider label="Bokeh Density" icon={<Layers size={14} />} value={bokehConfig.density} min={10} max={150} step={5} onChange={(v) => setBokehConfig(prev => ({ ...prev, density: v }))} color="orange" />
                    <ControlSlider label="Lens Size" icon={<Sparkles size={14} />} value={bokehConfig.size} min={0.2} max={4} step={0.1} onChange={(v) => setBokehConfig(prev => ({ ...prev, size: v }))} color="orange" />
                    <ControlSlider label="Drift Chaos" icon={<Zap size={14} />} value={bokehConfig.chaos} min={0} max={2} step={0.05} onChange={(v) => setBokehConfig(prev => ({ ...prev, chaos: v }))} color="orange" />
                    <ControlSlider label="Wind Drift" icon={<Wind size={14} />} value={bokehConfig.wind} min={-2} max={2} step={0.05} onChange={(v) => setBokehConfig(prev => ({ ...prev, wind: v }))} color="orange" />
                  </>
                ) : activeTool.id === 'nexus' ? (
                  <>
                    <ControlSlider label="Node Density" icon={<Layers size={14} />} value={nexusConfig.density} min={10} max={200} step={5} onChange={(v) => setNexusConfig(prev => ({ ...prev, density: v }))} color="orange" />
                    <ControlSlider label="Node Size" icon={<Sparkles size={14} />} value={nexusConfig.size} min={0.2} max={3} step={0.1} onChange={(v) => setNexusConfig(prev => ({ ...prev, size: v }))} color="orange" />
                    <ControlSlider label="Link Chaos" icon={<Zap size={14} />} value={nexusConfig.chaos} min={0} max={3} step={0.1} onChange={(v) => setNexusConfig(prev => ({ ...prev, chaos: v }))} color="orange" />
                    <ControlSlider label="Magnetic Drift" icon={<Wind size={14} />} value={nexusConfig.wind} min={-2} max={2} step={0.05} onChange={(v) => setNexusConfig(prev => ({ ...prev, wind: v }))} color="orange" />
                  </>
                ) : (
                  <>
                    <ControlSlider label="Gravity Pull" icon={<Flame size={14} />} value={activeTool.id === 'sakura' ? sakuraConfig.gravity : roseConfig.gravity} min={0.1} max={3} step={0.1} onChange={(v) => activeTool.id === 'sakura' ? setSakuraConfig(prev => ({ ...prev, gravity: v })) : setRoseConfig(prev => ({ ...prev, gravity: v }))} color={activeTool.id === 'sakura' ? 'pink' : 'rose'} />
                    <ControlSlider label="Petal Density" icon={<Layers size={14} />} value={activeTool.id === 'sakura' ? sakuraConfig.density : roseConfig.density} min={100} max={3000} step={100} onChange={(v) => activeTool.id === 'sakura' ? setSakuraConfig(prev => ({ ...prev, density: v })) : setRoseConfig(prev => ({ ...prev, density: v }))} color={activeTool.id === 'sakura' ? 'pink' : 'rose'} />
                    <ControlSlider label="Breeze Chaos" icon={<Zap size={14} />} value={activeTool.id === 'sakura' ? sakuraConfig.chaos : roseConfig.chaos} min={0} max={2} step={0.05} onChange={(v) => activeTool.id === 'sakura' ? setSakuraConfig(prev => ({ ...prev, chaos: v })) : setRoseConfig(prev => ({ ...prev, chaos: v }))} color={activeTool.id === 'sakura' ? 'pink' : 'rose'} />
                    <ControlSlider label="Petal Size" icon={<Sparkles size={14} />} value={activeTool.id === 'sakura' ? sakuraConfig.size : roseConfig.size} min={0.5} max={3} step={0.1} onChange={(v) => activeTool.id === 'sakura' ? setSakuraConfig(prev => ({ ...prev, size: v })) : setRoseConfig(prev => ({ ...prev, size: v }))} color={activeTool.id === 'sakura' ? 'pink' : 'rose'} />
                    <ControlSlider label="Flutter Speed" icon={<Cpu size={14} />} value={activeTool.id === 'sakura' ? sakuraConfig.flutter : roseConfig.flutter} min={0.1} max={3} step={0.1} onChange={(v) => activeTool.id === 'sakura' ? setSakuraConfig(prev => ({ ...prev, flutter: v })) : setRoseConfig(prev => ({ ...prev, flutter: v }))} color={activeTool.id === 'sakura' ? 'pink' : 'rose'} />
                    <ControlSlider label="Wind Drift" icon={<Wind size={14} />} value={activeTool.id === 'sakura' ? sakuraConfig.wind : roseConfig.wind} min={-5} max={5} step={0.1} onChange={(v) => activeTool.id === 'sakura' ? setSakuraConfig(prev => ({ ...prev, wind: v })) : setRoseConfig(prev => ({ ...prev, wind: v }))} color={activeTool.id === 'sakura' ? 'pink' : 'rose'} />
                  </>
                )}

                <div className="mt-auto pt-8 border-t border-white/5">
                  <p className="text-[10px] text-neutral-600 leading-relaxed uppercase tracking-widest">
                    Engine: {activeTool.id === 'sakura' ? 'Sakura Bloom v1.0' : activeTool.id === 'rose' ? 'Rose Bloom v1.0' : activeTool.id === 'inferno' ? 'Inferno Core v2.0' : 'Cinematic Embers v1.0'}<br />
                    Kernel: {activeTool.id === 'sakura' ? 'Flower Drift' : activeTool.id === 'rose' ? 'Rose Drift' : activeTool.id === 'inferno' ? 'Inferno Kernel' : 'Simplex Drift'}<br />
                    Status: Optimized
                  </p>
                </div>
              </div>
            </motion.section>
          )}

          {showPaymentModal && (
            <PaymentModal
              onClose={() => { setShowPaymentModal(false); if (isTrialExpired && view === 'simulator') goBack(); }}
              onSubscribe={() => { setIsSubscribed(true); setShowPaymentModal(false); }}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function PaymentModal({ onClose, onSubscribe }: { onClose: () => void; onSubscribe: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/90 backdrop-blur-xl"
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        className="w-full max-w-md bg-[#111] border border-white/10 rounded-3xl p-8 relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-500 via-pink-500 to-rose-500" />
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-rose-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-orange-500/20">
            <Zap size={32} className="text-white" />
          </div>
          <h2 className="text-3xl font-bold tracking-tight mb-2">Unlock Genesis</h2>
          <p className="text-neutral-400 text-sm leading-relaxed">
            Your trial has ended. Continue creating high-quality cinematic particles with full access.
          </p>
        </div>
        <div className="space-y-4 mb-8">
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-orange-500 mb-1">First Month</p>
              <p className="text-2xl font-bold">£9.99</p>
            </div>
            <div className="text-right">
              <p className="text-[10px] uppercase tracking-widest text-neutral-500">Then £6.99/mo</p>
            </div>
          </div>
          <div className="space-y-3">
            <FeatureItem text="Unlimited 4K Video Exports" />
            <FeatureItem text="Access All Particle Kernels" />
            <FeatureItem text="Advanced Physics Controls" />
            <FeatureItem text="Commercial Usage License" />
          </div>
        </div>
        <div className="flex flex-row gap-3">
          <button onClick={onSubscribe} className="flex-1 py-4 bg-white text-black rounded-xl font-bold uppercase tracking-widest text-xs hover:bg-neutral-200 transition-all">
            Stripe
          </button>
          <button onClick={onSubscribe} className="flex-1 py-4 bg-[#0070ba] text-white rounded-xl font-bold uppercase tracking-widest text-xs hover:bg-[#005ea6] transition-all">
            PayPal
          </button>
        </div>
        <div className="mt-3">
          <button onClick={onClose} className="w-full py-3 text-neutral-500 hover:text-white transition-colors text-[10px] uppercase tracking-[0.3em]">
            Maybe Later
          </button>
        </div>
        <p className="text-[8px] text-center text-neutral-600 uppercase tracking-widest mt-6">
          Secure payment processing • Cancel anytime
        </p>
      </motion.div>
    </motion.div>
  );
}

function FeatureItem({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-3 text-xs text-neutral-300">
      <div className="w-1.5 h-1.5 rounded-full bg-orange-500" />
      <span className="tracking-wide">{text}</span>
    </div>
  );
}

function ControlSlider({ label, icon, value, min, max, step, onChange, color }: {
  label: string;
  icon: React.ReactNode;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (v: number) => void;
  color: 'orange' | 'pink' | 'rose';
}) {
  const accentClass = color === 'pink' ? 'accent-pink-500' : color === 'rose' ? 'accent-rose-500' : 'accent-orange-500';
  const textClass = color === 'pink' ? 'text-pink-500' : color === 'rose' ? 'text-rose-500' : 'text-orange-500';
  return (
    <div className="flex flex-col gap-3">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2 text-neutral-500">
          {icon}
          <label className="text-[10px] uppercase tracking-widest font-medium">{label}</label>
        </div>
        <span className={`text-[10px] font-mono ${textClass}`}>{value.toFixed(step < 1 ? 1 : 0)}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className={`w-full h-1 bg-white/10 rounded-full appearance-none cursor-pointer ${accentClass}`}
      />
    </div>
  );
}
