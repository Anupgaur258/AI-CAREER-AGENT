
import React from "react"
import AiToolCard from "./AiToolCard"
const aiToolsList = [{
    name: 'Ai Career QA & Ans',
    desc: ' Chat with Ai Agent',
    icon: '/chatbot.png',
    button: 'Lets chat',
     path: '/ai-tools/ai-chat'
},
    {
    name: 'Ai Resume Analyzer',
    desc: 'Improve your resume',
    icon: '/resume.png',
    button: 'Analyze Now',
     path: '/ai-resume-analyzer'
    },
    {
    name: 'Ai Career Roadmap Generator',
    desc: 'Build your roadmap',
    icon: '/roadmap.png',
    button: 'Generate Now',
     path: '/career-roadmap-generator'
    },
    {
    name: 'Cover Letter Generator',
    desc: 'Write a cover letter',
    icon: '/cover.png',
    button: 'Create Now',
     path: '/cover-letter-generator'
}

]





const AiTools = () => {
    
  return (
      <div className="mt-7 p-5 border bg-white rounded-xl">
          <h2> Available AI Tools</h2> 
          <p> Start Building and shape your career with this expensive tools</p>
          <div className="grid grid-cols-1 md;grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 mt-4">
              {aiToolsList.map((tool: any, index) => (
                  <AiToolCard tool={tool} key={index} />
              ))}
           </div>
    </div>
  )
}
export default AiTools