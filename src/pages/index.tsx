import { useState } from "react";

export default function Home() {
  const [postcode, setPostcode] = useState('');
  const [suburb, setSuburb] = useState('');
  const [state, setState] = useState('');

  return (
    <main
      className='flex flex-col items-center justify-between gap-y-8 p-8 md:p-24'
    >
      <img src="https://images.lawpath.com.au/2022/09/lawpath-logo.svg" alt="Lawpath logo" className="h-auto w-[180px]" />
      <h1 className="text-[42px] text-center font-semibold text-blue">Australia Address Validation</h1>
      <form className="flex flex-col gap-y-4 w-[100%] sm:w-[480px] lg:w-[640px]">
        <input
          type="text"
          placeholder="Enter the Postcode"
          value={postcode}
          onChange={(e) => setPostcode(e.target.value)}
          className="border-2 border-blue rounded-md p-2 text-center"
        />
        <input
          type="text"
          placeholder="Enter the Suburb"
          value={suburb}
          onChange={(e) => setSuburb(e.target.value)}
          className="border-2 rounded-md p-2 text-center"
        />
        <input
          type="text"
          placeholder="Enter the State"
          value={state}
          onChange={(e) => setState(e.target.value)}
          className="border-2 rounded-md p-2 text-center"
        />
        <button type="submit" className="bg-blue text-white w-fit rounded-md px-6 py-4 mx-auto hover:bg-blue-700">
          Verify Address
        </button>
      </form>
    </main>
  )
}
