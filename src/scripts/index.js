

import * as dfd from "danfojs-node"

// Using danfo to visualize data as panda

dfd.streamCSV("./datasets/profiles.csv", (df) => {
  if (df) {
      // Do any processing here
      df.drop({ columns: [
        "username", 
        "userId", 
        "email", 
        "avatar", 
        "password", 
        "accountName", 
        "account"], inplace: true });
      // df.print();
      let tf_tensor = df.tensor

      console.log(tf_tensor.dtype);

      console.log(tf_tensor);

      tf_tensor.print()
      // df["transactions"].print()
      //TODO: analize transactions per customer
      //make a df for each customer
  }
});
// Analize fake data


