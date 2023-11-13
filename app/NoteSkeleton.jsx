import React from 'react';

const PromptCardSkeleton = () => (
<div class="prompt_card bg-gray-100 flex items-center justify-start animate-pulse ">
  <div class="note-skeleton p-2 rounded w-full animate-pulse">
    <div class="h-4 w-3/5 bg-gray-300 mb-4"></div>
    <div class="h-4 bg-gray-200 mb-1"></div>
    <div class="h-4 bg-gray-200 mb-1"></div>
    <div class="h-4 bg-gray-200 mb-1"></div>
    <div class="h-4 bg-gray-200 mb-1"></div>
  </div>
</div>
);

const NoteSkeleton = () => {
  return (
    <>
      <PromptCardSkeleton />
      <PromptCardSkeleton />
      <PromptCardSkeleton />

      <PromptCardSkeleton />
      <PromptCardSkeleton />


      </>
  );
};

export default NoteSkeleton;
