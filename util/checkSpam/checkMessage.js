import addMessage from "./addMessage.js"
import cleanMessageList from "./cleanMessageList.js"


export default async function checkMessage({content, id, createdTimestamp}) {
   const array = await addMessage(content, id, createdTimestamp)
   if (!array) return
   console.log("contagem: ", array.length)
   if (array.length >= 3) {
      // sistema pra apagar e mutar dps
      console.log('spam encontrado')
      await cleanMessageList(content)
   }
}