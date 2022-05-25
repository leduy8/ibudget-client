export function formatCurrency(price) {
    if (!price) return "0"
    
    price = String(price)
    return price.replace(/./g, function(c, i, a) {
        return i > 0 && c !== "." && (a.length - i) % 3 === 0 ? "," + c : c;
    });
}