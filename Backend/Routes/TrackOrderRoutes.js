import express from 'express';
import { createTrackOrder, getTrackOrders, getTrackOrderById, updateTrackOrder, deleteTrackOrder } from '../controllers/TrackOrderController.js';

const trackOrderRouter = express.Router();

trackOrderRouter.post('/trackorders', createTrackOrder);
trackOrderRouter.get('/trackorders', getTrackOrders);
trackOrderRouter.get('/trackorders/:id', getTrackOrderById);
trackOrderRouter.put('/trackorders/:id', updateTrackOrder);
trackOrderRouter.delete('/trackorders/:id', deleteTrackOrder);

export default trackOrderRouter;