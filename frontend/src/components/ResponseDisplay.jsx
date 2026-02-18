

const ResponseDisplay = ({ response }) => {

  if (!response) {
    return (
      <div className="bg-white rounded-2xl p-6 shadow-lg">
        <p>No response yet...</p>
      </div>
    )
  }
  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg">

      <h2 className="text-xl font-semibold mb-4">
        Explanation
      </h2>

      <div className="h-60 overflow-y-auto text-gray-700">
        {response.explanation || "AI response will appear here..."}
        <h2 className="font-bold mt-2">Root Cause:</h2>
        {response.rootCause || "AI response will appear here..."}
        <h2 className="font-bold mt-2">Fix Steps:</h2>
        {response.fixSteps && response.fixSteps.map((step, index) => (
          <p key={index}>{index+1}. {step}</p>
        )) || "AI response will appear here..."}
        <h2 className="font-bold mt-2">Learning Tip:</h2>
        {response.learningTip || "AI response will appear here..."}
      </div>


    </div>
  )
}

export default ResponseDisplay
