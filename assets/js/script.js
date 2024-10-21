const videoPlayerApp = {
    currentChannel: null,
    channels: [],
    isMinimized: false,
    isFullscreen: false,
    showChannelList: false,
    activeCategory: 'all',
    isLoading: true,
    error: null,

    async init() {
        await this.loadChannels();
        this.initializePlayer();
    },

    async loadChannels() {
        try {
            const response = await fetch('assets/channels/channels.json');
            if (!response.ok) {
                throw new Error('Failed to load channels');
            }
            this.channels = await response.json();
            this.currentChannel = this.channels[0];
            this.isLoading = false;
        } catch (error) {
            console.error('Error loading channels:', error);
            this.error = 'Failed to load channels. Please try again later.';
            this.isLoading = false;
        }
    },

    initializePlayer() {
        if (this.currentChannel) {
            const videoPlayer = document.getElementById('videoPlayer');
            if (Hls.isSupported()) {
                const hls = new Hls();
                hls.loadSource(this.currentChannel.url);
                hls.attachMedia(videoPlayer);
                hls.on(Hls.Events.MANIFEST_PARSED, function() {
                    videoPlayer.play();
                });
            } else if (videoPlayer.canPlayType('application/vnd.apple.mpegurl')) {
                videoPlayer.src = this.currentChannel.url;
                videoPlayer.play();
            } else {
                this.error = 'Your browser does not support HLS streaming.';
            }
        }
    },

    changeChannel(channel) {
        this.currentChannel = channel;
        this.initializePlayer();
        this.showChannelList = false;
    },

    toggleMinimize() {
        this.isMinimized = !this.isMinimized;
        this.$nextTick(() => {
            const videoPlayer = document.getElementById('videoPlayer');
            if (this.isMinimized) {
                videoPlayer.pause();
            } else {
                videoPlayer.play();
            }
        });
    },

    toggleFullscreen() {
        if (!document.fullscreenElement) {
            document.querySelector('.player-wrapper').requestFullscreen();
        } else {
            document.exitFullscreen();
        }
    },

    filteredChannels() {
        if (this.activeCategory === 'all') {
            return this.channels;
        }
        return this.channels.filter(channel => channel.category === this.activeCategory);
    },

    getChannelLogo(channel) {
        return channel.logo ? channel.logo : 'assets/images/logo.png';
    }
};

// Resize player wrapper to maintain aspect ratio
const playerWrapper = document.querySelector('.player-wrapper');
const resizePlayer = () => {
    if (playerWrapper) {
        playerWrapper.style.height = `${playerWrapper.offsetWidth * 9 / 16}px`;
    }
};
window.addEventListener('resize', resizePlayer);
resizePlayer(); // Initial call
