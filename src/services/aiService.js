const predictAudio = async (audio) =>{
    const reqAudio=audio;
    const formData = new FormData();
    formData.append('audio', reqAudio);

    const response = await fetch(' http://127.0.0.1:5000/predict', {
        method: 'POST',
        body: formData
    });

    //result = {transcript,predicted category}
    const result = await response.json();

    return result
};

export default{
    predictAudio
}