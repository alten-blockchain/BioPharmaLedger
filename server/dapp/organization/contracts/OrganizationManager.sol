import "/blockapps-sol/dist/collections/hashmap/contracts/Hashmap.sol";
import "/blockapps-sol/dist/rest/contracts/RestStatus.sol";
import "./Organization.sol";

contract OrganizationManager is Util, RestStatus {
  Hashmap organizations;
  /*
   * Constructor
   */
  constructor () public {
    organizations = new Hashmap();
  }
  function createOrganization(
    string _orgId,
    string _orgType,
    string _orgName,
    string _isActive
  ) public returns (uint, uint, address) {
    // exists ?
    if (exists(_orgId)) return (RestStatus.BAD_REQUEST, 0, 0);
    // create new
    Organization organization = new Organization(
        _orgId,
        _orgType,
        _orgName,
        _isActive
        );
    organizations.put(_orgId, organization);
    // created
    return (RestStatus.CREATED, 0, organization);
  }

  function exists(string _orgId) public view returns (bool) {
    return organizations.contains(_orgId);
  }

}
