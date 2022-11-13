const toggleBtn = document.querySelectorAll(".toggle div")
const buttons = document.querySelectorAll(".numberBtn")
const Operationbtns = document.querySelectorAll(".operationBtn")
const currentOperandTextElement = document.getElementById("number")
const equalBtn = document.querySelector(".equal")
const resetBtn = document.querySelector(".reset")
const deleteBtn = document.querySelector(".delete")
const  previousOperandTextElement= document.getElementById("result")

console.log(equalBtn)
console.log(Operationbtns)
toggleBtn.forEach((theme)=>{
   theme.addEventListener("click", function(e){
       const activeToggle = document.querySelectorAll(".active")
       const body = document.body
        activeToggle[0].className = activeToggle[0].className.replace("active", "transparent")
        theme.classList.add("active")
        if(theme.classList.contains("transparent")){
            theme.classList.remove("transparent")
        }
        body.className = e.currentTarget.id
   })
})



class Calculator{
    constructor(previousOperandTextElement, currentOperandTextElement){
        this.previousOperandTextElement = previousOperandTextElement
        this.currentOperandTextElement = currentOperandTextElement
        this.clear()
    }

    clear(){
        this.currentOperand = ''
        this.previousOperand = ''
        this.operation = undefined
        this.sign = false
        this.computed = false
        this.addedZero = false
    }
    
    delete(){
        this.currentOperand = this.currentOperand.toString().slice(0, -1)
    }

    checkNum(){
        if(this.currentOperand === ''){
            this.currentOperand = 0
        }
        this.addedZero = true
    }

    checkForZero(){
        if(this.addedZero){
            this.clear()
        }
      
    }

    appendNumber(number){
        if (number === '.' && this.currentOperand.includes('.')) return
        this.currentOperand = this.currentOperand.toString() + number.toString()
    }
    
    chooseOperation(operation){
        if(this.currentOperand === ''){
            this.operation = ''
        }
        if (this.previousOperand !== '' && this.currentOperand !== '') {
        this.compute()
        }
        this.operation = operation
        this.previousOperand = this.currentOperand
        this.computed = false
        this.currentOperand = " "
    }
  
    compute(){
        let computation
        const prev =parseFloat(this.previousOperand)
        const current =parseFloat(this.currentOperand)
        if(isNaN(prev) || isNaN(current)) return
        switch(this.operation){
            case '+':
                computation = prev + current
            break
            case '-':
                computation = prev - current
            break
            case '*':
                computation = prev * current
            break
            case '/':
                computation = prev / current
            break
            default:
                return
        }
        this.currentOperand = computation
        this.operation = undefined
        this.computed = true
        this.previousOperand = ''

    }
     checkCompute(){
        if(this.computed){
            this.clear()
        }
     }
    currentOp(){
        this.currentOperandTextElement.innerText = "one"
    }
    
    updateDisplay(){
        this.currentOperandTextElement.innerText = this.currentOperand
        this.previousOperandTextElement.innerText = this.operation ? this.previousOperand + this.operation : this.previousOperand
    }
}

const calculator =  new Calculator(previousOperandTextElement, currentOperandTextElement)



buttons.forEach((button)=>{
    button.addEventListener("click", (e)=>{
       
        calculator.checkCompute()
        calculator.checkForZero()
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
})
   
})

Operationbtns.forEach((button)=>{
    button.addEventListener("click", (e)=>{
        calculator.chooseOperation(button.value)
        calculator.updateDisplay()
})
})

equalBtn.addEventListener("click", ()=>{
    calculator.compute()
    calculator.updateDisplay()
})

resetBtn.addEventListener("click", () =>{
    calculator.clear()
    calculator.updateDisplay()
})

deleteBtn.addEventListener("click", ()=>{
    calculator.delete()
    calculator.checkNum()
    calculator.updateDisplay()
    
})

