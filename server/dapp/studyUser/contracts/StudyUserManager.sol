import "/blockapps-sol/dist/collections/hashmap/contracts/Hashmap.sol";
import "/blockapps-sol/dist/rest/contracts/RestStatus.sol";
import "./StudyUSer.sol";

contract StudyUSerManager is Util, RestStatus {
  Hashmap studyusers;
  /*
   * Constructor
   */
  constructor () public {
    studyusers = new Hashmap();
  }
  function createStudyUser(
    string _studyId,
    string _userd,
    string _isActive,
    string _updateDate,
    string _updateBy
  ) public returns (uint, uint, address) {
    // exists ? To Do:  Need to check for combination of IDs
    //if (exists(_studyId)) return (RestStatus.BAD_REQUEST, 0, 0);
    // create new
    StudyUser studyUser = new StudyUser(
      _studyId,
      _orgId,
      _isActive,
      _updateDate,
      _updateBy
        );
    studyorganizations.put(_studyId, studyUser);
    // created
    return (RestStatus.CREATED, 0, studyUser);
  }

  function exists(string _studyId) public view returns (bool) {
    return studyusers.contains(_studyId);
  }

}
