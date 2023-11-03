import React from 'react';

const PromptCardSkeleton = () => (
  <div className="prompt_card loading-skeleton">
    <div className="flex justify-between items-start gap-5">
      <div className="flex-1 flex justify-start items-center gap-3 cursor-pointer">
        <div className="loading-image-skeleton"></div>
        <div className="flex flex-col">
          <div className="loading-name-skeleton"></div>
          <div className="loading-email-skeleton"></div>
        </div>
      </div>
      <div className="copy_btn">
        <div className="loading-icon-skeleton"></div>
      </div>
    </div>
    <div className="loading-prompt-skeleton"></div>
    <div className="loading-tag-skeleton"></div>
  </div>
);

const NoteSkeleton = () => {
  return (
    <div className="prompt_layout mt-5">
      <PromptCardSkeleton />
      <PromptCardSkeleton />
      <PromptCardSkeleton />
      <PromptCardSkeleton />
      <PromptCardSkeleton />
      <PromptCardSkeleton />
      <PromptCardSkeleton />
      <PromptCardSkeleton />
      <PromptCardSkeleton />
    </div>
  );
};

export default NoteSkeleton;
