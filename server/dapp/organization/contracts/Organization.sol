import "/blockapps-sol/dist/util/contracts/Util.sol";
import "/blockapps-sol/dist/rest/contracts/RestStatus.sol";

/*
 * Organization Data Container
 */
contract Organization is RestStatus, Util { /*is Searchable, AssetState, AssetError{*/

  string public orgId;
  string public orgType;
  string public orgName;
  string public orgCity;
  string public orgState;
  string public orgCountry;
  string public isActive;
  string public updateDate;
  string public updateBy;
  
  constructor(
    string _orgId,
    string _orgType,
    string _orgName,
    string _isActive
  ) {
    orgId = _orgId;
    orgType = _orgType;
    orgName = _orgName;
    isActive = _isActive;
  }

  function setDetails (
    string _orgCity,
    string _orgState,
    string _orgCountry,
    string _updateDate,
    string _updateBy
    ) {
    orgCity = _orgCity;
    orgState = _orgState;
    orgCountry = _orgCountry;
    updateDate = _updateDate;
    updateBy = _updateBy;
    } 
/*
  function setOrgType(string _newOrgType) returns (uint) {
    orgType = _newOrgType;
  return (RestStatus.OK);
  }

  function setorgName(string _newOrgName) returns (uint) {
    orgName = _newOrgName;
  return (RestStatus.OK);
  }

  function setOrgLocation(string _newOrgCity, string _newOrgState, string _newOrgCountry) returns (uint) {
    orgCity = _newOrgCity;
    orgState = _newOrgState;
    orgCountry = _newOrgCountry;
  return (RestStatus.OK);
  }

  function deleteOrg() returns (uint) {
    isActive = 0;
  return (RestStatus.OK);
  }
*/
}
