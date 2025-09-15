function getHanukkahDate(year) {
    // Hanukkah starts on the 25th day of Kislev in the Hebrew calendar
    // 2024: December 25, 2024 (evening)
    // 2025: December 14, 2025 (evening)
    const hanukkahDates = {
        2024: new Date('2024-12-25T18:00:00'),
        2025: new Date('2025-12-14T18:00:00'),
        2026: new Date('2026-12-04T18:00:00'),
        2027: new Date('2027-12-24T18:00:00'),
        2028: new Date('2028-12-12T18:00:00')
    };
    return hanukkahDates[year];
}

function updateCountdown() {
    const now = new Date();
    const currentYear = now.getFullYear();
    let hanukkahStart = getHanukkahDate(currentYear);

    // If this year's Hanukkah has passed, get next year's date
    if (now > hanukkahStart) {
        hanukkahStart = getHanukkahDate(currentYear + 1);
    }

    // Check if we're during Hanukkah (8 days from start)
    const hanukkahEnd = new Date(hanukkahStart.getTime() + (8 * 24 * 60 * 60 * 1000));

    if (now >= hanukkahStart && now <= hanukkahEnd) {
        document.getElementById('countdown-display').innerHTML =
            '<div class="hanukkah-message">It\'s Hanukkah!</div>';
        return;
    }

    const timeDiff = hanukkahStart - now;

    const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

    document.getElementById('countdown-display').innerHTML = `
        <div class="time-unit">
            <span class="time-number">${days}</span>
            <span class="time-label">Days</span>
        </div>
        <div class="time-unit">
            <span class="time-number">${hours}</span>
            <span class="time-label">Hours</span>
        </div>
        <div class="time-unit">
            <span class="time-number">${minutes}</span>
            <span class="time-label">Minutes</span>
        </div>
        <div class="time-unit">
            <span class="time-number">${seconds}</span>
            <span class="time-label">Seconds</span>
        </div>
    `;
}

// Update countdown immediately and then every second
updateCountdown();
setInterval(updateCountdown, 1000);