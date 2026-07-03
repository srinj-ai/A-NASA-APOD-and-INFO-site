const apiKey = import.meta.env.VITE_NASA_API_KEY || 'DEMO_KEY';

const elements = {
    display: document.getElementById('display'),
    randomBtn: document.getElementById('randomBtn'),
    status: document.getElementById('status'),
    title: document.getElementById('title'),
    image: document.getElementById('image'),
    video: document.getElementById('video'),
    explanation: document.getElementById('explanation'),
};

function setStatus(message) {
    elements.status.textContent = message;
}

function setLoadingState(isLoading) {
    elements.randomBtn.disabled = isLoading;
    elements.display.dataset.loading = String(isLoading);
    setStatus(isLoading ? 'Loading Astronomy Picture of the Day.' : 'Astronomy Picture of the Day loaded.');
}

function showError(message) {
    elements.title.textContent = 'Oops! Something went wrong';
    elements.image.hidden = true;
    elements.video.hidden = true;
    elements.image.removeAttribute('src');
    elements.video.removeAttribute('src');
    elements.explanation.textContent = message;
    setStatus('Failed to load Astronomy Picture of the Day.');
}

function renderMedia(item) {
    const isVideo = item.media_type === 'video';

    elements.image.hidden = isVideo;
    elements.video.hidden = !isVideo;

    if (isVideo) {
        elements.video.src = item.url;
        elements.image.removeAttribute('src');
        elements.image.alt = '';
    } else {
        elements.image.src = item.url;
        elements.image.alt = item.title;
        elements.video.removeAttribute('src');
    }
}

function renderApod(item) {
    elements.title.textContent = item.title;
    renderMedia(item);
    elements.explanation.textContent = item.explanation;
    setStatus(`Loaded ${item.title}.`);
}

async function fetchApod(isRandom = false) {
    setLoadingState(true);

    const url = isRandom
        ? `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&count=1`
        : `https://api.nasa.gov/planetary/apod?api_key=${apiKey}`;

    try {
        const response = await fetch(url);

        if (response.status === 429) {
            throw new Error('Rate limit exceeded.');
        }

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        const item = isRandom ? data[0] : data;

        if (!item) {
            throw new Error('No data received.');
        }

        renderApod(item);
    } catch (error) {
        console.error('Error fetching data:', error);
        showError(
            'Could not load NASA APOD data. If you see rate-limit errors, add your own free API key from api.nasa.gov to the VITE_NASA_API_KEY variable in your .env file.'
        );
    } finally {
        setLoadingState(false);
    }
}

elements.randomBtn.addEventListener('click', () => {
    fetchApod(true);
});

fetchApod();
