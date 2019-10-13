import "/blockapps-sol/dist/util/contracts/Util.sol";
import "/blockapps-sol/dist/rest/contracts/RestStatus.sol";

/*
 * Study User Data Container
 */
contract StudyUser is RestStatus, Util { /*is Searchable, AssetState, AssetError{*/

  string public studyId;
  string public userId;
  string public isActive;
  string public updateDate;
  string public updateBy;
  
  constructor(
    string _studyId,
    string _userId,
    string _isActive,
    string _updateDate,
    string _updateBy
  ) {
    studyId = _studyId;
    orgID = _userId;
    isActive = _isActive;
    updateDate = _updateDate;
    updateBy = _updateBy;
  }

}
