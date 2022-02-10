import { ProblemGenerator } from "../ProblemGeneratorSpi";
import { randomInt } from "../util/randomizer";


const primeFactor: ProblemGenerator = {
  key: "prime-factor",
  generate: () => {

    let primeweight = [
      [2,1,0],[3,2,0],[5,3,0],[7,4,0],[11,4,0],[13,4,0],
      [17,5,0],[19,6,0],[23,7,0],[29,8,0]
    ];
    const maxweight = 12;
    const maxnumber = 500;
    var weightsum = 0;
    var factornumber = 1;
    const maxliste = primeweight.length;
    var pos = 0;
    var morefactor = true;
        while (morefactor){
          pos = randomInt(0,maxliste);
          if (weightsum + primeweight[pos][1]< maxweight) {
            weightsum = weightsum + primeweight[pos][1];
            primeweight[pos][2] = primeweight[pos][2] + 1;
            factornumber = factornumber * primeweight[pos][0];
          }
          if ((factornumber > maxnumber) || (weightsum > 10)){
            morefactor = false;
          }
      
    }
    var pos = 0;
    var factorstring = ``;
    while (pos < maxliste){
      if (primeweight[pos][2]>0){
        factorstring = factorstring + ` \\cdot ${primeweight[pos][0]}^${primeweight[pos][2]}` 
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
