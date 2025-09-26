class ScheduleController {
    private schedules: { [key: string]: any } = {};

    createSchedule(userId: string, scheduleData: any) {
        if (!this.schedules[userId]) {
            this.schedules[userId] = [];
        }
        this.schedules[userId].push(scheduleData);
        return { message: "Schedule created successfully", schedule: scheduleData };
    }

    getSchedule(userId: string) {
        return this.schedules[userId] || [];
    }
}

export default ScheduleController;