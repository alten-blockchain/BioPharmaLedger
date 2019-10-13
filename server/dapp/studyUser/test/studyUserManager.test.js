import { rest, util, assert } from 'blockapps-rest';
import config from '../../../load.config';
import dotenv from 'dotenv';
import RestStatus from "http-status-codes";
import studyUserManagerJs from '../studyUserManager';
import studyUserJs from '../studyUser';
const loadEnv = dotenv.config()
const adminCredentials = { token: process.env.ADMIN_TOKEN };
const options = { config }

assert.isUndefined(loadEnv.error)
describe('Study User Manager Tests', function () {
  this.timeout(config.timeout);
  let adminUser, masterUser, manufacturerUser, distributorUser;
  before(async function () {
    assert.isDefined(adminCredentials.token, 'admin token is not defined');
    adminUser = await rest.createUser(adminCredentials, options);
  });

  it('Upload Study User Manager', async function () {
    const contract = await studyUserManagerJs.uploadContract(adminUser);
    const state = await contract.getState()
    assert.isDefined(state.studyUsers, 'studyUsers')
  });

  it('Create Study User - 201', async function () {
    // create contract
    const contract = await studyUserManagerJs.uploadContract(adminUser);
    // create study User
    const args = {
      studyId: util.uid(),
      userId: util.uid(),
      isActive: 1,
      updateDate: '10-13-2019',
      updateBy: 'PJE' }
    const studyUser = await contract.createStudyUser(args)
    assert.equal(studyUser.userId, args.userId, 'userId')
    });
  });
  
