import { rest, util, assert } from 'blockapps-rest';
import config from '../../../load.config';
import dotenv from 'dotenv';
import RestStatus from "http-status-codes";
const loadEnv = dotenv.config()
assert.isUndefined(loadEnv.error)
import organizationManagerJs from '../organizationManager';
import factory from './organization.factory';
import organizationJs from '../organization';
const adminCredentials = { token: process.env.ADMIN_TOKEN };
const options = { config }

describe('Organiztion Manager Tests', function () {
  this.timeout(config.timeout);
  let adminUser, masterUser, manufacturerUser, distributorUser;
  before(async function () {
    assert.isDefined(adminCredentials.token, 'admin token is not defined');
    adminUser = await rest.createUser(adminCredentials, options);
  });

  it('Upload Organization Manager', async function () {
    const contract = await organizationManagerJs.uploadContract(adminUser);
    const state = await contract.getState()
    assert.isDefined(state.organizations, 'organizations')
  });

  it('Create Organization - 201', async function () {
    // create contract
    const contract = await organizationManagerJs.uploadContract(adminUser);
    // create organization
    const uid = util.uid()
    const args = {
        orgId: uid,
        orgName:  'Clinlogix',
        orgType:  'CRO',
        isActive: 1 }
    const organization = await contract.createOrganization(args)
    assert.equal(organization.orgId, args.orgId, 'orgId')
  });

});
