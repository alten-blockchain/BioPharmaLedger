
const factory = {
  createArgs(uid) {
    const args = {
      studyId: uid,
      studyName:  'Study Name Default',
      therapeuticArea:  'Therapeutic Area Default',
      sponsorId: uid,
      croId: uid
    }
    return args
  },
}

export default factory
