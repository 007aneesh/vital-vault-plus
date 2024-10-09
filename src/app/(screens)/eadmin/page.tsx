export default function Page() {
  return (
    <div className="w-full h-full p-10 flex flex-col gap-y-4">
      <div className="flex flex-col py-8">
        <div>
          <h1 className="font-bold text-xl">Add new Patient:</h1>
        </div>

        <div className="grid grid-cols-1 p-5 md:grid-cols-2 justify-center items-center w-full gap-5 md:gap-10">
          <input
            type="number"
            name="aadharNumber"
            placeholder="Aadhar Number"
            className="outline-none rounded-lg  px-3 py-2 border-2 bg-transparent border-black"
          />
          <input
            type="text"
            name="name"
            placeholder="Name"
            className="outline-none rounded-lg  px-3 py-2 border-2 bg-transparent border-black"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="outline-none rounded-lg  px-3 py-2 border-2 bg-transparent border-black"
          />
          <input
            type="text"
            name="guardianName"
            placeholder="Guardian Name"
            className="outline-none rounded-lg  px-3 py-2 border-2 bg-transparent border-black"
          />
          <input
            type="number"
            name="emergencyContact"
            placeholder="Emergency Contact"
            className="outline-none rounded-lg  px-3 py-2 border-2 bg-transparent border-black"
          />
          <input
            type="text"
            name="gender"
            placeholder="Gender"
            className="outline-none rounded-lg  px-3 py-2 border-2 bg-transparent border-black"
          />
          <input
            type="number"
            name="contact"
            placeholder="Contact"
            className="outline-none rounded-lg  px-3 py-2 border-2 bg-transparent border-black"
          />
          <input
            type="password"
            name="password"
            // value={patData.password}
            // onChange={handlePatData}
            autoComplete="off"
            placeholder="Set Password"
            className="outline-none rounded-lg  px-3 py-2 border-2 bg-transparent border-black"
          />
        </div>
        <div className="flex items-center justify-center">
        
            <button
              className="p-5 bg-[#662890]/80 text-white w-1/3  py-2 text-lg rounded-lg"
            >
              Add
            </button>
          
        </div>
      </div>
    </div>
  );
}
