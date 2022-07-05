import { SparklesIcon } from '@heroicons/react/outline';
import React from 'react';
import { defineMessages, useIntl } from 'react-intl';
import useSWR from 'swr';
import { StatusResponse } from '../../../server/interfaces/api/settingsInterfaces';
import Modal from '../Common/Modal';
import Transition from '../Transition';

const messages = defineMessages({
  newversionavailable: 'Application Update',
  newversionDescription:
    'Animarr has been updated! Please click the button below to reload the page.',
  reloadAnimarr: 'Reload',
});

const StatusChecker: React.FC = () => {
  const intl = useIntl();
  const { data, error } = useSWR<StatusResponse>('/api/v1/status', {
    refreshInterval: 60 * 1000,
  });

  if (!data && !error) {
    return null;
  }

  if (!data) {
    return null;
  }

  return (
    <Transition
      enter="opacity-0 transition duration-300"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="opacity-100 transition duration-300"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
      appear
      show={data.commitTag !== process.env.commitTag}
    >
      <Modal
        iconSvg={<SparklesIcon />}
        title={intl.formatMessage(messages.newversionavailable)}
        onOk={() => location.reload()}
        okText={intl.formatMessage(messages.reloadAnimarr)}
        backgroundClickable={false}
      >
        {intl.formatMessage(messages.newversionDescription)}
      </Modal>
    </Transition>
  );
};

export default StatusChecker;
