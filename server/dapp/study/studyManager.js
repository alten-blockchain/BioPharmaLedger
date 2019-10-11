import { rest, util, importer } from "blockapps-rest";
import config from "../../load.config";
import studyJs from "./study";
import RestStatus from "http-status-codes";
const contractName = "StudyManager";
const contractFilename = `${util.cwd}/${config.dappPath}/study/contracts/StudyManager.sol`;
const options = { config };

/*
 * Upload Contract
 */
async function uploadContract(token) {
  const contractArgs = {
    name: contractName,
    source: await importer.combine(contractFilename),
  };
  const contract = await rest.createContract(token, contractArgs, options);
  return bind(token, contract);
}

/*
 * Bind
 */
function bind(token, _contract) {
  const contract = _contract;
  contract.getState = async function() {
    return await rest.getState(contract, options);
  };
  contract.createStudy = async function(args) {
    return await createStudy(token, contract, args, options);
  };
  contract.setTherapeuticArea = async function(args) {
    return await setTherapeuticArea(token, contract, args, options);
  };
  return contract;
}

/*
 * Create Study
 */
async function createStudy(token, contract, args) {
  const callArgs = {
    contract,
    method: "createStudy",
    args: util.usc(args)
  };
  const copyOfOptions = {
    ...options,
    history: [studyJs.contractName]
  };
  const [restStatus, studyError, studyAddress] = await rest.call(token, callArgs, copyOfOptions);
  if (restStatus != RestStatus.CREATED)
    throw new rest.RestError(restStatus, studyError, { callArgs });
  const contractArgs = {
    name: studyJs.contractName,
    address: studyAddress
  };
  const study = await rest.waitForAddress(contractArgs, options);
  return study
}

/*
 * Set Therapeutic Area
 */
async function setTherapeuticArea(token, contract, args) {
  const callArgs = {
    contract,
    method: "setTherapeuticArea",
    args: util.usc(args)
  };
  const copyOfOptions = {
    ...options,
    history: [studyJs.contractName]
  };
  const [restStatus] = await rest.call(token, callArgs, copyOfOptions);
  if (restStatus != RestStatus.OK)
    throw new rest.RestError(restStatus, {}, { callArgs });
  return restStatus
}

export default {
  uploadContract,
  bind
};
