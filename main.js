const populate = async (amount, fromCurrency, toCurrency) => {
    let url = `https://v6.exchangerate-api.com/v6/c8e47a866962726ed868cda2/pair/${fromCurrency}/${toCurrency}`;
    let response = await fetch(url);
    let rJson = await response.json();

    if (rJson.result === "success") {
        document.querySelector(".output").style.display = "block";
        const conversionRate = rJson.conversion_rate;
        const convertedValue = (conversionRate * amount).toFixed(2);

        const tableBody = document.querySelector("tbody");
        tableBody.innerHTML = `
            <tr>
                <td>${amount}</td>
                <td>${fromCurrency}</td>
                <td>${toCurrency}</td>
                <td>${convertedValue}</td>
            </tr>
        `;
    } else {
        alert("Failed to retrieve conversion rate. Please try again later.");
    }
}

const btn = document.querySelector(".btn");
btn.addEventListener("click", (e) => {
    e.preventDefault();
    const amount = (document.querySelector("input[name='quantity']").value);
    const fromCurrency = document.querySelector("select[name='from-currency']").value;
    const toCurrency = document.querySelector("select[name='to-currency']").value;
    populate(amount, fromCurrency, toCurrency);
});
