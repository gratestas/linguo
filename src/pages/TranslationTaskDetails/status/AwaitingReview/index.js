import React from 'react';
import loadable from '@loadable/component';
import { TaskParty } from '~/app/linguo';
import Spinner from '../components/Spinner';

const fallback = <Spinner />;

const NoContent = () => null;

export default {
  [TaskParty.Requester]: loadable(() => import('./AwaitingReviewForRequester.jsx'), { fallback }),
  [TaskParty.Translator]: loadable(() => import('./AwaitingReviewForTranslator.jsx'), { fallback }),
  [TaskParty.Challenger]: loadable(() => Promise.resolve({ default: NoContent }), { fallback }),
  [TaskParty.Other]: loadable(() => import('./AwaitingReviewForOther.jsx'), { fallback }),
};
