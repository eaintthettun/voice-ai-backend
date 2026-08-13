import { createReadStream } from 'fs';

const predictAudio = async (audio) => {
    const formData = new FormData();

    //the path is from uploads folder
    //the audio is a file object from multer
    const audioStream = createReadStream(audio.path);

    formData.append(
        'audio',
        audioStream,
        audio.originalname
    );

    const response = await fetch(
        'http://127.0.0.1:5000/predict',
        {
            method: 'POST',
            body: formData
        }
    );

    const result = await response.json();

    return result;
};