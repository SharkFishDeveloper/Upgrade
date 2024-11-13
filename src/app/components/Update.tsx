import { useState } from "react";
import updateUserStrengthsWeaknesses from "../backend/handleUpdateStrengthWeakness";
import { useSession } from "next-auth/react";
import  toast  from 'react-hot-toast'

const Update = () => {
  const session = useSession();
  const [strength, setStrength] = useState("");
  const [weakness, setWeakness] = useState("");

  const handleSubmit =async (e) => {
    e.preventDefault();
    const id = session.data?.user.id as string;
    const resp = await  updateUserStrengthsWeaknesses({strength,weakness,id});
       //* local storage
    localStorage.setItem("user",JSON.stringify(resp.user))
    if(resp.status!==200){
      toast.error(resp.message);
    }else{
      toast.success(resp.message);
    } 
  };

  return (
    <div className="flex justify-center items-center h-screen bg-white">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg p-8 max-w-md w-full"
      >
        <h2 className="text-2xl font-bold text-black text-center mb-6">
          Update Your Profile
        </h2>

        <div className="mb-4">
          <label className="block text-black text-sm font-semibold mb-2" htmlFor="strength">
            Strength
          </label>
          <input
            type="text"
            id="strength"
            value={strength}
            onChange={(e) => setStrength(e.target.value)}
            className="w-full p-2 border border-black rounded-lg text-black bg-white focus:outline-none focus:border-gray-600"
            placeholder="Enter your strength"
          />
        </div>

        <div className="mb-6">
          <label className="block text-black text-sm font-semibold mb-2" htmlFor="weakness">
            Weakness
          </label>
          <input
            type="text"
            id="weakness"
            value={weakness}
            onChange={(e) => setWeakness(e.target.value)}
            className="w-full p-2 border border-black rounded-lg text-black bg-white focus:outline-none focus:border-gray-600"
            placeholder="Enter your weakness"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-black text-white font-semibold py-2 px-4 rounded-lg hover:bg-gray-800 focus:outline-none"
        > Submit
        </button>
      </form>
    </div>
  );
};

export default Update;
