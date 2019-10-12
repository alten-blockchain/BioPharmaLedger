import { rest, util } from 'blockapps-rest';
import { assert } from 'chai';
import factory from './organization.factory';
import organizationJs from '../organization';
import config from '../../../load.config';
import dotenv from 'dotenv';
const loadEnv = dotenv.config()
assert.isUndefined(loadEnv.error)
const options = { config }
const adminCredentials = { token: process.env.ADMIN_TOKEN };
const masterCredentials = { token: process.env.MASTER_TOKEN };

describe('Organization Tests', function () {
  this.timeout(config.timeout);
  before(async function () {
    assert.isDefined(adminCredentials.token, 'admin token is not defined');
    assert.isDefined(masterCredentials.token, 'master token is not defined');
  });

  it('Create Organization contract', async function () {
    const uid = util.uid()
    const args = factory.createArgs(uid);
    const contract = await organizationJs.uploadContract(adminCredentials, args);
    const state = await contract.getState();
    assert.equal(state.orgId, args.orgId, 'orgId')
  });

});
