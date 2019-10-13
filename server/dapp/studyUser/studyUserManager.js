import { rest, util, importer } from "blockapps-rest";
import config from "../../load.config";
import studyUserJs from "./studyuser";
import RestStatus from "http-status-codes";
const contractName = "StudyUserManager";
const contractFilename = `${util.cwd}/${config.dappPath}/studyuser/contracts/StudyUserManager.sol`;
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
  contract.createStudyUser = async function(args) {
    return await createStudyUser(token, contract, args, options);
  };
  return contract;
}

/*
 * Create Study User
 */
async function createStudyUser(token, contract, args) {
  const callArgs = {
    contract,
    method: "createStudyUser",
    args: util.usc(args)
  };
  const copyOfOptions = {
    ...options,
    history: [studyUserJs.contractName]
  };
  const [restStatus, studyUserError, studyUserAddress] = await rest.call(token, callArgs, copyOfOptions);
  if (restStatus != RestStatus.CREATED)
    throw new rest.RestError(restStatus, studyUserError, { callArgs });
  const contractArgs = {
    name: studyUserJs.contractName,
    address: studyUserAddress
  };
  const studyUser = await rest.waitForAddress(contractArgs, options);
  return studyUser
}

export default {
  uploadContract,
  bind
};
