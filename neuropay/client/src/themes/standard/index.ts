import { definePreset } from '@primevue/themes';
import Lara from '@primevue/themes/lara';
import base from './base';
import drawer from './components/drawer';
import floatlabel from './components/floatlabel';
import inputtext from './components/inputtext';
import message from './components/message';
import tabs from './components/tabs';
import toast from './components/toast';
import toggleswitch from './components/toggleswitch';

export default definePreset(Lara, {
    ...base,
    components: {
        drawer,
        floatlabel,
        inputtext,
        message,
        tabs,
        toast,
        toggleswitch,
    },
});
