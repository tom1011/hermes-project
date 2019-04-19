const GoogleCloudStorage = require('@google-cloud/storage');

const GOOGLE_CLOUD_PROJECT_ID = 'my-hermes-237600'; // Replace with your project ID
const GOOGLE_CLOUD_KEYFILE = '/Users/marifelangeles/AtomProjects/my-hermes-237600-86d48ffad7c8.json'; // Replace with the path to the downloaded private key

const storage = GoogleCloudStorage({
    projectId: GOOGLE_CLOUD_PROJECT_ID,
    keyFilename: GOOGLE_CLOUD_KEYFILE,
});

const bucketName = 'uploadhermesaudio';
const fileName = '2minSample.wav';

// Get public URL of a file. The file must have public access
exports.getPublicUrl = (bucketName, fileName) => `https://storage.googleapis.com/${bucketName}/${fileName}`;

