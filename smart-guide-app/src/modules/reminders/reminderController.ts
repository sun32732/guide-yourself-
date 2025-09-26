class ReminderController {
    private reminders: { id: number; message: string; time: Date }[] = [];
    private nextId: number = 1;

    setReminder(message: string, time: Date): { id: number; message: string; time: Date } {
        const reminder = { id: this.nextId++, message, time };
        this.reminders.push(reminder);
        return reminder;
    }

    getReminders(): { id: number; message: string; time: Date }[] {
        return this.reminders;
    }
}

export default ReminderController;