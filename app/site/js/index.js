import {VAR} from './other'

console.log(VAR)

fetch('api/v1/', {method: 'GET'}).then(async (response) => {
  const text = await response.text()
  console.log(text)
})
