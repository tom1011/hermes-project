const express = require('express'); // Express web server framework
const router = express.Router();
require('dotenv').config();
// Imports the Google Cloud client library
const { Storage } = require('@google-cloud/storage');
const speech = require('@google-cloud/speech');
const fs = require('fs');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const path = require('path');






// https://www.woolha.com/tutorials/node-js-google-speech-to-text-recognition-api-examples
// https://cloud.google.com/nodejs/docs/reference/storage/2.3.x/File
// https://cloud.google.com/storage/docs/uploading-objects#storage-upload-object-nodejs

router.get('/transcription', async function (req, res) {
    // Using the cloud client library
    // Your Google Cloud Platform project ID
    console.log(req.query)
    const projectId = process.env.GOOGLE_CLOUD_PROJECT_ID;
    // Creates a storage client
    const storage = new Storage({
        projectId: projectId,
    });

    // The name for the bucket
    const bucketName = 'uploadhermesaudio';

    // The name of the audio file to transcribe
    const fileName = req.query.file;

    // local file to upload
   

    // Uploads a local file to the bucket
    await storage.bucket(bucketName).upload(fileName, {
        // Support for HTTP requests made with `Accept-Encoding: gzip`
        gzip: true,
        // By setting the option `destination`, you can change the name of the
        // object you are uploading to a bucket.
        metadata: {
            // Enable long-lived HTTP caching headers
            // Use only if the contents of the file will never change
            // (If the contents will change, use cacheControl: 'no-cache')
            cacheControl: 'public, max-age=31536000',
        },
    });

    await console.log(`${fileName} uploaded to ${bucketName}.`);
res.send({bucketName:bucketName, 
    fileName:fileName})
})
  router.get('/transcript', async function (req, res){


  // Creates a speech client
    const client = new speech.SpeechClient();

    // The audio file's encoding, sample rate in hertz, and BCP-47 language code
    const audio = {
        uri: `gs://${bucketName}/${filename}`,
    };

    // Reads a local audio file and converts it to base64
    // const file = fs.readFileSync(fileName);
    // const audioBytes = file.toString('base64');
    // const audio = {
    //     content: audioBytes,
    // };
    const config = {
        encoding: 'LINEAR16',
        sampleRateHertz: 32000,
        languageCode: 'en-US',
        audioChannelCount: 2,
        enableSeparateRecognitionPerChannel: true,
    };
    const request = {
        config: config,
        audio: audio,
    };
    
    // Detects speech in the audio file. This creates a recognition job that you
    // can wait for now, or get its result later.
    const [operation] = await client.longRunningRecognize(request);
    // Get a Promise representation of the final result of the job
    const [response] = await operation.promise();
    const transcription = response.results
        .map(result => result.alternatives[0].transcript)
        .join('\n');
    console.log(`Transcription: ${transcription}`);
    // [END speech_transcribe_async_gcs]
    res.send(transcription);

    
});




module.exports = router;