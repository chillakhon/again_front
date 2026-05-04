import {ModalsBirthdayReminder} from "#components";

export const useBirthdayReminder = () => {
    const modal = useModal();
    const authStore = useAuthStore();

    const STORAGE_KEY = 'birthday_reminder_dismissed';

    const showIfNeeded = () => {
        if (process.client && localStorage.getItem(STORAGE_KEY)) return;
        const {user} = authStore;
        if (!user?.id) return;
        if (!user.profile || !user.profile.birthday) {
            setTimeout(() => {
                modal.openModal(ModalsBirthdayReminder, {
                    customClass: 'message',
                    title: 'Заполни дату рождения',
                    text: 'Заполни дату рождения, чтобы получить бесплатный подарок от команды «Again»'
                });
            }, 3000);
        }
    };

    onMounted(() => {
        if (authStore.isChecked) {
            showIfNeeded();
        } else {
            const stop = watch(() => authStore.isChecked, (isChecked) => {
                if (isChecked) {
                    showIfNeeded();
                    stop();
                }
            });
        }
    });
};
