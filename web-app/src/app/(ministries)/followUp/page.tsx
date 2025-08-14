import React, { Suspense } from 'react';
import FollowUpAdmin from './followUpAdmin';

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <FollowUpAdmin />
    </Suspense>
  );
}
