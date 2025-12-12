const OrderRepository = require('../../../../domain/repositories/order.repository.interface');
const OrderModel = require('./models/order.model');
const Order = require('../../../../domain/entities/order.entity');

class OrderMongoRepository extends OrderRepository {
    async getAll() {
        const orders = await OrderModel.find();
        return orders.map(o => new Order(o._id.toString(), o.products, o.description, o.quantity, o.discount, o.totalPrice));
    }

    async getById(id) {
        const order = await OrderModel.findById(id);
        if (!order) return null;
        return new Order(order._id.toString(), order.products, order.description, order.quantity, order.discount, order.totalPrice);
    }

    async create(orderEntity) {
        const newOrder = new OrderModel({
            products: orderEntity.products,
            description: orderEntity.description,
            quantity: orderEntity.quantity,
            discount: orderEntity.discount,
            totalPrice: orderEntity.totalPrice
        });
        const savedOrder = await newOrder.save();
        return new Order(savedOrder._id.toString(), savedOrder.products, savedOrder.description, savedOrder.quantity, savedOrder.discount, savedOrder.totalPrice);
    }

    async update(id, orderEntity) {
        const updatedOrder = await OrderModel.findByIdAndUpdate(id, {
            products: orderEntity.products,
            description: orderEntity.description,
            quantity: orderEntity.quantity,
            discount: orderEntity.discount,
            totalPrice: orderEntity.totalPrice
        }, { new: true });

        if (!updatedOrder) return null;
        return new Order(updatedOrder._id.toString(), updatedOrder.products, updatedOrder.description, updatedOrder.quantity, updatedOrder.discount, updatedOrder.totalPrice);
    }

    async delete(id) {
        await OrderModel.findByIdAndDelete(id);
    }
}

module.exports = OrderMongoRepository;