export const gcd = (
  a: number,
  b: number
): number => {
  var apos = Math.abs(a);
  var bpos = Math.abs(b);
  while (bpos) {
      var temppos=bpos;
      bpos=apos%bpos;
      apos=temppos;
  }
  return apos;
};

export const multigcd=(arr:any[]):any[]=>{
  if (arr.length==1) {
    return arr;
  } else {
    var number1=arr.pop();
    var number2=arr.pop();
    arr.push(gcd(number1,number2));
    return multigcd(arr);
  }
};

export const calculategcd=(arr:any[]):number=>{
  return multigcd(arr)[0];
}