
const Loading = () => {
  return (
   <div>
     <div className="flex flex-row gap-2 justify-center items-center my-4">
    <div className="w-4 h-4 rounded-full bg-black animate-bounce"></div>
    <div className="w-4 h-4 rounded-full bg-black animate-bounce [animation-delay:-.3s]"></div>
    <div className="w-4 h-4 rounded-full bg-black animate-bounce [animation-delay:-.5s]"></div>
  </div>
   </div>
  )
}

export default Loading