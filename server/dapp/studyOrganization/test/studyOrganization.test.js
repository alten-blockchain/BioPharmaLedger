import { rest, util } from 'blockapps-rest';
import { assert } from 'chai';
import studyOrganizationJs from '../studyOrganization';
import config from '../../../load.config';
import dotenv from 'dotenv';
const loadEnv = dotenv.config()
const options = { config }
const adminCredentials = { token: process.env.ADMIN_TOKEN };
const masterCredentials = { token: process.env.MASTER_TOKEN };

assert.isUndefined(loadEnv.error)

describe('Study Organization Tests', function () {
  this.timeout(config.timeout);
  before(async function () {
    assert.isDefined(adminCredentials.token, 'admin token is not defined');
    assert.isDefined(masterCredentials.token, 'master token is not defined');
  });
  it('Create Study Organization contract', async function () {
    const args = {
      studyId: util.uid(),   
      orgId: util.uid(),
      isActive: 1,
      updateDate: '10-13-2019',
      updateBy: 'PJE'
    }
    const contract = await studyOrganizationJs.uploadContract(adminCredentials, args);
    const state = await contract.getState();
    assert.equal(state.orgId, args.orgId, 'orgId')
  });
});

