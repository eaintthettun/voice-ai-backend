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

const createDiaryEntry = async (req,res) => {
    try{
        //get audio and title from frontend
        const {title}=req.body;
        const audio=req.file;

        //we get the path from multer middleware, which saves the file in uploads folder
        const filePath=req.file.path;

        const userId=req.user.userId;

        //call ai service to get predicted category
        const { transcript, predicted_category:category } = await aiService.predictAudio(audio);
        
        const diaryData={title,transcript,category,filePath,userId}
        const result= await diaryEntryService.createDiaryEntry(diaryData);
        res.status(200).json({message:"Created diary entry successfully",diaryEntry:result})
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

export default {
    getDiaryEntries,
    createDiaryEntry
};