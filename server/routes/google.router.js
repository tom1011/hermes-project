const express = require('express'); // Express web server framework
const router = express.Router();
const app = express();

https://www.woolha.com/tutorials/node-js-google-speech-to-text-recognition-api-examples

router.post('/transcription', async function (req, res) {
    

    // [START speech_transcribe_async_gcs]
    // Imports the Google Cloud client library
    let speech = require('@google-cloud/speech');

    // Creates a client
    let client = new speech.SpeechClient();

    // The path to the audio file to transcribe
    const filePath = '/Users/marifelangeles/AtomProjects/2minSample.wav';

    // Google Cloud storage 
    const bucketName = 'uploadhermesaudio'; 

    const uploadToGcs = async () => {
        const storage = cloudStorage({
            projectId: process.env.GOOGLE_CLOUD_PROJECT_ID,
        });

        const bucket = storage.bucket(bucketName);
        const fileName = path.basename(filePath);

        await bucket.upload(filePath);

        return `gs://${bucketName}/${fileName}`;
    };


    let config = {
        encoding: 'LINEAR16',
        sampleRateHertz: 32000,
        languageCode: 'en-US',
        audioChannelCount: 2,
        enableSeparateRecognitionPerChannel: true,
    };

    let audio = {
        uri: 'gs://uploadhermesaudio/2minSample.wav',
    };

    let request = {
        config: config,
        audio: audio,
    };

    // Detects speech in the audio file. This creates a recognition job that you
    // can wait for now, or get its result later.
    let [operation] = await client.longRunningRecognize(request);
    // Get a Promise representation of the final result of the job
    let [response] = await operation.promise();
    let transcription = response.results
        .map(result => result.alternatives[0].transcript)
        .join('\n');
    console.log(`Transcription: ${transcription}`);
    // [END speech_transcribe_async_gcs]
    res.send(transcription);

    // asyncRecognizeGCS().catch(console.error);
});

module.exports = router;