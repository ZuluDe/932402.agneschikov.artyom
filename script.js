const name = prompt('Введите ваше имя:');
const user = name?.trim() || 'Гость';

const volumes = [75, 85, 92, 111, 74, 98, 68];

function getSum(arr) {
    let sum = 0;
    for (let i = 0; i < arr.length; i++) {
        sum += arr[i];
    }
    return sum;
}

function getMax(arr) {
    let max = arr[0];
    for (let i = 1; i < arr.length; i++) {
        if (arr[i] > max) {
            max = arr[i];
        }
    }
    return max;
}

function getLoud(arr) {
    const res = [];
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] > 90) {
            res.push(arr[i]);
        }
    }
    return res;
}

function getQuiet(arr) {
    let count = 0;
    let sum = 0;
    
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] <= 75) {
            count++;
            sum += arr[i];
        }
    }
    
    const avg = count > 0 ? (sum / count).toFixed(0) : 0;
    
    return { count, avg }; 
}

const total = getSum(volumes);
const avg = (total / volumes.length).toFixed(0);
const loud = getLoud(volumes);
const max = getMax(volumes);
const quiet = getQuiet(volumes);

alert(`Привет, ${user}! Средняя громкость – ${avg} дБ, ${loud.length} треков – громкие`);

console.log(`Количество тихих треков: ${quiet.count}`);
console.log(`Средняя громкость тихих треков: ${quiet.avg} дБ`);

if (max >= 105) {
    console.warn(`Максимальная громкость ${max} дБ. Такая громкость может повредить слух — используйте наушники с ограничением!`);
}

const audios = document.querySelectorAll('audio');

audios.forEach(a => {
    a.addEventListener('play', () => {
        audios.forEach(other => {
            if (other !== a) {
                other.pause();
            }
        });
    });
});


const themeBtn = document.getElementById('theme-btn');
const addBtn = document.getElementById('add-btn');
const clearBtn = document.getElementById('clear-btn');
const hideBtn = document.getElementById('hide-btn');
const list = document.querySelector('.playlist-list');

function savePlaylist() {
    const items = document.querySelectorAll('.track-item');
    const data = [];

    for (let i = 0; i < items.length; i++) {
        const text = items[i].querySelector('span').textContent;
        const fav = items[i].querySelector('input').checked;
        data.push({ text, fav });
    }

    localStorage.setItem('playlist', JSON.stringify(data));
}

function createTrack(text, isFav) {
    if (!list) {
        console.error('Элемент списка не найден');
        return;
    }

    const li = document.createElement('li');
    li.className = 'track-item';

    const span = document.createElement('span');
    span.textContent = text;

    const label = document.createElement('label');
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = isFav;
    checkbox.addEventListener('change', savePlaylist);

    label.appendChild(checkbox);
    label.append('Избранное');

    const delBtn = document.createElement('button');
    delBtn.textContent = 'Удалить';
    delBtn.addEventListener('click', () => {
        li.remove();
        savePlaylist();
    });

    li.appendChild(span);
    li.appendChild(label);
    li.appendChild(delBtn);

    list.appendChild(li);
}

if (!themeBtn || !addBtn || !clearBtn || !hideBtn || !list) {
    console.error('Ошибка: не все элементы найдены на странице');
} else {
    if (localStorage.getItem('theme') === 'light') {
        document.body.classList.add('light-theme');
    }

    const saved = JSON.parse(localStorage.getItem('playlist'));
    if (saved) {
        for (let i = 0; i < saved.length; i++) {
            createTrack(saved[i].text, saved[i].fav);
        }
    }

    themeBtn.addEventListener('click', () => {
        document.body.classList.toggle('light-theme');
        const isLight = document.body.classList.contains('light-theme');
        localStorage.setItem('theme', isLight ? 'light' : 'dark');
    });

    addBtn.addEventListener('click', () => {
        const title = prompt('Введите название трека:');
        const time = prompt('Введите длительность (например, 2:30):');

        if (title && time) {
            createTrack(`${title.trim()} (${time.trim()})`, false);
            savePlaylist();
        }
    });

    clearBtn.addEventListener('click', () => {
        const items = document.querySelectorAll('.track-item');
        if (items.length === 0) {
            alert('Плейлист уже пуст');
            return;
        }

        for (let i = 0; i < items.length; i++) {
            items[i].remove();
        }
        savePlaylist();
    });

    hideBtn.addEventListener('click', () => {
        list.classList.toggle('hidden');
    });
}