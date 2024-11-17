"use client";

import { useEffect, useState } from "react";
import { addSkill } from "../backend/addSkill";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import SkillArea from "@/util/interface/SkillArea";
import { doneSkill } from "../backend/doneSkill";
import { deleteSkill } from "../backend/deleteSkill";

const Skillarea = () => {
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [score, setScore] = useState(0);
  const [days, setDays] = useState(0);
  const [skills, setSkills] = useState<SkillArea[]>([]);
  const [selectedSkill, setSelectedSkill] = useState<SkillArea | null>(null); 
  const session = useSession();

  const handleToggle = () => setShowForm((prev) => !prev);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const userId = session.data?.user.id;
    let resp;
    if (userId) {
      resp = await addSkill({ name, score, days, userId });
    }
    if (resp?.status !== 200) {
      toast.error(resp?.message as string);
    } else {
      toast.success(resp?.message as string);
    }
  
    // Reset form fields
    setDays(0);
    setName("");
    setScore(0);
    setShowForm(false);
  
    const userFromLocalStorage = localStorage.getItem("user");
    if (userFromLocalStorage) {
      const userFromLocalStorageParsed = JSON.parse(userFromLocalStorage);
  
      // Ensure that skillAreas exists under profile
      if (!Array.isArray(userFromLocalStorageParsed.profile.skillAreas)) {
        userFromLocalStorageParsed.profile.skillAreas = [];
      }
  
      // Add the new skill to the existing skills
      const updatedSkills = [...userFromLocalStorageParsed.profile.skillAreas, resp?.data];
  
      // Update the skillAreas in profile and save to localStorage
      userFromLocalStorageParsed.profile.skillAreas = updatedSkills;
      localStorage.setItem("user", JSON.stringify(userFromLocalStorageParsed));
  
      // Update the state with the updated skills
      setSkills(updatedSkills);
    }
  };
  
  const skillsFromLocalStorage = async () => {
    const user = localStorage.getItem("user");
    if (user) {
      const userParsed = JSON.parse(user);
  
      // Fetch skills from profile.skillAreas
      const skills = userParsed.profile.skillAreas;
      setSkills(skills);
    }
  };
  
  const handleSkillClick = (skill: SkillArea) => {
    setSelectedSkill((prevSkill) => (prevSkill?.id === skill.id ? null : skill));
  };
  
  // Fetch skills from localStorage on component mount
  useEffect(() => {
    skillsFromLocalStorage();
  }, []);
  
  
  const skillDone = async (skillId: number, score: number) => {
    const userId = parseInt(session.data?.user.id as string);
    if (userId) {
      const resp = await doneSkill({ userId, skillId, score });
      if (resp.status !== 200) {
        toast.error(resp.message);
      } else {
        toast.success(resp.message);
      }
    } else {
      toast.error("Please sign in");
    }
    const user = localStorage.getItem("user");
    const parsedUser = user ? JSON.parse(user) : null;
    if (parsedUser?.profile) {

      const skillIndex = parsedUser?.profile.skillAreas.findIndex((skill:any) => skill.id === skillId);
      if (skillIndex !== -1) {
          // Update the found skill's streak
          parsedUser.profile.skillAreas[skillIndex].streak++;
  
          // Update the profile in the localStorage
          localStorage.setItem("user", JSON.stringify(parsedUser));
  
          setSkills(parsedUser.profile.skillAreas);
      } else {
          toast.error("Skill not found!");
      }
      setSelectedSkill((prevSkill) => (prevSkill?.id === skillId ? null : null));
      }
    
  };
  
const skillDelete = async (skillId: number)=>{
    const userId = parseInt(session.data?.user.id as string);
    const resp = await deleteSkill({ userId, skillId});
    if (resp.status !== 200) {
        toast.error(resp.message);
      } else {
        toast.success(resp.message);
      }
      const user = localStorage.getItem("user");
      const parsedUser = user ? JSON.parse(user) : null;
      if (parsedUser?.profile) {
        const skillIndex = parsedUser.profile.skillAreas.findIndex((skill: any) => skill.id === skillId);
        if (skillIndex !== -1) {
          parsedUser.profile.skillAreas.splice(skillIndex, 1);
          localStorage.setItem("user", JSON.stringify(parsedUser));
          setSkills(parsedUser.profile.skillAreas);
        }
        else {
          // toast.error("Skill not found");
      }
      }

}

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-100 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Skill Area</h1>

      <button
        onClick={handleToggle}
        className="mb-4 px-6 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition duration-300"
      >
        {showForm ? "Cancel" : "Add Skill"}
      </button>

      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="p-4 bg-white rounded-lg shadow-md space-y-4"
        >
          <div>
            <label className="block text-sm font-semibold text-gray-700">
              Skill Name:
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 mt-1 focus:ring-2 focus:ring-blue-400 focus:outline-none"
              placeholder="Enter skill name"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700">
              Daily Points:
            </label>
            <input
              type="number"
              value={score}
              onChange={(e) => setScore(Number(e.target.value))}
              className="w-full border rounded-lg px-3 py-2 mt-1 focus:ring-2 focus:ring-blue-400 focus:outline-none"
              placeholder="Enter daily points"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700">
              Duration (Days):
            </label>
            <input
              type="number"
              value={days}
              onChange={(e) => setDays(Number(e.target.value))}
              className="w-full border rounded-lg px-3 py-2 mt-1 focus:ring-2 focus:ring-blue-400 focus:outline-none"
              placeholder="Enter duration in days"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-300"
          >
            Submit
          </button>
        </form>
      )}

<div className="mt-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-2">Your Skills:</h2>
      {skills && skills.length > 0 ? (
        <div className="space-y-4">
          {/* List of skill names */}
          <div className="space-y-2">
            {skills.map((skill) => (
              <div
                key={skill.id}
                className="p-2 bg-white rounded-lg shadow cursor-pointer hover:bg-gray-100 transition duration-300"
                onClick={() => handleSkillClick(skill)} // Toggle the visibility of the skill details
              >
                <h3 className="text-lg font-bold text-gray-700">{skill.name}</h3>
              </div>
            ))}
          </div>

          {/* Show selected skill details */}
          {selectedSkill && (
            <div className="mt-6 p-4 bg-white rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-gray-700">{selectedSkill.name}</h3>
              <p>{selectedSkill.streak}</p>
              <p className="text-sm text-gray-600">Daily Points: {selectedSkill.dailyPoints}</p>
              <p className="text-sm text-gray-600">Days: {selectedSkill.days}</p>
              <p className="text-sm text-gray-600">Level: {selectedSkill.level}</p>
              <div className="mt-2">
                <p className="text-sm font-semibold text-gray-600 mb-1">Streak:</p>
                {selectedSkill.days <= 365 ? (
                  <>
                  <div className="flex gap-1 flex-wrap">
                    {Array.from({ length: selectedSkill.days }, (_, i) => (
                      <div
                        key={i}
                        className={`w-3 h-3 rounded border ${
                          i < selectedSkill.streak ? "bg-green-500" : "bg-gray-200"
                        }`}
                      ></div>
                    ))}
                  </div>
                  {selectedSkill.streak >= selectedSkill.days && (
                    <p className="text-green-500 mt-2">Completed</p>
                    )}
                  </>
                ) : (
                  <p className="text-sm text-gray-500 italic">
                    Streak visualization available only for 20 days or less.
                  </p>
                )}
              </div>
              {
               selectedSkill.streak >= selectedSkill.days ? (

                <button
                className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition duration-300"
                onClick={() => {
                    skillDelete(selectedSkill.id)
                }}
              >
                Delete
              </button>


               ):(
               <>
               
               <button
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300"
                onClick={() => {
                    skillDone(selectedSkill.id,selectedSkill.dailyPoints)
                }}
              >
                Done
              </button> 
              <button
                className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition duration-300"
                onClick={() => {
                    skillDelete(selectedSkill.id)
                }}
              >
                Delete
              </button>
              </>
               )
              }
            </div>
          )}
        </div>
      ) : (
        <p className="text-gray-500">No skills found. Add a skill to get started!</p>
      )}
    </div>
    </div>
  );
};

export default Skillarea;
