import { ProblemGenerator } from "../ProblemGeneratorSpi";
import { randomdist } from "../util/randomDistribution";



let primedistribution = [
  [2,30],[3,60],[5,70],[7,77],[11,83],[13,88],
  [17,90],[19,92],[23,94],[29,96],[31,98],[37,100]
];

const primeFactor: ProblemGenerator = {
  key: "prime-factor",
  generate: () => {

    let primelist = [
      [2,0],[3,0],[5,0],[7,0],[11,0],[13,0],
      [17,0],[19,0],[23,0],[29,0],[31,0],[37,0]
    ];
  
    const minnumber = 200;
    const maxnumber = 1500;
    var factornumber = 1;
    const maxliste = primelist.length;
    var pos = 0;
    while (factornumber < minnumber){
        pos = randomdist(primedistribution);
        if (factornumber * primelist[pos][0]<maxnumber){
          primelist[pos][1] = primelist[pos][1] + 1;
          factornumber = factornumber * primelist[pos][0];
        }
        
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
