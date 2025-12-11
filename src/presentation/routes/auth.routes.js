const express = require('express');
const router = express.Router();
const authController = require('../controller/auth.controller');
const asyncHandler = require('../utils/async.handler');

// @route   POST api/auth/login
// @desc    Authenticate user & get token
// @access  Public
/**
 * @swagger
 * /auth/login:
 *   post:
 *     tags:
 *       - Authentication
 *     summary: Authenticate user and get token
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: jhon.doe@example.com
 *               password:
 *                 type: string
 *                 example: password123
 *     responses:
 *       200:
 *         description: Successful authentication
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   example: example.jwt.token.here
 *                 user:
 *                   type: object
 *                   properties:
 *                    id:
 *                      type: string
 *                      example: 60c72b2f9b1e8a001f8e4cab
 *                    name:
 *                     type: string
 *                     example: John Doe
 *                    email: 
 *                      type: string
 *                      example: jhon.doe@example.com
 *                    roles:
 *                     type: array
 *                     items:
 *                      type: string
 *                     example: ['admin']
 * 
 *       400:
 *         description: Bad request
 *       401:
 *         description: Invalid credentials
 */
router.post('/login', asyncHandler(authController.login));

module.exports = router;
