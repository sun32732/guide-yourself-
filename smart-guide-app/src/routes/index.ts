import { Router } from 'express';
import AuthController from '../modules/authentication/authController';
import ScheduleController from '../modules/scheduling/scheduleController';
import ReminderController from '../modules/reminders/reminderController';
import NotesController from '../modules/notes/notesController';
import VoiceAssistant from '../modules/voice/voiceAssistant';
import RecommendationEngine from '../modules/recommendations/recommendationEngine';

const router = Router();

const authController = new AuthController();
const scheduleController = new ScheduleController();
const reminderController = new ReminderController();
const notesController = new NotesController();
const voiceAssistant = new VoiceAssistant();
const recommendationEngine = new RecommendationEngine();

router.post('/auth/login', authController.login);
router.post('/auth/register', authController.register);

router.post('/schedule', scheduleController.createSchedule);
router.get('/schedule', scheduleController.getSchedule);

router.post('/reminder', reminderController.setReminder);
router.get('/reminders', reminderController.getReminders);

router.post('/notes', notesController.createNote);
router.get('/notes', notesController.getNotes);

router.post('/voice/listen', voiceAssistant.listen);
router.post('/voice/respond', voiceAssistant.respond);

router.get('/recommendations', recommendationEngine.getRecommendations);
router.post('/recommendations/generate', recommendationEngine.generateRecommendations);

export default router;