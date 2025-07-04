const convertButton = document.getElementById("button");
const amountInput = document.getElementById("amount");
const fromCurrency = document.getElementById("from-currency");
const toCurrency = document.getElementById("to-currency");
const resultText = document.querySelector(".exchange-rate");

convertButton.addEventListener("click", () => {
    const amountValue = parseFloat(amountInput.value);
    const fromValue = fromCurrency.value;
    const toValue = toCurrency.value;

    console.log("Valor digitado:", amountValue);
    console.log("De:", fromValue);
    console.log("Para:", toValue);

    // Validação
    if (isNaN(amountValue) || amountValue <= 0) {
        resultText.textContent = "Enter a valid value";
        resultText.className = "exchange-rate error";
        return;
    }

    // Se for a mesma moeda
    if (fromValue === toValue) {
        resultText.textContent = `${amountValue} ${fromValue} = ${amountValue.toFixed(2)} ${toValue}`;
        resultText.className = "exchange-rate success";
        return;
    }

    // Monta URL com base na ordem das moedas
    const apiURL = `https://v6.exchangerate-api.com/v6/9650b52f9765a75e61e63317/pair/${fromValue}/${toValue}/${amountValue}`;
    console.log("URL da API:", apiURL);

    // 🌐 Chamada da API
    fetch(apiURL)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            const converted = data.conversion_result;
            resultText.textContent = `${amountValue} ${fromValue} = ${converted.toFixed(2)} ${toValue}`;
            resultText.className = "exchange-rate success";
        })
        .catch(() => {
            resultText.textContent = "Error fetching exchange rate.";
            resultText.className = "exchange-rate error";
        });
});

const swapButton = document.getElementById("swap-button");
swapButton.addEventListener("click", () => {
    
    const temp = fromCurrency.value;
    fromCurrency.value = toCurrency.value;
    toCurrency.value = temp;
    convertButton.click();

})

