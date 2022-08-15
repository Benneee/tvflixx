import { createI18n }  from "vue-i18n";


const messages = {
    'en': {
        greeting: 'Good morning!',
        checkupText: "How're you doing?"
    },
    'de': {
        greeting: 'Guten morgen',
        checkupText: "Wie geht's?"
    }
};

export const i18n = createI18n({
    locale: 'en',
    fallbackLocale: 'de',
    messages
});