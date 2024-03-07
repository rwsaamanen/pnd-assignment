import React, { useState } from 'react';
import { QueueItem } from './lib/types';
import Form from './components/form';
import Queue from './components/queue';

// App

const App: React.FC = () => {

  // States

  const [queue, setQueue] = useState<QueueItem[]>([]);

  // addToQueue

  const addToQueue = (item: QueueItem) => {
    setQueue((prevQueue) => [...prevQueue, item]);
  };

  return (
    <>
      <Form onAddToQueue={addToQueue} />
      <Queue items={queue} />
    </>
  );
};

export default App;
