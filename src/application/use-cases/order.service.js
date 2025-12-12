const Order = require('../../domain/entities/order.entity');

class OrderService {
    constructor(orderRepository) {
        this.orderRepository = orderRepository;
    }

    async getAllOrders() {
        return this.orderRepository.getAll();
    }

    async getOrderById(id) {
        return this.orderRepository.getById(id);
    }

    async createOrder(orderData) {
        const orderEntity = new Order(
            null,
            orderData.products,
            orderData.description,
            orderData.quantity,
            orderData.discount,
            orderData.totalPrice
        );
        return this.orderRepository.create(orderEntity);
    }

    async updateOrder(id, orderData) {
        const orderEntity = new Order(
            id,
            orderData.products,
            orderData.description,
            orderData.quantity,
            orderData.discount,
            orderData.totalPrice
        );
        return this.orderRepository.update(id, orderEntity);
    }

    async deleteOrder(id) {
        return this.orderRepository.delete(id);
    }
}

module.exports = OrderService;