import "/blockapps-sol/dist/collections/hashmap/contracts/Hashmap.sol";
import "/blockapps-sol/dist/rest/contracts/RestStatus.sol";
import "./Studyv6.sol";

contract StudyManager is Util, RestStatus {
  Hashmap studies;
  /*
   * Constructor
   */
  constructor () public {
    studies = new Hashmap();
  }
  function createStudy(
    string _studyId,
    string _studyName,
    string _therapeuticArea,
    string _sponsorId,
    string _croId
  ) public returns (uint, uint, address) {
    // exists ?
    if (exists(_studyId)) return (RestStatus.BAD_REQUEST, 0, 0);
    // create new
    Studyv6 study = new Studyv6(
      _studyId,
      _studyName,
      _therapeuticArea,
      _sponsorId,
      _croId
        );
    studies.put(_studyId, study);
    // created
    return (RestStatus.CREATED, 0, study);
  }

  function exists(string _studyId) public view returns (bool) {
    return studies.contains(_studyId);
  }

  /*
   * Set Therapeutic Area
   */
  function setTherapeuticArea(string _studyId, string _therapeuticArea) public returns(uint) {
  // exists ?
    if (!exists(_studyId)) return (RestStatus.NOT_FOUND);
  //Get Address and Update - casting as a study
    Studyv6 study = Studyv6(studies.get(_studyId));
    return study.setTherapeuticArea(_therapeuticArea);
  }

}
