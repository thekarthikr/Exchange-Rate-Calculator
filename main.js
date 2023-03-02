const currencyElementOne = document.getElementById('currency-one'),
 currencyElementTwo = document.getElementById('currency-two'),
amountElementOne = document.getElementById('amount-one'),
amountElementTwo = document.getElementById('amount-two'),
rateElement = document.getElementById('rate'),
swapElement = document.getElementById('swap')


const apiUrl = 'https://api.frankfurter.app';

const displayDropdown =()=>{
 fetch(`${apiUrl}/currencies`)
.then(res => res.json())
.then(currencies => {
 for(const currency in currencies){       
   let opt=  `<option value="${currency}"> ${currency} </option> `;
   currencyElementOne.innerHTML += opt;
   currencyElementTwo.innerHTML += opt;       
}

} )
}

displayDropdown()



const calculate = ()=>{
  const currOne = currencyElementOne.value ;
  const currTwo = currencyElementTwo.value;

  fetch(`${apiUrl}/latest?`)
  .then(res => res.json())
  .then(data => {
      
        if(currOne === currTwo){
             rateElement.innerHTML = 'Enter valid input'
        } else{
         let rate = data.rates[currTwo]
         console.log(data)
         rateElement.innerHTML = `1 ${currOne} = ${rate} ${currTwo}`
           amountElementTwo.value = (amountElementOne.value * rate).toFixed(2)
 
        }
       
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
