import { React, useState, useEffect } from "react"
import { ethers, getDefaultProvider } from "ethers"
import axios from "axios"



export default function Home() {

  const [currentAccount, setCurrentAccount] = useState(null)
  const [mumbai, setMumbai] = useState(null)
  const [merkleRoot, setMerkleRoot] = useState(null)
  const [nullifierHash, setNullifierHash] = useState(null)
  const [proof, setProof] = useState(null)
  const [apiObject, setApiObject] = useState({})



  function consoleLogThatShit() {
    console.log(apiObject)
  }
  





  return (
    <div className="mx-auto mt-24 flex flex-col">
      <h1 className="text-slate-500 text-[50px]">world coin test</h1>
      <div className="mt-14">
        <WorldIDWidget
          actionId="wid_staging_bccee84c11a10fee1e3fcfb1aa4e4cfa" // obtain this from developer.worldcoin.org
          signal="hello"
          enableTelemetry
          onSuccess={(verificationResponse) => handleResponse(verificationResponse)} // you'll actually want to pass the proof to the API or your smart contract
          onError={(error) => console.error(error)}
        />
      </div>
      <div className="mt-14 mx-auto">
        <button className="mx-auto py-1 px-3 mt-8 bg-black text-white rounded-lg" onClick={consoleLogThatShit}>console log that shit</button>
      </div>
      <div className="mt-14 mx-auto">
        <button className="mx-auto py-1 px-3 mt-8 bg-black text-white rounded-lg" onClick={postToServer}>post api object</button>
      </div>
    </div>
  )
}