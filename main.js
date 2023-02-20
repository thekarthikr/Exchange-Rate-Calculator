const currencyElementOne = document.getElementById('currency-one'),
 currencyElementTwo = document.getElementById('currency-two'),
amountElementOne = document.getElementById('amount-one'),
amountElementTwo = document.getElementById('amount-two'),
rateElement = document.getElementById('rate'),
swapElement = document.getElementById('swap')








function calculate(){
 const currencyOneValue = currencyElementOne.value;
 const currencyTwoValue = currencyElementTwo.value;

 fetch(`https://v6.exchangerate-api.com/v6/eb9ef8de7f5019cef27265a3/latest/${currencyOneValue}`)
  .then(res => res.json())
  .then (data =>{
    
     console.log(data)
     const currencyRate = data.conversion_rates[currencyTwoValue];
      
     rateElement.innerText = `1 ${currencyOneValue} = ${currencyRate} ${currencyTwoValue}`
     amountElementTwo.value = (amountElementOne.value *currencyRate ).toFixed(2);     
  })
}


swapElement.addEventListener('click',()=> {
    const temp = currencyElementOne.value;
    currencyElementOne.value  = currencyElementTwo.value;
    currencyElementTwo.value = temp;

    calculate();

})

currencyElementOne.addEventListener('change',calculate);
currencyElementTwo.addEventListener('change', calculate);
amountElementOne.addEventListener('input', calculate);
amountElementTwo.addEventListener('input' , calculate);

calculate();
