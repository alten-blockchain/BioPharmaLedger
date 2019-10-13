import "/blockapps-sol/dist/util/contracts/Util.sol";
import "/blockapps-sol/dist/rest/contracts/RestStatus.sol";

/*
 * Study Organization Data Container
 */
contract StudyOrganization is RestStatus, Util { /*is Searchable, AssetState, AssetError{*/

  string public studyId;
  string public orgId;
  string public isActive;
  string public updateDate;
  string public updateBy;
  
  constructor(
    string _studyId,
    string _orgId,
    string _isActive,
    string _updateDate,
    string _updateBy
  ) {
    studyId = _studyId;
    orgID = _orgId;
    isActive = _isActive;
    updateDate = _updateDate;
    updateBy = _updateBy;
  }

}
