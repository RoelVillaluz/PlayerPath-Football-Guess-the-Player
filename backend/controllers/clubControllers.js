import Club from '../models/clubModel.js';

// GET /api/clubs (retrieve all clubs)
export const getClubs = async (req, res) => {
    try {
        const clubs = await Club.find({}); // Fetch all clubs from the database
        res.status(200).json({ success: true, data: clubs });
    } catch (error) {
        console.error('Error fetching clubs', error.message);
        res.status(500).json({ success: false, message: 'Server error' });
    }
}

// GET /api/clubs/id (retrieve one clubs)
export const getClub = async (req, res) => {
    const { id } = req.params

    try {
        const club = await Club.findById(id)
        if (!club) {
            res.status(404).json({ success: false, message: 'Error: club not found' })
        }
        return res.status(200).json({ success: true, message: 'Club fetched successfully', data: club });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
}

// POST /api/clubs (create a new club)
export const createClub = async (req, res) => {
    const club = req.body;

    if (!club.name) {
        return res.status(400).json({ success: false, message: 'Please provide a name' });
    }

    try {
        const existingClub = await Club.findOne({ name: club.name });

        // Check if a club with the same name already exists
        if (existingClub) {
            return res.status(400).json({ success: false, message: 'Club already exists' })
        }

        // create club if no club with the same name exists yet
        const newClub = new Club(club);
        await newClub.save();
        res.status(201).json({ success: true, data: newClub });
        
    } catch (error) {
        console.error('Error in create club', error.message);
        res.status(500).json({ success: false, message: 'Server error' });
    }
}

// PATCH /api/clubs/:id (update a club)
export const updateClub = async (req, res) => {
    const { id } = req.params;

    const club = req.body;
    try {
        const updatedClub = await Club.findByIdAndUpdate(id, club, { new: true });
        res.status(200).json({ success: true, data: updatedClub });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server Error' });
    }
}

// DELETE /api/clubs/:id (delete club)
export const deleteClub = async (req, res) => {
    const { id } = req.params;
    console.log(`ID: ${id}`);

    try {
        await Club.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: 'Club deleted' });
    } catch (error) {
        console.log(error);
    }
}