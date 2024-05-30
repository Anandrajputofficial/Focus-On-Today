const checkBoxList = document.querySelectorAll('.custom-check')
const inputField = document.querySelectorAll('.goal-input')
const progressBar = document.querySelector('.progress-bar')
const progressAmount = document.querySelector('.progress-amount')
const progressLevel = document.querySelector('.progress-level')

const allQuotes = [
    'Just a step away, keep going!',  
    'Well begun is half done!',
    'Just a step Away, Keep Going',
    'Whoa! You just completed all the goals, time for chill :D'
]


const allGoals = JSON.parse(localStorage.getItem('allGoals')) || {}

let completedGoals = Object.values(allGoals).filter((goal) => goal.completed).length

progressAmount.style.width = `${(completedGoals/inputField.length)*100}%`;
progressAmount.firstElementChild.innerText =`${completedGoals}/${inputField.length} Completed`
progressLevel.innerText = allQuotes[completedGoals]

checkBoxList.forEach((checkbox) => {
    checkbox.addEventListener('click', (e) => {
        const allInputFields = [...inputField].every(function (input){
            return input.value
        })

        if(allInputFields){
        checkbox.parentElement.classList.toggle('Completed')
        const inputId = checkbox.nextElementSibling.id;
        allGoals[inputId].completed = !allGoals[inputId].completed;
        completedGoals = Object.values(allGoals).filter((goal) => goal.completed).length

        progressAmount.style.width = `${(completedGoals/inputField.length)*100}%`;
        progressAmount.firstElementChild.innerText =`${completedGoals}/${inputField.length} Completed`
        progressLevel.innerText = allQuotes[completedGoals]

        localStorage.setItem('allGoals', JSON.stringify(allGoals))
        }else{
            progressBar.classList.add('show-error')
        }
    })
})
 

inputField.forEach((input) => {
    if(allGoals[input.id]){
    input.value = allGoals[input.id].name;
    }

    if(allGoals[input.id].completed){
        input.parentElement.classList.add('completed')
    }

    input.addEventListener('focus', () => {
        progressBar.classList.remove('show-error')
    })

    input.addEventListener('input', (e) => {
        if (allGoals[input.id] && allGoals[input.id].completed) {
            input.value = allGoals[input.id].name
            return
          }

          if(allGoals[input.id]){
            allGoals[input.id].name = input.value
          }else{
          allGoals[input.id] = {
            name : input.value,
            completed : false
          }
        }
          localStorage.setItem('allGoals', JSON.stringify(allGoals))
    })
})