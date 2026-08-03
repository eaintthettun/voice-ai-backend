const diaryEntryService = require('../services/diaryEntryService.js');


const getDiaryEntries = async (req, res) => {
    try {
        const userId= req.user.user_id; // Access the user ID from the decoded token
        const diaryEntries = await diaryEntryService.getDiaryEntriesByUserID(userId);
        res.status(200).json({ diaryEntries });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = {
    getDiaryEntries
};