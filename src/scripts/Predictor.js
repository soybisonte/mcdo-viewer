import Profiles from "@/assets/datasets/fakeDataProfiles.json"
import * as dfd from "danfojs";
const KMeans = require("tf-kmeans");
// const tf = require("@tensorflow/tfjs");
export default class Predictor {

    constructor() {
        
    }
    predict() {

        const profiles = new dfd.DataFrame(Profiles)
        let indexesDropped = []
        for (let index = 0; index < 500; index++) {
            indexesDropped.push(index)
        }
         
        profiles.drop({ index: indexesDropped, inplace: true });
        // profiles.print();
        let tf_tensor = profiles.tensor
        const kmeans = new KMeans.default({
            k: 6,
            maxIter: 30,
            distanceFunction: KMeans.default.EuclideanDistance
        });
        // const dataset = tf.tensor([[2, 2, 2], [5, 5, 5], [3, 3, 3], [4, 4, 4], [7, 8, 7]]);
        // console.log(dataset);
        const now = performance.now()
        
        const predictions = kmeans.Train(
            tf_tensor
        );
     
        console.log("Assigned To ", predictions.arraySync());
        console.log("Centroids Used are ", kmeans.Centroids().arraySync());
        const then = performance.now()
        console.log(`iterations: 30`)
        console.log(`dataset shape: ${tf_tensor.size}`)
        console.log(`execution time: ${then - now}`)
        // console.log("Prediction for Given Value is");
        // kmeans.Predict(tf.tensor([1,1,1])).print();
    }

}
    