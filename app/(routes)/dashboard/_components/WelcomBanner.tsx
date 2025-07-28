import { Button } from "@/components/ui/button"

const WelcomBanner = () => {
  return (
      <div className="p-5 bg-gradient-to-r from-[#f37847] via-[#a649db] to-[#9832e6] rounded-lg">
          <h2 className="font-bold text-2xl text-white"> Ai Career Agent</h2>
          <p className="text-white"> Smarter career decisions start here get </p>
          <Button variant={'outline'} className="mt-3"> let's get started</Button>
    </div>
  )
}
export default WelcomBanner