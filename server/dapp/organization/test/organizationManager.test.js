import { rest, util, assert } from 'blockapps-rest';
import config from '../../../load.config';
import dotenv from 'dotenv';
import RestStatus from "http-status-codes";
import organizationManagerJs from '../organizationManager';
import organizationJs from '../organization';
const loadEnv = dotenv.config()
const adminCredentials = { token: process.env.ADMIN_TOKEN };
const options = { config }

assert.isUndefined(loadEnv.error)

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

  it('Create CRO Organization - 201', async function () {
    // create contract
    const contract = await organizationManagerJs.uploadContract(adminUser);
    // create organization
    const args = {
      orgId: util.uid(),
      orgName:  'Clinlogix',
      orgType:  'CRO',
      isActive: 1 }
    const organization = await contract.createOrganization(args)
    assert.equal(organization.orgId, args.orgId, 'orgId')
  });

  it('Create Sponsor Organization - 201', async function () {
    // create contract
    const contract = await organizationManagerJs.uploadContract(adminUser);
    // create organization
    const args = {
      orgId: util.uid(),
      orgName:  'Merck',
      orgType:  'Sponsor',
      isActive: 1 }
    const organization = await contract.createOrganization(args)
    assert.equal(organization.orgId, args.orgId, 'orgId')
  });

});
