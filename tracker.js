const visitorData = {
    visitors: JSON.parse(localStorage.getItem('visitors') || '[]')
};

function updateVisitorStats() {
    const totalVisitors = visitorData.visitors.length;
    document.getElementById('totalVisitors').textContent = totalVisitors;

    const dailyStats = {};
    visitorData.visitors.forEach(visitor => {
        const date = visitor.timestamp.split('T')[0];
        dailyStats[date] = (dailyStats[date] || 0) + 1;
    });

    const dailyStatsHtml = Object.entries(dailyStats)
        .sort((a, b) => b[0].localeCompare(a[0]))
        .map(([date, count]) => `
            <div class="stat-box">
                <strong>${formatDate(date)}:</strong> ${count} visitor${count !== 1 ? 's' : ''}
            </div>
        `).join('');

    document.getElementById('dailyStats').innerHTML = dailyStatsHtml;
}

function formatDate(dateStr) {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

function getVisitorInfo() {
    const visitor = {
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
        language: navigator.language,
        platform: navigator.platform,
        screenResolution: `${window.screen.width}x${window.screen.height}`,
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        referrer: document.referrer || 'Direct',
        visitCount: visitorData.visitors.find(v => v.userAgent === navigator.userAgent) ? visitorData.visitors.find(v => v.userAgent === navigator.userAgent).visitCount + 1 : 1
    };

    try {
        fetch('https://api.ipify.org?format=json')
            .then(response => response.json())
            .then(data => {
                visitor.ip = data.ip;
                saveVisitor(visitor);
            })
            .catch(() => {
                visitor.ip = 'Not available';
                saveVisitor(visitor);
            });
    } catch {
        visitor.ip = 'Not available';
        saveVisitor(visitor);
    }
}

function saveVisitor(visitor) {
    const existingVisitor = visitorData.visitors.find(v => v.userAgent === visitor.userAgent);
    if (existingVisitor) {
        existingVisitor.visitCount = visitor.visitCount;
    } else {
        visitorData.visitors.push(visitor);
    }
    localStorage.setItem('visitors', JSON.stringify(visitorData.visitors));
    updateVisitorStats();
    downloadVisitorData();
}

function downloadVisitorData() {
    const dataStr = JSON.stringify(visitorData.visitors, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = 'visitor_data.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

getVisitorInfo();
updateVisitorStats();
