import { randomInt } from "../util/randomizer";
import { exclude } from "../util/predicates";

export const randomdist = (distribution:any[]):number=>{
  var pos = 0;
  const randomvalue = randomInt(0,100); 
  while (distribution[pos][1] < randomvalue){
    pos = pos + 1
  }
  return pos
};
