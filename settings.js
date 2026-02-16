function toggleSettings() {
    const panel = document.getElementById('settingsPanel');
    panel.classList.toggle('active');
}

function updateSettingsUI() {
    const soundToggle = document.getElementById('soundToggle');
    const soundStatus = document.getElementById('soundStatus');
    const volumeSlider = document.getElementById('volumeSlider');
    const volumeValue = document.getElementById('volumeValue');
    const vfxToggle = document.getElementById('vfxToggle');
    const vfxStatus = document.getElementById('vfxStatus');
    const particlesToggle = document.getElementById('particlesToggle');
    const particlesStatus = document.getElementById('particlesStatus');
    const autoSaveToggle = document.getElementById('autoSaveToggle');
    const autoSaveStatus = document.getElementById('autoSaveStatus');
    const difficultyToggle = document.getElementById('difficultyToggle');
    const difficultyStatus = document.getElementById('difficultyStatus');
    
    // Load saved settings
    const savedSound = localStorage.getItem('soundEnabled') !== 'false';
    const savedVolume = localStorage.getItem('masterVolume') || '70';
    const savedVFX = localStorage.getItem('vfxEnabled') !== 'false';
    const savedParticles = localStorage.getItem('particlesEnabled') !== 'false';
    const savedAutoSave = localStorage.getItem('autoSaveEnabled') !== 'false';
    const savedDifficulty = localStorage.getItem('difficultyBoost') === 'true';
    
    soundToggle.checked = savedSound;
    soundStatus.textContent = savedSound ? 'ON' : 'OFF';
    volumeSlider.value = parseInt(savedVolume);
    volumeValue.textContent = Math.round(parseFloat(savedVolume)) + '%';
    vfxToggle.checked = savedVFX;
    vfxStatus.textContent = savedVFX ? 'ON' : 'OFF';
    particlesToggle.checked = savedParticles;
    particlesStatus.textContent = savedParticles ? 'ON' : 'OFF';
    autoSaveToggle.checked = savedAutoSave;
    autoSaveStatus.textContent = savedAutoSave ? 'ON' : 'OFF';
    difficultyToggle.checked = savedDifficulty;
    difficultyStatus.textContent = savedDifficulty ? 'ON' : 'OFF';
}

document.addEventListener('DOMContentLoaded', () => {
    const soundToggle = document.getElementById('soundToggle');
    const soundStatus = document.getElementById('soundStatus');
    const volumeSlider = document.getElementById('volumeSlider');
    const volumeValue = document.getElementById('volumeValue');
    const vfxToggle = document.getElementById('vfxToggle');
    const vfxStatus = document.getElementById('vfxStatus');
    const particlesToggle = document.getElementById('particlesToggle');
    const particlesStatus = document.getElementById('particlesStatus');
    const autoSaveToggle = document.getElementById('autoSaveToggle');
    const autoSaveStatus = document.getElementById('autoSaveStatus');
    const difficultyToggle = document.getElementById('difficultyToggle');
    const difficultyStatus = document.getElementById('difficultyStatus');
    
    updateSettingsUI();
    
    // Sound toggle
    soundToggle.addEventListener('change', (e) => {
        localStorage.setItem('soundEnabled', e.target.checked);
        soundStatus.textContent = e.target.checked ? 'ON' : 'OFF';
        if (AudioManager) {
            AudioManager.toggleSound(e.target.checked);
        }
    });
    
    // Volume slider
    volumeSlider.addEventListener('input', (e) => {
        const value = parseInt(e.target.value);
        volumeValue.textContent = value + '%';
        localStorage.setItem('masterVolume', value / 100);
        if (AudioManager) {
            AudioManager.setVolume(value);
        }
    });
    
    // VFX toggle
    vfxToggle.addEventListener('change', (e) => {
        localStorage.setItem('vfxEnabled', e.target.checked);
        vfxStatus.textContent = e.target.checked ? 'ON' : 'OFF';
    });
    
    // Particles toggle
    particlesToggle.addEventListener('change', (e) => {
        localStorage.setItem('particlesEnabled', e.target.checked);
        particlesStatus.textContent = e.target.checked ? 'ON' : 'OFF';
    });
    
    // Auto-save toggle
    autoSaveToggle.addEventListener('change', (e) => {
        localStorage.setItem('autoSaveEnabled', e.target.checked);
        autoSaveStatus.textContent = e.target.checked ? 'ON' : 'OFF';
    });
    
    // Difficulty toggle
    difficultyToggle.addEventListener('change', (e) => {
        localStorage.setItem('difficultyBoost', e.target.checked);
        difficultyStatus.textContent = e.target.checked ? 'ON' : 'OFF';
    });
});

function clearAllData() {
    if (confirm('Are you sure you want to clear all game data and scores? This cannot be undone.')) {
        localStorage.clear();
        alert('All data cleared! Refreshing page...');
        location.reload();
    }
}

function getSetting(key, defaultValue = false) {
    return localStorage.getItem(key) !== 'false' && localStorage.getItem(key) !== null 
        ? localStorage.getItem(key) === 'true' || localStorage.getItem(key) === 'true'
        : defaultValue;
}
