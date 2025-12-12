class Order {
    constructor(id, products, description, quantity, discount, totalPrice) {
        this.id = id;
        this.products = products;
        this.description = description;
        this.quantity = quantity;
        this.discount = discount;
        this.totalPrice = totalPrice;
    }
}

module.exports = Order;