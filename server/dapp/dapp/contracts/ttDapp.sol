// asset manager
// permission manager
// user manager
import "/blockapps-sol/dist/rest/contracts/RestStatus.sol";
import "/blockapps-sol/dist/auth/user/contracts/UserManager.sol";
import "/dapp/asset/contracts/AssetManager.sol";
import "/dapp/study/contracts/StudyManager.sol";
import "/dapp/organization/contracts/OrganizationManager.sol";
import "/dapp/fileTransaction/contracts/FileTransactionManager.sol";
import "/dapp/ttPermission/contracts/TtPermissionManager.sol";
/**
 * Single entry point to all the project's contract
 * Deployed by the deploy script
 */
 contract TtDapp is RestStatus {
   // NOTE: variable name MUST match contract name
   UserManager public userManager;
   AssetManager public assetManager;
   StudyManager public studyManager;
   OrganizationManager public organizationManager;
   FileTransactionManager public fileTransactionManager;
   TtPermissionManager public ttPermissionManager;

   // internal
   address owner; //  debug only

   /**
    *  Instantiate Managers
    *  @param _ttPermissionManager address - the projects permission manager
    */
   constructor(address _ttPermissionManager) {
     owner = msg.sender;  //  debug only
     ttPermissionManager = TtPermissionManager(_ttPermissionManager);
     userManager = new UserManager(msg.sender);
     assetManager = new AssetManager(ttPermissionManager);
     studyManager = new StudyManager();
     organizationManager = new OrganizationManager();
     fileTransactionManager = new FileTransactionManager();
   }
 }
