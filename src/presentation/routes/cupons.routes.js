const { Router } = require('express');
const CuponsController = require('../controller/cupons.controller');
const authenticateToken = require('../middlewares/auth.middleware');
const isAdmin = require('../middlewares/admin.middleware');
const asyncHandler = require('../utils/async.handler');

// Esta es la "Inyección de Dependencias" manual
const CuponsService = require('../../application/use-cases/cupons.service');

const CuponsMongoRepository = require('../../infrastructure/repositories/database/mongo/cupons.mongo.repository');
const cuponsRepository = new CuponsMongoRepository();

const cuponsService = new CuponsService(cuponsRepository);
const cuponsController = new CuponsController(cuponsService);

const router = Router();
/**
 * @swagger
 * /cupons:
 *   get:
 *     tags:
 *       - Cupons
 *     summary: Retrieve a list of the cupons
 *     responses:
 *       200:
 *         description: A list of cupons.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Cupon'
 */
router.get('/', asyncHandler(cuponsController.getAll));
/**
 * @swagger
 * /cupons/{id}:
 *   get:
 *     tags:
 *       - Cupons
 *     summary: Retrieve a single cupons by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A single cupons.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cupon'
 *       404:
 *         description: Cupons not found
 */
router.get('/:id', asyncHandler(cuponsController.getById));
/**
 * @swagger
 * /cupons:
 *   post:
 *     tags:
 *       - Cupons
 *     summary: Create a new cupons
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CuponInput'
 *     responses:
 *       201:
 *         description: The created cupons.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cupon'
 *       400:
 *         description: Bad request
 *       401:
 *         description: No token provided, authorization denied
 *       403:
 *         description: Admin privileges required
 *     security:
 *       - bearerAuth: []
 *
 */
router.post('/', [authenticateToken, isAdmin], asyncHandler(cuponsController.create));
/**
 * @swagger
 * /cupons/{id}:
 *   put:
 *     tags:
 *       - Cupons
 *     summary: Update a cupons
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CuponInput'
 *     responses:
 *       200:
 *         description: The updated cupons.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cupon'
 *       404:
 *         description: Cupon not found
 *       401:
 *         description: No token provided, authorization denied
 *       403:
 *         description: Admin privileges required
 *     security:
 *       - bearerAuth: []
 */
router.put('/:id', [authenticateToken, isAdmin], asyncHandler(cuponsController.update));
/**
 * @swagger
 * /cupons/{id}:
 *   delete:
 *     tags:
 *       - Cupons
 *     summary: Delete a cupons
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: No content
 *       404:
 *         description: User not found
 *       401:
 *         description: No token provided, authorization denied
 *       403:
 *         description: Admin privileges required
 *     security:
 *       - bearerAuth: []
 */
router.delete('/:id', [authenticateToken, isAdmin], asyncHandler(cuponsController.delete));

module.exports = router;
