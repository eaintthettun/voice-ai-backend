import aiService from '../services/aiService.js';
import diaryEntryService from '../services/diaryEntryService.js';

const getDiaryEntries = async (req, res) => {
    try {
        const userId = req.user.userId; // Access the user ID from the decoded token
        const diaryEntries = await diaryEntryService.getDiaryEntries(userId);
        res.status(200).json({ diaryEntries });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getRecentDiaryEntries = async (req, res) => {
    try {
        const userId = req.user.userId; // Access the user ID from the decoded token
        const recentDiaryEntries = await diaryEntryService.getRecentDiaryEntries(userId);
        res.status(200).json({ recentDiaryEntries });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const transcribeDiaryEntry = async (req, res) => {
    try {
        //get audio from frontend
        const audio = req.file;

        //we get the path from multer middleware, which saves the file in uploads folder
        const filePath = req.file.path;

        //call ai service to get predicted category
        const { transcript, predicted_category: category } = await aiService.predictAudio(audio);

        res.status(200).json(
            {
                message: "Transcribed diary entry successfully"
                , transcript, category, filePath
            })
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

const createDiaryEntry = async (req, res) => {
    try {
        const userId = req.user.userId;
        const { title, transcript, category, filePath } = req.body;

        const result = await diaryEntryService.createDiaryEntry({ title, transcript, category, filePath, userId })

        res.status(200).json(
            {
                message: "Created diary entry successfully",
                result
            });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }

}

const deleteDiaryEntry = async (req, res) => {
    try {
        const { id } = req.params;

        const result = await diaryEntryService.deleteDiaryEntry(id)

        res.status(200).json(
            {
                message: "Deleted diary entry successfully",
                result
            });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

const editDiaryEntry = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, transcript } = req.body;

        const result = await diaryEntryService.editDiaryEntry(id, { title, transcript })

        res.status(200).json(
            {
                message: "Edited diary entry successfully",
                result
            });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

const getDiaryEntryDetail = async (req, res) => {
    try {
        const { id } = req.params;

        const diaryEntry = await diaryEntryService.getDiaryEntryDetail(id)

        res.status(200).json(
            {
                message: "Diary entry detail get successfully",
                diaryEntry
            });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

const getDiaryEntriesByCategory = async (req, res) => {
    try {
        const userId = req.user.userId;
        const { categoryName } = req.params;

        const diaryEntries = await diaryEntryService.getDiaryEntriesByCategory({ userId, category: categoryName });

        res.status(200).json({
            message: "Diary entries by category retrieved successfully",
            diaryEntries
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

const searchDiaryEntries = async (req, res) => {
    try {
        const userId = req.user.userId;
        const { keyword } = req.query;

        const diaryEntries = await diaryEntryService.searchDiaryEntries({ userId, keyword });

        res.status(200).json({
            message: "Diary entries searched successfully",
            diaryEntries
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

const findDiaryEntriesByDateRange = async (req, res) => {
    try {
        const userId = req.user.userId;
        const { startDate, endDate } = req.query;

        const diaryEntries = await diaryEntryService.findDiaryEntriesByDateRange({ userId, startDate, endDate });

        res.status(200).json({
            message: "Diary entries filterd by date range successfully",
            diaryEntries
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

export default {
    getDiaryEntries,
    transcribeDiaryEntry,
    getRecentDiaryEntries,
    createDiaryEntry,
    deleteDiaryEntry,
    editDiaryEntry,
    getDiaryEntryDetail,
    getDiaryEntriesByCategory,
    searchDiaryEntries,
    findDiaryEntriesByDateRange
};