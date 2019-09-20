

/**
 * Study Data Container
 */

contract Studyv3 {

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
}
