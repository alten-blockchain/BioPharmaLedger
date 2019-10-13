import "/blockapps-sol/dist/collections/hashmap/contracts/Hashmap.sol";
import "/blockapps-sol/dist/rest/contracts/RestStatus.sol";
import "./StudyOrganization.sol";

contract StudyOrganizationManager is Util, RestStatus {
  Hashmap studyorganizations;
  /*
   * Constructor
   */
  constructor () public {
    studyorganizations = new Hashmap();
  }
  function createStudyOrganization(
    string _studyId,
    string _orgId,
    string _isActive,
    string _updateDate,
    string _updateBy
  ) public returns (uint, uint, address) {
    // exists ? To Do:  Need to check for combination of IDs
    //if (exists(_studyId)) return (RestStatus.BAD_REQUEST, 0, 0);
    // create new
    StudyOrganization studyOrganization = new StudyOrganization(
      _studyId,
      _orgId,
      _isActive,
      _updateDate,
      _updateBy
        );
    studyorganizations.put(_studyId, studyOrganization);
    // created
    return (RestStatus.CREATED, 0, studyOrganization);
  }

  function exists(string _studyId) public view returns (bool) {
    return studyorganizations.contains(_studyId);
  }

}
