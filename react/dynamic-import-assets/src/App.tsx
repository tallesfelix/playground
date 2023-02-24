import { useEffect, useState } from 'react'
import { icons } from './components/WeatherIcon'

// https://vitejs.dev/guide/assets.html#new-url-url-import-meta-url
/*
  import.meta.url is a special variable that is available in all ES modules. It contains the URL of the current module.
  new URL(relativePath, import.meta.url) returns a URL object that is resolved relative to the current module.
  The href property of the URL object returns the resolved URL as a string.
*/
const getImageUrl = (iconName: string) => {
  return new URL(`./assets/icons/${iconName}.svg`, import.meta.url).href
}

const loadIcon = async (iconName: string) => {
  const icon = await import(`./assets/icons/${iconName}.svg`)
  return icon.default
}

const Icon = ({ iconName }: { iconName: string }) => {
  const [icon, setIcon] = useState('')
  useEffect(() => {
    loadIcon(iconName).then((i) => setIcon(i))
  }, [])
  return (
    <img src={icon} alt={`${icon} icon`} />
  )
}


const iconsToImport = ['rain', 'snow'] as const

function App() {
  return (
    <div className='container'>
      <h2>Import icons based on filename using icon name mapping</h2>
      {iconsToImport.map((icon) => (
        <img src={icons[icon]} alt={`${icon} icon`} />
      ))}
      <h2>Import icons based on filename using module URL </h2>
      {iconsToImport.map((icon) => (
        <img src={getImageUrl(icon)} alt={`${icon} icon`} />
      ))}
      <h2>Import icons based on filename using dynamic import and await</h2>
      {iconsToImport.map((icon) => {
        return (
          <Icon iconName={icon} />
        )
      })}
    </div>
  )
}

export default App
