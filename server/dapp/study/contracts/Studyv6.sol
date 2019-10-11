import "/blockapps-sol/dist/util/contracts/Util.sol";
import "/blockapps-sol/dist/rest/contracts/RestStatus.sol";

/*
 * Study Data Container
 */
contract Studyv6 is RestStatus, Util { /*is Searchable, AssetState, AssetError{*/

  string public studyId;
  string public studyName;
  string public therapeuticArea;
  string public sponsorId;
  string public croId;
  
  constructor(
    string _studyId,
    string _studyName,
    string _therapeuticArea,
    string _sponsorId,
    string _croId
  ) {
    studyId = _studyId;
    studyName = _studyName;
    therapeuticArea = _therapeuticArea;
    sponsorId = _sponsorId;
    croId = _croId;
  }

  function setTherapeuticArea(string _newtherapeuticArea) returns (uint) {
    therapeuticArea = _newtherapeuticArea;
  return (RestStatus.OK);
  }

  function setSponsor(string _newSponsor) returns (uint) {
    sponsorId = _newSponsor;
  return (RestStatus.OK);
  }

  function setCRO(string _newCRO) returns (uint) {
    croId = _newCRO;
  return (RestStatus.OK);
  }

}
