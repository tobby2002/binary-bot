import { testSaga } from 'redux-saga-test-plan';
import { eventChannel } from 'redux-saga';
import * as actions from '../../../constants/actions';
import tickLoop from './';

const fakeChannel = eventChannel(() => () => {});
const epoch = 123456;
const payload = { epoch };

describe('tickLoop saga', () => {
    it('should keep taking data from channel until the end of channel', () => {
        testSaga(tickLoop, fakeChannel)
            .next()
            .take(fakeChannel)
            .next(payload)
            .put({ type: actions.NEW_TICK, payload: epoch })
            .next()
            .take(fakeChannel)
            .next(undefined) // end of channel
            .isDone();
    });
});