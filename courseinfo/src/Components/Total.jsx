const Total = ({ exercises }) => {
    return <p className='Total'>Total of {exercises.reduce((sum, amount) => {return sum + amount.exercises}, 0)} exercises</p>
}

export {
    Total
}