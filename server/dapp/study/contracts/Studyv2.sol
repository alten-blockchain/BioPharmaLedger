
/**
 * Study Data Container
 */

contract Studyv2 {

  string public studyId;
  string public studyName;

  constructor(
    string _studyId,
    string _studyName
  ) {
    studyId = _studyId;
    studyName = _studyName;
  }
}
