import React from 'react';
import AnalyzeContent from './AnalyzeContent';
import styles from './Analyze.module.scss';

export default function AnalyzePage() {
    return (
      <main className={styles.pageWrapper}>
        <AnalyzeContent />
      </main>
    )
  }