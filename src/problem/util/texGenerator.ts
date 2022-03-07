import { calculategcd } from "../util/commonDivisor";

export const fracTex=(above:number,below:number):string=>{
  const gcd = calculategcd([above,below]);
  if (above===0){
    below = 1;
  } else {
    const sign = (above*below)/Math.abs((above*below));
    above = (sign*Math.abs(above)) / gcd;
    below = Math.abs(below) /gcd;}
  
  if (below===1){
    return `${above}`
  } else {
    return `\\frac{${above}}{${below}}`
  }
  
};
