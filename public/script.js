document.addEventListener('DOMContentLoaded', () => {
    // Test Selector
    const testButtons = document.querySelectorAll('.test-btn');
    const testContainers = document.querySelectorAll('.test-container');

    testButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons and containers
            testButtons.forEach(btn => btn.classList.remove('active'));
            testContainers.forEach(container => container.classList.remove('active'));

            // Add active class to clicked button and corresponding container
            button.classList.add('active');
            document.getElementById(`${button.dataset.test}-test`).classList.add('active');
        });
    });

    // Click Test
    const clickZone = document.getElementById('click-zone');
    const startClickTestBtn = document.getElementById('start-click-test');
    const resetClickTestBtn = document.getElementById('reset-click-test');
    const clickTimer = document.getElementById('click-timer');
    const clickCount = document.getElementById('click-count');
    const clickCps = document.getElementById('click-cps');

    let clickTestRunning = false;
    let clickTestTimer;
    let clickTestCountdown;
    let totalClicks = 0;

    const resetClickTest = () => {
        clickTestRunning = false;
        clearInterval(clickTestTimer);
        clearInterval(clickTestCountdown);
        
        clickZone.textContent = 'Click here to test';
        clickZone.style.cursor = 'pointer';
        
        clickTimer.textContent = '5.00s';
        clickCount.textContent = '0';
        clickCps.textContent = '0.00';
        
        startClickTestBtn.style.display = 'inline-block';
        resetClickTestBtn.style.display = 'none';
    }

    const startClickTest = () => {
        if (clickTestRunning) return;
        
        totalClicks = 0;
        clickTestRunning = true;
        
        let timeLeft = 5;
        
        clickZone.textContent = 'Click here !';
        startClickTestBtn.style.display = 'none';
        resetClickTestBtn.style.display = 'inline-block';
        
        clickTestCountdown = setInterval(() => {
            timeLeft = Math.max(0, timeLeft - 0.01);
            clickTimer.textContent = timeLeft.toFixed(2) + 's';
        }, 10);
        
        clickTestTimer = setTimeout(() => {
            clearInterval(clickTestCountdown);
            clickTestRunning = false;
            
            clickZone.textContent = 'Test Complete!';
            clickZone.style.cursor = 'default';
            
            const cpsValue = (totalClicks / 5).toFixed(2);
            clickCps.textContent = cpsValue;
        }, 5000);
    }

    clickZone.addEventListener('click', () => {
        if (!clickTestRunning) return;
        totalClicks++;
        clickCount.textContent = totalClicks;
    });

    startClickTestBtn.addEventListener('click', startClickTest);
    resetClickTestBtn.addEventListener('click', resetClickTest);

    // Keyboard Test
    const keyboardZone = document.getElementById('keyboard-zone');
    const resetKeyboardTestBtn = document.getElementById('reset-keyboard-test');
    const lockedKey = document.getElementById('locked-key');
    const singleInputs = document.getElementById('single-inputs');
    const doubleInputs = document.getElementById('double-inputs');
    const keyboardStatus = document.getElementById('keyboard-status');

    let keyboardTestActive = false;
    let currentKeyCode = null;
    let singleInputCount = 0;
    let doubleInputCount = 0;
    let lastKeyPressTime = 0;

    const resetKeyboardTest = () => {
        keyboardTestActive = false;
        currentKeyCode = null;
        singleInputCount = 0;
        doubleInputCount = 0;
        lastKeyPressTime = 0;

        lockedKey.textContent = '-';
        singleInputs.textContent = '0';
        doubleInputs.textContent = '0';
        keyboardStatus.textContent = 'Waiting for input';
        keyboardZone.textContent = 'Press any key to start';
    }

    // Use document-level event listener to capture keystrokes
    document.addEventListener('keydown', (event) => {
        // Ensure the keyboard test container is active
        if (!document.getElementById('keyboard-test').classList.contains('active')) return;

        if (!keyboardTestActive) {
            keyboardTestActive = true;
            currentKeyCode = event.code;
            lockedKey.textContent = currentKeyCode;
        }

        if (event.code === currentKeyCode) {
            const currentTime = Date.now();
            const timeSinceLastPress = currentTime - lastKeyPressTime;

            if (timeSinceLastPress < 50) {
                doubleInputCount++;
                doubleInputs.textContent = doubleInputCount;
                keyboardStatus.textContent = `Double input: ${event.code}`;
                keyboardZone.textContent = event.code;
            } else {
                singleInputCount++;
                singleInputs.textContent = singleInputCount;
                keyboardStatus.textContent = `Input recorded`;
                keyboardZone.textContent = event.code;
            }

            lastKeyPressTime = currentTime;
        }
    });

    resetKeyboardTestBtn.addEventListener('click', resetKeyboardTest);

    // Initial reset of both tests
    resetClickTest();
    resetKeyboardTest();
});
