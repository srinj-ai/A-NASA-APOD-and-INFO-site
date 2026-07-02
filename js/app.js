const apiKey = import.meta.env.VITE_NASA_API_KEY || 'DEMO_KEY';
const display = document.getElementById('display');

async function fetchImage(isRandom = false) {
    display.style.animation = 'none';
    display.offsetHeight;
    display.style.animation = 'fadeIn 0.8s ease-out';

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

        if (!item) throw new Error('No data received');

        document.getElementById('title').innerText = item.title;
        document.getElementById('image').src = item.url;
        document.getElementById('image').alt = item.title;
        document.getElementById('explanation').innerText = item.explanation;
    } catch (err) {
        console.error('Error fetching data:', err);

        document.getElementById('title').innerText = 'Oops! Something went wrong';
        document.getElementById('image').src = '';
        document.getElementById('explanation').innerText =
            'Could not load NASA APOD data. If you see rate-limit errors, add your own free API key ' +
            'from api.nasa.gov to the VITE_NASA_API_KEY variable in your .env file.';
    }
}

document.getElementById('randomBtn').addEventListener('click', () => fetchImage(true));

fetchImage();
