const { Router } = require('express');
const RoleController = require('../controller/role.controller');
const RoleService = require('../../application/use-cases/role.service');
const RoleMongoRepository = require('../../infrastructure/repositories/database/mongo/role.mongo.repository');
const asyncHandler = require('../utils/async.handler');

const roleRepository = new RoleMongoRepository();
const roleService = new RoleService(roleRepository);
const roleController = new RoleController(roleService);

const router = Router();

/**
 * @swagger
 * /roles:
 *   get:
 *     tags:
 *       - Roles
 *     summary: Retrieve a list of roles
 *     responses:
 *       200:
 *         description: A list of roles.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Role'
 */
router.get('/', asyncHandler(roleController.getAll));
/**
 * @swagger
 * /roles/{id}:
 *   get:
 *     tags:
 *       - Roles
 *     summary: Retrieve a single role by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A single role.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Role'
 *       404:
 *         description: Role not found
 */
router.get('/:id', asyncHandler(roleController.getById));
/**
 * @swagger
 * /roles:
 *   post:
 *     tags:
 *       - Roles
 *     summary: Create a new role
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RoleInput'
 *     responses:
 *       201:
 *         description: The created role.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Role'
 *       400:
 *         description: Bad request
 *       409:
 *         description: Role with this name already exists
 */
router.post('/', asyncHandler(roleController.create));
/**
 * @swagger
 * /roles/{id}:
 *   put:
 *     tags:
 *       - Roles
 *     summary: Update a role
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
 *             $ref: '#/components/schemas/RoleInput'
 *     responses:
 *       200:
 *         description: The updated role.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Role'
 *       404:
 *         description: Role not found
 */
router.put('/:id', asyncHandler(roleController.update));
/**
 * @swagger
 * /roles/{id}:
 *   delete:
 *     tags:
 *       - Roles
 *     summary: Delete a role
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
 */
router.delete('/:id', asyncHandler(roleController.delete));

module.exports = router;
