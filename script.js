const itemsContainer = document.getElementById('itemsContainer');
const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');

// Crear los elementos
for (let i = 1; i <= 25; i++) {
    const item = document.createElement('div');
    item.className = 'item';
    item.textContent = i;
    item.style.backgroundColor = getRandomColor();
    itemsContainer.appendChild(item);
}

const items = Array.from(document.querySelectorAll('.item'));

function getRandomColor() {
    const hue = Math.floor(Math.random() * 360);
    return `hsl(${hue}, 70%, 80%)`;
}

async function binarySearch(arr, target) {
    let left = 0;
    let right = arr.length - 1;

    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        const midValue = parseInt(arr[mid].textContent);

        // Resaltar el elemento actual
        arr[mid].classList.add('highlight');

        if (midValue === target) {
            return mid;
        } else if (midValue < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }

        // Pequeña pausa para visualizar el proceso
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Quitar el resaltado
        arr[mid].classList.remove('highlight');
    }

    return -1;
}

searchButton.addEventListener('click', async () => {
    const target = parseInt(searchInput.value);
    if (isNaN(target) || target < 1 || target > 25) {
        alert('Por favor, ingrese un número válido entre 1 y 25.');
        return;
    }

    // Resetear los estilos
    items.forEach(item => item.classList.remove('highlight'));

    const result = await binarySearch(items, target);

    if (result !== -1) {
        items[result].classList.add('highlight');
        alert(`¡Elemento encontrado en la posición ${result + 1}!`);
    } else {
        alert('Elemento no encontrado.');
    }
});