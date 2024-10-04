// app.js
document.getElementById('addCryptoBtn').addEventListener('click', function() {
    const cryptoContainer = document.querySelector('.crypto-container');

    const newCrypto = document.createElement('div');
    newCrypto.classList.add('crypto-item');

    // Example of dynamically adding a new crypto item
    newCrypto.innerHTML = `
        <span class="crypto-name">Ethereum (ETH)</span>
        <span class="price-current">Price: $3,000</span>
        <span class="price-buy">Buy: $2,900</span>
        <span class="price-sell">Sell: $3,050</span>
    `;

    cryptoContainer.appendChild(newCrypto);
});

document.getElementById('fetchPricesBtn').addEventListener('click', function() {
    // Logic to fetch updated prices from API will be added here
    console.log("Fetching updated prices...");
});
// CoinGecko API URL
const apiURL = 'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=usd';

// Função para buscar preços da API
function fetchCryptoPrices() {
    fetch(apiURL)
        .then(response => response.json())
        .then(data => {
            // Atualiza os preços de Bitcoin e Ethereum
            updatePrice('Bitcoin (BTC)', data.bitcoin.usd);
            updatePrice('Ethereum (ETH)', data.ethereum.usd);
        })
        .catch(error => {
            console.error('Erro ao buscar preços:', error);
        });
}

// Função para atualizar o preço no DOM
function updatePrice(cryptoName, currentPrice) {
    const cryptoItems = document.querySelectorAll('.crypto-item');
    cryptoItems.forEach(item => {
        const nameElement = item.querySelector('.crypto-name');
        if (nameElement.textContent.includes(cryptoName)) {
            const priceElement = item.querySelector('.price-current');
            priceElement.textContent = `Price: $${currentPrice}`;
        }
    });
}

// Evento para buscar preços ao clicar no botão
document.getElementById('fetchPricesBtn').addEventListener('click', fetchCryptoPrices);

// Atualização automática a cada 1 hora
setInterval(fetchCryptoPrices, 3600000);
