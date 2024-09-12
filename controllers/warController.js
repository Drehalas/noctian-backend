// Calculate the next war time (every 2 hours)
const getNextWarTime = () => {
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinutes = now.getMinutes();

    // Calculate the next war hour based on a 2-hour interval
    const nextWarHour = Math.ceil(currentHour / 2) * 2;

    const nextWarDate = new Date();
    nextWarDate.setHours(nextWarHour, 0, 0, 0); // Set the next war time at the next 2-hour interval

    // If the next war time is in the past (within the current hour), move to the next interval
    if (nextWarHour === currentHour && currentMinutes > 0) {
        nextWarDate.setHours(nextWarHour + 2); // Move to the next 2-hour interval
    }

    return nextWarDate.getTime(); // Returns the timestamp of the next war event
};

// Controller to fetch next war time
exports.getNextWarTime = (req, res) => {
    try {
        const nextWarTime = getNextWarTime();
        res.status(200).json({ nextWarTime });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching next war time', error: error.message });
    }
};
