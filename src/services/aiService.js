import fs from "fs";

const categoryMap = {
    Learning: "LEARNING",
    Meeting: "MEETING",
    Tasks: "TASKS"
};

const predictAudio = async (audio) => {
    const formData = new FormData();

    // Read the audio file as a buffer
    const audioBuffer = fs.readFileSync(audio.path);

    // Create a Blob object from the audio buffer and append it to the FormData
    const audioBlob = new Blob(
        [audioBuffer],
        { type: audio.mimetype }
    );

    formData.append(
        "audio",
        audioBlob,
        audio.originalname
    );

    const response = await fetch(
        "http://127.0.0.1:5000/predict",
        {
            method: "POST",
            body: formData
        }
    );

    if (!response.ok) {
        throw new Error(`Flask API returned ${response.status}`);
    }

    const result = await response.json();

    return {
        transcript: result.transcript,
        predicted_category: categoryMap[result.predicted_category] || "UNKNOWN"
    };
};

export default {
    predictAudio
};