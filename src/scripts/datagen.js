import ProfilesGenerator from "./ProfilesGenerator.js"; 
const FakeProfiles = new ProfilesGenerator({
  numberOfProfiles: 1000,
  pathToSave: './assets/datasets/profiles'
})

FakeProfiles.generateProfiles()