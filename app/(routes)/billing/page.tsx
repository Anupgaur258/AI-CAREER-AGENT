import { PricingTable } from "@clerk/nextjs"

const page = () => {
  return (
      <div>
          <h2 className=" font-bold text-3xl text-center">
              Choose Your Plan
          </h2>
          
          <p className="text-center text-lg "> Selectta subscription bundle to get all ai tool acess</p>
   <div className="mt-6"> 
              <PricingTable />
              </div>
      </div>
  )
}
export default page