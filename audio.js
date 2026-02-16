const AudioManager = {
    audioContext: null,
    masterVolume: 0.7,
    soundEnabled: true,
    
    init() {
        if (!window.AudioContext && !window.webkitAudioContext) {
            console.warn('Web Audio API not supported');
            return;
        }
        
        this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        this.loadSettings();
    },
    
    loadSettings() {
        this.soundEnabled = localStorage.getItem('soundEnabled') !== 'false';
        this.masterVolume = parseFloat(localStorage.getItem('masterVolume') || '0.7');
    },
    
    playBeep(frequency = 800, duration = 100) {
        if (!this.soundEnabled || !this.audioContext) return;
        
        const now = this.audioContext.currentTime;
        const osc = this.audioContext.createOscillator();
        const gain = this.audioContext.createGain();
        
        osc.connect(gain);
        gain.connect(this.audioContext.destination);
        
        osc.frequency.value = frequency;
        gain.gain.setValueAtTime(this.masterVolume * 0.3, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + duration / 1000);
        
        osc.start(now);
        osc.stop(now + duration / 1000);
    },
    
    playSuccess(frequency = 1200, duration = 150) {
        if (!this.soundEnabled || !this.audioContext) return;
        
        const now = this.audioContext.currentTime;
        const osc = this.audioContext.createOscillator();
        const gain = this.audioContext.createGain();
        
        osc.connect(gain);
        gain.connect(this.audioContext.destination);
        
        osc.frequency.setValueAtTime(frequency, now);
        osc.frequency.exponentialRampToValueAtTime(frequency * 1.3, now + duration / 1000);
        gain.gain.setValueAtTime(this.masterVolume * 0.3, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + duration / 1000);
        
        osc.start(now);
        osc.stop(now + duration / 1000);
    },
    
    playError(frequency = 300, duration = 200) {
        if (!this.soundEnabled || !this.audioContext) return;
        
        const now = this.audioContext.currentTime;
        const osc = this.audioContext.createOscillator();
        const gain = this.audioContext.createGain();
        
        osc.connect(gain);
        gain.connect(this.audioContext.destination);
        
        osc.frequency.setValueAtTime(frequency, now);
        osc.frequency.exponentialRampToValueAtTime(frequency * 0.7, now + duration / 1000);
        gain.gain.setValueAtTime(this.masterVolume * 0.3, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + duration / 1000);
        
        osc.start(now);
        osc.stop(now + duration / 1000);
    },
    
    playClick() {
        this.playBeep(600, 80);
    },
    
    playCoin() {
        if (!this.soundEnabled || !this.audioContext) return;
        const now = this.audioContext.currentTime;
        
        [1000, 1200].forEach((freq, i) => {
            const osc = this.audioContext.createOscillator();
            const gain = this.audioContext.createGain();
            osc.connect(gain);
            gain.connect(this.audioContext.destination);
            osc.frequency.value = freq;
            gain.gain.setValueAtTime(this.masterVolume * 0.2, now + i * 0.08);
            gain.gain.exponentialRampToValueAtTime(0.01, now + i * 0.08 + 0.1);
            osc.start(now + i * 0.08);
            osc.stop(now + i * 0.08 + 0.1);
        });
    },
    
    setVolume(volume) {
        this.masterVolume = Math.max(0, Math.min(1, volume / 100));
        localStorage.setItem('masterVolume', this.masterVolume);
    },
    
    toggleSound(enabled) {
        this.soundEnabled = enabled;
        localStorage.setItem('soundEnabled', enabled);
    }
};

AudioManager.init();
