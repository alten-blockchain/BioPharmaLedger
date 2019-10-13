import { rest, util, assert } from 'blockapps-rest';
import config from '../../../load.config';
import dotenv from 'dotenv';
import RestStatus from "http-status-codes";
import studyOrganizationManagerJs from '../studyOrganizationManager';
import studyOrganizationJs from '../studyOrganization';
const loadEnv = dotenv.config()
const adminCredentials = { token: process.env.ADMIN_TOKEN };
const options = { config }

assert.isUndefined(loadEnv.error)

describe('Study Organiztion Manager Tests', function () {
  this.timeout(config.timeout);
  let adminUser, masterUser, manufacturerUser, distributorUser;
  before(async function () {
    assert.isDefined(adminCredentials.token, 'admin token is not defined');
    adminUser = await rest.createUser(adminCredentials, options);
  });

  it('Upload Study Organization Manager', async function () {
    const contract = await studyOrganizationManagerJs.uploadContract(adminUser);
    const state = await contract.getState()
    assert.isDefined(state.studyOrganizations, 'studyOrganizations')
  });

  it('Create Study Organization - 201', async function () {
    // create contract
    const contract = await studyOrganizationManagerJs.uploadContract(adminUser);
    // create study organization
    const args = {
      studyId: util.uid(),
      orgId: util.uid(),
      isActive: 1,
      updateDate: '10-13-2019',
      updateBy: 'PJE' }
    const studyOrganization = await contract.createStudyOrganization(args)
    assert.equal(studyOrganization.orgId, args.orgId, 'orgId')
    });
  });
  
