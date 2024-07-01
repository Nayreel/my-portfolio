import React from "react";

interface CopyButtonProps {
  onClick?: (e: any) => void;
  title?: string;
  className?: any;
  icon?: any;
  position?: string;
}

const CopyButton = (props: CopyButtonProps) => {
  return (
    <button onClick={props.onClick} className="inline-flex gap-2 h-12 animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
      {props.title}
      {props.icon}
    </button>
  );
};

export default CopyButton;
