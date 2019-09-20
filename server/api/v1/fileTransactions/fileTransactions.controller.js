import { rest } from 'blockapps-rest';

import dappJs from '../../../dapp/dapp/dapp';
//import bidJs from '../../../dapp/bid/bid';

import moment from 'moment';

class FileTransactionsController {

  static async getFileTransactions(req, res, next) {
    const { app, accessToken, query } = req;
    const args = { ...query };

    const deploy = app.get('deploy');

    try {
      const dapp = await dappJs.bind(accessToken, deploy.contract);
      const fileTransactions = await dapp.getFileTransactions(args);
      rest.response.status200(res, fileTransactions);
    } catch (e) {
      next(e)
    }
  }

  static async getFileTransaction(req, res, next) {
    const { app, accessToken } = req;
    const fileTransactionId = req.params.fileTransactionId;

    if (!fileTransactionId) {
      rest.response.status400(res, 'Missing fileTransactionId')
      return next();
    }

    const deploy = app.get('deploy');

    try {
      const dapp = await dappJs.bind(accessToken, deploy.contract);
      const fileTransaction = await dapp.getFileTransaction(fileTransactionId);
      const fileTransactiontHistory = await dapp.getFileTransactionHistory(fileTransactionId)

      const histories = [
        ...fileTransactiontHistory.map(h => { return { ...h, type: 'FILETRANSACTION' } }),
        //...bidHistory.map(h => { return { ...h, type: 'BID' } })
      ];

      fileTransaction.history = histories.sort(
        (h1, h2) => moment(h1.block_timestamp).unix() - moment(h2.block_timestamp).unix()
      )

      rest.response.status200(res, fileTransaction);
    } catch (e) {
      next(e)
    }
  }

  static async createFileTransaction(req, res, next) {
    const { app, accessToken, body } = req;
    const fileTransactionArgs = { ...body.fileTransaction };
    const args = {fileTransactionId: fileTransactionArgs.fileTransactionId};

    try {
      const deploy = app.get('deploy');
      const dapp = await dappJs.bind(accessToken, deploy.contract);
      const fileTransaction = await dapp.createFileTransaction(args);
      console.log('>>>>>>>>>>>>fileTransaction = ', fileTransaction);
      rest.response.status200(res, fileTransaction);
    } catch (e) {
      next(e)
    }
  }

  /*

  // TODO: throw errors correctly from dapp
  static async createAssetOld(req, res, next) {
    const { app, accessToken, body } = req;
    const args = { ...body.asset };

    if (
      !Array.isArray(args.keys)
      || !Array.isArray(args.values)
      || args.keys.length !== args.values.length
    ) {
      rest.response.status400(res, 'Missing spec or bad spec format');
      return next();
    }

    try {
      const deploy = app.get('deploy');
      const dapp = await dappJs.bind(accessToken, deploy.contract);
      const asset = await dapp.createAsset(args);
      rest.response.status200(res, asset);
    } catch (e) {
      next(e)
    }
  }

  static async handleAssetEvent(req, res, next) {
    const { app, accessToken, body, params } = req;
    const { assetEvent } = body;
    const { sku } = params;

    // Get sku and assetEvent
    const args = { sku, assetEvent: parseInt(assetEvent, 10) };

    const deploy = app.get('deploy');
    try {
      const dapp = await dappJs.bind(accessToken, deploy.contract);
      const newState = await dapp.handleAssetEvent(args);
      rest.response.status200(res, newState);
    } catch (e) {
      next(e)
    }
  }

  static async transferOwnership(req, res, next) {
    const { app, accessToken, body } = req;
    const { sku, owner } = body;

    // Get sku and assetEvent
    const args = { sku, owner };

    const deploy = app.get('deploy');

    try {
      const dapp = await dappJs.bind(accessToken, deploy.contract);
      const newState = await dapp.transferOwnership(args);
      rest.response.status200(res, newState);
    } catch (e) {
      next(e)
    }
  }

  */
}

export default FileTransactionsController;
