import { rest, util, importer } from "blockapps-rest";
import config from "../../load.config";
import studyOrganizationJs from "./studyorganization";
import RestStatus from "http-status-codes";
const contractName = "StudyOrganizationManager";
const contractFilename = `${util.cwd}/${config.dappPath}/studyorganization/contracts/StudyOrganizationManager.sol`;
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
  contract.createStudyOrganization = async function(args) {
    return await createStudyOrganization(token, contract, args, options);
  };
  return contract;
}

/*
 * Create Study Organization
 */
async function createStudyOrganization(token, contract, args) {
  const callArgs = {
    contract,
    method: "createStudyOrganization",
    args: util.usc(args)
  };
  const copyOfOptions = {
    ...options,
    history: [studyOrganizationJs.contractName]
  };
  const [restStatus, studyError, studyAddress] = await rest.call(token, callArgs, copyOfOptions);
  if (restStatus != RestStatus.CREATED)
    throw new rest.RestError(restStatus, studyError, { callArgs });
  const contractArgs = {
    name: studyOrganizationJs.contractName,
    address: studyOrganizationAddress
  };
  const studyOrganization = await rest.waitForAddress(contractArgs, options);
  return studyOrganization
}

export default {
  uploadContract,
  bind
};
