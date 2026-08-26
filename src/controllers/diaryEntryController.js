import aiService from '../services/aiService.js';
import diaryEntryService from '../services/diaryEntryService.js';

const getDiaryEntries = async (req, res) => {
    try {
        const userId= req.user.userId; // Access the user ID from the decoded token
        const diaryEntries = await diaryEntryService.getDiaryEntries(userId);
        res.status(200).json({ diaryEntries });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getRecentDiaryEntries = async (req, res) => {
    try {
        const userId= req.user.userId; // Access the user ID from the decoded token
        const recentDiaryEntries = await diaryEntryService.getRecentDiaryEntries(userId);
        res.status(200).json({ recentDiaryEntries });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const transcribeDiaryEntry = async (req,res) => {
    try{
        //get audio and title from frontend
        const {title}=req.body;
        const audio=req.file;

        //we get the path from multer middleware, which saves the file in uploads folder
        const filePath=req.file.path;

        const userId=req.user.userId;

        //call ai service to get predicted category
        const { transcript, predicted_category:category } = await aiService.predictAudio(audio);
        
        res.status(200).json(
            {message:"Transcribed diary entry successfully"
            ,transcript,category})
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

export default {
    getDiaryEntries,
    transcribeDiaryEntry,
    getRecentDiaryEntries
};