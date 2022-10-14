import { faker }  from '@faker-js/faker/locale/es_MX';
import * as fs from 'fs';
import { json2csv } from 'json-2-csv';

export default class ProfilesGenerator {
  constructor(options) {
    this.numberOfProfiles = options.numberOfProfiles
    this.pathToSave = options.pathToSave
    console.log('constructor');
  }
  generateProfiles() {
    const {numberOfProfiles} = this
    const USERS = [];
    for (let index = 0; index < numberOfProfiles; index++) {
      USERS.push(this.createRandomUser());
    }
    this.profiles = USERS;
    // this.generateFiles()
    return this.profiles

  }

  generateFiles() {
    const {profiles, pathToSave} = this
    const json = JSON.stringify(profiles);

    json2csv(profiles, (err, csv) => {
      if (err) {
        throw err
      }
      fs.writeFile(`${pathToSave}.csv`, csv, function (err) {
        if (err) return console.log(err);
        console.log(`Profiles > ${pathToSave}`);
      });
    })

    fs.writeFile(`${pathToSave}.json`, json, function (err) {
      if (err) return console.log(err);
      console.log(`Profiles > ${pathToSave}`);
    });

  }

  createRandomUser() {
    return {
      userId: faker.datatype.uuid(),
      username: faker.internet.userName(),
      email: faker.internet.email(),
      avatar: faker.image.avatar(),
      password: faker.internet.password(),
      age: faker.datatype.number({
        min: 18,
        max: 45
      }),
      registeredAt: faker.date.past(),
      account: faker.finance.account(),
      accountName: faker.finance.accountName(),
      transactions: this.transGenerate(),
    };
  }

  transGenerate() {
    const timeElapsed = Date.now();
    const today = new Date(timeElapsed);
    const transactions = []
      for(var i = 0; i<= 30; i++){
        transactions.push({
          amount: faker.finance.amount(),
          transactionType: faker.finance.transactionType(),
          timeStamp: faker.date.recent(30, today)
        })
      }
    return transactions
  }
}


