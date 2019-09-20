import { rest, util, importer } from "blockapps-rest";
import config from "../../load.config";
import fileTransactionJs from "./fileTransaction";
import RestStatus from "http-status-codes";

 const contractName = "FileTransactionManager";
const contractFilename = `${util.cwd}/${config.dappPath}/fileTransaction/contracts/FileTransactionManager.sol`;

 async function uploadContract(token, options) {
  const contractArgs = {
    name: contractName,
    source: await importer.combine(contractFilename),
  };
  //console.log(contractArgs.source)  //  <<<<<<<<<<<<<<<  print the combined source here

   const contract = await rest.createContract(token, contractArgs, options);

   return bind(token, contract, options);
}

 function bind(token, _contract, options) {
  const contract = _contract;
  contract.getState = async function() {
    return await rest.getState(contract, options);
  };

  contract.createFileTransaction = async function(args) {
    return await createFileTransaction(token, contract, args, options);
  };

  contract.setDetails = async function(args) {
    return await setDetails(token, contract, args, options);
  };

  contract.getFileTransactions = async function(args) {
    return await getFileTransactions(token, contract, args);
  };

  contract.getFileTransaction = async function(fileTransactionId) {
    return await getFileTransaction(token, contract, fileTransactionId);
  };
  
  contract.getFileTransactionHistory = async function(fileTransactionId) {
    return await getFileTransactionHistory(token, contract, fileTransactionId);
  };

   return contract;
}

 async function createFileTransaction(token, contract, args, options) {

   const callArgs = {
    contract,
    method: "createFileTransaction",
    args: util.usc(args)
  };

   const copyOfOptions = {
    ...options,
    history: [fileTransactionJs.contractName]
  };

   const [restStatus, fileTransactionError, fileTransactionAddress] = await rest.call(token, callArgs, copyOfOptions);

   if (restStatus != RestStatus.CREATED)
    throw new rest.RestError(restStatus, fileTransactionError, { callArgs });

   const contractArgs = {
    name: fileTransactionJs.contractName,
    address: fileTransactionAddress
  };

   const fileTransaction = await rest.waitForAddress(contractArgs, options);
  return fileTransaction
}

 async function setDetails(token, contract, args, options) {

   const callArgs = {
    contract,
    method: "setDetails",
    args: util.usc(args)
  };

   const copyOfOptions = {
    ...options,
    history: [fileTransactionJs.contractName]
  };

   const [restStatus, fileTransactionError, address] = await rest.call(token, callArgs, copyOfOptions);

   if (restStatus != RestStatus.OK)
    throw new rest.RestError(restStatus, fileTransactionError, { callArgs });

   return address;
}

async function getFileTransactions(token, contract, args) {
  const { fileTransactions: fileTransactionsHashMap } = await rest.getState(contract, options);
  const hashmap = permissionHashmapJs.bindAddress(token, fileTransactionsHashMap);

  const name = "values";
  const values = await hashmap.getArray(name);
  const addresses = values.slice(1);

  const params = {
    address: args.address
      ? addresses.filter(a =>
          Array.isArray(args.address)
            ? args.address.indexOf(a) !== -1
            : a === args.address
        )
      : addresses,
    ...args
  };

  const contractArgs = {
    name: fileTransactionJs.contractName
  };

  const copyOfOptions = {
    ...options,
    query: {
      address: `in.${util.toCsv(params.address)}`
    }
  };

  const results = await rest.search(contractArgs, copyOfOptions);
  const converted = results.map(r => fileTransactionJs.fromBytes32(r));

  return converted;
}

async function getFileTransaction(token, contract, fileTransactionId) {
  const found = await exists(token, contract, fileTransactionId);

  if (!found) {
    throw new rest.RestError(RestStatus.NOT_FOUND, `fileTransactionId ${fileTransactionId} not found`);
  }

  const callArgs = {
    contract,
    method: "getFileTransaction",
    args: util.usc({ fileTransactionId })
  };

  const address = await rest.call(token, callArgs, options);

  const contractArgs = {
    name: fileTransactionJs.contractName
  };

  const copyOfOptions = {
    ...options,
    query: {
      address: `eq.${address}`
    }
  };

  const result = await rest.search(contractArgs, copyOfOptions);

  if (result.length != 1) {
    throw new rest.RestError(
      RestStatus.NOT_FOUND,
      `Unable to retrieve state for address ${address}`
    );
  }

  const converted = fileTransactionJs.fromBytes32(result[0]);

  return converted;
}

async function getFileTransactionHistory(token, contract, sku) {
  const found = await exists(token, contract, sku);

  if (!found) {
    throw new rest.RestError(restStatus.NOT_FOUND, `SKU ${sku} not found`);
  }

  const callArgs = {
    contract,
    method: "getFileTransaction",
    args: util.usc({ fileTransactionId })
  };

  const address = await rest.call(token, callArgs, options);

  const contractArgs = {
    name: `history@${fileTransactionJs.contractName}`
  };

  const copyOfOptions = {
    ...options,
    query: {
      address: `eq.${address}`
    }
  };

  const history = await rest.search(contractArgs, copyOfOptions);
  return history.map(h => fileTransactionJs.fromBytes32(h));
}

 export default {
  uploadContract,
  bind
};