import { rest, util, importer } from "blockapps-rest";
import config from "../../load.config";
import OrganizationJs from "./organization";
import RestStatus from "http-status-codes";
const contractName = "OrganizationManager";
const contractFilename = `${util.cwd}/${config.dappPath}/organization/contracts/OrganizationManager.sol`;
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
  contract.createOrganization = async function(args) {
    return await createOrganization(token, contract, args, options);
  };
  return contract;
}

/*
 * Create Organization
 */
async function createOrganization(token, contract, args) {
  const callArgs = {
    contract,
    method: "createOrganization",
    args: util.usc(args)
  };
  const copyOfOptions = {
    ...options,
    history: [OrganizationJs.contractName]
  };
  const [restStatus, organizationError, organizationAddress] = await rest.call(token, callArgs, copyOfOptions);
  if (restStatus != RestStatus.CREATED)
    throw new rest.RestError(restStatus, organizationError, { callArgs });
  const contractArgs = {
    name: OrganizationJs.contractName,
    address: organizationAddress
  };
  const organization = await rest.waitForAddress(contractArgs, options);
  return organization
}

export default {
  uploadContract,
  bind
};
