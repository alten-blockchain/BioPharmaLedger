import { getDate } from "date-fns";

const factory = {
  createConstructorArgs(uid) {
    const args = {
      fileTransactionId: uid,
      externalStorageAddress: `${Math.random().toString(36)}`,
      category: `Category_${Math.random().toString(36).substring(7)}`,
      access: `Access_${Math.random().toString(36).substring(7)}`,
      fileName: '1566401234532-image001.jpg',
      actionType: 'Uploaded',
    }
    return args
  },
  createDetailsArgs(uid) {
    var currentdate = new Date();
    
    const args = {
      dateTime: currentdate,
      uploadedBy: `Kevin_${Math.random().toString(36).substring(7)}`,
      uploadedTo: `Paul_${Math.random().toString(36).substring(7)}`,
      acceptedBy: `Seb_${Math.random().toString(36).substring(7)}`,
      verified: 1,
    }
    return args
  },
}

 export default factory