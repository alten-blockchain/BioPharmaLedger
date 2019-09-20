
import "/blockapps-sol/dist/collections/hashmap/contracts/Hashmap.sol";
import "/blockapps-sol/dist/rest/contracts/RestStatus.sol";
import "./Studyv2.sol";

contract StudyManager is RestStatus {
  Hashmap studies;
  /*
   * Constructor
   */
  constructor () public {
    studies = new Hashmap();
  }

  function createStudy(
    string _studyId,
    string _studyName
  ) public returns (uint, uint, address) {
    // exists ?
    if (exists(_studyId)) return (RestStatus.BAD_REQUEST, 0, 0);
    // create new
    Studyv2 study = new Studyv2(
      _studyId,
      _studyName
    );
    studies.put(_studyId, study);
    // created
    return (RestStatus.CREATED, 0, study);
  }

  function exists(string _studyId) public view returns (bool) {
    return studies.contains(_studyId);
  }
}
