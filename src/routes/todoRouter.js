import { getAllTodo, createTodo, findTodoById, updateTodoById, removeTodo } from '../controllers/todoController.js';
import { Router } from 'express';
const router = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Todo:
 *       type: object
 *       required:
 *         - name
 *         - priority
 *         - completed
 *       example:
 *         name: Play golf
 *         priority: "Medium"
 *         completed: false
 */

/**
 * @swagger
 * tags:
 *   name: Admin
 *   description: The admin manage api
 */

/**
 * @swagger
 * /todo:
 *   post:
 *     summary: Create a new todo
 *     tags: [Admin]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Todo'
 *     responses:
 *       200:
 *         description: The todo was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Todo'
 *       500:
 *         description: Some server error
 */
router.post('/', createTodo);

/**
 * @swagger
 * /todo:
 *   get:
 *     summary: Returns the list of all the todo
 *     tags: [Admin]
 *     responses:
 *       200:
 *         description: The list of the todo
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Todo'
 */
router.get('/', getAllTodo);

/**
 * @swagger
 * /todo/{id}:
 *   get:
 *     summary: Get the todo by id
 *     tags: [Admin]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The todo id
 *     responses:
 *       200:
 *         description: The todo description by id
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Todo'
 *       404:
 *         description: The todo was not found
 */
router.get('/:id', findTodoById);

/**
 * @swagger
 * /todo/{id}:
 *  patch:
 *    summary: Update the todo by the id
 *    tags: [Admin]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The todo id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Todo'
 *    responses:
 *      200:
 *        description: The todo was updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Todo'
 *      404:
 *        description: The todo was not found
 *      500:
 *        description: Some error happened
 */
router.patch('/:id', updateTodoById);

/**
 * @swagger
 * /todo/{id}:
 *   delete:
 *     summary: Remove the todo by id
 *     tags: [Admin]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The todo id
 *
 *     responses:
 *       200:
 *         description: The todo was deleted
 *       404:
 *         description: The todo was not found
 */
router.delete('/:id', removeTodo);

export default router;
