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