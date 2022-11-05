import { React, useState, useEffect } from "react"
import { ethers } from "ethers"
import { WorldIDWidget } from '@worldcoin/id'
import ContractABI from "../utils/Contract.json"


export default function Home() {

  const [currentAccount, setCurrentAccount] = useState(null)
  const [mumbai, setMumbai] = useState(null)
  const [merkleRoot, setMerkleRoot] = useState(null)
  const [nullifierHash, setNullifierHash] = useState(null)
  const [proof, setProof] = useState(null)

  const MUMBAI_PARAMS = {
    chainId: '0x13881',
    chainName: 'Mumbai Testnet',
    nativeCurrency: {
      name: 'Matic Token',
      symbol: 'MATIC',
      decimals: 18
    },
    rpcUrls: ['https://rpc-mumbai.maticvigil.com/'],
    blockExplorerUrls: ['https://mumbai.polygonscan.com/']
  }

  const CONTRACT_ADDRESS = "0xc89447AA7aB1f6DF5140b483C32762bBDa5177AF"

  function handleResponse(verificationResponse) {
    console.log(verificationResponse)
    setMerkleRoot(verificationResponse.merkle_root)
    setNullifierHash(verificationResponse.nullifier_hash)
    const unpackedProof = ethers.utils.defaultAbiCoder.decode(['uint256[8]'], verificationResponse.proof)
    const result = unpackedProof[0].map((x) => {
      return x._hex;
    })
    setProof(result)
  }
  
  async function connectWallet() {
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
    const account = accounts[0]
    setCurrentAccount(account)
  }

  async function switchToMumbai() {
    await window.ethereum.request({ method: 'wallet_addEthereumChain', params: [MUMBAI_PARAMS] })
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const { chainId } = await provider.getNetwork();
    if (chainId == 80001) {
      setMumbai(chainId)
    }
  }

  async function sendTx() {
    console.log(proof)
    const provider = new ethers.providers.Web3Provider(ethereum)
    const signer = provider.getSigner()
    const contract = new ethers.Contract(
      CONTRACT_ADDRESS,
      ContractABI.abi,
      signer
    )
    const txn = await contract.verifyAndExecute(
      currentAccount,
      merkleRoot,
      nullifierHash,
      proof,
      { gasLimit: 600000 }
    )
    await txn.wait()
  }

  function consoleLogThatShit() {
    const result = proof.map((x) => {
      return x._hex;
    })
    console.log(result)
  }

  function renderContent() {
    if(!currentAccount) {
      return <div className="flex flex-col mx-auto">
        <button className="mx-auto py-1 px-3 mt-8 bg-black text-white rounded-lg" onClick={connectWallet}>plz connect wallet</button>
      </div>
    }
    else if(!mumbai) {
      return <div className="flex flex-col mx-auto">
        <button className="mx-auto py-1 px-3 mt-8 bg-black text-white rounded-lg" onClick={switchToMumbai}>plz switch to mumbai</button>
      </div>
    }
    else {
      return <div className="flex flex-col mx-auto">
        <button className="mx-auto py-1 px-3 mt-8 bg-black text-white rounded-lg" onClick={sendTx}>send tx boss</button>
      </div>
    }

  }

  return (
    <div className="mx-auto mt-24 flex flex-col">
      <h1 className="text-slate-500 text-[50px]">world coin test</h1>
      <div className="mt-14">
        <WorldIDWidget
          actionId="wid_staging_bccee84c11a10fee1e3fcfb1aa4e4cfa" // obtain this from developer.worldcoin.org
          signal="0xFB38050d2dEF04c1bb5Ff21096d50cD992418be3"
          enableTelemetry
          onSuccess={(verificationResponse) => handleResponse(verificationResponse)} // you'll actually want to pass the proof to the API or your smart contract
          onError={(error) => console.error(error)}
        />
      </div>
      <div className="mt-14">
        {renderContent()}
      </div>
      <div className="mt-14 mx-auto">
        <button className="mx-auto py-1 px-3 mt-8 bg-black text-white rounded-lg" onClick={consoleLogThatShit}>console log that shit</button>
      </div>
    </div>
  )
}