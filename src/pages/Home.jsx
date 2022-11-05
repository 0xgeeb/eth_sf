import { React, useState, useEffect } from "react"
import { ethers } from "ethers"
import { WorldIDWidget } from '@worldcoin/id'
import ContractABI from "../utils/Contract.json"


export default function Home() {

  return (
    <div className="mx-auto mt-24 flex flex-col">
      <h1 className="text-slate-500 text-[50px]">world coin test</h1>
      <div className="mt-14">
        <WorldIDWidget
          actionId="wid_staging_bccee84c11a10fee1e3fcfb1aa4e4cfa" // obtain this from developer.worldcoin.org
          signal="starting_game"
          enableTelemetry
          onSuccess={(verificationResponse) => console.log(verificationResponse)} // you'll actually want to pass the proof to the API or your smart contract
          onError={(error) => console.error(error)}
        />
      </div>
    </div>
  )
}