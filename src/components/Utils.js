export function add(arg1, arg2){
    var sum = "";
    var r = 0;
    var a1, a2, i;
  
    // Pick the shortest string as first parameter and the longest as second parameter in my algorithm
    if (arg1.length < arg2.length) {
      a1 = arg1;
      a2 = arg2;
    }
    else {
      a1 = arg2;
      a2 = arg1;
    }
    a1 = a1.split("").reverse();
    a2 = a2.split("").reverse();
  
    // Sum a1 and a2 digits
    for (i = 0; i < a2.length; i++) {
      var t = ((i < a1.length) ? parseInt(a1[i]) : 0) + parseInt(a2[i]) + r;
      
      sum += t % 10;
  
      r = t < 10 ? 0 : Math.floor(t / 10);
    }
    // Append the last remain
    if (r > 0)
      sum += r;
  
    sum = sum.split("").reverse();
    
    // Trim the leading "0"
    while (sum[0] == "0")
      sum.shift();
  
    return sum.length > 0 ? sum.join("") : "0";
  }

export function mult(a, b) {

    let isASingleDigit = 0, isBSingleDigit = 0;
    if (a < 9) { a *= 10; isASingleDigit = 1 }
    if (b < 9) { b *= 10; isBSingleDigit = 1 }
    //First step is to seperate a & b into arrays so that we are only dealing with 7 digits at a time 

    let lengthOfA = a.length,
        lengthOfB = b.length,
        aInArry = [],
        bInArry = [];


    while (a.length > 7) {
        aInArry.push(a.substring(a.length - 7, a.length));
        a = a.substring(0, a.length - 7)
    }
    aInArry.push(a)

    while (b.length > 7) {
        bInArry.push(b.substring(b.length - 7, b.length));
        b = b.substring(0, b.length - 7)
    }
    bInArry.push(b)


    aInArry = aInArry.reverse();
    bInArry = bInArry.reverse();

    //Second step is to multiply the 2 arrays with each other

    let answerLines = [];

    for (var i = aInArry.length - 1, j = 0; i >= 0; i-- , j++) {
        answerLines[j] = bInArry.map((n) => n * aInArry[i] === NaN ? '0000000' : n * aInArry[i]);
        //this is to ensure the array takes into account that the second row of the matrix should be followed by 7 x "o's" and the third by 14, and so on.
        var k = 0;
        while (k < j) {
            answerLines[j].push(0);
            k += 1
        }
    }


    //Third step is to add the columns of the answer lines into an new array
    var answerInArray = answerLines[answerLines.length - 1];

    for (var j = 1; j < answerInArray.length; j++) {
        for (var i = 0; i < answerLines.length - 1; i++) {
            if (answerLines[i].length >= j) {
                answerInArray[answerInArray.length - j] += answerLines[i][answerLines[i].length - j]
            }
        }
    }


    //Fourth step is to make sure each element is only 7 digits long and the additional digits are added to the prevoius element

    let answerIn7DigitBlocksArray = []

    for (var i = 0; i < answerInArray.length; i++) {
        answerIn7DigitBlocksArray.push('')
    }

    for (var i = 1; i <= answerInArray.length; i++)
        if (i !== answerInArray.length) {
            answerIn7DigitBlocksArray[answerIn7DigitBlocksArray.length - i] = answerInArray[answerInArray.length - i].toString().substring(answerInArray[answerInArray.length - i].toString().length - 7, answerInArray[answerInArray.length - i].toString().length);
            answerInArray[answerInArray.length - i - 1] += parseInt(answerInArray[answerInArray.length - i].toString().substring(0, answerInArray[answerInArray.length - i].toString().length - 7))
        } else
            answerIn7DigitBlocksArray[0] = answerInArray[0]



    if (isASingleDigit) { answerIn7DigitBlocksArray[answerIn7DigitBlocksArray.length - 1] /= 10 }
    if (isBSingleDigit) { answerIn7DigitBlocksArray[answerIn7DigitBlocksArray.length - 1] /= 10 }


    return answerIn7DigitBlocksArray.join('')
}

export function div(number,divisor){
        // As result can be very
        // large store it in string
        // but since we need to modify
        // it very often so using
        // string builder
        let ans="";
   
        // We will be iterating
        // the dividend so converting
        // it to char array
   
        // Initially the carry
        // would be zero
        let idx = 0;
          let temp=number[idx]-'0';
        while (temp < divisor)
        {
            temp = (temp * 10 +
            (number[idx + 1]).charCodeAt(0) -
                   ('0').charCodeAt(0));
            idx += 1;
        }
        idx += 1;
         
        while(number.length>idx)
        {
            // Store result in answer i.e. temp / divisor
            ans += String.fromCharCode
            (Math.floor(temp / divisor) +
            ('0').charCodeAt(0));
           
            // Take next digit of number
            temp = ((temp % divisor) * 10 +
            (number[idx]).charCodeAt(0) -
                  ('0').charCodeAt(0));
            idx += 1;
        }
         
        ans += String.fromCharCode
        (Math.floor(temp / divisor) +
        ('0').charCodeAt(0));
         
        //If divisor is greater than number
        if(ans.length==0)
            return "0";
        //else return ans
        return ans;
}


