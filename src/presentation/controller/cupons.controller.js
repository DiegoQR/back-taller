class CuponsController {
    constructor(cuponsService) { // Depende del Caso de Uso
        this.cuponsService = cuponsService;
    }
    
    getAll = async (req, res) => { // Usamos arrow fn para no perder el 'this'
        const cupons = await this.cuponsService.getAllCupons();
        res.status(200).json(cupons);
    }

    getById = async (req, res) => {
        const { id } = req.params;
        const cupons = await this.cuponsService.getCuponsById(id);
        res.status(200).json(cupons);
    }

    create = async (req, res) => {
        const cupons = await this.cuponsService.createCupons(req.body);
        res.status(201).json(cupons); // 201 Created! 
    }

    update = async (req, res) => {
        const { id } = req.params;
        const cuponUpdated = await this.cuponsService.updateCupons(id, req.body);
        res.status(200).json(cuponUpdated);
    }

    delete = async (req, res) => {
        const { id } = req.params;
        await this.cuponsService.deleteCupons(id);
        res.status(204).send(); // 204 No Content
    }
}
module.exports = CuponsController;
