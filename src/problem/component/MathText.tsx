import React from "react";
import TeX from '@matejmazur/react-katex';

interface MathTextProps {
  markup: string;
}

const MathText = (props: MathTextProps) => {
  const segments = props.markup.split(/(\[\[(?!\]\]).*?\]\])/);
  return (
    <>
      {segments.map((segment, i) => {
        if (segment.startsWith("[[") && segment.endsWith("]]")) {
          return (
            <TeX key={i}>
              {segment.substring(2, segment.length - 2)}
            </TeX>
          );
        } else {
          return segment;
        }
      })}
    </>
  );
};

export default MathText;
