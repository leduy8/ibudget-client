export function formatCurrency(price) {
    if (!price) return "0";

    let isExpense = false;

    if (price < 0)
        isExpense = true;

    price = String(Math.abs(price));
    price = price.replace(/./g, function (c, i, a) {
        return i > 0 && c !== "." && (a.length - i) % 3 === 0 ? "," + c : c;
    });

    return isExpense ? "-" + price : price;
}