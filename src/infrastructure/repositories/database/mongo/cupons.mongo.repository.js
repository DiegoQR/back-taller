const CuponsRepository = require('../../../../domain/repositories/cupons.repository.interface');
const CuponsModel = require('./models/cupons.models')
const Cupons = require('../../../../domain/entities/cupons.entity');

class CuponsMongoRepository extends CuponsRepository {
    async getAll() {
        const cupons = await CuponsModel.find();
        return cupons.map(c => new Cupons(c._id.toString(), c.description, c.price, c.category));
    }

    async getById(id) {
        const cupons = await CuponsModel.findById(id);
        if (!cupons) return null;
        return new Cupons(cupons._id.toString(), cupons.description, cupons.price, cupons.category);
    }

    async create(cuponsEntity) {
        const newCupons = new CuponsModel({
            description: cuponsEntity.description,
            price: cuponsEntity.price,
            category: cuponsEntity.category,
        });
        const savedCupons = await newCupons.save();
        return new Cupons(savedCupons._id.toString(), savedCupons.description, savedCupons.price, savedCupons.category);
    }

    async update(id, cuponsEntity) {
        const updatedCupons = await CuponsModel.findByIdAndUpdate(id, {
            description: cuponsEntity.description,
            price: cuponsEntity.price,
            category: cuponsEntity.category,
        }, { new: true });
        
        if (!updatedCupons) return null;
        return new Cupons(updatedCupons._id.toString(), updatedCupons.description, updatedCupons.price, updatedCupons.category);
    }

    async delete(id) {
        await CuponsModel.findByIdAndDelete(id);
    }
}

module.exports = CuponsMongoRepository;