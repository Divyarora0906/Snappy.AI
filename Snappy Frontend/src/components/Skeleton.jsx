import React from "react";

const Skeleton = ({ className }) => {
  return (
    <div
      className={`animate-pulse bg-gradient-to-r from-[#0B101E] via-[#12182A] to-[#0B101E] ${className}`}
    />
  );
};

export default Skeleton;