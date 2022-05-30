export function formatCurrency(price) {
    if (!price) return "0"
    
    price = String(price)
    return price.replace(/./g, function(c, i, a) {
        return i > 0 && c !== "." && (a.length - i) % 3 === 0 ? "," + c : c;
    });
}

export const categoryIconsMapper = {
    "ic_all.png": require("../assets/category_icons/ic_all.png"),

    "ic_transportation.png": require("../assets/category_icons/ic_transportation.png"),
    "ic_gift_donation.png": require("../assets/category_icons/ic_gift_donation.png"),
    "ic_food_beverage.png": require("../assets/category_icons/ic_food_beverage.png"),
    "ic_bills.png": require("../assets/category_icons/ic_bills.png"),
    "ic_shopping.png": require("../assets/category_icons/ic_shopping.png"),
    "ic_friend_lover.png": require("../assets/category_icons/ic_friend_lover.png"),
    "ic_entertainment.png": require("../assets/category_icons/ic_entertainment.png"),
    "ic_travel.png": require("../assets/category_icons/ic_travel.png"),
    "ic_health_fitness.png": require("../assets/category_icons/ic_health_fitness.png"),
    "ic_family.png": require("../assets/category_icons/ic_family.png"),
    "ic_education.png": require("../assets/category_icons/ic_education.png"),
    "ic_investment.png": require("../assets/category_icons/ic_investment.png"),
    "ic_business.png": require("../assets/category_icons/ic_business.png"),
    "ic_other_expense.png": require("../assets/category_icons/ic_other_expense.png"),

    "ic_salary.png": require("../assets/category_icons/ic_salary.png"),
    "ic_selling.png": require("../assets/category_icons/ic_selling.png"),
    "ic_interest_money.png": require("../assets/category_icons/ic_interest_money.png"),
    "ic_gift.png": require("../assets/category_icons/ic_gift.png"),
    "ic_award.png": require("../assets/category_icons/ic_award.png"),
    "ic_funding.png": require("../assets/category_icons/ic_funding.png"),
    "ic_other_income.png": require("../assets/category_icons/ic_other_income.png"),
}