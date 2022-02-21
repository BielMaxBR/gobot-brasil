import addMessage from "./addMessage.js"


export default async function checkMessage(message) {
   const array = await addMessage(message)
   console.log(array)
}