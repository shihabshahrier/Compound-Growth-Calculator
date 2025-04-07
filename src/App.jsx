import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import CompoundGrowthCalculator from './components/CompoundGrowthCalculator'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <CompoundGrowthCalculator />
    </>
  )
}

export default App
