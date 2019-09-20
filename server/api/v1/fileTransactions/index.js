import express from 'express';
const router = express.Router();
import FileTransactionsController from './fileTransactions.controller';

router.get('/', FileTransactionsController.getFileTransaction);
router.get('/:fileTransactionId', FileTransactionsController.getFileTransaction);
router.post('/', FileTransactionsController.createFileTransaction);
//router.post('/:sku/event', FileTransactionsController.handleAssetEvent);
//router.post('/transferOwnership', FileTransactionsController.transferOwnership);

export default router;
