// This was not required for the task, but I added it for testing purposes.

import React from 'react';
import { QueueItem } from '../lib/types';
import styles from './style.module.css';

// QueueProps

interface QueueProps {
  items: QueueItem[];
}

// Queue

const Queue: React.FC<QueueProps> = ({ items }) => {
  return (
    <div className={styles.queue}>
      <h4 className={styles.headerQueue}>Jonossa olevat kappaleet</h4>
      {items.length === 0 ? (
        <div className={styles.noItems}>Ei kappaleita jonossa</div>
      ) : (
        <div className={styles.list}>
          {items.map((item, index) => (
            <div key={index} className={styles.listItem}>
              <div className={styles.orderNumber}>{index + 1}.</div>
              <div className={styles.name}>{item.name}</div>
              <div className={styles.songInfo}>
                <div className={styles.songName}>{item.song.name}</div>
                <div className={styles.artistName}>{item.song.artist}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Queue;
