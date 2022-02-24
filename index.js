const { prepare, request, getResult, getCardList } = klipSDK

// HTML ELEMENTS
const textArea = document.querySelector('.text-area')
const rqbtn = document.querySelector('.requestBtn')
const cfbtn = document.querySelector('.confirmBtn')
const cert = document.querySelector('.cert')
const nickname = document.querySelector('nickname')
const bappName = `Sillog`
const myaddr = `"0x6e8af0F8E64a0f6a8B0610874b32fd7f3ac6Df18"`

let requestKey
let address

// HELPER FUNCTIONS
const setRequestKey = (newRequestKey) => {
  requestKey = newRequestKey
  textArea.textContent = `Request Key: ${newRequestKey}`
}

const setErrorMsg = (errorMsg) => {
  textArea.textContent = `Error: ${errorMsg}`
}

const execute = (prepareFunction) => {
  window.addEventListener("DOMContentLoaded", () => {
    prepareFunction()
  })
}

const authPrepare = async () => {
  
  const res = await prepare.auth({ bappName })
  console.log(res)
  if (res.err) {
    setErrorMsg(res.err)
  } else {
    setRequestKey(res.request_key)
  }
}

const authResult = async () => {
  const res = await getResult(requestKey)
  address = JSON.stringify(res.result.klaytn_address)
  //textArea.textContent = typeof(myaddr)
  if (address == myaddr) {
    cert.classList.remove("hidden")
    nickname.textContent = `JungHyun`
  } else {
    textArea.textContent = "noo"
  }
}

execute(authPrepare)

rqbtn.addEventListener('click', (e) => {
  //textArea.textContent = bappName;
  request(requestKey, () => alert('not mobile'))
  rqbtn.classList.add('remove')
  cfbtn.classList.remove('remove')
})

cfbtn.addEventListener('click', (e) => {
  authResult()

})