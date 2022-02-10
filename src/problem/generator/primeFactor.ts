import { ProblemGenerator } from "../ProblemGeneratorSpi";
import { randomInt } from "../util/randomizer";


const primeFactor: ProblemGenerator = {
  key: "prime-factor",
  generate: () => {

    let primelist = [
      [2,0],[3,0],[5,0],[7,0],[11,0],[13,0],
      [17,0],[19,0],[23,0],[29,0],[31,0],[37,0]
    ];
  
    const maxnumber = 600;
    var factornumber = 1;
    const maxliste = primelist.length;
    var pos = 0;
    while (factornumber < maxnumber){
        pos = randomInt(0,maxliste);
        primelist[pos][1] = primelist[pos][1] + 1;
        factornumber = factornumber * primelist[pos][0];
    }
  
    pos = 0;
    var factorstring = ``;
    while (pos < maxliste){
      if (primelist[pos][1]>0){
        factorstring = factorstring + ` \\cdot ${primelist[pos][0]}^${primelist[pos][1]}` 
      }
      pos = pos + 1;
    }

    return {
      description: `${factornumber}`,
      solution: `${factorstring.substring(6)}`,
    };
  },
};

export default primeFactor;
