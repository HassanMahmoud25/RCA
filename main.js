import { TypeOfEvent } from './js/type of event.js';
import { DirectCauses } from './js/direct causes.js';
import { RootCauses } from './js/root causes.js';
import { CorrectiveActions } from './js/corrective actions.js';

const typeOfEvent = new TypeOfEvent();
const directCauses = new DirectCauses();
const rootCauses = new RootCauses();
const correctiveActions = new CorrectiveActions();

// Call render function
typeOfEvent.start();
directCauses.start();
rootCauses.start();
correctiveActions.start();