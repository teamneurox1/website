
document.addEventListener('DOMContentLoaded', () => {
    // Select elements
    const menuBtn = document.getElementById('menuBtn');
    const actionCards = document.querySelectorAll('.action-card');
    const sidebar = document.querySelector('.sidebar');
    const liveOptionBtn = document.getElementById('liveOptionBtn');
    const backBtn = document.getElementById('backBtn');
    const liveView = document.getElementById('liveView');
    const preRecordBtn = document.getElementById('preRecordBtn');
    const preRecordBackBtn = document.getElementById('preRecordBackBtn');
    const preRecordView = document.getElementById('preRecordView');
    const videoListBody = document.getElementById('videoListBody');
    const preRecordContent = document.getElementById('preRecordContent');
    const playerContent = document.getElementById('playerContent');
    const accidentBtn = document.getElementById('accidentBtn');
    const accidentView = document.getElementById('accidentView');
    const accidentBackBtn = document.getElementById('accidentBackBtn');
    const accidentListBody = document.getElementById('accidentListBody');
    const alertBtn = document.getElementById('alertBtn');
    const alertView = document.getElementById('alertView');
    const alertBackBtn = document.getElementById('alertBackBtn');
    const saveAlertsBtn = document.getElementById('saveAlertsBtn');
    const demoBtn = document.getElementById('demoBtn');
    const demoView = document.getElementById('demoView');
    const demoBackBtn = document.getElementById('demoBackBtn');
    
    const sosBtn = document.getElementById('sosBtn');
    const sosView = document.getElementById('sosView');
    const sosBackBtn = document.getElementById('sosBackBtn');
    
    const demoRoadViewBtn = document.getElementById('demoRoadViewBtn');
    const demoDriverViewBtn = document.getElementById('demoDriverViewBtn');
    const demoTrafficLightBtn = document.getElementById('demoTrafficLightBtn');
    const demoPlayerView = document.getElementById('demoPlayerView');

    // Force all existing videos to be muted with 0 volume
    document.querySelectorAll('video').forEach(video => {
        video.muted = true;
        video.volume = 0;
        video.setAttribute('muted', '');
    });
    const demoPlayerBackBtn = document.getElementById('demoPlayerBackBtn');
    const demoVideoPlayer = document.getElementById('demoVideoPlayer');
    
    // Modal Elements
    const accidentModal = document.getElementById('accidentModal');
    const modalVideoPlayer = document.getElementById('modalVideoPlayer');
    const modalStartTime = document.getElementById('modalStartTime');
    const modalEndTime = document.getElementById('modalEndTime');
    const modalDescription = document.getElementById('modalDescription');
    const modalCancelBtn = document.getElementById('modalCancelBtn');
    const modalSaveBtn = document.getElementById('modalSaveBtn');
    
    let accidentClips = JSON.parse(localStorage.getItem('accidentClips')) || [];
    const backToListBtn = document.getElementById('backToListBtn');
    const saveFromPlayerBtn = document.getElementById('saveFromPlayerBtn');
    const uploadedVideoPlayer = document.getElementById('uploadedVideoPlayer');
    const uploadedVideoName = document.getElementById('uploadedVideoName');
    const buttonGridContainer = document.querySelector('.button-grid-container');
    const dashboardHeader = document.querySelector('.dashboard-header');

    const topPrototypeBadge = document.querySelector('.prototype-badge');
    if (topPrototypeBadge && buttonGridContainer) {
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.attributeName === 'class') {
                    if (buttonGridContainer.classList.contains('hidden')) {
                        topPrototypeBadge.classList.add('hidden');
                    } else {
                        topPrototypeBadge.classList.remove('hidden');
                    }
                }
            });
        });
        observer.observe(buttonGridContainer, { attributes: true });
    }

    // Manual Translation Logic
    const customLangSelect = document.getElementById('customLangSelect');
    if (customLangSelect) {
        customLangSelect.addEventListener('change', (e) => {
            const lang = e.target.value;
            const dict = typeof translations !== 'undefined' && translations[lang] ? translations[lang] : translations['en'];
            
            const translatableElements = document.querySelectorAll('[data-i18n]');
            translatableElements.forEach(el => {
                const key = el.getAttribute('data-i18n');
                if (dict[key]) {
                    el.innerHTML = dict[key];
                }
            });
        });
        
        // Trigger translation on load
        customLangSelect.dispatchEvent(new Event('change'));
    }


    // Menu button interaction
    menuBtn.addEventListener('click', () => {
        sidebar.classList.toggle('collapsed');
        menuBtn.classList.toggle('active');
        console.log('Menu button clicked');
    });

    // Add click event listeners to all action cards
    actionCards.forEach(card => {
        card.addEventListener('click', () => {
            const label = card.querySelector('.card-label').textContent;
            console.log(`Clicked: ${label}`);
            
            card.style.transform = 'scale(0.95)';
            setTimeout(() => {
                card.style.transform = '';
            }, 150);
        });
    });

    // Live Option Transition
    if (liveOptionBtn) {
        liveOptionBtn.addEventListener('click', () => {
            buttonGridContainer.classList.add('hidden');
            dashboardHeader.classList.add('hidden');
            liveView.classList.remove('hidden');
            
            // Ensure Live View videos play
            const liveVideos = liveView.querySelectorAll('video');
            liveVideos.forEach(video => {
                video.currentTime = 0;
                video.play().catch(e => console.error("Autoplay prevented:", e));
            });
        });
    }

    // Back Button Transition
    if (backBtn) {
        backBtn.addEventListener('click', () => {
            liveView.classList.add('hidden');
            buttonGridContainer.classList.remove('hidden');
            dashboardHeader.classList.remove('hidden');
        });
    }

    // Pre Record Option Transition
    if (preRecordBtn) {
        preRecordBtn.addEventListener('click', () => {
            buttonGridContainer.classList.add('hidden');
            dashboardHeader.classList.add('hidden');
            preRecordView.classList.remove('hidden');
        });
    }

    // Pre Record Back Button Transition
    if (preRecordBackBtn) {
        preRecordBackBtn.addEventListener('click', () => {
            preRecordView.classList.add('hidden');
            buttonGridContainer.classList.remove('hidden');
            dashboardHeader.classList.remove('hidden');
        });
    }

    // Accident Clip Option Transition
    if (accidentBtn) {
        accidentBtn.addEventListener('click', () => {
            buttonGridContainer.classList.add('hidden');
            dashboardHeader.classList.add('hidden');
            accidentView.classList.remove('hidden');
        });
    }

    // Accident Clip Back Button Transition
    if (accidentBackBtn) {
        accidentBackBtn.addEventListener('click', () => {
            accidentView.classList.add('hidden');
            buttonGridContainer.classList.remove('hidden');
            dashboardHeader.classList.remove('hidden');
        });
    }

    // Alert Notification Option Transition
    if (alertBtn) {
        alertBtn.addEventListener('click', () => {
            buttonGridContainer.classList.add('hidden');
            dashboardHeader.classList.add('hidden');
            alertView.classList.remove('hidden');
        });
    }

    // Alert Notification Back Button Transition
    if (alertBackBtn) {
        alertBackBtn.addEventListener('click', () => {
            alertView.classList.add('hidden');
            buttonGridContainer.classList.remove('hidden');
            dashboardHeader.classList.remove('hidden');
        });
    }

    // Alert Settings Save Logic
    if (saveAlertsBtn) {
        const alertProfileSelect = document.getElementById('alertProfileSelect');
        const alertCheckboxes = document.querySelectorAll('#alertView input[type="checkbox"]');
        
        function loadAlertSettingsForProfile(profile) {
            const storageKey = `alertSettings_${profile}`;
            const savedSettings = JSON.parse(localStorage.getItem(storageKey));
            
            if (savedSettings && Array.isArray(savedSettings)) {
                alertCheckboxes.forEach((cb, index) => {
                    if (savedSettings[index] !== undefined) {
                        cb.checked = savedSettings[index];
                    }
                });
            } else {
                // Default all to true if no settings found
                alertCheckboxes.forEach(cb => cb.checked = true);
            }
        }

        // Initial Load
        if (alertProfileSelect) {
            loadAlertSettingsForProfile(alertProfileSelect.value);
            
            // Handle profile change
            alertProfileSelect.addEventListener('change', (e) => {
                loadAlertSettingsForProfile(e.target.value);
            });
        }

        saveAlertsBtn.addEventListener('click', () => {
            const currentProfile = alertProfileSelect ? alertProfileSelect.value : 'default';
            const storageKey = `alertSettings_${currentProfile}`;
            
            const alertSettings = Array.from(alertCheckboxes).map(cb => cb.checked);
            localStorage.setItem(storageKey, JSON.stringify(alertSettings));
            
            // Visual feedback
            const originalHTML = saveAlertsBtn.innerHTML;
            const currentLang = customLangSelect ? customLangSelect.value : 'en';
            const dict = typeof translations !== 'undefined' && translations[currentLang] ? translations[currentLang] : (typeof translations !== 'undefined' ? translations['en'] : null);
            const savedText = dict && dict['saved'] ? dict['saved'] : 'SAVED!';
            
            saveAlertsBtn.innerHTML = `<i class='bx bx-check'></i> <span data-i18n="saved">${savedText} (${currentProfile.toUpperCase()})</span>`;
            saveAlertsBtn.style.background = "#2ed573";
            saveAlertsBtn.style.boxShadow = "0 0 15px rgba(46, 213, 115, 0.4)";
            saveAlertsBtn.style.color = "#fff";
            
            setTimeout(() => {
                saveAlertsBtn.innerHTML = originalHTML;
                saveAlertsBtn.style.background = "var(--accent-cyan)";
                saveAlertsBtn.style.boxShadow = "0 0 15px rgba(0, 240, 255, 0.3)";
                saveAlertsBtn.style.color = "#000";
            }, 2000);
        });
    }

    // Demo Option Transition
    if (demoBtn) {
        demoBtn.addEventListener('click', () => {
            buttonGridContainer.classList.add('hidden');
            dashboardHeader.classList.add('hidden');
            demoView.classList.remove('hidden');
        });
    }

    // Demo Back Button Transition
    if (demoBackBtn) {
        demoBackBtn.addEventListener('click', () => {
            demoView.classList.add('hidden');
            buttonGridContainer.classList.remove('hidden');
            dashboardHeader.classList.remove('hidden');
        });
    }

    // SOS Option Transition
    if (sosBtn) {
        sosBtn.addEventListener('click', () => {
            buttonGridContainer.classList.add('hidden');
            dashboardHeader.classList.add('hidden');
            sosView.classList.remove('hidden');
            
            // Re-trigger animations by removing and re-adding the class to fade-in-text elements
            const fadeTexts = sosView.querySelectorAll('.fade-in-text');
            fadeTexts.forEach(el => {
                el.style.animation = 'none';
                el.offsetHeight; /* trigger reflow */
                el.style.animation = null; 
            });
            
            const header = sosView.querySelector('.sos-animated-header');
            if(header) {
                header.style.animation = 'none';
                header.offsetHeight; /* trigger reflow */
                header.style.animation = null;
            }
        });
    }

    // SOS Back Button Transition
    if (sosBackBtn) {
        sosBackBtn.addEventListener('click', () => {
            sosView.classList.add('hidden');
            buttonGridContainer.classList.remove('hidden');
            dashboardHeader.classList.remove('hidden');
        });
    }

    // Demo Road View Transition
    if (demoRoadViewBtn) {
        demoRoadViewBtn.addEventListener('click', () => {
            demoView.classList.add('hidden');
            demoPlayerView.classList.remove('hidden');
            const demoPlayerTitle = document.getElementById('demoPlayerTitle');
            if(demoPlayerTitle) demoPlayerTitle.textContent = "ROAD VIEW";
            demoVideoPlayer.src = 'videos/Real%20time%20dash%20cam%20object%20detection(720P_HD).mp4';
            demoVideoPlayer.muted = true;
            demoVideoPlayer.volume = 0;
            demoVideoPlayer.play();
        });
    }

    // Demo Driver View Transition
    if (demoDriverViewBtn) {
        demoDriverViewBtn.addEventListener('click', () => {
            demoView.classList.add('hidden');
            demoPlayerView.classList.remove('hidden');
            const demoPlayerTitle = document.getElementById('demoPlayerTitle');
            if(demoPlayerTitle) demoPlayerTitle.textContent = "DRIVER VIEW";
            demoVideoPlayer.src = 'videos/RoscoVision%20DV6%20Dashcam_%20Drowsy%20Driver(480P).mp4';
            demoVideoPlayer.muted = true;
            demoVideoPlayer.volume = 0;
            demoVideoPlayer.play();
        });
    }

    // Demo Traffic Light Transition
    if (demoTrafficLightBtn) {
        demoTrafficLightBtn.addEventListener('click', () => {
            demoView.classList.add('hidden');
            demoPlayerView.classList.remove('hidden');
            const demoPlayerTitle = document.getElementById('demoPlayerTitle');
            if(demoPlayerTitle) demoPlayerTitle.textContent = "TRAFFIC LIGHT";
            demoVideoPlayer.src = 'videos/Traffic%20Light%20Detection%20using%20Opencv%20and%20YOLOv3%20(Tutorial%20in%20description)(720P_HD).mp4';
            demoVideoPlayer.muted = true;
            demoVideoPlayer.volume = 0;
            demoVideoPlayer.play();
        });
    }

    // Demo Player Back Button
    if (demoPlayerBackBtn) {
        demoPlayerBackBtn.addEventListener('click', () => {
            demoVideoPlayer.pause();
            demoPlayerView.classList.add('hidden');
            demoView.classList.remove('hidden');
        });
    }

    // Handle clicks on video list items (Event Delegation)
    if (videoListBody) {
        videoListBody.addEventListener('click', (e) => {
            const menuIcon = e.target.closest('.video-menu-icon');
            if (menuIcon) {
                const item = menuIcon.closest('.video-list-item');
                const src = item.getAttribute('data-src');
                const title = item.getAttribute('data-title');
                
                accidentModal.classList.remove('hidden');
                modalVideoPlayer.src = src;
                modalVideoPlayer.setAttribute('data-title', title);
                modalStartTime.value = 0;
                modalEndTime.value = 10;
                if (modalDescription) modalDescription.value = '';
                
                e.stopPropagation();
                return;
            }

            const item = e.target.closest('.video-list-item');
            if (item) {
                const src = item.getAttribute('data-src');
                const title = item.getAttribute('data-title');
                
                if (src) {
                    uploadedVideoPlayer.src = src;
                    uploadedVideoName.textContent = title;
                    
                    preRecordContent.classList.add('hidden');
                    playerContent.classList.remove('hidden');
                    uploadedVideoPlayer.play();
                }
            }
        });
    }

    // Modal Action Listeners
    if (modalCancelBtn) {
        modalCancelBtn.addEventListener('click', () => {
            accidentModal.classList.add('hidden');
            modalVideoPlayer.pause();
        });
    }

    if (modalSaveBtn) {
        modalSaveBtn.addEventListener('click', () => {
            const src = modalVideoPlayer.src;
            const title = modalVideoPlayer.getAttribute('data-title');
            const start = parseInt(modalStartTime.value) || 0;
            const end = parseInt(modalEndTime.value) || 0;
            const description = modalDescription ? modalDescription.value : '';
            
            const newClip = { src, title, start, end, description };
            
            const isDuplicate = accidentClips.some(clip => 
                clip.src === newClip.src && 
                clip.start === newClip.start && 
                clip.end === newClip.end
            );
            
            if (isDuplicate) {
                alert('This exact clip is already saved in Accident Clips.');
                return;
            }
            
            accidentClips.push(newClip);
            localStorage.setItem('accidentClips', JSON.stringify(accidentClips));
            
            accidentModal.classList.add('hidden');
            modalVideoPlayer.pause();
            
            renderAccidentClips();
        });
    }

    function renderAccidentClips() {
        if (!accidentListBody) return;
        
        if (accidentClips.length === 0) {
            accidentListBody.innerHTML = '<div style="color: #64748b; font-family: \'Inter\', sans-serif; text-align: center; padding: 20px;">No accident clips available.</div>';
            return;
        }
        
        accidentListBody.innerHTML = '';
        accidentClips.forEach((clip, index) => {
            const item = document.createElement('div');
            item.className = 'video-list-item';
            item.style.alignItems = 'center';
            item.innerHTML = `
                <div class="video-thumbnail-wrapper accident-thumbnail" style="width: 120px; height: 68px; cursor: pointer;">
                    <video src="${clip.src}#t=${clip.start}" class="video-thumbnail-img" muted playsinline></video>
                    <div class="video-duration">${clip.start}s - ${clip.end}s</div>
                    <div class="play-overlay" style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); color: white; font-size: 24px; pointer-events: none;"><i class='bx bx-play-circle'></i></div>
                </div>
                <div class="video-info" style="flex: 1;">
                    <h3 class="video-item-title">${clip.title} (Accident)</h3>
                    <div class="video-item-meta">
                        <span>Duration: ${Math.max(0, clip.end - clip.start)}s</span>
                    </div>
                    ${clip.description ? `<div style="font-size: 12px; color: #8b9bb4; margin-top: 4px;">${clip.description}</div>` : ''}
                </div>
                <div class="delete-clip-btn" style="color: #ff4757; font-size: 24px; cursor: pointer; padding: 10px; transition: transform 0.2s;" onmouseover="this.style.transform='scale(1.1)'" onmouseout="this.style.transform='scale(1)'">
                    <i class='bx bx-trash'></i>
                </div>
            `;
            
            const deleteBtn = item.querySelector('.delete-clip-btn');
            deleteBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                accidentClips.splice(index, 1);
                localStorage.setItem('accidentClips', JSON.stringify(accidentClips));
                renderAccidentClips();
            });
            
            const thumbWrapper = item.querySelector('.accident-thumbnail');
            const video = thumbWrapper.querySelector('video');
            const playOverlay = thumbWrapper.querySelector('.play-overlay');
            
            thumbWrapper.addEventListener('click', (e) => {
                e.stopPropagation();
                if (video.paused) {
                    video.play().catch(err => console.log("Play failed:", err));
                    playOverlay.style.display = 'none';
                } else {
                    video.pause();
                    playOverlay.style.display = 'block';
                }
            });
            
            // Stop at end time
            video.addEventListener('timeupdate', () => {
                if (video.currentTime >= clip.end) {
                    video.pause();
                    video.currentTime = clip.start;
                    playOverlay.style.display = 'block';
                }
            });

            accidentListBody.appendChild(item);
        });
    }

    // Handle back button from player to list
    if (backToListBtn) {
        backToListBtn.addEventListener('click', () => {
            uploadedVideoPlayer.pause();
            playerContent.classList.add('hidden');
            preRecordContent.classList.remove('hidden');
        });
    }

    // Handle save from player button
    if (saveFromPlayerBtn) {
        saveFromPlayerBtn.addEventListener('click', () => {
            uploadedVideoPlayer.pause();
            
            const src = uploadedVideoPlayer.src;
            const title = uploadedVideoName.textContent;
            
            accidentModal.classList.remove('hidden');
            modalVideoPlayer.src = src;
            modalVideoPlayer.setAttribute('data-title', title);
            modalStartTime.value = 0;
            // set end time to current video duration or a default
            const duration = uploadedVideoPlayer.duration;
            modalEndTime.value = isNaN(duration) ? 10 : Math.floor(duration);
            if (modalDescription) modalDescription.value = '';
        });
    }

    // Click outside to collapse sidebar
    document.addEventListener('click', (e) => {
        // If sidebar is NOT collapsed
        if (!sidebar.classList.contains('collapsed')) {
            // Check if click was outside the sidebar AND outside any action card
            const clickedInsideSidebar = sidebar.contains(e.target);
            const clickedOnActionCard = e.target.closest('.action-card');
            
            if (!clickedInsideSidebar && !clickedOnActionCard) {
                sidebar.classList.add('collapsed');
                menuBtn.classList.remove('active');
            }
        }
    });

    // Fullscreen on click for dash videos
    const dashVideos = document.querySelectorAll('.dash-video');
    dashVideos.forEach(video => {
        video.style.cursor = 'pointer';
        video.addEventListener('click', () => {
            if (document.fullscreenElement) {
                document.exitFullscreen();
            } else {
                if (video.requestFullscreen) {
                    video.requestFullscreen();
                } else if (video.webkitRequestFullscreen) {
                    video.webkitRequestFullscreen();
                } else if (video.msRequestFullscreen) {
                    video.msRequestFullscreen();
                }
            }
        });
    });

    // Initial render of persisted clips
    renderAccidentClips();

    // First click alert for DEMO purpose
    const firstClickHandler = () => {
        alert("The videos in the website are only for DEMO purposes..");
        document.removeEventListener('click', firstClickHandler);
    };
    document.addEventListener('click', firstClickHandler);

    // Prototype Image Modal Logic
    const prototypeBadge = document.querySelector('.prototype-badge');
    const prototypeImageModal = document.getElementById('prototypeImageModal');
    const closePrototypeBtn = document.getElementById('closePrototypeBtn');

    if (prototypeBadge && prototypeImageModal) {
        prototypeBadge.addEventListener('click', (e) => {
            e.stopPropagation(); // prevent first click alert from triggering immediately or other handlers
            prototypeImageModal.classList.remove('hidden');
        });

        if (closePrototypeBtn) {
            closePrototypeBtn.addEventListener('click', () => {
                prototypeImageModal.classList.add('hidden');
            });
        }

        // Close on outside click
        prototypeImageModal.addEventListener('click', (e) => {
            if (e.target === prototypeImageModal) {
                prototypeImageModal.classList.add('hidden');
            }
        });
    }
});
